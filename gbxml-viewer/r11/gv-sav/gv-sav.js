// Copyright 2018 Ladybug Tools authors. MIT License

	var SAV = {};

	SAV.initTemplate = function () {

		if ( butSaveChanges.style.backgroundColor !== 'var( --but-bg-color )' ) {

			divMenuItems.innerHTML =

				`<details id = detSaveChanges  class=app-menu open>

					<summary>Save your changes to a file</summary>

					<div id = "divSave" style=width:300px; ></div>

					<hr>

				</details>

			` + divMenuItems.innerHTML;

			initMenuSaveChanges();

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



	SAV.initChanges = function() {

		GBV.surfaceChanges = { deletes: [], types: [], oneAdjacent: [], twoAdjacent: [], cadObjs: [] };

	}



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

		reader = new FileReader();
		reader.onload = function( event ) {

			GBV.surfaceChanges = JSON.parse( reader.result );
			//txtArea.innerHTML = JSON.stringify( json, null, ' ' );

			SAV.getUpdates();

			divLog.innerHTML =
				'name: ' + files.files[0].name + '<br>' +
				'size: ' + files.files[0].size.toLocaleString() + ' bytes<br>' +
				'type: ' + files.files[0].type + '<br>' +
				'modified: ' + files.files[0].lastModifiedDate.toLocaleDateString() + '<br>' +
				'deletes:' + GBV.surfaceChanges.deletes.length + '<br>' +
				'types:' + GBV.surfaceChanges.types.length + '<br>' +
				'cad id:' + GBV.surfaceChanges.cadObjs.length + '<br>' +
				'one adjacent:' + GBV.surfaceChanges.oneAdjacent.length + '<br>' +
				'two adjacent:' + GBV.surfaceChanges.twoAdjacent.length + '<br>' +
			'';

			console.log( '', files );

		}

		reader.readAsText( files.files[0] );

	};



	SAV.getUpdates = function() {

		for ( let id of GBV.surfaceChanges.deletes ) {

			const surface = GBX.gbxml.getElementsByTagName( "Surface"  )[ id ];
			surface.remove();

			const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === id );
			GBX.surfaceMeshes.remove( surfaceMesh );

		}


		for ( let surface of GBV.surfaceChanges.types ) {

			const surfaceXml = GBX.gbxml.getElementsByTagName( "Surface"  )[ surface.id ];
			surfaceXml.attributes.getNamedItem( 'surfaceType' ).nodeValue = surface.type;

			const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === surface.id );
			surfaceMesh.userData.data.surfaceType = surface.type;
			surfaceMesh.material.color.setHex( GBX.colors[ surface.type ] );
			surfaceMesh.material.needsUpdate = true;

		}


		for ( let surface of GBV.surfaceChanges.cadObjs ) {

			const surfaceXml = GBX.gbxml.getElementsByTagName( "Surface"  )[ surface.id ];
			const cadObjId = surfaceXml.getElementsByTagName( "CADObjectId" )[ 0 ];
			cadObjId.innerHTML = surface.cadId;

			const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === surface.id );
			surfaceMesh.userData.data.CADObjectId = surface.cadId;

		}

		for ( let surface of GBV.surfaceChanges.oneAdjacent ) {

			const surfaceXml = GBX.gbxml.getElementsByTagName( "Surface"  )[ surface.id ];
			const adj = surfaceXml.getElementsByTagName( "AdjacentSpaceId" )[ 0 ];
			const att = adj.attributes.getNamedItem( 'spaceIdRef' ).nodeValue = surface.spaceId;

			console.log( 'adj', adj, att );

			const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === surface.id );
			surfaceMesh.userData.data.AdjacentSpaceId = { "spaceIdRef": surface.spaceId };

		}

		for ( let surface of GBV.surfaceChanges.twoAdjacent ) {

			surfaceXml = GBX.gbxml.getElementsByTagName( "Surface"  )[ surface.id ];

			adj1 = surfaceXml.getElementsByTagName( "AdjacentSpaceId" )[ 0 ];
			att1 = adj1.attributes.getNamedItem( 'spaceIdRef' ).nodeValue = surface.spaceId[ 0 ];

			adj2 = surfaceXml.getElementsByTagName( "AdjacentSpaceId" )[ 1 ];
			att2 = adj2.attributes.getNamedItem( 'spaceIdRef' ).nodeValue = surface.spaceId[ 1 ];

			const surfaceMesh = GBX.surfaceMeshes.children.find( element => element.userData.data.id === surface.id );
			surfaceMesh.userData.data.AdjacentSpaceId = [ { "spaceIdRef": surface.spaceId[ 0 ] }, { "spaceIdRef": surface.spaceId[ 1 ] } ];

		}

	}