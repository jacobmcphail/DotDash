/*
panicScript.js
BirdJerky Saturday May 21st/16
==============================
    -Find function calls by ctrl+f-ing "//**panic" in jerkScript.js
		-uncommenting calls to distractDemonstrate and distractValidate functions produces effects that can be seen in all modes of gameplay.
	BASICS:
	-Random number generated returns a number that indexes an ARRAY OF FUNCTIONS defined here:
		-distractDemonstrate[]: 
			holds functions that can be executed during pathDemonstrate
		-distractValidate[]: 
			holds functions that can be executed during Validate()
*/

var panicMode = false;

var distractDemonstrate = [
	backgroundChangeImage,
    diagonalAnimation,
	dotFlash,
	messageFlash,
	rainButter,
	backgroundChange
];

var distractValidate = [
	dotFlash,
    changeDotColour,
	backgroundChangeImage,
	dotContainerText,
	diagonalAnimation,
	messageFlash
];

var timer1 = 0;
var timer2 = 0;
var interval1 = 0;

//------------------------------------//
//***distractDemonstrate Functions***//
//----------------------------------//

/*
2 dots fly at vary speeds in varying directions
*/
function diagonalAnimation() {

    var thiscontainer = document.getElementById("dot-container");
    var dot1 = document.createElement("div");
    dot1.id = "dot1";
    dot1.className = "distraction";
    thiscontainer.appendChild(dot1);

	var dot2 = document.createElement("div");
    dot2.id = "dot2";
    dot2.className = "distraction";
    thiscontainer.appendChild(dot2);

	var dotCount = 2;
	var speedArray = ["fast","medium","slow"];
	
	var disColour = colourArray[randomNum(5)];
    
	while(dotCount>0){
	$("#dot"+dotCount).css('background',disColour);
	
	var topDest = signMultiplier()* randomNum(4)*100;
	var leftDest = signMultiplier()*randomNum(2)*100;
	
	$("#dot"+dotCount).css('top',topDest + 'px');
	$("#dot"+dotCount).css('left',leftDest + 'px');
		
	$("#dot"+dotCount).animate({
				top: leftDest + 'px',
				left: topDest + 'px',
			},speedArray[randomNum(2)]);

	dotCount--;
	}		
}

/* Demo2: dotFlash
A single dot appears in a random place
*/

function dotFlash(){
	var time = ((Math.random()*2)+5) *100;
	var thiscontainer = document.getElementById("dot-container");
	
	var topPos = -randomNum(4)*100;
	var leftPos = 200 + signMultiplier()*randomNum(2)*100;
	
	var thissocks = document.createElement("div");
	thissocks.id = "socks";
	thissocks.className = "distraction";
	
	timer1 = setTimeout(function(){

		thiscontainer.appendChild(thissocks);
		
		var disColour = colourArray[randomNum(5)];
		$(".distraction").css('background',disColour);
		$(".distraction").css('top',topPos+'px');
		$(".distraction").css('left',leftPos+'px');
	
		},time);
	
	timer2 = setTimeout(function(){
		removeDistractions();
	},time + 200);
	
}

//--------------------------------//
//***distractValidate Functions***//
//--------------------------------//

/* Validate1. changeDotColour()
Adds a class to a dot/multiple dots to change its colour or add an image
*/
function changeDotColour() {

    var ptArr;
	var modArray = ["star","music","madSteve","crow","lime","blueish" ,"yellow", "dark", "violet"];
	
	ptArr = Math.random() < 0.5 ? selectSingle() : selectMultiple();
    
    var modSelector = randomNum(7);
	
	distractMod = modArray[modSelector];
	var i;
	for(i = 0; i < ptArr.length; i++){
        var x = ptArr[i].x;
        var y = ptArr[i].y;
        dotArray[x][y].classList.add(distractMod);
		//console.log("Selector: " + modSelector);
    }
}
/*Changes the colour of the background*/
function backgroundChange(){
	var time = ((Math.random())+5) *100;
	var thiscontainer = document.getElementById("dot-container");
	
    var thissocks = document.createElement("div");
    thissocks.id = "socks";
    thissocks.className = "distraction bgDistract";
    
	timer1 = setTimeout(function(){

		thiscontainer.appendChild(thissocks);
		$(".distraction").css('width','100%');
		$(".distraction").css('height','100%');
		$(".distraction").css('position','absolute');	
		$(".distraction").css('-moz-border-radius','0px');
		$(".distraction").css('-webkit-border-radius','0px');
		$(".distraction").css('border-radius','0px');
	
	
		var disColour = colourArray[randomNum(5)];
		$(".distraction").css('background',disColour);
		
	},time);
	
	timer2 = setTimeout(function(){
		removeDistractions();
	},time+150);
}

/*
Make an image flash in the background after a delay
*/

function backgroundChangeImage(){
	
	var imageArray = [
		"food1", "food3", "food5",
		"animal1","animal3",
		"affirmative1", "cool1", "ohno1"
		];
	
	var time = ((Math.random())+5) *100;
	var thiscontainer = document.getElementById("dot-container");
	
    var thissocks = document.createElement("div");
    thissocks.id = "socks";
    thissocks.className = "distraction bgDistract";
    
	timer1 = setTimeout(function(){

		thiscontainer.appendChild(thissocks);
		$(".distraction").css('width','100%');
		$(".distraction").css('height','100%');
		$(".distraction").css('position','absolute');	
		$(".distraction").css('-moz-border-radius','0px');
		$(".distraction").css('-webkit-border-radius','0px');
		$(".distraction").css('border-radius','0px');
	
		$(".distraction").addClass(imageArray[randomNum(11)]);
		
	},time);
	
	timer2 = setTimeout(function(){
		removeDistractions();
	},time+150);
}

/* Validate3: dotContainerText
Flash words behind the dot container
*/
function dotContainerText(){
	var strArray = ["GET TO THE CHOPPER", "RutabAaAga", "Beard of Stars", "DEEP FRY EVERYTHING", "The Controllersphere", "IT HURTS"];
	var string = strArray[randomNum(5)];
	
	var topPos = -170 + (signMultiplier()*50);
	var leftPos = 200 + (signMultiplier()*25);
	
	
	var dCont = document.getElementById("dot-container");
	var textbox = document.createElement("div");
	textbox.className = "distraction flashing";
	dCont.appendChild(textbox);
	
	interval1 = setInterval(function(){
		$(".flashing").css('background','black');
		$(".flashing").css('top', topPos+'px');
		$(".flashing").css('left',leftPos+'px');
		textbox.innerHTML =  string;
		
		timer1 = setTimeout(function(){textbox.innerHTML = "<font color='black'>" + string + "</font>";},300);
	},200);
	
}

/*Briefly flashes a message in a box*/
function messageFlash(){
	var time = ((Math.random()*2)+5) *100;
	var stringArray = [
		"Hey hey Billy can you deep fry Daddy's shirt?", 
		"I've never seen a man eat so many chicken wings", 
		"Help I'm trapped in a box", 
		"Think like a fish", 
		"Suction cups for eyes", 
		"Fish don't swim well", 
		"I'm a bird I'm a bird I'm a bird",
		"I am Skeleton Jelly"
	];
	
	var thiscontainer = document.getElementById("dot-container");
	
    var thissocks = document.createElement("div");
    thissocks.id = "socks";
    thissocks.className = "distraction";
	
	var topPos = -randomNum(3)*100;
	var leftPos = 100 + signMultiplier()*randomNum(2)*100
    var disColour = colourArray[randomNum(5)];
	
	timer1 = setTimeout(function(){
	
		thiscontainer.appendChild(thissocks);		
		$(".distraction").css('background',disColour);
		thissocks.innerHTML = "<br><br><center><b>" + stringArray[randomNum(4)]+ "</b></center>";
		$(".distraction").css('height','100px');
		$(".distraction").css('width','200px');
		$(".distraction").css('top', topPos + 'px');
		$(".distraction").css('left', leftPos + 'px');
	
		},time);
	
	timer2 = setTimeout(function(){
		removeDistractions();
	},time + 200);
}

/*ONE PAT OF BUTTER SLIDING DOWN THE SCREEN AFTER ANOTHER
One slow, one fast, one medium*/

function rainButter(){
	var speedArray = ["fast","medium","slow"];
	var topDest = 200;	
	var leftPos = ((randomNum(3)+1)*100) +50;
	var thiscontainer = document.getElementById("dot-container");
	
	var leftDisplacement = signMultiplier() * ((randomNum(1)+1)*100) + 50;
	var rightDisplacement = -1 * leftDisplacement + 25;
	
    var fastButter = document.createElement("div");
    fastButter.id = "fastButter";
    fastButter.className = "distraction butter";
    thiscontainer.appendChild(fastButter);
	$("#fastButter").css('left',leftPos + 'px');
	
	var medButter = document.createElement("div");
    medButter.id = "medButter";
    medButter.className = "distraction butter";
    thiscontainer.appendChild(medButter);
	$("#medButter").css('left', leftDisplacement + 'px');
	
	var slowButter = document.createElement("div");
    slowButter.id = "slowButter";
    slowButter.className = "distraction butter";
    thiscontainer.appendChild(slowButter);
	$("#slowButter").css('left',rightDisplacement + 'px');
	
	$(".distraction").css('-moz-border-radius','0px');
	$(".distraction").css('-webkit-border-radius','0px');
	$(".distraction").css('border-radius','0px');
		
	$("#fastButter").animate({
				top: topDest + 'px',
			},speedArray[0]);
	
	$("#medButter").animate({
				top: topDest + 'px',
			},speedArray[1]);
			
	$("#slowButter").animate({
				top: topDest + 'px',
			},speedArray[2]);
}

/*
========================
------------------------
HELPER FUNCTIONS
-------------------------
=========================
*/

//Randomly selects a single random dot to be changed.
function selectSingle(){
    var dotCoordsArray = [];
    var x = Math.floor(Math.random()*numRows);
    var y = Math.floor(Math.random()*numCols);
    var dotCoords = new Point(x,y);
    dotCoordsArray.push(dotCoords);
	return dotCoordsArray;
}

//Helper function.
//Randomly selects multiple dots to be changed.
function selectMultiple(){
   
	var patternSelector = randomNum(6);
    var i,j;
    var dotCoordsArray = [];

    switch(patternSelector){
        case 0:	//All dots
			for(i=0; i<numRows; i++){
                for(j=0; j<numCols; j++){
					dotCoordsArray.push(new Point(i,j));
                }
            }
            break;
        case 1:   //X-pattern
            var left = 0, right = numCols-1;
            for(i=0; i<numRows; i++){
                for(j=0; j<numCols; j++){
                    if(j==left || j == right){
                        dotCoordsArray.push(new Point(i,j));
                    }
                }
                left++;
                right--;
            }
            break;
        case 2:     //All border dots
            for(i=0; i<numRows; i++){
                for(j=0; j<numCols; j++){
                    if(i==0 || j==0 || i==numRows-1 || j == numCols-1) {
                        dotCoordsArray.push(new Point(i,j));
                    } else {
                        continue;
                    }
                }
            }
            break;
        case 3:     //Random path
            var nodeArray = [];
            var length = Math.floor(Math.random()*(numCols*numRows - 2));
            nodeArray = runPathFinder(numRows, numCols, 5, true);
            for(i=0;i<nodeArray.length;i++){
                dotCoordsArray.push(new Point(nodeArray[i].pos.x,nodeArray[i].pos.y));
            }
            break;
        case 4:     //Randomly select a single row
		var rowIndex = randomNum(numRows-1);
            for(i = 0; i<numRows; i++){
                for(j = 0; j<numCols; j++){
					if(i!=rowIndex){
						continue;
					}
                    dotCoordsArray.push(new Point(i,j));
                }
            }
            break;
		case 5:     //Randomly select a single column
		var colIndex = randomNum(numCols-1);
            for(i = 0; i<numRows; i++){
                for(j = 0; j<numCols; j++){
					if(j!=colIndex){
						continue;
					}
                    dotCoordsArray.push(new Point(i,j));
                }
            }
            break;
        default:
		var nodeArray = [];
            var length = Math.floor(Math.random()*(numCols*numRows - 2));
            nodeArray = runPathFinder(numRows, numCols, 6, true);
            for(i=0;i<nodeArray.length;i++){
                dotCoordsArray.push(new Point(nodeArray[i].pos.x,nodeArray[i].pos.y));
            }
            break;
    }

    return dotCoordsArray;
}

//Helper function: take the maximum number as a parameter; return a random number between it and 0;
//E.g.: randomNum(4) returns a random number between 0 and 4
function randomNum(max){
	var random = Math.floor(Math.random() * (max+1));
	return random;
}

//Helper function: returns either a 1 or -1
//Not yet testeed
function signMultiplier(){
	var signSelector = Math.random() < 0.5 ? 1 : -1;
	return signSelector;
}


//Call this not only when a round ends but when you leave to the main menu or Game Over
function removeDistractions(){
    $(".distraction").remove();
	$(".dot").removeClass(distractMod);
	if(timer1!=null){
		clearTimeout(timer1);
	}
	if(timer2!=null){
		clearTimeout(timer2);
	}
	if(interval1!=null){
		clearInterval(interval1);
	}
}


/*0. Function that does nothing*/
function nothing(){
}

function panicToggle() {
	if (panicMode){
		panicMode = false;
	} else {
		panicMode = true;
	}
}