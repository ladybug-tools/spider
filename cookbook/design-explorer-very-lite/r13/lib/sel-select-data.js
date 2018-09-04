
/* Copyright 2018 Ladybug Tools authors. MIT License */



function setSelect() {

	const indices = csv.selectIndices ||  [ 0, 1, 2, 3, 4, 5 ];
	//console.log( 'indices', indices );

	const inpSelects = [ selX, selY, selZ, selColor, selShape, selSize ];
	let count = csv.fields.indexOf( csv.fields.find( key => key.startsWith( 'out' ) ) );
	const options = csv.fields.filter( key => key.startsWith( 'out' ) ).map( key => `<option value=${ count++ } >${ key.slice( 4 ) }</option>`);
	inpSelects.map( select => select.innerHTML = options );
	//console.log( 'inpSelects', inpSelects );

	let i = 0;
	for ( select of inpSelects ) {

		select.selectedIndex = indices[ i++ ];
		//console.log( 'sel', select, select.selectedIndex );
		i = i >= options.length ? 0 : i;

	}

	//console.log( '', options );

	setObjects();

}



function setObjects() {

	THR.scene.remove( object3D, placardX, placardY, placardZ );

	object3D = new THREE.Group();
	object3D.position.set( -50, -50, 0 );

	THR.scene.add( object3D );

	count = 0;
	const start = performance.now()
	const axisX = getNormalize( selX.value );
	const axisY = getNormalize( selY.value );
	const axisZ = getNormalize( selZ.value );

	const colorsData = getNormalize( selColor.value, colors.length - 1 );
	const colorsFloor = colorsData[ 0 ].map( col => Math.floor( col ) );

	const min = colorsData[ 1 ];
	const delta = ( colorsData[ 2 ] - min ) / colors.length;
	const field = csv.fields[ selColor.value ];

	const buttons = document.getElementsByClassName( 'legend' );
	Array.from( buttons ).forEach( ( button, index ) =>
		button.innerHTML =
		`${ Number( ( min + index * delta ).toFixed( 1 ) ).toLocaleString()}
		- ${ Number( ( min + ( index + 1 ) * delta ).toFixed( 1 ) ).toLocaleString()
		}`
	);
	//console.log( 'colorsNorm', colorsFloor );

	const size = getNormalize( selSize.value );

	const shapeArr = csv.lines.map( items => items[ selShape.value ] );
	csv.shapeUnique = [...new Set( shapeArr )];  // set: store uniques values

	drawMeshesStagger();

	legendTitle.innerHTML = csv.fields[ selColor.value ].slice( 4 );

	placardX = drawPlacard( [ 'X-axis', csv.fields[ selX.value ], 'min: ' + axisX[ 1 ].toFixed( 1 ), 'max: ' + axisX[ 2 ].toFixed( 1 ) ], 0.08, 1, 50, -50, 10 );

	placardY = drawPlacard( [ 'Y-axis', csv.fields[ selY.value ], 'min: ' + axisY[ 1 ].toFixed( 1 ), 'max: ' + axisY[ 2 ].toFixed( 1 ) ], 0.08, 120, -50, 50, 10 );

	placardZ = drawPlacard( [ 'Z-axis', csv.fields[ selZ.value ], 'min: ' + axisZ[ 1 ].toFixed( 1 ), 'max: ' + axisZ[ 2 ].toFixed( 1 ) ], 0.08, 200, -50, -50, 110 );
	THR.scene.add( placardX, placardY, placardZ );

	//dataItems = ( ...object3D.children );




	function drawMeshesStagger( timestamp ) {
		// set a reasonable number of data points each frame until done // WIP - needs more science

		const t = performance.now();

		for ( let i = 0; i < 200; i ++ ) {

			if ( performance.now() - t > 60 || count >= csv.lines.length ) { break; }

			setDataPoint( axisX[ 0 ][ count ], axisY[ 0 ][ count ], axisZ[ 0 ][ count ], colorsFloor[ count ], size[ 0 ][ count ], shapeArr[ count ], csv.lines[ count ] );

			count++;

		}

		if ( count < csv.lines.length ) {

			requestAnimationFrame( drawMeshesStagger );

		} else {

			divImage.innerHTML =
			`
				<p>Items loaded: ${ count.toLocaleString() } of ${ csv.lines.length.toLocaleString() }</p>
				<p>Items draw time: ${ Math.floor( performance.now() - start ).toLocaleString() } ms</p>
			`;

		}

	}

}



function getNormalize( index, range = 100 ) {

	// https://stackoverflow.com/questions/39776819/function-to-normalize-any-number-from-0-1

	const arr = csv.lines.map( items => items[ index ] ).map( item => parseFloat( item ) );
	const max = Math.max( ...arr );
	const min = Math.min( ...arr );

	const arrNormalized = arr.map( val => range * (val - min) / (max - min) )

	return [arrNormalized, min, max ];

}



function setDataPoint( x, y, z, color = 0, size, shape, data ) {

	//if ( !colors[ color ] ) { console.log( 'data', data, color  );}
	threeColor.setStyle( 'rgb' + colors[ color ] );
	const scale = 0.8 + 0.01 * size;

	//console.log( 'shape', shape );

	let segments = 3 + csv.shapeUnique.indexOf( shape );
	//console.log( 'segments', segments );

	segments = segments < 9 ? segments : 8;
	//if ( segments < 3 || segments > 9 ) { console.log( 'oops', segments, shape, data );}

	const geometry = new THREE.CylinderBufferGeometry( scale, scale, scale, segments );
	const material = new THREE.MeshPhongMaterial({ color: threeColor, opacity: opacityVisible, transparent: true }) ;

	const mesh = new THREE.Mesh( geometry, material );
	mesh.userData.data = data;
	mesh.position.set( x, y, z );

	const edges = new THREE.LineSegments( new THREE.EdgesGeometry( geometry ), materialLine );
	mesh.add( edges );

	object3D.add( mesh );

}
