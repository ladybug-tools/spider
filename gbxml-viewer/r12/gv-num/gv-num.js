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

			NUM.getSurfacesExternalWall();

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


	NUM.getSurfacesExternalWall = function() {

		NUM.surfacesExteriorWall = GBX.surfaceJson.filter( element => element.surfaceType === 'ExteriorWall' );
		//console.log( 'NUM.surfacesExteriorWall', NUM.surfacesExteriorWall );

		NUM.SurfacesWithOpenings = NUM.surfacesExteriorWall.filter( surface => surface.Opening );
		//console.log( 'NUM.SurfacesWithOpenings', NUM.SurfacesWithOpenings );

		NUM.openings = [];
		for ( surface of NUM.SurfacesWithOpenings ) {

			if ( surface.Opening.length ) {

				NUM.openings.push ( ...surface.Opening );

			} else {

				NUM.openings.push ( surface.Opening );
			}
			if ( surface.Opening.length ) { console.log( 'surface.Opening.length', surface.Opening.length ); }
		}
		//console.log( 'NUM.openings', NUM.openings );


		for ( opening of NUM.openings ) {
			//console.log( 'opening', opening.PlanarGeometry.PolyLoop );

			points = opening.PlanarGeometry.PolyLoop.CartesianPoint.map( CartesianPoint => new THREE.Vector3().fromArray( CartesianPoint.Coordinate ) )
			//console.log( 'points', points );
			//console.log( 'area', THREE.ShapeUtils.area( points ) );

		}



		NUMdivNumbersWallExterior.innerHTML =

			'Exterior Wall Surfaces: ' + NUM.surfacesExteriorWall.length + '<br>' +
			'Exterior Wall Surfaces with Openings: ' + NUM.SurfacesWithOpenings.length + '<br>' +
			'Openings: ' + NUM.openings.length + '<br>' +
		'';
	}


	NUM.getPoints = function( polyloop ) {

		const points = [];

		for ( let CartesianPoint of polyloop.CartesianPoint ) {

			const point = new THREE.Vector3().fromArray( CartesianPoint.Coordinate );

			points.push( point );

		}

		return points;

	}

	NUM.initNumbers();