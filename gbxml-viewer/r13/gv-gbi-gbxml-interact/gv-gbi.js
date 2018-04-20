/*
global THR, THREE, GBP, window, document,butSettings, detSettings,divMenuItems
*/
/* jshint esversion: 6 */

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
*/


	////////// Show/Hide by Individual Elements


	GBI.setCadObjectIdVisible = function( CadId ) {

		GBP.surfaceMeshes.visible = true;
		GBP.surfaceEdges.visible = true;
		GBP.openingMeshes.visible = false;

		GBP.surfaceMeshes.children.forEach( element =>
			element.visible = element.userData.data.CADObjectId === CadId ? true : false );

	};



	GBI.setOpeningVisible = function( id ) {

		//console.log( 'opening id', id );

		GBP.surfaceEdges.visible = false;
		GBP.surfaceMeshes.visible = false;
		GBP.openingMeshes.visible = true;

		GBP.openingMeshes.children.forEach( element => {

			element.visible = element.userData.data.id === id ? true : false;

			if ( element.visible === true  ) {
				element.material.opacity = 1;
				element.material.side = 2;
				element.material.needsUpdate = true;

			}

		} );

	};



	GBI.setSpaceVisible = function( id ) {
		//console.log( 'id', id );

		GBP.surfaceEdges.visible = true;
		GBP.surfaceMeshes.visible = true;
		GBP.openingMeshes.visible = false;

		for ( let child of GBP.surfaceMeshes.children ) {

			child.visible = false;

			const adjacentSpaceId = child.userData.data.AdjacentSpaceId;
			//console.log( 'adjacentSpaceId', adjacentSpaceId );

			if ( adjacentSpaceId && adjacentSpaceId.spaceIdRef && id === adjacentSpaceId.spaceIdRef ) {

				child.visible = true;

			} else if ( Array.isArray( adjacentSpaceId ) === true ) {

				if ( id === adjacentSpaceId[ 0 ].spaceIdRef || id === adjacentSpaceId[ 1 ].spaceIdRef ) {

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

			adjacentSpaceId = child.userData.data.AdjacentSpaceId;

			if ( !adjacentSpaceId ) { continue; }

			spaceIdRef = Array.isArray( adjacentSpaceId ) ? adjacentSpaceId[ 1 ].spaceIdRef : adjacentSpaceId.spaceIdRef;

			spaces.forEach( element => child.visible = element.id === spaceIdRef && element.buildingStoreyIdRef === id ? true : child.visible );

		}

		//const storey = GBP.gbjson.Campus.Building.BuildingStorey.find( function( item ) { return item.id === id; } );
		//	console.log( 'storey', storey );

	};



	GBI.setSurfaceVisible = function( id ) {

		GBP.surfaceEdges.visible = true;
		GBP.surfaceMeshes.visible = true;
		GBP.openingMeshes.visible = false;

		GBP.surfaceMeshes.children.forEach( element => element.visible = element.userData.data.id === id ? true : false );

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

		const cadId = CADObjectGroupId.trim()
		GBP.surfaceEdges.visible = true;

		for ( let child of GBP.surfaceMeshes.children ) {

			child.visible = false;

		}

		for ( let child of GBP.surfaceMeshes.children ) {

			if ( !child.userData.data.CADObjectId || typeof child.userData.data.CADObjectId !== 'string' ) { continue; }

			id = child.userData.data.CADObjectId.replace( /\[(.*?)\]/gi, '' ).trim() ;

			if ( id === cadId ) {
				//console.log( 'equal id\n', id.length, '\n', CADObjectGroupId.length );
				//console.log( 'id\n', id, '\n', CADObjectGroupId );
				child.visible = true;

			} else {

				child.visible = false;

			}

		}

	};



	GBI.setOpeningTypeVisible = function( type ) {

		GBP.surfaceEdges.visible = false;
		GBP.surfaceMeshes.visible = false;
		GBP.openingMeshes.visible = true;

		if ( type ) {

			GBP.openingMeshes.children.forEach( element => element.visible = element.userData.data.openingType === type ? true : false );

		} else {

			GBP.openingMeshes.children.forEach( element => element.visible = true );

		}

	};



	GBI.setSurfaceTypeVisible = function( type ) {

		GBP.surfaceEdges.visible = true;
		GBP.surfaceMeshes.visible = true;
		GBP.openingMeshes.visible = false;

		GBP.surfaceMeshes.children.forEach( element => element.visible = element.userData.data.surfaceType === type? true : false );

	};



	GBI.setSurfaceTypeInvisible = function( that ) {

		that.style.backgroundColor = that.style.backgroundColor === 'lightblue' ? '' : 'lightblue';

		for ( let child of GBP.surfaceMeshes.children ) {

			if ( !child.userData.data ) { continue; }

			if ( child.userData.data.surfaceType === that.value && that.style.backgroundColor === 'lightblue' ) {

				child.visible = false;

			} else if ( child.userData.data.surfaceType === that.value ) {

				child.visible = true;

			}

		}

	};



	////////// Zoom

	GBI.setCadIdZoom = function( cadId ) {

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

	}



	GBI.setSpaceZoom = function( id ) {

		GBI.setSpaceVisible( id );

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

	}



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

	//GBP.zoomObjectBoundingSphere = function( obj )


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


	}


	////////// Spaces

	GBI.getSpaceId = function( spaceIdRef ) {

		if ( !GBP.gbjson.Campus.Building.Space || !GBP.gbjson.Campus.Building.Space.length ) { return; }

		let space = GBP.gbjson.Campus.Building.Space.find( element => element.id === spaceIdRef );

		space = space ? space : 'none';

		return space;

	};



	////////// Set Menu Panels


	GBI.getElementPanel = function( item ){

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


		console.log( 'divElement', divElement );
		console.log( 'item', item );

		return divElement;

	};



	GBI.setElementPanel2 = function( item ){

		item = item || {};
		item.attribute = item.attribute ? item.attribute : '';
		item.divAttributes = item.divAttributes || 'GBIdivSurface';
		item.divTarget = item.divTarget || 'GBIdivElements';
		item.element = item.element || 'Surface';
		item.optionValues = item.optionValues || [ [ 'aaa', 1], [ 'bbb', 2 ], [ 'ccc'], 3 ] ;
		item.placeholder = item.placeholder || 'surface id';
		item.selItem = item.selItem || 'selItem';

		let options = '';
		//item.ids.forEach( id => options += '<option>' + id + '</option>' );

		item.optionValues.forEach( option =>
			options += '<option value=' + option[ 1 ] + ' title="id: ' + option[ 1 ] + '" >' + option[ 0 ] + '</option>' );

		//console.log( 'item', item );

		divElement =

			`<div class=flex-container2 >
				<div class=flex-div1 >
					<input oninput=GBI.setSelectedIndex(this,` + item.selItem + `);
						placeholder="` + item.placeholder + `" style=margin-bottom:0.5rem;width:6rem; ><br>
					<select id = ` + item.selItem +
						` size=` + ( item.optionValues.length < 10 ? item.optionValues.length : 10 ) + ` style=min-width:6rem; >` + options + `</select>
				</div>
				<div id = ` + item.divAttributes + ` class=flex-left-div2 >
					999
				</div>
			</div>`;

		item.divTarget.innerHTML = divElement;

		//console.log( 'item.divTarget', item.divTarget);

		const selectTarget = item.divTarget.getElementsByTagName( 'select' )[ 0 ];
		//console.log( 'target', target );

		selectTarget.onclick= function() {
			//GBI.setSurfaceVisible(selectTarget.value );
			GBI.setIdAttributes(selectTarget.value, item ); };
		selectTarget.onchange =  function() {
			GBI.setSurfaceVisible(selectTarget.value); //////////// make work for any element
			GBI.setIdAttributes(selectTarget.value, item ); };

		//selectTarget.selectedIndex = 0;
		//selectTarget.click();

	};



	GBI.setSelectedIndex = function( input, select ) {

		const str = input.value.toLowerCase();

		for ( let option of select.options ) {

			if ( option.innerHTML.toLowerCase().includes( str ) ) {

				select.value = option.value;

				return;

			}

		}

	};



	////////// Set Menu Panel Attributes



	GBI.setIdAttributes = function ( id, item ) {
		//console.log( 'item', item, 'id', id );

		//let item = REP.reportTypes[ REPselReport.selectedIndex ];
		let arr = Array.isArray( item.parent ) ? item.parent : [ item.parent ];
		obj = arr.find( element => element.id === id );
		//console.log( 'obj', obj );

		/*
		let attributes =
		`<div>` +
				( REPselReportType.selectedIndex + 1 ) +
			`. ` +
			id +
		`</div>`;
		*/

		let attributes =
		`<div>` +
			id +
		`</div>`;

		for ( let property in obj ) {

			if ( obj[ property ] !== null && typeof( obj[ property ] ) === 'object' ) {

				if ( property === 'AdjacentSpaceId' ) {

					//console.log( 'property', obj[ property ].length );

					if ( Array.isArray( obj[ property ] ) ) {

						attributes += GBI.getAttributeAdjacentSpace( obj[ property ][ 0 ].spaceIdRef );
						attributes += GBI.getAttributeAdjacentSpace( obj[ property ][ 1 ].spaceIdRef );

					} else {

						attributes += GBI.getAttributeAdjacentSpace( obj[ property ].spaceIdRef );

					}

				}

			} else if ( property === 'buildingStoreyIdRef' && obj[ property ] ) {

					attributes += GBI.getAttributeStorey( obj[ property ] );

			} else if ( item.element === 'Surface' && property === 'CADObjectId' ) {

				attributes += GBI.getAttributeCadObjectId( obj[ property ] );

			} else if ( property === 'id' && obj[ property ] ) {

				if ( item.element === 'Openings' ) {

					attributes += GBI.getAttributeOpenings( obj[ property ] );

				} else if ( item.element === 'Surface' ) {

					attributes += GBI.getAttributeSurfaceId( obj[ property ] );

				} else if ( item.element === 'Space' ) {

					attributes += GBI.getAttributeAdjacentSpace( obj[ property ] );

				} else if ( item.element === 'Storey' ) {

					attributes += GBI.getAttributeStorey( obj[ property ] );

				}else if ( item.element === 'Zone' ) {

					attributes += GBI.getAttributeZone( obj[ property ] );

				} else {

					attributes += '<div><span class=attributeTitle >' + property + ':</span><br>' +
						'<span class=attributeValue >' + obj[ property ] + '</span></div>';

				}

			} else if ( property === 'surfaceType' ) {

				attributes += GBI.getAttributeSurfaceType( obj[ property ] );

			} else if ( property === 'zoneIdRef' ) {

				attributes += GBI.getAttributeZone( obj[ property ] );

			} else {

				attributes += '<div><span class=attributeTitle >' + property + ':</span><br>' +
					'<span class=attributeValue >' + obj[ property ] + '</span></div>';

			}

		}
		//console.log( 'attributes', attributes );

		selectTarget = item.divTarget.getElementsByClassName( 'flex-left-div2' )[ 0 ];
		//console.log( 'selectTarget', selectTarget );
		selectTarget.innerHTML = attributes;

		GBI.setButtonStyleClass( selectTarget );

	};



	GBI.setGbjsonAttributes = function( obj, target, title ) {
		//console.log( 'obj', obj );
		//console.log( 'target', target );

		let attributes = '';

		for ( property in obj ) {

			if ( obj[ property ] !== null && typeof( obj[ property ] ) === 'object' ) {

				//console.log( 'property', obj );

			} else {

				attributes += '<div><span class=attributeTitle >' + property + ':</span> ' +
				'<span class=attributeValue >' + obj[ property ] + '</span></div>';


			}

		};
		//console.log( 'attributes', attributes );

		target.innerHTML =

		`<details >
			<summary>` + title + `</summary>` +
			attributes +
			`<hr>
		</details>`;

	};



	//////////

	GBI.getAttributeAdjacentSpace = function( spaceIdRef ) {

		const txt =
		`<div>
			<span class=attributeTitle >adjacent space id</span>:<br>
			<button onclick=GBI.setSpaceVisible(this.innerText); >` +
			spaceIdRef +
			`</button>
			<button onclick=GBI.setSpaceZoom("` + spaceIdRef + `"); >&#8981;</button>
		</div>`;

		return txt;

	};



	GBI.getAttributeCadObjectId = function( cadId ) {
		//console.log( 'cadId', cadId );

		const txt =
		`<div>
			<span class=attributeTitle >cad object id</span>:<br>
			<button id=buttId onclick=GBI.setCadObjectIdVisible(this.innerText); >` +
			cadId +
			`</button>
			<button onclick=GBI.setCadIdZoom(buttId.innerText); >&#8981;</button>
		</div>`;

		return txt;

	};



	GBI.getAttributeOpenings = function( id ) {

		const txt =
		`<div>
			<span class=attributeTitle >id</span>:<br>
			<button onclick=GBI.setOpeningVisible(this.innerText); >` +
			id +
			`</button><br>
			<span style=color:red; >Issue: only shows external doors</span>
			</div>`;

			//<button onclick=GBI.setSurfaceZoom("` + id + `"); >&#8981;</button>
		return txt;

	};



	GBI.getAttributeSurfaceId = function( id ) {

		const txt =
		`<div>
			<span class=attributeTitle >id</span>:<br>
			<button onclick=GBI.setSurfaceVisible(this.innerText); >` +
			id +
			`</button>
			</div>`;

			//<button onclick=GBI.setSurfaceZoom("` + id + `"); >&#8981;</button>
		return txt;

	};



	GBI.getAttributeStorey = function( storeyId ) {

		const txt =
		`<div>
			<span class=attributeTitle >storey id</span>:<br>
			<button onclick=GBI.setStoreyVisible(this.innerText); >`+
			storeyId +
			`</button>
		</div>`;

		return txt;

	};



	GBI.getAttributeZone = function( zoneId ) {

		const txt =
		`<div>
			<span class=attributeTitle >zone id</span>:<br>
			<button onclick=GBI.setZoneVisible(this.innerText); >` +
			zoneId +
		`</button>
		</div>`;

		//<button onclick=GBI.setZoneZoom("` + zoneId + `"); >&#8981;</button>

		return txt;

	};


	////////// Set Attributes by Type


	GBI.getAttributeSurfaceType = function( surfaceType ) {

		const txt =
		`<div>
			<span class=attributeTitle >surface type</span>:<br>
			<button onclick=GBI.setSurfaceTypeVisible(this.innerText); >` +
			surfaceType +
			`</button>
			<button onclick=GBI.setSurfaceTypeZoom("` + surfaceType + `"); >&#8981;</button>
		</div>`;

		return txt;

	};



	///////// Show / Hide

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


	// used by IDD
	GBI.setPanelShowHide = function( target ) {

		target.innerHTML =

		`<details open >

			<summary>Show || Hide / Zoom</summary>

			<button onclick=GBP.surfaceMeshes.visible=!GBP.surfaceMeshes.visible; >surfaces</button>
				<button onclick=GBP.surfaceEdges.visible=!GBP.surfaceEdges.visible; >edges</button>
				<button onclick=GBP.openingMeshes.visible=!GBP.openingMeshes.visible; title="toggle the windows" >openings</button>
				<button onclick=GBP.setAllVisible(); >all</button>
				/
				<button onclick=GBP.setAllVisible(); >zoom</button>

			<hr>

		</details>`;

	};



	GBI.setAllVisible = function() {

		GBP.surfaceMeshes.visible = true;
		GBP.surfaceEdges.visible = true;

		GBP.surfaceMeshes.children.forEach( child => child.visible = true );

	};


	////////// Style


	GBI.setButtonStyleClass = function( item ) {

		const butts = item.getElementsByTagName( "button" );
		//console.log( 'butts', butts );

		for ( let butt of butts ) {

			butt.classList.add( "w3-theme-d1", "w3-hover-theme", "w3-hover-border-theme" );

		}

	}



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
		`<details>

			<summary>Edit the Surface</summary>

			<button class=toggle onclick=GBI.deleteSurface(); >delete surface</button>
				<button onclick=GBI.addModifiedBy(); title='add name, app, date and time of the edits' >modified by </button>
				<button onclick=GBI.saveFile(); title="creates a new file with the changes" >save edits</button>

			<hr>

		</details>`;

	};



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
			element.innerHTML = '<p>Surface deleted</p>' + element.innerHTML;
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
