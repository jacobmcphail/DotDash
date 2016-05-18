var inter = 0;
var seconds = 0;
var minutes = 0;
var timerOn = false;

function timerStart(){
	if(!timerOn) {
		timerOn = true;
		inter = setInterval(updateTimer,1000);
	} 
}

function timerPause(){
	clearInterval(inter);
	timerOn = false;
}

function timerSet(timeMinutes, timerSeconds){
	minutes = timeMinutes;
	seconds = timerSeconds;
	updateClock()
}

function updateTimer(){
	console.log("time");
	seconds--;
	if(minutes <= 0 && seconds <= 0) {
		timerPause();
	} else if(seconds < 0){
		minutes--;
		seconds = 59;
	}
	updateClock();
} 


function updateClock() {
		if (minutes > 0) {
		if (seconds < 10) {
			$('#timer').text(minutes + ":0" + seconds);
		} else {
			$('#timer').text(minutes + ":" + seconds);
		}
	} else {
		$('#timer').text(seconds);
	}
}
