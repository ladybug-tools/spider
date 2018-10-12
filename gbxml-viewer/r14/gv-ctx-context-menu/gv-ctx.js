

	// Handles events

	var CTX = { release: '14.0' };

	CTX.surfaceChanges = {};


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

		const objects = GBX.surfaceMeshes.visible === true ? GBX.surfaceMeshes.children : GBX.surfaceOpenings.children;
		const intersects = raycaster.intersectObjects( objects );

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



	CTX.xxxxonRendererMouseDown = function( event ) {

		//divHeadsUp.style.display = 'none';

		THR.renderer.domElement.removeEventListener( 'click', CTX.onRendererMouseMove, false );

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
		CORdivMenuRight.style.width = '20rem';
		CORdivMenuRight.style.left = 'calc( 100% - 22rem )';

		//CORdivHamburgerRight.style.display = 'block';

		CORdivItemsRight.innerHTML =
			`
			<div id=CTXdivShowHide class=mnuRightDiv ></div>
			<div id=CTXdivEditSurface class=mnuRightDiv ></div>
			<div id=CTXdivItems class=mnuRightDiv ></div>
			<div id=CTXdivAttributes class=mnuRightDiv ></div>
			<div id=CTXdivTellTales class=mnuRightDiv ></div>
			`;

		SEL.setPanelShowHide( CTXdivShowHide );

		CTX.setPanelEditSurface( CTXdivEditSurface );

		CTX.setPanelSurface( CTXdivItems );

		CTX.setPanelTellTale( CTXdivTellTales );

		COR.setMenuButtonsClass( CORdivItemsRight );

	};



	////////// sets top panel with data for currently selected surface

	CTX.setPanelSurface = function( target ) {

		THR.controls.keys = false;

		const title = GBX.surfaceMeshes.visible === true ? 'Surfaces': 'Openings' ;

		target.innerHTML =

		`<details open >

			<summary title="CTX${CTX.release}" >${ title } &nbsp; <a href=#../gv-CTX-context-menu/README.md >?</a></summary>

			<div id = "CTXdivPanelSurface" ></div>

			<hr>

		</details>`;


		const item = GBX.surfaceMeshes.visible === true ? CTX.getItemSurface() : CTX.getItemOpening() ;

		SEL.itemSurface = SEL.getElementPanel( item );

		//CTX.removeTelltales();

		console.log( 'CTX.intersected 222', CTX.intersected);

		const data = CTX.intersected.userData.data;
		//console.log( 'data', data );

		//CTX.userDataData = data;

		CTXselItemId.value = data.id;

		SEL.setElementIdAttributes( CTXselItemId.value, item );
		SEL.setPanelSurfaceAttributes( CTXdivAttributes, data.id );

	};



	CTX.getItemSurface = function(){

		let item = {};
		item.attribute = 'id';
		item.divAttributes = 'CTXdivCardSurfaceAttributes';
		item.divTarget = document.getElementById( 'CTXdivPanelSurface' );
		item.element = 'Surface';
		item.name = 'itemSurface';
		item.optionValues = GBX.surfacesJson.map ( item => [ item.id, item.Name, item.CADObjectId ] );
		item.parent = GBX.surfacesJson;
		item.placeholder = 'surface id';
		item.selItem = 'CTXselItemId';

		return item;

	};



	CTX.getItemOpening = function( ) {

		let item = {};
		GBX.openingsJSON = GBX.surfaceOpenings.children.map( item => item.userData.data );

		item.attribute = 'id';
		item.divAttributes = 'CTXdivCardSurfaceAttributes';
		item.divTarget = document.getElementById( 'CTXdivPanelSurface' );
		item.element = 'Opening';
		item.name = 'itemOpening';
		item.optionValues = GBX.surfaceOpenings.children.map ( item => [ item.userData.data.id, item.userData.data.Name, item.userData.data.CADObjectId ] );
		item.parent = GBX.openingsJSON;
		item.placeholder = 'opening id';
		item.selItem = 'CTXselItemId';

		return item;

	};



	///// Surface Coordinates

	CTX.setPanelTellTale = function ( target ) {

		target.innerHTML =
		`<details>
			<summary>Surface Coordinates</summary>
			<p>
				<button onclick=CTX.displayTelltalesPolyloop(); title="gbXML data" >gbXML coordinates</button>
				<button onclick=CTX.displayTelltalesVertex(); title="Three.js data" >Three.js vertices</button>
				<button onclick=CTX.removeTelltales(); >remove telltales</button>
			<p>
			<div id=CTXdivCoordinates ></div>

		</details>`;

	};



	CTX.setCoordinateData = function() {

		vertex = CTX.telltalesMeshes.children[ CTXselCoordinate.selectedIndex ].position;
		console.log( 'vertex', vertex );

		x = vertex;

		CTXdivCoordinatesData.innerHTML =
		`
		X = ${vertex.x} <br>
		Y = ${vertex.y} <br>
		Z = ${vertex.z} <br>
		<p><button onclick=alert("Coming-soon"); >delete</button></p>`;

	};



	CTX.displayTelltalesPolyloop = function() {

		THR.scene.remove( CTX.telltalesPolyloop );

		//if( !CTX.intersected ) { return; }
		if( !SEL.id ) { return; }

		CTX.telltalesPolyloop = new THREE.Object3D();
		CTX.telltalesMeshes = new THREE.Object3D();

		const surfacesJson  = GBX.surfacesJson.find( item => item.id === SEL.id );

		const vertices = surfacesJson.PlanarGeometry.PolyLoop.CartesianPoint;

		console.log( 'vertices', vertices );

		//const vertices = CTX.intersected.userData.data.PlanarGeometry.PolyLoop.CartesianPoint;

		options = '';

		for ( let i = 0; i < vertices.length; i++ ) {

			const vertex = vertices[ i ].Coordinate;
			const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
			const material = new THREE.MeshNormalMaterial();
			const mesh = new THREE.Mesh( geometry, material );
			// console.log( 'vertex', vertex );

			mesh.position.set( parseFloat( vertex[ 0 ] ), parseFloat( vertex[ 1 ] ), parseFloat( vertex[ 2 ] ) );

			placard = THR.drawPlacard( i.toString(), 0.01, 200, parseFloat( vertex[ 0 ] ) + 0.5, parseFloat( vertex[ 1 ] ) + 0.5, parseFloat( vertex[ 2 ] ) + 0.5 );
			// console.log( 'placard', placard );
			CTX.telltalesPolyloop.add( placard );
			CTX.telltalesMeshes.add( mesh );

			options += '<option value=${vertex} > coordinate ' + ( i + 1 ) + '</option>';

		}

		const openings = surfacesJson.Opening ? surfacesJson.Opening : [];

		//const openings = surfacesJson.PlanarGeometry.PolyLoop.CartesianPoint;

		for ( let i = 0; i < openings.length; i++ ) {

			const opening = openings[ i ];
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

				placard = CTX.drawPlacard( i.toString(), 0.01, 10, parseFloat( vertex[ 0 ] ) + 0.5, parseFloat( vertex[ 1 ] ) + 0.5, parseFloat( vertex[ 2 ] ) + 0.5 );
				// console.log( 'placard', placard );
				CTX.telltalesPolyloop.add( placard );
				CTX.telltalesPolyloop.add( mesh );

			}

		}

		THR.scene.add( CTX.telltalesPolyloop, CTX.telltalesMeshes );

		CTXdivCoordinates.innerHTML =

		`<div class=flex-container2 >

			<div class=flex-div1 >
				<p><select id=CTXselCoordinate onclick=CTX.setCoordinateData(); onchange=CTX.setCoordinateData(); size=6 style=min-width:6rem; >${options}</select></p>
			</div>

			<div id =CTXdivCoordinatesData class=flex-left-div2 >click a coordinate</div>

		</div>`;


	};



	CTX.displayTelltalesVertex = function() {

		THR.scene.remove( CTX.telltalesVertex );

		//if( !CTX.intersected ) { return; }
		if( !SEL.id ) { return; }

		CTX.telltalesVertex = new THREE.Object3D();

		const surfaceMesh  = GBX.surfaceMeshes.children.find( item => item.userData.data.id === SEL.id );

		const vertices = CTX.intersected.geometry.vertices;

		options = '';

		for ( let i = 0; i < vertices.length; i++ ) {

			const vertex = vertices[ i ];
			const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
			geometry.applyMatrix( new THREE.Matrix4().makeTranslation( vertex.x, vertex.y, vertex.z ) );
			const material = new THREE.MeshNormalMaterial();
			const mesh = new THREE.Mesh( geometry, material );
			mesh.position.copy( CTX.intersected.position );
			mesh.quaternion.copy( CTX.intersected.quaternion );

			placard = THR.drawPlacard( i.toString(), 0.01, 120, vertex.x, vertex.y, vertex.z + 0.5 );
			placard.position.copy( CTX.intersected.position );
			placard.quaternion.copy( CTX.intersected.quaternion );

			// console.log( 'placard', placard );
			CTX.telltalesVertex.add( placard );
			CTX.telltalesVertex.add( mesh );

			options += '<option value=${vertex} > coordinate ' + ( i + 1 ) + '</option>';

		}

		THR.scene.add( CTX.telltalesVertex );

		/*
		CTXdivCoordinates.innerHTML =

		`<div class=flex-container2 >

			<div class=flex-div1 >
				<p><select id=CTXselCoordinate onchange=CTX.setCoordinateData(); size=6 style=min-width:6rem; >${options}</select></p>
			</div>

			<div id =CTXdivCoordinatesData class=flex-left-div2 >more features coming soon</div>

		</div>`;
		*/


	};



	CTX.removeTelltales = function() {

		THR.scene.remove( CTX.telltalesPolyloop );
		THR.scene.remove( CTX.telltalesVertex );
		CTXdivCoordinates.innerHTML = 'click a button';

	};



	////////// Editing

	CTX.setPanelEditSurface = function( target ) {

		target.innerHTML =
		`<details open>

			<summary>Edit the Surface</summary>

			<button class=toggle onclick=CTX.deleteSurface(); >delete surface</button>
				<button onclick=CTX.addModifiedBy(); title='add name, app, date and time of the edits' >modified by </button>
				<button onclick=CTX.saveFile(); title="creates a new file with the changes" >save edits</button>

			<hr>

		</details>`;

	};



	CTX.deleteSurface = function() {

		//const id = SEL.selSurfaceId.value;
		const id = CTXselItemId.value;

		const proceed = confirm( 'OK to delete surface: ' + id + '?' );

		if ( !proceed ){ return; }

		if ( !CTX.surfaceChanges.deletes ) { CTX.surfaceChanges.deletes = []; }

		// remove from gbxml
		const surfacesResponse = GBX.gbxml.getElementsByTagName( "Surface" );
		const surfaceXml = surfacesResponse[ id ];
		//console.log( 'id', id,'\nsurface to delete', surfaceXml );

		const name = surfaceXml.getElementsByTagName("Name")[ 0 ].innerHTML;
		//console.log( 'name', name );

		CTX.surfaceChanges.deletes.push( name );

		surfaceXml.remove();


		// remove from gbjson
		GBX.surfacesJson = GBX.surfacesJson.filter( element => element.id != id );
		//console.log( 'GBX.surfacesJson', GBX.surfacesJson );

		// remove from three.js
		const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === id );
		GBX.surfaceMeshes.remove( surfaceMesh );


		const element =  document.getElementById( 'divSurface' + id );
		// console.log( 'element', element );

		if ( element ) {

			element.innerHTML = '<p>Surface deleted</p>' + element.innerHTML;
			element.style.opacity = 0.2;

		}

	};



	CTX.addModifiedBy = function() {

		// not adding spaces and new lines nicely. Why?

		const documentHistoryXml = GBX.gbxmlResponseXML.getElementsByTagName( "DocumentHistory" );

		const programInfoNew = GBX.gbxmlResponseXML.createElement( "ProgramInfo" );

		programInfoNew.setAttribute( "id", "ladybug-tools-spider" );

		documentHistoryXml[ 0 ].appendChild( programInfoNew );

		const productNameNew = GBX.gbxmlResponseXML.createElement( "ProductName" );

		const newText = GBX.gbxmlResponseXML.createTextNode( 'Ladybug-Tools/spider' );

		productNameNew.appendChild( newText );

		programInfoNew.appendChild( productNameNew );

		productNameNew.nodeValue = 'Ladybug-Tools/spider';


		const modifiedByNew = GBX.gbxmlResponseXML.createElement( "ModifiedBy" );

		modifiedByNew.setAttribute( "personId", "Your name" );

		modifiedByNew.setAttribute( "programId", "ladybug-tools-spider" );

		modifiedByNew.setAttribute( "date", ( new Date() ).toISOString() );

		documentHistoryXml[ 0 ].appendChild( modifiedByNew );

		alert( 'Adding to gbXML:\n\n' + GBX.gbxmlResponseXML.getElementsByTagName( "ModifiedBy" )[0].outerHTML );

	};



	CTX.saveFile = function() {

		//xmlText = prettifyXml( gbxmlResponseXML ); // not
		let xmlText = new XMLSerializer().serializeToString( GBX.gbxml );

		xmlText = xmlText.replace( /encoding\=\"utf\-16\"/gi, '' );
		//console.log( 'xmlText', xmlText );

		var blob = new Blob( [ xmlText ] );
		var a = document.body.appendChild( document.createElement( 'a' ) );
		a.href = window.URL.createObjectURL( blob );
		a.download = GBX.gbjson.Campus.Building.id + '.xml';
		a.click();
		//		delete a;
		a = null;

	};



	///////// Editing Elements after push update button

	CTX.updateSurface = function( id ) {
		// not used??

		GBX.surfaceMeshes.children.forEach( function( element ) { element.visible = element.userData.data.id === id ? true : false; } );

		const surfaceMesh = GBX.surfaceMeshes.children.find( ( element ) => element.userData.data.id === id );
		console.log( 'surfaceMesh', surfaceMesh );

		CTX.intersected = surfaceMesh;

	};



	CTX.updateSpace = function( spaceId, spaceRef ) {

		console.log( 'spaceId', spaceId );
		console.log( 'spaceRef', spaceRef );

		const surfaceJson = CTX.intersected.userData.data;
		const surfaceName = surfaceJson.Name;

		//CTX.surfacesXml = GBX.gbxmlResponseXML.getElementsByTagName("Surface");
		CTX.surfacesXml = GBX.gbxml.getElementsByTagName("Surface");

		const surfaceXml = CTX.surfacesXml[ surfaceJson.id ];

		if ( spaceRef === 0  ) {

			const spaceId = SELselSpace.value;
			surfaceJson.AdjacentSpaceId.spaceIdRef = spaceId;
			//SELbutSpaceVis0.innerText = spaceId;

			console.log( 'surfaceXml', surfaceXml );

			space = surfaceXml.getElementsByTagName( "AdjacentSpaceId" )[ 0 ];
			space.setAttribute( "spaceIdRef", spaceId );

			console.log( 'space', space );

			//adjacentNew = GBX.gbxmlResponseXML.createElement( "AdjacentSpaceId" );
			//adjacentNew.setAttribute( "spaceIdRef", spaceId );
			//surfaceXml.appendChild( adjacentNew );

			if ( !SEL.surfaceChanges.oneAdjacent ) { SEL.surfaceChanges.oneAdjacent = []; }
			SEL.surfaceChanges.oneAdjacent.push( { name: surfaceName, spaceId: spaceId } );

		} else if ( spaceRef === 1 ) {

			const spaceId = SELselSpace.value;
			console.log( 'spaceId', spaceId );

			surfaceJson.AdjacentSpaceId[ 0 ].spaceIdRef = spaceId;
			//SELbutSpaceVis1.innerText = spaceId;

			console.log( 'surfaceXml', surfaceXml );

			space = surfaceXml.getElementsByTagName( "AdjacentSpaceId" )[ 0 ];
			space.setAttribute( "spaceIdRef", spaceId );

			//adjacentNew = GBX.gbxmlResponseXML.createElement( "AdjacentSpaceId" );
			//adjacentNew.setAttribute( "spaceIdRef", spaceId );
			//surfaceXml.appendChild( adjacentNew );

			if ( !SEL.surfaceChanges.twoAdjacent ) { SEL.surfaceChanges.twoAdjacent = []; }
			SEL.surfaceChanges.twoAdjacent.push( { name: surfaceName, spaceId: [ surfaceJson.AdjacentSpaceId[ 0 ].spaceIdRef, surfaceJson.AdjacentSpaceId[ 1 ].spaceIdRef ] } );

		} else if ( spaceRef === 2 ) {

			const spaceId = SELselSpace.value;
			surfaceJson.AdjacentSpaceId[ 1 ].spaceIdRef = spaceId;
			//SELbutSpaceVis2.innerText = spaceId;

			console.log( 'surfaceXml', surfaceXml );

			space = surfaceXml.getElementsByTagName( "AdjacentSpaceId" )[ 1 ];
			space.setAttribute( "spaceIdRef", spaceId );

			//adjacentNew = GBX.gbxmlResponseXML.createElement( "AdjacentSpaceId" );
			//adjacentNew.setAttribute( "spaceIdRef", spaceId );
			//surfaceXml.appendChild( adjacentNew );

			if ( !SEL.surfaceChanges.twoAdjacent ) { SEL.surfaceChanges.twoAdjacent = []; }
			SEL.surfaceChanges.twoAdjacent.push( { name: surfaceName, spaceId: [ surfaceJson.AdjacentSpaceId[ 0 ].spaceIdRef, surfaceJson.AdjacentSpaceId[ 1 ].spaceIdRef ] } );

		}

		//console.log( 'surfaceXml', surfaceXml);
		//console.log( 'adjacentNew', adjacentNew );

		console.log( 'surfaceJson', surfaceJson );

		//alert( 'update space almost working: ' + spaceRef )

		CTX.setHeadsUp();

	};



	CTX.updateSurfaceType = function() {

		// console.log( 'id', CTX.userDataData );

		const surface = CTX.intersected.userData.data;
		//console.log( 'surface', surface );

		const id = surface.id;
		const spaceIdPrev = surface.AdjacentSpaceId;
		//console.log( 'spaceIdPrev', spaceIdPrev );

		const typeNew = surface.surfaceType = SELselSurfaceType.value;
		//console.log( 'typeNew', typeNew );

		if ( !CTX.surfaceChanges.surfaceTypes ) { CTX.surfaceChanges.surfaceTypes = []; }
		CTX.surfaceChanges.surfaceTypes.push( { name: surface.Name, surfaceType: typeNew } );

		CTX.surfacesXml = GBX.gbxml.getElementsByTagName("Surface");

		surfaceXml = CTX.surfacesXml[ id ];
		//console.log( 'surfaceXml',  surfaceXml );

		surfaceXml.attributes.getNamedItem( 'surfaceType' ).nodeValue = typeNew;

		surfaceMesh = GBX.surfaceMeshes.children.find( ( element ) => element.userData.data.id === id );
		surfaceMesh.material.color.setHex( GBX.colors[ typeNew ] );
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

				const newAdj = GBX.gbxmlResponseXML.createElement( "AdjacentSpaceId" );
				newAdj.setAttribute( "spaceIdRef", spaceIdPrev[ 0 ].spaceIdRef ) ;
				const newAdjTxt = surfaceXml.appendChild( newAdj );

				surfaceJson.AdjacentSpaceId = { spaceIdRef: spaceIdPrev[ 0 ].spaceIdRef };

				console.log( 'old 2 / new 1', newAdjTxt, surfaceXml );

			} else if ( spaceIdPrev ) { // type prev is single adjacent

				// leave things untouched
				const spaceId = surfaceXml.getElementsByTagName("AdjacentSpaceId")[0];

				console.log( 'old 1 / new 1 / no changes spaceId',  spaceId, surfaceXml );

			} else { // type prev is no adjacent

				//const newAdj = GBX.gbxmlResponseXML.createElement( "AdjacentSpaceId" );
				//newAdj.setAttribute( "spaceIdRef", "none" ) ;
				//const newAdjTxt = surfaceXml.appendChild( newAdj );

				surfaceJson.AdjacentSpaceId = { spaceIdRef: 'none' };

				//surfaceMesh.userData.data.AdjacentSpaceId = 'none';
				console.log( 'old 0 / new 1 / no spaceIdPrev', spaceIdPrev, surfaceXml );

			}

		}

		//console.log( 'surfaceXml',  surfaceXml );
		//console.log( 'type surfaceJson', surfaceJson );

		CTX.setHeadsUp();
		SEL.setSurfaceVisible( id );

	};



	CTX.updateCadId = function( that ){
		//console.log( 'that', that );

		const surface = CTX.intersected.userData.data;
		//console.log( 'surface', surface );

		const id = surface.id;

		CTX.surfacesXml = GBX.gbxml.getElementsByTagName( "Surface" );

		surfaceXml = CTX.surfacesXml[ id ];

		const cadObjId = surfaceXml.getElementsByTagName( "CADObjectId" )[ 0 ];

		console.log( 'cadObjId', cadObjId );

		if ( cadObjId ) {

			//surfaceXml.attributes.getNamedItem( 'CADObjectId' ).nodeValue = that.value;

			//cadObjId.innerHTML = that.value;


			surfaceXml.getElementsByTagName("CADObjectId")[ 0 ].innerHTML = that.value;
			//console.log( 'surfaceXml',  surfaceXml );

			surfaceMesh = GBX.surfaceMeshes.children.find( ( element ) => element.userData.data.id === id );

			surfaceMesh.userData.data.CADObjectId = that.value;

			if ( !CTX.surfaceChanges.CADObjectId ) { CTX.surfaceChanges.CADObjectId = []; }
			CTX.surfaceChanges.CADObjectId.push( { name: surface.Name, cadId: that.value } );

			CTX.setHeadsUp();

		} else {

			//alert( 'There is no cad object id associated with this surface. \n\n A future release will allow you to add one.')

			surfaceXml.setAttribute( "CADObjectId", that.value );

			//console.log( 'surfaceXml', surfaceXml);
			//const newCadIdTxt = surfaceXml.appendChild( newCadId );
			//console.log( 'newCadIdTxt', newCadIdTxt);

			surfaceMesh = GBX.surfaceMeshes.children.find( ( element ) => element.userData.data.id === id );
			surfaceMesh.userData.data.CADObjectId = that.value;

			if ( !CTX.surfaceChanges.CADObjectId ) { CTX.surfaceChanges.CADObjectId = []; }
			CTX.surfaceChanges.CADObjectId.push( { name: surface.Name, cadId: that.value } );

		}

	};

