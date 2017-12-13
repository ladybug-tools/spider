
	var icw;
	var THREE;
	var renderer;
	var camera;
	var gbjson;
	var headsUp; 
	var intersected;
	var objects;
	var mouse;

	init();

	function init() {

		if ( !headsUp ) {

			headsUp = document.body.appendChild( document.createElement( 'div' ) );
			headsUp.style.cssText = 
				'background-color: #ddd; border-radius: 8px; display: none; height: 300px; min-width: 200px; opacity: 0.95; ' +
				' overflow: auto; padding: 0 5px 10px 5px; position: fixed; resize: both; z-index: 1000; ' +
			'';

		}

		icw = ifrThree.contentWindow;
		icw.renderer.domElement.addEventListener( 'click', icw.onClickEvent, false );

		initHeadsUp();

	}



	function initHeadsUp() {

		icw = ifrThree.contentWindow;
		THREE = icw.THREE;
		renderer = icw.renderer;
		camera = icw.camera;
		gbjson = icw.gbjson;

		objects = [];
		mouse = new THREE.Vector2();

		campusSurfacesArray = icw.surfaceMeshes.children;

//		renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
//		renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );

		renderer.domElement.addEventListener( 'click', onDocumentMouseMove, false );
//		renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );

		renderer.domElement.addEventListener( 'touchstart', onDocumentTouchStart, false );
		renderer.domElement.addEventListener( 'click', icw.onClickEvent, false );

console.log( '',  );

		aHeadsUp.style.backgroundColor = 'pink';

	}



	function stopHeadsUp() {

		if ( intersected && intersected.material.emissive ) { intersected.material.emissive.setHex( intersected.currentHex ); }
		if ( intersected ) { intersected.material.opacity = intersected.currentOpacity; }
		headsUp.style.display = 'none';
		campusSurfacesArray = [];

		renderer.domElement.removeEventListener( 'click', icw.onDocumentMouseMove, false );
		renderer.domElement.removeEventListener( 'click', icw.onDocumentMouseDown, false );

	}



	function onDocumentMouseMove( event ) {

		var raycaster, intersects;

		event.preventDefault();

		if ( event.buttons > 0 ) { return; }

		mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

		raycaster = new THREE.Raycaster();
		raycaster.setFromCamera( mouse, camera );

		intersects = raycaster.intersectObjects( campusSurfacesArray );

		if ( intersects.length > 0 ) {

			if ( intersected != intersects[ 0 ].object ) {

				if ( intersected && intersected.material.emissive ) { intersected.material.emissive.setHex( intersected.currentHex ); }
				if ( intersected ) { intersected.material.opacity = intersected.currentOpacity; }

				intersected = intersects[ 0 ].object;

				if ( intersected.material.emissive ) {

					intersected.currentHex = intersected.material.emissive.getHex();
					intersected.material.emissive.setHex( 0xff0000 );

				}

				intersected.currentOpacity = intersected.material.opacity;
				intersected.material.opacity = 1;

			}

		} else {

			if ( intersected && intersected.material.emissive ) { intersected.material.emissive.setHex( intersected.currentHex ); }
			if ( intersected ) { intersected.material.opacity = intersected.currentOpacity; }

			intersected = undefined;

		}

		setHeadsUp( event );

	}



	function setHeadsUp( event ) {

		let txt;
		const b = '<br>'

		if ( intersected === undefined ){

			if ( event.type === 'touchstart' ) {

				headsUp.style.display = 'none';

			}

			document.body.style.cursor = 'auto';

			return;

		}

//		headsUp.style.left = 0 + 0.5 * icw.window.innerWidth + mouse.x * 0.5 * icw.innerWidth + 'px';
//		headsUp.style.top = 30 + 0.5 * icw.window.innerHeight - mouse.y * 0.5 * icw.window.innerHeight + 'px';

		headsUp.style.right = '20px'; // + 0.5 * icw.window.innerWidth + mouse.x * 0.5 * icw.innerWidth + 'px';
		headsUp.style.top = '20px'; // + 0.5 * icw.window.innerHeight - mouse.y * 0.5 * icw.window.innerHeight + 'px';

		headsUp.style.display = '';
//console.log( '', headsUp.style.left, headsUp.style.top );

		data = intersected.userData.data;
//console.log( 'data', data );

		adjacenciesTxt = data.AdjacentSpaceId ? data.AdjacentSpaceId : 'no adjacency';

		if ( adjacenciesTxt !== 'no adjacency' ) {

			if ( Array.isArray( adjacenciesTxt ) === true ) {

//console.log( 'adjacenciesTxt', adjacenciesTxt );

				space1 = getSpaceId( adjacenciesTxt[ 0 ].spaceIdRef );
				space2 = getSpaceId( adjacenciesTxt[ 1 ].spaceIdRef );

				if ( space1 && space2 ) { 

					adjacenciesTxt = 

						'<hr>' + 
						'adjacency 1:  <button onclick=toggleSpace("' + space1.id + '"); >' + space1.id + '</button>' + b +
						( space1.Name ? 'name: ' + space1.Name + b : '' ) +
						( space.Description ? 'description: ' + space.Description + b : '' )  +
						( space.Area ? 'area: ' + space.Area + b : '' )  +
						( space.Name ? 'name: ' + space.Name + b : '' )  +
						( space.conditionType ? 'conditionType: ' + space.conditionType + b : '' )  +
						( space.zoneIdRef ? 'zoneIdRef: ' + space.zoneIdRef + b : '' ) +
						( space1.CADObjectId ? 'CADObjectId: ' + space1.CADObjectId + b : '' ) +

						'<hr>' + 
						'adjacency 2: <button onclick=toggleSpace("' + space2.id + '"); >' + space2.id + '</button>' + b +
						( space2.Name ? 'name: ' + space2.Name + b : '' ) +
						( space.Description ? 'description: ' + space.Description + b : '' )  +
						( space2.CADObjectId ? 'CADObjectId: ' + space2.CADObjectId + b : '' ) +
						'<button onclick=icw.zoomObjectBoundingSphere(icw.surfaceMeshes);icw.setAllVisible(); >reset view</button>' +


					'';

				} else {

					adjacenciesTxt = 'adjacencies: ' + data.AdjacentSpaceId[ 0 ] + ' ' + data.AdjacentSpaceId[ 1 ];

				}

			} else {

//console.log( 'data.AdjacentSpaceId.spaceIdRef', data.AdjacentSpaceId.spaceIdRef );
//console.log( 'adjacenciesTxt', adjacenciesTxt );

				space = getSpaceId( data.AdjacentSpaceId.spaceIdRef, 'single' );

				if ( !space ) { return; }

				adjacenciesTxt = 
					'<hr>' +
					'adjacency space id: <button onclick=toggleSpace("' + space.id + '"); >' + space.id + '</button>' + b +
					( space.Name ? 'name: ' + space.Name + b : '' )  +
					( space.Description ? 'description: ' + space.Description + b : '' )  +
					( space.Area ? 'area: ' + space.Area + b : '' )  +
					( space.buildingStoreyIdRef ? 'buildingStoreyIdRef: ' + space.buildingStoreyIdRef + b : '' )  +
					( space.conditionType ? 'conditionType: ' + space.conditionType + b : '' )  +
					( space.zoneIdRef ? 'zoneIdRef: ' + space.zoneIdRef + b : '' ) +
					( space.CADObjectId ? 'CADObjectId: ' + space.CADObjectId + b : '' ) +
					'<button onclick=icw.zoomObjectBoundingSphere(icw.surfaceMeshes);icw.setAllVisible(); >reset view</button>' +

				b;

			}

		}

//		adjacenciesTxt = adjacencies.length ? '

		txt =
			'<button onclick=headsUp.style.display="none"; >&#x2716;</button>' + b +
			( data.Name ? 'name: ' + data.Name + b : '' )  +
			'id: ' + data.id + b +
			'surface: ' + data.surfaceType + b +
			( data.CADObjectId ? 'CADObjectId: ' + data.CADObjectId + b : '' ) +
			adjacenciesTxt + 
		'';

		headsUp.innerHTML = txt;
		document.body.style.cursor = 'pointer';

	}



	function getSpaceId( spaceIdRef, txtz ) {

		if ( !gbjson.Campus.Building.Space || !gbjson.Campus.Building.Space.length ) { return; }

		const space = gbjson.Campus.Building.Space.find( function( item ) { return item.id === spaceIdRef; } );

		if ( !space ) {

//console.log( 'spaceIdRef', spaceIdRef );
//console.log( 'space', gbjson.Campus.Building.Space );
//console.log( 'txt', txtz );

		}

		return space;

	}



	function toggleSpace( id ) {

//console.log( 'id', id );

		for ( let child of icw.surfaceMeshes.children ) {

			child.visible = false;
			adjacentSpaceId = child.userData.data.AdjacentSpaceId;

			if ( adjacentSpaceId && adjacentSpaceId.spaceIdRef && id === adjacentSpaceId.spaceIdRef ) {

				child.visible = true;

			} else if ( Array.isArray( adjacentSpaceId ) === true ) {

				if ( id === adjacentSpaceId[ 0 ].spaceIdRef || id === adjacentSpaceId[ 1 ].spaceIdRef ) {

					child.visible = true;

				}

			}

		} 

	}


	function onDocumentMouseDown( event ) {

		headsUp.style.display = 'none';
		renderer.domElement.removeEventListener( 'click', icw.onClickEvent, false );

	}



	function onDocumentTouchStart( event ) {

		event.preventDefault();

		event.clientX = event.touches[0].clientX;
		event.clientY = event.touches[0].clientY;

		onDocumentMouseMove( event );

	}