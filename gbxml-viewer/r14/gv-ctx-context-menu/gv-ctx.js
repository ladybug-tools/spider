

	// Handle events

	var CTX = {};

	CTX.initHeadsUp = function() { // called from bottom of script

		CTX.mouse = new THREE.Vector2();

		THR.renderer.domElement.addEventListener( 'click', CTX.onRendererMouseMove, false );

		THR.renderer.domElement.addEventListener( 'touchstart', CTX.onRendererTouchStart, false );


	}



	CTX.onRendererMouseMove = function( event ) {

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



	CTX.onRendererTouchStart = function( event ) {

		event.preventDefault();

		event.clientX = event.touches[0].clientX;
		event.clientY = event.touches[0].clientY;

		CTX.onRendererMouseMove( event );

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

		//CORdivHamburgerRight.style.display = 'block';


		CORdivItemsRight.innerHTML =

			`<div id=CTXdivShowHide class=mnuRightDiv ></div>
			<div id=CTXdivEditSurface class=mnuRightDiv ></div>
			<div id=CTXdivItems class=mnuRightDiv ></div>
			<div id=CTXdivAttributes class=mnuRightDiv ></div>
			<div id=CTXdivTellTales class=mnuRightDiv ></div>
			`;


		CTX.setPanelSurface( CTXdivItems );

		//CTX.intersected.userData.data.Name;

		//CTX.removeTelltales();

		const data = CTX.intersected.userData.data;

		CTX.userDataData = data;
		//console.log( 'data', data );

		CTXselSurfaceId.value = data.id;
		//CTXselSurfaceId.click();
		SEL.setPanelSurfaceAttributes( CTXdivAttributes, data.id );


	};


	//////////

	CTX.setPanelSurface = function( target ) {
		// sets top panel

		THR.controls.keys = false;

		target.innerHTML =

		`<details open >

			<summary>Surface &nbsp; <a href=#../gv-CTX2-heads-up-display/README.md>?</a></summary>

			<div id = "CTXdivPanelSurface" ></div>

			<hr>

		</details>`;

		let item = {};

		item.attribute = 'id';
		item.divAttributes = 'CTXdivCardSurfaceAttributes';
		item.divTarget = document.getElementById( 'CTXdivPanelSurface' );
		item.element = 'Surface';
		item.name = 'itemSurface';
		item.optionValues = GBX.surfacesJson.map ( item => [ item.id, item.Name, item.CADObjectId ] );
		item.parent = GBX.surfaceJson;
		item.placeholder = 'surface id';
		item.selItem = 'CTXselSurfaceId';

		CTX.item = item;

		SEL.itemSurface = SEL.getElementPanel( item );
		//console.log( 'GBI.itemSurface', GBI.itemSurface );

	};


