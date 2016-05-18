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
	$("#mode-selection-container").on('swipeleft', function(){
	$("#myCarousel").carousel("prev");
	});
	$("#mode-selection-container").on('swiperight', function(){
	$("#myCarousel").carousel("next");
	});
});