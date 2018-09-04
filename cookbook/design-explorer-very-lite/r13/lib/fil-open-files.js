/* Copyright 2018 Ladybug Tools authors. MIT License */
/* globals projects, THREE, CSV, FLT, SEL, THR, divLog, divFiltersText, divFiltersNumeric, divMenu, hamburger  */
// jshint esversion: 6


let FIL = {};



FIL.onHashChange = function() {

	const hash = location.hash.slice( 1 ).split( '&' );
	CSV.selectIndices = hash[ 1 ] ? hash[ 1 ].split( '' ) : undefined;
	//console.log( 'CSV.selectIndices', CSV.selectIndices );

	const project = hash[ 0 ];

	if ( project !== CSV.projectKey ) {

		CSV.projectKey = hash[ 0 ];
		CSV.project = projects[ CSV.projectKey ];
		CSV.urlCSV = CSV.project[ 0 ];
		CSV.urlImg = CSV.project[ 1 ];
		CSV.getPics = CSV.project[ 2 ];
		CSV.projectTitle = CSV.project[ 3 ];

		FIL.fetchFileCsv( CSV );

	} else {

		SEL.setSelect();

		FLT.setTextFilters( divFiltersText );

		FLT.setNumericFilters( divFiltersNumeric );

	}

};



FIL.fetchFileCsv = function( project ) {

	const request = new Request( project.urlCSV );

	fetch( request )
		.then( response => response.text() )
		.then( text => FIL.callbackFileCsv( text ) );

};



////////// Used by all file open methods

FIL.callbackFileCsv = function( text ) {

	//console.log( 'text', text );

	CSV.lines = text.split( '\n' ).map( function( line ) { return line.split( ',' ); } ).slice( 0, -1 );
	//console.log( 'CSV.lines', CSV.lines );

	CSV.fields = CSV.lines.shift();
	//console.log( 'CSV.fields', CSV.fields );

	CSV.indexImg = CSV.fields.indexOf( CSV.fields.find( key => key.startsWith( 'img' ))) ;

	SEL.setSelect();

	FLT.setTextFilters( divFiltersText );

	FLT.setNumericFilters();

};



////////// Open file with OS file dialog bo

FIL.initOpenFiles = function( target ) {

	target.innerHTML =
	`
		<p><input type=file id=inpFile onchange=FIL.loadFiles(this); ></p>
		<textarea id=textArea style=height:50px;overflow:auto;width:100%; ></textarea>
		<div id=divLog ></div>

	`;

	window.addEventListener ( 'hashchange', FIL.onHashChange, false );

};



FIL.loadFiles = function( files ) {

	const reader = new FileReader();
	reader.onload = FIL.callbackOpenFiles;
	reader.readAsText( files.files[0] );

};



FIL.callbackOpenFiles = function( file ) {

	FIL.callbackFileCsv( file.target.result );

	textArea.innerHTML = file.target.result;

	divLog.innerHTML =
	`<p>
		<div>total: ${ file.total.toLocaleString() }</div>
		<div>timeStamp: ${ file.timeStamp.toLocaleString() } milliseconds </div>
	</p>`;

	console.log( {file} );

};
