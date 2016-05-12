/**
 * Created by Jnek on 2016-05-11.
 Stuff related to playing the game itself
 */

//Are vars declared here accessible by everything below? Are these "global variables"?


//What happens if you take everything outside of window.onload?
// How do you make things available only when the game mode is selected?
//Have a button listener here that takes a value associated with each button (get its ID).
// Store this number in a var gameMode, a global variable.

function startGame(){
}

$.getScript("js/nuggetScript.js", function(){
//        alert("ALL YOUR MEAT BYPRODUCTS COMBINED");
});

/*TODO:
* Test the effects of moving things out of the window.onload
* */
window.onload = function() {
    

    //Assign values to global varibles
    function initialize(){
        console.log("Start: "+ noErrorsYet+", " + notComplete + ", " + index);
    }

    initialize();

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
    //console.log(arrayToRepeat);

    validate(arrayToRepeat);
  //  $(document).ready(function(){

    /* Any dot that is selected by the user has its x and y coordinates compared to
     * x and y coordinates of successive points in arrayToRepeat
     * Comparison takes place every time a dot is selected
     * If the coordinates do not match, output something that is taken as an argument in
     * feedback(boolean) */

    function validate(arrayToRepeat){
        var ex, wai;

        if(notComplete&&noErrorsYet) {
            $(".dot").on("click", function () {
                ex = $(this).attr("x");
                wai = $(this).attr("y");

                if (notComplete && noErrorsYet) {
                    if (ex == arrayToRepeat[index].x && wai == arrayToRepeat[index].y) {
                        if (index < arrayToRepeat.length) {
                            console.log("Correct so far; index = " + index);
                            index++;
                            if (index >= arrayToRepeat.length) {
                                console.log("All correct!");
                                notComplete = false;
                                userFeedback(true, dotArray[ex][wai]);
                            }
                        }
                    } else {
                        console.log("Incorrect");
                        noErrorsYet = false;
                        userFeedback(false, dotArray[ex][wai]);
                    }
                }
            });
        }

        }

//    });
    //Create a function that invokes all fcns using CALLBACKS
        /*some_3secs_function(some_value, function() {
         some_5secs_function(other_value, function() {
         some_8secs_function(third_value, function() {
         //All three functions have completed, in order.
         Can you do callbacks using function names
         });
         });
         });
        * 
        *
        * */// init()
        // newRound()
        // feedback(), updateScore(), resetPG()
        //

    function roundOver(){

    }

    //Displays feedback to user if they got round correct or incorrect.
    //bool = path correct
    //lastNode = a dot-containing div?
    //If there is a JQuery selector, it fucking does stuff
    //regardless of whether there's an explicit function call?
    //
    function userFeedback(bool, lastNode) {
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
        if (lastNode != null) {
            $(lastNode).addClass("wrong_dot");
        }

        setTimeout(function(){
            if (bool) {
                $(".dot").removeClass("good_dot");
            } else {
                $(".dot").removeClass("wrong_dot");
            }
            $(".dot").removeClass(dot);

            if(steveModeEnabled) {
                $(".dot").addClass("steve");
            }
        },1500);
        incrementScore();
        reset();
    }

    /* Function in its original form. Editing 5:36AM
    * //Displays feedback to user if they got round correct or incorrect.
     //bool = path correct
     //lastNode = a dot-containing div?
     function userFeedback(bool, lastNode) {
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
     if (lastNode != null) {
     $(lastNode).addClass("wrong_dot");
     }

     setTimeout(function(){
     if (bool) {
     $(".dot").removeClass("good_dot");
     } else {
     $(".dot").removeClass("wrong_dot");
     }
     $(".dot").removeClass(dot);

     if(steveModeEnabled) {
     $(".dot").addClass("steve");
     }
     },1500);
     incrementScore();
     resetPG();
     }
    * */

    function incrementScore(){

    }
    function reset() {
        console.clear();
        resetVals();
        }

/*
    function resetPG() {
        console.clear();
        resetVals();
        $(".dot").removeClass("selected");
        console.log("Should not have a remaining yellow dot dammit");
        if ($(".dot").hasClass("tapped_steve")) {
            $(".dot").removeClass("tapped_steve");
            $(".dot").addClass("steve");
        }
    }*/
    //Track and display score
    function trackScore(){

    }

    /*
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
    }); */

    //Function responsible for changing the dot's colour when tapped
    $(function(){
        $( ".dot" ).bind( "click", tapHandler );
        function tapHandler( event ){
            if($(event.target).hasClass("selected")){
                $( event.target ).removeClass( "selected" );
                //console.log("dot unselected");
            } else {
                $( event.target ).addClass( "selected" );
                //console.log("dot selected");
            }
        }
    });

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