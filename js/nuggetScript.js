// Related to movement between screens

function openOptions() {
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('options-screen').style.display = "block";
    document.getElementById('return-button').style.display = "block";
    document.getElementById('title').innerHTML = "Options._"
}
function openScores() {
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('badges-screen').style.display = 'none';
    document.getElementById('scores-screen').style.display = "block";
    document.getElementById('return-button').style.display = "block";
    document.getElementById('badges-button').style.display = "block";
    document.getElementById('title').innerHTML = "Scores._"
}
function openBadges() {
    document.getElementById('scores-screen').style.display = 'none';
    document.getElementById('badges-screen').style.display = "block";
    document.getElementById('badge-return-button').style.display = "block";
    document.getElementById('return-button').style.display = "none";
    document.getElementById('title').innerHTML = "Badges._"
}
function openCredits() {
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('credits-screen').style.display = "block";
    document.getElementById('return-button').style.display = "block";
    document.getElementById('title').innerHTML = "DotDash._"
}
function openMainMenu() {
    document.getElementById('options-screen').style.display = 'none';
    document.getElementById('scores-screen').style.display = 'none';
    document.getElementById('credits-screen').style.display = 'none';
    document.getElementById('return-button').style.display = 'none';
    document.getElementById('main-screen').style.display = 'block';
    document.getElementById('title').innerHTML = "DotDash._";
    document.getElementById('gameover-screen').style.display = "none";
//LeafBunny: hide pause and tutorial buttons when returning to Main Manu
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('title').style.display = 'block';
}
function play() {
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('title').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    document.getElementById('game-screen').style.opacity = '1';
    playing = true;
}
function badge1() {
    window.alert("get this badge by playing for 100000 hours");
}


// Easter Egg: All is Steve Albini; Steve Albini is all
function enableSteveMode() {
    if (steveModeEnabled == false) {
        steveModeEnabled = true;
    } else {
        steveModeEnabled = false;
        $(".dot").removeClass("steve tapped_steve black bound");
        $(".dot").unbind("click", steveTap);
    }
    console.log("steve-option toggle: " + steveModeEnabled);
}

function steveTap(event) {
    if ($(event.target).hasClass("tapped_steve")) {
        $(event.target).removeClass("tapped_steve");
        $(event.target).addClass("steve");
        console.log("Untapped");
    } else {
        $(event.target).removeClass("steve");
        $(event.target).addClass("tapped_steve");
        console.log("Tapped");
    }
}

// Gameplay-related
function resetGrid(){
    console.log("Entered resetGrid()");
    removeDots();
	resetVals();
    /*$(".dot").removeClass("selected");
     if($(".dot").hasClass("tapped_steve")){
     $(".dot").removeClass("tapped_steve");
     $(".dot").addClass("steve");
     }*/
    openMainMenu();

}

function gameOver() {
    playing = false;
    $( "#game-screen" ).fadeOut( 1500, function() {
        $('#gameover-screen').fadeIn(1500, function() {});
    });

    // add final score
    document.getElementById('final-score').innerHTML = playerScore;
}

function resetVals(){
    noErrorsYet = true;
    notComplete = true;
    index = 0;
}