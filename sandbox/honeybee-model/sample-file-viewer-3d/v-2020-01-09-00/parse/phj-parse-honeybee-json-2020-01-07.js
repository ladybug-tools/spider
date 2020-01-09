

var PHJ = {};

PHJ.group = undefined;


PHJ.init = function () {


	window.addEventListener( "onloadglf", PHJ.processJson, false );

};


PHJ.processJson = function () {

	colors = {

	Wall: "beige",
	Floor: "brown",
	RoofCeiling: "red"
}


	THR.scene.remove( PHJ.group )

	PHJ.group = new THREE.Group();

	rooms = GFL.json.rooms || [];

	for ( room of rooms ) {

		faces = room.faces;

		for ( face of faces ) {

			//console.log( '', face.face_type );
			boundary = face.geometry.boundary;

			// for ( point of boundary ) {

			// 	console.log( 'point', point );
			// }


			const vertices = boundary.map( point => new THREE.Vector3().fromArray( point ) );
			//console.log( 'vertices', vertices );

			const shape = PHJ.addShape3d( vertices );

			const color = colors[ face.face_type ]
			//console.log( 'col', face.face_type, color );

			shape.material.color = new THREE.Color( color )
			shape.material.needsUpdate = true;

			const geometry = shape.geometry;
			geometry.verticesNeedUpdate = true;
			geometry.elementsNeedUpdate = true;
			geometry.morphTargetsNeedUpdate = true;
			geometry.uvsNeedUpdate = true;
			geometry.normalsNeedUpdate = true;
			geometry.colorsNeedUpdate = true;
			geometry.tangentsNeedUpdate = true;

			PHJ.group.add( shape );

		}
	}

	THR.scene.add( PHJ.group );

	THR.zoomObjectBoundingSphere( PHJ.group );

};




PHJ.addShape3d = function ( vertices ) {

	const triangle = new THREE.Triangle( vertices[ 2 ], vertices[ 1 ], vertices[ 0 ] );
	const normal = triangle.getNormal( new THREE.Vector3() );
	const baseNormal = new THREE.Vector3( 0, 0, 1 );
	const quaternion = new THREE.Quaternion().setFromUnitVectors( normal, baseNormal );

	const tempPoints = vertices.map( vertex => vertex.clone().applyQuaternion( quaternion ) );
	const shape = new THREE.Shape( tempPoints );
	const shapeGeometry = new THREE.ShapeGeometry( shape );
	shapeGeometry.vertices = vertices;

	//const material = new THREE.MeshNormalMaterial( { opacity: 0.7, side: THREE.DoubleSide, transparent: true, wireframe: false } );
	const material = new THREE.MeshPhongMaterial( { opacity: 0.9, side: THREE.DoubleSide, transparent: true, wireframe: false } );

	const mesh = new THREE.Mesh( shapeGeometry, material );
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	//scene.add( mesh );

	return mesh;

};

PHJ.init();