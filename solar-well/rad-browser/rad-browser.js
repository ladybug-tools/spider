
	var GBP = {};
	var rad = {};
	rad.meshes = null;
	rad.edges = null;

	let colors = {

		generic_wall: 'gray',
		generic_floor: 'brown',
		generic_roof: 'maroon',

		Exterior_Window: 'black',
		Exterior_Wall: 'gray',
		Exterior_Floor: 'brown',
		Exterior_Roof: 'maroon',

		Ext_wall: 'gray',
		Floor: 'brown',
		Ext_glaz: 'black',
		Int_wall: 'navajowhite',
		Int_glaz: 'darkgray',
		Dark_Wood: 'brown',
		Ceiling: 'azure',
		Light_Wood: 'burlywood'

	}




	function parseFile( text ) {

		const arr = location.hash.slice( 1 ).split( '/');
		const file = arr.pop();
		const path = arr.join( '/' );

		//console.log( 'path', path );

		const lines = text.split(/\r\n|\n/);
		//console.log( 'lines', lines );

		const items = [ 'header'];
		const data = [];
		let tmp = [];


		for ( let line of lines ) {

			if ( line[0] === '#') { continue; }

			if ( line.search( /[abcdfghijklmnopqrstuvwxyz]/ ) >= 0 ) {

				if ( line.match( '!xform' ) && !line.match( '-rx' ) && !line.match( '-f' ) ) {

					let url = line.trim().replace( /  /g, ' ' ).split( /\s/)[ 1 ];
					url = url.slice( 1 );
					//console.log( 'path + url', path + url );

					requestFile( path + url );

				} else {

					if ( line.match( 'void' ) ) {

						//console.log( 'void', line );



					}

				}

				items.push( line );
				data.push( tmp );
				tmp = [];


			} else {

				tmp.push( line );

			}

		}

		data.push( tmp );

		rad.items = items;
		rad.data = data;

		//console.log( 'rad', rad );

		setVertices();

		/*
		divContents.innerHTML =
			`<p>length: ${text.length.toLocaleString()}</p>
			<p>lines: ${lines.length.toLocaleString()}</p>
			<p>faces: ${(items.length - 1).toLocaleString()}</p>
		`;
		*/

	}



	function setVertices() {

		//for ( let item of rad.items ) {
		for ( let i = 1; i < rad.items.length; i++ ) {

			//console.log( 'item', rad.items[ i ] );

			if ( rad.items[ i ] === '' ) { continue; }
			if ( rad.items[ i ].includes( 'void') ) {

				if ( rad.items[ i ].includes( 'brightfunc') || rad.items[ i ].includes( 'brighttext') || rad.items[ i ].includes( 'alias') ) { continue; }
				items = rad.items[ i ].trim().replace( /\t/g, ' ' ).replace( / {2,}/g, ' ' ).split( ' ' );
				//console.log( 'items', items );

				material = items[ 2 ];
				//console.log( 'material', material );

				arr = rad.data[ i ][ 2 ].trim().replace( /\t/g, ' ' ).replace( / {2,}/g, ' ' ).split( ' ' ).map( item => parseFloat( item ) );
				//console.log( 'rad.items', arr );

				color = new THREE.Color( arr[ 1 ], arr[ 2 ], arr[ 3 ]);
				//console.log( 'color', color );

				colors[ material ] = color;

				continue;

			}

			if ( rad.items[ i ].includes( 'sphere') === true ) {

				drawSphere( i );
				 continue;

			}

			if ( rad.items[ i ].includes( 'cylinder') === true ) {

				drawCylinder( i );
				continue;

			}

			if ( rad.items[ i ].includes( 'cone') === true ) {

				drawCone( i );
				continue;

			}

			if ( rad.items[ i ].includes( 'polygon') === true ) {
				//console.log( 'voided rad.items[ i ]', rad.items[ i ] );
				drawPolygon( i );
				continue;

			}
			//console.log( 'line', line );



		}

		scene.add( rad.meshes, rad.edges );
		zoomObjectBoundingSphere(rad.meshes);
	}


	function drawPolygon( i ) {


			line = rad.data[ i ];
			//console.log( 'line', line[ 2 ] );


			const length = parseInt( line[ 2 ], 10 ) / 3 + 3;

			//console.log( 'length', length );

			const points = [];

			for ( let j = 3; j < length; j++ ) {

				//console.log( 'line', i, line[ i ]);

				//arr = line[ j ].trim().replace( / {2,}/g, ' ' ).replace( /\t/g, '' ).split( /\s/).map( str => parseFloat( str ) );
				arr = line[ j ].trim().replace( /\t/g, ' ' ).replace( / {2,}/g, ' ' ).split( ' ' ).map( item => parseFloat( item ) );
				//console.log( 'arr', arr );

				//line[ i ] = line[ i ].replace( /  /g, ' ' ); // use regex??
				//const arr = line[ i ].split( ' ' ).map( item => parseFloat( item ) );

				//const pt = line[ i ].map( item => item.split( /\s/).slice( 0, 3 ).map( str => parseFloat( str ) ) );
				//console.log( 'pt', pt );

				const vertex = new THREE.Vector3().fromArray( arr );
				//console.log( 'vertex', vertex );

				points.push( vertex );

				//if ( length === 3 ) { points.push( line[ 3 ] ); }

			}
			//console.log( 'points', points );


			if (points.length === 0 ) {

				//continue;

			} else {

				colorText = rad.items[ i ].split( ' ' )[0];

				//console.log( 'colorText', colorText );

				color = colors[ colorText ];

				color = color ? color : 'darkgray';

				const material = new THREE.MeshBasicMaterial( { color: color, opacity: 0.85, side: 2, transparent: true } );

				const shape = drawShapeSinglePassObjects( points, material, [] );

				const edgesGeometry = new THREE.EdgesGeometry( shape.geometry );
				const surfaceEdge = new THREE.LineSegments( edgesGeometry, new THREE.LineBasicMaterial( { color: 0x333333 } ) );
				surfaceEdge.rotation.copy( shape.rotation );
				surfaceEdge.position.copy( shape.position );

				rad.meshes.add( shape );
				rad.edges.add( surfaceEdge )

			}


	}



	function drawSphere( index ) {

		line = rad.data[ index ];
		//console.log( 'line', line[ 2 ] );
		items = line[ 2 ].trim().replace( /\t/g, ' ' ).replace( / {2,}/g, ' ' ).split( ' ' ).map( item => parseFloat( item ) );
		radius = items[ 4 ];

		const geometry = new THREE.SphereGeometry( radius );

		colorText = rad.items[ index ].split( ' ' )[0];
		//console.log( 'colorText', colorText );

		color = colors[ colorText ];

		color = color ? color : 'darkgray';
		//console.log( 'sphere color', color );

		const material = new THREE.MeshBasicMaterial( { color: color, opacity: 0.85, side: 2, transparent: true } );

		//const material = new THREE.MeshNormalMaterial();
		const mesh = new THREE.Mesh( geometry, material );
		mesh.position.fromArray( items.slice( 1 ) );
		//mesh.scale.set( 10, 10, 10 );
		rad.meshes.add( mesh );

	}



	function drawCylinder( index ) {

		const line = rad.data[ index ];
		//console.log( 'line', line[ 2 ] );

		//items = line[ 2 ].split( ' ' );
		const startArray = line[ 3 ].trim().replace( /\t/g, ' ' ).replace( / {2,}/g, ' ' ).split( ' ' ).map( item => parseFloat( item ) );
		const start = new THREE.Vector3().fromArray( startArray );
		//console.log( 'start', start );

		endArray = line[ 4 ].trim().replace( /\t/g, ' ' ).replace( / {2,}/g, ' ' ).split( ' ' ).map( item => parseFloat( item ) );
		end = new THREE.Vector3().fromArray( endArray );
		//angle = anglePoint.sub( center.clone() ).normalize();
		//console.log( 'end', end );

		radius =  parseFloat( line[ 5 ].trim() );
		//console.log( 'radius', radius );

		height = start.distanceTo( end );
		//console.log( 'height', height );

		const geometry = new THREE.CylinderGeometry( radius, radius, height );
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -0.5 * Math.PI ) );
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0,0.5 * height) );

		colorText = rad.items[ index ].split( ' ' )[0];
		//console.log( 'colorText', colorText );

		color = colors[ colorText ];

		color = color ? color : 'darkgray';
		//console.log( 'cylinder color', color );

		const material = new THREE.MeshBasicMaterial( { color: color, opacity: 0.85, side: 2, transparent: true } );

		//const material = new THREE.MeshNormalMaterial();
		const mesh = new THREE.Mesh( geometry, material );
		mesh.position.copy( start );
		mesh.lookAt( end );

		rad.meshes.add( mesh );

	}



	function drawCone( index ) {

		const line = rad.data[ index ];
		//console.log( 'line', line[ 2 ] );

		//items = line[ 2 ].split( ' ' );
		const startArray = line[ 3 ].trim().replace( /\t/g, ' ' ).replace( / {2,}/g, ' ' ).split( ' ' ).map( item => parseFloat( item ) );
		const start = new THREE.Vector3().fromArray( startArray );
		//console.log( 'start', start );

		endArray = line[ 4 ].trim().replace( /\t/g, ' ' ).replace( / {2,}/g, ' ' ).split( ' ' ).map( item => parseFloat( item ) );
		end = new THREE.Vector3().fromArray( endArray );
		//angle = anglePoint.sub( center.clone() ).normalize();
		//console.log( 'end', end );

		radiusArray =  line[ 5 ].trim().replace( /\t/g, ' ' ).replace( / {2,}/g, ' ' ).split( ' ' ).map( item => parseFloat( item ) );
		radius1 = radiusArray[ 0 ];
		radius2 = radiusArray[ 1 ];
		//console.log( 'radius1', radius1 );

		height = start.distanceTo( end );
		//console.log( 'height', height );

		const geometry = new THREE.CylinderGeometry( radius1, radius2, height );
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -0.5 * Math.PI ) );
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0,0.5 * height) );

		colorText = rad.items[ index ].split( ' ' )[0];
		//console.log( 'colorText', colorText );

		color = colors[ colorText ];

		color = color ? color : 'darkgray';
		//console.log( 'cylinder color', color );

		const material = new THREE.MeshBasicMaterial( { color: color, opacity: 0.85, side: 2, transparent: true } );

//		const material = new THREE.MeshNormalMaterial();
		const mesh = new THREE.Mesh( geometry, material );
		mesh.position.copy( start );
		mesh.lookAt( end );

		rad.meshes.add( mesh );

	}


	function drawShapeSinglePassObjects ( vertices, material, holes ) {

		const plane = getPlane( vertices );

		const obj = new THREE.Object3D();
		obj.lookAt( plane.normal );  // copy the rotation of the triangle
		obj.quaternion.conjugate();
		obj.updateMatrixWorld();

		vertices.map( vertex => obj.localToWorld( vertex ) );

		const shape = new THREE.Shape( vertices );
		//shape.autoClose = true;

		for ( let verticesHoles of holes ) {

			const hole = new THREE.Path();

			verticesHoles.map( vertex => obj.localToWorld( vertex ) );

			hole.setFromPoints( verticesHoles );

			shape.holes.push( hole );

		}

		const geometryShape = new THREE.ShapeBufferGeometry( shape );

		// material to here
		const shapeMesh = new THREE.Mesh( geometryShape, material );

		shapeMesh.lookAt( plane.normal );
		shapeMesh.position.copy( plane.normal.multiplyScalar( - plane.constant ) );

		return shapeMesh;

	};


	function getPlane ( points, start = 0 ) {

		const triangle = new THREE.Triangle();
		triangle.set( points[ start ], points[ start + 1 ], points[ start + 2 ] );
		const pl = new THREE.Plane();
		const plane = triangle.getPlane( pl );

		if ( triangle.getArea() === 0 ) {

			start++;
			getPlane( points, start );

		}

		return plane;

	};




	function zoomObjectBoundingSphere ( obj ) {

		const bbox = new THREE.Box3().setFromObject( obj );

		const sphere = bbox.getBoundingSphere( new THREE.Sphere() );
		const center = sphere.center;
		const radius = sphere.radius;

		controls.target.copy( center );
		controls.maxDistance = 5 * radius;

		camera.position.copy( center.clone().add( new THREE.Vector3( 1.0 * radius, - 1.0 * radius, 1.0 * radius ) ) );
		camera.far = 10 * radius; //2 * camera.position.length();
		camera.updateProjectionMatrix();

		//lightDirectional.position.copy( center.clone().add( new THREE.Vector3( -1.5 * radius, -1.5 * radius, 1.5 * radius ) ) );
		//lightDirectional.shadow.camera.scale.set( 0.2 * radius, 0.2 * radius, 0.01 * radius );
		//lightDirectional.target = axesHelper;

		axesHelper.scale.set( radius, radius, radius );
		axesHelper.position.copy( center );

		obj.userData.center = center;
		obj.userData.radius = radius;

		//		scene.remove( cameraHelper );
		//		cameraHelper = new THREE.CameraHelper( lightDirectional.shadow.camera );
		//		scene.add( cameraHelper );

	}



	function updateOpacity() {

		const opacity = parseInt( rngOpacity.value, 10 );
		outOpacity.value = opacity + '%';

		scene.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.material.opacity = opacity / 100;

			}

		} );


	};

