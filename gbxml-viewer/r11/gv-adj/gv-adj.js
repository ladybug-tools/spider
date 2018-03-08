// Copyright 2018 Ladybug Tools authors. MIT License


	var ADJsurfaceAdjacentsDuplicates = [];



	ADJinitAdjacents();

	function ADJinitAdjacents() {

		if ( butAdjacents.style.backgroundColor !== 'var( --but-bg-color )' ) {

			divMenuItems.innerHTML =

				`<details id = "detAdjacents" class=app-menu open>

					<summary id = "sumADJSummary" >Duplicate Adjacents</summary>

					<p >
						Surfaces with two adjacent spaces pointing to identical space id. Use with heads-up display.
					</p>

					<p>
						toggles <br><button onclick=GBX.surfaceMeshes.visible=!GBX.surfaceMeshes.visible; >surfaces</button>
						<button onclick=GBX.surfaceEdges.visible=!GBX.surfaceEdges.visible; >edges</button>
						<button onclick=GBV.setAllVisible(); >all visible</button>
					</p>

					<p>
						<button id=butDuplicateAdjacents onclick=GBV.toggleDuplicates(butDuplicateAdjacents,ADJsurfaceAdjacentsDuplicates); >toggle all duplicate adjacents</button>
					</p>

					<hr>

					<div id=divADJadjacents ></div>


				</details>

			` + divMenuItems.innerHTML;

			ADJgetSurfaceDuplicatesAdjacents();

			butAdjacents.style.backgroundColor = 'var( --but-bg-color )';

			THR.controls.autoRotate = false;

		} else {

			detAdjacents.remove();

			butAdjacents.style.backgroundColor = '';

		}

	}



	function ADJgetSurfaceDuplicatesAdjacents() {

		const surfaces = GBX.gbjson.Campus.Surface;
		let count = 0;
		let contents = '';

		for ( let surface of surfaces ) {

			const adjacencies = surface.AdjacentSpaceId;
			const height = parseFloat( surface.RectangularGeometry.Height );
			const width = parseFloat( surface.RectangularGeometry.Width );
			const surfaceArea = height * width;

			if ( Array.isArray( adjacencies ) === true && JSON.stringify( adjacencies[ 0 ] ) === JSON.stringify( adjacencies[ 1 ] ) ) {

				// why doesn't id work??
				ADJsurfaceAdjacentsDuplicates.push( surface.Name );

				//console.log( 'adjacencies', adjacencies  );

				contents +=
					`<div style=margin-bottom:15px; >` +
						( ++ count ) +
						` <button onclick=GBV.showSurface(this.innerText); >` + surface.id + `</button>
						<button onclick=GBV.zoomIntoSurface("` + surface.id + `"); >zoom</button>
						<button class=toggle onclick=GBV.showSurfaceType(this.innerText); >` + surface.surfaceType + `</button><br>`
						+ ( surface.Name ? 'name <i>' + surface.Name + '</i><br>' : '' )
						+ ( surface.CADObjectId ? 'cad object id <button onclick=GBV.showCadId("' +
							encodeURI( surface.CADObjectId ) + `"); >` + surface.CADObjectId + `</button><br>` : `` ) +
						`area <i>` + Number( surfaceArea ).toFixed( 1 ) + `</i>` +
						` length <i>` + height.toFixed( 3 ) + `</i> width <i>` + width.toFixed( 3 ) + `</i>
					</div>`;
			}

		}



		for ( let child of GBX.surfaceMeshes.children ) {

			if ( ADJsurfaceAdjacentsDuplicates.includes( child.userData.data.Name ) ) { child.material.color.set( '#c080ff' ); }

		}

		sumADJSummary.innerHTML= 'Duplicate Adjacents &raquo;  <span style=background-color:var(--highlight-color); >&nbsp;' + count + ' found&nbsp;</span>';

		divADJadjacents.innerHTML= contents;

	}

