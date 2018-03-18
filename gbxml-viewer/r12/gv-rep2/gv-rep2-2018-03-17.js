// Copyright 2018 Ladybug Tools authors. MIT License

	//var GBV = {};

	//GBV.surfaceChanges = { deletes: [], types: [], oneAdjacent: [], twoAdjacent: [], cadObjs: [] };

	var REP = {};


	//initGbxmlView();

	REP.initGbxmlView = function() {

		if ( window.butMenuLoad ) {

			REP.butGbxmlView = butMenuLoad;

			REP.title = 'gv-tmp - gbXML Viewer Reports2';;
			document.title = REP.title;
			aDocumentTitle.innerHTML = REP.title;
			REP.butGbxmlView.innerHTML = REP.title;

		} else {

			return;
			//REP.butGbxmlView = butGbxmlView;

		}

		if ( REP.butGbxmlView.style.backgroundColor !== 'var( --but-bg-color )' ) {

			divMenuItems.innerHTML =

				`<details id = detGbxmlView open>

					<summary>Reports</summary>

					<div id = "divGbxmlView" style=width:300px; ><div>

					<hr>

				</details>

			` + divMenuItems.innerHTML;

			initMenuGbxmlView();

			REP.butGbxmlView.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			detGbxmlView.remove();

			REP.butGbxmlView.style.backgroundColor = '';

		}

	};



	function initMenuGbxmlView() {

		surfaceCoordinateDuplicates = [];

		divGbxmlView.innerHTML =
		`
			<div>
				<div>toggle the visible elements</div>
				<button onclick=GBX.surfaceMeshes.visible=!GBX.surfaceMeshes.visible; >surfaces</button>
				<button onclick=GBX.surfaceEdges.visible=!GBX.surfaceEdges.visible; >edges</button>
				<button onclick=GBX.setAllVisible(); >all visible</button>
			</div>
			<hr>

			<!--
			<button onclick=THR.controls.autoRotate=!THR.controls.autoRotate; >rotation</button>

			<button onclick=GBX.surfaceMeshes.visible=!GBX.surfaceMeshes.visible; >surfaces</button>

			<button onclick=GBX.surfaceEdges.visible=!GBX.surfaceEdges.visible; >edges</button>
			<button id=butDuplicatesCoordinates onclick=GBV.toggleDuplicates(butDuplicatesCoordinates,surfaceCoordinateDuplicates); >toggle all duplicates</button>

			<button onclick=GBV.setAllVisible(); >GBV.setAllVisible</button>
			<button onclick=GBV.zoomObjectBoundingSphere(GBX.surfaceMeshes); >GBV.zoomObjectBoundingSphere</button>
			<button onclick=GBV.saveFile(); >GBV.saveFile</button>
			-->


			<details open >
				<summary>Surfaces Individually</summary>
				 <button onclick=GBV.showSurface(property.value); >select</button>
				 <button onclick=GBV.zoomIntoSurface(property.value); >zoom</button>
				 <button onclick=GBV.deleteSurface(property.value); >delete</button>
				<div style="border:1px solid red;display:inline-block;" >
					<input size=6 ><br>
					<select id = "property" size=10 ></select><br>
				</div>
				<div style="border:1px solid red;display:inline-block;width:200px;vertical-align:top;" >
					name<br>
					description<br>
					<button onclick=GBV.showCadId(encodeURI(GBX.surfaceJson[property.selectedIndex].CADObjectId)); >GBV.showCadId</button>
					<select id = "selType" size=3 ></select>
					<button onclick=GBV.showSurfaceType(selType.value); >GBV.showSurfaceType</button>
					storey<br>
					zone<br>
					openings<br>
					area len wid<br>
				</div>
				<hr>
			</details>

			<details>
				<summary>Surfaces by Type</summary>
				<div id=divSurfacesByType ></div>
				<hr>
			</details>

			<details>
				<summary>Spaces</summary>
				<div style="border:1px solid red;display:inline-block;" >
					<input size=6 ><br>
					<select id = "selSpace" size=10 ></select>
				</div>
				<hr>
			</details>

			<details >
				<summary>Storeys</summary>
				<select id = "selStorey" size=10 ></select>
				<button onclick=GBV.showStorey(selStorey.value); >Show</button>
				<hr>
			</details>

			<details>
				<summary>Zones</summary>
				<!--
				<select id = "selZone" size=10 ></select>
				-->
				<div id=divZones ></div>
				<hr>
			</details>

			<details open >
				<summary>CAD Object Groups</summary>
				<div id=divCadIdGroup ></div>
				<hr>
			</details>

			<details >
				<summary>CAD Object IDs</summary>
				<div></div>
			</details>

			<hr>

			<details >
				<summary>gbXML Attributes</summary>
				<div id=divGbxmlAttributes ></div>
				<hr>
			</details>

			<details >
				<summary>Campus</summary>
				<div id=divCampus ></div>
				<hr>
			</details>

			<details >
				<summary id=sumCampusLocation >Campus Location</summary>
				<div id=divCampusLocation ></div>
				<hr>
			</details>

			<details >
			<summary>Building</summary>
			<div id=divCampusBuilding ></div>
			<hr>
		</details>
		`;

		getMenuItems();

	}



	function getMenuItems() {

		let txt = '';
		GBX.surfaceJson.forEach( function( element ) { txt += '<option>' + element.id + '</option>'; } );

		property.innerHTML = txt;
		property.selectedIndex = 0; //Math.floor( Math.random() * property.length );

		txt = '';
		GBX.surfaceTypes.forEach( function( element ) { txt += '<option>' + element + '</option>'; } );

		selType.innerHTML = txt;
		selType.selectedIndex = 0;

		divSurfacesByType.innerHTML = REP.getSurfacesByType().flowContent;

		txt = '';
		const spaceXml = GBX.gbjson.Campus.Building.Space;
		spaceXml.forEach( function( element ) { txt += '<option>' + element.id + '</option>'; } );

		selSpace.innerHTML = txt;
		selSpace.selectedIndex = 0;

		let storeys = '';
		const storeyXml = GBX.gbjson.Campus.Building.BuildingStorey;
		storeyXml.forEach( function( element ) { storeys += '<option>' + element.id + '</option>'; } );

		selStorey.innerHTML = storeys;
		selStorey.selectedIndex = 0;


		divZones.innerHTML += REP.traverseGbjson( GBX.gbjson.Zone ).attributes;

		divCadIdGroup.innerHTML = REP.getSurfaceCadIdGroups().flowContent;
		///

		divGbxmlAttributes.innerHTML = REP.traverseGbjson( GBX.gbjson ).attributes;

		divCampus.innerHTML = REP.traverseGbjson( GBX.gbjson.Campus ).attributes;

		divCampusLocation.innerHTML = REP.traverseGbjson( GBX.gbjson.Campus.Location ).attributes;
		const mapLink = REP.getGoogleMap();
		sumCampusLocation.innerHTML += mapLink;

		divCampusBuilding.innerHTML = REP.traverseGbjson( GBX.gbjson.Campus.Building ).attributes;


	}



	REP.traverseGbjson = function traverseGbjson( obj ) {

		const elements = [];
		let attributes = '';

		for ( let property in obj ) {

			if ( obj[ property ] !== null && typeof( obj[ property ] ) === 'object' ) {

				if ( elements.indexOf( property ) < 0 ) { elements.push( property ); }

			} else {

				attributes += '<div>' + property + ': ' + obj[ property ] + '</div>';

			}

		};

		return { elements: elements, attributes: attributes };

	}


	REP.getSurfacesByType = function() {

		surfaces = GBX.gbjson.Campus.Surface;

		let txt = '';

		//console.log( 'surfaces', surfaces );

		const types = [];
		const typesCount = [];

		for ( let surface of surfaces ) {

			index = types.indexOf( surface.surfaceType );

			if ( index < 0 ) {

				types.push( surface.surfaceType );
				typesCount[ types.length - 1 ] = 1;

			} else {

				typesCount[ index ] ++;

			}

		}

		for ( let i = 0; i < types.length; i++ ) {

			txt +=
//				'<button class=toggleView onclick=REP.setTypeInvisible(this) value=' + types[ i ] + ' >&#x1f441;</button>' +
				'<button class=toggleView onclick=REP.setTypeInvisible(this) value=' + types[ i ] + ' ><img src="../assets/eye.png" height=18></button>' +
				' <button class=toggle onclick=GBV.toggleSurfaceType(this); >' + types[ i ] + '</button>: ' +
				typesCount[ i ] + '-' + Math.round( 100 * typesCount[ i ] / surfaces.length ) +
				'%<br>';

		}

		txt +=

			'<p><button class=toggle onclick=REP.allVisible(); >all visible</button></p>';


		const summary = 'Surfaces: ' + surfaces.length;

		return { summary: summary, flowContent: txt };

	}



	REP.getSurfaceCadIdGroups = function() {

		const cadIds = [];
		const surfaceMembers = [];
		const surfaces = GBX.gbjson.Campus.Surface;
		let count = 0;
		let flowContent = '';

		for ( let surface of surfaces ) {

			if ( !surface.CADObjectId ) { continue; }

			id = surface.CADObjectId.replace( /\[(.*?)\]/gi, '' );

			if ( !cadIds.includes( id ) ) {

				cadIds.push( id );

			}

		}

		cadIds.sort();

		for ( let id of cadIds ){

			flowContent += '<button onclick=REP.toggleCadIdGroup("' + encodeURI( id )+ '"); >' + id + '</button><br>';

		}

		//console.log( '', CadIds.length );

		const info = 'Information: Revit CAD Object Groups';
		return { summary: 'CAD Object ID Groups &raquo; ' + cadIds.length, flowContent: flowContent, info: info };

	}


	REP.getGoogleMap = () => {

		const locate = GBX.gbjson.Campus.Location;  // remember that location is a reserved word in your browser
		let linkToMap;

		if ( locate && locate.Latitude && locate.Longitude ) {

			const link = 'https://www.google.com/maps/@' + locate.Latitude + ',' + locate.Longitude + ',17z';

			linkToMap = ' &raquo; <a href="'+ link + '" style=background-color:lightblue; target=_blank > &#x1f310; </a>';
//			linkToMap = ' &raquo; <a href="'+ link + '" style=background-color:lightblue; target=_blank > &#x1f5fa; </a>';
//			linkToMap = ' &raquo; <a href="'+ link + '" style=background-color:lightblue; target=_blank > <img src=world-map.png height=18 > </a>';

		} else {

			linkToMap = '';

		}

		return '<span title="Use context menu to open a Google Map in a new tab" >' + linkToMap + '<span>';

	}


	/*
	GBV.showSurface = ( id ) => {

		GBX.surfaceMeshes.children.forEach( element => element.visible = element.userData.data.id === id ? true : false );
		/*
		if ( window.divHeadsUp ) {

			const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === id );
			intersected = surfaceMesh;
			HUD.setHeadsUp();

		}
		*/
/*
	};




	GBV.showCadId = CADObjectId => {

		GBX.surfaceMeshes.children.forEach( element =>
			element.visible = encodeURI( element.userData.data.CADObjectId ) === CADObjectId ? true : false );

	};



	GBV.showSurfaceType = type => {

		GBX.surfaceMeshes.children.forEach( element => element.visible = element.userData.data.surfaceType === type? true : false );

	};



	GBV.getSpaceId = ( spaceIdRef ) => {

		if ( !GBX.gbjson.Campus.Building.Space || !GBX.gbjson.Campus.Building.Space.length ) { return; }

		let space = GBX.gbjson.Campus.Building.Space.find( element => element.id === spaceIdRef );

		space = space ? space : 'none';

		return space;

	}



	GBV.showSpace = id => {
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

		spaces = GBX.gbjson.Campus.Building.Space;

		GBX.surfaceMeshes.children.forEach( element => element.visible = false );

		for ( let child of GBX.surfaceMeshes.children ) {

			adjacentSpaceId = child.userData.data.AdjacentSpaceId

			if ( !adjacentSpaceId ) { continue; }

			spaceIdRef = Array.isArray( adjacentSpaceId ) ? adjacentSpaceId[ 1 ].spaceIdRef : adjacentSpaceId.spaceIdRef

			spaces.forEach( element => child.visible = element.id === spaceIdRef && element.buildingStoreyIdRef === id ? true : child.visible );

		}

		const storey = GBX.gbjson.Campus.Building.BuildingStorey.find( function( item ) { return item.id === id; } );

		//	console.log( 'storey', storey );

	}



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

		initGbxmlView();

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

	}



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

	*/

	REP.initGbxmlView();