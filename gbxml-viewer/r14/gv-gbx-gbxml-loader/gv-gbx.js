// Copyright 2018 Ladybug Tools authors. MIT License
/* globals THREE */
/* jshint esversion: 6 */

	var GBX = { release: "14.1"};

	GBX.text = null; // raw file data
	GBX.gbxml = null;
	GBX.gbjson = null; // xnl converted to json
	GBX.surfacesJson = null; // useful subset of GBX.gbjson

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
		EmbeddedColumn: 0x80806E,
		Undefined: 0x88888888

	};

	GBX.colors = Object.assign( {}, GBX.colorsDefault ); // working copy of default colors

	GBX.surfaceTypes  = Object.keys( GBX.colors );


	// loads any xml file - from AJAX, file reader or location hash or wherever

	GBX.parseFileXML = function( text ) {
		//console.log( 'text', text );

		GBX.text = text;
		const parser = new window.DOMParser();

		GBX.gbxml = parser.parseFromString( text, 'text/xml' );
		//console.log( 'GBX.gbxml', GBX.gbxml );

		GBX.gbjson = GBX.getXML2jsobj( GBX.gbxml.documentElement );
		//console.log( 'GBX.gbjson', GBX.gbjson );

		GBX.surfacesJson = GBX.gbjson.Campus.Surface;

		GBX.surfaceMeshes = new THREE.Group();
		GBX.surfaceMeshes.name = 'GBX.surfaceMeshes';
		GBX.surfaceMeshes.add( ...GBX.getSurfaceMeshes() );

		GBX.surfaceEdges = new THREE.Group();
		GBX.surfaceEdges.name = 'GBX.surfaceEdges';
		GBX.surfaceEdges.add( ...GBX.getSurfaceEdges() );

		GBX.surfaceOpenings = new THREE.Group();
		GBX.surfaceOpenings.name = 'GBX.surfaceOpenings';
		GBX.surfaceOpenings.add( ...GBX.getOpenings() );

		return [ GBX.surfaceMeshes, GBX.surfaceEdges, GBX.surfaceOpenings ];

	};



	GBX.getStringFromXml = function( xml ){
		// test in console : GBX.getStringFromXml( GBX.gbxml );

		const string = new XMLSerializer().serializeToString( xml );
		console.log( 'string', string );

		return string;

	}



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

		const surfaces = GBX.surfacesJson; // gbjson.Campus.Surface;
		const surfaceMeshes = [];

		for ( let surface of surfaces ) {

			const holes = [];
			let openings = surface.Opening;

			if ( openings ) {

				openings = Array.isArray( openings ) ? openings : [ openings ];

				for ( let opening of openings ) {

					const polyloop = opening.PlanarGeometry.PolyLoop;
					const vertices = GBX.getVertices( polyloop );
					holes.push( vertices );

				}

			}

			const polyloop = surface.PlanarGeometry.PolyLoop;
			const vertices = GBX.getVertices( polyloop );
			const color = GBX.colors[ surface.surfaceType ] ? GBX.colors[ surface.surfaceType ] : GBX.colors.Undefined
			const material = new THREE.MeshPhongMaterial( {
				color: color, side: 2, opacity: 0.85, transparent: true } );

			const shape = GBX.get3dShape( vertices, material, holes );
			shape.userData.data = surface;
			shape.castShadow = shape.receiveShadow = true;
			surfaceMeshes.push( shape );

		}

		return surfaceMeshes;

	};



	GBX.getSurfaceEdges = function() {


		const surfaceEdges = [];
		const lineMaterial = new THREE.LineBasicMaterial( { color: 0x888888 } );

		for ( let mesh of GBX.surfaceMeshes.children ) {

			mesh.userData.edges = mesh;
			const edgesGeometry = new THREE.EdgesGeometry( mesh.geometry );
			const surfaceEdge = new THREE.LineSegments( edgesGeometry, lineMaterial );
			surfaceEdge.rotation.copy( mesh.rotation );
			surfaceEdge.position.copy( mesh.position );
			surfaceEdges.push( surfaceEdge );

		}

		return surfaceEdges;

	};



	GBX.getOpenings = function() {

		const surfaceOpenings = [];
		const material = new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.5, side: 2, transparent: true } );

		for ( let surfJson of GBX.surfacesJson ) {

			let openings = surfJson.Opening ? surfJson.Opening : [];
			openings = Array.isArray( openings ) ? openings : [ openings ];

			for ( let opening of openings ) {

				const points = GBX.getVertices( opening.PlanarGeometry.PolyLoop );
				const shapeMesh = GBX.get3dShape( points, material );
				shapeMesh.userData.data = opening;
				surfaceOpenings.push( shapeMesh );

			}

		}

		return surfaceOpenings;

	};



	GBX.getVertices = function( polyloop ) {

		const points = polyloop.CartesianPoint.map( CartesianPoint => new THREE.Vector3().fromArray( CartesianPoint.Coordinate ) );
		return points;

	};



	GBX.get3dShape = function( vertices, material, holes = [] ) {

		// 2018-06-02

		const plane = GBX.getPlane( vertices );

		const referenceObject = new THREE.Object3D();
		referenceObject.lookAt( plane.normal ); // copy the rotation of the plane
		referenceObject.quaternion.conjugate(); // figure out the angle it takes to rotate the vertices so they lie on the XY plane
		referenceObject.updateMatrixWorld();

		vertices.map( vertex => referenceObject.localToWorld( vertex ) );

		const holeVertices = [];

		for ( let verticesHoles of holes ) {

			verticesHoles.map( vertex => referenceObject.localToWorld( vertex ) );

			const hole = new THREE.Path();
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

	};



	GBX.getPlane = function( points, start = 0 ) {

		const triangle = new THREE.Triangle();
		triangle.set( points[ start ], points[ start + 1 ], points[ start + 2 ] );
		GBX.plane = triangle.getPlane( new THREE.Plane() );

		if ( triangle.getArea() === 0 ) { // looks like points are colinear therefore try next set

			start++;
			GBX.getPlane( points, start );

		}

		return GBX.plane;

	}


	//////////

	GBX.setCardToggleVisibility = function( target, log ) {

		target.innerHTML =

		`<div>

			<button class="btn-secondary btn-sm" onclick="GBX.surfaceMeshes.visible=!GBX.surfaceMeshes.visible;"
				title="toggle the flat bits" >surfaces</button>

			<button class="btn-secondary btn-sm" onclick="GBX.surfaceEdges.visible=!GBX.surfaceEdges.visible;" title="toggle the side lines" >edges</button>

			<button class="btn-secondary btn-sm" onclick="GBX.surfaceOpenings.visible=!GBX.surfaceOpenings.visible;" title="toggle the windows" >openings</button>

			<button class="btn-secondary btn-sm" onclick="GBX.setAllVisible();"
			title="toggle the windows" >all</button>
			|
			<button class="btn-secondary btn-sm"
				onclick="GBX.setAllVisible();THR.zoomObjectBoundingSphere(GBX.surfaceEdges);"
				title="Go to the home view" >reset view</button>
		</div>`;

	}



	GBX.setAllVisible = function() {

		GBX.surfaceEdges.visible = true;
		GBX.surfaceMeshes.visible = true;
		//GBX.surfaceOpenings.visible = true;

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

		document.body.style.backgroundImage = '';

		CORdivLog.innerHTML = "";

	};


