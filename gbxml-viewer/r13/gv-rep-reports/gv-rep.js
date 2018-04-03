/*global

THR, THREE, GBP, window, document,butSettings, detSettings,divMenuItems,rngOpacity,rngViewExplodeVertical

*/

// Copyright 2018 Ladybug Tools authors. MIT License

	var REP = {};

	REP.initRep = function () {

		if ( window.butMenuLoad ) {

			REP.butMenuReports = butMenuLoad;

			REP.title = 'gv-REP - gbXML Viewer Rep';;
			document.title = REP.title;
			aDocumentTitle.innerHTML = REP.title;
			REP.butMenuReports.innerHTML = REP.title;

		} else {

			divPopUp.style.display = 'none';
			REP.butMenuReports = butMenuReports;

		}

		if ( REP.butMenuReports.style.fontStyle !== 'italic' ) {

			divMenuItems.innerHTML =

				`<details id = "detReports" class = "app-menu" open >

					<summary>Reports</summary>

					<p>
						<b>visibility toggles</b><br>
						<button class="w3-theme-d1 w3-hover-theme w3-hover-border-theme" onclick=GBP.surfaceMeshes.visible=!GBP.surfaceMeshes.visible; >surfaces</button>
							<button class="w3-theme-d1 w3-hover-theme w3-hover-border-theme" onclick=GBP.surfaceEdges.visible=!GBP.surfaceEdges.visible; >edges</button>
							<button class="w3-theme-d1 w3-hover-theme w3-hover-border-theme" onclick=GBP.openingMeshes.visible=!GBP.openingMeshes.visible; title="toggle the windows" >openings</button>
							<button class="w3-theme-d1 w3-hover-theme w3-hover-border-theme" onclick=GBP.setAllVisible(); >all visible</button>
					</p>

					<details open >

						<summary>Select Report</summary>

						<select id=REPselReport onclick=REP.getReport(); onchange=REP.getReport(); size=10 ></select>

						<div id=REPdivReport ></div>

						<div id=REPdivInteract ></div>

					</details>


					<hr>

					<details >

					<summary id=REPsumSurfacesByType >Surfaces by Type</summary>

					<div id=REPdivSurfacesByType ></div>

					</details>

					<details >

						<summary id=REPsumOpeningsByType >Openings by Type</summary>

						<div id=REPdivOpeningsByType ></div>

					</details>


					<details>

						<summary id=REPsumCadIdGroups >CAD IDs by Type</summary>

						<div id=REPdivCadIdGroups ></div>

					</details>

					<hr>

					<details >
						<summary>gbXML Attributes</summary>
						<div id=REPdivGbxmlAttributes ></div>
						<hr>
					</details>

					<details >
						<summary>Campus</summary>
						<div id=REPdivCampus ></div>
						<hr>
					</details>

					<details >
						<summary id=REPsumCampusLocation >Campus Location</summary>
						<div id=REPdivCampusLocation ></div>
						<hr>
					</details>

					<details >
						<summary>Building</summary>
						<div id=REPdivCampusBuilding ></div>
					</details>

					<hr>

				</details>

			` + divMenuItems.innerHTML;

			initMenuRep2();

			REP.butMenuReports.style.cssText = 'background-color: pink !important; font-style: italic; font-weight: bold';

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

			REP.butMenuReports.style.backgroundColor = '';
			REP.butMenuReports.style.fontStyle = '';
			REP.butMenuReports.style.fontWeight = '';

		}

		function initMenuRep2() {

			REP.items = [];
			// use returns here
			REP.getMenu( GBP.gbjson.Campus.Surface, 'Surface' );

			REP.getMenu( GBP.gbjson.Campus.Building.Space, 'Space' );

			REP.getMenu( GBP.gbjson.Campus.Building.BuildingStorey, 'Storey' );

			REP.getMenu( [ GBP.gbjson.Zone ], 'Zone' );

			REP.getOpenings();

			REP.getMenuSurfacesByType();

			REP.getMenuOpeningsByType();

			REP.getMenuCadIdGroups();

			///

			REPdivGbxmlAttributes.innerHTML = REP.traverseGbjson( GBP.gbjson );

			REPdivCampus.innerHTML = REP.traverseGbjson( GBP.gbjson.Campus );

			REPdivCampusLocation.innerHTML = REP.traverseGbjson( GBP.gbjson.Campus.Location );
			const mapLink = REP.getGoogleMap();
			REPsumCampusLocation.innerHTML += mapLink;

			REPdivCampusBuilding.innerHTML = REP.traverseGbjson( GBP.gbjson.Campus.Building );

		}


		THR.controls.autoRotate = false;
		THR.controls.keys = false;

	};




	REP.getMenu = function( parent, title ) {

		obj = Array.isArray( parent ) ? parent[ 0 ] : parent;

		for ( let property in obj ) {

			if ( obj[ property ] !== null && typeof( obj[ property ] ) === 'object' ) {

				//if ( elements.indexOf( property ) < 0 ) { elements.push( property ); }

			} else {

				REP.items.push( { gbjson: parent, attribute: property, title: title } );
				REPselReport.innerHTML += '<option value=' + property + ' >' + title + ' by ' + property + '</option>';

			}

		};

		//console.log( 'items', REP.items );

	}



	REP.getOpenings = function() {

		//REP.surfacesExteriorWall = GBP.surfaceJson.filter( element => element.surfaceType === 'ExteriorWall' );
		//console.log( 'REP.surfacesExteriorWall', REP.surfacesExteriorWall );

		REP.SurfacesWithOpenings = GBP.surfaceJson.filter( surface => surface.Opening );
		//console.log( 'REP.SurfacesWithOpenings', REP.SurfacesWithOpenings );

		REP.openings = [];

		for ( surface of REP.SurfacesWithOpenings ) {

			if ( surface.Opening.length ) {

				REP.openings.push ( ...surface.Opening );

			} else {

				REP.openings.push ( surface.Opening );

			}

		}
		//console.log( 'REP.openings', REP.openings );

		REP.getMenu( REP.openings, 'Openings' )

	}



	REP.getReport = function() {

		//console.log( 'REPselReport', REPselReport );

		item = REP.items[ REPselReport.selectedIndex ];
		//console.log( 'item', item );

		REPdivReport.innerHTML =

		`<b>` + item.title + ': ' + item.attribute + ' &raquo; ' + item.gbjson.length + `</b><br>

			<div class=flex-container2 >
				<div class=flex-div1 >
					<input oninput=REP.getSelect(this); size=8 placeholder="` + item.attribute + `" ><br>
					<select id = "REPselItem" onclick=REP.getAttributes(); onchange=REP.getAttributes(); size=10 ></select>
				</div>
				<div id = "REPdivAttributes" class=flex-left-div2  ></div>
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

		//REP.getAttributes();

		//REPsumSurfacesIndividually.innerHTML = 'Surfaces Individually &raquo; ' + REPselSurface.length;

		REP.getInteractions();

	}



	REP.getSelect = function( input ) {

		const str = input.value.toLowerCase();

		for ( let option of REPselItem.options ) {

			if ( option.value.toLowerCase().includes( str ) ) {

				REPselItem.value = option.value;

				break;

			}

		}

		return REPselItem.innerHTML;

	};



	REP.getAttributes = function() {

		//type = REPselReport.value;
		typeItem = REP.items[ REPselReport.selectedIndex ];
		//console.log( 'typeItem', typeItem );

		itemId = REPselItem.value;
		//console.log( 'itemId', itemId);

		let item = typeItem.gbjson.find( element => element.id === itemId );
		//console.log( 'item', item );

		attributes = REP.traverseGbjson( item );
		REPdivAttributes.innerHTML = ( REPselItem.selectedIndex + 1 ) + '.<br>' + attributes;
		//console.log( 'ell', REP.traverseGbjson( item ).elements );

		switch( typeItem.title ) {

			case 'Surface':
				REP.showSurface(REPselItem.value);
				break;
			case 'Space':
				REP.showSpace(REPselItem.value);
				break;
			case 'Storey':
				REP.showStorey(REPselItem.value);
				break;
			case 'Zone':
				REP.showZone(REPselItem.value);
				break;
			case 'Openings':
				REP.showOpening( REPselItem.value );
				const points = item.PlanarGeometry.PolyLoop.CartesianPoint.map( CartesianPoint => new THREE.Vector3().fromArray( CartesianPoint.Coordinate ) );
				//console.log( 'points', points.length )
				REPdivAttributes.innerHTML += '<br>Vertices: ' + points.length;
				break;
			default:

		}
	}



	REP.getInteractions = function() {

		item = REP.items[ REPselReport.selectedIndex ];
		//console.log( 'item', item );

		if ( item.title === 'Surface' ) {

			REPdivInteract.innerHTML =
			`
				<button onclick=REP.showSurface(REPselItem.value); >select</button>
				<button onclick=REP.zoomIntoSurface(REPselItem.value); >zoom</button>
			`;

		} else if ( item.title === 'Space' ) {

			REPdivInteract.innerHTML =
			`
				<button onclick=REP.showSpace(REPselItem.value); >select</button>
			`;

		} else if ( item.title === 'Storey' ) {

			REPdivInteract.innerHTML =
			`
				<button onclick=REP.showStorey(REPselItem.value); >select</button>
			`;

		}else if ( item.title === 'Zone' ) {

			REPdivInteract.innerHTML =
			`
				<button onclick=REP.showZone(REPselItem.value); >select</button>
			`;

		} else if ( item.title === 'Openings' ) {

			REPdivInteract.innerHTML =
			`
				<button onclick=REP.showOpening(REPselItem.value); >select</button>
			`;

		}

	}



	REP.traverseGbjson = function traverseGbjson( obj ) {

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


	REP.showSurface = function( id ) {

		GBP.surfaceMeshes.children.forEach( element => element.visible = element.userData.data.id === id ? true : false );

	};



	REP.zoomIntoSurface = function( id ) {
		//console.log( 'id', id );

		const surfaceMesh = GBP.surfaceMeshes.children.find( element => element.userData.data.id === id );
		//console.log( '', surfaceMesh );

		const center = surfaceMesh.localToWorld( surfaceMesh.geometry.boundingSphere.center.clone() );
		const radius = surfaceMesh.geometry.boundingSphere.radius > 1 ? surfaceMesh.geometry.boundingSphere.radius : 1;
		//console.log( 'center * radius', center, radius );

		THR.scene.remove( REP.telltale );
		const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
		const material = new THREE.MeshNormalMaterial( { opacity: 0.7, transparent: true } );
		REP.telltale = new THREE.Mesh( geometry, material );
		REP.telltale.position.copy( center );
		THR.scene.add( REP.telltale );

		THR.controls.target.copy( center );
		THR.camera.position.copy( center.clone().add( new THREE.Vector3( 3.0 * radius, - 3.0 * radius, 3.0 * radius ) ) );

	};



	REP.showSpace = function( id ) {
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



	REP.showStorey = function( id ) {

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



	REP.showZone = function ( zoneIdRef ) {

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



	REP.showOpening = function( id ) {

		//console.log( 'opening id', id );

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



	REP.getMenuSurfacesByType = function() {

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
				'<button class=toggleView onclick=REP.setTypeInvisible(this) value=' + types[ i ] + ' ><img src="../assets/eye.png" height=18></button>' +
				' <button class=toggle onclick=REP.showSurfaceType(this.innerText); >' + types[ i ] + '</button>: ' +
				typesCount[ i ] + '-' + Math.round( 100 * typesCount[ i ] / surfaces.length ) +
				'%<br>';

		}

		txt +=

			'<p><button class=toggle onclick=REP.showExposedToSun(); >Exposed to Sun</button> </p>' +
			'<p><button class=toggle onclick=GBP.setAllVisible(); >all visible</button></p>';


		REPsumSurfacesByType.innerHTML = 'Surfaces by Type &raquo; ' + types.length;
		REPdivSurfacesByType.innerHTML = txt;

	}



	REP.setTypeInvisible = function( that ) {

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


	REP.showSurfaceType = function( type ) {

		GBP.surfaceMeshes.children.forEach( element => element.visible = element.userData.data.surfaceType === type? true : false );

	};


	REP.showExposedToSun = function(  ) {

		GBP.surfaceMeshes.children.forEach( element => element.visible = element.userData.data.exposedToSun === "true" ? true : false );

	};


	REP.getMenuCadIdGroups = function() {

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

		REPdivCadIdGroups.innerHTML = '<select id = "REPselCadIdGroups" onclick=REP.showCadIdGroup(this.value); onchange=REP.showCadIdGroup(this.value); size=10 ></select>';

		REPselCadIdGroups.innerHTML = txt;
		REPselCadIdGroups.selectedIndex = 0;

		REPsumCadIdGroups.innerHTML = 'CAD Objects by Type &raquo; ' + cadIds.length;
		//

	}


	REP.showCadIdGroup = ( CADObjectGroupId ) => {
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


	REP.getMenuOpeningsByType = function() {

		const openings = [];
		const types = [];

		for ( let opening of REP.openings ) {

			if ( !opening.openingType ) { continue; }

			type = opening.openingType;

			if ( !types.includes( type ) ) {

				types.push( type);

			}

		}

		types.sort();

		let txt = '';

		for ( let type of types ){

			txt += '<option>' + type + '</option>';

		}

		REPdivOpeningsByType.innerHTML = '<select id = "REPselOpeningsByType" onclick=REP.setOpeningsTypeVisible(this.value); ' +
			' onchange=REP.setOpeningsTypeVisible(this.value); size=' + types.length + ' ></select>';

		REPselOpeningsByType.innerHTML = txt;
		REPselOpeningsByType.selectedIndex = 0;

		REPsumOpeningsByType.innerHTML = 'Openings by Type &raquo; ' + types.length;

		return txt;


	}


	REP.setOpeningsTypeVisible = function( type ) {

		GBP.surfaceEdges.visible = false;
		GBP.surfaceMeshes.visible = false;
		GBP.openingMeshes.children.forEach( element => element.visible = element.userData.data.openingType === type? true : false );

	};


	REP.getGoogleMap = () => {

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


	REP.initRep();
