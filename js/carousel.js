/*Main menu mode selection. Adapted from Bootstrap. */

$(document).ready(function(){
	// Activate Carousel	
	$("#menuCarousel").carousel("pause");				   
	
	// Enable Carousel Controls
	$(".left").on('tapone', function(){
		$("#menuCarousel").carousel("prev");
	});
	
	$(".right").on('tapone', function(){
		$("#menuCarousel").carousel("next");
	
	});
	
	$("#main-screen").on('swipeone', function (event, obj) {
		var direction=obj.description.split(":")[2]
		if (direction=="left"){
			$("#menuCarousel").carousel("prev");
		} else if (direction=="right"){
			$("#menuCarousel").carousel("next");
		}
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
		play();
    });
	
});