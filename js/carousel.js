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
	$("#swiperL").on('swipeone', function(){
	$("#myCarousel").carousel("prev");
	});
	$("#swiperR").on('swipeone', function(){
	$("#myCarousel").carousel("next");
	});
});