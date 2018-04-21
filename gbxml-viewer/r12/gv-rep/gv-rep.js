// Copyright 2018 Ladybug Tools authors. MIT License


	var REP = {};


	REP.initReport = function() {

		if ( window.butMenuLoad ) {

			REP.butReports = butMenuLoad;

			REP.title = 'gv-tmp - gbXML Viewer Reports';;
			document.title = REP.title;
			aDocumentTitle.innerHTML = REP.title;
			REP.butReports.innerHTML = REP.title;

		} else {

			REP.butReports = butReports;

		}

		//if ( REP.butReports.style.backgroundColor !== 'var( --but-bg-color )' ) {
		if ( REP.butReports.style.fontStyle !== 'italic' ) {

			divMenuItems.innerHTML =

				`<details id = detReports open class=app-menu open >

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

		divContainer.style.display = 'none';
		THR.controls.autoRotate = false;
		THR.controls.keys = false;

	};



	function initMenuReports() {

		//surfaceCoordinateDuplicates = [];

		divReports.innerHTML =
		`
			<div>
				<div>toggle the visible elements</div>
				<button onclick=GBX.surfaceMeshes.visible=!GBX.surfaceMeshes.visible; >surfaces</button>
				<button onclick=GBX.surfaceEdges.visible=!GBX.surfaceEdges.visible; >edges</button>
				<button onclick=GBX.setAllVisible(); >all visible</button>
			</div>
			<hr>

			<details open >
				<summary id = "REPsumSurfacesIndividually" >Surfaces Individually</summary>
				 <button onclick=GBV.showSurface(REPselSurface.value); >select</button>
				 <button onclick=GBV.zoomIntoSurface(REPselSurface.value); >zoom</button>
				 <button onclick=GBV.deleteSurface(REPselSurface.value); >delete</button>

				<div class=flex-container2 >
					<div class="flex-div1" >
						<input oninput=REP.updateSelect(this,REPselSurface); size=6 placeholder="surface id"><br>
						<select id = "REPselSurface" onclick=GBV.showSurface(this.value);REP.updateSurfaceAttributes(); onchange=GBV.showSurface(this.value);REP.updateSurfaceAttributes(); size=10 ></select><br>
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
				<summary id = "REPsumSpaces" >Spaces</summary>
				<div class=flex-container2 >
					<div class=flex-div1 >
						<input oninput=REP.updateSelect(this,REPselSpace); size=6 placeholder="space id" ><br>
						<select id = "REPselSpace" onclick=GBV.showSpace(this.value);REP.updateSpaceAttributes(); onchange=GBV.showSpace(this.value);REP.updateSpaceAttributes(); size=10 ></select>
					</div>
					<div id = "REPdivSpaces" class=flex-left-div2  ></div>
				</div>
				<hr>
			</details>

			<details>
				<summary id = "REPsumStoreys" >Storeys</summary>
				<div class=flex-container2 >
					<div class=flex-div1 >
						<input oninput=REP.updateSelect(this,REPselStorey); size=6 placeholder="storey id" ><br>
						<select id = "REPselStorey" onclick=GBV.showStorey(this.value);REP.updateStoreyAttributes(); onchange=GBV.showStorey(this.value);REP.updateStoreyAttributes(); size=10 ></select>
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
						<select id = "REPselZone" onclick=GBV.showZone(this.value);REP.updateZoneAttributes();
							onchange=GBV.showZone(this.value);REP.updateZoneAttributes(); size=10 ></select>
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
				<select id = "REPselCadId" onclick=GBV.showCadId(this.value); onchange=GBV.showCadId(this.value); size=10 ></select>

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

	};



	function getMenuItems() {

		REP.updateSurfacesIndividually();

		REP.updateSurfacesByType();

		REP.updateSpace();

		REP.updateStoreys();

		REP.updateZones();

		//REPdivZones.innerHTML += REP.traverseGbjson( GBX.gbjson.Zone ).attributes;

		REP.updateCadIdGroups();

		REP.updateCadIds();

		///

		divGbxmlAttributes.innerHTML = REP.traverseGbjson( GBX.gbjson ).attributes;

		divCampus.innerHTML = REP.traverseGbjson( GBX.gbjson.Campus ).attributes;

		divCampusLocation.innerHTML = REP.traverseGbjson( GBX.gbjson.Campus.Location ).attributes;
		const mapLink = REP.getGoogleMap();
		sumCampusLocation.innerHTML += mapLink;

		divCampusBuilding.innerHTML = REP.traverseGbjson( GBX.gbjson.Campus.Building ).attributes;

	};



	REP.traverseGbjson = function( obj ) {

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

	};



	// to GBV?
	REP.setTypeInvisible = function( that ) {

		that.style.backgroundColor = that.style.backgroundColor === 'lightblue' ? '' : 'lightblue';

		for ( let child of GBX.surfaceMeshes.children ) {

			if ( !child.userData.data ) { continue; }

			if ( child.userData.data.surfaceType === that.value && that.style.backgroundColor === 'lightblue' ) {

				child.visible = false;

			} else if ( child.userData.data.surfaceType === that.value ) {

				child.visible = true;

			}

		};

	};



	REP.showCadIdGroup = function( CADObjectGroupId ) {
		//console.log( 'CADObjectGroupId', CADObjectGroupId);

		const cadId = CADObjectGroupId.trim();
		GBX.surfaceEdges.visible = true;

		for ( let child of GBX.surfaceMeshes.children ) {

			child.visible = false;

		}

		for ( let child of GBX.surfaceMeshes.children ) {

			if ( !child.userData.data.CADObjectId || typeof child.userData.data.CADObjectId !== 'string' ) { continue; }

			id = child.userData.data.CADObjectId.replace( /\[(.*?)\]/gi, '' ).trim() ;

			if ( id === cadId ) {

				child.visible = true;

			} else {

				child.visible = false;

			}

		}

	};



	REP.updateSurfacesIndividually = function() {

		let txt = '';
		GBX.surfaceJson.forEach( function( element ) { txt += '<option>' + element.id + '</option>'; } );

		REPselSurface.innerHTML = txt;
		REPselSurface.selectedIndex = 0; //Math.floor( Math.random() * property.length );
		REPsumSurfacesIndividually.innerHTML = 'Surfaces Individually &raquo; ' + REPselSurface.length;
		REP.updateSurfaceAttributes();

		/*
		txt = '';
		GBX.surfaceTypes.forEach( function( element ) { txt += '<option>' + element + '</option>'; } );

		REPselType.innerHTML = txt;
		REPselType.selectedIndex = 0;
		*/
	};



	REP.updateSurfaceAttributes = function() {

		REPdivSurfacesIndividually.innerHTML = REP.traverseGbjson( GBX.gbjson.Campus.Surface[ REPselSurface.selectedIndex ] ).attributes;

	};



	REP.updateSurfacesByType = function() {

		surfaces = GBX.gbjson.Campus.Surface;

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
				' <button class=toggle onclick=GBV.showSurfaceType(this.innerText); >' + types[ i ] + '</button>: ' +
				typesCount[ i ] + '-' + Math.round( 100 * typesCount[ i ] / surfaces.length ) +
				'%<br>';

		}

		txt +=

			'<p><button class=toggle onclick=GBV.setAllVisible(); >all visible</button></p>';


		REPsumSurfacesByType.innerHTML = 'Surfaces By Type &raquo; ' + types.length;
		REPdivSurfacesByType.innerHTML = txt;

	};



	REP.updateSpace = function() {

		let spaces = '';
		let spaceXml = GBX.gbjson.Campus.Building.Space;

		if ( !spaceXml ) { return; }

		if ( spaceXml.length ) {

			spaceXml.forEach( function( element ) { spaces += '<option>' + element.id + '</option>'; } );

		} else {

			spaces = '<option>' + spaceXml.id + '</option>';

		}

		REPselSpace.innerHTML = spaces;
		REPselSpace.selectedIndex = 0;

		REPsumSpaces.innerHTML = 'Spaces  &raquo; ' + REPselSpace.length;

		//GBV.showSpace( REPselSpace.value )
		// REPdivSpaces.innerHTML = REP.traverseGbjson( GBX.gbjson.Campus.Building.Space[ REPselSpace.selectedIndex ] ).attributes;
		REP.updateSpaceAttributes();
	};



	REP.updateSpaceAttributes = function() {

		REPdivSpaces.innerHTML = REP.traverseGbjson( GBX.gbjson.Campus.Building.Space[ REPselSpace.selectedIndex ] ).attributes;

	}


	REP.updateStoreys = function() {

		let storeys = '';
		let storeyXml = GBX.gbjson.Campus.Building.BuildingStorey;
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

		//GBV.showSpace( REPselStorey.value );
		//REPdivStoreys.innerHTML = REP.traverseGbjson( GBX.gbjson.Campus.Building.BuildingStorey[ REPselStorey.selectedIndex ] ).attributes;
		REP.updateStoreyAttributes();

	};



	REP.updateStoreyAttributes = function() {

		REPdivStoreys.innerHTML = REP.traverseGbjson( GBX.gbjson.Campus.Building.BuildingStorey[ REPselStorey.selectedIndex ] ).attributes;

	};



	REP.updateZones = function() {

		let zones = '';
		let zoneXml = GBX.gbjson.Zone;
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

		//GBV.showSpace( REPselStorey.value );
		//REPdivzones.innerHTML = REP.traverseGbjson( GBX.gbjson.Campus.Building.BuildingStorey[ REPselStorey.selectedIndex ] ).attributes;
		REP.updateZoneAttributes();

	};



	REP.updateZoneAttributes = function() {

		//console.log( '',  );

		//		if ( Array.isArray( GBX.gbjson.Zone ) ) {

		//		REPdivZones.innerHTML = REP.traverseGbjson( GBX.gbjson.Zone[ REPselZone.selectedIndex ] ).attributes;

		let zone;

		if ( Array.isArray( GBX.gbjson.Zone ) ) {

			zone = GBX.gbjson.Zone[ REPselZone.selectedIndex ]

		} else {

			zone = GBX.gbjson.Zone;

		}

		REPdivZones.innerHTML = REP.traverseGbjson( zone ).attributes;

	};


	REP.updateCadIdGroups = function() {

		const cadIds = [];
		const surfaceMembers = [];
		const surfaces = GBX.gbjson.Campus.Surface;
		let count = 0;
		let contents = '';

		for ( surface of surfaces ) {

			if ( !surface.CADObjectId || typeof surface.CADObjectId !== 'string' ) {

				divLog.innerHTML += 'CADObjectId error: ' + surface.id + '<br>';

				console.log( 'surface', surface );
				console.log( 'surface.CADObjectId', surface.CADObjectId, typeof surface.CADObjectId );
				continue;

			}

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

	};



	REP.updateCadIds = function() {

		const cadIds = [];
		const surfaces = GBX.gbjson.Campus.Surface;
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

	};



	// copied from  HUD/ move to GBV?
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



	REP.getGoogleMap = function() {

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

	};



	REP.initReport();
