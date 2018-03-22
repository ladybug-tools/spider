/*global

THR, THREE, GBX, GBV, window, document,butSettings, detSettings,divMenuItems,rngOpacity,rngViewExplodeVertical

*/

// Copyright 2018 Ladybug Tools authors. MIT License

	var NUM = {};

	NUM.initNumbers = function () {

		if ( window.butMenuLoad ) {

			NUM.butMenuNumbers = butMenuLoad;

			NUM.title = 'gv-NUM - gbXML Viewer Numbers';;
			document.title = NUM.title;
			aDocumentTitle.innerHTML = NUM.title;
			NUM.butMenuNumbers.innerHTML = NUM.title;

		} else {

			NUM.butMenuNumbers = butMenuNumbers;

		}


		if ( NUM.butMenuNumbers.style.backgroundColor !== 'var( --but-bg-color )' ) {

			divMenuItems.innerHTML =

				`<details id = NUMdetNumbers  class=app-menu open>

					<summary>Numbers</summary>

					<div id = "NUMdivStoreys" ></div>
					<div id = "NUMdivSurfaceTypeAreas" ></div>
					<div id = "NUMdivExteriorAreas" ></div>
					<div id = "NUMdivOpenings" ></div>
					<div id = "NUMdivOrientation" ></div>

					<hr>

				</details>

			` + divMenuItems.innerHTML;

			//initMenuNumbers();
			NUM.timeStart = Date.now();

			NUM.getSurfaceTypesData();
			NUM.getOpenings();
			NUM.setDisplay();
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



	NUM.getSurfaceTypesData = function() {

		surfaces = GBX.gbjson.Campus.Surface;

		let txt = '<b>Floor Areas by Surface Type</b><br>';
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
				' <button class=toggle onclick=GBV.showSurfaceType(this.innerText); >' + types[ i ] + '</button> area: ' +
				NUM.getSurfacesArea( types[ i ] ).toLocaleString() +

				'<br>';

		}

		tfa =
			NUM.surfacesInteriorFloorArea +
			NUM.surfacesSlabOnGradeArea +
			NUM.surfacesRaisedFloorArea +
			NUM.surfacesUndergroundSlabArea;

		NUMdivSurfaceTypeAreas.innerHTML =
			txt +
			'<div>Total floor area: ' + tfa.toLocaleString() + '<div>';


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

		for ( opening of NUM.openings ) {
			//console.log( 'opening', opening.PlanarGeometry.PolyLoop );

			const points = opening.PlanarGeometry.PolyLoop.CartesianPoint.map( CartesianPoint => new THREE.Vector3().fromArray( CartesianPoint.Coordinate ) )
			//console.log( 'points', points );

			const triangle = NUM.getTriangle( points );
			//console.log( 'triangle', triangle.normal() );
			if ( !triangle ) { console.log( 'surface error', opening ); continue; };

			const obj = new THREE.Object3D();
			obj.lookAt( triangle.normal() );  // copy the rotation of the triangle
			obj.quaternion.conjugate();
			obj.updateMatrixWorld();

			points.map( point => obj.localToWorld( point ) );
			//console.log( 'points', points );

			NUM.openingsArea += THREE.ShapeUtils.area( points );
			//console.log( 'area', THREE.ShapeUtils.area( points ) );

		}

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
			obj.lookAt( triangle.normal() );  // copy the rotation of the triangle
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




	NUM.getTriangle = function( points, start = 0 ) {

		if ( start + 2 >= points.length ) { divLog.innerHTML = 'no more points'; return; }

		const triangle = new THREE.Triangle();
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

			return triangle;

		}

	}


	NUM.setDisplay = function() {

		const wwr = 100 * NUM.openingsArea / NUM.surfacesExteriorWallArea;

		if ( GBX.gbjson.Campus.Building.BuildingStorey ) {

			NUMdivStoreys.innerHTML =
				'<div><b>Storeys</b><div>' +
				'Number of Storeys: ' + GBX.gbjson.Campus.Building.BuildingStorey.length + '<br>' +
			'';
		}

		tesa =
			NUM.surfacesExteriorWallArea + NUM.surfacesRoofArea;


		NUMdivExteriorAreas.innerHTML =
		'<div><b>Exterior Areas</b><div>' +
			'Exterior surfaces: ' + tesa.toLocaleString() + '<br>' +
		'';

		NUMdivOpenings.innerHTML =

			'<div><b>Openings</b></div>' +
//			'Exterior Wall Surfaces: ' + NUM.surfacesExteriorWall.length + '<br>' +
//			'Exterior Wall Surfaces with Openings: ' + NUM.SurfacesWithOpenings.length + '<br>' +

//			'Underground Wall Area: ' + NUM.undergroundWallArea.toLocaleString() + '<br>' +

			'Exterior Wall Area: ' + NUM.surfacesExteriorWallArea.toLocaleString() + '<br>' +
			'Openings: ' + NUM.openings.length + '<br>' +
			'Openings area: ' + NUM.openingsArea.toLocaleString() + '<br>' +

			'Window to Wall Ratio: ' + wwr.toLocaleString() + '%<br>' +

		'';

		NUMdivOrientation.innerHTML =

		'<div><b>Orientation</b></div>' +
			'Coming soon' +
			'<hr>' +
			'Time: ' + ( Date.now() - NUM.timeStart ) + '<br>' +
		''
	}


	NUM.initNumbers();