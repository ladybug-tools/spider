// Copyright 2019 pushMe-pullYou authors. MIT License
/* global  * /
/* jshint esversion: 6 */



const EJL = { "release": "R2.1", "date": "2019-01-27" };


let peeps = [ "pamela", "patty", "paul", "peter" ];

let peepsSurfaceTypes = {

	InteriorWall: "patty",
	ExteriorWall: "pamela",
	Roof: "pamela",
	InteriorFloor: "patty",
	ExposedFloor: "pamela",
	Shade: "peter",
	UndergroundWall: "pamela",
	UndergroundSlab: "pamela",
	Ceiling: "patty",
	Air: "paul",
	UndergroundCeiling: "patty",
	RaisedFloor: "paul",
	SlabOnGrade: "peter",
	FreestandingColumn: "paul",
	EmbeddedColumn: "paul",
	Undefined: "paul"

};



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

	let peepsButtons = "";

	for ( peep of peeps ) {

		peepsButtons += `<p><button onClick=EJL.saveActorFile("${ peep }") >save ${ peep }'s data to file</button></p>`

	}


	const htm =
	`
		<i>scroll down to see save buttons</i>

		<details open>

			<summary>Export Json Lines
				<a id=EJLSum class=helpItem href="JavaScript:MNU.setPopupShowHide(EJLSum,EJL.currentStatus);" >&nbsp; ? &nbsp;</a>
			</summary>

			<div id=EJLdivJsonLines style=height:300px;overflow:auto; ></div>

			<div>
				<p>
					<button id=but onclick=EJL.saveFile(EJL.jsonl); accessKey= 'z' title='access key: z '>save all data to single JSON lines file</button>
				</p>
			</div>

			<div id=EJLdivSaveActorFiles >${ peepsButtons }</div>

			<div>
			<a href="../../jsonl-reader/index.html" >JSON Lines Reader</a><div>

		</details>
	`;

	return htm;

};



EJL.onXhrResponse = function( event ) {

	EJL.name = event.target.responseURL.split( "/").pop();

	EJL.parseGbxml( event.target.response  );

};



EJL.onReaderResult = function( event ) {

	EJL.name = inpOpenFile.files[ 0 ].name;
	EJL.parseGbxml( FIL.reader.result );

};



EJL.onFileZipLoad = function( event ) {

	//console.log( '', event.srcElement.baseURI );

	EJL.name = event.srcElement.baseURI.split( "/" ).pop();

	EJL.parseGbxml( FIL.text );

};



EJL.parseGbxml = function( txt ) {

	//console.log( '', xhr.target.response );

	EJL.peep = "";

	EJL.index = 1;

	const text = txt.replace( /\r\n|\n/g, '' );
	//divContents.innerText = text;

	EJL.jsonl = EJL.getCampusAttributes( text );

	const reSurface = /<Surface(.*?)<\/surface>/gi;
	const surfaces = text.match( reSurface );

	for ( surface of surfaces ) {
		//console.log( 'surface', surface );

		const recaddOjectId = /<CADObjectId>(.*?)<\/CADObjectId>/i;
		let caddOjectId = surface.match( recaddOjectId );
		caddOjectId = caddOjectId ? `"caddOjectId": "${ encodeURI( caddOjectId[ 1 ] ) }", ` : "";
		//console.log( 'caddOjectId', caddOjectId );

		let exposedToSun = surface.match( 'exposedToSun="(.*?)"' );
		exposedToSun = exposedToSun ? `"exposedToSun": "${ exposedToSun[ 1 ] }", ` : "";

		const id = surface.match( ' id="(.*?)"' )[ 1 ];

		const reName = /<Name>(.*?)<\/Name>/i;
		let name = surface.match( reName  );
		name = name ? `"Name": "${ name[ 1 ] }", ` : "";

		let spaceIdRef = surface.match( / spaceIdRef="(.*?)"/gi );
		spaceIdRef = spaceIdRef ? [ ...spaceIdRef].map( item => item.slice( 12 )) : [];
		//console.log( 'spaceIdRef', spaceIdRef );

		const surfaceType = surface.match( 'surfaceType="(.*?)"' )[ 1 ];

		const polyloops = EJL.getPolyLoops( surface );

		const polyloop = polyloops[ 0 ].replace( /\s\s+/g, ' ' );
		//console.log( 'poly', polyloop );

		const coordinates = EJL.getCoordinates( polyloop );
		//console.log( 'coordinates', coordinates );

		const actor = peepsSurfaceTypes[ surfaceType ];

		EJL.jsonl +=

			`{ "id": "${ EJL.index++ }", "time": "${ new Date().toJSON() }", "project": "${ EJL.name }",` +
			`"sourceType": "gbXML", "action": "add", ` +
			`"element": "surface", ` +
			`"attributes": { ${ caddOjectId }${ exposedToSun } "id": "${ id }",${ name }` +
			`"spaceIdRef": [${ spaceIdRef }], "surfaceType": "${ surfaceType }" }, ` +
			`"coordinates": [ ${ coordinates } ], ` +
			`"actor": "${ actor }", ` +
			`"message": "surface" }\n`;

	}

	EJLdivJsonLines.innerText = EJL.jsonl;

};



EJL.getCampusAttributes = function( text ) {

	EJL.parser = new DOMParser();
	const campusXml = EJL.parser.parseFromString( text, "application/xml").documentElement;

	let txt = "";
	for ( let attribute of campusXml.attributes ) {

		txt += `"${ attribute.name }": "${ attribute.value }",`;

	}

	const latitude = text.match( /<Latitude>(.*?)<\/Latitude>/i )[ 1 ];

	const longitude = text.match( /<Longitude>(.*?)<\/Longitude>/i )[ 1 ];

	jsonl =
		`{ "id": "${ EJL.index++ }", "time": "${ new Date().toJSON() }", "project": "${ EJL.name }",` +
		`"sourceType": "gbXML", "action": "add", ` +
		`"attributes": { ${ txt } "latitude": "${ latitude }", "longitude": "${longitude }" }, ` +
		`"actor": "${ peeps[ Math.floor( peeps.length * Math.random() ) ] }", ` +
		`"message": "The basic project attributes" }\n`;

	return jsonl;

};



EJL.getPolyLoops = function( surface ) {
	//console.log( 'surface', surface );

	const re = /<PlanarGeometry(.*?)<polyloop(.*?)<\/polyloop>/gi;
	const polyloopText = surface.match( re );

	if ( !polyloopText ) { console.log( 'polyloopText', polyloopText, surface ) }

	const polyloops = polyloopText.map( polyloop => polyloop.replace(/<\/?polyloop>/gi, '' ) );

	return polyloops;

};




EJL.getCoordinates = function( surface ) {

	const re = /<coordinate(.*?)<\/coordinate>/gi;
	const coordinatesText = surface.match( re );
	const coordinates = coordinatesText.map( coordinate => coordinate.replace(/<\/?coordinate>/gi, '' ) )
		//.map( txt => Number( txt ) );
		.map( item => '"' + item + '"')
		.join();

	//console.log( 'coordinates', coordinates );

	return coordinates;

};



EJL.getAttributesHtml = function( obj ) {
	//console.log( 'obj', obj );

	let htm ='';

	for ( let attribute of obj.attributes ) {

		htm +=
		`<div>
			<span class=attributeTitle >${ attribute.name }</span>:
			<span class=attributeValue >${ attribute.value }</span>
		</div>`;

	}

	const nodes = obj.childNodes;
	const numbers = ['Azimuth', 'Height', 'Tilt', 'Width' ];

	for ( let node of nodes ) {
		//console.log( 'node', node);

		if ( node.nodeName !== "#text" ) {
			//console.log( 'node', node.nodeName, node );

			if ( node.childElementCount > 0 ) {
				//console.log( 'node', node );

			} else if ( node.innerHTML ) {
				//console.log( 'node', node );

				const value = numbers.includes( node.nodeName ) ? Number( node.innerHTML ).toLocaleString() : node.innerHTML;

				htm +=

				`<div>
					<span class=attributeTitle >${ node.nodeName }</span>:
					<span class=attributeValue >${ value }</span>
				</div>`;

			}

		} else {

			//console.log( 'node', node );

		}

	}

	return htm;

};



//////////


EJL.saveActorFile = function ( peep ){
	//console.log( 'peep', peep );

	const lines = EJL.jsonl.split( "\n" );

	peepJsonl = "";

	for ( line of lines) {

		if ( line.includes( peep ) ) {

			//console.log( 'line', line );

			peepJsonl += line + "\n";

		}

	}

	EJL.saveFile( peepJsonl, peep + "-" );

}


EJL.saveFile = function( jsonl, peep = "" ) {

	let blob = new Blob( [ jsonl ] );
	let a = document.body.appendChild( document.createElement( 'a' ) );
	a.href = window.URL.createObjectURL( blob );
	a.download = `${ peep }${ EJL.name }.jsonl`;
	a.click();
	//		delete a;
	a = null;

};
