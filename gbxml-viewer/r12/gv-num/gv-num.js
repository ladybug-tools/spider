/*global

THR, THREE, GBX, GBV, window, document,butSettings, detSettings,divMenuItems,rngOpacity,rngViewExplodeVertical

*/

// Copyright 2018 Ladybug Tools authors. MIT License


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


		if ( NUM.butMenuNumbers.style.backgroundColor !== 'var( --but-bg-color )' ) {

			divMenuItems.innerHTML =

				`
				<details id = NUMdetNumbers  class=app-menu open>

					<summary>Numbers</summary>

					<div>
						<div>toggle the visible elements</div>
						<button onclick=NUM.openingMeshes.visible=!NUM.openingMeshes.visible; >openings</button>
						<button onclick=GBX.surfaceMeshes.visible=!GBX.surfaceMeshes.visible; >surfaces</button>
						<button onclick=GBX.surfaceEdges.visible=!GBX.surfaceEdges.visible; >edges</button>
						<button onclick=GBX.setAllVisible();NUM.openingMeshes.visible=true; >all visible</button>
					</div>

					<details>
						<summary id="NUMdivStoreyNumber" >Areas by Storey</summary>
						<div class=flex-container2 >
								<div class=flex-div1 >
									<input oninput=NUM.updateSelect(this,NUMselStorey); size=6 placeholder="storey id" ><br>
									<select id = "NUMselStorey" onclick=GBV.showFloorSlabs(this.value);NUM.updateStoreyAttributes();
										onchange=GBV.showFloorSlabs(this.value);NUM.updateStoreyAttributes(); ></select>
								</div>
								<div id = "NUMdivStoreys" class=flex-left-div2  ></div>
						</div>
					</details>

					<details>
						<summary >Areas by Surface Type</summary>
						<div id = "NUMdivSurfaceTypeAreas" ></div>
					</details>

					<details>
						<summary >Exterior Areas</summary>
						<div id = "NUMdivExteriorAreas" ></div>
					</details>

					<details>
						<summary >Openings</summary>
						<div id = "NUMdivOpenings" ></div>
					</details>


					<details>
						<summary >Orientation</summary>
						<div id = "NUMdivOrientation" ></div>
					</details>

					<hr>

				</details>

			` + divMenuItems.innerHTML;

			NUM.timeStart = Date.now();

			NUM.getStoreys();
			NUM.getSurfaceTypes();
			NUM.getExteriorAreas();
			NUM.getOpenings();
			NUM.getOrientations();

			NUM.butMenuNumbers.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			NUMdetNumbers.remove();

			NUM.butMenuNumbers.style.backgroundColor = '';

		}

	};



	NUM.getStoreys = function() {

		if ( !GBX.gbjson.Campus.Building.BuildingStorey ) {

			NUMdivStoreys.innerHTML = 'No storey data'; return;

		}

		if ( Array.isArray( GBX.gbjson.Campus.Building.BuildingStorey ) ) {

			const storeys = GBX.gbjson.Campus.Building.BuildingStorey;
			NUM.storeysNumber = GBX.gbjson.Campus.Building.BuildingStorey.length;

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

		const id = GBX.gbjson.Campus.Building.BuildingStorey[ NUMselStorey.selectedIndex ];
		//NUMdivStoreys.innerHTML = NUM.traverseGbjson( id ).attributes;

		if ( !GBV.floorSlabs ) { return; }

		//console.log( 'GBV.floorSlabs', GBV.floorSlabs );

		const area = NUM.getSurfacesAreaByArrayOfSurfaces( GBV.floorSlabs );

		NUMdivStoreys.innerHTML = NUM.traverseGbjson( id ).attributes + '<br>' +
			'area: ' + Math.round( area ).toLocaleString();

		NUM.hideOpenings()

	}



	NUM.getSurfaceTypes = function() {

		const surfaces = GBX.gbjson.Campus.Surface;

		let txt = '<b></b><br>';
		const types = [];
		const typesCount = [];

		for ( let surfaceType of GBX.surfaceTypes ) {

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
				' <button style=width:8rem; class=toggle onclick=GBV.showSurfaceType(this.innerText);NUM.hideOpenings(); >' + types[ i ] + '</button> area: ' +
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
			'<div><button style=width:8rem; onclick=GBV.showBySurfaceTypeArray(surfaceTypes);NUM.hideOpenings(); >Total floor</button> area: ' + Math.round( tfa ).toLocaleString() + '<div>';


	}



	NUM.getExteriorAreas = function() {

		const tesa = NUM.surfacesExteriorWallArea + NUM.surfacesRoofArea;

		NUMdivExteriorAreas.innerHTML =
			'<button style=width:8rem; onclick=GBV.showBySurfaceTypeArray(["ExteriorWall","Roof"]); >Exterior surfaces</button> area: ' +
			Math.round( tesa ).toLocaleString() + '<br>' +
		'';

	}


	NUM.getOpenings = function() {

		NUM.surfacesExteriorWall = GBX.surfaceJson.filter( element => element.surfaceType === 'ExteriorWall' );
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

			NUM.openingMeshes.add( shapeMesh );

		}

		NUM.openingMeshes.name = 'openingMeshes';

		THR.scene.add( NUM.openingMeshes );
		//console.log( 'NUM.openingMeshes', NUM.openingMeshes );

		const wwr = 100 * NUM.openingsArea / NUM.surfacesExteriorWallArea;

		//const surfaceTypes = ["ExteriorWall","Roof"];

		NUMdivOpenings.innerHTML =

			'<button style=width:8rem; onclick=GBV.showBySurfaceTypeArray(["ExteriorWall"]); >Exterior Wall</button> area: ' +
			Math.round( NUM.surfacesExteriorWallArea ).toLocaleString() + '<br>' +

			'Openings: ' + NUM.openings.length + '<br>' +
			'<button style=width:8rem; onclick=NUM.openingMeshes.visible=!NUM.openingMeshes.visible >Openings Toggle</button> area: ' +
			Math.round( NUM.openingsArea ).toLocaleString() + '<br>' +

			'Window to Wall Ratio: ' + wwr.toLocaleString() + '%<br>' +
			'<small>Clickable openings on the way</small>'

		'';

	}



	NUM.getSurfacesArea = function( type ) {

		let area = 0;
		const surfaces = GBX.surfaceJson.filter( element => element.surfaceType === type );

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

			area += THREE.ShapeUtils.area( points );
			//console.log( 'area', THREE.ShapeUtils.area( points ) );

			NUM[ 'surfaces' + type + 'Area' ] = area;

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

		const surfaces = GBX.surfaceJson.filter( element => element.surfaceType === 'ExteriorWall' );
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


			const wall = GBX.surfaceMeshes.children.find( ( element ) => element.userData.data.id === surface.id );

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

			const openingMesh = NUM.openingMeshes.children.find( ( element ) => element.userData.data.id === opening.id );

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

			} else {  // > 292 && < 337.5

				oriented.NorthEast.openings.push( openingMesh );

			}

		}


		txt = '';

		for ( let key of keys ) {

			oriented[ key ].areaWalls = NUM.getSurfacesAreaByArrayOfSurfaces( oriented[ key ].items );
			oriented[ key ].areaOpenings = NUM.getSurfacesAreaByArrayOfSurfaces( oriented[ key ].openings );

			if ( oriented[ key ].openings.length > 0 ) {

				num = 'wwr: ' + Math.round( 100 * oriented[ key ].areaOpenings / oriented[ key ].areaWalls ).toLocaleString() + '%';

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
		GBX.surfaceMeshes.children.forEach( element => element.visible = false );
		surfaces.forEach( element => element.visible = true );

	};


	NUM.hideOpenings = function() {

		if ( NUM.openingMeshes ) { NUM.openingMeshes.visible = false; }

	}



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

	}



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