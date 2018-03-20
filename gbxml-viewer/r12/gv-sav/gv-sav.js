// Copyright 2018 Ladybug Tools authors. MIT License

	var SAV = {};
	var HUD = HUD || {};

	SAV.initChanges = function() {

		//GBV.surfaceChanges = { deletes: [], types: [], oneAdjacent: [], twoAdjacent: [], cadObjs: [], surfaceColors: [] };

	};

	SAV.initTemplate = function () {

		if ( window.butMenuLoad ) {

			SAV.butSaveChanges = butMenuLoad;

			SAV.title = 'gv-tmp - gbXML Viewer Save Changes';;
			document.title = SAV.title;
			aDocumentTitle.innerHTML = SAV.title;
			SAV.butSaveChanges.innerHTML = SAV.title;

			divContainer.style.display = 'none';
			THR.controls.autoRotate = false;
			THR.controls.keys = false;

		} else {

			SAV.butSaveChanges = butSaveChanges;

		}


		if ( SAV.butSaveChanges.style.backgroundColor !== 'var( --but-bg-color )' ) {

			divMenuItems.innerHTML =

			`<details id = detSaveChanges  class=app-menu open>

					<summary>Save your changes to a file</summary>

					<div id = "divSave" style=width:300px; >

					<p>Save your changes in the Heads-up Display to a file for reuse with next incoming gbXML source file update</p>

					<p><button onClick=SAV.initChanges() > start a fresh session of save changes</button></p>

					<p><button onclick=SAV.saveChanges(); > save your changes to a file</button></p>

					<p>
						Open a save changes file and apply the edits to the current model</button>
						<input type=file id=inpFile onchange=SAV.openChanges(this); >
					</p>

					</div>


					<hr>

				</details>

			` + divMenuItems.innerHTML;

				//initMenuSaveChanges();

				//			SAV.initChanges();

			SAV.butSaveChanges.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			detSaveChanges.remove();

			SAV.butSaveChanges.style.backgroundColor = '';

		}



		function initMenuSaveChanges() {

			let txt =
			`
				<p>Save your changes in the Heads-up Display to a file for reuse with next incoming gbXML source file update</p>

				<p><button onClick=SAV.initChanges() > start a fresh session of save changes</button></p>

				<p><button onclick=SAV.saveChanges(); > save your changes to a file</button></p>

				<p>
					Open a save changes file and apply the edits to the current model</button>
					<input type=file id=inpFile onchange=SAV.openChanges(this); >
				</p>
			`;

			divSave.innerHTML = '<p>' + txt + '<p>';

		}


	}();



	SAV.saveChanges = function() {

		console.log( 'GBV.surfaceChanges', GBV.surfaceChanges );

		const output = JSON.stringify( GBV.surfaceChanges );
		const blob = new Blob( [ output ] );
		let a = document.body.appendChild( document.createElement( 'a' ) );
		a.href = window.URL.createObjectURL( blob );
		a.download = GBX.gbjson.Campus.Building.id + '-changes.json';
		a.click();
		//		delete a;
		a = null;

	};



	SAV.openChanges = function( files ) {

		var fileData, reader, data;

		divContents.innerHTML =
		`
			<h3>statistics for save changes file</h3>
			<div id=divSavHeader ></div>
			<h3>actions taken</h3>
			<div id=divSavContents ></div>
			<h3>save changes file source code</h3>
			<textArea id=txtSaveSource style="height:300px;width:100%;" ></textArea>
		`;

		divContainer.style.display = 'block';
		window.scrollTo( 0, 0 );

		reader = new FileReader();
		reader.onload = function( event ) {

			GBV.surfaceChanges = JSON.parse( reader.result );
			txtSaveSource.value = JSON.stringify( GBV.surfaceChanges, null, ' ' );

			divSavHeader.innerHTML =
				'name: <i>' + files.files[0].name + '</i><br>' +
				'size: <i>' + files.files[0].size.toLocaleString() + ' bytes</i><br>' +
				( files.files[0].type  ? 'type: <i>' + files.files[0].type + '</i><br>' : '' ) +
				'modified: <i>' + files.files[0].lastModifiedDate.toLocaleDateString() + '</i><br>' +
				( GBV.surfaceChanges.deletes ? 'deletes: ' + GBV.surfaceChanges.deletes.length + '<br>' : '' )+
				( GBV.surfaceChanges.types ? 'type changes: ' + GBV.surfaceChanges.types.length + '<br>' : '' ) +
				( GBV.surfaceChanges.cadObjs ? 'cad id changes: ' + GBV.surfaceChanges.cadObjs.length + '<br>' : '' ) +
				( GBV.surfaceChanges.oneAdjacent ? 'one adjacent changes: ' + GBV.surfaceChanges.oneAdjacent.length + '<br>' : '' ) +
				( GBV.surfaceChanges.twoAdjacent ? 'two adjacent changes: ' + GBV.surfaceChanges.twoAdjacent.length + '<br>' : '' ) +
			'<br>';

			SAV.getUpdates();

			//console.log( '', files );

		}

		reader.readAsText( files.files[0] );

	};



	SAV.getUpdates = function() {

		if ( GBV.surfaceChanges.deletes ) {
			for ( let id of GBV.surfaceChanges.deletes ) {

				const surfaceXml = GBX.gbxml.getElementsByTagName( "Surface"  )[ id ];

				if ( !surfaceXml ) {
					//console.log( 'id', id, surfaceXml );
					divSavContents.innerHTML += 'Deletes - not found surface id: ' + id + '<br>';
					continue;

				} else {

					surfaceXml.remove();

					const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === id );
					GBX.surfaceMeshes.remove( surfaceMesh );

					divSavContents.innerHTML += 'Deleted surface id: ' + id + '<br>';

				}

			}

		}


		if ( GBV.surfaceChanges.types ) {

			for ( let surface of GBV.surfaceChanges.types ) {

				surfaceXml = GBX.gbxml.getElementsByTagName( "Surface"  )[ surface.id ];

				if ( !surfaceXml ) {

					divSavContents.innerHTML += 'Types changes - not found surface id: ' + surface.id + '<br>';
					continue;

				} else {

					surfaceXml.attributes.getNamedItem( 'surfaceType' ).nodeValue = surface.type;

					surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === surface.id );
					surfaceMesh.userData.data.surfaceType = surface.type;
					surfaceMesh.material.color.setHex( GBX.colors[ surface.type ] );
					surfaceMesh.material.needsUpdate = true;

					const twoAdjacents = [ 'InteriorWall', 'InteriorFloor', 'Ceiling', 'Air', 'RaisedFloor' ];

					if ( twoAdjacents.includes( surface.type ) ) { // new is two adjacent

						if ( !surfaceMesh.userData.data.AdjacentSpaceId ){ // was Shade

							const newAdj = GBX.gbxmlResponseXML.createElement( "AdjacentSpaceId" );
							newAdj.setAttribute( "spaceIdRef", "none" ) ;
							const newAdjTxt = surfaceXml.appendChild( newAdj );

							const newAdj2 = GBX.gbxmlResponseXML.createElement( "AdjacentSpaceId" );
							newAdj2.setAttribute( "spaceIdRef", "none" ) ;
							const newAdjTxt2 = surfaceXml.appendChild( newAdj2 );

							surfaceMesh.userData.data.AdjacentSpaceId = [ { "spaceIdRef": 'none' }, { "spaceIdRef": 'none' } ];
							console.log( 'was 0 / now 2', surfaceXml );

						} else if (  Array.isArray( surfaceMesh.userData.data.AdjacentSpaceId ) === true ) { // was already two adjacent

							console.log( 'was 2 / now 2', surfaceXml );

						} else { // was one adjacent

							const newAdj = GBX.gbxmlResponseXML.createElement( "AdjacentSpaceId" );
							newAdj.setAttribute( "spaceIdRef", "none" ) ;
							const newAdjTxt = surfaceXml.appendChild( newAdj );

							surfaceMesh.userData.data.AdjacentSpaceId = [ { "spaceIdRef": surfaceMesh.userData.data.AdjacentSpaceId.spaceIdRef }, { "spaceIdRef": 'none' } ];
							console.log( 'was 1 / now 2', surfaceXml );

						}

					} else { // new is Shade or one adjacent

						console.log( 'new 0 or 1  ', surfaceXml );
						console.log( 'mesh data[ 0 ]', surfaceMesh.userData.data.AdjacentSpaceId  );
						console.log( 'surface.type', surface.type );
						console.log( 'Array.isArray( surfaceMesh.userData.data.AdjacentSpaceId )', Array.isArray( surfaceMesh.userData.data.AdjacentSpaceId ) );

						if ( Array.isArray( surfaceMesh.userData.data.AdjacentSpaceId ) === true && surface.type === 'Shade' ) {

							const adjSpace1 = surfaceXml.getElementsByTagName("AdjacentSpaceId")[1];
							//console.log( 'adjSpace1',  adjSpace1 );

							const removedId1 = adjSpace1.getAttribute( 'spaceIdRef' );
							const removed1 = surfaceXml.removeChild( adjSpace1 );

							const adjSpace2 = surfaceXml.getElementsByTagName("AdjacentSpaceId")[0];
							//console.log( 'adjSpace2', adjSpace2 );

							const removedId2 = adjSpace2.getAttribute( 'spaceIdRef' );
							const removed2 = surfaceXml.removeChild( adjSpace2 );
							console.log( 'removedId2', removedId2 );

							delete( surfaceMesh.userData.data.AdjacentSpaceId );
							console.log( 'surfaceMesh', surfaceMesh );

							console.log( 'was 2 / now 0', surfaceXml );

						} else if ( Array.isArray( surfaceMesh.userData.data.AdjacentSpaceId ) === true && surface.type !== 'Shade' ) {


							const adjSpace1 = surfaceXml.getElementsByTagName("AdjacentSpaceId")[1];
							//console.log( 'adjSpace1',  adjSpace1 );

							const removedId1 = adjSpace1.getAttribute( 'spaceIdRef' );
							const removed1 = surfaceXml.removeChild( adjSpace1 );

							const adjSpace2 = surfaceXml.getElementsByTagName("AdjacentSpaceId")[0];

							const removedId2 = adjSpace2.getAttribute( 'spaceIdRef' );
							//const removed2 = surfaceXml.removeChild( adjSpace2 );

							//console.log( 'adjSpace2', adjSpace2 );

							//delete( surfaceMesh.userData.data.AdjacentSpaceId );
							//console.log( 'surfaceMesh', surfaceMesh );

							surfaceMesh.userData.data.AdjacentSpaceId = { "spaceIdRef": removedId2 };
							console.log( 'surfaceMesh', surfaceMesh );
							console.log( 'surfaceXml', surfaceXml );

							console.log( ' was 2 / now 1 / ' );

						} else if ( Array.isArray( surfaceMesh.userData.data.AdjacentSpaceId ) === false && surface.type !== 'Shade' ) {

							if ( surfaceMesh.userData.data.AdjacentSpaceId !== undefined ) {

								console.log( 'surfaceMesh', surfaceMesh.userData.data.AdjacentSpaceId );
								console.log( 'surfaceXml', surfaceXml );

								console.log( 'was 1 / now 1 / ' );

							} else {

								const newAdj = GBX.gbxmlResponseXML.createElement( "AdjacentSpaceId" );
								newAdj.setAttribute( "spaceIdRef", surfaceMesh.userData.data.AdjacentSpaceId ) ;
								const newAdjTxt = surfaceXml.appendChild( newAdj );

								surfaceMesh.userData.data.AdjacentSpaceId = { "spaceIdRef": "none" };
								console.log( 'surfaceMesh', surfaceMesh.userData.data.AdjacentSpaceId );
								console.log( 'surfaceXml', surfaceXml );

								console.log( 'was 0 / now 1 / ' );

							}

						}

					}

					divSavContents.innerHTML += 'Types changes - updated surface id: ' + surface.id + '<br>';

				}

			}

		}


		if ( GBV.surfaceChanges.cadObjs ) {

			for ( let surface of GBV.surfaceChanges.cadObjs ) {

				const surfaceXml = GBX.gbxml.getElementsByTagName( "Surface"  )[ surface.id ];

				if ( !surfaceXml ) {

					divSavContents.innerHTML += 'cad object id changes - not found surface id: ' + surface.id + '<br>'
					continue;

				} else {

					cadObjId = surfaceXml.getElementsByTagName( "CADObjectId" )[ 0 ];

					if ( cadObjId ) {

						cadObjId.innerHTML = surface.cadId;

						const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === surface.id );
						surfaceMesh.userData.data.CADObjectId = surface.cadId;

						divSavContents.innerHTML += 'change cad object for surface id: ' + surface.id + '<br>';

					} else {

						surfaceXml.setAttribute( "CADObjectId", surface.cadId);

						const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === surface.id );
						surfaceMesh.userData.data.CADObjectId = surface.cadId;

						divSavContents.innerHTML += 'Added cad object for surface  id: ' + surface.id + '<br>';

					}

				}

			}

		}



		if ( GBV.surfaceChanges.oneAdjacent ) {

			for ( let surface of GBV.surfaceChanges.oneAdjacent ) {

				const surfaceXml = GBX.gbxml.getElementsByTagName( "Surface"  )[ surface.id ];

				if ( !surfaceXml ) {

					divSavContents.innerHTML += 'adjacent 1 - not found surface id: ' + surface.id + '<br>'
					continue;

				} else {

					const adj = surfaceXml.getElementsByTagName( "AdjacentSpaceId" )[ 0 ];

					const att = adj.attributes.getNamedItem( 'spaceIdRef' ).nodeValue = surface.spaceId;
					//console.log( 'adj', adj, att );

					const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === surface.id );
					surfaceMesh.userData.data.AdjacentSpaceId = { "spaceIdRef": surface.spaceId };

					divSavContents.innerHTML += 'change adjacent space 1 for surface  id: ' + surface.id + '<br>';

				}

			}

		}


		if ( GBV.surfaceChanges.twoAdjacent ) {

			for ( let surface of GBV.surfaceChanges.twoAdjacent ) {

				const surfaceXml = GBX.gbxml.getElementsByTagName( "Surface"  )[ surface.id ];

				if ( !surfaceXml ) {

					divSavContents.innerHTML += 'adjacent 2 - not found surface id: ' + surface.id + '<br>';
					continue;

				} else {

					adj1 = surfaceXml.getElementsByTagName( "AdjacentSpaceId" )[ 0 ];
					att1 = adj1.attributes.getNamedItem( 'spaceIdRef' ).nodeValue = surface.spaceId[ 0 ];

					adj2 = surfaceXml.getElementsByTagName( "AdjacentSpaceId" )[ 1 ];
					att2 = adj2.attributes.getNamedItem( 'spaceIdRef' ).nodeValue = surface.spaceId[ 1 ];

					const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === surface.id );
					surfaceMesh.userData.data.AdjacentSpaceId = [ { "spaceIdRef": surface.spaceId[ 0 ] }, { "spaceIdRef": surface.spaceId[ 1 ] } ];

					divSavContents.innerHTML += 'change adjacent space 2 for surface  id: ' + surface.id + '<br>';

				}

			}

		}


		if ( GBV.surfaceChanges.surfaceColors ) {

			//GBX.colors = GBV.surfaceChanges.surfaceColors;

			for ( let type of GBX.surfaceTypes ) {

				color = GBV.surfaceChanges.surfaceColors[ type ];
				//console.log( '', color );

				GBX.colors[ type ] = color ? new THREE.Color( color.toLowerCase() ) : GBX.colors[ type ];
				//console.log( 'GBX.colors[ type ]', type,  GBX.colors[ type ]);

			}

			//console.log( '', JSON.stringify( GBX.colors ) );

			GBX.setAllVisible();

			//divSavContents.innerHTML += 'update colors ' + JSON.stringify( GBX.colors ) + '<br>';

		}

		if ( GBV.surfaceChanges.groundPlane ) {

			let meshGroundHelper = THR.scene.getObjectByName( 'groundHelper' );
			const color = GBV.surfaceChanges.groundPlane.color;
			elevation = GBV.surfaceChanges.groundPlane.elevation;

			if ( !meshGroundHelper ) {

				const bbox = new THREE.Box3().setFromObject( GBX.surfaceMeshes );

				const geometry = new THREE.BoxBufferGeometry( 3 * GBX.surfaceMeshes.userData.radius, 3 * GBX.surfaceMeshes.userData.radius, 1  );
				const material = new THREE.MeshPhongMaterial( { color: color, opacity: 0.85, transparent: true } );
				meshGroundHelper = new THREE.Mesh( geometry, material );
				meshGroundHelper.name = 'groundHelper';
				meshGroundHelper.receiveShadow = true;
				meshGroundHelper.position.set( THR.axesHelper.position.x, THR.axesHelper.position.y, elevation );

				//GBX.surfaceMeshes.add( meshGroundHelper );
				THR.scene.add( meshGroundHelper );


			}

		}


		if ( GBV.surfaceChanges.backgroundGradient === true ) {

			var col = function() { return ( 0.5 + 0.5 * Math.random() ).toString( 16 ).slice( 2, 8 ); };
			var pt = function() { return ( Math.random() * window.innerWidth ).toFixed( 0 ); };
			var image = document.body.style.backgroundImage;

			document.body.style.backgroundImage = image ? '' : 'radial-gradient( circle farthest-corner at ' +
				pt() + 'px ' + pt() + 'px, #' + col() + ' 0%, #' + col() + ' 50%, #' + col() + ' 100% ) ';


		}


		if ( HUD.setHeadsUp ) {

			HUD.setHeadsUp();

		}

	}

