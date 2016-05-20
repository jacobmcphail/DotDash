$(document).ready(function(){
	$(".badge-button").on('tapone', function(){
		var badgeNum = parseInt(this.id);
		console.log(badgeNum);
		switch(badgeNum) {
			case 1:
			$("#badge-desc").text("??????");
			break;
			case 2: 
			$("#badge-desc").text("Get to level 60 in no timer mode");
			break;
			case 3:
			$("#badge-desc").text("Get to level 60 in marathon mode");
			break;
			case 4:
			$("#badge-desc").text("Get to level 20 in time attack mode");
			break;
			case 5:
			$("#badge-desc").text("Get to level 50 in no timer mode with all lives");
			break;
			case 6:
			$("#badge-desc").text("Get to level 60 in marathon mode with all lives");
			break;
			case 7:
			$("#badge-desc").text("Get to level 20 in time attack mode without a mistake");
			break;
			case 8:
			$("#badge-desc").text("Get to level 30 in no timer mode");
			break;
			case 9:
			$("#badge-desc").text("Get to level 30 in marathon mode");
			break;
			case 10:
			$("#badge-desc").text("Get to level 30 in time attack mode");
			break;
			default:
			window.alert("YOU SHOULD NOT SEE THIS!");
		}
    });
});

// Checks to see if player has unlocked any new badges
function badgeChecker(currentRound, lifePoints) {
		switch(gamemode){
			case 0:
				if (currentRound >= 40 && !localSavedFiles[9] ) {
					window.alert("Badge Unlocked! Get to level 40 in no-time mode.");
					localSavedFiles[9] = true;
					console.log("UNLOCK: Get to level 30 in marathon mode");
				}
				if (currentRound >= 60 && lifePoints >= 3 && !localSavedFiles[6] ) {
					window.alert("Badge Unlocked! Get to level 60 in marathon mode with all lives.");
					localSavedFiles[6] = true;
					console.log("UNLOCK: Get to level 60 in marathon mode with all lives");
				}
				if (currentRound >= 60 && !localSavedFiles[3] ) {
					window.alert("Badge Unlocked! Get to level 60 in marathon mode.");
					localSavedFiles[3] = true;
					console.log("UNLOCK: Get to level 60 in marathon mode");
				}
				break;
			case 1:
				if (currentRound >= 40 && !localSavedFiles[8] ) {
					window.alert("Badge Unlocked! Get to level 40 in no-time mode.");
					localSavedFiles[8] = true;
					console.log("UNLOCK: Get to level 30 in marathon mode");
				}
				if (currentRound >= 60 && lifePoints >= 3 && !localSavedFiles[5] ) {
					window.alert("Badge Unlocked! Get to level 60 in no-time mode with all lives.");
					localSavedFiles[5] = true;
					console.log("UNLOCK: Get to level 50 in marathon mode with all lives");
				}
				if (currentRound >= 60 && !localSavedFiles[2] ) {
					window.alert("Badge Unlocked! Get to level 60 in no-time mode.");
					localSavedFiles[2] = true;
					console.log("UNLOCK: Get to level 60 in marathon mode");
				}
				break;
			case 2:
				if (currentRound >= 20 && !localSavedFiles[4] ) {
					window.alert("Badge Unlocked! Get to level 20 in time attack mode.");
					localSavedFiles[4] = true;
					console.log("UNLOCK: Get to level 20 in time attack mode");
				}
				if (currentRound >= 20 && lifePoints == -1 && !localSavedFiles[7] ) {
					window.alert("Badge Unlocked! Get to level 20 in time attack mode without a mistake.");
					localSavedFiles[7] = true;
					console.log("UNLOCK: Get to level 20 in time attack mode without a mistake");
				}
				if (currentRound >= 30 && !localSavedFiles[10] ) {
					window.alert("Badge Unlocked! Get to level 30 in time attack mode.");
					localSavedFiles[10] = true;
					console.log("UNLOCK: Get to level 30 in time attack mode");
				}
				break;
			default:
				window.alert("YOU SHOULD NOT SEE THIS!");
		}
	updateBadges();
}

function updateBadges() {
	for (var bIndex = 1; bIndex <= 10; bIndex++) {
		if (localSavedFiles[bIndex]) {
			document.getElementById(bIndex + "badge").src="images/medal2.png";
		} else {
			document.getElementById(bIndex + "badge").src="images/locked.png";
		} 
	} 
}
	