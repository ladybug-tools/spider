// Copyright 2018 Ladybug Tools authors. MIT License
/* globals THREE */
/* jshint esversion: 6 */
	var GBX = {};

	GBX.gbxml = null;
	GBX.gbjson = null; // xnl converted to json
	GBX.surfaceJson = null; // useful subset of GBX.gbjson

	GBX.surfaceMeshes= null; // Three.js Shapes as Meshes created from GBX.surfaceJson
	GBX.surfaceEdges= null; // Three.js edges helper creare from GBX.surfaceMeshes
	GBX.surfaceOpenings= null; // Three.js Three.js Shapes as Meshes created created from GBX.surfaceJson with Openings

	GBX.colorsDefault = {

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
		EmbeddedColumn: 0x80806E

	};

	GBX.colors = Object.assign( {}, GBX.colorsDefault ); // working copy of default colors

	GBX.surfaceTypes  = Object.keys( GBX.colors );


	// loads any xml file - from AJAX, file reader or location hash or wherever

	GBX.parseFileXML = function( xml ) {

		GBX.gbxml = xml;

		GBX.gbjson = GBX.getXML2jsobj( GBX.gbxml );
		console.log( 'GBX.gbjson', GBX.gbjson );

		GBX.surfaceJson = GBX.gbjson.Campus.Surface;

		GBX.parseGbJson( GBX.gbjson );

		GBX.zoomObjectBoundingSphere( GBX.surfaceMeshes );

		return GBX.gbjson;


	};


	// https://www.sitepoint.com/how-to-convert-xml-to-a-javascript-object/
	// http://blogs.sitepointstatic.com/examples/tech/xml2json/index.html
	// Theo: I have very little idea how this functions

	GBX.getXML2jsobj = function( node ) {

		let data = {};

		function Add( name, value ) {

			if ( data[ name ] ) {

				if ( data[ name ].constructor !== Array ) {

					data[ name ] = [ data[ name ] ];

				}

				data[ name ][ data[ name ].length ] = value;

			} else {

				data[ name ] = value;

			}

		}

		let child, childNode;

		for ( child = 0; childNode = node.attributes[ child ]; child++ ) {

			Add( childNode.name, childNode.value );

		}

		for ( child = 0; childNode = node.childNodes[ child ]; child++ ) {

			if ( childNode.nodeType === 1 ) {

				if ( childNode.childNodes.length === 1 && childNode.firstChild.nodeType === 3 ) { // text value

					Add( childNode.nodeName, childNode.firstChild.nodeValue );

				} else { // sub-object

					Add( childNode.nodeName, GBX.getXML2jsobj( childNode ) );

				}

			}

		}

		return data;

	};



	GBX.parseGbJson = function() {

		//console.log( 'surfaces', gbjson.Campus.Surface );

		const surfaces = GBX.surfaceJson; // gbjson.Campus.Surface;
		const polyloops = [];
		const openings = [];

		// fork into separate clean-up function
		for ( let surface of surfaces ) {

			if ( surface.Opening ) {

				if ( surface.Opening.PlanarGeometry ) {

					const polyloop = surface.Opening.PlanarGeometry.PolyLoop;
					const points = GBX.getPoints( polyloop );
					openings.push( [ points ] );

				} else { // undefined === array of openings

					const arr = [];

					for ( let opening of surface.Opening ) {

						const polyloop = opening.PlanarGeometry.PolyLoop;
						const points = GBX.getPoints( polyloop );
						arr.push( points );

					}

					openings.push( arr );

				}

			} else {

				openings.push( [] );

			}

			const polyloop = surface.PlanarGeometry.PolyLoop;
			const points = GBX.getPoints( polyloop );

			polyloops.push( points );

		}

		scene.remove( GBX.surfaceMeshes, GBX.surfaceEdges, GBX.surfaceOpenings );

		if ( GBX.surfaceMeshes ) {

			GBX.surfaceMeshes.traverse( function ( child ) {

				if ( child.geometry ) {

					child.geometry.dispose();
					child.material.dispose();

				}

				if ( child.texture ) { child.texture.dispose(); }

			} );

		}

		if ( GBX.surfaceEdges ) {

			GBX.surfaceEdges.traverse( function ( child ) {

				if ( child.geometry ) {

					child.geometry.dispose();
					child.material.dispose();

				}

			} );

		}

		if ( GBX.surfaceOpenings ) {

			GBX.surfaceOpenings.traverse( function ( child ) {

				if ( child.geometry ) {

					child.geometry.dispose();
					child.material.dispose();

				}

			} );

		}


		GBX.surfaceMeshes = new THREE.Object3D();
		GBX.surfaceMeshes.name = 'GBX.surfaceMeshes';

		GBX.surfaceEdges = new THREE.Object3D();
		GBX.surfaceEdges.name = 'GBX.surfaceEdges';

		GBX.surfaceOpenings = new THREE.Object3D();
		GBX.surfaceOpenings.name = 'GBX.surfaceOpenings';

		for ( let i = 0; i < polyloops.length; i++ ) {

			const material = new THREE.MeshPhongMaterial( {
				color: GBX.colors[ surfaces[ i ].surfaceType ], side: 2, opacity: 0.85, transparent: true } );

			const shape = GBX.drawShapeSinglePassObjects( polyloops[ i ], material, openings[ i ] );

			shape.userData.data = surfaces[ i ];
			shape.castShadow = shape.receiveShadow = true;
			GBX.surfaceMeshes.add( shape );

			const edgesGeometry = new THREE.EdgesGeometry( shape.geometry );
			const surfaceEdge = new THREE.LineSegments( edgesGeometry, new THREE.LineBasicMaterial( { color: 0x888888 } ) );
			surfaceEdge.rotation.copy( shape.rotation );
			surfaceEdge.position.copy( shape.position );
			GBX.surfaceEdges.add( surfaceEdge ); // or add to surfaces??

		}


		GBX.getOpenings();

		scene.add( GBX.surfaceMeshes, GBX.surfaceEdges, GBX.surfaceOpenings );

	};




	GBX.getOpenings = function() {

		//GBX.surfacesExteriorWall = GBX.surfaceJson.filter( element => element.surfaceType === 'ExteriorWall' );
		//console.log( 'GBX.surfacesExteriorWall', GBX.surfacesExteriorWall );
		//		GBX.surfacesExteriorWallArea = GBX.getSurfacesArea( GBX.surfacesExteriorWall );

		GBX.SurfacesWithOpenings = GBX.surfaceJson.filter( surface => surface.Opening );
		//console.log( 'GBX.SurfacesWithOpenings', GBX.SurfacesWithOpenings );

		GBX.openings = [];

		for ( let surface of GBX.SurfacesWithOpenings ) {

			if ( surface.Opening.length ) {

				GBX.openings.push ( ...surface.Opening );

			} else {

				GBX.openings.push ( surface.Opening );

			}

			//if ( surface.Opening.length ) { console.log( 'surface.Opening.length', surface.Opening.length ); }

		}
		//console.log( 'GBX.openings', GBX.openings );

		//GBX.openingsArea = 0;

		var material = new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.1, side: 2, transparent: true } );


		for ( let opening of GBX.openings ) {
			//console.log( 'opening', opening.PlanarGeometry.PolyLoop );

			const points = opening.PlanarGeometry.PolyLoop.CartesianPoint.map(
				CartesianPoint => new THREE.Vector3().fromArray( CartesianPoint.Coordinate )
			);
			//console.log( 'points', points );

			const triangle = GBX.getPlane( points );
			//console.log( 'triangle', triangle.normal() );
			if ( !triangle ) { console.log( 'surface error', opening ); continue; }

			const obj = new THREE.Object3D();
			obj.lookAt( triangle.normal );  // copy the rotation of the triangle
			const obj2 = new THREE.Object3D();
			obj2.lookAt( triangle.normal );
			obj2.quaternion.conjugate();
			obj2.updateMatrixWorld();

			points.map( point => obj2.localToWorld( point ) );
			//console.log( 'points', points );

			area = THREE.ShapeUtils.area( points );
			//GBX.openingsArea += area
			//console.log( 'area', THREE.ShapeUtils.area( points ) );

			shape = new THREE.Shape( points );
			//console.log( '', shape );
			shape.autoClose = true;

			const geometryShape = new THREE.ShapeGeometry( shape );

			let shapeMesh = new THREE.Mesh( geometryShape, material );
			shapeMesh.lookAt( triangle.normal ); // quaternion.copy( obj.quaternion );
			shapeMesh.position.copy( triangle.normal.multiplyScalar( - triangle.constant ) );
			shapeMesh.userData.data = opening;
			shapeMesh.userData.area = area;

			GBX.surfaceOpenings.add( shapeMesh );

		}

	};


	GBX.getPoints = function( polyloop ) {

		const points = polyloop.CartesianPoint.map( CartesianPoint => new THREE.Vector3().fromArray( CartesianPoint.Coordinate ) );
		return points;

	};



	GBX.drawShapeSinglePassObjects = function( vertices, material, holes ) {

		const plane = GBX.getPlane( vertices );

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

		const geometryShape = new THREE.ShapeGeometry( shape );

		// material to here
		const shapeMesh = new THREE.Mesh( geometryShape, material );

		shapeMesh.lookAt( plane.normal );
		shapeMesh.position.copy( plane.normal.multiplyScalar( - plane.constant ) );

		return shapeMesh;

	};



	GBX.getPlane = function( points, start = 0 ) {

		const triangle = new THREE.Triangle();
		triangle.set( points[ start ], points[ start + 1 ], points[ start + 2 ] );
		const pl = new THREE.Plane();
		GBX.plane = triangle.getPlane( pl );

		if ( triangle.getArea() === 0 ) {

			start++;
			GBX.getPlane( points, start );

		}

		return GBX.plane;

	};



	GBX.zoomObjectBoundingSphere = function( obj ) {

		const bbox = new THREE.Box3().setFromObject( obj );
		GBX.boundingBox = bbox;

		const sphere = bbox.getBoundingSphere( new THREE.Sphere() );
		const center = sphere.center;
		const radius = sphere.radius;

		controls.target.copy( center );
		controls.maxDistance = 5 * radius;

		camera.position.copy( center.clone().add( new THREE.Vector3( 1.0 * radius, - 1.0 * radius, 1.0 * radius ) ) );
		camera.far = 10 * radius; //2 * camera.position.length();
		camera.updateProjectionMatrix();

		lightDirectional.position.copy( center.clone().add( new THREE.Vector3( -1.5 * radius, -1.5 * radius, 1.5 * radius ) ) );
		lightDirectional.shadow.camera.scale.set( 0.2 * radius, 0.2 * radius, 0.01 * radius );
		lightDirectional.target = axesHelper;

		axesHelper.scale.set( radius, radius, radius );
		axesHelper.position.copy( center );

		obj.userData.center = center;
		obj.userData.radius = radius;

		//		scene.remove( cameraHelper );
		//		cameraHelper = new THREE.CameraHelper( lightDirectional.shadow.camera );
		//		scene.add( cameraHelper );

	};



	GBX.setAllVisible = function() {

		GBX.surfaceEdges.visible = true;
		GBX.surfaceMeshes.visible = true;
		GBX.surfaceOpenings.visible = true;

		for ( let child of GBX.surfaceMeshes.children ) {

			if ( !child.material ) { continue; }

			child.material = new THREE.MeshPhongMaterial( {
				color: GBX.colors[ child.userData.data.surfaceType ], side: 2, opacity: 0.85, transparent: true }
			);
			child.material.wireframe = false;
			child.visible = true;

		}

		GBX.surfaceOpenings.visible = true;

		for ( let child of GBX.surfaceOpenings.children ) {

			if ( !child.material ) { continue; }

			child.material = new THREE.MeshPhongMaterial( {
				color: 0x000000, side: 2, opacity: 0.5, transparent: true }
			);
			child.material.wireframe = false;
			child.visible = true;

		}

		//for ( let child of GBX.surfaceEdges.children ) {

			//child.material.opacity = 0.85;
			//child.material.wireframe = false;

		//}

		document.body.style.backgroundImage = '';
		//divLog.innerHTML = '';

	};


	GBX.toggleSurfacesVisible = function() {

		GBX.surfaceMeshes.visible=!GBX.surfaceMeshes.visible;

		GBX.surfaceMeshes.children.forEach( child => child.visible = GBX.surfaceMeshes.visible );

	};