
	var HUD = {};

	var divHeadsUp;
	var intersected;
	var objects;
	var mouse;

	var telltalesVertex;
	var telltalesPolyloop;


	initHeadsUp();

	function initHeadsUp() {

		if ( !divHeadsUp ) {

			divHeadsUp = document.body.appendChild( document.createElement( 'div' ) );
			divHeadsUp.style.cssText =
				'background-color: #f8f8f8; border-radius: 8px; display: none; left: calc( 100% - 400px ); '+
				'min-height: 100px; min-width: 200px; opacity: 0.95; overflow: auto; ' +
				'padding: 5px 5px 10px 5px; position: fixed; resize: both; top: 20px; z-index: 10; ' +
			'';

			divHeadsUp.innerHTML =
				'<div id=divDraggableHeader2 title="Open JavaScript console to see more data" >' +
					'Click here to move' +
					'<button onclick=divHeadsUp.style.display="none"; style=float:right;z-index:20; >&#x2716;</button>' +
				'</div>' +
				'<div id=divItems ></div>' +
			'';

			divDraggableHeader2.style.cssText =
				'background-color: indianred; color: #fff; cursor: move; padding: 10px; z-index: 10;';

			divDraggableHeader2.addEventListener( 'mousedown', COR.onMouseDownDraggable, false );

			divDraggableHeader2.addEventListener( 'touchstart', COR.onTouchStartDraggable, false );
			divDraggableHeader2.addEventListener( 'touchmove', COR.onTouchMoveDraggable, false );

//			window.addEventListener( 'mouseup', onMouseUpDraggable, false );

		}

		if ( butHeadsUp.style.backgroundColor !== 'var( --but-bg-color )' ) {

			mouse = new THREE.Vector2();

			THR.renderer.domElement.addEventListener( 'click', onRendererMouseMoveHUD, false );
			THR.renderer.domElement.addEventListener( 'touchstart', onRendererTouchStartHUD, false );

			butHeadsUp.style.backgroundColor = 'var( --but-bg-color )';

			HUD.surfacesXml = gbxml.getElementsByTagName("Surface");

		} else {

			toggleHeadsUpOff();

		}

	}



	function toggleHeadsUpOff() {

		if ( intersected && intersected.material.emissive ) { intersected.material.emissive.setHex( intersected.currentHex ); }
		if ( intersected ) { intersected.material.opacity = intersected.currentOpacity; }
		divHeadsUp.style.display = 'none';
		surfaceMeshesChildren = [];

		THR.renderer.domElement.removeEventListener( 'click', onRendererMouseMoveHUD, false );
		THR.renderer.domElement.removeEventListener( 'click', onRendererMouseDownHUD, false );

		butHeadsUp.style.backgroundColor = '';

	}



	function onRendererMouseMoveHUD( event ) {

		var raycaster, intersects;

		event.preventDefault();

		if ( event.buttons > 0 ) { return; }

		mouse.x = ( event.clientX / THR.renderer.domElement.clientWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / THR.renderer.domElement.clientHeight ) * 2 + 1;

		raycaster = new THREE.Raycaster();
		raycaster.setFromCamera( mouse, THR.camera );

		intersects = raycaster.intersectObjects( surfaceMeshes.children );

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

		HUD.setHeadsUp( event );

	}


// needs big clean up

	HUD.setHeadsUp = ( event ) => {

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

		//divHeadsUp.style.left = 0 + 0.5 * window.innerWidth + mouse.x * 0.5 * innerWidth + 'px';
		//divHeadsUp.style.top = 30 + 0.5 * window.innerHeight - mouse.y * 0.5 * window.innerHeight + 'px';

		//divHeadsUp.style.left = 'calc( 100% - 400px )';
		//divHeadsUp.style.top = '20px'; // + 0.5 * window.innerHeight - mouse.y * 0.5 * window.innerHeight + 'px';

		divHeadsUp.style.display = '';
		//console.log( '', divHeadsUp.style.left, divHeadsUp.style.top );

		data = intersected.userData.data;
		//console.log( 'data', data );

		adjacenciesTxt = data.AdjacentSpaceId ? data.AdjacentSpaceId : 'no adjacency';

		if ( adjacenciesTxt !== 'no adjacency' ) {

			if ( Array.isArray( adjacenciesTxt ) === true ) {

				//console.log( 'adjacenciesTxt', adjacenciesTxt );

				space1 = HUD.getSpaceId( adjacenciesTxt[ 0 ].spaceIdRef );
				space2 = HUD.getSpaceId( adjacenciesTxt[ 1 ].spaceIdRef );

				if ( space1 && space2 ) {

					adjacenciesTxt =

						'<hr>' +
						'adjacent 1:  <button onclick=HUD.toggleSpaceHUD("' + space1.id + '"); >' + space1.id + '</button>' + b +
						( space1.Name ? 'name: ' + space1.Name + b : '' ) +
						( space1.Description ? 'description: ' + space1.Description + b : '' ) +
						( space1.Area ? 'area: ' + space1.Area + b : '' ) +
						( space1.Volume ? 'volume: ' + space1.Volume + b : '' ) +
						( space1.conditionType ? 'condition type: ' + space1.conditionType + b : '' ) +
						( space1.zoneIdRef ? 'zone id rRef: ' + space1.zoneIdRef + b : '' ) +
						'storey: <button onclick=HUD.toggleStoreyHUD("' + space1.buildingStoreyIdRef + '"); >' + space1.buildingStoreyIdRef + '</button>' + b +
						( space1.CADObjectId ? 'cad object id: ' + space1.CADObjectId + b : '' ) +

						'<hr>' +
						'adjacent 2: <button onclick=HUD.toggleSpaceHUD("' + space2.id + '"); >' + space2.id + '</button>' + b +
						( space2.Name ? 'name: ' + space2.Name + b : '' ) +
						( space2.Description ? 'description: ' + space2.Description + b : '' ) +
						( space2.Area ? 'area: ' + space2.Area + b : '' ) +
						( space2.Volume ? 'volume: ' + space2.Volume + b : '' ) +
						( space2.conditionType ? 'condition type: ' + space2.conditionType + b : '' ) +
						( space2.zoneIdRef ? 'zone id ref: ' + space2.zoneIdRef + b : '' ) +
		//						( space2.buildingStoreyIdRef ? 'buildingStoreyIdRef: ' + space2.buildingStoreyIdRef + b : '' )  +
						'storey: <button onclick=HUD.toggleStoreyHUD("' + space2.buildingStoreyIdRef + '"); >' + space2.buildingStoreyIdRef + '</button>' + b +

						( space2.CADObjectId ? 'cad object id: ' + space2.CADObjectId + b : '' ) +
					'';

				} else {

					adjacenciesTxt = 'adjacencies: ' + data.AdjacentSpaceId[ 0 ] + ' ' + data.AdjacentSpaceId[ 1 ];

				}

			} else {

				//console.log( 'data.AdjacentSpaceId.spaceIdRef', data.AdjacentSpaceId.spaceIdRef );
				//console.log( 'adjacenciesTxt', adjacenciesTxt );

				space = HUD.getSpaceId( data.AdjacentSpaceId.spaceIdRef, 'single' );

				if ( !space ) { return; }

				adjacenciesTxt =
					'<hr>' +
					'adjacent space id: <button onclick=HUD.toggleSpaceHUD("' + space.id + '"); >' + space.id + '</button>' + b +
					( space.Name ? 'name: ' + space.Name + b : '' )  +
					( space.Description ? 'description: ' + space.Description + b : '' ) +
					( space.Area ? 'area: ' + space.Area + b : '' ) +
					( space.Volume ? 'volume: ' + space.Volume + b : '' ) +
					'storey: <button onclick=HUD.toggleStoreyHUD("' + space.buildingStoreyIdRef + '"); >' + space.buildingStoreyIdRef + '</button>' + b +
					( space.conditionType ? 'condition type: ' + space.conditionType + b : '' )  +
					( space.zoneIdRef ? 'zone id ref: ' + space.zoneIdRef + b : '' ) +
					( space.CADObjectId ? 'CAD Object Id: ' + space.CADObjectId + b : '' ) +
				'';

			}

		}

		//adjacenciesTxt = adjacencies.length ? '


		txt =
			'<p>' +
			'surface id: <button onclick=HUD.toggleSurfaceHUD("' + data.id + '")  >' + data.id + '</button>' + b +
			( data.Name ? 'surface name: ' + data.Name + b : '' ) +
			'type <button onclick=HUD.toggleSurfaceTypeHUD("' + data.surfaceType + '");  >' + data.surfaceType + '</button>' + b +
			( data.CADObjectId ? 'cad object id: <button onclick=HUD.toggleCadIdHUD("' + encodeURI( data.CADObjectId ) + '"); >' + data.CADObjectId + '</button>' + b : '' ) +
			'</p>' +
			'<p>' +
				'<button onclick=intersected.visible=!intersected.visible;  >toggle visibility</button> ' +
				'<button class=toggle onclick=GBV.deleteSurface("' + data.id + '"); >delete surface</button>' +
			'</p>' +

			adjacenciesTxt +

			'<p>' +
				'<button class=toggle onclick=HUD.allVisible(); >all visible</button>' +
				'<hr>' +
				'For debug: <button onclick=HUD.displayTelltalesVertex(); title="Three.js data" >vertex telltales</button> ' +
				'<button onclick=HUD.displayTelltalesPolyloop(); title="gbXML data" >polyloop telltales</button>' +
			'</p>' +
		'';

		divItems.innerHTML = txt;
		document.body.style.cursor = 'pointer';

		if ( window.detSurfaceEdits ) {

			inpSurface.value = data.id;
			selSurface.value = data.id;
			const surface = HUD.surfacesXml[ selSurface.selectedIndex ];
			//console.log( 'surface', surface );

			const type = surface.attributes.getNamedItem( 'surfaceType' ).nodeValue;
			//console.log( 'type', type );

			selType.selectedIndex = surfaceTypes.indexOf( type );

			const adjs = surface.getElementsByTagName( 'AdjacentSpaceId' );

			index = spacesXmlIds.indexOf( adjs[ 0 ].attributes.getNamedItem( 'spaceIdRef' ).nodeValue );
			selAdjacentSpaceId0.selectedIndex = index;

			if ( adjs[ 1 ] ) {

				index = spacesXmlIds.indexOf( adjs[ 1 ].attributes.getNamedItem( 'spaceIdRef' ).nodeValue );

			} else {

				index = 0;

			}

			selAdjacentSpaceId1.selectedIndex = index;

		}

	}



	HUD.deleteSurface = ( id ) => {

		const proceed = confirm( 'OK to delete surface: ' + id + '?\n\nUse \'edit file\' to save deletes.' );

		if( !proceed ){ return; }

		surfacesResponse = gbxmlResponseXML.getElementsByTagName("Surface");

		surface = surfacesResponse[ id ];
		console.log( 'surface to delete', surface );

		surface.remove();
		surfaceMeshes.remove( intersected );

	}



	HUD.displayTelltalesVertex = () => {

		scene.remove( telltalesVertex );

		if( !intersected ) { return; }

		telltalesVertex = new THREE.Object3D();


		const vertices = intersected.geometry.vertices;

		for ( let i = 0; i < vertices.length; i++ ) {

			const vertex = vertices[ i ];
			const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
			geometry.applyMatrix( new THREE.Matrix4().makeTranslation( vertex.x, vertex.y, vertex.z ) );
			const material = new THREE.MeshNormalMaterial();
			const mesh = new THREE.Mesh( geometry, material );
			mesh.position.copy( intersected.position );
			mesh.quaternion.copy( intersected.quaternion );

			placard = HUD.drawPlacard( i.toString(), 0.01, 120, vertex.x, vertex.y, vertex.z + 0.5 );
			placard.position.copy( intersected.position );
			placard.quaternion.copy( intersected.quaternion );

			// console.log( 'placard', placard );
			telltalesVertex.add( placard );
			telltalesVertex.add( mesh );

		}

		scene.add( telltalesVertex );

	}



	HUD.displayTelltalesPolyloop = () => {

		scene.remove( telltalesPolyloop );

		if( !intersected ) { return; }

		telltalesPolyloop = new THREE.Object3D();

		const vertices = intersected.userData.data.PlanarGeometry.PolyLoop.CartesianPoint;

		for ( let i = 0; i < vertices.length; i++ ) {

			const vertex = vertices[ i ].Coordinate;
			const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
			const material = new THREE.MeshNormalMaterial();
			const mesh = new THREE.Mesh( geometry, material );
			// console.log( 'vertex', vertex );

			mesh.position.set( parseFloat( vertex[ 0 ] ), parseFloat( vertex[ 1 ] ), parseFloat( vertex[ 2 ] ) );

			placard = HUD.drawPlacard( i.toString(), 0.01, 200, parseFloat( vertex[ 0 ] ) + 0.5, parseFloat( vertex[ 1 ] ) + 0.5, parseFloat( vertex[ 2 ] ) + 0.5 );
			// console.log( 'placard', placard );
			telltalesPolyloop.add( placard );
			telltalesPolyloop.add( mesh );

		}

		const openings = intersected.userData.data.Opening ? intersected.userData.data.Opening : [];

		for ( let i = 0; i < openings.length; i++ ) {

			const opening = openings[ i ]
			//console.log( 'opening', opening );

			const vertices = opening.PlanarGeometry.PolyLoop.CartesianPoint;
			//console.log( 'vertices', vertices );

			for ( let i = 0; i < vertices.length; i++ ) {

				const vertex = vertices[ i ].Coordinate;
				const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
				const material = new THREE.MeshNormalMaterial();
				const mesh = new THREE.Mesh( geometry, material );
				// console.log( 'vertex', vertex );

				mesh.position.set( parseFloat( vertex[ 0 ] ), parseFloat( vertex[ 1 ] ), parseFloat( vertex[ 2 ] ) );

				placard = drawPlacard( i.toString(), 0.01, 10, parseFloat( vertex[ 0 ] ) + 0.5, parseFloat( vertex[ 1 ] ) + 0.5, parseFloat( vertex[ 2 ] ) + 0.5 );
				// console.log( 'placard', placard );
				telltalesPolyloop.add( placard );
				telltalesPolyloop.add( mesh );

			}


		}

		scene.add( telltalesPolyloop );

	}



	HUD.drawPlacard = ( text, scale, color, x, y, z ) => {

		// 2016-02-27 ~ https://github.com/jaanga/jaanga.github.io/tree/master/cookbook-threejs/examples/placards

		var placard = new THREE.Object3D();
		var v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };

		var texture = canvasMultilineText( text, { backgroundColor: color }   );
		var spriteMaterial = new THREE.SpriteMaterial( { map: texture, opacity: 0.9, transparent: true } );
		var sprite = new THREE.Sprite( spriteMaterial );
		sprite.position.set( x, y, z ) ;
		sprite.scale.set( scale * texture.image.width, scale * texture.image.height );

		var geometry = new THREE.Geometry();
		geometry.vertices = [ v( 0, 0, 0 ),  v( x, y, z ) ];
		var material = new THREE.LineBasicMaterial( { color: 0xaaaaaa } );
		var line = new THREE.Line( geometry, material );

		//placard.add( sprite, line );
		placard.add( sprite );
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



	HUD.toggleSurfaceHUD = ( id ) => {

		for ( let child of surfaceMeshes.children ) {

			if ( id === child.userData.data.id ) {

				child.visible = true;

				//console.log( '', child );

			} else {

				child.visible = false;

			}

		}

	}



	HUD.toggleSurfaceTypeHUD = ( type ) => {

		//console.log( 'type ', type );

		for ( let child of surfaceMeshes.children ) {

			if ( type === child.userData.data.surfaceType ) {

				child.visible = true;

			} else {

				child.visible = false;

			}

		}

	}



	HUD.toggleCadIdHUD = ( CADObjectId ) => {

		for ( let child of surfaceMeshes.children ) {

			if ( CADObjectId === encodeURI( child.userData.data.CADObjectId ) ) {

				child.visible = true;

			} else {

				child.visible = false;

			}

		}

	}



	HUD.getSpaceId = ( spaceIdRef ) => {

		if ( !gbjson.Campus.Building.Space || !gbjson.Campus.Building.Space.length ) { return; }

		const space = gbjson.Campus.Building.Space.find( function( item ) { return item.id === spaceIdRef; } );

		//		console.log( 'space', space );

		return space;

	}



	HUD.toggleSpaceHUD = ( id ) => {

		for ( let child of surfaceMeshes.children ) {

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

		const space = gbjson.Campus.Building.Space.find( function( item ) { return item.id === id; } );

		console.log( 'space', space );

	}



	HUD.toggleStoreyHUD = ( id ) => {

		//console.log( 'id', id );

		const spaces = gbjson.Campus.Building.Space;

		for ( let child of surfaceMeshes.children ) {

			child.visible = false;

		}

		for ( let child of surfaceMeshes.children ) {

			adjacentSpaceId = child.userData.data.AdjacentSpaceId

			if ( !adjacentSpaceId ) { continue; }

			spaceIdRef = Array.isArray( adjacentSpaceId ) ? adjacentSpaceId[ 1 ].spaceIdRef : adjacentSpaceId.spaceIdRef

			for ( let space of spaces ) {

				if ( space.id === spaceIdRef && space.buildingStoreyIdRef === id ) {

					child.visible = true;

				}

			}

		}

		const storey = gbjson.Campus.Building.BuildingStorey.find( function( item ) { return item.id === id; } );

		console.log( 'storey', storey );

	}



	function onRendererMouseDownHUD( event ) {

		//dragMouseDown;( event );
		divHeadsUp.style.display = 'none';

		renderer.domElement.removeEventListener( 'click', onRendererMouseMoveHUD, false );

	}



	function onRendererTouchStartHUD( event ) {

		event.preventDefault();

		event.clientX = event.touches[0].clientX;
		event.clientY = event.touches[0].clientY;

		//		dragElement;( event );
		onRendererMouseMoveHUD( event );

	}


	HUD.allVisible = () => {

		surfaceMeshes.visible = true;
		surfaceEdges.visible = true;

		for ( let child of surfaceMeshes.children ) {

				child.visible = true;

		}

	}