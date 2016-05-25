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
					if (playerScore > data[0]["mScore"] && !localSavedFiles[8] ) {
						localSavedFiles[8] = true;
						window.alert("Badge Unlocked! Achieved top ten in Marathon mode.");
					}
					break;
				case 1:
					if (playerScore > data[1]["uScore"] && !localSavedFiles[2] ) {
						localSavedFiles[2] = true;
						window.alert("Badge Unlocked! Achieved top ten in Sudden Death mode.");	
					}
					break;
				case 2:
					if (playerScore > data[2]["tScore"] && !localSavedFiles[10] ) {
						localSavedFiles[10] = true;
						window.alert("Badge Unlocked! Achieved top ten in Time Attack mode.");
					}
					break;
				default:
					window.alert("YOU SHOULD NOT SEE THIS!");
		}
		localStorage.setItem("saveFile", JSON.stringify(localSavedFiles));
	}).fail(function () {
			window.alert("Can't access online leaderboard!");
	});
}

// Checks to see if player has unlocked any new badges
function badgeChecker(playerScore, currentRound, lifePoints) {
		switch(gamemode){
			case 0:
				if (currentRound >= 40 && !localSavedFiles[9] ) {
					localSavedFiles[9] = true;
					window.alert("Badge Unlocked! Get to level 40 in Marathon mode.");
				}
				if (currentRound >= 60 && lifePoints >= 3 && !localSavedFiles[6] ) {
					localSavedFiles[6] = true;
					window.alert("Badge Unlocked! Get to level 60 in Marathon mode with all lives.");
				}
				if (currentRound >= 60 && !localSavedFiles[3] ) {
					localSavedFiles[3] = true;
					window.alert("Badge Unlocked! Get to level 60 in Marathon mode.");
				}
				break;
			case 1:
				if (currentRound >= 60 && lifePoints >= 3 && !localSavedFiles[5] ) {
					localSavedFiles[5] = true;
					window.alert("Badge Unlocked! Get to level 60 in Sudden Death mode.");
				}
				break;
			case 2:
				if (currentRound >= 30 && !localSavedFiles[4] ) {
					localSavedFiles[4] = true;
					window.alert("Badge Unlocked! Get to level 30 in Time Attack mode.");
				}
				if (currentRound >= 20 && lifePoints == -1 && !localSavedFiles[7] ) {
					localSavedFiles[7] = true;
					window.alert("Badge Unlocked! Get to level 20 in Time Attack mode without a mistake.");
				}
				break;
			default:
				window.alert("YOU SHOULD NOT SEE THIS!");
		}
}

function updateBadges() {
	for (var bIndex = 1; bIndex <= 10; bIndex++) {
		if (localSavedFiles[bIndex]) {
			if (bIndex == 1)
				document.getElementById(bIndex + "badge").src="images/steve.png";
			else if(bIndex == 2)
				document.getElementById(bIndex + "badge").src="images/medal.png";
			else if(bIndex == 3)
				document.getElementById(bIndex + "badge").src="images/badge.png";
			else if(bIndex == 3)
				document.getElementById(bIndex + "badge").src="images/badge1.png";
			else if(bIndex == 3)
				document.getElementById(bIndex + "badge").src="images/badge2.png";
			else if(bIndex == 6)
				document.getElementById(bIndex + "badge").src="images/medal3.png";
			else if(bIndex == 7)
				document.getElementById(bIndex + "badge").src="images/medal4.png";
			else if(bIndex == 8)
				document.getElementById(bIndex + "badge").src="images/medal5.png";
			else if(bIndex == 9)
				document.getElementById(bIndex + "badge").src="images/medal6.png";
			else if(bIndex == 10)
				document.getElementById(bIndex + "badge").src="images/medal7.png";		
		}else 
				document.getElementById(bIndex + "badge").src="images/locked.png";
	} 
}
	