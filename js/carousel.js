$(document).ready(function(){
	// Activate Carousel	
	$("#myCarousel").carousel("pause");				   
	// Enable Carousel Controls
	$(".left").click(function(){
	$("#myCarousel").carousel("prev");
	});
	$(".right").click(function(){
	$("#myCarousel").carousel("next");
	});
});
