/* =================================
------------------------------------
	Labs - Design Studio
	Version: 1.0
 ------------------------------------ 
 ====================================*/

'use strict';

/*------------------
	Preloder
--------------------*/
function loader() {
	$(window).on('load', function() { 
		$(".loader").fadeOut(); 
		$("#preloder").delay(400).fadeOut("slow");
	});
}



/*------------------
	Navigation
--------------------*/
function responsive() {
	// Responsive 
	$('.responsive').on('click', function(event) {
		$('.menu-list').slideToggle(400);
		event.preventDefault();
	});
}



/*------------------
	Hero Section
--------------------*/
function heroSection() {
	//Slide item bg image.
	$('.hero-item').each(function() {
		var image = $(this).data('bg');
		$(this).css({
			'background-image'  : 'url(' + image + ')',
			'background-size'   : 'cover',
			'background-repeat' : 'no-repeat',
			'background-position': 'center bottom'
		});
	});
	//slider auto height 
	var iit = setInterval(slide_item, 1);

	function slide_item() {
		var bh = $('body').height();
		$('.hero-item').height(bh);
	}
	slide_item();

	var time = 7;
	var $progressBar,
		$bar, 
		$elem, 
		isPause, 
		tick,
		percentTime;

	// Init the carousel
	$('#hero-slider').owlCarousel({
		loop: true,
		nav: true,
		items: 1,
		autoHeight:true,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
		onInitialized: progressBar,
		onTranslated: moved,
		onDrag: pauseOnDragging
	});

	// Init progressBar where elem is $("#owl-demo")
	function progressBar(){    
		// build progress bar elements
		buildProgressBar();

		// start counting
		start();
	}

	// create div#progressBar and div#bar then prepend to $("#owl-demo")
	function buildProgressBar(){
		$progressBar = $("<div>",{
			id:"progressBar"
		});
		$bar = $("<div>",{
			id:"bar"
		});
		$progressBar.append($bar).prependTo($("#hero-slider"));
	}

	function start() {
		// reset timer
		percentTime = 0;
		isPause = false;
		// run interval every 0.01 second
		tick = setInterval(interval, 10);
	};

	function interval() {
		if(isPause === false){
			percentTime += 1 / time;

			$bar.css({
				width: percentTime+"%"
			});

			// if percentTime is equal or greater than 100
			if(percentTime >= 100){
				// slide to next item 
				$("#hero-slider").trigger("next.owl.carousel");
				percentTime = 0; // give the carousel at least the animation time ;)
			}
		}
	}

	// pause while dragging 
	function pauseOnDragging(){
		isPause = true;
	}

	// moved callback
	function moved(){
		// clear interval
		clearTimeout(tick);
		// start again
		start();
	}

}



/*------------------
	Video Popup
--------------------*/
function videoPopup() {
	$('.video-popup').magnificPopup({
		type: 'iframe',
		autoplay : true
	});
}



/*------------------
	Testimonial
--------------------*/
function testimonial() {
	// testimonial Carousel 
	$('#testimonial-slide').owlCarousel({
		loop:true,
		autoplay:true,
		margin:30,
		nav:false,
		dots: true,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:2
			},
			800:{
				items:2
			},
			1000:{
				items:2
			}
		}
	});
}



/*------------------
	Progress bar
--------------------*/
function progressbar() {

	$('.progress-bar-style').each(function() {
		var progress = $(this).data("progress");
		var prog_width = progress + '%';
		if (progress <= 100) {
			$(this).append('<div class="bar-inner" style="width:' + prog_width + '"><span>' + prog_width + '</span></div>');
		}
		else {
			$(this).append('<div class="bar-inner" style="width:100%"><span>' + prog_width + '</span></div>');
		}
	});
}



/*------------------
	Accordions
--------------------*/
function accordions() {
	$('.panel').on('click', function (e) {
		$('.panel').removeClass('active');
		var $this = $(this);
		if (!$this.hasClass('active')) {
			$this.addClass('active');
		}
		e.preventDefault();
	});
}



/*------------------
	Progress Circle
--------------------*/
function progressCircle() {
	//Set progress circle 1
	$("#progress1").circleProgress({
		value: 0.75,
		size: 175,
		thickness: 5,
		fill: "#2be6ab",
		emptyFill: "rgba(0, 0, 0, 0)"
	});
	//Set progress circle 2
	$("#progress2").circleProgress({
		value: 0.83,
		size: 175,
		thickness: 5,
		fill: "#2be6ab",
		emptyFill: "rgba(0, 0, 0, 0)"
	});
	//Set progress circle 3
	$("#progress3").circleProgress({
		value: 0.25,
		size: 175,
		thickness: 5,
		fill: "#2be6ab",
		emptyFill: "rgba(0, 0, 0, 0)"
	});
	//Set progress circle 4
	$("#progress4").circleProgress({
		value: 0.95,
		size: 175,
		thickness: 5,
		fill: "#2be6ab",
		emptyFill: "rgba(0, 0, 0, 0)"
	});
}

function scrollToSection() {
	$('a[href*=#]').bind('click', function(e) {
		e.preventDefault(); // prevent hard jump, the default behavior

		var target = $(this).attr("href"); // Set the target as variable

		// perform animated scrolling by getting top-position of target-element and set it as scroll target
		$('html, body').stop().animate({
				scrollTop: $(target).offset().top
		}, 600, function() {
				location.hash = target; //attach the hash (#jumptarget) to the pageurl
		});

		return false;
	});
}


function submitContactForm() {
	$('#con_form').submit(function(event) {
		var name = $('#name-input').val();
		var email = $('#email-input').val();
		var subject = $('#subject-input').val();
		var message = $('#message-input').val();

		$('#con_form').html('<p class="message-success">Sending...</p>');
		const url = "https://staging.livingstone-game.com/api/contact/";
		
		const sendData = {
			author: name,
			email: email,
			message: "Message from livingstone.\nSubject: " + subject + "\n\n" + message,
		};

		$.ajax({
			method: "POST",
			url: url,
			dataType: "json",
			data: sendData,
			crossDomain: true,
			success: function(msg) {
				$('#con_form').html('<p class="message-success">Message was sent</p>');
			}
		})
		event.preventDefault();
	});
}

(function($) {
	// Call all functions
	loader();
	responsive();
	heroSection();
	testimonial();
	progressbar();
	videoPopup();
	accordions();
	progressCircle();
	scrollToSection();
	submitContactForm();
})(jQuery);