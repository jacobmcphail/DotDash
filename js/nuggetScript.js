// Related to movement between screens

var labelsOn = true;

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
    document.getElementById('title').innerHTML = "Scores._";
	yesSound.play();
}
function openBadges() {
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
	document.getElementById('tutorial-screen').style.display = 'none';
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
	playing = true;
    initialize(gamemode, newRound, removeDots);
	disco.play();
}

function openTutorialScreen() {
    document.getElementById('tutorial-screen').style.display = "block";
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('title').style.display = 'block';
    document.getElementById('title').innerHTML = "Game Tutorial._";
	disco.pause();
	yesSound.play();
	
}
function closeTutorialScreen() {
    document.getElementById('tutorial-screen').style.display = "none";
    document.getElementById('game-screen').style.display = 'block';
    document.getElementById('title').innerHTML = "";
	disco.pause();
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

function badge1() {
    window.alert("get this badge by playing for 100000 hours");
}

function openConfirmation(type) {
	yesSound.play();
    document.getElementById('confirmation-container').style.display = 'block';

    $('#confirmation-container').animate({
        'margin-left': '-=5px',
        'margin-right': '+=5px'
    }, 100, function() {
        $('#confirmation-container').animate({
            'margin-left': '+=5px',
            'margin-right': '-=5px'
        }, 100, function() {
            $('#confirmation-container').animate({
                'margin-left': '-=5px',
                'margin-right': '+=5px'
            }, 100);
        });
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
}

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
