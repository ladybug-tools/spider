
function inpOpenFiles( fileObj ) {

	//console.log( 'fileObj', fileObj );

	json = [];


	for ( let file of fileObj ) {

		const reader = new FileReader();

		reader.onload = function( event ) {

			const jsonPart = parseRadText( reader.result );

			json.push( ...jsonPart );

			divJSON.innerText = JSON.stringify( json, undefined, 1 ); // reloads every iteration but does seem to slow things down much ;-)

			divLog.innerHTML +=
			`
				name: ${ file.name }<br>
				size: ${ file.size.toLocaleString() } bytes<br>
			`;

			divRadiance.innerText += reader.result + '\n';

		}

		reader.readAsText( file );

	}

}



function parseRadText( radText ) {
	//console.log( 'radText', radText );

	/* Input multi-line radiance file and return them as an array of JSON objects. */
	const parseRadRe = /^\s*([^0-9].*(\s*[\d.-]+.*)*)/gm; // how does this work?

	// separate input radiance objects
	const rawObjects = radText.match( parseRadRe ).filter( word => word.trim().length > 0 && !word.trim().startsWith( '#' ) );
	const rawObjects2 = rawObjects.map( item => item.replace(/\r\n|\n/g, " " ) );
	console.log( 'rawObjects2', rawObjects2 );

	const jsonArray = rawObjects2.map( line => radObjectToJson( line ) );

	return jsonArray;

}



function radObjectToJson( radText){

	/* convert a single radiance object to a JSON object */
	const repNewLineRe = /\s\s+/g;
	const data = radText.replace( repNewLineRe, " " ).trim().split( " " );
	const type = data[ 1 ];

	if ( !type ) { return; }

	if ( type != 'polygon' ) {

		// this is a generic method that returns the data as values for each line
		return parseBase( data );

	} else {

		// for now we only support polygons
		return parsePolygon( data );

	}

}


function parsePolygon( data ) {

	//console.log( 'data', data );
	/* convert a polygon line to a JSON object */
	// separate x, y, z coordinates
	const ptList = data.slice( 6 ).map( vertex => parseFloat( vertex ) );

	// put every 3 items in a separate array
	const vertices = [];

	while ( ptList.length > 0 ) { vertices.push( ptList.splice( 0, 3 ) ); }  // not easy to do better than thus
	//vertices = ptList.map( item => ptList.splice( 0, 3 ) ); // not!

	const polygon = {

		'modifier': data[0],
		'type': data[1],
		'name': data[2],
		'vertices': vertices

	};

	return polygon;

}



function parseBase( data ) {

	/* convert a radiance primitive line to a JSON object */
	// find number of items in each line
	const baseData = data.slice( 3 );

	const count1 = parseInt( baseData[0] );
	const count2 = parseInt( baseData[ count1 + 1 ] );
	const count3 = parseInt( baseData[ count1 + count2 + 2 ] );

	const l1 = ( count1 == 0 ) ? [] : baseData.slice( 1, count1 + 1 );
	const l2 = ( count2 == 0 ) ? [] : baseData.slice( count1 + 2, count1 + count2 + 2 );
	const l3 = ( count3 == 0 ) ? [] : baseData.slice( count1 + count2 + 3, count1 + count2 + count3 + 3 );

	const values = { 0: l1, 1: l2, 2: l3 }

	const radObject = {

		'modifier': data[ 0 ],
		'type': data[ 1 ],
		'name': data[ 2 ],
		'values': values

	};

	return radObject;

}
