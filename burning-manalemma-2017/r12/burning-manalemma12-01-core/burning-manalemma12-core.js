

	var renderer, camera, controls, scene;
	var lightAmbient, lightDirectional, lightPoint;
	var cameraHelper, axesHelper, gridHelper, groundHelper;

	function initThreeCore() {

		renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true }  );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		renderer.shadowMap.renderReverseSided = false;
		renderer.shadowMap.renderSingleSided = false;
		document.body.appendChild( renderer.domElement );

		camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 10000 );
		camera.position.set( 100, 100, 100 );
//		camera.up.set( 0, 0, 1 );

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

		axesHelper = new THREE.AxesHelper( 100 );
		scene.add( axesHelper );

		window.addEventListener( 'resize', onWindowResize, false );
		window.addEventListener( 'orientationchange', onWindowResize, false );
		window.addEventListener( 'keyup', function() { controls.autoRotate = false; }, false );

		renderer.domElement.addEventListener( 'click', function() { controls.autoRotate = false; }, false );
//		renderer.domElement.addEventListener( 'click', function() { divContainer.style.display = 'none'; }, false );

	}



	function requestFile( url, callback ) {

		const xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', url, true );
		xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
		xhr.onprogress = onRequestFileProgress;
		xhr.onload = callback;
		xhr.send( null );

		function onRequestFileProgress( xhr ) {

			divLog.innerHTML = 'bytes loaded: ' + xhr.loaded.toLocaleString() + ' of ' + xhr.total.toLocaleString() ;

		}

	}


	function openFile( files ) {

		const reader = new FileReader();
		reader.onprogress = onRequestFileProgress;
		reader.onload = function( event ) {

			const parser = new DOMParser();

			const xmlDoc = parser.parseFromString( reader.result, "text/xml" );

			gbjson = parseFileXML( xmlDoc.children[ 0 ] );

			if ( files.files[ 0 ] ) { gbjson.name = files.files[ 0 ].name; }

		}

		reader.readAsText( files.files[ 0 ] );

		function onRequestFileProgress( event ) {

			divLog.innerHTML =
				'bytes loaded: ' + event.loaded.toLocaleString() +
				( event.lengthComputable ? ' of ' + event.total.toLocaleString() : '' ) +
			'';

		}

	}





	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

		//console.log( 'onWindowResize  window.innerWidth', window.innerWidth );

	}



	function animate() {

		requestAnimationFrame( animate );
		renderer.render( scene, camera );
		controls.update();

	}
