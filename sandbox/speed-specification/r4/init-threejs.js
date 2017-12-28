/* Copyright 2017 Ladybug Tools authors. MIT License */

	let context1, context2;

	let renderer, camera, camera2, controls, controls2, scene;
	let lightAmbient, lightDirectional;
	let gridHelper, axesHelper;


	function initThreejs() {

		const width = 490;
		const height = 490;

		renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true, alpha : true }  );
		renderer.setClearColor( 0xffffff, 1 );
		renderer.sortObjects = true;
		renderer.setSize( width, height );

		renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.shadowMapEnabled = false;
        renderer.shadowMapCascade = true;
        renderer.shadowMapType = THREE.PCFSoftShadowMap;
        renderer.shadowMapSoft    = true;
		//		renderer.shadowMap.enabled = true;
		//		renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		context1 = canvasPerspective.getContext( '2d' );
		context2 = canvasOrtho.getContext( '2d' );

		camera1 = new THREE.PerspectiveCamera( 40, width / height, 1, 10000 );
		camera1.position.set( -80, -250, 200 );
		camera1.up.set( 0, 0, 1 );

		controls = new THREE.OrbitControls( camera1, canvasPerspective );
		controls.target = new THREE.Vector3(0,0,0);
		controls.maxDistance = 6000;
		// Using OrthographicCamera makes MeshLine axis appear weird
		camera2 = new THREE.OrthographicCamera( width / -3, width / 3, height / 3, height / - 3, 1, 1000 );

		camera2.position.set( 0, 0, 200 );
		camera2.up.set( 0, 0, 1 );

		controls2 = new THREE.OrbitControls( camera2, canvasOrtho );
		controls2.target = new THREE.Vector3(0,0,0);

		// Do not allow user to rotate - keep scene strictly 2D
		controls2.enableRotate = false;
		controls2.maxPolarAngle = -Math.PI;
		controls2.minPolarAngle = -Math.PI;

		scene = new THREE.Scene();

		lightAmbient = new THREE.AmbientLight( 0x888888 );
		scene.add( lightAmbient );

		const size = 150;
		lightDirectional = new THREE.DirectionalLight( 0xaaaaaa );
		lightDirectional.position.set( -size, size, size );
			//		lightDirectional.shadow.camera.scale.set( 13, 15, 0.5 );
		lightDirectional.shadow.mapSize.width = 2048;  // default 512
		lightDirectional.shadow.mapSize.height = 2048;
		lightDirectional.castShadow = true;

		loader = new THREE.TextureLoader();
		north = loader.load( './images/N.png' );
		north.center.set( 0.5, 0.5 );
		north.rotation = Math.PI / 2;
		east = loader.load( './images/E.png' );
		east.center.set( 0.5, 0.5 );
		east.rotation = Math.PI / 2;
		south = loader.load( './images/S.png' );
		south.center.set( 0.5, 0.5 );
		south.rotation = Math.PI / 2;
		west = loader.load( './images/W.png' );
		west.center.set( 0.5, 0.5 );
		west.rotation = Math.PI / 2;

		scene.add(lightDirectional);
		initEvent();
	}

	function initEvent()
	{
		document.getElementById("canvasOrtho").addEventListener( 'mousemove', function(event)
        {
        	if(scene.page != "geometry" && scene.page != "envelope")
        		return;

        	// var building 	= 
            var raycaster 	= new THREE.Raycaster();
            var mouse 		= new THREE.Vector2();
            var obj_arr 	= scene.getObjectByName("theBuilding").children[0].children;

            mouse.x = ( event.offsetX / this.width ) * 2 - 1;
            mouse.y = - ( event.offsetY / this.height ) * 2 + 1;

            raycaster.setFromCamera( mouse, camera2 );

            var intersects  = raycaster.intersectObjects( obj_arr );
            var img_src 	= "images/box-shape.png";

            if(intersects.length > 0)
            {
            	intersects[0].visible = false;
            	switch(theBuilding.shape)
            	{
            		case buildingShapes.Lshape :
            			img_src = "images/l_hud.png";
            		break;

            		case buildingShapes.Tshape :
            			img_src = "images/t_hud.png";
            		break;

            		case buildingShapes.Hshape :
            			img_src = "images/h_hud.png";
            		break;

            		default : 
            			img_src = "images/box_hud.png";
            		break;
            	}

            	document.getElementById("hud_img").src = img_src;
            	document.getElementById("hud_popup").style.display = "block";

            	document.getElementById("hud_popup").style.left = (event.pageX + 10) + "px";
            	document.getElementById("hud_popup").style.top  = (event.pageY + 10) + "px";
            }
            else
            {
            	document.getElementById("hud_popup").style.display = "none";
            }
        });
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
