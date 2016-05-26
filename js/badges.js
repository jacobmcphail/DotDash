/*Handle badges that are earned within game. Events that currently 
unlock badges are not finalized. */

$(document).ready(function(){
	$(".badge-button").on('tapone', function(){
		var badgeNum = parseInt(this.id);
		console.log(badgeNum);
		switch(badgeNum) {
			case 1:
			$("#badge-desc").text("Unlock Steve mode");
			break;
			case 2: 
			$("#badge-desc").text("Achieved top ten in Sudden Death mode");
			break;
			case 3:
			$("#badge-desc").text("Get to level 60 in Marathon mode");
			break;
			case 4:
			$("#badge-desc").text("Get to level 30 in Time Attack mode");
			break;
			case 5:
			$("#badge-desc").text("Get to level 60 in Sudden Death mode");
			break;
			case 6:
			$("#badge-desc").text("Get to level 60 in Marathon mode with all lives");
			break;
			case 7:
			$("#badge-desc").text("Get to level 20 in Time Attack mode without a mistake");
			break;
			case 8:
			$("#badge-desc").text("Achieved top ten in Marathon mode");
			break;
			case 9:
			$("#badge-desc").text("Get to level 40 in marathon mode");
			break;
			case 10:
			$("#badge-desc").text("Achieved top ten in Time Attack mode");
			break;
			default:
			window.alert("YOU SHOULD NOT SEE THIS!");
		}
    });
});

function getComparingData(database){
	  return $.ajax({
      type: "GET",
      url: "http://www.crowbot.co/php/readDBTen.php",
      dataType: "json",
      data: {
		  database : database
	  }
	});
}

function onlineBadgeChecker(playerScore) {
	var databus;
	getComparingData(databus).success(function (data) {
		console.log(data);
		switch(gamemode){
				case 0:
					if (playerScore > data[0]["mScore"] && !playerData[7] ) {
						playerData[7] = true;
						document.getElementById('badge-message-container').style.display = 'block';
						document.getElementById('badge-message').innerHTML = "Badge Unlocked! Achieved top ten in Marathon mode.";
					}
					break;
				case 1:
					if (playerScore > data[1]["uScore"] && !playerData[1] ) {
						playerData[1] = true;
						document.getElementById('badge-message-container').style.display = 'block';
						document.getElementById('badge-message').innerHTML = "Badge Unlocked! Achieved top ten in Sudden Death mode.";
					}
					break;
				case 2:
					if (playerScore > data[2]["tScore"] && !playerData[9] ) {
						playerData[9] = true;
						document.getElementById('badge-message-container').style.display = 'block';
						document.getElementById('badge-message').innerHTML = "Badge Unlocked! Achieved top ten in Time Attack mode.";
					}
					break;
				default:
					window.alert("YOU SHOULD NOT SEE THIS!");
		}
		updateSave();
	}).fail(function () {
			window.alert("Can't access online leaderboard!");
	});
}

// Checks to see if player has unlocked any new badges
function badgeChecker(playerScore, currentRound, lifePoints) {
		switch(gamemode){
			case 0:
				if (currentRound >= 40 && !playerData[8] ) {
					playerData[8] = true;
					document.getElementById('badge-message-container').style.display = 'block';
					document.getElementById('badge-message').innerHTML = "Badge Unlocked! Get to level 40 in Marathon mode.";
				}
				if (currentRound >= 60 && lifePoints >= 3 && !playerData[5] ) {
					playerData[5] = true;

					document.getElementById('badge-message-container').style.display = 'block';
					document.getElementById('badge-message').innerHTML = "Badge Unlocked! Get to level 60 in Marathon mode with all lives.";
				}
				if (currentRound >= 60 && !playerData[2] ) {
					playerData[2] = true;

					document.getElementById('badge-message-container').style.display = 'block';
					document.getElementById('badge-message').innerHTML = "Badge Unlocked! Get to level 60 in Marathon mode.";
				}
				break;
			case 1:
				if (currentRound >= 60 && lifePoints >= 3 && !playerData[4] ) {
					playerData[4] = true;

					document.getElementById('badge-message-container').style.display = 'block';
					document.getElementById('badge-message').innerHTML ="Badge Unlocked! Get to level 60 in Sudden Death mode.";
				}
				break;
			case 2:
				if (currentRound >= 30 && !playerData[3] ) {
					playerData[3] = true;

					document.getElementById('badge-message-container').style.display = 'block';
					document.getElementById('badge-message').innerHTML ="Badge Unlocked! Get to level 30 in Time Attack mode.";
				}
				if (currentRound >= 20 && lifePoints == -1 && !playerData[6] ) {
					playerData[6] = true;

					document.getElementById('badge-message-container').style.display = 'block';
					document.getElementById('badge-message').innerHTML ="Badge Unlocked! Get to level 20 in Time Attack mode without a mistake.";
				}
				break;
			default:
				window.alert("YOU SHOULD NOT SEE THIS!");
		}
}

function updateBadges() {
	for (var bIndex = 0; bIndex <= 9; bIndex++) {
		if (playerData[bIndex]) {
			document.getElementById(bIndex + "badge").src="images/medal2.png";
		} else {
			document.getElementById(bIndex + "badge").src="images/locked.png";
		} 
	} 
}
	