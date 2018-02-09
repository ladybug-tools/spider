

	var icw;
	var THREE;
	var renderer;
	var camera;
	var gbjson;
	var surfaceMeshesChildren;

	var divHeadsUp;
	var intersected;
	var objects;
	var mouse;

	var toggleCadId;

	initHeadsUp();

	function initHeadsUp() {

		if ( !divHeadsUp ) {

			divHeadsUp = document.body.appendChild( document.createElement( 'div' ) );
			divHeadsUp.style.cssText =
				'background-color: #ddd; border-radius: 8px; display: none; min-height: 100px; min-width: 200px; opacity: 0.95; ' +
				' overflow: auto; padding: 5px 5px 10px 5px; position: fixed; resize: both; z-index: 1000; ' +
			'';

		}

		if ( butHeadsUp.style.backgroundColor !== 'pink' ) {

			icw = ifrThree.contentWindow;
			THREE = icw.THREE;
			renderer = icw.renderer;
			camera = icw.camera;
			gbjson = icw.gbjson;
			surfaceMeshesChildren = icw.surfaceMeshes.children;

			mouse = new THREE.Vector2();

			renderer.domElement.addEventListener( 'click', onDocumentMouseMove, false );
			renderer.domElement.addEventListener( 'touchstart', onDocumentTouchStart, false );

			if ( parent.setIfrThree ) { setIfrThree(); }

			butHeadsUp.style.backgroundColor = 'pink';

		} else {

			toggleHeadsUpOff();

		}

	}



	function toggleHeadsUpOff() {

		if ( intersected && intersected.material.emissive ) { intersected.material.emissive.setHex( intersected.currentHex ); }
		if ( intersected ) { intersected.material.opacity = intersected.currentOpacity; }
		divHeadsUp.style.display = 'none';
		surfaceMeshesChildren = [];

		renderer.domElement.removeEventListener( 'click', icw.onDocumentMouseMove, false );
		renderer.domElement.removeEventListener( 'click', icw.onDocumentMouseDown, false );

		butHeadsUp.style.backgroundColor = '';

	}



	function onDocumentMouseMove( event ) {

		var raycaster, intersects;

		event.preventDefault();

		if ( event.buttons > 0 ) { return; }

		mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

		raycaster = new THREE.Raycaster();
		raycaster.setFromCamera( mouse, camera );

		intersects = raycaster.intersectObjects( surfaceMeshesChildren );

		if ( intersects.length > 0 ) {

			if ( intersected != intersects[ 0 ].object ) {

				if ( intersected && intersected.material.emissive ) { intersected.material.emissive.setHex( intersected.currentHex ); }
				if ( intersected ) { intersected.material.opacity = intersected.currentOpacity; }

				intersected = intersects[ 0 ].object;
		console.log( 'intersected', intersected );

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


// needs big clean up

	function setHeadsUp( event ) {

		var space1, space2;
		let txt;
		const b = '<br>';

		if ( intersected === undefined ){

			if ( event.type === 'touchstart' ) {

				divHeadsUp.style.display = 'none';

			}

			document.body.style.cursor = 'auto';

			return;

		}

		//divHeadsUp.style.left = 0 + 0.5 * icw.window.innerWidth + mouse.x * 0.5 * icw.innerWidth + 'px';
		//divHeadsUp.style.top = 30 + 0.5 * icw.window.innerHeight - mouse.y * 0.5 * icw.window.innerHeight + 'px';

		divHeadsUp.style.right = '20px'; // + 0.5 * icw.window.innerWidth + mouse.x * 0.5 * icw.innerWidth + 'px';

		divHeadsUp.style.left = 'calc( 100% - 400px )';
		divHeadsUp.style.top = '20px'; // + 0.5 * icw.window.innerHeight - mouse.y * 0.5 * icw.window.innerHeight + 'px';

		divHeadsUp.style.display = '';
		//console.log( '', divHeadsUp.style.left, divHeadsUp.style.top );

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
						'adjacency 1:  <button onclick=toggleSpaceHUD("' + space1.id + '"); >' + space1.id + '</button>' + b +
						( space1.Name ? 'name: ' + space1.Name + b : '' ) +
						( space1.Description ? 'description: ' + space1.Description + b : '' )  +
						( space1.Area ? 'area: ' + space1.Area + b : '' )  +
						( space1.conditionType ? 'conditionType: ' + space1.conditionType + b : '' )  +
						( space1.zoneIdRef ? 'zoneIdRef: ' + space1.zoneIdRef + b : '' ) +
//						( space1.buildingStoreyIdRef ? 'buildingStoreyIdRef: ' + space1.buildingStoreyIdRef + b : '' )  +
						'storey: <button onclick=toggleStoreyHUD("' + space1.buildingStoreyIdRef + '"); >' + space1.buildingStoreyIdRef + '</button>' + b +

						( space1.CADObjectId ? 'CADObjectId: ' + space1.CADObjectId + b : '' ) +

						'<hr>' +
						'adjacency 2: <button onclick=toggleSpaceHUD("' + space2.id + '"); >' + space2.id + '</button>' + b +
						( space2.Name ? 'name: ' + space2.Name + b : '' ) +
						( space2.Description ? 'description: ' + space2.Description + b : '' )  +
						( space2.Area ? 'area: ' + space2.Area + b : '' )  +
						( space2.conditionType ? 'conditionType: ' + space2.conditionType + b : '' )  +
						( space2.zoneIdRef ? 'zoneIdRef: ' + space2.zoneIdRef + b : '' ) +
//						( space2.buildingStoreyIdRef ? 'buildingStoreyIdRef: ' + space2.buildingStoreyIdRef + b : '' )  +
						'storey: <button onclick=toggleStoreyHUD("' + space2.buildingStoreyIdRef + '"); >' + space2.buildingStoreyIdRef + '</button>' + b +

						( space2.CADObjectId ? 'CADObjectId: ' + space2.CADObjectId + b : '' ) +
						//						'<button onclick=icw.zoomObjectBoundingSphere(icw.surfaceMeshes);icw.setAllVisible(); >reset view</button>' +
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
					'adjacency space id: <button onclick=toggleSpaceHUD("' + space.id + '"); >' + space.id + '</button>' + b +
					( space.Name ? 'name: ' + space.Name + b : '' )  +
					( space.Description ? 'description: ' + space.Description + b : '' )  +
					( space.Area ? 'area: ' + space.Area + b : '' )  +
//					( space.buildingStoreyIdRef ? 'buildingStoreyIdRef: ' + space.buildingStoreyIdRef + b : '' )  +
					'storey: <button onclick=toggleStoreyHUD("' + space.buildingStoreyIdRef + '"); >' + space.buildingStoreyIdRef + '</button>' + b +
					( space.conditionType ? 'conditionType: ' + space.conditionType + b : '' )  +
					( space.zoneIdRef ? 'zoneIdRef: ' + space.zoneIdRef + b : '' ) +
					( space.CADObjectId ? 'CADObjectId: ' + space.CADObjectId + b : '' ) +
				//'<button onclick=icw.zoomObjectBoundingSphere(icw.surfaceMeshes);icw.setAllVisible(); >reset view</button>' +

				b;

			}

		}

			//		adjacenciesTxt = adjacencies.length ? '


		txt =
			'<button onclick=divHeadsUp.style.display="none"; >&#x2716;</button>' + b +


//			'id: ' + data.id + b +
			'id: <button onclick=toggleSurfaceHUD("' + data.id + '")  >' + data.id + '</button>' + b +
			( data.Name ? 'surface name: ' + data.Name + b : '' )  +
			'toggle type <button onclick=toggleSurfaceTypeHUD("' + data.surfaceType + '");  >' + data.surfaceType + '</button>' + b +
			'CADObjectId: <button onclick=tryToggleCadId("' + encodeURI( data.CADObjectId ) + '"); >' + data.CADObjectId + '</button>' + b +
			'<button onclick=intersected.visible=!intersected.visible;  >toggle visibility</button>' + b +
			adjacenciesTxt +
			'<p><button class=toggle onclick=allVisible(); >all visible</button></p>' +
		'';

		divHeadsUp.innerHTML = txt;
		document.body.style.cursor = 'pointer';

	}

	function toggleSurfaceHUD ( id ) {
;

		for ( let child of surfaceMeshesChildren ) {

			if ( id === child.userData.data.id ) {

				child.visible = true;

				//console.log( '', child );

			} else {

				child.visible = false;

			}

		}

	}

	function toggleSurfaceTypeHUD( type ) {

		//console.log( 'type ', type );

		for ( let child of surfaceMeshesChildren ) {

			if ( type === child.userData.data.surfaceType ) {

				child.visible = true;

			} else {

				child.visible = false;

			}

		}

	}


	function toggleCadIdHUD( CADObjectId ) {

		//console.log( '', CADObjectId );
		surfaceGroup.visible = true;
		surfaceEdges.visible = true;
		icw.divLog.innerHTML = '';

		for ( let child of surfaceMeshesChildren ) {


			if ( !child.userData.data ) { continue; }

			if ( encodeURI( child.userData.data.CADObjectId ) === CADObjectId ) {

				child.visible = true;

			} else {

				child.visible = false;

			}

		}

	}

	function getSpaceId( spaceIdRef, txtz ) {

		if ( !gbjson.Campus.Building.Space || !gbjson.Campus.Building.Space.length ) { return; }

		const space = gbjson.Campus.Building.Space.find( function( item ) { return item.id === spaceIdRef; } );

		//		if ( !space ) {

		//console.log( 'spaceIdRef', spaceIdRef );
		//console.log( 'space', gbjson.Campus.Building.Space );
		//console.log( 'txt', txtz );

		//		}

		return space;

	}



	function toggleSpaceHUD( id ) {

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



	function toggleStoreyHUD( id, node ) {

		//console.log( 'id', id );

		const spaces = gbjson.Campus.Building.Space;

		let zones = [];
		let spacesArray = [];

		for ( let child of surfaceMeshesChildren ) {

			child.visible = false;

		}

		for ( let child of surfaceMeshesChildren ) {

			//			if ( !child.userData.data ) { continue; }

			adjacentSpaceId = child.userData.data.AdjacentSpaceId

			if ( !adjacentSpaceId ) { continue; }

			spaceIdRef = Array.isArray( adjacentSpaceId ) ? adjacentSpaceId[ 1 ].spaceIdRef : adjacentSpaceId.spaceIdRef

			for ( let space of spaces ) {

				if ( space.id === spaceIdRef && space.buildingStoreyIdRef === id ) {

					child.visible = true;

						//					if ( !zones.includes( space.zoneIdRef ) ) { zones.push( space.zoneIdRef ); }

						//					if ( !spacesArray.includes( space.id ) ) { spacesArray.push( space.id ); }

				}

			}

		}

		/*
		divStoreyItems.innerHTML =
			'spaces ' + spacesArray.length + ': ' + spacesArray.join() + b +
			'zones ' + zones.length + ': ' + zones.join();


		for ( let storey of storeys ) {

			if ( id === storey.id ) {

				icw.divLog.innerHTML = 'Storey name: ' + storey.Name;

			}

		}

		return zones;

		*/

	}



	function onDocumentMouseDown( event ) {

		divHeadsUp.style.display = 'none';
		renderer.domElement.removeEventListener( 'click', icw.onClickEvent, false );

	}



	function onDocumentTouchStart( event ) {

		event.preventDefault();

		event.clientX = event.touches[0].clientX;
		event.clientY = event.touches[0].clientY;

		onDocumentMouseMove( event );

	}


	function allVisible() {

		for ( let child of surfaceMeshesChildren ) {

				child.visible = true;

		}

	}