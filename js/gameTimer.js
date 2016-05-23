/*Handles timers used in Marathon mode and Time Attack mode*/

var inter = 0;
var centiseconds = 0;
var seconds = 0;
var minutes = 0;
var timerOn = false;

function timerStart(){
	if(!timerOn) {
		timerOn = true;
		//Calls function updateTime every 1/100th of a second
		inter = setInterval(updateTimer,10);
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
	if(minutes <= 0 && seconds <= 0 && centiseconds <=0) {
		timerPause();
	} else if(seconds < 0){
		minutes--;
		seconds = 59;
	} else if(centiseconds < 0){
		seconds--;
		centiseconds = 99;
	}
	updateClock();
	centiseconds--;
} 

function updateClock() {
	//String that is either ":" or ":0" depending on value of centiseconds
	var colon = (centiseconds<10) ? ":0" : ":";
	
	if (minutes > 0) {
		if (seconds < 10) {
			$('#timer').text(minutes + ":0" + seconds + colon + centiseconds);
		} else {
			$('#timer').text(minutes + ":" + seconds + colon + centiseconds);
		}
	} else {
		$('#timer').text(seconds + colon + centiseconds);
	}
}
