/*
Bones Scripts File
Author: Eddie Machado

This file should contain any js scripts you want to add to the site.
Instead of calling it in the header or throwing it inside wp_head()
this file will be called automatically in the footer so as not to
slow the page load.

*/

// IE8 ployfill for GetComputed Style (for Responsive Script below)
if (!window.getComputedStyle) {
	window.getComputedStyle = function(el, pseudo) {
		this.el = el;
		this.getPropertyValue = function(prop) {
			var re = /(\-([a-z]){1})/g;
			if (prop == 'float') prop = 'styleFloat';
			if (re.test(prop)) {
				prop = prop.replace(re, function () {
					return arguments[2].toUpperCase();
				});
			}
			return el.currentStyle[prop] ? el.currentStyle[prop] : null;
		}
		return this;
	}
}

// as the page loads, call these scripts
jQuery(document).ready(function($) {

	/*
	Responsive jQuery is a tricky thing.
	There's a bunch of different ways to handle
	it, so be sure to research and find the one
	that works for you best.
	*/
	
	/* getting viewport width */
	var responsive_viewport = $(window).width();
	
	/* if is below 481px */
	if (responsive_viewport < 481) {
	
	} /* end smallest screen */
	
	/* if is larger than 481px */
	if (responsive_viewport > 481) {
	
	} /* end larger than 481px */
	
	/* if is above or equal to 768px */
	if (responsive_viewport >= 768) {
	
		/* load gravatars */
		$('.comment img[data-gravatar]').each(function(){
			$(this).attr('src',$(this).attr('data-gravatar'));
		});
		
	}
	
	/* off the bat large screen actions */
	if (responsive_viewport > 1030) {
	
	}
	
	
	// add all your scripts here

	// Flexi Background
	/*
File: flexi-background.js

Author:
	Michael Bester <http://kimili.com>

About: Version
	2.0

Description:
	Javascript to set up full-screen flexible backgrounds in all widely used browsers.

Requirements:
	jQuery 1.3.2 or higher <http://jquery.com>
 
License:
	Copyright 2010, Michael Bester.
	Released under the MIT license <http://opensource.org/licenses/mit-license.php>
*/

(function($){
	
	/**
		CONFIGURATION:
		Define the size of our background image
	*/
	var bgImageSize = {
		width	: 640,
		height	: 426
	};
	
	/*	END CONFIGURATION */
	
	/**
		Detect support for CSS background-size. No need for any more javascript if background-size is supported.
		Property detection adapted from the most excellent Modernizr <http://modernizr.com>
	*/
	if ((function(){
		var el 		= document.createElement('div'),
			bs 		= 'backgroundSize',
			ubs		= bs.charAt(0).toUpperCase() + bs.substr(1),
			props	= [bs, 'Webkit' + ubs, 'Moz' + ubs, 'O' + ubs];
			
		for ( var i in props ) {
			if ( el.style[props[i]] !== undefined ) {
				return true;
			}
		}
		return false;
	}())) {
		return;
	};
	
	/**
		We also want to leave IE6 and below out in the cold with this
	*/
	if ( $.browser.msie && parseInt($.browser.version, 10) <= 6 ) {
		return;
	}
	
	/**
		If we've gotten here, we don't have background-size support,
		so we'll have to mimic it with Javascript.
		Let's set up some variables
	*/
	var $window		= $(window),
		imageID		= 'expando',
		tallClass	= 'tall',
		wideClass	= 'wide',
		$body, $bgImage, $wrapper, img, url, imgAR,

		/*
			Now we can move on with the core functionality of Flexibackground
		*/
		initialize = function() {
		
			// No need for any of this if the screen isn't bigger than the background image
			if (screen.availWidth <= bgImageSize.width && screen.availHeight <= bgImageSize.height) {
				return;
			}
		
			// Grab elements we'll reference throughout
			$body = $('body');
		
			// Parse out the URL of the background image and drop out if we don't have one
			url = $body.css('backgroundImage').replace(/^url\(("|')?|("|')?\);?$/g, '') || false;
			if (!url || url === "none" || url === "") {
				return;
			}
		
			// Get the aspect ratio of the image
			imgAR = bgImageSize.width / bgImageSize.height;

			// Create a new image element
			$bgImage = $(document.createElement('img'))
						.attr('src', url)
						.attr('id', imageID);
		
			// Create a wrapper and append the image to it.
			// The wrapper ensures we don't get scrollbars.
			$wrapper = $(document.createElement('div'))
						.css({
							'overflow'	: 'hidden',
							'position'	: 'fixed',
							'width'		: '100%',
							'height'	: '100%',
							'top'		: '0',
							'left'		: '0',
							'z-index'	: '-1'
						});
		
			$body.append(
				$wrapper.append($bgImage)
			);
		
			// Set up a resize listener to add/remove classes from the body 
			$(window)
				.resize(resizeAction)
				// roll it out by triggering a resize
				.trigger('resize');
		
		},
	
		/**
			Set up the action that happens on resize
		*/
		resizeAction = function() {
			var win = {
				height	: $window.height(),
				width	: $window.width()
			},

			// The current aspect ratio of the window
			winAR = win.width / win.height;

			// Determine if we need to show the image and whether it needs to stretch tall or wide
			if (win.width < bgImageSize.width && win.height < bgImageSize.height) {
				$body.removeClass(wideClass + ' ' + tallClass);
			} else if (winAR < imgAR) {
				$body
					.removeClass(wideClass)
					.addClass(tallClass);
				// Center the image
				$bgImage.css('left', Math.min(((win.width - bgImageSize.width) / 2), 0));
			} else if (winAR > imgAR) {
				$body
					.addClass(wideClass)
					.removeClass(tallClass);
				$bgImage.css('left', 0);
			}
		};
	
	// When the document is ready, run this thing.
	$(document).ready(initialize);
	
})(jQuery);



 
}); /* end of as page load scripts */


/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
*/
(function(w){
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ) ){ return; }
	var doc = w.document;
	if( !doc.querySelector ){ return; }
	var meta = doc.querySelector( "meta[name=viewport]" ),
		initialContent = meta && meta.getAttribute( "content" ),
		disabledZoom = initialContent + ",maximum-scale=1",
		enabledZoom = initialContent + ",maximum-scale=10",
		enabled = true,
		x, y, z, aig;
	if( !meta ){ return; }
	function restoreZoom(){
		meta.setAttribute( "content", enabledZoom );
		enabled = true; }
	function disableZoom(){
		meta.setAttribute( "content", disabledZoom );
		enabled = false; }
	function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );
		// If portrait orientation and in one of the danger zones
		if( !w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if( enabled ){ disableZoom(); } }
		else if( !enabled ){ restoreZoom(); } }
	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );
})( this );