// copyright 2020 Theo Armour. MIT license.
/* global THREE, THR, JTV */
// jshint esversion: 6
// jshint loopfunc: true


var PJH = {};


PJH.init = function () {

	//window.addEventListener( "onloadJson", PJH.processJson, false );

};


PJH.processJson = function () {

	const colors = {

		Wall: "beige",
		Floor: "brown",
		RoofCeiling: "red",

	};


	THR.scene.remove( THR.group );

	THR.group = new THREE.Group();

	const rooms = JTV.json.rooms || [];

	let id = 0;

	for ( let room of rooms ) {

		const faces = room.faces;

		if ( room.indoor_shades ) { PJH.parseShades( room.indoor_shades ); }

		for ( let face of faces ) { //console.log( '', face.face_type );

			const openings = [];

			const boundary = face.geometry.boundary;

			const vertices = boundary.map( point => new THREE.Vector3().fromArray( point ) );

			const apertures = face.apertures;

			if ( apertures ) { openings.push( ...apertures ); }

			const doors = face.doors;

			if ( doors ) { openings.push( ...doors ); }

			if ( face.indoor_shades ) { PJH.parseShades( face.indoor_shades ); }

			if ( face.outdoor_shades ) { PJH.parseShades( face.outdoor_shades ); }

			const color = colors[ face.face_type ];

			const holes = PJH.parseApertures( openings );

			const shape = PJH.addShape3d( vertices, holes, color );

			shape.name = face.display_name
			shape.userData.id = id++;

			THR.group.add( shape );

		}

	}

	if ( JTV.json.orphaned_shades ) { PJH.parseShades( JTV.json.orphaned_shades ); }

	THR.scene.add( THR.group );

	//THR.zoomObjectBoundingSphere( THR.group );

	//THRV.zoomToFitObject( THR.group );

};




PJH.parseApertures = function ( apertures ) {

	const holes = [];

	for ( let aperture of apertures ) {

		const boundary = aperture.geometry.boundary;

		const vertices = boundary.map( point => new THREE.Vector3().fromArray( point ) );

		const tempVerticesHoles = PJH.getTempVertices( vertices );
		//console.log( 'tempVerticesHoles', tempVerticesHoles );

		const path = new THREE.Path( tempVerticesHoles );
		//path.setFromPoints( vertices2d );

		//console.log( 'path', path, vertices );
		holes.push( { path, vertices } );

	}

	return holes;

};


PJH.parseShades = function ( shades ) {

	for ( let shade of shades ) {

		const boundary = shade.geometry.boundary;

		const vertices = boundary.map( point => new THREE.Vector3().fromArray( point ) );

		const shape = PJH.addShape3d( vertices, [], "darkgray" );

		THR.group.add( shape );

	}

};



PJH.addShape3d = function ( vertices, holes, color ) {

	const tempVertices = PJH.getTempVertices( vertices );
	const shape = new THREE.Shape( tempVertices );

	if ( holes.length ) {

		holes.forEach( hole => {

			shape.holes.push( hole.path );
			vertices = vertices.concat( hole.vertices.reverse() );
			//console.log( 'vertices', vertices );

		} );

	}

	const shapeGeometry = new THREE.ShapeGeometry( shape );

	//console.log( 'shapeGeometry', shapeGeometry );

	//const material = new THREE.MeshNormalMaterial( { opacity: 0.7, side: THREE.DoubleSide, transparent: true, wireframe: false } );
	const material = new THREE.MeshPhongMaterial( { color: color, opacity: 0.9, side: THREE.DoubleSide, transparent: true, wireframe: false } );

	const mesh = new THREE.Mesh( shapeGeometry, material );

	// needed when you want textures to fit the mesh nicely
	const box = new THREE.Box3().setFromObject( mesh );
	const size = new THREE.Vector3();
	box.getSize( size );

	mesh.geometry.faceVertexUvs[ 0 ].forEach( fvUvs => {

		fvUvs.forEach( fvUv => {
			fvUv.x = ( fvUv.x - box.min.x ) / size.x; fvUv.y = 1 - ( fvUv.y - box.min.y ) / size.y;
		} );

	} );

	mesh.geometry.vertices = vertices;

	mesh.castShadow = true;
	mesh.receiveShadow = true;

	mesh.geometry.computeVertexNormals();
	mesh.geometry.computeFaceNormals();
	mesh.geometry.computeBoundingBox();
	//mesh.geometry.computeBoundingSphere();
	mesh.updateMatrixWorld();

	//scene.add( mesh );

	return mesh;

};



PJH.getTempVertices = function ( vertices ) {

	const triangle = new THREE.Triangle( vertices[ 2 ], vertices[ 1 ], vertices[ 0 ] );
	const normal = triangle.getNormal( new THREE.Vector3() );
	const baseNormal = new THREE.Vector3( 0, 0, 1 );
	const quaternion = new THREE.Quaternion().setFromUnitVectors( normal, baseNormal );

	const tempVertices = vertices.map( vertex => vertex.clone().applyQuaternion( quaternion ) );

	//console.log( 'tempVertices', tempVertices );

	return tempVertices;

};


PJH.init();