/*Handle badges earned by unlocking achievements.*/

var achievements = [];
var onlineBadgeLoaded = false;
var offlineBadgeLoaded = false;

/*Displays descriptions of achievements that one can earn badges for, images of earned badges, and padlock icons for badges not yet earned. */
$(document).ready(function(){
	$(".badge-button").on('tapone', function(){
		var badgeNum = parseInt(this.id);
		switch(badgeNum) {
			case 0:
			$("#badge-desc").text("Unlock Steve mode");
			break;
			case 1: 
			$("#badge-desc").text("Achieved top ten in Sudden Death mode");
			break;
			case 2:
			$("#badge-desc").text("Get to level 60 in Marathon mode");
			break;
			case 3:
			$("#badge-desc").text("Get to level 30 in Time Attack mode");
			break;
			case 4:
			$("#badge-desc").text("Get to level 60 in Sudden Death mode");
			break;
			case 5:
			$("#badge-desc").text("Get to level 60 in Marathon mode with all lives");
			break;
			case 6:
			$("#badge-desc").text("Get to level 20 in Time Attack mode without a mistake");
			break;
			case 7:
			$("#badge-desc").text("Achieved top ten in Marathon mode");
			break;
			case 8:
			$("#badge-desc").text("Get to level 40 in marathon mode");
			break;
			case 9:
			$("#badge-desc").text("Achieved top ten in Time Attack mode");
			break;
			default:
			window.alert("YOU SHOULD NOT SEE THIS!");
		}
    });
});

/*
Sends a request to leaderboards for top 10 scores for each mode of gameplay
*/
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

/*
Invoked after Game Over. Depending on mode (0: Marathon, 1: Sudden Death, 2: Time Attack), checks whether the player's most recent score beats any of the scores in the corresponding top 10 leaderboard. Player is awarded with a badge if it has not already been earned.
*/
function onlineBadgeChecker(playerScore) {
	var databus;
	getComparingData(databus).success(function (data) {
		switch(gamemode){
			case 0:
				if (playerScore > data[0]["mScore"] && !playerData[7] ) {
					playerData[7] = true;
					achievements.push("Badge Unlocked! Achieved top ten in Marathon mode.");
				}
				break;
			case 1:
				if (playerScore > data[1]["uScore"] && !playerData[1]) {
					playerData[1] = true;
					achievements.push("Badge Unlocked! Achieved top ten in Sudden Death mode.");
				}
				break;
			case 2:
				if (playerScore > data[2]["tScore"] && !playerData[9] ) {
					playerData[9] = true;
					achievements.push("Badge Unlocked! Achieved top ten in Time Attack mode.");
				}
				break;
			default:
				window.alert("YOU SHOULD NOT SEE THIS!");
		}
		updateSave();
		onlineBadgeLoaded = true;
	}).fail(function () {
		onlineBadgeLoaded = true;
		window.alert("Can't access online leaderboard!");
	});
}

/* 
Invoked after Game Over. Checks whether the most recently played game entitles the user to a new badge.
*/
function badgeChecker(currentRound, allLives) {
	switch(gamemode){
		case 0:
			if (currentRound >= 40 && !playerData[8] ) {
				playerData[8] = true;
				achievements.push("Badge Unlocked! Get to level 40 in Marathon mode.");
			}
			if (currentRound >= 60 && allLives && !playerData[5] ) {
				playerData[5] = true;
				achievements.push("Badge Unlocked! Get to level 60 in Marathon mode with all lives.");
			}
			if (currentRound >= 60 && !playerData[2] ) {
				playerData[2] = true;
				achievements.push("Badge Unlocked! Get to level 60 in Marathon mode.");
			}
			break;
		case 1:
			if (currentRound >= 60 && !playerData[4] ) {
				playerData[4] = true;
				achievements.push("Badge Unlocked! Get to level 60 in Sudden Death mode.");
			}
			break;
		case 2:
			if (currentRound >= 30 && !playerData[3] ) {
				playerData[3] = true;
				achievements.push("Badge Unlocked! Get to level 30 in Time Attack mode.");
			}
			if (currentRound >= 20 && allLives && !playerData[6] ) {
				playerData[6] = true;
				achievements.push("Badge Unlocked! Get to level 20 in Time Attack mode without a mistake.");
			}
			break;
		default:
			window.alert("YOU SHOULD NOT SEE THIS!");
	}
	offlineBadgeLoaded = true;
}

/*
Prints either a badge icon or a padlock icon depending on whether a particular achievement has been unlocked.
*/
function updateBadges() {
	for (var bIndex = 0; bIndex <= 9; bIndex++) {
		if (playerData[bIndex]) {
			if([bIndex] == 0)
			document.getElementById(bIndex + "badge").src="images/steve.png";
			if([bIndex] == 1)
				document.getElementById(bIndex + "badge").src="images/badge2.png";
			 else if([bIndex] == 2)
				document.getElementById(bIndex + "badge").src="images/badge.png";
			 else if([bIndex] == 3)
				document.getElementById(bIndex + "badge").src="images/sheriff.png";
			 else if([bIndex] == 4)
				document.getElementById(bIndex + "badge").src="images/notes.png";
			 else if([bIndex] == 5)
				document.getElementById(bIndex + "badge").src="images/shield.png";
			 else if([bIndex] == 6)
				document.getElementById(bIndex + "badge").src="images/safebox.png";
			 else if([bIndex] == 7)
				document.getElementById(bIndex + "badge").src="images/investment.png";
			 else if([bIndex] == 8)
				document.getElementById(bIndex + "badge").src="images/medal.png";
			 else if([bIndex] == 9)
			document.getElementById(bIndex + "badge").src="images/medal2.png";
		}else
			document.getElementById(bIndex + "badge").src="images/locked.png";
	} 
}


function displayBadges() {
	if (onlineBadgeLoaded == false || offlineBadgeLoaded == false) {
		setTimeout(function () {
			displayBadges();
		}, 500);
	} else {
		var num = achievements.length;
		console.log(num + achievements);
		if (num > 0) {
			
			document.getElementById('badge-message-container').style.display = 'block';
			document.getElementById('badge-message').innerHTML = 'Badges Unlocked!';

			var badgeimg = [];

			function addImages(n) {
				badgeimg[n] = new Image();
				badgeimg[n].src = "images/medal2.png";
				badgeimg[n].onclick = function () {
					document.getElementById('badge-message').innerHTML = "" + achievements[n];
				};
			}
			
			for (var i = 0; i < num; i++) {
				addImages(i);
			}

			for (var j = 0; j < num; j++) {
				document.getElementById('badge-img-container').appendChild(badgeimg[j]);
			}
		}
		onlineBadgeLoaded = false;
		offlineBadgeLoaded = false;
	}
}

	