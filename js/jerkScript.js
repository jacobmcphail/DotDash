/**
 * Gameplay-related
 * */

/*
Saturday May 14th: VinegarFruit (official Death/Dev Branch)
CHANGES:
    * Commented out addition of Bootstrap for now. Grid is perfectly centered and able to expand just fine without it so far.
    * Provisions for centering the dots when Bootstrap is included remain in the code but are commented out.
    * Now turning off the Steve Mode button clears the high score tables of Steve
KNOWN ISSUES:
    *Issues with Bootstrap
    *   <h2> elements in Options, High Scores, and Badges messed. Need to be overridden manually in css file.
    *   Centering with css does nothing. Dots on game grid misaligned.
    *   */

//Global variables; may relocate in the future
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
//In future versions of the game, maximum numRows = 5 and maximum numRows = 4
var numRows = 3;
var numCols = 3;

var container;
var dotArray = [];
var highscores = ["-----", "scrumcake", "-------", "-------", "-------", "-------", "-------", "-------", "-------"];

var colourArray = ["cyan","orange","green","pink","blue","purple"];
var colour;

$.getScript("js/nuggetScript.js", function(){
//          console.log("ALL YOUR MEAT BYPRODUCTS COMBINED");
});

$.getScript("js/pathGenerator.js", function(){
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
    $("#option-4").on('tapone', function(){
        if(!steveModeEnabled){
            updateHighScores();
        }
    });
    
    $(".mode-select").on('tapone', function(){
        var mode = this.id;
		if(steveModeEnabled){
            steveify();
        }
        console.log("mode selected: " + mode);
        initialize(mode, newRound, removeDots);
    });
	
	$(".cawButton").on('tapone', function(){
        if (steveModeEnabled) {
            var sound = document.getElementById("audio");
            sound.play();

            // Easter Egg: change scores to "Steve"
            var curScores = document.getElementsByClassName("score-text");
            for (var i = 0; i < curScores.length; i++) {
                curScores[i].innerHTML = "Steve";
            }
        }
    });
});

function initialize(gameMode, newRound, removeDots){
    //Initialize global variables depending on mode (currently only one mode)
    container = document.getElementById("dot-container");
    container.classList.add("vertical-center");
    playerScore = 0;
    currentRound = 1;
    lifePoints = 3;
	numRows = 3;
	numCols = 3;
	playing = true;
	userInput = false;
    updateLives();
    updateScore();
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
    console.log("Current round: " + currentRound);

	if (playing) {
		noErrorsYet = true;
		notComplete = true;
		index = 0;
        colour = colourArray[Math.floor(Math.random()*6)];

        //Grid expands at regular intervals
        if(currentRound==5){
            numCols=4;
        }
        if(currentRound==40){
            numRows = 4;
        }
        if(currentRound==60){
            numRows = 5;
        }

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
function difficulty(nodeCount) {
    var length = (nodeCount * 0.35) + ((0.1 * currentRound) - 0.1);
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

    $(function(){
        $( ".dot" ).bind( "tapone", tapHandler );
        function tapHandler( event ){
			if (!userInput) {
				return;
			}
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
                            notComplete = false;
                            playerScore += currentRound;
                            updateScore();
                            currentRound++;
                            userFeedback(true, dArray[ex][wai]);
                        }
                    }
                } else {
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
            }, i * (600 - (currentRound * 2)));
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
			   userInput = true;
            }, arrayToRepeat.length * (600 - (currentRound * 2)));
        }(i));
     }
	 validate(arrayToRepeat, userFeedback, dotArray);
}

// Gameplay-related
function resetGrid(){
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

// Easter Egg: All is Steve Albini; Steve Albini is all
function enableSteveMode() {
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

function steveTap(event) {
    if ($(event.target).hasClass("tapped_steve")) {
        $(event.target).removeClass("tapped_steve");
        $(event.target).addClass("steve");
    } else {
        $(event.target).removeClass("steve");
        $(event.target).addClass("tapped_steve");
    }
}