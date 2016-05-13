/**
 *  
 * */

//Point constructor
function Point(x,y){
    this.x = x;
    this.y = y;
}

var playing = true;
var steveModeEnabled = false;
var noErrorsYet = true;
var notComplete = true;
var index = 0;
var socks;
var playerScore = 0;
var currentRound = 1;
var lifePoints = 3;
var numRows = 3;
var numCols = 3;
var container;
var dotArray = [];
var highscores = ["-----", "scrumcake", "-------", "-------", "-------", "-------", "-------", "-------", "-------"];

$.getScript("js/nuggetScript.js", function(){
//        alert("ALL YOUR MEAT BYPRODUCTS COMBINED");
//          console.log("ALL YOUR MEAT BYPRODUCTS COMBINED");
});

$.getScript("js/PathGenerator.js", function(){
          console.log("Bald kiwi bird");
});

/*arrayToRepeat.push(new Point(0,0));
arrayToRepeat.push(new Point(0,1));
arrayToRepeat.push(new Point(2,2));
arrayToRepeat.push(new Point(2,0));
*/


$(document).ready(function(){
    
    updateHighScores();

    //update high scores
    function updateHighScores() {
        var scoreSpaces = document.getElementsByClassName("score-text");
        for (var i = 0; i < highscores.length; i++) {
            scoreSpaces[i].innerHTML = highscores[i];
        }
    }

    //return scores to normal after steve mode is disabled
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

//Initialize global variables depending on mode
function initialize(gameMode, newRound, removeDots){
    console.log("Entered initialize()");
    container = document.getElementById("dot-container");
    playerScore = 0;
    currentRound = 1;
    lifePoints = 3;
    updateLives();
    updateScore();
    //Score
    //pathLength
    //difficulty
    //Should initialize Socks
    if($('#socksID').length === 0){
        socks = document.createElement("div");
        socks.id = "socksID";
        socks.className = "ui-grid-b gamegrid center";
        container.appendChild(socks);
    }

    if(socks.hasChildNodes()){
            console.log("Socks has children. Must exterminate");
            removeDots();
        }


    newRound(generateGrid);
}

function updateScore() {
    var score = playerScore.toString();
    $('#playerScore').text(score);
}

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

//Start a new round with all dots not selected + a new sequence
function newRound(generateGrid){
	if (playing) {
		console.log("Entered newRound()");

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
    console.log("Entered generateGrid()");

    createGrid(socks,numRows,numCols);

    //main.className = "ui-grid-b gamegrid center";
    /*
        if (numCols==3){
            main.className = "ui-grid-b gamegrid center";
        }
        else if(numCols==4){
            main.className = "ui-grid-c gamegrid center";
        }*/

    dotArray = make_2D_Array(dotArray,numRows,numCols);

    //Place dots generated in make_2D_Array on grid ONLY IF
    //Socks is empty
    var dotID = 1;
    for(var i=0;i<numRows;i++){
        for(var j=0;j<numCols;j++){
            document.getElementById("block"+dotID).appendChild(dotArray[i][j]);
            dotID++;
        }
    }

    var someGrid = new Grid(3,3);
    var arrayToRepeat = runPathFinder(someGrid, difficulty(someGrid.grid.length * someGrid.grid[0].length), true);
   // printPath(arrayToRepeat);
	
//
    $(function(){
        $( ".dot" ).bind( "click", tapHandler );
        //console.log("Entered dot-binding function. Perhaps give it a name.");
        function tapHandler( event ){
            if($(event.target).hasClass("selected")){
                $( event.target ).removeClass( "selected" );
//                console.log("dot unselected");
            } else {
                $( event.target ).addClass( "selected" );
  //              console.log("dot selected");
            }
        }
    });
	if(steveModeEnabled){
		steveify();
	}

	pathDemonstration(arrayToRepeat, validate);
	
    //validate(arrayToRepeat, userFeedback, dotArray);
}

//  $(document).ready(function(){

/* Any dot that is selected by the user has its x and y coordinates compared to
 * x and y coordinates of successive points in arrayToRepeat
 * Comparison takes place every time a dot is selected
 * If the coordinates do not match, output something that is taken as an argument in
 * feedback(boolean) */

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

//Displays feedback to user if they got round correct or incorrect.
//bool = path correct
//lastNode = a dot-containing div?
//If there is a JQuery selector, it fucking does stuff
//regardless of whether there's an explicit function call?
//
function userFeedback(bool, lastNode) {
    console.log("Entered userFeedback()");

    var dot;
    if (bool) {
        dot = "correct";
    } else {
        dot = "incorrect";
    }
    //Problem: Last dot tapped in correct path remains tapped
    //and also retains an X
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

/*This is where you would do things like update score, remove a life,
* */
function adjustStats(reset){
    console.log("Entered adjustStats()");
    reset(removeDots);
}

/**/
function reset(removeDots) {
    console.log("Entered reset()");
    removeDots();
    resetVals();
    newRound(generateGrid);
}


/* Remove all the child elements of socks
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
 As of now, this function assumes numCols is always going to be 3
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
            //Takes a container to hold the grid in as an argument and returns the updated grid.
            cont.appendChild(gridElement);
        }
    }
}


/*Creates 9 button-containing objects
 Fill up each array with an array*/
function make_2D_Array(array, nRows, nCols) {
    var i, j;
    for(i=0;i<nRows;i++){
        var newArray = [];
        array[i] = newArray;
        for(j=0;j<nCols;j++){
            var newDot = document.createElement("div");
            newDot.className = "dot";
            newArray[j] = newDot;
            //Add custom properties to objects
            newDot.setAttribute('isVisited','false');
            newDot.setAttribute('x',i);
            newDot.setAttribute('y',j);
            // console.log("x: " + newDot.getAttribute('x') + "; y: " + newDot.getAttribute('y'));
        }
    }
    return array;
}

//Returns whether a dot has been visited
function getIsVisited(element) {
    return element.getAttribute('isVisited');
}
function ifVisited(element) {
    return element=='false';
}

//It works if it's here
function steveify() {
    $(".dot").addClass("steve black");
    if(!$(".dot").hasClass("bound")){
        $(".dot").bind("click", steveTap);
        $(".dot").addClass("bound");
    }
}


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
        console.log("steveModeEnabled: " + steveModeEnabled);
    });
	
	$(".mode-select").click(function(){
        //Create a non-anonymous jquery function that can be called
        // wherever SteveHeads are needed (for example, when a new grid is created
        //every round
        if(steveModeEnabled){
            steveify();
        }
    });
});

function pathDemonstration(arrayToRepeat, validate) {
    var pt;
    //Testing: print to console the path
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