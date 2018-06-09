

// Handle events

var CTX = {};

CTX.initHeadsUp = function() { // called from bottom of script

	CTX.mouse = new THREE.Vector2();

	THR.renderer.domElement.addEventListener( 'click', CTX.onRendererMouseMoveCTX, false );

	THR.renderer.domElement.addEventListener( 'touchstart', CTX.onRendererTouchStartCTX, false );


}


CTX.onRendererMouseMoveCTX = function( event ) {

	event.preventDefault();

	if ( event.buttons > 0 ) { return; }

	CTX.mouse.x = ( event.clientX / THR.renderer.domElement.clientWidth ) * 2 - 1;
	CTX.mouse.y = - ( event.clientY / THR.renderer.domElement.clientHeight ) * 2 + 1;

	const raycaster = new THREE.Raycaster();
	raycaster.setFromCamera( CTX.mouse, THR.camera );

	const intersects = raycaster.intersectObjects( GBX.surfaceMeshes.children );

	if ( intersects.length > 0 ) {

		if ( CTX.intersected != intersects[ 0 ].object ) {
			//console.log( 'CTX.intersected', CTX.intersected );

			if ( CTX.intersected && CTX.intersected.material.emissive ) { CTX.intersected.material.emissive.setHex( CTX.intersected.currentHex ); }
			if ( CTX.intersected ) { CTX.intersected.material.opacity = CTX.intersected.currentOpacity; }

			CTX.intersected = intersects[ 0 ].object;

			console.log( 'CTX.intersected', CTX.intersected );

			CTX.setHeadsUp( event );

			if ( CTX.intersected.material.emissive ) {

				CTX.intersected.currentHex = CTX.intersected.material.emissive.getHex();
				CTX.intersected.material.emissive.setHex( 0x440000 );

			}

			CTX.intersected.currentOpacity = CTX.intersected.material.opacity;
			CTX.intersected.material.opacity = 1;

		}

	} else {

		if ( CTX.intersected && CTX.intersected.material.emissive ) { CTX.intersected.material.emissive.setHex( CTX.intersected.currentHex ); }
		if ( CTX.intersected ) { CTX.intersected.material.opacity = CTX.intersected.currentOpacity; }

		CTX.intersected = undefined;
		CORdivMenuRight.style.display = 'none';

	}

};



CTX.onRendererMouseDownCTXxxxx = function( event ) {

	//divHeadsUp.style.display = 'none';

	THR.renderer.domElement.removeEventListener( 'click', CTX.onRendererMouseMoveCTX, false );

};



CTX.onRendererTouchStartCTX = function( event ) {

	event.preventDefault();

	event.clientX = event.touches[0].clientX;
	event.clientY = event.touches[0].clientY;

	CTX.onRendererMouseMoveCTX( event );

};



CTX.setHeadsUp = function( event ) {

	//console.log( 'event', event );
	// needed?? in event handler??
	/*
	if ( CTX.intersected === undefined ) {

		if ( event && event.type === 'touchstart' ) {

			//divHeadsUp.style.display = 'none';

		}

		document.body.style.cursor = 'auto';

		return;

	}
	*/

	CORdivMenuRight.style.display = 'block';
	CORdivMenuRight.style.width = '28%';
	CORdivMenuRight.style.left = '70%';

	divHamburgerRight.style.display = 'block';

	CORdivItemsRight.innerHTML = CTX.intersected.userData.data.Name;
	//CTX.removeTelltales();

	const data = CTX.intersected.userData.data;

	CTX.userDataData = data;
	//console.log( 'data', data );

	//CTXselSurfaceId.value = data.id;
	//CTXselSurfaceId.click();

};


