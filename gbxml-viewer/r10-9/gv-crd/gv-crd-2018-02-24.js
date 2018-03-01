// Copyright 2018 Ladybug Tools authors. MIT License

	var uriGbxmlDefault = '../../gbxml-sample-files/columbia-sc-two-story-education-trane.xml';

	var telltale;

	init();

	function init() {

		if ( butCoordinates.style.backgroundColor !== 'var( --but-bg-color )' ) {

			let txt = 'lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?';

			divMenuItems.innerHTML =

				`<details id = detCoordinates open>

					<summary id=sumSummary >Duplicate Coordinates</summary>

					<div id=divInfo ></div>

					<p>
						toggles <button onclick=surfaceMeshes.visible=!surfaceMeshes.visible; >surfaces</button>
						<button onclick=surfaceEdges.visible=!surfaceEdges.visible; >edges</button>
						<button onclick=REPallVisible(); >all visible</button>
					</p>

					<div id=divCoordinates ></div>

					<hr>

				</details>

			` + divMenuItems.innerHTML;

			butCoordinates.style.backgroundColor = 'var( --but-bg-color )';

			getSurfaceDuplicatesCoordinates();


			controls.autoRotate = false;

		} else {

			detCoordinates.remove();

			butCoordinates.style.backgroundColor = '';

		}

	}



	function getSurfaceDuplicatesCoordinates() {

		const surfacePolyLoops = [];
		const surfaceIds = [];
		surfaceCoordinateDuplicates = [];

		const surfaces = gbjson.Campus.Surface;
		const b = '<br>';

		let count = 0;
		let flowContent =
			'<p>' +
				'<button id=butDuplicatesCoordinates onclick=REPtoggleAdjacencies(butDuplicatesCoordinates,surfaceCoordinateDuplicates); >toggle all duplicates</button>' +

				'<button onclick=EDTsaveFile(); title="creates a new file with the changes" >save edits</button>' +

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
						count + '. id: <button onclick=REPtoggleSurface("' + surface.id + '"); >' + surface.id + '</button>' +
							'<button onclick=REPzoomIntoSurface("' + surface.id + '"); >zoom</button>' + b +
						'surface type: <button class=toggle onclick=REPtoggleSurfaceType(this); >' + surface.surfaceType + '</button>: ' + b +
						( surface.Name ? 'name: ' + surface.Name + b : '' ) +
						( surface.constructionIdRef ? 'construction id ref: ' + surface.constructionIdRef + b : '' ) +
						( spaceId1 ? 'space:  <button onclick=REPtoggleSpace("' + spaceId1 + '"); >' + spaceId1 + '</button>' + b : '' ) +
						( spaceId2 ? 'space:  <button onclick=REPtoggleSpace("' + spaceId2 + '"); >' + spaceId2 + '</button>' + b : '' ) +
						( surface.CADObjectId ?
							'<button onclick=REPtoggleCadId("' + encodeURI( surface.CADObjectId ) + '"); >cad object id: ' + surface.CADObjectId + '</button>' + b
							: ''
						) +
						'<button onclick=REPdeleteSurface("' + surface.id + '") >delete ' + surface.id + '</button>' +
						'<hr>' +
						'id of duplicate: <button onclick=REPtoggleSurface("' + surfaceOther.id + '"); >' + surfaceOther.id + '</button>' +
							'<button onclick=REPzoomIntoSurface("' + surfaceOther.id + '"); >zoom</button>' + b +
						'surface type: <button class=toggle onclick=REPtoggleSurfaceType(this); >' + surfaceOther.surfaceType + '</button>: ' + b +
						( surfaceOther.Name ? 'name: ' + surfaceOther.Name + b : '' ) +
						( surfaceOther.constructionIdRef ? 'construction id ref: ' + surfaceOther.constructionIdRef + b : '' ) +
						( spaceIdOther1 ? 'space:  <button onclick=REPtoggleSpace("' + spaceIdOther1 + '"); >' + spaceIdOther1 + '</button>' + b : '' ) +
						( spaceIdOther2 ? 'space:  <button onclick=REPtoggleSpace("' + spaceIdOther2 + '"); >' + spaceIdOther2 + '</button>' + b : '' ) +
						( surfaceOther.CADObjectId ?
							'<button onclick=REPtoggleCadId("' + encodeURI( surfaceOther.CADObjectId ) + '"); >cad object id: ' + surfaceOther.CADObjectId + '</button>' + b
							: ''
						) +
						'<button onclick=REPdeleteSurface("' + surface.id + '"); >delete ' + surfaceOther.id + '</button>' +

					'</div>' +
					'<hr style="border:none;border-top: medium double #333;" >' + b;

				count ++;

			}

		}

		for ( let child of surfaceMeshes.children ) {

			if ( !child.userData.data ) { continue; }

			if ( surfaceCoordinateDuplicates.includes( child.userData.data.Name ) && child.material.color ) { child.material.color.set( '#ffff00' ); }

		}

		const info =

		sumSummary.innerHTML= 'Duplicate Surfaces &raquo; ' + count;
		divInfo.innerHTML = 'Two surfaces with identical coordinates';
		divCoordinates.innerHTML= flowContent;

	}


	function REPdeleteSurface( id ){

		const proceed = confirm( 'OK to delete surface: ' + id + '?' );

		if( !proceed ){ return; }

		surfacesResponse = gbxml.getElementsByTagName("Surface");

		surface = surfacesResponse[ id ];

		console.log( 'id', id, 'surface to delete', surface );

		surface.remove();


		for ( let child of surfaceMeshes.children ) {

			if ( id === child.userData.data.id ) {

				surfaceMeshes.remove( child );

			}

		}

		element =  document.getElementById( 'divSurface' + id );
		element.style.opacity = 0.2;

	}



	function REPtoggleAdjacencies ( id, surfaceArray ) {

		//console.log( '', that.innerText );

		divLog.innerHTML = '';

		if ( id.style.backgroundColor !== 'var( --but-bg-color )' ) {

			//surfaceGroup.visible = true;

			for ( let child of surfaceMeshes.children ) {

				if ( !child.userData.data ) { continue; }

				if ( surfaceArray.includes( child.userData.data.Name ) ) {

					child.visible = true;

				} else {

					child.visible = false;

				}

			}

			id.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			REPallVisible();

			id.style.backgroundColor = '';

		}

	}



	REPallVisible = () => {

		surfaceMeshes.visible = true;
		surfaceEdges.visible = true;
		divLog.innerHTML = '';

		for ( let child of surfaceMeshes.children ) {

				child.visible = true;

		}

		const buttons = document.body.getElementsByClassName( 'toggleView' );

		for ( butt of buttons ) {

			butt.style.backgroundColor = '';


		}

	}



	function REPtoggleSurface( id ) {

		divLog.innerHTML = '';

		for ( let child of surfaceMeshes.children ) {

			if ( child.userData.data.id === id ) {

				child.visible = true;

				//console.log( '', child );

//				REPzoomIntoSurface( child );

				if ( window.divHeadsUp ) {

					intersected = child;
					HUD.setHeadsUp();

				}

			} else {

				child.visible = false;

			}

		};

	}

	function REPzoomIntoSurface( id ){

		for ( let child of surfaceMeshes.children ) {

			if ( child.userData.data.id === id ) {

				REPzoomIntoMesh( child );

				break;

			}

		}

	}

	function REPzoomIntoMesh( mesh ) {
		//console.log( 'mesh', mesh );

		const center = mesh.localToWorld( mesh.geometry.boundingSphere.center.clone() );
		const radius = mesh.geometry.boundingSphere.radius > 1 ? mesh.geometry.boundingSphere.radius : 1;
		//console.log( 'bbb', center, radius );

		scene.remove( telltale );
		const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
		const material = new THREE.MeshNormalMaterial( { opacity: 0.7, transparent: true } );
		telltale = new THREE.Mesh( geometry, material );
		telltale.position.copy( center );
		scene.add( telltale );

		controls.target.copy( center );
		camera.position.copy( center.clone().add( new THREE.Vector3( 3.0 * radius, - 3.0 * radius, 3.0 * radius ) ) );

	}



	function REPtoggleSpace( id ) {

		//		surfaceGroup.visible = true;
		divLog.innerHTML = '';

		for ( let child of surfaceMeshes.children ) {

//			if ( !child.userData.data ) { continue; }

			child.visible = false;

			adjacentSpaceId = child.userData.data.AdjacentSpaceId;

			if ( adjacentSpaceId && adjacentSpaceId.spaceIdRef && id === adjacentSpaceId.spaceIdRef ) {

				child.visible = true;


			} else if ( Array.isArray( adjacentSpaceId ) === true ) {

				if ( id === adjacentSpaceId[ 0 ].spaceIdRef || id === adjacentSpaceId[ 1 ].spaceIdRef ) {

					child.visible = true;

//					const type = child.userData.data.surfaceType;

//					if ( type === 'InteriorFloor' || type === 'SlabOnGrade' || type === 'RaisedFloor' || type === 'UndergroundSlab' ) {

						//REPzoomIntoSurface( child );

//					}

				}

			}

		}
/*
		for ( let space of spaces ) {

			if ( id === space.id ) {

				divLog.innerHTML = 'Space name: ' + space.Name;

			}

		}
*/
	}


	function REPtoggleCadId( CADObjectId ) {
		//console.log( '', CADObjectId );

		surfaceEdges.visible = true;
		divLog.innerHTML = '';

		for ( let child of surfaceMeshes.children ) {

			if ( encodeURI( child.userData.data.CADObjectId ) === CADObjectId ) {

				child.visible = true;

			} else {

				child.visible = false;

			}

		}

	}


	function REPtoggleSurfaceType( that ) {

		divLog.innerHTML = '';
		//console.log( '', surfaceAdjacencyDuplicates );

		for ( let child of surfaceMeshes.children ) {

			if ( child.userData.data.surfaceType !== that.innerText ) {

				child.visible = false;

			} else {

				child.visible = true;

			}

		}

	}


	EDTsaveFile = () => {

		//		xmlText = prettifyXml( gbxmlResponseXML ); // not
		const xmlText = new XMLSerializer().serializeToString( gbxml );
		//console.log( 'xmlText', xmlText );

		var blob = new Blob( [ xmlText ] );
		var a = document.body.appendChild( document.createElement( 'a' ) );
		a.href = window.URL.createObjectURL( blob );
		a.download = gbjson.Campus.Building.id + '.xml';
		a.click();
		//		delete a;
		a = null;

	}

