
/* Copyright 2018 Ladybug Tools authors. MIT License */


function onTouchStart( event ) {

	xDown = event.touches[ 0 ].clientX;
	yDown = event.touches[ 0 ].clientY;

}



function onTouchMove(event) {

	if ( ! xDown || ! yDown ) {

		return;

	}

	const xUp = event.touches[ 0 ].clientX;
	const yUp = event.touches[ 0 ].clientY;

	const xDiff = xDown - xUp;
	const yDiff = yDown - yUp;

	if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {// most significant

		if ( xDiff > 0 ) {

			toggleNav();
			// left swipe
			console.log( 'left swipe' );

		} else {

			toggleNav();
			// right swipe
			console.log( 'right swipe' );

		}

	} else {

		if ( yDiff > 0 ) {

			//up swipe
			console.log( 'up swipe' );

		} else {

			// down swipe
			console.log( 'down swipe' );

		}

	}

	xDown = null;
	yDown = null;

}



function toggleNav() {

	const width = getComputedStyle(document.documentElement).getPropertyValue( '--mnu-width' ).trim();

	if ( !divMenu.style.width || divMenu.style.width === width ) {

		divMenu.style.width = '0';
		divMenu.style.padding = '0';
		hamburger.style.left = '-75px';
		divThreeJs.style.marginLeft = '0';

	} else {

		divMenu.style.width = width;
		//divMenu.style.padding = '30px 10px 0 10px';
		divMenu.style.padding = '1rem';
		hamburger.style.left = 'calc( var( --mnu-width ) - 4rem )';
		divThreeJs.style.marginLeft = width;

	}

	//console.log( 'divThreeJs.clientWidth', divThreeJs.clientWidth );

	//divThreeJs.style.width = divThreeJs.clientWidth + 'px';
	onWindowResize();

}
