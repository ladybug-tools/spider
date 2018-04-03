/*global

THR, THREE, GBP, ISS, window, document,butSettings, detSettings,divMenuItems,rngOpacity,rngViewExplodeVertical

*/

// Copyright 2018 Ladybug Tools authors. MIT License

	GBP.defaultURL = '../../gbxml-sample-files/columbia-sc-two-story-education-trane.xml';

	var spaceId1;
	var spaceId2;

	var ISS = {};


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

		//if ( ISS.butMenuIssues.style.backgroundColor !== 'var( --but-bg-color )' ) {
		if ( ISS.butMenuIssues.style.fontStyle !== 'italic' ) {

			divMenuItems.innerHTML =

				`<details id = ISSdetIssues  class=app-menu open >

					<p>
					<button class="w3-theme-d1 w3-hover-theme w3-hover-border-theme" onclick=GBP.surfaceMeshes.visible=!GBP.surfaceMeshes.visible; >surfaces</button>
					<button class="w3-theme-d1 w3-hover-theme w3-hover-border-theme" onclick=GBP.surfaceEdges.visible=!GBP.surfaceEdges.visible; >edges</button>
					<button class="w3-theme-d1 w3-hover-theme w3-hover-border-theme" onclick=GBP.openingMeshes.visible=!GBP.openingMeshes.visible; >openings</button>
					<button class="w3-theme-d1 w3-hover-theme w3-hover-border-theme" onclick=GBP.setAllVisible(); >all</button>
					</p>

					<summary>Issues</summary>

					<details>

						<summary id = "ISSsumDuplicateAdjacentSpaces" >Duplicate Adjacent Spaces</summary>

						<p>
							Surfaces with two adjacent spaces pointing to identical space id. Use with heads-up display.
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

						<div id=ISSdivDuplicateSurfaces ></div>

					</details>


					<details>

						<summary id = "ISSsumSurfacesUndefinedCadId" >Undefined CAD Object ID</summary>

						<div >Surfaces with undefined ID</div>

						<div class=flex-container2 >
							<div class=flex-div1 >
								<input oninput=ISS.updateSelect(this,ISSselSurfaceUndefined); size=6 placeholder="surface id" ><br>
								<select id = "ISSselSurfaceUndefined"
									onclick=ISS.showSurface(this.value);ISS.updateSurfaceUndefinedCadIdAttributes(); onchange=ISS.showSurface(this.value);ISS.updateSurfaceUndefinedCadIdAttributes(); size=10 ><option>none found</option></select><br>
								 <button onclick=ISS.zoomIntoSurface(ISSselSurfaceUndefined.value); title="zoom into just this surface" >zoom</button>
								 </div>
							<div id = "ISSdivSurfacesUndefinedAttributes" class=flex-left-div2 ></div>
						</div>

						<div id=ISSdivSurfacesUndefinedCadId ></div>

						<hr>

					</details>


					<details>

						<summary id = "ISSsumSurfacesTiny" >Tiny Surfaces</summary>

						<div >Surfaces that are smaller than a specified area,</div>

						Test size <output id=ISSoutMinSize >0.5</output>
						<input id=ISSinpMinSize type=range min=0 max=100 value=50 step=1 onchange=ISSoutMinSize.value=this.value*0.01;ISS.getSurfacesTiny(); >
						<div class=flex-container2 >
							<div class=flex-div1 >
								<input oninput=ISS.updateSelect(this,ISSselSurfaceTiny); size=6 placeholder="surface id" ><br>
								<select id = "ISSselSurfaceTiny"
								onclick=ISS.showSurface(this.value);ISS.updateSurfaceTinyAttributes(); onchange=ISS.showSurface(this.value);ISS.updateSurfaceTinyAttributes(); size=10 ><option>none found</option></select><br>
								<button onclick=ISS.zoomIntoSurface(ISSselSurfaceTiny.value); title="zoom into just this surface" >zoom</button>
							</div>
							<div id = "ISSdivSurfacesTinyAttributes" class=flex-left-div2 ></div>
						</div>

						<div id=ISSdivSurfacesTiny ></div>

					</details>

					<details>

						<summary id = "ISSsumSurfacesVertexClose" >Very Close Vertices</summary>

						<div >Surfaces that have close vertices. Use telltales in right menu to identify the vertices.</div>
						Test distance <output id=ISSoutMinDistance >0.2</output>
						<input id=ISSinpMinDistance type=range min=0 max=100 value=50 step=1 onchange=ISSoutMinDistance.value=this.value*0.01;ISS.getSurfacesVertexClose(); >
						<div class=flex-container2 >
							<div class=flex-div1 >
								<input oninput=ISS.updateSelect(this,ISSselSurfaceVertexClose); size=6 placeholder="surface id" ><br>
								<select id = "ISSselSurfaceVertexClose"
								onclick=ISS.showSurface(this.value);ISS.updateSurfaceVertexCloseAttributes();
								onchange=ISS.showSurface(this.value);ISS.updateSurfaceVertexCloseAttributes(); size=10 ></select><br>
								<button onclick=ISS.zoomIntoSurface(ISSselSurfaceVertexClose.value); title="zoom into just this surface" >zoom</button>
							</div>
							<div id = "ISSdivSurfacesVertexCloseAttributes" class=flex-left-div2 ></div>
						</div>

						<div id=ISSdivSurfacesVertexClose ></div>

					</details>

					<details id = "ISSdetOpeningVertices4Plus" >

						<summary id = "ISSsumOpeningVertices4Pli=us" >Opening Vertices > 4 </summary>

						<div id=ISSdivOpeningVertices4Plus ></div>

					</details>


					<!--

					<details>

						<summary id = "ISSsumSurfacesXXX" >Surfaces XXX</summary>

						<div >Surfaces that are XXX</div>
						Minimum size <output id=ISSoutMinSize >0.5</output>
						<input id=ISSinpMinSize type=range min=0 max=100 value=50 step=1 onchange=ISSoutMinSize.value=this.value*0.01;ISS.getSurfacesTiny(); >
						<div class=flex-container2 >
							<div class=flex-div1 >
								<input oninput=ISS.updateSelect(this,ISSselSurfaceXXX); size=6 placeholder="surface id" ><br>
								<select id = "ISSselSurfaceXXX"
								onclick=ISS.showSurface(this.value);ISS.updateSurfaceXXXAttributes();
								onchange=ISS.showSurface(this.value);ISS.updateSurfaceXXXAttributes(); size=10 ></select><br>
								<button onclick=ISS.zoomIntoSurface(ISSselSurfaceXXX.value); title="zoom into just this surface" >zoom</button>
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
								<input oninput=ISS.updateSelect(this,ISSselSurfaceInside); size=6 placeholder="surface id" ><br>
								<select id = "ISSselSurfaceInside"
								onclick=ISS.showSurface(this.value);ISS.updateSurfaceInsideAttributes(); onchange=ISS.showSurface(this.value);ISS.updateSurfaceInsideAttributes(); size=10 ><option>none found</option></select><br>
								<button onclick=ISS.zoomIntoSurface(ISSselSurfaceTiny.value); title="zoom into just this surface" >zoom</button>
							</div>
							<div id = "ISSdivSurfacesInsideAttributes" class=flex-left-div2 ></div>
						</div>

						<div id=ISSdivSurfacesInside ></div>

					</details>
					-->

					<hr>

				</details>

			` + divMenuItems.innerHTML;

			ISS.getSurfacesDuplicatesAdjacents();

			ISS.getSurfacesDuplicatesCoordinates();

			ISS.getSurfacesUndefinedCadId();

			ISS.getSurfacesTiny();

			ISS.getSurfacesVertexClose();

			ISSdetOpeningVertices4Plus.innerHTML = ISS.getOpeningVertices4Plus();


			//ISS.getSurfacesInside(); // not found to be useful yet

			//ISS.butMenuIssues.style.backgroundColor = 'var( --but-bg-color )';
			ISS.butMenuIssues.style.cssText = 'background-color: pink !important; font-style: italic; font-weight: bold';

		} else {

			ISSdetIssues.remove();

			ISS.butMenuIssues.style.backgroundColor = '';
			ISS.butMenuIssues.style.fontStyle = '';
			ISS.butMenuIssues.style.fontWeight = '';

		}

	};


	ISS.getOpeningVertices4Plus = function() {

		//console.log( 'GBP.openings', GBP.openings );

		let items = [];

		for ( opening of GBP.openings ) {

			if ( opening.PlanarGeometry.PolyLoop.CartesianPoint.length > 4 ) {

				//console.log( 'bingo', opening );
				//console.log( 'vertices', opening.PlanarGeometry.PolyLoop.CartesianPoint.length );

				items.push( opening );
			}
		}

		txt = '';
		items.forEach( element => txt += '<option value=' + element.id + ' >' + element.Name + '</option>' );

		summary = '<summary>Opening Vertices > 4 &raquo; ' + items.length + ' found</summary>';

		contents = //'<select size=' + ( items.length < 10 ? items.length : 10 ) + ' >' + txt + '<select>';

		`
			<div class=flex-container2 >
				<div class=flex-div1 >
					<select id=ISSselOpen size=` + ( items.length < 10 ? items.length : 10 ) +
						` onclick=ISS.setOpeningVisible(this.value);
						onchange=ISS.setOpeningVisible(this.value); >` + txt + `</select><br>
				</div>
				<div id = "ISSdivAttributes" class=flex-left-div2 ></div>
			</div>
			`;


//			<input oninput=ISS.updateSelect(this,ISSselSurfaceVertexClose); size=6 placeholder="surface id" ><br>
//				<button onclick=ISS.zoomIntoSurface(ISSselSurfaceVertexClose.value); title="zoom into just this surface" >zoom</button>

		return summary + contents;

	}


	ISS.setOpeningVisible = function( id ) {

		//console.log( 'opening id', id );

		GBP.surfaceMeshes.visible = false;
		GBP.surfaceEdges.visible = false;
		GBP.openingMeshes.visible = true;

		GBP.openingMeshes.children.forEach( element => {

			element.visible = element.userData.data.id === id ? true : false;

			if ( element.visible === true  ) {

				element.material.opacity = 1;
				element.material.side = 2;
				element.material.needsUpdate = true;

			}

		} );

		let item = GBP.openings.find( element => element.id === id );
		//console.log( 'item', item );

		const attributes = ISS.traverseGbjson( item );
		ISSdivAttributes.innerHTML = ( ISSselOpen.selectedIndex + 1 ) + '.<br>' + attributes + '<br>' +
			'Vertices: ' + points.length;

	}


	ISS.getSurfacesDuplicatesAdjacents = function() {

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
				` <button onclick=ISS.showSurface(this.innerText); >` + surface.id + `</button>
				<button onclick=ISS.zoomIntoSurface("` + surface.id + `"); >zoom</button>
				<button class=toggle onclick=ISS.showSurfaceType(this.innerText); >` + surface.surfaceType + `</button><br>`
				+ ( surface.Name ? `name <i>` + surface.Name + `</i><br>` : `` )
				+ ( surface.CADObjectId ? `cad object id <button onclick=ISS.showCadId(` + ( count - 1 ) + `); >` + surface.CADObjectId + `</button><br>` : `` ) +
				`area <i>` + Number( surfaceArea ).toFixed( 1 ) + `</i>` +
				` length <i>` + height.toFixed( 3 ) + `</i> width <i>` + width.toFixed( 3 ) + `</i>
			</div>`;

			surfaceMesh = GBP.surfaceMeshes.children.find( element => element.userData.data.id === item.id );
			surfaceMesh.material.color.set( '#c080ff' );
		}

		ISSsumDuplicateAdjacentSpaces.innerHTML= 'Duplicate Adjacent Space &raquo; <span style=background-color:var(--highlight-color); >' + count + ' found&nbsp;</span>';

		ISSdivAdjacents.innerHTML= contents;

	}



	ISS.toggleDuplicateAdjacent = function() {

		if ( ISSbutDuplicateAdjacent.style.backgroundColor !== 'var( --but-bg-color )' ) {

			GBP.surfaceMeshes.children.forEach( child => child.visible = false );

			for ( let item of ISS.surfaceAdjacentsDuplicates ) {

				const surfaceMesh = GBP.surfaceMeshes.children.find( element => element.userData.data.id === item.id );
				surfaceMesh.visible = true;

			}

			ISSbutDuplicateAdjacent.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			ISS.setAllVisible();

			ISSbutDuplicateAdjacent.style.backgroundColor = '';

		}

	}



	ISS.toggleDuplicates = function( button, surfaceArray ) {

		if ( button.style.backgroundColor !== 'var( --but-bg-color )' ) {
			count = 0;
			GBP.surfaceMeshes.children.forEach( element =>
				{ element.visible = surfaceArray.includes( element.userData.data.Name ) ? true : false; count = element.visible ? count++ : count;} );
				console.log( '', count );

			/*
			for ( let child of surfaceMeshes.children ) {

				if ( surfaceArray.includes( child.userData.data.Name ) ) {

					child.visible = true;

				} else {

					child.visible = false;

				}

			}

			*/

			button.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			GBP.setAllVisible();

			button.style.backgroundColor = '';

		}

	}



	ISS.showCadId = function( index ) {

		GBP.surfaceMeshes.children.forEach( element =>
			element.visible = element.userData.data.CADObjectId === ISS.surfaceAdjacentsDuplicates[ index ].cadId ? true : false );

	};



	//////////

	ISS.getSurfacesDuplicatesCoordinates = function() {

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

				'<button id=butDuplicatesCoordinates onclick=ISS.toggleDuplicates(butDuplicatesCoordinates,surfaceCoordinateDuplicates); >toggle all duplicates</button>' +

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
						count + '. id: <button onclick=ISS.showSurface(this.innerText); >' + surface.id + '</button>' +
							'<button onclick=ISS.zoomIntoSurface("' + surface.id + '"); >zoom</button>' + b +
						'surface type: <button class=toggle onclick=ISS.showSurfaceType(this.innerText); >' + surface.surfaceType + '</button>: ' + b +
						( surface.Name ? 'name: ' + surface.Name + b : '' ) +
						( surface.constructionIdRef ? 'construction id ref: ' + surface.constructionIdRef + b : '' ) +
						( spaceId1 ? 'space:  <button onclick=ISS.showSpace(spaceId1); >' + spaceId1 + '</button>' + b : '' ) +
						( spaceId2 ? 'space:  <button onclick=ISS.showSpace(spaceId2); >' + spaceId2 + '</button>' + b : '' ) +
						( surface.CADObjectId ?
							'<button onclick=ISS.showCadId2("' + encodeURI( surface.CADObjectId ) + '"); >cad object id: ' + surface.CADObjectId + '</button>' + b
							: ''
						) +
						'delete: <button onclick=ISS.deleteSurface(this.innerText) >' + surface.id + '</button>' +
						'</div>' +
						'<hr>' +
						'<div id= "divSurface' + surfaceOther.id +'" >' +
						'id of duplicate: <button onclick=ISS.showSurface(this.innerText); >' + surfaceOther.id + '</button>' +
							'<button onclick=ISS.zoomIntoSurface("' + surfaceOther.id + '"); >zoom</button>' + b +
						'surface type: <button class=toggle onclick=ISS.showSurfaceType(this.innerText); >' + surfaceOther.surfaceType + '</button>: ' + b +
						( surfaceOther.Name ? 'name: ' + surfaceOther.Name + b : '' ) +
						( surfaceOther.constructionIdRef ? 'construction id ref: ' + surfaceOther.constructionIdRef + b : '' ) +
						( spaceIdOther1 ? 'space:  <button onclick=ISS.showSpace(spaceIdOther1); >' + spaceIdOther1 + '</button>' + b : '' ) +
						( spaceIdOther2 ? 'space:  <button onclick=ISS.showSpace(spaceIdOther2); >' + spaceIdOther2 + '</button>' + b : '' ) +
						( surfaceOther.CADObjectId ?
							'<button onclick=ISS.showCadId2("' + encodeURI( surfaceOther.CADObjectId ) + '"); >cad object id: ' + surfaceOther.CADObjectId + '</button>' + b
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

		ISSsumDuplicateSurfaces.innerHTML= 'Duplicate Surfaces &raquo; <span style=background-color:var(--highlight-color); >&nbsp;' + count + ' found&nbsp;</span>';
		divCRDInfo.innerHTML = 'Two surfaces with identical coordinates';
		ISSdivDuplicateSurfaces.innerHTML= flowContent;

	}



	ISS.showCadId2 = function( CADObjectId ) {
		//console.log( 'CADObjectId', CADObjectId);
		const id = decodeURI( CADObjectId );
		GBP.surfaceMeshes.children.forEach( element =>
			element.visible = element.userData.data.CADObjectId === id ? true : false );

	};


	//////////

	ISS.getSurfacesUndefinedCadId = function() {

		ISS.surfacesUndefinedId = GBP.surfaceJson.filter( element => element.CADObjectId === undefined );

		//console.log( 'surfacesUndefinedId', ISS.surfacesUndefinedId );

		ISSsumSurfacesUndefinedCadId.innerHTML= 'Undefined CAD Object IDs &raquo;  <span style=background-color:var(--highlight-color); >&nbsp;' + ISS.surfacesUndefinedId.length + ' found&nbsp;</span>';

		let txt = '';
		ISS.surfacesUndefinedId.forEach( function( element ) { txt += '<option>' + element.id + '</option>'; } );
		ISSselSurfaceUndefined.innerHTML = txt ? txt : '<option>none found</option>';
		ISSselSurfaceUndefined.selectedIndex = 0; //Math.floor( Math.random() * property.length )

	}



	ISS.updateSurfaceUndefinedCadIdAttributes = function() {

		ISSdivSurfacesUndefinedAttributes.innerHTML = ISS.traverseGbjson( ISS.surfacesUndefinedId[ ISSselSurfaceUndefined.selectedIndex ] );

		if ( window.HUD ) {
			HUD.updateSurface( ISSselSurfaceUndefined.value );
			HUD.setHeadsUp();
		}
	}


	/////////

	ISS.getSurfacesTiny = function() {

		const size = 0.01 * parseFloat( ISSinpMinSize.value );
		ISS.surfacesTiny = GBP.surfaceJson.filter( surface =>
			parseFloat( surface.RectangularGeometry.Height ) * parseFloat( surface.RectangularGeometry.Width  ) < size );


		ISSsumSurfacesTiny.innerHTML= 'Tiny Surfaces &raquo;  <span style=background-color:var(--highlight-color); >&nbsp;' + ISS.surfacesTiny.length + ' found&nbsp;</span>';

		let txt = '';
		ISS.surfacesTiny.forEach( function( element ) { txt += '<option>' + element.id + '</option>'; } );
		ISSselSurfaceTiny.innerHTML = txt ? txt : '<option>none found</option>';
		ISSselSurfaceTiny.selectedIndex = 0;

		//	if ( ISSselSurfaceTiny.length ) { ISS.updateSurfaceTinyAttributes(); }

	}


	ISS.updateSurfaceTinyAttributes = function() {

		const surface = ISS.surfacesTiny[ ISSselSurfaceTiny.selectedIndex ];
		height = parseFloat( surface.RectangularGeometry.Height );
		width = parseFloat( surface.RectangularGeometry.Width );
		area =  height * width;
		txt = ISS.traverseGbjson( surface );
		ISSdivSurfacesTinyAttributes.innerHTML =
			txt + '<br>' +
			'height: ' + height.toLocaleString() + '<br>' +
			'width: ' + width.toLocaleString() + '<br>' +
			'area: ' + area.toLocaleString() + '<br>' +
		'';

		if ( window.HUD != undefined ) {

			HUD.updateSurface( ISSselSurfaceTiny.value );
			HUD.setHeadsUp();

		}

	}


	ISS.zoomIntoSurface = ( id ) => {
		//console.log( 'id', id );

		const surfaceMesh = GBP.surfaceMeshes.children.find( element => element.userData.data.id === id );
		//console.log( '', surfaceMesh );

		const center = surfaceMesh.localToWorld( surfaceMesh.geometry.boundingSphere.center.clone() );
		const radius = surfaceMesh.geometry.boundingSphere.radius > 1 ? surfaceMesh.geometry.boundingSphere.radius : 1;
		//console.log( 'center * radius', center, radius );

		THR.scene.remove( ISS.telltale );
		const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
		const material = new THREE.MeshNormalMaterial( { opacity: 0.7, transparent: true } );
		ISS.telltale = new THREE.Mesh( geometry, material );
		ISS.telltale.position.copy( center );
		THR.scene.add( ISS.telltale );

		THR.controls.target.copy( center );
		THR.camera.position.copy( center.clone().add( new THREE.Vector3( 3.0 * radius, - 3.0 * radius, 3.0 * radius ) ) );

	};

	/////////


	ISS.getSurfacesVertexClose = function() {

		const distance = 0.01 * parseFloat( ISSinpMinDistance.value );
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

		//console.log( ISS.surfacesVertexClose.length , ISS.surfacesVertexClose );

		ISSsumSurfacesVertexClose.innerHTML= 'Very Close Vertices &raquo; ' +
			'<span style=background-color:var(--highlight-color); >&nbsp;' + ISS.surfacesVertexClose.length + ' found&nbsp;</span>';

		let txt = '';
		ISS.surfacesVertexClose.forEach( function( element ) { txt += '<option>' + element.userData.data.id + '</option>'; } );
		ISSselSurfaceVertexClose.innerHTML = txt ? txt : '<option>none found</option>';
		ISSselSurfaceVertexClose.selectedIndex = 0;


	}



	ISS.updateSurfaceVertexCloseAttributes = function() {

		const surface = ISS.surfacesVertexClose[ ISSselSurfaceVertexClose.selectedIndex ];
		const vertices = surface.geometry.vertices;
		const distance = 0.01 * parseFloat( ISSinpMinDistance.value );

		let txt = ISS.traverseGbjson( surface.userData.data ) + '<br>';

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

	}



	/////////

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

	}

	//////////

	ISS.showSurface = function( id ) {

		GBP.surfaceMeshes.children.forEach( element => element.visible = element.userData.data.id === id ? true : false );

	};


	ISS.showSurfaceType = function( type ) {

		GBP.surfaceMeshes.children.forEach( element => element.visible = element.userData.data.surfaceType === type? true : false );

	};



	ISS.traverseGbjson = function traverseGbjson( obj ) {

		const elements = [];
		let attributes = '';

		for ( let property in obj ) {

			if ( obj[ property ] !== null && typeof( obj[ property ] ) === 'object' ) {

				if ( elements.indexOf( property ) < 0 ) { elements.push( property ); }

			} else {

				attributes += '<div>' + property + ': <i>' + obj[ property ] + '</i></div>';

			}

		};

		return attributes;

	}


	// copied from  HUD/ move to GBV?
	ISS.updateSelect = function( input, select ) {

		const str = input.value.toLowerCase();

		for ( let option of select.options ) {

			if ( option.value.toLowerCase().includes( str ) ) {

				select.value = option.value;
				//select.click();

				break;

			}

		}

	};



	ISS.initIssues();