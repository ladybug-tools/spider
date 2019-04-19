// Copyright 2018 Ladybug Tools authors. MIT License


	var COR = {};

	COR.iconInfo = '<img src="https://pushme-pullyou.github.io/github-mark-64.png" height=14 >';
	COR.releaseSourceURL = 'https://github.com/ladybug-tools/spider/tree/master/gbxml-viewer/r12/';

	urlGitHubPage = 'https://rawgit.com/ladybug-tools.github.io/spider/master/';

	//COR.iconInfo = '<img src="https://pushme-pullyou.github.io/github-mark-64.png" height=14 >';
	COR.iconGitHubMark = "../assets/gitHub-mark.png";
	COR.iconSpiderWeb = "../assets/spider-web.png";  // &#x1f578;

	//COR.threeDefaultFile = '../gv-thr/gv-thr.html';
	COR.uriDefaultFile = '../assets/splash-screen.md'; // maybe should be in APP?

	COR.menuBreadcrumbs =

	`<div>
		<a href="http://www.ladybug.tools/" target="_top" >Ladybug Tools</a> &raquo;
		<a href="http://www.ladybug.tools/spider/" target="_top" > <img src=` + COR.iconSpiderWeb + `  height=18 ></a> &raquo;
		<a href="../../../index.html#gbxml-viewer/README.md" target="_top" style=font-size:24px; title="gbXML Viewer Read Me" >&#x2302;</a> &raquo;
	</div>`;

	COR.menuTitle =

	`<h2>
		<a href="` + COR.releaseSourceURL + `" target=_top >
			<img src=` + COR.iconGitHubMark + ` height=18 style=opacity:0.3; ></a>
			<a id=aDocumentTitle href="" >` + document.title +`</a>
	</h2>`;

	COR.menuDescription =

	`<div title="Thanks to Mr.doob, Ken Russell and the many WebGL peeps" ><small>` +
		document.head.querySelector( '[name=description]' ).content +
	`</small></div>`;

	COR.menuFileOpening =

	`<p id=dragArea class=dragDropArea >
		drag&drop gbXML file to this box<br>
		or <input type=file id=inpFile onchange=COR.openFile(this); accept=".xml" ><br>
		or enter a default file path <input id=inpFilePath onchange=THR.updateDefaultFilePath(); style=width:100%; >
		<br>
	<p>`;

	COR.menuFooter =
	`<details open >

		<summary>footer</summary>

		<div title='' ><a href=#../README.md >Release Read Me</a></div>
		<div title='' ><a href=#../../../pages/gbxml-viewer-support-issues-wish-list.md > Support, Issues, Wish List & Wanted</a></div>
		<div title='Every release is visible and usable' ><a href=#../../previous-releases.md >Previous Releases</a></div>
		<div title='many thanks!' ><a href=#../../../pages/credits.md >Credits</a></div>
		<div><a href=#../../../pages/code-of-conduct.md >Code of Conduct</a></div>
		<div><a href=#../../../pages/contributing.md >Contributing</a></div>
		<div><a href=#../../../pages/license.md >Copyright & License</a></div>
		<div><a href=#../../../pages/markdown-help.md >Markdown Help</a></div>
		<div><a href="JavaScript:( function(){ var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()" title="Mr.doob's Stats.js appear in top left corner" >Show frames/second statistics</a></div>
		<div><a href="https://api.github.com/rate_limit" target="_blank">github rate limits</a></div>

		<hr>
		<h2 onclick=divMenu.scrollTop=0; style=cursor:pointer;text-align:center;
			title='go to top and, btw, my web is better than your web' > <img src=../assets/spider-web.png height=24 style=opacity:0.5; > </h2>

	</details>`;

	// unicode spider web &#x1f578;

	COR.gbxmlSampleFiles =
	`
		<div><a href="#../../gbxml-sample-files/annapolis-md-single-family-residential-2016.xml" >gbxml standard single family residential 2016</a></div>
		<div><a href="#../../gbxml-sample-files/aspen-co-resort-retail.xml" >aspen-co-resort-retail.xml</a></div>
		<div><a href="#../../gbxml-sample-files/boston-ma-urban-house-mep.xml" >boston-ma-urban-house-mep.xml</a></div>
		<div><a href="#../../gbxml-sample-files/bristol-clifton-down-road.xml" >bristol-clifton-down-road.xml</a></div>
		<div><a href="#../../gbxml-sample-files/columbia-sc-two-story-education-trane.xml" >columbia-sc-two-story-education-trane</a></div>
		<div><a href="#../../gbxml-sample-files/coventry-university-of-warwick.xml" >coventry-university-of-warwick.xml</a></div>
		<div><a href="#../../gbxml-sample-files/golden-co-open-studio-seb.xml" >golden-co-open-studio-seb.xml</a></div>
		<div><a href="#../../gbxml-sample-files/london-office.xml" >london-office.xml</a></div>
		<div><a href="#../../gbxml-sample-files/omha-nb-zneth.xml" >omha-nb-zneth.xml</a></div>

	`;



	COR.initCore = function() {

		if ( window.dragArea ) {
			dragArea.addEventListener( "dragover", function( event ){ event.preventDefault(); }, true );
			dragArea.addEventListener( 'drop', COR.drop, false );
		}

		if ( window.dragAreaToIframe ) {
			dragAreaToIframe.addEventListener( "dragover", function( event ){ event.preventDefault(); }, true );
			dragAreaToIframe.addEventListener( 'drop', COR.dropIframe, false );
		}

		if ( window.divMenuHeader ) {
			divMenuHeader.addEventListener( 'mousedown', COR.onMouseDownDraggable, false );
			divMenuHeader.addEventListener( 'touchstart', COR.onTouchStartDraggable, false );
			divMenuHeader.addEventListener( 'touchmove', COR.onTouchMoveDraggable, false );
		}

		if ( window.divContentsHeader ) {
			divContentsHeader.addEventListener( 'mousedown', COR.onMouseDownDraggable, false );
			divContentsHeader.addEventListener( 'touchstart', COR.onTouchStartDraggable, false );
			divContentsHeader.addEventListener( 'touchmove', COR.onTouchMoveDraggable, false );
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

			COR.requestFileAndProgress( url, GBX.callbackGbXML );

			//} else if ( ulc.endsWith( '.html' ) ) {

			//setIfrThree();

		} else if ( ulc.endsWith( '.gif' ) || ulc.endsWith( '.png' ) || ulc.endsWith( '.jpg' ) || ulc.endsWith( '.svg' )) {

			divContents.innerHTML = '<img src=' + url + ' >';

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



	COR.requestFileAndProgress = ( url, callback ) => {

		const xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', url, true );
		xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
		xhr.onprogress = onRequestFileProgress;
		xhr.onload = callback;
		xhr.send( null );

		function onRequestFileProgress( xhr ) {

			//console.log( 'xhr', xhr );

			GBX.fileAttributes = { name: xhr.target.responseURL.split( '/').pop() };
			divLog.innerHTML = GBX.fileAttributes.name + '<br>bytes loaded: ' + xhr.loaded.toLocaleString() + ' of ' + xhr.total.toLocaleString() ;

		}

	}


		// handle callbacks with file data events

		function callbackMarkdown( xhr ){

			showdown.setFlavor('github');
			const converter = new showdown.Converter();
			//const response = xhr.target.response;
			const html = converter.makeHtml( xhr.target.responseText );

			divContents.innerHTML = html;
			divContainer.style.display = 'block';
			window.scrollTo( 0, 0 );

			divContainer.scrollTop = 0;
			//			divContents.scrollTop = 0;
			divContainer.scrollTo( 0, 0 );
			//			divContents.scrollTo( 0, 0 );

		}



		function callbackToTextarea( xhr ){

			const response = xhr.target.response;
			divContents.innerHTML = '<textarea style=height:100%;width:100%; >' + response + '</textarea>';
			divContainer.style.display = 'block';

		}



	// handle fileReader events

	COR.openFile = function( files ) {

		var fileData, reader, data;

		reader = new FileReader();

		reader.onload = function( event ) {

			console.log( 'event', event );

			if ( files.files[0].name.toLowerCase().endsWith( '.xml' ) ) {

				GBX.openGbxmlFile( files );

			} else if ( files.files[0].name.toLowerCase().endsWith( '.md' ) ) {

				//txtArea.innerHTML = reader.result;
				COR.callbackMarkdownData( reader.result );

			} else {

				divContents.innerHTML = '<textarea style=height:500px;width:100%; >' + reader.result + '</textarea>';
				divContainer.style.display = 'block';

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

	COR.drop = event => {

		console.log( 'event', event );

		const iframeUrl = event.dataTransfer.getData( 'URL' );


		if ( iframeUrl ) {

			location.hash = iframeUrl;

		} else {

			GBX.openGbxmlFile( event.dataTransfer );

		}

		event.preventDefault();

	}



	COR.dropIframe = event => {

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

		divContents.innerHTML = html;
		divContainer.style.display = 'block';
		window.scrollTo( 0, 0 );

		divContainer.scrollTop = 0;
		//			divContents.scrollTop = 0;
		divContainer.scrollTo( 0, 0 );
		//			divContents.scrollTo( 0, 0 );

	}



	// handle menu header dragging with mouse or touch events

	COR.onMouseDownDraggable = function( event ) {

		COR.draggableTop = event.clientY - event.target.parentNode.offsetTop;
		COR.draggableLeft = event.clientX - event.target.parentNode.offsetLeft;

		window.addEventListener( 'mousemove', COR.onMouseMoveDraggable, true );
		event.preventDefault();

	};



	COR.onMouseMoveDraggable = function( event ) {

		event.target.parentNode.style.top = ( event.clientY - COR.draggableTop ) + 'px';
		event.target.parentNode.style.left = ( event.clientX - COR.draggableLeft ) + 'px';
		event.preventDefault();

	};



	COR.onMouseUpDraggable = function() {

		window.removeEventListener( 'mousemove', COR.onMouseMoveDraggable, true );
		event.preventDefault();

	}



	COR.onTouchStartDraggable = function( event ) {

		COR.draggableLeft = event.target.parentNode.offsetLeft;
		COR.draggableStartX = event.changedTouches[ 0 ].clientX;
		COR.draggableTop = event.target.parentNode.offsetTop;
		COR.draggableStartY = event.changedTouches[ 0 ].clientY;
		//console.log( 'draggableTop', draggableTop, draggableStartY );
		event.preventDefault();

	};



	COR.onTouchMoveDraggable = function( event ) {

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


	COR.toggleNav = function() {

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


	COR.toggleNavRight = function() {

		const left = 'calc( 100% - var( --mnu-width ) - 90px )';

		divContainer.style.display="none";

		if ( divHamburgerRight.style.left === '' || divHamburgerRight.style.left === left ) {

			//divHeadsUp.style.left = 'calc( -1 * var( --mnu-width ) - 20px )';
			divHeadsUp.style.left = 'calc( 100% )';
			divHamburgerRight.style.left = 'calc( 100% - 90px )';

		} else {

			divHeadsUp.style.left = 'calc( 100% - var( --mnu-width ) - 50px )';
			divHamburgerRight.style.left = left;

		}

	}