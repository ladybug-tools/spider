/* global THR, THREE, GBP, window, document */
/* jshint esversion: 6 */

// Copyright 2018 Ladybug Tools authors. MIT License

	var GBI = {};

	GBI.spaceIndex = 0;
	GBI.surfaceChanges = { deletes: [], types: [], oneAdjacent: [], twoAdjacent: [], CADObjectId: [] };

	////////// Set Menu Panels


	GBI.getElementPanel = function( item ){
		// where still used ?? to be deprecated in 14

		item = item || {};
		item.attribute = item.attribute ? item.attribute : '';
		item.gbjson = item.gbjson || [ 1, 2, 3 ];
		item.selItem = item.selItem || 'selItem';
		item.element = item.element || 'Surface';

		let options = '';
		item.gbjson.forEach( id => options += '<option>' + id + '</option>' );

		item.target = 'GBIdiv' + item.attribute;

		divElement =

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


		//console.log( 'divElement', divElement );
		//console.log( 'item', item );

		return divElement;

	};



	GBI.setElementPanel2 = function( item ){
		// HUD.setPanelSurface

		item = item || {};

		//item.attribute = item.attribute ? item.attribute : '';
		item.divAttributes = item.divAttributes || 'GBIdivSurface'; // used here
		item.divTarget = item.divTarget || 'GBIdivElements'; // see divElement below
		item.element = item.element || 'Surface';  // used by GBI.setElementVisible
		item.name = item.name || 'itemName';
		item.optionValues = item.optionValues || [ [ item.id, item.Name, item.CADObjectId ], [ 'bbb', 2 ], [ 'ccc'], 3 ] ;
		item.parent = item.parent || GBP.surfaceJson; // used by GBI.setElementIdAttributes
		item.placeholder = item.placeholder || 'surface id';  // used below
		item.selItem = item.selItem || 'selItem'; // used below

		let options = '';

		item.optionValues.forEach( option =>
			options += '<option value=' + option[ 0 ] + ' title="id: ' + option[ 0 ] + '" >' + option[ 1 ] + '</option>' );

		GBI.item = item;
		//console.log( 'item', item );

		divElement =

			`<div class=flex-container2 >

				<div class=flex-div1 >
					<input oninput=GBI.setSelectedIndex(this,${item.selItem});
						placeholder="${item.placeholder}" style=margin-bottom:0.5rem;width:6rem; ><br>
					<select id =${item.selItem}
						 size=` + ( item.optionValues.length < 10 ? item.optionValues.length : 10 ) +
						 ` style=margin-bottom:0.5rem;min-width:6rem; >${options}</select>
						<br>
					<select onchange=GBI.updateSelect(this,${item.selItem},"${item.name}"); style=width:6rem;><option>id</option><option selected >name</option><option>cad id</option></select>
				</div>
				<div id = ${item.divAttributes} class=flex-left-div2 >bbb</div>

			</div>`;

		item.divTarget.innerHTML = divElement;
		//console.log( 'item.divTarget', item.divTarget);

		const selectTarget = item.divTarget.getElementsByTagName( 'select' )[ 0 ];
		//console.log( 'target', target );

		selectTarget.onclick= function() {

			//GBI.setSurfaceVisible(selectTarget.value );
			GBI.setElementIdAttributes( selectTarget.value, item );

		};

		selectTarget.onchange =  function() {

			GBI.setElementVisible( selectTarget.value, item );
			GBI.setElementIdAttributes( selectTarget.value, item );

		};

		return item;

	};


	GBI.updateSelect = function( that, select, name ){
		//console.log( 'sel', select );
		//console.log( 'that', that );
		//console.log( 'name', name );
		//console.log( 'GBI.item', GBI.item );

		let i = 0;

		item = GBI[ name ] ? GBI[ name ] : GBI.item;  // to cover for NUM.setAreasByStorey

		let optionValues = item.optionValues;

		for ( option of select.options ) {

			option.innerText = optionValues[ i++ ][ that.selectedIndex ];

		}
	}


	GBI.setElementVisible = function( id, item ) {
		//console.log( 'id', id );
		//console.log( 'item', item );

		if ( item.element === 'Surface') {

			GBI.setSurfaceVisible( id );

		} else if ( item.element === 'Space') {

			GBI.setSpaceVisible( id );

		} else if ( item.element === 'Storey') {

			GBI.setStoreyVisible( id );

		} else if ( item.element === 'Zone') {

			GBI.setZoneVisible( id );

		} else if ( item.element === 'Openings') {

			GBI.setOpeningVisible( id );

		}

	};



	GBI.setSelectedIndex = function( input, select ) {

		const str = input.value.toLowerCase();

		// try using find
		for ( let option of select.options ) {

			if ( option.innerHTML.toLowerCase().includes( str ) ) {

				select.value = option.value;

				return;

			}

		}

	};



	////////// Show/Hide by Individual Elements


	GBI.setCadObjectIdVisible = function( cadId ) {

		cadId = decodeURI( cadId );

		GBP.surfaceMeshes.visible = true;
		GBP.surfaceEdges.visible = true;
		GBP.surfaceOpenings.visible = false;

		GBP.surfaceMeshes.children.forEach( element =>
			element.visible = element.userData.data.CADObjectId === cadId ? true : false );


		if ( HUDdivAttributes ) {

			HUDdivAttributes.innerHTML =

			`<details open>

				<summary>CAD Object ID</summary>

				<div><button id=GBIbutCadId onclick=HUD.updateCadId(GBIselCadId); >Update cad object id of surface</button></div>

				<p><select id=GBIselCadId size=10 ></select></p>

			</details>

			<hr>

			<details open>

				<summary>CAD Object Group</summary>

				<div><button id=GBIbutCadGroup onclick=HUD.updateCadId(GBIselCadGroup); >Update cad object group of surface</button></div>

				<p id=GBIdivCadIdGroup ></p>

			</details>

			<hr>`;


			GBI.setMenuPanelCadObjectsByType2( GBIdivCadIdGroup, 'GBIselCadGroup' );


			const surfaces = GBP.gbjson.Campus.Surface;
			const cadIds = [];

			for ( let surface of surfaces ) {

				//if ( !surface.CADObjectId ) { continue; }

				if ( !surface.CADObjectId || typeof surface.CADObjectId !== 'string' ) {

					divLog.innerHTML += 'CADObjectId error: ' + surface.id + '<br>';

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

			GBIselCadId.innerHTML = txt;

			GBIselCadId.value = cadId;

		}

	};



	GBI.updateCadId = function( cadId ){

		//console.log( 'cadId', cadId );

		const surface = HUD.userDataData;
		//console.log( 'surface', surface );


		const id = surface.id;

		HUD.surfacesXml = GBP.gbxml.getElementsByTagName( "Surface" );

		const surfaceXml = HUD.surfacesXml[ id ];
		//console.log( 'surfaceXml',  surfaceXml );

		const cadObjId = surfaceXml.getElementsByTagName( "CADObjectId" )[ 0 ];

		if ( cadObjId ) {

			//console.log( 'cadObjId', cadObjId.innerHTML );

			//surfaceXml.attributes.getNamedItem( 'CADObjectId' ).nodeValue = that.value;
			cadObjId.innerHTML = cadId;

			//console.log( 'that', that.value );

			surfaceXml.getElementsByTagName("CADObjectId")[ 0 ].innerHTML = cadId;

			const surfaceMesh = GBP.surfaceMeshes.children.find( ( element ) => element.userData.data.id === id );

			surfaceMesh.userData.data.CADObjectId = cadId;

			GBI.surfaceChanges.cadObjs.push( { id: id, cadId: cadId } );

			HUD.setHeadsUp();

		} else {

			alert( 'There is no cad object id associated with this surface. \n\n A future release will allow you to add one.');

		}

	};



	GBI.setOpeningVisible = function( id ) {
		//console.log( 'opening id', id );

		GBP.surfaceEdges.visible = true;
		GBP.surfaceMeshes.visible = false;
		GBP.surfaceOpenings.visible = true;

		GBP.surfaceOpenings.children.forEach( element => {

			element.visible = element.userData.data.id === id ? true : false;

			if ( element.visible === true  ) {
				element.material.opacity = 1;
				element.material.side = 2;
				element.material.needsUpdate = true;

			}

		} );

	};



	GBI.setSpaceVisible = function( spaceId ) {
		//console.log( 'spaceId', spaceId );
		//console.log( 'spaceIndex', spaceIndex );

		GBP.surfaceEdges.visible = true;
		GBP.surfaceMeshes.visible = true;
		GBP.surfaceOpenings.visible = false;

		for ( let child of GBP.surfaceMeshes.children ) {

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



	GBI.setStoreyVisible = function( id ) {

		//console.log( 'id', id );

		const spaces = GBP.gbjson.Campus.Building.Space;

		GBP.surfaceMeshes.children.forEach( element => element.visible = false );

		for ( let child of GBP.surfaceMeshes.children ) {

			const adjacentSpaceId = child.userData.data.AdjacentSpaceId;

			if ( !adjacentSpaceId ) { continue; }

			const spaceIdRef = Array.isArray( adjacentSpaceId ) ? adjacentSpaceId[ 1 ].spaceIdRef : adjacentSpaceId.spaceIdRef;

			spaces.forEach( element => child.visible = element.id === spaceIdRef && element.buildingStoreyIdRef === id ? true : child.visible );

		}

		//const storey = GBP.gbjson.Campus.Building.BuildingStorey.find( function( item ) { return item.id === id; } );
		//	console.log( 'storey', storey );

	};



	GBI.setSurfaceVisible = function( id ) {

		GBP.surfaceEdges.visible = true;
		GBP.surfaceMeshes.visible = true;
		GBP.surfaceOpenings.visible = false;

		GBP.surfaceMeshes.children.forEach( element => element.visible = element.userData.data.id === id ? true : false );

		//console.log( 'recGeom', recGeom );

		if ( window.HUDdivAttributes ) {

			GBI.setPanelSurfaceAttributes( HUDdivAttributes, id );

		}

	};



	GBI.setSurfaceVisibleToggle = function( id ) {

		GBP.surfaceMeshes.visible = true;

		surfaceMesh = GBP.surfaceMeshes.children.find( element => element.userData.data.id === id )

		surfaceMesh.visible = !surfaceMesh.visible;

	};

	GBI.setZoneVisible = function ( zoneIdRef ) {
		//console.log( 'zoneIdRef', zoneIdRef );

		const spaces = GBP.gbjson.Campus.Building.Space;

		GBP.surfaceMeshes.children.forEach( element => element.visible = false );

		for ( let child of GBP.surfaceMeshes.children ) {

			adjacentSpaceId = child.userData.data.AdjacentSpaceId;
			//console.log( 'adjacentSpaceId', adjacentSpaceId );

			if ( !adjacentSpaceId ) { continue; }

			spaceIdRef = Array.isArray( adjacentSpaceId ) ? adjacentSpaceId[ 1 ].spaceIdRef : adjacentSpaceId.spaceIdRef

			spaces.forEach( element => child.visible = element.id === spaceIdRef && element.zoneIdRef === zoneIdRef ? true : child.visible );

		}

		let zone;

		if ( Array.isArray( GBP.gbjson.Zone ) ) {

			zone = GBP.gbjson.Zone.find( function( item ) { return item.id === zoneIdRef; } );

		} else {

			zone = GBP.gbjson.Zone;

		}

		//console.log( 'zone', zone );

	};



	///// Show / Hide by Type of Element

	GBI.setExposedToSunVisible = function(  ) {

		GBP.surfaceMeshes.children.forEach( element => element.visible = element.userData.data.exposedToSun === "true" ? true : false );

	};



	GBI.setCadObjectTypeVisible = ( CADObjectGroupId ) => {
		// used by REP

		//console.log( 'CADObjectGroupId', CADObjectGroupId);

		const cadId = CADObjectGroupId.trim();
		GBP.surfaceEdges.visible = true;
		GBP.surfaceMeshes.visible = true;
		GBP.surfaceOpenings.visible = false;

		for ( let child of GBP.surfaceMeshes.children ) {

			child.visible = false;

		}

		for ( let child of GBP.surfaceMeshes.children ) {

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



	GBI.setOpeningTypeVisible = function( type ) {
		console.log( 'type', type );

		GBP.surfaceEdges.visible = false;
		GBP.surfaceMeshes.visible = false;
		GBP.surfaceOpenings.visible = true;

		if ( type ) {

			GBP.surfaceOpenings.children.forEach( element => element.visible = element.userData.data.openingType === type ? true : false );

		} else {

			GBP.surfaceOpenings.children.forEach( element => element.visible = true );

		}

	};



	GBI.setSurfaceTypeVisible = function( type ) {

		GBP.surfaceEdges.visible = true;
		GBP.surfaceMeshes.visible = true;
		GBP.surfaceOpenings.visible = false;

		GBP.surfaceMeshes.children.forEach( element => element.visible = element.userData.data.surfaceType === type? true : false );

		if ( window.HUDdivAttributes ) {

			HUDdivAttributes.innerHTML =

			`<details open>

				<summary>Surface Type: ${type}</summary>

				<p><button onclick=HUD.updateSurfaceType() >Update surface type of the surface</button></p>

				<div><select id=GBIselSurfaceType ></select></div>


			</details>

			<hr>`;

		}

		const surfaces = GBP.gbjson.Campus.Surface;

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

		GBIselSurfaceType.innerHTML = txt;
		GBIselSurfaceType.size = types.length;

	};



	GBI.setSurfaceTypeInvisible = function( that ) {

		//console.log( '', that );
		//that.style.backgroundColor = that.style.backgroundColor === 'lightblue' ? '' : 'lightblue';

		for ( let child of GBP.surfaceMeshes.children ) {

			if ( !child.userData.data ) { continue; }

			if ( child.userData.data.surfaceType === that.value && that.style.backgroundColor === COR.colorButtonToggle ) {

				child.visible = false;

			} else if ( child.userData.data.surfaceType === that.value ) {

				child.visible = true;

			}

		}

	};



	////////// Zoom

	GBI.setCadIdZoom = function( cadId ) {

		cadId = decodeURI( cadId );
		GBI.setCadObjectIdVisible( cadId );

		let meshes = GBP.surfaceMeshes.children.filter( element => element.userData.data.CADObjectId === cadId );
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



	GBI.setSpaceZoom = function( id, index = 0 ) {

		GBI.setSpaceVisible( id, index );

		let meshes = [];

		for ( let child of GBP.surfaceMeshes.children ) {

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



	GBI.setSurfaceTypeZoom = function( surfaceType ) {
		//console.log( 'surfaceType', surfaceType );

		GBI.setSurfaceTypeVisible ( surfaceType );

		let meshes = GBP.surfaceMeshes.children.filter( element => element.userData.data.surfaceType === surfaceType );
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
		THR.camera.position.copy( center.clone().add( new THREE.Vector3( 1.0 * radius, - 1.0 * radius, 1.0 * radius ) ) );

	};



	GBI.setZoneZoom = function( zoneId ) {

		GBI.setZoneVisible( zoneId );

		let meshes = GBP.surfaceMeshes.children.filter( element => element.userData.data.zoneIdRef === zoneId );
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



	GBI.setBuildingZoom = function( cadId ) {
		// Used: GBI.setPanelShowHide

		let meshes = GBP.surfaceMeshes.children.filter( element => element.userData.data.surfaceType === 'ExteriorWall' );
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


	////////// Set Menu Panel Attributes



	GBI.setElementIdAttributes = function ( id, item ) {
		//console.log( 'item', item, '\nid', id );

		GBI.id = id;
		//console.log( 'GBI.id', GBI.id );

		//console.log( 'item.parent', item.parent );
		let arr = Array.isArray( item.parent ) ? item.parent : [ item.parent ];
		//console.log( 'arr', arr );

		const obj = arr.find( element => element.id === id );
		//console.log( 'obj', obj );

		divAttributes = document.getElementById ( item.divAttributes );
		//console.log( 'divAttributes', divAttributes );

		divAttributes.innerHTML = ''; //`<div>id: <b>${id}</b></div>`;

		for ( let property in obj ) {

			if ( obj[ property ] !== null && typeof( obj[ property ] ) === 'object' ) {

				if ( property === 'AdjacentSpaceId' ) {

					//console.log( 'property', obj[ property ].length );

					if ( Array.isArray( obj[ property ] ) ) {

						divAttributes.innerHTML += GBI.getAttributeAdjacentSpace( obj[ property ][ 0 ].spaceIdRef, 1 );
						divAttributes.innerHTML += GBI.getAttributeAdjacentSpace( obj[ property ][ 1 ].spaceIdRef, 2 );

					} else {

						divAttributes.innerHTML += GBI.getAttributeAdjacentSpace( obj[ property ].spaceIdRef, 0 );

					}

				}

			} else if ( property === 'buildingStoreyIdRef' && obj[ property ] ) {

				divAttributes.innerHTML += GBI.getAttributeStorey( obj[ property ] );

			} else if ( item.element === 'Surface' && property === 'CADObjectId' ) {

				divAttributes.innerHTML += GBI.getAttributeCadObjectId( obj[ property ] );

			} else if ( property === 'id' && obj[ property ] ) {

				if ( item.element === 'Openings' ) {

					divAttributes.innerHTML += GBI.getAttributeOpenings( obj[ property ] );

				} else if ( item.element === 'Space' ) {

					divAttributes.innerHTML += GBI.getAttributeAdjacentSpace( obj[ property ], -1 );

				} else if ( item.element === 'Surface' ) {

					divAttributes.innerHTML += GBI.getAttributeSurfaceId( obj[ property ] );

				} else if ( item.element === 'Storey' ) {

					divAttributes.innerHTML += GBI.getAttributeStorey( obj[ property ] );

				}else if ( item.element === 'Zone' ) {

					divAttributes.innerHTML += GBI.getAttributeZone( obj[ property ] );

				} else {

					divAttributes.innerHTML += `<div><span class=attributeTitle >${property}:</span><br>
						<span class=attributeValue >${obj[ property ]}</span></div>`;

				}

			} else if ( property === 'surfaceType' ) {

				divAttributes.innerHTML += GBI.getAttributeSurfaceType( obj[ property ] );

			} else if ( property === 'zoneIdRef' ) {

				divAttributes.innerHTML += GBI.getAttributeZone( obj[ property ] );

			} else {

				divAttributes.innerHTML += `<div><span class=attributeTitle >${property}:</span>
					<span class=attributeValue >${obj[ property ]}</span></div>`;

			}

		}

		GBI.setButtonStyleClass( divAttributes );

	};



	GBI.setPanelSpaceAttributes = function( target, spaceId, spaceIndex ) {
		//console.log( 'target', target );
		//console.log( 'spaceIndex', spaceIndex );
		GBI.spaceIndex = spaceIndex >= 0 ? spaceIndex : GBI.spaceIndex;

		const item = {};

		target.innerHTML =
		// 	<summary>Adjacent Space ` + ( spaceIndex > 0 ? spaceIndex : '' ) + `</summary>
		`<details open >

			<summary>Adjacent Space ` + ( GBI.spaceIndex > -2 ? GBI.spaceIndex : '' ) + `</summary>

			<p>
				<button onclick=HUD.updateSpace(GBIselSpace.value,GBI.spaceIndex); >update the space associated with this surface</button>
			</p>

			<div id=GBIdivSpace ></div>

			<div id=GBIdivAtts ></div>


		</details>

		<hr>`;

		item.attribute = 'space';
		item.divAttributes = 'GBIdivAtts';
		item.divTarget = document.getElementById( 'GBIdivSpace' );
		item.element = 'Space';
		item.name = 'itemSpace';
		//item.optionValues = item.optionValues;
		item.optionValues = GBP.gbjson.Campus.Building.Space.map( item => [ item.id, item.Name, item.CADObjectId ] );
		item.parent = GBP.gbjson.Campus.Building.Space;
		item.placeholder = 'space id';
		item.selItem = 'GBIselSpace';

		//console.log( 'item.optionValues', item.optionValues);

		GBI.itemSpace = GBI.setElementPanel2( item );

		const sel = document.getElementById( item.selItem );
		sel.value = spaceId;
		sel.click();

		GBI.setSpaceVisible( spaceId );

		//console.log( 'sel', sel );

	};



	GBI.setPanelSurfaceAttributes = function( target, surfaceId ) {

		const surfaceMesh = GBP.surfaceMeshes.children.find( element => element.userData.data.id === surfaceId );
		//console.log( 'surfaceMesh', surfaceMesh );

		const recGeom = surfaceMesh.userData.data.RectangularGeometry;
		const height = parseFloat(recGeom.Height);
		const width = parseFloat(recGeom.Width);
		let openings = surfaceMesh.userData.data.Opening ? surfaceMesh.userData.data.Opening.length : 0;
		openings = openings ? openings : 0;

		target.innerHTML =

		`<details open >

			<summary>Surface ID: ` + surfaceId + `</summary>

			<div>rectangular width: ${width.toLocaleString()}</div>
			<div>rectangular height: ${height.toLocaleString()}</div>
			<div>rectangular area: ${(width * height).toLocaleString()}</div>
			<div>azimiuth: ${parseFloat(recGeom.Azimuth).toLocaleString()}</div>
			<div>tilt: ${parseFloat(recGeom.Tilt).toLocaleString()}</div>
			<div>vertices: ${surfaceMesh.geometry.vertices.length}</div>
			<div>openings: ${openings}</div>

		</details>

		<hr>`;

		HUD.removeTelltales();
	}


	//////////

	GBI.setGbjsonAttributes = function( obj, target, title ) {
		// still Used: ??
		//console.log( 'obj', obj );
		//console.log( 'target', target );

		let attributes = '';

		for ( let property in obj ) {

			if ( obj[ property ] !== null && typeof( obj[ property ] ) === 'object' ) {

				//console.log( 'property', obj );

			} else {

				attributes +=
				`<div>
					<span class=attributeTitle >${property}:</span>
					<span class=attributeValue >${obj[ property ]}</span>
				</div>`;


			}

		}
		//console.log( 'attributes', attributes );

		target.innerHTML =

		`<details >
			<summary>${title}</summary>` +
			attributes +
			`<hr>
		</details>`;

	};



	//////////

	GBI.getAttributeAdjacentSpace = function( spaceIdRef, spaceIndex = 0 ) {
		// used by REP
		//console.log( 'getAttributeAdjacentSpace spaceIdRef', spaceIdRef );
		//console.log( 'getAttributeAdjacentSpace spaceIndex', spaceIndex );

		const txt =
		`<div>
			<span class=attributeTitle >adjacent space ` + ( spaceIndex > -2 ? spaceIndex : `` ) + ` id</span>:<br>
			<button id=GBIbutSpaceVis` + spaceIndex + ` onclick=GBI.setPanelSpaceAttributes(HUDdivAttributes,"${spaceIdRef}",${spaceIndex}); >${spaceIdRef}</button>
			<button onclick=GBI.setSpaceZoom("${spaceIdRef}",${spaceIndex}); >&#8981;</button>
		</div>`;

		return txt;

	};



	GBI.getAttributeCadObjectId = function( cadId ) {
		//console.log( 'cadId', cadId );

		const txt =
		`<div>
			<span class=attributeTitle >cad object id</span>: <button onclick=GBI.setCadIdZoom("` + encodeURI(cadId) + `"); >&#8981;</button><br>
			<button id=buttId onclick=GBI.setCadObjectIdVisible(this.innerText); >${cadId}</button>

		</div>`; // cadID has spaces
		return txt;

	};



	GBI.getAttributeOpenings = function( id ) {

		const txt =
		`<div>
			<span class=attributeTitle >id</span>:<br>
			<button onclick=GBI.setOpeningVisible(this.innerText); >${id}</button><br>
			</div>`;

			//<button onclick=GBI.setSurfaceZoom("` + id + `"); >&#8981;</button>
		return txt;

	};



	GBI.getAttributeSurfaceId = function( id ) {

		const txt =
		`<div>
			<span class=attributeTitle >id</span>:<br>
			<button onclick=GBI.setSurfaceVisible(this.innerText); >${id}</button>
			<button onclick=GBI.setSurfaceZoom("${id}"); >&#8981;</button>
			<button onclick=GBI.setSurfaceVisibleToggle("${id}"); ><img src="../assets/eye.png" height=12></button>
		</div>`;

		return txt;

	};



	GBI.getAttributeStorey = function( storeyId ) {

		const txt =
		`<div>
			<span class=attributeTitle >storey id</span>:<br>
			<button onclick=GBI.setStoreyVisible(this.innerText); >${storeyId}</button>
		</div>`;
		// add zoom

		return txt;

	};



	GBI.getAttributeZone = function( zoneId ) {

		const txt =
		`<div>
			<span class=attributeTitle >zone id</span>:<br>
			<button onclick=GBI.setZoneVisible(this.innerText); >${zoneId}</button>
		</div>`;

		//<button onclick=GBI.setZoneZoom("` + zoneId + `"); >&#8981;</button>

		return txt;

	};


	////////// Set Attributes by Type


	GBI.getAttributeSurfaceType = function( surfaceType ) {

		const txt =
		`<div>
			<span class=attributeTitle >surface type</span>:<br>
			<button onclick=GBI.setSurfaceTypeVisible(this.innerText); >${surfaceType}</button>
			<button onclick=GBI.setSurfaceTypeZoom("` + surfaceType + `"); >&#8981;</button>
		</div>`;

		return txt;

	};



	GBI.setMenuPanelCadObjectsByType = function( target ) {

		const surfaces = GBP.gbjson.Campus.Surface;
		const cadIds = [];

		for ( let surface of surfaces ) {

			//if ( !surface.CADObjectId ) { continue; }

			if ( !surface.CADObjectId || typeof surface.CADObjectId !== 'string' ) {

				divLog.innerHTML += 'CADObjectId error: ' + surface.id + '<br>';

				console.log( 'surface', surface );
				console.log( 'surface.CADObjectId', surface.CADObjectId, typeof surface.CADObjectId );
				continue;

			}

			const id = surface.CADObjectId.replace( / \[(.*?)\]/gi, '' ).trim();

			if ( !cadIds.includes( id ) ) {

				cadIds.push( id );

			}

		}

		//console.log( 'cadIds', cadIds );
		cadIds.sort();

		let txt = '';

		for ( let id of cadIds ){

			txt += '<option>' + id + '</option>';

		}

		const details =

		`<p>
			<select id = "REPselCadIdGroups"
				onclick=GBI.setCadObjectTypeVisible(this.value);
				onchange=GBI.setCadObjectTypeVisible(this.value); size=10 >` +
				txt +
			`</select>
		</p>`;

		target.innerHTML = details;

	};


	GBI.setMenuPanelCadObjectsByType2 = function( target, selId ) {

		const surfaces = GBP.gbjson.Campus.Surface;
		const cadIds = [];

		for ( let surface of surfaces ) {

			//if ( !surface.CADObjectId ) { continue; }

			if ( !surface.CADObjectId || typeof surface.CADObjectId !== 'string' ) {

				divLog.innerHTML += 'CADObjectId error: ' + surface.id + '<br>';

				console.log( 'surface', surface );
				console.log( 'surface.CADObjectId', surface.CADObjectId, typeof surface.CADObjectId );
				continue;

			}

			const id = surface.CADObjectId.replace( / \[(.*?)\]/gi, '' ).trim();

			if ( !cadIds.includes( id ) ) {

				cadIds.push( id );

			}

		}

		//console.log( 'cadIds', cadIds );
		cadIds.sort();

		let txt = '';

		for ( let id of cadIds ){

			txt += '<option>' + id + '</option>';

		}

		const details = `<select id = "${selId}" size=10 >${txt}</select>`;

		target.innerHTML = details;

	};



	///////// Show / Hide

	GBI.getPanelShowHide = function() {
		//used by HUD/
		const txt =

		`<details open >

			<summary>Show / Hide</summary>

			<button onclick=GBP.surfaceMeshes.visible=!GBP.surfaceMeshes.visible; >surfaces</button>
				<button onclick=GBP.surfaceEdges.visible=!GBP.surfaceEdges.visible; >edges</button>
				<button onclick=GBP.surfaceOpenings.visible=!GBP.surfaceOpenings.visible; title="toggle the windows" >openings</button>
				<button onclick=GBP.setAllVisible(); >all visible</button>

			<hr>

		</details>`;

		return txt;

	};



	GBI.setPanelShowHide = function( target ) {
		// used by HUD2/ISS/REP

		target.innerHTML =

		`<details open >

			<summary>Show || Hide / Zoom</summary>

			<button onclick=GBP.toggleSurfacesVisible(); >surfaces</button>
				<button onclick=GBP.surfaceEdges.visible=!GBP.surfaceEdges.visible; >edges</button>
				<button onclick=GBP.surfaceOpenings.visible=!GBP.surfaceOpenings.visible; title="toggle the windows" >openings</button>
				<button onclick=GBP.setAllVisible(); >all</button>
				/
				<button onclick=GBI.setBuildingZoom(); >zoom all</button>

		</details>`;

	};







	////////// get IDs

	GBI.getSpaceId = function( spaceIdRef ) {
		// Used: ??

		if ( !GBP.gbjson.Campus.Building.Space || !GBP.gbjson.Campus.Building.Space.length ) { return; }

		let space = GBP.gbjson.Campus.Building.Space.find( element => element.id === spaceIdRef );

		space = space ? space : 'none';

		return space;

	};



	////////// Style


	GBI.setButtonStyleClass = function( item ) {
		// used by REP/HUD
		const butts = item.getElementsByTagName( "button" );
		//console.log( 'butts', butts );

		for ( let butt of butts ) {

			butt.classList.add( "w3-theme-d1", "w3-hover-theme", "w3-hover-border-theme" );

		}

	};



	////////// Editing


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

	};



	GBI.setPanelEditSurface = function( target ) {

		target.innerHTML =
		`<details open>

			<summary>Edit the Surface</summary>

			<button class=toggle onclick=GBI.deleteSurface(); >delete surface</button>
				<button onclick=GBI.addModifiedBy(); title='add name, app, date and time of the edits' >modified by </button>
				<button onclick=GBI.saveFile(); title="creates a new file with the changes" >save edits</button>

			<hr>

		</details>`;

	};



	GBI.deleteSurface = function() {

		const id = HUDselSurfaceId.value;

		const proceed = confirm( 'OK to delete surface: ' + id + '?' );

		if ( !proceed ){ return; }

		// remove from gbxml
		const surfacesResponse = GBP.gbxml.getElementsByTagName( "Surface" );
		surfaceXml = surfacesResponse[ id ];
		//console.log( 'id', id,'\nsurface to delete', surfaceXml );

		name = surfaceXml.getElementsByTagName("Name")[ 0 ].innerHTML;
		//console.log( 'name', name );

		GBI.surfaceChanges.deletes.push( name );

		surfaceXml.remove();


		// remove from gbjson
		GBP.surfaceJson = GBP.surfaceJson.filter( element => element.id != id );
		//console.log( 'GBP.surfaceJson', GBP.surfaceJson );

		// remove from three.js
		const surfaceMesh = GBP.surfaceMeshes.children.find( element => element.userData.data.id === id );
		GBP.surfaceMeshes.remove( surfaceMesh );


		const element =  document.getElementById( 'divSurface' + id );
		// console.log( 'element', element );

		if ( element ) {

			element.innerHTML = '<p>Surface deleted</p>' + element.innerHTML;
			element.style.opacity = 0.2;

		}

	};



	GBI.addModifiedBy = function() {

		// not adding spaces and new lines nicely. Why?

		const documentHistoryXml = GBP.gbxmlResponseXML.getElementsByTagName( "DocumentHistory" );

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

	};



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

	};
