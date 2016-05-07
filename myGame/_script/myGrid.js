/*mygrid.js*/
window.onload = function(){
    
var container = document.getElementById("wrapper");
    
    //Creates a new <div>
var main = document.createElement("div");
    //<div class = "ui-grid-b gamegrid center">
main.className = "ui-grid-b gamegrid center";
    //Nests this <div> in the <div> referred to by the var "container"
container.appendChild(main);

    var dotArray = [];
    
    //Creates 9 button-containing objects
for(var i = 0; i < 9; i++) {
    var gridElement = document.createElement("div");
    if(i%3==0){
        gridElement.className = "ui-block-a box";
    } else if (i%3==1) {
        gridElement.className = "ui-block-b box";
    } else if (i%3==2) {
        gridElement.className = "ui-block-c box";
    }

    main.appendChild(gridElement);
    
    var newDot = document.createElement("div");
    newDot.className = "dot";
    newDot.id = "dot" + i;
    gridElement.appendChild(newDot);

    //Add custom properties to objects
    newDot.setAttribute('isVisited','false');
    
    //Add each newDot to the array
    dotArray[i] = newDot;
}
    //Testing each function
    document.getElementById("towrite").innerHTML = (dotArray.length) + " Dots " +  toStringIds(dotArray) + ifVisited(getIsVisited(dotArray[0]));
    
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

    //Function responsible for changing the dot's colour when tapped
    $(function(){
        $( ".dot" ).bind( "tap", tapHandler );
        function tapHandler( event ){
            $( event.target ).addClass( "tap" );
        }
    });
    
}