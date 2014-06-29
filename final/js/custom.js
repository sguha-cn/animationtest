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
var timerforStepOne = null;
var indexForStepOne = 0;
var initiateStepOne = (function() {
	$("#tab-1 .firstSlider .slider").css({
		"display" : "none"
	});
	$("#tab-1 .firstSlider .slider ul").css({
		width : ($("#tab-1 .firstSlider .slider ul li:eq(1)").width()*$("#tab-1 .firstSlider .slider ul li").length) +"px"
	});
	$("#tab-1 .firstSlider .thumb .slides li").css({
		"opacity" : "0.5"
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
		var thumbIndex = $("#tab-1 .firstSlider .thumb .slides li").index(event.currentTarget);
		indexForStepOne = thumbIndex;
		moveContent(thumbIndex);	
	});
	if(timerforStepOne == null) {
		timerforStepOne = window.setInterval(function() {
			indexForStepOne += 1;
			if(indexForStepOne > 5) {
				indexForStepOne = 0;
			}
			moveContent(indexForStepOne);
		},5000);
	}
});

var slideSliderOne = (function(index) {
	$("#tab-1 .firstSlider .thumb .slides li").css({
		"opacity" : "0.5"
	});
	$("#tab-1 .firstSlider .thumb .slides li:eq("+index+")").css({
		"opacity" : "1"
	});
	var presentElement;
	$("#tab-1 .firstSlider .slider ul li").each(function() {
		if($(this).css('left') == "0px") {
			presentElement = $(this);
		}
	});
	presentElement.animate({
		"left" : "100%"
	},1000,function() {
		presentElement.css({
			"left" : "-100%"
		});

		$("#tab-1 .firstSlider .slider ul li:eq("+index+")").css({
			"left" : "-100%"
		});
		$("#tab-1 .firstSlider .slider ul li:eq("+index+")").animate({
			"left" : "0"
		}, 1000, function() {
			$("#tab-1 .firstSlider .thumb .slides li").attr('justclicked', 0);
		});
	});
});

var moveContent = (function(index) {
	if($("#tab-1 .firstSlider .thumb .slides li:eq(0)").attr('justclicked') == "0") {
		$("#tab-1 .firstSlider .thumb .slides li").attr('justclicked', 1);
		if(!$("#tab-1 .firstSlider .slider").is(":visible")) {
			$("#tab-1 .firstSlider .fontIntroMessage").fadeOut('slow', function() {
				$("#tab-1 .firstSlider .slider").css({
				"display" : "block"
				});
				$("#tab-1 .firstSlider .slider ul li").css({
					"position" : "absolute",
					"left"     : (-1)*parseInt($("#tab-1").width()) + "px"
				});
				$("#tab-1 .firstSlider .slider ul li:eq(0)").css({
					"left" : "0px"
				});
				$(".slideText").css({
					"display" : "none"
				});
				slideSliderOne(index)	
			});
		}
		else {
			slideSliderOne(index);
		}
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