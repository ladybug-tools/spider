/*global

THR, THREE, GBX, GBV, window, document,butSettings, detSettings,divMenuItems,rngOpacity,rngViewExplodeVertical

*/

// Copyright 2018 Ladybug Tools authors. MIT License

	GBX.defaultURL = '../../gbxml-sample-files/columbia-sc-two-story-education-trane.xml';

	var telltale;

	var ISS = {};


	ISS.initIssues = function () {

		if ( window.butMenuLoad ) {

			ISS.butMenuIssues = butMenuLoad;

			ISS.title = 'gv-ISS - gbXML Viewer Issues';;
			document.title = ISS.title;
			aDocumentTitle.innerHTML = ISS.title;
			ISS.butMenuIssues.innerHTML = ISS.title;

		} else {

			ISS.butMenuIssues = butIssues;

		}


		if ( ISS.butMenuIssues.style.backgroundColor !== 'var( --but-bg-color )' ) {

			divMenuItems.innerHTML =

				`<details id = ISSdetIssues  class=app-menu open>

					<summary>Issues</summary>

					<details>

						<summary id = "ISSsumDuplicateAdjacentSpaces" >Duplicate Adjacent Spaces</summary>

						<p>
							Surfaces with two adjacent spaces pointing to identical space id. Use with heads-up display.
						</p>

						<p>
							toggles <br><button onclick=GBX.surfaceMeshes.visible=!GBX.surfaceMeshes.visible; >surfaces</button>
							<button onclick=GBX.surfaceEdges.visible=!GBX.surfaceEdges.visible; >edges</button>
							<button onclick=GBV.setAllVisible(); >all visible</button>
						</p>

						<p>
							<button id=ISSbutDuplicateAdjacent onclick=ISS.toggleDuplicateAdjacent(); >toggle all duplicate adjacent spaces</button>
						</p>

						<hr>

						<div id=ISSdivAdjacents ></div>

					</details>

					<details>

						<summary id = "ISSsumDuplicateSurfaces" >Duplicate Surfaces</summary>

						<div id=divCRDInfo ></div>

						<p>
							toggle visibility<br>
							<button onclick=GBX.surfaceMeshes.visible=!GBX.surfaceMeshes.visible; >surfaces</button>
							<button onclick=GBX.surfaceEdges.visible=!GBX.surfaceEdges.visible; >edges</button>
							<button onclick=GBV.setAllVisible(); >all visible</button>
						</p>

						<div id=divCoordinates ></div>

					</details>
					<hr>
				</details>

			` + divMenuItems.innerHTML;

			ISS.getSurfaceDuplicatesAdjacents();

			getSurfaceDuplicatesCoordinates();

			ISS.butMenuIssues.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			ISSdetIssues.remove();

			ISS.butMenuIssues.style.backgroundColor = '';

		}

	};



	ISS.getSurfaceDuplicatesAdjacents = function() {

		surfaces = GBX.gbjson.Campus.Surface;
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
				` <button onclick=GBV.showSurface(this.innerText); >` + surface.id + `</button>
				<button onclick=GBV.zoomIntoSurface("` + surface.id + `"); >zoom</button>
				<button class=toggle onclick=GBV.showSurfaceType(this.innerText); >` + surface.surfaceType + `</button><br>`
				+ ( surface.Name ? `name <i>` + surface.Name + `</i><br>` : `` )
				+ ( surface.CADObjectId ? `cad object id <button onclick=ISS.showCadId(` + ( count - 1 ) + `); >` + surface.CADObjectId + `</button><br>` : `` ) +
				`area <i>` + Number( surfaceArea ).toFixed( 1 ) + `</i>` +
				` length <i>` + height.toFixed( 3 ) + `</i> width <i>` + width.toFixed( 3 ) + `</i>
			</div>`;

			surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === item.id );
			surfaceMesh.material.color.set( '#c080ff' );
		}

		ISSsumDuplicateAdjacentSpaces.innerHTML= 'Duplicate Adjacents &raquo;  <span style=background-color:var(--highlight-color); >&nbsp;' + count + ' found&nbsp;</span>';

		ISSdivAdjacents.innerHTML= contents;

	}



	ISS.toggleDuplicateAdjacent = function() {

		if ( ISSbutDuplicateAdjacent.style.backgroundColor !== 'var( --but-bg-color )' ) {

			GBX.surfaceMeshes.children.forEach( child => child.visible = false );

			for ( let item of ISS.surfaceAdjacentsDuplicates ) {

				const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === item.id );
				surfaceMesh.visible = true;

			}

			ISSbutDuplicateAdjacent.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			GBV.setAllVisible();

			ISSbutDuplicateAdjacent.style.backgroundColor = '';

		}

	}



	ISS.showCadId = function( index ) {

		GBX.surfaceMeshes.children.forEach( element =>
			element.visible = element.userData.data.CADObjectId === ISS.surfaceAdjacentsDuplicates[ index ].cadId ? true : false );

	};



	function getSurfaceDuplicatesCoordinates() {

		const surfacePolyLoops = [];
		const surfaceIds = [];
		surfaceCoordinateDuplicates = [];

		//let spaceId1;
		//let spaceId2;

		const surfaces = GBX.surfaceJson;
		const b = '<br>';

		let count = 0;
		let flowContent =
			'<p>' +

				'<button id=butDuplicatesCoordinates onclick=GBV.toggleDuplicates(butDuplicatesCoordinates,surfaceCoordinateDuplicates); >toggle all duplicates</button>' +

				'<button onclick=GBV.saveFile(); title="creates a new file with the changes" >save edits</button>' +

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
						count + '. id: <button onclick=GBV.showSurface(this.innerText); >' + surface.id + '</button>' +
							'<button onclick=GBV.zoomIntoSurface("' + surface.id + '"); >zoom</button>' + b +
						'surface type: <button class=toggle onclick=GBV.showSurfaceType(this.innerText); >' + surface.surfaceType + '</button>: ' + b +
						( surface.Name ? 'name: ' + surface.Name + b : '' ) +
						( surface.constructionIdRef ? 'construction id ref: ' + surface.constructionIdRef + b : '' ) +
						( spaceId1 ? 'space:  <button onclick=GBV.showSpace(spaceId1); >' + spaceId1 + '</button>' + b : '' ) +
						( spaceId2 ? 'space:  <button onclick=GBV.showSpace(spaceId2); >' + spaceId2 + '</button>' + b : '' ) +
						( surface.CADObjectId ?
							'<button onclick=ISS.showCadId2("' + encodeURI( surface.CADObjectId ) + '"); >cad object id: ' + surface.CADObjectId + '</button>' + b
							: ''
						) +
						'delete: <button onclick=GBV.deleteSurface(this.innerText) >' + surface.id + '</button>' +
						'</div>' +
						'<hr>' +
						'<div id= "divSurface' + surfaceOther.id +'" >' +
						'id of duplicate: <button onclick=GBV.showSurface(this.innerText); >' + surfaceOther.id + '</button>' +
							'<button onclick=GBV.zoomIntoSurface("' + surfaceOther.id + '"); >zoom</button>' + b +
						'surface type: <button class=toggle onclick=GBV.showSurfaceType(this.innerText); >' + surfaceOther.surfaceType + '</button>: ' + b +
						( surfaceOther.Name ? 'name: ' + surfaceOther.Name + b : '' ) +
						( surfaceOther.constructionIdRef ? 'construction id ref: ' + surfaceOther.constructionIdRef + b : '' ) +
						( spaceIdOther1 ? 'space:  <button onclick=GBV.showSpace(spaceIdOther1); >' + spaceIdOther1 + '</button>' + b : '' ) +
						( spaceIdOther2 ? 'space:  <button onclick=GBV.showSpace(spaceIdOther2); >' + spaceIdOther2 + '</button>' + b : '' ) +
						( surfaceOther.CADObjectId ?
							'<button onclick=ISS.showCadId2("' + encodeURI( surfaceOther.CADObjectId ) + '"); >cad object id: ' + surfaceOther.CADObjectId + '</button>' + b
							: ''
						) +
						'delete: <button onclick=GBV.deleteSurface(this.innerText); >' + surfaceOther.id + '</button>' +

					'</div>' +
					'<hr style="border:none;border-top: medium double #333;" >' + b;

				count ++;

			}

		}

		for ( let child of GBX.surfaceMeshes.children ) {

			if ( !child.userData.data ) { continue; }

			if ( surfaceCoordinateDuplicates.includes( child.userData.data.Name ) && child.material.color ) { child.material.color.set( '#ffff00' ); }

		}

		ISSsumDuplicateSurfaces.innerHTML= 'Duplicate Surfaces &raquo; <span style=background-color:var(--highlight-color); >&nbsp;' + count + ' found&nbsp;</span>';
		divCRDInfo.innerHTML = 'Two surfaces with identical coordinates';
		divCoordinates.innerHTML= flowContent;

	}


	ISS.showCadId2 = function( CADObjectId ) {
		//console.log( 'CADObjectId', CADObjectId);
		const id = decodeURI( CADObjectId );
		GBX.surfaceMeshes.children.forEach( element =>
			element.visible = element.userData.data.CADObjectId === id ? true : false );

	};


	ISS.initIssues();