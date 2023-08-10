/*
	Massively by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$nav = $('#nav'),
		$main = $('#main'),
		$navPanelToggle, $navPanel, $navPanelInner;

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				$bg = $('<div class="bg"></div>').appendTo($t),
				on, off;

			on = function() {

				$bg
					.removeClass('fixed')
					.css('transform', 'matrix(1,0,0,1,0,0)');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$bg.css('transform', 'matrix(1,0,0,1,0,' + (pos * intensity) + ')');

					});

			};

			off = function() {

				$bg
					.addClass('fixed')
					.css('transform', 'none');

				$window
					.off('scroll._parallax');

			};

			// Disable parallax on ..
				if (browser.name == 'ie'			// IE
				||	browser.name == 'edge'			// Edge
				||	window.devicePixelRatio > 1		// Retina/HiDPI (= poor performance)
				||	browser.mobile)					// Mobile devices
					off();

			// Enable everywhere else.
				else {

					breakpoints.on('>large', on);
					breakpoints.on('<=large', off);

				}

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly();

	// Background.
		$wrapper._parallax(0.925);

	// Nav Panel.

		// Toggle.
			$navPanelToggle = $(
				'<a href="#navPanel" id="navPanelToggle">Menu</a>'
			)
				.appendTo($wrapper);

			// Change toggle styling once we've scrolled past the header.
				$header.scrollex({
					bottom: '5vh',
					enter: function() {
						$navPanelToggle.removeClass('alt');
					},
					leave: function() {
						$navPanelToggle.addClass('alt');
					}
				});

		// Panel.
			$navPanel = $(
				'<div id="navPanel">' +
					'<nav>' +
					'</nav>' +
					'<a href="#navPanel" class="close"></a>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-navPanel-visible'
				});

			// Get inner.
				$navPanelInner = $navPanel.children('nav');

			// Move nav content on breakpoint change.
				var $navContent = $nav.children();

				breakpoints.on('>medium', function() {

					// NavPanel -> Nav.
						$navContent.appendTo($nav);

					// Flip icon classes.
						$nav.find('.icons, .icon')
							.removeClass('alt');

				});

				breakpoints.on('<=medium', function() {

					// Nav -> NavPanel.
						$navContent.appendTo($navPanelInner);

					// Flip icon classes.
						$navPanelInner.find('.icons, .icon')
							.addClass('alt');

				});

			// Hack: Disable transitions on WP.
				if (browser.os == 'wp'
				&&	browser.osVersion < 10)
					$navPanel
						.css('transition', 'none');

	// Intro.
		var $intro = $('#intro');

		if ($intro.length > 0) {

			// Hack: Fix flex min-height on IE.
				if (browser.name == 'ie') {
					$window.on('resize.ie-intro-fix', function() {

						var h = $intro.height();

						if (h > $window.height())
							$intro.css('height', 'auto');
						else
							$intro.css('height', h);

					}).trigger('resize.ie-intro-fix');
				}

			// Hide intro on scroll (> small).
				breakpoints.on('>small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'bottom',
						top: '25vh',
						bottom: '-50vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

				});

			// Hide intro on scroll (<= small).
				breakpoints.on('<=small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'middle',
						top: '15vh',
						bottom: '-15vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

			});

		}

})(jQuery);


    function refreshIframe() {
        var now = new Date();
        var targetTime = new Date(now);
        targetTime.setHours(24, 30, 0, 0); // Replace 10 with the desired hour and 30 with the desired minute for refresh

        var timeUntilRefresh = targetTime - now;
        if (timeUntilRefresh < 0) {
            // The target time has already passed today, schedule for tomorrow
            timeUntilRefresh += 24 * 60 * 60 * 1000;
        }

        setTimeout(function() {
            var iframe = document.getElementById('tracker'); // Replace 'tracker' with the actual ID of your iframe
            iframe.src = iframe.src; // Refresh the iframe content
            refreshIframe(); // Schedule the next refresh
        }, timeUntilRefresh);
    }

    refreshIframe(); // Start the refresh cycle

	window.addEventListener('load', function () {
		// Select the preloader and page content elements
		const preloader = document.querySelector('.preloader');
		
		const pageContent = document.querySelector('#root');
	  
		setTimeout(function () {
			preloader.style.opacity = 0;
			setTimeout(function () {
				preloader.style.display = "none";
			}, 1000); // Wait for the fade-out transition to complete
		}, 2000);

		// Hide the preloader when clicked
		preloader.addEventListener('click', handleClick);
		preloader.addEventListener('mouseleave', function () {
		  document.body.style.cursor = 'auto';
		});
	  });
		

	
	  window.addEventListener('DOMContentLoaded', function() {
		let slider = document.querySelector('.slider');
		let imageLinks = [
			{ imageUrl: 'images/1.gif', link: 'analytics_skills.html' },
			{ imageUrl: 'images/2.gif', link: 'mental_health.html' },
			{ imageUrl: 'images/3.gif', link: 'layoff.html' }
			// Add more image URLs and links as needed
		];
	
		function createArticle(imageUrl, link) {
			let article = document.createElement('article');
			let a = document.createElement('a');
			let img = document.createElement('img');
	
			a.href = link;
			a.className = 'image fit';
			img.src = imageUrl;
			img.alt = '';
			img.style.borderRadius = '20px';
			a.appendChild(img);
			article.appendChild(a);
			slider.appendChild(article);
		}
	
		function cloneImages() {
			let clonedArticles = slider.cloneNode(true).children;
			for (let article of clonedArticles) {
				slider.appendChild(article);
			}
		}
	
		// Create initial set of images
		imageLinks.forEach(function(imageLink) {
			createArticle(imageLink.imageUrl, imageLink.link);
		});
	
		let numImages = imageLinks.length;
	
		function startAutoplay() {
			slider.classList.add('play');
		}
	
		function stopAutoplay() {
			slider.classList.remove('play');
		}
	
		// Start autoplay and clone images for infinite loop
		startAutoplay();
		cloneImages();
	
		// Pause autoplay when mouse enters the slider
		slider.addEventListener('mouseenter', stopAutoplay);
	
		// Resume autoplay when mouse leaves the slider
		slider.addEventListener('mouseleave', startAutoplay);
	});

// this function creates the SVG and appends it to the element you give to it
function initClock(elt, color = '#ffd6eeec', backgroundColor = 'none', dateTime = new Date()) {
	let timeObj = {
		numberPathsD: {
			topM: "M 8 4 L 16 4 L 18 6 L 16 8 L 8 8 L 6 6 Z",
			midd: "M 8 18 L 16 18 L 18 20 L 16 22 L 8 22 L 6 20 Z",
			topL: "M 6 7 L 8 9 L 8 17 L 6 19 L 4 17 L 4 9 Z",
			topR: "M 18 7 L 20 9 L 20 17 L 18 19 L 16 17 L 16 9 Z",
			btmM: "M 8 32 L 16 32 L 18 34 L 16 36 L 8 36 L 6 34 Z",
			btmL: "M 6 21 L 8 23 L 8 31 L 6 33 L 4 31 L 4 23 Z",
			btmR: "M 18 21 L 20 23 L 20 31 L 18 33 L 16 31 L 16 23 Z"
		},
		seconds: {
			topM: [1, 0, 1, 1, 0, 1, 1, 1, 1, 1],
			midd: [0, 0, 1, 1, 1, 1, 1, 0, 1, 1],
			topL: [1, 0, 0, 0, 1, 1, 1, 0, 1, 1],
			topR: [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
			btmM: [1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
			btmL: [1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
			btmR: [1, 1, 0, 1, 1, 1, 1, 1, 1, 1]
		},
		tenSeconds: {
			topM: [1, 0, 1, 1, 0, 1],
			midd: [0, 0, 1, 1, 1, 1],
			topL: [1, 0, 0, 0, 1, 1],
			topR: [1, 1, 1, 1, 1, 0],
			btmM: [1, 0, 1, 1, 0, 1],
			btmL: [1, 0, 1, 0, 0, 0],
			btmR: [1, 1, 0, 1, 1, 1]
		},
		minutes: {
			topM: [1, 0, 1, 1, 0, 1, 1, 1, 1, 1],
			midd: [0, 0, 1, 1, 1, 1, 1, 0, 1, 1],
			topL: [1, 0, 0, 0, 1, 1, 1, 0, 1, 1],
			topR: [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
			btmM: [1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
			btmL: [1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
			btmR: [1, 1, 0, 1, 1, 1, 1, 1, 1, 1]
		},
		tenMinutes: {
			topM: [1, 0, 1, 1, 0, 1],
			midd: [0, 0, 1, 1, 1, 1],
			topL: [1, 0, 0, 0, 1, 1],
			topR: [1, 1, 1, 1, 1, 0],
			btmM: [1, 0, 1, 1, 0, 1],
			btmL: [1, 0, 1, 0, 0, 0],
			btmR: [1, 1, 0, 1, 1, 1]
		},
		hours: {
			topM: [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
			midd: [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0],
			topL: [0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0],
			topR: [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
			btmM: [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0],
			btmL: [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
			btmR: [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		},
		tenHours: {
			topM: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
			midd: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			topL: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
			topR: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			btmM: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
			btmL: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
			btmR: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		}
	};

	// it's a piece of cake to make a pretty date
	const now = dateTime;
	// now.setHours(11);
	// now.setMinutes(59);
	// now.setSeconds(56);
	const hours = now.getHours();
	const onesDigitHours = hours % 12;
	const minutes = now.getMinutes();
	const onesDigitMinutes = minutes % 10;
	const seconds = now.getSeconds();
	const onesDigit = now.getSeconds() % 10;
	const milliseconds = now.getMilliseconds();
	let HH = hours.toString().padStart(2, '0');
	let MM = minutes.toString().padStart(2, '0');
	let SS = seconds.toString().padStart(2, '0');
	let M0 = MM.charAt(0) * 1;
	let M1 = MM.charAt(1) * 1;
	let S0 = SS.charAt(0) * 1;
	let S1 = SS.charAt(1) * 1;
	
	// convert to number
	HH = (HH * 1);
	
	// starting time
	let HHMMSS = `${HH}:${MM}:${SS}`;
	
	// percent that the milliseconds are at
	let milliAnimStartPercent = (milliseconds / 1000) * 1;
	
	// shift an array to an index
	const shiftAtIndex = (arr, index) => {
		let rm = arr.splice(0, index);
		arr.push(...rm);
		return arr;
	}
	
	// rearrange indexes of digits based on what it currently is
	const adjustProps = (digit, numberIndex) => {
		for (let prop in timeObj[digit]) {
			timeObj[digit][prop] = shiftAtIndex(timeObj[digit][prop], numberIndex);
		}
	}
	
	// rearrange the animations
	adjustProps('seconds', S1);
	adjustProps('tenSeconds', S0);
	adjustProps('minutes', M1);
	adjustProps('tenMinutes', M0);
	adjustProps('hours', HH);
	adjustProps('tenHours', HH);
	
	// function that'll create a path with correctly ordered animations
	const populateAnimations = (array, pathD, waitTime, id, alreadyCompleted) => {
		let arrLen = array.length;
		let path = `<path d="${pathD}" opacity="${array[0]}">
		<animate id="${id}0" attributeName="opacity" dur=".1s" begin="${alreadyCompleted}; ${id}${arrLen - 1}.end+${waitTime}" fill="freeze" values="${array[0]}; ${array[1]}"/>`;
		// middle animations
		for (let i = 1; i < array.length - 1; i++) {
			path += `<animate id="${id}${i}" attributeName="opacity" dur=".1s" begin="${id}${i - 1}.end+${waitTime}" fill="freeze" values="${array[i]}; ${array[i + 1]}"/>`;
		}
		// last animation
		path += `<animate id="${id}${arrLen - 1}" attributeName="opacity" dur=".1s" begin="${id}${arrLen - 2}.end+${waitTime}" fill="freeze" values="${array[arrLen - 1]}; ${array[0]}" /></path>`;
		return path;
	}
	
	// the delay of the first time the digits should change
	// delay before the first second tick happens
	let sDelay = milliAnimStartPercent;
	// delay before the first ten second tick happens
	let stDelay = 9 - onesDigit + sDelay;
	// delay before the first minute tick happens
	let mDelay = (59 - seconds) + milliAnimStartPercent;
	// delay before the first ten minute tick happens
	let mtDelay = 599 - (599 * (onesDigitMinutes/10)) - 59.9 + mDelay;
	// delay before the first hour tick happens
	let hDelay = (3599 - (3599 * (minutes / 60) + 60 - mDelay));
	// delay before the first ten hour tick happens
	let htDelay = (3599 - (3599 * (minutes / 60) + 60 - mDelay));
	
	// which part of the digit is being drawn?
	const digitClasses = ['topM', 'midd', 'topL', 'topR', 'btmM', 'btmL', 'btmR'];
	const s = [];
	const st = [];
	const m = [];
	const mt = [];
	const h = [];
	const ht = [];
	
	// populate all of the animations
	for (let i = 0; i < digitClasses.length; i++) {
		// seconds
		s.push(populateAnimations(timeObj.seconds[digitClasses[i]], timeObj.numberPathsD[digitClasses[i]], '0.9s', 'sec', `${sDelay}s`));
		
		// ten seconds
		st.push(populateAnimations(timeObj.tenSeconds[digitClasses[i]], timeObj.numberPathsD[digitClasses[i]], '9.9s', 'tenSec', `${stDelay}s`));
		
		// minutes
		m.push(populateAnimations(timeObj.minutes[digitClasses[i]], timeObj.numberPathsD[digitClasses[i]], '59.9s', 'min', `${mDelay}s`));
		
		// ten minutes
		mt.push(populateAnimations(timeObj.tenMinutes[digitClasses[i]], timeObj.numberPathsD[digitClasses[i]], '599.9s', 'tenMin', `${mtDelay}s`));
		
		// hours
		h.push(populateAnimations(timeObj.hours[digitClasses[i]], timeObj.numberPathsD[digitClasses[i]], '3599.9s', 'hr', `${hDelay}s`));
		
		// ten hours
		ht.push(populateAnimations(timeObj.tenHours[digitClasses[i]], timeObj.numberPathsD[digitClasses[i]], '3599.9s', 'tenHr', `${htDelay}s`));
	}
	
	let secG = `<g transform="translate(116 0)">${s[0]} ${s[1]} ${s[2]} ${s[3]} ${s[4]} ${s[5]} ${s[6]}</g>`;
	let secTG = `<g transform="translate(96 0)">${st[0]} ${st[1]} ${st[2]} ${st[3]} ${st[4]} ${st[5]} ${st[6]}</g>`;
	let minG = `<g transform="translate(68 0)">${m[0]} ${m[1]} ${m[2]} ${m[3]} ${m[4]} ${m[5]} ${m[6]}</g>`;
	let minTG = `<g transform="translate(48 0)">${mt[0]} ${mt[1]} ${mt[2]} ${mt[3]} ${mt[4]} ${mt[5]} ${mt[6]}</g>`;
	let hrG = `<g transform="translate(20 0)">${h[0]} ${h[1]}	${h[2]}	${h[3]} ${h[4]}	${h[5]} ${h[6]}</g>`;
	let hrTG = `<g transform="translate(0 0)">${ht[0]} ${ht[1]} ${ht[2]} ${ht[3]} ${ht[4]} ${ht[5]} ${ht[6]}</g>`;
	
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 140 40');
	svg.innerHTML = `<filter id="glow" x="-200%" y="-200%" width="1000%" height="1000%">
		<feGaussianBlur in="SourceGraphic" stdDeviation="1.4" />
	</filter>
	<rect x="0%" y="0%" height="100%" width="100%" fill="${backgroundColor}" />
	<g fill="${color}" filter="url(#glow)">
		<g id="glower">
			${secG}${secTG}
			<path class="secMinDots" d="M92 11v4h4v-4ZM 92 25v4h4v-4Z" />
			${minG}${minTG}
			<path class="minHrDots" d="M44 11v4h4v-4ZM 44 25v4h4v-4Z" />
			${hrG}${hrTG}
		</g>
	</g>
	<use href="#glower" fill="${color}" />`;
	const wrapper = document.createElement("div");
	wrapper.innerHTML = svg;
	const doc = wrapper.firstChild;
	elt.appendChild(svg);
}

initClock(document.querySelector("#clock"));