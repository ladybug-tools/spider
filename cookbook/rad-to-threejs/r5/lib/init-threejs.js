
let sceneRotation = 1;
let axesHelper, renderer, camera, controls, scene;


function initThreejs() {

	renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( - 100, - 100, 100 );
	camera.up.set( 0, 0, 1 );

	controls = new THREE.TrackballControls( camera, renderer.domElement );

	scene = new THREE.Scene();

	window.addEventListener( 'resize', onWindowResize, false );
	window.addEventListener( 'orientationchange', onWindowResize, false );
	window.addEventListener( 'keyup', () => sceneRotation = 0, false );
	renderer.domElement.addEventListener( 'click', () => sceneRotation = 0, false );

	axesHelper = new THREE.AxesHelper( 100 );
	scene.add( axesHelper );

	// useful debug snippet
	//const geometry = new THREE.BoxGeometry( 50, 50, 50 );
	//const material = new THREE.MeshNormalMaterial();
	//const mesh = new THREE.Mesh( geometry, material );
	//scene.add( mesh );

	animate();
}



function toggleWireframe() {

	scene.traverse( function ( child ) {

		if ( child instanceof THREE.Mesh ) {

			child.material.wireframe = !child.material.wireframe;

		}

	} );

}



function updateOpacity() {

	const opacity = parseInt( rngOpacity.value, 10 );
	outOpacity.value = opacity + '%';

	scene.traverse( function ( child ) {

		if ( child instanceof THREE.Mesh ) {

			child.material.opacity = opacity / 100;

		}

	} );

}



function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	//console.log( 'onWindowResize  window.innerWidth', window.innerWidth );

}




function zoomObjectBoundingSphere ( obj ) {
	//console.log( 'obj', obj );

	bbox = new THREE.Box3().setFromObject( obj );
	//console.log( 'bbox', bbox );

	if ( isNaN( bbox.max.x - bbox.min.x ) ) { console.log( 'zoom fail', {obj},{bbox} ); return; } // is there a better way of seeing if we have a good bbox?

	const sphere = bbox.getBoundingSphere( new THREE.Sphere() );
	const center = sphere.center;
	const radius = sphere.radius;

	controls.target.copy( center );
	controls.maxDistance = 5 * radius;

	camera.position.copy( center.clone().add( new THREE.Vector3( 1.5 * radius, - 1.5 * radius, 1.5 * radius ) ) );
	camera.near = 0.1 * radius; //2 * camera.position.length();
	camera.far = 10 * radius; //2 * camera.position.length();
	camera.updateProjectionMatrix();

	//lightDirectional.position.copy( center.clone().add( new THREE.Vector3( -1.5 * radius, -1.5 * radius, 1.5 * radius ) ) );
	//lightDirectional.shadow.camera.scale.set( 0.2 * radius, 0.2 * radius, 0.01 * radius );
	//lightDirectional.target = axesHelper;

	axesHelper.scale.set( radius, radius, radius );
	axesHelper.position.copy( center );
	//scene.position.copy( center );

	obj.userData.center = center;
	obj.userData.radius = radius;

	//		scene.remove( cameraHelper );
	//		cameraHelper = new THREE.CameraHelper( lightDirectional.shadow.camera );
	//		scene.add( cameraHelper );

};



function animate() {

	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	controls.update();
	scene.rotation.z += sceneRotation / 1000;

}
