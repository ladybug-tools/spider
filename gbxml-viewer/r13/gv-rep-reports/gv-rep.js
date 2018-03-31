// Copyright 2018 Ladybug Tools authors. MIT License


	var REP = {};


	REP.initReport = function() {
;
		if ( window.butMenuLoad ) {

			REP.butReports = butMenuLoad;

			REP.title = 'gv-tmp - gbXML Viewer Reports';;
			document.title = REP.title;
			aDocumentTitle.innerHTML = REP.title;
			REP.butReports.innerHTML = REP.title;

		} else {

			divPopUp.style.display = 'none';
			REP.butReports = butReports;

		}

		//if ( REP.butReports.style.backgroundColor !== 'var( --but-bg-color )' ) {
		if ( REP.butReports.style.fontStyle !== 'italic' ) {

			script = document.head.appendChild( document.createElement( 'script' ) );
			script.src = '../gv-gbi-gbxml-interact/gv-gbi.js';

			divMenuItems.innerHTML =

				`<details id = "detReports" class = "app-menu"  open >

					<summary>Reports</summary>

					<div id = "divReports" ><div>

					<hr>

				</details>

			` + divMenuItems.innerHTML;

			initMenuReports();

			//REP.butReports.style.backgroundColor = 'var( --but-bg-color )';
			REP.butReports.style.cssText = 'background-color: pink !important; font-style: italic; font-weight: bold';

		} else {

			detReports.remove();

			REP.butReports.style.backgroundColor = '';
			REP.butReports.style.fontStyle = '';
			REP.butReports.style.fontWeight = '';

		}

		THR.controls.autoRotate = false;
		THR.controls.keys = false;

	};



	function initMenuReports() {

		//surfaceCoordinateDuplicates = [];

		divReports.innerHTML =
		`
			<div>
				<div>toggle the visible elements</div>
				<button onclick=GBP.surfaceMeshes.visible=!GBP.surfaceMeshes.visible; >surfaces</button>
				<button onclick=GBP.surfaceEdges.visible=!GBP.surfaceEdges.visible; >edges</button>
				<button onclick=GBP.setAllVisible(); >all visible</button>
			</div>
			<hr>

			<details open >
				<summary id = "REPsumSurfacesIndividually" >Surfaces Individually</summary>
				 <button onclick=GBI.showSurface(REPselSurface.value); >select</button>
				 <button onclick=GBI.zoomIntoSurface(REPselSurface.value); >zoom</button>
				 <button onclick=GBI.deleteSurface(REPselSurface.value); >delete</button>

				<div class=flex-container2 >
					<div class="flex-div1" >
						<input oninput=REP.updateSelect(this,REPselSurface); size=6 placeholder="surface id"><br>
						<select id = "REPselSurface" onclick=GBI.showSurface(this.value);REP.updateSurfaceAttributes(); onchange=GBI.showSurface(this.value);REP.updateSurfaceAttributes(); size=10 ></select><br>
					</div>
					<div id=REPdivSurfacesIndividually class="flex-left-div2" ></div>
				</div>
				<hr>
			</details>

			<details>
				<summary id = "REPsumSurfacesByType" >Surfaces by Type</summary>
				<div id = "REPdivSurfacesByType" ></div>
				<hr>
			</details>

			<details>
				<summary id = "REPsumSpaces" >Spaces by ID</summary>
				<div class=flex-container2 >
					<div class=flex-div1 >
						<input oninput=REP.updateSelect(this,REPselSpace); size=6 placeholder="space id" ><br>
						<select id = "REPselSpace" onclick=GBI.showSpace(this.value);REP.updateSpaceAttributes(); onchange=GBI.showSpace(this.value);REP.updateSpaceAttributes(); size=10 ></select>
					</div>
					<div id = "REPdivSpaces" class=flex-left-div2  ></div>
				</div>
				<hr>
			</details>

			<details>
				<summary id = "REPsumSpacesName" >Spaces by Name</summary>
				<div class=flex-container2 >
					<div class=flex-div1 >
						<input oninput=REP.updateSelectText(this,REPselSpaceName); size=6 placeholder="space name" ><br>
						<select id = "REPselSpaceName" onclick=GBI.showSpace(this.value);REP.updateSpaceAttributes(REPdivSpacesName,REPselSpaceName);
							onchange=GBI.showSpace(this.value);REP.updateSpaceAttributes(REPdivSpacesName,REPselSpaceName); size=10 ></select>
					</div>
					<div id = "REPdivSpacesName" class=flex-left-div2  ></div>
				</div>
				<hr>
			</details>

			<details>
				<summary id = "REPsumStoreys" >Storeys</summary>
				<div class=flex-container2 >
					<div class=flex-div1 >
						<input oninput=REP.updateSelect(this,REPselStorey); size=6 placeholder="storey id" ><br>
						<select id = "REPselStorey" onclick=GBI.showStorey(this.value);REP.updateStoreyAttributes(); onchange=GBI.showStorey(this.value);REP.updateStoreyAttributes(); size=10 ></select>
					</div>
					<div id = "REPdivStoreys" class=flex-left-div2  ></div>
				</div>
				<hr>
			</details>

			<details>


				<summary id = "REPsumZones" >Zones</summary>

				<div class=flex-container2 >
					<div class=flex-div1 >
						<input oninput=REP.updateSelect(this,REPselZone); size=6 placeholder="zone id" ><br>
						<select id = "REPselZone" onclick=GBI.showZone(this.value);REP.updateZoneAttributes();
							onchange=GBI.showZone(this.value);REP.updateZoneAttributes(); size=10 ></select>
					</div>
					<div id = "REPdivZones" class=flex-left-div2  ></div>
				</div>
				<hr>
			</details>

			<details >
				<summary id = "REPsumCadIdGroups" >CAD Object Groups</summary>
				<div id = "REPdivCadIdGroups" ></div>

				<select id = "REPselCadIdGroups" onclick=REP.showCadIdGroup(this.value); onchange=REP.showCadIdGroup(this.value); size=10 ></select>

				<hr>
			</details>

			<details>
				<summary id = "REPsumCadIds" >CAD Object IDs</summary>
				<input oninput=REP.updateSelect(this,REPselCadId); style=width:100% placeholder="cad object id" ><br>
				<select id = "REPselCadId" onclick=GBI.showCadId(this.value); onchange=GBI.showCadId(this.value); size=10 ></select>

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

		REP.updateSurfacesIndividually();

		REP.updateSurfacesByType();

		REP.updateSpaceById();

		REP.updateSpaceByName();

		REP.updateStoreys();

		REP.updateZones();

		//REPdivZones.innerHTML += REP.traverseGbjson( GBP.gbjson.Zone ).attributes;

		REP.UpdateCadIdGroups();

		REP.updateCadIds();

		///

		divGbxmlAttributes.innerHTML = REP.traverseGbjson( GBP.gbjson ).attributes;

		divCampus.innerHTML = REP.traverseGbjson( GBP.gbjson.Campus ).attributes;

		divCampusLocation.innerHTML = REP.traverseGbjson( GBP.gbjson.Campus.Location ).attributes;
		const mapLink = REP.getGoogleMap();
		sumCampusLocation.innerHTML += mapLink;

		divCampusBuilding.innerHTML = REP.traverseGbjson( GBP.gbjson.Campus.Building ).attributes;

	}



	REP.traverseGbjson = function traverseGbjson( obj ) {

		const elements = [];
		let attributes = '';

		for ( let property in obj ) {

			if ( obj[ property ] !== null && typeof( obj[ property ] ) === 'object' ) {

				if ( elements.indexOf( property ) < 0 ) { elements.push( property ); }

			} else {

				attributes += '<div>' + property + ': <i>' + obj[ property ] + '</i></div>';

			}

		};

		return { elements: elements, attributes: attributes };

	}


	// to GBI?
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



	REP.updateSurfacesIndividually = function() {

		let txt = '';
		GBP.surfaceJson.forEach( function( element ) { txt += '<option>' + element.id + '</option>'; } );

		REPselSurface.innerHTML = txt;

		REPselSurface.selectedIndex = 0; //Math.floor( Math.random() * property.length );
		REPsumSurfacesIndividually.innerHTML = 'Surfaces Individually &raquo; ' + REPselSurface.length;
		REP.updateSurfaceAttributes();

		/*
		txt = '';
		GBP.surfaceTypes.forEach( function( element ) { txt += '<option>' + element + '</option>'; } );

		REPselType.innerHTML = txt;
		REPselType.selectedIndex = 0;
		*/
	}



	REP.updateSurfaceAttributes = function() {

		REPdivSurfacesIndividually.innerHTML = REP.traverseGbjson( GBP.gbjson.Campus.Surface[ REPselSurface.selectedIndex ] ).attributes;

	}



	REP.updateSurfacesByType = function() {

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
				' <button class=toggle onclick=GBI.showSurfaceType(this.innerText); >' + types[ i ] + '</button>: ' +
				typesCount[ i ] + '-' + Math.round( 100 * typesCount[ i ] / surfaces.length ) +
				'%<br>';

		}

		txt +=

			'<p><button class=toggle onclick=GBI.setAllVisible(); >all visible</button></p>';


		REPsumSurfacesByType.innerHTML = 'Surfaces By Type &raquo; ' + types.length;
		REPdivSurfacesByType.innerHTML = txt;

	}



	REP.updateSpaceById = function() {

		let spaces = '';
		let spaceXml = GBP.gbjson.Campus.Building.Space;

		if ( !spaceXml ) { return; }

		if ( spaceXml.length ) {

			spaceXml.forEach( function( element ) { spaces += '<option>' + element.id + '</option>'; } );

		} else {

			spaces = '<option>' + spaceXml.id + '</option>';

		}

		REPselSpace.innerHTML = spaces;
		REPselSpace.selectedIndex = 0;

		REPsumSpaces.innerHTML = 'Spaces by ID &raquo; ' + REPselSpace.length;

		REP.updateSpaceAttributes( REPdivSpaces, REPselSpace );

	}



	REP.updateSpaceByName = function() {

		let spaces = '';
		let spaceXml = GBP.gbjson.Campus.Building.Space;

		if ( !spaceXml ) { return; }

		if ( spaceXml.length ) {

			spaceXml.forEach( function( element ) { spaces += '<option value=' + element.id + ' >' + element.Name + '</option>'; } );

		} else {

			spaces = '<option>' + spaceXml.Name + '</option>';

		}

		REPselSpaceName.innerHTML = spaces;
		REPselSpaceName.selectedIndex = 0;

		REPsumSpacesName.innerHTML = 'Spaces by Name &raquo; ' + REPselSpaceName.length;

		REP.updateSpaceAttributes( REPdivSpacesName, REPselSpaceName );

	}



	REP.updateSpaceAttributes = function( divSpaces, selSpace ) {

		divSpaces.innerHTML = REP.traverseGbjson( GBP.gbjson.Campus.Building.Space[ selSpace.selectedIndex ] ).attributes;

	}


	REP.updateStoreys = function() {

		let storeys = '';
		let storeyXml = GBP.gbjson.Campus.Building.BuildingStorey;
		//console.log( 'storeyXml', storeyXml );

		if ( !storeyXml ) { return; }

		if ( storeyXml.length ) {

			storeyXml.forEach( function( element ) { storeys += '<option>' + element.id + '</option>'; } );

		} else {

			storeys = '<option>' + storeyXml.id + '</option>';

		}

		REPselStorey.innerHTML = storeys;
		REPselStorey.selectedIndex = 0;

		REPsumStoreys.innerHTML = 'Storeys  &raquo; ' + REPselStorey.length;

		//GBI.showSpace( REPselStorey.value );
		//REPdivStoreys.innerHTML = REP.traverseGbjson( GBP.gbjson.Campus.Building.BuildingStorey[ REPselStorey.selectedIndex ] ).attributes;
		REP.updateStoreyAttributes();

	}



	REP.updateStoreyAttributes = function() {

		REPdivStoreys.innerHTML = REP.traverseGbjson( GBP.gbjson.Campus.Building.BuildingStorey[ REPselStorey.selectedIndex ] ).attributes;

	}


	REP.updateZones = function() {

		let zones = '';
		let zoneXml = GBP.gbjson.Zone;
		//console.log( 'zoneXml', zoneXml );

		if ( !zoneXml ) {

			REPselZone.innerHTML = '<option>none</option>';
			return;

		}

		if ( zoneXml.length ) {

			zoneXml.forEach( function( element ) { zones += '<option>' + element.id + '</option>'; } );

		} else {

			zones = '<option>' + zoneXml.id + '</option>';

		}

		REPselZone.innerHTML = zones;
		REPselZone.selectedIndex = 0;

		REPsumZones.innerHTML = 'Zones  &raquo; ' + REPselZone.length;

		//GBI.showSpace( REPselStorey.value );
		//REPdivzones.innerHTML = REP.traverseGbjson( GBP.gbjson.Campus.Building.BuildingStorey[ REPselStorey.selectedIndex ] ).attributes;
		REP.updateZoneAttributes();

	}



	REP.updateZoneAttributes = function() {

		console.log( '',  );

		//		if ( Array.isArray( GBP.gbjson.Zone ) ) {

		//		REPdivZones.innerHTML = REP.traverseGbjson( GBP.gbjson.Zone[ REPselZone.selectedIndex ] ).attributes;

		let zone;

		if ( Array.isArray( GBP.gbjson.Zone ) ) {

			zone = GBP.gbjson.Zone[ REPselZone.selectedIndex ]

		} else {

			zone = GBP.gbjson.Zone;

		}

		REPdivZones.innerHTML = REP.traverseGbjson( zone ).attributes;

	}


	REP.UpdateCadIdGroups = function() {

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

		REPselCadIdGroups.innerHTML = txt;
		REPselCadIdGroups.selectedIndex = 0;

		REPsumCadIdGroups.innerHTML = 'CAD Object Groups &raquo; ' + cadIds.length;
		//REPdivCadIdGroups.innerHTML = contents;

	}



	REP.updateCadIds = function() {

		const cadIds = [];
		const surfaces = GBP.gbjson.Campus.Surface;
		let txt = '';

		for ( let surface of surfaces ) {

			if ( !surface.CADObjectId ) { continue; }

			id = surface.CADObjectId;

			if ( !cadIds.includes( id ) ) {

				cadIds.push( id );

			}

		}

		cadIds.sort();
		//console.log( 'cadIds', cadIds );

		for ( let id of cadIds ){

			txt += '<option>' + id+ '</option>';

		}

		REPselCadId.innerHTML = txt;
		REPselCadId.selectedIndex = 0;

		REPsumCadIds.innerHTML = 'CAD Object IDs &raquo; ' + REPselCadId.length;

	}



	// copied from  HUD/ move to GBI?
	REP.updateSelect = function( input, select ) {

		const str = input.value.toLowerCase();

		for ( let option of select.options ) {

			if ( option.value.toLowerCase().includes( str ) ) {

				select.value = option.value;
				//select.click();

				break;

			}

		}

	};


	REP.updateSelectText = function( input, select ) {

		const str = input.value.toLowerCase();

		for ( let option of select.options ) {

			if ( option.innerHTML.toLowerCase().includes( str ) ) {

				select.value = option.value;
				//select.click();

				break;

			}

		}

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



	REP.initReport();
