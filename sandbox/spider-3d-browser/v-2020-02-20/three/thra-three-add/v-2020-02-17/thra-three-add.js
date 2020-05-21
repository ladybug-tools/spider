// copyright 2020 Theo Armour. MIT license.
// See pushme-pullyou/templates-01/
// 2020-02-17
/* globals aSource, imgIcon, sTitle, sVersion, divContent, divDescription, expandButton, navMenu, THR */
// jshint esversion: 6
// jshint loopfunc: true


const THRA = {};


THRA.init = function () {

	window.addEventListener( "onloadthree", THRA.onLoad, false );

};



THRA.onLoad = function () {

	THRA.addLights();

};



THRA.addLights = function () {

	const scene = THR.scene;
	const camera = THR.camera;

	scene.add( new THREE.AmbientLight( 0x888888 ) );
	//scene.add( new THREE.AmbientLight( 0x666666 ) );

	const pointLight = new THREE.PointLight( 0xffffff, 0.1 );
	pointLight.position.copy( camera.position );
	camera.add( pointLight );

	const lightDirectional = new THREE.DirectionalLight( 0xdfebff, 0.7 );
	lightDirectional.position.set( -50, -200, 100 );
	lightDirectional.castShadow = true;
	lightDirectional.shadow.mapSize.width = 1024;
	lightDirectional.shadow.mapSize.height = 1024;

	var d = 100;
	lightDirectional.shadow.camera.left = - d;
	lightDirectional.shadow.camera.right = d;
	lightDirectional.shadow.camera.top = d;
	lightDirectional.shadow.camera.bottom = - d;
	lightDirectional.shadow.camera.far = 5 * d;
	scene.add( lightDirectional );

	THR.lightDirectional = lightDirectional;

	scene.add( new THREE.CameraHelper( lightDirectional.shadow.camera ) );

};


THRA.addMesh = function ( size = 20 ) {

	// CylinderGeometry( radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded )
	// SphereGeometry( radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength )
	// TorusGeometry( radius, tube, radialSegments, tubularSegments, arc )

	const geometry = new THREE.BoxGeometry( size, size, size );

	geometry.applyMatrix4( new THREE.Matrix4().makeRotationX( -0.5 * Math.PI ) );
	geometry.applyMatrix4( new THREE.Matrix4().makeScale( 1, 1, 1 ) );
	geometry.applyMatrix4( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );

	//const material = new THREE.MeshNormalMaterial();
	const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), specular: 0xffffff } );
	mesh = new THREE.Mesh( geometry, material );

	return mesh;

};



THRA.addMeshes = function ( count = 100 ) {

	THR.scene.remove( THR.group );

	THR.group = new THREE.Group();

	for ( let i = 0; i < count; i++ ) { THR.group.add( THRA.addMesh() ); };

	THR.group.children.forEach( mesh => {

		mesh.position.set( Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50 );
		mesh.rotation.set( 0.2 * Math.random(), 0.2 * Math.random(), 0.2 * Math.random() );
		mesh.receiveShadow = true;
		mesh.castShadow = true;

	} );

	THR.scene.add( THR.group );

	return THR.group;

};



THRA.init();