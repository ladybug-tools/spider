// copyright 2020 Theo Armour. MIT license.
// See
// 2020-02-06
/* FOHdivFileOpenHash */
// jshint esversion: 6
// jshint loopfunc: true

const FO = {};
const FOH = {};

FOH.urlDefaultFile = "https://cdn.jsdelivr.net/gh/ladybug-tools/spider@master/gbxml-sample-files/bristol-clifton-downs-broken.xml";

FOH.urlDefaultFile = "https://cdn.jsdelivr.net/gh/ladybug-tools/dragonfly-schema@master/samples/building_simple.json";

FOH.xhr = new XMLHttpRequest(); // declare now to load event listeners in other modules

FOH.regexImages = /\.(jpe?g|png|gif|webp|ico|svg|bmp)$/i;
FOH.regexHtml = /\.(htm?l)$/i;


FOH.init = function () {

	window.addEventListener ( 'hashchange', FOH.onHashChange, false );

	FOHdivFileOpenHash.innerHTML = FOH.getMenu();

};



FOH.getMenu = function () {

	const htm = `
<details>

	<summary class="sumMenuSecondary">

		File open hash

		<span class="couponcode">??? <span class="coupontooltip">aaa bbb ccc 123 456</span></span>

	</summary>

	<div id=FOHdivMessage ></div>

	<div id="FOBdivMessages"></div>

	<div id=FOHdivInfo ></div>

	<div id=FILdivProgress ></div>

	<div id=FOBdivInfo ></div>

</details>`;

	return htm;

};



FOH.onHashChange = function() {
	//console.log( 'FOH.urlDefaultFile', FOH.urlDefaultFile );
	//console.log( 'location.hash', location.hash );

	const url = !location.hash ? FOH.urlDefaultFile : location.hash.slice( 1 );

	FOH.requestFileDecider( url );

};




FOH.requestFileDecider = function( url ) { // from a button
	//console.log( 'url', url );

	if ( !url ) { return; }

	FOH.fileName = url.split( '/').pop();

	if ( FOH.regexHtml.test( url ) ) {

		FOH.target.innerHTML = `<iframe src=${ url } style="${ FOH.contentsCss }" ></iframe>`;

	} else if ( FOH.regexImages.test( url )  ) {

		FOH.target.innerHTML = `<img src=${ url } >`;

	} else if ( FOH.fileName.toLowerCase().endsWith( '.zip' )) {

		FOZ.xhrRequestFileZip( url, FOH.callbackUrlUtf16 );

	} else { // let

		//FOH.xhr.addEventListener( 'load', FOH.callbackDecider, false );

		FOH.requestFileText( url );

	}

};



FOH.requestFileText = function( url ) {

	if ( !url ) { return; }

	FOH.timeStart = performance.now();

	FOH.xhr.open( 'GET', url, true );
	FOH.xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
	FOH.xhr.onprogress = function( xhr ) { FOH.onProgress( xhr.loaded, FOH.note ); };
	FOH.xhr.onload = function( xhr ) { FOH.onProgress( xhr.loaded ); FOH.callbackDecider( xhr ); };
	FOH.xhr.send( null );

};



FOH.onProgress = function( size = 0, note = '' ) {

	const timeToLoad = ( performance.now() - FOH.timeStart ).toLocaleString();

	FOH.size = size;

	FOH.fileInfo =
	`
		<p>
			<span class=attributeTitle >Name: <span class=attributeValue >${ FOH.fileName }</span></br>
			<span class=attributeTitle >Bytes loaded: </span>: <span class=attributeValue >${ size.toLocaleString() }</span></br>
			<span class=attributeTitle >Time to load: </span>: <span class=attributeValue>${ timeToLoad } ms</span></br>
			${ note }
		</p>
	`;

	FOHdivInfo.innerHTML = FOH.fileInfo;

};



FOH.callbackDecider = function ( xhr ) {
	//console.log( 'xhr', xhr );

	FOH.text = xhr.target.response;

	const ulc = xhr.target.responseURL.toLowerCase();

	if ( ulc.endsWith( '.md' ) ) {

		FOH.setTargetWithMarkdownAsHtml( xhr.target.response );

	} else if ( ulc.endsWith( '.json' ) ) {

		FOH.callbackJson( xhr.target.response );

	} else if ( ulc.endsWith( '.xml' ) ) {

		FOH.callbackXml( xhr.target.response );

	} else {

		FOH.callbackOtherToTextarea( xhr.target.response );

	}

};



FOH.callbackXml = function( text ) {

	FOH.onProgress( text.length, "load complete" );

	FOH.text = text;

	FO.url = location.hash.slice( 1 );

	FO.data = text;

	FOH.event = new Event( "onloadFile", {"bubbles": true, "cancelable": false, detail: true } );

	//window.addEventListener( 'onloadFile', () => { console.log( '', text ) }, false );

	window.dispatchEvent( FOH.event );


};


FOH.callbackJson = function( text ) {

	FOH.onProgress( text.length, "load complete" );

	FOH.text = text;

	FO.url = location.hash.slice( 1 );

	FO.data = text;

	FOH.event = new Event( "onloadJson", {"bubbles": true, "cancelable": false, detail: true } );

	//window.addEventListener( 'onloadFile', () => { console.log( '', text ) }, false );

	window.dispatchEvent( FOH.event );


};

FOH.init();