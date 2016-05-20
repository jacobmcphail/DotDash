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

var disco = new Audio('sounds/Disco.mp3'); 
var popupSound = new Audio('sounds/phaserDown2.ogg');
var yesSound = new Audio('sounds/phaserDown1.ogg');
var noSound = new Audio('sounds/phaserDown3.ogg');
var loseSound = new Audio('sounds/you_lose.ogg');
var levelPass = new Audio('sounds/jingles_PIZZA10');
var tapSound = new Audio('sounds/zap1.ogg');
var wrongSound = new Audio('sounds/wrong.ogg');



$.getScript("js/gameTimer.js", function(){
//          console.log("ALL YOUR MEAT BYPRODUCTS COMBINED");
});

$.getScript("js/nuggetScript.js", function(){
//          console.log("ALL YOUR MEAT BYPRODUCTS COMBINED");
});

$.getScript("js/pathGenerator.js", function(){
          //console.log("Bald kiwi bird");
});

$.getScript("js/online.js", function(){
          //console.log("Bald kiwi bird");
});

$.getScript("js/touching.js", function(){
    //console.log("Bald kiwi bird");
});

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
    return (cookieEnabled)?true:showCookieFail();
}

function showCookieFail(){
  console.log("NO COOKIES");
  window.alert("WARNING: Cookies must be enabled to play this game. Enable cookies then refresh the game.");
}

function clearSave() {
	localSavedFiles = null;
	localStorage.setItem("saveFile", JSON.stringify(localSavedFiles));
	gameSetup();
}

//Update high scores
function updateHighScores() {
    for (var i = 11, q = 0; i < 14; i++, q++) {
		$("#localHS-" + q).text(localSavedFiles[i]);
    }
}


$(document).ready(function(){

    //return scores to normal after Steve Mode is disabled
    $("#option-4").on('tapone', function(){
        if(!steveModeEnabled){
            updateHighScores();
        }
    });
    
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
	
	$(".cawButton").on('tapone', function(){
        if (steveModeEnabled) {
            var sound = document.getElementById("audio");
            sound.play();
			if (!localSavedFiles[1]) {
				window.alert("Badge Unlocked! Activated Steve mode.");
				localSavedFiles[1] = true;
				localStorage.setItem("saveFile", JSON.stringify(localSavedFiles));
				updateBadges();
			}
            // Easter Egg: change scores to "Steve"
           /* var curScores = document.getElementsByClassName("score-text");
            for (var i = 0; i < curScores.length; i++) {
                curScores[i].innerHTML = "Steve";
            }*/
        }
    });
	
/*	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		function reorient(e) {
		var portrait = (window.orientation % 180 == 0);
		$("body > div").css("-webkit-transform", !portrait ? "rotate(-90deg)" : "");
		}
		window.onorientationchange = reorient;
		window.setTimeout(reorient, 0);
	}	*/
	
	$(".cb-enable").click(function(){
        var parent = $(this).parents('.switch');
        $('.cb-disable',parent).removeClass('selected');
        $(this).addClass('selected');
        $('.checkbox',parent).attr('checked', true);
		document.getElementById('local-scores').style.display = 'block';
		document.getElementById('online-scores').style.display = 'none';
    });
    $(".cb-disable").click(function(){
        var parent = $(this).parents('.switch');
        $('.cb-enable',parent).removeClass('selected');
        $(this).addClass('selected');
        $('.checkbox',parent).attr('checked', false);
		document.getElementById('local-scores').style.display = 'none';
		document.getElementById('online-scores').style.display = 'block';
		printOnlineScores();
    });
	
});

function printOnlineScores() {
	var leaderboard = document.getElementById("online-scores");
	var databus;
	leaderboard.innerHTML = '<br><br><br><br><br><h2>Loading...</h2>';
	getOutput(databus).success(function (data) {
		console.log(data);
	//	data = JSON.parse(data);
		leaderboard.innerHTML = '<h1>Leaderboard</h1>';
		leaderboard.innerHTML += '<h2>Marathon</h2>';
		var indexDB = 0;
		for(var i = 1; i <= 10; i++, indexDB++){
			leaderboard.innerHTML += '<p>' + i + ': ' + data[indexDB]["mName"] + ' - ' + data[indexDB]["mScore"] + '</p>';
		}
		leaderboard.innerHTML += '<br><h2>No Timer</h2>';
		for(var i = 1; i <= 10; i++, indexDB++){
			leaderboard.innerHTML += '<p>' + i + ': ' + data[indexDB]["uName"] + ' - ' + data[indexDB]["uScore"] + '</p>';
		}
		leaderboard.innerHTML += '<br><h2>Time Attack</h2>';
		for(var i = 1; i <= 10; i++, indexDB++){
			leaderboard.innerHTML += '<p>' + i + ': ' + data[indexDB]["tName"] + ' - ' + data[indexDB]["tScore"] + '</p>';
		}
		leaderboard.innerHTML += '<br>';
	}).fail(function () {
		leaderboard.innerHTML = '<br><br><br><h2>Could not get online leaderboard!</h2>';		
	});
}

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

//Returns whether a dot has been visited
function getIsVisited(element) {
    return element.getAttribute('isVisited');
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
		var j_notation =
		{
		"mode": gamemode,
		"player_name": playerName, 
		"player_score": playerScore,
		}; 


		$.ajax({
			url: "http://www.crowbot.co/php/dirtyshoes.php",
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(j_notation),
			dataType: 'json'
		});
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

// Easter Egg: All is Steve Albini; Steve Albini is all
function enableSteveMode() {
	tapSound.play();
    if (steveModeEnabled == false) {
        steveModeEnabled = true;
    } else {
        steveModeEnabled = false;
        $(".dot").removeClass("steve tapped_steve black bound");
        $(".dot").unbind("tapone", steveTap);
    }
    console.log("steve-option toggle: " + steveModeEnabled);
}

//Easter Egg: Turns on Steve Mode
function steveify() {
    $(".dot").addClass("steve black");
    if(!$(".dot").hasClass("bound")){
        $(".dot").bind("tapone", steveTap);
        $(".dot").addClass("bound");
    }
}

function buttonSounds() {
	tapSound.play();
}

function steveTap(event) {
    if(userInput){
        if ($(event.target).hasClass("tapped_steve")) {
            $(event.target).removeClass("tapped_steve");
            $(event.target).addClass("steve");
        } else {
            $(event.target).removeClass("steve");
            $(event.target).addClass("tapped_steve");
        }
    }
}

function scoreChecker(playerScore) {
	switch(gamemode) {
		case 0:
			if (playerScore > localSavedFiles[11]) {
				window.alert("New HighScore in marathon mode!");
				localSavedFiles[11] = playerScore;
				return true;
			}
			break;
		case 1: 
			if (playerScore > localSavedFiles[12]) {
				window.alert("New HighScore in no-time mode!");
				localSavedFiles[12] = playerScore;
				return true;
			}
			break;
		case 2:
			if (playerScore > localSavedFiles[13]) {
				window.alert("New HighScore in time attack mode!");
				localSavedFiles[13] = playerScore;
				return true;
			}
			break;
		default:
			window.alert("YOU SHOULD NOT SEE THIS!");
	}
	return false;
}

// Checks to see if player has unlocked any new badges
function badgeChecker(currentRound, lifePoints) {
		switch(gamemode){
			case 0:
				if (currentRound >= 40 && !localSavedFiles[9] ) {
					window.alert("Badge Unlocked! Get to level 40 in no-time mode.");
					localSavedFiles[9] = true;
					console.log("UNLOCK: Get to level 30 in marathon mode");
				}
				if (currentRound >= 60 && lifePoints >= 3 && !localSavedFiles[6] ) {
					window.alert("Badge Unlocked! Get to level 60 in marathon mode with all lives.");
					localSavedFiles[6] = true;
					console.log("UNLOCK: Get to level 60 in marathon mode with all lives");
				}
				if (currentRound >= 60 && !localSavedFiles[3] ) {
					window.alert("Badge Unlocked! Get to level 60 in marathon mode.");
					localSavedFiles[3] = true;
					console.log("UNLOCK: Get to level 60 in marathon mode");
				}
				break;
			case 1:
				if (currentRound >= 40 && !localSavedFiles[8] ) {
					window.alert("Badge Unlocked! Get to level 40 in no-time mode.");
					localSavedFiles[8] = true;
					console.log("UNLOCK: Get to level 30 in marathon mode");
				}
				if (currentRound >= 60 && lifePoints >= 3 && !localSavedFiles[5] ) {
					window.alert("Badge Unlocked! Get to level 60 in no-time mode with all lives.");
					localSavedFiles[5] = true;
					console.log("UNLOCK: Get to level 50 in marathon mode with all lives");
				}
				if (currentRound >= 60 && !localSavedFiles[2] ) {
					window.alert("Badge Unlocked! Get to level 60 in no-time mode.");
					localSavedFiles[2] = true;
					console.log("UNLOCK: Get to level 60 in marathon mode");
				}
				break;
			case 2:
				if (currentRound >= 20 && !localSavedFiles[4] ) {
					window.alert("Badge Unlocked! Get to level 20 in time attack mode.");
					localSavedFiles[4] = true;
					console.log("UNLOCK: Get to level 20 in time attack mode");
				}
				if (currentRound >= 20 && lifePoints == -1 && !localSavedFiles[7] ) {
					window.alert("Badge Unlocked! Get to level 20 in time attack mode without a mistake.");
					localSavedFiles[7] = true;
					console.log("UNLOCK: Get to level 20 in time attack mode without a mistake");
				}
				if (currentRound >= 30 && !localSavedFiles[10] ) {
					window.alert("Badge Unlocked! Get to level 30 in time attack mode.");
					localSavedFiles[10] = true;
					console.log("UNLOCK: Get to level 30 in time attack mode");
				}
				break;
			default:
				window.alert("YOU SHOULD NOT SEE THIS!");
		}
	updateBadges();
}

// Updates the badges in the badge menu
function updateBadges() {
	for (var bIndex = 1; bIndex <= 10; bIndex++) {
		if (localSavedFiles[bIndex]) {
			document.getElementById("badge" + bIndex).src="images/medal2.png";
		} else {
			document.getElementById("badge" + bIndex).src="images/locked.png";
		} 
	} 
}
