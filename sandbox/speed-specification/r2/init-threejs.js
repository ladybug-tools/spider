
	var renderer, camera, controls, scene;
	var lightAmbient, lightDirectional;
	let gridHelper, axesHelper;



	function initThreejs() {

		width = 300;
		height = 300;

		renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true }  );
		renderer.setClearColor( 0xffffff, 1 );
		renderer.setSize( width, height );
//		renderer.shadowMap.enabled = true;
//		renderer.shadowMap.type = THREE.PCFSoftShadowMap;

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

		const size = 150
		lightDirectional = new THREE.DirectionalLight( 0xffeedd );
		lightDirectional.position.set( -size, size, size );
//		lightDirectional.shadow.camera.scale.set( 13, 15, 0.5 );
		lightDirectional.shadow.mapSize.width = 2048;  // default 512
		lightDirectional.shadow.mapSize.height = 2048;
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




	function drawPlacard( text, scale, color, x, y, z ) {

// 2016-02-27 ~ https://github.com/jaanga/jaanga.github.io/tree/master/cookbook-threejs/examples/placards

		var placard = new THREE.Object3D();
		var v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };

		var texture = canvasMultilineText( text, { backgroundColor: color }   );
		var spriteMaterial = new THREE.SpriteMaterial( { map: texture, opacity: 0.9, transparent: true } );
		var sprite = new THREE.Sprite( spriteMaterial );
		sprite.position.set( x, y, z ) ;
		sprite.scale.set( scale * texture.image.width, scale * texture.image.height );

		var geometry = new THREE.Geometry();
		geometry.vertices = [ v( x, y, 0 ),  v( x, y, z ) ];
		var material = new THREE.LineBasicMaterial( { color: 0xaaaaaa } );
		var line = new THREE.Line( geometry, material );

		placard.add( sprite, line );

		return placard;


		function canvasMultilineText( textArray, parameters ) {

			var parameters = parameters || {} ;

			var canvas = document.createElement( 'canvas' );
			var context = canvas.getContext( '2d' );
			var width = parameters.width ? parameters.width : 0;
			var font = parameters.font ? parameters.font : '48px monospace';
			var color = parameters.backgroundColor ? parameters.backgroundColor : 120 ;

			if ( typeof textArray === 'string' ) textArray = [ textArray ];

			context.font = font;

			for ( var i = 0; i < textArray.length; i++) {

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

			for ( i = 0; i < textArray.length; i++) {

				context.fillText( textArray[ i ], 10, 48  + i * 60 );

			}

			var texture = new THREE.Texture( canvas );
			texture.minFilter = texture.magFilter = THREE.NearestFilter;
			texture.needsUpdate = true;

			return texture;

		}

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