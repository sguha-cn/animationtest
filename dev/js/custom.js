jQuery(window).load(function () {
  $(".ballanimation").fadeOut("slow", function () {
    $(".stepOnecon").fadeIn("slow");
  });
});
var clonedStepOneData;
$(document).ready(function () {
  var pulseFlag = 0;
  var pulse = function (width, height) {
    $('#ballanimation').animate({
      width: width ? width : 200,
      height: height ? height : 200,
      opacity: 1
    }, 600, function () {
      $('#ballanimation').animate({
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
          //pulse();
        }
      });
    });
  };
  pulse();

  // platbntone action 
  $('#platbntone').click(function () {
    clonedStepOneData = $(".stepOnebox:first").clone('true');
    $('.textBox').animate({
      left: 300,
      top: 125,
      width: 0,
      height: 0,
      opacity: 0,
      "font-size": 0

    }, 700, function () {
      $('.textBox').css("display", "none");
    });
    $('.playerOne').animate({
      opacity: 0.5
    }, 700, function () {
      $('.playerOne').css("display", "none");
      stepTwoboxShow();
    });
    var stepTwoboxShow = function () {

        $(".stepOnebox").fadeOut("slow", function () {
          $(".stepTwobox").fadeIn("slow", function () {

            $(".stepTwobox").animate({
              width: "100%",
              left: 0
            }, 1000, function () {
              $('#horizontalTab li:first a').trigger("click");
              initiateSlider();
              setTimeout(function () {
                $(".fontIntroMessage").fadeOut("slow", function () {
                  $(".customSlider").fadeIn("slow");
                });
              }, 5000);
              
            });
          });
        });
      }
     
  });


  $('.slideThumb').click(function (event) {
    var presentEvent = event;
    if ($(".fontIntroMessage").css('display') == "block") {
      $(".fontIntroMessage").fadeOut("slow", function () {
        $(".customSlider").fadeIn("slow", function () {
          invokeSliderMethod(presentEvent);
        });
      });
    } else {
      invokeSliderMethod(presentEvent);
    }
  });

  var invokeSliderMethod = function (event) {
    $(".slideText").css({
      "display" : "none"
    });
    var index = $("#carousel .slides li").index($(event.currentTarget).parent()[0]);
    if ($(".customSlider ul.slides li:eq(" + index + ")").css('left') !== "0px") {
      slide(index);
    } else {
      $(".customSlider ul.slides li:eq(" + index + ")").css({
        'left': "-700px"
      });
      slide(index);
    }
  }
  var slide = function (index) {
    $('.slideThumb').unbind('click');
	$(".thumbSlide li").fadeTo("fast",0.5);
	$(".thumbSlide li:eq(" + index + ")").fadeTo("fast",1);
    $(".customSlider ul.slides li:eq(" + index + ")").animate({
      left: "0px"
    }, 2000, function () {
      var thisElement = $(".customSlider ul.slides li:eq(" + index + ")")[0];
	  
      $(".slideText", thisElement).css({
        "top" : "0px",
        "display" : "block"
      });
      $(".slideText", thisElement).animate({
        "top" : "80px"
      }, {
        duration: 300,
        easing: 'easeOutBounce'
      });
      $('.slideThumb').bind('click', function (event) {
        $(".slideText").css({
          "display" : "none"
        });
        var index = $("#carousel .slides li").index($(event.currentTarget).parent()[0]);
        if ($(".customSlider ul.slides li:eq(" + index + ")").css('left') !== "0px") {
          slide(index);
        } else {
          $(".customSlider ul.slides li:eq(" + index + ")").css({
            'left': "-700px"
          });
          slide(index);
        }
      });
    });
    $(".customSlider ul.slides li").each(function () {
      if ($(this).css('left') == "0px") {
        $(this).animate({
          left: "700px"
        }, 2000, function () {
          $(this).css({
            left: "-700px"
          });

        });
      }
    });
  };
  var autoSlideIndex = 0;
  var autoSlide = window.setInterval(function() {console.log(autoSlideIndex);
    $(".slideThumb:eq("+autoSlideIndex+")").trigger('click');
    autoSlideIndex += 1;
    if(autoSlideIndex > 5) { 
      autoSlideIndex = 0;
    }
  }, 3500);
  var initiateSlider = function () {
    var left = 0;
    var width = $(".customSlider ul.slides li").width();
    $(".customSlider ul.slides li").css({
      "left": "-700px"
    });
	
    $(".customSlider ul.slides li:first").css({
      "left": "0px"
    });
  }
  var moveToNextSlide = function () {
    var tempLeftArray = $(".customSlider ul.slides li:last").css('left').split("px");
    var tempLeft = tempLeftArray[0];
    if (tempLeft <= 0) {
      $(".customSlider ul.slides li").each(function (index) {
        var width = $(".customSlider ul.slides li").width();
        var thisLeftStringArray = $(this).css('left').split("px");
        var newLeft = parseInt(thisLeftStringArray[0]) + index * width;
        $(this).animate({
          "left": newLeft + "px"
        }, 100);

      });
    } else {
      initiateSlider();
    }
  }


  $(".player").on('mouseenter', function (event) {
    $(event.currentTarget).css({
      "opacity": "1.0"
    });
  });
  $(".player").on('mouseleave', function (event) {
    if (!$(event.currentTarget).hasClass('activePlayer')) {
      $(event.currentTarget).css({
        "opacity": "0.5"
      });
    }
  });

  $(".player").on('click', function (event) {
    if ($(event.currentTarget).hasClass('firstPlayer')) {

      $(event.currentTarget).addClass('activePlayer');
      $(event.currentTarget).css({
        "opacity": "1.0"
      });
      $(".firstMessage").css({
        "display": "block"
      });
      $('.firstMessage').animate({
        top: 158
      }, {
        duration: 1000,
        easing: 'easeOutBounce'
      });
    } else if ($(event.currentTarget).hasClass('secondPlayer')) {
      $(event.currentTarget).addClass('activePlayer');
      $(".secondMessage").css({
        "display": "block"
      });
      $('.secondMessage').animate({
        top: 155
      }, {
        duration: 1000,
        easing: 'easeOutBounce'
      });
    } else if ($(event.currentTarget).hasClass('thirdPlayer')) {
      $(event.currentTarget).addClass('activePlayer');
      $(".thirdMessage").css({
        "display": "block"
      });
      $('.thirdMessage').animate({
        top: 230
      }, {
        duration: 1000,
        easing: 'easeOutBounce'
      });
    } else if ($(event.currentTarget).hasClass('fourthPlayer')) {
      $(event.currentTarget).addClass('activePlayer');
      $(".fourthMessage").css({
        "display": "block"
      });
      $('.fourthMessage').animate({
        top: 115
      }, {
        duration: 1000,
        easing: 'easeOutBounce'
      });
    }
    var flag = 1;
    $(".message").not(".lastMessage").each(function () {
      if ($(this).css('display') == "none") {
        flag = 0
      }
    })
    if (flag) {
      $(".lastMessage").css({
        "display": "block"
      });
      $('.lastMessage').animate({
        top: "331px"
      }, {
        duration: 1400,
        easing: 'easeOutBounce'
      });
    }
  });
  $("#horizontalTab ul li a").on('click', function (event) {
    var number = $(event.currentTarget).data('number');
    switch (number) {
      case 1:
        resetStep1();
        break;
      case 2:
        resetStep2();
        break;
      case 3:
        resetStep3();
        break;
      case 4:
        resetStep4();
        break;
      case 5:
        resetStep5();
        break;
    }
  });

  $('.nextTab').on('click', function (event) {
    var currentTab = parseInt($(event.currentTarget).data('tabnumber'));
    if(currentTab == 5) {
      $(".stepTwobox").fadeOut('slow', function() {
        $(".stepOnebox:first").html(clonedStepOneData);
        $(".stepOnebox:first").css({
          "display" : "Block"
        });
      });
    } else {
      $('a[href="#tab-'+(currentTab+1)+'"]').trigger("click");
    }
  });
  var step1IntroMessageTimer;
  var resetStep1 = function () {
    $(".customSlider").css("display", "none");
    $(".fontIntroMessage").fadeIn("slow");
    $(".slideText").css({
      "display" : "none"
    });
    step1IntroMessageTimer = window.setInterval(function () {
      $(".fontIntroMessage").fadeOut("slow", function () {
        $(".customSlider").fadeIn("slow");
      });
    }, 5000);
  };
  var resetStep2 = function () {
    $(".player").css({
      "opacity": "0.5",
      "cursor": "pointer"
    });
    $(".message").css({
      "display": "none",
      "top": "-100%"
    });
    $(".introMessage").css({
      "left": "-100%"
    });
    $(".introMessage").animate({
      "left": "0px"
    }, 500)
  }
  var animateFirstOption = function () {
    var rightStringArray = $(".footBallAnimate").css('right').split('px');
    var right = parseInt(rightStringArray[0]);
    var width = $(".footBallAnimate img").width();
    var height = $(".footBallAnimate img").height();
    if (height == 0) {
      height = parseInt($(".footBallAnimate img").attr('height'));
    }
    right = right * 3;
    $(".footBallAnimate img").animate({
      "width": (width * 3) + "px",
      "height": (height * 3) + "px"
    }, 500);
    $(".footBallAnimate").animate({
      "right": right + "px",
      "top": "30px",
    }, 500, function () {
      $(".footBallAnimate").animate({
        "right": -600 + "px",
        "top": "20px",
        "opacity": "0.1"
      }, 500, function () {});
      $(".footBallAnimate img").animate({
        "width": (width * 30) + "px",
        "height": (height * 30) + "px"
      }, 500, function () {
        $(".firstOption").css({
          "display": "none"
        });
        $(".secondOption").css({
          "display": "block"
        });
      });
    });
  }
  var resetStep3 = function () {
    $(".firstOption").removeAttr('style');
    $(".footBallAnimate").removeAttr('style');
    $(".footBallAnimate  img").removeAttr('style');
    $(".firstOption").css({
      "display": "block"
    });
    $(".secondOption").css({
      "display": "none"
    });
    $(".thirdOption").css({
      "display": "none"
    });
    animateFirstOption();
  }


  $('#thirdStepSubmit').click(function (event) {
    event.preventDefault();
    $(".secondOption").css({
      "display": "none"
    });
    $(".thirdOption").css({
      "display": "block"
    });
  });

  $('#thirdStepPrev').click(function (event) {
    event.preventDefault();
    $(".thirdOption").css({
      "display": "none"
    });
    $(".secondOption").css({
      "display": "block"
    });
  });
  $('.soccerForm').click(function (event) {
    if ($("a", event.currentTarget).hasClass('active')) {
      $("a", event.currentTarget).removeClass('active');
    } else {
      $("a", event.currentTarget).addClass('active');
    }
  })

  $('.slideThumb_four').click(function (event) {
    var index = $("#carouselTwo .slidesTwo li").index($(event.currentTarget).parent()[0]);
    if ($(".customSliderTwo ul.slidesTwo li:eq(" + index + ")").css('left') != "0px") {
      //console.log("Index" + index);
      slideTwo(index);
    }
  });
  var resetStep4 = function () {
    $(".customSliderTwo").css("display", "none");
    $(".secondIntroMessage").fadeIn("slow");
    setTimeout(function () {
      $(".secondIntroMessage").fadeOut("slow", function () {
        $(".customSliderTwo").fadeIn("slow");
      });
    }, 5000);
  };

  // Tab-4 Slider 
  $('.slideThumb_four').click(function (event) {
    var presentEvent = event;
    if ($(".secondIntroMessage").css('display') == "block") {
      $(".secondIntroMessage").fadeOut("slow", function () {
        $(".customSliderTwo").fadeIn("slow", function () {
          invokeSliderMethodTwo(presentEvent);
        });
      });
    } else {
      invokeSliderMethodTwo(presentEvent);
    }
  });
  var invokeSliderMethodTwo = function (event) {
    $(".slideTextTwo").css({
      "display" : "none"
    });
    var index = $("#carouselTwo .slidesTwo li").index($(event.currentTarget).parent()[0]);
    if ($(".customSliderTwo ul.slidesTwo li:eq(" + index + ")").css('left') !== "0px") {
      slideTwo(index);
    } else {
      $(".customSliderTwo ul.slidesTwo li:eq(" + index + ")").css({
        'left': "-700px"
      });
      slideTwo(index);
    }
  }
  var slideTwo = function (index) {
    $('.slideThumb_four').unbind('click');
    $(".customSliderTwo ul.slidesTwo li:eq(" + index + ")").animate({
      left: "0px"
    }, 1000, function () {
      var thisElement = $(".customSliderTwo ul.slidesTwo li:eq(" + index + ")")[0];
      $(".slideTextTwo", thisElement).css({
        "top" : "0px",
        "display" : "block"
      });
      $(".slideTextTwo", thisElement).animate({
        "top" : "80px"
      }, {
        duration: 300,
        easing: 'easeOutBounce'
      });
      $('.slideThumb_four').bind('click', function (event) {
        $(".slideTextTwo").css({
          "display" : "none"
        });
        var index = $("#carouselTwo .slidesTwo li").index($(event.currentTarget).parent()[0]);
        if ($(".customSliderTwo ul.slidesTwo li:eq(" + index + ")").css('left') !== "0px") {
          slideTwo(index);
        } else {
          $(".customSliderTwo ul.slidesTwo li:eq(" + index + ")").css({
            'left': "-700px"
          });
          slideTwo(index);
        }
      });
    });
    $(".customSliderTwo ul.slidesTwo li").each(function () {
      if ($(this).css('left') == "0px") {
        $(this).animate({
          left: "700px"
        }, 1000, function () {
          $(this).css({
            left: "-700px"
          });

        });
      }
    });
  };
  var initiateSliderTwo = function () {
    var left = 0;
    var width = $(".customSliderTwo ul.slidesTwo li").width();
    $(".customSliderTwo ul.slidesTwo li").css({
      "left": "-700px"
    });
    $(".customSliderTwo ul.slidesTwo li:first").css({
      "left": "0px"
    });
  }
  var moveToNextSlide = function () {
    var tempLeftArray = $(".customSliderTwo ul.slidesTwo li:last").css('left').split("px");
    var tempLeft = tempLeftArray[0];
    if (tempLeft <= 0) {
      $(".customSliderTwo ul.slidesTwo li").each(function (index) {
        var width = $(".customSliderTwo ul.slidesTwo li").width();
        var thisLeftStringArray = $(this).css('left').split("px");
        var newLeft = parseInt(thisLeftStringArray[0]) + index * width;
        $(this).animate({
          "left": newLeft + "px"
        }, 100);

      });
    } else {
      initiateSlider();
    }
  }

  // Step 5 Initialised
  var resetStep5 = function () {
    $(".optionThree").removeAttr('style');
    $(".footBallTwo").removeAttr('style');
    $(".footBallTwo  img").removeAttr('style');
    $(".optionThree").css({
      "display": "block"
    });
    $(".optionFour").css({
      "display": "none"
    });
    animateFifthOption();
  }

  // Animate Football for 5th tab
  var animateFifthOption = function () {
    var leftStringArray = $(".footBallTwo").css('left').split('px');
    var left = parseInt(leftStringArray[0]);
    var width = $(".footBallTwo img").width();
    var height = $(".footBallTwo img").height();
    if (height == 0) {
      height = parseInt($(".footBallTwo img").attr('height'));
    }
    left = left * 1.5;
    console.log("right ::" + left);
    $(".footBallTwo img").animate({
      "width": (width * 2) + "px",
      "height": (height * 2) + "px"
    }, 700);
    $(".footBallTwo").animate({
      "left": left + "px",
      "top": "170px",
    }, 700, function () {
      $(".footBallTwo").animate({
        "left": "0px",
        "top": "0px",
        "opacity": "0"
      }, 500, function () {});
      $(".footBallTwo img").animate({
        "width": (width * 10) + "px",
        "height": (height * 10) + "px"
      }, 500, function () {
        $(".optionThree").css({
          "display": "none"
        });
        $(".optionFour").css({
          "display": "block"
        });
      })
    });
  }

  
  
});

/* this section is needed for the responsive part*/

// $(document).ready(function() {
//   var pulseFlag = 0;
//   var pulse = function (width, height) {
//     $('#ballanimation').animate({
//       width: width ? width : 200,
//       height: height ? height : 200,
//       opacity: 1
//     }, 600, function () {
//       $('#ballanimation').animate({
//         width: 79,
//         height: 79,
//         opacity: 1
//       }, 500, function () {
//         pulseFlag++;
//         switch (pulseFlag) {
//         case 1:
//           pulse(150, 150, 500);
//           break;
//         case 2:
//           pulse(100, 100, 200);
//           break;
//         case 3:
//           pulseFlag = 0;
//           pulse();
//           //stepOnecon();
//         default:
//           //pulse();
//         }
//       });
//     });
//   };
//   pulse();

//   // platbntone action 
//   $('#platbntone').click(function () {
//     clonedStepOneData = $(".stepOnebox:first").clone('true');
//     $('.textBox').animate({
//       left: 300,
//       top: 125,
//       width: 0,
//       height: 0,
//       opacity: 0,
//       "font-size": 0

//     }, 700, function () {
//       $('.textBox').css("display", "none");
//     });
//     $('.playerOne').animate({
//       opacity: 0.5
//     }, 700, function () {
//       $('.playerOne').css("display", "none");
//       stepTwoboxShow();
//     });
//     var stepTwoboxShow = function () {

//         $(".stepOnebox").fadeOut("slow", function () {
//           $(".stepTwobox").fadeIn("slow", function () {

//             $(".stepTwobox").animate({
//               width: "100%",
//               left: 0
//             }, 1000, function () {
//               $('#horizontalTab li:first a').trigger("click");
//               initiateSlider();
//               setTimeout(function () {
//                 $(".fontIntroMessage").fadeOut("slow", function () {
//                   $(".customSlider").fadeIn("slow");
//                 });
//               }, 5000);
              
//             });
//           });
//         });
//       }
     
//   });


//   $('.slideThumb').click(function (event) {
//     var presentEvent = event;
//     if ($(".fontIntroMessage").css('display') == "block") {
//       $(".fontIntroMessage").fadeOut("slow", function () {
//         $(".customSlider").fadeIn("slow", function () {
//           invokeSliderMethod(presentEvent);
//         });
//       });
//     } else {
//       invokeSliderMethod(presentEvent);
//     }
//   });

//   var invokeSliderMethod = function (event) {
//     $(".slideText").css({
//       "display" : "none"
//     });
//     var index = $("#carousel .slides li").index($(event.currentTarget).parent()[0]);
//     if ($(".customSlider ul.slides li:eq(" + index + ")").css('left') !== "0px") {
//       slide(index);
//     } else {
//       $(".customSlider ul.slides li:eq(" + index + ")").css({
//         'left': "-700px"
//       });
//       slide(index);
//     }
//   }
//   var slide = function (index) {
//     $('.slideThumb').unbind('click');
//   $(".thumbSlide li").fadeTo("fast",0.5);
//   $(".thumbSlide li:eq(" + index + ")").fadeTo("fast",1);
//     $(".customSlider ul.slides li:eq(" + index + ")").animate({
//       left: "0px"
//     }, 2000, function () {
//       var thisElement = $(".customSlider ul.slides li:eq(" + index + ")")[0];
    
//       $(".slideText", thisElement).css({
//         "top" : "0px",
//         "display" : "block"
//       });
//       $(".slideText", thisElement).animate({
//         "top" : "80px"
//       }, {
//         duration: 300,
//         easing: 'easeOutBounce'
//       });
//       $('.slideThumb').bind('click', function (event) {
//         $(".slideText").css({
//           "display" : "none"
//         });
//         var index = $("#carousel .slides li").index($(event.currentTarget).parent()[0]);
//         if ($(".customSlider ul.slides li:eq(" + index + ")").css('left') !== "0px") {
//           slide(index);
//         } else {
//           $(".customSlider ul.slides li:eq(" + index + ")").css({
//             'left': "-700px"
//           });
//           slide(index);
//         }
//       });
//     });
//     $(".customSlider ul.slides li").each(function () {
//       if ($(this).css('left') == "0px") {
//         $(this).animate({
//           left: "700px"
//         }, 2000, function () {
//           $(this).css({
//             left: "-700px"
//           });

//         });
//       }
//     });
//   };
//   var autoSlideIndex = 0;
//   var autoSlide = window.setInterval(function() {console.log(autoSlideIndex);
//     $(".slideThumb:eq("+autoSlideIndex+")").trigger('click');
//     autoSlideIndex += 1;
//     if(autoSlideIndex > 5) { 
//       autoSlideIndex = 0;
//     }
//   }, 3500);
//   var initiateSlider = function () {
//     var left = 0;
//     var width = $(".customSlider ul.slides li").width();
//     $(".customSlider ul.slides li").css({
//       "left": "-700px"
//     });
  
//     $(".customSlider ul.slides li:first").css({
//       "left": "0px"
//     });
//   }
//   var moveToNextSlide = function () {
//     var tempLeftArray = $(".customSlider ul.slides li:last").css('left').split("px");
//     var tempLeft = tempLeftArray[0];
//     if (tempLeft <= 0) {
//       $(".customSlider ul.slides li").each(function (index) {
//         var width = $(".customSlider ul.slides li").width();
//         var thisLeftStringArray = $(this).css('left').split("px");
//         var newLeft = parseInt(thisLeftStringArray[0]) + index * width;
//         $(this).animate({
//           "left": newLeft + "px"
//         }, 100);

//       });
//     } else {
//       initiateSlider();
//     }
//   }


//   $(".player").on('mouseenter', function (event) {
//     $(event.currentTarget).css({
//       "opacity": "1.0"
//     });
//   });
//   $(".player").on('mouseleave', function (event) {
//     if (!$(event.currentTarget).hasClass('activePlayer')) {
//       $(event.currentTarget).css({
//         "opacity": "0.5"
//       });
//     }
//   });

//   $(".player").on('click', function (event) {
//     if ($(event.currentTarget).hasClass('firstPlayer')) {

//       $(event.currentTarget).addClass('activePlayer');
//       $(event.currentTarget).css({
//         "opacity": "1.0"
//       });
//       $(".firstMessage").css({
//         "display": "block"
//       });
//       $('.firstMessage').animate({
//         top: 158
//       }, {
//         duration: 1000,
//         easing: 'easeOutBounce'
//       });
//     } else if ($(event.currentTarget).hasClass('secondPlayer')) {
//       $(event.currentTarget).addClass('activePlayer');
//       $(".secondMessage").css({
//         "display": "block"
//       });
//       $('.secondMessage').animate({
//         top: 155
//       }, {
//         duration: 1000,
//         easing: 'easeOutBounce'
//       });
//     } else if ($(event.currentTarget).hasClass('thirdPlayer')) {
//       $(event.currentTarget).addClass('activePlayer');
//       $(".thirdMessage").css({
//         "display": "block"
//       });
//       $('.thirdMessage').animate({
//         top: 230
//       }, {
//         duration: 1000,
//         easing: 'easeOutBounce'
//       });
//     } else if ($(event.currentTarget).hasClass('fourthPlayer')) {
//       $(event.currentTarget).addClass('activePlayer');
//       $(".fourthMessage").css({
//         "display": "block"
//       });
//       $('.fourthMessage').animate({
//         top: 115
//       }, {
//         duration: 1000,
//         easing: 'easeOutBounce'
//       });
//     }
//     var flag = 1;
//     $(".message").not(".lastMessage").each(function () {
//       if ($(this).css('display') == "none") {
//         flag = 0
//       }
//     })
//     if (flag) {
//       $(".lastMessage").css({
//         "display": "block"
//       });
//       $('.lastMessage').animate({
//         top: "331px"
//       }, {
//         duration: 1400,
//         easing: 'easeOutBounce'
//       });
//     }
//   });
//   $("#horizontalTab ul li a").on('click', function (event) {
//     var number = $(event.currentTarget).data('number');
//     switch (number) {
//       case 1:
//         resetStep1();
//         break;
//       case 2:
//         resetStep2();
//         break;
//       case 3:
//         resetStep3();
//         break;
//       case 4:
//         resetStep4();
//         break;
//       case 5:
//         resetStep5();
//         break;
//     }
//   });

//   $('.nextTab').on('click', function (event) {
//     var currentTab = parseInt($(event.currentTarget).data('tabnumber'));
//     if(currentTab == 5) {
//       $(".stepTwobox").fadeOut('slow', function() {
//         $(".stepOnebox:first").html(clonedStepOneData);
//         $(".stepOnebox:first").css({
//           "display" : "Block"
//         });
//       });
//     } else {
//       $('a[href="#tab-'+(currentTab+1)+'"]').trigger("click");
//     }
//   });
//   var step1IntroMessageTimer;
//   var resetStep1 = function () {
//     $(".customSlider").css("display", "none");
//     $(".fontIntroMessage").fadeIn("slow");
//     $(".slideText").css({
//       "display" : "none"
//     });
//     step1IntroMessageTimer = window.setInterval(function () {
//       $(".fontIntroMessage").fadeOut("slow", function () {
//         $(".customSlider").fadeIn("slow");
//       });
//     }, 5000);
//   };
//   var resetStep2 = function () {
//     $(".player").css({
//       "opacity": "0.5",
//       "cursor": "pointer"
//     });
//     $(".message").css({
//       "display": "none",
//       "top": "-100%"
//     });
//     $(".introMessage").css({
//       "left": "-100%"
//     });
//     $(".introMessage").animate({
//       "left": "0px"
//     }, 500)
//   }
//   var animateFirstOption = function () {
//     var rightStringArray = $(".footBallAnimate").css('right').split('px');
//     var right = parseInt(rightStringArray[0]);
//     var width = $(".footBallAnimate img").width();
//     var height = $(".footBallAnimate img").height();
//     if (height == 0) {
//       height = parseInt($(".footBallAnimate img").attr('height'));
//     }
//     right = right * 3;
//     $(".footBallAnimate img").animate({
//       "width": (width * 3) + "px",
//       "height": (height * 3) + "px"
//     }, 500);
//     $(".footBallAnimate").animate({
//       "right": right + "px",
//       "top": "30px",
//     }, 500, function () {
//       $(".footBallAnimate").animate({
//         "right": -600 + "px",
//         "top": "20px",
//         "opacity": "0.1"
//       }, 500, function () {});
//       $(".footBallAnimate img").animate({
//         "width": (width * 30) + "px",
//         "height": (height * 30) + "px"
//       }, 500, function () {
//         $(".firstOption").css({
//           "display": "none"
//         });
//         $(".secondOption").css({
//           "display": "block"
//         });
//       });
//     });
//   }
//   var resetStep3 = function () {
//     $(".firstOption").removeAttr('style');
//     $(".footBallAnimate").removeAttr('style');
//     $(".footBallAnimate  img").removeAttr('style');
//     $(".firstOption").css({
//       "display": "block"
//     });
//     $(".secondOption").css({
//       "display": "none"
//     });
//     $(".thirdOption").css({
//       "display": "none"
//     });
//     animateFirstOption();
//   }


//   $('#thirdStepSubmit').click(function (event) {
//     event.preventDefault();
//     $(".secondOption").css({
//       "display": "none"
//     });
//     $(".thirdOption").css({
//       "display": "block"
//     });
//   });

//   $('#thirdStepPrev').click(function (event) {
//     event.preventDefault();
//     $(".thirdOption").css({
//       "display": "none"
//     });
//     $(".secondOption").css({
//       "display": "block"
//     });
//   });
//   $('.soccerForm').click(function (event) {
//     if ($("a", event.currentTarget).hasClass('active')) {
//       $("a", event.currentTarget).removeClass('active');
//     } else {
//       $("a", event.currentTarget).addClass('active');
//     }
//   })

//   $('.slideThumb_four').click(function (event) {
//     var index = $("#carouselTwo .slidesTwo li").index($(event.currentTarget).parent()[0]);
//     if ($(".customSliderTwo ul.slidesTwo li:eq(" + index + ")").css('left') != "0px") {
//       //console.log("Index" + index);
//       slideTwo(index);
//     }
//   });
//   var resetStep4 = function () {
//     $(".customSliderTwo").css("display", "none");
//     $(".secondIntroMessage").fadeIn("slow");
//     setTimeout(function () {
//       $(".secondIntroMessage").fadeOut("slow", function () {
//         $(".customSliderTwo").fadeIn("slow");
//       });
//     }, 5000);
//   };

//   // Tab-4 Slider 
//   $('.slideThumb_four').click(function (event) {
//     var presentEvent = event;
//     if ($(".secondIntroMessage").css('display') == "block") {
//       $(".secondIntroMessage").fadeOut("slow", function () {
//         $(".customSliderTwo").fadeIn("slow", function () {
//           invokeSliderMethodTwo(presentEvent);
//         });
//       });
//     } else {
//       invokeSliderMethodTwo(presentEvent);
//     }
//   });
//   var invokeSliderMethodTwo = function (event) {
//     $(".slideTextTwo").css({
//       "display" : "none"
//     });
//     var index = $("#carouselTwo .slidesTwo li").index($(event.currentTarget).parent()[0]);
//     if ($(".customSliderTwo ul.slidesTwo li:eq(" + index + ")").css('left') !== "0px") {
//       slideTwo(index);
//     } else {
//       $(".customSliderTwo ul.slidesTwo li:eq(" + index + ")").css({
//         'left': "-700px"
//       });
//       slideTwo(index);
//     }
//   }
//   var slideTwo = function (index) {
//     $('.slideThumb_four').unbind('click');
//     $(".customSliderTwo ul.slidesTwo li:eq(" + index + ")").animate({
//       left: "0px"
//     }, 1000, function () {
//       var thisElement = $(".customSliderTwo ul.slidesTwo li:eq(" + index + ")")[0];
//       $(".slideTextTwo", thisElement).css({
//         "top" : "0px",
//         "display" : "block"
//       });
//       $(".slideTextTwo", thisElement).animate({
//         "top" : "80px"
//       }, {
//         duration: 300,
//         easing: 'easeOutBounce'
//       });
//       $('.slideThumb_four').bind('click', function (event) {
//         $(".slideTextTwo").css({
//           "display" : "none"
//         });
//         var index = $("#carouselTwo .slidesTwo li").index($(event.currentTarget).parent()[0]);
//         if ($(".customSliderTwo ul.slidesTwo li:eq(" + index + ")").css('left') !== "0px") {
//           slideTwo(index);
//         } else {
//           $(".customSliderTwo ul.slidesTwo li:eq(" + index + ")").css({
//             'left': "-700px"
//           });
//           slideTwo(index);
//         }
//       });
//     });
//     $(".customSliderTwo ul.slidesTwo li").each(function () {
//       if ($(this).css('left') == "0px") {
//         $(this).animate({
//           left: "700px"
//         }, 1000, function () {
//           $(this).css({
//             left: "-700px"
//           });

//         });
//       }
//     });
//   };
//   var initiateSliderTwo = function () {
//     var left = 0;
//     var width = $(".customSliderTwo ul.slidesTwo li").width();
//     $(".customSliderTwo ul.slidesTwo li").css({
//       "left": "-700px"
//     });
//     $(".customSliderTwo ul.slidesTwo li:first").css({
//       "left": "0px"
//     });
//   }
//   var moveToNextSlide = function () {
//     var tempLeftArray = $(".customSliderTwo ul.slidesTwo li:last").css('left').split("px");
//     var tempLeft = tempLeftArray[0];
//     if (tempLeft <= 0) {
//       $(".customSliderTwo ul.slidesTwo li").each(function (index) {
//         var width = $(".customSliderTwo ul.slidesTwo li").width();
//         var thisLeftStringArray = $(this).css('left').split("px");
//         var newLeft = parseInt(thisLeftStringArray[0]) + index * width;
//         $(this).animate({
//           "left": newLeft + "px"
//         }, 100);

//       });
//     } else {
//       initiateSlider();
//     }
//   }

//   // Step 5 Initialised
//   var resetStep5 = function () {
//     $(".optionThree").removeAttr('style');
//     $(".footBallTwo").removeAttr('style');
//     $(".footBallTwo  img").removeAttr('style');
//     $(".optionThree").css({
//       "display": "block"
//     });
//     $(".optionFour").css({
//       "display": "none"
//     });
//     animateFifthOption();
//   }

//   // Animate Football for 5th tab
//   var animateFifthOption = function () {
//     var leftStringArray = $(".footBallTwo").css('left').split('px');
//     var left = parseInt(leftStringArray[0]);
//     var width = $(".footBallTwo img").width();
//     var height = $(".footBallTwo img").height();
//     if (height == 0) {
//       height = parseInt($(".footBallTwo img").attr('height'));
//     }
//     left = left * 1.5;
//     console.log("right ::" + left);
//     $(".footBallTwo img").animate({
//       "width": (width * 2) + "px",
//       "height": (height * 2) + "px"
//     }, 700);
//     $(".footBallTwo").animate({
//       "left": left + "px",
//       "top": "170px",
//     }, 700, function () {
//       $(".footBallTwo").animate({
//         "left": "0px",
//         "top": "0px",
//         "opacity": "0"
//       }, 500, function () {});
//       $(".footBallTwo img").animate({
//         "width": (width * 10) + "px",
//         "height": (height * 10) + "px"
//       }, 500, function () {
//         $(".optionThree").css({
//           "display": "none"
//         });
//         $(".optionFour").css({
//           "display": "block"
//         });
//       })
//     });
//   }
// });