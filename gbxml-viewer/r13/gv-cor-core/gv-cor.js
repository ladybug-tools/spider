// Copyright 2018 Ladybug Tools authors. MIT License


	var COR = {};

	COR.releaseSourceURL = 'https://github.com/ladybug-tools/spider/tree/master/gbxml-viewer/r13/';

	//COR.iconInfo = '<img src="https://status.github.com/images/invertocat.png" height=14 >';
	COR.iconGitHubMark = "../assets/gitHub-mark.png";

	COR.threeDefaultFile = '../gv-thr-threejs/gv-thr-run.html';
	COR.uriDefaultFile = '../assets/splash-screen.md';

	COR.colorButtonToggle = 'pink';

	COR.initCore = function() {

		if ( window.dragArea ) {
			dragArea.addEventListener( "dragover", function( event ){ event.preventDefault(); }, true );
			dragArea.addEventListener( 'drop', COR.drop, false );
		}

		if ( window.dragAreaToIframe ) {
			dragAreaToIframe.addEventListener( "dragover", function( event ){ event.preventDefault(); }, true );
			dragAreaToIframe.addEventListener( 'drop', COR.dropIframe, false );
		}

		if ( window.pMenuLeftHeader ) {
			pMenuLeftHeader.addEventListener( 'mousedown', COR.onMouseDownDraggable, false );
			pMenuLeftHeader.addEventListener( 'touchstart', COR.onTouchStartDraggable, false );
			pMenuLeftHeader.addEventListener( 'touchmove', COR.onTouchMoveDraggable, false );
		}

		if ( window.divPopUpHeader ) {
			divPopUpHeader.addEventListener( 'mousedown', COR.onMouseDownDraggable, false );
			divPopUpHeader.addEventListener( 'touchstart', COR.onTouchStartDraggable, false );
			divPopUpHeader.addEventListener( 'touchmove', COR.onTouchMoveDraggable, false );
		}


		if ( window.divHeadsUpHeader ) {
			divHeadsUpHeader.addEventListener( 'mousedown', COR.onMouseDownDraggable, false );
			divHeadsUpHeader.addEventListener( 'touchstart', COR.onTouchStartDraggable, false );
			divHeadsUpHeader.addEventListener( 'touchmove', COR.onTouchMoveDraggable, false );
		}

		window.addEventListener( 'mouseup', COR.onMouseUpDraggable, false );

		window.addEventListener ( 'hashchange', COR.onHashChange, false );

		COR.timeStart = Date.now();

	}


	// handle location.hash change events

	COR.onHashChange = function() {

		const url = !location.hash ? COR.uriDefaultFile : location.hash.slice( 1 );
		const ulc = url.toLowerCase();

		COR.timeStart = Date.now();

		if ( ulc.endsWith( '.md' ) ) {

			COR.requestFile( url, callbackMarkdown );

		} else if ( ulc.endsWith( '.xml' ) ) {

			console.log( 'url', url );

			COR.requestFileAndProgress( url, GBP.callbackGbXML );

			//} else if ( ulc.endsWith( '.html' ) ) {

			//setIfrThree();

		} else if ( ulc.endsWith( '.gif' ) || ulc.endsWith( '.png' ) || ulc.endsWith( '.jpg' ) || ulc.endsWith( '.svg' )) {

			divPopUpContents.innerHTML = '<img src=' + url + ' >';

		} else {

			COR.requestFile( urlGitHubPage + url, callbackToTextarea );

		}

	}



	COR.requestFile = ( url, callback ) => {

		const xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', url, true );
		xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
		//xhr.onprogress = function( xhr ) { console.log(  'bytes loaded: ' + xhr.loaded.toLocaleString() ) }; /// or something
		xhr.onload = callback;
		xhr.send( null );

	}



	COR.requestFileAndProgress = function( url, callback ) {

		const xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', url, true );
		xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
		xhr.onprogress = onRequestFileProgress;
		xhr.onload = callback;
		xhr.send( null );

		function onRequestFileProgress( xhr ) {

			//console.log( 'xhr', xhr );

			COR.fileAttributes = { name: xhr.target.responseURL.split( '/').pop() };
			divLog.innerHTML = COR.fileAttributes.name + '<br>bytes loaded: ' + xhr.loaded.toLocaleString() + ' of ' + xhr.total.toLocaleString() ;

		}

	}


	// handle callbacks with file data events

	function callbackMarkdown( xhr ){

			showdown.setFlavor('github');
			const converter = new showdown.Converter();
			//const response = xhr.target.response;
			const html = converter.makeHtml( xhr.target.responseText );

			//divPopUp.innerHTML = '<div id=divPopUpContents >' + html + '</div>';
			divPopUpContents.innerHTML = html;
			divPopUp.style.display = 'block';
			window.scrollTo( 0, 0 );
			divPopUp.scrollTop = 0;
			//divPopUpContents.scrollTop = 0;
			divPopUp.scrollTo( 0, 0 );
			//divPopUpContents.scrollTo( 0, 0 );

		}



		function callbackToTextarea( xhr ){

			const response = xhr.target.response;
			divPopUpContents.innerHTML = '<textarea style=height:100%;width:100%; >' + response + '</textarea>';
			divPopUp.style.display = 'block'

		}



	// handle fileReader events



	COR.openFile = function( files ) {

		var fileData, reader, data;

		reader = new FileReader();

		reader.onload = function( event ) {

			console.log( 'event', event );

			if ( files.files[0].name.toLowerCase().endsWith( '.xml' ) ) {

				GBX.openGbxmlFile( files );

			} else {

				//txtArea.innerHTML = reader.result;
				COR.callbackMarkdownData( reader.result );

			}

			divLog.innerHTML =
				'name: ' + files.files[0].name + '<br>' +
				'size: ' + files.files[0].size.toLocaleString() + ' bytes<br>' +
				'type: ' + files.files[0].type + '<br>' +
				'modified: ' + files.files[0].lastModifiedDate.toLocaleDateString() +
			'';

			console.log( '', files );

		}

		reader.readAsText( files.files[0] );

	}



	// handle drag and drop events

	COR.drop = function( event ) {

		console.log( 'event', event );

		const iframeUrl = event.dataTransfer.getData( 'URL' );


		if ( iframeUrl ) {

			location.hash = iframeUrl;

		} else {

			GBP.openGbxmlFile( event.dataTransfer );

		}

		event.preventDefault();

	}



	COR.ZZZdropIframe = event => {

		event.preventDefault();

		var iframeUrl = event.dataTransfer.getData( 'URL' );

		if ( iframeUrl ) {

			ifrThree.contentWindow.location.hash = iframeUrl;

		} else {

			ifrThree.contentWindow.GBX.openGbxmlFile( event.dataTransfer );

		}

	}


	// handle drag and drop events

	COR.callbackMarkdownData = function ( markdown ){

		showdown.setFlavor('github');
		const converter = new showdown.Converter();
		const html = converter.makeHtml( markdown );

		divPopUpContents.innerHTML = html;
		divPopUp.style.display = 'block';
		window.scrollTo( 0, 0 );

	}


	// handle menu header dragging with mouse or touch events

	COR.onMouseDownDraggable = function( event ) {

		COR.draggableTop = event.clientY - event.target.parentNode.offsetTop;
		COR.draggableLeft = event.clientX - event.target.parentNode.offsetLeft;

		window.addEventListener( 'mousemove', COR.onMouseMoveDraggable, true );
		event.preventDefault();

	};



	COR.onMouseMoveDraggable = event => {

		event.target.parentNode.style.top = ( event.clientY - COR.draggableTop ) + 'px';
		event.target.parentNode.style.left = ( event.clientX - COR.draggableLeft ) + 'px';
		event.preventDefault();

	};



	COR.onMouseUpDraggable = () => {

		window.removeEventListener( 'mousemove', COR.onMouseMoveDraggable, true );
		event.preventDefault();

	}



	COR.onTouchStartDraggable = event => {

		COR.draggableLeft = event.target.parentNode.offsetLeft;
		COR.draggableStartX = event.changedTouches[ 0 ].clientX;
		COR.draggableTop = event.target.parentNode.offsetTop;
		COR.draggableStartY = event.changedTouches[ 0 ].clientY;
		//console.log( 'draggableTop', draggableTop, draggableStartY );
		event.preventDefault();

	};



	COR.onTouchMoveDraggable = event  => {

		const distX = event.changedTouches[ 0 ].clientX - COR.draggableStartX;
		let left = COR.draggableLeft + distX > document.body.clientWidth - 100 ?
			document.body.clientWidth - 100 : COR.draggableLeft + distX;
		left = COR.draggableLeft + distX < 0 ? 0 : left;
		//console.log( 'left2', left  );
		event.target.parentNode.style.left = left + 'px';

		const distY = event.changedTouches[ 0 ].clientY - COR.draggableStartY;
		// top is a reserved word
		let ttop = COR.draggableTop + distY > window.innerHeight - 100 ?
			window.innerHeight - 100 : COR.draggableTop + distY;
		ttop = COR.draggableTop + distY < 0 ? 0 : ttop;
		//console.log( 'ttop', ttop  );
		event.target.parentNode.style.top = ttop + 'px';

		event.preventDefault();

	};


	// move to App

	COR.toggleNavLeft = function() {

		divPopUp.style.display = 'none';

		if ( divHamburgerLeft.style.left === '' || divHamburgerLeft.style.left === '0px' ) {

			divMenuLeft.style.left = 'calc( -2rem  - var( --mnu-left-width ) )';
			divHamburgerLeft.style.left = '-6rem';

		} else {

			divMenuLeft.style.left = '2rem';
			divHamburgerLeft.style.left = 0;

		}

	}



	COR.toggleNavRight = function() {

		divPopUp.style.display = "none";

		if ( divHeadsUp.style.left === '100%' ) {

			if ( window.innerWidth > 900 ) {

				divHeadsUp.style.left = '70%';

			} else if ( window.innerWidth > 600 ) {

				divHeadsUp.style.left = '70%'

			} else {

				divHeadsUp.style.left = '60%';

			}

		} else {

			divHeadsUp.style.left = '100%';

		}

	}

