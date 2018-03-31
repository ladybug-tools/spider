/*global

THR, THREE, GBX, GBV, window, document,butSettings, detSettings,divMenuItems,rngOpacity,rngViewExplodeVertical

*/

// Copyright 2018 Ladybug Tools authors. MIT License

	var REP2 = {};

	REP2.types = [
		[GBP.gbjson.Campus.Surface, 'Surface'],
		[GBP.gbjson.Campus.Building.Space, 'Space'],
		[ GBP.gbjson.Campus.Building.BuildingStorey, 'Storey' ],
		[GBP.gbjson.Zone, 'Zone']

	];



	REP2.initRep2 = function () {

		if ( window.butMenuLoad ) {

			REP2.butMenuTemplate = butMenuLoad;

			REP2.title = 'gv-REP2 - gbXML Viewer Rep2';;
			document.title = REP2.title;
			aDocumentTitle.innerHTML = REP2.title;
			REP2.butMenuTemplate.innerHTML = REP2.title;

		} else {

			REP2.butMenuTemplate = butMenuTemplate;

		}

		if ( REP2.butMenuTemplate.style.fontStyle !== 'italic' ) {

			divMenuItems.innerHTML =

				`<details id = "detTemplate" class = "app-menu" open >

					<summary>Template Summary</summary>

					<div id = "divTemplate" ></div>

					<hr>

				</details>

			` + divMenuItems.innerHTML;

			initMenuRep2();

			REP2.butMenuTemplate.style.cssText = 'background-color: pink !important; font-style: italic; font-weight: bold';

		} else {

			detTemplate.remove();

			REP2.butMenuTemplate.style.backgroundColor = '';
			REP2.butMenuTemplate.style.fontStyle = '';
			REP2.butMenuTemplate.style.fontWeight = '';

		}

		function initMenuRep2() {

			let txt = 'lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?';

			REP2.items  = {

				surfaceById: { title: 'Surface by ID', placeholder: 'surface id', gbjson: GBP.surfaceJson, property: 'id' } ,
				surfaceByName: { title: 'surfaceByName', placeholder: 'surface name',gbjson: GBP.surfaceJson, property: 'Name' },
				spaceById: { title: 'spaceById', placeholder: 'space id', gbjson: GBP.gbjson.Campus.Building.Space, property: 'id' },
				spaceByName: { title: 'Space by Name', placeholder: 'space name', gbjson: GBP.gbjson.Campus.Building.Space, property: 'Name' },
				spaceByCADObjectId: { title: 'Space by CADObjectId', placeholder: 'cad id', gbjson: GBP.gbjson.Campus.Building.Space, property: 'CADObjectId' },
				spaceByVolume: { title: 'spaceByVolume', placeholder: 'volume', gbjson: GBP.gbjson.Campus.Building.Space, property: 'Volume'},
				spaceByStory: { title: 'spaceByStory'},
				spaceByZone: { title: 'spaceByZone'},
				storeyById: { title: 'Storey by ID', placeholder: 'storey id', gbjson: GBP.gbjson.Campus.Building.BuildingStorey },
				zoneById: { title: 'zoneById'},
				zoneByNme: { title: 'zoneByNme'},
				zoneByCADObjectId: { title: 'zoneByNme'}

			};

			REP2.keys = Object.keys( REP2.items );

			divTemplate.innerHTML =
			`
				<p>
					<b>visibility toggles</b><br>
					<button class="w3-theme-d1 w3-hover-theme w3-hover-border-theme" onclick=GBP.surfaceMeshes.visible=!GBP.surfaceMeshes.visible; >surfaces</button>
						<button class="w3-theme-d1 w3-hover-theme w3-hover-border-theme" onclick=GBP.surfaceEdges.visible=!GBP.surfaceEdges.visible; >edges</button>
						<button class="w3-theme-d1 w3-hover-theme w3-hover-border-theme" onclick=GBP.setAllVisible(); >all</button>
				</p>

				<div id=REP2divItems >
					<h3>Select Report</h3>

					<select id=REP2selReport size=10 ></select>

				</div>

				<div id=REP2divReport ></div>

			`;

			txt = '';

			//for ( key of REP2.keys ) { REP2selReport.innerHTML += '<option>' + key + '</option>'; }

			REP2selReport.onchange = REP2.showMenu;

			REP2.count = 0;

			REP2.buildMenu();
			REP2.items = {}
			//REP2.buildMenu( GBP.gbjson.Campus.Building.Space, 'Space' );

			//REP2.buildMenu( GBP.gbjson.Campus.Building.BuildingStorey, 'Storey' );

			//REP2.buildMenu( GBP.gbjson.Zone, 'Zone' );
		}

	};


	REP2.buildMenu = function() {

		parent = REP2.types[ REP2.count ][ 0 ];
		title = REP2.types[ REP2.count ][ 1 ];



		obj = Array.isArray( parent ) ? parent[ 0 ] : parent;

		for ( let property in obj ) {

			if ( obj[ property ] !== null && typeof( obj[ property ] ) === 'object' ) {

				//if ( elements.indexOf( property ) < 0 ) { elements.push( property ); }

			} else {

				REP2.items[ property ] = { gbjson: parent, attribute: property };
				REP2selReport.innerHTML += '<option value=' + property + ' >' + title + ' by ' + property + '</option>';

			}

		};

		//console.log( 'elements', elements );
		console.log( 'items', REP2.items );
		REP2.count++;

		if ( REP2.count < REP2.types.length ) { REP2.buildMenu(); }
	}



	REP2.showMenu = function() {

		//console.log( 'REP2selReport', REP2selReport );

		item = REP2.items[ REP2selReport.value ];
		console.log( 'item', item );

		REP2divReport.innerHTML =

			`<b>` + item + `</b><br>

			<div class=flex-container2 >
				<div class=flex-div1 >
					<input oninput=REP.updateSelect(this); size=8 placeholder="` + item + `" ><br>
					<select id = "REPselItem" onclick=REP2.selItem(); onchange=REP2.selItem(); size=10 ></select>
				</div>
				<div id = "REP2divAttributes" class=flex-left-div2  ></div>
			</div>
			`


		let txt = '';
		item.gbjson.forEach( function( element ) { txt += '<option value=' + element.id + ' >' + element[ item.attribute ] + '</option>' } );
		REPselItem.innerHTML = txt;

		/*
		let arr = [];
		item.gbjson.forEach( function( element ) { arr.push( element[ item.attribute ] ) } );

		arr.sort();

		let txt = '';
		arr.forEach( function( element ) { txt += '<option value=' + element + ' >' + element+ '</option>' } );
		REPselItem.innerHTML = txt;
		*/

		REPselItem.selectedIndex = 0;
		REP2.selItem();

		//REPsumSurfacesIndividually.innerHTML = 'Surfaces Individually &raquo; ' + REPselSurface.length;

	}


	REP2.selItem = function() {

		type = REP2selReport.value;
		typeItem = REP2.items[ type ];
		//console.log( 'typeItem', typeItem );

		itemId = REPselItem.value;
		//console.log( 'itemId', itemId);

		let item = typeItem.gbjson.find( element => element.id === itemId );
		//console.log( 'item', item );

		attributes = REP2.traverseGbjson( item );
		REP2divAttributes.innerHTML = attributes;
		//console.log( 'ell', REP2.traverseGbjson( item ).elements );

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


	REP2.initRep2();
