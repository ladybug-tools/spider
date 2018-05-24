// Copyright 2018 Ladybug Tools authors. MIT License

	var SAV = {};

	SAV.initChanges = function() {

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



		function initMenuSaveChanges() {

			divMenuItems.innerHTML =

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

	}();


	SAV.initChanges = function() {

		GBI.surfaceChanges = {};

	}



	SAV.viewChanges = function() {

		divPopUpContents.innerHTML =
		`
			<h3>Current for save changes file JSON source code</h3>
			<textArea id=txtSaveSource style="height:300px;width:100%;" ></textArea>

			<p>
				<button onclick=SAV.setPopupChanges(); >Um, what the heck, Just do it.</button> << work-in-progress. Three.js surfaces updated but not the gbXML.
			</p>

		`;

		divPopUp.style.display = 'block';
		window.scrollTo( 0, 0 );

		txtSaveSource.value = JSON.stringify( GBI.surfaceChanges, null, ' ' );

	}


	SAV.saveChanges = function() {

		console.log( 'GBI.surfaceChanges', GBI.surfaceChanges );

		const output = JSON.stringify( GBI.surfaceChanges, null, ' ' );
		const blob = new Blob( [ output ] );
		let a = document.body.appendChild( document.createElement( 'a' ) );
		a.href = window.URL.createObjectURL( blob );
		a.download = GBP.gbjson.Campus.Building.id + '-changes.json';
		a.click();
		a = null;

	};



	SAV.openChanges = function( files ) {

		const reader = new FileReader();
		reader.onload = function( event ) {

			GBI.surfaceChanges = JSON.parse( reader.result );
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


		txtSaveSource.value = JSON.stringify( GBI.surfaceChanges, null, ' ' );

		divSavHeader.innerHTML =
			( file ?
			'name: <i>' + file.name + '</i><br>' +
			'size: <i>' + file.size.toLocaleString() + ' bytes</i><br>' +
			( file.type  ? 'type: <i>' + file + '</i><br>' : '' ) +
			'modified: <i>' + file.lastModifiedDate.toLocaleDateString() + '</i><br>'
			: '' ) +
			( GBI.surfaceChanges.deletes ? 'deletes: ' + GBI.surfaceChanges.deletes.length + '<br>' : '' )+
			( GBI.surfaceChanges.types ? 'type changes: ' + GBI.surfaceChanges.types.length + '<br>' : '' ) +
			( GBI.surfaceChanges.CADObjectId ? 'cad id changes: ' + GBI.surfaceChanges.CADObjectId.length + '<br>' : '' ) +
			( GBI.surfaceChanges.oneAdjacent ? 'one adjacent changes: ' + GBI.surfaceChanges.oneAdjacent.length + '<br>' : '' ) +
			( GBI.surfaceChanges.twoAdjacent ? 'two adjacent changes: ' + GBI.surfaceChanges.twoAdjacent.length + '<br>' : '' ) +
		'<br>';

		SAV.getUpdates();

		//console.log( '', files );
	}


	SAV.getSurfaceByName = function( name ) {

		const surfacesXml = GBP.gbxml.getElementsByTagName( "Surface" );
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

		if ( GBI.surfaceChanges.addAttributesMissing ) { SAV.addAttributesMissing(); }


		if ( GBI.surfaceChanges.deletes ) { SAV.setDeletes(); }


		if ( GBI.surfaceChanges.deleteDuplicateSurfaces ) { SAV.setDeleteSurfaceDuplicates(); }


		if ( GBI.surfaceChanges.types ) {

			for ( let item of GBI.surfaceChanges.types ) {

				//console.log( 'item', item );

				const surfaceXml = SAV.getSurfaceByName( item.name );

				if ( !surfaceXml ) {

					divSavContents.innerHTML += 'Types changes - not found surface name: ' + name + '<br>';
					continue;

				} else {

					surfaceXml.attributes.getNamedItem( 'surfaceType' ).nodeValue = item.type;

					surfaceMesh = GBP.surfaceMeshes.children.find( element => element.userData.data.Name === item.name );
					surfaceMesh.userData.data.surfaceType = item.type;
					surfaceMesh.material.color.setHex( GBP.colors[ item.type ] );
					surfaceMesh.material.needsUpdate = true;

					const twoAdjacents = [ 'InteriorWall', 'InteriorFloor', 'Ceiling', 'Air', 'RaisedFloor' ];

					if ( twoAdjacents.includes( item.type ) ) { // new is two adjacent

						if ( !surfaceMesh.userData.data.AdjacentSpaceId ){ // was Shade

							const newAdj = GBP.gbxmlResponseXML.createElement( "AdjacentSpaceId" );
							newAdj.setAttribute( "spaceIdRef", "none" ) ;
							const newAdjTxt = surfaceXml.appendChild( newAdj );

							const newAdj2 = GBP.gbxmlResponseXML.createElement( "AdjacentSpaceId" );
							newAdj2.setAttribute( "spaceIdRef", "none" ) ;
							const newAdjTxt2 = surfaceXml.appendChild( newAdj2 );

							surfaceMesh.userData.data.AdjacentSpaceId = [ { "spaceIdRef": 'none' }, { "spaceIdRef": 'none' } ];
							console.log( 'was 0 / now 2', surfaceXml );

						} else if (  Array.isArray( surfaceMesh.userData.data.AdjacentSpaceId ) === true ) { // was already two adjacent

							console.log( 'was 2 / now 2', surfaceXml );

						} else { // was one adjacent

							const newAdj = GBP.gbxmlResponseXML.createElement( "AdjacentSpaceId" );
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

								const newAdj = GBP.gbxmlResponseXML.createElement( "AdjacentSpaceId" );
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


		if ( GBI.surfaceChanges.CADObjectId ) {

			for ( let item of GBI.surfaceChanges.CADObjectId ) {

				//const surfaceXml = GBP.gbxml.getElementsByTagName( "Surface"  )[ item.id ];

				const surfaceXml = SAV.getSurfaceByName( item.name );

				if ( !surfaceXml ) {

					divSavContents.innerHTML += 'cad object id changes - not found item name: ' + item.name + '<br>'
					continue;

				} else {

					cadObjId = surfaceXml.getElementsByTagName( "CADObjectId" )[ 0 ];

					if ( cadObjId ) {

						cadObjId.innerHTML = item.cadId;

						const surfaceMesh = GBP.surfaceMeshes.children.find( element => element.userData.data.Name === item.name );
						surfaceMesh.userData.data.CADObjectId = item.cadId;

						divSavContents.innerHTML += 'change cad object for item name: ' + item.name + '<br>';

					} else {

						surfaceXml.setAttribute( "CADObjectId", item.cadId);

						const surfaceMesh = GBP.surfaceMeshes.children.find( element => element.userData.data.Name=== item.name );
						surfaceMesh.userData.data.CADObjectId = item.cadId;

						divSavContents.innerHTML += 'Added cad object for item name: ' + item.name + '<br>';

					}

				}

			}

		}



		if ( GBI.surfaceChanges.oneAdjacent ) {

			for ( let item of GBI.surfaceChanges.oneAdjacent ) {

				//const surfaceXml = GBP.gbxml.getElementsByTagName( "Surface"  )[ item.name ];

				const surfaceXml = SAV.getSurfaceByName( item.name );

				if ( !surfaceXml ) {

					divSavContents.innerHTML += 'adjacent 1 - not found item name: ' + item.name + '<br>'
					continue;

				} else {

					const adj = surfaceXml.getElementsByTagName( "AdjacentSpaceId" )[ 0 ];

					const att = adj.attributes.getNamedItem( 'spaceIdRef' ).nodeValue = item.spaceId;
					//console.log( 'adj', adj, att );

					const surfaceMesh = GBP.surfaceMeshes.children.find( element => element.userData.data.name === item.name );
					surfaceMesh.userData.data.AdjacentSpaceId = { "spaceIdRef": item.spaceId };

					divSavContents.innerHTML += 'change adjacent space 1 for item  name: ' + item.name + '<br>';

				}

			}

		}


		if ( GBI.surfaceChanges.twoAdjacent ) {

			for ( let item of GBI.surfaceChanges.twoAdjacent ) {

				const surfaceXml = GBP.gbxml.getElementsByTagName( "Surface"  )[ item.name ];

				if ( !surfaceXml ) {

					divSavContents.innerHTML += 'adjacent 2 - not found item name: ' + item.name + '<br>';
					continue;

				} else {

					adj1 = surfaceXml.getElementsByTagName( "AdjacentSpaceId" )[ 0 ];
					att1 = adj1.attributes.getNamedItem( 'spaceIdRef' ).nodeValue = item.spaceId[ 0 ];

					adj2 = surfaceXml.getElementsByTagName( "AdjacentSpaceId" )[ 1 ];
					att2 = adj2.attributes.getNamedItem( 'spaceIdRef' ).nodeValue = item.spaceId[ 1 ];

					const surfaceMesh = GBP.surfaceMeshes.children.find( element => element.userData.data.name === item.name );
					surfaceMesh.userData.data.AdjacentSpaceId = [ { "spaceIdRef": item.spaceId[ 0 ] }, { "spaceIdRef": item.spaceId[ 1 ] } ];

					divSavContents.innerHTML += 'change adjacent space 2 for item  name: ' + item.name + '<br>';

				}

			}

		}


		if ( GBI.surfaceChanges.surfaceColors ) {

			//GBP.colors = GBI.surfaceChanges.surfaceColors;

			for ( let type of GBP.surfaceTypes ) {

				color = GBI.surfaceChanges.surfaceColors[ type ];
				//console.log( '', color );

				GBP.colors[ type ] = color ? new THREE.Color( color.toLowerCase() ) : GBP.colors[ type ];
				//console.log( 'GBP.colors[ type ]', type,  GBP.colors[ type ]);

			}

			//console.log( '', JSON.stringify( GBP.colors ) );

			GBP.setAllVisible();

			//divSavContents.innerHTML += 'update colors ' + JSON.stringify( GBP.colors ) + '<br>';

		}


		if ( GBI.surfaceChanges.groundPlane ) {

			let meshGroundHelper = THR.scene.getObjectByName( 'groundHelper' );
			const color = GBI.surfaceChanges.groundPlane.color;
			elevation = GBI.surfaceChanges.groundPlane.elevation;

			if ( !meshGroundHelper ) {

				const bbox = new THREE.Box3().setFromObject( GBP.surfaceMeshes );

				const geometry = new THREE.BoxBufferGeometry( 3 * GBP.surfaceMeshes.userData.radius, 3 * GBP.surfaceMeshes.userData.radius, 1  );
				const material = new THREE.MeshPhongMaterial( { color: color, opacity: 0.85, transparent: true } );
				meshGroundHelper = new THREE.Mesh( geometry, material );
				meshGroundHelper.name = 'groundHelper';
				meshGroundHelper.receiveShadow = true;
				meshGroundHelper.position.set( THR.axesHelper.position.x, THR.axesHelper.position.y, elevation );

				//GBP.surfaceMeshes.add( meshGroundHelper );
				THR.scene.add( meshGroundHelper );


			}

		}


		if ( GBI.surfaceChanges.backgroundGradient === true ) { SAV.setBackgroundGradient(); }

		if ( HUD.setHeadsUp ) { HUD.setHeadsUp(); }

	};



	SAV.setBackgroundGradient = function() {

		var col = function() { return ( 0.5 + 0.5 * Math.random() ).toString( 16 ).slice( 2, 8 ); };
		var pt = function() { return ( Math.random() * window.innerWidth ).toFixed( 0 ); };
		var image = document.body.style.backgroundImage;

		document.body.style.backgroundImage = image ? '' : 'radial-gradient( circle farthest-corner at ' +
			pt() + 'px ' + pt() + 'px, #' + col() + ' 0%, #' + col() + ' 50%, #' + col() + ' 100% ) ';

	};


	SAV.setDeletes = function() {

		for ( let name of GBI.surfaceChanges.deletes ) {

			const surfaceXml = SAV.getSurfaceByName( name );

			console.log( 'surfaceXml', surfaceXml);

			if ( !surfaceXml ) {

				//console.log( 'id', id, surfaceXml );
				divSavContents.innerHTML += 'Deletes - not found surface name: ' + name + '<br>';
				continue;

			} else {

				surfaceXml.remove();

				const surfaceMesh = GBP.surfaceMeshes.children.find( element => element.userData.data.Name === name );
				GBP.surfaceMeshes.remove( surfaceMesh );

				divSavContents.innerHTML += 'Deleted surface name: ' + name + '<br>';

			}

		}

	};



	SAV.setDeleteSurfaceDuplicates = function() {


		for ( let name of GBI.surfaceChanges.deleteDuplicateSurfaces ) {

			const surfaceXml = SAV.getSurfaceByName( name );

			console.log( 'surfaceXml', surfaceXml);

			if ( !surfaceXml ) {

				//console.log( 'id', id, surfaceXml );
				divSavContents.innerHTML += 'Deletes - not found surface name: ' + name + '<br>';
				continue;

			} else {

				surfaceXml.remove();

				const surfaceMesh = GBP.surfaceMeshes.children.find( element => element.userData.data.Name === name );
				GBP.surfaceMeshes.remove( surfaceMesh );

				divSavContents.innerHTML += 'Deleted surface name: ' + name + '<br>';

			}

		}

		GBI.surfaceChanges.deleteDuplicateSurfaces = [];
		ISS.surfaceChanges.deleteDuplicateSurfaces = [];

	};



	SAV.addAttributesMissing = function() {

		attributes = GBI.surfaceChanges.addAttributesMissing;
		//console.log( 'attributes', attributes );

		for ( attribute in attributes ) {

			//console.log( 'attribute', attribute );

			//console.log( 'value', attributes[ attribute ] );

			GBP.gbxml.setAttribute( attribute, attributes[ attribute ] );

			divSavContents.innerHTML += `Added gbXML attribute ${attribute} with value of: ${attributes[ attribute ]}<br>`;
		}

		//console.log( 'GBP.gbxml', GBP.gbxml );

	};