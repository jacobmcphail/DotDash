/*Sends data to and retrieves data from online leaderboard database. */

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
/*
Checks whether the most recent score beats the player's stored personal best.
*/
function scoreChecker(playerScore) {
	switch(gamemode) {
		case 0:
			if (playerScore > playerData[10]) {
				document.getElementById('highscore-message-container').style.display = 'block';
				document.getElementById('highscore-message').innerHTML = "New HighScore in Marathon mode!";
				playerData[10] = playerScore;
				return true;
			}
			break;
		case 1: 
			if (playerScore > playerData[11]) {
				document.getElementById('highscore-message-container').style.display = 'block';
				document.getElementById('highscore-message').innerHTML = "New HighScore in Sudden Death mode!";
				playerData[11] = playerScore;
				return true;
			}
			break;
		case 2:
			if (playerScore > playerData[12]) {
				document.getElementById('highscore-message-container').style.display = 'block';
				document.getElementById('highscore-message').innerHTML = "New HighScore in Time Attack mode!";
				playerData[12] = playerScore;
				return true;
			}
			break;
		default:
			window.alert("YOU SHOULD NOT SEE THIS!");
	}
	return false;
}

/*
Updates high scores on leaderboard screen
*/
function updateHighScores() {
    for (var i = 10, q = 0; i < 13; i++, q++) {
		$("#localHS-" + q).text(playerData[i]);
    }
}
/*
Prints top 10 scores for each mode to leaderboard screen.
*/
function printOnlineScores() {
	var leaderboard = document.getElementById("online-score-container");
	var databus;
	leaderboard.innerHTML = '<br><br><br><br><br><h2>Loading...</h2>';
	getData(databus).success(function (data) {
		leaderboard.innerHTML = '<h1>Leaderboard</h1>';
		leaderboard.innerHTML += '<h2>Marathon</h2>';
		var indexDB = 0;
		for(var i = 1; i <= 10; i++, indexDB++){
			leaderboard.innerHTML += '<p>' + i + ': ' + data[indexDB]["mName"] + ' - ' + data[indexDB]["mScore"] + '</p>';
		}
		leaderboard.innerHTML += '<br><h2>Sudden Death</h2>';
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
/*
Retrieves top 10 scores for each mode from leaderboard database.
*/
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
/*
Sends player name and score to leaderboard database to be written into a new record.
*/
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