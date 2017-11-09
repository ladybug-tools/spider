/* Copyright 2017 Ladybug Tools authors. MIT License */

// split into multiple files
// needs clean up



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

//		selShape.selectedIndex = -1;

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




	function updateShape( ok ) {

		if ( ok !== 'OK' && !theBuilding.shape ) { alert( 'Please select a shape first. '); return; };

		const pathFunctions = [ getPathBox, getPathL, getPathT , getPathH ];

//		theBuilding.storeys = parseInt( inpFloors.value, 10 );
		theBuilding.storeyHeight = parseInt( inpHeight.value, 10 );
		theBuilding.orientation = parseInt( inpOrientation.value, 10 );

		const rotation = - d2r * theBuilding.orientation;
		const storeys = theBuilding.storeys;
		const height = theBuilding.storeyHeight;

//		let mesh = theBuilding.mesh;

		scene.remove( theBuilding.mesh );

		if ( theBuilding.mesh ) {

			theBuilding.mesh.traverse( function ( child ) {

				if ( child.geometry ) {

					child.geometry.dispose();
					child.material.dispose();

				}

				if ( child.texture ) { child.texture.dispose(); }

			} );

		}

		theBuilding.section = updateSection();

		const pathFunction = pathFunctions[ selShape.selectedIndex ];
		theBuilding.path = pathFunction();

		theBuilding.shape = selShape[ selShape.selectedIndex ].innerText;

		theBuilding.mesh = new THREE.Object3D();

		for ( var k = 0; k < theBuilding.storeys; k++ ) {

			const vertical = k * theBuilding.storeyHeight; //+ 0.5 * theBuilding.storeyHeight;
			const storey = k + 1;

			const mesh = createQlineMesh( k );
//			mesh = createShape();
			mesh.position.z = vertical;
			mesh.rotation.z = rotation;
			mesh.name = 'shape-' + selShape.value.toLowerCase() + '-story-' + ( k + 1 );
			mesh.userData.storey = k;
			mesh.castShadow = mesh.receiveShadow = true;
			mesh.updateMatrixWorld();
//console.log( 'mesh', mesh );
			theBuilding.mesh.add( mesh );

		}

		theBuilding.mesh.name = 'theBuilding';
		scene.add( theBuilding.mesh );

		outFloorArea.value = Math.round( theBuilding.area / theBuilding.storeys ).toLocaleString();
		outLength.value = theBuilding.length.toFixed();
		outWidth.value = theBuilding.width.toFixed();
		outThickness.value = theBuilding.thickness.toFixed();

		onShapeChangeUpdateLayout();

	}


	function updateSection() {

		const width = theBuilding.perimeterDepth;
		const height = theBuilding.storeyHeight;

		const section = [

			v2( -width, 0 ), v2( 0, 0 ), v2( 0, height ), v2( -width, height ), v2( -width, 0 )

		];

		return section;

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
			theBuilding.width = wid;

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


// #1
	function createShape() {

		let shape;

		shape = new THREE.Shape( theBuilding.path );
		const amount = theBuilding.storeyHeight;

		geometry = new THREE.ExtrudeGeometry( shape, { bevelEnabled: false, amount: amount } );
		geometry.center();

		const material = new THREE.MeshPhongMaterial();
		const mesh = new THREE.Mesh( geometry, material );

		const edgesGeometry = new THREE.EdgesGeometry( geometry );
		const meshEdges = new THREE.LineSegments( edgesGeometry, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
		mesh.add( meshEdges );

		return mesh;

	}


// or #2

	function createQlineMesh( storey ) {

		const path = theBuilding.path;
		const section = theBuilding.section;
		const len = theBuilding.length;
		const wid = theBuilding.width;

		const len05 = len * 0.5;
		const wid05 = wid * 0.5;

		const opacity = 90;

		const material = new THREE.MeshPhongMaterial( { opacity: ( opacity / 100 ), side: 2, flatShading: true, transparent: true, wireframe: false } );
		const materialNormal = new THREE.MeshPhongMaterial( { color: 0x000000, opacity: 1, side: 2, transparent: true, wireframe: false, } );
		const materialShape = new THREE.MeshPhongMaterial( { opacity: ( opacity / 100 ), side: 2, transparent: true, wireframe: false } );

		const vertices = [];
		const shapePoints = [];

		const geometry = new THREE.PlaneGeometry( 10, 10, section.length - 1, path.length - 1 );

		const mesh = new THREE.Mesh( geometry, material );

		for ( let i = 0; i < section.length; i++ ) {

			vertices.push( offset ( mesh, path, section[ i ].x, section[ i ].y ) );

		};


//console.log( 'vertices', vertices );

		for ( let i = 0, j = 0; i < path.length; i++ ) {

			for ( let k = 0; k < section.length; k++ ) {

				mesh.geometry.vertices[ j++ ] = vertices[ k ][ i ];

			}

			if ( i < path.length - 1 ) {

// overhangs
				const hgt = theBuilding.storeyHeight; //pt1.distanceTo( pt3 );
				const pt1 = vertices[ 1 ][ i ];
				const pt2 = vertices[ 1 ][ i + 1 ];
				const len = pt1.distanceTo( pt2 );
				const vectorDelta = pt2.clone().sub( pt1 );
				const angle = Math.atan2( vectorDelta.y, vectorDelta.x );

//theBuilding.overhangDepth = 10;

				if ( theBuilding.overhangDepth > 0 ) {

					const geoOver = new THREE.PlaneBufferGeometry( 1, 1 );
					const over = new THREE.Mesh( geoOver, materialShape );
					over.scale.set( len * theBuilding.wwr / 100, theBuilding.overhangDepth, theBuilding.overhangDepth );
					over.position.copy( vertices[ 1 ][ i ].clone().lerp( vertices[ 2 ][ i + 1 ].clone() , 0.5 ) );
					over.position.x -= len05;
					over.position.y -= wid05;
					over.rotation.z = angle;
					over.translateY( 0.5 * theBuilding.overhangDepth );
					over.translateZ( 0.5 * hgt * theBuilding.wwr / 100 );
					over.name = 'overhang';
					mesh.add( over );

				}

				const geo = new THREE.PlaneBufferGeometry( len * theBuilding.wwr / 100, hgt * theBuilding.wwr / 100 );

				const open = new THREE.Mesh( geo, materialNormal );
				geo.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI * 0.5 ) );
				open.position.copy( vertices[ 1 ][ i ].clone().lerp( vertices[ 2 ][ i + 1 ].clone(), 0.5 ) );
				open.position.x -= len05;
				open.position.y -= wid05;
				open.rotation.z = angle;
				open.translateY( 0.1 );
				open.name = 'opening';
				mesh.add( open );


				if ( storey === 0 ) {

//					placard = drawPlacard( ['space ' + ( i + 1 ), 'angle ' + ( - r2d * angle + 90 ) ], 0.1, 120, open.position.x, open.position.y, 40 );
					placard = drawPlacard( 'angle ' + ( - r2d * angle + 90 ), 0.1, 120, open.position.x, open.position.y, 40 );


					mesh.add( placard );

				}

// needed for export?
				shapePoints.push( pt2 );

			}

		}

		const shape = new THREE.Shape( path );
		const geometryShape = new THREE.ShapeGeometry( shape );
		geometryShape.applyMatrix( new THREE.Matrix4().makeTranslation( -len05, -wid05, 0 ) );
		const shapeMesh = new THREE.Mesh( geometryShape, materialShape );
		shapeMesh.name = 'InteriorFloor';
		mesh.add( shapeMesh );

		mesh.geometry.computeFaceNormals();
		mesh.geometry.computeVertexNormals();
//		mesh.geometry.center();
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( -len05, -wid05, 0 ) );

		return mesh;

	}



	function offset( obj, points, offsetX, offsetY ) {

// 2016-02-10
		offsetX = -offsetX;
		var offsetY = offsetY ? offsetY : 0;
		var pt1, pt2, offsetPt1, offsetPt2, vector, angle;
		var line, lines, vertices;
		var pi05 = 0.5 * pi;
		var pi2 = 2 * pi;
		lines = [];

		for ( var i = 0; i < points.length - 1; i++ ) {

			pt1 = points[ i ];
			pt2 = points[ i + 1 ];

			vector = pt2.clone().sub( pt1 );
			angle = Math.atan2( vector.y, vector.x );

			offsetPt1 = v( pt1.x + offsetX * Math.cos( angle - pi05 ), pt1.y - offsetX * Math.sin( angle + pi05 ), 0 );
			offsetPt2 = v( pt2.x + offsetX * Math.cos( angle - pi05 ), pt2.y - offsetX * Math.sin( angle + pi05 ), 0 );

			line = new THREE.Line3( offsetPt1, offsetPt2 );
			lines.push( line );

/* debug
			const geometry = new THREE.Geometry();
			geometry.vertices = [ offsetPt1, offsetPt2 ];
			const material = new THREE.LineBasicMaterial( { color: 'magenta' } );
			const line = new THREE.Line( geometry, material );
			line.position.y = -5;
			obj.add( line );
*/

		}


		if ( points[ 0 ].distanceTo( points[ points.length - 1 ] ) < 0.01 ) {

			pt1 = intersectionTwoLines2( lines[ 0 ], lines [ lines.length - 1 ] );
			pt2 = pt1;

		} else {

			pt1 = lines[ 0 ].start;
			pt2 = lines[ lines.length - 1 ].end;

		}

		vertices = [ v( pt1.x, pt1.y, offsetY ) ];

		for ( var i = 0; i < lines.length; i++ ) {

			if ( i < lines.length - 1 ) {

				var pt = intersectionTwoLines2( lines[ i ], lines [ i + 1 ] );

			} else {

				pt = pt2;

			}

			vertices.push( v( pt.x, pt.y, offsetY ) );

		}

// debug
		const geometryLine = new THREE.Geometry();
		geometryLine.vertices = vertices;
		const materialLine = new THREE.LineBasicMaterial( { color: 'yellow' } );
		const lineEdge = new THREE.Line( geometryLine, materialLine );
		obj.add( lineEdge );


		return vertices;

	}



	function intersectionTwoLines2( line1, line2 ) {

// 2016-02-10
// Thanks to http://jsfiddle.net/justin_c_rounds/Gd2S2/ && http://jsfiddle.net/user/justin_c_rounds/fiddles/

		const ptA = line1.start;
		const ptB = line1.end;
		const ptC = line2.start;
		const ptD = line2.end;

		const denominator = ( ptD.y - ptC.y ) * ( ptB.x - ptA.x ) - ( ptD.x - ptC.x ) * ( ptB.y - ptA.y );

		if ( denominator == 0 ) { return; }

		const a = ( ( ptD.x - ptC.x ) * ( ptA.y - ptC.y ) - ( ptD.y - ptC.y ) * ( ptA.x - ptC.x ) ) / denominator;
		const x = ptA.x + ( a * ( ptB.x - ptA.x ) );
		const y = ptA.y + ( a * ( ptB.y - ptA.y ) );

		return v( x, y, 0 );

	}



