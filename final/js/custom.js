var changeTab = (function (event) {
    var href = $.trim($(event.currentTarget).attr('href'));
    if (href == "#tab-1") {
        initiateStepOne();
    } else if (href == "#tab-2") {
        initiateStepTwo();
    } else if (href == "#tab-3") {
        initiateStepThree();
    } else if (href == "#tab-4") {
        initiateStepFour();
    } else if (href == "#tab-5") {
        initiateStepFive();
    }
});

//step one functionality started
var timerforStepOne = null;
var indexForStepOne = 0;
var initiateStepOne = (function () {
    indexForStepOne = 0;
    timerforStepOne = null;
    $("#tab-1 .firstSlider .slider").css({
        "display": "none"
    });
    $("#tab-1 .slideText").css({
        "left": (parseInt($(".secondStep").width()) / 2.5) + "px"
    });
    $("#tab-1 .firstSlider .slider ul").css({
        width: ($("#tab-1 .firstSlider .slider ul li:eq(1)").width() * $("#tab-1 .firstSlider .slider ul li").length) + "px"
    });
    $("#tab-1 .firstSlider .thumb .slides li").css({
        "opacity": "0.5"
    });
    $("#tab-1 .firstSlider .fontIntroMessage").css({
        "display": "block",
        "opacity": "0"
    });
    $("#tab-1 .firstSlider .fontIntroMessage").animate({
        "opacity": "1"
    }, 1000);
    $("#tab-1 .firstSlider .thumb .slides li").unbind('click');
    $("#tab-1 .firstSlider .thumb .slides li").attr('justclicked', '0');
    $("#tab-1 .firstSlider .thumb .slides li").on('click', function (event) {
        var thumbIndex = $("#tab-1 .firstSlider .thumb .slides li").index(event.currentTarget);
        indexForStepOne = thumbIndex;
        moveContent(thumbIndex);
    });
    if (timerforStepOne == null) {
        timerforStepOne = window.setInterval(function () {
            indexForStepOne += 1;
            if (indexForStepOne > 5) {
                indexForStepOne = 0;
            }
            moveContent(indexForStepOne);
        }, 10000);
    }
    $("#tab-1 .nextTab").unbind('click');
    $("#tab-1 .nextTab").on('click', function () {
        $("#horizontalTab ul li a[href='#tab-2']").trigger('click');
    });
});

var slideSliderOne = (function (index) {
    $("#tab-1 .firstSlider .thumb .slides li").css({
        "opacity": "0.5"
    });
    $("#tab-1 .firstSlider .thumb .slides li:eq(" + index + ")").css({
        "opacity": "1"
    });
    var presentElement;
    $("#tab-1 .firstSlider .slider ul li").each(function () {
        if ($(this).css('left') == "0px") {
            presentElement = $(this);
        }
    });
    presentElement.animate({
        "left": "100%"
    }, 1000, function () {
        presentElement.css({
            "left": "-100%"
        });
        $(".slideText", presentElement).css({
            "display": "none"
        });
        $("#tab-1 .firstSlider .slider ul li:eq(" + index + ")").css({
            "left": "-100%"
        });
        $("#tab-1 .firstSlider .slider ul li:eq(" + index + ")").animate({
            "left": "0"
        }, 1000, function () {
            $(".slideText", this).css({
                "display": "block"
            });
            var top = $(".slideText", this).css('top');
            $(".slideText", this).css({
                "top": "-100%"
            });
            $(".slideText", this).animate({
                "top": top
            }, {
                "duration": 300,
                "easing": 'easeOutBounce',
                "complete": function () {
                    $("#tab-1 .firstSlider .thumb .slides li").attr('justclicked', 0);
                }
            });

        });
    });
});

var moveContent = (function (index) {
    if ($("#tab-1 .firstSlider .thumb .slides li:eq(0)").attr('justclicked') == "0") {
        $("#tab-1 .firstSlider .thumb .slides li").attr('justclicked', 1);
        if (!$("#tab-1 .firstSlider .slider").is(":visible")) {
            $("#tab-1 .firstSlider .fontIntroMessage").fadeOut('slow', function () {
                $("#tab-1 .firstSlider .slider").css({
                    "display": "block"
                });
                $("#tab-1 .firstSlider .slider ul li").css({
                    "position": "absolute",
                    "left": (-1) * parseInt($(".secondStep").width()) + "px"
                });
                $("#tab-1 .firstSlider .slider ul li:eq(0)").css({
                    "left": "0px"
                });
                $(".slideText").css({
                    "display": "none"
                });
                slideSliderOne(index)
            });
        } else {
            slideSliderOne(index);
        }
    }
});
//step one functionality finished

//step two functionality begins
var initiateStepTwo = (function () {
	$("#tab-2 .nextTab").unbind('click');
    $("#tab-2 .nextTab").on('click', function () {
        $("#horizontalTab ul li a[href='#tab-3']").trigger('click');
    });
    $("#tab-2 .message,#tab-2 .lastMessage").css({
        "display" : "none"
    });

    $("#tab-2 .introMessage").css({
    	"left"    : "-100%"
    });

    $("#tab-2 .player").css({
    	"opacity" : "0.6"
    });

    $("#tab-2 .introMessage").animate({
    	"left" : "0px"
    }, 1000, function() {
    	$("#tab-2 .player").attr('isclicked', 0);
    	$("#tab-2 .player").unbind('click');
    	$("#tab-2 .player").unbind('mouseenter');
    	$("#tab-2 .player").unbind('mouseleave');
    	$("#tab-2 .player").on('mouseenter', function(event) {
			$("#tab-2 .player[isclicked='0']").css({
	    		"opacity" : "0.6"
	    	});
	    	$(event.currentTarget).css({
	    		"opacity" : "1"
	    	});    		
    	});
    	$("#tab-2 .player").on('mouseleave', function(event) {
			$(event.currentTarget).css({
	    		"opacity" : "0.6"
	    	});
    	});
    	$("#tab-2 .player").on('click', function(event){
    		$(event.currentTarget).unbind('click');
    		$(event.currentTarget).unbind('mouseenter');
    		$(event.currentTarget).unbind('mouseleave');
    		$(event.currentTarget).css({
	    		"opacity" : "1"
	    	});
	    	$(event.currentTarget).attr('isclicked', '1');
	    	if($(event.currentTarget).hasClass('firstPlayer')) {
	    		var bottom = $("#tab-2 .firstMessage").css('bottom');
	    		if(typeof bottom == "undefined" || bottom == null || !bottom || bottom == 'auto') {
	    			bottom = 0;
	    		}
	    		$("#tab-2 .firstMessage").css({
	    			"display" : "block",
	    			"bottom"  : "100%"
	    		});
	    		$("#tab-2 .firstMessage").animate({
	    			"bottom" : bottom 
	    		},{
	    			"duration": 300,
                	"easing": 'easeOutBounce',
	    		});
	    	}
	    	else if($(event.currentTarget).hasClass('secondPlayer')) {
	    		var bottom = $("#tab-2 .secondMessage").css('bottom');
	    		if(typeof bottom == "undefined" || bottom == null || !bottom || bottom == 'auto') {
	    			bottom = 0;
	    		}
	    		$("#tab-2 .secondMessage").css({
	    			"display" : "block",
	    			"bottom"  : "100%"
	    		});
	    		$("#tab-2 .secondMessage").animate({
	    			"bottom" : bottom 
	    		},{
	    			"duration": 300,
                	"easing": 'easeOutBounce',
	    		});
	    	}
	    	else if($(event.currentTarget).hasClass('thirdPlayer')) {
	    		var bottom = $("#tab-2 .thirdMessage").css('bottom');
	    		if(typeof bottom == "undefined" || bottom == null || !bottom || bottom == 'auto') {
	    			bottom = 0;
	    		}
	    		$("#tab-2 .thirdMessage").css({
	    			"display" : "block",
	    			"bottom"  : "100%"
	    		});
	    		$("#tab-2 .thirdMessage").animate({
	    			"bottom" : bottom 
	    		},{
	    			"duration": 300,
                	"easing": 'easeOutBounce',
	    		});
	    	}
	    	else if($(event.currentTarget).hasClass('fourthPlayer')) {
	    		var bottom = $("#tab-2 .fourthMessage").css('bottom');
	    		if(typeof bottom == "undefined" || bottom == null || !bottom || bottom == 'auto') {
	    			bottom = 0;
	    		}
	    		$("#tab-2 .fourthMessage").css({
	    			"display" : "block",
	    			"bottom"  : "100%"
	    		});
	    		$("#tab-2 .fourthMessage").animate({
	    			"bottom" : bottom 
	    		},{
	    			"duration": 300,
                	"easing": 'easeOutBounce',
	    		});
	    	}
	    	var flag = 1;
	    	$("#tab-2 .message").each(function() {
	    		if(!$(this).is(':visible')) {
	    			flag = 0;
	    		}
	    	});
	    	if(flag == 1) {
	    		var bottom = $("#tab-2 .lastMessage").css('bottom');
	    		$("#tab-2 .lastMessage").css({
	    			"display" : "block",
	    			"bottom"  : "100%"
	    		});
	    		$("#tab-2 .lastMessage").animate({
	    			"bottom" : bottom 
	    		},{
	    			"duration": 300,
                	"easing": 'easeOutBounce',
	    		});
	    	}

    	})
    });
});
//step two functionality finished

var initiateStepThree = (function () {

});
var initiateStepFour = (function () {

});
var initiateStepFive = (function () {

});
$(document).ready(function () {
    initiateStepOne();
    $("#horizontalTab ul li a").on('click', function (event) {
        changeTab(event);
    });

});