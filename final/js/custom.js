var changeTab = (function (event) {
    if (!event.handled) {
        event.handled = true;
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
    }
});

//step one functionality started
var timerforStepOne = null;
var indexForStepOne = 0;
var initiateStepOne = (function () {
    if (typeof timerforStepFour != "undefined" && timerforStepFour != null) {
        window.clearInterval(timerforStepFour);
    }
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
        "display": "none"
    });

    $("#tab-2 .introMessage").css({
        "left": "-100%"
    });

    $("#tab-2 .player").css({
        "opacity": "0.6"
    });

    $("#tab-2 .introMessage").animate({
        "left": "0px"
    }, 1000, function () {
        $("#tab-2 .player").attr('isclicked', 0);
        $("#tab-2 .player").unbind('click');
        $("#tab-2 .player").unbind('mouseenter');
        $("#tab-2 .player").unbind('mouseleave');
        $("#tab-2 .player").on('mouseenter', function (event) {
            $("#tab-2 .player[isclicked='0']").css({
                "opacity": "0.6"
            });
            $(event.currentTarget).css({
                "opacity": "1"
            });
        });
        $("#tab-2 .player").on('mouseleave', function (event) {
            $(event.currentTarget).css({
                "opacity": "0.6"
            });
        });
        $("#tab-2 .player").on('click', function (event) {
            $(event.currentTarget).unbind('click');
            $(event.currentTarget).unbind('mouseenter');
            $(event.currentTarget).unbind('mouseleave');
            $(event.currentTarget).css({
                "opacity": "1"
            });
            $(event.currentTarget).attr('isclicked', '1');
            if ($(event.currentTarget).hasClass('firstPlayer')) {
                var bottom = $("#tab-2 .firstMessage").css('bottom');
                if (typeof bottom == "undefined" || bottom == null || !bottom || bottom == 'auto') {
                    bottom = 0;
                }
                $("#tab-2 .firstMessage").css({
                    "display": "block",
                    "bottom": "100%"
                });
                $("#tab-2 .firstMessage").animate({
                    "bottom": bottom
                }, {
                    "duration": 300,
                    "easing": 'easeOutBounce',
                });
            } else if ($(event.currentTarget).hasClass('secondPlayer')) {
                var bottom = $("#tab-2 .secondMessage").css('bottom');
                if (typeof bottom == "undefined" || bottom == null || !bottom || bottom == 'auto') {
                    bottom = 0;
                }
                $("#tab-2 .secondMessage").css({
                    "display": "block",
                    "bottom": "100%"
                });
                $("#tab-2 .secondMessage").animate({
                    "bottom": bottom
                }, {
                    "duration": 300,
                    "easing": 'easeOutBounce',
                });
            } else if ($(event.currentTarget).hasClass('thirdPlayer')) {
                var bottom = $("#tab-2 .thirdMessage").css('bottom');
                if (typeof bottom == "undefined" || bottom == null || !bottom || bottom == 'auto') {
                    bottom = 0;
                }
                $("#tab-2 .thirdMessage").css({
                    "display": "block",
                    "bottom": "100%"
                });
                $("#tab-2 .thirdMessage").animate({
                    "bottom": bottom
                }, {
                    "duration": 300,
                    "easing": 'easeOutBounce',
                });
            } else if ($(event.currentTarget).hasClass('fourthPlayer')) {
                var bottom = $("#tab-2 .fourthMessage").css('bottom');
                if (typeof bottom == "undefined" || bottom == null || !bottom || bottom == 'auto') {
                    bottom = 0;
                }
                $("#tab-2 .fourthMessage").css({
                    "display": "block",
                    "bottom": "100%"
                });
                $("#tab-2 .fourthMessage").animate({
                    "bottom": bottom
                }, {
                    "duration": 300,
                    "easing": 'easeOutBounce',
                });
            }
            var flag = 1;
            $("#tab-2 .message").each(function () {
                if (!$(this).is(':visible')) {
                    flag = 0;
                }
            });
            if (flag == 1) {
                var bottom = $("#tab-2 .lastMessage").css('bottom');
                $("#tab-2 .lastMessage").css({
                    "display": "block",
                    "bottom": "100%"
                });
                $("#tab-2 .lastMessage").animate({
                    "bottom": bottom
                }, {
                    "duration": 300,
                    "easing": 'easeOutBounce',
                });
            }

        })
    });
});
//step two functionality finished

//step three functionality begins
var animateFirstOption = function () {
    var rightStringArray = $(".footBallAnimate").css('right').split('px');
    var right = parseInt(rightStringArray[0]);
    var width = $("#tab-3 .footBallAnimate img").width();
    var height = $("#tab-3 .footBallAnimate img").height();
    if (height == 0) {
        height = parseInt($("#tab-3 .footBallAnimate img").attr('height'));
    }
    right = right * 3;
    $("#tab-3 .footBallAnimate img").animate({
        "width": (width * 3) + "px",
        "height": (height * 3) + "px"
    }, 500);
    $("#tab-3 .footBallAnimate").animate({
        "right": right + "px",
        "top": "30px",
    }, 500, function () {
        $("#tab-3 .footBallAnimate").animate({
            "right": -parseInt($("#tab-3 .firstOption").width()) + "px",
            "top": "20px",
            "opacity": "0.1"
        }, 500, function () {});
        $("#tab-3 .footBallAnimate img").animate({
            "width": (width * 30) + "px",
            "height": (height * 30) + "px"
        }, 500, function () {
            $("#tab-3 .firstOption").css({
                "display": "none"
            });
            $("#tab-3 .secondOption").css({
                "display": "block"
            });
        });
    });
}
var initiateStepThree = (function () {
    $("#tab-3 .secondOption,#tab-3 .thirdOption").css({
        display: "none"
    });
    $("#tab-3 .firstOption").removeAttr('style');
    $("#tab-3 .footBallAnimate").removeAttr('style');
    $("#tab-3 .footBallAnimate  img").removeAttr('style');
    $("#tab-3 #thirdStepSubmit").unbind('click');
    $("#tab-3 #thirdStepSubmit").on('click', function () {
        $("#tab-3 .secondOption").css({
            "display": "none"
        });
        $("#tab-3 .thirdOption").css({
            "display": "block"
        });
    });
    $("#tab-3 #thirdStepPrev").unbind('click');
    $("#tab-3 #thirdStepPrev").on('click', function () {
        $("#tab-3 .secondOption").css({
            "display": "block"
        });
        $("#tab-3 .thirdOption").css({
            "display": "none"
        });
    });
    $("#tab-3 .nextTab").unbind('click');
    $("#tab-3 .nextTab").on('click', function () {
        $("#horizontalTab ul li a[href='#tab-4']").trigger('click');
    });
    $("#tab-3 .soccerForm a").unbind('click');
    $("#tab-3 .soccerForm a").on('click', function (event) {
        if ($(event.currentTarget).hasClass('active')) {
            $(event.currentTarget).removeClass('active')
        } else {
            $(event.currentTarget).addClass('active')
        }
    })
    animateFirstOption();
});
//step three functionality finished

//step four functionality strts
var timerforStepFour = null;
var indexForStepFour = 0;
var initiateStepFour = (function () {
    if (typeof timerforStepOne != "undefined" && timerforStepOne != null) {
        window.clearInterval(timerforStepOne);
    }
    indexForStepFour = 0;
    timerforStepFour = null;
    $("#tab-4 .secondSlider .slider").css({
        "display": "none"
    });
    $("#tab-4 .slideText").css({
        "left": (parseInt($(".secondStep").width()) / 2.5) + "px"
    });
    $("#tab-4 .secondSlider .slider ul").css({
        width: ($("#tab-4 .secondSlider .slider ul li:eq(1)").width() * $("#tab-4 .secondSlider .slider ul li").length) + "px"
    });
    $("#tab-4 .secondSlider .thumb .slides li").css({
        "opacity": "0.5"
    });
    $("#tab-4 .secondSlider .secondIntroMessage").css({
        "display": "block",
        "opacity": "0"
    });
    $("#tab-4 .secondSlider .secondIntroMessage").animate({
        "opacity": "1"
    }, 1000);
    $("#tab-4 .secondSlider .thumb .slides li").unbind('click');
    $("#tab-4 .secondSlider .thumb .slides li").attr('justclicked', '0');
    $("#tab-4 .secondSlider .thumb .slides li").on('click', function (event) {
        var thumbIndex = $("#tab-4 .secondSlider .thumb .slides li").index(event.currentTarget);
        indexForStepFour = thumbIndex;
        moveContentForStepFour(thumbIndex);
    });
    if (timerforStepFour == null) {
        timerforStepFour = window.setInterval(function () {
            indexForStepFour += 1;
            if (indexForStepFour > 4) {
                indexForStepFour = 0;
            }
            moveContentForStepFour(indexForStepFour);
        }, 10000);
    }
    $("#tab-4 .nextTab").unbind('click');
    $("#tab-4 .nextTab").on('click', function () {
        $("#horizontalTab ul li a[href='#tab-5']").trigger('click');
    });
});

var slideSliderFour = (function (index) {
    $("#tab-4 .secondSlider .thumb .slides li").css({
        "opacity": "0.5"
    });
    $("#tab-4 .secondSlider .thumb .slides li:eq(" + index + ")").css({
        "opacity": "1"
    });
    var presentElement;
    $("#tab-4 .secondSlider .slider ul li").each(function () {
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
        // $(".slideText", presentElement).css({
        //     "display": "none"
        // });
        $("#tab-4 .secondSlider .slider ul li:eq(" + index + ")").css({
            "left": "-100%"
        });
        $("#tab-4 .secondSlider .slider ul li:eq(" + index + ")").animate({
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
                    $("#tab-4 .secondSlider .thumb .slides li").attr('justclicked', 0);
                }
            });

        });
    });
});

var moveContentForStepFour = (function (index) {
    if ($("#tab-4 .secondSlider .thumb .slides li:eq(0)").attr('justclicked') == "0") {
        $("#tab-4 .secondSlider .thumb .slides li").attr('justclicked', 1);
        if (!$("#tab-4 .secondSlider .slider").is(":visible")) {
            $("#tab-4 .secondSlider .secondIntroMessage").fadeOut('slow', function () {
                $("#tab-4 .secondSlider .slider").css({
                    "display": "block"
                });
                $("#tab-4 .secondSlider .slider ul li").css({
                    "position": "absolute",
                    "left": (-1) * parseInt($(".secondStep").width()) + "px"
                });
                $("#tab-4 .secondSlider .slider ul li:eq(0)").css({
                    "left": "0px"
                });
                $(".slideText").css({
                    "display": "none"
                });
                slideSliderFour(index)
            });
        } else {
            slideSliderFour(index);
        }
    }
});
//step four functionality finished

//step five functionality begins
var animateFifthOption = (function () {
    var leftStringArray = $("#tab-5 .footBallTwo").css('left').split('px');
    var left = parseInt(leftStringArray[0]);
    if (left < 50) {
        left = (parseInt($("#horizontalTab").width()) / 2);
    }
    var width = $("#tab-5 .footBallTwo img").width();
    var height = $("#tab-5 .footBallTwo img").height();
    if (height == 0) {
        height = parseInt($("#tab-5 .footBallTwo img").attr('height'));
    }
    left = left * 1.5;
    console.log("right ::" + left);
    $("#tab-5 .footBallTwo img").animate({
        "width": (width * 2) + "px",
        "height": (height * 2) + "px"
    }, 700);
    $("#tab-5 .footBallTwo").animate({
        "left": left + "px",
        "top": "170px",
    }, 700, function () {
        $("#tab-5 .footBallTwo").animate({
            "left": "0px",
            "top": "0px",
            "opacity": "0"
        }, 500, function () {});
        $("#tab-5 .footBallTwo img").animate({
            "width": (width * 10) + "px",
            "height": (height * 10) + "px"
        }, 500, function () {
            $("#tab-5 .optionThree").css({
                "display": "none"
            });
            $("#tab-5 .optionFour").css({
                "display": "block"
            });
        })
    });
});
var initiateStepFive = (function () {
    $("#tab-5 .optionThree").removeAttr('style');
    $("#tab-5 .footBallTwo").removeAttr('style');
    $("#tab-5 .footBallTwo  img").removeAttr('style');
    $("#tab-5 .optionThree").css({
        "display": "block"
    });
    $("#tab-5 .optionFour").css({
        "display": "none"
    });
    animateFifthOption();
});
//step five functionality ends

//pulse functionality begins
var pulseFlag = 0;
var pulse = (function (width, height) {
    $('.ballAnimation img').animate({
        "width"   : ((typeof width!="undefined") ? width : 200) + "px",
        "height"  : ((typeof height!="undefined") ? height : 200) + "px" ,
        "opacity" : 1
    }, 600, function () {
        $('.ballAnimation img').animate({
            width: 79,
            height: 79,
            opacity: 1
        }, 500, function () {
            pulseFlag++;
            switch (pulseFlag) {
            case 1:
                pulse(150, 150, 500);
                break;
            case 2:
                pulse(100, 100, 200);
                break;
            case 3:
                pulseFlag = 0;
                pulse();
                //stepOnecon();
            default:
                pulse();
            }
        });
    });
});
//pulse functionality ends

$(document).ready(function () {
    //initiateStepOne();
    $("#horizontalTab ul li a").on('click', function (event) {
        changeTab(event);
    });
    pulse();
    var windowWidth = parseInt($(window).width());
	if(windowWidth<768) {
		$("#tab-1,#tab-4").css({
			"min-height" : "600px"
		});
		$("div[id='tab-2']").css({
			"min-height" : "1500px"
		});
	}
    $(window).resize(function() {
    	var windowWidth = parseInt($(window).width());
    	if(windowWidth<768) {
    		$("#tab-1,#tab-4").css({
    			"min-height" : "600px"
    		});
    		$("div[id='tab-2']").css({
				"min-height" : "1500px"
			});
    	}
    });
});
$(window).load(function () {
	$("a.r-tabs-anchor").on('click', function (event) {
	    changeTab(event);
	});
	$(".ballAnimation").fadeOut("slow", function () {
		pulse = (function(){return false;});
       $(".welcomePannel").fadeIn("slow", function() {
       		$(".welcomePannel .football").unbind('click');
       		$(".welcomePannel .football").on('click', function() {
       			$(".welcomePannel .player").fadeOut('slow');
       			$(".welcomePannel .football").fadeOut('slow');
       			$(".welcomePannel .logo").fadeOut('slow', function() {
       				$(".welcomePannel").css({
						"display" : "none"
					});
					
					
					$(".secondStep").css({
						"display" : "block",
					});
					$("#horizontalTab ul li a[href='#tab-1']").trigger('click');
					var secondStepWidth = $(".secondStep").width();
					$(".secondStep").css({
						"width"   :"0px"
					});
					$(".secondStep").animate({
						"width"   : secondStepWidth + "px"
					},1000, function(){
						$(".secondStep").removeAttr('style');
					});
       			});
       		});
       });
	});
	    
});