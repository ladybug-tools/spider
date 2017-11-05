

	let theBuilding;


	var v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };
	var v2 = function( x, y ){ return new THREE.Vector2( x, y ); };
	var pi = Math.PI;
	const d2r = pi / 180, r2d = 180 /pi;


	function initGeometryInputFields(){

		theBuilding = {};
		theBuilding.area = 5000;
		theBuilding.length = 50;
		theBuilding.lengthInit = 0;;
		theBuilding.width = 100;
		theBuilding.thickness = 20;
		theBuilding.storeys = 1;
		theBuilding.storeyHeight = 10;
		theBuilding.orientation = 0;
		theBuilding.perimeterDepth = 15;


		inpArea.value = theBuilding.area;

		inpFloors.min = 1;
		inpFloors.max = 20;
		inpFloors.value = theBuilding.storeys;

		inpHeight.min = 8;
		inpHeight.max = 20;
		inpHeight.value = theBuilding.storeyHeight;

		inpShapeCount.min = 1;
		inpShapeCount.max = 10;
		inpShapeCount.value = 3;

		selShape.innerHTML =
			'<option value=box-shape.png >Box-Shape</option>' +
			'<option value=l-shape.png >L-Shape</option>' +
			'<option value=t-shape.png >T-Shape</option>' +
			'<option value=h-shape.png >H-Shape</option>' +
		'';

//		selShape.selectedIndex = 0;

		selMassing.innerHTML =
			'<option>Generator 1</option>' +
			'<option>Generator 2</option>' +
			'<option>Generator 3</option>' +
		'';

		inpPerimeterDepth.min = 10;
		inpPerimeterDepth.max = 20;
		inpPerimeterDepth.value = theBuilding.perimeterDepth;

		inpOrientation.min = -90;
		inpOrientation.max = 90;
		inpOrientation.value = theBuilding.orientation;

		inpLength.min = 1;
		inpLength.max = 200;
		inpLength.value = theBuilding.length;

		inpWidth.min = 1;
		inpWidth.max = 300;
		inpWidth.value = theBuilding.width;

		inpThickness.min = 1;
		inpThickness.max = 100;
		inpThickness.value = theBuilding.thickness;

//console.log( 'theBuilding', theBuilding );

	}




	function updateShape() {

		const pathFunctions = [ getPathBox, getPathL, getPathT , getPathH ];

		theBuilding.storeys = parseInt( inpFloors.value, 10 );
		theBuilding.storeyHeight = parseInt( inpHeight.value, 10 );
		theBuilding.orientation = parseInt( inpOrientation.value, 10 );

		let mesh = theBuilding.mesh;

		scene.remove( theBuilding.mesh );

		const pathFunction = pathFunctions[ selShape.selectedIndex ];
		theBuilding.path = pathFunction();

		theBuilding.shape = selShape[ selShape.selectedIndex ];
		theBuilding.mesh = createShape();

		theBuilding.mesh.name = 'theBuilding';
		theBuilding.mesh.position.z =  0.5 * theBuilding.storeyHeight * theBuilding.storeys;
		theBuilding.mesh.rotation.z = - d2r * theBuilding.orientation;

		scene.add( theBuilding.mesh );

		outFloorArea.value = Math.round( theBuilding.area / theBuilding.storeys ).toLocaleString();
		outLength.value = theBuilding.length.toFixed();
		outWidth.value = theBuilding.width.toFixed();
		outThickness.value = theBuilding.thickness.toFixed();

		onShapeChangeUpdateLayout();

	}



	function getPathBox() {

		let area = theBuilding.area;
		let len = theBuilding.length;
		let wid = theBuilding.width;
		let flr = theBuilding.storeys ;
		let thk = theBuilding.thickness;

		if ( area !== parseInt( inpArea.value, 10 ) || flr !== parseInt( inpFloors.value, 10 ) ) { 
//console.log( 'area', area  );

			const areaNew = parseInt( inpArea.value, 10 )
			const flrNew = parseInt( inpFloors.value, 10 );
			const areaTemp = area * flrNew / flr;
//console.log( 'areaTemp', areaTemp );

			const ratio = Math.sqrt( area / areaTemp );
//console.log( 'ratio', ratio );

			len = Math.round( ratio * len );
			wid = areaNew / ( len * flrNew );
			flr = flrNew;

			theBuilding.area = areaNew;
			theBuilding.storeys = flrNew;
			theBuilding.length = len;
			theBuilding.width = wid;

			inpLength.value = len;
			inpWidth.value = wid;

		} else if ( len !== parseInt( inpLength.value, 10 ) ) {

			len = parseInt( inpLength.value, 10 );
			wid = area / ( len * flr );

			theBuilding.length = len;
			theBuilding.width = wid;

			inpWidth.value = wid;

		} else if ( wid !== parseInt( inpWidth.value, 10 ) ) {

			wid = parseInt( inpWidth.value, 10 );
			len = area / ( wid * flr );

			theBuilding.length = len;
			theBuilding.width = wid;

			inpLength.value = len;

		}




		const pathBox = [ v2( len, 0 ), v2( 0, 0 ), v2( 0, wid ), v2( len, wid ), v2( len, 0 ) ];

		divValidation.innerHTML = 
			'<p>Validations</p>' +
			'<p>Calculated Area: ' + flr * ( len * wid ) + '<p>' +
			'<p>Equations used</p>' +
			'<p>Area = flr * ( len * wid ) </p>' +
			'<p>Width = area / ( length * numberOfFloors ) </p>' +
			'<p>Frame: ' + renderer.info.render.frame + '</p>' +
		'';

		divThickness.style.display = 'none';

//console.log( 'theBuilding', theBuilding );

		return pathBox;

	}



	function getPathL() {

		let area = theBuilding.area;
		let flr = theBuilding.storeys;
		let len = theBuilding.length;
		let wid = theBuilding.width;
		let thk = theBuilding.thickness;

		if ( theBuilding.lengthInit === 0 ) {

			inpLength.value = 120;

		}

		if ( area !== parseInt( inpArea.value, 10 ) || flr !== parseInt( inpFloors.value, 10 ) ) { 

			const areaNew = parseInt( inpArea.value, 10 )
			const flrNew = parseInt( inpFloors.value, 10 );
			const areaTemp = area * flrNew / flr;
			const ratio = Math.sqrt( area / areaTemp );

			flr = flrNew;
			len = Math.round( ratio * len );
			wid = ( ( area - thk * len ) / thk + thk ) / flr;

			theBuilding.area = areaNew;
			theBuilding.storeys = flr;
			theBuilding.length = theBuilding.lengthInit = len;
			theBuilding.width = wid;

			inpLength.value = len;
			inpWidth.value = wid;

		} else if ( len !== parseInt( inpLength.value, 10 ) ) {

			len = parseInt( inpLength.value, 10 );
			wid = ( ( area - thk * len ) / thk + thk ) / flr;
			theBuilding.length = theBuilding.lengthInit = len;
			theBuilding.width = wid;
			inpWidth.value = wid;

		} else if ( wid !== parseInt( inpWidth.value, 10 ) ) {

			wid = parseInt( inpWidth.value, 10 );
			len = ( area - thk * ( wid - thk ) ) / ( thk * flr );

			theBuilding.length = theBuilding.lengthInit = len;
			theBuilding.width = wid;

			inpLength.value = len;

		} else if ( thk !== parseInt( inpThickness.value, 10 ) ) {

			thk = parseInt( inpThickness.value, 10 );
			theBuilding.thickness = thk;

			wid = ( ( area - thk * len ) / thk + thk ) / flr;

// locks up the sliders
//			theBuilding.width = wid;
//			inpWidth.value = wid;

		}

		const pathL = [
			v2( len, 0 ),
			v2( 0, 0 ),
			v2( 0, wid ),
			v2( thk, wid ),
			v2( thk, thk ),
			v2( len, thk ),
			v2( len, 0 )
		];


		divValidation.innerHTML = 
			'<p>Validations</p>' +
			'<p>Calculated Area: ' + flr * ( thk * len + thk * ( wid - thk ) ) + '<p>' +
			'<p>Equations used</p>' +
			'<p>Area = numberOffloors * ( thickness * length + thickness * ( width - thickness ) )</p>' +
			'<p>Width = ( ( area - thickness * length ) / thickness + thickness ) / numberOfFloors</p>' +
			'<p>Frame: ' + renderer.info.render.frame + '</p>' +
		'';

		divThickness.style.display = '';

		return pathL;

	}



	function getPathT() {

		let area = theBuilding.area;
		let flr = theBuilding.storeys;
		let len = theBuilding.length;
		let wid = theBuilding.width;
		let thk = theBuilding.thickness;

		if ( theBuilding.lengthInit === 0 ) {

			inpLength.value = 120;

		}

		if ( area !== parseInt( inpArea.value, 10 ) || flr !== parseInt( inpFloors.value, 10 ) ) { 

			const areaNew = parseInt( inpArea.value, 10 )
			const flrNew = parseInt( inpFloors.value, 10 );
			const areaTemp = area * flrNew / flr;
			const ratio = Math.sqrt( area / areaTemp );

			flr = flrNew;
			len = Math.round( ratio * len );
			wid = ( ( area - thk * len ) / thk + thk ) / flr;

			theBuilding.area = areaNew;
			theBuilding.storeys = flr;
			theBuilding.lengthInit = theBuilding.length = len;
			theBuilding.width = wid;

			inpLength.value = len;
			inpWidth.value = wid;

		} else if ( len !== parseInt( inpLength.value, 10 ) ) {

			len = parseInt( inpLength.value, 10 );
			wid = ( ( area - thk * len ) / thk + thk ) / flr;
			theBuilding.lengthInit = theBuilding.length = len;
			theBuilding.width = wid;

			inpWidth.value = wid;

		} else if ( wid !== parseInt( inpWidth.value, 10 ) ) {

			wid = parseInt( inpWidth.value, 10 );
			len = ( area - thk * ( wid - thk ) ) / ( thk * flr );

			theBuilding.lengthInit = theBuilding.length = len;
			theBuilding.width = wid;

			inpLength.value = len;

		} else if ( thk !== parseInt( inpThickness.value, 10 ) ) {

			thk = parseInt( inpThickness.value, 10 );
			theBuilding.thickness = thk;

			wid = ( ( area - thk * len ) / thk + thk ) / flr;

// locks up the sliders
//			theBuilding.width = wid;
//			inpWidth.value = wid;

		}

		const pathT = [
			v2( len, 0 ),
			v2( 0, 0 ),
			v2( 0, thk ),
			v2( 0.5 * ( len - thk ), thk ),
			v2( 0.5 * ( len - thk ), wid ),
			v2( len - 0.5 * ( len - thk ), wid ),
			v2( len - 0.5 * ( len - thk ), thk ),
			v2( len, thk ),
			v2( len, 0 )
		];

		divValidation.innerHTML = 
			'<p>Validations T Shape</p>' +
			'<p>Calculated Area: ' + flr * ( thk * len + thk * ( wid - thk ) ) + '<p>' +
			'<p>Equations used</p>' +
			'<p>Area = flr * ( thk * len + thk * ( wid - thk ) ) </p>' +
			'<p>Frame: ' + renderer.info.render.frame + '</p>' +
		'';

		divThickness.style.display = '';

		return pathT;

	}



	function getPathH() {

		let area = theBuilding.area;
		let flr = theBuilding.storeys;
		const flrNew = parseInt( inpFloors.value, 10 );
		let len = theBuilding.length;
		let wid = theBuilding.width;
		let thk = theBuilding.thickness;

		if ( theBuilding.lengthInit === 0 ) {

			inpLength.value = 120;

		}

		if ( area !== parseInt( inpArea.value, 10 ) || flr !== parseInt( inpFloors.value, 10 ) ) { 

			const areaNew = parseInt( inpArea.value, 10 );
			const areaTemp = area * flrNew / flr;
			const ratio = Math.sqrt( area / areaTemp );

			len = Math.round( ratio * len );
			wid =  ( area - thk * ( len - 2 * thk ) ) / ( 2 * thk * flrNew );

			theBuilding.area = areaNew;
			theBuilding.storeys = flr = flrNew;
			theBuilding.lengthInit = theBuilding.length = len;
			theBuilding.width = wid;

			inpLength.value = len;
			inpWidth.value = wid;

		} else if ( len !== parseInt( inpLength.value, 10 ) ) {

			len = parseInt( inpLength.value, 10 );
			wid = ( area - thk * ( len - 2 * thk ) ) / ( 2 * thk * flr );
			theBuilding.lengthInit = theBuilding.length = len;
			theBuilding.width = wid;

			inpWidth.value = wid;

		} else if ( wid !== parseInt( inpWidth.value, 10 ) ) {

			wid = parseInt( inpWidth.value, 10 );
			len = ( ( area - thk * wid ) / thk + 2 * thk ) / flr;

			theBuilding.lengthInit = theBuilding.length = len;
			theBuilding.width = wid;

			inpLength.value = len;

		} else if ( thk !== parseInt( inpThickness.value, 10 ) ) {

			thk = parseInt( inpThickness.value, 10 );
			theBuilding.thickness = thk;

			wid = ( area - thk * ( len - 2 * thk ) ) / ( 2 * thk * flr );

// locks up the sliders
//			theBuilding.width = wid;
//			inpWidth.value = wid;

		}

		const pathH = [
			v2( len - thk, 0.5 * ( wid - thk ) ),
			v2( thk, 0.5 * ( wid - thk ) ),
			v2( thk, 0 ),
			v2( 0, 0 ),
			v2( 0, wid ),
			v2( thk, wid ),
			v2( thk, wid - 0.5 * ( wid - thk ) ),
			v2( len - thk, wid - 0.5 * ( wid - thk ) ),
			v2( len - thk, wid ),
			v2( len, wid ),
			v2( len, 0 ),
			v2( len - thk, 0 ),
			v2( len - thk, 0.5 * ( wid - thk ) )
		];

		divValidation.innerHTML = 
			'<p>Validations - H Shape</p>' +
			'<p>Calculated Area: ' + ( flr * ( 2 * thk * wid ) + thk * ( len - 2 * thk ) ) + '</p>' +
			'<p>Equations used</p>' +
			'<p>Area = ( flr * ( 2 * thk * wid ) + thk * ( len - 2 * thk ) ) </p>' +
			'<p>Width = ( area - thk * ( len - 2 * thk ) ) / ( 2 * thk * numberOfFloors ) </p>' +
			'<p>Frame: ' + renderer.info.render.frame + '</p>' +
		'';

		divThickness.style.display = '';

		return pathH;

	}



	function createShape() {

		let shape;

		shape = new THREE.Shape( theBuilding.path );
		const amount = theBuilding.storeyHeight * theBuilding.storeys;

		geometry = new THREE.ExtrudeGeometry( shape, { bevelEnabled: false, amount: amount } );
		geometry.center();

		const material = new THREE.MeshPhongMaterial();
		const mesh = new THREE.Mesh( geometry, material );

		const edgesGeometry = new THREE.EdgesGeometry( geometry );
		const meshEdges = new THREE.LineSegments( edgesGeometry, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
		mesh.add( meshEdges );

		return mesh;

	}


