/*global

THR, THREE, GBP, ISS, window, document,butSettings, detSettings,divMenuItems,rngOpacity,rngViewExplodeVertical

*/

// Copyright 2018 Ladybug Tools authors. MIT License

	//GBP.defaultURL = '../../gbxml-sample-files/columbia-sc-two-story-education-trane.xml';

	var ISS = {};

	var spaceId1;
	var spaceId2;

	// call at bottom of file

	ISS.initIssues = function () {

		if ( window.butMenuLoad ) {

			ISS.butMenuIssues = butMenuLoad;

			ISS.title = 'gv-ISS - gbXML Viewer Issues';;
			document.title = ISS.title;
			aDocumentTitle.innerHTML = ISS.title;
			ISS.butMenuIssues.innerHTML = ISS.title;


		} else {

			divPopUp.style.display = 'none';
			ISS.butMenuIssues = butIssues;

		}

		THR.controls.autoRotate = false;
		THR.controls.keys = false;

		if ( ISS.butMenuIssues.style.fontStyle !== 'italic' ) {

			ISS.getMenuItems();

			ISS.butMenuIssues.style.cssText = 'background-color: pink !important; font-style: italic; font-weight: bold';

		} else {

			divMenuItems.innerHTML = '';

			ISS.butMenuIssues.style.backgroundColor = '';
			ISS.butMenuIssues.style.fontStyle = '';
			ISS.butMenuIssues.style.fontWeight = '';

		}

	};


	ISS.getMenuItems = function() {

		divMenuItems.innerHTML =

		`<details id = ISSdetIssues  class=app-menu open >

			<summary>Issues</summary>

			<div id=ISSdetPanelVisibilityToggle ></div>

			<div id = "ISSdetPanelMetadataIssues" ></div>

			<div id=ISSdetPanelSurfacesDuplicateAdjacentSpaces2 ></div>

			<div id=ISSdetPanelSurfacesDuplicateAdjacentSpaces ></div>

			<div id=ISSdetPanelSurfacesDuplicateCoordinates2 ></div>

			<div id=ISSdetPanelSurfacesDuplicateCoordinates ></div>

			<div id=ISSdetPanelSurfacesUndefinedCadId ></div>

			<div id=ISSdetPanelSurfacesTiny ></div>

			<div id=ISSdetPanelSurfacesVertexClose ></div>

			<div id=ISSdetPanelOpeningVertices4Plus ></div>

			<div id=ISSdetPanelSurfaceTypeInvalid ></div>

			<div id=ISSdetPanelOpeningTypeInvalid ></div>

			<div id=ISSdetPanelAdjacentSpaceInvalid ></div>

			<!--

			<details>

				<summary id = "ISSsumSurfacesXXX" >Surfaces XXX</summary>

				<div >Surfaces that are XXX</div>
				Minimum size <output id=ISSoutMinSize >0.5</output>
				<input id=ISSinpMinSize type=range min=0 max=100 value=50 step=1 onchange=ISSoutMinSize.value=this.value*0.01;ISS.getSurfacesTiny(); >
				<div class=flex-container2 >
					<div class=flex-div1 >
						<input oninput=GBI.setSelectedIndex(this,ISSselSurfaceXXX); size=6 placeholder="surface id" ><br>
						<select id = "ISSselSurfaceXXX"
						onclick=GBI.setSurfaceVisible(this.value);ISS.updateSurfaceXXXAttributes();
						onchange=GBI.setSurfaceVisible(this.value);ISS.updateSurfaceXXXAttributes(); size=10 ></select><br>
						<button onclick=GBI.setSurfaceZoom(ISSselSurfaceXXX.value); title="zoom into just this surface" >zoom</button>
					</div>
					<div id = "ISSdivSurfacesXXXAttributes" class=flex-left-div2 ></div>
				</div>

				<div id=ISSdivSurfacesTiny ></div>

			</details>

			<details>

				<summary id = "ISSsumSurfacesInside" >Surfaces Inside Surfaces</summary>

				<div >Surfaces that are inside another surface</div>

				<div class=flex-container2 >
					<div class=flex-div1 >
						<input oninput=GBI.setSelectedIndex(this,ISSselSurfaceInside); size=6 placeholder="surface id" ><br>
						<select id = "ISSselSurfaceInside"
						onclick=GBI.setSurfaceVisible(this.value);ISS.updateSurfaceInsideAttributes(); onchange=GBI.setSurfaceVisible(this.value);ISS.updateSurfaceInsideAttributes(); size=10 ><option>none found</option></select><br>
						<button onclick=GBI.setSurfaceZoom(ISSselSurfaceTiny.value); title="zoom into just this surface" >zoom</button>
					</div>
					<div id = "ISSdivSurfacesInsideAttributes" class=flex-left-div2 ></div>
				</div>

				<div id=ISSdivSurfacesInside ></div>

			</details>
			-->

			<hr>

		</details>`;

		//` + divMenuItems.innerHTML;

		//ISSdetPanelVisibilityToggle.innerHTML = GBI.getPanelShowHide(); //ISS.getPanelVisibilityToggle();
		GBI.setPanelShowHide( ISSdetPanelVisibilityToggle );

		ISS.setPanelMetadataIssues( ISSdetPanelMetadataIssues );


		ISS.setPanelSurfacesDuplicateAdjacentSpaces( ISSdetPanelSurfacesDuplicateAdjacentSpaces2 );

		ISSdetPanelSurfacesDuplicateAdjacentSpaces.innerHTML = ISS.getPanelSurfacesDuplicateAdjacentSpaces();


		ISS.setPanelSurfacesDuplicateCoordinates( ISSdetPanelSurfacesDuplicateCoordinates2 );

		ISSdetPanelSurfacesDuplicateCoordinates.innerHTML = ISS.getPanelSurfacesDuplicateCoordinates();


		//ISSdetPanelSurfacesUndefinedCadId.innerHTML = ISS.getPanelSurfacesUndefinedCadId();

		ISS.setPanelSurfacesUndefinedCadId( ISSdetPanelSurfacesUndefinedCadId );

		ISS.setPanelSurfacesTiny( ISSdetPanelSurfacesTiny );

		ISS.setPanelSurfacesVertexClose( ISSdetPanelSurfacesVertexClose );

		ISS.setPanelOpeningVertices4Plus( ISSdetPanelOpeningVertices4Plus );

		ISS.setPanelSurfaceTypeInvalid( ISSdetPanelSurfaceTypeInvalid );

		ISS.setPanelOpeningTypeInvalid( ISSdetPanelOpeningTypeInvalid );

		ISS.setPanelAdjacentSpaceInvalid( ISSdetPanelAdjacentSpaceInvalid );

	};



	ISS.setPanelMetadataIssues = function( target ) {

		const required = [ 'areaUnit', 'lengthUnit', 'temperatureUnit', 'useSIUnitsForResults', 'version', 'volumeUnit', 'xmlns' ];

		let provided = [];
		let missing = [];
		let count = 0;

		for ( property in GBP.gbjson ) {

			//provided.push( property );

			if ( required.includes( property) ) {

				count++
				provided.push( property );

			} else {


			}

		}
		//console.log( 'provided', provided );

		target.innerHTML =
		`<details>

			<summary>Metadata Issues</summary>

			<p>gbXML attributes provided:<br>` + provided.join( ', ' ) + `</p>

			<div>Missing: ` + ( required.length - count ) + `</div>

		</details>`;

	};



	ISS.setPanelSurfacesDuplicateAdjacentSpaces = function( target ) {

		surfaces = GBP.gbjson.Campus.Surface;
		let count = 0;
		let contents = '';
		ISS.surfaceAdjacentsDuplicates2 = [];

		for ( let surface of surfaces ) {

			const adjacencies = surface.AdjacentSpaceId;

			if ( Array.isArray( adjacencies ) === true && JSON.stringify( adjacencies[ 0 ] ) === JSON.stringify( adjacencies[ 1 ] ) ) {

				//ISS.surfaceAdjacentsDuplicates2.push( { id: surface.id, cadId: surface.CADObjectId } );
				ISS.surfaceAdjacentsDuplicates2.push( surface );

			}

		}

		ISS.surfaceAdjacentsDuplicates2.sort( ( aSurf, bSurf ) => {
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

			<summary id = "ISSsumSurfacesDuplicateAdjacentSpaces2" >R13 Duplicate Adjacent Space &raquo; ` + ISS.surfaceAdjacentsDuplicates2.length + ` found</summary>

			<p><small>
				Surfaces with two adjacent spaces pointing to identical space ids.
			</small></p>

			<p>
				<button id=ISSbutDuplicateAdjacent2 onclick=ISS.setDuplicateAdjacentSpaceVisibleToggle(); >toggle all duplicate adjacent spaces</button>
			</p>

			<div id=ISSdivSurfacesDuplicateAdjacentSpaces2 ></div>

			<button onclick=GBI.setSurfaceZoom(ISSselSurfaceAdjacentsDuplicates2.value); title="zoom into just this surface" >zoom</button>

			<hr>

		</details>`;

		let item = {};
		item.attribute = 'idDuplicateAdjacent';
		item.divAttributes = 'ISSdivISSdivSurfacesDuplicates2';
		item.divTarget = document.getElementById( 'ISSdivSurfacesDuplicateAdjacentSpaces2' );
		item.element = 'Surface';
		item.name = 'itemDuplicateAdjacent2';
		item.optionValues = ISS.surfaceAdjacentsDuplicates2.map( item => [ item.id, item.Name, item.CADObjectId ] );
		item.parent = surfaces; // ISS.surfaceAdjacentsDuplicates;
		item.placeholder = 'surface id';
		item.selItem = 'ISSselSurfaceAdjacentsDuplicates2';

		GBI.itemDuplicateAdjacent2 = GBI.setElementPanel2( item );
		console.log( 'GBI.itemDuplicateAdjacent2', GBI.itemDuplicateAdjacent2 );
		ISSselSurfaceAdjacentsDuplicates2.selectedIndex = 0;
		ISSselSurfaceAdjacentsDuplicates2.click();

	};



	ISS.getPanelSurfacesDuplicateAdjacentSpaces = function() {

		surfaces = GBP.gbjson.Campus.Surface;
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
				` <button onclick=GBI.setSurfaceVisible(this.innerText); >` + surface.id + `</button>
				<button onclick=GBI.setSurfaceZoom("` + surface.id + `"); >zoom</button>
				<button class=toggle onclick=GBI.setSurfaceTypeVisible(this.innerText); >` + surface.surfaceType + `</button><br>`
				+ ( surface.Name ? `name <i>` + surface.Name + `</i><br>` : `` )
				+ ( surface.CADObjectId ? `cad object id <button onclick=ISS.setCadIdVisible(` + ( count - 1 ) + `); >` + surface.CADObjectId + `</button><br>` : `` ) +
				`area <i>` + Number( surfaceArea ).toFixed( 1 ) + `</i>` +
				` length <i>` + height.toFixed( 3 ) + `</i> width <i>` + width.toFixed( 3 ) + `</i>
			</div>`;

			surfaceMesh = GBP.surfaceMeshes.children.find( element => element.userData.data.id === item.id );
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



	ISS.setPanelSurfacesDuplicateCoordinates = function( target ) {


		const surfacePolyLoops = [];
		const surfaceIds = [];
		ISS.surfaceDuplicateCoordinates = [];

		let spaceIdOther1;
		let spaceIdOther2;

		const surfaces = GBP.surfaceJson;


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
				ISS.surfaceDuplicateCoordinates.push( surface );

			}

		}

		target.innerHTML =

		`<details>

			<summary id = "ISSsumSurfacesDuplicateCoordinates2" >R13 Duplicate Coordinates &raquo; ` + ISS.surfaceDuplicateCoordinates.length + ` found</summary>

			<p><small>
				Two surfaces with identical coordinates
			</small></p>

			<p>
				<button id=butDuplicatesCoordinates2 onclick=ISS.setSurfaceArrayVisibleToggle(butDuplicatesCoordinates2,ISS.surfaceDuplicateCoordinates); >toggle all duplicates</button>
			</p>

			<div id=ISSdivSurfacesDuplicateCoordinates2 ></div>

			<button onclick=GBI.setSurfaceZoom(ISSselSurfacesDuplicateCoordinates2.value); title="zoom into just this surface" >zoom</button>

			<hr>

		</details>`;

		let item = {};
		item.attribute = 'idDuplicateCoordinates';
		item.divAttributes = 'ISSdivISSdivSurfacesDuplicateCoordinatesAttributes2';
		item.divTarget = document.getElementById( 'ISSdivSurfacesDuplicateCoordinates2' );
		item.element = 'Surface';
		item.name = 'itemDuplicateCoordinates';
		item.optionValues = ISS.surfaceDuplicateCoordinates.map( item => [item.id, item.Name, item.CADObjectId  ] );
		item.parent = surfaces; // ISS.surfaceAdjacentsDuplicates;
		item.placeholder = 'surface id';
		item.selItem = 'ISSselSurfacesDuplicateCoordinates2';

		GBI.itemDuplicateCoordinates = GBI.setElementPanel2( item );
		ISSselSurfacesDuplicateCoordinates2.selectedIndex = 0;
		ISSselSurfacesDuplicateCoordinates2.click();

	};



	ISS.getPanelSurfacesDuplicateCoordinates = function() {

		const surfacePolyLoops = [];
		const surfaceIds = [];
		surfaceCoordinateDuplicates = [];

		let spaceIdOther1;
		let spaceIdOther2;

		const surfaces = GBP.surfaceJson;
		const b = '<br>';

		let count = 0;
		let flowContent =
			'<p>' +

				'<button id=butDuplicatesCoordinates onclick=ISS.setSurfaceArrayVisibleToggle(butDuplicatesCoordinates,surfaceCoordinateDuplicates); >toggle all duplicates</button>' +

				'<button onclick=ISS.saveFile(); title="creates a new file with the changes" >save edits</button>' +

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
						count + '. id: <button onclick=GBI.setSurfaceVisible(this.innerText); >' + surface.id + '</button>' +
							'<button onclick=GBI.setSurfaceZoom("' + surface.id + '"); >zoom</button>' + b +
						'surface type: <button class=toggle onclick=GBI.setSurfaceTypeVisible(this.innerText); >' + surface.surfaceType + '</button>: ' + b +
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
						'id of duplicate: <button onclick=GBI.setSurfaceVisible(this.innerText); >' + surfaceOther.id + '</button>' +
							'<button onclick=GBI.setSurfaceZoom("' + surfaceOther.id + '"); >zoom</button>' + b +
						'surface type: <button class=toggle onclick=GBI.setSurfaceTypeVisible(this.innerText); >' + surfaceOther.surfaceType + '</button>: ' + b +
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

		for ( let child of GBP.surfaceMeshes.children ) {

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



	ISS.setPanelSurfacesUndefinedCadId = function( target ) {

		ISS.surfacesUndefinedId = GBP.surfaceJson.filter( element => element.CADObjectId === undefined || element.CADObjectId === '' );

		/*

		let options = '';
		ISS.surfacesUndefinedId.forEach( function( element ) { options += '<option>' + element.id + '</option>'; } );
		options = options ? options : '<option>none found</option>';

		const details =
		`<details>

			<summary id = "ISSsumSurfacesUndefinedCadId" >Undefined CAD Object IDs &raquo; ` + ISS.surfacesUndefinedId.length + ` found</summary>

			<div >Surfaces with undefined ID</div>

			<div class=flex-container2 >
				<div class=flex-div1 >
					<input oninput=GBI.setSelectedIndex(this,ISSselSurfaceUndefined); size=6 placeholder="surface id" ><br>
					<select id = "ISSselSurfaceUndefined"
						onclick=GBI.setSurfaceVisible(this.value);ISS.updateSurfaceUndefinedCadIdAttributes();
						onchange=GBI.setSurfaceVisible(this.value);ISS.updateSurfaceUndefinedCadIdAttributes(); size=10 >` +
						options + `
						</select><br>
					<button onclick=GBI.setSurfaceZoom(ISSselSurfaceUndefined.value); title="zoom into just this surface" >zoom</button>
					</div>
				<div id = "ISSdivSurfacesUndefinedAttributes" class=flex-left-div2 ></div>
			</div>

			<div id=ISSdivSurfacesUndefinedCadId ></div>

			<hr>

		</details>`;

		return details;
		*/


		target.innerHTML =

		`<details>

			<summary id = "ISSsumSurfacesUndefinedCadId" >Undefined CAD Object IDs &raquo; ` + ISS.surfacesUndefinedId.length + ` found</summary>

			<p><small>Surfaces with undefined CAD Object ID</small></p>

			<div id=ISSdivSurfacesUndefinedCadId ></div>

			<button onclick=GBI.setSurfaceZoom(ISSselSurfacesUndefinedCadId.value); title="zoom into just this surface" >zoom</button>

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

		GBI.itemSurfacesUndefinedCadId = GBI.setElementPanel2( item );
		ISSselSurfacesUndefinedCadId.selectedIndex = 0;
		ISSselSurfacesUndefinedCadId.click();

	};



	ISS.setPanelSurfacesTiny = function( target ) {

		const sizeDefault = window.ISSinpMinSize ? parseFloat( ISSinpMinSize.value ) : 20;

		const size = 0.01 * sizeDefault; // parseFloat( ISSinpMinSize.value );
		ISS.surfacesTiny = GBP.surfaceJson.filter( surface =>
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

			<button onclick=GBI.setSurfaceZoom(ISSselSurfacesTiny.value); title="zoom into just this surface" >zoom</button>

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

		GBI.itemSurfacesTiny = GBI.setElementPanel2( item );
		ISSselSurfacesTiny.selectedIndex = 0;
		ISSselSurfacesTiny.click();

	};



	ISS.setPanelSurfacesVertexClose = function( target ) {

		distanceDefault = window.ISSinpMinDistance ? parseFloat( ISSinpMinDistance.value ) : 20;

		const distance = 0.01 * distanceDefault;
		//console.log( 'distance', distance );

		ISS.surfacesVertexClose = [];

		//GBP.surfaceMeshes.children.forEach( child => child.visible = false );

		for ( let surface of GBP.surfaceMeshes.children ) {

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

			<button onclick=GBI.setSurfaceZoom(ISSselSurfacesVertexClose.value); title="zoom into just this surface" >zoom</button>

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

		GBI.itemVertexClose = GBI.setElementPanel2( item );
		ISSselSurfacesVertexClose.selectedIndex = 0;
		ISSselSurfacesVertexClose.click();
	};



	ISS.setPanelOpeningVertices4Plus = function( target ) {

		//console.log( 'GBP.openings', GBP.openings );

		let items = [];

		ISS.OpeningVertices4Plus  = items;

		for ( opening of GBP.openings ) {

			if ( opening.PlanarGeometry.PolyLoop.CartesianPoint.length > 4 ) {
				opening.Vertices = opening.PlanarGeometry.PolyLoop.CartesianPoint.length;
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
						` onclick=GBI.setOpeningVisible(this.value);ISS.setPanelOpeningAttributes();
						onchange=GBI.setOpeningVisible(this.value);ISS.setPanelOpeningAttributes(); >` +
						options +
						`</select>
				</div>
				<div id = "ISSdivAttributes" class=flex-left-div2 ></div>

			</div>

		</details>`;

	};



	ISS.setPanelSurfaceTypeInvalid = function( target ) {

		ISS.surfaceTypeInvalid = GBP.surfaceJson.filter( element => GBP.surfaceTypes.indexOf( element.surfaceType ) < 0 );

		target.innerHTML =

		`<details>

			<summary id = "ISSsumSurfaceTypeInvalid" >Surface Type Invalid &raquo; ` + ISS.surfaceTypeInvalid.length + ` found</summary>

			<p><small>Surfaces with undefined surface type</small></p>

			<div id=ISSdivSurfaceTypeInvalid ></div>

			<button onclick=GBI.setSurfaceZoom(ISSselSurfaceTypeInvalid.value); title="zoom into just this surface" >zoom</button>

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

		GBI.itemSurfaceTypeInvalid = GBI.setElementPanel2( item );
		ISSselSurfaceTypeInvalid.selectedIndex = 0;
		ISSselSurfaceTypeInvalid.click();

	};



	ISS.setPanelOpeningTypeInvalid = function( target ) {

		let openingTypes = [ 'FixedWindow', 'OperableWindow', 'FixedSkylight', 'OperableSkylight', 'SlidingDoor', 'NonSlidingDoor', 'Air' ];

		ISS.openings = [];

		for ( let i = 0; i < GBP.surfaceJson.length; i++ ) {

			const element = GBP.surfaceJson[ i ];

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

			<button onclick=GBI.setSurfaceZoom(ISSselOpeningTypeInvalid.value); title="zoom into just this surface" >zoom</button>

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

		GBI.itemOpeningTypeInvalid = GBI.setElementPanel2( item );
		ISSselOpeningTypeInvalid.selectedIndex = 0;
		ISSselOpeningTypeInvalid.click();

	};



	ISS.setPanelAdjacentSpaceInvalid = function( target ) {

		ISS.adjacentSpaceInvalid = [];

		twoSpaces = ['Air', 'InteriorWall', 'InteriorFloor', 'Ceiling' ];
		oneSpace = [ 'ExteriorWall', 'Roof', 'ExposedFloor', 'UndergroundCeiling', 'UndergroundWall', 'UndergroundSlab',
			'RaisedFloor', 'SlabOnGrade', 'FreestandingColumn', 'EmbeddedColumn' ];

		for ( let i = 0; i < GBP.surfaceJson.length; i++ ) {

			surface = GBP.surfaceJson[ i ];

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

			<button onclick=GBI.setSurfaceZoom(ISSselAdjacentSpaceInvalid.value); title="zoom into just this surface" >zoom</button>

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

		GBI.itemAdjacentSpaceInvalid = GBI.setElementPanel2( item );
		ISSselAdjacentSpaceInvalid.selectedIndex = 0;
		ISSselAdjacentSpaceInvalid.click();

	};



	///////// test not needed / never found any

	ISS.getSurfacesInside = function() {

		ISS.surfacesInside = [];

		GBP.surfaceMeshes.children.forEach( child => child.visible = false );

		for ( let surface of GBP.surfaceMeshes.children ) {

			surface.geometry.computeBoundingBox();

			for ( let surface2 of GBP.surfaceMeshes.children ) {

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

		if ( button.style.backgroundColor !== 'var( --but-bg-color )' ) {
			count = 0;
			GBP.surfaceMeshes.children.forEach( element =>
				{ element.visible = surfaceArray.includes( element.userData.data.Name ) ? true : false; count = element.visible ? count++ : count;} );
				console.log( '', count );

			button.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			GBP.setAllVisible();

			button.style.backgroundColor = '';

		}

	};



	ISS.setCadIdVisible = function( index ) {

		GBP.surfaceMeshes.children.forEach( element =>
			element.visible = element.userData.data.CADObjectId === ISS.surfaceAdjacentsDuplicates[ index ].cadId ? true : false );

	};



	ISS.setCadIdVisible2 = function( CADObjectId ) {

		const id = decodeURI( CADObjectId );
		GBP.surfaceMeshes.children.forEach( element =>
			element.visible = element.userData.data.CADObjectId === id ? true : false );

	};



	ISS.setDuplicateAdjacentSpaceVisibleToggle = function() {

		if ( ISSbutDuplicateAdjacent.style.backgroundColor !== 'pink' ) {

			GBP.surfaceMeshes.children.forEach( child => child.visible = false );

			for ( let item of ISS.surfaceAdjacentsDuplicates ) {

				const surfaceMesh = GBP.surfaceMeshes.children.find( element => element.userData.data.id === item.id );
				surfaceMesh.visible = true;

			}

			ISSbutDuplicateAdjacent.style.backgroundColor = 'pink';

		} else {

			GBP.setAllVisible();

			ISSbutDuplicateAdjacent.style.backgroundColor = '';

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

		ISSdivOpeningTypeInvalid.innerHTML = GBI.traverseGbjson( opening ).attributes;

	}



	ISS.setPanelOpeningAttributes = function() {

		let item = GBP.openings.find( element => element.id === ISSselOpen.value );

		//const attributes = GBI.getGbjsonAttributes( item );

		//ISSdivAttributes.innerHTML = ( ISSselOpen.selectedIndex + 1 ) + '.<br>' + attributes;

		GBI.setGbjsonAttributes( item, ISSdivOpeningTypeInvalid, 'opening' );

	};


	ISS.setPanelAdjacentSpaceAttributes = function( id ) {

		console.log( 'id', id );
		surface = ISS.adjacentSpaceInvalid.find( item => item.id === id );
		console.log( 'surface', surface );

		ISSdivAdjacentSpaceInvalid.innerHTML = GBI.traverseGbjson( surface ).attributes;

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



	ISS.initIssues();