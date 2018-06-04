/* Copyright 2018 Ladybug Tools authors. MIT License */

	var rad = {};

	rad.meshes = null;
	rad.edges = null;
	rad.pointsField = null;
	rad.pointsGeometry = null;
	rad.opacity = 0.5;

	rad.colors = {

		InteriorWall: 0x008000,
		ExteriorWall: 0xFFB400,
		Roof: 0x800000,
		InteriorFloor: 0x80FFFF,
		ExposedFloor: 0x40B4FF,
		Shade: 0xFFCE9D,
		UndergroundWall: 0xA55200,
		UndergroundSlab: 0x804000,
		Ceiling: 0xFF8080,
		Air: 0xFFFF00,
		UndergroundCeiling: 0x408080,
		RaisedFloor: 0x4B417D,
		SlabOnGrade: 0x804000,
		FreestandingColumn: 0x808080,
		EmbeddedColumn: 0x80806E,

		generic_wall: 'gray',
		generic_floor: 'brown',
		generic_roof: 'maroon',


		Exterior_Window: 'black', //Exterior_Window ? Exterior_Window : 'black',
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

	};


	rad.parsePtsText = function( text ) {

		//console.log( 'text', text );
		if ( rad.pointsGeometry ) { rad.pointsGeometry.dispose(); };

		rad.pointsGeometry = new THREE.Geometry();

		const lines = text.split( /\r\n|\n/ )
		//console.log( 'lines', lines );

		const points = lines.map( item => item.split( /\s/).slice( 0, 3 ).map( str => parseFloat( str ) ) );
		//console.log( 'points', points );


		for ( let i = 0; i < points.length; i ++ ) {

			var point = new THREE.Vector3().fromArray( points[ i ] );

			rad.pointsGeometry.vertices.push( point );

			let arr = rad.vertexColors ? rad.vertexColors[ i ] : [ 0.8, 0.8, 0.8 ];

			rad.pointsGeometry.colors.push( new THREE.Color( arr[ 0 ], arr[ 1 ], arr[ 2 ] ) );

		}

		var pointsMaterial = new THREE.PointsMaterial( { size: 1.5, vertexColors: THREE.VertexColors } );
		pointsMaterial.sizeAttenuation = true;
		rad.pointsField = new THREE.Points( rad.pointsGeometry, pointsMaterial );

		scene.add( rad.pointsField );


		divLog.innerHTML =
		`
			<p>length: ${text.length.toLocaleString()}</p>
			<p>lines: ${lines.length}</p>

		`;


	}



	rad.parseResText = function( text ) {

		//console.log( 'text', text );

		const lines = text.split( /\r\n|\n/ )
		//console.log( 'lines', lines );

		rad.vertexColors = lines.map( item => item.split( /\s/).slice( 0, 3 ).map( str => parseFloat( str ) ) );

		//console.log( 'vertexColors', rad.vertexColors );

	}



	rad.parseRadText = function( text ) {

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

					rad.requestFile( path + url );

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

		rad.setVertices();

		divContents.innerHTML =
		`
			<p>length: ${text.length.toLocaleString()}</p>
			<p>lines: ${lines.length.toLocaleString()}</p>
			<p>faces: ${(items.length - 1).toLocaleString()}</p>
		`;

	};



	rad.setVertices = function() {

		video = document.createElement( 'video' );
		//video.src = "../../../../textures/sintel.ogv";
		video.src = "../../../images/The-Pull-Heatmap-Follow-the-Pumpkin.webm";

		video.load(); // must call after setting/changing source
		//video.height = video.width = 256;
		video.loop = true;

		for ( let i = 1; i < rad.items.length; i++ ) {
		//for ( let i = 1; i < 100; i++ ) {

			//console.log( 'item', rad.items[ i ] );

			if ( rad.items[ i ] === '' ) {

				continue;

			} else if ( rad.items[ i ].includes( 'polygon') === true ) {
				//console.log( 'voided rad.items[ i ]', rad.items[ i ] );

				rad.drawPolygon( i );

			} else if ( rad.items[ i ].includes( 'void') ) {

				if ( rad.items[ i ].includes( 'brightfunc') || rad.items[ i ].includes( 'brighttext') || rad.items[ i ].includes( 'alias') ) {
					continue;
				}

				items = rad.items[ i ].trim().replace( /\t/g, ' ' ).replace( / {2,}/g, ' ' ).split( ' ' );
				//console.log( 'items', items );

				material = items[ 2 ];
				//console.log( 'material', material );

				arr = rad.data[ i ][ 2 ].trim().replace( /\t/g, ' ' ).replace( / {2,}/g, ' ' ).split( ' ' ).map( item => parseFloat( item ) );
				//console.log( 'rad.items', arr );

				color = new THREE.Color( arr[ 1 ], arr[ 2 ], arr[ 3 ]);
				//console.log( 'color', color );

				rad.colors[ material ] = color;

				continue;

			} else if ( rad.items[ i ].includes( 'sphere') === true ) {

				rad.drawSphere( i );

			} else if ( rad.items[ i ].includes( 'cylinder') === true ) {

				rad.drawCylinder( i );

			} else if ( rad.items[ i ].includes( 'cone') === true ) {

				rad.drawCone( i );

			}
			//console.log( 'line', line );

		}

		scene.add( rad.meshes, rad.edges );
		zoomObjectBoundingSphere( rad.meshes );

	};



	rad.drawSphere = function( index ) {

		const line = rad.data[ index ];
		//console.log( 'line', line[ 2 ] );
		items = line[ 2 ].trim().replace( /\t/g, ' ' ).replace( / {2,}/g, ' ' ).split( ' ' ).map( item => parseFloat( item ) );
		radius = items[ 4 ];

		const geometry = new THREE.SphereGeometry( radius );

		colorText = rad.items[ index ].split( ' ' )[0];
		//console.log( 'colorText', colorText );

		color = rad.colors[ colorText ];

		color = color ? color : 'darkgray';
		//console.log( 'sphere color', color );

		const material = new THREE.MeshBasicMaterial( { color: color, opacity: 0.85, side: 2, transparent: true } );
		//const material = new THREE.MeshNormalMaterial();

		const mesh = new THREE.Mesh( geometry, material );
		mesh.position.fromArray( items.slice( 1 ) );

		rad.meshes.add( mesh );

	};



	rad.drawCylinder = function( index ) {

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

		color = rad.colors[ colorText ];

		color = color ? color : 'darkgray';
		//console.log( 'cylinder color', color );

		const material = new THREE.MeshBasicMaterial( { color: color, opacity: 0.85, side: 2, transparent: true } );

		//const material = new THREE.MeshNormalMaterial();
		const mesh = new THREE.Mesh( geometry, material );
		mesh.position.copy( start );
		mesh.lookAt( end );

		rad.meshes.add( mesh );

	};



	rad.drawCone = function( index ) {

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

		color = rad.colors[ colorText ];

		color = color ? color : 'darkgray';
		//console.log( 'cylinder color', color );

		const material = new THREE.MeshBasicMaterial( { color: color, opacity: 0.85, side: 2, transparent: true } );

		//		const material = new THREE.MeshNormalMaterial();
		const mesh = new THREE.Mesh( geometry, material );
		mesh.position.copy( start );
		mesh.lookAt( end );

		rad.meshes.add( mesh );

	};



	rad.drawPolygon = function( i ) {

		const line = rad.data[ i ];
		const length = parseInt( line[ 2 ], 10 ) / 3 + 3;
		//console.log( 'length', length );

		const item = rad.items[ i ];

		let points = [];

		//texture = new THREE.TextureLoader().load( "https://jaanga.github.io/cookbook-threejs/textures/im" +
		//	( 1 + Math.floor( 16 * Math.random() ) ) + ".jpg" );

		//texture = new THREE.TextureLoader().load( "https://jaanga.github.io/cookbook-threejs/textures/im11.jpg" );



		//window.addEventListener( 'mousedown', onWindowClick, false );
		texture = new THREE.VideoTexture( video );
		//texture.minFilter = THREE.LinearFilter;
		//texture.magFilter = THREE.LinearFilter;
		texture.minFilter = THREE.NearestFilter;
		texture.magFilter = THREE.NearestFilter;

		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
		texture.repeat.set( 1 / 256, 1 / 256 );
		texture.offset.x = 0.5;
		texture.offset.y = 0.5;
		material = new THREE.MeshBasicMaterial( { map: texture, side: 2 } );


		//texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		//texture.repeat.set(  0.1, 0.1 );

		//texture.offset.x = 0.5;
		//texture.offset.y = 0.5;

		for ( let j = 3; j < length; j++ ) {

			//console.log( 'line', i, line[ i ]);

			const arr = line[ j ].trim().replace( /\t/g, ' ' ).replace( / {2,}/g, ' ' ).split( ' ' ).map( item => parseFloat( item ) );

			const vertex = new THREE.Vector3().fromArray( arr );
			//console.log( 'vertex', vertex );

			points.push( vertex );

		}


		if ( points.length > 9 ) {

			if ( points.length === 11 ) { // Michal's models

				//console.log( 'points', points );
				if ( points[ 4 ].z !== points[ 5 ].z ) {

					points = [ points[ 0 ], points[ 1 ], points[ 2 ], points[ 3 ], points[ 4 ],
						points[ 7 ], points[ 6 ], points[ 5 ], points[ 8 ], points[ 9 ], points[ 10 ] ];

					//console.log( 'points', points );

				}

			} else if ( points.length === 10 ) {

				if ( points[ 1 ].z !== points[ 2 ].z  ) {

					points = [ points[ 7 ], points[ 8 ], points[ 9 ], points[ 6 ], points[ 5 ],
						points[ 4 ], points[ 3 ], points[ 2 ], points[ 1 ], points[ 0 ] ];

					//console.log( 'points', points );

				}

			}

		} else {

			//return;

		}


		if ( points.length === 0 ) {

			//continue;

		} else {

			colorText = rad.items[ i ].split( ' ' )[0];
			//console.log( 'colorText', colorText );

			color = rad.colors[ colorText ];
			color = color ? color : 'darkgray';

			//material = new THREE.MeshBasicMaterial( { color: 0xffffff, map: texture, opacity: rad.opacity, side: 2, transparent: true } );

			const shape = rad.get3dShape( points, material );

			const edgesGeometry = new THREE.EdgesGeometry( shape.geometry );
			const surfaceEdge = new THREE.LineSegments( edgesGeometry, new THREE.LineBasicMaterial( { color: 0x333333 } ) );
			surfaceEdge.rotation.copy( shape.rotation );
			surfaceEdge.position.copy( shape.position );

			rad.meshes.add( shape );
			rad.edges.add( surfaceEdge );

		}

	};



	function onWindowClick() {
		video.play();
	}

	/////

	rad.get3dShape = function( vertices, material, holes = [] ) {

		// 2018-06-02

		const plane = getPlane( vertices );

		const referenceObject = new THREE.Object3D();
		referenceObject.lookAt( plane.normal ); // copy the rotation of the plane
		referenceObject.quaternion.conjugate(); // figure out the angle it takes to rotate the vertices so they lie on the XY plane
		referenceObject.updateMatrixWorld();

		vertices.map( vertex => referenceObject.localToWorld( vertex ) );

		const holeVertices = [];

		for ( let verticesHoles of holes ) {

			const hole = new THREE.Path();

			verticesHoles.map( vertex => referenceObject.localToWorld( vertex ) );

			hole.setFromPoints( verticesHoles );

			holeVertices.push( hole );

		}

		const shapeMesh = get2DShape( vertices, material, holeVertices );

		shapeMesh.lookAt( plane.normal );
		const center = plane.coplanarPoint( new THREE.Vector3() );
		shapeMesh.position.copy( center );

		return shapeMesh;

		//

			function get2DShape( vertices, material, holes = [] ) {

				const shape = new THREE.Shape( vertices );
				shape.holes = holes;
				const geometryShape = new THREE.ShapeGeometry( shape );
				const shapeMesh = new THREE.Mesh( geometryShape, material );
				return shapeMesh;

			}


			function getPlane ( points, start = 0 ) {

				const triangle = new THREE.Triangle();
				triangle.set( points[ start ], points[ start + 1 ], points[ start + 2 ] );

				if ( triangle.getArea() === 0 ) { // points must be colinear therefore not usable

					start++;
					getPlane( points, start );

				}

				const pl = new THREE.Plane();
				const plane = triangle.getPlane( pl );

				return plane;

			}

	};




	rad.requestFile = function( url ) {

		//scene.remove( rad.meshes, rad.edges );
		//rad.meshes = new THREE.Object3D();
		//rad.edges = new THREE.Object3D();

		const xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', url, true );
		xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
		//xhr.onprogress = function( xhr ) { console.log( 'bytes loaded:', xhr.loaded ); }; /// or something
		xhr.onload = rad.requestFileCallback;
		xhr.send( null );

	};



	rad.requestFileCallback = function( xhr ) {

		//console.log( 'xhr', xhr );

		const type = xhr.target.responseURL.slice( -3 ).toLowerCase();

		if ( type === 'rad' ){

			const response = xhr.target.response;
			//console.log( 'response', xhr );

			rad.parseRadText( response );

		} else if ( type === 'pts' ) {

			const response = xhr.target.response;
			//console.log( 'pts response', xhr );

			rad.parsePtsText( response );

		} else if ( type === 'res' ) {

			const response = xhr.target.response;
			//console.log( 'res response', xhr );

			rad.parseResText( response );

		}

	}
