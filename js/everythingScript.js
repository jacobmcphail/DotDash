/**
 * Created by Jnek on 2016-05-11.
 */

var steveModeEnabled = false;
var noErrorsYet = true;
var notComplete = true;
var index = 0;
function openOptions() {
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('options-screen').style.display = "block";
    document.getElementById('return-button').style.display = "block";
    document.getElementById('title').innerHTML = "Options._"
}
function openScores() {
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('badges-screen').style.display = 'none';
    document.getElementById('scores-screen').style.display = "block";
    document.getElementById('return-button').style.display = "block";
    document.getElementById('badges-button').style.display = "block";
    document.getElementById('title').innerHTML = "Scores._"
}
function openBadges() {
    document.getElementById('scores-screen').style.display = 'none';
    document.getElementById('badges-screen').style.display = "block";
    document.getElementById('badge-return-button').style.display = "block";
    document.getElementById('return-button').style.display = "none";
    document.getElementById('title').innerHTML = "Badges._"
}
function openCredits() {
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('credits-screen').style.display = "block";
    document.getElementById('return-button').style.display = "block";
    document.getElementById('title').innerHTML = "DotDash._"
}
function openMainMenu() {
    document.getElementById('options-screen').style.display = 'none';
    document.getElementById('scores-screen').style.display = 'none';
    document.getElementById('credits-screen').style.display = 'none';
    document.getElementById('return-button').style.display = 'none';
    document.getElementById('main-screen').style.display = 'block';
    document.getElementById('title').innerHTML = "DotDash._"
//LeafBunny: hide pause and tutorial buttons when returning to Main Manu
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('title').style.display = 'block';
}
function play() {
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('title').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
}
function badge1() {
    window.alert("get this badge by playing for 100000 hours");
}


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

function resetGrid(){
    console.clear();
    openMainMenu();
    resetVals();
    $(".dot").removeClass("selected");
    if($(".dot").hasClass("tapped_steve")){
        $(".dot").removeClass("tapped_steve");
        $(".dot").addClass("steve");
    }
}
function resetVals(){
    noErrorsYet = true;
    notComplete = true;
    index = 0;
}

//Displays feedback to user if they got round correct or incorrect.
function feedback(bool, lastNode) {
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
    $(".dot").addClass(dot);
    if (lastNode != null) {
        $(lastNode).addClass("wrong_dot");
    }
    setTimeout(function(){
        $(".dot").removeClass("wrong_dot");
        $(".dot").removeClass(dot);
        if(steveModeEnabled) {
            $(".dot").addClass("steve");
        }
    },1500);
}

window.onload = function() {


//LeafBunny: My additions that have nothing to do with dots

//Try to eliminate redunancies
//var dot = $(".dot");

    $(document).ready(function(){
        $(".cawButton").click(function(){
            if (steveModeEnabled == true) {
                var sound = document.getElementById("audio");
                sound.play();
                $(function(){
                    $(".dot").addClass("steve black");
                    if(!$(".dot").hasClass("bound")){
                        $(".dot").bind("click", steveTap);
                        $(".dot").addClass("bound");
                    }
                });
            }
            console.log("steveModeEnabled: " + steveModeEnabled);
        });
    });


    //Container that holds everything.
    var container = document.getElementById("dot-container");
    //Array that holds references to all the dot-containing div elements
    var dotArray = [];
    //Point constructor
    function Point(x,y){
        this.x = x;
        this.y = y;
    }
    //Maximum number of rows: 5
    var numRows = 3;
    //Maximum number of columns: 4
    var numCols = 3;
    //Grid of div containers. Each one will hold a single dot-containing div element.
    var main = document.createElement("div");
    if (numCols==3){
        main.className = "ui-grid-b gamegrid center";
    }
    else if(numCols==4){
        main.className = "ui-grid-c gamegrid center";
    }
    container.appendChild(main);
    main = createGrid(main,numRows,numCols);
    dotArray = make_2D_Array(dotArray,numRows,numCols);

    /* Create div elements containing dots and populate main with them.
     Fill dotArray with these dot-containing divs. */
    var dotID = 1;
    for(var i=0;i<numRows;i++){
        for(var j=0;j<numCols;j++){
            document.getElementById("block"+dotID).appendChild(dotArray[i][j]);
            dotID++;
        }
    }
//----------------------------------------------
//Game playing field is instantiated at this point
//Round start: (nest inside an infinite loop)
//function createPath(){ return arrayToRepeat;} goes here
//function displayPath(arrayToRepeat) goes here
    //********PATH VALIDATION BEGINS HERE*****************

    /*
     var noErrorsYet = true;
     var notComplete = true;
     var index = 0;
    Hardcode a sample array of points that this function
     should compare user input to.
     Once createPath() finished, this compares user input to
     output of createPath()
     */
    var arrayToRepeat = [];
    arrayToRepeat.push(new Point(0,0));
    arrayToRepeat.push(new Point(0,1));
    arrayToRepeat.push(new Point(2,2));
    arrayToRepeat.push(new Point(2,0));
    console.log(arrayToRepeat);

    //Anonymous path validation function goes here
    /* Any dot that is selected by the user has its x and y coordinates compared to
     * x and y coordinates of successive points in arrayToRepeat
     * Comparison takes place every time a dot is selected
     * If the coordinates do not match, output something that is taken as an argument in
     * feedback(boolean) */
    $(document).ready(function(){
        var ex, wai;
        $(".dot").on("click",function(){
            console.log("Tapped: "+ noErrorsYet+", " + notComplete + ", " + index);
            ex = $(this).attr("x");
            wai = $(this).attr("y");

            if(noErrorsYet&&notComplete){
                if(ex==arrayToRepeat[index].x && wai==arrayToRepeat[index].y){
                    if(index<arrayToRepeat.length){
                        console.log("Correct so far " + index);
                        index++;
                        if(index>=arrayToRepeat.length){
                            console.log("All correct!");
                            notComplete = false;
                            feedback(true, null);
                        }
                    }
                }else{
                    console.log("Incorrect");
                    noErrorsYet = false;
                    feedback(false, dotArray[ex][wai]);
                }
                //Not necessary in final version. Just for testing.
            } else if (!noErrorsYet) {
                console.log("You done goofed and can't undo it");
            }
        });
    });
    //function feedback(boolean) goes here
    /*The boolean return value of recordUserInput is used by
     * function feedback(boolean)
     * and turns the entire grid either green (user got it right) if true
     * or red (user done goofed) if false*/
    /*function clearGrid()
     * delete all the child elements of container with the JQuery method empty()*/
    //Function responsible for changing the dot's colour when tapped
    $(function(){
        $( ".dot" ).bind( "click", tapHandler );
        function tapHandler( event ){
            if($(event.target).hasClass("selected")){
                $( event.target ).removeClass( "selected" );
                console.log("dot unselected");
            } else {
                $( event.target ).addClass( "selected" );
                console.log("dot selected");
            }
        }
    });

    /*
     $(function(){
     $(".clearButton").bind("tap", clearAll);
     function clearAll(event){
     $(".dot.selected").removeClass("selected");
     $(".dot.tapped_steve").addClass("steve");
     $(".dot.tapped_steve").removeClass("tapped_steve");
     console.clear();
     resetVals();
     }
     });

     Create the grid that dots will populate
     As of now, this function assumes numCols is always going to be 3
     */
    function createGrid(cont, numRows, numCols){
        var totalDots = numRows * numCols;
        var dotID = 1;
        for(var i = 0; i < numRows; i++) {
            var ch = 'a';
            for(var j=0;j<numCols;j++) {
                var gridElement = document.createElement("div");
                gridElement.className = "ui-block-" +ch+ " box";
                ch = String.fromCharCode(ch.charCodeAt(0)+1);
                gridElement.id = "block" + (dotID);
                dotID++;
                //Takes a container to hold the grid in as an argument and returns the updated grid.
                cont.appendChild(gridElement);
            }
        }
        return cont;
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

}