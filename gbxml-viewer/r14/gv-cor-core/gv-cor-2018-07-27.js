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

	COR.updateCss( themeName );

	if ( window.CORdragArea ) {
		CORdragArea.addEventListener( "dragover", function( event ){ event.preventDefault(); }, true );
		CORdragArea.addEventListener( 'drop', COR.drop, false );
	}

	window.addEventListener ( 'hashchange', COR.onHashChange, false );

	// see CTX.initHeadsUp for renderer events

	COR.timeStart = Date.now();

};



COR.updateCss = function( link ) {

	themeName = css.href = link;
	localStorage.setItem( 'themeName', link );
	setTheme();

}



function setTheme( target ) {

	const themesBootswatch = [
		{ 'Default': 'background-color: white; color: #007bff' },
		{ "Cerulean": 'background-color: white; color: #2FA4E7;' },
		{ 'Cosmo': 'background-color: white; color: #2780E3;' },
		{ 'Cyborg': 'background-color: #060606; color: #2A9FD6; font-style: italic;' },
		{ 'Darkly': 'background-color: #222; color: #00bc8c; font-style: italic;' },
		{ 'Flatly': 'background-color: white; color: #18BC9C;' },
		{ 'Journal': 'background-color: white; color: #EB6864;' },
		{ 'Litera': 'background-color: white; color: #4582EC;' },
		{ 'Lumen': 'background-color: white; color: #158CBA;' },
		{ 'Lux': 'background-color: white; color: #1a1a1a;' },
		{ 'Materia': 'background-color: white; color: #2196F3;' },
		{ 'Minty': 'background-color: white; color: #78C2AD;' },
		{ 'Pulse': 'background-color: white; color: #593196;' },
		{ 'Sandstone': 'background-color: white; color: #93C54B;' },
		{ 'Simplex': 'background-color: white; color: #D9230F;' },
		{ 'Sketchy': 'background-color: white; color: #333;' },
		{ 'Slate': 'background-color: #272B30; color: #fff; font-style: italic;' },
		{ 'Solar': 'background-color: #002B36; color: #839496; font-style: italic;' },
		{ 'Spacelab': 'background-color: white; color: #3399F3;' },
		{ 'Superhero': 'background-color: #2B3E50; color: #DF691A; font-style: italic;' },
		{ 'United': 'background-color: white; color: #E95420;' },
		{ 'Yeti': 'background-color: white; color: #008cba;' },
	];


	const themesOthers = [

		{ link: "https://demos.creative-tim.com/material-kit/assets/css/material-kit.min.css", name: "Material Kit" },
		{ link: "https://www.gettemplate.com/demo/initio/assets/css/styles.css", name: 'Initio' },
		{ link: "https://blackrockdigital.github.io/startbootstrap-creative/css/creative.min.css", name: 'Creative' },
		{ link: "https://tympanus.net/Freebies/Cardio/css/cardio.css", name: 'Cardio' },
		{ link: "https://www.gettemplate.com/demo/magister/assets/css/magister.css", name: 'Magister' },
	];


	const txt1 = themesBootswatch.map( theme => {
		const name = Object.keys( theme )[ 0 ];
		link = name === 'Default' ?
			'https://bootswatch.com/_vendor/bootstrap/dist/css/bootstrap.css' :
			`https://stackpath.bootstrapcdn.com/bootswatch/4.1.1/${ name.toLowerCase() }/bootstrap.min.css`;
		bingo =  link === themeName ? '*' : ''
		return `<button class=theme onclick=COR.updateCss("${ link }"); style="${ theme[name] }" >${ bingo }${ name }${ bingo }</button> `;

	});

	divBootswatch.innerHTML = '<p>Themes from <a href="https://bootswatch.com/" target=_blank>Bootswatch</a><br>' + txt1.join( '' );

	let txt = '<p>Themes from other sources</p>';

	for ( let theme of themesOthers ) {

		//name = Object.keys( theme )[ 0 ];
		//console.log( 'name', name );
		//console.log( 'link', theme.link );
		txt += `<button class="theme btn btn-secondary" onclick=COR.updateCss("${ theme.link }"); style="${ theme.name }" >${ theme.name }</button> `;

		divCssOthers.innerHTML = txt + '<p><small>these buttons are work-in-progress WIP</small></p>';

	}

}



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



////////// Slide / Hamburger operations


COR.resetLeftMenu = function () {

	// will become remove .active class

	/*
	const menuButtons = document.querySelectorAll( "button.app-menu" );

	menuButtons.forEach( element => {
		element.style.backgroundColor ='';
		element.style.fontStyle ='';
		element.style.fontWeight ='';
	} );
	*/

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

	const width = CORdivMenuLeft.getBoundingClientRect().width;
	//console.log( 'CORdivHamburgerLeft.style.left', CORdivHamburgerLeft.style.left, width );

	if ( CORdivMenuLeft.style.left === '' || CORdivMenuLeft.style.left === '0px' ) {

		CORdivMenuLeft.style.left = '-' + width + 'px';

	} else {

		CORdivMenuLeft.style.left = '0px';

	}

};



COR.toggleNavRight = function() {

	//CORdivMenuRight.style.display = "none";

	const width = CORdivMenuRight.getBoundingClientRect().width;
	//console.log( 'width', width );

	if ( CORdivMenuRight.style.left === '100%' ) {

		if ( window.innerWidth > 900 ) {

			CORdivMenuRight.style.left = ( window.innerWidth - 10 - width ) + 'px';

		} else { //} if ( window.innerWidth > 600 ) {

			CORdivMenuRight.style.left = '60%';
			CORdivMenuRight.style.width = '38%';

		}

	} else {

		CORdivMenuRight.style.left = '100%';

	}

};



COR.setPanelButtonInit = function( button ) { // used by each script as it loads

	CORdivMenuRight.style.display = 'none';

	// update so it add 'active' class??

	//button.style.cssText = COR.buttonToggleCss;

};



COR.setPanelButtonClear = function( button ) { //anybody using this??

	CORdivMenuItems.innerHTML = '';

	button.style.fontStyle = '';
	button.style.backgroundColor = '';
	button.style.fontWeight = '';

};



COR.setMenuButtonsClass = function( target ) {
	// used by: COR.loadScript / SET"too many places! / CTX

	const buttons = target.getElementsByTagName( "button" );

	for ( let button of buttons ) {

		//button.classList.add( "w3-theme-d1", "w3-hover-theme", "w3-hover-border-theme" );
		button.classList.add( "btn", "btn-secondary", "btn-sm" );

	}

}
