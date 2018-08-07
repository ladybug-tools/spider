/* global THR, GBX, SEL, document, butMenuReports, divMenuItems */
/* jshint esversion: 6 */

// Copyright 2018 Ladybug Tools authors. MIT License

	var REP = { '14release: "14.1" };

	REP.initRep = function () { // called from bottom of file

		REP.setMenuItems( CORdivMenuItems );

		COR.setPanelButtonInit( CORbutMenuReports );

	};



	REP.setMenuItems = function( target ) {

		target.innerHTML  =

		`<details id = "detReports" open >

			<summary>Reports &nbsp; <a href=#../gv-rep-reports/README.md>?</a></summary>

			<div><i>Do you want visibility toggle show/hide here?</i></div>

			<div id=REPdivMenuPanelPrelims ></div>

			<div id=REPdivMenuPanelSelectReport ></div>


			<div id=REPdivMenuPanelSurfacesByType ></div>

			<div id=REPdivMenuPanelOpeningsByType ></div>

			<div id=REPdivMenuPanelCadObjectsByType ></div>

			<hr>

			<div id=REPdivGbxmlAttributes ></div>

			<div id=REPdivCampus ></div>

			<div id=REPdivCampusLocation ></div>

			<div id=REPdivCampusBuilding ></div>

			<p>
				<small><i>Need reports on more gbXML elements? <br>
				<a href="https://github.com/ladybug-tools/spider/issues" >Just shout</a> and they will be made to appear.</i></small>
			</p>

			<hr>

		</details>`;


		REP.reportTypes = [];

		//SEL.setPanelShowHide( REPdivMenuPanelPrelims );

		REP.getPanelSelectReport( REPdivMenuPanelSelectReport );

		REP.setPanelSelectOptions( REPselReport, GBX.gbjson.Campus.Surface, 'Surface' );

		REP.setPanelSelectOptions( REPselReport, GBX.gbjson.Campus.Building.Space, 'Space' );

		REP.setPanelSelectOptions( REPselReport, GBX.gbjson.Campus.Building.BuildingStorey, 'Storey' );

		REP.setPanelSelectOptions( REPselReport, GBX.gbjson.Zone, 'Zone' );

		REP.setPanelSelectOptionsOpenings( REPselReport );

		///

		REP.setMenuPanelSurfacesByType( REPdivMenuPanelSurfacesByType );

		REP.setMenuPanelOpeningsByType( REPdivMenuPanelOpeningsByType );

		REP.setMenuPanelCadObjectsByType( REPdivMenuPanelCadObjectsByType );

		///

		REP.setGbjsonAttributes( GBX.gbjson, REPdivGbxmlAttributes, 'gbXML' );

		REP.setGbjsonAttributes( GBX.gbjson.Campus, REPdivCampus, 'Campus' );

		REP.setGbjsonAttributes( GBX.gbjson.Campus.Location, REPdivCampusLocation, 'Campus Location' );

		const mapLink = REP.getGoogleMap();

		const wolframAlphaLink = REP.getWolframAlpha();

		REP.setGbjsonAttributes( GBX.gbjson.Campus.Building, REPdivCampusBuilding, 'Building ' + mapLink + ' ' + wolframAlphaLink );

	};



	// init Select Report details panel

	REP.getPanelSelectReport = function( reports ) {

		reports.innerHTML =

		`<details open >

				<summary>Select Report by Item</summary>

				<div>
					<select id=REPselReport onclick=REP.setPanelReportResults(); onchange=REP.setPanelReportResults(); size=6 ></select>
				</div>

				<div id=REPdivReport ></div>

				<div id=REPdivInteract ></div>

		</details>

		<hr>`;

	};



	REP.setPanelSelectOptions = function( target, parent, element ) {

		//const obj = Array.isArray( parent ) ? parent[ 0 ] : parent;

		let options = '';

		const item = {};

		//item.attribute = property;
		item.divAttributes = 'REPdivElementAttributes';
		item.parent = parent;
		item.element = element;

		item.placeholder = element;
		item.selItem = 'REPselReportType';

		REP.reportTypes.push( item );

		options += '<option >' + element + '</option>';

		target.innerHTML += options;

	};



	REP.setPanelSelectOptionsOpenings = function( target ) {

		REP.surfacesWithOpenings = GBX.surfacesJson.filter( surface => surface.Opening );
		//console.log( 'REP.SurfacesWithOpenings', REP.SurfacesWithOpenings );

		REP.openings = [];

		for ( let surface of REP.surfacesWithOpenings ) {

			if ( surface.Opening.length ) {

				REP.openings.push ( ...surface.Opening );

			} else {

				REP.openings.push ( surface.Opening );

			}

		}
		//console.log( 'REP.openings', REP.openings );

		REP.setPanelSelectOptions( target, REP.openings, 'Openings' );

	};



	REP.setPanelReportResults = function() {

		let item = REP.reportTypes[ REPselReport.selectedIndex ];
		//console.log( 'item', item );

		REPdivReport.innerHTML =

		`<div>

			<p><b>` + item.element + ' &raquo; ' + ( item.parent.length ? item.parent.length : 1 ) + ` items</b><br></p>

			<div id=REPdivElements ></div>

		</div>`;

		let arr = Array.isArray( item.parent ) ? item.parent : [ item.parent ];
		item.name = 'itemReportResults';
		//item.optionValues = arr.map( element => [ element[ item.attribute ], element.id ] );

		item.optionValues = arr.map( item => [ item.id, item.Name, item.CADObjectId, '' ] );

		item.optionValues.sort( ( a, b ) => {
			if ( a[ 0 ] === b[ 0 ] ) { return 0; } else { return ( a[ 0 ] < b[ 0 ] ) ? -1 : 1; }
		} );
		//console.log( 'item.optionValues', item.optionValues );

		item.divTarget = document.getElementById( 'REPdivElements' );
		//console.log( 'item', item );

		SEL.itemReportResults = SEL.getElementPanel( item );

		REPselReportType.selectedIndex = 0;
		REPselReportType.oninput();

	};



	///// Types -

	REP.setMenuPanelSurfacesByType = function( target ) {

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

		// do we want to sort types?

		for ( let i = 0; i < types.length; i++ ) {


			let color =  GBX.colorsDefault[types[ i ]] ? GBX.colorsDefault[types[ i ]].toString( 16 ) : '';
			color = color.length > 4 ? color : '00' + color;
			//console.log( 'col', color );

			txt +=
			`
				<button class=toggleView onclick=SEL.setSurfaceTypeInvisible(this);REP.toggleButtonColor(this);
					value=${ types[ i ] } ><img src="../assets/eye.png" height=18>
				</button>

				<button class=toggle onclick=SEL.setSurfaceTypeVisible(this.innerText);
					style="width:8rem;background-color:#${ color } !important;" >
					${ types[ i ] } </button>
					 ${ typesCount[ i ] }/${ surfaces.length }
			<br>`;

		}


		const details =

		`<details id=REPdetSurfaceTypes >

			<summary >Surfaces by Type &raquo; ` + types.length + ` found</summary>

			<div>` + txt +
				`<p><button class=toggle onclick=SEL.setExposedToSunVisible(); >Exposed to Sun</button> </p>
				<p><button class=toggle onclick=GBX.setAllVisible(); >all visible</button></p>
			</div>

		</details>`;


		target.innerHTML = details;

		const butts = REPdetSurfaceTypes.getElementsByClassName( "toggleView" );

		for ( let butt of butts ) REP.toggleButtonColor( butt );

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
				<select id = "REPselOpeningsByType" onclick=SEL.setOpeningTypeVisible(this.value);
					onchange=SEL.setOpeningTypeVisible(this.value); size=` + types.length + ` >` +
					txt +
				`</select>
			</p>

		</details>`;

		target.innerHTML = details;

	};



	REP.setMenuPanelCadObjectsByType = function( target ) {

		const surfaces = GBX.gbjson.Campus.Surface;
		const cadIds = [];

		for ( let surface of surfaces ) {

			if ( !surface.CADObjectId || typeof surface.CADObjectId !== 'string' ) {

				CORdivLog.innerHTML += 'CADObjectId error: ' + surface.id + '<br>';

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

		`<details>

			<summary >CAD Objects by Type &raquo; ` + cadIds.length + `</summary>

			<p>
				<select id = "REPselCadIdGroups"
					onclick=SEL.setCadObjectTypeVisible(this.value);
					onchange=SEL.setCadObjectTypeVisible(this.value); size=10 >` +
					txt +
				`</select>
			</p>

		</details>`;

		target.innerHTML = details;

	};


	///////// general gbXML Data

	REP.setGbjsonAttributes = function( obj, target, title ) {
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



	REP.getGoogleMap = function() {

		const locate = GBX.gbjson.Campus.Location;  // remember that location is a reserved word in your browser
		let linkToMap;

		if ( locate && locate.Latitude && locate.Longitude ) {

			const link = 'https://www.google.com/maps/@' + locate.Latitude + ',' + locate.Longitude + ',17z';

			linkToMap = ' &raquo; <a href="'+ link + '" style=background-color:lightblue; target=_blank > &#x1f310;</a>';

		} else {

			linkToMap = '';

		}

		return '<span title="Use context menu to open a Google Map in a new tab" >' + linkToMap + '<span>';

	};



	REP.getWolframAlpha = function() {

		const locate = GBX.gbjson.Campus.Location;  // remember that location is a reserved word in your browser
		let linkToMap;

		if ( locate && locate.Latitude && locate.Longitude ) {

			const link = 'http://www.wolframalpha.com/input/?i=' + locate.Latitude + '+degrees,+' + locate.Longitude + '+degrees';

			linkToMap = ' / <a href="'+ link + '"  target=_blank > Wolfram info </a>';

		} else {

			linkToMap = '';

		}

		return '<span title="Use context menu to open a Wolfram Alpha in a new tab" >' + linkToMap + '<span>';

	};



	REP.toggleButtonColor = function( that ) {

		const cssText = 'background-color: ' + COR.colorButtonToggle + ' !important; font-style: italic; font-weight: bold';

		if ( that.style.backgroundColor !== COR.colorButtonToggle ) {

			that.style.cssText = cssText;

		} else {

			that.style.cssText = '';

		}

	};



	REP.initRep();
