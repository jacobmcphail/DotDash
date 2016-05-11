/*myScript.js
*
* */

window.onload = function() {
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
    var noErrorsYet = true;
    var notComplete = true;
    var index = 0;
    /*Hardcode a sample array of points that this function
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
        $(".dot").on("tap",function(){
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
                        }
                    }
                }else{
                    console.log("Incorrect");
                    noErrorsYet = false;
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
        $( ".dot" ).bind( "tap", tapHandler );
        function tapHandler( event ){
            if($(event.target).hasClass("selected")){
                $( event.target ).removeClass( "selected" );
            } else {
                $( event.target ).addClass( "selected" );
            }
        }
    });

    $(function(){
        $(".clearButton").bind("tap", clearAll);
        function clearAll(event){
            $(".dot.selected").removeClass("selected");
            $(".dot.tapped_steve").addClass("steve");
            $(".dot.tapped_steve").removeClass("tapped_steve");
            console.clear();
            resetVals();
        }

    //helper function that resets things
        function resetVals(){
        noErrorsYet = true;
        notComplete = true;
        index = 0;
        }
    });

    //stevify transplantd into index.html
    /*
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
//End of the function called by window.onload


//TODO
//Function that generates path that the user must replicate
//Illuminate each dot in this game-generated path in sequence
//Store each dot clicked in an array
//Compare the user-made path with the game-generated path. Whenever there is deviation,
// inform the user right away and move on to the next path
/*
//Reset playing field.
function clearAll(){
$(".dot.selected").removeClass("selected");
$(".dot.tapped_steve").addClass("steve");
$(".dot.tapped_steve").removeClass("tapped_steve");
}*/
//Testing custom property
//document.getElementById("towrite").innerHTML = getIsVisited(dotArray[0][0]);
/*
Brainstorming functions:
-function displayPath(array): given an array of dots, have the dots light up one after another
-function recordUserPath(): store dots tapped by user as a path and continuously compare with the
path generated by the game. If there is any deviation, immediately display a big honking X and
start another round
-Function that makes dots a random color
-Create grid should have something that decides number of rows and columns with upper limit for both
determined by difficulty level
*/