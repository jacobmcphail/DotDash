// Related to movement between screens

var labelsOn = true;
var mobile = false;

function openOptions() {
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('options-screen').style.display = "block";
    document.getElementById('return-button').style.display = "block";
    document.getElementById('title').innerHTML = "Options._";
	yesSound.play();
    
}
function openScores() {
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('badges-screen').style.display = 'none';
    document.getElementById('scores-screen').style.display = "block";
    document.getElementById('return-button').style.display = "block";
    document.getElementById('badges-button').style.display = "block";
    document.getElementById('gameover-screen').style.display = "none";
    if(document.getElementById('online-scores').style.display == 'block'){
        printOnlineScores();
    }
    document.getElementById('title').innerHTML = "Scores._";
    yesSound.play();
}
function openBadges() {
	updateBadges();
	$("#badge-desc").text("Unlock badges by playing the game right, wethead.");
    document.getElementById('scores-screen').style.display = 'none';
    document.getElementById('badges-screen').style.display = "block";
    document.getElementById('badge-return-button').style.display = "block";
    document.getElementById('return-button').style.display = "none";
    document.getElementById('title').innerHTML = "Badges._";
	yesSound.play();
}
function openCredits() {
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('credits-screen').style.display = "block";
    document.getElementById('return-button').style.display = "block";
    document.getElementById('title').innerHTML = "";
	yesSound.play();
}
function openMainMenu() {
	//Z's changes
	document.getElementById('splash-screen').style.display = 'none';
    document.getElementById('options-screen').style.display = 'none';
    document.getElementById('scores-screen').style.display = 'none';
    document.getElementById('credits-screen').style.display = 'none';
    document.getElementById('return-button').style.display = 'none';
    document.getElementById('main-screen').style.display = 'block';
    document.getElementById('title').innerHTML = "DotDash._";
    document.getElementById('gameover-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('title').style.display = 'block';
    document.getElementById('pause-screen').style.display = 'none';
	
	disco.pause();
	disco.currentTime=0;
	popupSound.play();	
}

function play() {
	yesSound.play();
    document.getElementById('gameover-screen').style.display = "none";
    document.getElementById('pause-screen').style.display = "none";
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('title').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    document.getElementById('game-screen').style.opacity = '1';

    document.getElementById('badge-message-container').style.display = 'none';
    document.getElementById('highscore-message-container').style.display = 'none';

	playing = true;
    initialize(gamemode, newRound, removeDots);
	disco.play();
}

function openTutorialScreen() {
    document.getElementById('tutorial1-screen').style.display = "block";
    document.getElementById('tutorial2-screen').style.display = "none";
    document.getElementById('game-screen').style.display = 'none';
	yesSound.play();
}

function openTutorial2Screen() {
    document.getElementById('tutorial1-screen').style.display = "none";
    document.getElementById('tutorial3-screen').style.display = "none";
    document.getElementById('tutorial2-screen').style.display = "block";
    yesSound.play();
}

function openTutorial3Screen() {
    document.getElementById('tutorial2-screen').style.display = "none";
    document.getElementById('tutorial3-screen').style.display = "block";
    document.getElementById('tutorial4-screen').style.display = "none";
	yesSound.play();
}

function openTutorial4Screen() {
    document.getElementById('tutorial3-screen').style.display = "none";
    document.getElementById('tutorial4-screen').style.display = "block";
	yesSound.play();
}

function closeTutorialScreen() {
    document.getElementById('tutorial4-screen').style.display = "none";
    document.getElementById('tutorial1-screen').style.display = "none";
    document.getElementById('game-screen').style.display = 'block';
    document.getElementById('title').innerHTML = "";
	noSound.play();
}

function openPauseScreen() {
    document.getElementById('pause-screen').style.display = "block";
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('confirmation-container').style.display = 'none';
	disco.pause();
	yesSound.play();
}

function closePauseScreen() {
    document.getElementById('pause-screen').style.display = "none";
    document.getElementById('game-screen').style.display = 'block';
	noSound.play();
	disco.play();
}

//Displays dialog box asking user if they would like to quit
function openConfirmation(type) {
	yesSound.play();
    document.getElementById('confirmation-container').style.display = 'block';

    $('#confirmation-container').animate({
        'margin-left': '-=5px',
        'margin-right': '+=5px'
    }, 80, function() {
        $('#confirmation-container').animate({
            'margin-left': '+=5px',
            'margin-right': '-=5px'
        }, 80, function () {
            $('#confirmation-container').animate({
                'margin-left': '-=2px',
                'margin-right': '+=2px'
            }, 80, function () {
                $('#confirmation-container').animate({
                    'margin-left': '+=2px',
                    'margin-right': '-=2px'
                }, 80);
            });
        })
    });

    if (type == 'quit') {
        document.getElementById('confirm-text').innerHTML = "Are you sure you want to quit this round?";
        document.getElementById('yes-button').onclick = function() {
			quitGame();
        };

    } else if (type == 'restart') {
        document.getElementById('confirm-text').innerHTML = "Are you sure you want to restart this round?";
        document.getElementById('yes-button').onclick = function() {
            disco.currentTime = 0;
			yesSound.play();
			playAgain();
        };
    }

}

function closeConfirmation() {
	noSound.play();
    document.getElementById('confirmation-container').style.display = 'none';
}

function quitGame() {
	disco.currentTime = 0;
    playing = false;
    openMainMenu();
	noSound.play();
	
	//**panic
    removeDistractions
}

//Remove labels that appear over buttons on hover; toggled in options screen
function disableLabels() {
	tapSound.play();
    if(labelsOn == true) {
        $('link[rel=stylesheet][href="css/hoverText.css"]').remove();
        labelsOn = false;
    } else {
        $('head').append('<link rel="stylesheet" type="text/css"  href="css/hoverText.css"/>');
        labelsOn = true;
	}
}

function popup(content) {
    
    if (content == 'resetSave') {
        document.getElementById('popup-text').innerHTML =
            'Are you sure you want to reset your save? ' +
            'Your high scores and badges will be lost.'
    }
    
    document.getElementById('overlay-popup').style.display = 'block';
    document.getElementById('popup-yes-button').style.display = 'block';
    document.getElementById('popup-no-button').style.display = 'block';
    

    $('#overlay-popup').animate({
        'margin-left': '-=5px',
        'margin-right': '+=5px'
    }, 80, function() {
        $('#overlay-popup').animate({
            'margin-left': '+=5px',
            'margin-right': '-=5px'
        }, 80, function () {
            $('#overlay-popup').animate({
                'margin-left': '-=2px',
                'margin-right': '+=2px'
            }, 80, function () {
                $('#overlay-popup').animate({
                    'margin-left': '+=2px',
                    'margin-right': '-=2px'
                }, 80);
            });
        })
    });

}

function closePopup() {
    document.getElementById('overlay-popup').style.display = 'none';
}


