/**
 * Gameplay-related
 * */

/*
Tuesday May 16th: VinegarFruit (official Death/Dev Branch)
-Steve mode cheating thwarted
-Steve badge!
-Removed some comments
*/

var gamemode;
var playing = false;
var steveModeEnabled = false;
var noErrorsYet = true;
var notComplete = true;
var userInput = true;
var index = 0;
var socks;
var playerScore = 0;
var currentRound = 1;
var lifePoints = 3;
var numRows = 3;
var numCols = 3;
var localSavedFiles;
var container;
var dotArray = [];
var colourArray = ["cyan","orange","green","pink","blue","purple"];
var colour;
var counter;

$.getScript("js/gameTimer.js", function(){});
$.getScript("js/nuggetScript.js", function(){});
$.getScript("js/pathGenerator.js", function(){});
$.getScript("js/online.js", function(){});
$.getScript("js/touching.js", function(){});
$.getScript("js/badges.js", function(){});
$.getScript("js/audio.js", function(){});
$.getScript("js/leaderboard.js", function(){});
$.getScript("js/steve.js", function(){});

//File storing function
function gameSetup() {
	checkCookie();
	localSavedFiles = JSON.parse(localStorage.getItem("saveFile"));
	if (localSavedFiles == null) {
		localSavedFiles = [false, false, false, false, false, false, false, false, false, false, false, 0, 0, 0];
		localStorage.setItem("saveFile", JSON.stringify(localSavedFiles));
	} else {
		if (localSavedFiles.length != 14) {
            localSavedFiles = null;
            console.log("Save Error");
            window.alert("There was a problem with your save! Creating new save file.");
            gameSetup();
		}
		console.log(localSavedFiles);
		updateBadges();
	}
	updateHighScores();
	document.getElementById('local-scores').style.display = 'block';
	document.getElementById('online-scores').style.display = 'none';

    /* t - goes to touching.js */
    whatDevice();
    addTouchListeners();
}

function checkCookie(){
    var cookieEnabled=(navigator.cookieEnabled)? true : false;
    if (typeof navigator.cookieEnabled=="undefined" && !cookieEnabled){ 
        document.cookie="testcookie";
        cookieEnabled=(document.cookie.indexOf("testcookie")!=-1)? true : false;
    }
    if (!cookieEnabled) {
	console.log("NO COOKIES");
	window.alert("WARNING: Cookies must be enabled to play this game. Enable cookies then refresh the game.");
	}
}

function clearSave() {
	localSavedFiles = null;
	localStorage.setItem("saveFile", JSON.stringify(localSavedFiles));
	gameSetup();
}

$(document).ready(function(){
    
    $(".mode-select").on('tapone', function(){
        var mode = this.id;
		if (mode == "mode-1") {
			gamemode = 0;
		} else if (mode == "mode-2") {
			gamemode = 1;
		} else {
			gamemode = 2;
		}
        console.log("mode selected: " + mode + ":" + gamemode);
    //    initialize(gamemode, newRound, removeDots);
    });
	
});

function initialize(gamemode, newRound, removeDots){
    //Initialize global variables depending on mode (currently only one mode)
    container = document.getElementById("dot-container");
    container.classList.add("vertical-center");
    playerScore = 0;
    currentRound = 1;
	lifePoints = 3;
	if (gamemode == 2) {
		lifePoints = -1;
	}
	numRows = 3;
	numCols = 3;
	playing = true;
	userInput = false;
    updateLives();
    updateScore();
	if (gamemode == 1) {
		document.getElementById('timer-bar').style.visibility='hidden';
	} else {
		document.getElementById('timer-bar').style.visibility='visible'; 
	}
	switch(gamemode) {
		case 0:
			timerSet(0, 5);
			break;
		case 1: 
			timerSet(0, 0);
			break;
		case 2:
			timerSet(2, 0);
			break;
		default:
			window.alert("YOU SHOULD NOT SEE THIS!");
		}
    newRound(generateGrid);
}

//Updates score on the bottom of gameplay screen
function updateScore() {
    var score = playerScore.toString();
    $('#playerScore').text(score);
}

//Manages player lives during gameplay
function updateLives() {
    var lifeString = '';
    for (var life = lifePoints; life > 0; life--) {
        lifeString += '<img src="images/hud_heartFull.png"/>';
    }
    $('#lives-bar').html(lifeString);

    if (lifePoints == 0) {
		disco.pause();
        gameOver();
		disco.currentTime = 0;
    }
}

/* Invoked at the start of every round. Generate a new grid and reset variables*/
function newRound(generateGrid){
	disco.pause();
	levelPass.play();
    console.log("Current round: " + currentRound);

	if (playing) {
		if (gamemode == 0) {
			timerSet(0, 5);
		}
		noErrorsYet = true;
		notComplete = true;
		index = 0;
        colour = colourArray[Math.floor(Math.random()*6)];

        //Create a new socks every time a new round starts
        // Socks is a grid element with a fixed number of columns that contains dots.
        // When the game first starts up, create a new element to assign to socks.
        if($('#socksID').length > 0){
            $("#socksID").remove();
        }

        if($('#socksID').length === 0){
            socks = document.createElement("div");
            socks.id = "socksID";

            socks.className = "container center";
            container.appendChild(socks);
        }
        /*If there are dots, clear them so they can be filled with new ones next round.
         */
        if(socks.hasChildNodes()){
            removeDots();
        }
        //Also, get rid of the old socks


		generateGrid(createGrid,make_2D_Array, pathDemonstration);
		disco.play();
	}
	
}

//Create a grid to populate with dots
function generateGrid(createGrid, make_2D_Array, pathDemonstration){
    createGrid(socks,numRows,numCols);
    dotArray = make_2D_Array(dotArray,numRows,numCols);
    //Place dots generated in make_2D_Array
    var dotID = 1;
    for(var i=0;i<numRows;i++){
        for(var j=0;j<numCols;j++){
            document.getElementById("block"+dotID).appendChild(dotArray[i][j]);
            dotID++;
        }
    }
   // var someGrid = new Grid(numRows,numCols);
    var arrayToRepeat = runPathFinder(numRows, numCols, difficulty(numRows * numCols), true);
    if(steveModeEnabled){
        steveify();
    }
    pathDemonstration(arrayToRepeat, validate);

}

/*
 Create the grid that dots will populate
 */

function createGrid(cont, nRows, nCols){
    var totalDots = nRows * nCols;
    var dotID = 1;
    var newRow;

    //At the start: col-xs-4
    //numCols = 4: col-xs-3
    //numCols = 5; col-xs-2 with offset
    //numCols = 6; cols-xs-2
    //numCols = 7; cols-xs-1 with offset, etc.
    //numCols = 12; cols-xs-1
    for(var i = 0; i < nRows; i++) {
        newRow = document.createElement("div");
        newRow.className = "row row-centered";
        var isFirstElement = true;
        for(var j=0;j<nCols;j++) {
            var gridElement = document.createElement("div");
            gridElement.className = "col-centered dotcont";
            switch(numCols){
                case 4:
                    gridElement.classList.add("col-xs-3");
                    break;
                case 5:
                    gridElement.classList.add("col-xs-2");
                    //Uncomment if you are using Bootstrap
                 /*   if(isFirstElement){
                        gridElement.classList.add("col-xs-offset-1");
                        isFirstElement = false;
                    }*/
                    break;
                case 6:
                    gridElement.classList.add("col-xs-2");
                    break;
                default:
                    gridElement.classList.add("col-xs-4");
                    if(isFirstElement){
                        gridElement.classList.add("custom-offset");
                        isFirstElement = false;
                    }
                    break;
            }
            gridElement.id = "block" + (dotID);
            dotID++;
            newRow.appendChild(gridElement);
        }
        cont.appendChild(newRow);
    }
}

/*Creates dot-containing div elements and stores them in a 2D array.
 * Each has an x and y attribute that can be used to reference a dot in
 * the array.*/
function make_2D_Array(array, nRows, nCols) {
    var i, j;
    for(i=0;i<nRows;i++){
        var newArray = [];
        array[i] = newArray;
        for(j=0;j<nCols;j++){
            var newDot = document.createElement("div");

            newDot.className = "dot text-center";
            newDot.classList.add(colour);

            newArray[j] = newDot;
            newDot.setAttribute('isVisited','false');
            newDot.setAttribute('x',i);
            newDot.setAttribute('y',j);
        }
    }
    return array;
}

// Sets difficulty for round
function difficulty(nodeCount) {
	var length;
	if (currentRound < 40) {
		numRows = Math.round((3 + (currentRound / 19)));
		numCols = Math.round((3 + (currentRound / 32)));
		length = 3 + ((0.1 * currentRound) - 0.1);
	} else {
		numRows = 5;
		numCols = 4;
		length = 3 + ((0.03 * currentRound) - 0.03);
	}
    if (length > nodeCount) {
        return nodeCount;
    }
    return Math.round(length);
}

/* Any dot that is selected by the user has its x and y coordinates compared to
 * x and y coordinates of points in array (the array to repeat)
 * Comparison takes place every time a dot is selected.
 * If at any time the coordinates do not match, indicate to to the user
 * they done goofed, deduct a life and start a new round.
 * If the user makes no mistakes, indiciate such to the user, increment score,
  * and start a new round*/

function validate(array, userFeedback, dArray){
    var ex, wai;
	
	counter = setTimeout(function() {
		if (gamemode != 1) {
			console.log("TIMESUP");
			if (gamemode == 2) {
				lifePoints = 0;
				updateLives();
				return;
			}
			noErrorsYet = false;
			lifePoints--;
			popupSound.play();
			updateLives();
			userFeedback(false, null);
			return;
		}
	}, ((minutes * 60) * 1100) + (seconds * 1000) + 20);
	
    $(function(){
        $( ".dot" ).bind( "tapone", tapHandler );
        function tapHandler( event ){
			if (!userInput) {
				return;
			}
			disco.pause();
			tapSound.play();
			disco.play();
			
            if($(event.target).hasClass("selected")){
                $( event.target ).removeClass( "selected" );
                console.log("x: " + this.x + ", y:" + this.y);
            } else {
                $( event.target ).removeClass( colour );
                $( event.target ).addClass( "selected" );
            }
        }
    });

    if(notComplete&&noErrorsYet) {
        $(".dot").on("tapone", function () {
			if (!userInput) {
					return;
			}
            ex = $(this).attr("x");
            wai = $(this).attr("y");
            if (notComplete && noErrorsYet) {
                if (ex == array[index].pos.x && wai == array[index].pos.y) {
                    if (index < array.length) {
                        index++;
                        if (index >= array.length) {
							clearTimeout(counter);
							timerPause();
                            notComplete = false;
                            playerScore += currentRound + (Math.round(currentRound * 0.1) * seconds);
                            updateScore();
                            currentRound++;
                            userFeedback(true, dArray[ex][wai]);
                        } 
                    } 
                } else {
					clearTimeout(counter);
					timerPause();
					noErrorsYet = false;
					if (gamemode == 2) {
						for (var c = 0; c < 20; c++) {
							updateTimer();
						}
						if ((seconds + minutes) <= 0) {
						lifePoints = 0;
						}
					} else {
	                    lifePoints--;					
					}
                    updateLives();
                    userFeedback(false, dArray[ex][wai]);
                }
            }
        });
    }
}

/* Displays feedback to user if they got round correct or incorrect.
* */
function userFeedback(bool, lastNode) {
    var dot;
    if (bool) {
        dot = "correct";
    } else {
        dot = "incorrect";
		wrongSound.play();
    }
    if (steveModeEnabled) {
        $(".dot").removeClass("tapped_steve");
    } else {
        $(".dot").removeClass("selected");
    }
    //If user is right, add the class "correct".
    //If user is incorrect, add the class "incorrect."
    $(".dot").addClass(dot);
    if (bool) {
        $(".dot").addClass("good_dot");
    }
    if (!bool) {
        $(lastNode).addClass("wrong_dot");
    }
    setTimeout(function () {
        if (bool) {
            $(".dot").removeClass("good_dot");
        } else {
            $(".dot").removeClass("wrong_dot");
        }
        $(".dot").removeClass(dot);

        if (steveModeEnabled) {
            $(".dot").addClass("steve");
        }
        $(lastNode).removeClass("selected");
        adjustStats(reset);

    }, 800);
}

/*
* Artifact of a structure for the game progression's that was not implemented in
* the prototype. Retained for now so as to not break the game.
* */
function adjustStats(reset){
    //console.log("Entered adjustStats()");
    reset(removeDots);
}

/* Remove dots from grid container. To combine with other functions involved in
starting a new round into a cleaner function later.*/
function reset(removeDots) {
    removeDots();
    resetVals();
    newRound(generateGrid);
}

/* Remove all the child elements of socks, the grid container with a set number
   of columns.
 * */
function removeDots(){
    while(socks.hasChildNodes()){
        socks.removeChild(socks.lastChild);
    }
}

/*Takes the sequence of dots the user must repeat as an argument.
* Briefly changes the colour of each to indicate which dots should be
 * selected in which sequence.*/
function pathDemonstration(arrayToRepeat, validate) {
	userInput = false;
    var pt;
	var blinkTime;
	if (currentRound >= 250) {
		blinkTime = 200;
	} else {
		blinkTime = (500 - (currentRound * 2))
	}
    //For testing
    printPath(arrayToRepeat);
    for (var i = 0; i < arrayToRepeat.length; i++) {
        (function (i) {
            setTimeout(function () {
                pt = arrayToRepeat[i].pos;
                if(steveModeEnabled){
                   dotArray[pt.x][pt.y].classList.add("magenta");
                   dotArray[pt.x][pt.y].classList.remove("black");
               }else{
                    dotArray[pt.x][pt.y].classList.remove(colour);
                   dotArray[pt.x][pt.y].classList.add("selected");
               }
            }, i * blinkTime);
        }(i));

        (function (i) {
            setTimeout(function () {
                pt = arrayToRepeat[i].pos;
				if(steveModeEnabled){
                   dotArray[pt.x][pt.y].classList.add("black");
                   dotArray[pt.x][pt.y].classList.remove("magenta");
               }else{
                   dotArray[pt.x][pt.y].classList.remove("selected");
                    dotArray[pt.x][pt.y].classList.add(colour);
               }
            }, arrayToRepeat.length * blinkTime);
        }(i));
     }
	 setTimeout(function () {
		userInput = true;
	    if (gamemode != 1) {
		timerStart();
		}
	    validate(arrayToRepeat, userFeedback, dotArray);
     }, arrayToRepeat.length * blinkTime);
}

function playAgain() {
    removeDots();
    resetVals();
    play();
}

function resumeGame() {
	counter = setTimeout(function() {
		if (gamemode != 1) {
			console.log("TIMESUP");
			if (gamemode == 2) {
				lifePoints = 0;
				updateLives();
				return;
			}
			noErrorsYet = false;
			lifePoints--;
			updateLives();
			userFeedback(false, null);
			return;
		}
	}, ((minutes * 60) * 1100) + (seconds * 1000) + 20);
	if (gamemode != 1) {
		timerStart();
	}
}

function pauseGame(type) {
    if (userInput) {
        clearTimeout(counter);
        timerPause();
        if (type == 'pause') {
            openPauseScreen();
        } else if (type == 'tutorial') {
            openTutorialScreen();
        }
    }
}

function gameOver() {
    playing = false;
	disco.pause();

    document.getElementById('tutorial1-screen').style.display = "none";
    document.getElementById('tutorial4-screen').style.display = "none";

    $( "#game-screen" ).fadeOut( 1500, function() {
        $('#gameover-screen').fadeIn(1500, function() {});
		badgeChecker(currentRound, lifePoints);
		scoreChecker(playerScore);
		localStorage.setItem("saveFile", JSON.stringify(localSavedFiles));
		updateHighScores();
		disco.CurrentTime=0;
		loseSound.play();
		if (playerScore > 0) {
		var playerName;
		while(true) {
			playerName = prompt("Submit your score by entering your name. (Max 14 Characters)");
			if (playerName == null || playerName.length <= 14) {
				break;
			}
		}
		if (playerName != null) {
			sendScore(gamemode, playerName, playerScore);
		}
	}	
    });
    // add final score
    document.getElementById('final-score').innerHTML = playerScore;
}

function resetVals(){
    noErrorsYet = true;
    notComplete = true;
    index = 0;
}


