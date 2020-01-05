

var PHJ = {};

PHJ.group = undefined;

PHJ.processJson = function () {

	scene.remove( PHJ.group )

	PHJ.group = new THREE.Group();

	rooms = GLF.json.rooms;

	for ( room of rooms ) {

		faces = room.faces;

		for ( face of faces ) {

			boundary = face.geometry.boundary;

			// for ( point of boundary ) {

			// 	console.log( 'point', point );
			// }


			const vertices = boundary.map( point => new THREE.Vector3().fromArray( point ) );

			console.log( 'vertices', vertices );

			shape = PHJ.addShape3d( vertices );

			PHJ.group.add( shape );

		}
	}

	scene.add( PHJ.group );

};




PHJ.addShape3d = function( vertices ) {

	const triangle = new THREE.Triangle( vertices[ 2 ], vertices[ 1 ], vertices[ 0 ] );
	const normal = triangle.getNormal( new THREE.Vector3() );
	const baseNormal = new THREE.Vector3( 0, 0, 1 );
	const quaternion = new THREE.Quaternion().setFromUnitVectors( normal, baseNormal );

	const tempPoints = vertices.map( vertex => vertex.clone().applyQuaternion( quaternion ) );
	const shape = new THREE.Shape( tempPoints );
	const shapeGeometry = new THREE.ShapeGeometry( shape );
	shapeGeometry.vertices = vertices;

	const material = new THREE.MeshNormalMaterial( { side: THREE.DoubleSide, wireframe: false } )

	const mesh = new THREE.Mesh( shapeGeometry, material );
	//scene.add( mesh );

	return mesh;

}