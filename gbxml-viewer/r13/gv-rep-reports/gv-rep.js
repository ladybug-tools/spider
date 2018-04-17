/*
global THR, THREE, GBP, GBI, window, document,butSettings, detSettings,divMenuItems
*/
/* jshint esversion: 6 */

// Copyright 2018 Ladybug Tools authors. MIT License

	var REP = {};

	REP.initRep = function () { // call ed bottom of file

		if ( window.butMenuLoad ) {

			REP.butMenuReports = butMenuLoad;

			REP.title = 'gv-REP - gbXML Viewer Rep';
			document.title = REP.title;
			aDocumentTitle.innerHTML = REP.title;
			REP.butMenuReports.innerHTML = REP.title;

		} else {

			divPopUp.style.display = 'none';
			REP.butMenuReports = butMenuReports;

		}

		if ( REP.butMenuReports.style.fontStyle !== 'italic' ) {

			divMenuItems.innerHTML = REP.getMenuItems();

			REP.setMenuItems();

			REP.butMenuReports.style.cssText = 'background-color: pink !important; font-style: italic; font-weight: bold';

			const butts = divMenuItems.getElementsByTagName( "button" );
			//console.log( 'butts', butts );

			for ( let butt of butts ) {

				butt.classList.add( "w3-theme-d1", "w3-hover-theme", "w3-hover-border-theme" );

			}

		} else {

			//divMenuItems.remove();
			divMenuItems.innerHTML = '';

			REP.butMenuReports.style.backgroundColor = '';
			REP.butMenuReports.style.fontStyle = '';
			REP.butMenuReports.style.fontWeight = '';

		}


		THR.controls.autoRotate = false;
		THR.controls.keys = false;

	};



	REP.getMenuItems = function(){

		let txt =
		`<details id = "detReports" class = "app-menu" open >

			<summary>Reports</summary>

			<div id=REPdivMenuPanelPrelims ></div>

			<div id=REPdivMenuPanelSelectReport ></div>

			<div id=REPdivMenuPanelSurfacesByType ></div>

			<div id=REPdivMenuPanelOpeningsByType ></div>

			<div id=REPdivMenuPanelCadObjectsByType ></div>

			<hr>

			<!-- could move to GBI -->

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

			<p>
				<small><i>Want reports on more gbXML elements? <br><a href="https://github.com/ladybug-tools/spider/issues" >Just shout</a> and they will appear.</i></small>
			</p>

			<hr>

		</details>`;

		return txt;

	};



	REP.setMenuItems = function() {

		REP.reportTypes = [];  // better name

		//REPdivMenuPanelPrelims.innerHTML = REP.getPanelVisibilityToggle();

		REPdivMenuPanelPrelims.innerHTML = GBI.getPanelShowHide();

		REPdivMenuPanelSelectReport.innerHTML = REP.getPanelSelectReport();
		//console.log( 'REPselReport', REPselReport );

		let txt = REP.getPanelSelectOptions( GBP.gbjson.Campus.Surface, 'Surface' );

		txt += REP.getPanelSelectOptions( GBP.gbjson.Campus.Building.Space, 'Space' );
		//REP.getMenu( GBP.gbjson.Campus.Building.Space, 'Space' );

		txt += REP.getPanelSelectOptions( GBP.gbjson.Campus.Building.BuildingStorey, 'Storey' );
		//REP.getMenu( GBP.gbjson.Campus.Building.BuildingStorey, 'Storey' );

		txt += REP.getPanelSelectOptions( GBP.gbjson.Zone, 'Zone' );
		//REP.getMenu( [ GBP.gbjson.Zone ], 'Zone' );

		txt += REP.getPanelSelectOptionsOpenings();

		REPselReport.innerHTML = txt;

		///

		REP.setMenuPanelSurfacesByType( REPdivMenuPanelSurfacesByType );

		REP.setMenuPanelOpeningsByType( REPdivMenuPanelOpeningsByType );

		REP.setMenuPanelCadObjectsByType( REPdivMenuPanelCadObjectsByType );

		///

		GBI.setGbjsonAttributes( GBP.gbjson, REPdivGbxmlAttributes );

		GBI.setGbjsonAttributes( GBP.gbjson.Campus, REPdivCampus );

		GBI.setGbjsonAttributes( GBP.gbjson.Campus.Location, REPdivCampusLocation);

		const mapLink = REP.getGoogleMap();
		REPsumCampusLocation.innerHTML += mapLink;

		GBI.setGbjsonAttributes( GBP.gbjson.Campus.Building, REPdivCampusBuilding );

	};



	// init Select Report details panel

	REP.getPanelSelectReport = function() {

		const reports =

		`<details open >

				<summary>Select Report</summary>

				<div>
					<select id=REPselReport onclick=REP.setPanelReportResults(); onchange=REP.setPanelReportResults(); size=10 ></select>
				</div>

				<div id=REPdivReport ></div>

				<div id=REPdivInteract ></div>

		</details>

		<hr>`;

		return reports;

	};



	REP.getPanelSelectOptions = function( parent, element ) {

		const obj = Array.isArray( parent ) ? parent[ 0 ] : parent; // [parent[ 0 ] : parent;
		// what about others in array?

		let options = '';

		for ( let property in obj ) {

			if ( obj[ property ] !== null && typeof( obj[ property ] ) === 'object' ) {

				//if ( elements.indexOf( property ) < 0 ) { elements.push( property ); }
			} else {

				const item = {};

				item.attribute = property;
				item.divAttributes = 'REPdivElementAttributes';

				item.parent = parent;
				item.element = element;
				item.placeholder = property;
				item.selItem = 'REPselReportType';

				REP.reportTypes.push( item );

				options += '<option value=' + property + ' >' + element + ' by ' + property + '</option>';

			}

		}

		return options;

	};



	REP.getPanelSelectOptionsOpenings = function() {

		REP.SurfacesWithOpenings = GBP.surfaceJson.filter( surface => surface.Opening );
		//console.log( 'REP.SurfacesWithOpenings', REP.SurfacesWithOpenings );

		REP.openings = [];

		for ( let surface of REP.SurfacesWithOpenings ) {

			if ( surface.Opening.length ) {

				REP.openings.push ( ...surface.Opening );

			} else {

				REP.openings.push ( surface.Opening );

			}

		}
		//console.log( 'REP.openings', REP.openings );

		return REP.getPanelSelectOptions( REP.openings, 'Openings' );

	};



	REP.setPanelReportResults = function() {

		let item = REP.reportTypes[ REPselReport.selectedIndex ];
		//console.log( 'item', item );

		REPdivReport.innerHTML =

		`<div>

			<p><b>` + item.element + ' by ' + item.attribute + ' &raquo; ' + item.parent.length + ` items</b><br></p>

			<div id=REPdivElements ></div>

		</div>`;

		let arr = Array.isArray( item.parent ) ? item.parent : [ item.parent ];

		item.optionValues = arr.map( element => [ element[ item.attribute ], element.id ] );

		item.optionValues.sort( ( a, b ) => {
			if ( a[ 0 ] === b[ 0 ] ) { return 0; } else { return ( a[ 0 ] < b[ 0 ] ) ? -1 : 1; }
		} );
		//console.log( 'item.optionValues', item.optionValues );

		item.divTarget = document.getElementById( 'REPdivElements' );
		//console.log( 'item', item );

		GBI.setElementPanel2( item );

		REP.setPanelInteractions();

	};


	/////

	REP.setMenuPanelSurfacesByType = function( target ) {

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
				`<button class=toggleView onclick=GBI.setSurfaceTypeInvisible(this) value=` +
					types[ i ] +
					`><img src="../assets/eye.png" height=18></button>
					<button class=toggle onclick=GBI.setSurfaceTypeVisible(this.innerText); >` +
					types[ i ] +
					`</button>: ` +
					typesCount[ i ] + '-' + Math.round( 100 * typesCount[ i ] / surfaces.length ) +
				`'%<br>`;

		}

		const details =

		`<details >

			<summary >Surfaces by Type &raquo; ` + types.length + `</summary>

			<div>` + txt +
				`<p><button class=toggle onclick=GBI.setExposedToSunVisible(); >Exposed to Sun</button> </p>
				<p><button class=toggle onclick=GBP.setAllVisible(); >all visible</button></p>
			</div>

		</details>`;

		target.innerHTML = details;

	};



	REP.setMenuPanelOpeningsByType = function( target ) {

		const types = [];

		for ( let opening of REP.openings ) {

			if ( !opening.openingType ) { continue; }

			const type = opening.openingType;

			if ( !types.includes( type ) ) {

				types.push( type);

			}

		}

		types.sort();

		let txt = '';

		for ( let type of types ){

			txt += '<option>' + type + '</option>';

		}

		const details =

		`<details >

			<summary>Openings by Type &raquo; ` + types.length + `</summary>

			<p>
				<select id = "REPselOpeningsByType" onclick=GBI.setOpeningTypeVisible(this.value);
					onchange=GBI.setOpeningTypeVisible(this.value); size=` + types.length + ` >` +
					txt +
				`</select>
			</p>

		</details>`;

		target.innerHTML = details;

	};



	REP.setMenuPanelCadObjectsByType = function( target ) {

		const surfaces = GBP.gbjson.Campus.Surface;
		const cadIds = [];

		for ( let surface of surfaces ) {

			if ( !surface.CADObjectId ) { continue; }

			const id = surface.CADObjectId.replace( /\[(.*?)\]/gi, '' );

			if ( !cadIds.includes( id ) ) {

				cadIds.push( id );

			}

		}

		cadIds.sort();

		let txt = '';

		for ( let id of cadIds ){

			txt += '<option>' + id + '</option>';

		}

		const details =

		`<details>

			<summary >CAD Objects by Type &raquo; ` + cadIds.length + `</summary>

			<p>
				<select id = "REPselCadIdGroups" onclick=GBI.setCadObjectTypeVisible(this.value);
					onchange=GBI.setCadObjectTypeVisible(this.value); size=10 >` +
					txt +
				`</select>
			</p>

		</details>`;

		target.innerHTML = details;

	};



	/////

	REP.setPanelInteractions = function() {

		const item = REP.reportTypes[ REPselReport.selectedIndex ];
		//console.log( 'item', item );

		if ( item.element === 'Surface' ) {

			REPdivInteract.innerHTML =
			`
				<button onclick=GBI.setSurfaceVisible(REPselReportType.value); class="app-menu w3-theme-d1 w3-hover-theme w3-hover-border-theme" >select</button>
				<button onclick=GBI.setSurfaceZoom(REPselReportType.value); class="app-menu w3-theme-d1 w3-hover-theme w3-hover-border-theme" >zoom</button>
			`;

		} else if ( item.element === 'Space' ) {

			REPdivInteract.innerHTML =
			`
				<button onclick=GBI.setSpaceVisible(REPselReportType.value); class="app-menu w3-theme-d1 w3-hover-theme w3-hover-border-theme" >select</button>
				`;

		//				<button onclick=GBI.setSurfaceZoom(REPselReportType.value); class="app-menu w3-theme-d1 w3-hover-theme w3-hover-border-theme">zoom</button>
		} else if ( item.element === 'Storey' ) {

			REPdivInteract.innerHTML =
			`
				<button onclick=GBI.setStoreyVisible(REPselReportType.value); class="app-menu w3-theme-d1 w3-hover-theme w3-hover-border-theme" >select</button>
			`;

		}else if ( item.element === 'Zone' ) {

			REPdivInteract.innerHTML =
			`
				<button onclick=GBI.setZoneVisible(REPselReportType.value); class="app-menu w3-theme-d1 w3-hover-theme w3-hover-border-theme" >select</button>
			`;

		} else if ( item.element === 'Openings' ) {

			REPdivInteract.innerHTML =
			`
				<button onclick=GBI.setOpeningVisible(REPselReportType.value); class="app-menu w3-theme-d1 w3-hover-theme w3-hover-border-theme" >select</button>
			`;

		}

	};


	REP.getGoogleMap = function() {

		const locate = GBP.gbjson.Campus.Location;  // remember that location is a reserved word in your browser
		let linkToMap;

		if ( locate && locate.Latitude && locate.Longitude ) {

			const link = 'https://www.google.com/maps/@' + locate.Latitude + ',' + locate.Longitude + ',17z';

			linkToMap = ' &raquo; <a href="'+ link + '" style=background-color:lightblue; target=_blank > &#x1f310; </a>';

		} else {

			linkToMap = '';

		}

		return '<span title="Use context menu to open a Google Map in a new tab" >' + linkToMap + '<span>';

	};



	REP.initRep();
