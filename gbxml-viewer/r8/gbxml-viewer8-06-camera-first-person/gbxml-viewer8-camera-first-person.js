
	var icw;
	var THREE;
	var scene;
	var camera;
	var controls;
	var surfaceMeshes;

	var avatar;
	var size;
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


	initCameraFirstPerson();


	function initCameraFirstPerson() {


		icw = ifrThree.contentWindow;
		THREE = icw.THREE;
		scene = icw.scene;
		camera = icw.camera;
		controls = icw.controls;
		surfaceMeshes = icw.surfaceMeshes;


		if ( butCameraFirstPerson.style.backgroundColor !== 'pink' ) {

			icw.divContents.innerHTML +=
				'<button onclick=zoomOverTheShoulder(); >over the shoulder</button>' +
			'';

			var ui = ifrThree.contentDocument.body.appendChild( document.createElement( 'div' ) );
			ui.innerHTML = firstPersonUI;
			ui.style.cssText = 'left: 0; position: absolute; bottom: 20px; margin: 0 auto; text-align: center; right: 0; width: 100%; ';

			icw.addEventListener ( 'hashchange', toggleCameraFirstPersonOff, false );

			icw.addEventListener( 'keydown', onKeyDown, false );

			butCameraFirstPerson.style.backgroundColor = 'pink';

		} else {

			toggleCameraFirstPersonOff()


		}

	}


	function toggleCameraFirstPersonOff() {

console.log( '', 23 );
		scene.remove( avatar );
		butCameraFirstPerson.style.backgroundColor = '';

	}


	function addAvatar() {

//console.log( 'campusSurfaces.userData', size );

		size = icw.gbjson.useSIUnitsForResults ? 0.1 : 1;

		scene.remove( avatar );

		const geometryIcosahedron = new THREE.IcosahedronBufferGeometry( 1 );
		const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), emissive: 0x555555, shininess: 50 });
		const geoHead = geometryIcosahedron.clone();
		geoHead.applyMatrix( new THREE.Matrix4().makeRotationZ( 0.5 * Math.PI ) );
		const geoTail = geometryIcosahedron.clone().applyMatrix( new THREE.Matrix4().makeScale( 1, 3, 0.5 ) );
		geoTail.applyMatrix( new THREE.Matrix4().makeTranslation( 0, -1.5, 0.3 ) );

		avatar = new THREE.Mesh( geoHead, material );
		avatar.add( new THREE.Mesh( geoTail, material ) );
		avatar.scale.set( size, size, size );
		avatar.position.copy( icw.axesHelper.position );
		avatar.castShadow = avatar.receiveShadow = true;
//		avatar.visible = false;

		scene.add( avatar );
		avatar.add( icw.camera );

		controls.reset();
		controls.maxDistance = 10000 * size;;

		camera.far = 15000 * size;

		camera.position.set( 50 * size, - 50 * size, 50 * size );
		camera.updateProjectionMatrix();

	}



	icw.zoomOverTheShoulder = function() {

		if ( !avatar ) { addAvatar(); }
		camera.position.set( 50 * size, - 50 * size, 50 * size );

	}



	function onKeyDown ( event ) {

//console.log( 'key', event.keyCode );

		controls.enableKeys = false;
		event.preventDefault();

		switch( event.keyCode ) {

			case 82: /* R  */
			case 33: /* Page Up      */ icw.turnUp();   break;
			case 70: /* F */
			case 34: /* Page Dn      */ icw.turnDown(); break;
			case 65: /* A */
			case 37: /* cursor left  */ icw.turnLeft();  break;
			case 87: /* W */
			case 38: /* cursor up    */ icw.goForward(); break;
			case 68: /* D */
			case 39: /* cursor right */ icw.turnRight();  break;
			case 83: /* S */
			case 40: /* cursor down  */ icw.goBack(); break;
			case 187:/* plus */
			case 107:/* plus numeric*/  icw.goUp(); break;
			case 189:/* minus */
			case 109:/* minus numeric*/ icw.goDown(); break;

		}

	}



	icw.goForward = function() {

		if ( !avatar ) { addAvatar(); }
		avatar.translateY( size );

	}

	icw.goBack = function() {

		if ( !avatar ) { addAvatar(); }
		avatar.translateY( -size );

	}

	 icw.goUp = function() {

		if ( !avatar ) { addAvatar(); }
		avatar.translateZ( 0.5 );

	}

	icw.goDown = function() {

		if ( !avatar ) { addAvatar(); }
		avatar.translateZ( -0.5 );

	}

	icw.turnRight = function() {

		if ( !avatar ) { addAvatar(); }
		avatar.rotation.z -= 0.1;

	}

	icw.turnLeft = function() {

		if ( !avatar ) { addAvatar(); }
		avatar.rotation.z += 0.1;

	}

	icw.turnUp = function() {

		if ( !avatar ) { addAvatar(); }
		avatar.rotation.x += 0.1;

	}

	icw.turnDown = function() {

		if ( !avatar ) { addAvatar(); }
		avatar.rotation.x -= 0.1;

	}

