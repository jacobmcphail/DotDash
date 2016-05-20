/*Main menu mode selection*/

$(document).ready(function(){
	// Activate Carousel	
	$("#myCarousel").carousel("pause");				   
	
	// Enable Carousel Controls
	$(".left").on('tapone', function(){
		$("#myCarousel").carousel("prev");
	});
	
	$(".right").on('tapone', function(){
		$("#myCarousel").carousel("next");
	
	});
/*	$("body").on('swipeone', 'swipeleft', function(){
	$("#myCarousel").carousel("prev");
	}); */
	
	$("#main-screen").on('swipeone', function(){
		$("#myCarousel").carousel("next");
	}); 
	
    
    $(".mode-select").on('tapone', function(){
        var mode = this.id;
		if (mode == "mode-1") {
			gamemode = 0;
		} else if (mode == "mode-2") {
			gamemode = 1;
		} else {
			gamemode = 2;
		}
        console.log("mode selected: " + mode + ":" + gamemode);
    });
	
});