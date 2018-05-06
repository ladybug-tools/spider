// Copyright 2018 Ladybug Tools authors. MIT License

	var HUD = {};


	 HUD.initHeadsUp = function() { // called from bottom of script

		if ( window.butMenuLoad ) { // we are in an iframe

			HUD.butMenuHUD = butMenuLoad;

			HUD.title = 'gv-HUD - gbXML Viewer HUD';;
			document.title = HUD.title;
			aDocumentTitle.innerHTML = HUD.title;
			HUD.butMenuHUD.innerHTML = HUD.title;

			divHeadsUp = icw.divHeadsUp;
			divHamburgerRight = icw.divHamburgerRight;
			HUDdivHeader = icw.HUDdivHeader;
			HUDdivItems = icw.HUDdivItems;
			HUDdivTellTales = icw.HUDdivTellTales;
			selType = icw.selType;
			HUDselSurface = icw.HUDselSurface;

			HUD.setMenuOptions();

		} else {

		}

	};



	HUD.setMenuOptions = function() {

		HUD.mouse = new THREE.Vector2();

		THR.renderer.domElement.addEventListener( 'click', HUD.onRendererMouseMoveHUD, false );

		THR.renderer.domElement.addEventListener( 'touchstart', HUD.onRendererTouchStartHUD, false );


		GBI.setPanelShowHide( HUDdivShowHide );

		GBI.setPanelEditSurface( HUDdivEditSurface );

		HUD.setPanelSurface( HUDdivItems );

		HUD.setPanelTellTale( HUDdivTellTales );


		GBI.setButtonStyleClass( divHeadsUp );

	};


	// Handle events

	HUD.onRendererMouseMoveHUD = function( event ) {

		event.preventDefault();

		if ( event.buttons > 0 ) { return; }

		HUD.mouse.x = ( event.clientX / THR.renderer.domElement.clientWidth ) * 2 - 1;
		HUD.mouse.y = - ( event.clientY / THR.renderer.domElement.clientHeight ) * 2 + 1;

		const raycaster = new THREE.Raycaster();
		raycaster.setFromCamera( HUD.mouse, THR.camera );

		const intersects = raycaster.intersectObjects( GBP.surfaceMeshes.children );

		if ( intersects.length > 0 ) {

			if ( HUD.intersected != intersects[ 0 ].object ) {
				//console.log( 'HUD.intersected', HUD.intersected );

				if ( HUD.intersected && HUD.intersected.material.emissive ) { HUD.intersected.material.emissive.setHex( HUD.intersected.currentHex ); }
				if ( HUD.intersected ) { HUD.intersected.material.opacity = HUD.intersected.currentOpacity; }

				HUD.intersected = intersects[ 0 ].object;

				HUD.setHeadsUp( event );

				console.log( 'HUD.intersected', HUD.intersected );

				if ( HUD.intersected.material.emissive ) {

					HUD.intersected.currentHex = HUD.intersected.material.emissive.getHex();
					HUD.intersected.material.emissive.setHex( 0x440000 );

				}

				HUD.intersected.currentOpacity = HUD.intersected.material.opacity;
				HUD.intersected.material.opacity = 1;

			}

		} else {

			if ( HUD.intersected && HUD.intersected.material.emissive ) { HUD.intersected.material.emissive.setHex( HUD.intersected.currentHex ); }
			if ( HUD.intersected ) { HUD.intersected.material.opacity = HUD.intersected.currentOpacity; }

			HUD.intersected = undefined;

		}

	};



	HUD.onRendererMouseDownHUD= function( event ) {

		divHeadsUp.style.display = 'none';

		THR.renderer.domElement.removeEventListener( 'click', HUD.onRendererMouseMoveHUD, false );

	};



	HUD.onRendererTouchStartHUD = function( event ) {

		event.preventDefault();

		event.clientX = event.touches[0].clientX;
		event.clientY = event.touches[0].clientY;

		HUD.onRendererMouseMoveHUD( event );

	};



	HUD.setHeadsUp = function( event ) {

		// needed?? in event handler??
		if ( HUD.intersected === undefined ) {

			if ( event && event.type === 'touchstart' ) {

				divHeadsUp.style.display = 'none';

			}

			document.body.style.cursor = 'auto';

			return;

		}

		divHeadsUp.style.display = 'block';
		divHamburgerRight.style.display = 'block';
		HUDdivAttributes.innerHTML = '';

		const data = HUD.intersected.userData.data;

		HUD.userDataData = data;
		//console.log( 'data', data );

		HUDselSurfaceId.value = data.id;
		HUDselSurfaceId.click();

	};


	//////////

	HUD.setPanelSurface = function( target ) {
		// sets top panel

		THR.controls.keys = false;

		target.innerHTML =

		`<details open >

			<summary>Surface</summary>

			<div id = "HUDdivPanelSurface" ></div>

			<hr>

		</details>`;

		let item = {};

		item.attribute = 'id';
		item.divAttributes = 'HUDdivCardSurfaceAttributes';
		item.divTarget = document.getElementById( 'HUDdivPanelSurface' );
		item.element = 'Surface';
		item.name = 'itemSurface';
		item.optionValues = GBP.surfaceJson.map ( item => [ item.id, item.Name, item.CADObjectId ] );
		item.parent = GBP.surfaceJson;
		item.placeholder = 'surface id'
		item.selItem = 'HUDselSurfaceId';

		//HUD.item = item;

		GBI.itemSurface = GBI.setElementPanel2( item );
		//console.log( 'GBI.itemSurface', GBI.itemSurface );

	};



	HUD.setPanelTellTale = function ( target ) {

		target.innerHTML =
		`<details>
			<summary>Surface Coordinates</summary>
			<p>
				<button onclick=HUD.displayTelltalesVertex(); title="Three.js data" >vertex telltales</button>
				<button onclick=HUD.displayTelltalesPolyloop(); title="gbXML data" >polyloop telltales</button>
				<button onclick=HUD.removeTelltales() >remove telltales</button>
			<p>
			<div id=HUDdivCoordinates ></div>

		</details>`;

	};


	///////// Editing Elements after push update button

	HUD.updateSurface = function( id ) {
		// not used??

		GBP.surfaceMeshes.children.forEach( function( element ) { element.visible = element.userData.data.id === id ? true : false; } );

		const surfaceMesh = GBP.surfaceMeshes.children.find( ( element ) => element.userData.data.id === id );
		console.log( 'surfaceMesh', surfaceMesh );

		HUD.intersected = surfaceMesh;

	};



	HUD.updateSpace = function( spaceId, spaceRef ) {

		console.log( 'spaceId', spaceId );
		console.log( 'spaceRef', spaceRef );

		const surfaceJson = HUD.userDataData;
		const surfaceId = surfaceJson.id;

		HUD.surfacesXml = GBP.gbxmlResponseXML.getElementsByTagName("Surface");

		const surfaceXml = HUD.surfacesXml[ surfaceJson.id ];

		if ( spaceRef === 0  ) {

			const spaceId = GBIselSpace.value;
			surfaceJson.AdjacentSpaceId.spaceIdRef = spaceId;
			GBIbutSpaceVis0.innerText = spaceId;

			console.log( 'surfaceXml', surfaceXml );

			space = surfaceXml.getElementsByTagName( "AdjacentSpaceId" )[ 0 ];
			space.setAttribute( "spaceIdRef", spaceId );

			console.log( 'space', space );

			//adjacentNew = GBP.gbxmlResponseXML.createElement( "AdjacentSpaceId" );
			//adjacentNew.setAttribute( "spaceIdRef", spaceId );
			//surfaceXml.appendChild( adjacentNew );

			GBI.surfaceChanges.oneAdjacent.push( { id:surfaceId, spaceId: spaceId } )

		} else if ( spaceRef === 1 ) {

			const spaceId = GBIselSpace.value;
			console.log( 'spaceId', spaceId );

			surfaceJson.AdjacentSpaceId[ 0 ].spaceIdRef = spaceId;
			GBIbutSpaceVis1.innerText = spaceId;

			console.log( 'surfaceXml', surfaceXml );

			space = surfaceXml.getElementsByTagName( "AdjacentSpaceId" )[ 0 ];
			space.setAttribute( "spaceIdRef", spaceId );

			//adjacentNew = GBP.gbxmlResponseXML.createElement( "AdjacentSpaceId" );
			//adjacentNew.setAttribute( "spaceIdRef", spaceId );
			//surfaceXml.appendChild( adjacentNew );

			GBI.surfaceChanges.twoAdjacent.push( { id:surfaceId, spaceId: [ surfaceJson.AdjacentSpaceId[ 0 ].spaceIdRef, surfaceJson.AdjacentSpaceId[ 1 ].spaceIdRef ] } )

		} else if ( spaceRef === 2 ) {

			const spaceId = GBIselSpace.value;
			surfaceJson.AdjacentSpaceId[ 1 ].spaceIdRef = spaceId;
			GBIbutSpaceVis2.innerText = spaceId;

			console.log( 'surfaceXml', surfaceXml );

			space = surfaceXml.getElementsByTagName( "AdjacentSpaceId" )[ 1 ];
			space.setAttribute( "spaceIdRef", spaceId );

			//adjacentNew = GBP.gbxmlResponseXML.createElement( "AdjacentSpaceId" );
			//adjacentNew.setAttribute( "spaceIdRef", spaceId );
			//surfaceXml.appendChild( adjacentNew );

			GBI.surfaceChanges.twoAdjacent.push( { id:surfaceId, spaceId: [ surfaceJson.AdjacentSpaceId[ 0 ].spaceIdRef, surfaceJson.AdjacentSpaceId[ 1 ].spaceIdRef ] } )

		}

		//console.log( 'surfaceXml', surfaceXml);
		//console.log( 'adjacentNew', adjacentNew );

		console.log( 'surfaceJson', surfaceJson );

		//alert( 'update space almost working: ' + spaceRef )

		//HUD.setHeadsUp();

	};



	HUD.updateSurfaceType = function() {

		// console.log( 'id', HUD.userDataData );

		const surface = HUD.userDataData;
		//console.log( 'surface', surface );

		const id = surface.id;
		const spaceIdPrev = surface.AdjacentSpaceId;
		//console.log( 'spaceIdPrev', spaceIdPrev );

		const typeNew = surface.surfaceType = GBIselSurfaceType.value;
		//console.log( 'typeNew', typeNew );
		GBI.surfaceChanges.types.push( { id: id, type: typeNew } );

		HUD.surfacesXml = GBP.gbxml.getElementsByTagName("Surface");

		surfaceXml = HUD.surfacesXml[ id ];
		//console.log( 'surfaceXml',  surfaceXml );

		surfaceXml.attributes.getNamedItem( 'surfaceType' ).nodeValue = typeNew;

		surfaceMesh = GBP.surfaceMeshes.children.find( ( element ) => element.userData.data.id === id );
		surfaceMesh.material.color.setHex( GBP.colors[ typeNew ] );
		surfaceMesh.material.needsUpdate = true;

		surfaceJson = surfaceMesh.userData.data;

		const types = ['InteriorWall', 'InteriorFloor', 'Ceiling', 'Air', 'UndergroundCeiling', 'RaisedFloor'];

		if ( typeNew === 'Shade' ) {

			// json
			delete surfaceJson.AdjacentSpaceId;

			// xml
			if ( Array.isArray( spaceIdPrev ) === true ) { // type prev is two adjacents


				const adjSpace1 = surfaceXml.getElementsByTagName("AdjacentSpaceId")[1];
				//console.log( 'adjSpace1',  adjSpace1 );

				const removedId1 = adjSpace1.getAttribute( 'spaceIdRef' );
				const removed1 = surfaceXml.removeChild( adjSpace1 );

				const adjSpace2 = surfaceXml.getElementsByTagName("AdjacentSpaceId")[0];
				//console.log( 'adjSpace2', adjSpace2 );

				const removedId2 = adjSpace2.getAttribute( 'spaceIdRef' );
				const removed2 = surfaceXml.removeChild( adjSpace2 );

				//delete( surfaceJson.AdjacentSpaceId );

				console.log( 'old 2 / new 0 / removed id1: ', removedId1, ' id2: ', removedId2, surfaceXml );

			} else { // type prev is single adjacent

				const adjSpace1 = surfaceXml.getElementsByTagName("AdjacentSpaceId")[ 0 ];
				//console.log( 'spaceId',  spaceId);

				const removedId1 = adjSpace1.getAttribute( 'spaceIdRef' );
				const removed1 = surfaceXml.removeChild( adjSpace1 );

				console.log( 'old 1 / new 0 / id: ', removedId1, surfaceXml );

			}

		} else if ( types.includes( typeNew ) ) { // type new is two adjacents

			//console.log( 'typeNew', typeNew );

			if ( Array.isArray( spaceIdPrev ) === true ) { // type prev is two adjacents

				// leave things untouched
				//console.log( ' prev 2 / now 2 spaceIdPrev', spaceIdPrev );

			} else if ( spaceIdPrev ) { // type prev is single adjacent

				//surfaceJson.AdjacentSpaceId = spaceIdPrev; //{ spaceIdRef: spaceIdPrev };
				prevAdj = surfaceXml.getElementsByTagName("AdjacentSpaceId")[ 0 ];
				const prevId = prevAdj.getAttribute( 'spaceIdRef' );

				surfaceJson.AdjacentSpaceId= [];
				adjacentSpaceId = surfaceJson.AdjacentSpaceId;
				adjacentSpaceId[ 0 ] = { spaceIdRef: prevId };
				adjacentSpaceId[ 1 ] = { spaceIdRef: 'none' };

				console.log( 'old 1 / new 2 / prevId', prevId, surfaceXml );

			} else { // type prev is shade / no adjacent

				//surfaceJson.AdjacentSpaceId = { spaceIdRef: 'none' };

				surfaceJson.AdjacentSpaceId= [ { "spaceIdRef": "none" }, { "spaceIdRef": "none" }];

				//adjacentSpaceId = surfaceJson.AdjacentSpaceId;
				//adjacentSpaceId[ 0 ] = { spaceIdRef: 'none' };
				//adjacentSpaceId[ 1 ] = { spaceIdRef: 'none' };

				console.log( 'old 0 / new 2 / adjacentSpaceId', surfaceJson.adjacentSpaceId );

			}

		} else { // type new is single adjacent

			if ( Array.isArray( spaceIdPrev ) === true ) { // type prev is two adjacents

				const adjacentXml2 = surfaceXml.getElementsByTagName( "AdjacentSpaceId" )[ 1 ];
				const removed2 = surfaceXml.removeChild( adjacentXml2 );

				const adjacentXml1 = surfaceXml.getElementsByTagName( "AdjacentSpaceId" )[ 0 ];
				const removed1 = surfaceXml.removeChild( adjacentXml1 );

				const newAdj = GBP.gbxmlResponseXML.createElement( "AdjacentSpaceId" );
				newAdj.setAttribute( "spaceIdRef", spaceIdPrev[ 0 ].spaceIdRef ) ;
				const newAdjTxt = surfaceXml.appendChild( newAdj );

				surfaceJson.AdjacentSpaceId = { spaceIdRef: spaceIdPrev[ 0 ].spaceIdRef };

				console.log( 'old 2 / new 1', newAdjTxt, surfaceXml );

			} else if ( spaceIdPrev ) { // type prev is single adjacent

				// leave things untouched
				const spaceId = surfaceXml.getElementsByTagName("AdjacentSpaceId")[0];

				console.log( 'old 1 / new 1 / no changes spaceId',  spaceId, surfaceXml );

			} else { // type prev is no adjacent

				//const newAdj = GBP.gbxmlResponseXML.createElement( "AdjacentSpaceId" );
				//newAdj.setAttribute( "spaceIdRef", "none" ) ;
				//const newAdjTxt = surfaceXml.appendChild( newAdj );

				surfaceJson.AdjacentSpaceId = { spaceIdRef: 'none' };

				//surfaceMesh.userData.data.AdjacentSpaceId = 'none';
				console.log( 'old 0 / new 1 / no spaceIdPrev', spaceIdPrev, surfaceXml );

			}

		}

		//console.log( 'surfaceXml',  surfaceXml );
		//console.log( 'type surfaceJson', surfaceJson );

		HUD.setHeadsUp();
		GBI.setSurfaceVisible( id )

	};



	HUD.updateCadId = function( that ){

		const surface = HUD.userDataData;
		console.log( 'surface', surface );

		const id = surface.id;

		HUD.surfacesXml = GBP.gbxml.getElementsByTagName( "Surface" );

		surfaceXml = HUD.surfacesXml[ id ];
		//console.log( 'surfaceXml',  surfaceXml );

		const cadObjId = surfaceXml.getElementsByTagName( "CADObjectId" )[ 0 ];

		if ( cadObjId ) {

			console.log( 'cadObjId', cadObjId.innerHTML );

			//surfaceXml.attributes.getNamedItem( 'CADObjectId' ).nodeValue = that.value;
			cadObjId.innerHTML = that.value;

			//console.log( 'that', that.value );

			surfaceXml.getElementsByTagName("CADObjectId")[ 0 ].innerHTML = that.value;

			surfaceMesh = GBP.surfaceMeshes.children.find( ( element ) => element.userData.data.id === id );

			surfaceMesh.userData.data.CADObjectId = that.value;

			GBI.surfaceChanges.cadObjs.push( { id: id, cadId: that.value } );

			HUD.setHeadsUp();

		} else {

			//alert( 'There is no cad object id associated with this surface. \n\n A future release will allow you to add one.')

			surfaceXml.setAttribute( "CADObjectId", that.value );

			console.log( 'surfaceXml', surfaceXml);
			//const newCadIdTxt = surfaceXml.appendChild( newCadId );
			//console.log( 'newCadIdTxt', newCadIdTxt);

			surfaceMesh = GBX.surfaceMeshes.children.find( ( element ) => element.userData.data.id === id );
			surfaceMesh.userData.data.CADObjectId = that.value;

			GBV.surfaceChanges.cadObjs.push( { id: id, cadId: that.value } );

		}

	};



	///////// 	// to COR or THR?

	HUD.displayTelltalesVertex = function() {

		THR.scene.remove( HUD.telltalesVertex );

		if( !HUD.intersected ) { return; }

		HUD.telltalesVertex = new THREE.Object3D();

		const vertices = HUD.intersected.geometry.vertices;

		options = '';

		for ( let i = 0; i < vertices.length; i++ ) {

			const vertex = vertices[ i ];
			const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
			geometry.applyMatrix( new THREE.Matrix4().makeTranslation( vertex.x, vertex.y, vertex.z ) );
			const material = new THREE.MeshNormalMaterial();
			const mesh = new THREE.Mesh( geometry, material );
			mesh.position.copy( HUD.intersected.position );
			mesh.quaternion.copy( HUD.intersected.quaternion );

			placard = HUD.drawPlacard( i.toString(), 0.01, 120, vertex.x, vertex.y, vertex.z + 0.5 );
			placard.position.copy( HUD.intersected.position );
			placard.quaternion.copy( HUD.intersected.quaternion );

			// console.log( 'placard', placard );
			HUD.telltalesVertex.add( placard );
			HUD.telltalesVertex.add( mesh );

			options += '<option value=${vertex} > coordinate ' + ( i + 1 ) + '</option>';

		}

		THR.scene.add( HUD.telltalesVertex );

		HUDdivCoordinates.innerHTML =

		`<div class=flex-container2 >

			<div class=flex-div1 >
				<p><select id=HUDselCoordinate onchange=HUD.setCoordinateData(); size=6 style=min-width:6rem; >${options}</select></p>
			</div>

			<div id =HUDdivCoordinatesData class=flex-left-div2 >more features coming soon</div>

		</div>`;


	};




	HUD.displayTelltalesPolyloop = function() {

		THR.scene.remove( HUD.telltalesPolyloop );

		if( !HUD.intersected ) { return; }

		HUD.telltalesPolyloop = new THREE.Object3D();

		const vertices = HUD.intersected.userData.data.PlanarGeometry.PolyLoop.CartesianPoint;

		options = '';

		for ( let i = 0; i < vertices.length; i++ ) {

			const vertex = vertices[ i ].Coordinate;
			const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
			const material = new THREE.MeshNormalMaterial();
			const mesh = new THREE.Mesh( geometry, material );
			// console.log( 'vertex', vertex );

			mesh.position.set( parseFloat( vertex[ 0 ] ), parseFloat( vertex[ 1 ] ), parseFloat( vertex[ 2 ] ) );

			placard = HUD.drawPlacard( i.toString(), 0.01, 200, parseFloat( vertex[ 0 ] ) + 0.5, parseFloat( vertex[ 1 ] ) + 0.5, parseFloat( vertex[ 2 ] ) + 0.5 );
			// console.log( 'placard', placard );
			HUD.telltalesPolyloop.add( placard );
			HUD.telltalesPolyloop.add( mesh );

			options += '<option value=${vertex} > coordinate ' + ( i + 1 ) + '</option>';

		}

		const openings = HUD.intersected.userData.data.Opening ? HUD.intersected.userData.data.Opening : [];

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

				placard = HUD.drawPlacard( i.toString(), 0.01, 10, parseFloat( vertex[ 0 ] ) + 0.5, parseFloat( vertex[ 1 ] ) + 0.5, parseFloat( vertex[ 2 ] ) + 0.5 );
				// console.log( 'placard', placard );
				HUD.telltalesPolyloop.add( placard );
				HUD.telltalesPolyloop.add( mesh );

			}


		}

		THR.scene.add( HUD.telltalesPolyloop );

		HUDdivCoordinates.innerHTML =

		`<div class=flex-container2 >

			<div class=flex-div1 >
				<p><select id=HUDselCoordinate onchange=HUD.setCoordinateData(); size=6 style=min-width:6rem; >${options}</select></p>
			</div>

			<div id =HUDdivCoordinatesData class=flex-left-div2 >more features coming soon. sometimes clicking a coordinate works</div>

		</div>`;


	};



	HUD.setCoordinateData = function() {


		vertex = HUD.telltalesPolyloop.children[ HUDselCoordinate.selectedIndex ].position;

		x = vertex;

		console.log( 'vertex', x );

		HUDdivCoordinatesData.innerHTML =
		`
		X = ${vertex.x} <br>
		Y = ${vertex.y} <br>
		Z = ${vertex.z} <br>
		<button >delete</button>`;


	}


	HUD.removeTelltales = function() {

		THR.scene.remove( HUD.telltalesPolyloop );
		THR.scene.remove( HUD.telltalesVertex );

	};



	HUD.drawPlacard = function( text, scale, color, x, y, z ) {

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

	};


	////////// here we go

	HUD.initHeadsUp();