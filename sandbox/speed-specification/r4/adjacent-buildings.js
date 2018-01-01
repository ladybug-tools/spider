/* Copyright 2018 Ladybug Tools authors. MIT License */


	const adjacentBuildings = [

		{ type: 'checkbox', name: 'Building' },
		{ type: 'number', name: 'Offset X' },
		{ type: 'number', name: 'Offset Y' },
		{ type: 'number', name: 'Length' },
		{ type: 'number', name: 'Width' },
		{ type: 'number', name: 'Height' },
		{ type: 'number', name: 'Site Orientation' }

	];

	function initAdacentBuildingsInputFields() {

		let text =

			'<table>' +
			'<tr>' +
				'<td></td>' +
				'<td>' + addCheckbox( adjacentBuildings[ 0 ], 1 ) + '</td>' +
				'<td>' + addCheckbox( adjacentBuildings[ 0 ], 2 ) + '</td>' +
				'<td>' + addCheckbox( adjacentBuildings[ 0 ], 3 ) + '</td>' +
				'<td>' + addCheckbox( adjacentBuildings[ 0 ], 4 ) + '</td>' +
			'</tr>';

		for ( let i = 1; i < adjacentBuildings.length; i++ ) {

			line = '<tr><td>' + adjacentBuildings[ i ].name + '</td>';

			for ( let j = 0; j < 4; j++ ) {

				line += '<td>' + addNumber( adjacentBuildings[ i ], ( j + 1 ) ) + '</td>';

			}

			text += line + '</tr>';

		}

		text += '</table>';

		divAdjacentBuildingsTable.innerHTML = text;

	}



	function addCheckbox( item, number ){

		return '<div class=checkbox ><input type="checkbox" onchange="toggleVisibility(' + number + ');" >' + item.name + number + '</div>';

	}
	function addNumber( item, number ){

		return '<input type="number" min=-100 max=100 step=1 value=0 id=inp' + item.name.replace( ' ','') + number + ' onchange=updateBuilding(this); >';

	}

	function addAjacentBuildings() {

		for ( let i = 0; i < 4; i++ ) {

			const mesh = createMesh();
			mesh.name = 'building' + ( i + 1 );
			mesh.scale.set( 20, 20, 30 ); // scale is easier to deal with than geometry vertices
			mesh.position.z = mesh.scale.z * 0.5;
			mesh.visible = false;

			adjacentBuildingsGeometry.group.add(mesh)

		}
		scene.add(adjacentBuildingsGeometry.group);
	}

	function createMesh() {

		const geometry = new THREE.BoxBufferGeometry( 1, 1, 1 ); // use scale to set size
		const material = new THREE.MeshPhongMaterial();
		const mesh = new THREE.Mesh( geometry, material );
		const edgesGeometry = new THREE.EdgesGeometry( geometry );
		const meshEdges = new THREE.LineSegments( edgesGeometry, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
		mesh.add( meshEdges );

		return mesh;

	}



	function toggleVisibility( index ){

		const building = scene.getObjectByName( 'building' + index );

		building.visible = !building.visible;

	}



	function updateBuilding( that ) {
//console.log( 'that', that );

		const building = scene.getObjectByName( 'building' + that.id.slice( -1 ) ); // is slice needed? check this
//console.log( 'building', building, 'id', that.id );

		if ( that.id.startsWith( 'inpOffsetX' ) ) {
//console.log( 'that.value', that.value );

			building.position.x = parseInt( that.value, 10 );

		} else if ( that.id.startsWith( 'inpOffsetY' ) ) {

			building.position.y = parseInt( that.value, 10 );

		} else if ( that.id.startsWith( 'inpSiteOrientation' ) ) {
//console.log( 'inpSiteOrientation', that.value );

			building.rotation.z = parseInt( that.value, 10 ) * - Math.PI / 180;

		} else if ( that.id.startsWith( 'inpLength' ) ) {

			building.scale.x = parseInt( that.value, 10 );

		} else if ( that.id.startsWith( 'inpWidth' ) ) {

			building.scale.y = parseInt( that.value, 10 );

		} else if ( that.id.startsWith( 'inpHeight' ) ) {

			building.scale.z = parseInt( that.value, 10 );
			building.position.z = building.scale.z * 0.5;

		}

		calcGridSize();
	}
