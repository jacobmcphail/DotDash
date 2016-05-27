/*
=======================================================
jerkScript.js
 Gameplay-related
=======================================================
*/

//Global variables

/*Game mode: 
	0 = Marathon
	1 = Sudden Death
	2 = Time Attack
*/
var gamemode;
/*True when player is playing; false when Game Over. */
var playing = false;
/*When false, user cannot select anything. */
var userInput = true;
/*Container that holds socks. */
var container;
/*Grid container with dimensions determined by difficulty; each grid element holds a div container that holds a dot. */
var socks;
/*Dots are div elements with attributes (x- and y- coordinates) 
Every round, dots are created, appended to socks, and stored in dotArray. */
var dotArray = [];
/*panic: holds the class name that is added to dots in order to modify them.*/
var distractMod = "plain";
/*Holds possible colours of dots. Random colour chosen every round*/
var colourArray = ["cyan","orange","green","pink","blue","purple"];
var colour;

/*
Variables that are reset every game
	playerScore: player's score
	currentRound: current round of gameplay
	lifePoints: number of lives/chances to make mistakes
	notComplete: if true, the user has yet to replicate the path in its entirety. If false, the user has replicated the path without making a mistake.
	allLives: value for no mistake badges
*/
var playerScore;
var currentRound;
var lifePoints;
var notComplete;
var allLives;

/*
Variables that are reset every round.
	numRows: Number of rows in grid of dots. Maximum: 4
	numCols: Number of columns in grid of dots. Maximum: 4
	index: During Validate() indexes the array that holds the sequence of dots to repeat; used to compare the dot each user selects.
	noErrorsYet: if true, the user has not yet made a mistake. If false, the player loses the round.
*/
var numRows;
var numCols;
var index;
var noErrorsYet;

/*Locally-stored files with login information and user data retrieved from database.*/
var localSavedFiles;

/*Imported JavaScript files*/
$.getScript("js/gameTimer.js", function(){});
$.getScript("js/nuggetScript.js", function(){});
$.getScript("js/pathGenerator.js", function(){});
$.getScript("js/badges.js", function(){});
$.getScript("js/audio.js", function(){});
$.getScript("js/leaderboard.js", function(){});
$.getScript("js/steve.js", function(){});
$.getScript("js/user.js", function(){});
$.getScript("js/panicScript.js", function(){});

/*Displays splash screen, checks for cookies, warns user if cookies are disabled, creates cookies if they don't exist, and retrieves data if user is already logged in*/
function gameSetup() {
    $('#title').css("display", "none");
    document.getElementById('splash-screen').style.display = 'block';
    setTimeout(function() {
        $('#splash-screen').fadeOut(800, function() {});
    }, 1100);

    setTimeout(function() {
        $("#main-screen").fadeIn(800, function() {});
        $('#title').fadeIn(800, function() {});
    }, 1800);

    checkCookie();
	localSavedFiles = JSON.parse(localStorage.getItem("saveFile"));
	if (localSavedFiles == null) {
		localSavedFiles = [true, null, null];
		localStorage.setItem("saveFile", JSON.stringify(localSavedFiles));
	} else {
		if (localSavedFiles.length != 3) {
            localSavedFiles = null;
            window.alert("There was a problem with your save! Creating new save file.");
            localSavedFiles = [true, null, null];
			playerData = [false, false, false, false, false, false, false, false, false, false, 0, 0, 0];
			localStorage.setItem("saveFile", JSON.stringify(localSavedFiles));
		}
	}
	getPlayerData();
	document.getElementById('local-scores').style.display = 'block';
	document.getElementById('online-scores').style.display = 'none';
	$('input[type=checkbox]').each(function() { 
        this.checked = true; 
	}); 
	$('#option-3').removeAttr('checked');
	$('#option-P').removeAttr('checked');
	$("#title").text('DotDash._');
	
	if(localSavedFiles[1]!=null){
		$(".username-display").text("Current user: " + localSavedFiles[1]);
	}
}

function checkCookie(){
    var cookieEnabled=(navigator.cookieEnabled)? true : false;
    if (typeof navigator.cookieEnabled=="undefined" && !cookieEnabled){ 
        document.cookie="testcookie";
        cookieEnabled=(document.cookie.indexOf("testcookie")!=-1)? true : false;
    }
    if (!cookieEnabled) {
	window.alert("WARNING: Cookies must be enabled to play this game. Enable cookies then refresh the game.");
	}
}

/*Prompts for confirmation to delete player's records.*/
function clearSaveConfirmation() {
    popup('resetSave');
}

/*Clears data in player's records.*/
function resetSave() {
	playerData = [false, false, false, false, false, false, false, false, false, false, 0, 0, 0];
	localStorage.setItem("saveFile", JSON.stringify(localSavedFiles));

	updateSave();
	
	updateBadges();
	updateHighScores();	

    document.getElementById('popup-yes-button').style.display = 'none';
    document.getElementById('popup-no-button').style.display = 'none';
    document.getElementById('popup-text').innerHTML = 'Save Cleared';
    $('#overlay-popup').delay(600).fadeOut(300);
}

/*
Invoked at the start of each game. Initializes global variables, creates the playing field.
*/
function initialize(gamemode, newRound, removeDots){
	resetVals();
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
	allLives = true;
	if (gamemode == 1) {
		document.getElementById('timer-bar').style.visibility='hidden';
		lifePoints = 1;
	} else {
		document.getElementById('timer-bar').style.visibility='visible'; 
	}
	updateLives();
    updateScore();
	switch(gamemode) {
		case 0:
			timerSet(0, 10, 0);
			break;
		case 1: 
			timerSet(0, 0, 0);
			break;
		case 2:
			timerSet(2, 0, 0);
			break;
		default:
			window.alert("YOU SHOULD NOT SEE THIS!");
		}
	disco.play();
    newRound(generateGrid);
}

/*Updates score on the bottom of gameplay screen*/
function updateScore() {
    var score = playerScore.toString();
    $('#playerScore').text(score);
}

/*Manages player lives during gameplay*/
function updateLives() {
    var lifeString = '';
    for (var life = lifePoints; life > 0; life--) {
        lifeString += '<img src="images/hud_heartFull.png"/>';
    }
    $('#lives-bar').html(lifeString);

    if (lifePoints == 0) {
        gameOver();
		disco.currentTime = 0;
    }
}

/* Invoked at the start of every round. Generate a new grid and reset variables*/
function newRound(generateGrid){
	$("#timer-bar").css("background-color", "#32CD32");
	if (playing) {
		if (gamemode == 0) {
			timerSet(0, 10, 0);
		}
		noErrorsYet = true;
		notComplete = true;
		index = 0;
        colour = colourArray[Math.floor(Math.random()*6)];

        //Create a new socks every time a new round starts
        // Socks is a grid element with a fixed number of columns that contains dots.
  
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
		generateGrid(createGrid,make_2D_Array, pathDemonstration);
	}
}

/*Create a grid to populate with dots*/
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

    var arrayToRepeat = runPathFinder(numRows, numCols, difficulty(numRows * numCols));
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

/*Creates dot-containing div elements and stores them in a 2D array. Each has an x and y attribute that can be used to reference a dot in the array.*/
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

/* Sets difficulty for round. */
function difficulty(nodeCount) {
	var length;
	if (currentRound < 30) {
		numRows = Math.round((3 + (currentRound / 30)));
		numCols = Math.round((3 + (currentRound / 40)));
		length = 3 + ((0.1 * currentRound) - 0.1);
	} else {
		numRows = 4;
		numCols = 4;
		length = 3 + ((0.11 * currentRound) - 0.11);
	}
    if (length > nodeCount) {
        return nodeCount;
    }
    return Math.round(length);
}

/* 
A dot selected by the user has its x and y coordinates compared to the x and y coordinates in an array of points that represents the path to repeat. Comparison takes place every time a dot is selected.
*/

function validate(array, userFeedback, dArray){
    var ex, wai;
    //**panic
    if(panicMode){
		removeDistractions();
		distractValidate[randomNum(5)]();
	}

	$(".dot").removeClass("fade");
	
	$(function(){
        $( ".dot" ).bind( "tapone", tapHandler );
        function tapHandler( event ){
			if (!userInput) {
				return;
			}
			tapSound.play();
			
            if($(event.target).hasClass("selected")){
                $( event.target ).removeClass( "selected" );
            } else {
                $( event.target ).removeClass( colour );
                //panic
                $( event.target).removeClass(distractMod);
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
                    //Player has not yet made a mistake
					if (index < array.length) {
                        index++;
						//Player successfully cleared round
                        if (index >= array.length) {
							userInput = false;
							levelPass.play();
							timerPause();
                            notComplete = false;
							if(gamemode == 2){
								playerScore += currentRound + (Math.round(currentRound * 0.1) * (minutes * 10));
							} else {
								playerScore += currentRound + (Math.round(currentRound * 0.1) * (seconds));
							}
                            updateScore();
                            currentRound++;
                            userFeedback(true, dArray[ex][wai]);
                        } 
                    } 
				//Player goofed
                } else {
					userInput = false;
					timerPause();
					noErrorsYet = false;
					if (gamemode == 2) {
						$("#timer-bar").css("background-color", "red");
						if(currentRound < 20){
							allLives = false;
						}
						//Deducting time from the timer
						for (var c = 0; c < 200; c++) {
							timerReduce();
						}
						if ((seconds + minutes + centiseconds) <= 0) {
						lifePoints = 0;
						}
					} else {
						if(currentRound < 60){
							allLives = false;
						}
	                    lifePoints--;					
					}
                    updateLives();
                    userFeedback(false, dArray[ex][wai]);
                }
            }
        });
    }
}

/* 
Indicates to user whether they passed a round or made a mistake.
*/
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
		$(".dot").removeClass("selected");
    } else {
        $(".dot").removeClass("selected");
    }
	
    $(".dot").addClass(dot);
    if (bool) {
        //panic
        $(".dot").removeClass(distractMod);
        $(".dot").addClass("good_dot");
    }
    if (!bool) {
        //panic
        $(".dot").removeClass(distractMod);
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
		
		reset(removeDots);

    }, 800);
}

/* 
Resets global variables for the start of a new round.
*/
function reset(removeDots) {
	
	//panic
    removeDistractions();
    removeDots();
    resetVals();
    newRound(generateGrid);
}

/* 
Remove all the child elements of socks, the grid container
*/
function removeDots(){
    while(socks.hasChildNodes()){
        socks.removeChild(socks.lastChild);
    }
}

/*
Takes the sequence of dots the user must repeat as an argument. Briefly changes the colour of each to indicate which dots should be selected in which sequence.*/
function pathDemonstration(arrayToRepeat, validate) {
	
	//**panic
	if(panicMode){
		distractDemonstrate[randomNum(4)]();
	}
    var pt;
	var blinkTime;
	if (currentRound >= 250) {
		blinkTime = 200;
	} else {
		blinkTime = (500 - (currentRound * 2))
	}

	$(".dot").addClass("fade");
    for (var i = 0; i < arrayToRepeat.length; i++) {
        (function (i) {
            setTimeout(function () {
                pt = arrayToRepeat[i].pos;
				dotArray[pt.x][pt.y].classList.remove("fade");
                if(steveModeEnabled){
                   dotArray[pt.x][pt.y].classList.add("steve-glow");
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
                   dotArray[pt.x][pt.y].classList.remove("steve-glow");
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
	//panic
    removeDistractions();
    removeDots();
    resetVals();
    play();
}

function resumeGame() {
	if (gamemode != 1) {
		timerStart();
	}
}

function pauseGame(type) {
    if (userInput) {
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

    $( "#game-screen" ).fadeOut( 1500, function() {
        $('#gameover-screen').fadeIn(1500, function() {});
		
        removeDistractions();

        scoreChecker(playerScore);


        badgeChecker(currentRound, allLives);
		console.log(achievements);
        onlineBadgeChecker(playerScore);
		console.log(achievements);
        displayBadges();

        disco.CurrentTime=0;
        loseSound.play();
        if (playerScore > 0) {
            if (localSavedFiles[1] != null && localSavedFiles[2] != null) {
                sendScore(gamemode, localSavedFiles[1], playerScore);
            }
        }
    });
    document.getElementById('final-score').innerHTML = playerScore;
}

/*Resets global variables associated with user input*/
function resetVals(){
    document.getElementById('highscore-message-container').style.display = 'none';
    document.getElementById('badge-message-container').style.display = 'none';
    offlineBadgeLoaded = false;
    onlineBadgeLoaded = false;
    $('#badge-img-container').empty();
	achievements = [];
    noErrorsYet = true;
    notComplete = true;
    index = 0;
}