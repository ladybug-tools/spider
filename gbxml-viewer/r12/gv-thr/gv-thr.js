
	var uriGbxmlDefault = location.protocol === 'file:' ? // for testing
	//		'https://rawgit.com/ladybug-tools/spider/master/gbxml-viewer/gbxml-sample-files/open-studio-seb.xml'
	//		'https://rawgit.com/GreenBuildingXML/Sample-gbXML-Files/master/ARCH_ASHRAE%20Headquarters%20r16_detached.xml'
	'../../../gbxml-sample-files/bristol-clifton-down-road-small.xml'
	:
	'../../../gbxml-sample-files/bristol-clifton-down-road-small.xml';

	//   ../../../gbxml-sample-files/golden-co-open-studio-seb.xml
	//   ../../../gbxml-sample-files/omha-nb-zneth.xml
	//   ../../../gbxml-sample-files/annapolis-md-single-family-residential-2016.xml


	var THR = {};


	THR.initThree = function() {

		let renderer, camera, controls, scene;
		let lightAmbient, lightDirectional, lightPoint;
		let cameraHelper, axesHelper, gridHelper, groundHelper;

		renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true }  );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		document.body.appendChild( renderer.domElement );

		camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 10000 );
		camera.up.set( 0, 0, 1 );

		controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.autoRotate = true;

		scene = new THREE.Scene();

		lightAmbient = new THREE.AmbientLight( 0x444444 );
		scene.add( lightAmbient );

		lightDirectional = new THREE.DirectionalLight( 0xffffff, 1 );
		lightDirectional.shadow.mapSize.width = 2048;  // default 512
		lightDirectional.shadow.mapSize.height = 2048;
		lightDirectional.castShadow = true;
		scene.add( lightDirectional );

		lightPoint = new THREE.PointLight( 0xffffff, 0.5 );
		lightPoint.position = new THREE.Vector3( 0, 0, 1 );
		camera.add( lightPoint );
		scene.add( camera );

		axesHelper = new THREE.AxesHelper( 1 );
		scene.add( axesHelper );

		window.addEventListener( 'resize', THR.onWindowResize, false );
		window.addEventListener( 'orientationchange',THR.onWindowResize, false );
		window.addEventListener( 'keyup', function() { controls.autoRotate = false; }, false );

		renderer.domElement.addEventListener( 'click', function() { controls.autoRotate = false; }, false );
		renderer.domElement.addEventListener( 'click', function() { divContainer.style.display = 'none'; }, false );


		THR.renderer= renderer;
		THR.scene = scene;
		THR.camera = camera;
		THR.controls = controls;
		THR.lightAmbient = lightAmbient;
		THR.lightDirectional = lightDirectional;
		THR.lightPoint = lightPoint;
		THR.cameraHelper = cameraHelper;
		THR.axesHelper = axesHelper;
		THR.gridHelper = gridHelper;
		THR.groundHelper = groundHelper;

	};


	// available if parent wants it.
	// called by parseFileXML()

	THR.onWindowLoad = function() {

		if ( parent && parent.onloadThreejs ) { parent.onloadThreejs(); }

	};


	THR.updateDefaultFilePath = function() {

		location.hash = parent.inpFilePath.value;

		const thrFilePath = parent.inpFilePath.value;
		localStorage.setItem('thrFilePath', thrFilePath );

//		COR.requestFileAndProgress( thrFilePath, GBX.callbackGbXML );

	}

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

	}

