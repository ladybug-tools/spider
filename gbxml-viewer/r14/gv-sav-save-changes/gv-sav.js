// Copyright 2018 Ladybug Tools authors. MIT License

	var SAV = {};



	SAV.initChanges = function () { // called from bottom of file

		//CTX.surfaceChanges = {};

		SAV.initMenuSaveChanges( CORdivMenuItems );

		COR.setPanelButtonInit( butSaveChanges );

	};


	/*
	SAV.xxxinitChanges = function() {

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


		if ( SAV.butSaveChanges.style.fontStyle !== 'italic' ) {

			initMenuSaveChanges();

			SAV.butSaveChanges.style.cssText = 'background-color: pink !important; font-style: italic; font-weight: bold';

		} else {

			divMenuItems.innerHTML = '';

			SAV.butSaveChanges.style.fontStyle = '';
			SAV.butSaveChanges.style.backgroundColor = '';
			SAV.butSaveChanges.style.fontWeight = '';

		}

*/


	SAV.initMenuSaveChanges = function( target ) {

		target.innerHTML =

			`<details id = detSaveChanges class=app-menu open>

			<summary>Save your changes to a file &nbsp; <a href=#../gv-sav-save-changes/README.md>?</a></summary>

			<small><p>Save to file edits you make with right menu Heads-up Display. Apply your edits to next incoming gbXML source file update.</p></small>

			<p><button onClick=SAV.initChanges() > Start a fresh session of save changes</button></p>

			<p><button onClick=SAV.viewChanges() > View current changes</button></p>

			<p><button onclick=SAV.saveChanges(); > Save your changes to a file</button></p>

			<small><p>
				Open a file of saved changes. Apply the edits to the current model</button>
			</p></small>

			<p><input type=file id=inpFile onchange=SAV.openChanges(this); ></p>

			<details id = detSaveChangesSamples class=app-menu open>

			<summary>Save changes sample files</summary>

			<p><a href="#../../../gbxml-sample-files/save-changes-samples/changes-bristol-clifton-town-road.json" >Colorizer</a></p>

			<hr>

		</details>`;

	}


/*
	SAV.initChanges = function() {

		CTX.surfaceChanges = {};

	}

*/


	SAV.viewChanges = function() {

		CORdivItemsRight.innerHTML =
		`
			<h3>Current for save changes file JSON source code</h3>
			<textArea id=txtSaveSource style="height:300px;width:100%;" ></textArea>

			<p>
				<button onclick=SAV.setPopupChanges(); >Um, what the heck, Just do it.</button> << work-in-progress. Three.js surfaces updated but not the gbXML.
			</p>

		`;

		COR.setRightMenuWide();

		txtSaveSource.value = JSON.stringify( CTX.surfaceChanges, null, ' ' );

	}



	SAV.saveChanges = function() {

		console.log( 'CTX.surfaceChanges', CTX.surfaceChanges );

		const output = JSON.stringify( CTX.surfaceChanges, null, ' ' );
		const blob = new Blob( [ output ] );
		let a = document.body.appendChild( document.createElement( 'a' ) );
		a.href = window.URL.createObjectURL( blob );
		a.download = GBX.gbjson.Campus.Building.id + '-changes.json';
		a.click();
		a = null;

	};



	SAV.openChanges = function( files ) {

		const reader = new FileReader();
		reader.onload = function( event ) {

			CTX.surfaceChanges = JSON.parse( reader.result );
			SAV.setPopupChanges( files.files[0] );

		}

		reader.readAsText( files.files[0] );

	};



	SAV.setPopupChanges = function( file ) {


		divPopUpContents.innerHTML =
		`
			<h3>statistics for save changes file</h3>
			<div id=divSavHeader ></div>
			<h3>actions taken</h3>
			<div id=divSavContents ></div>
			<h3>save changes file source code</h3>
			<textArea id=txtSaveSource style="height:300px;width:100%;" ></textArea>
		`;

		divPopUp.style.display = 'block';
		window.scrollTo( 0, 0 );


		txtSaveSource.value = JSON.stringify( CTX.surfaceChanges, null, ' ' );

		divSavHeader.innerHTML =
			( file ?
			'name: <i>' + file.name + '</i><br>' +
			'size: <i>' + file.size.toLocaleString() + ' bytes</i><br>' +
			( file.type  ? 'type: <i>' + file + '</i><br>' : '' ) +
			'modified: <i>' + file.lastModifiedDate.toLocaleDateString() + '</i><br>'
			: '' ) +
			( CTX.surfaceChanges.deletes ? 'deletes: ' + CTX.surfaceChanges.deletes.length + '<br>' : '' )+
			( CTX.surfaceChanges.types ? 'type changes: ' + CTX.surfaceChanges.types.length + '<br>' : '' ) +
			( CTX.surfaceChanges.CADObjectId ? 'cad id changes: ' + CTX.surfaceChanges.CADObjectId.length + '<br>' : '' ) +
			( CTX.surfaceChanges.oneAdjacent ? 'one adjacent changes: ' + CTX.surfaceChanges.oneAdjacent.length + '<br>' : '' ) +
			( CTX.surfaceChanges.twoAdjacent ? 'two adjacent changes: ' + CTX.surfaceChanges.twoAdjacent.length + '<br>' : '' ) +
		'<br>';

		SAV.getUpdates();

		//console.log( '', files );
	}



	SAV.getSurfaceByName = function( name ) {

		const surfacesXml = GBX.gbxml.getElementsByTagName( "Surface" );
		let surfaceXml;

		for ( let surface of surfacesXml) {

			if ( name === surface.getElementsByTagName("Name")[ 0 ].innerHTML ) {

				//console.log( 'name', name );

				surfaceXml = surface;

				break;

			}

		}

		return surfaceXml;

	}



	SAV.getUpdates = function() {

		if ( CTX.surfaceChanges.addAttributesMissing ) { SAV.addAttributesMissing(); }


		if ( CTX.surfaceChanges.deletes ) { SAV.setDeletes(); }


		if ( CTX.surfaceChanges.deleteDuplicateSurfaces ) { SAV.setDeleteSurfaceDuplicates(); }


		if ( CTX.surfaceChanges.types ) {

			for ( let item of CTX.surfaceChanges.types ) {

				//console.log( 'item', item );

				const surfaceXml = SAV.getSurfaceByName( item.name );

				if ( !surfaceXml ) {

					divSavContents.innerHTML += 'Types changes - not found surface name: ' + name + '<br>';
					continue;

				} else {

					surfaceXml.attributes.getNamedItem( 'surfaceType' ).nodeValue = item.type;

					surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.Name === item.name );
					surfaceMesh.userData.data.surfaceType = item.type;
					surfaceMesh.material.color.setHex( GBX.colors[ item.type ] );
					surfaceMesh.material.needsUpdate = true;

					const twoAdjacents = [ 'InteriorWall', 'InteriorFloor', 'Ceiling', 'Air', 'RaisedFloor' ];

					if ( twoAdjacents.includes( item.type ) ) { // new is two adjacent

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
						console.log( 'item.type', item.type );
						console.log( 'Array.isArray( surfaceMesh.userData.data.AdjacentSpaceId )', Array.isArray( surfaceMesh.userData.data.AdjacentSpaceId ) );

						if ( Array.isArray( surfaceMesh.userData.data.AdjacentSpaceId ) === true && item.type === 'Shade' ) {

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

						} else if ( Array.isArray( surfaceMesh.userData.data.AdjacentSpaceId ) === true && item.type !== 'Shade' ) {


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

						} else if ( Array.isArray( surfaceMesh.userData.data.AdjacentSpaceId ) === false && item.type !== 'Shade' ) {

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

					divSavContents.innerHTML += 'Types changes - updated surface name: ' + name + '<br>';

				}

			}

		}


		if ( CTX.surfaceChanges.CADObjectId ) {

			for ( let item of CTX.surfaceChanges.CADObjectId ) {

				//const surfaceXml = GBX.gbxml.getElementsByTagName( "Surface"  )[ item.id ];

				const surfaceXml = SAV.getSurfaceByName( item.name );

				if ( !surfaceXml ) {

					divSavContents.innerHTML += 'cad object id changes - not found item name: ' + item.name + '<br>'
					continue;

				} else {

					cadObjId = surfaceXml.getElementsByTagName( "CADObjectId" )[ 0 ];

					if ( cadObjId ) {

						cadObjId.innerHTML = item.cadId;

						const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.Name === item.name );
						surfaceMesh.userData.data.CADObjectId = item.cadId;

						divSavContents.innerHTML += 'change cad object for item name: ' + item.name + '<br>';

					} else {

						surfaceXml.setAttribute( "CADObjectId", item.cadId);

						const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.Name=== item.name );
						surfaceMesh.userData.data.CADObjectId = item.cadId;

						divSavContents.innerHTML += 'Added cad object for item name: ' + item.name + '<br>';

					}

				}

			}

		}



		if ( CTX.surfaceChanges.oneAdjacent ) {

			for ( let item of CTX.surfaceChanges.oneAdjacent ) {

				//const surfaceXml = GBX.gbxml.getElementsByTagName( "Surface"  )[ item.name ];

				const surfaceXml = SAV.getSurfaceByName( item.name );

				if ( !surfaceXml ) {

					divSavContents.innerHTML += 'adjacent 1 - not found item name: ' + item.name + '<br>'
					continue;

				} else {

					const adj = surfaceXml.getElementsByTagName( "AdjacentSpaceId" )[ 0 ];

					const att = adj.attributes.getNamedItem( 'spaceIdRef' ).nodeValue = item.spaceId;
					//console.log( 'adj', adj, att );

					const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.name === item.name );
					surfaceMesh.userData.data.AdjacentSpaceId = { "spaceIdRef": item.spaceId };

					divSavContents.innerHTML += 'change adjacent space 1 for item  name: ' + item.name + '<br>';

				}

			}

		}


		if ( CTX.surfaceChanges.twoAdjacent ) {

			for ( let item of CTX.surfaceChanges.twoAdjacent ) {

				const surfaceXml = GBX.gbxml.getElementsByTagName( "Surface"  )[ item.name ];

				if ( !surfaceXml ) {

					divSavContents.innerHTML += 'adjacent 2 - not found item name: ' + item.name + '<br>';
					continue;

				} else {

					adj1 = surfaceXml.getElementsByTagName( "AdjacentSpaceId" )[ 0 ];
					att1 = adj1.attributes.getNamedItem( 'spaceIdRef' ).nodeValue = item.spaceId[ 0 ];

					adj2 = surfaceXml.getElementsByTagName( "AdjacentSpaceId" )[ 1 ];
					att2 = adj2.attributes.getNamedItem( 'spaceIdRef' ).nodeValue = item.spaceId[ 1 ];

					const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.name === item.name );
					surfaceMesh.userData.data.AdjacentSpaceId = [ { "spaceIdRef": item.spaceId[ 0 ] }, { "spaceIdRef": item.spaceId[ 1 ] } ];

					divSavContents.innerHTML += 'change adjacent space 2 for item  name: ' + item.name + '<br>';

				}

			}

		}


		if ( CTX.surfaceChanges.surfaceColors ) {

			//GBX.colors = CTX.surfaceChanges.surfaceColors;

			for ( let type of GBX.surfaceTypes ) {

				color = CTX.surfaceChanges.surfaceColors[ type ];
				//console.log( '', color );

				GBX.colors[ type ] = color ? new THREE.Color( color.toLowerCase() ) : GBX.colors[ type ];
				//console.log( 'GBX.colors[ type ]', type,  GBX.colors[ type ]);

			}

			//console.log( '', JSON.stringify( GBX.colors ) );

			GBX.setAllVisible();

			//divSavContents.innerHTML += 'update colors ' + JSON.stringify( GBX.colors ) + '<br>';

		}


		if ( CTX.surfaceChanges.groundPlane ) {

			let meshGroundHelper = THR.scene.getObjectByName( 'groundHelper' );
			const color = CTX.surfaceChanges.groundPlane.color;
			elevation = CTX.surfaceChanges.groundPlane.elevation;

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


		if ( CTX.surfaceChanges.backgroundGradient === true ) { SAV.setBackgroundGradient(); }

//		if ( HUD.setHeadsUp ) { HUD.setHeadsUp(); }

	};



	SAV.setBackgroundGradient = function() {

		var col = function() { return ( 0.5 + 0.5 * Math.random() ).toString( 16 ).slice( 2, 8 ); };
		var pt = function() { return ( Math.random() * window.innerWidth ).toFixed( 0 ); };
		var image = document.body.style.backgroundImage;

		document.body.style.backgroundImage = image ? '' : 'radial-gradient( circle farthest-corner at ' +
			pt() + 'px ' + pt() + 'px, #' + col() + ' 0%, #' + col() + ' 50%, #' + col() + ' 100% ) ';

	};


	SAV.setDeletes = function() {

		for ( let name of CTX.surfaceChanges.deletes ) {

			const surfaceXml = SAV.getSurfaceByName( name );

			console.log( 'surfaceXml', surfaceXml);

			if ( !surfaceXml ) {

				//console.log( 'id', id, surfaceXml );
				divSavContents.innerHTML += 'Deletes - not found surface name: ' + name + '<br>';
				continue;

			} else {

				surfaceXml.remove();

				const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.Name === name );
				GBX.surfaceMeshes.remove( surfaceMesh );

				divSavContents.innerHTML += 'Deleted surface name: ' + name + '<br>';

			}

		}

	};



	SAV.setDeleteSurfaceDuplicates = function() {


		for ( let name of CTX.surfaceChanges.deleteDuplicateSurfaces ) {

			const surfaceXml = SAV.getSurfaceByName( name );

			//console.log( 'surfaceXml', surfaceXml);

			if ( !surfaceXml ) {

				//console.log( 'id', id, surfaceXml );
				divSavContents.innerHTML += 'Deletes - not found surface name: ' + name + '<br>';
				continue;

			} else {

				surfaceXml.remove();

				const item = GBX.surfaceJson.find( element => element.Name === name );
				const index = GBX.surfaceJson.indexOf( item )

				if ( index >= 0 ) {

					GBX.surfaceJson.splice( index, 1 );

				}

				const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.Name === name );
				GBX.surfaceMeshes.remove( surfaceMesh );

				divSavContents.innerHTML += 'Deleted surface name: ' + name + '<br>';

			}

		}

		CTX.surfaceChanges.deleteDuplicateSurfaces = [];
		//ISS.surfaceChanges.deleteDuplicateSurfaces = [];

	};



	SAV.addAttributesMissing = function() {

		attributes = CTX.surfaceChanges.addAttributesMissing;
		//console.log( 'attributes', attributes );

		for ( attribute in attributes ) {

			//console.log( 'attribute', attribute );

			//console.log( 'value', attributes[ attribute ] );

			GBX.gbxml.setAttribute( attribute, attributes[ attribute ] );

			divSavContents.innerHTML += `Added gbXML attribute ${attribute} with value of: ${attributes[ attribute ]}<br>`;
		}

		//console.log( 'GBX.gbxml', GBX.gbxml );

	};

	SAV.initChanges();