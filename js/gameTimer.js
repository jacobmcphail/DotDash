/*Handles timers used in Marathon mode and Time Attack mode*/

var inter = 0;
var centiseconds = 0;
var seconds = 0;
var minutes = 0;
var timerOn = false;

function timerStart(){
	if(!timerOn) {
		timerOn = true;
		inter = setInterval(updateTimer,100);
	} 
}

function timerPause(){
	clearInterval(inter);
	timerOn = false;
}

function timerSet(timeMinutes, timerSeconds, timeCentisec){
	minutes = timeMinutes;
	seconds = timerSeconds;
	centiseconds = timeCentisec;
	updateClock()
}

function updateTimer(){
	centiseconds--;
	if(centiseconds < 0){
		seconds--;
		centiseconds = 9;
	} 
	if(seconds < 0){
		minutes--;
		seconds = 59;
	} 
	if (minutes < 0) {
		timerPause();
		centiseconds = 0;
		seconds = 0;
		minutes = 0;
		noErrorsYet = false;
		lifePoints--;
		if(gamemode == 2){
			lifePoints = 0;
		}
		updateLives();
		userFeedback(false, null);
		updateClock();
		return;
	} 
	updateClock();
} 

function timerReduce(){
		centiseconds--;
	if(centiseconds < 0){
		seconds--;
		centiseconds = 9;
	} 
	if(seconds < 0){
		minutes--;
		seconds = 59;
	} 
	if (minutes < 0) {
		timerPause();
		centiseconds = 0;
		seconds = 0;
		minutes = 0;
	} 
	updateClock();
}

function updateClock() {
	if (minutes > 0) {
		if (seconds < 10) {
			$('#timer').text(minutes + ":0" + seconds + ":" + centiseconds);
		} else {
			$('#timer').text(minutes + ":" + seconds + ":" + centiseconds);
		}
	} else {
		$('#timer').text(seconds + ":" + centiseconds);
	}
}
