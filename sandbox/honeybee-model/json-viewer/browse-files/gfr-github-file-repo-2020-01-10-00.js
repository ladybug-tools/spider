// copyright 2020 Theo Armour. MIT license.
/* global GFRdivGetFiles, GFRselFiles, GFRdivOnLoad, GFRdivFileLoaded, GFRtxtRawJson, JTV, JTVdivJsonView */
// jshint esversion: 6
// jshint loopfunc: true


const GFR = {};

GFR.repos = [

	"jaanga/jaanga.github.io",
	"ladybug-tools-in2/honeybee-schema",
	"ladybug-tools-in2/energy-model-measure",
	"nasa/NASA-3D-Resources"

];

GFR.url = "https://api.github.com/repos/ladybug-tools-in2/honeybee-schema/git/trees/master?recursive=1";
GFR.prefix = "https://rawcdn.githack.com/ladybug-tools-in2/honeybee-schema/master/";
GFR.source = "https://github.com/";

// GFR.init() is at end of file



GFR.init = function() {

	GFRdivGetFiles.innerHTML = GFR.getMenu();

	GFRselRepo.innerHTML = GFR.getOptionsUrls();

	GFRselRepo.selectedIndex = 1;

	GFR.getUrl( GFRselRepo.selectedIndex );

};


GFR.getMenu = function() {

	const htm = `
	<details open>

		<summary>Honeybee Model-Schema Samples</summary>

		<p>
			A list of files from repos on GitHub.
			More details available in JavaScript developer console.
		</p>

		<select id=GFRselRepo onchange=GFR.getUrl(this.selectedIndex) size=10 style=overflow:auto;width:100% ></select>

		<br>

		<div id=GFRdivOnLoad ></div>

		<div id=GFRdivFileLoaded ></div>

	</details>


	<details>

		<summary>Raw JSON file <span class=help onmouseover=GFRpRawJsonHelp.hidden=false >?</span></summary>

		<p id=GFRpRawJsonHelp onmouseout=GFRpRawJsonHelp.hidden=true hidden >
			The plain text JSON source code as read directly from the GitHub repository. The text is editable.</p>

		<textarea id=GFRtxtRawJson style=height:400px;width:100%;></textarea>

	</details>

	<br>
`;

	return htm;

};


GFR.getUrl = function( index ) {

	repo = GFR.repos[ index ]

	GFR.url = `https://api.github.com/repos/${ repo }/git/trees/master?recursive=1`;

	GFR.getFileNames();

};


GFR.getFileNames = function () {

	fetch( GFR.url )
		.then( response => response.json() )
		.then( json => {

			GFR.filesData = json.tree; //.filter( item => item.path.includes( "samples" ) ).filter( item => item.path.endsWith( ".json" ) ).map( item => item );

			GFR.getFileJson(); // load a default file

		} );

};



GFR.getOptionsUrls = function () {

	const options = GFR.repos.map( ( item, index ) =>
		`<option value=${ index } title="" >${ index + 1 } ${ item }</option>` );

	//GFRdivOnLoad.innerHTML = `<p>Files found on GitHub: ${ options.length }</p>`;

	return options;

};



GFR.getFileJson = function () {

	const xhr = new XMLHttpRequest();
	xhr.open( 'GET', GFR.url, true );
	xhr.onerror = ( xhr ) => console.log( 'error:', xhr );
	//xhr.onprogress = ( xhr ) => console.log( 'bytes loaded:', xhr.loaded );
	xhr.onload = ( xhr ) => {

		GFR.json = JSON.parse( xhr.target.response );
		console.log( 'GLF.json', GFR.json );

		JTV.json = GFR.json;

		JTVdivJsonTree.innerHTML = JTV.parseJson( JTV.root, GFR.json, 0 );

		//GFR.file = GFR.filesData[ GFRselFiles.selectedIndex ];
		//console.log( 'GLF.file', GFR.file );

		GFRtxtRawJson.value = xhr.target.response;


		let eventGlfLoad = new Event( "onloadglf", {"bubbles": true, "cancelable": false, detail: true } );

		window.addEventListener( "onloadglf", GFR.onLoad, false );

		window.dispatchEvent( eventGlfLoad );

	};

	xhr.send( null );

};


GFR.onLoad = function (event) { // console.log( 'gfR event', event );

	const title = GFR.repos[ GFRselRepo.selectedIndex ];

	GFRdivFileLoaded.innerHTML =
		`<p>Link to file loaded. Click to edit.<br> <a href="${ GFR.source + title }" target="_blank" >${ title }</a></p>`;

};




GFR.init();