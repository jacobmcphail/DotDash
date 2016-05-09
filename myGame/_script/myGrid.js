/*mygrid.js*/

/*Issues to fix:
-Generating grids of any size (more than 3x3)
-Creating a flexible container that accommodates grids of different sizes (right now CSS is formatted so that 3x3 displays nicely with my browser. Anything else and it turns to poop.)
-Can't put the code that appends dots to grid cells in a separate function
-
*/
window.onload = function(){
    
var container = document.getElementById("wrapper");
    var dotArray = [];
    //Maximum number of rows: 5
    var numRows = 5;
    //Maximum number of columns: 4
    var numCols = 4;

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
    /*Attempt 2: not creating a separate function for code that populates grids with dots. THIS WORKS   */
    
    var dotID = 1;
    for(var i=0;i<numRows;i++){
            for(var j=0;j<numCols;j++){ document.getElementById("block"+dotID).appendChild(dotArray[i][j]);
                dotID++;
            }
    }
    
    //Testing custom property
    //document.getElementById("towrite").innerHTML =  getIsVisited(dotArray[0][0]);
    
    //Function responsible for changing the dot's colour when tapped
    $(function(){
        $( ".dot" ).bind( "tap", tapHandler );
        function tapHandler( event ){
            $( event.target ).addClass( "tap" );
        }
    });
    
}

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

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
            console.log(ch);
            ch = String.fromCharCode(ch.charCodeAt(0)+1);
            console.log(ch);

            /*
             if(i%numCols==0){
             gridElement.className = "ui-block-a box";
             } else if (i%numCols==1) {
             gridElement.className = "ui-block-b box";
             } else if (i%numCols==2) {
             gridElement.className = "ui-block-c box";
             }*/

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
        var dotID = 1;
        
        for(i=0;i<nRows;i++){
            var newArray = [];
            array[i] = newArray;
            for(j=0;j<nCols;j++){
        var newDot = document.createElement("div");
        newDot.className = "dot";
        newDot.id = "dot" + dotID;
                dotID++;
                newArray[j] = newDot;
                //Add custom properties to objects
        newDot.setAttribute('isVisited','false');
    
                
            }
        }
        return array;
    }
    


//Returns whether a dot has been visited
    function getIsVisited(element) {
        return element.getAttribute('isVisited');
    }
    
    //String comparison: OH MY GOD IT FINALLY WORKED
    function ifVisited(element) {
        return element=='false';
    }
    
    //Returns the IDs of each dot in an array
    function toStringIds(arr) {
        var i;
        var str = "";
        for(i=0;i<arr.length;i++){
            str = str.concat(arr[i].id + " ");
        }
        return str;
    }
    

//TODO
    //Function that generates path that the user must replicate
    //Illuminate each dot in this game-generated path in sequence
    //Store each dot clicked in an array
    //Compare the user-made path with the game-generated path. Whenever there is deviation, inform the user right away and move on to the next path
