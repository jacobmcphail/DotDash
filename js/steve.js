/*Easter Egg: Steve Albini functions*/

//Easter egg: whether or not Steve abides
var steveModeEnabled = false;
var crowbotActive = false;

$(document).ready(function(){
	
	//return scores to normal after Steve Mode is disabled
    $("#option-3").on('tapone', function(){
        if(!steveModeEnabled){
            updateHighScores();
        }
    });

    $(".cawButton").on('tapone', function(){
        if (crowbotActive) {
            if (!playerData[0]) {
                popup('steve');
                playerData[0] = true;
                updateSave();
                updateBadges();
            }
            enableSteveMode();
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

function steveModeToggle() {
	if (steveModeEnabled == true){
		steveModeEnabled = false;
		crowbotActive = false;
		$(".dot").removeClass("steve tapped_steve black bound");
        $(".dot").unbind("tapone", steveTap);
		updateHighScores();
	} else {
		crowbotActive = true;
	}
}

// Easter Egg: All is Steve Albini; Steve Albini is all
function enableSteveMode() {
    steveModeEnabled = true;
}

//Easter Egg: Turns on Steve Mode
function steveify() {
    $(".dot").addClass("steve black");
    if(!$(".dot").hasClass("bound")){
        $(".dot").bind("tapone", steveTap);
        $(".dot").addClass("bound");
    }
}