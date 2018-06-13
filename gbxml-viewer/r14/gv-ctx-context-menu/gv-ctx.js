

	// Handles events

	var CTX = {};

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

		SEL.setPanelShowHide( CTXdivShowHide );

		CTX.setPanelEditSurface( CTXdivEditSurface );

		CTX.setPanelSurface( CTXdivItems );

		CTX.setPanelTellTale( CTXdivTellTales );


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
		item.parent = GBX.surfacesJson;
		item.placeholder = 'surface id';
		item.selItem = 'CTXselSurfaceId';

		SEL.itemSurface = SEL.getElementPanel( item );

		//CTX.removeTelltales();

		const data = CTX.intersected.userData.data;
		//console.log( 'data', data );

		//CTX.userDataData = data;

		CTXselSurfaceId.value = data.id;

		SEL.setElementIdAttributes( CTXselSurfaceId.value, item );
		SEL.setPanelSurfaceAttributes( CTXdivAttributes, data.id );

	};




	/////

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

			placard = CTX.drawPlacard( i.toString(), 0.01, 200, parseFloat( vertex[ 0 ] ) + 0.5, parseFloat( vertex[ 1 ] ) + 0.5, parseFloat( vertex[ 2 ] ) + 0.5 );
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

			placard = CTX.drawPlacard( i.toString(), 0.01, 120, vertex.x, vertex.y, vertex.z + 0.5 );
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


	CTX.removeTelltales = function() {

		THR.scene.remove( CTX.telltalesPolyloop );
		THR.scene.remove( CTX.telltalesVertex );
		CTXdivCoordinates.innerHTML = 'click a button';

	};



	CTX.drawPlacard = function( text, scale, color, x, y, z ) {

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

			parameters = parameters || {} ;

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


		////////// Editing


	CTX.getPanelEditSurface = function() {

		const txt =
		`<details>

			<summary>Edit the Surface</summary>

			<button class=toggle onclick=CTX.deleteSurface(); >delete surface</button>
				<button onclick=CTX.addModifiedBy(); title='add name, app, date and time of the edits' >modified by </button>
				<button onclick=CTX.saveFile(); title="creates a new file with the changes" >save edits</button>

			<hr>

		</details>`;

		return txt;

	};



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

		const id = CTXselSurfaceId.value;

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
		const xmlText = new XMLSerializer().serializeToString( GBX.gbxml );
		//console.log( 'xmlText', xmlText );

		var blob = new Blob( [ xmlText ] );
		var a = document.body.appendChild( document.createElement( 'a' ) );
		a.href = window.URL.createObjectURL( blob );
		a.download = GBX.gbjson.Campus.Building.id + '.xml';
		a.click();
		//		delete a;
		a = null;

	};

