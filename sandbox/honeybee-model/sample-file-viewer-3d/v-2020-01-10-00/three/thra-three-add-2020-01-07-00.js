
const THRA = {};

THRA.init = function () {

	window.addEventListener( "threeonload", THRA.addThings, false );

};



THRA.addThings = function () {

	//console.log( '', 23 );

	THRA.addLights();

	//addMesh();
}


THRA.addLights = function() {

	const scene = THR.scene;
	const camera = THR.camera;


	//scene.add( new THREE.AmbientLight( 0x404040 ) );
	scene.add( new THREE.AmbientLight( 0x666666 ) );

	const pointLight = new THREE.PointLight( 0xffffff, 0.5 );
	pointLight.position.copy( camera.position );
	camera.add( pointLight );

	const light = new THREE.DirectionalLight( 0xdfebff, 0.5 );
	light.position.set( -5, -20, 10 );
	light.castShadow = true;
	light.shadow.mapSize.width = 1024;
	light.shadow.mapSize.height = 1024;

	var d = 20;
	light.shadow.camera.left = - d;
	light.shadow.camera.right = d;
	light.shadow.camera.top = d;
	light.shadow.camera.bottom = - d;
	light.shadow.camera.far = 5 * d;
	scene.add( light );

	//scene.add( new THREE.CameraHelper( light.shadow.camera ) );

}


function addMesh( size = 20 ) {

	// CylinderGeometry( radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded )
	// SphereGeometry( radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength )
	// TorusGeometry( radius, tube, radialSegments, tubularSegments, arc )

	const geometry = new THREE.BoxGeometry( size, size, size );

	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -0.5 * Math.PI ) );
	geometry.applyMatrix( new THREE.Matrix4().makeScale( 1, 1, 1 ) );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );

	//const material = new THREE.MeshNormalMaterial();
	const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), specular: 0xffffff } );
	mesh = new THREE.Mesh( geometry, material );
	mesh.receiveShadow = true;
	mesh.castShadow = true;
	THR.scene.add( mesh );

	return mesh;

}



function addMeshes( count = 100 ) {

	THR.scene.remove( meshGroup );

	meshGroup = new THREE.Group();

	for ( let i = 0; i < count; i++ ) { meshGroup.add( addMesh() ) };

	meshGroup.children.forEach( mesh => {
		mesh.position.set( Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50 )
		mesh.rotation.set( 0.2 * Math.random(), 0.2 * Math.random(), 0.2 * Math.random() )
	} );

	THR.scene.add( meshGroup );

}


THRA.init();