/*global

THR, THREE, GBX, GBV, window, document,butSettings, detSettings,divMenuItems,rngOpacity,rngViewExplodeVertical

*/

// Copyright 2018 Ladybug Tools authors. MIT License

	var REP2 = {};

	REP2.initRep2 = function () {

		if ( window.butMenuLoad ) {

			REP2.butMenuTemplate = butMenuLoad;

			REP2.title = 'gv-REP2 - gbXML Viewer Rep2';;
			document.title = REP2.title;
			aDocumentTitle.innerHTML = REP2.title;
			REP2.butMenuTemplate.innerHTML = REP2.title;

		} else {

			divPopUp.style.display = 'none';
			REP2.butMenuTemplate = butMenuTemplate;

		}

		if ( REP2.butMenuTemplate.style.fontStyle !== 'italic' ) {

			divMenuItems.innerHTML =

				`<details id = "detReports" class = "app-menu" open >

					<summary>Reports</summary>

					<p>
						<b>visibility toggles</b><br>
						<button class="w3-theme-d1 w3-hover-theme w3-hover-border-theme" onclick=GBP.surfaceMeshes.visible=!GBP.surfaceMeshes.visible; >surfaces</button>
							<button class="w3-theme-d1 w3-hover-theme w3-hover-border-theme" onclick=GBP.surfaceEdges.visible=!GBP.surfaceEdges.visible; >edges</button>
							<button class="w3-theme-d1 w3-hover-theme w3-hover-border-theme" onclick=GBP.openingMeshes.visible=!GBP.openingMeshes.visible; title="toggle the windows" >openings</button>
							<button class="w3-theme-d1 w3-hover-theme w3-hover-border-theme" onclick=GBP.setAllVisible(); >all</button>
					</p>

					<details open >

						<summary>Select Report</summary>

						<select id=REP2selReport onclick=REP2.showReport(); onchange=REP2.showReport(); size=10 ></select>

						<div id=REP2divReport ></div>

						<div id=REP2divInteract ></div>

					</details>


					<hr>


					<details >

						<summary id=REP2sumSurfacesByType >Surfaces by Type</summary>

						<div id=REP2divSurfacesByType ></div>

					</details>

					<details >

						<summary id=REP2sumCadIdGroups >Surfaces by CAD ID Groups</summary>

						<div id=REP2divCadIdGroups ></div>

					</details>

					<hr>

					<details >
						<summary>gbXML Attributes</summary>
						<div id=REP2divGbxmlAttributes ></div>
						<hr>
					</details>

					<details >
						<summary>Campus</summary>
						<div id=REP2divCampus ></div>
						<hr>
					</details>

					<details >
						<summary id=REP2sumCampusLocation >Campus Location</summary>
						<div id=REP2divCampusLocation ></div>
						<hr>
					</details>

					<details >
						<summary>Building</summary>
						<div id=REP2divCampusBuilding ></div>
					</details>

					<hr>

				</details>

			` + divMenuItems.innerHTML;

			initMenuRep2();

			REP2.butMenuTemplate.style.cssText = 'background-color: pink !important; font-style: italic; font-weight: bold';

			const butts = detReports.getElementsByTagName( "button" );
			//console.log( 'butts', butts );

			for ( let butt of butts ) {

				//butt.classList.add( "app-menu" );
				butt.classList.add( "w3-theme-d1" );
				butt.classList.add( "w3-hover-theme" );
				butt.classList.add( "w3-hover-border-theme" );

			}

		} else {

			detReports.remove();

			REP2.butMenuTemplate.style.backgroundColor = '';
			REP2.butMenuTemplate.style.fontStyle = '';
			REP2.butMenuTemplate.style.fontWeight = '';

		}

		function initMenuRep2() {

			REP2.items = [];

			REP2.buildMenu( GBP.gbjson.Campus.Surface, 'Surface' );

			REP2.buildMenu( GBP.gbjson.Campus.Building.Space, 'Space' );

			REP2.buildMenu( GBP.gbjson.Campus.Building.BuildingStorey, 'Storey' );

			REP2.buildMenu( [ GBP.gbjson.Zone ], 'Zone' );

			REP2.getOpenings();

			REP2.updateSurfacesByType();

			REP2.setMenuCadIdGroups();

			///

			REP2divGbxmlAttributes.innerHTML = REP2.traverseGbjson( GBP.gbjson );

			REP2divCampus.innerHTML = REP2.traverseGbjson( GBP.gbjson.Campus );

			REP2divCampusLocation.innerHTML = REP2.traverseGbjson( GBP.gbjson.Campus.Location );
			const mapLink = REP2.getGoogleMap();
			REP2sumCampusLocation.innerHTML += mapLink;

			REP2divCampusBuilding.innerHTML = REP2.traverseGbjson( GBP.gbjson.Campus.Building );

		}


		THR.controls.autoRotate = false;
		THR.controls.keys = false;

	};



	REP2.getOpenings = function() {

		//REP2.surfacesExteriorWall = GBP.surfaceJson.filter( element => element.surfaceType === 'ExteriorWall' );
		//console.log( 'REP2.surfacesExteriorWall', REP2.surfacesExteriorWall );

		REP2.SurfacesWithOpenings = GBP.surfaceJson.filter( surface => surface.Opening );
		//console.log( 'REP2.SurfacesWithOpenings', REP2.SurfacesWithOpenings );

		REP2.openings = [];

		for ( surface of REP2.SurfacesWithOpenings ) {

			if ( surface.Opening.length ) {

				REP2.openings.push ( ...surface.Opening );

			} else {

				REP2.openings.push ( surface.Opening );

			}

		}
		//console.log( 'REP2.openings', REP2.openings );

		REP2.buildMenu( REP2.openings, 'Openings' )

	}



	REP2.buildMenu = function( parent, title ) {

		obj = Array.isArray( parent ) ? parent[ 0 ] : parent;

		for ( let property in obj ) {

			if ( obj[ property ] !== null && typeof( obj[ property ] ) === 'object' ) {

				//if ( elements.indexOf( property ) < 0 ) { elements.push( property ); }

			} else {

				REP2.items.push( { gbjson: parent, attribute: property, title: title } );
				REP2selReport.innerHTML += '<option value=' + property + ' >' + title + ' by ' + property + '</option>';

			}

		};

		//console.log( 'items', REP2.items );

	}



	REP2.showReport = function() {

		//console.log( 'REP2selReport', REP2selReport );

		item = REP2.items[ REP2selReport.selectedIndex ];
		//console.log( 'item', item );

		REP2divReport.innerHTML =

		`<b>` + item.title + ': ' + item.attribute + ' &raquo; ' + item.gbjson.length + `</b><br>

			<div class=flex-container2 >
				<div class=flex-div1 >
					<input oninput=REP2.updateSelect(this); size=8 placeholder="` + item.attribute + `" ><br>
					<select id = "REPselItem" onclick=REP2.getAttributes(); onchange=REP2.getAttributes(); size=10 ></select>
				</div>
				<div id = "REP2divAttributes" class=flex-left-div2  ></div>
				</div>

		`;

		let arr = [];

		item.gbjson.forEach( element => arr.push( [ element[ item.attribute ], element.id ] ) );

		arr.sort( ( a, b ) => {
			if ( a[ 0 ] === b[ 0 ] ) { return 0; } else { return ( a[ 0 ] < b[ 0 ] ) ? -1 : 1; }
		} );
		//console.log( 'arr', arr );

		let txt = '';
		arr.forEach( function( element ) { txt += '<option value=' + element[ 1 ]+ ' >' + element[ 0 ] + '</option>' } );
		REPselItem.innerHTML = txt;
		REPselItem.selectedIndex = 0;

		REP2.getAttributes();

		//REPsumSurfacesIndividually.innerHTML = 'Surfaces Individually &raquo; ' + REPselSurface.length;

		REP2.getInteractions();

	}



	REP2.updateSelect = function( input ) {

		const str = input.value.toLowerCase();

		for ( let option of REPselItem.options ) {

			if ( option.value.toLowerCase().includes( str ) ) {

				REPselItem.value = option.value;

				break;

			}

		}

	};



	REP2.getAttributes = function() {

		//type = REP2selReport.value;
		typeItem = REP2.items[ REP2selReport.selectedIndex ];
		//console.log( 'typeItem', typeItem );

		itemId = REPselItem.value;
		//console.log( 'itemId', itemId);

		let item = typeItem.gbjson.find( element => element.id === itemId );
		//console.log( 'item', item );

		attributes = REP2.traverseGbjson( item );
		REP2divAttributes.innerHTML = ( REPselItem.selectedIndex + 1 ) + '.<br>' + attributes;
		//console.log( 'ell', REP2.traverseGbjson( item ).elements );

		switch( typeItem.title ) {

			case 'Surface':
				REP2.showSurface(REPselItem.value);
				break;
			case 'Space':
				REP2.showSpace(REPselItem.value);
				break;
			case 'Storey':
				REP2.showStorey(REPselItem.value);
				break;
			case 'Zone':
				REP2.showZone(REPselItem.value);
				break;
			case 'Openings':
				REP2.showOpening(REPselItem.value);
				break;
			default:

		}
	}


	REP2.getInteractions = function() {

		item = REP2.items[ REP2selReport.selectedIndex ];
		//console.log( 'item', item );

		if ( item.title === 'Surface' ) {

			REP2divInteract.innerHTML =
			`
				<button onclick=REP2.showSurface(REPselItem.value); >select</button>
				<button onclick=REP2.zoomIntoSurface(REPselItem.value); >zoom</button>
			`;

		} else if ( item.title === 'Space' ) {

			REP2divInteract.innerHTML =
			`
				<button onclick=REP2.showSpace(REPselItem.value); >select</button>
			`;

		} else if ( item.title === 'Storey' ) {

			REP2divInteract.innerHTML =
			`
				<button onclick=REP2.showStorey(REPselItem.value); >select</button>
			`;

		}else if ( item.title === 'Zone' ) {

			REP2divInteract.innerHTML =
			`
				<button onclick=REP2.showZone(REPselItem.value); >select</button>
			`;

		} else if ( item.title === 'Openings' ) {

			REP2divInteract.innerHTML =
			`
				<button onclick=REP2.showOpening(REPselItem.value); >select</button>
			`;

		}

	}


	REP2.traverseGbjson = function traverseGbjson( obj ) {

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

		return attributes;

	}


	REP2.showSurface = function( id ) {

		GBP.surfaceMeshes.children.forEach( element => element.visible = element.userData.data.id === id ? true : false );

	};



	REP2.zoomIntoSurface = function( id ) {
		//console.log( 'id', id );

		const surfaceMesh = GBP.surfaceMeshes.children.find( element => element.userData.data.id === id );
		//console.log( '', surfaceMesh );

		const center = surfaceMesh.localToWorld( surfaceMesh.geometry.boundingSphere.center.clone() );
		const radius = surfaceMesh.geometry.boundingSphere.radius > 1 ? surfaceMesh.geometry.boundingSphere.radius : 1;
		//console.log( 'center * radius', center, radius );

		THR.scene.remove( REP2.telltale );
		const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
		const material = new THREE.MeshNormalMaterial( { opacity: 0.7, transparent: true } );
		REP2.telltale = new THREE.Mesh( geometry, material );
		REP2.telltale.position.copy( center );
		THR.scene.add( REP2.telltale );

		THR.controls.target.copy( center );
		THR.camera.position.copy( center.clone().add( new THREE.Vector3( 3.0 * radius, - 3.0 * radius, 3.0 * radius ) ) );

	};



	REP2.showSpace = function( id ) {
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



	REP2.showStorey = function( id ) {

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



	REP2.showZone = function ( zoneIdRef ) {

		//console.log( 'zoneIdRef', zoneIdRef );

		const spaces = GBP.gbjson.Campus.Building.Space;

		GBP.surfaceMeshes.children.forEach( element => element.visible = false );

		for ( let child of GBP.surfaceMeshes.children ) {

			adjacentSpaceId = child.userData.data.AdjacentSpaceId

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

		console.log( 'zone', zone );

	}



	REP2.showOpening = function( id ) {

		console.log( 'opening id', id );
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

	}



	REP2.updateSurfacesByType = function() {

		surfaces = GBP.gbjson.Campus.Surface;

		let txt = '';
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
				//'<button class=toggleView onclick=REP.setTypeInvisible(this) value=' + types[ i ] + ' >&#x1f441;</button>' +
				'<button class=toggleView onclick=REP2.setTypeInvisible(this) value=' + types[ i ] + ' ><img src="../assets/eye.png" height=18></button>' +
				' <button class=toggle onclick=REP2.showSurfaceType(this.innerText); >' + types[ i ] + '</button>: ' +
				typesCount[ i ] + '-' + Math.round( 100 * typesCount[ i ] / surfaces.length ) +
				'%<br>';

		}

		txt +=

			'<p><button class=toggle onclick=REP2.showExposedToSun(); >Exposed to Sun</button> </p>' +
			'<p><button class=toggle onclick=GBP.setAllVisible(); >all visible</button></p>';


		REP2sumSurfacesByType.innerHTML = 'Surfaces By Type &raquo; ' + types.length;
		REP2divSurfacesByType.innerHTML = txt;

	}



	REP2.setTypeInvisible = function( that ) {

		that.style.backgroundColor = that.style.backgroundColor === 'lightblue' ? '' : 'lightblue';

		for ( let child of GBP.surfaceMeshes.children ) {

			if ( !child.userData.data ) { continue; }

			if ( child.userData.data.surfaceType === that.value && that.style.backgroundColor === 'lightblue' ) {

				child.visible = false;

			} else if ( child.userData.data.surfaceType === that.value ) {

				child.visible = true;

			}

		};

	}



	REP2.showSurfaceType = function( type ) {

		GBP.surfaceMeshes.children.forEach( element => element.visible = element.userData.data.surfaceType === type? true : false );

	};


	REP2.showExposedToSun = function(  ) {

		GBP.surfaceMeshes.children.forEach( element => element.visible = element.userData.data.exposedToSun === "true" ? true : false );

	};


	REP2.setMenuCadIdGroups = function() {

		const cadIds = [];
		const surfaceMembers = [];
		const surfaces = GBP.gbjson.Campus.Surface;
		let count = 0;
		let contents = '';

		for ( let surface of surfaces ) {

			if ( !surface.CADObjectId ) { continue; }

			id = surface.CADObjectId.replace( /\[(.*?)\]/gi, '' );

			if ( !cadIds.includes( id ) ) {

				cadIds.push( id );

			}

		}

		cadIds.sort();

		let txt = '';

		for ( let id of cadIds ){

			txt += '<option>' + id + '</option>';

		}

		REP2divCadIdGroups.innerHTML = '<select id = "REP2selCadIdGroups" onclick=REP2.showCadIdGroup(this.value); onchange=REP2.showCadIdGroup(this.value); size=10 ></select>';

		REP2selCadIdGroups.innerHTML = txt;
		REP2selCadIdGroups.selectedIndex = 0;

		REP2sumCadIdGroups.innerHTML = 'CAD Object Groups &raquo; ' + cadIds.length;
		//

	}



	REP2.showCadIdGroup = ( CADObjectGroupId ) => {
		//console.log( 'CADObjectGroupId', CADObjectGroupId);

		GBP.surfaceEdges.visible = true;

		for ( let child of GBP.surfaceMeshes.children ) {

			child.visible = false;

		}

		for ( let child of GBP.surfaceMeshes.children ) {

			if ( !child.userData.data.CADObjectId ) { continue; }

			id = child.userData.data.CADObjectId.replace( /\[(.*?)\]/gi, '' ) ;
			if ( id.includes( CADObjectGroupId ) ) {

				child.visible = true;

			} else {

				child.visible = false;

			}

		}

	}



	REP2.getGoogleMap = () => {

		const locate = GBP.gbjson.Campus.Location;  // remember that location is a reserved word in your browser
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


	REP2.initRep2();
