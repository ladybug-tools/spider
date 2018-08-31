
/* Copyright 2018 Ladybug Tools authors. MIT License */

let sceneRotation = 1;
let renderer, camera, controls, scene;


function initThree() {

	renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( divThreeJs.clientWidth, divThreeJs.clientHeight );
	//renderer.shadowMap.enabled = true;
	divThreeJs.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 40, divThreeJs.clientWidth/divThreeJs.clientHeight, 1, 1000 );
	camera.up.set( 0, 0, 1 );
	camera.position.set( 160, 160, 50 );

	controls = new THREE.TrackballControls( camera, renderer.domElement );
	controls.maxDistance = 800;
	controls.target.set( 50, 50, 50 );

	scene = new THREE.Scene();

	const lightAmbient = new THREE.AmbientLight( 0x888888 );
	scene.add( lightAmbient );

	size = 100;
	lightDirectional = new THREE.DirectionalLight( 0xffffff, 0.5 );
	lightDirectional.position.set( size, size, size );
	//lightDirectional.shadow.camera.scale.set( 0.1 * size, 0.1 * size, size * 0.5 );
	//lightDirectional.castShadow = true;
	scene.add( lightDirectional );

	//scene.add( new THREE.CameraHelper( lightDirectional.camera ) );

	const lightPoint = new THREE.PointLight( 0xffffff, 1.5 );
	lightPoint.position = new THREE.Vector3( 100, 100, 100 );
	//camera.add( lightPoint );
	scene.add( lightPoint );


	window.addEventListener( 'resize', onWindowResize, false );
	window.addEventListener( 'orientationchange', onWindowResize, false );
	window.addEventListener( 'keyup', () => controls.autoRotate = false, false );
	renderer.domElement.addEventListener( 'click', () => controls.autoRotate = false, false );

	const gridHelperXY = new THREE.GridHelper( 100, 10, 0x0000ff, 0x8888ff  );
	gridHelperXY.rotation.x = Math.PI / 2;
	//gridHelperXY.position.set( -50, -50, 0 );
	scene.add( gridHelperXY );

	const gridHelperXZ = new THREE.GridHelper( 100, 10, 0xff0000, 0xff8888 );
	//gridHelperXY.rotation.x = Math.PI / 2;
	gridHelperXZ.position.set( 0, -50, 50 );
	scene.add( gridHelperXZ );

	const gridHelperYZ = new THREE.GridHelper( 100, 10, 0x00ff00, 0x88ff88 );
	gridHelperYZ.rotation.z = Math.PI / 2;
	gridHelperYZ.position.set( -50, 0, 50 );
	scene.add( gridHelperYZ );

	const axesHelper = new THREE.AxesHelper( 100 );
	//axesHelper.position.set( -50,-50, 0 );
	//scene.add( axesHelper );

	animate();

}



function toggleBackgroundGradient() {

	// 2018-06-23

	const col = function() { return ( 0.5 + 0.5 * Math.random() ).toString( 16 ).slice( 2, 8 ); };
	const pt = function() { return ( Math.random() * window.innerWidth ).toFixed( 0 ); }
	const image = divThreeJs.style.backgroundImage;

	divThreeJs.style.backgroundImage = image ? '' : 'radial-gradient( circle farthest-corner at ' +
		pt() + 'px ' + pt() + 'px, #' + col() + ' 0%, #' + col() + ' 50%, #' + col() + ' 100% ) ';

}



function drawPlacard( text, scale = 0.05, color = Math.floor( Math.random() * 255 ), x = 0, y = 10, z = 0 ) {

	// 2018-08-09 ~ https://github.com/jaanga/jaanga.github.io/tree/master/cookbook-threejs/examples/placards

	const placard = new THREE.Object3D();
	const v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };

	const texture = canvasMultilineText( text, { backgroundColor: color }   );
	const spriteMaterial = new THREE.SpriteMaterial( { map: texture, opacity: 0.9, transparent: true } );
	const sprite = new THREE.Sprite( spriteMaterial );
	sprite.position.set( x, y, z ) ;
	sprite.scale.set( scale * texture.image.width, scale * texture.image.height );

	// line
	//const geometry = new THREE.Geometry();
	//geometry.vertices = [ v( 0, 0, 0 ),  v( x, y, z ) ];
	//const material = new THREE.LineBasicMaterial( { color: 0xaaaaaa } );
	//const line = new THREE.Line( geometry, material );

	placard.add( sprite );

	return placard;


		function canvasMultilineText( textArray, parameters ) {

			parameters = parameters || {} ;

			const canvas = document.createElement( 'canvas' );
			const context = canvas.getContext( '2d' );
			const font = parameters.font ? parameters.font : '48px monospace';
			const color = parameters.backgroundColor ? parameters.backgroundColor : 120 ;
			let width = parameters.width ? parameters.width : 0;

			textArray = typeof textArray === 'string' ? [ textArray ] : textArray;

			context.font = font;

			for ( let i = 0; i < textArray.length; i++) {

				width = context.measureText( textArray[ i ] ).width > width ? context.measureText( textArray[ i ] ).width : width;

			}

			canvas.width = width + 20;
			canvas.height =  parameters.height ? parameters.height : textArray.length * 60;

			context.fillStyle = 'hsl( ' + color + ', 80%, 50% )' ;
			context.fillRect( 0, 0, canvas.width, canvas.height);

			context.lineWidth = 1 ;
			context.strokeStyle = '#000';
			context.strokeRect( 0, 0, canvas.width, canvas.height );

			context.fillStyle = '#000' ;
			context.font = font;

			for ( let i = 0; i < textArray.length; i++) {

				context.fillText( textArray[ i ], 10, 48  + i * 60 );

			}

			const texture = new THREE.Texture( canvas );
			texture.minFilter = texture.magFilter = THREE.NearestFilter;
			texture.needsUpdate = true;

			return texture;

		}

}



function onWindowResize() {

	camera.aspect = divThreeJs.clientWidth / divThreeJs.clientHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( divThreeJs.clientWidth, divThreeJs.clientHeight );

	//console.log( 'onWindowResize  window.innerWidth', window.innerWidth );

}



function animate() {

	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	controls.update();
	scene.rotation.z += sceneRotation / 1000;

}