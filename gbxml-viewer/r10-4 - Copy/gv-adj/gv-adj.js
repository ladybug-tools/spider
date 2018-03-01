// Copyright 2018 Ladybug Tools authors. MIT License

	initAdjacents();

	function initAdjacents() {

		if ( butAdjacents.style.backgroundColor !== 'var( --but-bg-color )' ) {

			divMenuItems.innerHTML =

				`<details id = "detAdjacents" class=app-menu open>

					<summary id = "sumADJSummary" >Duplicate Adjacents</summary>

					<div id=divADJInfo ></div>

					<p>
						toggles <br><button onclick=GBX.surfaceMeshes.visible=!GBX.surfaceMeshes.visible; >surfaces</button>
						<button onclick=GBX.surfaceEdges.visible=!GBX.surfaceEdges.visible; >edges</button>
						<button onclick=GBV.setAllVisible(); >all visible</button>
					</p>

					<p>
						<button id=butDuplicateAdjacents onclick=GBV.toggleDuplicates(butDuplicateAdjacents,surfaceAdjacentsDuplicates); >toggle all duplicate adjacents</button>
					</p>

					<hr>
					<div id=divAdjacents ></div>


				</details>

			` + divMenuItems.innerHTML;

			butAdjacents.style.backgroundColor = 'var( --but-bg-color )';

			getSurfaceDuplicatesAdjacents();

			THR.controls.autoRotate = false;

		} else {

			detAdjacents.remove();

			butAdjacents.style.backgroundColor = '';

		}

	}



	function getSurfaceDuplicatesAdjacents() {

		const surfaceAdjacentsDuplicates = [];
		const surfaces = GBX.gbjson.Campus.Surface;
		const b = '<br>';
		let count = 0;
		let flowContent = '';

		for ( let surface of surfaces ) {

			adjacencies = surface.AdjacentSpaceId;

			const height = parseFloat( surface.RectangularGeometry.Height );
			const width = parseFloat( surface.RectangularGeometry.Width );
			const surfaceArea = height * width;

			if ( Array.isArray( adjacencies ) === true && JSON.stringify( adjacencies[ 0 ] ) === JSON.stringify( adjacencies[ 1 ] ) ) {

				surfaceAdjacentsDuplicates.push( surface.Name );

				//console.log( 'adjacencies', adjacencies  );

				flowContent +=
					`<div style=margin-bottom:15px; >` +
						( ++ count ) +
						` <button onclick=GBV.showSurface(this.innerText); >` + surface.id + `</button>
						<button onclick=GBV.zoomIntoSurface("` + surface.id + `"); >zoom</button>
						<button class=toggle onclick=GBV.showSurfaceType(this.innerText); >` + surface.surfaceType + `</button>
					`+

/*
						( ++ count ) +
						'. id: ' + '<button onclick=GBV.showSurface(this.innerText); >' + surface.id + '</button> ' +
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
*/

					`</div>`;
			}

		}

		for ( let child of GBX.surfaceMeshes.children ) {

			if ( !child.userData.data ) { continue; }

			if ( surfaceAdjacentsDuplicates.includes( child.userData.data.Name ) ) { child.material.color.set( '#c080ff' ); }

		}

		const info = 'Surfaces with two adjacent spaces pointing to identical space id. Use with heads-up display';
//		return { summary: 'Duplicate Adjacencies &raquo; ' + count, flowContent: flowContent, info: info };

		sumADJSummary.innerHTML= 'Duplicate Adjacents &raquo;  <span style=background-color:yellow; >&nbsp;' + count + ' found&nbsp;</span>';
		divADJInfo.innerHTML = info;
		divAdjacents.innerHTML= flowContent;
	}
