var changeTab = (function(event) {
	var href = $.trim($(event.currentTarget).attr('href'));
	if(href == "#tab-1") {
		initiateStepOne();
	}
	else if(href == "#tab-2") {
		initiateStepTwo();
	}
	else if(href == "#tab-3") {
		initiateStepThree();
	}
	else if(href == "#tab-4") {
		initiateStepFour();
	}
	else if(href == "#tab-5") {
		initiateStepFive();
	}
});

//step one functionality started
var initiateStepOne = (function() {
	$("#tab-1 .firstSlider .slider").css({
		"display" : "none"
	});
	$("#tab-1 .firstSlider .slider ul").css({
		width : ($("#tab-1 .firstSlider .slider ul li:eq(1)").width()*$("#tab-1 .firstSlider .slider ul li").length) +"px"
	});
	$("#tab-1 .firstSlider .fontIntroMessage").css({
		"opacity" : "0"
	});
	$("#tab-1 .firstSlider .fontIntroMessage").animate({
		"opacity" : "1"
	},1000);
	$("#tab-1 .firstSlider .thumb .slides li").unbind('click');
	$("#tab-1 .firstSlider .thumb .slides li").attr('justclicked','0');
	$("#tab-1 .firstSlider .thumb .slides li").on('click', function(event) {
		if($(this).attr('justclicked') == "0") {
			var thumbIndex = $("#tab-1 .firstSlider .thumb .slides li").index(event.currentTarget);
			moveContent(thumbIndex);	
		}
		
	});
});

var moveContent = (function(index) {
	if(!$("#tab-1 .firstSlider .slider").is(":visible")) {
		$("#tab-1 .firstSlider .fontIntroMessage").css({
			"display" : "none"
		});
		$("#tab-1 .firstSlider .slider").css({
			"display" : "block"
		});
	}
});
//step one functionality finished

var initiateStepTwo = (function(){

});
var initiateStepThree = (function(){

});
var initiateStepFour = (function(){

});
var initiateStepFive = (function(){

});
$(document).ready(function(){
	initiateStepOne();
	$("#horizontalTab ul li a").on('click', function(event) {
		changeTab(event);
	});
});