
	var firstPersonUI =
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
			<button onclick=goDown(); title='Minus key' >-</button>
		</div>

	</div>
`

	divContents.innerHTML +=
		'<button onclick=zoomObjectBoundingSphere(campusSurfaces); >reset view</button> ' +
		'<button onclick=zoomOverTheShoulder(); >over the shoulder</button>' +
	'';

	var ui = document.body.appendChild( document.createElement( 'div' ) );
	ui.innerHTML = firstPersonUI;
	ui.style.cssText = 'left: 0; position: absolute; bottom: 20px; margin: 0 auto; text-align: center; right: 0; width: 100%; ';

	var avatar;

	window.addEventListener( 'keydown', onKeyDown, false );


	function addAvatar( size = campusSurfaces.userData.radius ) {

//console.log( 'campusSurfaces.userData', size );

		scene.remove( avatar );

		const geometryIcosahedron = new THREE.IcosahedronBufferGeometry( 0.01 * size, );
		const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), emissive: 0x555555, shininess: 50 });
		const geoHead = geometryIcosahedron.clone();
		geoHead.applyMatrix( new THREE.Matrix4().makeRotationZ( 0.5 * Math.PI ) );
		const geoTail = geometryIcosahedron.clone().applyMatrix( new THREE.Matrix4().makeScale( 1, 3, 0.5 ) );
		geoTail.applyMatrix( new THREE.Matrix4().makeTranslation( 0, -0.45, 0.1 ) );

		avatar = new THREE.Mesh( geoHead, material );
		avatar.add( new THREE.Mesh( geoTail, material ) );
		avatar.position.copy( axesHelper.position );
		avatar.castShadow = avatar.receiveShadow = true;
//		avatar.visible = false;

		scene.add( avatar );
		avatar.add( camera );

		controls.reset();
		controls.maxDistance = 10 * size;;

		camera.far = 15 * size;

		camera.position.set( 1.5 * size, - 1.5 * size, 1.5 * size );
		camera.updateProjectionMatrix();

	}



	function zoomOverTheShoulder() {

		camera.position.set( 0.2, -2, 0.8 );
	}



	function onKeyDown ( event ) {

//console.log( 'key', event.keyCode );

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
			case 187:/* plus */
			case 107:/* plus numeric*/  goUp(); break;
			case 189:/* minus */
			case 109:/* minus numeric*/ goDown(); break;

		}

	}



	function goForward() {

		if ( !avatar ) { addAvatar(); }
		avatar.translateY( 1 );

	}

	function goBack() {

		if ( !avatar ) { addAvatar(); }
		avatar.translateY( -1 );

	}

	function goUp() {

		if ( !avatar ) { addAvatar(); }
		avatar.translateZ( 0.5 );

	}

	function goDown() {

		if ( !avatar ) { addAvatar(); }
		avatar.translateZ( -0.5 );

	}

	function turnRight() {

		if ( !avatar ) { addAvatar(); }
		avatar.rotation.z -= 0.1;

	}

	function turnLeft() {

		if ( !avatar ) { addAvatar(); }
		avatar.rotation.z += 0.1;

	}

	function turnUp() {

		if ( !avatar ) { addAvatar(); }
		avatar.rotation.x += 0.1;

	}

	function turnDown() {

		if ( !avatar ) { addAvatar(); }
		avatar.rotation.x -= 0.1;

	}

