/*global

THR, THREE, GBX, ISS, window, document,butSettings, detSettings,divMenuItems,rngOpacity,rngViewExplodeVertical

*/

// Copyright 2018 Ladybug Tools authors. MIT License

	//GBX.defaultURL = '../../gbxml-sample-files/columbia-sc-two-story-education-trane.xml';

	var ISS = {};
	ISS.surfaceChanges = {};

	var spaceId1;
	var spaceId2;

	// call at bottom of file

	ISS.initIssues = function () {

		ISS.setMenuItems( CORdivMenuItems );

		COR.setPanelButtonInit( CORbutIssues );

	};



	ISS.setMenuItems = function( target) {

		target.innerHTML =

		`<details id = ISSdetIssues open >

			<summary>Issues &nbsp; <a href=#../gv-iss-issues/README.md>?</a></summary>

			<div id=ISSdetPanelVisibilityToggle ></div>

			<div id = "ISSdetPanelMetadataIssues" ></div>

			<div id=ISSdetPanelSurfacesDuplicateAdjacentSpaces2 ></div>

			<div id=ISSdetPanelSurfacesDuplicateAdjacentSpaces ></div>

			<div id=ISSdetPanelDuplicateCoordinates title="R13" ></div>

			<div id=ISSdetPanelSurfacesDuplicateCoordinates ></div>

			<div id=ISSdetPanelSurfacesUndefinedCadId ></div>

			<div id=ISSdetPanelSurfacesTiny ></div>

			<div id=ISSdetPanelSurfacesVertexClose ></div>

			<div id=ISSdetPanelOpeningVertices4Plus ></div>

			<div id=ISSdetPanelSurfaceTypeInvalid ></div>

			<div id=ISSdetPanelOpeningTypeInvalid ></div>

			<div id=ISSdetPanelAdjacentSpaceInvalid ></div>

			<div id=ISSdetPanelInclusions ></div>

			<div id=ISSdetGeneralCheck ></div>

			<hr>

		</details>`;


		SEL.setPanelShowHide( ISSdetPanelVisibilityToggle );

		ISS.setPanelMetadataIssues( ISSdetPanelMetadataIssues );


		ISS.setPanelSurfacesDuplicateAdjacentSpaces( ISSdetPanelSurfacesDuplicateAdjacentSpaces2 );

		//ISSdetPanelSurfacesDuplicateAdjacentSpaces.innerHTML = ISS.getPanelSurfacesDuplicateAdjacentSpaces();

		ISS.setPanelDuplicateCoordinates( ISSdetPanelDuplicateCoordinates );

		//ISSdetPanelSurfacesDuplicateCoordinates.innerHTML = ISS.getPanelSurfacesDuplicateCoordinates();

		ISS.setPanelSurfacesUndefinedCadId( ISSdetPanelSurfacesUndefinedCadId );

		ISS.setPanelSurfacesTiny( ISSdetPanelSurfacesTiny );

		ISS.setPanelSurfacesVertexClose( ISSdetPanelSurfacesVertexClose );

		ISS.setPanelOpeningVertices4Plus( ISSdetPanelOpeningVertices4Plus );

		ISS.setPanelSurfaceTypeInvalid( ISSdetPanelSurfaceTypeInvalid );

		ISS.setPanelOpeningTypeInvalid( ISSdetPanelOpeningTypeInvalid );

		ISS.setPanelAdjacentSpaceInvalid( ISSdetPanelAdjacentSpaceInvalid );

		ISS.setGeneralCheck( ISSdetGeneralCheck );

	};



	ISS.setGeneralCheck = function( target ) {

		target.innerHTML =
		`<details>

			<summary>General Check</summary>

			<p>More experiments</p>

			<p><button onclick=ISS.setPopupGeneralCheck(); >General check</button></p>

			<p>Still at a very preliminary stage. Not much serious checking going on yet</p>

			<p><button onclick=ISS.setCheckInclusions(); >Inclusion check</button></p>

			<p id=pInclusions >Inclusions is a work in progress. Numbers reported are faulty.</p>


		</details>`;

	};



	ISS.setCheckInclusions = function() {

		//arr =  GBX.surfaceMeshes.children.slice();
		//console.log( '', arr );

		const inclusions = [];

		for ( let surface of GBX.surfaceMeshes.children ) {

			surface.geometry.computeBoundingBox();

			for ( let surface2 of GBX.surfaceMeshes.children ) {

				surface2.geometry.computeBoundingBox();

				if ( surface.uuid != surface2.uuid &&  surface.geometry.boundingBox.containsBox( surface2.geometry.boundingBox ) ) {

					//console.log( '', surface.geometry.vertices, surface2.geometry.vertices );
					//console.log( '', surface.userData.data.surfaceType, surface2.userData.data.surfaceType );
					//console.log( '', surface.userData.data.Name, ' ', surface2.userData.data.Name );

					inclusions.push ( {s1: surface, s2: surface2 } );

				}

			}

		}

		pInclusions.innerHTML = 'inclusions found: ' + inclusions.length;


		let inclusionText = '';

		for ( inclusion of inclusions ) {

			const butts1 = ISS.getButtonsSurfaceId( inclusion.s1.userData.data.id);
			const butts2 = ISS.getButtonsSurfaceId( inclusion.s2.userData.data.id);

			inclusionText +=
			`
			${butts1} ${inclusion.s1.userData.data.Name}
			${butts2} ${inclusion.s1.userData.data.Name}
			<br>`;

		}
		console.log( 'inclusion', inclusion );

		CORdivItemsRight.innerHTML =
		`
			<h3>Inclusions</h3>
			<div>${inclusionText}</div>
		`;

		COR.setRightMenuWide();

	};



	ISS.setPopupGeneralCheck = function() {

		let txt = 'All lines checked appear to contain valid XML data.';
		lines = GBX.gbxml.innerHTML.split(/\r\n|\n/);

		for ( i = 0; i< lines.length; i++ ) {

			line = lines[ i ].toLowerCase();

			if( line.includes( '<area>0</area>') ) {

				txt += `line ${i}: ${line}\n`;

			}

			if( line.includes( '<volume>0</volume>') ) {

				txt += `line ${i}: ${line}\n`;

			}

			if ( line.includes( '""') ) {

				txt += `Empty string at line ${i}: ${line}\n`;

			}


		}
		//console.log( 'txt', txt );

		if ( txt !== '' ) {

			CORdivItemsRight.innerHTML =
			`
				<h3>General Check</h3>
				<p>Lines checked: ${lines.length.toLocaleString()}</p>
				<div id=ISSdivCheckText ></div>
			`;

			COR.setRightMenuWide();

			ISSdivCheckText.innerText = '***\n' + txt;

		}

	}



	////////// Metadata

	ISS.setPanelMetadataIssues = function( target ) {

		const requirements = [
			'areaUnit', 'lengthUnit', 'temperatureUnit', 'useSIUnitsForResults', 'version', 'volumeUnit', 'xmlns'
		];

		let provided = [];
		ISS.attributesMissing = [];

		for ( attribute in GBX.gbjson ) {

			//console.log( 'attribute', attribute );

			if ( requirements.includes( attribute) ) {

				provided.push( attribute );

			}

		}
		//console.log( 'provided', provided );

		for ( attribute of requirements ) {

			if ( !GBX.gbjson[ attribute ] ) {

				//console.log( 'attribute', must );
				ISS.attributesMissing.push( attribute );

			}

		}
		//console.log( 'ISS.attributesMissing', ISS.attributesMissing.join( '<br>' ) );

		target.innerHTML =
		`<details>

			<summary>Metadata Issues &raquo; ${ISS.attributesMissing.length} attributes missing</summary>

			<p>gbXML attributes provided:<br>&bull; ${provided.join( '<br>&bull; ' )}</p>

			<p>gbXML attributes missing:<br>&bull;  ${ISS.attributesMissing.join( '<br>&bull; ' )} </p>

			<p><button onclick=ISS.setPopupMetadataIssues(); >Add missing attributes</button></p>

		</details>`;

	};



	ISS.setPopupMetadataIssues = function() {

		values = {

			'areaUnit': 'SquareMeters',
			'lengthUnit': 'Meters',
			'temperatureUnit': 'C',
			'useSIUnitsForResults': 'true',
			'version': '0.37',
			'volumeUnit': 'CubicMeters',
			'xmlns': 'http://www.gbxml.org/schema'
		};

		CORdivItemsRight.innerHTML =
		`
			<h3>Add Missing Attributes</h3>
			<div id=divSavHeader ></div>
			<h3>Missing Attributes</h3>
			<div id=ISSdivAttributesMissing ></div>
			<p>
				<button onclick=onchange=ISS.setChangesMetadataIssues(this); >Update the changes file</button>

				<button onclick=ISS.surfaceChanges.addAttributesMissing=[];ISS.setChangesMetadataIssues(this); >Clear changes</button>
			</p>

			<h3>save changes file for missing attributes</h3>

			<textArea id=ISStxtAttributesMissing style="height:300px;width:100%;" ></textArea>

			<button onclick=CTX.surfaceChanges.addAttributesMissing=ISS.surfaceChanges.addAttributesMissing; >Update save changes file</button>
		`;

		CORdivMenuRight.style.display = 'block';
		window.scrollTo( 0, 0 );

		let txt = '';
		ISS.surfaceChanges.addAttributesMissing = {};

		for ( attribute of ISS.attributesMissing ) {

			ISS.surfaceChanges.addAttributesMissing[ attribute ] = values[attribute];
			txt += `<p><input onclick=this.select(); onchange=ISS.setChangesMetadataIssues(this,"${attribute}"); value=${values[attribute]} size=25 > ${attribute} <p>`;

		}

		ISSdivAttributesMissing.innerHTML = txt;
		ISStxtAttributesMissing.value = JSON.stringify( ISS.surfaceChanges.addAttributesMissing, null, ' ' );

	};



	ISS.setChangesMetadataIssues = function( that, attribute ) {

		console.log( 'that', that );

		if ( attribute ) {

			ISS.surfaceChanges.addAttributesMissing[attribute]=that.value;

			ISStxtAttributesMissing.value = JSON.stringify( ISS.surfaceChanges.addAttributesMissing, null, ' ' );

		} else {

			ISStxtAttributesMissing.value = 'No missing attributes that still need fixing';

		}

	};



	////////// Duplicate Adjacent Spaces  R13

	ISS.setPanelSurfacesDuplicateAdjacentSpaces = function( target ) { // R13

		surfaces = GBX.gbjson.Campus.Surface.slice();
		let count = 0;
		let contents = '';
		ISS.surfaceDuplicateAdjacentSpaces = [];

		for ( let surface of surfaces ) {

			const adjacencies = surface.AdjacentSpaceId;

			if ( Array.isArray( adjacencies ) === true && JSON.stringify( adjacencies[ 0 ] ) === JSON.stringify( adjacencies[ 1 ] ) ) {

				//ISS.surfaceDuplicateAdjacentSpaces.push( { id: surface.id, cadId: surface.CADObjectId } );
				ISS.surfaceDuplicateAdjacentSpaces.push( surface );

				surface.ISSDuplicateAdjacentSpace = true;

			} else {

				surface.ISSDuplicateAdjacentSpace = false;

			}

		}

		ISS.surfaceDuplicateAdjacentSpaces.sort( ( aSurf, bSurf ) => {
			const a = aSurf.cadId;
			const b = bSurf.cadId;
			if ( a < b ) {
				return -1;
			}
			if ( a > b ) {
				return 1;
			}
			// items must be equal
			return 0;
		} );

		//console.log( 'ISS.surfaceAdjacentsDuplicates', ISS.surfaceAdjacentsDuplicates );

		target.innerHTML =

		`<details>

			<summary id = "ISSsumSurfacesDuplicateAdjacentSpaces2" >R13 Duplicate Adjacent Space &raquo; ` + ISS.surfaceDuplicateAdjacentSpaces.length + ` found</summary>

			<div id=ISSdivData ></div>

			<p><small>
				Surfaces with two adjacent spaces pointing to identical space ids.
			</small></p>

			<p>
				<button id=ISSbutDuplicateAdjacent2 onclick=ISS.setDuplicateAdjacentSpaceVisibleToggle(); >toggle all duplicate adjacent spaces</button>
			</p>

			<div id=ISSdivSurfacesDuplicateAdjacentSpaces2 ></div>

			<p>

			<button onclick=ISS.setPopupSurfacesDuplicateAdjacentSpaces() title="Yes, we can. Make CAD fun again." >Fix duplicate adjacent spaces</button>

			</p>

			<hr>

		</details>`;


		let item = {};
		item.attribute = 'idDuplicateAdjacent';
		item.divAttributes = 'ISSdivISSdivSurfacesDuplicates2';
		item.divTarget = document.getElementById( 'ISSdivSurfacesDuplicateAdjacentSpaces2' );
		item.element = 'Surface';
		item.name = 'itemDuplicateAdjacent2';
		item.optionValues = ISS.surfaceDuplicateAdjacentSpaces.map( item => [ item.id, item.Name, item.CADObjectId ] );
		item.parent = surfaces; // ISS.surfaceAdjacentsDuplicates;
		item.placeholder = 'surface id';
		item.selItem = 'ISSselsurfaceDuplicateAdjacentSpaces';

		SEL.itemDuplicateAdjacent2 = SEL.getElementPanel( item );
		//console.log( 'SEL.itemDuplicateAdjacent2', SEL.itemDuplicateAdjacent2 );

		ISSselsurfaceDuplicateAdjacentSpaces.selectedIndex = 0;
		//ISSselsurfaceDuplicateAdjacentSpaces.click();


		ISS.setPopupPanelSpaces();



	};



	ISS.setPopupPanelSpaces = function() {

		ISS.spaceNames = GBX.gbjson.Campus.Building.Space.map( item => item.Name );

		ISS.spaces = [];

		for ( let space of GBX.gbjson.Campus.Building.Space ) {

			const surfaces = [];
			const coordinates = [];

			for ( let surface of GBX.surfacesJson ) {

				if ( surface.AdjacentSpaceId ) {

					if ( Array.isArray( surface.AdjacentSpaceId ) ) {

						// to be simplified

						if ( surface.AdjacentSpaceId[ 0 ].spaceIdRef === space.id || surface.AdjacentSpaceId[ 1 ].spaceIdRef  === space.id ) {

							surfaces.push( surface );

							for ( let coordinate of surface.PlanarGeometry.PolyLoop.CartesianPoint ) {

								//console.log( 'cco', coordinate.Coordinate.join()) ;
								const cc = coordinate.Coordinate.join();

								if ( coordinates.indexOf( cc ) < 0 ){
									//console.log( 'ind', cc )  );

									coordinates.push( cc );

								} else {

								}

							}

						}

					} else {

						if ( surface.AdjacentSpaceId.spaceIdRef === space.id ) {

							surfaces.push( surface );

							for ( let coordinate of surface.PlanarGeometry.PolyLoop.CartesianPoint ) {
								//console.log( 'cco', coordinate.Coordinate);

								const cc = coordinate.Coordinate.join();

								if ( coordinates.indexOf( cc ) < 0 ) {

									coordinates.push( cc );
									//console.log( 'coordinates', coordinates,  coordinate.Coordinate );

								}

							}

						}

					}

				} else {

					//console.log( 'surface', surface.surfaceType );

				}

			}

			ISS.spaces.push( { id: space.id, coordinates: coordinates.sort(), surfaces: surfaces, space: space } );

		}

		//console.log( 'ISS.spaces', ISS.spaces );

		ISS.setAdjDupSpcFixable();

	};



	ISS.setAdjDupSpcFixable = function() {


		for ( let surface of ISS.surfaceDuplicateAdjacentSpaces ) {

			surface.spacesFound = [];

			for ( let space of ISS.spaces ) {

				let count = 0;

				for ( let coordinate of surface.PlanarGeometry.PolyLoop.CartesianPoint ) {

					const cc = coordinate.Coordinate.join();
					const index = space.coordinates.indexOf( cc );

					if ( index >= 0  ) {

						count ++;

						const spaceId = surface.spacesFound.find ( item => item.id === space.id );

						if ( !spaceId ) { //

							surface.spacesFound.push( { id: space.id, count: 1 } );

						} else {

							spaceId.count++;
							//console.log( 'spaceId', spaceId );

						}

					}

				}

			}

			const spacesFound = surface.spacesFound.filter ( item => item.count > 2 );


			if ( spacesFound.length > 1 ) {

				surface.editDuplicateAdjacentSpaces = true;

			}

			surface.spacesAdjFound = spacesFound.filter ( item => item.count > 2 );
			surface.spacesAdjFound[ 1 ] =  surface.spacesAdjFound.length > 1 ? spacesFound[ 1 ] : spacesFound[ 0 ];

		}


	};



	ISS.setPopupSurfacesDuplicateAdjacentSpaces = function() {

		CORdivItemsRight.innerHTML =
		`
			<h3>Edit Duplicate Adjacent Spaces</h3>

			<p><small>
				Surfaces with two adjacent spaces pointing to identical space ids.
			</small></p>

			<div id=ISSdivDuplicateAdjacentSpaces ></div>

			<p>
				<!--
				<button onclick=onchange=ISS.setPopupPanelDuplicateAdjacentSpaces(this,"${attribute}"); >Update changes</button>

				<button onclick=ISS.surfaceChanges.editDuplicateAdjacentSpaces=[];ISS.setPopupPanelDuplicateAdjacentSpaces(this); >Clear changes</button>
				-->

				<button onclick=ISS.setPopupDupAdjSpcCheckbox(false); >Un-check all</button>

				<button onclick=ISS.setPopupDupAdjSpcCheckbox(true); >Check all</button>

				<button onclick=ISS.setPopupDupAdjSpcCheckboxFixable(); >Check fixable by rule</button>

			</p>

			<p>
				<button onclick=ISS.updateDupAdjSpc(ISS.surfaceChanges.editDuplicateAdjacentSpaces) >Edit selected surfaces</button>

				<button onclick=CTX.saveFile(); >Save changes to file</button>
			</p>

			<hr>

			<h3>Save changes file for duplicate adjacent spaces</h3>
			<p><i>values below should start to be correct quite soon<i></p>
			<textArea id=ISStxtDuplicateAdjacentSpaces style="height:300px;width:100%;" ></textArea>

			<p>
				<button onclick=CTX.surfaceChanges.editDuplicateAdjacentSpaces=[];CTX.surfaceChanges.editDuplicateAdjacentSpaces.push(...ISS.surfaceChanges.editDuplicateAdjacentSpaces) >Update save changes file</button>

				<button onClick=butSaveChanges.click() > View current changes</button>
			</p>

		`;

		COR.setRightMenuWide();

		ISS.setPopupPanelDuplicateAdjacentSpaces();

	};



	ISS.setPopupDupAdjSpcCheckbox = function( bool ) {

		ISS.surfaceChanges.editDuplicateAdjacentSpaces= [];
		ISS.surfaceDuplicateAdjacentSpaces.forEach( item => item.editDuplicateAdjacentSpaces = bool );
		ISS.setPopupPanelDuplicateAdjacentSpaces();

	};



	ISS.setPopupDupAdjSpcCheckboxFixable = function() {

		ISS.surfaceChanges.editDuplicateAdjacentSpaces= [];
		ISS.surfaceDuplicateAdjacentSpaces.forEach( item => item.editDuplicateAdjacentSpaces = false );
		ISS.setAdjDupSpcFixable();
		ISS.setPopupPanelDuplicateAdjacentSpaces();

	};



	ISS.setPopupPanelDuplicateAdjacentSpaces = function(){

		if ( !ISS.surfaceChanges.editDuplicateAdjacentSpaces ) { ISS.surfaceChanges.editDuplicateAdjacentSpaces = []; };
		//if ( !CTX.surfaceChanges.editDuplicateAdjacentSpaces ) { CTX.surfaceChanges.editDuplicateAdjacentSpaces = []; };

		let txt = '';
		let color = 'yellow';

		for ( let surface of ISS.surfaceDuplicateAdjacentSpaces ) {

			const check = surface.editDuplicateAdjacentSpaces ? 'checked' : '';

			if ( check ) {

				ISS.surfaceChanges.editDuplicateAdjacentSpaces.push( {
					name: surface.Name, spaceId1: surface.spacesAdjFound[0].id, spaceId2: surface.spacesAdjFound[ 1 ].id
				} );

			}

			color = color === 'yellow' ? 'pink' : 'yellow';

			//const spacesFound = surface.spacesFound.filter ( item => item.count > 2 );
			spacesFound = surface.spacesAdjFound;
			//console.log( 'spacesFound', spacesFound[ 0 ].id);

			const options1 = ISS.spaces.map( item =>
				spacesFound[ 0 ].id === item.id ? `<option selected >${item.id}</option>` : `<option>${item.id}</option>`
			).join( '' );

			//spacesFound1 = spacesFound.length > 1 ? spacesFound[ 1 ] : spacesFound[ 0 ];

			const options2 = ISS.spaces.map( item =>
				spacesFound[ 1 ].id === item.id ? `<option selected >${item.id}</option>` : `<option>${item.id}</option>`
			).join( '' );

			const buttsSurface = ISS.getButtonsSurfaceId( surface.id );

			let buttsSpaces = '';

			for ( space of surface.spacesFound ) {

				const txt = space.count > 2 ? 'style=color:red;font-style:italic;font-weight:bold;' : '';

				buttsSpaces += ` <button onclick=ISS.setSpaceAndSurfaceVisible("${space.id}","${surface.id}"); ${txt} >${space.id}</button>`

			}

			txt +=
			`<div style=background-color:${color};padding-bottom:0.5rem; >
				<input type=checkbox onchange=ISS.setEditDuplicateAdjacentSpaces(this,"${surface.Name}"); ${check}>
				<span style=display:inline-block;width:15rem; >
				name: ${surface.Name} </span>
				id: ${buttsSurface} type: ${surface.surfaceType}
				<div style=margin-left:2rem;padding-bottom:0.5rem; >
					space 1 <select oninput=ISS.setDupAdjSpcInputInput(this,0,"${surface.Name}"); >${options1}</select>
					space 2 <select oninput=ISS.setDupAdjSpcInputInput(this,1,"${surface.Name}"); >${options2}</select>
				</div>
				<div style=margin-left:2rem; >${buttsSpaces}</div>
			</div>`;
			}


		ISSdivDuplicateAdjacentSpaces.innerHTML = txt;

		ISStxtDuplicateAdjacentSpaces.value = JSON.stringify( ISS.surfaceChanges.editDuplicateAdjacentSpaces, null, ' ' );

	};



	ISS.setDupAdjSpcInputInput = function( input, index, name ){

		const surface = ISS.surfaceDuplicateAdjacentSpaces.find( item => item.Name === name );
		surface.spacesAdjFound[ index ].id = input.value;
		ISS.setPopupPanelDuplicateAdjacentSpaces();

	};



	ISS.setEditDuplicateAdjacentSpaces = function( checkbox, name ) {

		//console.log( 'checkbox', checkbox );

		const surface = ISS.surfaceDuplicateAdjacentSpaces.find( item => item.Name === name );
		//console.log( 'surface', surface );

		if ( checkbox.checked === false ){

			let arr = ISS.surfaceChanges.editDuplicateAdjacentSpaces.filter( item => item.name !== name );
			//console.log( 'arr', arr );
			ISS.surfaceChanges.editDuplicateAdjacentSpaces = arr;
			//if ( index !== -1 ) ISS.surfaceChanges.editDuplicateAdjacentSpaces.splice(index, 1);

		} else {

			if ( name ) { ISS.surfaceChanges.editDuplicateAdjacentSpaces.push( {
				name: surface.Name, spaceId1: surface.spacesAdjFound[ 0 ].id, spaceId2: surface.spacesAdjFound[ 1 ].id
			 } ); }

		}

		ISStxtDuplicateAdjacentSpaces.value = JSON.stringify( ISS.surfaceChanges.editDuplicateAdjacentSpaces, null, ' ' );

	};



	ISS.setSpaceAndSurfaceVisible = function( spaceId, surfaceId ) {
		//console.log( 'spaceId', spaceId );
		console.log( 'surfaceId', surfaceId );

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


			if ( child.userData.data.id === surfaceId ) {

				child.visible = true;
				child.userData.data.AdjacentSpaceId[ 1 ].spaceIdRef = spaceId;


			}

		}

		ISS.setPopupPanelDuplicateAdjacentSpaces();

	};



	ISS.updateDupAdjSpc = function( namesArray ) {

		console.log( 'namesArray', namesArray );

		const proceed = confirm( 'OK to edit surfaces: ' + JSON.stringify( namesArray ) + '?' );

		if ( !proceed ){ return; }

		surfacesGbxml = GBX.gbxml.getElementsByTagName( "Surface" );

		for ( item of namesArray ) {

			surfaceJson = GBX.surfacesJson.find( element => element.Name === item.name );

			//console.log( 'surfaceJson', surfaceJson);

			if ( surfaceJson ) {

				id =surfaceJson.id;
				//console.log( 'id', id );

				surfaceXml = surfacesGbxml[ id ];

				elements = surfaceXml.getElementsByTagName( "AdjacentSpaceId" );

				//console.log( 'elements[ 0 ]', elements[ 0 ].getAttribute( 'spaceIdRef' ) )
				elements[ 0 ].setAttribute( 'spaceIdRef', item.spaceId1 );
				elements[ 1 ].setAttribute( 'spaceIdRef', item.spaceId2 );
				console.log( 'elements', elements );


				// edit gbjson
				surfaceJson.AdjacentSpaceId[ 0 ].spaceIdRef = item.spaceId1;
				surfaceJson.AdjacentSpaceId[ 1 ].spaceIdRef = item.spaceId2;
				//console.log( 'surfaceJson.AdjacentSpaceId', surfaceJson.AdjacentSpaceId );

				// edit three.js
				const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === id );
				surfaceMesh.userData.data.AdjacentSpaceId[ 0 ].spaceIdRef = item.spaceId1;
				surfaceMesh.userData.data.AdjacentSpaceId[ 1 ].spaceIdRef = item.spaceId2;

			}

		}

	};



	///////// R12

	ISS.getPanelSurfacesDuplicateAdjacentSpaces = function() { // R12

		const surfaces = GBX.gbjson.Campus.Surface;
		let count = 0;
		let contents = '';
		ISS.surfaceAdjacentsDuplicates = [];

		for ( let surface of surfaces ) {

			const adjacencies = surface.AdjacentSpaceId;

			if ( Array.isArray( adjacencies ) === true && JSON.stringify( adjacencies[ 0 ] ) === JSON.stringify( adjacencies[ 1 ] ) ) {

				ISS.surfaceAdjacentsDuplicates.push( { id: surface.id, cadId: surface.CADObjectId } );

			}

		}

		ISS.surfaceAdjacentsDuplicates.sort( ( aSurf, bSurf ) => {
			const a = aSurf.cadId;
			const b = bSurf.cadId;
			if ( a < b ) {
				return -1;
			}
			if ( a > b ) {
				return 1;
			}
			// items must be equal
			return 0;
		} );


		for ( let item of ISS.surfaceAdjacentsDuplicates ) {
			//console.log( 'item', item );

			const surface = surfaces.find( element => element.CADObjectId === item.cadId && element.id === item.id );
			//console.log( 'surface', surface );

			const height = parseFloat( surface.RectangularGeometry.Height );
			const width = parseFloat( surface.RectangularGeometry.Width );
			const surfaceArea = height * width;

			contents +=
			`<div style=margin-bottom:15px; >` +
				( ++ count ) +
				` <button onclick=SEL.setSurfaceVisible(this.innerText); >` + surface.id + `</button>
				<button onclick=SEL.setSurfaceZoom("` + surface.id + `"); >zoom</button>
				<button class=toggle onclick=SEL.setSurfaceTypeVisible(this.innerText); >` + surface.surfaceType + `</button><br>`
				+ ( surface.Name ? `name <i>` + surface.Name + `</i><br>` : `` )
				+ ( surface.CADObjectId ? `cad object id <button onclick=ISS.setCadIdVisible(` + ( count - 1 ) + `); >` + surface.CADObjectId + `</button><br>` : `` ) +
				`area <i>` + Number( surfaceArea ).toFixed( 1 ) + `</i>` +
				` length <i>` + height.toFixed( 3 ) + `</i> width <i>` + width.toFixed( 3 ) + `</i>
			</div>`;

			surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === item.id );
			surfaceMesh.material.color.set( '#c080ff' );
		}

		const txt =
		`<details>

			<summary >R12 Duplicate Adjacent Space &raquo; ` + count + ` found</summary>

			<p>
				Surfaces with two adjacent spaces pointing to identical space id. Use with heads-up display.
			</p>

			<p>
				<button id=ISSbutDuplicateAdjacent onclick=ISS.setDuplicateAdjacentSpaceVisibleToggle(); >toggle all duplicate adjacent spaces</button>
			</p>
			<hr>

			<div >` + contents + `</div>

		</details>`;

		return txt;

	};



	////////// Duplicate Coordinates  R13

	ISS.setPanelDuplicateCoordinates = function( target ) { //R13

		const surfacePolyLoops = [];
		const surfaceIndexes = [];
		ISS.duplicateCoordinates = [];
		ISS.duplicateCoordinates2 = [];

		const surfacesJ = GBX.surfacesJson;

		//let spaceId;

		for ( let i = 0; i <  surfacesJ.length; i++ ) {

			const surface = surfacesJ[ i ];
			const points = JSON.stringify( surface.PlanarGeometry.PolyLoop.CartesianPoint );
			const index = surfacePolyLoops.indexOf( points );

			if ( index < 0 ) {

				surfacePolyLoops.push( points );
				surfaceIndexes.push( i );

			} else {

				surfaceOther = surfacesJ[ surfaceIndexes[ index ] ];
				ISS.duplicateCoordinates.push( surfaceOther, surface );

				surface.ISSduplicateSurfaceSecond = surfaceOther.Name;
				surface.ISSdeleteDuplicateSurface = true;

				surfaceOther.ISSduplicateSurfaceFirst = surface.Name;
				surfaceOther.ISSdeleteDuplicateSurface = false;

				existing = ISS.duplicateCoordinates2.find( item => item[ 0 ] === surfaceOther );

				if ( existing ) {

					existing.push( surface );

				} else {

					ISS.duplicateCoordinates2.push( [ surfaceOther, surface ] );

				}

			}

		}
		//console.log( 'existing', existing );
		//console.log( 'ISS.duplicateCoordinates2', ISS.duplicateCoordinates2 );

		target.innerHTML =

		`<details>

			<summary id = "ISSsumSurfacesDuplicateCoordinates2" >R13 Duplicate Coordinates &raquo; ` + ISS.duplicateCoordinates2.length +
				` found</summary>

			<p><small>
				Two surfaces with the same coordinates
			</small></p>

			<p>
				<button id=butDuplicateCoordinates
					onclick=ISS.setSurfaceArrayVisibleToggle(butDuplicateCoordinates,ISS.duplicateCoordinates);
					>toggle all duplicates</button>
			</p>

			<div id=ISSdivDuplicateCoordinates2 ></div>

			<p><button onclick=ISS.setPopupDuplicateCoordinates(); title="Starting to work!" >Fix duplicate surfaces</button></p>

			<hr>

		</details>`;

		let item = {};
		item.attribute = 'idDuplicateCoordinates';
		item.divAttributes = 'ISSdivDuplicateCoordinatesAttributes2';
		item.divTarget = document.getElementById( 'ISSdivDuplicateCoordinates2' );
		item.element = 'Surface';
		item.name = 'itemDuplicateCoordinates';
		item.optionValues = ISS.duplicateCoordinates.map( item => [item.id, item.Name, item.CADObjectId ] );
		item.parent = surfaces; // ISS.surfaceAdjacentsDuplicates;
		item.placeholder = 'surface id';
		item.selItem = 'ISSselDuplicateCoordinates2';

		ISS.itemDuplicateCoordinates = SEL.getElementPanel( item );
		ISSselDuplicateCoordinates2.selectedIndex = 0;
		//ISSselDuplicateCoordinates2.click();

	};



	ISS.setPopupDuplicateCoordinates = function() {

		CORdivItemsRight.innerHTML =
		`
			<h3>Delete Surfaces with Duplicate Coordinates</h3>

			<p><small>
				Two surfaces with the same coordinates
			</small></p>

			<div id=ISSdivDuplicateSurfaces ></div>

			<p>
				<button onclick=onchange=ISS.setPopupPanelDuplicateCoordinates(this,"${attribute}"); >Update changes</button>

				<button onclick=ISS.surfaceChanges.deleteDuplicateSurfaces=[];ISS.setChangesDuplicateSurfaces(this); >Clear changes</button>

			</p>

			<p>
				<button onclick=ISS.checkNone(); >Un-check all</button>

				<button onclick=ISS.checkFirst(); >Check all first</button>

				<button onclick=ISS.checkOthers(); >Check all others</button>

			</p>

			<p>
				<button onclick=ISS.deleteSurfaces(ISS.surfaceChanges.deleteDuplicateSurfaces) >Delete selected surfaces</button>

				<button onclick=CTX.saveFile(); >Save changes to file</button>
			</p>

			<hr>

			<h3>save changes file for duplicate surfaces</h3>

			<textArea id=ISStxtDuplicateSurfaces style="height:300px;width:100%;" ></textArea>

			<p>
				<button onclick=CTX.surfaceChanges.deleteDuplicateSurfaces=[];CTX.surfaceChanges.deleteDuplicateSurfaces.push(...ISS.surfaceChanges.deleteDuplicateSurfaces) >
					Update save changes file</button>

				<button onClick=butSaveChanges.click() >View current changes</button>
			</p>

		`;

		COR.setRightMenuWide();

		ISS.setPopupPanelDuplicateCoordinates();

	};



	ISS.checkNone = function() {

		ISS.surfaceChanges.deleteDuplicateSurfaces = [];
		ISS.duplicateCoordinates.forEach( item => item.ISSdeleteDuplicateSurface = false );
		ISS.setPopupPanelDuplicateCoordinates();

	};



	ISS.checkFirst = function() {

		ISS.surfaceChanges.deleteDuplicateSurfaces = [];
		ISS.duplicateCoordinates.forEach( item => item.ISSdeleteDuplicateSurface = item.ISSduplicateSurfaceFirst ? true : '' );
		ISS.setPopupPanelDuplicateCoordinates();

	};



	ISS.checkOthers = function() {

		ISS.surfaceChanges.deleteDuplicateSurfaces = [];
		ISS.duplicateCoordinates.forEach( item => item.ISSdeleteDuplicateSurface = item.ISSduplicateSurfaceSecond ? true : '' );
		ISS.setPopupPanelDuplicateCoordinates();

	};



	ISS.checkDuplicateCoordinatesAdjacent = function() {

		ISS.surfaceChanges.deleteDuplicateSurfaces = [];
		ISS.duplicateCoordinates.forEach( item => item.ISSdeleteDuplicateSurface = item.ISSDuplicateAdjacentSpace ? true : '' );
		ISS.setPopupPanelDuplicateCoordinates();

	};



	ISS.setPopupPanelDuplicateCoordinates = function(){

		let txt = '';
		if ( !ISS.surfaceChanges.deleteDuplicateSurfaces ) { ISS.surfaceChanges.deleteDuplicateSurfaces = []; };

		let color = 'yellow';

		for ( surfacesJ of ISS.duplicateCoordinates2 ) {

			color = color === 'yellow' ? 'pink' : 'yellow';
			//console.log( 'color', color );

			for ( surface of surfacesJ ) {

				const check = surface.ISSdeleteDuplicateSurface ? 'checked' : '';

				if ( check ) {

					ISS.surfaceChanges.deleteDuplicateSurfaces.push( surface.Name );

				}
				//console.log( 'check', check );

				const butts = ISS.getButtonsSurfaceId( surface.id );

				txt +=
				`<div style=background-color:${color}; >
					<input type=checkbox onchange=ISS.setChangesDuplicateSurfaces(this,"${surface.Name}"); ${check} >
					<span style=display:inline-block;width:15rem; >name: ${surface.Name} </span>
						id: ${butts} - type: ${surface.surfaceType}
				</div>`;

			}

		}

		ISSdivDuplicateSurfaces.innerHTML = txt;
		ISStxtDuplicateSurfaces.value = JSON.stringify( ISS.surfaceChanges.deleteDuplicateSurfaces, null, ' ' );

	};



	ISS.setChangesDuplicateSurfaces = function( that, name ) {

		//console.log( 'that', that );

		if ( that.checked === false ){

			var index = ISS.surfaceChanges.deleteDuplicateSurfaces.indexOf( name );
			if ( index !== -1 ) ISS.surfaceChanges.deleteDuplicateSurfaces.splice(index, 1);

		} else {

			if ( name ) { ISS.surfaceChanges.deleteDuplicateSurfaces.push( name ); }

		}

		ISStxtDuplicateSurfaces.value = JSON.stringify( ISS.surfaceChanges.deleteDuplicateSurfaces, null, ' ' );

	};



	///// R12

	ISS.getPanelSurfacesDuplicateCoordinates = function() { // R12

		const surfacePolyLoops = [];
		const surfaceIds = [];
		surfaceCoordinateDuplicates = [];

		let spaceIdOther1;
		let spaceIdOther2;

		const surfaces = GBX.surfacesJson;
		const b = '<br>';

		let count = 0;
		let flowContent =
			'<p>' +

				'<button id=butDuplicatesCoordinates onclick=ISS.setSurfaceArrayVisibleToggle(butDuplicatesCoordinates,surfaceCoordinateDuplicates); >toggle all duplicates</button>' +

				'<button onclick=CTX.saveFile(); title="creates a new file with the changes" >save edits</button>' +

				'</p>' +
				'<hr>';

		let spaceId;

		for ( let i = 0; i <  surfaces.length; i++ ) {

			surface = surfaces[ i ]
			points = JSON.stringify( surface.PlanarGeometry.PolyLoop.CartesianPoint );
			index = surfacePolyLoops.indexOf( points );

			if ( index < 0 ) {

				surfacePolyLoops.push( points );
				surfaceIds.push( i );

			} else {

				surfaceOther = surfaces[ surfaceIds[ index ] ];
				surfaceCoordinateDuplicates.push( surface.Name );

				//console.log( 'surface', surface );
				//console.log( 'surfaceOther', surfaceOther );

				adjacency = surface.AdjacentSpaceId ? surface.AdjacentSpaceId : '';

				if ( adjacency ) {

					if ( Array.isArray( adjacency ) === true ) {

						spaceId1 = surface.AdjacentSpaceId[ 0 ].spaceIdRef;
						spaceId2 = surface.AdjacentSpaceId[ 1 ].spaceIdRef;

					} else {

						spaceId1 = surface.AdjacentSpaceId.spaceIdRef;

					}

				}

				adjacencyOther = surfaceOther.AdjacentSpaceId ? surfaceOther.AdjacentSpaceId : '';

				if ( adjacencyOther ) {

					if ( Array.isArray( adjacencyOther ) === true ) {

						spaceIdOther1 = surfaceOther.AdjacentSpaceId[ 0 ].spaceIdRef;
						spaceIdOther2 = surfaceOther.AdjacentSpaceId[ 1 ].spaceIdRef;


					} else {

						spaceIdOther1 = surfaceOther.AdjacentSpaceId.spaceIdRef;

					}

				}

				flowContent +=
					'<div id= "divSurface' + surface.id +'" >' +
						count + '. id: <button onclick=SEL.setSurfaceVisible(this.innerText); >' + surface.id + '</button>' +
							'<button onclick=SEL.setSurfaceZoom("' + surface.id + '"); >zoom</button>' + b +
						'surface type: <button class=toggle onclick=SEL.setSurfaceTypeVisible(this.innerText); >' + surface.surfaceType + '</button>: ' + b +
						( surface.Name ? 'name: ' + surface.Name + b : '' ) +
						( surface.constructionIdRef ? 'construction id ref: ' + surface.constructionIdRef + b : '' ) +
						( spaceId1 ? 'space:  <button onclick=ISS.showSpace(spaceId1); >' + spaceId1 + '</button>' + b : '' ) +
						( spaceId2 ? 'space:  <button onclick=ISS.showSpace(spaceId2); >' + spaceId2 + '</button>' + b : '' ) +
						( surface.CADObjectId ?
							'<button onclick=ISS.setCadIdVisible2("' + encodeURI( surface.CADObjectId ) + '"); >cad object id: ' + surface.CADObjectId + '</button>' + b
							: ''
						) +
						'delete: <button onclick=ISS.deleteSurface(this.innerText) >' + surface.id + '</button>' +
						'</div>' +
						'<hr>' +
						'<div id= "divSurface' + surfaceOther.id +'" >' +
						'id of duplicate: <button onclick=SEL.setSurfaceVisible(this.innerText); >' + surfaceOther.id + '</button>' +
							'<button onclick=SEL.setSurfaceZoom("' + surfaceOther.id + '"); >zoom</button>' + b +
						'surface type: <button class=toggle onclick=SEL.setSurfaceTypeVisible(this.innerText); >' + surfaceOther.surfaceType + '</button>: ' + b +
						( surfaceOther.Name ? 'name: ' + surfaceOther.Name + b : '' ) +
						( surfaceOther.constructionIdRef ? 'construction id ref: ' + surfaceOther.constructionIdRef + b : '' ) +
						( spaceIdOther1 ? 'space:  <button onclick=ISS.showSpace(spaceIdOther1); >' + spaceIdOther1 + '</button>' + b : '' ) +
						( spaceIdOther2 ? 'space:  <button onclick=ISS.showSpace(spaceIdOther2); >' + spaceIdOther2 + '</button>' + b : '' ) +
						( surfaceOther.CADObjectId ?
							'<button onclick=ISS.setCadIdVisible2("' + encodeURI( surfaceOther.CADObjectId ) + '"); >cad object id: ' + surfaceOther.CADObjectId + '</button>' + b
							: ''
						) +
						'delete: <button onclick=ISS.deleteSurface(this.innerText); >' + surfaceOther.id + '</button>' +

					'</div>' +
					'<hr style="border:none;border-top: medium double #333;" >' + b;

				count ++;

			}

		}

		for ( let child of GBX.surfaceMeshes.children ) {

			if ( !child.userData.data ) { continue; }

			if ( surfaceCoordinateDuplicates.includes( child.userData.data.Name ) && child.material.color ) { child.material.color.set( '#ffff00' ); }

		}

		//ISSsumDuplicateSurfaces.innerHTML= '';
		//divCRDInfo.innerHTML =
		//ISSdivDuplicateSurfaces.innerHTML= flowContent;

		const txt =

		`<details>

			<summary id = "ISSsumDuplicateSurfaces" >R12 Duplicate Coordinates &raquo; ` + count + `</summary>

			<div >Two surfaces with identical coordinates</div>

			<divs >` + flowContent + `</div>

		</details>`;

		return txt;

	};



	////////// Undefined CAD ID

	ISS.setPanelSurfacesUndefinedCadId = function( target ) {

		ISS.CadTypes = ISS.getCadObjectsTypes();
		ISS.surfacesUndefinedId = GBX.surfacesJson.filter( surfaceJson => surfaceJson.CADObjectId === undefined || surfaceJson.CADObjectId === '' );
		ISS.surfacesUndefinedId.forEach( surfaceJson => surfaceJson.addCADObjectId = true );

		for ( surfaceJson of ISS.surfacesUndefinedId) {

			if ( ISS.CadTypes.indexOf( surfaceJson.surfaceType ) < 0 ) {

				ISS.CadTypes.push( surfaceJson.surfaceType );

			}

			surfaceJson.CADObjectIdCandidate = surfaceJson.surfaceType;

		}
		//console.log( 'ISS.CadTypes', ISS.CadTypes );

		ISS.CadTypesOptions = ISS.CadTypes.map( item => `<option value="${item}" >${item}</option>` ).join('');

		const txt = 'CAD object ID undefined<br>';

		//ISS.surfacesUndefinedId.forEach( surface => surface.CADObjectId = 'undefined' );

		target.innerHTML =

		`<details>

			<summary id = "ISSsumSurfacesUndefinedCadId" >Undefined CAD Object IDs &raquo; ` + ISS.surfacesUndefinedId.length + ` found</summary>

			<p><small>Surfaces with undefined CAD Object ID. The default fix is to add a CAD Id that is the same as the surface type</small></p>

			<p>
				<button id=butSurfacesUndefinedCadId
					onclick=ISS.setSurfaceArrayVisibleToggle(butSurfacesUndefinedCadId,ISS.surfacesUndefinedId);
					>toggle all undefined</button>
			</p>

			<div id=ISSdivSurfacesUndefinedCadId ></div>

			<p><button onclick=ISS.setPopupCadObjectIds(); >Fix undefined CAD object IDs</button></P>

			<hr>

		</details>`;

		let item = {};
		item.attribute = 'idSurfacesUndefinedCadId';
		item.divAttributes = 'ISSdivSurfacesUndefinedCadIdAttributes';
		item.divTarget = document.getElementById( 'ISSdivSurfacesUndefinedCadId' );
		item.element = 'Surface';
		item.name = 'itemSurfacesUndefinedCadId';
		item.optionValues = ISS.surfacesUndefinedId.map( item => [ item.id, item.Name, item.CADObjectId ] );
		item.parent = ISS.surfacesUndefinedCadId;
		item.placeholder = 'surface id';
		item.selItem = 'ISSselSurfacesUndefinedCadId';

		ISS.itemSurfacesUndefinedCadId = SEL.getElementPanel( item );
		ISSselSurfacesUndefinedCadId.selectedIndex = 0;
		//ISSselSurfacesUndefinedCadId.click();

	};




	ISS.getCadObjectsTypes = function() {
		// combine with others
		const surfaces = GBX.gbjson.Campus.Surface;
		const cadIds = [];

		for ( let surface of surfaces ) {


			if ( !surface.CADObjectId || typeof surface.CADObjectId !== 'string' ) {

				CORdivLog.innerHTML += 'CADObjectId error: ' + surface.id + ' - ' + surface.Name + '<br>';

				continue;

			}

			const id = surface.CADObjectId.replace( / \[(.*?)\]/gi, '' ).trim();

			if ( !cadIds.includes( id ) ) {

				cadIds.push( id );

			}

		}
		//console.log( 'cadIds', cadIds );

		cadIds.sort();

		return cadIds;

		/*
		let options = '';

		for ( let id of cadIds ){

			options += '<option>' + id + '</option>';

		}
		//console.log( 'options', options );
		return options;

		*/

	};



	ISS.setPopupCadObjectIds = function() {

		CORdivItemsRight.innerHTML =
		`
			<h3>Fix Surfaces with undefined CAD object IDs</h3>

			<p><small>Surfaces with undefined CAD Object ID. The default fix is to add a CAD Id that is the same as the surface type</small></p>


			<div id=ISSdivCADObjectId ></div>

			<p>
				<button onclick=ISS.setPopupUndefinedIdCheck(false); >un-check all</button>

				<button onclick=ISS.setPopupUndefinedIdCheck(true); >check all</button>
			</p>

			<p>Need good test case: Select all of this type: <select>${ISS.CadTypesOptions}</select></p>

			<p>Need good test case: Edit selected items to <select>${ISS.CadTypesOptions}</select></p>

			<p>

				<button onclick=ISS.surfaceChanges.CADObjectId=[];ISS.setChangesCadObjectIds(); >Update changes</button>

				<button onclick=ISS.updateSurfaceCADObjectIds(ISS.surfaceChanges.CADObjectId) >Edit selected surfaces</button>

				<button onclick=CTX.saveFile(); >Save edits to file</button>

			</p>

			<h3>save changes file for surfaces with undefined CAD object IDs</h3>
			<textArea id=ISStxtSurfacesUndefinedCadId style="height:300px;width:100%;" ></textArea>

			<p>
				<button onclick=CTX.surfaceChanges.CADObjectId=ISS.surfaceChanges.CADObjectId >Update save changes file</button>

				<button onClick=butSaveChanges.click(); > View current changes</button>
			</p>
		`;

		COR.setRightMenuWide();

		ISS.setPopupPanelUndefinedId();

	};



	ISS.setPopupUndefinedIdCheck = function( bool ) {

		ISS.surfaceChanges.CADObjectId= [];
		ISS.surfacesUndefinedId.forEach( item => item.addCADObjectId = bool );
		ISS.setPopupPanelUndefinedId();

	};



	ISS.setPopupPanelUndefinedId = function(){

		//SEL.setMenuPanelCadObjectsByType2( ISSdivCadGroups, 'ISSselCadGroups' );

		let txt = '';

		if ( !ISS.surfaceChanges.CADObjectId ) { ISS.surfaceChanges.CADObjectId = []; }

		let count = 0;
		let color = 'yellow';


		let options = ISS.CadTypes.map( item => `<option value="${item}" ></option>` ).join('');

		//console.log( 'options', options );


		for ( let surface of ISS.surfacesUndefinedId ) {

			ISS.surfaceChanges.CADObjectId[ surface.Name ] = surface.Name;

			const check = surface.addCADObjectId ? 'checked' : '' ;

			color = color === 'yellow' ? 'pink' : 'yellow';

			/*
			if ( check ) {

				id = ISSselCadGroups.value;

				if ( !id ) {

					id = 'pokemon hiding space';

				}

				ISS.surfaceChanges.CADObjectId.push( {name: surface.Name, CADObjectId: id }  );

			}
			*/

			const butts = ISS.getButtonsSurfaceId( surface.id );

			txt +=
			`<div style=background-color:${color};padding-bottom:0.5rem >
				<input type=checkbox onchange=ISS.setCheckCadObjectIds("${surface.Name}",this); ${check} >

				<span style=display:inline-block;width:15rem; >${surface.Name}</span>
				id: ${butts} type: ${surface.surfaceType}<br>
				<label for=cadId${count} style=display:inline-block;margin-left:2rem; title="Click to select and edit" >CAD Id to add:</label>
				<input onClick=this.select(); onChange=ISS.setSurfaceCadType("${surface.Name}",this.value);
					list=cadGroups id=cadId${count++} value="${surface.surfaceType}" title="Click to select and edit" >
				<datalist id="cadGroups">${ISS.CadTypesOptions}</datalist>
			</div>`;

		}

		ISSdivCADObjectId.innerHTML = txt;

		ISS.setChangesCadObjectIds();

	};



	ISS.setSurfaceCadType = function( name, type ) {

		const surfaceJ = ISS.surfacesUndefinedId.find( element => element.Name === name );
		surfaceJ.CADObjectIdCandidate = type;

	};



	ISS.setCheckCadObjectIds = function( name, checkbox ) {

		//console.log( '', name, checkbox );
		const surfaceJ = ISS.surfacesUndefinedId.find( element => element.Name === name );
		surfaceJ.addCADObjectId = checkbox.checked;
		ISS.surfaceChanges.CADObjectId=[];

		ISS.setChangesCadObjectIds();

	};



	ISS.setChangesCadObjectIds = function() {
		//console.log( 'ISS.surfacesUndefinedId ', ISS.surfacesUndefinedId  );

		for ( surface of ISS.surfacesUndefinedId ) {

			if ( surface.addCADObjectId ) {

				ISS.surfaceChanges.CADObjectId.push( {name: surface.Name, CADObjectId: surface.CADObjectIdCandidate } );

			}

		}

		ISStxtSurfacesUndefinedCadId.value = JSON.stringify( ISS.surfaceChanges.CADObjectId, null, ' ' );


	};



	ISS.updateSurfaceCADObjectIds = function( idsArray ){

		console.log( 'idsArray', idsArray );

		//names = idsArray.map( item => item.name ).join( '\n' );

		//console.log( 'names', names );

		//const proceed = alert( 'Coming soon!\nUpdate surfaces: \n ' + names + '?' );

		surfacesGbxml = GBX.gbxml.getElementsByTagName( "Surface" );

		for ( item of idsArray ) {

			surfaceJson = GBX.surfacesJson.find( element => element.Name === item.name );

			//console.log( 'surfaceJson', surfaceJson);

			if ( surfaceJson ) {

				id =surfaceJson.id;
				//console.log( 'id', id );

				surfaceXml = surfacesGbxml[ id ];
				surfaceXml.setAttribute( "CADObjectId", item.CADObjectId );

				console.log( 'id', id,'\nsurface to edit', surfaceXml );


				// edit gbjson
				surfaceJson[ "CADObjectId" ] = item.CADObjectId;

				// edit three.js
				const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === id );
				surfaceMesh.userData.data.CADObjectId = item.CADObjectId;

			}

		}

	};



	//////////

	ISS.setPanelSurfacesTiny = function( target ) {

		const sizeDefault = window.ISSinpMinSize ? parseFloat( ISSinpMinSize.value ) : 20;

		const size = 0.01 * sizeDefault; // parseFloat( ISSinpMinSize.value );
		ISS.surfacesTiny = GBX.surfacesJson.filter( surface =>
			parseFloat( surface.RectangularGeometry.Height ) * parseFloat( surface.RectangularGeometry.Width  ) < size );

		target.innerHTML =

		`<details>

			<summary id = "ISSsumSurfacesTiny" >Tiny Surfaces &raquo; ` + ISS.surfacesTiny.length + ` found</summary>

			<p><small>Surfaces with area smaller than a minimum area.</small></p>

			<p>
				Set minimum area: <output id=ISSoutMinSize >` + size + `</output>
				<input id=ISSinpMinSize type=range min=0 max=100 value=20 step=1
				onchange=ISSoutMinSize.value=this.value*0.01;ISS.setPanelSurfacesTiny(ISSdetPanelSurfacesTiny); >
			</p>

			<div id=ISSdivSurfacesTiny ></div>

			<button onclick=SEL.setSurfaceZoom(ISSselSurfacesTiny.value); title="zoom into just this surface" >zoom</button>

			<hr>

		</details>`;

		let item = {};
		item.attribute = 'idTiny';
		item.divAttributes = 'ISSdivSurfacesTinyAttributes';
		item.divTarget = document.getElementById( 'ISSdivSurfacesTiny' );
		item.element = 'Surface';
		item.name = 'itemSurfacesTiny';
		item.optionValues = ISS.surfacesTiny.map( item => [ item.id, item.Name, item.CADObjectId  ] );
		item.parent = ISS.surfacesTiny;
		item.placeholder = 'surface id';
		item.selItem = 'ISSselSurfacesTiny';

		//console.log( 'item.optionValues', item.optionValues );

		SEL.itemSurfacesTiny = SEL.getElementPanel( item );
		ISSselSurfacesTiny.selectedIndex = 0;
		//ISSselSurfacesTiny.click();

	};



	ISS.setPanelSurfacesVertexClose = function( target ) {

		distanceDefault = window.ISSinpMinDistance ? parseFloat( ISSinpMinDistance.value ) : 20;

		const distance = 0.01 * distanceDefault;
		//console.log( 'distance', distance );

		ISS.surfacesVertexClose = [];

		//GBX.surfaceMeshes.children.forEach( child => child.visible = false );

		for ( let surface of GBX.surfaceMeshes.children ) {

			vertices = surface.geometry.vertices;

			if ( vertices.length > 4 ) {

				for ( i = 1; i <  vertices.length; i++ ) {

					if ( vertices[ i ].distanceTo( vertices[ i - 1 ] ) < distance ) {

						if ( ISS.surfacesVertexClose.indexOf( surface ) === -1 ) {

							ISS.surfacesVertexClose.push( surface )
							//surface.visible = true;
							//console.log( 'vertex', vertex );
						}

					}

				}

			}

		}

		target.innerHTML =

		`<details>

			<summary id = "ISSsumSurfacesVertexClose" >Very Close Vertices by Id &raquo; ` + ISS.surfacesVertexClose.length + ` found</summary>

			<p><small>
				Surfaces that have vertices closer than a minimum distance.
				Use telltales in right menu to identify the vertices.
			</small></p>

			<p>
				Set minimum distance: <output id=ISSoutMinDistance >` + distance + `</output><br>
				<input id=ISSinpMinDistance type=range min=0 max=100 value=` + distanceDefault + ` step=1
					onchange=ISS.setPanelSurfacesVertexClose(ISSdetPanelSurfacesVertexClose); >
			</p>

			<div id=ISSdivSurfacesVertexClose ></div>

			<button onclick=SEL.setSurfaceZoom(ISSselSurfacesVertexClose.value); title="zoom into just this surface" >zoom</button>

			<hr>

		</details>`;

		let item = {};
		item.attribute = 'idVertexClose';
		item.divAttributes = 'ISSdivSurfacesVertexCloseAttributes';
		item.divTarget = document.getElementById( 'ISSdivSurfacesVertexClose' );
		item.element = 'Surface';
		item.name = 'itemVertexClose';
		item.optionValues = ISS.surfacesVertexClose.map( element => [ element.userData.data.id, element.userData.data.Name, element.userData.data.CADObjectId ] );
		item.parent = ISS.surfaceJson;
		item.placeholder = 'surface id';
		item.selItem = 'ISSselSurfacesVertexClose';

		SEL.itemVertexClose = SEL.getElementPanel( item );
		ISSselSurfacesVertexClose.selectedIndex = 0;
		//ISSselSurfacesVertexClose.click();
	};



	ISS.setPanelOpeningVertices4Plus = function( target ) {

		//console.log( 'GBX.openings', GBX.openings );

		let items = [];

		ISS.OpeningVertices4Plus  = items;

		for ( opening of GBX.surfaceOpenings.children ) {

			if ( opening.userData.data.PlanarGeometry.PolyLoop.CartesianPoint.length > 4 ) {
				opening.Vertices = opening.userData.data.PlanarGeometry.PolyLoop.CartesianPoint.length;
				items.push( opening );

			}
		}

		let options = '';
		items.forEach( element => options += '<option value=' + element.id + ' >' + element.Name + '</option>' );
		options = options ? options : '<option>none found</option>';

		target.innerHTML =

		`<details id = "ISSdetOpeningVertices4Plus" >

			<summary >Opening Vertices > 4 &raquo; ` + items.length + ` found </summary>

			<div class=flex-container2 >

				<div class=flex-div1 >
					<select id=ISSselOpen size=` + ( items.length < 10 ? items.length : 10 ) +
						` onclick=SEL.setOpeningVisible(this.value);ISS.setPanelOpeningAttributes();
						onchange=SEL.setOpeningVisible(this.value);ISS.setPanelOpeningAttributes(); >` +
						options +
						`</select>
				</div>
				<div id = "ISSdivAttributes" class=flex-left-div2 ></div>

			</div>

		</details>`;

	};



	ISS.setPanelSurfaceTypeInvalid = function( target ) {

		ISS.surfaceTypeInvalid = GBX.surfacesJson.filter( element => GBX.surfaceTypes.indexOf( element.surfaceType ) < 0 );

		target.innerHTML =

		`<details>

			<summary id = "ISSsumSurfaceTypeInvalid" >Surface Type Invalid &raquo; ` + ISS.surfaceTypeInvalid.length + ` found</summary>

			<p><small>Surfaces with undefined surface type</small></p>

			<div id=ISSdivSurfaceTypeInvalid ></div>

			<button onclick=SEL.setSurfaceZoom(ISSselSurfaceTypeInvalid.value); title="zoom into just this surface" >zoom</button>

			<hr>

		</details>`;

		let item = {};
		item.attribute = 'IdSurfaceTypeInvalid';
		item.divAttributes = 'ISSdivSurfaceTypeInvalidAttributes';
		item.divTarget = document.getElementById( 'ISSdivSurfaceTypeInvalid' );
		item.element = 'Surface';
		item.name = 'itemSurfaceTypeInvalid';
		item.optionValues = ISS.surfaceTypeInvalid.map( item => [ item.id, item.Name, item.CADObjectId ] );
		item.parent = ISS.surfaceTypeInvalid;
		item.placeholder = 'surface id';
		item.selItem = 'ISSselSurfaceTypeInvalid';

		SEL.itemSurfaceTypeInvalid = SEL.getElementPanel( item );
		ISSselSurfaceTypeInvalid.selectedIndex = 0;
		//ISSselSurfaceTypeInvalid.click();

	};



	ISS.setPanelOpeningTypeInvalid = function( target ) {

		let openingTypes = [ 'FixedWindow', 'OperableWindow', 'FixedSkylight', 'OperableSkylight', 'SlidingDoor', 'NonSlidingDoor', 'Air' ];

		ISS.openings = [];

		for ( let i = 0; i < GBX.surfacesJson.length; i++ ) {

			const element = GBX.surfacesJson[ i ];

			if ( element.Opening ) {

				element.Opening = Array.isArray( element.Opening ) ? element.Opening : [ element.Opening ];

				ISS.openings.push( ...element.Opening );

			}

		}

		ISS.openingTypeInvalid = ISS.openings.filter( opening => !openingTypes.includes( opening.openingType ) );


		target.innerHTML =

		`<details>

			<summary id = "ISSsumOpeningTypeInvalid" >Opening Type Invalid &raquo; ` + ISS.openingTypeInvalid.length + ` found</summary>

			<p><small>Openings with invalid type</small></p>

			<div id=ISSdivOpeningTypeInvalid ></div>

			<button onclick=SEL.setSurfaceZoom(ISSselOpeningTypeInvalid.value); title="zoom into just this surface" >zoom</button>

			<hr>

		</details>`;

		let item = {};
		item.attribute = 'IdOpeningTypeInvalid';
		item.divAttributes = 'ISSdivOpeningTypeInvalidAttributes';
		item.divTarget = document.getElementById( 'ISSdivOpeningTypeInvalid' );
		item.element = 'Surface';
		item.name = 'itemOpeningTypeInvalid';
		item.optionValues = ISS.openingTypeInvalid.map( item => [ item.id, item.Name, item.CADObjectId ] );
		item.parent = ISS.openingTypeInvalid;
		item.placeholder = 'surface id';
		item.selItem = 'ISSselOpeningTypeInvalid';

		SEL.itemOpeningTypeInvalid = SEL.getElementPanel( item );
		ISSselOpeningTypeInvalid.selectedIndex = 0;
		//ISSselOpeningTypeInvalid.click();

	};



	ISS.setPanelAdjacentSpaceInvalid = function( target ) {

		ISS.adjacentSpaceInvalid = [];

		twoSpaces = ['Air', 'InteriorWall', 'InteriorFloor', 'Ceiling' ];
		oneSpace = [ 'ExteriorWall', 'Roof', 'ExposedFloor', 'UndergroundCeiling', 'UndergroundWall', 'UndergroundSlab',
			'RaisedFloor', 'SlabOnGrade', 'FreestandingColumn', 'EmbeddedColumn' ];

		for ( let i = 0; i < GBX.surfacesJson.length; i++ ) {

			surface = GBX.surfacesJson[ i ];

			if ( surface.surfaceType === 'Shade' && surface.AdjacentSpaceId !== undefined ) {
				//console.log( 'shade surface', surface );
				ISS.adjacentSpaceInvalid.push( surface );

			} else if ( twoSpaces.includes( surface.surfaceType ) && surface.AdjacentSpaceId.length !== 2 ) {

				//console.log( 'two space', surface );
				ISS.adjacentSpaceInvalid.push( surface );

			}else if ( oneSpace.includes( surface.surfaceType ) && ( !surface.AdjacentSpaceId || surface.AdjacentSpaceId.length ) ) {

				//console.log( 'one space', surface );
				ISS.adjacentSpaceInvalid.push( surface );

			} else {

				//console.log( 'ok surface', surface );
				//ISS.adjacentSpaceInvalid.push( surface );

			}

		}

		target.innerHTML =

		`<details>

			<summary id = "ISSsumAdjacentSpaceInvalid" >Adjacent Space Invalid &raquo; ` + ISS.adjacentSpaceInvalid.length + ` found</summary>

			<p><small>Surfaces with Invalid Adjacent Spaces</small></p>

			<div id=ISSdivAdjacentSpaceInvalid ></div>

			<button onclick=SEL.setSurfaceZoom(ISSselAdjacentSpaceInvalid.value); title="zoom into just this surface" >zoom</button>

			<hr>

		</details>`;

		let item = {};
		item.attribute = 'idAdjacentSpaceInvalid';
		item.divAttributes = 'ISSdivAdjacentSpaceInvalidAttributes';
		item.divTarget = document.getElementById( 'ISSdivAdjacentSpaceInvalid' );
		item.element = 'Surface';
		item.name = 'itemAdjacentSpaceInvalid';
		item.optionValues = ISS.adjacentSpaceInvalid.map( item => [ item.id, item.Name, item.CADObjectId ] );
		item.parent = ISS.adjacentSpaceInvalid;
		item.placeholder = 'surface id';
		item.selItem = 'ISSselAdjacentSpaceInvalid';

		SEL.itemAdjacentSpaceInvalid = SEL.getElementPanel( item );
		ISSselAdjacentSpaceInvalid.selectedIndex = 0;
		//ISSselAdjacentSpaceInvalid.click();

	};



	///////// test not needed / never found any

	ISS.getSurfacesInside = function() {

		ISS.surfacesInside = [];

		GBX.surfaceMeshes.children.forEach( child => child.visible = false );

		for ( let surface of GBX.surfaceMeshes.children ) {

			surface.geometry.computeBoundingBox();

			for ( let surface2 of GBX.surfaceMeshes.children ) {

				surface2.geometry.computeBoundingBox();

				if ( surface.userData.data.id !== surface2.userData.data.id && surface.position === surface2.position &&
					surface.geometry.boundingBox.containsBox( surface2.geometry.boundingBox ) ) {

					ISS.surfacesInside.push( [ surface, surface2 ])
					surface2.visible = true;
				}

			}

		}

		console.log( ISS.surfacesInside.length , ISS.surfacesInside );

		ISSsumSurfacesInside.innerHTML= 'Surfaces Inside Surfaces &raquo;  <span style=background-color:var(--highlight-color); >&nbsp;' + ISS.surfacesInside.length + ' found&nbsp;</span>';

		let txt = '';
		ISS.surfacesInside.forEach( function( element ) { txt += '<option>' + element.userData.data.id + '</option>'; } );
		console.log( 'txt', txt );
		ISSselSurfaceInside.innerHTML = txt ? txt : '<option>none found</option>';
		ISSselSurfaceInside.selectedIndex = 0;

	};



	////////// set Visible

	ISS.setSurfaceArrayVisibleToggle = function( button, surfaceArray ) {

		if ( button.style.fontStyle !== 'italic' ) {

			//console.log( 'surfaceArray', surfaceArray );

			GBX.surfaceOpenings.visible = false;

			let count = 0;

			if ( surfaceArray.length && surfaceArray[ 0 ].Name ) {

				GBX.surfaceOpenings.visible = false;
				GBX.surfaceMeshes.children.forEach( element => element.visible = false );

				for ( surface of surfaceArray ) {

					SEL.setSurfaceVisibleToggle( surface.id );

				}

			} else {

				GBX.surfaceMeshes.children.forEach( element =>
					{ element.visible = surfaceArray.includes( element.userData.data.Name ) ? true : false;
						count = element.visible ? count++ : count;
				} );
				//console.log( 'visible', count );
			}

			button.style.cssText = COR.buttonToggleCss;

		} else {

			GBX.setAllVisible();

			button.style.fontStyle = '';
			button.style.backgroundColor = '';
			button.style.fontWeight = '';

		}

	};



	ISS.setCadIdVisible = function( index ) {

		GBX.surfaceMeshes.children.forEach( element =>
			element.visible = element.userData.data.CADObjectId === ISS.surfaceAdjacentsDuplicates[ index ].cadId ? true : false );

	};



	ISS.setCadIdVisible2 = function( CADObjectId ) {

		const id = decodeURI( CADObjectId );
		GBX.surfaceMeshes.children.forEach( element =>
			element.visible = element.userData.data.CADObjectId === id ? true : false );

	};



	ISS.setDuplicateAdjacentSpaceVisibleToggle = function() {

		if ( ISSbutDuplicateAdjacent2.style.backgroundColor !== 'pink' ) {

			GBX.surfaceOpenings.visible = false;

			GBX.surfaceMeshes.children.forEach( child => child.visible = false );

			for ( let item of ISS.surfaceDuplicateAdjacentSpaces ) {

				const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === item.id );
				surfaceMesh.visible = true;

			}

			ISSbutDuplicateAdjacent2.style.backgroundColor = 'pink';

		} else {

			GBX.setAllVisible();

			ISSbutDuplicateAdjacent2.style.backgroundColor = '';

		}

	};



	/////////

	ISS.updateSurfaceUndefinedCadIdAttributes = function() {

		ISSdivSurfacesUndefinedAttributes.innerHTML = ISS.getGbjsonAttributes( ISS.surfacesUndefinedId[ ISSselSurfaceUndefined.selectedIndex ] );

		if ( window.HUD ) {
			HUD.updateSurface( ISSselSurfaceUndefined.value );
			HUD.setHeadsUp();
		}
	};



	ISS.updateSurfaceTinyAttributes = function() {

		const surface = ISS.surfacesTiny[ ISSselSurfaceTiny.selectedIndex ];
		height = parseFloat( surface.RectangularGeometry.Height );
		width = parseFloat( surface.RectangularGeometry.Width );
		area =  height * width;
		txt = ISS.getGbjsonAttributes( surface );

		ISSdivSurfacesTinyAttributes2.innerHTML =
			txt + '<br>' +
			'height: ' + height.toLocaleString() + '<br>' +
			'width: ' + width.toLocaleString() + '<br>' +
			'area: ' + area.toLocaleString() + '<br>' +
		'';

		if ( window.HUD != undefined ) {

			HUD.updateSurface( ISSselSurfaceTiny.value );
			HUD.setHeadsUp();

		}

	};



	ISS.updateSurfaceVertexCloseAttributes = function() {

		const surface = ISS.surfacesVertexClose[ ISSselSurfaceVertexClose.selectedIndex ];
		const vertices = surface.geometry.vertices;
		const distance = 0.01 * parseFloat( ISSinpMinDistance.value );

		let txt = ISS.getGbjsonAttributes( surface.userData.data ) + '<br>';

		for ( i = 1; i <  vertices.length; i++ ) {

			if ( vertices[ i ].distanceTo( vertices[ i - 1 ] ) < distance ) {
				//console.log( 'vv', vertices[ i ], vertices[ i ].distanceTo( vertices[ i - 1 ] ) );

				txt += 'Close coordinates: ' + ( i - 1 ) + ' and ' + i + ': ' +
				vertices[ i ].distanceTo( vertices[ i - 1 ] ) + '<br>';

			}

		}

		ISSdivSurfacesVertexCloseAttributes.innerHTML =
			txt + '<br>' +

		'';

		if ( window.HUD ) {

			HUD.updateSurface( ISSselSurfaceVertexClose.value );
			HUD.setHeadsUp();

		}

	};



	ISS.setPanelSurfaceTypeAttributes = function( id ) {

		opening = ISS.openingTypeInvalid.find( item => item.id === id );

		ISSdivOpeningTypeInvalid.innerHTML = SEL.traverseGbjson( opening ).attributes;

	};



	ISS.setPanelOpeningAttributes = function() {

		let item = GBX.openings.find( element => element.id === ISSselOpen.value );

		//const attributes = SEL.getGbjsonAttributes( item );

		//ISSdivAttributes.innerHTML = ( ISSselOpen.selectedIndex + 1 ) + '.<br>' + attributes;

		SEL.setGbjsonAttributes( item, ISSdivOpeningTypeInvalid, 'opening' );

	};



	ISS.setPanelAdjacentSpaceAttributes = function( id ) {

		console.log( 'id', id );
		const surface = ISS.adjacentSpaceInvalid.find( item => item.id === id );
		console.log( 'surface', surface );

		ISSdivAdjacentSpaceInvalid.innerHTML = SEL.traverseGbjson( surface ).attributes;

	}

	//////////


	ISS.getGbjsonAttributes = function( obj ) {

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

	};



	ISS.deleteSurfaces = function( namesArray ) {

		//console.log( 'namesArray', namesArray );
		//const id = HUDselSurfaceId.value;

		const proceed = confirm( 'OK to delete surfaces: ' + namesArray + '?' );

		if ( !proceed ){ return; }

		if ( !CTX.surfaceChanges.deletes ) { CTX.surfaceChanges.deletes = []; }

		surfacesGbxml = GBX.gbxml.getElementsByTagName( "Surface" );

		for ( name of namesArray ) {

			// remove from gbxml
			surfaceJson = GBX.surfacesJson.find( item => item.Name === name );

			if ( surfaceJson ) {

				id =surfaceJson.id;
				//console.log( 'id', id );

				surfaceXml = surfacesGbxml[ id ];

				console.log( 'id', id,'\nsurface to delete', surfaceXml );

				surfaceXml.remove();

				// remove from gbjson
				GBX.surfacesJson = GBX.surfacesJson.filter( element => element.id != id );
				//console.log( 'GBX.surfacesJson', GBX.surfacesJson );

				// remove from three.js
				const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === id );
				GBX.surfaceMeshes.remove( surfaceMesh );

			}

		}

	};



	ISS.getButtonsSurfaceId = function( id ) {

		const txt =
		`
			<span class=attributeTitle >id</span>:
			<button onclick=SEL.setSurfaceVisible("${id}"); >${id}</button>
			<button onclick=SEL.setSurfaceZoom("${id}"); >&#8981;</button>
			<button onclick=SEL.setSurfaceVisibleToggle("${id}"); ><img src="../assets/eye.png" height=12></button>
		`;

		return txt;

	};



	ISS.initIssues();