/*mygrid.js*/
window.onload = function(){
    
var container = document.getElementById("wrapper");
    
var main = document.createElement("div");
main.className = "ui-grid-b gamegrid center";
container.appendChild(main);

    var dotArray = [];
    
    /*Separate out into a different function that takes row and column sizes as arguments
    As of now, this function assumes numCols is always going to be 3
    */
    
    function createGrid(cont,numRows,numCols){
        
    var totalDots = numRows * numCols;
    for(var i = 0; i < totalDots; i++) {
    var gridElement = document.createElement("div");
    //How to accommodate numCols >3
        if(i%numCols==0){
            gridElement.className = "ui-block-a box";
        } else if (i%numCols==1) {
            gridElement.className = "ui-block-b box";
        } else if (i%numCols==2) {
            gridElement.className = "ui-block-c box";
        }
        gridElement.id = "block"+i;
        
        //Takes a container to hold the grid in as an argument and returns the updated grid.
        cont.appendChild(gridElement);
        
        }
        return cont;
    }
    

    main = createGrid(main,3,3);
    
    //Creates 9 button-containing objects
    //Fill up each array with an array
    dotArray = make_2D_Array(dotArray,3,3);

    function make_2D_Array(array, nRows, nCols) {
        var i, j;
        
        for(i=0;i<nRows;i++){
            var newArray = [];
            array[i] = newArray;
            for(j=0;j<nCols;j++){
        var newDot = document.createElement("div");
        newDot.className = "dot";
        newDot.id = "dot" + (i*j);
                newArray[j] = newDot;
                
            }
        }
        return array;
    }
    
    //Testing make_2D_Array function
    document.getElementById("towrite").innerHTML = (dotArray.length) + " Dots ";
    
    
/*Function call would look like fill_grid(dotArray,main);*/    
    function fill_Grid(array, mainDiv){
        var numRows = array.length;
        var numCols = array[0].length;
        var i, j;
        for(i=0;i<numRows;i++){
            for(j=0;j<numCols;j++){
                var dotToAdd = array[i][j];
                
                
                //SAVEPOINT: 12:56 Nothing broken yet and not done this at all. Need to getElements by Id in order to assign the right dots to the right grid elements. 
            }
        }
        
    }

    //Add custom properties to objects
    //newDot.setAttribute('isVisited','false');
    
    
    //TODO
    //Function that generates path that the user must replicate
    //Illuminate each dot in this game-generated path in sequence
    //Store each dot clicked in an array
    //Compare the user-made path with the game-generated path. Whenever there is deviation, inform the user right away and move on to the next path

    //Function responsible for changing the dot's colour when tapped
    $(function(){
        $( ".dot" ).bind( "tap", tapHandler );
        function tapHandler( event ){
            $( event.target ).addClass( "tap" );
        }
    });
    
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
    