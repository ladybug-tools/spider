/*global
THREE
*/
/*
jshint esversion: 6
*/

	// Copyright 2018 Ladybug Tools authors. MIT License

	var THR = {};

	THR.initThree = function() {

		THR.renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true }  );
		THR.renderer.setSize( window.innerWidth, window.innerHeight );
		THR.renderer.shadowMap.enabled = true;
		THR.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		document.body.appendChild( THR.renderer.domElement );

		THR.camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 10000 );
		THR.camera.up.set( 0, 0, 1 );

		THR.controls = new THREE.OrbitControls( THR.camera, THR.renderer.domElement );
		THR.controls.autoRotate = true;

		THR.scene = new THREE.Scene();

		THR.lightAmbient = new THREE.AmbientLight( 0x444444 );
		THR.scene.add( THR.lightAmbient );

		THR.lightDirectional = new THREE.DirectionalLight( 0xffffff, 1 );
		THR.lightDirectional.shadow.mapSize.width = 2048;  // default 512
		THR.lightDirectional.shadow.mapSize.height = 2048;
		THR.lightDirectional.castShadow = true;
		THR.scene.add( THR.lightDirectional );

		THR.lightPoint = new THREE.PointLight( 0xffffff, 0.5 );
		THR.lightPoint.position = new THREE.Vector3( 0, 0, 1 );
		THR.camera.add( THR.lightPoint );
		THR.scene.add( THR.camera );

		THR.axesHelper = new THREE.AxesHelper( 1 );
		THR.scene.add( THR.axesHelper );

		window.addEventListener( 'resize', THR.onWindowResize, false );
		window.addEventListener( 'orientationchange',THR.onWindowResize, false );
		window.addEventListener( 'keyup', function() { THR.controls.autoRotate = false; }, false );

		THR.renderer.domElement.addEventListener( 'click', function() { THR.controls.autoRotate = false; }, false );
		THR.renderer.domElement.addEventListener( 'touchstart', function() { THR.controls.autoRotate = false; }, false );

	};


	// available if parent wants it.
	// called by parseFileXML()

	THR.onWindowLoad = function() {

		// behavior not good inside iframe
		if ( parent && parent.onloadThreejs ) { parent.onloadThreejs(); }

	};



	THR.updateDefaultFilePath = function() { // needed?

		location.hash = parent.inpFilePath.value;

		const thrFilePath = parent.inpFilePath.value;
		localStorage.setItem('thrFilePath', thrFilePath );

	};



	THR.onWindowResize = function() {

		THR.camera.aspect = window.innerWidth / window.innerHeight;
		THR.camera.updateProjectionMatrix();

		THR.renderer.setSize( window.innerWidth, window.innerHeight );

		//console.log( 'onWindowResize  window.innerWidth', window.innerWidth );

	};



	THR.animate = function() {

		requestAnimationFrame( THR.animate );
		THR.renderer.render( THR.scene, THR.camera );
		THR.controls.update();

	};
