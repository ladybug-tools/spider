/* global THREE, divContents */
// jshint esversion: 6
// jshint loopfunc: true

let mesh, meshGroup;
let THR = {};

THR.sceneRotation = 1;

THR.init = function() {

	const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( - 100, - 100, 100 );
	camera.up.set( 0, 0, 1 );

	const scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xcce0ff );
	scene.fog = new THREE.Fog( 0xcce0ff, 9999, 999999 );
	scene.add( camera );

	const renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	const controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.maxDistance = 500;
	controls.rotateSpeed = 2;
	//controls.maxPolarAngle = Math.PI * 0.5;


	window.addEventListener( 'resize', THR.onWindowResize, false );
	window.addEventListener( 'orientationchange', THR.onWindowResize, false );

	window.addEventListener( 'keyup', () => THR.sceneRotation = 0, false );
	renderer.domElement.addEventListener( 'click', () => THR.sceneRotation = 0, false );

	THR.camera = camera; THR.scene = scene; THR.renderer = renderer; THR.controls = controls;


	//THRT.toggleAxesHelper()

	//addGround();
	//THRT.toggleGroundHelper()


	let event = new Event( "threeonload", {"bubbles": true, "cancelable": false, detail: true } );

	window.dispatchEvent( event );

}



THR.zoomObjectBoundingSphere = function ( obj = mesh ) {
	//console.log( "obj", obj );

	const bbox = new THREE.Box3().setFromObject( obj );
	//console.log( "bbox", bbox )

	if ( bbox.isEmpty() === true ) { return; }

	const sphere = bbox.getBoundingSphere( new THREE.Sphere() );
	center = sphere.center;
	radius = sphere.radius;

	THR.controls.target.copy( center ); // needed because model may be far from origin
	THR.controls.maxDistance = 10 * radius;

	THR.camera.position.copy( center.clone().add( new THREE.Vector3( - 1.5 * radius, - 1.5 * radius, 1.5 * radius ) ) );
	THR.camera.near = 0.001 * radius; //2 * camera.position.length();
	THR.camera.far = 20 * radius; //2 * camera.position.length();
	THR.camera.updateProjectionMatrix();

};


THR.onWindowResize = function () {

	THR.camera.aspect = window.innerWidth / window.innerHeight;
	THR.camera.updateProjectionMatrix();

	THR.renderer.setSize( window.innerWidth, window.innerHeight );

	//THR.controls.handleResize();

	//console.log( 'onWindowResize  window.innerWidth', window.innerWidth );

};



THR.animate = function() {

	requestAnimationFrame( THR.animate );
	THR.renderer.render( THR.scene, THR.camera );
	THR.controls.update();
	THR.scene.rotation.z += THR.sceneRotation / 1000;

}