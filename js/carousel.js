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
	$("body").on('swipeone', 'swipeleft', function(){
	$("#myCarousel").carousel("prev");
	});
	$("body").on('swipeone', 'swiperight', function(){
	$("#myCarousel").carousel("next");
	});
});