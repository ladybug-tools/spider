/* Copyright 2018 Ladybug Tools authors. MIT License */

let FIL = {};

FIL.divFileInfo = ''; // set to a div in main HTML file or nothing happens


FIL.getFileOpen = function( target = undefined ) {  // called from main HTML file

	window.addEventListener ( 'hashchange', FIL.onHashChange, false );

	divFileOpen.addEventListener( "dragover", function( event ){ event.preventDefault(); }, true );
	divFileOpen.addEventListener( 'drop', FIL.drop, false );

	const htm =
	`
		<p id=pFileOpen>
			Open RAD and MAT files:
			<input type=file id=inpOpenFile onchange=FIL.inpOpenFiles(this.files); multiple accept=".rad,.mat" >
		</p>
	`;

	return htm;

};



FIL.onHashChange = function() {

	RAD.url = location.hash.slice( 1 );

	FIL.timeStart = performance.now();

	RAD.json = { 'surfaces': [], 'materials': [], 'other': [] };

	FIL.htmLog = '';
	FIL.txtRadiance = '';
	FIL.txtJson = '';

	const arr = location.hash.slice( 1 ).split( '/');
	RAD.name = arr.pop();
	RAD.path = arr.join( '/' ) + '/';

	if ( RAD.url ) {

		const urls =  RAD.url.split( '&' );
		//console.log( 'url', urls[ 0 ] );

		for ( url of urls ) {

			RAD.url = url;
			const arr = location.hash.slice( 1 ).split( '/');
			RAD.name = arr.pop();
			RAD.path = arr.join( '/' ) + '/';
			FIL.requestFile( RAD.url, FIL.callbackRequestFile );

		}

	}

};



FIL.requestFile = function( url, target ) {

	const xhr = new XMLHttpRequest();  // unlike fetch handles local files
	xhr.crossOrigin = 'anonymous';
	xhr.open( 'GET', url, true );
	xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
	//xhr.onprogress = function( xhr ) { console.log( 'bytes loaded:', xhr.loaded ); }; // or something
	xhr.onload = target;
	xhr.send( null );

};



FIL.callbackRequestFile = function( xhr ) {
	//console.log( 'xhr.target.response', xhr.target.response );

	const json = RAD.addDataFile( xhr.target.response );
	//console.log( 'json', json );
	//js = json

	json.forEach( result => RAD.json[ result[ 0 ] ].push( result[ 1 ] ) ); // not easy to understand

	RAD.size = xhr.target.response.length;

	FIL.htmLog +=
	`
		<p>
			name: ${ RAD.name }<br>
			size: ${ RAD.size.toLocaleString() } bytes<br>
		</p>
	`;

	FIL.txtRadiance = xhr.target.response;
	FIL.txtJson = JSON.stringify( json, undefined, 1 );

	//FIL.setLog( FIL.divFileData );
	FIL.timeLoad = ( performance.now() - FIL.timeStart ).toLocaleString();

};


//////////

FIL.requestFileXform = function( url ) {
	//console.log( 'requestFileXform', 11);

	FIL.timeStart = performance.now();

	RAD.url = url;
	RAD.jsonData = [];

	RAD.json = { 'surfaces': [], 'materials': [], 'other': [] };

	FIL.htmLog = '';
	FIL.txtRadiance = '';
	FIL.txtJson = '';

	const arr = url.split( '/');
	RAD.name = arr.pop();
	//RAD.path = arr.join( '/' ) + '/';

	FIL.requestFile( url, FIL.callbackRequestFileXform );

}



FIL.callbackRequestFileXform = function( xhr ) {
	//console.log( 'xhr.target.response', xhr.target.response );
	//console.log( 'callbackRequestFileXform', 22 );

	location.hash = '';
	//FIL.divFileData = divFileData; // needed??

	//json = RAD.addDataFile( xhr.target.response );

	const json = RAD.radToJson( xhr.target.response );

	RAD.jsonData.push( json );

	json.forEach( result => RAD.json[ result[ 0 ] ].push( result[ 1 ] ) ); // not easy to understand

	//console.log( 'RAD.json 111', RAD.json );

	RAD.size = xhr.target.response.length;

	const arr = RAD.url.split( '/');
	const name = arr.pop();
	RAD.path = arr.join( '/' );
	//console.log( 'RAD.path', RAD.path );

	RAD.items = 0;

	//console.log( 'RAD.json.other', RAD.json.other);

	for ( file of RAD.json.other ) {

		if ( file.modifier === "!xform" && file.type.startsWith( '-' ) === false ){

			//console.log( 'file.modifier', file );
			RAD.items ++;

		}

	}

	RAD.count = 0;

	for ( file of RAD.json.other ) {

		//console.log( 'file', file );

		if ( file.modifier !== "!xform" && file.type.startsWith( '-') === true ){ break; }

		//const arr = file.type.slice( 2 ).split( '/');
		let start = file.type.indexOf( '/' );
		//console.log( 'start', start );
		start = start === -1 ? 0 : start;
		const arr = file.type.slice( start ).split( '/');
		const name = arr.pop();
		const folder = arr.join( '/' ) + '/'

		const link = RAD.path + folder + name ;
		//console.log( 'link', link );
		//console.log( 'name', name );

		if ( name !== '' ) {

			FIL.requestFile( link, FIL.callbackRequestFileXformTwo );

		}

	}

/*
	FIL.htmLog +=
	`
		<p>
			name: ${ RAD.name }<br>
			size: ${ RAD.size.toLocaleString() } bytes<br>
		</p>
	`;

	FIL.txtRadiance = xhr.target.response;
	FIL.txtJson = JSON.stringify( json, undefined, 1 );

	//FIL.setLog( FIL.divFileData );

	RAD.setThreeJsWindowUpdate( RAD.json );
*/

};



FIL.callbackRequestFileXformTwo = function( xhr ) {
	//console.log( 'xhr.target.response', xhr.target.response );

	const json = RAD.radToJson( xhr.target.response );

	RAD.jsonData.push( json );

	RAD.count ++;

	if ( RAD.count >= RAD.items ) {

		//console.log( 'RAD.jsonData', RAD.jsonData);

		for ( jsonData of RAD.jsonData ) {

			jsonData.forEach( result => RAD.json[ result[ 0 ] ].push( result[ 1 ] ) ); // not easy to understand

		}

		console.log( 'RAD.json', RAD.json);
		RAD.setThreeJsWindowUpdate( RAD.json );

	}

	/*

	RAD.size = xhr.target.response.length;

	FIL.htmLog +=
	`
		<p>
			name: ${ RAD.name }<br>
			size: ${ RAD.size.toLocaleString() } bytes<br>
		</p>
	`;

	FIL.txtRadiance = xhr.target.response;
	FIL.txtJson = JSON.stringify( json, undefined, 1 );

	//FIL.setLog( FIL.divFileData );
	*/

};


//////////

FIL.inpOpenFiles = function( fileObj ) {

	//console.log( 'fileObj', fileObj );
	//ff = Array.from( fileObj );

	location.hash = '';

	RAD.json = { 'surfaces': [], 'materials': [], 'other': [] };

	FIL.htmLog = '';
	FIL.txtRadiance = '';
	FIL.txtJson = '';

	let count = 0;

	Object.keys( fileObj ).forEach( i => {

		const reader = new FileReader();
		const file = fileObj[ i ];

		reader.onload = function( event ) {

			const json = RAD.addDataFile( reader.result );

			FIL.htmLog +=
			`
				<p>
					name: ${ file.name }<br>
					size: ${ file.size.toLocaleString() } bytes<br>
				</p>
			`;

			if ( reader.result.length < 500000 ) {

				FIL.txtRadiance += reader.result;
				FIL.txtJson += JSON.stringify( json, undefined, 1 );

			}

			count++;

			if ( count === fileObj.length ) { FIL.timeLoad = ( performance.now() - FIL.timeStart ).toLocaleString(); }

		}

		reader.readAsText( file );

	} );

};



////////// handle drag and drop events

FIL.drop = function( event ) {

	const dropUrl = event.dataTransfer.getData( 'URL' );
	//console.log( 'dropUrl', dropUrl );
	//console.log( 'event', event );

	if ( dropUrl ) {

		location.hash = dropUrl;

	} else {

		FIL.inpOpenFiles( event.dataTransfer );

	}

	event.preventDefault();

};



//////////

FIL.setLog = function() {

	//if ( !target ) { return; }

	const htmPlus = RAD.size < 500000 ?
	`
		<!-- div and text area show errors differently -->
		<!--
			<p>JSON div </p>
			<div id = "divJson" ></div>
		-->

		<p>
			JSON textarea
			<textarea id = "txtJson" >${ FIL.txtJson }</textarea>
		</p>

		<p>
			Radiance textarea
			<textarea id = "divRadiance" >${ FIL.txtRadiance }</textarea>
		</p>
	`
	:
	`
		<p>Shows data only for files under 500 KB </p>
	`;

	const htm =
	`
		<div id = "divLog" >${ FIL.htmLog }</div>
		<p>time: ${ FIL.timeLoad } ms</p>
		<div>triangles: ${ RAD.count3.toLocaleString() }</div>
		<div>quads: ${ RAD.count4.toLocaleString() }</div>
		<div>five+: ${ RAD.count5plus.toLocaleString() } / 10: ${ RAD.count10 } / 11: ${ RAD.count11 }</div>
		<div>geometries: ${ RAD.countGeo.toLocaleString() }</div>
		${ htmPlus }
	`;

	divFileData.innerHTML = htm;

};