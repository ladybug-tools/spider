/* Copyright 2017 Ladybug Tools authors. MIT License */


// You are probably better at doing this sort of stuff than I am. ;-)

	const zonesPerShapes = [ 5, 7, 13, 9 ];


	function initSpaceLayoutInputFields() {

		inpFloorStart.min = 1;
		inpFloorStart.max = theBuilding.storeys;
		inpFloorStart.value = 1;

		inpFloorEnd.min = 1;
		inpFloorEnd.max = theBuilding.storeys;
		inpFloorEnd.value = theBuilding.storeys;

	}



	function onShapeChangeUpdateLayout(){

		imgShape.src = '../images/' + selShape.value;

		inpFloorStart.max = theBuilding.storeys;
		inpFloorEnd.max = theBuilding.storeys;


		const options = addSpaceTypeOptions();
		const zonesInShape = zonesPerShapes[ selShape.selectedIndex ];
		let txt = '';

		for ( let i = 0; i < zonesInShape; i++ ) {

			txt += '<p>Zone: ' + ( i + 1 ) + ' <select id=inpZone' + i + ' onchange=updateZones(); >' + options + '</select></p>';

		}

		divZones.innerHTML = txt;

		theBuilding.floorZones = [];

		for ( let i = 0; i < theBuilding.storeys; i++ ) {

			const zones = [];

			for ( let j = 0; j < zonesInShape[ selShape.selectedIndex ]; j++ ) {

				zone = document.getElementById( 'inpZone' + j );
				zones.push( zone.value );

			}

			theBuilding.floorZones.push( zones );

		}

//console.log( 'theBuilding', theBuilding );

		updateZones();

	}



	function updateTypes() {

		const zonesInShape = zonesPerShapes[ selShape.selectedIndex ];

		for ( var i = 0; i < zonesInShape; i++ ) {

//			zone = document.getElementById( 'inpZone' + i );
//			zone.selectedIndex = 0;

		}

	}



	function addSpaceTypeOptions() {

		const optionTypes = [
			'Office-Open Office',
			'Office-Private Office',
			'Office-Storage',
			'Office-Conference',
			'Hospital-Lab',
			'Hospital-Private Office',
			'Hospital-Open Office',
			'Hospital-Storage',
			'Hospital-Conference',
			'Retail-Retail',
			'Retail-Storage'
		];

		let options = '';

		for ( let option of optionTypes ) {

			options += '<option>' + option + '</option>';

		}

		return options;

	}



	function updateZones() {

		const zonesInShape = zonesPerShapes[ selShape.selectedIndex ];
		const zones = zonesInShape * theBuilding.storeys;

		for ( let i = inpFloorStart.value - 1; i <= inpFloorEnd.value - 1; i++ ) {

			const floor = theBuilding.floorZones[ i ];

			for ( let j = 0; j < zonesInShape; j++ ) {

				const zone = document.getElementById( 'inpZone' + j );
				floor[ j ] = zone.value;

			}

		}

//console.log( 'theBuilding.floorZones', theBuilding.floorZones );

		const types = [];
		const counts = [];

		for ( let i = 0; i < theBuilding.storeys; i++ ) {

			const floor = theBuilding.floorZones[ i ];

			for ( let j = 0; j < zonesInShape; j++ ) {

				const zone = floor[ j ];

				if ( !types.includes( zone ) ) {

					types.push( zone );
					counts.push( 0 );

				};

				counts[ types.indexOf( zone ) ] ++;

			}

		}

//console.log( 'types', types );
//console.log( 'counts', counts );

		let txt = '';

		for ( var i = 0; i < types.length; i++ ) {

			txt += '<tr><td>' + types[ i ] + '</td><td>' + ( 100 * counts[ i ] / zones ).toFixed() + '%</td></tr>';

		}

		tabUsage.innerHTML = txt;

	}

