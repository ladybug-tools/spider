// copyright 2020 Theo Armour. MIT license.
/* global THREE, THR, JTV */
// jshint esversion: 6
// jshint loopfunc: true


var PJD = {};


PJD.init = function () {

	//window.addEventListener( "onloadJson", PJD.processJson, false );

};


PJD.processJson = function () {

	const colors = {

		Wall: "beige",
		Floor: "brown",
		RoofCeiling: "red",

	};


	THR.scene.remove( THR.group );

	THR.group = new THREE.Group();

	const stories = JTV.json.unique_stories || [];

	console.log( 'stories', stories );
	let id = 0;

	let height = 0;
	
	for ( let storey of stories ) {


		const rooms = storey.room_2ds;

		//if ( room.indoor_shades ) { PJD.parseShades( room.indoor_shades ); }

		for ( let room of rooms ) { //console.log( '', face.face_type );

			//const openings = [];

			const boundary = room.floor_boundary;

			console.log( 'boundary', boundary );

			const vertices = boundary.map( point => new THREE.Vector2().fromArray( point ) );

			// const color = colors[ face.face_type ];


			const shape = PJD.addShape2d( vertices );

			// shape.name = face.display_name
			// shape.userData.id = id++;


			shape.position.z = height * 3


			THR.group.add( shape );

		}

		height++;
	}

	THR.scene.add( THR.group );

	//THR.zoomObjectBoundingSphere( THR.group );

	//THRV.zoomToFitObject( THR.group );

};





PJD.addShape2d = function ( vertices ) {

	const shape = new THREE.Shape( vertices );

	const shapeGeometry = new THREE.ShapeGeometry( shape );

	//console.log( 'shapeGeometry', shapeGeometry );

	//const material = new THREE.MeshNormalMaterial( { opacity: 0.7, side: THREE.DoubleSide, transparent: true, wireframe: false } );
	const material = new THREE.MeshPhongMaterial( { color: 0xff00ff, opacity: 0.9, side: THREE.DoubleSide, transparent: true, wireframe: false } );

	const mesh = new THREE.Mesh( shapeGeometry, material );

	// // needed when you want textures to fit the mesh nicely
	// const box = new THREE.Box3().setFromObject( mesh );
	// const size = new THREE.Vector3();
	// box.getSize( size );

	// mesh.geometry.faceVertexUvs[ 0 ].forEach( fvUvs => {

	// 	fvUvs.forEach( fvUv => {
	// 		fvUv.x = ( fvUv.x - box.min.x ) / size.x; fvUv.y = 1 - ( fvUv.y - box.min.y ) / size.y;
	// 	} );

	// } );

	// mesh.geometry.vertices = vertices;

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



PJD.getTempVertices = function ( vertices ) {

	const triangle = new THREE.Triangle( vertices[ 2 ], vertices[ 1 ], vertices[ 0 ] );
	const normal = triangle.getNormal( new THREE.Vector3() );
	const baseNormal = new THREE.Vector3( 0, 0, 1 );
	const quaternion = new THREE.Quaternion().setFromUnitVectors( normal, baseNormal );

	const tempVertices = vertices.map( vertex => vertex.clone().applyQuaternion( quaternion ) );

	//console.log( 'tempVertices', tempVertices );

	return tempVertices;

};


PJD.init();