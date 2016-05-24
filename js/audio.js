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

disco.addEventListener('ended', function() {
    this.currentTime = 0;
	this.play();
}, false); 

function toggleSound(){
	var soundVolume;
	if (wrongSound.volume == 0.5) {
		wrongSound.volume = 0.0;
		soundVolume = 0.0;
	} else {
		wrongSound.volume = 0.5;
		soundVolume = 1;
	}
	popupSound.volume = soundVolume;
	yesSound.volume = soundVolume;
	noSound.volume = soundVolume;
	loseSound.volume = soundVolume;
	levelPass.volume = soundVolume;
	tapSound.volume = soundVolume;
}

function toggleMusic(){
	if (disco.volume == 0.4) {
		disco.volume = 0.0;
	} else {
		disco.volume = 0.4;
	}
}



