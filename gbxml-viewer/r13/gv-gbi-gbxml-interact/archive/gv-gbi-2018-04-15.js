// Copyright 2018 Ladybug Tools authors. MIT License

	var GBI = {};

	GBI.surfaceChanges = { deletes: [], types: [], oneAdjacent: [], twoAdjacent: [], cadObjs: [] };


	//initGbxmlView();

	/*
	GBI.initGbxmlView = function() {

		if ( window.butMenuLoad ) {

			GBI.butGbxmlView = butMenuLoad;

			GBI.title = 'gv-tmp - gbXML Viewer Template';;
			document.title = GBI.title;
			aDocumentTitle.innerHTML = GBI.title;
			GBI.butGbxmlView.innerHTML = GBI.title;

		} else {

			return;
			//GBI.butGbxmlView = butGbxmlView;

		}

		if ( GBI.butGbxmlView.style.backgroundColor !== 'var( --but-bg-color )' ) {

			divMenuItems.innerHTML =

				`<details id = detGbxmlView open>

					<summary>gbXML View</summary>

					<div id = "divGbxmlView" style=width:300px; ><div>

					<hr>

				</details>

			` + divMenuItems.innerHTML;

			initMenuGbxmlView();

			GBI.butGbxmlView.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			detGbxmlView.remove();

			GBI.butGbxmlView.style.backgroundColor = '';

		}

	}();



	function initMenuGbxmlView() {

		surfaceCoordinateDuplicates = [];

		divGbxmlView.innerHTML =
		`
			<button onclick=THR.controls.autoRotate=!THR.controls.autoRotate; >rotation</button>

			<button onclick=GBP.surfaceMeshes.visible=!GBP.surfaceMeshes.visible; >surfaces</button>

			<button onclick=GBP.surfaceEdges.visible=!GBP.surfaceEdges.visible; >edges</button><br>

			<hr>

			<button id=butDuplicatesCoordinates onclick=GBI.toggleDuplicates(butDuplicatesCoordinates,surfaceCoordinateDuplicates); >toggle all duplicates</button>
			<br>
			<button onclick=GBI.setAllVisible(); >GBI.setAllVisible</button>
			<button onclick=GBI.zoomObjectBoundingSphere(GBP.surfaceMeshes); >GBI.zoomObjectBoundingSphere</button>
			<button onclick=GBI.saveFile(); >GBI.saveFile</button>
			<hr>

			<select id = "selSurface" size=10 ></select><br>
			<button onclick=GBI.showSurface(selSurface.value); >GBI.showSurface</button><br>
			<button onclick=GBI.showCadId(encodeURI(GBP.surfaceJson[selSurface.selectedIndex].CADObjectId)); >GBI.showCadId</button><br>
			<button onclick=GBI.zoomIntoSurface(selSurface.value); >GBI.zoomIntoSurface</button><br>
			<button onclick=GBI.deleteSurface(selSurface.value); >GBI.deleteSurface</button><br>

			<select id = "selType" size=10 ></select><br>
			<button onclick=GBI.showSurfaceType(selType.value); >GBI.showSurfaceType</button>
			<br>
			<select id = "selSpace" size=10 ></select>
			<button onclick=GBI.showSpace(selSpace.value); >GBI.GBI.showSpace</button>

		`;

		getMenuItems();

	}



	function getMenuItems() {

		let txt = '';
		GBP.surfaceJson.forEach( function( element ) { txt += '<option>' + element.id + '</option>'; } );

		selSurface.innerHTML = txt;
		selSurface.selectedIndex = 0; //Math.floor( Math.random() * selSurface.length );

		txt = '';
		GBP.surfaceTypes.forEach( function( element ) { txt += '<option>' + element + '</option>'; } );

		selType.innerHTML = txt;
		selType.selectedIndex = 0; //Math.floor( Math.random() * selSurface.length );

		txt = '';
		const spaceXml = GBP.gbjson.Campus.Building.Space;
		spaceXml.forEach( function( element ) { txt += '<option>' + element.id + '</option>'; } );

		selSpace.innerHTML = txt;
		selSpace.selectedIndex = 0; //Math.floor( Math.random() * selSurface.length );

	}



	GBI.toggleDuplicates = function( button, surfaceArray ) {

		if ( button.style.backgroundColor !== 'var( --but-bg-color )' ) {
			count = 0;
			GBP.surfaceMeshes.children.forEach( element =>
				{ element.visible = surfaceArray.includes( element.userData.data.Name ) ? true : false; count = element.visible ? count++ : count;} );
				console.log( '', count );

			/*
			for ( let child of surfaceMeshes.children ) {

				if ( surfaceArray.includes( child.userData.data.Name ) ) {

					child.visible = true;

				} else {

					child.visible = false;

				}

			}

			*/
/*
			button.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			GBI.setAllVisible();

			button.style.backgroundColor = '';

		}

	}


	// Surfaces




	GBI.showSurfaceType = function( type ) {

		GBP.surfaceMeshes.children.forEach( element => element.visible = element.userData.data.surfaceType === type? true : false );

	};


	// wrong repeats by id
	GBI.showSurfacesInSurfaceArray = function( surfaces ) {

		GBP.surfaceMeshes.children.forEach( element => element.visible = element.userData.data.id === id ? true : false );

	};





	// ??
	GBI.showBySurfaceTypeArray = function( types ) {

		console.log( 'types', types );

		const spaces = GBP.gbjson.Campus.Building.Space;

		GBP.surfaceMeshes.children.forEach( element => element.visible = false );

		for ( let child of GBP.surfaceMeshes.children ) {

			spaces.forEach( element => { child.visible = types.includes( child.userData.data.surfaceType ) ? true : child.visible; } );

		}

		GBI.floorSlabs = GBP.surfaceMeshes.children.filter( child => child.visible === true );
		//console.log( 'GBI.floorSlabs', GBI.floorSlabs);

	}



	// CAD ID

	GBI.showCadId = function( CADObjectId ) {
		//console.log( 'CADObjectId', CADObjectId );

		GBP.surfaceMeshes.children.forEach( element =>
			element.visible = element.userData.data.CADObjectId === CADObjectId ? true : false );

	};






	GBI.showSpace = function( id ) {
		//console.log( 'id', id );

		for ( let child of GBP.surfaceMeshes.children ) {

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


	// Storeys

	GBI.showStorey = function( id ) {

		//console.log( 'id', id );

		const spaces = GBP.gbjson.Campus.Building.Space;

		GBP.surfaceMeshes.children.forEach( element => element.visible = false );

		for ( let child of GBP.surfaceMeshes.children ) {

			adjacentSpaceId = child.userData.data.AdjacentSpaceId

			if ( !adjacentSpaceId ) { continue; }

			spaceIdRef = Array.isArray( adjacentSpaceId ) ? adjacentSpaceId[ 1 ].spaceIdRef : adjacentSpaceId.spaceIdRef

			spaces.forEach( element => child.visible = element.id === spaceIdRef && element.buildingStoreyIdRef === id ? true : child.visible );

		}

		const storey = GBP.gbjson.Campus.Building.BuildingStorey.find( function( item ) { return item.id === id; } );

		//	console.log( 'storey', storey );

	}



	GBI.showFloorSlabs = function( id ) {

		//console.log( 'id', id );

		const spaces = GBP.gbjson.Campus.Building.Space;

		const types = ['InteriorFloor', 'SlabOnGrade', 'RaisedFloor', 'UndergroundSlab']

		GBP.surfaceMeshes.children.forEach( element => element.visible = false );

		for ( let child of GBP.surfaceMeshes.children ) {

			adjacentSpaceId = child.userData.data.AdjacentSpaceId

			if ( !adjacentSpaceId ) { continue; }

			spaceIdRef = Array.isArray( adjacentSpaceId ) ? adjacentSpaceId[ 1 ].spaceIdRef : adjacentSpaceId.spaceIdRef

			spaces.forEach( element => { child.visible = element.id === spaceIdRef
				&& element.buildingStoreyIdRef === id  && types.includes( child.userData.data.surfaceType )  ? true : child.visible;

			} );

		}

		GBI.floorSlabs = GBP.surfaceMeshes.children.filter( child => child.visible === true );
		//console.log( 'GBI.floorSlabs', GBI.floorSlabs);

	}



	// Zones

	GBI.showZone = function ( zoneIdRef ) {

		console.log( 'zoneIdRef', zoneIdRef );

		const spaces = GBP.gbjson.Campus.Building.Space;

		GBP.surfaceMeshes.children.forEach( element => element.visible = false );

		for ( let child of GBP.surfaceMeshes.children ) {

			adjacentSpaceId = child.userData.data.AdjacentSpaceId

			if ( !adjacentSpaceId ) { continue; }

			spaceIdRef = Array.isArray( adjacentSpaceId ) ? adjacentSpaceId[ 1 ].spaceIdRef : adjacentSpaceId.spaceIdRef

			spaces.forEach( element => child.visible = element.id === spaceIdRef && element.zoneIdRef === zoneIdRef ? true : child.visible );

		}

		let zone;

		if ( Array.isArray( GBX.gbjson.Zone ) ) {

			zone = GBP.gbjson.Zone.find( function( item ) { return item.id === zoneIdRef; } );

		} else {

			zone = GBP.gbjson.Zone;

		}

		console.log( 'zone', zone );

	}








	// Zooming
	GBI.ZZZzoomObjectBoundingSphere = function( obj ) {

		const bbox = new THREE.Box3().setFromObject( obj );
		const sphere = bbox.getBoundingSphere();
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


*/


	GBI.setSurfaceZoom = function( id ) {
		//console.log( 'id', id );

		const surfaceMesh = GBP.surfaceMeshes.children.find( element => element.userData.data.id === id );
		//console.log( '', surfaceMesh );

		const center = surfaceMesh.localToWorld( surfaceMesh.geometry.boundingSphere.center.clone() );
		const radius = surfaceMesh.geometry.boundingSphere.radius > 1 ? surfaceMesh.geometry.boundingSphere.radius : 1;
		//console.log( 'center * radius', center, radius );

		THR.scene.remove( GBI.telltale );
		const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
		const material = new THREE.MeshNormalMaterial( { opacity: 0.7, transparent: true } );
		GBI.telltale = new THREE.Mesh( geometry, material );
		GBI.telltale.position.copy( center );
		THR.scene.add( GBI.telltale );

		THR.controls.target.copy( center );
		THR.camera.position.copy( center.clone().add( new THREE.Vector3( 3.0 * radius, - 3.0 * radius, 3.0 * radius ) ) );

	};



	GBI.setSurfaceVisible = function( id ) {

		GBP.surfaceMeshes.children.forEach( element => element.visible = element.userData.data.id === id ? true : false );

	};



	GBI.setAllVisible = function() {

		GBP.surfaceMeshes.visible = true;
		GBP.surfaceEdges.visible = true;

		GBP.surfaceMeshes.children.forEach( child => child.visible = true );

	};


	// Spaces

	GBI.getSpaceId = function( spaceIdRef ) {

		if ( !GBP.gbjson.Campus.Building.Space || !GBP.gbjson.Campus.Building.Space.length ) { return; }

		let space = GBP.gbjson.Campus.Building.Space.find( element => element.id === spaceIdRef );

		space = space ? space : 'none';

		return space;

	}




	GBI.getElementPanel = function( item ){

		item = item || {};
		item.attribute = item.attribute ? item.attribute : '';
		item.gbjson = item.gbjson || [ 1, 2, 3 ];
		item.selItem = item.selItem || 'selItem';
		item.title = item.title || 'item';

		let options = '';
		item.gbjson.forEach( obj => options += '<option>' + obj + '</option>' );

		item.target = 'GBIdiv' + item.attribute;

		divElement =

		//		`<details>

		//			<summary>` + item.title + ( item.attribute ? ' by ' + item.attribute : '' ) + ' &raquo; ' + item.gbjson.length + ` items</summary>

			`<div class=flex-container2 >
				<div class=flex-div1 >
					<input oninput=GBI.setSelectedIndex(this,` + item.selItem + `);
						placeholder="` + item.attribute + `" style=margin-bottom:0.5rem;width:95%; >
					<select id = ` + item.selItem + ` onclick=GBI.setSurfaceVisible(this.value);GBI.setGbjsonAttributes(this.value,` + item.target + `);
						onchange=GBI.setSurfaceVisible(this.value);GBI.setGbjsonAttributes(this.value,` + item.target + `);
					size=` + ( item.gbjson.length < 10 ? item.gbjson.length : 10 ) + ` style=width:100%; >` + options + `</select>
				</div>
				<div id = ` + item.target + ` class=flex-left-div2  >
					lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem.?
				</div>
			</div>`;

		//		</details>`;

		return divElement;

	}



	GBI.setSelectedIndex = function( input, select ) {

		const str = input.value.toLowerCase();

		for ( let option of select.options ) {

			if ( option.innerHTML.toLowerCase().includes( str ) ) {

				select.value = option.value;

				return;

			}

		}

	};



	GBI.setGbjsonAttributes = function( id, target) {

		//console.log( 'target', target );

		obj = GBP.surfaceJson.find( element => element.id === id );

		//console.log( 'obj', obj );

		let attributes = '';

		for ( property in obj ) {

			if ( obj[ property ] !== null && typeof( obj[ property ] ) === 'object' ) {

				if ( property === 'AdjacentSpaceId' ) {

					//console.log( 'property', obj[ property ].length );

					if ( Array.isArray( obj[ property ] ) ) {

						attributes += '<div>' + property + ': <i>' + obj[ property ][ 0 ].spaceIdRef + '</i></div>';
						attributes += '<div>' + property + ': <i>' + obj[ property ][ 1 ].spaceIdRef + '</i></div>';

					} else {

						attributes += '<div>' + property + ': <i>' + obj[ property ].spaceIdRef + '</i></div>';

					}

				}

			} else {

				attributes += '<div>' + property + ': <i>' + obj[ property ] + '</i></div>';

			}

		};
		//console.log( 'attributes', attributes );
		//target = document.getElementById( target.id )

		target.innerHTML = attributes;

		//console.log( 'obj', obj );

	};


	GBI.zzzgetDivInputSelect = function( inp, plc, sel, options ){

		//console.log( 'options', options );
		options = options || `<option>nothing to select</option>`;

		divInputSelect =
		`<div>
			<div style=margin-bottom:0.5rem; ><input id=` + inp + ` placeholder = `+ plc + ` ></div>
			<select id=` + sel + ` size=5 style=min-width:50; >` + options + `</select>
		</div>`;
		//console.log( 'divInputSelect', divInputSelect );

		return divInputSelect;

	}



	GBI.getPanelShowHide = function() {

		const txt =

		`<details open >

			<summary>Show / Hide</summary>

			<button onclick=GBP.surfaceMeshes.visible=!GBP.surfaceMeshes.visible; >surfaces</button>
				<button onclick=GBP.surfaceEdges.visible=!GBP.surfaceEdges.visible; >edges</button>
				<button onclick=GBP.openingMeshes.visible=!GBP.openingMeshes.visible; title="toggle the windows" >openings</button>
				<button onclick=GBP.setAllVisible(); >all visible</button>

			<hr>

		</details>`;

		return txt;

	};


	// Editing


	GBI.getPanelEditSurface = function() {

		const txt =
		`<details>

			<summary>Edit the Surface</summary>

			<button class=toggle onclick=GBI.deleteSurface(); >delete surface</button>
				<button onclick=GBI.addModifiedBy(); title='add name, app, date and time of the edits' >modified by </button>
				<button onclick=GBI.saveFile(); title="creates a new file with the changes" >save edits</button>

			<hr>

		</details>`;

		return txt;

	}



	GBI.deleteSurface = function( id ) {

		const proceed = confirm( 'OK to delete surface: ' + id + '?' );

		if ( !proceed ){ return; }

		// remove from gbxml
		const surfacesResponse = GBP.gbxml.getElementsByTagName("Surface");
		surface = surfacesResponse[ id ];
		surface.remove();
		GBI.surfaceChanges.deletes.push( id );

		console.log( 'id', id, 'surface to delete', surface );

		// remove from gbjson

		GBP.surfaceJson = GBP.surfaceJson.filter( element => element.id != id );
		console.log( 'GBP.surfaceJson', GBP.surfaceJson );

		// remove from three.js
		const surfaceMesh = GBP.surfaceMeshes.children.find( element => element.userData.data.id === id );
		GBP.surfaceMeshes.remove( surfaceMesh );

		element =  document.getElementById( 'divSurface' + id );
		// console.log( 'element', element );
		if ( element ) {
			element.innerHTML = '<p>Surface deleted</p>' + element.innerHTML
			element.style.opacity = 0.2;
		}

		initGbxmlView();

	};



	GBI.addModifiedBy = function() {

		// not adding spaces and new lines nicely. Why?

		documentHistoryXml = GBP.gbxmlResponseXML.getElementsByTagName( "DocumentHistory" );

		const programInfoNew = GBP.gbxmlResponseXML.createElement( "ProgramInfo" );

		programInfoNew.setAttribute( "id", "ladybug-tools-spider" );

		documentHistoryXml[ 0 ].appendChild( programInfoNew );

		const productNameNew = GBP.gbxmlResponseXML.createElement( "ProductName" );

		const newText = GBP.gbxmlResponseXML.createTextNode( 'Ladybug-Tools/spider' );

		productNameNew.appendChild( newText );

		programInfoNew.appendChild( productNameNew );

		productNameNew.nodeValue = 'Ladybug-Tools/spider';


		const modifiedByNew = GBP.gbxmlResponseXML.createElement( "ModifiedBy" );

		modifiedByNew.setAttribute( "personId", "Your name" );

		modifiedByNew.setAttribute( "programId", "ladybug-tools-spider" );

		modifiedByNew.setAttribute( "date", ( new Date() ).toISOString() );

		documentHistoryXml[ 0 ].appendChild( modifiedByNew );

		alert( 'Adding to gbXML:\n\n' + GBP.gbxmlResponseXML.getElementsByTagName( "ModifiedBy" )[0].outerHTML );

	}



	GBI.saveFile = function() {

		//xmlText = prettifyXml( gbxmlResponseXML ); // not
		const xmlText = new XMLSerializer().serializeToString( GBP.gbxml );
		//console.log( 'xmlText', xmlText );

		var blob = new Blob( [ xmlText ] );
		var a = document.body.appendChild( document.createElement( 'a' ) );
		a.href = window.URL.createObjectURL( blob );
		a.download = GBP.gbjson.Campus.Building.id + '.xml';
		a.click();
		//		delete a;
		a = null;

	}
