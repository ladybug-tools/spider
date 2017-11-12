
	const firstPersonUI =
`
	<div id=divControls >


		<div>
			<button onclick=turnLeft(); title='A or left cursor key' >&#9664;</button> &nbsp;
			<button onclick=goForward(); title='W or up cursor key' >&#9650;</button> &nbsp;
			<button onclick=goBack(); title='' >&#9660;</button> &nbsp;
			<button onclick=turnRight(); >&#9654;</button>
		</div>
		<div>
			<button onclick=turnUp(); title='R or page up key' >&#9651;</button> &nbsp;
			<button onclick=turnDown(); title='F or page down key' >&#9661;</button> &nbsp; 
			<button onclick=goUp(); title='Plus key' >+</button> &nbsp;
			<button onclick=goDown(); title='Minus key' >-</button> &nbsp;
		</div>

	</div>
`


	ui = document.body.appendChild( document.createElement( 'div' ) );
	ui.innerHTML += firstPersonUI;

	ui.style.cssText = ' position: absolute; bottom: 20px; margin: auto; text-align: center; width: 100%; ';

	let relativeCameraOffset = new THREE.Vector3( 0, 200, 50 );

	let avatar;

	window.addEventListener( 'keydown', onKeyDown, false );

	addAvatar();

	function addAvatar( size = 100 ) {

		const geometry = new THREE.IcosahedronBufferGeometry( 0.01 * size, );
		const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), emissive: 0x555555, shininess: 50 });
		const geo1 = geometry.clone();
		geo1.applyMatrix( new THREE.Matrix4().makeRotationZ( 0.5 * Math.PI ) );
		const geo2 = geometry.clone().applyMatrix( new THREE.Matrix4().makeScale( 1, 3, 0.5 ) );
		geo2.applyMatrix( new THREE.Matrix4().makeTranslation( 0, -4.6, 1 ) );

		avatar = new THREE.Mesh( geo1, material );

		avatar.add( new THREE.Mesh( geo2, material ) );
		avatar.position.x = -0.075 * size;
		avatar.position.z = 0.02 * size;
		avatar.castShadow = avatar.receiveShadow = true;
		avatar.visible = false;

	}



	function onKeyDown ( event ) {

console.log( 'key', event.keyCode );

		controls.enableKeys = false;
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
			case 187:
			case 107: /* plus */        goUp(); break;
			case 189:
			case 109: /* minus */       goDown(); break;

		}

	}


	function goForward() {

		avatar.translateY( 10 );
		updateCamera();

	}

	function goBack() {

		avatar.translateY( -10 );
		updateCamera();

	}

	function goUp() {

		avatar.translateZ( 3 );
		updateCamera();

	}

	function goDown() {

		avatar.translateZ( -3 );
		updateCamera();

	}

	function turnRight() {

		avatar.rotation.z -= 0.1;
		updateCamera();

	}

	function turnLeft() {

		avatar.rotation.z += 0.1;
		updateCamera();

	}


	function turnUp() {

		avatar.rotation.x += 0.1;
		updateCamera();

	}


	function turnDown() {

		avatar.rotation.x -= 0.1;
		updateCamera();

	}


	function updateCamera() {

		scene.add( avatar );
		camera.updateProjectionMatrix();
		let cameraOffset = relativeCameraOffset.applyMatrix4( avatar.matrixWorld );
console.log( '', cameraOffset );
		avatar.visible = true;

	}

