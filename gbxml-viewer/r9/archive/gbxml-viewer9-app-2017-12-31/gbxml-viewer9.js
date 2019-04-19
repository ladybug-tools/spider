
	let uriDefaultFile = '../README.md';

//	location.hash = 'threejs-basic.html';

	var iconInfo = '<img src="https://pushme-pullyou.github.io/github-mark-64.png" height=14 >';
	var threeDefaultFile = '../gbxml-viewer9-01-core/gbxml-viewer9-core.html';

	let css, script, divMenu, divContainer, hamburger;

	init();

	function init() {

		const txt =
`

		<div>
			<a href="http://www.ladybug.tools/" target="_top" >Ladybug Tools</a> &raquo; <br>
			<a href="http://www.ladybug.tools/spider/" target="_top" >&#x1f578;</a> &raquo;
			<a href="../index.html" target="_top" style=font-size:24px; >&#x2302;</a> &raquo;
		</div>

		<h2>
			<a  href = "" >` + document.title + `</a>
		</h2>

		<p>` + document.head.querySelector( '[name=description]' ).content + `</p>
		<p><a href=#../README.md>Home / Main Read Me</a></p>

		<p id=dragArea class=dragDropArea >
			Drag and drop gbXML files into this box or <br>
			<input type = "file" id = "inpFile" onchange="setIfrThree();ifrThree.contentWindow.openFile(this);" >
		<p>

		<p>
			<button onclick="setIfrThree();" >view model</button>
			<button onclick="setContents();" >view text</button>

		</p>

		<p>

		<a href = "JavaScript:( function(){
			const script = document.head.appendChild( document.createElement( 'script' ) );
			script.src = '../gbxml-viewer9-04-settings/gbxml-viewer9-settings.js';
		} )()" >settings</a>


		<a href = "JavaScript:( function(){
			const script = document.head.appendChild( document.createElement( 'script' ) );
			script.src = '../gbxml-viewer9-05-reports/gbxml-viewer9-reports.js';
		} )()" >
		reports</a>

		</p>


		<hr>
		<div id = "divMenuItems" ></div>
		<div id = "divFooter" >

			<hr>

			<div title='many thanks!' ><a href=#../../../pages/credits.md >Credits</a></div>
			<div><a href=#../../../pages/code-of-conduct.md >Code of Conduct</a></div>
			<div><a href=#../../../pages/contributing.md >Contributing</a></div>
			<div><a href=#../../../pages/license.md >License</a></div>
			<div><a href=#../../../pages/markdown-help.md >Markdown Help</a></div>
			<div><a href="JavaScript:( function(){ var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()" title="Mr.doob's Stats.js appear in top left corner" >Show frames/second statistics</a></div>
			<div><a href="https://api.github.com/rate_limit" target="_blank">github rate limits</a></div>

			<h1 onclick=divMenu.scrollTop=0; style=cursor:pointer;text-align:center; title='go to top' > &#x2766; </h1>

		</div>
`;

		css = document.head.appendChild( document.createElement( 'link' ) );
		css.rel = 'stylesheet';
		css.type = 'text/css';
		css.href = 'style.css';

		script = document.body.appendChild( document.createElement( 'script' ) );
		script.src = 'https://cdn.rawgit.com/showdownjs/showdown/1.8.5/dist/showdown.min.js';
		script.onload = onHashChange;

		divMenu = document.body.appendChild( document.createElement( 'div' ) );
		divMenu.id = 'divMenu';

		hamburger = document.body.appendChild( document.createElement( 'div' ) );
		hamburger.id = 'hamburger';
		hamburger.innerHTML = 'slide &#9776';
		hamburger.onclick = toggleNav;

		divContainer = document.body.appendChild( document.createElement( 'div' ) );
		divContainer.id = 'divContainer';
		divContainer.innerHTML =
			'<iframe id=ifrThree src="../gbxml-viewer9-01-core/gbxml-viewer9-core.html" height=100% width=100% ></iframe>' +
			'<div id=divContents ></div>' +
		'';
		divContents.style.maxWidth = '800px';
		ifrThree.id = 'ifrThree';
		ifrThree.style.cssText = 'border: none; position: absolute; top: 0; z-index: -1;';


/// contents

		divMenu.innerHTML = txt;

		splashScreen = document.body.appendChild( document.createElement( 'script' ) );
		splashScreen.src = 'splash-screen.js';

// add event handlers

		window.addEventListener ( 'hashchange', onHashChange, false );

		dragArea.addEventListener( "dragover", function( event ){ event.preventDefault(); }, true );
		dragArea.addEventListener( 'drop', drop, false );

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



	function toggleNav() {

		const width = getComputedStyle( document.documentElement ).getPropertyValue( '--mnu-width' );

		if ( !divMenu.style.left || divMenu.style.left === '0px' ) {

			divMenu.style.left = '-300px';
			divMenu.style.padding = '0';
			hamburger.style.left = '-100px';
			divContainer.style.marginLeft = '0';

		} else {

			divMenu.style.left = '0px';
			divMenu.style.padding = '30px 10px 0 10px';
			hamburger.style.left = 'calc( var( --mnu-width ) - 100px )';
			divContainer.style.marginLeft = width;

		}

	}
