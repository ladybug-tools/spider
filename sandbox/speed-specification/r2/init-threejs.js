
	var renderer, camera, controls, scene;
	var lightAmbient, lightDirectional;
	let gridHelper, axesHelper;



	function initThreejs() {

		width = 300;
		height = 300;

		renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true }  );
		renderer.setClearColor( 0xffffff, 1 );
		renderer.setSize( width, height );
		renderer.shadowMap.enabled = true;

		context1 = canvasPerspective.getContext( '2d' );
		context2 = canvasOrtho.getContext( '2d' );

		camera1 = new THREE.PerspectiveCamera( 40, width / height, 1, 1000 );
		camera1.position.set( -80, -250, 200 );
		camera1.up.set( 0, 0, 1 );

		controls = new THREE.OrbitControls( camera1, canvasPerspective );
		controls.maxDistance = 600;


		camera2 = new THREE.OrthographicCamera( width / -3, width / 3, height / 3, height / - 3, 1, 1000 );
		camera2.position.set( 0, 0, 200 );
		camera2.up.set( 0, 0, 1 );

		controls2 = new THREE.OrbitControls( camera2, canvasOrtho );

		scene = new THREE.Scene();

		lightAmbient = new THREE.AmbientLight( 0x444444 );
		scene.add( lightAmbient );

		const size = 100
		lightDirectional = new THREE.DirectionalLight( 0xffeedd );
		lightDirectional.position.set( -size, size, size );
		lightDirectional.shadow.camera.scale.set( 13, 15, 0.5 );
		lightDirectional.castShadow = true;
		scene.add( lightDirectional );

	}



	function addThreejsHelpers( size = 200 ) {

		scene.remove( gridHelper, axesHelper );

		gridHelper = new THREE.GridHelper( size, size / 10 );
		gridHelper.rotation.x = 0.5 * Math.PI;

		axesHelper = new THREE.AxesHelper( size * 0.05 );
		axesHelper.position.set( -0.5 * size, -0.5 * size, 15 );
		axesHelper.material.linewidth = 20;

		scene.add( gridHelper, axesHelper );

	}



	function animateThreejs() {

		requestAnimationFrame( animateThreejs );

		renderer.autoClear = true;

		controls.update();
		renderer.render( scene, camera1 );
		context1.drawImage( renderer.domElement, 0, 0 );

		controls2.update();
		renderer.render( scene, camera2 );
		context2.drawImage( renderer.domElement, 0, 0 );

	}