

	var icw;
	var THREE;
	var renderer;
	var camera;
	var scene;

	var gbjson;
	var surfaceMeshesChildren;

	var divHeadsUp;
	var intersected;
	var objects;
	var mouse;

	var telltalesVertex;
	var telltalesPolyloop;

	var draggableLeft;
	var draggableTop;

	var draggableStartX;
	var draggableStartY;

	initHeadsUp();

	function initHeadsUp() {

		if ( !divHeadsUp ) {

			divHeadsUp = document.body.appendChild( document.createElement( 'div' ) );
			divHeadsUp.style.cssText =
				'background-color: #ddd; border-radius: 8px; display: none; min-height: 100px; min-width: 200px; opacity: 0.95; ' +
				' overflow: auto; padding: 5px 5px 10px 5px; position: fixed; resize: both; z-index: 1000; ' +
			'';

			divHeadsUp.innerHTML =
				'<div id=divDraggableHeader title="Open JavaScript console to see more data" >' +
					'<small>Click here to move</small>' +
					'<button onclick=divHeadsUp.style.display="none"; style=float:right;z-index:20; >&#x2716;</button>' +
				'</div>' +
				'<div id=divItems ></div>' +
			'';

			divDraggableHeader.style.cssText =
				'background-color: #2196F3; color: #fff; cursor: move; padding: 10px; z-index: 10;';

			divDraggableHeader.addEventListener( 'mousedown', onMouseDownDraggable, false );
			window.addEventListener( 'mouseup', onMouseUpDraggable, false );

			divDraggableHeader.addEventListener( 'touchstart', onTouchStartDraggable, false );
			divDraggableHeader.addEventListener( 'touchmove', onTouchMoveDraggable, false );

		}

		if ( butHeadsUp.style.backgroundColor !== 'pink' ) {

			icw = ifrThree.contentWindow;
			THREE = icw.THREE;
			renderer = icw.renderer;
			camera = icw.camera;
			scene = icw.scene
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
						'adjacenct 1:  <button onclick=toggleSpaceHUD("' + space1.id + '"); >' + space1.id + '</button>' + b +
						( space1.Name ? 'name: ' + space1.Name + b : '' ) +
						( space1.Description ? 'description: ' + space1.Description + b : '' ) +
						( space1.Area ? 'area: ' + space1.Area + b : '' ) +
						( space1.Volume ? 'volume: ' + space1.Volume + b : '' ) +
						( space1.conditionType ? 'conditionType: ' + space1.conditionType + b : '' ) +
						( space1.zoneIdRef ? 'zoneIdRef: ' + space1.zoneIdRef + b : '' ) +
						'storey: <button onclick=toggleStoreyHUD("' + space1.buildingStoreyIdRef + '"); >' + space1.buildingStoreyIdRef + '</button>' + b +
						( space1.CADObjectId ? 'CADObjectId: ' + space1.CADObjectId + b : '' ) +

						'<hr>' +
						'adjacenct 2: <button onclick=toggleSpaceHUD("' + space2.id + '"); >' + space2.id + '</button>' + b +
						( space2.Name ? 'name: ' + space2.Name + b : '' ) +
						( space2.Description ? 'description: ' + space2.Description + b : '' ) +
						( space2.Area ? 'area: ' + space2.Area + b : '' ) +
						( space2.Volume ? 'volume: ' + space2.Volume + b : '' ) +
						( space2.conditionType ? 'conditionType: ' + space2.conditionType + b : '' ) +
						( space2.zoneIdRef ? 'zoneIdRef: ' + space2.zoneIdRef + b : '' ) +
//						( space2.buildingStoreyIdRef ? 'buildingStoreyIdRef: ' + space2.buildingStoreyIdRef + b : '' )  +
						'storey: <button onclick=toggleStoreyHUD("' + space2.buildingStoreyIdRef + '"); >' + space2.buildingStoreyIdRef + '</button>' + b +

						( space2.CADObjectId ? 'CADObjectId: ' + space2.CADObjectId + b : '' ) +
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
					'adjacenct space id: <button onclick=toggleSpaceHUD("' + space.id + '"); >' + space.id + '</button>' + b +
					( space.Name ? 'name: ' + space.Name + b : '' )  +
					( space.Description ? 'description: ' + space.Description + b : '' )  +
					( space.Area ? 'area: ' + space.Area + b : '' )  +
					( space.Volume ? 'volume: ' + space.Volume + b : '' )  +
					'storey: <button onclick=toggleStoreyHUD("' + space.buildingStoreyIdRef + '"); >' + space.buildingStoreyIdRef + '</button>' + b +
					( space.conditionType ? 'conditionType: ' + space.conditionType + b : '' )  +
					( space.zoneIdRef ? 'zoneIdRef: ' + space.zoneIdRef + b : '' ) +
					( space.CADObjectId ? 'CADObjectId: ' + space.CADObjectId + b : '' ) +
				b;

			}

		}

			//		adjacenciesTxt = adjacencies.length ? '


		txt =
			'<p>' +
			'id: <button onclick=toggleSurfaceHUD("' + data.id + '")  >' + data.id + '</button>' + b +
			( data.Name ? 'surface name: ' + data.Name + b : '' )  +
			'toggle type <button onclick=toggleSurfaceTypeHUD("' + data.surfaceType + '");  >' + data.surfaceType + '</button>' + b +
			'CADObjectId: <button onclick=toggleCadIdHUD("' + encodeURI( data.CADObjectId ) + '"); >' + data.CADObjectId + '</button>' + b +
			'</p>' +
			'<p>' +
				'<button onclick=intersected.visible=!intersected.visible;  >toggle surface visibility</button> ' +
				'<button class=toggle onclick=alert("coming-soon!"); >delete surface</button>' +
			'</p>' +
			adjacenciesTxt +
			'<p>' +
				'<button class=toggle onclick=allVisible(); >all visible</button> ' +
				'<button onclick=displayTelltalesVertex(); title="Three.js data" >vertex telltales</button> ' +
				'<button onclick=displayTelltalesPolyloop(); title="gbXML data" >polyloop telltales</button>' +
			'</p>' +
		'';

		divItems.innerHTML = txt;
		document.body.style.cursor = 'pointer';

	}



	function displayTelltalesVertex() {

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

			placard = drawPlacard( i.toString(), 0.01, 120, vertex.x, vertex.y, vertex.z + 0.5 );
			placard.position.copy( intersected.position );
			placard.quaternion.copy( intersected.quaternion );

			// console.log( 'placard', placard );
			telltalesVertex.add( placard );
			telltalesVertex.add( mesh );

		}

		icw.scene.add( telltalesVertex );

	}



	function displayTelltalesPolyloop() {

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

			placard = drawPlacard( i.toString(), 0.01, 200, parseFloat( vertex[ 0 ] ) + 0.5, parseFloat( vertex[ 1 ] ) + 0.5, parseFloat( vertex[ 2 ] ) + 0.5 );
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



	function toggleSurfaceHUD ( id ) {

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

		for ( let child of surfaceMeshesChildren ) {

			if ( CADObjectId === encodeURI( child.userData.data.CADObjectId ) ) {

				child.visible = true;

			} else {

				child.visible = false;

			}

		}

	}



	function getSpaceId( spaceIdRef ) {

		if ( !gbjson.Campus.Building.Space || !gbjson.Campus.Building.Space.length ) { return; }

		const space = gbjson.Campus.Building.Space.find( function( item ) { return item.id === spaceIdRef; } );

		//		console.log( 'space', space );

		return space;

	}



	function toggleSpaceHUD( id ) {

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

		const space = gbjson.Campus.Building.Space.find( function( item ) { return item.id === id; } );

		console.log( 'space', space );

	}



	function toggleStoreyHUD( id ) {

		//console.log( 'id', id );

		const spaces = gbjson.Campus.Building.Space;

		for ( let child of surfaceMeshesChildren ) {

			child.visible = false;

		}

		for ( let child of surfaceMeshesChildren ) {

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



	function onDocumentMouseDown( event ) {

		//icw.dragMouseDown;( event );
		divHeadsUp.style.display = 'none';

		renderer.domElement.removeEventListener( 'click', icw.onClickEvent, false );

	}



	function onDocumentTouchStart( event ) {

		event.preventDefault();

		event.clientX = event.touches[0].clientX;
		event.clientY = event.touches[0].clientY;

		//		icw.dragElement;( event );
		onDocumentMouseMove( event );

	}


	function allVisible() {

		for ( let child of surfaceMeshesChildren ) {

				child.visible = true;

		}

	}


	function onMouseDownDraggable( event ) {

		draggableTop = event.clientY - divHeadsUp.offsetTop;
		draggableLeft = event.clientX - divHeadsUp.offsetLeft;

		window.addEventListener('mousemove', onMouseMoveDraggable, true );

	}



	function onMouseMoveDraggable( event ){

		divHeadsUp.style.top = ( event.clientY - draggableTop ) + 'px';
		divHeadsUp.style.left = ( event.clientX - draggableLeft ) + 'px';

	}



	function onMouseUpDraggable() {

		window.removeEventListener( 'mousemove', onMouseMoveDraggable, true );

	}



	function onTouchStartDraggable( event ){

		draggableLeft = divHeadsUp.offsetLeft;
		draggableStartX = event.changedTouches[ 0 ].clientX;
		draggableTop = divHeadsUp.offsetTop;
		draggableStartY = event.changedTouches[ 0 ].clientY;
		//console.log( 'draggableTop', draggableTop, draggableStartY );
		event.preventDefault();

		//console.log ('Status: touchstart', 'ClientX: ' + draggableStartX + 'px' );

	}



	function onTouchMoveDraggable( event ){

		const distX = event.changedTouches[ 0 ].clientX - draggableStartX;
		let left = draggableLeft + distX > document.body.clientWidth - 100 ? document.body.clientWidth - 100 : draggableLeft + distX;
		left = draggableLeft + distX < 0 ? 0 : left;
		//console.log( 'left2', left  );
		divHeadsUp.style.left = left + 'px';

		const distY = event.changedTouches[ 0 ].clientY - draggableStartY;
		// top is a reserved word
		let ttop = draggableTop + distY > window.innerHeight - 100 ? window.innerHeight - 100 : draggableTop + distY;
		ttop = draggableTop + distY < 0 ? 0 : ttop;
		//console.log( 'ttop', ttop  );
		divHeadsUp.style.top = ttop + 'px';

		event.preventDefault();

		//console.log ( 'Status: touchmove', 'Horizontal distance traveled: ' + distY + 'px' );

	}
