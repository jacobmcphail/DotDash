/*Easter Egg: Steve Albini functions*/

//Easter egg: whether or not Steve abides
var steveModeEnabled = false;

$(document).ready(function(){
	
	//return scores to normal after Steve Mode is disabled
    $("#option-4").on('tapone', function(){
        if(!steveModeEnabled){
            updateHighScores();
        }
    });
	
	$(".cawButton").on('tapone', function(){
        if (steveModeEnabled) {
            var sound = document.getElementById("audio");
            sound.play();
			if (!localSavedFiles[1]) {
				window.alert("Badge Unlocked! Activated Steve mode.");
				localSavedFiles[1] = true;
				localStorage.setItem("saveFile", JSON.stringify(localSavedFiles));
				updateBadges();
			}
        }
    });
	
});

function steveTap(event) {
    if(userInput){
        if ($(event.target).hasClass("tapped_steve")) {
            $(event.target).removeClass("tapped_steve");
            $(event.target).addClass("steve");
        } else {
            $(event.target).removeClass("steve");
            $(event.target).addClass("tapped_steve");
        }
    }
}

// Easter Egg: All is Steve Albini; Steve Albini is all
function enableSteveMode() {
	tapSound.play();
    if (steveModeEnabled == false) {
        steveModeEnabled = true;
    } else {
        steveModeEnabled = false;
        $(".dot").removeClass("steve tapped_steve black bound");
        $(".dot").unbind("tapone", steveTap);
    }
    console.log("steve-option toggle: " + steveModeEnabled);
}

//Easter Egg: Turns on Steve Mode
function steveify() {
    $(".dot").addClass("steve black");
    if(!$(".dot").hasClass("bound")){
        $(".dot").bind("tapone", steveTap);
        $(".dot").addClass("bound");
    }
}