
/* Copyright 2018 Ladybug Tools authors. MIT License */


OpenFiles = function(){};



function onHashChange() {

	const hash = location.hash.slice( 1 ).split( '&' );
	csv.selectIndices = hash[ 1 ] ? hash[ 1 ].split( '' ) : undefined;
	//console.log( 'csv.selectIndices', csv.selectIndices );

	project = hash[ 0 ];

	if ( project !== csv.projectKey ) {

		csv.projectKey = hash[ 0 ];
		csv.project = projects[ csv.projectKey ];
		//console.log( 'csv.project', csv.project );
		csv.urlCSV = csv.project[ 0 ];
		csv.urlImg = csv.project[ 1 ];
		csv.getPics = csv.project[ 2 ];
		csv.projectTitle = csv.project[ 3 ];

		fetchFileCsv( csv );

	} else {

		setSelect();

		FLT.setTextFilters( divFiltersText );

		setNumericFilters();

	}


}

//////////

function fetchFileCsv( project ) {

	const request = new Request( project.urlCSV );

	fetch( request )
		.then( response => response.text() )
		.then( text => callbackFileCsv( text ) );

}



function callbackFileCsv( text ) {

	//console.log( 'text', text );
	//count = 0;

	csv.lines = text.split( '\n' ).map( function( line ) { return line.split( ',' ); } ).slice( 0, -1 );
	//console.log( 'csv.lines', csv.lines );

	csv.fields = csv.lines.shift();
	//console.log( 'csv.fields', csv.fields );

	csv.indexImg = csv.fields.indexOf( csv.fields.find( key => key.startsWith( 'img' ))) ;

	setSelect();

	FLT.setTextFilters( divFiltersText );

	setNumericFilters();

}




OpenFiles.init = function( target ) {

	target.innerHTML =
	`
		<p><input type=file id=inpFile onchange=openFiles.load(this); ></p>
		<textarea id=textArea style=height:50px;overflow:auto;width:100%; ></textarea>
		<div id=divLog ></div>

	`;

};



OpenFiles.load = function( files ) {

	const reader = new FileReader();
	reader.onload = OpenFiles.callback;
	reader.readAsText( files.files[0] );

};



OpenFiles.callback = function( file ) {

	callbackFileCsv( file.target.result );

	textArea.innerHTML = file.target.result;

	divLog.innerHTML =
	`<p>
		<div>total: ${ file.total.toLocaleString() }</div>
		<div>timeStamp: ${ file.timeStamp.toLocaleString() } milliseconds </div>
	</p>`;

	console.log( {file} );

};