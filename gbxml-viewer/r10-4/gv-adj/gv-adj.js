// Copyright 2018 Ladybug Tools authors. MIT License

	init();

	function init() {

		if ( butAdjacents.style.backgroundColor !== 'var( --but-bg-color )' ) {

			divMenuItems.innerHTML =

				`<details id = "detAdjacents" open>

					<summary id = "sumSummary" >Duplicate Adjacents</summary>

					<div id=divInfo ></div>

					<p>
						toggles <button onclick=GBX.surfaceMeshes.visible=!GBX.surfaceMeshes.visible; >surfaces</button>
						<button onclick=GBX.surfaceEdges.visible=!GBX.surfaceEdges.visible; >edges</button>
						<button onclick=GBV.setAllVisible(); >all visible</button>
					</p>

					<p>
					<button id=butDuplicateAdjacents onclick=GBV.toggleDuplicates(butDuplicateAdjacents,surfaceAdjacentsDuplicates); >toggle all duplicate adjacents</button>
					<button onclick=GBV.saveFile(); title="creates a new file with the changes" >save edits</button>

					</p>
					<hr>
					<div id=divCoordinates ></div>


				</details>

			` + divMenuItems.innerHTML;

			butAdjacents.style.backgroundColor = 'var( --but-bg-color )';

			getSurfaceDuplicatesAdjacents();

			THR.controls.autoRotate = false;

		} else {

			detCoordinates.remove();

			butAdjacents.style.backgroundColor = '';

		}

	}



	function xxxgetSurfaceDuplicatesAdjacents() {

		const surfacePolyLoops = [];
		const surfaceIds = [];
		surfaceAdjacentsDuplicates = [];

		const surfaces = GBX.surfaceJson;
		const b = '<br>';

		let count = 0;
		let flowContent = '';


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

			if ( surfaceAdjacentsDuplicates.includes( child.userData.data.Name ) && child.material.color ) { child.material.color.set( '#ffff00' ); }

		}

		sumSummary.innerHTML= 'Duplicate Adjacents &raquo; ' + count;
		divInfo.innerHTML = 'Surfaces with two identical adjacents';
		divCoordinates.innerHTML= flowContent;

	}



	function getSurfaceDuplicatesAdjacents() {
		surfaceAdjacentsDuplicates = [];
		const surfaces = GBX.gbjson.Campus.Surface;
		const b = '<br>';
		let count = 0;
		let flowContent =
			'<p>' +
				'<button id=butDuplicateAdjacencies onclick=GBV.toggleDuplicates(butDuplicateAdjacencies,surfaceAdjacentsDuplicates); >toggle all duplicates</button>' +
			'</p>';

		for ( let surface of surfaces ) {

			adjacencies = surface.AdjacentSpaceId;

			const height = parseFloat( surface.RectangularGeometry.Height );
			const width = parseFloat( surface.RectangularGeometry.Width );
			const surfaceArea = height * width;

			if ( Array.isArray( adjacencies ) === true && JSON.stringify( adjacencies[ 0 ] ) === JSON.stringify( adjacencies[ 1 ] ) ) {

				surfaceAdjacentsDuplicates.push( surface.Name );

		//console.log( 'adjacencies', adjacencies  );

				flowContent +=
					'<div style=margin-bottom:35px; >' +
						( ++ count ) +
						'. id: ' + '<button onclick=GBV.showSurface("' + surface.id + '"); >' + surface.id + '</button> ' +
							'<button onclick=GBV.zoomIntoSurface("' + surface.id + '"); >zoom</button>' + b +
							'surface type: <button class=toggle onclick=GBV.showSurfaceType(this.innerText); >' + surface.surfaceType + '</button>: ' + b +
						( surface.Name ? 'Name: ' + surface.Name + b : '' ) +
						( surface.constructionIdRef ? 'construction id ref: ' + surface.constructionIdRef + b : '' ) +
						( surface.CADObjectId ?
							'<button onclick=GBV.showCadId("' + encodeURI( surface.CADObjectId ) + '"); >CADObjectId: ' + surface.CADObjectId + '</button>' + b
							: ''
						) +
						' area: ' + Number( surfaceArea ).toFixed( 1 ) + '<br>length: ' + height.toFixed( 3 ) + ' width: ' + width.toFixed( 3 ) + b +
						'space 1:  <button onclick=GBV.showSpace("' + adjacencies[ 0 ].spaceIdRef + '"); >' + adjacencies[ 0 ].spaceIdRef + '</button>' + b +
						'space 2:  <button onclick=GBV.showSpace("' + adjacencies[ 1 ].spaceIdRef + '"); >' + adjacencies[ 1 ].spaceIdRef + '</button>' + b +
					'<hr></div>';
			}

		}

		for ( let child of GBX.surfaceMeshes.children ) {

			if ( !child.userData.data ) { continue; }

			if ( surfaceAdjacentsDuplicates.includes( child.userData.data.Name ) ) { child.material.color.set( '#c080ff' ); }

		}

		const info = 'Error: Interior surfaces with both adjacencies pointing to same ID';
//		return { summary: 'Duplicate Adjacencies &raquo; ' + count, flowContent: flowContent, info: info };

		sumSummary.innerHTML= 'Duplicate Adjacents &raquo; ' + count;
		divInfo.innerHTML = info
		divCoordinates.innerHTML= flowContent;
	}
