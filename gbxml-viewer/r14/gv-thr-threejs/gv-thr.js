	/*global THREE, GBX*/
	/* jshint esversion: 6 */

	// Copyright 2018 Ladybug Tools authors. MIT License

	var THR = {};
	THR.cameraHelper = null;

	THR.initThree = function() {

		THR.renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true }  );
		THR.renderer.setSize( window.innerWidth, window.innerHeight );
		THR.renderer.shadowMap.enabled = true;
		THR.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		document.body.appendChild( THR.renderer.domElement );

		THR.camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 10000 );
		THR.camera.up.set( 0, 0, 1 );

		THR.controls = new THREE.TrackballControls( THR.camera, THR.renderer.domElement );
		THR.controls.autoRotate = true;
		THR.controls.rotateSpeed = 1.5;
		THR.controls.zoomSpeed = 1.2;
		THR.controls.panSpeed = 0.5;
		THR.controls.noZoom = false;
		THR.controls.noPan = false;
		//controls.staticMoving = true;
		//controls.dynamicDampingFactor = 0.3;

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



	THR.updateDefaultFilePath = function() { // Used by COR. Should be in COR?

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


	THR.zoomObjectBoundingSphere = function( obj ) {

		const bbox = new THREE.Box3().setFromObject( obj );

		const sphere = bbox.getBoundingSphere( new THREE.Sphere() );
		const center = sphere.center;
		const radius = sphere.radius;

		THR.controls.target.copy( center );
		THR.controls.maxDistance = 5 * radius;

		THR.camera.position.copy( center.clone().add( new THREE.Vector3( 1.0 * radius, - 1.0 * radius, 1.0 * radius ) ) );
		THR.camera.far = 10 * radius; //2 * camera.position.length();
		THR.camera.updateProjectionMatrix();

		THR.lightDirectional.position.copy( center.clone().add( new THREE.Vector3( -1.5 * radius, -1.5 * radius, 1.5 * radius ) ) );
		THR.lightDirectional.shadow.camera.scale.set( 0.2 * radius, 0.2 * radius, 0.01 * radius );

		if ( !THR.axesHelper ) {

			THR.axesHelper = new THREE.AxesHelper( 1 );
			THR.axesHelper.name = 'axesHelper';
			THR.scene.add( THR.axesHelper );

		}

		THR.axesHelper.scale.set( radius, radius, radius );
		THR.axesHelper.position.copy( center);

		THR.lightDirectional.target = THR.axesHelper;
		GBX.surfaceMeshes.userData.center = center;
		GBX.surfaceMeshes.userData.radius = radius;

		THR.scene.remove( THR.cameraHelper );
		THR.cameraHelper = new THREE.CameraHelper( THR.lightDirectional.shadow.camera );
		THR.scene.add( THR.cameraHelper );

	};


	THR.setSceneDispose = function( objArray = [] ) {

		//console.log( 'renderer.info.memory.geometries 1', renderer.info.memory.geometries );

		THR.scene.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh || child instanceof THREE.LineSegments ) {

				child.geometry.dispose();
				child.material.dispose();

				THR.scene.remove( child );
			}

		} );


		THR.scene.remove( ...objArray );

		THR.axesHelper = undefined;

		//getRenderInfo();

	};



	THR.getRenderInfo = function() {

		console.log( 'renderer.info.memory.geometries', THR.renderer.info.memory.geometries );
		console.log( 'renderer.info.render', THR.renderer.info.render );

		/*
		divLog.innerHTML +=
		`
		geometries: ${ renderer.info.memory.geometries.toLocaleString() }<br>
		triangles: ${ renderer.info.render.triangles.toLocaleString() } <br>
		lines: ${ renderer.info.render.lines.toLocaleString() } <br>
		`;
		*/
	};



	THR.animate = function() {

		requestAnimationFrame( THR.animate );
		THR.renderer.render( THR.scene, THR.camera );
		THR.controls.update();

	};
