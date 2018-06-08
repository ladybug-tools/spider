
	/* global THR, THREE, GBX, COR, CORdivLog, HUDdivAttributes, window, document */
	/* jshint esversion: 6 */
	/*jshint loopfunc:true */

	// Copyright 2018 Ladybug Tools authors. MIT License
	// functions in most sections are in alphabetical order

	// tomorrow:
	// add surfaces visibility on function
	// add zoom group function

	var SEL = {};


	SEL.getElementPanel = function( item ){
		// SEL.setPanelSurface

		item = item || {};

		//item.attribute = item.attribute ? item.attribute : '';
		item.divAttributes = item.divAttributes || 'SELdivSurface'; // used here
		item.divTarget = item.divTarget || 'SELdivElements'; // see divElement below
		item.element = item.element || 'Surface';  // used by SEL.setElementVisible
		item.name = item.name || 'itemName';
		item.optionValues = item.optionValues || [ [ item.id, item.Name, item.CADObjectId, 'yellow' ], [ 'bbb', 2 ], [ 'ccc'], 3 ] ;
		item.parent = item.parent || GBX.surfaceJson; // used by SEL.setElementIdAttributes
		item.placeholder = item.placeholder || 'surface id';  // used below
		item.selItem = item.selItem || 'selItem'; // used below

		//console.log( 'item', item );
		let options = '';

		item.optionValues.forEach( option =>
			options += '<option value=' + option[ 0 ] + ' title="id: ' + option[ 0 ] + '" style="background-color:' + option[ 3 ] + ';" >' + option[ 1 ] + '</option>'
		);

		SEL.item = item;
		//console.log( 'item', item );

		const divElement =

			`<div class=flex-container2 >

				<div class=flex-div1 >
					<input oninput=SEL.setSelectedIndex(this,${item.selItem});
						placeholder="${item.placeholder}" style=margin-bottom:0.5rem;width:6rem; >
						<br>
					<select id =${item.selItem}
						 size=` + ( item.optionValues.length < 10 ? item.optionValues.length : 10 ) +
						 ` style=margin-bottom:0.5rem;min-width:6rem; >${options}</select>
						<br>
					<select onchange=SEL.updateSelect(this,${item.selItem},"${item.name}"); style=width:6rem;>
						<option>id</option><option selected >name</option><option>cad id</option>
					</select>
				</div>
				<div id = ${item.divAttributes} class=flex-left-div2 >bbb</div>

			</div>`;

		item.divTarget.innerHTML = divElement;
		//console.log( 'item.divTarget', item.divTarget);

		const selectTarget = item.divTarget.getElementsByTagName( 'select' )[ 0 ];
		//console.log( 'target', target );

		/*
		selectTarget.onclick= function() {
			//console.log( 'selectTarget.value', selectTarget.value );
			SEL.setSurfaceVisible(selectTarget.value );
			SEL.setElementIdAttributes( selectTarget.value, item );

		};
		*/


		//selectTarget.onchange =  function() {
		selectTarget.oninput = function() {

			SEL.setElementVisible( selectTarget.value, item );
			SEL.setElementIdAttributes( selectTarget.value, item );

		};

		selectTarget.onclick = selectTarget.oninput;

		return item;

	};



	////////// Set various Menu Panel Attributes

	SEL.updateSelect = function( that, select, name ){
		//console.log( 'sel', select );
		//console.log( 'that', that );
		//console.log( 'name', name );
		//console.log( 'SEL.item', SEL.item );

		let i = 0;

		const item = SEL[ name ] ? SEL[ name ] : SEL.item;  // to cover for NUM.setAreasByStorey

		let optionValues = item.optionValues;

		for ( let option of select.options ) {

			option.innerText = optionValues[ i++ ][ that.selectedIndex ];

		}

	};



	//////////

	SEL.setElementVisible = function( id, item ) {
		//console.log( 'id', id );
		//console.log( 'item', item );

		if ( item.element === 'Surface') {

			SEL.setSurfaceVisible( id );

		} else if ( item.element === 'Space') {

			SEL.setSpaceVisible( id );

		} else if ( item.element === 'Storey') {

			SEL.setStoreyVisible( id );

		} else if ( item.element === 'Zone') {

			SEL.setZoneVisible( id );

		} else if ( item.element === 'Openings') {

			SEL.setOpeningVisible( id );

		}

	};


	SEL.setElementIdAttributes = function ( id, item ) {
		//console.log( 'item', item, '\nid', id );

		SEL.id = id;
		//console.log( 'SEL.id', SEL.id );

		//console.log( 'item.parent', item.parent );
		let arr = Array.isArray( item.parent ) ? item.parent : [ item.parent ];
		//console.log( 'arr', arr );

		const obj = arr.find( element => element.id === id );
		//console.log( 'obj', obj );

		const divAttributes = document.getElementById ( item.divAttributes );
		//console.log( 'divAttributes', divAttributes );

		divAttributes.innerHTML = ''; //`<div>id: <b>${id}</b></div>`;

		for ( let property in obj ) {

			if ( obj[ property ] !== null && typeof( obj[ property ] ) === 'object' ) {

				if ( property === 'AdjacentSpaceId' ) {

					//console.log( 'property', obj[ property ] );

					if ( Array.isArray( obj[ property ] ) ) {

						divAttributes.innerHTML += SEL.getAttributeAdjacentSpace( obj[ property ][ 0 ].spaceIdRef, 1 );
						divAttributes.innerHTML += SEL.getAttributeAdjacentSpace( obj[ property ][ 1 ].spaceIdRef, 2 );

					} else {

						divAttributes.innerHTML += SEL.getAttributeAdjacentSpace( obj[ property ].spaceIdRef, 0 );

					}

				}

			} else if ( property === 'buildingStoreyIdRef' && obj[ property ] ) {

				divAttributes.innerHTML += SEL.getAttributeStorey( obj[ property ] );

			} else if ( item.element === 'Surface' && property === 'CADObjectId' ) {

				divAttributes.innerHTML += SEL.getAttributeCadObjectId( obj[ property ] );

			} else if ( property === 'id' && obj[ property ] ) {

				if ( item.element === 'Openings' ) {

					divAttributes.innerHTML += SEL.getAttributeOpenings( obj[ property ] );

				} else if ( item.element === 'Space' ) {

					divAttributes.innerHTML += SEL.getAttributeAdjacentSpace( obj[ property ], -1 );

				} else if ( item.element === 'Surface' ) {

					divAttributes.innerHTML += SEL.getAttributeSurfaceId( obj[ property ] );

				} else if ( item.element === 'Storey' ) {

					divAttributes.innerHTML += SEL.getAttributeStorey( obj[ property ] );

				}else if ( item.element === 'Zone' ) {

					divAttributes.innerHTML += SEL.getAttributeZone( obj[ property ] );

				} else {

					divAttributes.innerHTML += `<div><span class=attributeTitle >${property}:</span><br>
						<span class=attributeValue >${obj[ property ]}</span></div>`;

				}

			} else if ( property === 'surfaceType' ) {

				divAttributes.innerHTML += SEL.getAttributeSurfaceType( obj[ property ] );

			} else if ( property === 'zoneIdRef' ) {

				divAttributes.innerHTML += SEL.getAttributeZone( obj[ property ] );

			} else {

				divAttributes.innerHTML += `<div><span class=attributeTitle >${property}:</span>
					<span class=attributeValue >${obj[ property ]}</span></div>`;

			}

		}

		SEL.setButtonStyleClass( divAttributes );

	};



	////////// get Attributes by individual items / All used by REP
	// used by REP

	SEL.getAttributeAdjacentSpace = function( spaceIdRef, spaceIndex = 0 ) {
		//console.log( 'getAttributeAdjacentSpace spaceIdRef', spaceIdRef );
		//console.log( 'getAttributeAdjacentSpace spaceIndex', spaceIndex );

		const txt =
		`<div>
			<span class=attributeTitle >adjacent space ` + ( spaceIndex > -2 ? spaceIndex : `` ) + ` id</span>:<br>
			<button onclick=SEL.setSpaceVisible("${spaceIdRef}"); >${spaceIdRef}</button>
			<button onclick=SEL.setSpaceZoom("${spaceIdRef}",${spaceIndex}); >&#8981;</button>
		</div>`;

		return txt;

	};



	SEL.getAttributeCadObjectId = function( cadId ) {
		//console.log( 'cadId', cadId );

		const txt =
		`<div>
			<span class=attributeTitle >cad object id</span>: <button onclick=SEL.setCadIdZoom("` + encodeURI(cadId) + `"); >&#8981;</button><br>
			<button id=buttId onclick=SEL.setCadObjectIdVisible(this.innerText); >${cadId}</button>
		</div>`;

		return txt;

	};



	SEL.getAttributeOpenings = function( openingId ) {

		const txt =
		`<div>
			<span class=attributeTitle >id</span>:<br>
			<button onclick=SEL.setOpeningVisible("${openingId}"); >${openingId}</button>
			<button onclick=SEL.setOpeningZoom("${openingId}"); >&#8981;</button>

		</div>`;

		return txt;

	};



	SEL.getAttributeStorey = function( storeyId ) {

		const txt =
		`<div>
			<span class=attributeTitle >storey id</span>:<br>
			<button onclick=SEL.setStoreyVisible("${storeyId}"); >${storeyId}</button>
			<button onclick=alert('could-be-added-if-needed'); >&#8981;</button>
		</div>`;

		return txt;

	};



	SEL.getAttributeSurfaceId = function( id ) {

		const txt =
		`<div>
			<span class=attributeTitle >id</span>:<br>
			<button onclick=SEL.setSurfaceVisible(this.innerText); >${id}</button>
			<button onclick=SEL.setSurfaceZoom("${id}"); >&#8981;</button>
			<button onclick=SEL.setSurfaceVisibleToggle("${id}"); ><img src="../assets/eye.png" height=12></button>
		</div>`;

		return txt;

	};



	SEL.getAttributeZone = function( zoneId ) {

		const txt =
		`<div>
			<span class=attributeTitle >zone id</span>:<br>
			<button onclick=SEL.setZoneVisible(this.innerText); >${zoneId}</button>
		</div>`;

		//<button onclick=SEL.setZoneZoom("` + zoneId + `"); >&#8981;</button>

		return txt;

	};



	////////// get attributes by type
	// used by REP

	SEL.getAttributeSurfaceType = function( surfaceType ) {

		const txt =
		`<div>
			<span class=attributeTitle >surface type</span>:<br>
			<button onclick=SEL.setSurfaceTypeVisible(this.innerText); >${surfaceType}</button>
			<button onclick=SEL.setSurfaceTypeZoom("` + surfaceType + `"); >&#8981;</button>
		</div>`;

		return txt;

	};


	////////// Show/Hide by Individual Elements

	SEL.setCadObjectIdVisible = function( cadId ) {

		cadId = decodeURI( cadId );

		GBX.surfaceMeshes.visible = true;
		GBX.surfaceEdges.visible = true;
		GBX.surfaceOpenings.visible = false;

		GBX.surfaceMeshes.children.forEach( element =>
			element.visible = element.userData.data.CADObjectId === cadId ? true : false );


		if ( window.HUDdivAttributes ) { // move to hud

			HUDdivAttributes.innerHTML =

			`<details open>

				<summary>CAD Object ID</summary>

				<div><button id=SELbutCadId onclick=SEL.updateCadId(SELselCadId); >Update cad object id of surface</button></div>

				<p><select id=SELselCadId size=10 ></select></p>

			</details>

			<hr>

			<details open>

				<summary>CAD Object Group</summary>

				<div><button id=SELbutCadGroup onclick=SEL.updateCadId(SELselCadGroup); >Update cad object group of surface</button></div>

				<p id=SELdivCadIdGroup ></p>

			</details>

			<hr>`;


			SEL.setMenuPanelCadObjectsByType2( SELdivCadIdGroup, 'SELselCadGroup' );


			const surfaces = GBX.gbjson.Campus.Surface;
			const cadIds = [];

			for ( let surface of surfaces ) {

				//if ( !surface.CADObjectId ) { continue; }

				if ( !surface.CADObjectId || typeof surface.CADObjectId !== 'string' ) {

					CORdivLog.innerHTML += 'CADObjectId error: ' + surface.id + '<br>';

					//console.log( 'surface', surface );
					//console.log( 'surface.CADObjectId', surface.CADObjectId, typeof surface.CADObjectId );
					continue;

				}

				//const id = surface.CADObjectId.replace( / \[(.*?)\]/gi, '' ).trim();

				//if ( !cadIds.includes( id ) ) {

					cadIds.push( surface.CADObjectId );

				//}

			}

			//console.log( 'cadIds', cadIds );
			cadIds.sort();

			let txt = '';

			for ( let id of cadIds ){

				txt += '<option>' + id + '</option>';

			}

			SELselCadId.innerHTML = txt;

			SELselCadId.value = cadId;

		}

	};



	SEL.setOpeningVisible = function( openingId ) {
		//console.log( 'opening id', openingId );

		GBX.surfaceEdges.visible = true;
		GBX.surfaceMeshes.visible = false;
		GBX.surfaceOpenings.visible = true;

		GBX.surfaceOpenings.children.forEach( element => {

			element.visible = element.userData.data.id === openingId ? true : false;

			if ( element.visible === true  ) {
				element.material.opacity = 1;
				element.material.side = 2;
				element.material.needsUpdate = true;

			}

		} );

	};



	SEL.setSpaceVisible = function( spaceId ) {
		//console.log( 'spaceId', spaceId );

		GBX.surfaceEdges.visible = true;
		GBX.surfaceMeshes.visible = true;
		GBX.surfaceOpenings.visible = false;

		for ( let child of GBX.surfaceMeshes.children ) {

			child.visible = false;

			const adjacentSpaceId = child.userData.data.AdjacentSpaceId;
			//console.log( 'adjacentSpaceId', adjacentSpaceId );

			if ( adjacentSpaceId && adjacentSpaceId.spaceIdRef && spaceId === adjacentSpaceId.spaceIdRef ) {

				child.visible = true;

			} else if ( Array.isArray( adjacentSpaceId ) === true ) {

				if ( spaceId === adjacentSpaceId[ 0 ].spaceIdRef || spaceId === adjacentSpaceId[ 1 ].spaceIdRef ) {

					child.visible = true;

				}

			}

		}

	};



	SEL.setStoreyVisible = function( id ) {

		//console.log( 'id', id );

		GBX.surfaceEdges.visible = true;
		GBX.surfaceMeshes.visible = true;
		GBX.surfaceOpenings.visible = false;

		const spaces = GBX.gbjson.Campus.Building.Space;

		GBX.surfaceMeshes.children.forEach( element => element.visible = false );

		for ( let child of GBX.surfaceMeshes.children ) {

			const adjacentSpaceId = child.userData.data.AdjacentSpaceId;

			if ( !adjacentSpaceId ) { continue; }

			const spaceIdRef = Array.isArray( adjacentSpaceId ) ? adjacentSpaceId[ 1 ].spaceIdRef : adjacentSpaceId.spaceIdRef;

			spaces.forEach( element => child.visible = element.id === spaceIdRef && element.buildingStoreyIdRef === id ? true : child.visible );

		}

		//const storey = GBX.gbjson.Campus.Building.BuildingStorey.find( function( item ) { return item.id === id; } );
		//	console.log( 'storey', storey );

	};



	SEL.setSurfaceVisible = function( id ) {

		GBX.surfaceEdges.visible = true;
		GBX.surfaceMeshes.visible = true;
		GBX.surfaceOpenings.visible = false;

		GBX.surfaceMeshes.children.forEach( element => element.visible = element.userData.data.id === id ? true : false );

		//console.log( 'recGeom', recGeom );

		if ( window.HUDdivAttributes ) {

			SEL.setPanelSurfaceAttributes( HUDdivAttributes, id );

		}

	};



	SEL.setZoneVisible = function ( zoneIdRef ) {
		//console.log( 'zoneIdRef', zoneIdRef );

		const spaces = GBX.gbjson.Campus.Building.Space;

		GBX.surfaceEdges.visible = true;
		GBX.surfaceMeshes.visible = true;
		GBX.surfaceOpenings.visible = false;

		GBX.surfaceMeshes.children.forEach( element => element.visible = false );

		for ( let child of GBX.surfaceMeshes.children ) {

			const adjacentSpaceId = child.userData.data.AdjacentSpaceId;
			//console.log( 'adjacentSpaceId', adjacentSpaceId );

			if ( !adjacentSpaceId ) { continue; }

			const spaceIdRef = Array.isArray( adjacentSpaceId ) ? adjacentSpaceId[ 1 ].spaceIdRef : adjacentSpaceId.spaceIdRef;

			spaces.forEach( element => child.visible = element.id === spaceIdRef && element.zoneIdRef === zoneIdRef ? true : child.visible );

		}

		let zone;

		if ( Array.isArray( GBX.gbjson.Zone ) ) {

			zone = GBX.gbjson.Zone.find( function( item ) { return item.id === zoneIdRef; } );

		} else {

			zone = GBX.gbjson.Zone;

		}

		//console.log( 'zone', zone );

	};


	///// Toggle Visible Show / Hide by Type of Element



	SEL.setExposedToSunVisible = function(  ) {

		GBX.surfaceEdges.visible = true;
		GBX.surfaceMeshes.visible = true;
		GBX.surfaceOpenings.visible = false;

		GBX.surfaceMeshes.children.forEach( element => element.visible = element.userData.data.exposedToSun === "true" ? true : false );

	};



	SEL.setCadObjectTypeVisible = ( CADObjectGroupId ) => {
		// used by REP

		//console.log( 'CADObjectGroupId', CADObjectGroupId);

		const cadId = CADObjectGroupId.trim();

		GBX.surfaceEdges.visible = true;
		GBX.surfaceMeshes.visible = true;
		GBX.surfaceOpenings.visible = false;

		for ( let child of GBX.surfaceMeshes.children ) {

			child.visible = false;

		}

		for ( let child of GBX.surfaceMeshes.children ) {

			if ( !child.userData.data.CADObjectId || typeof child.userData.data.CADObjectId !== 'string' ) { continue; }

			const id = child.userData.data.CADObjectId.replace( /\[(.*?)\]/gi, '' ).trim() ;

			if ( id === cadId ) {
				//console.log( 'equal id\n', id.length, '\n', CADObjectGroupId.length );
				//console.log( 'id\n', id, '\n', CADObjectGroupId );
				child.visible = true;

			} else {

				child.visible = false;

			}

		}

		if ( window.HUDdivAttributes ) {

			HUDdivAttributes.innerHTML = '';

		}

	};



	SEL.setOpeningTypeVisible = function( type ) {
		console.log( 'type', type );

		GBX.surfaceEdges.visible = false;
		GBX.surfaceMeshes.visible = false;
		GBX.surfaceOpenings.visible = true;

		if ( type ) {

			GBX.surfaceOpenings.children.forEach( element => element.visible = element.userData.data.openingType === type ? true : false );

		} else {

			GBX.surfaceOpenings.children.forEach( element => element.visible = true );

		}

	};



	SEL.setSurfaceVisibleToggle = function( id ) {

		GBX.surfaceMeshes.visible = true;

		const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === id );

		surfaceMesh.visible = !surfaceMesh.visible;

	};


	SEL.setSurfaceTypeVisible = function( type ) {

		GBX.surfaceEdges.visible = true;
		GBX.surfaceMeshes.visible = true;
		GBX.surfaceOpenings.visible = false;

		GBX.surfaceMeshes.children.forEach( element => element.visible = element.userData.data.surfaceType === type? true : false );

		if ( window.HUDdivAttributes ) {

			HUDdivAttributes.innerHTML =

			`<details open>

				<summary>Surface Type: ${type}</summary>

				<p><button onclick=SEL.updateSurfaceType() >Update surface type of the surface</button></p>

				<div><select id=SELselSurfaceType ></select></div>


			</details>

			<hr>`;

		}

		const surfaces = GBX.gbjson.Campus.Surface;

		let txt = '';
		const types = [];
		const typesCount = [];

		for ( let surface of surfaces ) {

			const index = types.indexOf( surface.surfaceType );

			if ( index < 0 ) {

				types.push( surface.surfaceType );
				typesCount[ types.length - 1 ] = 1;

			} else {

				typesCount[ index ] ++;

			}

		}


		for ( let i = 0; i < types.length; i++ ) {

			txt +=
				`<option>${types[i]}</option>`;

		}

		if ( window.HUDdivAttributes ) {

			SELselSurfaceType.innerHTML = txt;
			SELselSurfaceType.size = types.length;

		}

	};



	SEL.setSurfaceTypeInvisible = function( that ) {

		//console.log( '', that );
		//that.style.backgroundColor = that.style.backgroundColor === 'lightblue' ? '' : 'lightblue';

		for ( let child of GBX.surfaceMeshes.children ) {

			if ( !child.userData.data ) { continue; }

			if ( child.userData.data.surfaceType === that.value && that.style.backgroundColor === COR.colorButtonToggle ) {

				child.visible = false;

			} else if ( child.userData.data.surfaceType === that.value ) {

				child.visible = true;

			}

		}

	};



	////////// Zoom

	SEL.setCadIdZoom = function( cadId ) {

		cadId = decodeURI( cadId );
		SEL.setCadObjectIdVisible( cadId );

		let meshes = GBX.surfaceMeshes.children.filter( element => element.userData.data.CADObjectId === cadId );

		const bbox = new THREE.Box3();
		meshes.forEach( mesh => bbox.expandByObject ( mesh ) );

		const sphere = bbox.getBoundingSphere();
		const center = sphere.center;
		const radius = sphere.radius;
		//console.log( 'center * radius', center, radius );

		THR.controls.target.copy( center );
		THR.camera.position.copy( center.clone().add( new THREE.Vector3( 1.5 * radius, - 1.5 * radius, 1.5 * radius ) ) );

	};




	SEL.setOpeningZoom = function( openingId ) {
		//console.log( 'openingId', openingId );

		SEL.setOpeningVisible( openingId );


		let openings = GBX.surfaceOpenings.children.find( element => element.userData.data.id === openingId );
		//console.log( 'openings', openings );

		openings = Array.isArray( openings) ? openings : [ openings ];

		const bbox = new THREE.Box3();
		openings.forEach( opening => bbox.expandByObject ( opening ) );

		const sphere = bbox.getBoundingSphere( new THREE.Sphere() );
		const center = sphere.center;
		const radius = sphere.radius;
		//console.log( 'center * radius', center, radius );

		THR.controls.target.copy( center );
		THR.camera.position.copy( center.clone().add( new THREE.Vector3( 1.5 * radius, - 1.5 * radius, 1.5 * radius ) ) );

	};



	SEL.setSpaceZoom = function( id, index = 0 ) {
		//console.log( 'setSpaceZoom', id, index );

		SEL.setSpaceVisible( id, index );

		let meshes = [];

		for ( let child of GBX.surfaceMeshes.children ) {

			const adjacentSpaceId = child.userData.data.AdjacentSpaceId;
			//console.log( 'adjacentSpaceId', adjacentSpaceId );

			if ( adjacentSpaceId && adjacentSpaceId.spaceIdRef && id === adjacentSpaceId.spaceIdRef ) {

				meshes.push( child );

			} else if ( Array.isArray( adjacentSpaceId ) === true ) {

				if ( id === adjacentSpaceId[ 0 ].spaceIdRef || id === adjacentSpaceId[ 1 ].spaceIdRef ) {

					meshes.push( child );

				}

			}

		}

		const bbox = new THREE.Box3();
		meshes.forEach( mesh => bbox.expandByObject ( mesh ) );

		const sphere = bbox.getBoundingSphere();
		const center = sphere.center;
		const radius = sphere.radius;
		//console.log( 'center * radius', center, radius );

		THR.controls.target.copy( center );
		THR.camera.position.copy( center.clone().add( new THREE.Vector3( 1.5 * radius, - 1.5 * radius, 1.5 * radius ) ) );

	};



	SEL.setSurfaceZoom = function( id ) {
		//console.log( 'id', id );

		const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === id );
		//console.log( '', surfaceMesh );

		const center = surfaceMesh.localToWorld( surfaceMesh.geometry.boundingSphere.center.clone() );
		const radius = surfaceMesh.geometry.boundingSphere.radius > 1 ? surfaceMesh.geometry.boundingSphere.radius : 1;
		//console.log( 'center * radius', center, radius );

		THR.scene.remove( SEL.telltale );
		const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
		const material = new THREE.MeshNormalMaterial( { opacity: 0.7, transparent: true } );
		SEL.telltale = new THREE.Mesh( geometry, material );
		SEL.telltale.position.copy( center );
		THR.scene.add( SEL.telltale );

		THR.controls.target.copy( center );
		THR.camera.position.copy( center.clone().add( new THREE.Vector3( 3.0 * radius, - 3.0 * radius, 3.0 * radius ) ) );

	};



	SEL.setSurfaceTypeZoom = function( surfaceType ) {
		//console.log( 'surfaceType', surfaceType );

		SEL.setSurfaceTypeVisible ( surfaceType );

		let meshes = GBX.surfaceMeshes.children.filter( element => element.userData.data.surfaceType === surfaceType );

		const bbox = new THREE.Box3();
		meshes.forEach( mesh => bbox.expandByObject ( mesh ) );

		const sphere = bbox.getBoundingSphere();
		const center = sphere.center;
		const radius = sphere.radius;
		//console.log( 'center * radius', center, radius );

		THR.controls.target.copy( center );
		THR.camera.position.copy( center.clone().add( new THREE.Vector3( 1.0 * radius, - 1.0 * radius, 1.0 * radius ) ) );

	};



	SEL.setZoneZoomxxxx = function( zoneId ) {

		SEL.setZoneVisible( zoneId );

		let meshes = GBX.surfaceMeshes.children.filter( element => element.userData.data.zoneIdRef === zoneId );
		meshes = meshes.map( item => item.clone() );
		//console.log( 'meshes', meshes );

		const surfaceMeshes = new THREE.Object3D();
		surfaceMeshes.add( ...meshes );
		//console.log( '', surfaceMesh );

		const bbox = new THREE.Box3().setFromObject( surfaceMeshes );
		const sphere = bbox.getBoundingSphere();
		const center = sphere.center;
		const radius = sphere.radius;
		//console.log( 'center * radius', center, radius );

		THR.controls.target.copy( center );
		THR.camera.position.copy( center.clone().add( new THREE.Vector3( 1.5 * radius, - 1.5 * radius, 1.5 * radius ) ) );


	};



	SEL.xxxxxsetBuildingZoom = function( cadId ) {
		// Used: SEL.setPanelShowHide

		let meshes = GBX.surfaceMeshes.children.filter( element => element.userData.data.surfaceType === 'ExteriorWall' );
		meshes = meshes.map( item => item.clone() );
		//console.log( 'meshes', meshes );

		const surfaceMeshes = new THREE.Object3D();
		surfaceMeshes.add( ...meshes );
		//console.log( '', surfaceMesh );

		const bbox = new THREE.Box3().setFromObject( surfaceMeshes );
		const sphere = bbox.getBoundingSphere();
		const center = sphere.center;
		const radius = sphere.radius;
		//console.log( 'center * radius', center, radius );

		THR.controls.target.copy( center );
		THR.camera.position.copy( center.clone().add( new THREE.Vector3( 1.2 * radius, - 1.2 * radius, 1.2 * radius ) ) );

	};


	////////// Style


	SEL.setButtonStyleClass = function( item ) {
		// used by REP/SEL
		const butts = item.getElementsByTagName( "button" );
		//console.log( 'butts', butts );

		for ( let butt of butts ) {

			butt.classList.add( "w3-theme-d1", "w3-hover-theme", "w3-hover-border-theme" );

		}

	};
