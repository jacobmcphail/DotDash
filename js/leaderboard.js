/*Handles sending data to and retrieving data from online leaderboard database. */

$(document).ready(function(){

	$(".cb-enable").click(function(){
        var parent = $(this).parents('.switch');
        $('.cb-disable',parent).removeClass('selected');
        $(this).addClass('selected');
        $('.checkbox',parent).attr('checked', true);
		document.getElementById('local-scores').style.display = 'block';
		document.getElementById('online-scores').style.display = 'none';
    });
    $(".cb-disable").click(function(){
        var parent = $(this).parents('.switch');
        $('.cb-enable',parent).removeClass('selected');
        $(this).addClass('selected');
        $('.checkbox',parent).attr('checked', false);
		document.getElementById('local-scores').style.display = 'none';
		document.getElementById('online-scores').style.display = 'block';
		printOnlineScores();
    });
	
});

function scoreChecker(playerScore) {
	switch(gamemode) {
		case 0:
			if (playerScore > localSavedFiles[11]) {
				window.alert("New HighScore in marathon mode!");
				localSavedFiles[11] = playerScore;
				return true;
			}
			break;
		case 1: 
			if (playerScore > localSavedFiles[12]) {
				window.alert("New HighScore in no-time mode!");
				localSavedFiles[12] = playerScore;
				return true;
			}
			break;
		case 2:
			if (playerScore > localSavedFiles[13]) {
				window.alert("New HighScore in time attack mode!");
				localSavedFiles[13] = playerScore;
				return true;
			}
			break;
		default:
			window.alert("YOU SHOULD NOT SEE THIS!");
	}
	return false;
}

//Update high scores
function updateHighScores() {
    for (var i = 11, q = 0; i < 14; i++, q++) {
		$("#localHS-" + q).text(localSavedFiles[i]);
    }
}

function printOnlineScores() {
	var leaderboard = document.getElementById("online-score-container");
	var databus;
	leaderboard.innerHTML = '<br><br><br><br><br><h2>Loading...</h2>';
	getData(databus).success(function (data) {
		console.log(data);
		leaderboard.innerHTML = '<h1>Leaderboard</h1>';
		leaderboard.innerHTML += '<h2>Marathon</h2>';
		var indexDB = 0;
		for(var i = 1; i <= 10; i++, indexDB++){
			leaderboard.innerHTML += '<p>' + i + ': ' + data[indexDB]["mName"] + ' - ' + data[indexDB]["mScore"] + '</p>';
		}
		leaderboard.innerHTML += '<br><h2>No Timer</h2>';
		for(var i = 1; i <= 10; i++, indexDB++){
			leaderboard.innerHTML += '<p>' + i + ': ' + data[indexDB]["uName"] + ' - ' + data[indexDB]["uScore"] + '</p>';
		}
		leaderboard.innerHTML += '<br><h2>Time Attack</h2>';
		for(var i = 1; i <= 10; i++, indexDB++){
			leaderboard.innerHTML += '<p>' + i + ': ' + data[indexDB]["tName"] + ' - ' + data[indexDB]["tScore"] + '</p>';
		}
		leaderboard.innerHTML += '<br>';
	}).fail(function () {
		leaderboard.innerHTML = '<br><br><br><h2>Could not get online leaderboard!</h2>';		
	});
}

function getData(database) {
   return $.ajax({
      type: "GET",
      url: "http://www.crowbot.co/php/readDB.php",
      dataType: "json",
      data: {
		  database : database
	  }
	});
}

function sendScore(gamemode, playerName, playerScore) {
		var j_notation =
		{
		"mode": gamemode,
		"player_name": playerName, 
		"player_score": playerScore,
		}; 


		$.ajax({
			url: "http://www.crowbot.co/php/dirtyshoes.php",
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(j_notation),
			dataType: 'json'
		});
}