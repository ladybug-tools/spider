// Copyright 2018 Ladybug Tools authors. MIT License
/* globals THREE */
/* jshint esversion: 6 */

	var GBX = {};

	GBX.gbxml = null;
	GBX.gbjson = null; // xnl converted to json
	GBX.surfaceJson = null; // useful subset of GBX.gbjson

	GBX.surfaceMeshes= new THREE.Group(); // Three.js Shapes as Meshes created from GBX.surfaceJson
	//GBX.surfaceEdges= new THREE.Object3D(); // Three.js edges helper creare from GBX.surfaceMeshes
	GBX.surfaceOpenings= new THREE.Group(); // Three.js Three.js Shapes as Meshes created created from GBX.surfaceJson with Openings

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
		//console.log( 'GBX.gbjson', GBX.gbjson );

		GBX.surfacesJson = GBX.gbjson.Campus.Surface;

		GBX.surfaceMeshes= new THREE.Group();
		GBX.surfaceMeshes.add( ...GBX.getSurfaceMeshes() );
		GBX.surfaceMeshes.name = 'GBX.surfaceMeshes';

		GBX.getSurfaceEdges();

		//GBX.surfaceOpenings.add( ...GBX.getSurfaceOpenings() );
		GBX.getSurfaceOpenings();
		GBX.surfaceOpenings= new THREE.Group();
		GBX.surfaceOpenings.name = 'GBX.surfaceOpenings';

		return [ GBX.surfaceMeshes, GBX.surfaceOpenings ];

	};


	// https://www.sitepoint.com/how-to-convert-xml-to-a-javascript-object/
	// http://blogs.sitepointstatic.com/examples/tech/xml2json/index.html
	// Theo: I have difficulty understanding how this functions

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



	GBX.getSurfaceMeshes = function() {

		//const surfaces = GBX.surfacesJson; // gbjson.Campus.Surface;
		const shapeVertices = []; // every shape will have an array of hole vertices - which may be empty
		const holesArray = [];

		for ( let surfJson of GBX.surfacesJson ) {

			const holes = [];

			if ( surfJson.Opening ) {

				surfJson.Opening = Array.isArray( surfJson.Opening ) ? surfJson.Opening : [ surfJson.Opening ];

				for ( let opening of surfJson.Opening ) {

					const polyloop = opening.PlanarGeometry.PolyLoop;
					const vertices = GBX.getVertices( polyloop );
					holes.push( vertices );

				}

			}

			holesArray.push( holes );

			const polyloop = surfJson.PlanarGeometry.PolyLoop;
			const vertices = GBX.getVertices( polyloop );
			shapeVertices.push( vertices );

		}

		let surfaceMeshes = [];

		for ( let i = 0; i < shapeVertices.length; i++ ) {

			const material = new THREE.MeshPhongMaterial( {
				color: GBX.colors[ GBX.surfacesJson[ i ].surfaceType ], side: 2, opacity: 0.85, transparent: true } );

			const shape = GBX.get3dShape( shapeVertices[ i ], material, holesArray[ i ] );

			shape.userData.data = GBX.surfacesJson[ i ];
			shape.name = GBX.surfacesJson[ i ].surfaceType;
			shape.castShadow = shape.receiveShadow = true;
			surfaceMeshes.push( shape );

		}

		return surfaceMeshes;

	};



	GBX.getSurfaceEdges = function() {

		//const surfaceEdges = new THREE.Object3D();
		//surfaceEdges.name = 'GBX.surfaceEdges';

		for ( let mesh of GBX.surfaceMeshes.children ) {

			const edgesGeometry = new THREE.EdgesGeometry( mesh.geometry );
			const surfaceEdge = new THREE.LineSegments( edgesGeometry, new THREE.LineBasicMaterial( { color: 0x888888 } ) );
			surfaceEdge.name = 'edge';
			mesh.add( surfaceEdge ); // or add to surfaces??

		}

	};



	GBX.getSurfaceOpenings = function() {

		const material = new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.9, side: 2, transparent: true } );
		let surfaceOpenings = [];

		for ( let mesh of GBX.surfaceMeshes.children ) {

			mesh.userData.openings = [];

			if ( mesh.userData.data && mesh.userData.data.Opening ) {

				openingsJson = mesh.userData.data.Opening
				openingsJson = Array.isArray( openingsJson ) ? openingsJson : [ openingsJson ];

				mesh.userData.openings.push ( ...openingsJson );

				for ( let opening of openingsJson ) {

					const points = GBX.getVertices( opening.PlanarGeometry.PolyLoop );
					const shapeMesh = GBX.getShapeOpening( points, material );
					shapeMesh.userData.data = opening;
					//surfaceOpenings.push( shapeMesh );

					mesh.add( shapeMesh );

				}

				//console.log( 'mesh', mesh );
			}

		}

		return surfaceOpenings;

	};



	GBX.getVertices = function( polyloop ) {

		const points = polyloop.CartesianPoint.map( CartesianPoint => new THREE.Vector3().fromArray( CartesianPoint.Coordinate ) );
		return points;

	};



	GBX.getShapeOpening = function( vertices, material ) {  // almost ;-(

		// 2018-06-02

		const plane = getPlane( vertices );

		const referenceObject = new THREE.Object3D();
		referenceObject.lookAt( plane.normal ); // copy the rotation of the plane
		referenceObject.quaternion.conjugate(); // figure out the angle it takes to rotate the vertices so they lie on the XY plane
		referenceObject.rotateZ = Math.PI;
		referenceObject.updateMatrixWorld();

		vertices.map( vertex => referenceObject.localToWorld( vertex ) );

		const shapeMesh = get2DShape( vertices, material );

		return shapeMesh;

	};


	//

	GBX.get3dShape = function( vertices, material, holes = [] ) {

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


	};



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
