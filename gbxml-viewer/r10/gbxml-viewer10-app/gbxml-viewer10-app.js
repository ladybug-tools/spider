
	const uriDefaultFile = 'splash-screen.md';

	let draggableLeft;
	let draggableTop;

	let draggableStartX;
	let draggableStartY;


	function initCore() {

		window.addEventListener ( 'hashchange', onHashChange, false );

		divContentsHeader.addEventListener( 'mousedown', onMouseDownDraggable, false );
		window.addEventListener( 'mouseup', onMouseUpDraggable, false );

		divContentsHeader.addEventListener( 'touchstart', onTouchStartDraggable, false );
		divContentsHeader.addEventListener( 'touchmove', onTouchMoveDraggable, false );

		divMenuHeader.addEventListener( 'mousedown', onMouseDownDraggable, false );
//		window.addEventListener( 'mouseup', onMouseUpDraggable, false );

		divMenu.addEventListener( 'click', function() { divContainer.style.display = 'none'; }, false );

		onHashChange();

	}



	function onHashChange() {

		const url = !location.hash ? uriDefaultFile : location.hash.slice( 1 );
		const ulc = url.toLowerCase();

		if ( ulc.endsWith( '.md' ) ) {

			requestFile( url, callbackMarkdown );

		} else if ( ulc.endsWith( '.xml' ) ) {

			requestFile( url, THR.callbackGbXML );

//		} else if ( ulc.endsWith( '.html' ) ) {

//			setIfrThree();

		} else if ( ulc.endsWith( '.gif' ) || ulc.endsWith( '.png' ) || ulc.endsWith( '.jpg' ) || ulc.endsWith( '.svg' )) {

			divContents.innerHTML = '<img src=' + url + ' >';

		} else {

			requestFile( urlGitHubPage + url, callbackToTextarea );

		}

	}



	function requestFile( url, callback ) {

		const xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', url, true );
		xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
//		xhr.onprogress = function( xhr ) { console.log(  'bytes loaded: ' + xhr.loaded.toLocaleString() ) }; /// or something
		xhr.onload = callback;
		xhr.send( null );

	}



	function callbackMarkdown( xhr ){

		showdown.setFlavor('github');
		const converter = new showdown.Converter();
		const response = xhr.target.response;
		const html = converter.makeHtml( xhr.target.responseText );

		divContents.innerHTML = html;
		divContainer.style.display = 'block';
		window.scrollTo( 0, 0 );

	}



	function callbackToTextarea( xhr ){

		const response = xhr.target.response;
		divContents.innerHTML = '<textarea style=height:100%;width:100%; >' + response + '</textarea>';
		divContainer.style.display = 'block'

	}


/////////////

	function onMouseDownDraggable( event ) {

		draggableTop = event.clientY - event.target.parentNode.offsetTop;
		draggableLeft = event.clientX - event.target.parentNode.offsetLeft;

		window.addEventListener('mousemove', onMouseMoveDraggable, true );
		event.preventDefault();

	}



	function onMouseMoveDraggable( event ){

		event.target.parentNode.style.top = ( event.clientY - draggableTop ) + 'px';
		event.target.parentNode.style.left = ( event.clientX - draggableLeft ) + 'px';
		event.preventDefault();

	}



	function onMouseUpDraggable() {

		window.removeEventListener( 'mousemove', onMouseMoveDraggable, true );
		event.preventDefault();

	}



	function onTouchStartDraggable( event ){

		draggableLeft = event.target.parentNode.offsetLeft;
		draggableStartX = event.changedTouches[ 0 ].clientX;
		draggableTop = event.target.parentNode.offsetTop;
		draggableStartY = event.changedTouches[ 0 ].clientY;
		//console.log( 'draggableTop', draggableTop, draggableStartY );
		event.preventDefault();

	}



	function onTouchMoveDraggable( event ){

		const distX = event.changedTouches[ 0 ].clientX - draggableStartX;
		let left = draggableLeft + distX > document.body.clientWidth - 100 ? document.body.clientWidth - 100 : draggableLeft + distX;
		left = draggableLeft + distX < 0 ? 0 : left;
		//console.log( 'left2', left  );
		event.target.parentNode.style.left = left + 'px';

		const distY = event.changedTouches[ 0 ].clientY - draggableStartY;
		// top is a reserved word
		let ttop = draggableTop + distY > window.innerHeight - 100 ? window.innerHeight - 100 : draggableTop + distY;
		ttop = draggableTop + distY < 0 ? 0 : ttop;
		//console.log( 'ttop', ttop  );
		event.target.parentNode.style.top = ttop + 'px';

		event.preventDefault();

		//console.log ( 'Status: touchmove', 'Horizontal distance traveled: ' + distY + 'px' );

	}


////

	function toggleNav() {

		const left = 'calc( var( --mnu-width ) - 100px )';

		divContainer.style.display="none";

		if ( divHamburger.style.left === '' || divHamburger.style.left === left ) {

			divMenu.style.left = 'calc( -1 * var( --mnu-width ) - 20px )';
			divHamburger.style.left = '-100px';

		} else {

			divMenu.style.left = 0;
			divHamburger.style.left = left;

		}

	}
