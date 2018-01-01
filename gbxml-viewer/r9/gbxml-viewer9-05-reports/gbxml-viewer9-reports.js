// Copyright 2018 Ladybug Tools authors. MIT License

//	var divAppMenu = divAppMenu || undefined;

	var icw;
	var gbjson, gbxml;
	var THREE;
	var surfaceGroup;
	var surfaceMeshes;
	var surfaceEdges;

	var surfaceAdjacencyDuplicates;
	var surfaceAdjacencyInvalids;
	var surfaceCoordinateDuplicates;

	var sud;
	var telltale;
	var b = '<br>';


	initReport();

	function initReport() {

		if ( butReports.style.backgroundColor !== 'pink' ) {

			createReport();

			butReports.style.backgroundColor = 'pink';

		} else {

			element = document.getElementById( 'detReports' );

			element.remove();

			butReports.style.backgroundColor = '';

		}

	}



	function createReport() {

		icw = ifrThree.contentWindow;
		gbjson = icw.gbjson;
		THREE = icw.THREE;
		scene = icw.scene;

		surfaceGroup = icw.scene.getObjectByName( 'surfaceMeshes' );
		surfaceMeshesChildren = surfaceGroup.children;
		surfaceEdges = icw.scene.getObjectByName( 'surfaceEdges' );

		surfaceAdjacencyDuplicates = [];
		surfaceAdjacencyInvalids = [];
		surfaceCoordinateDuplicates = [];

		sud = surfaceGroup.userData;
		sud.tinySpaceSquareMeters = 2;
		sud.tinySurfaceSquareMeters = 1;

		divMenuItems.innerHTML =

			'<details id=detReports open >' +

				'<summary>Reports</summary>' +

				'<p>' +
					'toggles <button onclick=surfaceGroup.visible=!surfaceGroup.visible; >surfaces</button>' +
					' <button onclick=surfaceEdges.visible=!surfaceEdges.visible; >edges</button>' +
					' <button onclick=allVisible(); >all visible</button>' +
				'</p>' +

				'<div id=divReport ></div>' +

			'</details>' +

			divMenuItems.innerHTML +

		'';

		gbxml = traversGbjson( gbjson );
//console.log( 'gbxml', gbxml );

		divReport.innerHTML = addDetails( 'gbXML', gbxml.attributes );

		const campus = traversGbjson( gbjson.Campus );
		divReport.innerHTML += addDetails( 'Campus', campus.attributes );

		const locate = traversGbjson( gbjson.Campus.Location );
		const mapLink = getGoogleMap();
		divReport.innerHTML += addDetails( 'Campus Location' + mapLink, locate.attributes );

		const building = traversGbjson( gbjson.Campus.Building );
		divReport.innerHTML += addDetails( 'Building', building.attributes );

		const storeys = getStoreys();
		divReport.innerHTML += addDetails( storeys.summary, storeys.flowContent );

		const spaces = getSpaces();
		divReport.innerHTML += addDetails( spaces.summary, spaces.flowContent );

		const spacesTiny = getSpacesTiny();
		divReport.innerHTML += addDetails( spacesTiny.summary, spacesTiny.flowContent );

		const zones = traversGbjson( gbjson.Zone );
		divReport.innerHTML += addDetails( 'Zones', zones.attributes );

		const documents = traversGbjson( gbjson.DocumentHistory );
		divReport.innerHTML += addDetails( 'Documents', documents.attributes );

//		const surfaces = traversGbjson( gbjson.Campus.Surface );
		const surfaces = getSurfaces();
		divReport.innerHTML += addDetails( surfaces.summary, surfaces.flowContent );

//		examineGbjson( gbjson );

		const surfaceDuplicateCoordinates = getSurfaceDuplicatesCoordinates();
		divReport.innerHTML += addDetails( surfaceDuplicateCoordinates.summary, surfaceDuplicateCoordinates.flowContent );

		const surfaceDuplicateCadIds = getSurfaceDuplicateCadIds();
		divReport.innerHTML += addDetails( surfaceDuplicateCadIds.summary, surfaceDuplicateCadIds.flowContent );

		const surfaceDuplicateAdjacencies = getSurfaceDuplicateAdjacencies();
		divReport.innerHTML += addDetails( surfaceDuplicateAdjacencies.summary, surfaceDuplicateAdjacencies.flowContent );

		const surfaceTinies = getSurfacesTinies();
		divReport.innerHTML += addDetails( surfaceTinies.summary, surfaceTinies.flowContent );

		const surfaceAdjacencyInvalid = getSurfaceAdjacencyInvalid();
		divReport.innerHTML += addDetails( surfaceAdjacencyInvalid.summary, surfaceAdjacencyInvalid.flowContent );

		setIfrThree();

	}



	function traversGbjson( obj ) {

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



	function addDetails( summary, text, open = '' ) {

		flowContent = text ? text : 'no attributes';

		const details =
			'<details ' + open + ' >' +
				'<summary>' + summary + '</summary>' +
				flowContent +
			'</details>' +
		'';

		return details;

	}



	function getGoogleMap() {

		const locate = gbjson.Campus.Location;  // remember that location is a reserved word in your browser
		let linkToMap;

		if ( locate && locate.Latitude && locate.Longitude ) {

			const link = 'https://www.google.com/maps/@' + locate.Latitude + ',' + locate.Longitude + ',17z';

			linkToMap = ' &raquo; <a href="'+ link + '" style=background-color:lightblue; target=_blank > &#x1f5fa; </a>';

		} else {

			linkToMap = '';

		}

		return linkToMap;

	}



	function getStoreys() {

		const storeys = gbjson.Campus.Building.BuildingStorey;
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
						' name: <button onclick=\'zones = toggleStorey("' + storey.id + '",this);\' >' + storey.Name + '</button>' + b +
						( storey.Level ? 'level: ' + storey.Level + b : '' ) +
					'</div>';

				}

			} else {

//console.log( 'storeys', storeys );

				flowContent += '<div style=margin-bottom:10px; > ' +
					( ++ count ) +
					'. id: ' + storeys.id + b +
					' name: <button onclick=\'zones = toggleStorey("' + storeys.id + '",this);\' >' + storeys.Name + '</button>' + b +
					( storeys.Level ? 'level: ' + storeys.Level + b : '' ) +
				'</div>';


			}

		}

		return { summary: 'Storeys &raquo; ' + count, flowContent: flowContent };

	}



	function getSpaces() {

		const spaces = gbjson.Campus.Building.Space;
		let flowContent = '';
		let count = 1;
//console.log( '', spaces  );

		if ( spaces.length ) {

			for ( let space of spaces ) {
//console.log( 'space', space );

				flowContent += '<div style=margin-bottom:10px; > ' +
					( count ++ ) +
					'. id: ' + space.id + b +
					' name: <button onclick=toggleSpace("' + space.id + '"); >' + space.Name + '</button>' + b +
					' area: ' + Number( space.Area ).toFixed( 1 ) + b +
				'</div>';

			}

		}

		return { summary: 'Spaces &raquo; ' + count, flowContent: flowContent };

	}



	function getSpacesTiny() {

		const spaces = gbjson.Campus.Building.Space;
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
						' name: <button onclick=toggleSpace("' + space.id + '"); >' + space.Name + '</button>' + b +
						' area: ' + Number( space.Area ).toFixed( 1 ) + b +
					'</div>';

				}


			}

		}

		return { summary: 'Tiny Spaces &raquo; ' + count, flowContent: flowContent };

	}



	function getSurfaces() {

		surfaces = gbjson.Campus.Surface;

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
				'<button class=toggleView onclick=setTypeInvisible(this) value=' + types[ i ] + ' >&#x1f441;</button>' +
				' <button class=toggle onclick=toggleSurfaceType(this); >' + types[ i ] + '</button>: ' +
				typesCount[ i ] + ' - ' + Math.round( 100 * typesCount[ i ] / surfaces.length ) +
				'%<br>';

		}

		txt +=

			'<p><button class=toggle onclick=allVisible(); >all visible</button></p>';


		const summary = 'Surfaces: ' + surfaces.length;

		return { summary: summary, flowContent: txt };

	}



	function getSurfaceDuplicatesCoordinates() {

		const surfacePolyLoops = [];
		const surfaceIds = [];

		const surfaces = gbjson.Campus.Surface;
		let count = 0;
		let flowContent =
			'<p>' +
				'<button id=butDuplicatesCoordinates onclick=toggleAdjacencies(butDuplicatesCoordinates,surfaceCoordinateDuplicates); >toggle all duplicates</button>' +
			'</p>';
		let spaceId;

		for ( let i = 0; i <  surfaces.length; i++ ) {

			surface = surfaces[ i ]
			points = JSON.stringify( surface.PlanarGeometry.PolyLoop.CartesianPoint );
			index = surfacePolyLoops.indexOf( points );

			if ( index < 0 ) {

				surfacePolyLoops.push( points );
				surfaceIds.push( i );

			} else {

				surfOther = surfaces[ surfaceIds[ index ] ];
				surfaceCoordinateDuplicates.push( surface.Name );

//console.log( 'surface', surface );
//console.log( 'surfOther', surfOther );


				adjacency = surface.AdjacentSpaceId ? surface.AdjacentSpaceId : '';

				if ( adjacency ) {

					spaceId = Array.isArray( surface.AdjacentSpaceId ) === true ? surface.AdjacentSpaceId[ 1 ].spaceIdRef : surface.AdjacentSpaceId.spaceIdRef

				}

				flowContent +=
					'<p>' + count +
						'. id: <button onclick=toggleSurface("' + surface.id + '"); >' + surface.id + '</button>' + b +
						'surfaceType: ' + surface.surfaceType + b +
						( surface.Name ? 'Name: ' + surface.Name + b : '' ) +
						( surface.CADObjectId ? 'CADObjectId: ' + surface.CADObjectId + b : '' ) +
					( spaceId ? 'Space:  <button onclick=toggleSpace("' + spaceId + '"); >' + spaceId + '</button>' + b : '' ) +

						'<hr>' +
						'id of duplicate: <button onclick=toggleSurface("' + surfOther.id + '"); >' + surfOther.id + '</button>' + b +
						'surfaceType: ' + surfOther.surfaceType + b +
						( surfOther.Name ? 'Name: ' + surfOther.Name + b : '' ) +
						( surfOther.CADObjectId ?
							'<button onclick=toggeleCadId("' + encodeURI( surfOther.CADObjectId ) + '"); >' + surfOther.CADObjectId + '</button>' + b
							: ''
						) +

					'</p><hr>' + b;

				count ++;

			}

		}

		for ( let child of surfaceMeshesChildren ) {

			if ( surfaceCoordinateDuplicates.includes( child.userData.data.Name ) && child.material.color ) { child.material.color.set( '#ff80ff' ); }

		}

		return { summary: 'Duplicate Coordinates &raquo; ' + count, flowContent: flowContent };

	}



	function xxxxxxgetSurfaceDuplicateCadIds() {

		const surfacesIds = [];
		const surfaces = gbjson.Campus.Surface;
		let count = 0;
		let flowContent = '';

		for ( let surface of surfaces ) {

			const id = surface.CADObjectId;

			if ( !surfacesIds.includes( id ) ) {

				surfacesIds.push( id );

			} else {

				flowContent +=
					'<p>' + count +
						'. id: ' + '<button onclick=toggleSurface("' + surface.id + '"); >' + surface.id + '</button>' + b +
						'surfaceType: ' + surface.surfaceType + b +
						( surface.Name ? 'Name: ' + surface.Name + b : '' ) +
						( surface.CADObjectId ? 'CADObjectId: ' + surface.CADObjectId + b : '' ) +
					'</p>';

				count ++;

			}

		}

//console.log( 'getSurfaceDuplicateCadIds', surfacesIds.length );

		count = surfacesIds.length === 1 ? 0 : count;
		return { summary: 'Duplicate CADObjectId &raquo; ' + count, flowContent: flowContent };

	}



	function getSurfaceDuplicateCadIds() {

		const surfacesIds = [];
	surfaceMembers = [];
		const surfaces = gbjson.Campus.Surface;
		let count = 0;
		let flowContent = '';

		for ( let surface of surfaces ) {

			const id = surface.CADObjectId;

			index = surfacesIds.indexOf( id )
			if ( index < 0 ) {

				surfacesIds.push( id );
				surfaceMembers.push( { members: [ surface ] } );

			} else {

				surfaceMembers[ index ].members.push( surface );
/*
				flowContent +=
					'<p>' + count +
						'. id: ' + '<button onclick=toggleSurface("' + surface.id + '"); >' + surface.id + '</button>' + b +
						'surfaceType: ' + surface.surfaceType + b +
						( surface.Name ? 'Name: ' + surface.Name + b : '' ) +
						( surface.CADObjectId ? 'CADObjectId: ' + surface.CADObjectId + b : '' ) +
					'</p>';

				count ++;
*/
			}

		}

		count = surfacesIds.length === 1 ? 0 : count;

//console.log( 'getSurfaceDuplicateCadIds', surfacesIds.length );
//console.log( 'surfaceMembers', surfaceMembers );

		for ( member of surfaceMembers ) {

			if ( member.members.length > 1 ) {

//console.log( '', member.members );
				let surface;
				for ( surface of member.members ) {

					flowContent +=
						'<p>' + count +
							'. id: ' + '<button onclick=toggleSurface("' + surface.id + '"); >' + surface.id + '</button>' + b +
							'surfaceType: ' + surface.surfaceType + b +
							( surface.Name ? 'Name: ' + surface.Name + b : '' ) +
//							( surface.CADObjectId ? 'CADObjectId: ' + surface.CADObjectId + b : '' ) +
						'</p>';

					count ++;

				}

				flowContent +=

					'CADObjectId: <button onclick=toggeleCadId("' + encodeURI( surface.CADObjectId ) + '"); >' + surface.CADObjectId + '</button>' + b +

				'<hr>';

			}

		}

		return { summary: 'Duplicate CADObjectId &raquo; ' + count, flowContent: flowContent };

	}



	function getSurfaceDuplicateAdjacencies() {

		const surfaces = gbjson.Campus.Surface;
		let count = 0;
		let flowContent =
			'<p>' +
				'<button id=butDuplicateAdjacencies onclick=toggleAdjacencies(butDuplicateAdjacencies,surfaceAdjacencyDuplicates); >toggle all duplicates</button>' +
			'</p>';

		for ( let surface of surfaces ) {

			adjacencies = surface.AdjacentSpaceId;

			const height = parseFloat( surface.RectangularGeometry.Height );
			const width = parseFloat( surface.RectangularGeometry.Width );
			const surfaceArea = height * width;

			if ( Array.isArray( adjacencies ) === true && JSON.stringify( adjacencies[ 0 ] ) === JSON.stringify( adjacencies[ 1 ] ) ) {

				surfaceAdjacencyDuplicates.push( surface.Name );

//console.log( 'adjacencies', adjacencies  );

				flowContent +=
					'<div style=margin-bottom:35px; >' +
						( ++ count ) +
						'. id: ' + '<button onclick=toggleSurface("' + surface.id + '"); >' + surface.id + '</button>' + b +
						'surfaceType: ' + surface.surfaceType + b +
						( surface.Name ? 'Name: ' + surface.Name + b : '' ) +
						( surface.CADObjectId ?
							'<button onclick=toggeleCadId("' + encodeURI( surface.CADObjectId ) + '"); >' + surface.CADObjectId + '</button>' + b
							: ''
						) +
						' area: ' + Number( surfaceArea ).toFixed( 1 ) + ' length: ' + height.toFixed( 3 ) + ' width: ' + width.toFixed( 3 ) + b +
						'Space:  <button onclick=toggleSpace("' + adjacencies[ 0 ].spaceIdRef + '"); >' + adjacencies[ 0 ].spaceIdRef + '</button>' + b +
					'<hr></div>';
			}

		}


		for ( let child of surfaceMeshesChildren ) {

			if ( surfaceAdjacencyDuplicates.includes( child.userData.data.Name ) ) { child.material.color.set( '#c080ff' ); }

		}

		return { summary: 'Duplicate Adjacencies &raquo; ' + count, flowContent: flowContent };

	}



	function getSurfacesTinies() {

		surfaces = gbjson.Campus.Surface;
		const b = '<br>';
		let flowContent = '';
		let count = 0;

//console.log( 'surfaces', surfaces );

		for ( let surface of surfaces ) {

			const height = parseFloat( surface.RectangularGeometry.Height );
			const width = parseFloat( surface.RectangularGeometry.Width );
			const surfaceArea = height * width;

			if ( parseFloat( surfaceArea ) < sud.tinySurfaceSquareMeters ) {

//console.log( 'surface', surface );

				adjacency = surface.AdjacentSpaceId ? surface.AdjacentSpaceId : '';

				if ( adjacency ) {

					spaceId = Array.isArray( surface.AdjacentSpaceId ) === true ? surface.AdjacentSpaceId[ 1 ].spaceIdRef : surface.AdjacentSpaceId.spaceIdRef

				}

				flowContent += '<div style=margin-bottom:10px; > ' +
					( ++ count ) +
					'. id: <button onclick=toggleSurface("' + surface.id + '"); >' + surface.id + '</button>' + b +
					'surfaceType: ' + surface.surfaceType + b +
					( surface.Name ? 'Name: ' + surface.Name + b : '' ) +
					( surface.CADObjectId ?
						'<button onclick=toggeleCadId("' + encodeURI( surface.CADObjectId ) + '"); >' + surface.CADObjectId + '</button>' + b
						: ''
					) +
					' area: ' + Number( surfaceArea ).toFixed( 1 ) + ' length: ' + height.toFixed( 3 ) + ' width: ' + width.toFixed( 3 ) + b +
					( spaceId ? 'Space:  <button onclick=toggleSpace("' + spaceId + '"); >' + spaceId + '</button>' + b : '' ) +

				'</div>';

			}

		}

		return { summary: 'Tiny Surfaces &raquo; ' + count, flowContent: flowContent };

	}



	function getSurfaceAdjacencyInvalid() {


		const surfaces = gbjson.Campus.Surface;
		let count = 0;
		let flowContent =
			'<p>' +
				'<button id=butAdjacencyInvalid onclick=toggleAdjacencies(butAdjacencyInvalid,surfaceAdjacencyInvalids); >toggle all duplicates</button>' +
			'</p>';

		const adjacencyArrayOK = ['InteriorWall', 'InteriorFloor', 'Ceiling', 'Air' ];

		for ( let surface of surfaces ) {

			adjacencies = surface.AdjacentSpaceId;

			if ( Array.isArray( adjacencies ) === true && adjacencyArrayOK.includes( surface.surfaceType ) === false ) {

				surfaceAdjacencyInvalids.push( surface.Name );

//conconsole.log( 'surface.Name', surface.Name  );

				flowContent +=
					'<div style=margin-bottom:35px; >' +
						( ++ count ) +
						'. id: ' + '<button onclick=toggleSurface("' + surface.id + '"); >' + surface.id + '</button>' + b +
						'surfaceType: ' + surface.surfaceType + b +
						( surface.Name ? 'Name: ' + surface.Name + b : '' ) +
						( surface.CADObjectId ? 'CADObjectId: ' + surface.CADObjectId + b : '' ) +
						'Space:  <button onclick=toggleSpace("' + adjacencies[ 0 ].spaceIdRef + '"); >' + adjacencies[ 0 ].spaceIdRef + '</button>' + b +

					'<hr></div>';

			}

		}


		for ( let child of surfaceMeshesChildren ) {

			if ( surfaceAdjacencyInvalids.includes( child.userData.data.Name ) ) { child.material.color.set( 'crimson' ); }

		}

		return { summary: 'Invalid Adjacencies &raquo; ' + count, flowContent: flowContent };




	}



	function toggleStorey( id, node ) {

//console.log( 'id', id );

		const spaces = gbjson.Campus.Building.Space;
		surfaceGroup.visible = true;

		let zones = [];
		let spacesArray = [];

		for ( let child of surfaceMeshesChildren ) {

			child.visible = false;

		}

		for ( let child of surfaceMeshesChildren ) {

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

		node.parentNode.innerHTML +=
			'spaces ' + spacesArray.length + ': ' + spacesArray.join() + b +
			'zones ' + zones.length + ': ' + zones.join();

		return zones;

	}



	function toggleSurface( id ) {

		surfaceGroup.visible = true;

		for ( let child of surfaceMeshesChildren ) {

			if ( child.userData.data.id === id ) {

				child.visible = true;

//console.log( '', child );

				zoomIntoSurface( child );

			} else {

				child.visible = false;

			}

		};

	}



	function zoomIntoSurface( surface ){
//console.log( 'surface', surface );

		center = surface.localToWorld( surface.geometry.boundingSphere.center.clone() );

		radius = surface.geometry.boundingSphere.radius > 1 ? surface.geometry.boundingSphere.radius : 1;

		scene.remove( telltale );
		const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
		const material = new THREE.MeshNormalMaterial( { opacity: 0.7, transparent: true } );
		telltale = new THREE.Mesh( geometry, material );
		telltale.position.copy( center );
		scene.add( telltale );

		icw.controls.target.copy( center );
		icw.camera.position.copy( center.clone().add( new THREE.Vector3( 3.0 * radius, - 3.0 * radius, 3.0 * radius ) ) );

//console.log( 'bbb', center, radius );

	}



	function toggleSurfaceType( that ) {

		surfaceGroup.visible = true;
//console.log( '', surfaceAdjacencyDuplicates );

		for ( let child of surfaceMeshesChildren ) {

			if ( child.userData.data.surfaceType !== that.innerText ) {

				child.visible = false;

			} else {

				child.visible = true;

			}

		}

	}



	function setTypeInvisible( that ) {

		surfaceGroup.visible = true;
//console.log( '', surfaceAdjacencyDuplicates );

		that.style.backgroundColor = that.style.backgroundColor === 'lightblue' ? '' : 'lightblue';

		for ( let child of surfaceMeshesChildren ) {

			if ( child.userData.data.surfaceType === that.value && that.style.backgroundColor === 'lightblue' ) {

				child.visible = false;

			} else if ( child.userData.data.surfaceType === that.value ) {

				child.visible = true;

			}

		};

	}



	function toggleSpace( id ) {

		surfaceGroup.visible = true;

		for ( let child of surfaceMeshesChildren ) {

			child.visible = false;

			adjacentSpaceId = child.userData.data.AdjacentSpaceId;

			if ( adjacentSpaceId && adjacentSpaceId.spaceIdRef && id === adjacentSpaceId.spaceIdRef ) {

				child.visible = true;

			} else if ( Array.isArray( adjacentSpaceId ) === true ) {

				if ( id === adjacentSpaceId[ 0 ].spaceIdRef || id === adjacentSpaceId[ 1 ].spaceIdRef ) {

					child.visible = true;

					const type = child.userData.data.surfaceType;

					if ( type === 'InteriorFloor' || type === 'SlabOnGrade' || type === 'RaisedFloor' || type === 'UndergroundSlab' ) {

						zoomIntoSurface( child )

					}

				}

			}


		}

	}



	function toggeleCadId( CADObjectId ) {

//console.log( '', CADObjectId );
		surfaceGroup.visible = true;
		surfaceEdges.visible = true;

		for ( let child of surfaceMeshesChildren ) {

			if ( encodeURI( child.userData.data.CADObjectId ) === CADObjectId ) {

				child.visible = true;

			} else {

				child.visible = false;

			}

		}

	}



	function toggleAdjacencies( id, surfaceArray ) {

//console.log( '', that.innerText );

		if ( id.style.backgroundColor !== 'pink' ) {

			surfaceGroup.visible = true;

			for ( let child of surfaceMeshesChildren ) {

				if ( surfaceArray.includes( child.userData.data.Name ) ) {

					child.visible = true;

				} else {

					child.visible = false;

				}

			}

			id.style.backgroundColor = 'pink';

		} else {

			allVisible();

			id.style.backgroundColor = '';

		}

	}



	function allVisible() {

		surfaceGroup.visible = true;
		surfaceEdges.visible = true;

		for ( let child of surfaceMeshesChildren ) {

				child.visible = true;

		}

		buttons = document.body.getElementsByClassName( 'toggleView' );

		for ( butt of buttons ) {

			butt.style.backgroundColor = '';


		}

	}