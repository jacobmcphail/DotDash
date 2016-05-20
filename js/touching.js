/**
 * Created by Teah on 5/19/2016.
 */

var touchDuration = 300;
var timerInterval;
var mobile = false;

function addTouchListeners() {
    /* set up touch functions for buttons */
    var buttons = document.getElementsByClassName('nongameplay-buttons');
    for (var i = 0; i < buttons.length; i++) {
        document.getElementById(buttons[i].id).addEventListener('touchstart', touchstart);
        document.getElementById(buttons[i].id).addEventListener('touchend', touchend);
    }
}

/* determine mobile/web */
function whatDevice() {
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    if(isMobile.any()) {
        mobile = true;
    }
}


/* TOUCH BUTTONS */
function timer(interval) {
    interval--;
    if (interval >= 0) {
        timerInterval = setTimeout(function() {
            timer(interval);
        });
    } else {
        taphold();
    }
}

function touchstart() {
    timer(touchDuration);
}

function touchend() {
    clearTimeout(timerInterval);
    $(".nongameplay-buttons").removeClass("holdNotifications");
}

function taphold() {
    alert("taphold");
}
