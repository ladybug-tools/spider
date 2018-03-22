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

					<div id = "NUMdivNumbersWallExterior" ></div>

					<hr>

				</details>

			` + divMenuItems.innerHTML;

			//initMenuNumbers();
			NUM.timeStart = Date.now();

			NUM.getSurfacesExteriorWall();

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




	NUM.getSurfacesExteriorWall = function() {

		NUM.surfacesExteriorWall = GBX.surfaceJson.filter( element => element.surfaceType === 'ExteriorWall' );
		//console.log( 'NUM.surfacesExteriorWall', NUM.surfacesExteriorWall );
		NUM.surfacesExteriorWallArea = NUM.getSurfacesArea( NUM.surfacesExteriorWall );

		/*
		NUM.surfacesExteriorWallArea = 0;

		for ( surface of NUM.surfacesExteriorWall ) {
			//console.log( 'surface', surface.PlanarGeometry.PolyLoop );

			const points = surface.PlanarGeometry.PolyLoop.CartesianPoint.map( CartesianPoint => new THREE.Vector3().fromArray( CartesianPoint.Coordinate ) )
			//console.log( 'points', points );

			const triangle = NUM.getTriangle( points );
			//console.log( 'triangle', triangle.normal() );

			const obj = new THREE.Object3D();
			obj.lookAt( triangle.normal() );  // copy the rotation of the triangle
			obj.quaternion.conjugate();
			obj.updateMatrixWorld();

			points.map( point => obj.localToWorld( point ) );
			//console.log( 'points', points );

			NUM.surfacesExteriorWallArea += THREE.ShapeUtils.area( points );
			//console.log( 'area', THREE.ShapeUtils.area( points ) );

		}

		*/

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
		/*
		NUM.openingsArea = 0;

		for ( opening of NUM.openings ) {
			//console.log( 'opening', opening.PlanarGeometry.PolyLoop );

			const points = opening.PlanarGeometry.PolyLoop.CartesianPoint.map( CartesianPoint => new THREE.Vector3().fromArray( CartesianPoint.Coordinate ) )
			//console.log( 'points', points );

			const triangle = NUM.getTriangle( points );
			//console.log( 'triangle', triangle.normal() );

			const obj = new THREE.Object3D();
			obj.lookAt( triangle.normal() );  // copy the rotation of the triangle
			obj.quaternion.conjugate();
			obj.updateMatrixWorld();

			points.map( point => obj.localToWorld( point ) );
			//console.log( 'points', points );

			NUM.openingsArea += THREE.ShapeUtils.area( points );
			//console.log( 'area', THREE.ShapeUtils.area( points ) );

		}
		*/

		NUM.openingsArea = NUM.getSurfacesArea( NUM.openings );

		NUM.surfacesUndergroundWalls = GBX.surfaceJson.filter( element => element.surfaceType === 'UndergroundWall' );
		NUM.undergroundWallArea = NUM.getSurfacesArea( NUM.surfacesUndergroundWalls );

		/*
		for ( undergroundWall of NUM.surfacesUndergroundWalls ) {
			//console.log( 'undergroundWall', undergroundWall.PlanarGeometry.PolyLoop );

			const points = undergroundWall.PlanarGeometry.PolyLoop.CartesianPoint.map( CartesianPoint => new THREE.Vector3().fromArray( CartesianPoint.Coordinate ) )
			//console.log( 'points', points );

			const triangle = NUM.getTriangle( points );
			//console.log( 'triangle', triangle.normal() );

			const obj = new THREE.Object3D();
			obj.lookAt( triangle.normal() );  // copy the rotation of the triangle
			obj.quaternion.conjugate();
			obj.updateMatrixWorld();

			points.map( point => obj.localToWorld( point ) );
			//console.log( 'points', points );

			NUM.undergroundWallArea += THREE.ShapeUtils.area( points );
			//console.log( 'area', THREE.ShapeUtils.area( points ) );

		}

		*/

		NUM.setDisplay();

	}


	NUM.getSurfacesArea = function( surfaces ) {

		let area = 0;

		for ( surface of surfaces ) {
			//console.log( 'undergroundWall', undergroundWall.PlanarGeometry.PolyLoop );

			const points = surface.PlanarGeometry.PolyLoop.CartesianPoint.map( CartesianPoint => new THREE.Vector3().fromArray( CartesianPoint.Coordinate ) )
			//console.log( 'points', points );

			const triangle = NUM.getTriangle( points );
			//console.log( 'triangle', triangle.normal() );

			const obj = new THREE.Object3D();
			obj.lookAt( triangle.normal() );  // copy the rotation of the triangle
			obj.quaternion.conjugate();
			obj.updateMatrixWorld();

			points.map( point => obj.localToWorld( point ) );
			//console.log( 'points', points );

			area += THREE.ShapeUtils.area( points );
			//console.log( 'area', THREE.ShapeUtils.area( points ) );

		}

		return area;

	}




	NUM.getTriangle = function( points, start = 0 ) {

		//if ( start + 2 >= points.length ) { divLog.innerHTML = 'no more points'; return; }

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
			colinearTest( points, start );

		} else {

			return triangle;

		}

	}


	NUM.setDisplay = function() {

		const wwr = 100 * NUM.openingsArea / NUM.surfacesExteriorWallArea;


		NUMdivNumbersWallExterior.innerHTML =

			'Number of Storeys: ' + GBX.gbjson.Campus.Building.BuildingStorey.length + '<br>' +
			'Exterior Wall Surfaces: ' + NUM.surfacesExteriorWall.length + '<br>' +
			'Exterior Wall Surfaces with Openings: ' + NUM.SurfacesWithOpenings.length + '<br>' +
			'Exterior Wall Area: ' + NUM.surfacesExteriorWallArea.toLocaleString() + '<br>' +

			'Underground Wall Area: ' + NUM.undergroundWallArea.toLocaleString() + '<br>' +

			'Openings: ' + NUM.openings.length + '<br>' +
			'Openings area: ' + NUM.openingsArea.toLocaleString() + '<br>' +

			'Window to Wall Ratio: ' + wwr.toLocaleString() + '%<br>' +

			'Time: ' + ( Date.now() - NUM.timeStart ) + '<br>' +
		'';

	}


	NUM.initNumbers();