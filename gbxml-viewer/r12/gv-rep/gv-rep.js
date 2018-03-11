// Copyright 2018 Ladybug Tools authors. MIT License

	var REP = {};

	REP.title = 'gv-tmp - gbXML Viewer Report';

	var butReports = butMenuLoad;

	var surfaceAdjacencyDuplicates;
	var surfaceAdjacencyInvalids;
	var surfaceCoordinateDuplicates;
	var storeys;
	var sud;
	var telltale;
	var b = '<br>';


	REP.initReport = function() {

		document.title = REP.title;
		aDocumentTitle.innerHTML = REP.title;
		butMenuLoad.innerHTML = REP.title;

		if ( butReports.style.backgroundColor !== 'var( --but-bg-color )' ) {

			REP.createReport();

			butReports.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			detReports.remove();

			butReports.style.backgroundColor = '';

		}

	}



	REP.createReport = function() {

		let traversGbjson = REP.traversGbjson;
		let addDetails = REP.addDetails;

		let spaces;

		surfaceAdjacencyDuplicates = [];
		surfaceAdjacencyInvalids = [];
		surfaceCoordinateDuplicates = [];

		sud = GBX.surfaceMeshes.userData;
		sud.tinySpaceSquareMeters = 2;
		sud.tinySurfaceSquareMeters = 1;

		divMenuItems.innerHTML =

			'<details id=detReports class=app-menu open >' +

				'<summary>Reports</summary>' +

				'<p>' +
					'toggles<br>' +
					'<button onclick=GBX.surfaceMeshes.visible=!GBX.surfaceMeshes.visible; >surfaces</button>' +
					' <button onclick=GBX.surfaceEdges.visible=!GBX.surfaceEdges.visible; >edges</button>' +
					' <button onclick=GBV.setAllVisible(); >all visible</button>' +
				'</p>' +

				'<div id=divReport ></div>' +

				'<hr>' +

			'</details>' +

			divMenuItems.innerHTML +

		'';

		const gbxmlText = traversGbjson( GBX.gbjson );
		//console.log( 'gbxmlText', gbxmlText );

		divReport.innerHTML = addDetails( 'gbxmlText', gbxmlText.attributes );

		const campus = traversGbjson( GBX.gbjson.Campus );
		divReport.innerHTML += addDetails( 'Campus', campus.attributes );

		const locate = traversGbjson( GBX.gbjson.Campus.Location );
		const mapLink = REP.getGoogleMap();
		divReport.innerHTML += addDetails( 'Campus Location' + mapLink, locate.attributes );

		const building = traversGbjson( GBX.gbjson.Campus.Building );
		divReport.innerHTML += addDetails( 'Building', building.attributes );

		const storeysText = REP.getStoreys();
		divReport.innerHTML += addDetails( storeysText.summary, storeysText.flowContent );

		const spacesText = REP.getSpaces();
		divReport.innerHTML += addDetails( spacesText.summary, spacesText.flowContent );

		const zones = traversGbjson( GBX.gbjson.Zone );
		divReport.innerHTML += addDetails( 'Zones', zones.attributes );

		const documents = traversGbjson( GBX.gbjson.DocumentHistory );
		divReport.innerHTML += addDetails( 'Documents', documents.attributes );

		//		const surfaces = traversGbjson( gbjson.Campus.Surface );
		const surfaces = REP.getSurfaces();
		divReport.innerHTML += addDetails( surfaces.summary, surfaces.flowContent );

		//		examineGbjson( gbjson );

		const surfaceCadIdGroups = REP.getSurfaceCadIdGroups();
		divReport.innerHTML += addDetails( surfaceCadIdGroups.summary, surfaceCadIdGroups.flowContent, surfaceCadIdGroups.info );


		// following causes error when inside an iframe in a read me
		//if ( parent.setIfrThree ) { setIfrThree(); }

	}



	REP.traversGbjson = ( obj ) => {

		const elements = [];
		let attributes = '';

		for ( let i in obj ) {

			if ( obj[ i ] !== null && typeof( obj[ i ] ) === 'object' ) {

				if ( elements.indexOf( i ) < 0 ) { elements.push( i ); }

			} else {

				attributes += '<div>' + i + ': ' + obj[ i ] + '</div>';

			}

		};

		return { elements: elements, attributes: attributes };

	}



	REP.addDetails = ( summary, text, info = '', open = '' ) => {

		flowContent = text ? text : 'no attributes';

		const details =
			'<details ' + open + ' >' +
				'<summary style=color:#333; >' + summary + '</summary>' +
				'<div><small><i>' + info + '</i></small></div>' +
				flowContent +
			'</details>' +
		'';

		return details;

	}



	REP.getGoogleMap = () => {

		const locate = GBX.gbjson.Campus.Location;  // remember that location is a reserved word in your browser
		let linkToMap;

		if ( locate && locate.Latitude && locate.Longitude ) {

			const link = 'https://www.google.com/maps/@' + locate.Latitude + ',' + locate.Longitude + ',17z';

//			linkToMap = ' &raquo; <a href="'+ link + '" style=background-color:lightblue; target=_blank > &#x1f5fa; </a>';
			linkToMap = ' &raquo; <a href="'+ link + '" style=background-color:lightblue; target=_blank > <img src=../assets/world-map.png height=18 > </a>';

		} else {

			linkToMap = '';

		}

		return '<span title="Use context menu to open a Google Map in a new tab" >' + linkToMap + '<span>';

	}



	REP.getStoreys = () => {

		storeys = GBX.gbjson.Campus.Building.BuildingStorey;
		let flowContent = '';
		let count = 0;
		let zones;
		//console.log( 'storeys', storeys  );

		if ( storeys ) {

			if ( Array.isArray( storeys ) === true ) {

				for ( let storey of storeys ) {
					//console.log( 'storey', storey );

					flowContent += '<div style=margin-bottom:10px; > ' +
						( count ++ ) +
						'. id: ' + storey.id + b +
						' name: <button onclick=\'zones = REP.toggleStorey("' + storey.id + '",this);\' >' + storey.Name + '</button>' + b +
						( storey.Level ? 'level: ' + storey.Level + b : '' ) +
					'</div>';

				}

			} else {

		//console.log( 'storeys', storeys );

				flowContent += '<div style=margin-bottom:10px; > ' +
					( ++ count ) +
					'. id: ' + storeys.id + b +
					' name: <button onclick=\'zones = REP.toggleStorey("' + storeys.id + '",this);\' >' + storeys.Name + '</button>' + b +
					( storeys.Level ? 'level: ' + storeys.Level + b : '' ) +
				'</div>';


			}

		}

		flowContent += '<div id=divStoreyItems style=background-color:var(--highlight-color);  ></div>';

		return { summary: 'Storeys &raquo; ' + count, flowContent: flowContent };

	}



	REP.getSpaces = () => {

		spaces = GBX.gbjson.Campus.Building.Space;
		let flowContent = '';
		let count = 0;
		//console.log( 'spaces', spaces  );

		spaces = spaces.length ? spaces : [ spaces ];

		for ( let space of spaces ) {
		//console.log( 'space', space );

			flowContent += '<div style=margin-bottom:10px; > ' +
				( ++ count ) +
				'. id: ' + space.id + b +
				' name: <button onclick=REP.toggleSpace("' + space.id + '"); >' + space.Name + '</button>' + b +
				' area: ' + Number( space.Area ).toFixed( 1 ) + b +
			'</div>';

		}

		return { summary: 'Spaces &raquo; ' + count, flowContent: flowContent };

	}



	REP.getSpacesTiny = () => {

		const spaces = GBX.gbjson.Campus.Building.Space;
		const b = '<br>';
		let flowContent = '';
		let count = 0;
		//console.log( '', spaces  );

		if ( spaces.length ) {

			for ( let space of spaces ) {
				//console.log( 'space', space );

				if ( parseFloat( space.Area ) < 2 ) {

					flowContent += '<div style=margin-bottom:10px; > ' +
						( count ++ ) +
						'. id: ' + space.id + b +
						' name: <button onclick=REP.toggleSpace("' + space.id + '"); >' + space.Name + '</button>' + b +
						' area: ' + Number( space.Area ).toFixed( 1 ) + b +
					'</div>';

				}


			}

		}

		const info = 'Information: Spaces with area smaller than 2 square units';
		return { summary: 'Tiny Spaces &raquo; ' + count, flowContent: flowContent, info: info };

	}



	REP.getSurfaces = () => {

		surfaces = GBX.gbjson.Campus.Surface;

		let txt = '';

		//console.log( 'surfaces', surfaces );

		const types = [];
		const typesCount = [];

		for ( let surface of surfaces ) {

			index = types.indexOf( surface.surfaceType );

			if ( index < 0 ) {

				types.push( surface.surfaceType );
				typesCount[ types.length - 1 ] = 1;

			} else {

				typesCount[ index ] ++;

			}

		}

		for ( let i = 0; i < types.length; i++ ) {

			txt +=
//				'<button class=toggleView onclick=REP.setTypeInvisible(this) value=' + types[ i ] + ' >&#x1f441;</button>' +
				'<button class=toggleView onclick=REP.setTypeInvisible(this) value=' + types[ i ] + ' ><img src="../assets/eye.png" height=18></button>' +
				' <button class=toggle onclick=REP.toggleSurfaceType(this); >' + types[ i ] + '</button>: ' +
				typesCount[ i ] + ' - ' + Math.round( 100 * typesCount[ i ] / surfaces.length ) +
				'%<br>';

		}

		txt +=

			'<p><button class=toggle onclick=REP.allVisible(); >all visible</button></p>';


		const summary = 'Surfaces: ' + surfaces.length;

		return { summary: summary, flowContent: txt };

	}



	REP.getSurfaceCadIdGroups =() => {

		const cadIds = [];
		const surfaceMembers = [];
		const surfaces = GBX.gbjson.Campus.Surface;
		let count = 0;
		let flowContent = '';

		for ( let surface of surfaces ) {

			if ( !surface.CADObjectId ) { continue; }

			id = surface.CADObjectId.replace( /\[(.*?)\]/gi, '' );

			if ( !cadIds.includes( id ) ) {

				cadIds.push( id );

			}

		}

		cadIds.sort();

		for ( let id of cadIds ){

			flowContent += '<button onclick=REP.toggleCadIdGroup("' + encodeURI( id )+ '"); >' + id + '</button>' + b;
		}

		//console.log( '', CadIds.length );

		const info = 'Information: Revit CAD Object Groups';
		return { summary: 'CAD Object ID Groups &raquo; ' + cadIds.length, flowContent: flowContent, info: info };

	}




	REP.toggleStorey = ( id, node ) => {

		//console.log( 'id', id );

		const spaces = GBX.gbjson.Campus.Building.Space;

		let zones = [];
		let spacesArray = [];

		for ( let child of GBX.surfaceMeshes.children ) {

			child.visible = false;

		}

		for ( let child of GBX.surfaceMeshes.children ) {

			if ( !child.userData.data ) { continue; }

			adjacentSpaceId = child.userData.data.AdjacentSpaceId

			if ( !adjacentSpaceId ) { continue; }

			spaceIdRef = Array.isArray( adjacentSpaceId ) ? adjacentSpaceId[ 1 ].spaceIdRef : adjacentSpaceId.spaceIdRef

			for ( let space of spaces ) {

				if ( space.id === spaceIdRef && space.buildingStoreyIdRef === id ) {

					child.visible = true;

					if ( !zones.includes( space.zoneIdRef ) ) { zones.push( space.zoneIdRef ); }

					if ( !spacesArray.includes( space.id ) ) { spacesArray.push( space.id ); }

				}

			}

		}

		divStoreyItems.innerHTML =
			'spaces ' + spacesArray.length + ': ' + spacesArray.join() + b +
			'zones ' + zones.length + ': ' + zones.join();

		/*
				for ( let storey of storeys ) {

					if ( id === storey.id ) {

						icw.divLog.innerHTML = 'Storey name: ' + storey.Name;

					}

				}
		*/
		return zones;

	}



	REP.toggleSurface = ( id ) => {

		//icw.divLog.innerHTML = '';

		for ( let child of GBX.surfaceMeshes.children ) {

			if ( child.userData.data.id === id ) {

				child.visible = true;

				//console.log( '', child );

				REP.zoomIntoSurface( child );

				if ( window.divHeadsUp ) {

					intersected = child;
					HUD.setHeadsUp();

				}

			} else {

				child.visible = false;

			}

		};

	}



	REP.zoomIntoSurface = ( surface ) => {
		//console.log( 'surface', surface );

		const center = surface.localToWorld( surface.geometry.boundingSphere.center.clone() );
		const radius = surface.geometry.boundingSphere.radius > 1 ? surface.geometry.boundingSphere.radius : 1;
		//console.log( 'bbb', center, radius );

		THR.scene.remove( telltale );
		const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
		const material = new THREE.MeshNormalMaterial( { opacity: 0.7, transparent: true } );
		telltale = new THREE.Mesh( geometry, material );
		telltale.position.copy( center );
		THR.scene.add( telltale );

		THR.controls.target.copy( center );
		THR.camera.position.copy( center.clone().add( new THREE.Vector3( 3.0 * radius, - 3.0 * radius, 3.0 * radius ) ) );

	}



	REP.toggleSurfaceType = ( that ) => {

		//icw.divLog.innerHTML = '';
		//console.log( '', surfaceAdjacencyDuplicates );

		for ( let child of GBX.surfaceMeshes.children ) {

			if ( child.userData.data.surfaceType !== that.innerText ) {

				child.visible = false;

			} else {

				child.visible = true;

			}

		}

	}



	REP.setTypeInvisible = ( that ) => {

		//		surfaceGroup.visible = true;
		//icw.divLog.innerHTML = '';
		//console.log( '', surfaceAdjacencyDuplicates );

		that.style.backgroundColor = that.style.backgroundColor === 'lightblue' ? '' : 'lightblue';

		for ( let child of GBX.surfaceMeshes.children ) {

			if ( !child.userData.data ) { continue; }

			if ( child.userData.data.surfaceType === that.value && that.style.backgroundColor === 'lightblue' ) {

				child.visible = false;

			} else if ( child.userData.data.surfaceType === that.value ) {

				child.visible = true;

			}

		};

	}



	REP.toggleSpace = ( id ) => {

		//surfaceGroup.visible = true;
		//icw.divLog.innerHTML = '';

		for ( let child of GBX.surfaceMeshes.children ) {

			if ( !child.userData.data ) { continue; }

			child.visible = false;

			adjacentSpaceId = child.userData.data.AdjacentSpaceId;

			if ( adjacentSpaceId && adjacentSpaceId.spaceIdRef && id === adjacentSpaceId.spaceIdRef ) {

				child.visible = true;


			} else if ( Array.isArray( adjacentSpaceId ) === true ) {

				if ( id === adjacentSpaceId[ 0 ].spaceIdRef || id === adjacentSpaceId[ 1 ].spaceIdRef ) {

					child.visible = true;

					const type = child.userData.data.surfaceType;

					if ( type === 'InteriorFloor' || type === 'SlabOnGrade' || type === 'RaisedFloor' || type === 'UndergroundSlab' ) {

						REP.zoomIntoSurface( child );

					}

				}

			}

		}
		/*
				for ( let space of spaces ) {

					if ( id === space.id ) {

						icw.divLog.innerHTML = 'Space name: ' + space.Name;

					}

				}
		*/
	}



	REP.toggleCadId = ( CADObjectId ) => {

		//console.log( '', CADObjectId );
		//		surfaceGroup.visible = true;
		GBX.surfaceEdges.visible = true;
		//icw.divLog.innerHTML = '';

		for ( let child of GBX.surfaceMeshes.children ) {

			if ( !child.userData.data ) { continue; }

			if ( encodeURI( child.userData.data.CADObjectId ) === CADObjectId ) {

				child.visible = true;

			} else {

				child.visible = false;

			}

		}

	}



	REP.toggleCadIdGroup = ( CADObjectGroupId ) => {

		//console.log( 'CADObjectGroupId', CADObjectGroupId );
		//		surfaceGroup.visible = true;
		GBX.surfaceEdges.visible = true;
		//icw.divLog.innerHTML = '';

		for ( let child of GBX.surfaceMeshes.children ) {

			child.visible = false;

		}
		for ( let child of GBX.surfaceMeshes.children ) {

			if ( !child.userData.data.CADObjectId ) { continue; }

			id = encodeURI( child.userData.data.CADObjectId.replace( /\[(.*?)\]/gi, '' ) );

			if ( id === CADObjectGroupId ) {

				child.visible = true;

			} else {

				child.visible = false;

			}

		}

	}



	REP.toggleAdjacencies = ( id, surfaceArray ) => {

		//console.log( '', that.innerText );

		//icw.divLog.innerHTML = '';

		if ( id.style.backgroundColor !== 'var( --but-bg-color )' ) {

			//surfaceGroup.visible = true;

			for ( let child of GBX.surfaceMeshes.children ) {

				if ( !child.userData.data ) { continue; }

				if ( surfaceArray.includes( child.userData.data.Name ) ) {

					child.visible = true;

				} else {

					child.visible = false;

				}

			}

			id.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			REP.allVisible();

			id.style.backgroundColor = '';

		}

	}



	REP.initReport();


