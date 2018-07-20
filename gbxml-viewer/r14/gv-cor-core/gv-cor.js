	// Copyright 2018 Ladybug Tools authors. MIT License
	/* globals THR, GBX, SAV, CORdragArea, showdown  */
	/* jshint esversion: 6 */


	var COR = { release: "14.1" };

	COR.url = '../../../gbxml-sample-files/bristol-clifton-downs-fixed.xml';

	COR.releaseSourceURL = 'https://github.com/ladybug-tools/spider/tree/master/gbxml-viewer/r14/';

	//COR.iconInfo = '<img src="https://status.github.com/images/invertocat.png" height=14 >';
	COR.iconGitHubMark = "../assets/github-mark.png";

	COR.threeDefaultFile = '../gv-thr-threejs/gv-thr-run.html';
	COR.uriDefaultFile = '../assets/splash-screen.md';

	COR.colorButtonToggle = 'pink';

	// needs fixing
	COR.buttonToggleCss = 'background-color: var( --but-bg-color ) !important; font-style: italic; font-weight: bold';



	COR.initCore = function() {

		updateCss( themeName );

		if ( window.CORdragArea ) {
			CORdragArea.addEventListener( "dragover", function( event ){ event.preventDefault(); }, true );
			CORdragArea.addEventListener( 'drop', COR.drop, false );
		}

		/*
		if ( window.CORdivMenuLeftHeader ) {
			CORdivMenuLeftHeader.addEventListener( 'mousedown', COR.onMouseDownDraggable, false );
			CORdivMenuLeftHeader.addEventListener( 'touchstart', COR.onTouchStartDraggable, false );
			CORdivMenuLeftHeader.addEventListener( 'touchmove', COR.onTouchMoveDraggable, false );
		}

		if ( window.CORdivHeaderRight ) {
			CORdivHeaderRight.addEventListener( 'mousedown', COR.onMouseDownDraggable, false );
			CORdivHeaderRight.addEventListener( 'touchstart', COR.onTouchStartDraggable, false );
			CORdivHeaderRight.addEventListener( 'touchmove', COR.onTouchMoveDraggable, false );
		}
		window.addEventListener( 'mouseup', COR.onMouseUpDraggable, false );
		*/

		window.addEventListener ( 'hashchange', COR.onHashChange, false );

		// see CTX.initHeadsUp for renderer events

		COR.timeStart = Date.now();

	};



	COR.updateDefaultFilePath = function() { // Used by COR. Should be in COR?

		location.hash = CORinpFilePath.value;

		const thrFilePath = CORinpFilePath.value;
		localStorage.setItem('thrFilePath', thrFilePath );

	};



	COR.loadScript = function( source ){ // add buttonId?

		COR.resetLeftMenu();
		const script = document.head.appendChild( document.createElement( 'script' ) );
		script.src = source ;

		script.onload = function() { COR.setMenuButtonsClass ( CORdivMenuItems ); }

	}



	// handle location.hash change events

	COR.onHashChange = function() {

		const url = !location.hash ? COR.uriDefaultFile : location.hash.slice( 1 );
		const ulc = url.toLowerCase();

		COR.timeStart = Date.now();

		if ( ulc.endsWith( '.md' ) ) {

			COR.requestFile( url, COR.callbackMarkdown );

		} else if ( ulc.endsWith( '.xml' ) ) {

			//console.log( 'url', url );

			//COR.requestFileAndProgress( url, GBX.callbackGbXML );
			COR.requestGbxmlFile( url );

			//} else if ( ulc.endsWith( '.html' ) ) {

			//setIfrThree();

		} else if ( ulc.endsWith( '.json' ) ) {

			//console.log( 'json url', url );

			COR.requestFile( url, COR.callbackJson );

		} else if ( ulc.endsWith( '.gif' ) || ulc.endsWith( '.png' ) || ulc.endsWith( '.jpg' ) || ulc.endsWith( '.svg' )) {

			CORdivItemsRight.innerHTML = '<img src=' + url + ' >';

		} else {

			COR.requestFile( urlGitHubPage + url, COR.callbackToTextarea );

		}

	};



	COR.requestGbxmlFile = function( url ) {

		COR.timeStart = Date.now();

		THR.setSceneDispose( [ GBX.surfaceMeshes, GBX.surfaceEdges, GBX.surfaceOpenings, THR.axesHelper ] );

		const xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', url, true );
		xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
		xhr.onprogress = onRequestFileProgress;
		xhr.onload = callbackGbXML;
		xhr.send( null );

		function onRequestFileProgress( xhr ) {

			const fileAttributes = { name: xhr.target.responseURL.split( '/').pop() };

			/*
			divLog.innerHTML =
			`
				${fileAttributes.name}<br>
				bytes loaded: ${xhr.loaded.toLocaleString()} of  ${xhr.total.toLocaleString() }<br>
			`;
			*/
		}

		function callbackGbXML ( xhr ) {
			//console.log( 'xhr', xhr );

			//GBX.gbxmlResponseXML =  xhr.target.responseXML; // used by CTX.modifiedBy

			//const gbxml = xhr.target.responseXML.documentElement;

			const meshes = GBX.parseFileXML( xhr.target.response );

			THR.scene.add( ...meshes );

			THR.zoomObjectBoundingSphere( GBX.surfaceEdges );

			CORdivLog.innerHTML +=
			`
			file: ${ xhr.target.responseURL.split( '/').pop() }<br>
			time: ${ Date.now () - COR.timeStart } ms ~
			size: ${ xhr.loaded.toLocaleString() }
			<br>`;

		}

	};



	COR.openGbxmlFile = function( files ) {

		//console.log( 'file', files.files[ 0 ] );

		COR.timeStart = Date.now();

		THR.setSceneDispose( [ GBX.surfaceMeshes, GBX.surfaceEdges, GBX.surfaceOpenings, THR.axesHelper ] );

		COR.fileAttributes = files.files[ 0 ];

		const reader = new FileReader();
		reader.onprogress = onRequestFileProgress;
		reader.onload = function( event ) {

			//const parser = new DOMParser();

			//GBX.gbxmlResponseXML = parser.parseFromString( reader.result, "text/xml" );
			//console.log( 'gbxmlResponseXML2', gbxmlResponseXML2 );

			//GBX.gbxml = GBX.gbxmlResponseXML.children[ 0 ];
			//console.log( 'GBX.gbxml', GBX.gbxml );

			//GBX.gbjson = GBX.parseFileXML( GBX.gbxml );
			//GBX.surfaceJson = GBX.gbjson.Campus.Surface;

			const meshes = GBX.parseFileXML( reader.result );

			//if ( files.files[ 0 ] ) { GBX.gbjson.fileName = files.files[ 0 ].name; }

			THR.scene.add( ...meshes );

			THR.zoomObjectBoundingSphere( GBX.surfaceEdges );

		};

		reader.readAsText( files.files[ 0 ] );

		function onRequestFileProgress( event ) {

			CORdivLog.innerHTML =
				COR.fileAttributes.name + ' bytes loaded: ' + event.loaded.toLocaleString() +
				//( event.lengthComputable ? ' of ' + event.total.toLocaleString() : '' ) +
			'';

		}

	};



	COR.requestFile = ( url, callback ) => {

		const xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', url, true );
		xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
		//xhr.onprogress = function( xhr ) { console.log(  'bytes loaded: ' + xhr.loaded.toLocaleString() ) }; /// or something
		xhr.onload = callback;
		xhr.send( null );

	};



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
			CORdivLog.innerHTML = COR.fileAttributes.name + '<br>bytes loaded: ' + xhr.loaded.toLocaleString() + ' of ' + xhr.total.toLocaleString() ;

		}

	};


	// handle callbacks with file data events / gbxml callback in GBX

	COR.callbackMarkdown = function( obj ){

		markdown = obj.target ? obj.target.responseText : obj;

		showdown.setFlavor('github');
		const converter = new showdown.Converter();
		//const response = xhr.target.response;
		const html = converter.makeHtml( markdown );

		//CORdivMenuRight.innerHTML = '<div id=CORdivItemsRight >' + html + '</div>';
		CORdivItemsRight.innerHTML = html;
		CORdivMenuRight.style.display = 'block';
		//CORdivMenuRight.style.left = '55%';
		//CORdivMenuRight.style.width = '40rem';
		window.scrollTo( 0, 0 );
		CORdivMenuRight.scrollTop = 0;
		//CORdivItemsRight.scrollTop = 0;
		CORdivMenuRight.scrollTo( 0, 0 );
		//CORdivItemsRight.scrollTo( 0, 0 );

	};



	COR.callbackToTextarea = function( xhr ){

		const response = xhr.target.response;
		CORdivItemsRight.innerHTML = '<textarea style=height:100%;width:100%; >' + response + '</textarea>';
		CORdivMenuRight.style.display = 'block';

	};



	COR.callbackJson = function( xhr ) {

		const response = xhr.target.response;
		CTX.surfaceChanges = JSON.parse( response );
		console.log( 'response', response);

		SAV.getUpdates();

	};



	// handle fileReader events

	COR.openFile = function( files ) {

		var fileData, reader, data;

		reader = new FileReader();

		reader.onload = function( event ) {

			//console.log( 'event', event );

			if ( files.files[0].name.toLowerCase().endsWith( '.xml' ) ) {

				COR.openGbxmlFile( files );

			} else {

				//txtArea.innerHTML = reader.result;
				COR.callbackMarkdown( reader.result );

			}

			CORdivLog.innerHTML =
				'name: ' + files.files[0].name + '<br>' +
				'size: ' + files.files[0].size.toLocaleString() + ' bytes<br>' +
				'type: ' + files.files[0].type + '<br>' +
				'modified: ' + files.files[0].lastModifiedDate.toLocaleDateString() +
			'';

			//console.log( '', files );

		};

		reader.readAsText( files.files[0] );

	};



	////////// handle drag and drop events

	COR.drop = function( event ) {

		console.log( 'event', event );

		const iframeUrl = event.dataTransfer.getData( 'URL' );

		if ( iframeUrl ) {

			location.hash = iframeUrl;

		} else {

			COR.openGbxmlFile( event.dataTransfer );

		}

		event.preventDefault();

	};



	// handle drag and drop events

	COR.xxxcallbackMarkdownData = function ( markdown ){

		showdown.setFlavor('github');
		const converter = new showdown.Converter();
		const html = converter.makeHtml( markdown );

		CORdivItemsRight.innerHTML = html;
		GBX.style.display = 'block';
		window.scrollTo( 0, 0 );

	};



	// handle menu header dragging with mouse or touch events // 2018-07-19 no longer needed?

	COR.onMouseDownDraggable = function( event ) {

		COR.draggableTop = event.clientY - event.target.parentNode.parentNode.offsetTop;
		COR.draggableLeft = event.clientX - event.target.parentNode.parentNode.offsetLeft;

		window.addEventListener( 'mousemove', COR.onMouseMoveDraggable, true );
		event.preventDefault();

	};



	COR.onMouseMoveDraggable = function( event ) {

		event.target.parentNode.style.top = ( event.clientY - COR.draggableTop ) + 'px';
		event.target.parentNode.style.left = ( event.clientX - COR.draggableLeft ) + 'px';
		event.preventDefault();

	};



	COR.onMouseUpDraggable = () => {

		window.removeEventListener( 'mousemove', COR.onMouseMoveDraggable, true );
		event.preventDefault();

	};



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


	////////// Slide / Hamburger operations


	function updateCss( value ) {

		/*
		if ( !window.css ) {

			css = document.head.appendChild( document.createElement( 'link' ) );
			css.rel = 'stylesheet';
			css.type = 'text/css';

		}
		*/

		css.href = value === 'Default' ? 'https://bootswatch.com/_vendor/bootstrap/dist/css/bootstrap.css' :
			`https://stackpath.bootstrapcdn.com/bootswatch/4.1.1/${ value.toLowerCase() }/bootstrap.min.css`;

		localStorage.setItem( 'themeName', value );

	};



	COR.resetLeftMenu = function () {

		const menuButtons = document.querySelectorAll( "button.app-menu" );

		menuButtons.forEach( element => {
			element.style.backgroundColor ='';
			element.style.fontStyle ='';
			element.style.fontWeight ='';
		} );

		//const menuDetails = document.querySelectorAll( "details.app-menu" );

		//menuDetails.forEach( element => element.remove() );

	};



	COR.setRightMenuWide = function() {

		CORdivMenuRight.style.display = 'block';
		CORdivMenuRight.style.left = '55%';
		CORdivMenuRight.style.width = '40rem';
		window.scrollTo( 0, 0 );
		CORdivMenuRight.scrollTop = 0;
		//CORdivItemsRight.scrollTop = 0;
		CORdivMenuRight.scrollTo( 0, 0 );
		//CORdivItemsRight.scrollTo( 0, 0 );

	};



	COR.toggleNavLeft = function() {

		const width = getComputedStyle(document.documentElement).getPropertyValue( '--mnu-width' ).trim();
		//console.log( 'width', width );

		//console.log( 'CORdivHamburgerLeft.style.left', CORdivHamburgerLeft.style.left );

		if ( CORdivHamburgerLeft.style.left === '-5rem' ) {

			CORdivMenuLeft.style.left = '0';
			CORdivHamburgerLeft.style.left = width;

		} else {

			CORdivMenuLeft.style.left = '-' + width;
			CORdivHamburgerLeft.style.left = '-5rem';

		}

	};



	COR.toggleNavRight = function() {

		//CORdivMenuRight.style.display = "none";

		width = CORdivMenuRight.getBoundingClientRect().width;
		console.log( 'width', width );

		if ( CORdivMenuRight.style.left === '100%' ) {

			if ( window.innerWidth > 900 ) {

				CORdivMenuRight.style.left = ( window.innerWidth - 10 - width ) + 'px';

			} else { //} if ( window.innerWidth > 600 ) {

				CORdivMenuRight.style.left = '60%';
				CORdivMenuRight.style.width = '38%';
/*
			} else {

				CORdivMenuRight.style.left = '70%';
				CORdivMenuRight.style.width = '28%';
*/
			}

		} else {

			CORdivMenuRight.style.left = '100%';

		}

	};



	COR.setPanelButtonClear = function( button ) {

		CORdivMenuItems.innerHTML = '';

		button.style.fontStyle = '';
		button.style.backgroundColor = '';
		button.style.fontWeight = '';

	};



	COR.setPanelButtonInit = function( button ) {

		CORdivMenuRight.style.display = 'none';

		button.style.cssText = COR.buttonToggleCss;

	};


	COR.setMenuButtonsClass = function( target ) {

		const buttons = target.getElementsByTagName( "button" );

		for ( let button of buttons ) {

			//button.classList.add( "w3-theme-d1", "w3-hover-theme", "w3-hover-border-theme" );
			button.classList.add( "btn", "btn-secondary", "btn-sm" );

		}

	}
