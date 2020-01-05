
const urlSourceCode = `https://github.com/ladybug-tools/spider/tree/master/sandbox/honeybee-model`;
const urlSourceCodeIcon = "assets/github-mark-32.png";

let mesh, material, geometry, edges, boxHelper;
let axesHelper;
let renderer, camera, controls, scene;
let sceneRotation = 1;
let eventResetAll;

init();
animate();

function init() {

	hdrTitle.innerHTML = getTitle();

	renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( - 10, - 10, 10 );
	camera.up.set( 0, 0, 1 );

	controls = new THREE.TrackballControls( camera, renderer.domElement );
	controls.rotateSpeed = 4;

	scene = new THREE.Scene();

	window.addEventListener( "resize", onWindowResize, false );
	window.addEventListener( "orientationchange", onWindowResize, false );
	window.addEventListener( "keyup", () => sceneRotation = 0, false );
	renderer.domElement.addEventListener( "click", () => sceneRotation = 0, false );

	axesHelper = new THREE.AxesHelper( 100 );
	scene.add( axesHelper );

	// geometry = new THREE.BoxGeometry( 50, 50, 50 );
	// material = new THREE.MeshNormalMaterial( { opacity: 0.85, side:2, transparent: true });
	// mesh = new THREE.Mesh( geometry, material );
	// scene.add( mesh );


	eventResetAll = new Event( "onresetall" );


}


function zoomObjectBoundingSphere( obj = PHJ.group ) {
	//console.log( "obj", obj );

	const bbox = new THREE.Box3().setFromObject( obj );
	//console.log( "bbox", bbox )

	if ( bbox.isEmpty() === true ) { return; }

	const sphere = bbox.getBoundingSphere( new THREE.Sphere() );
	center = sphere.center;
	radius = sphere.radius;

	controls.target.copy( center ); // needed because model may be far from origin
	controls.maxDistance = 5 * radius;

	camera.position.copy( center.clone().add( new THREE.Vector3( - 1.5 * radius, - 1.5 * radius, 1.5 * radius ) ) );
	camera.near = 0.001 * radius; //2 * camera.position.length();
	camera.far = 10 * radius; //2 * camera.position.length();
	camera.updateProjectionMatrix();

	// if ( lightDirectional ) {

	// 	lightDirectional.position.copy( center.clone().add( new THREE.Vector3( 1.5 * radius, -1.5 * radius, 1.5 * radius ) ) );
	// 	lightDirectional.shadow.camera.scale.set( 0.2 * radius, 0.2 * radius, 0.01 * radius );

	// 	targetObject.position.copy( center );

	// 	//scene.remove( cameraHelper );
	// 	//cameraHelper = new THREE.CameraHelper( lightDirectional.shadow.camera );
	// 	//scene.add( cameraHelper );

	// }


	GLFselFiles.selectedIndex = 23;

};


// menus

function toggleNavMenu() {

	expandButton.classList.toggle( "collapsed" );
	navMenu.classList.toggle( "collapsed" );
	main.classList.toggle( "collapsed" );

}


function getTitle() {

	document.title = document.title ? document.title : location.href.split( "/" ).pop().slice( 0, - 5 ).replace( /-/g, " " );
	const version = document.head.querySelector( "[ name=version ]" ).content;
	const description = document.head.querySelector( "[ name=description ]" ).content;

	const htm =
	`
		<h2>
			<a href=${ urlSourceCode } target=_top title="Source code on GitHub" >
				<img src="${ urlSourceCodeIcon }" alt="GitHub logo" height=18 style=opacity:0.5; >
			</a>
			<a href="" title="Click to reload this page" >${ document.title } ${ version }</a>
		</h2>

		<p>
			${ document.head.querySelector( "[ name=description ]" ).content }
		</p>
	`;

	return htm;

}


// three.js

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	controls.handleResize();

	//console.log( "onWindowResize  window.innerWidth", window.innerWidth );

}



function animate() {

	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	controls.update();
	scene.rotation.z += sceneRotation / 1000;

}
