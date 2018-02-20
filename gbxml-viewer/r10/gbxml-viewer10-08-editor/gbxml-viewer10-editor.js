// Copyright 2018 Ladybug Tools authors. MIT License

	var gbxmlResponseXML;
	var surfacesXml;

	var telltale;
	var surfaceUpdatedId = -1;


	initEditor();

	function initEditor() {

		if ( butEditor.style.backgroundColor !== 'var( --but-bg-color )' ) {

			divMenuItems.innerHTML =
			`
				<details id = detSurfaceEdits open title='Use up and down cursor keys to scroll through the list of surfaces quickly' >

					<summary>Surface Edits</summary>

					<p><small><i>Select a surface in the left column then update its type and adjacent spaces</i></small></p>

					<div id=divGbxml style=max-height:600px;overflow:auto; class=flex-container ></div>

					<div id=divUpdates >
						<button onclick=EDTupdateSurface(); >update surface</button>
						<button onclick=EDTdeleteSurface(); >delete surface</button>
						<button onclick=EDTaddModifiedBy(); >add ModifiedBy </button>
						<button onclick=EDTsaveFile(); >save edits</button>
						<button onclick=EDTviewPreviousUpdates(); >view previous update</button>
					</div>

					<hr>

				</details>

			` + divMenuItems.innerHTML;

			butEditor.style.backgroundColor = 'var( --but-bg-color )';

			initMenuEditSurfaces();

		} else {

			detSurfaceEdits.remove();

			butEditor.style.backgroundColor = '';

		}

	}



	function initMenuEditSurfaces() {

		surfacesXml = gbxml.getElementsByTagName("Surface");
		console.log( 'surfacesXml', surfacesXml );

		let txtSurfaces = '';

		for ( let i = 0; i < surfacesXml.length; i++) {

			const surface = surfacesXml[ i ];
			//console.log( 'surface', surface );

			if ( surface.getElementsByTagName("Name")[0] ) {

				name = surface.getElementsByTagName("Name")[0].textContent;
				//console.log( 'name', name );

			} else {

				name = '';

			}

			txtSurfaces +=
				'<option title=' + name + '>' +
					surface.attributes.getNamedItem( 'id' ).nodeValue +
				'</option>';

		}

		//console.log( 'surfaceTypes', surfaceTypes);

		let txtTypes = '';

		for ( let i = 0; i < surfaceTypes.length; i++ ) {

			txtTypes += '<option>' + surfaceTypes[ i ] + '</option>';

		}

		spacesXml = gbxml.getElementsByTagName("Space");
		spacesXmlIds = ['none'];
		//console.log( 'spacesXml', spacesXml );

		let txtSpaces = '<option>none</option>';

		for ( let i = 0; i < spacesXml.length; i++) {

			const space = spacesXml[ i ];
			const id = space.attributes.getNamedItem( 'id' ).nodeValue;
			spacesXmlIds.push( id );

			txtSpaces += '<option>' + id + '</option>';

		}

		divGbxml.innerHTML =

			'<div>' +
				'<div>Surface</div>' +
				'<div><input id=inpSurface oninput=EDTupdateSelect(this,selSurface); size=12 placeholder="enter surface id" ></div>' +
				'<div><select id=selSurface onchange=EDTselectSurface(); size=10 >' + txtSurfaces + '</select></div>' +
				'<div><button onclick=EDTtoggleSurface(); >show surface</button></div>' +
			'</div> ' +
			'<div>' +
				'<div>Type</div>' +
				'<div><input oninput=EDTupdateSelect(this,selType); size=12  placeholder="enter type" ></div>' +
				'<div><select id=selType size=10 >' + txtTypes + '</select></div>' +
				'<div><button onclick=EDTshowSurfaceType(); >show type</button></div>' +
			'</div> ' +
			'<div>' +
				'<div>Adjacency 1</div>' +
				'<div><input oninput=EDTpdateSelect(this,selAdjacentSpaceId0); size=12 placeholder="enter space id" ></div>' +
				'<div><select id=selAdjacentSpaceId0 size=10 >' + txtSpaces + '</select></div>' +
				'<div><button onclick=EDTtoggleSpace(selAdjacentSpaceId0); >show space</button></div>' +
			'</div> ' +
			'<div>' +
				'<div>Adjacency 2</div>' +
				'<div><input oninput=EDTupdateSelect(this,selAdjacentSpaceId1); size=12 placeholder="enter space id" ></div>' +
				'<div><select id=selAdjacentSpaceId1 size=10 >' + txtSpaces + '</select></div>' +
				'<div><button onclick=EDTtoggleSpace(selAdjacentSpaceId1); >show space</button></div>' +
			'</div>' +
		'';

	}



	function EDTupdateSelect( input, select ) {

		const str = input.value.toLowerCase();
		const options = select.options;
		//console.log( 'str', str, select );

		for ( let i = 0; i < options.length; i++ ) {

			if ( options[ i ].value.toLowerCase().includes( str ) ) {

				select.selectedIndex = i;

				break;

			}

		}

	}



	function EDTselectSurface() {

		const surface = surfacesXml[ selSurface.selectedIndex ];
		//console.log( 'surface', surface );

		const type = surface.attributes.getNamedItem( 'surfaceType' ).nodeValue;
		//console.log( 'type', type );

		selType.selectedIndex = surfaceTypes.indexOf( type );

		const adjs = surface.getElementsByTagName( 'AdjacentSpaceId' );

		index = spacesXmlIds.indexOf( adjs[ 0 ].attributes.getNamedItem( 'spaceIdRef' ).nodeValue );
		selAdjacentSpaceId0.selectedIndex = index;

		if ( adjs[ 1 ] ) {

			index = spacesXmlIds.indexOf( adjs[ 1 ].attributes.getNamedItem( 'spaceIdRef' ).nodeValue );

		} else {

			index = 0;

		}

		selAdjacentSpaceId1.selectedIndex = index;

		EDTtoggleSurface();

	}



	function EDTupdateSurface() {

		if ( selSurface.selectedIndex < 0 ) { alert( 'Please first select a surface and make an edit' ); return; }

		surfaceUpdatedId = selSurface.selectedIndex;
		surface = surfacesXml[ surfaceUpdatedId ];
		//console.log( 'surface', surface );

		surface.attributes.getNamedItem( 'surfaceType' ).nodeValue = selType.value;

		const adjs = surface.getElementsByTagName( 'AdjacentSpaceId' );
		//console.log( 'adjs[ 0 ]', adjs[ 0 ].attributes.getNamedItem( 'spaceIdRef' ).nodeValue );

		adjs[ 0 ].attributes.getNamedItem( 'spaceIdRef' ).nodeValue = selAdjacentSpaceId0.value;

		if ( adjs[ 1 ] ) {

			adjs[ 1 ].attributes.getNamedItem( 'spaceIdRef' ).nodeValue = selAdjacentSpaceId1.value;

		}

		parseFileXML( gbxml );

	}



	function EDTviewPreviousUpdates(){

		if ( surfaceUpdatedId < 0 ) { alert( 'Please first select a surface and make an edit' ); return; }

		selSurface.selectedIndex = surfaceUpdatedId;
		EDTselectSurface();

	}



	function EDTtoggleSurface() {

		if ( selSurface.selectedIndex < 0 ) { alert( 'Please first select a surface and make an edit' ); return; }

		id = selSurface.value;

		for ( let child of surfaceMeshes.children ) {

			if ( id === child.userData.data.id ) {

				child.visible = true;
				//console.log( '', child );

				EDTzoomIntoSurface( child );

				if ( window.divHeadsUp ) {

					intersected = child;
					setHeadsUp();

				}

			} else {

				child.visible = false;

			}

		};

	}



	function EDTshowSurfaceType( that ) {

		const type = selType.value;

		for ( let child of surfaceMeshes.children ) {

			if ( type === child.userData.data.surfaceType ) {

				child.visible = true;

			} else {

				child.visible = false;

			}

		}

	}



	function EDTtoggleSpace( that ) {

		id = that.value;

		for ( let child of surfaceMeshes.children ) {

			child.visible = false;
			adjacentSpaceId = child.userData.data.AdjacentSpaceId;

			if ( adjacentSpaceId && adjacentSpaceId.spaceIdRef && id === adjacentSpaceId.spaceIdRef ) {

				child.visible = true;

			} else if ( Array.isArray( adjacentSpaceId ) === true ) {

				if ( id === adjacentSpaceId[ 0 ].spaceIdRef || id === adjacentSpaceId[ 1 ].spaceIdRef ) {

					child.visible = true;

				}

			}

		}

	}



	function EDTzoomIntoSurface( surface ){
		//console.log( 'surface', surface );

		const center = surface.localToWorld( surface.geometry.boundingSphere.center.clone() );

		const radius = surface.geometry.boundingSphere.radius > 1 ? surface.geometry.boundingSphere.radius : 1;

		scene.remove( telltale );
		const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
		const material = new THREE.MeshNormalMaterial( { opacity: 0.7, transparent: true } );
		telltale = new THREE.Mesh( geometry, material );
		telltale.position.copy( center );
		scene.add( telltale );

		controls.target.copy( center );
		camera.position.copy( center.clone().add( new THREE.Vector3( 3.0 * radius, - 3.0 * radius, 3.0 * radius ) ) );

		//console.log( 'center', center, radius );

	}


	function EDTdeleteSurface(){

		if ( selSurface.selectedIndex < 0 ) { alert( 'Please first select a surface and make an edit' ); return; }

			surfaceUpdatedId = selSurface.selectedIndex;
			surfacesResponse = gbxmlResponseXML.getElementsByTagName("Surface");

			surface = surfacesResponse[ surfaceUpdatedId ];
			console.log( 'surface to delete', surface );

			surface.remove();

			id = selSurface.value;

			for ( let child of surfaceMeshes.children ) {

				if ( id === child.userData.data.id ) {

					surfaceMeshes.remove( child );
				}

			}

	}



	function EDTaddModifiedBy() {

		// not adding spaces and new lines nicely. Why?

		const documentHistoryXml = gbxmlResponseXML.getElementsByTagName( "DocumentHistory" );

		const programInfoNew = gbxmlResponseXML.createElement( "ProgramInfo" );

		programInfoNew.setAttribute( "id", "ladybug-tools-spider" );

		documentHistoryXml[ 0 ].appendChild( programInfoNew );

		const productNameNew = gbxmlResponseXML.createElement( "ProductName" );

		const newText = gbxmlResponseXML.createTextNode( 'Ladybug-Tools/spider' );

		productNameNew.appendChild( newText );

		programInfoNew.appendChild( productNameNew );

		productNameNew.nodeValue = 'Ladybug-Tools/spider';


		const modifiedByNew = gbxmlResponseXML.createElement( "ModifiedBy" );

		modifiedByNew.setAttribute( "personId", "Theo" );

		modifiedByNew.setAttribute( "programId", "ladybug-tools-spide2" );

		modifiedByNew.setAttribute( "date", ( new Date() ).toISOString() );

		documentHistoryXml[ 0 ].appendChild( modifiedByNew );

		console.log( 'documentHistoryXml', documentHistoryXml );

	}



// https://stackoverflow.com/questions/376373/pretty-printing-xml-with-javascript
// https://jsfiddle.net/klesun/sgeryvyu/5/

	function EDTprettifyXml(sourceXml) {

		var xmlDoc = new DOMParser().parseFromString(sourceXml, 'application/xml');
		var xsltDoc = new DOMParser().parseFromString([
			// describes how we want to modify the XML - indent everything
			'<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
			'  <xsl:output omit-xml-declaration="yes" indent="yes"/>',
			'    <xsl:template match="node()|@*">',
			'      <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
			'    </xsl:template>',
			'</xsl:stylesheet>',
		].join('\n'), 'application/xml');

		var xsltProcessor = new XSLTProcessor();
		xsltProcessor.importStylesheet(xsltDoc);
		var resultDoc = xsltProcessor.transformToDocument(xmlDoc);
		var resultXml = new XMLSerializer().serializeToString(resultDoc);
		return resultXml;

	}



	function EDTsaveFile() {

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

