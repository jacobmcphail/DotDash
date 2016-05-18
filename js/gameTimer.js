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
	if (minutes > 0) {
		$('#timer').text(minutes + ":" + seconds);
	} else {
		$('#timer').text(seconds);
	}
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
	if (minutes > 0) {
		$('#timer').text(minutes + ":" + seconds);
	} else {
		$('#timer').text(seconds);
	}
} 
