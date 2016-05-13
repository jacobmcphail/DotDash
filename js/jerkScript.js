/**
 * Gameplay-related
 * */

//Point constructor
function Point(x,y){
    this.x = x;
    this.y = y;
}

//Global variables; may relocate in the future
var playing = true;
var steveModeEnabled = false;
var noErrorsYet = true;
var notComplete = true;
var index = 0;
var socks;
var playerScore = 0;
var currentRound = 1;
var lifePoints = 3;
//In future versions of the game, maximum numRows = 5 and maximum numRows = 4
var numRows = 3;
var numCols = 3;
var container;
var dotArray = [];
var highscores = ["-----", "scrumcake", "-------", "-------", "-------", "-------", "-------", "-------", "-------"];

$.getScript("js/nuggetScript.js", function(){
//          console.log("ALL YOUR MEAT BYPRODUCTS COMBINED");
});

$.getScript("js/PathGenerator.js", function(){
          //console.log("Bald kiwi bird");
});

$(document).ready(function(){
    updateHighScores();

    //Update high scores
    function updateHighScores() {
        var scoreSpaces = document.getElementsByClassName("score-text");
        for (var i = 0; i < highscores.length; i++) {
            scoreSpaces[i].innerHTML = highscores[i];
        }
    }

    //return scores to normal after Steve Mode is disabled
    document.getElementById('option-4').onchange = function() {
        if ( document.getElementById('option-4').checked === false ) {
            updateHighScores();
        }
    };
    
    $(".mode-select").click(function(){
        var mode = this.id;
        console.log("mode selected: " + mode);

        initialize(mode, newRound, removeDots);
    });
});

function initialize(gameMode, newRound, removeDots){
    //Initialize global variables depending on mode (currently only one mode)
    container = document.getElementById("dot-container");
    playerScore = 0;
    currentRound = 1;
    lifePoints = 3;
    updateLives();
    updateScore();

    // Socks is a grid element with a fixed number of columns that contains dots.
    // When the game first starts up, create a new element to assign to socks.
    if($('#socksID').length === 0){
        socks = document.createElement("div");
        socks.id = "socksID";
        socks.className = "ui-grid-b gamegrid center";
        container.appendChild(socks);
    }
    /*If there are dots, clear them so they can be filled with new ones next round.
    Although the game currently only creates 3x3 grids, in the future a new grid will
     be generated each round with maximum dimensions determined by difficulty level.
      Will reshuffle ordering of functions to make more efficient
    */
    if(socks.hasChildNodes()){
            removeDots();
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
        gameOver();
    }
}

/* Invoked at the start of every round. Generate a new grid and reset variables*/
function newRound(generateGrid){
	if (playing) {
		noErrorsYet = true;
		notComplete = true;
		index = 0;

		generateGrid(createGrid,make_2D_Array, pathDemonstration);
	}
}

function difficulty(nodeCount) {
    var length = (nodeCount * 0.35) + ((0.1 * currentRound) - 0.1);
    if (length > nodeCount) {
        return nodeCount;
    }
    return Math.round(length);
}

//Create a grid to populate with dots
function generateGrid(createGrid, make_2D_Array, pathDemonstration){
    createGrid(socks,numRows,numCols);

    //In progress: creating a function to expand grid size
    //socks.className = "ui-grid-b gamegrid center";
    /*
        if (numCols==3){
            socks.className = "ui-grid-b gamegrid center";
        }
        else if(numCols==4){
            socks.className = "ui-grid-c gamegrid center";
        }*/

    dotArray = make_2D_Array(dotArray,numRows,numCols);

    //Place dots generated in make_2D_Array
    var dotID = 1;
    for(var i=0;i<numRows;i++){
        for(var j=0;j<numCols;j++){
            document.getElementById("block"+dotID).appendChild(dotArray[i][j]);
            dotID++;
        }
    }

    var someGrid = new Grid(3,3);
    var arrayToRepeat = runPathFinder(someGrid, difficulty(someGrid.grid.length * someGrid.grid[0].length), true);

    $(function(){
        $( ".dot" ).bind( "click", tapHandler );
        function tapHandler( event ){
            if($(event.target).hasClass("selected")){
                $( event.target ).removeClass( "selected" );
            } else {
                $( event.target ).addClass( "selected" );
            }
        }
    });
	if(steveModeEnabled){
		steveify();
	}

	pathDemonstration(arrayToRepeat, validate);
}

/* Any dot that is selected by the user has its x and y coordinates compared to
 * x and y coordinates of points in array (the array to repeat)
 * Comparison takes place every time a dot is selected.
 * If at any time the coordinates do not match, indicate to to the user
 * they done goofed, deduct a life and start a new round.
 * If the user makes no mistakes, indiciate such to the user, increment score,
  * and start a new round*/

function validate(array, userFeedback, dArray){
    console.log("Entered validate()");
    var ex, wai;

    if(notComplete&&noErrorsYet) {
        $(".dot").on("click", function () {
            ex = $(this).attr("x");
            wai = $(this).attr("y");

            if (notComplete && noErrorsYet) {
                if (ex == array[index].pos.x && wai == array[index].pos.y) {
                    if (index < array.length) {
                        console.log("Correct so far; index = " + index);
                        index++;
                        if (index >= array.length) {
                            console.log("All correct!");
                            notComplete = false;
                            playerScore += currentRound;
                            updateScore();
                            currentRound++;
                            userFeedback(true, dArray[ex][wai]);
                        }
                    }
                } else {
                    console.log("Incorrect");
                    noErrorsYet = false;
                    lifePoints--;
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
    console.log("Entered userFeedback()");

    var dot;
    if (bool) {
        dot = "correct";
    } else {
        dot = "incorrect";
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

    }, 1250);
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
    console.log("Entered reset()");
    removeDots();
    resetVals();
    newRound(generateGrid);
}

/* Remove all the child elements of socks, the grid container with a set number
   of columns.
 * */
function removeDots(){
    console.log("Entered removeDots()");
    while(socks.hasChildNodes()){
        console.log("Number of elements in socks: " + socks.childNodes.length);
        socks.removeChild(socks.lastChild);
    }
}

/*
 Create the grid that dots will populate
 As of now, numCols is always going to be 3.
 */

function createGrid(cont, nRows, nCols){
    var totalDots = nRows * nCols;
    var dotID = 1;
    for(var i = 0; i < nRows; i++) {
        var ch = 'a';
        for(var j=0;j<nCols;j++) {
            var gridElement = document.createElement("div");
            gridElement.className = "ui-block-" +ch+ " box";
            ch = String.fromCharCode(ch.charCodeAt(0)+1);
            gridElement.id = "block" + (dotID);
            dotID++;
            cont.appendChild(gridElement);
        }
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
            newDot.className = "dot";
            newArray[j] = newDot;
            newDot.setAttribute('isVisited','false');
            newDot.setAttribute('x',i);
            newDot.setAttribute('y',j);
        }
    }
    return array;
}

//Returns whether a dot has been visited
function getIsVisited(element) {
    return element.getAttribute('isVisited');
}

/*Takes the sequence of dots the user must repeat as an argument.
* Briefly changes the colour of each to indicate which dots should be
 * selected in which sequence.*/
function pathDemonstration(arrayToRepeat, validate) {
    var pt;
    //For testing
    printPath(arrayToRepeat);
    console.log(arrayToRepeat.length);

    for (var i = 0; i < arrayToRepeat.length; i++) {
        (function (i) {
            window.setTimeout(function () {
                pt = arrayToRepeat[i].pos;
                console.log("Selected: " + pt.x + ", " + pt.y);
                if(steveModeEnabled){
                   dotArray[pt.x][pt.y].classList.add("magenta");
                   dotArray[pt.x][pt.y].classList.remove("black");
               }else{
                   dotArray[pt.x][pt.y].classList.add("selected");
               }
            }, i * (600 - (currentRound * 2)));
        }(i));

        (function (i) {
            window.setTimeout(function () {
                pt = arrayToRepeat[i].pos;
                console.log("Unselected: " + pt.x + ", " + pt.y);
				if(steveModeEnabled){
                   dotArray[pt.x][pt.y].classList.add("black");
                   dotArray[pt.x][pt.y].classList.remove("magenta");
               }else{
                   dotArray[pt.x][pt.y].classList.remove("selected");
               }
            }, arrayToRepeat.length * (600 - (currentRound * 2)));
        }(i));
     }
	 validate(arrayToRepeat, userFeedback, dotArray);
}

// Gameplay-related
function resetGrid(){
    console.log("Entered resetGrid()");
    removeDots();
    resetVals();
    openMainMenu();
}

function gameOver() {
    playing = false;
    $( "#game-screen" ).fadeOut( 1500, function() {
        $('#gameover-screen').fadeIn(1500, function() {});
    });

    // add final score
    document.getElementById('final-score').innerHTML = playerScore;
}

function resetVals(){
    noErrorsYet = true;
    notComplete = true;
    index = 0;
}

//Easter Egg: Handles toggling of Steve Mode
$(document).ready(function(){
    $(".cawButton").click(function(){
        if (steveModeEnabled) {
            var sound = document.getElementById("audio");
            sound.play();

            // change scores to "Steve"
            var curScores = document.getElementsByClassName("score-text");
            for (var i = 0; i < curScores.length; i++) {
                curScores[i].innerHTML = "Steve";
            }
        }
        //console.log("steveModeEnabled: " + steveModeEnabled);
    });

    $(".mode-select").click(function(){
        if(steveModeEnabled){
            steveify();
        }
    });
});

// Easter Egg: All is Steve Albini; Steve Albini is all
function enableSteveMode() {
    if (steveModeEnabled == false) {
        steveModeEnabled = true;
    } else {
        steveModeEnabled = false;
        $(".dot").removeClass("steve tapped_steve black bound");
        $(".dot").unbind("click", steveTap);
    }
    console.log("steve-option toggle: " + steveModeEnabled);
}

//Easter Egg: Turns on Steve Mode
function steveify() {
    $(".dot").addClass("steve black");
    if(!$(".dot").hasClass("bound")){
        $(".dot").bind("click", steveTap);
        $(".dot").addClass("bound");
    }
}

function steveTap(event) {
    if ($(event.target).hasClass("tapped_steve")) {
        $(event.target).removeClass("tapped_steve");
        $(event.target).addClass("steve");
        console.log("Untapped");
    } else {
        $(event.target).removeClass("steve");
        $(event.target).addClass("tapped_steve");
        console.log("Tapped");
    }
}