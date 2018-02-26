
	// having issues adding a name space here

	var avatar;
	var ui;
	var size = 1;

	var firstPersonUI =
		`
			<div id=divControls >

				<div>
					<button onclick=turnLeft(); title='A or left cursor key' >&#9664;</button> &nbsp;
					<button onclick=goForward(); title='W or up cursor key' >&#9650;</button> &nbsp;
					<button onclick=goBack(); title='S or down cursor key' >&#9660;</button> &nbsp;
					<button onclick=turnRight(); title='D or right cursor key' >&#9654;</button>
				</div>
				<div>
					<button onclick=turnUp(); title='R or page up key' >&#9651;</button> &nbsp;
					<button onclick=turnDown(); title='F or page down key' >&#9661;</button> &nbsp;
					<button onclick=goUp(); title='Plus key' >+</button> &nbsp;
					<button onclick=goDown(); title='Minus key' >-</button>
				</div>

				<p>
					<button onclick=zoomOverTheShoulder(); title='Fly through the space with your avatar' >zoom to over the shoulder</button>
					<button id=butUIinfo onclick=divCameraInfo.style.display=divCameraInfo.style.display==='none'?'block':'none'; title='Click for help' >?</button>
				</p>

			</div>
	`;

	var divCameraFirstPerson =
	`
		<div id=divCameraInfo style=display:none; onclick=divCameraInfo.style.display='none'; >

			<p>
				This is a new and experimental feature.
			</p>

			<p>
				Fly through and around your models. Use cursor keys or WASD keys. Click on the icons at bottom of your screen
			</p>


			<p>
				Your pointing device works as usual. You pay pan, zoom and rotate as you do normally
			</p>

			<p>

				&bull; R key or Page Up key = turnUp<br>
				&bull; F key or Page Down key = turnDown<br>
				&bull; A key or cursor left key = turnLeft<br>
				&bull; W key or cursor up key = goForward<br>
				&bull; D or cursor right key = turnRight<br>
				&bull; S key or cursor down key = goBack<br>
				&bull; Plus key or plus numeric key = goUp<br>
				&bull; Minus key or minus numeric key = goDown<br>

			</p>

			<p>
			To help you remember:  look at tooltips over each icon</p>

			<p>
			'zoom to Over the shoulder': Zooms way into the model and lets you ride on the back of an avatar as you fly and wander around.
			</p>

			<p>
			Flying nicely through a building takes a certain amount of skill and practice. Be patient with yourself and use the 'reset view' button often.
			</p>

			<p>
			Using the keyboard and the mouse or fingers at the same time can be very exciting!
			</p>


			<p>Your avatar's name is 'Gypsy' Mila.<p>
		</div>
	`;


	initCameraFirstPerson();


	function initCameraFirstPerson() {

		if ( butCameraFirstPerson.style.backgroundColor !== 'var( --but-bg-color )' ) {

			ui = document.body.appendChild( document.createElement( 'div' ) );
			ui.innerHTML = firstPersonUI;
			ui.style.cssText = 'left: 0; position: absolute; bottom: 20px; margin: 0 auto; text-align: center; right: 0; width: 30%; ';

			uiInfo = document.body.appendChild( document.createElement( 'div' ) );
			uiInfo.innerHTML = divCameraFirstPerson;
			uiInfo.style.cssText = 'background-color: #ddd; bottom: 20px; max-width: 350px; padding: 5px; position: absolute; right: 20px;';

			addEventListener ( 'hashchange', toggleCameraFirstPersonOff, false );
			addEventListener( 'keydown', onKeyDown, false );

			butCameraFirstPerson.style.backgroundColor = 'var( --but-bg-color )';

			addAvatar();

		} else {

			toggleCameraFirstPersonOff();

			butCameraFirstPerson.style.backgroundColor = '';

		}

	}



	function toggleCameraFirstPersonOff() {

		avatar.visible = false;

		butCameraFirstPerson.style.backgroundColor = '';

		document.body.removeChild( ui );

		GBV.setAllVisible();
		GBV.zoomObjectBoundingSphere( GBX.surfaceMeshes );

	}



	function addAvatar() {

		//console.log( 'campusSurfaces.userData', size );

		if ( !avatar ) {

			const geometryIcosahedron = new THREE.IcosahedronBufferGeometry( 1 );
			const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), emissive: 0x555555, shininess: 50 });
			const geoHead = geometryIcosahedron.clone();
			geoHead.applyMatrix( new THREE.Matrix4().makeRotationZ( 0.5 * Math.PI ) );
			const geoTail = geometryIcosahedron.clone().applyMatrix( new THREE.Matrix4().makeScale( 1, 3, 0.5 ) );
			geoTail.applyMatrix( new THREE.Matrix4().makeTranslation( 0, -1.5, 0.3 ) );

			avatar = new THREE.Mesh( geoHead, material );
			avatar.add( new THREE.Mesh( geoTail, material ) );

			avatar.position.copy( THR.axesHelper.position );
			avatar.castShadow = avatar.receiveShadow = true;

		}

		size = GBX.gbjson.useSIUnitsForResults.toLowerCase() === 'true' ? 0.2 : 0.6;
		avatar.scale.set( size, size, size );
		avatar.position.copy( THR.axesHelper.position );
		avatar.visible = true;
		THR.scene.add( avatar );

	}



	zoomOverTheShoulder = function() {

		if ( GBX.gbjson.useSIUnitsForResults.toLowerCase() === 'true' ) {

			/*
			console.log( 'SI camera.position', camera.position );

						const geometry = new THREE.BoxGeometry( 1, 1, 1 );
						const material = new THREE.MeshNormalMaterial();
						const mesh = new THREE.Mesh( geometry, material );
						mesh.position.set( -1, -3, 1 );
						avatar.add( mesh );
			*/

			THR.controls.target.set( 0, 0, 2 );
			THR.camera.position.set( -1, -8, 3 );

			avatar.add( THR.camera );

		} else {

		/*
		console.log( 'IP camera.position ', camera.position );

					const geometry = new THREE.BoxGeometry( 1, 1, 1 );
					const material = new THREE.MeshNormalMaterial();
					const mesh = new THREE.Mesh( geometry, material );
					mesh.position.set( -1, -3, 1 );
					avatar.add( mesh );
		*/

			THR.controls.target.set( 0, 0, 2 );
			THR.camera.position.set( -1, -8, 3 );
			avatar.add( THR.camera );

		}

	}



	function onKeyDown ( event ) {

		//console.log( 'key', event.keyCode );

		THR.controls.enableKeys = false;
		event.preventDefault();

		switch( event.keyCode ) {

			case 82: /* R  */
			case 33: /* Page Up      */ turnUp();   break;
			case 70: /* F */
			case 34: /* Page Dn      */ turnDown(); break;
			case 65: /* A */
			case 37: /* cursor left  */ turnLeft();  break;
			case 87: /* W */
			case 38: /* cursor up    */ goForward(); break;
			case 68: /* D */
			case 39: /* cursor right */ turnRight();  break;
			case 83: /* S */
			case 40: /* cursor down  */ goBack(); break;
			case 187:/* plus */
			case 107:/* plus numeric*/  goUp(); break;
			case 189:/* minus */
			case 109:/* minus numeric*/ goDown(); break;

		}

	}



	goForward = () => {

		avatar.translateY( size );

	}

	goBack = () => {

		avatar.translateY( -size );

	}

	 goUp = () => {

		avatar.translateZ( 0.5 );

	}

	goDown = () => {

		avatar.translateZ( -0.5 );

	}

	turnRight = () => {

		avatar.rotation.z -= 0.1;

	}

	turnLeft = () => {

		avatar.rotation.z += 0.1;

	}

	turnUp = () => {

		avatar.rotation.x += 0.1;

	}

	turnDown = () => {

		avatar.rotation.x -= 0.1;

	}

