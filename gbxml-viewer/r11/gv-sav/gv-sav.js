// Copyright 2018 Ladybug Tools authors. MIT License

	var SAV = {};

	SAV.initChanges = function() {

		GBV.surfaceChanges = { deletes: [], types: [], oneAdjacent: [], twoAdjacent: [], cadObjs: [] };

	};

	SAV.initTemplate = function () {

		if ( butSaveChanges.style.backgroundColor !== 'var( --but-bg-color )' ) {

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

//			initMenuSaveChanges();

//			SAV.initChanges();

			butSaveChanges.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			detSaveChanges.remove();

			butSaveChanges.style.backgroundColor = '';

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
		divLog.style.textAlign = 'left';
		divLog.innerHTML = '<div id=divSavHeader ></div><div id=divSavContents ></div';

		reader = new FileReader();
		reader.onload = function( event ) {

			GBV.surfaceChanges = JSON.parse( reader.result );
			//txtArea.innerHTML = JSON.stringify( json, null, ' ' );

			SAV.getUpdates();

			divSavHeader.innerHTML +=
				'<br>name: ' + files.files[0].name + '<br>' +
				'size: ' + files.files[0].size.toLocaleString() + ' bytes<br>' +
				'type: ' + files.files[0].type + '<br>' +
				'modified: ' + files.files[0].lastModifiedDate.toLocaleDateString() + '<br>' +
				'deletes: ' + GBV.surfaceChanges.deletes.length + '<br>' +
				'type changes: ' + GBV.surfaceChanges.types.length + '<br>' +
				'cad id changes: ' + GBV.surfaceChanges.cadObjs.length + '<br>' +
				'one adjacent changes: ' + GBV.surfaceChanges.oneAdjacent.length + '<br>' +
				'two adjacent changes: ' + GBV.surfaceChanges.twoAdjacent.length + '<br>' +
			'<br>';

//			console.log( '', files );

		}

		reader.readAsText( files.files[0] );

	};



	SAV.getUpdates = function() {

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


		for ( let surface of GBV.surfaceChanges.types ) {

			const surfaceXml = GBX.gbxml.getElementsByTagName( "Surface"  )[ surface.id ];

			if ( !surfaceXml ) {

				divSavContents.innerHTML += 'Types changes - not found surface id: ' + surface.id + '<br>';
				continue;

			} else {

				surfaceXml.attributes.getNamedItem( 'surfaceType' ).nodeValue = surface.type;

				const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === surface.id );
				surfaceMesh.userData.data.surfaceType = surface.type;
				surfaceMesh.material.color.setHex( GBX.colors[ surface.type ] );
				surfaceMesh.material.needsUpdate = true;

				divSavContents.innerHTML += 'Types changes - updated surface id: ' + surface.id + '<br>';

			}

		}


		for ( let surface of GBV.surfaceChanges.cadObjs ) {

			const surfaceXml = GBX.gbxml.getElementsByTagName( "Surface"  )[ surface.id ];

			if ( !surfaceXml ) {

				divSavContents.innerHTML += 'cad object id changes - not found surface id: ' + surface.id + '<br>'
				continue;

			} else {

				const cadObjId = surfaceXml.getElementsByTagName( "CADObjectId" )[ 0 ];
				cadObjId.innerHTML = surface.cadId;

				const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === surface.id );
				surfaceMesh.userData.data.CADObjectId = surface.cadId;

				divSavContents.innerHTML += 'change cad object for surface  id: ' + surface.id + '<br>';

			}

		}

		for ( let surface of GBV.surfaceChanges.oneAdjacent ) {

			const surfaceXml = GBX.gbxml.getElementsByTagName( "Surface"  )[ surface.id ];

			if ( !surfaceXml ) {

				divSavContents.innerHTML += 'adjacent 1 - not found surface id: ' + surface.id + '<br>'
				continue;

			} else {

				const adj = surfaceXml.getElementsByTagName( "AdjacentSpaceId" )[ 0 ];
				const att = adj.attributes.getNamedItem( 'spaceIdRef' ).nodeValue = surface.spaceId;

				console.log( 'adj', adj, att );

				const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === surface.id );
				surfaceMesh.userData.data.AdjacentSpaceId = { "spaceIdRef": surface.spaceId };

				divSavContents.innerHTML += 'change adjacent space 1 for surface  id: ' + surface.id + '<br>';

			}

		}

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