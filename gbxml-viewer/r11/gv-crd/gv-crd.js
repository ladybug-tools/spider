// Copyright 2018 Ladybug Tools authors. MIT License

	var uriGbxmlDefault = '../../gbxml-sample-files/columbia-sc-two-story-education-trane.xml';

	var telltale;

	init();

	function init() {

		if ( butCoordinates.style.backgroundColor !== 'var( --but-bg-color )' ) {


			divMenuItems.innerHTML =

				`<details id = detCoordinates  class=app-menu open>

					<summary id=sumCRDSummary >Duplicate Coordinates</summary>

					<div id=divCRDInfo ></div>

					<p>
						toggles<br><button onclick=GBX.surfaceMeshes.visible=!GBX.surfaceMeshes.visible; >surfaces</button>
						<button onclick=GBX.surfaceEdges.visible=!GBX.surfaceEdges.visible; >edges</button>
						<button onclick=GBV.setAllVisible(); >all visible</button>
					</p>

					<div id=divCoordinates ></div>

					<hr>

				</details>

			` + divMenuItems.innerHTML;

			butCoordinates.style.backgroundColor = 'var( --but-bg-color )';

			getSurfaceDuplicatesCoordinates();

			THR.controls.autoRotate = false;

		} else {

			detCoordinates.remove();

			butCoordinates.style.backgroundColor = '';

		}

	}



	function getSurfaceDuplicatesCoordinates() {

		const surfacePolyLoops = [];
		const surfaceIds = [];
		surfaceCoordinateDuplicates = [];

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
							'<button onclick=GBV.showCadId("' + encodeURI( surface.CADObjectId ) + '"); >cad object id: ' + surface.CADObjectId + '</button>' + b
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
							'<button onclick=GBV.showCadId("' + encodeURI( surfaceOther.CADObjectId ) + '"); >cad object id: ' + surfaceOther.CADObjectId + '</button>' + b
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

		sumCRDSummary.innerHTML= 'Duplicate Surfaces &raquo; <span style=background-color:var(--highlight-color); >&nbsp;' + count + ' found&nbsp;</span>';
		divCRDInfo.innerHTML = 'Two surfaces with identical coordinates';
		divCoordinates.innerHTML= flowContent;

	}

