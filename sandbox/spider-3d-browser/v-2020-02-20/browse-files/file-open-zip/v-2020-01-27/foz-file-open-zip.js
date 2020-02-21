// copyright 2020 Theo Armour. MIT license.
// See pushme-pullyou/templates-01/modules/template
// 2020-01-15
/* divContent */
// jshint esversion: 6
// jshint loopfunc: true


const FOZ = {};



FOZ.init = function () {

	FOZdivFileOpenZip.innerHTML += FOZ.getMenu();

	window.addEventListener( "onloadFile", FOZ.onLoadFile, false )

};



FOZ.getMenu = function () {

	const htm = `
<details open>

	<summary class="sumMenuSecondary">
		File open Zip

		<span class="couponcode">??? <span class="coupontooltip">Open and de-compress a ZIP file.<br><br>
		Extract the first file found and load as text.</span></span>

	</summary>

	<div id=FOZdivOnProgress ></div>

	<div id=FOZdivLog ></div>

	<div id=FOZdivContent ></div>

</details>`;

	return htm;

};


FOZ.onLoadFile = function () {

	if ( FO.url.toLowerCase().endsWith( ".zip" ) === false ) { return; }

	FOZ.timeStart = performance.now();

	FOZ.fileOpenZip( FO.data );

};


FOZ.fileOpenZip = function () {

	const response = FO.data;
	console.log( 'response', response );

	const zip = new JSZip();
	FOZ.files = [];

	zip.loadAsync( response )

	.then( function( zip ) {
		//console.log( 'zip', zip );

		zip.forEach( ( relativePath, zipEntry ) => FOZ.files.push( zipEntry ) );

		// Read first file from the zip file!
		const uint8array = zip.file( FOZ.files[ 0 ].name ).async( "uint8array" );
		//console.log( 'names[ 0 ]', FOZ.files[ 0 ].name );

		FOZ.file = FOZ.files[ 0 ];

		return uint8array;

	} )

	.then( function( uint8array ) {
		//console.log( 'uint8array', uint8array[ 0 ] );

		let text = '';

		if ( uint8array[ 0 ] !== 255 ||  uint8array[ 0 ] === 239 || uint8array[ 0 ] === 60 ) {

			text = new TextDecoder( "utf-8" ).decode( uint8array );
			//console.log( 'text', text );

		} else {

			const arr = new Uint8Array( uint8array.length / 2 );
			let index = 0;

			// console.log( 'uint8array', uint8array );

			for ( let i = 0; i < uint8array.length; i++ ) {

				if ( i % 2 === 0 ) {

					arr[ index++ ] = uint8array[ i ];

				}

			}
			//console.log( 'arr', arr );

			text = new TextDecoder( "utf-8" ).decode( arr );

		}
		//console.log( 'text', text );

		return text;

	} )

	.then(

		function success( text ) {

			FOZ.text = text;
			//console.log( '', FOZ.text );

			FOZdivOnProgress.innerHTML = `
<p>
	bytes loaded: ${ FOZ.text.length.toLocaleString() }<br>
	time elapsed ${ ( performance.now() - FOZ.timeStart ).toLocaleString() } ms
</p>

`;

			const event = new Event( 'FOZonZipDecompress' );

			document.body.addEventListener( 'FOZonZipDecompress', FOZ.onZipDecompress, false );

			document.body.dispatchEvent( event );

			FOZdivOnProgress.append( " load completed" );

		},

		function error( e ) { FOZdivOnProgress.append( `error ${ e } ` ); }

	);

};


FOZ.onZipDecompress = function ( event) {

	//console.log( 'event', event, FOZ.file );

	FOZdivLog.innerHTML = `
<p>
	file name: ${FOZ.file.name }<br>
	file date: ${FOZ.file.date }<br>
	file size: ${ FO.data.size.toLocaleString() }<br>
	files in zip: ${ FOZ.files.length }
</p>

<details ontoggle=FOZ.displayFileContents(); >

<summary>Display compressed file contents</summary>

<p>First thousand characters</p>

<textarea id=FOZtxtArea style=height:50rem;overflow:auto;width:100%; ></textarea>

</details>
<hr>
`;

}


FOZ.displayFileContents = function () {

	FOZtxtArea.value = FOZ.text.slice( 0, 1000 );

};




FOZ.init();