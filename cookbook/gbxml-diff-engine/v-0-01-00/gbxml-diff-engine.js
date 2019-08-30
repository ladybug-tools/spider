
let GDE = {};

GDE.urlFile1 = "https://cdn.jsdelivr.net/gh/ladybug-tools/spider@master/gbxml-sample-files/bristol-clifton-downs-broken.xml";

GDE.urlFile2 = "https://cdn.jsdelivr.net/gh/ladybug-tools/spider@master/gbxml-sample-files/bristol-clifton-downs-fixed.xml";




GDE.initialize = function() {

	const htm =
	`
		<p>File1:<br> ${ GDE.urlFile1 }</p>
		<p>File2:<br> ${ GDE.urlFile2 }</p>
	`;

	divFiles.innerHTML = htm;


};


GDE.setData = function() {

	GDE.files = [];

	GDE.requestFile( GDE.urlFile1  );

	GDE.requestFile( GDE.urlFile2  );

};


GDE.requestFile = function( url ) {

	const xhr = new XMLHttpRequest();

	xhr.open( 'GET', url, true );
	xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
	xhr.onload = GDE.callback;
	xhr.send( null );

};


GDE.callback = function( xhr ) {

	GDE.files.push( xhr.target.response );

	if ( GDE.files.length === 2 ) {

		GDE.findDiffs();

	}

};


GDE.findDiffs = function() {

	const f1 = iframe1.contentWindow.GBX.text
	const f2 = iframe2.contentWindow.GBX.text

	const surfaces1 = f1.match( /<Surface(.*?)<\/Surface/gis );
	const surfaces2 = f2.match( /<Surface(.*?)<\/Surface/gis );

	const surfDiff1 = surfaces1.filter( s1 => surfaces2.includes( s1 ) === false );
	const surfDiff2 = surfaces2.filter( s2 => surfaces1.includes( s2 ) === false );

	const indexes1= surfDiff1.map( sd1 => surfaces1.indexOf( sd1 ) );
	const indexes2= surfDiff2.map( sd2 => surfaces2.indexOf( sd2 ) );

	const planars1 = surfDiff1.map( sd1 => sd1.match( /<PlanarGeometry>(.*?)<\/PlanarGeometry/gis ) ).shift();
	const planars2 = surfDiff2.map( sd2 => sd2.match( /<PlanarGeometry>(.*?)<\/PlanarGeometry/gis ) ).shift();

	const planarDiffs1 = planars1.filter( p1 => planars2.includes( p1 ) === false );
	const planarDiffs2 = planars2.filter( p2 => planars1.includes( p2 ) === false );

	const ids1 = surfDiff1.map( sd1 => sd1.match( / id="(.*?)"/i ).pop() );
	const ids2 = surfDiff2.map( sd2 => sd2.match( / id="(.*?)"/i ).pop() );

	const idDiffs1 =  ids1.filter( id1 => ids2.includes( id1 ) === true );
	//console.log( '', idDiffs1 );
	const idDiffs2 =  ids2.filter( id2 => ids1.includes( id2 ) === true );


	let txt = "";

	idDiffs1.forEach( ( id1, index ) => {

		const surface1 = surfaces1.find( s => s.includes( id1 ) );
		const data1 = surface1.match( /<Surface (.*?)>/i )[ 1 ];
		let cadId1 = surface1.match( /<CADObjectId>(.*?)<\/CADObjectId>/i );
		cadId1 = cadId1 ? cadId1[ 1 ] : "no value";

		const surface2 = surfaces2.find( s => s.includes( idDiffs2[ index ] ) );
		const data2 = surface2.match( /<Surface (.*?)>/i )[ 1 ];
		let cadId2 = surface2.match( /<CADObjectId>(.*?)<\/CADObjectId>/i );
		cadId2 = cadId2 ? cadId2[ 1 ] : "no value";

		const mark1 = data1 === data2 ? "" : "<mark>";
		const mark2 = cadId1 === cadId2 ? "" : "<mark>";

		txt +=
		`<p>
			file1: ${ mark1 }${ data1 }</mark> ${ mark2 }${ cadId1 }</mark><br>
			file2: ${ data2 } ${ cadId2 }
		</p>
		`;

	} );

	const htm =
	`
		<p><b>File lengths in Bytes</b><br>file 1 ${ f1.length.toLocaleString() }<br> file 2 ${ f2.length.toLocaleString()  }</p>

		<p><b>Number of surfaces in each file</b><br>file 1 ${ surfaces1.length.toLocaleString() }<br> file 2 ${ surfaces2.length.toLocaleString()  }</p>

		<p><b>Number of surfaces not have identical surface in other file</b><br>file 1 ${ surfDiff1.length.toLocaleString() }<br> file 2 ${ surfDiff2.length.toLocaleString()  }</p>

		<p><b>Indexes of non-equal surfaces </b><br>file 1 ${ indexes1 }<br> file 2 ${ indexes2  }</p>

		<p><b>Number of surfaces not have identical planar geometry in other file</b><br>file 1 ${ planarDiffs1.length.toLocaleString() }<br>
			file 2 ${ planarDiffs2.length.toLocaleString()  }</p>

		<p><b>Number of surfaces do have identical ID in other file</b><br>file 1 ${ idDiffs1.length.toLocaleString() }<br>
			file 2 ${ idDiffs2.length.toLocaleString()  }</p>

		<p><b><i>Identifying the remaining differences is a work-in progress</i></b></p>

		${ txt }

	`;

	divContents.innerHTML = htm;

	GDE.surfacesDiffIndexes1 = indexes1;
	GDE.surfacesDiffIndexes2 = indexes2;

	GDE.highlightDiffs();

};


GDE.highlightDiffs = function() {


	GBX1 = iframe1.contentWindow.GBX;

	GBX1.meshGroup.children.forEach( child => child.visible = false )

	GDE.surfacesDiffIndexes1.forEach( index => GBX1.meshGroup.children[ index ].visible = true );

};