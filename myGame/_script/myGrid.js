/*mygrid.js*/
window.onload = function(){
    
var container = document.getElementById("wrapper");
    
    //Creates a new <div>
var main = document.createElement("div");
    //<div class = "ui-grid-b gamegrid center">
main.className = "ui-grid-b gamegrid center";
    //Nests this <div> in the <div> referred to by the var "container"
container.appendChild(main);

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
    gridElement.appendChild(newDot);
}
    
    /*    
    //Add custom properties to objects
    
    aButton.setAttribute('isVisited',false);*/

    //Function responsible for tap-responsiveness
    $(function(){
        $( ".dot" ).bind( "tap", tapHandler );
        function tapHandler( event ){
            $( event.target ).addClass( "tap" );
        }
    });
    
}