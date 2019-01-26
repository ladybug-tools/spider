// Copyright 2019 pushMe-pullYou authors. MIT License
/* global  * /
/* jshint esversion: 6 */



const EJL = { "release": "R15.0", "date": "2019-01-25" };

EJL.description =
	`
		Export Json Lines (EJL) provides HTML and JavaScript 'boilerplate' to create a typical TooToo menu.

	`;

EJL.currentStatus =
	`
		<h3> Export Json Lines (EJL) ${ EJL.release} ~ ${ EJL.date }</h3>

		<p>
			${ EJL.description }
		</p>
		<p>
		Concept
			<ul>
				<li>Export Json Lines </li>

				<!-- <li></li> -->
			</ul>
		</p>
		<p>
			<a href="https://github.com/pushme-pullyou/tootoo13/tree/master/cookbook/EJL-template/" target="_blank" >
				Export Json Lines Read Me
			</a>
		</p>
		<p>
			Change log
			<ul>
				<li>2019-01-25 ~ First commit</li>
>
				<!-- <li></li> -->
			</ul>
		</p>

	`;



EJL.getMenuExportJsonLines = function() {

	FIL.xhr.addEventListener( 'load', EJL.onXhrResponse, false );
	FIL.reader.addEventListener( 'load', EJL.onReaderResult, false );
	document.body.addEventListener( 'onZipFileParse', EJL.onFileZipLoad, false );

	const htm =
	`
		<details open>

			<summary>Export Json Lines
				<a id=EJLSum class=helpItem href="JavaScript:MNU.setPopupShowHide(EJLSum,EJL.currentStatus);" >&nbsp; ? &nbsp;</a>
			</summary>

			<div id=EJLdivJsonLines ></div>

		</details>
	`;

	return htm;

};



EJL.onXhrResponse = function( event ) {

	name = event.target.responseURL.split( "/").pop();

	parseGbxml( event.target.response  );

};

EJL.onReaderResult = function( event ) {

	name = inpOpenFile.files[ 0 ].name;
	parseGbxml( FIL.reader.result );

};

EJL.onFileZipLoad = function( event ) {

	//console.log( '', event.srcElement.baseURI );

	name = event.srcElement.baseURI.split( "/" ).pop();

	parseGbxml( FIL.text );

};



function parseGbxml( txt ) {

	//console.log( '', xhr.target.response );

	text = txt.replace( /\r\n|\n/g, '' );
	//divContents.innerText = text;

	const reSurface = /<Surface(.*?)<\/surface>/gi;
	surfaces = text.match( reSurface );
	//console.log( 'GBX.surfaces', GBX.surfaces );

	//divContents.innerText = surfaces

	jsonl = "";

	for ( surface of surfaces ) {

		const surfaceType = surface.match( 'surfaceType="(.*?)"')[ 1 ];

		polyloops = getPolyLoops( surface );

		polyloop = polyloops[ 0 ].replace( /\s\s+/g, ' ' );
		//console.log( 'poly', polyloop );

		const coordinates = getCoordinates( polyloop );
		//console.log( 'coordinates', coordinates );

		jsonl +=
			`{ "uuid": "${ index++ }", "time": "${ performance.now()}", "author": "${ peeps[ Math.floor( peeps.length * Math.random() ) ] }", "action": "add", "sourceType": "gbXML", "element": "surface", "surfaceType": "${ surfaceType }", "coordinates": [ ${ coordinates } ] }\n`;

	}

	EJLdivJsonLines.innerText = jsonl;

}




function getPolyLoops( surface ) {
	//console.log( 'surface', surface );

	const re = /<PlanarGeometry(.*?)<polyloop(.*?)<\/polyloop>/gi;
	const polyloopText = surface.match( re );

	if ( !polyloopText ) { console.log( 'polyloopText', polyloopText, surface ) }

	const polyloops = polyloopText.map( polyloop => polyloop.replace(/<\/?polyloop>/gi, '' ) );

	return polyloops;

};




function getCoordinates( surface ) {

	const re = /<coordinate(.*?)<\/coordinate>/gi;
	const coordinatesText = surface.match( re );
	coordinates = coordinatesText.map( coordinate => coordinate.replace(/<\/?coordinate>/gi, '' ) )
		//.map( txt => Number( txt ) );
		.map( item => '"' + item + '"')
		.join();

	//console.log( 'coordinates', coordinates );

	return coordinates;

};


//////////


function saveFile() {

	let blob = new Blob( [ jsonl ] );
	let a = document.body.appendChild( document.createElement( 'a' ) );
	a.href = window.URL.createObjectURL( blob );
	a.download = `${ name }.jsonl`;
	a.click();
	//		delete a;
	a = null;

}
