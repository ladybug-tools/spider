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

//			Number of Storeys: ` + NUM.storeysNumber + `<br>
			divMenuItems.innerHTML =

				`<details id = NUMdetNumbers  class=app-menu open>

					<summary>Numbers</summary>

					<div><b id="NUMdivStoreyNumber" >Storeys</b><div>
					<div class=flex-container2 >
							<div class=flex-div1 >
								<input oninput=NUM.updateSelect(this,NUMselStorey); size=6 placeholder="zone id" ><br>
								<select id = "NUMselStorey" onclick=GBV.showFloorSlabs(this.value);NUM.updateStoreyAttributes();
									onchange=GBV.showFloorSlabs(this.value);NUM.updateStoreyAttributes(); ></select>
							</div>
							<div id = "NUMdivStoreys" class=flex-left-div2  ></div>
					</div>


					<div id = "NUMdivSurfaceTypeAreas" ></div>
					<div id = "NUMdivExteriorAreas" ></div>
					<div id = "NUMdivOpenings" ></div>
					<div id = "NUMdivOrientation" ></div>

					<hr>

				</details>

			` + divMenuItems.innerHTML;

			//initMenuNumbers();
			NUM.timeStart = Date.now();

			NUM.getStoreys();
			NUM.getSurfaceTypes();
			NUM.getOpenings();
			NUM.setOpeningsText();
			NUM.getOrientations();
			//NUM.toggleSurfaceNormals();

			//NUM.getSurfacesExteriorWall();

			NUM.butMenuNumbers.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			NUMdetNumbers.remove();

			NUM.butMenuNumbers.style.backgroundColor = '';

		}



		function initMenuNumbers() {

			let txt = 'lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?';

			divNumbers.innerHTML =
			`
				<textarea id=txtNumbers placeholder="a place for sticky notes" style="height:100px;width:100%;" onchange=localStorage.setItem("gvNumbers",this.value);></textarea>

				<details open >
					<summary id = "NUMsumNumbers" >Numbers</summary>
					<div>` + txt + `</div>
				</details>

			`;

			gvNumbers = localStorage.getItem( 'gvNumbers' );
			txtNumbers.value = gvNumbers;
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

			NUMdivStoreyNumber.innerHTML = 'Storeys &raquo; ' + NUM.storeysNumber;
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
			'area: ' + area.toLocaleString();

		NUM.hideOpenings()

	}



	NUM.getSurfaceTypes = function() {

		const surfaces = GBX.gbjson.Campus.Surface;

		let txt = '<b>Areas by Surface Type</b><br>';
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
				' <button class=toggle onclick=GBV.showSurfaceType(this.innerText);NUM.hideOpenings(); >' + types[ i ] + '</button> area: ' +
				NUM.getSurfacesArea( types[ i ] ).toLocaleString() +

				'<br>';

		}

		const tfa =
			NUM.surfacesInteriorFloorArea +
			NUM.surfacesSlabOnGradeArea +
			NUM.surfacesRaisedFloorArea +
			NUM.surfacesUndergroundSlabArea;

		surfaceTypes = ["InteriorFloor","RaisedFloor","SlabOnGrade","UndergroundSlab"];

		NUMdivSurfaceTypeAreas.innerHTML =
			txt +
			'<div><button onclick=GBV.showBySurfaceTypeArray(surfaceTypes);NUM.hideOpenings(); >Total floor</button> area: ' + tfa.toLocaleString() + '<div>';


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

			NUM.openingMeshes.add( shapeMesh );

		}

		THR.scene.add( NUM.openingMeshes );
		//console.log( 'NUM.openingMeshes', NUM.openingMeshes );

	}



	NUM.setOpeningsText = function() {

		const wwr = 100 * NUM.openingsArea / NUM.surfacesExteriorWallArea;

		tesa =
			NUM.surfacesExteriorWallArea + NUM.surfacesRoofArea;

		const surfaceTypes = ["ExteriorWall","Roof"];

		NUMdivExteriorAreas.innerHTML =
		'<div><b>Exterior Areas</b><div>' +
			'<button onclick=GBV.showBySurfaceTypeArray(["ExteriorWall","Roof"]); >Exterior surfaces</button> area: ' + tesa.toLocaleString() + '<br>' +
		'';

		NUMdivOpenings.innerHTML =

			'<div><b>Openings</b></div>' +
			//			'Exterior Wall Surfaces: ' + NUM.surfacesExteriorWall.length + '<br>' +
			//			'Exterior Wall Surfaces with Openings: ' + NUM.SurfacesWithOpenings.length + '<br>' +

			//			'Underground Wall Area: ' + NUM.undergroundWallArea.toLocaleString() + '<br>' +

			'<button onclick=GBV.showBySurfaceTypeArray(["ExteriorWall"]); >Exterior Wall</button> area: ' + NUM.surfacesExteriorWallArea.toLocaleString() + '<br>' +
			'Openings: ' + NUM.openings.length + '<br>' +
			'<button onclick=NUM.openingMeshes.visible=!NUM.openingMeshes.visible >Openings Toggle</button> area: ' + NUM.openingsArea.toLocaleString() + '<br>' +

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
		let oriented = { n: [], ne: [], e: [], se: [], s: [], sw: [], w: [], nw: []};

		for ( surface of surfaces ) {
			//console.log( 'undergroundWall', undergroundWall.PlanarGeometry.PolyLoop );

			const points = surface.PlanarGeometry.PolyLoop.CartesianPoint.map( CartesianPoint => new THREE.Vector3().fromArray( CartesianPoint.Coordinate ) )
			//console.log( 'points', points );

			const triangle = NUM.getTriangle( points );
			//console.log( 'normal', triangle.normal );

			angle = Math.atan2( triangle.normal.y, triangle.normal.x) * 180 / Math.PI + 180;
			//console.log( 'angle', angle );

			const wall = GBX.surfaceMeshes.children.find( ( element ) => element.userData.data.id === surface.id );

			if ( angle < 22.5 && angle >= 0 || angle > 337.5 && angle < 360 ) {

				wall.material = new THREE.MeshBasicMaterial( { color: 0x00ff00, side: 2 } );
				oriented.e.push( wall );

			} else if ( angle >= 22.5 && angle < 67.5) {

				wall.material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: 2 } );
				oriented.se.push( wall );

			} else if ( angle >= 67.7 && angle < 112.5 ) {

				wall.material = new THREE.MeshBasicMaterial( { color: 0x000000, side: 2 } );
				oriented.s.push( wall );

			} else if ( angle >= 112.5 && angle < 157.5 ) {

				wall.material = new THREE.MeshBasicMaterial( { color: 0x00ffff, side: 2 } );
				oriented.sw.push( wall );

			} else if ( angle >= 157.5 && angle < 202.5 ) {

				wall.material = new THREE.MeshBasicMaterial( { color: 0x0000ff, side: 2 } );
				oriented.w.push( wall );

			} else if ( angle >= 202.5 && angle < 247.5 ) {

				wall.material = new THREE.MeshBasicMaterial( { color: 0xff0000, side: 2 } );
				oriented.nw.push( wall );

			}	else if ( angle >= 247.5 && angle < 292.5 ) {

					wall.material = new THREE.MeshBasicMaterial( { color: 0xffffff, side: 2 } );
					oriented.n.push( wall );

			} else {  // > 292 && < 337.5

				wall.material = new THREE.MeshBasicMaterial( { color: 0xff00ff, side: 2 } );
				oriented.ne.push( wall );

			}

		}


		NUMdivOrientation.innerHTML =

		'<div><b>Orientation</b></div>' +
			'<button style=background-color:white; >North</button> items: ' + oriented.n.length + '<br>' +
			'<button style=background-color:#f0f; >North East</button> items: ' + oriented.ne.length + '<br>' +
			'<button style=background-color:blue; >East</button> items: ' + oriented.e.length + '<br>' +
			'<button style=background-color:#ff0; >South East</button> items: ' + oriented.se.length + '<br>' +
			'<button style=background-color:black;colo:white; >South</button> items: ' + oriented.s.length + '<br>' +
			'<button style=background-color:#0ff; >South West</button> items: ' + oriented.sw.length + '<br>' +
			'<button style=background-color:green; >West</button> items: ' + oriented.w.length + '<br>' +
			'<button style=background-color:#f00; >North West</button> items: ' + oriented.nw.length + '<br>' +
			'Colors a bit messed up. No areas yet. All to be fixed'
			'<hr>' +
			'Time: ' + ( Date.now() - NUM.timeStart ) + '<br>' +
		''
	}



	NUM.hideOpenings = function() {

		NUM.openingMeshes.visible = false;

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