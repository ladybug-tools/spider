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

	GBX.surfacesJson = GBX.gbjson.Campus.Surface;

	GBX.surfaceEdges = new THREE.Object3D();
	GBX.surfaceEdges.name = 'GBX.surfaceEdges';

	GBX.surfaceMeshes = GBX.getSurfaceMeshes( GBX.gbjson );

	GBX.surfaceOpenings  = GBX.getOpenings();

	return [ GBX.surfaceMeshes, GBX.surfaceEdges, GBX.surfaceOpenings ];

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

	const surfaces = GBX.surfacesJson; // gbjson.Campus.Surface;
	const holeVertices = [];
	const shapeVertices = [];

	for ( let surface of surfaces ) {

		const verticesGroup = [];

		if ( surface.Opening ) {

			surface.Opening = Array.isArray( surface.Opening ) ? surface.Opening : [ surface.Opening ];

			for ( let opening of surface.Opening ) {

				const polyloop = opening.PlanarGeometry.PolyLoop;
				const vertices = GBX.getPoints( polyloop );
				verticesGroup.push( vertices );

			}

		}

		holeVertices.push( verticesGroup );

		const polyloop = surface.PlanarGeometry.PolyLoop;
		const vertices = GBX.getPoints( polyloop );
		shapeVertices.push( vertices );

	}

	let surfaceMeshes = new THREE.Object3D();
	surfaceMeshes.name = 'GBX.surfaceMeshes';

	for ( let i = 0; i < shapeVertices.length; i++ ) {

		const material = new THREE.MeshPhongMaterial( {
			color: GBX.colors[ surfaces[ i ].surfaceType ], side: 2, opacity: 0.85, transparent: true } );

		const shape = GBX.getShape( shapeVertices[ i ], material, holeVertices[ i ] );

		shape.userData.data = surfaces[ i ];
		shape.castShadow = shape.receiveShadow = true;
		surfaceMeshes.add( shape );

		// split into separate function
		const edgesGeometry = new THREE.EdgesGeometry( shape.geometry );
		const surfaceEdge = new THREE.LineSegments( edgesGeometry, new THREE.LineBasicMaterial( { color: 0x888888 } ) );
		surfaceEdge.rotation.copy( shape.rotation );
		surfaceEdge.position.copy( shape.position );
		GBX.surfaceEdges.add( surfaceEdge ); // or add to surfaces??

	}

	return surfaceMeshes;

};



GBX.getOpenings = function() {

	const surfaceOpenings = new THREE.Object3D();
	surfaceOpenings.name = 'GBX.surfaceOpenings';

	GBX.SurfacesWithOpenings = GBX.surfacesJson.filter( surface => surface.Opening );

	GBX.openingsJson = [];

	for ( let surface of GBX.SurfacesWithOpenings ) {

		surface.Opening = Array.isArray( surface.Opening ) ? surface.Opening : [ surface.Opening ];

		GBX.openingsJson.push ( ...surface.Opening );

	}

	const material = new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.5, side: 2, transparent: true } );

	for ( let opening of GBX.openingsJson ) {

		const points = GBX.getPoints( opening.PlanarGeometry.PolyLoop );

		const shapeMesh = GBX.getShape( points, material );
		surfaceOpenings.add( shapeMesh );

	}

	return surfaceOpenings;

};



GBX.getPoints = function( polyloop ) {

	const points = polyloop.CartesianPoint.map( CartesianPoint => new THREE.Vector3().fromArray( CartesianPoint.Coordinate ) );
	return points;

};



GBX.getShape = function( vertices, material, holes = [] ) {
	// split into two functions

	const plane = GBX.getPlane( vertices );

	const obj = new THREE.Object3D();
	obj.lookAt( plane.normal );  // copy the rotation of the triangle
	obj.quaternion.conjugate();
	obj.updateMatrixWorld();

	vertices.map( vertex => obj.localToWorld( vertex ) );

	const shape = new THREE.Shape( vertices );

	for ( let verticesHoles of holes ) {

		const hole = new THREE.Path();

		verticesHoles.map( vertex => obj.localToWorld( vertex ) );

		hole.setFromPoints( verticesHoles );

		shape.holes.push( hole );

	}

	const geometryShape = new THREE.ShapeGeometry( shape );

	const shapeMesh = new THREE.Mesh( geometryShape, material );
	shapeMesh.lookAt( plane.normal );
	shapeMesh.position.copy( plane.normal.multiplyScalar( - plane.constant ) );

	return shapeMesh;

};



GBX.getPlane = function( points, start = 0 ) {

	const triangle = new THREE.Triangle();
	triangle.set( points[ start ], points[ start + 1 ], points[ start + 2 ] );

	if ( triangle.getArea() === 0 ) { // points must be colinear therefore not usable

		start++;
		GBX.getPlane( points, start );

	}

	const pl = new THREE.Plane();
	GBX.plane = triangle.getPlane( pl ); // why global??

	return GBX.plane;

};


//////////

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

	document.body.style.backgroundImage = '';

};


GBX.toggleSurfacesVisible = function() {

	GBX.surfaceMeshes.visible=!GBX.surfaceMeshes.visible;

	GBX.surfaceMeshes.children.forEach( child => child.visible = GBX.surfaceMeshes.visible );

};