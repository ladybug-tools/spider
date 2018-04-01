/*global

THR, THREE, GBP, GBV, window, document,butSettings, detSettings,divMenuItems,rngOpacity,rngViewExplodeVertical

*/

// Copyright 2018 Ladybug Tools authors. MIT License

	//var uriGbxmlDefault = '../../gbxml-sample-files/columbia-sc-two-story-education-trane.xml';
	//let uriGbxmlDefault;


	var NUM = {};

	NUM.initNumbers = function () {

		if ( window.butMenuLoad ) {

			NUM.butMenuNumbers = butMenuLoad;

			NUM.title = 'gv-NUM - gbXML Viewer Numbers';
			document.title = NUM.title;
			aDocumentTitle.innerHTML = NUM.title;
			NUM.butMenuNumbers.innerHTML = NUM.title;

		} else {

			NUM.butMenuNumbers = butMenuNumbers;

		}


		//if ( NUM.butMenuNumbers.style.backgroundColor !== 'var( --but-bg-color )' ) {
		if ( NUM.butMenuNumbers.style.fontStyle !== 'italic' ) {

			divMenuItems.innerHTML =

				`
				<details id = NUMdetNumbers  class=app-menu open>

					<summary>Numbers</summary>

					<div>
						<div>toggle the visible elements</div>
						<button onclick=GBP.surfaceMeshes.visible=!GBP.surfaceMeshes.visible; >surfaces</button>
						<button onclick=GBP.surfaceEdges.visible=!GBP.surfaceEdges.visible; >edges</button>
						<button onclick=GBP.openingMeshes.visible=!GBP.openingMeshes.visible; >openings</button>
						<button onclick=GBP.setAllVisible(); >all visible</button>
					</div>

					<details>
						<summary id="NUMdivStoreyNumber" >Areas by Storey</summary>
						<div class=flex-container2 >
								<div class=flex-div1 >
									<input oninput=NUM.updateSelect(this,NUMselStorey); size=6 placeholder="storey id" ><br>
									<select id = "NUMselStorey" onclick=NUM.showFloorSlabs(this.value);NUM.updateStoreyAttributes();
										onchange=NUM.showFloorSlabs(this.value);NUM.updateStoreyAttributes(); ></select>
								</div>
								<div id = "NUMdivStoreys" class=flex-left-div2  ></div>
						</div>
						<hr>
					</details>

					<details>
						<summary >Areas by Surface Type</summary>
						<div id = "NUMdivSurfaceTypeAreas" ></div>
						<hr>
					</details>

					<details open>
						<summary >Areas by Opening Type</summary>
						<div id = "NUMdivOpenings" ></div>
						<hr>
					</details>

					<details>
						<summary >Exterior Areas</summary>
						<div id = "NUMdivExteriorAreas" ></div>
						<hr>
					</details>

					<details>
						<summary >Areas & Ratios by Orientation</summary>
						<div id = "NUMdivOrientation" ></div>
					</details>

					<hr>

				</details>

			` + divMenuItems.innerHTML;

			NUM.timeStart = Date.now();

			NUM.getStoreys();
			NUM.getSurfaceTypes();
			NUM.getOpeningTypes();
			NUM.getExteriorAreas();

			NUM.getOrientations();

			//NUM.butMenuNumbers.style.backgroundColor = 'var( --but-bg-color )';
			NUM.butMenuNumbers.style.cssText = 'background-color: pink !important; font-style: italic; font-weight: bold';

		} else {

			NUMdetNumbers.remove();

			NUM.butMenuNumbers.style.backgroundColor = '';
			NUM.butMenuNumbers.style.fontStyle = '';
			NUM.butMenuNumbers.style.fontWeight = '';

		}

		divContainer.style.display = 'none';
		THR.controls.autoRotate = false;
		THR.controls.keys = false;
	};



	NUM.getStoreys = function() {

		if ( !GBP.gbjson.Campus.Building.BuildingStorey ) {

			NUMdivStoreys.innerHTML = 'No storey data'; return;

		}

		if ( Array.isArray( GBP.gbjson.Campus.Building.BuildingStorey ) ) {

			const storeys = GBP.gbjson.Campus.Building.BuildingStorey;
			NUM.storeysNumber = GBP.gbjson.Campus.Building.BuildingStorey.length;

			let storeyOptions = '';

			for ( let storey of storeys ) {

				storeyOptions += '<option>' + storey.id + '</option>';

			}

			NUMdivStoreyNumber.innerHTML = 'Areas by Storey &raquo; ' + NUM.storeysNumber;
			NUMselStorey.innerHTML = storeyOptions;
			NUMselStorey.selectedIndex = 0;
			NUMselStorey.size = NUM.storeysNumber < 10 ? NUM.storeysNumber : 10;

			NUM.updateStoreyAttributes()

		} else {

			NUM.storeysNumber = 'no storey data';

			NUMdivStoreyNumber.innerHTML = 'Storeys &raquo; no storey data';

		}

	};



	NUM.updateStoreyAttributes = function() {

		const id = GBP.gbjson.Campus.Building.BuildingStorey[ NUMselStorey.selectedIndex ];
		//NUMdivStoreys.innerHTML = NUM.traverseGbjson( id ).attributes;

		NUM.floorSlabs = GBP.surfaceMeshes.children.filter( child => child.visible === true );
		//console.log( 'GBV.floorSlabs', GBV.floorSlabs );

		const area = NUM.getSurfacesAreaByArrayOfSurfaces( NUM.floorSlabs );

		NUMdivStoreys.innerHTML = NUM.traverseGbjson( id ).attributes + '<br>' +
			'area: ' + Math.round( area ).toLocaleString();

		NUM.hideOpenings()

	}



	NUM.getSurfaceTypes = function() {

		const surfaces = GBP.gbjson.Campus.Surface;

		let txt = '<b></b><br>';
		const types = [];
		const typesCount = [];

		for ( let surfaceType of GBP.surfaceTypes ) {

			NUM[ 'surfaces' + surfaceType + 'Area' ] =  0;

		}

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
				' <button style=width:8rem;' + // background-color:' + GBP.colors[this.innerText] +
					'; class=toggle onclick=NUM.showSurfaceType(this.innerText);NUM.hideOpenings(); >' + types[ i ] + '</button> area: ' +
					Math.round( NUM.getSurfacesArea( types[ i ] ) ).toLocaleString() +

				'<br>';

		}

		const tfa =
			NUM.surfacesInteriorFloorArea +
			NUM.surfacesSlabOnGradeArea +
			NUM.surfacesRaisedFloorArea +
			NUM.surfacesUndergroundSlabArea;

		surfaceTypes = ["InteriorFloor","RaisedFloor","SlabOnGrade","UndergroundSlab"];

		NUMdivSurfaceTypeAreas.innerHTML =
			txt + '<br>' +
			'<div><button style=width:8rem; onclick=NUM.showBySurfaceTypeArray(surfaceTypes);NUM.hideOpenings(); >Total floor</button> area: ' + Math.round( tfa ).toLocaleString() + '<div>';


	}



	NUM.getExteriorAreas = function() {

		const tesa = NUM.surfacesExteriorWallArea + NUM.surfacesRoofArea +
			NUM.surfacesExposedFloorArea + NUM.surfacesSlabOnGradeArea + NUM.surfacesUndergroundSlabArea +
			NUM.surfacesUndergroundWallArea;

		// array of types must be embedded , use double quotes and have no spaces
		NUMdivExteriorAreas.innerHTML =
			'<button style=width:8rem; onclick=NUM.showBySurfaceTypeArray(["ExteriorWall","Roof","ExposedFloor","SlabOnGrade","UndergroundSlab","UndergroundWall"]); >Exterior surfaces</button> area: ' +
			Math.round( tesa ).toLocaleString() + '<br>' +
		'';

	}



	NUM.xxxgetOpenings = function() {

		NUM.surfacesExteriorWall = GBP.surfaceJson.filter( element => element.surfaceType === 'ExteriorWall' );
		//console.log( 'NUM.surfacesExteriorWall', NUM.surfacesExteriorWall );
		//		NUM.surfacesExteriorWallArea = NUM.getSurfacesArea( NUM.surfacesExteriorWall );

		NUM.SurfacesWithOpenings = NUM.surfacesExteriorWall.filter( surface => surface.Opening );
		//console.log( 'NUM.SurfacesWithOpenings', NUM.SurfacesWithOpenings );

		NUM.openings = [];

		for ( surface of NUM.SurfacesWithOpenings ) {

			if ( surface.Opening.length ) {

				NUM.openings.push ( ...surface.Opening );

			} else {

				NUM.openings.push ( surface.Opening );

			}

			//if ( surface.Opening.length ) { console.log( 'surface.Opening.length', surface.Opening.length ); }

		}
		//console.log( 'NUM.openings', NUM.openings );

		NUM.openingsArea = 0;


		var material = new THREE.MeshBasicMaterial( { color: 0x000000, side: 2 } );
		NUM.openingMeshes = new THREE.Object3D();

		for ( opening of NUM.openings ) {
			//console.log( 'opening', opening.PlanarGeometry.PolyLoop );

			const points = opening.PlanarGeometry.PolyLoop.CartesianPoint.map( CartesianPoint => new THREE.Vector3().fromArray( CartesianPoint.Coordinate ) )
			//console.log( 'points', points );

			const triangle = NUM.getTriangle( points );
			//console.log( 'triangle', triangle.normal() );
			if ( !triangle ) { console.log( 'surface error', opening ); continue; };

			const obj = new THREE.Object3D();
			obj.lookAt( triangle.normal );  // copy the rotation of the triangle
			const obj2 = new THREE.Object3D();
			obj2.lookAt( triangle.normal );
			obj2.quaternion.conjugate();
			obj2.updateMatrixWorld();

			points.map( point => obj2.localToWorld( point ) );
			//console.log( 'points', points );

			NUM.openingsArea += THREE.ShapeUtils.area( points );
			//console.log( 'area', THREE.ShapeUtils.area( points ) );

			shape = new THREE.Shape( points );
			//console.log( '', shape );
			shape.autoClose = true;

			const geometryShape = new THREE.ShapeGeometry( shape );

			let shapeMesh = new THREE.Mesh( geometryShape, material );
			shapeMesh.lookAt( triangle.normal ); // quaternion.copy( obj.quaternion );
			shapeMesh.position.copy( triangle.normal.multiplyScalar( - triangle.constant ) );
			shapeMesh.userData.data = opening;

			//NUM.openingMeshes.add( shapeMesh );

		}

		//NUM.openingMeshes.name = 'openingMeshes';

		//THR.scene.add( NUM.openingMeshes );
		//console.log( 'NUM.openingMeshes', NUM.openingMeshes );


		const wwr = 100 * NUM.openingsArea / NUM.surfacesExteriorWallArea;

		//const surfaceTypes = ["ExteriorWall","Roof"];

		NUMdivOpenings.innerHTML =

			'<button style=width:8rem; onclick=GBV.showBySurfaceTypeArray(["ExteriorWall"]); >Exterior Wall</button> area: ' +
			Math.round( NUM.surfacesExteriorWallArea ).toLocaleString() + '<br>' +

			'Openings: ' + NUM.openings.length + '<br>' +
			'<button style=width:8rem; onclick=NUM.openingMeshes.visible=!NUM.openingMeshes.visible >Openings Toggle</button> area: ' +
			//Math.round( NUM.openingsArea ).toLocaleString() + '<br>' +

			//'Window to Wall Ratio: ' + wwr.toLocaleString() + '%<br>' +
			'<small>Clickable openings on the way</small>'

		'';

	}



	NUM.getOpeningTypes = function() {

		NUM.SurfacesWithOpenings = GBP.surfaceJson.filter( element => element.Opening );

		//console.log( 'NUM.SurfacesWithOpenings', NUM.SurfacesWithOpenings );

		//const surfaces = GBP.gbjson.Campus.Surface;

		NUM.openings = [];

		for ( surface of NUM.SurfacesWithOpenings ) {

			if ( surface.Opening.length ) {

				NUM.openings.push ( ...surface.Opening );

			} else {

				NUM.openings.push ( surface.Opening );

			}

			//if ( surface.Opening.length ) { console.log( 'surface.Opening.length', surface.Opening.length ); }

		}

		//console.log( 'NUM.openings', NUM.openings );

		let txt = '';
		const types = [];
		const typesCount = [];


		for ( let opening of NUM.openings ) {

			index = types.indexOf( opening.openingType );

			if ( index < 0 ) {

				types.push( opening.openingType );
				typesCount[ types.length - 1 ] = 1;

			} else {

				typesCount[ index ] ++;

			}

		}

		let areaTotal = 0;
		for ( let i = 0; i < types.length; i++ ) {

			area = NUM.getAreaOpeningTypes( types[ i ] )
			txt +=
				' <button style=width:8rem; class=toggle onclick=NUM.showOpeningType(this.innerText); >' + types[ i ] +
					'</button> area: ' + Math.round( area ).toLocaleString() +
				'<br>';
				areaTotal += area;

		}

		NUMdivOpenings.innerHTML =
			txt + '<br>' +
			'<div><button style=width:8rem; onclick=NUM.showOpeningType(); >' +
				'Total openings</button> area: ' + Math.round( areaTotal ).toLocaleString() + '<div>' +
		'';

	}



	NUM.getAreaOpeningTypes = function( type ) {

		let areaTotal = 0;

		const openings = NUM.openings.filter( element => element.openingType === type );

		for ( opening of openings ) {
			//console.log( 'undergroundWall', undergroundWall.PlanarGeometry.PolyLoop );

			const points = opening.PlanarGeometry.PolyLoop.CartesianPoint.map( CartesianPoint => new THREE.Vector3().fromArray( CartesianPoint.Coordinate ) )
			//console.log( 'points', points );

			const triangle = NUM.getTriangle( points );
			//console.log( 'triangle', triangle );
			if ( !triangle ) { console.log( 'opening error', opening ); continue; };

			//console.log( 'triangle,normal', triangle.normal() );

			const obj = new THREE.Object3D();
			obj.lookAt( triangle.normal );  // copy the rotation of the triangle
			obj.quaternion.conjugate();
			obj.updateMatrixWorld();

			points.map( point => obj.localToWorld( point ) );
			//console.log( 'points', points );

			area = THREE.ShapeUtils.area( points );
			areaTotal += area
			//console.log( 'area', THREE.ShapeUtils.area( points ) );

			//surface.area = area;


		}

		NUM[ 'openings' + type + 'Area' ] = areaTotal;
		return areaTotal;

	}



	NUM.getSurfacesArea = function( type ) {

		let areaTotal = 0;
		const surfaces = GBP.surfaceJson.filter( element => element.surfaceType === type );

		for ( surface of surfaces ) {
			//console.log( 'undergroundWall', undergroundWall.PlanarGeometry.PolyLoop );

			const points = surface.PlanarGeometry.PolyLoop.CartesianPoint.map( CartesianPoint => new THREE.Vector3().fromArray( CartesianPoint.Coordinate ) )
			//console.log( 'points', points );

			const triangle = NUM.getTriangle( points );
			//console.log( 'triangle', triangle );
			if ( !triangle ) { console.log( 'surface error', surface ); continue; };

			//console.log( 'triangle,normal', triangle.normal() );

			const obj = new THREE.Object3D();
			obj.lookAt( triangle.normal );  // copy the rotation of the triangle
			obj.quaternion.conjugate();
			obj.updateMatrixWorld();

			points.map( point => obj.localToWorld( point ) );
			//console.log( 'points', points );

			area = THREE.ShapeUtils.area( points );
			areaTotal += area
			//console.log( 'area', THREE.ShapeUtils.area( points ) );

			//surface.area = area;
			NUM[ 'surfaces' + type + 'Area' ] = areaTotal;

		}

		return area;

	}



	NUM.getSurfacesAreaByArrayOfSurfaces = function( surfaces ) {
		// console.log( '', surfaces );

		let area = 0;

		for ( surface of surfaces ) {
			//console.log( 'undergroundWall', undergroundWall.PlanarGeometry.PolyLoop );

			const points = surface.userData.data.PlanarGeometry.PolyLoop.CartesianPoint.map( CartesianPoint => new THREE.Vector3().fromArray( CartesianPoint.Coordinate ) )
			//console.log( 'points', points );

			const triangle = NUM.getTriangle( points );
			//console.log( 'triangle', triangle );
			if ( !triangle ) { console.log( 'surface error', surface ); continue; };

			//console.log( 'triangle,normal', triangle.normal() );

			const obj = new THREE.Object3D();
			obj.lookAt( triangle.normal );  // copy the rotation of the triangle
			obj.quaternion.conjugate();
			obj.updateMatrixWorld();

			points.map( point => obj.localToWorld( point ) );
			//console.log( 'points', points );

			area += THREE.ShapeUtils.area( points );
			//console.log( 'area', THREE.ShapeUtils.area( points ) );

			//NUM[ 'surfaces' + type + 'Area' ] = area;

		}

		return area;

	}



	NUM.getTriangle = function( points, start = 0 ) {

		if ( start + 2 >= points.length ) { divLog.innerHTML = 'no more points'; return; }

		triangle = new THREE.Triangle();
		triangle.set( points[ start ], points[ start + 1 ], points[ start + 2 ] );

		/*
		console.log( 'start', start );
		console.log( 'triangle', triangle );
		console.log( 'area', triangle.area() );
		console.log( 'normal', triangle.normal() );
		*/

		if ( triangle.area() === 0 ) {

			start++;
			NUM.getTriangle( points, start );

		} else {

			//return triangle;

			const plane = new THREE.Plane();
			return triangle.plane( plane );
		}

	}



	NUM.getOrientations = function(){

		const surfaces = GBP.surfaceJson.filter( element => element.surfaceType === 'ExteriorWall' );

		oriented = {
			North: { items: [], openings: [], color: 'Blue' },
			NorthEast: { items:[], openings: [], color: 'Magenta' },
			East: { items:[], openings: [], color: 'DarkOrange' },
			SouthEast: { items:[], openings: [], color: 'OrangeRed' },
			South: { items:[], openings: [], color: 'Red' },
			SouthWest: { items:[], openings: [], color: 'Salmon' },
			West: { items:[], openings: [], color: 'Chocolate' },
			NorthWest: { items:[], openings: [], color: 'Gold' }
		};

		keys = Object.keys( oriented );
		//console.log( 'keys', keys );

		for ( let key of keys ) {

			oriented[ key ].material = new THREE.MeshBasicMaterial( { color: oriented[ key ].color.toLowerCase(), side: 2 } );

		}

		for ( surface of surfaces ) {
			//console.log( 'undergroundWall', undergroundWall.PlanarGeometry.PolyLoop );

			const points = surface.PlanarGeometry.PolyLoop.CartesianPoint.map( CartesianPoint => new THREE.Vector3().fromArray( CartesianPoint.Coordinate ) )
			//console.log( 'points', points );

			const triangle = NUM.getTriangle( points );
			//console.log( 'normal', triangle.normal );

			if ( !triangle ) { console.log( 'error', surface ); continue; }
			angle = Math.atan2( triangle.normal.y, triangle.normal.x) * 180 / Math.PI + 180;
			//console.log( 'angle', angle );


			const wall = GBP.surfaceMeshes.children.find( ( element ) => element.userData.data.id === surface.id );

			if ( angle < 22.5 && angle >= 0 || angle > 337.5 && angle < 360 ) {

				wall.material = oriented.East.material
				oriented.East.items.push( wall );

			} else if ( angle >= 22.5 && angle < 67.5) {

				wall.material = oriented.SouthEast.material
				oriented.SouthEast.items.push( wall );

			} else if ( angle >= 67.7 && angle < 112.5 ) {

				wall.material = oriented.South.material
				oriented.South.items.push( wall );

			} else if ( angle >= 112.5 && angle < 157.5 ) {

				wall.material = oriented.SouthWest.material
				oriented.SouthWest.items.push( wall );

			} else if ( angle >= 157.5 && angle < 202.5 ) {

				wall.material = oriented.West.material
				oriented.West.items.push( wall );

			} else if ( angle >= 202.5 && angle < 247.5 ) {

				wall.material = oriented.NorthWest.material
				oriented.NorthWest.items.push( wall );

			}	else if ( angle >= 247.5 && angle < 292.5 ) {

				wall.material = oriented.North.material
				oriented.North.items.push( wall );

			} else {  // > 292 && < 337.5

				wall.material = oriented.NorthEast.material
				oriented.NorthEast.items.push( wall );

			}

		}

		for ( opening of NUM.openings ) {
			//console.log( 'opening', opening );

			const points = opening.PlanarGeometry.PolyLoop.CartesianPoint.map( CartesianPoint => new THREE.Vector3().fromArray( CartesianPoint.Coordinate ) )
			//console.log( 'points', points );

			const triangle = NUM.getTriangle( points );
			//console.log( 'normal', triangle.normal );
			if ( !triangle ) { console.log( 'error', surface ); continue; }

			angle = Math.atan2( triangle.normal.y, triangle.normal.x) * 180 / Math.PI + 180;
			//console.log( 'angle', angle );

			const openingMesh = GBP.openingMeshes.children.find( ( element ) => element.userData.data.id === opening.id );

			if ( !openingMesh ) { console.log( 'no mesh', 23 ); continue; }


			if ( angle < 22.5 && angle >= 0 || angle > 337.5 && angle < 360 ) {

				oriented.East.openings.push( openingMesh );

			} else if ( angle >= 22.5 && angle < 67.5) {

				oriented.SouthEast.openings.push( openingMesh );

			} else if ( angle >= 67.7 && angle < 112.5 ) {

				oriented.South.openings.push( openingMesh );

			} else if ( angle >= 112.5 && angle < 157.5 ) {

				oriented.SouthWest.openings.push( openingMesh );

			} else if ( angle >= 157.5 && angle < 202.5 ) {

				oriented.West.openings.push( openingMesh );

			} else if ( angle >= 202.5 && angle < 247.5 ) {

				oriented.NorthWest.openings.push( openingMesh );

			}	else if ( angle >= 247.5 && angle < 292.5 ) {

				oriented.North.openings.push( openingMesh );

			} else if ( angle >= 292 && angle < 337.5 ) {  // > 292 && < 337.5

				oriented.NorthEast.openings.push( openingMesh );

			} else {

				console.log( 'oops', openingMesh );

			}

		}


		txt = '';

		for ( let key of keys ) {

			oriented[ key ].areaWalls = NUM.getSurfacesAreaByArrayOfSurfaces( oriented[ key ].items );
			oriented[ key ].areaOpenings = NUM.getSurfacesAreaByArrayOfSurfaces( oriented[ key ].openings );

			if ( oriented[ key ].openings.length > 0 ) {

				num = 'wwr:' + Math.round( 100 * oriented[ key ].areaOpenings / oriented[ key ].areaWalls ).toLocaleString() + '%';

			} else {

				num = '';

			}

			txt += '<button onclick=NUM.showSurfacesInArray("' + key + '"); style=width:5rem;background-color:' + oriented[ key ].color + '; >' + key +
			'</button> wall:' + Math.round(oriented[ key ].areaWalls).toLocaleString() +
			' open:' + Math.round(oriented[ key ].areaOpenings).toLocaleString() +
			' ' + num + '<br>';

		}

		NUMdivOrientation.innerHTML = txt

	}



	NUM.showSurfacesInArray = function ( key ) {

		surfaces = oriented[ key ].items
		GBP.surfaceMeshes.children.forEach( element => element.visible = false );
		surfaces.forEach( element => element.visible = true );

	};


	//combine with by array

	NUM.showSurfaceType = function( type ) {

		GBP.surfaceMeshes.children.forEach( element => element.visible = element.userData.data.surfaceType === type? true : false );

	};



	NUM.showBySurfaceTypeArray = function( types ) {

		console.log( 'types', types );

		const spaces = GBP.gbjson.Campus.Building.Space;

		GBP.surfaceMeshes.visible = true;

		GBP.surfaceMeshes.children.forEach( element => element.visible = false );

		for ( let child of GBP.surfaceMeshes.children ) {

			//adjacentSpaceId = child.userData.data.AdjacentSpaceId

			//if ( !adjacentSpaceId ) { continue; }

			//spaceIdRef = Array.isArray( adjacentSpaceId ) ? adjacentSpaceId[ 1 ].spaceIdRef : adjacentSpaceId.spaceIdRef

			spaces.forEach( element => { child.visible = types.includes( child.userData.data.surfaceType )  ? true : child.visible;

			} );

		}

		GBP.floorSlabs = GBP.surfaceMeshes.children.filter( child => child.visible === true );
		//console.log( 'GBV.floorSlabs', GBV.floorSlabs);

	};



	NUM.showOpeningType = function( type ) {

		GBP.surfaceMeshes.visible = false;

		if ( type ) {

			GBP.openingMeshes.children.forEach( element => element.visible = element.userData.data.openingType === type ? true : false );

		} else {

			GBP.openingMeshes.children.forEach( element => element.visible = true );

		}

	};


	NUM.hideOpenings = function() {

		if ( NUM.openingMeshes ) { NUM.openingMeshes.visible = false; }

	};



	NUM.showFloorSlabs = function( id ) {

		//console.log( 'id', id );

		const spaces = GBP.gbjson.Campus.Building.Space;

		const types = ['InteriorFloor', 'SlabOnGrade', 'RaisedFloor', 'UndergroundSlab']

		GBP.surfaceMeshes.children.forEach( element => element.visible = false );

		for ( let child of GBP.surfaceMeshes.children ) {

			adjacentSpaceId = child.userData.data.AdjacentSpaceId

			if ( !adjacentSpaceId ) { continue; }

			spaceIdRef = Array.isArray( adjacentSpaceId ) ? adjacentSpaceId[ 1 ].spaceIdRef : adjacentSpaceId.spaceIdRef

			spaces.forEach( element => { child.visible = element.id === spaceIdRef
				&& element.buildingStoreyIdRef === id  && types.includes( child.userData.data.surfaceType )  ? true : child.visible;

			} );

		}

		NUM.floorSlabs = GBP.surfaceMeshes.children.filter( child => child.visible === true );
		//console.log( 'GBV.floorSlabs', GBV.floorSlabs);

	};



	NUM.traverseGbjson = function traverseGbjson( obj ) {

		const elements = [];
		let attributes = '';

		for ( let property in obj ) {

			if ( obj[ property ] !== null && typeof( obj[ property ] ) === 'object' ) {

				if ( elements.indexOf( property ) < 0 ) { elements.push( property ); }

			} else {

				attributes += '<div>' + property + ': <i>' + obj[ property ] + '</i></div>';

			}

		};

		return { elements: elements, attributes: attributes };

	};



	// copied from  HUD/ move to GBV?
	NUM.updateSelect = function( input, select ) {

		const str = input.value.toLowerCase();

		for ( let option of select.options ) {

			if ( option.value.toLowerCase().includes( str ) ) {

				select.value = option.value;
				//select.click();

				break;

			}

		}

	};



	NUM.initNumbers();