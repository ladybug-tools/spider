
	let uriDefaultFile = '../../README.md';

//	location.hash = 'threejs-basic.html';

	var iconInfo = '<img src="https://status.github.com/images/invertocat.png" height=14 >';
	var threeDefaultFile = '../gbxml-viewer9-01-core/gbxml-viewer9-core.html';



	init();

	function init() {

/// contents

		splashScreen = document.body.appendChild( document.createElement( 'script' ) );
		splashScreen.src = 'splash-screen.js';

// add event handlers

		window.addEventListener ( 'hashchange', onHashChange, false );

		dragArea.addEventListener( "dragover", function( event ){ event.preventDefault(); }, true );
		dragArea.addEventListener( 'drop', drop, false );

		onHashChange();

	}



	function onHashChange() {

		const url = !location.hash ? uriDefaultFile : location.hash.slice( 1 );
		const ulc = url.toLowerCase();

		if ( ulc.endsWith( '.md' ) ) {

			requestFile( url, callbackMarkdown );

		} else if ( ulc.endsWith( '.xml' ) ) {

			setIfrThree();
			ifrThree.src = threeDefaultFile + '#' + url;


		} else if ( ulc.endsWith( '.html' ) ) {

			setIfrThree()
			ifrThree.src = url;

		} else if ( ulc.endsWith( '.gif' ) || ulc.endsWith( '.png' ) || ulc.endsWith( '.jpg' ) || ulc.endsWith( '.svg' )) {

			setContents();
			divContents.innerHTML = '<img src=' + url + ' >';

		} else {

			requestFile( urlGitHubPage + url, callbackToTextarea );

		}

	}



	function drop( event ) {

		event.preventDefault();
		setIfrThree();

		var iframeUrl = event.dataTransfer.getData( 'URL' );

		if ( iframeUrl ) {

			ifrThree.contentWindow.location.hash = iframeUrl;

		} else {

			ifrThree.contentWindow.openFile( event.dataTransfer );

		}

	}



	function callbackMarkdown( xhr ){

		showdown.setFlavor('github');
		const converter = new showdown.Converter();
		const response = xhr.target.response;
		const html = converter.makeHtml( xhr.target.responseText );

		setContents();
		divContents.innerHTML = html;

	}



	function callbackToTextarea( xhr ){

		const response = xhr.target.response;
		setContents();
		divContents.innerHTML = '<textarea style=height:100%;width:100%; >' + response + '</textarea>';

	}



	function setContents() {

		document.body.style.overflow = '';
		ifrThree.style.cssText += 'display: none; z-index: -1; ';
		divContents.style.display = '';
		window.scrollTo( 0, 0 );

	}



	function setIfrThree() {

		document.body.style.overflow = 'hidden';
		divContents.style.display = 'none';
		ifrThree.style.cssText += 'display: block; z-index: 1; ';

		// sucky iOS iframe auto-resize workaround

		if ( /(iPad|iPhone|iPod)/g.test( navigator.userAgent ) ) {

			ifrThree.style.width = getComputedStyle( ifrThree ).width;
			ifrThree.style.height = getComputedStyle( ifrThree ).height;
			ifrThree.setAttribute( 'scrolling', 'no' );

		}

//		initReport();

//		element = document.getElementById( 'detReports' );

//		if ( element ) { element.remove(); }

//		butReports.style.backgroundColor = '';

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



	function onloadThreejs() {

		if ( window.detReports ) { detReports.remove(); }

		butReports.style.backgroundColor = '';

	}



	function toggleNav() {

		const width = getComputedStyle(document.documentElement).getPropertyValue( '--mnu-width' );
//console.log( 'ww', width, divMenu.style.width  );
// needs fixing
		if ( !divMenu.style.width || divMenu.style.width === '350px' ) {

			divMenu.style.width = '0';
			divMenu.style.padding = '0';
			hamburger.style.left = '-100px';
			divContainer.style.marginLeft = '0';

		} else {

			divMenu.style.width = width;
			divMenu.style.padding = '30px 10px 0 10px';
			hamburger.style.left = 'calc( var( --mnu-width ) - 100px )';
			divContainer.style.marginLeft = width;

		}

	}


//Make the DIV element draggable:
// https://www.w3schools.com/howto/howto_js_draggable.asp

function dragElementxxxx( element ) {

	let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

	divDraggableHeader.onmousedown = dragMouseDown;

	function dragMouseDown( event ) {

		event = event || window.event;

		pos3 = event.clientX;
		pos4 = event.clientY;
		document.onmouseup = closeDragElement;

		document.onmousemove = elementDrag;

	}

	function elementDrag( event ) {

		event = event || window.event;

		pos1 = pos3 - event.clientX;
		pos2 = pos4 - event.clientY;
		pos3 = event.clientX;
		pos4 = event.clientY;

		element.style.top = ( element.offsetTop - pos2 ) + 'px';
		element.style.left = ( element.offsetLeft - pos1 ) + 'px';

	}

	function closeDragElement() {

		document.onmouseup = null;
		document.onmousemove = null;

	}

}
