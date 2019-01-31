// Copyright 2018 Ladybug Tools authors. MIT License
// jshint esversion: 6
/* globals THREE, THR, THRU, FIL, GBXU */

var GBX = { "release": "R2.0", "date": "2019-01-30" };


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

GBX.colors = Object.assign( {}, GBX.colorsDefault ); // create working copy of default colors

GBX.surfaceTypes  = Object.keys( GBX.colors );

GBX.referenceObject = new THREE.Object3D();
GBX.triangle = new THREE.Triangle(); // used by GBX.getPlane

//GBX.materialType = THR.scene.getObjectByName( 'lightAmbient') ? THREE.MeshPhongMaterial : THREE.MeshBasicMaterial;
GBX.materialType = THREE.MeshBasicMaterial;


function requestFile( url ) {

	xhr = new XMLHttpRequest();
	xhr.open( 'GET', url, true );
	xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
	//xhr.onprogress = function( xhr ) { console.log(  'bytes loaded: ' + xhr.loaded.toLocaleString() ) }; /// or something
	xhr.onload = function( xhr ) { parseText( xhr.target.response ); }
	xhr.send( null );

};



function openFile ( files ) {

	const file = files.files[ 0 ];
	const reader = new FileReader();

	reader.onload = function( event ) {

		parseText( reader.result );

	}

	reader.readAsText( file );

}



function parseText( text ) {

	if ( text.length === 0) { alert( "no work here!"); return; }

	if ( chkAddData.checked === false ) {

		scene.remove( project );

		project = new THREE.Group();

		scene.add( project );

	}

	const building = new THREE.Group();

	const lines = text.split(/\r\n|\n/).slice( 0, -1 );

	for ( line of lines ) {
		//console.log( 'line', line );

		const jsonl = JSON.parse( line );
		//console.log( 'jsonl', jsonl.coordinates );

		if ( jsonl.coordinates ) {

			surface = drawLine( jsonl.coordinates );
			//console.log( '', surface );
			building.add( surface );

			mesh = GBX.getSurfaceMesh( jsonl );
			building.add( mesh );

		}


	}

	project.add( building )

	//console.log( 'jsonl', jsonl );

	zoomObjectBoundingSphere( project );

}



function zoomObjectBoundingSphere( obj = scene ) {
	//console.log( 'obj', obj );

	const bbox = new THREE.Box3().setFromObject( obj );
	//console.log( 'bbox', bbox );

	if ( bbox.isEmpty() === true ) { return; }

	//if ( isNaN( bbox.max.x - bbox.min.x ) ) { console.log( 'zoom fail', {obj},{bbox} ); return; } // is there a better way of seeing if we have a good bbox?

	const sphere = bbox.getBoundingSphere( new THREE.Sphere() );
	const center = sphere.center;
	const radius = sphere.radius;

	//controls.reset();
	controls.target.copy( center ); // needed because model may be far from origin
	controls.maxDistance = 5 * radius;

	camera.position.copy( center.clone().add( new THREE.Vector3( 1.5 * radius, 1.5 * radius, 1.5 * radius ) ) );
	camera.near = 0.1 * radius; //2 * camera.position.length();
	camera.far = 10 * radius; //2 * camera.position.length();
	camera.updateProjectionMatrix();


	if ( axesHelper ) {

		axesHelper.scale.set( radius, radius, radius );
		axesHelper.position.copy( center);

	}

};



function drawLine( coordinates ) {
	//console.log( 'coordinates', coordinates );

	const vertices = [];

	for ( let i = 0; i < coordinates.length; i += 3 ) {

		vertex = new THREE.Vector3().fromArray( coordinates.slice( i, i + 3) );
		//console.log( 'vertex', vertex );

		vertices.push( vertex );

	}

	vertices.push( vertices[ 0 ] );

	const geometry = new THREE.Geometry();
	geometry.vertices = vertices;
	const material = new THREE.LineBasicMaterial( { color: 0x000000 } );
	const line = new THREE.Line( geometry, material );

	return line;

}




GBX.getSurfaceMesh = function( jsonl ) {
	//console.log( 'jsonl', jsonl );

	const string = jsonl.attributes.surfaceType;

	const color = new THREE.Color( GBX.colorsDefault[ string ] );
	//console.log( 'color', color );

	const arr = jsonl.coordinates;

	const v = ( arr ) => new THREE.Vector3().fromArray( arr );

	let vertices, mesh;

	if ( arr.length < 6 ) {

		console.log( 'arr', arr );
		return;

	} else if ( arr.length < 9 ) {
		//console.log( 'arr', arr );

		// draw a line?
		vertices = [ v( arr.slice( 0, 3 ) ), v( arr.slice( 3, 6 ) ), v( arr.slice( 0, 3 ) ) ];
		//console.log( 'vertices', vertices );

		mesh = GBX.getBufferGeometry( vertices, color );

		return;

	} else if ( arr.length === 9 ) {

		vertices = [ v( arr.slice( 0, 3 ) ), v( arr.slice( 3, 6 ) ), v( arr.slice( 6 ) ) ];

		mesh = GBX.getBufferGeometry( vertices, color );

	} else if ( arr.length === 12 ) {

		vertices = [

			v( arr.slice( 0, 3 ) ), v( arr.slice( 3, 6 ) ), v( arr.slice( 6, 9 ) ),
			v( arr.slice( 9, 12 ) ), v( arr.slice( 6, 9 ) ), v( arr.slice( 0, 3 ) )

		];

		mesh = GBX.getBufferGeometry( vertices, color );

	} else {

		vertices = [];

		for ( let i = 0; i < ( arr.length / 3 ); i ++ ) {

			vertices.push( v( arr.slice( 3 * i, 3 * i + 3 ) ) );

		}

		mesh = GBX.setPolygon( vertices, color );

	}

	return mesh;


};



GBX.getBufferGeometry = function( vertices, color ) {
	//console.log( 'vertices', vertices, color );

	const geometry = new THREE.BufferGeometry();
	geometry.setFromPoints( vertices );

	geometry.computeVertexNormals();
	const material = new GBX.materialType( { color: color, opacity: 0.85, side: 2, transparent: true });

	const mesh = new THREE.Mesh( geometry, material );

	return mesh;

};



GBX.setPolygon = function( vertices, color, holes = [] ) {
	//console.log( { vertices } );

	//assume vertices are coplanar but at an arbitrary rotation and position in space
	const plane = GBX.getPlane( vertices );

	// rotate vertices to lie on XY plane
	GBX.referenceObject.lookAt( plane.normal ); // copy the rotation of the plane
	GBX.referenceObject.quaternion.conjugate(); // figure out the angle it takes to rotate the vertices so they lie on the XY plane
	GBX.referenceObject.updateMatrixWorld();

	const verticesFlat = vertices.map( vertex => GBX.referenceObject.localToWorld( vertex ) );
	//console.log( { verticesFlat } );

	/*
	for ( let verticesHoles of holes ) {

		verticesHoles.forEach( vertex => GBX.referenceObject.localToWorld( vertex ) );

	}

	holes.forEach( verticesHoles => verticesHoles.forEach( vertex => GBX.referenceObject.localToWorld( vertex ) ) );
	*/

	// vertices must be coplanar with the XY plane for Earcut.js to triangulate a set of points
	const triangles = THREE.ShapeUtils.triangulateShape( verticesFlat, holes );
	//console.log( { triangles } );

	const verticesAll = vertices.slice( 0 ).concat( ...holes );
	//console.log( 'verticesAll', verticesAll );

	const verticesTriangles = [];

	for ( let triangle of triangles ) {

		for ( let j = 0; j < 3; j++ ) {

			const vertex = verticesAll[ triangle[ j ] ];

			verticesTriangles.push( vertex );

		}

	}
	//console.log( { verticesTriangles } );

	const geometry = new THREE.BufferGeometry();
	geometry.setFromPoints( verticesTriangles );
	geometry.computeVertexNormals();

	const material = new GBX.materialType( { color: color, opacity: 0.85, side: 2, transparent: true } );

	const mesh = new THREE.Mesh( geometry, material );
	mesh.lookAt( plane.normal );

	return mesh;

};



GBX.getPlane = function( points, start = 0 ) {
	//console.log( 'points', points, start );

	GBX.triangle.set( points[ start ], points[ start + 1 ], points[ start + 2 ] );

	if ( GBX.triangle.getArea() === 0 && ( ++start < points.length - 2 ) ) { // looks like points are colinear and do not form a plane therefore try next set of points

		GBX.getPlane( points, start );

	}

	return GBX.triangle.getPlane( new THREE.Plane() );

};

