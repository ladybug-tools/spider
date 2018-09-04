/* Copyright 2018 Ladybug Tools authors. MIT License */
/* Copyright 2018 Ladybug Tools authors. MIT License */
/* globals projects, THREE, CSV, FLT, THR, divLog, divFiltersText, divFiltersNumeric, divMenu, hamburger  */
// jshint esversion: 6

let SEL = {};

SEL.colors = ['(49,54,149)','(69,117,180)','(116,173,209)','(171,217,233)','(224,243,248)','(255,255,191)','(254,224,144)','(253,174,97)','(244,109,67)','(215,48,39)','(165,0,38)'];
SEL.threeColor = new THREE.Color();
SEL.opacityVisible = 0.85;
SEL.opacityVisibleFalse = 0.05;


SEL.setSelect = function() {

	const indices = CSV.selectIndices ||  [ 0, 1, 2, 3, 4, 5 ];
	//console.log( 'indices', indices );

	const inpSelects = [ selX, selY, selZ, selColor, selShape, selSize ];
	let count = CSV.fields.indexOf( CSV.fields.find( key => key.startsWith( 'out' ) ) );
	const options = CSV.fields.filter( key => key.startsWith( 'out' ) ).map( key => `<option value=${ count++ } >${ key.slice( 4 ) }</option>`);
	inpSelects.map( select => select.innerHTML = options );
	//console.log( 'inpSelects', inpSelects );

	let i = 0;
	for ( let select of inpSelects ) {

		select.selectedIndex = indices[ i++ ];
		//console.log( 'sel', select, select.selectedIndex );
		i = i >= options.length ? 0 : i;

	}

	//console.log( '', options );

	SEL.setObjects();

};



SEL.setObjects = function() {

	THR.scene.remove( CSV.meshes, CSV.placardX, CSV.placardY, CSV.placardZ );

	CSV.meshes = new THREE.Group();
	CSV.meshes.position.set( -50, -50, 0 );

	THR.scene.add( CSV.meshes );

	SEL.count = 0;
	const start = performance.now();
	const axisX = SEL.getNormalize( selX.value );
	const axisY = SEL.getNormalize( selY.value );
	const axisZ = SEL.getNormalize( selZ.value );

	const colorsData = SEL.getNormalize( selColor.value, SEL.colors.length - 1 );
	const colorsFloor = colorsData[ 0 ].map( col => Math.floor( col ) );

	const min = colorsData[ 1 ];
	const delta = ( colorsData[ 2 ] - min ) / SEL.colors.length;
	const field = CSV.fields[ selColor.value ];

	const buttons = document.getElementsByClassName( 'legend' );
	Array.from( buttons ).forEach( ( button, index ) =>
		button.innerHTML =
		`${ Number( ( min + index * delta ).toFixed( 1 ) ).toLocaleString()}
		- ${ Number( ( min + ( index + 1 ) * delta ).toFixed( 1 ) ).toLocaleString()
		}`
	);
	//console.log( 'colorsNorm', colorsFloor );

	const size = SEL.getNormalize( selSize.value );

	const shapeArr = CSV.lines.map( items => items[ selShape.value ] );
	CSV.shapeUnique = [...new Set( shapeArr )];  // set: store uniques values

	drawMeshesStagger();

	legendTitle.innerHTML = CSV.fields[ selColor.value ].slice( 4 );

	CSV.placardX = THR.drawPlacard( [ 'X-axis', CSV.fields[ selX.value ], 'min: ' + axisX[ 1 ].toFixed( 1 ), 'max: ' + axisX[ 2 ].toFixed( 1 ) ], 0.08, 1, 50, -50, 10 );

	CSV.placardY = THR.drawPlacard( [ 'Y-axis', CSV.fields[ selY.value ], 'min: ' + axisY[ 1 ].toFixed( 1 ), 'max: ' + axisY[ 2 ].toFixed( 1 ) ], 0.08, 120, -50, 50, 10 );

	CSV.placardZ = THR.drawPlacard( [ 'Z-axis', CSV.fields[ selZ.value ], 'min: ' + axisZ[ 1 ].toFixed( 1 ), 'max: ' + axisZ[ 2 ].toFixed( 1 ) ], 0.08, 200, -50, -50, 110 );

	THR.scene.add( CSV.placardX, CSV.placardY, CSV.placardZ );

	CSV.selected = CSV.meshes.children;



		function drawMeshesStagger( timestamp ) {
			// set a reasonable number of data points each frame until done // WIP - needs more science

			const t = performance.now();

			for ( let i = 0; i < 200; i ++ ) {

				if ( performance.now() - t > 60 || SEL.count >= CSV.lines.length ) { break; }

				SEL.setDataPoint( axisX[ 0 ][ SEL.count ], axisY[ 0 ][ SEL.count ], axisZ[ 0 ][ SEL.count ], colorsFloor[ SEL.count ], size[ 0 ][ SEL.count ], shapeArr[ SEL.count ], CSV.lines[ SEL.count ] );

				SEL.count++;

			}

			if ( SEL.count < CSV.lines.length ) {

				requestAnimationFrame( drawMeshesStagger );

			} else {

				divPopUpImage.innerHTML =
				`
					<p>Items loaded: ${ SEL.count.toLocaleString() } of ${ CSV.lines.length.toLocaleString() }</p>
					<p>Items draw time: ${ Math.floor( performance.now() - start ).toLocaleString() } ms</p>
				`;

			}

		}

};



SEL.getNormalize = function( index, range = 100 ) {

	// https://stackoverflow.com/questions/39776819/function-to-normalize-any-number-from-0-1

	const arr = CSV.lines.map( items => items[ index ] ).map( item => parseFloat( item ) );
	const max = Math.max( ...arr );
	const min = Math.min( ...arr );

	const arrNormalized = arr.map( val => range * ( val - min ) / ( max - min ) );

	return [ arrNormalized, min, max ];

};



SEL.setDataPoint = function( x, y, z, color, size, shape, data ) {

	//if ( !SEL.colors[ color ] ) { console.log( 'data', data, color  );}
	SEL.threeColor.setStyle( 'rgb' + SEL.colors[ color ] );
	const scale = 0.8 + 0.01 * size;

	//console.log( 'shape', shape );

	let segments = 3 + CSV.shapeUnique.indexOf( shape );
	//console.log( 'segments', segments );

	segments = segments < 9 ? segments : 8;
	//if ( segments < 3 || segments > 9 ) { console.log( 'oops', segments, shape, data );}

	const geometry = new THREE.CylinderBufferGeometry( scale, scale, scale, segments );
	const material = new THREE.MeshPhongMaterial({ color: SEL.threeColor, opacity: SEL.opacityVisible, transparent: true }) ;

	const mesh = new THREE.Mesh( geometry, material );
	mesh.userData.data = data;
	mesh.position.set( x, y, z );

	const materialLine = new THREE.LineBasicMaterial( { color: 0x000000, opacity: SEL.opacityVisible, transparent: true } );

	const edges = new THREE.LineSegments( new THREE.EdgesGeometry( geometry ), materialLine );
	mesh.add( edges );

	CSV.meshes.add( mesh );

};
