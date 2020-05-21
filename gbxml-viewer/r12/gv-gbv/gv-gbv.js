// Copyright 2018 Ladybug Tools authors. MIT License

	var GBV = {};

	GBV.surfaceChanges = { deletes: [], types: [], oneAdjacent: [], twoAdjacent: [], cadObjs: [] };


	//initGbxmlView();

	GBV.initGbxmlView = function() {

		if ( window.butMenuLoad ) {

			GBV.butGbxmlView = butMenuLoad;

			GBV.title = 'gv-tmp - gbXML Viewer Template';;
			document.title = GBV.title;
			aDocumentTitle.innerHTML = GBV.title;
			GBV.butGbxmlView.innerHTML = GBV.title;

		} else {

			return;
			//GBV.butGbxmlView = butGbxmlView;

		}

		if ( GBV.butGbxmlView.style.backgroundColor !== 'var( --but-bg-color )' ) {

			divMenuItems.innerHTML =

				`<details id = detGbxmlView open>

					<summary>gbXML View</summary>

					<div id = "divGbxmlView" style=width:300px; ><div>

					<hr>

				</details>

			` + divMenuItems.innerHTML;

			initMenuGbxmlView();

			GBV.butGbxmlView.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			detGbxmlView.remove();

			GBV.butGbxmlView.style.backgroundColor = '';

		}

	}();



	function initMenuGbxmlView() {

		surfaceCoordinateDuplicates = [];

		divGbxmlView.innerHTML =
		`
			<button onclick=THR.controls.autoRotate=!THR.controls.autoRotate; >rotation</button>

			<button onclick=GBX.surfaceMeshes.visible=!GBX.surfaceMeshes.visible; >surfaces</button>

			<button onclick=GBX.surfaceEdges.visible=!GBX.surfaceEdges.visible; >edges</button>
			<button id=butDuplicatesCoordinates onclick=GBV.toggleDuplicates(butDuplicatesCoordinates,surfaceCoordinateDuplicates); >toggle all duplicates</button>

			<button onclick=GBV.setAllVisible(); >GBV.setAllVisible</button>
			<button onclick=GBV.zoomObjectBoundingSphere(GBX.surfaceMeshes); >GBV.zoomObjectBoundingSphere</button>
			<button onclick=GBV.saveFile(); >GBV.saveFile</button>
			<hr>
			<select id = "selSurface" size=10 ></select>
			<button onclick=GBV.showSurface(selSurface.value); >GBV.showSurface</button>
			<button onclick=GBV.showCadId(encodeURI(GBX.surfaceJson[selSurface.selectedIndex].CADObjectId)); >GBV.showCadId</button>
			<button onclick=GBV.zoomIntoSurface(selSurface.value); >GBV.zoomIntoSurface</button>
			<button onclick=GBV.deleteSurface(selSurface.value); >GBV.deleteSurface</button>

			<select id = "selType" size=10 ></select>
			<button onclick=GBV.showSurfaceType(selType.value); >GBV.showSurfaceType</button>
			<br>
			<select id = "selSpace" size=10 ></select>
			<button onclick=GBV.showSpace(selSpace.value); >GBV.GBV.showSpace</button>

		`;

		getMenuItems();

	};



	function getMenuItems() {

		let txt = '';
		GBX.surfaceJson.forEach( function( element ) { txt += '<option>' + element.id + '</option>'; } );

		selSurface.innerHTML = txt;
		selSurface.selectedIndex = 0; //Math.floor( Math.random() * selSurface.length );

		txt = '';
		GBX.surfaceTypes.forEach( function( element ) { txt += '<option>' + element + '</option>'; } );

		selType.innerHTML = txt;
		selType.selectedIndex = 0; //Math.floor( Math.random() * selSurface.length );

		txt = '';
		const spaceXml = GBX.gbjson.Campus.Building.Space;
		spaceXml.forEach( function( element ) { txt += '<option>' + element.id + '</option>'; } );

		selSpace.innerHTML = txt;
		selSpace.selectedIndex = 0; //Math.floor( Math.random() * selSurface.length );

	};



	GBV.toggleDuplicates = ( button, surfaceArray ) => {

		if ( button.style.backgroundColor !== 'var( --but-bg-color )' ) {

			GBX.surfaceMeshes.children.forEach( element => element.visible = surfaceArray.includes( element.userData.data.Name ) ? true : false );

			/*
			for ( let child of surfaceMeshes.children ) {

				if ( surfaceArray.includes( child.userData.data.Name ) ) {

					child.visible = true;

				} else {

					child.visible = false;

				}

			}

			*/

			button.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			GBV.setAllVisible();

			button.style.backgroundColor = '';

		}

	};



	GBV.showSurface = ( id ) => {

		GBX.surfaceMeshes.children.forEach( element => element.visible = element.userData.data.id === id ? true : false );
		/*
		if ( window.divHeadsUp ) {

			const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === id );
			intersected = surfaceMesh;
			HUD.setHeadsUp();

		}
		*/

	};



	GBV.showSurfacesInSurfaceArray = ( surfaces ) => {

		GBX.surfaceMeshes.children.forEach( element => element.visible = element.userData.data.id === id ? true : false );

	};



	GBV.showCadId = function( CADObjectId ) {
		//console.log( 'CADObjectId', CADObjectId );

		CADObjectId = decodeURI( CADObjectId );
		GBX.surfaceMeshes.children.forEach( element =>
			element.visible = element.userData.data.CADObjectId === CADObjectId ? true : false );

	};



	GBV.getSpaceId = ( spaceIdRef ) => {

		if ( !GBX.gbjson.Campus.Building.Space || !GBX.gbjson.Campus.Building.Space.length ) { return; }

		let space = GBX.gbjson.Campus.Building.Space.find( element => element.id === spaceIdRef );

		space = space ? space : 'none';

		return space;

	};



	GBV.showSpace = function( id ) {
		//console.log( 'id', id );

		for ( let child of GBX.surfaceMeshes.children ) {

			child.visible = false;

			adjacentSpaceId = child.userData.data.AdjacentSpaceId;

			if ( adjacentSpaceId && adjacentSpaceId.spaceIdRef && id === adjacentSpaceId.spaceIdRef ) {

				//console.log( 'adjacentSpaceId', adjacentSpaceId );
				child.visible = true;

			} else if ( Array.isArray( adjacentSpaceId ) === true ) {

				if ( id === adjacentSpaceId[ 0 ].spaceIdRef || id === adjacentSpaceId[ 1 ].spaceIdRef ) {

					child.visible = true;

				}

			}

		}

	};



	GBV.showStorey = ( id ) => {

		//console.log( 'id', id );

		const spaces = GBX.gbjson.Campus.Building.Space;

		GBX.surfaceMeshes.children.forEach( element => element.visible = false );

		for ( let child of GBX.surfaceMeshes.children ) {

			adjacentSpaceId = child.userData.data.AdjacentSpaceId

			if ( !adjacentSpaceId ) { continue; }

			spaceIdRef = Array.isArray( adjacentSpaceId ) ? adjacentSpaceId[ 1 ].spaceIdRef : adjacentSpaceId.spaceIdRef

			spaces.forEach( element => child.visible = element.id === spaceIdRef && element.buildingStoreyIdRef === id ? true : child.visible );

		}

		const storey = GBX.gbjson.Campus.Building.BuildingStorey.find( function( item ) { return item.id === id; } );

		//	console.log( 'storey', storey );

	};



	GBV.showFloorSlabs = function( id ) {

		//console.log( 'id', id );

		const spaces = GBX.gbjson.Campus.Building.Space;

		const types = ['InteriorFloor', 'SlabOnGrade', 'RaisedFloor', 'UndergroundSlab']

		GBX.surfaceMeshes.children.forEach( element => element.visible = false );

		for ( let child of GBX.surfaceMeshes.children ) {

			adjacentSpaceId = child.userData.data.AdjacentSpaceId

			if ( !adjacentSpaceId ) { continue; }

			spaceIdRef = Array.isArray( adjacentSpaceId ) ? adjacentSpaceId[ 1 ].spaceIdRef : adjacentSpaceId.spaceIdRef

			spaces.forEach( element => { child.visible = element.id === spaceIdRef
				&& element.buildingStoreyIdRef === id  && types.includes( child.userData.data.surfaceType )  ? true : child.visible;

			} );

		}

		GBV.floorSlabs = GBX.surfaceMeshes.children.filter( child => child.visible === true );
		//console.log( 'GBV.floorSlabs', GBV.floorSlabs);

	};



	GBV.showZone = function ( zoneIdRef ) {

		console.log( 'zoneIdRef', zoneIdRef );

		const spaces = GBX.gbjson.Campus.Building.Space;

		GBX.surfaceMeshes.children.forEach( element => element.visible = false );

		for ( let child of GBX.surfaceMeshes.children ) {

			adjacentSpaceId = child.userData.data.AdjacentSpaceId

			if ( !adjacentSpaceId ) { continue; }

			spaceIdRef = Array.isArray( adjacentSpaceId ) ? adjacentSpaceId[ 1 ].spaceIdRef : adjacentSpaceId.spaceIdRef

			spaces.forEach( element => child.visible = element.id === spaceIdRef && element.zoneIdRef === zoneIdRef ? true : child.visible );

		}

		let zone;

		if ( Array.isArray( GBX.gbjson.Zone ) ) {

			zone = GBX.gbjson.Zone.find( function( item ) { return item.id === zoneIdRef; } );

		} else {

			zone = GBX.gbjson.Zone;

		}

		console.log( 'zone', zone );

	};



	GBV.showSurfaceType = type => {

		GBX.surfaceMeshes.children.forEach( element => element.visible = element.userData.data.surfaceType === type? true : false );

	};



	GBV.showBySurfaceTypeArray = function( types ) {

		console.log( 'types', types );

		const spaces = GBX.gbjson.Campus.Building.Space;

		GBX.surfaceMeshes.children.forEach( element => element.visible = false );

		for ( let child of GBX.surfaceMeshes.children ) {

			//adjacentSpaceId = child.userData.data.AdjacentSpaceId

			//if ( !adjacentSpaceId ) { continue; }

			//spaceIdRef = Array.isArray( adjacentSpaceId ) ? adjacentSpaceId[ 1 ].spaceIdRef : adjacentSpaceId.spaceIdRef

			spaces.forEach( element => { child.visible = types.includes( child.userData.data.surfaceType )  ? true : child.visible;

			} );

		}

		GBV.floorSlabs = GBX.surfaceMeshes.children.filter( child => child.visible === true );
		//console.log( 'GBV.floorSlabs', GBV.floorSlabs);

	};



	GBV.setAllVisible = () => {

		GBX.surfaceMeshes.visible = true;
		GBX.surfaceEdges.visible = true;

		GBX.surfaceMeshes.children.forEach( child => child.visible = true );

	};



	GBV.zoomIntoSurface = ( id ) => {
		//console.log( 'id', id );

		const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === id );
		//console.log( '', surfaceMesh );

		const center = surfaceMesh.localToWorld( surfaceMesh.geometry.boundingSphere.center.clone() );
		const radius = surfaceMesh.geometry.boundingSphere.radius > 1 ? surfaceMesh.geometry.boundingSphere.radius : 1;
		//console.log( 'center * radius', center, radius );

		THR.scene.remove( GBV.telltale );
		const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
		const material = new THREE.MeshNormalMaterial( { opacity: 0.7, transparent: true } );
		GBV.telltale = new THREE.Mesh( geometry, material );
		GBV.telltale.position.copy( center );
		THR.scene.add( GBV.telltale );

		THR.controls.target.copy( center );
		THR.camera.position.copy( center.clone().add( new THREE.Vector3( 3.0 * radius, - 3.0 * radius, 3.0 * radius ) ) );

	};



	GBV.zoomObjectBoundingSphere = obj => {

		const bbox = new THREE.Box3().setFromObject( obj );
		const sphere = bbox.getBoundingSphere( new THREE.Sphere() );
		center = sphere.center;
		radius = sphere.radius;

		obj.userData.center = center;
		obj.userData.radius = radius;

		THR.controls.target.copy( center );
		THR.controls.maxDistance = 5 * radius;

		THR.camera.position.copy( center.clone().add( new THREE.Vector3( 1.0 * radius, - 1.0 * radius, 1.0 * radius ) ) );

		THR.axesHelper.scale.set( radius, radius, radius );
		THR.axesHelper.position.copy( center );

		THR.camera.far = 10 * radius; //2 * camera.position.length();
		THR.camera.updateProjectionMatrix();

		THR.lightDirectional.position.copy( center.clone().add( new THREE.Vector3( 1.5 * radius, 1.5 * radius, 1.5 * radius ) ) );
		THR.lightDirectional.shadow.camera.scale.set( 0.2 * radius, 0.2 * radius, 0.01 * radius );
		THR.lightDirectional.target = THR.axesHelper;

		//		scene.remove( cameraHelper );
		//		cameraHelper = new THREE.CameraHelper( lightDirectional.shadow.camera );
		//		scene.add( cameraHelper );

	};



	GBV.deleteSurface = id => {

		const proceed = confirm( 'OK to delete surface: ' + id + '?' );

		if ( !proceed ){ return; }

		// remove from gbxml
		const surfacesResponse = GBX.gbxml.getElementsByTagName("Surface");
		surface = surfacesResponse[ id ];
		surface.remove();
		GBV.surfaceChanges.deletes.push( id );

		console.log( 'id', id, 'surface to delete', surface );

		// remove from gbjson

		GBX.surfaceJson = GBX.surfaceJson.filter( element => element.id != id );
		console.log( 'GBX.surfaceJson', GBX.surfaceJson );

		// remove from three.js
		const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === id );
		GBX.surfaceMeshes.remove( surfaceMesh );

		element =  document.getElementById( 'divSurface' + id );
		// console.log( 'element', element );

		if ( element ) {
			element.innerHTML = '<p>Surface deleted</p>' + element.innerHTML
			element.style.opacity = 0.2;
		}

		//initGbxmlView();

	};



	GBV.addModifiedBy = () => {

		// not adding spaces and new lines nicely. Why?

		documentHistoryXml = GBX.gbxmlResponseXML.getElementsByTagName( "DocumentHistory" );

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



	GBV.saveFile = () => {

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

	}
