/*Sound effects and music*/

var disco = new Audio('sounds/Disco.mp3'); 
disco.volume = 0.4;
var popupSound = new Audio('sounds/phaserDown2.ogg');
var yesSound = new Audio('sounds/phaserDown1.ogg');
var noSound = new Audio('sounds/phaserDown3.ogg');
var loseSound = new Audio('sounds/you_lose.ogg');
var levelPass = new Audio('sounds/jingles_PIZZA10.ogg');
var tapSound = new Audio('sounds/zap1.ogg');
var wrongSound = new Audio('sounds/wrong.ogg');
wrongSound.volume = 0.5;

function buttonSounds() {
	tapSound.play();
}
