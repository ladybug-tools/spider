// copyright 2020 Theo Armour. MIT license.
/* global THREE, THR, GFL */
// jshint esversion: 6
// jshint loopfunc: true


var PHJ = {};

PHJ.group = undefined;


PHJ.init = function () {

	window.addEventListener( "onloadglf", PHJ.processJson, false );

};


PHJ.processJson = function () {

	const colors = {

		Wall: "beige",
		Floor: "brown",
		RoofCeiling: "red"

	};


	THR.scene.remove( PHJ.group );

	PHJ.group = new THREE.Group();

	const rooms = GFL.json.rooms || [];

	id = 0;

	for ( let room of rooms ) {

		const faces = room.faces;

		for ( let face of faces ) { //console.log( '', face.face_type );

			let holes;
			const boundary = face.geometry.boundary;

			const vertices = boundary.map( point => new THREE.Vector3().fromArray( point ) );


			const apertures = face.apertures;

			if ( apertures ) {

				//console.log( 'apertures', apertures.length );

				holes = PHJ.parseApertures( apertures );

				//console.log( 'holes', holes );


			}


			const doors = face.doors;

			if ( doors ) {

				console.log( 'doors', doors );

			}

			const indoorShades = face.indoor_shades;

			if ( indoorShades ) {

				console.log( 'indoorShades', indoorShades );

			}

			const outdoorShades = face.outdoor_shades;

			if ( outdoorShades ) {

				console.log( 'outdoorShades', outdoorShades );

			}

			const color = colors[ face.face_type ];

			const shape = PHJ.addShape3d( vertices, holes, color );

			shape.userData.id = id++;

			//shape.position.z = id;

			PHJ.group.add( shape );

		}

	}

	THR.scene.add( PHJ.group );

	THR.zoomObjectBoundingSphere( PHJ.group );

};


PHJ.parseApertures = function ( apertures ) {

	holes = [];

	for ( aperture of apertures ) {

		const boundary = aperture.geometry.boundary;

		const vertices = boundary.map( point => new THREE.Vector3().fromArray( point ) );

		const tempVerticesHoles = PHJ.getTempVertices( vertices );
		//console.log( 'tempVerticesHoles', tempVerticesHoles );

		const path = new THREE.Path(tempVerticesHoles );
		//path.setFromPoints( vertices2d );

		//console.log( 'path', path, vertices );
		holes.push( { path, vertices } );

	}

	return holes;

}

PHJ.addShape3d = function ( vertices, holes, color ) {

	tempVertices = PHJ.getTempVertices( vertices )
	const shape = new THREE.Shape( tempVertices );

	if ( holes ) {
		shape.holes.push( holes[ 0 ].path );
		vertices = vertices.concat( holes[ 0 ].vertices.reverse());
		//console.log( 'vertices', vertices );
	}

	const shapeGeometry = new THREE.ShapeGeometry( shape );

	//console.log( 'shapeGeometry', shapeGeometry );

	shapeGeometry.vertices = vertices;

	//const material = new THREE.MeshNormalMaterial( { opacity: 0.7, side: THREE.DoubleSide, transparent: true, wireframe: false } );
	const material = new THREE.MeshPhongMaterial( { color: color, opacity: 0.9, side: THREE.DoubleSide, transparent: true, wireframe: false } );

	const mesh = new THREE.Mesh( shapeGeometry, material );
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	//scene.add( mesh );

	return mesh;

};

PHJ.getTempVertices = function( vertices ) {

	const triangle = new THREE.Triangle( vertices[ 2 ], vertices[ 1 ], vertices[ 0 ] );
	const normal = triangle.getNormal( new THREE.Vector3() );
	const baseNormal = new THREE.Vector3( 0, 0, 1 );
	const quaternion = new THREE.Quaternion().setFromUnitVectors( normal, baseNormal );

	const tempVertices = vertices.map( vertex => vertex.clone().applyQuaternion( quaternion ) );

	//console.log( 'tempVertices', tempVertices );

	return tempVertices;

}


PHJ.init();