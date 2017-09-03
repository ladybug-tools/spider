

	let temple = new THREE.Object3D(); // so animate has something to rotate from the get-go

	let material = new THREE.MeshPhongMaterial( { color: 0xff4444 } );

	let defaultTempleWidth = 64;
	let defaultTempleDepth = 64;
	let defaultTimberWidth = 0.5;
	let defaultTimberHeight = 1;

	const rowsTop = 20;
	const rowsWall = 12;
	let base = 40;
	let timberWidth;
	let timberHeight;
	let wallLength;
	let templeDepth;


	function drawTemple( defaultTempleWidth, defaultTempleDepth, defaultTimberWidth, defaultTimberHeight ) {

		wallLength = defaultTempleWidth;
		templeDepth = defaultTempleDepth;
		timberWidth = defaultTimberWidth;
		timberHeight = defaultTimberHeight;

		wallTop = rowsWall * timberHeight * 2;
		base = wallTop + 2 * 5 * timberHeight;

		if ( temple ) {

			scene.remove( temple );

			if ( temple.geometry ) { 

				temple.geometry.remove();
				temple.material.remove();
				temple.texture.remove();

			}

		}

		temple = new THREE.Object3D();

		drawTop();

		drawTallColumns();

		drawHighBeams();

		drawShortColumns();

		drawWalls();

		drawMiddle();

		temple.scale.set( 0.3, 0.3, 0.3 );
		temple.position.set( 50, 24, 50 );
		temple.name = 'temple';

		scene.add( temple );

		return temple;

	}



	function drawTop() {

		let geometry, beam, b;

		const length = 60;
		const lengthDelta = 1.5;
		const offset = 8;
		const offsetDelta = 0.05;

		geometry = new THREE.BoxGeometry( 1, 1, 1 );
		beam = new THREE.Mesh( geometry, material );
		beam.receiveShadow = true;
		beam.castShadow = true;

		for ( let i = 0; i < rowsTop; i++ ) {

			b = beam.clone();
			b.scale.set( timberWidth, timberHeight, length - 10 * Math.log( lengthDelta * i ) );
			b.position.set( offset - 5 * Math.log( offsetDelta * i ), i * 2 * timberHeight + base, 0 );
			temple.add( b );

			b = beam.clone();
			b.scale.set( timberWidth, timberHeight, length - 10 * Math.log( lengthDelta * i ) );
			b.position.set( - offset + 5 * Math.log( offsetDelta * i ), i * 2 * timberHeight + base, 0 );
			temple.add( b );

			b = beam.clone();
			b.scale.set( length - 10 * Math.log( lengthDelta * i ), timberHeight, timberWidth );
			b.position.set( 0, i * 2 * timberHeight + timberHeight + base, offset - 5 * Math.log( offsetDelta * i ) );
			temple.add( b );

			b = beam.clone();
			b.scale.set( length - 10 * Math.log( lengthDelta * i ) , timberHeight, timberWidth );
			b.position.set( 0, i * 2 * timberHeight + timberHeight + base, - offset + 5 * Math.log( offsetDelta * i ) );
			temple.add( b );

		}

	}



	function drawTallColumns() {

		let col;
		const height = base + 5 + 2 * rowsTop * timberHeight ;

		col = drawColumnGroup( height );
		col.position.set( 8, 0, 8 );
		temple.add( col );

		col = drawColumnGroup( height );
		col.position.set( 8, 0, -8 );
		temple.add( col );

		col = drawColumnGroup( height );
		col.position.set( -8, 0, 8 );
		temple.add( col );

		col = drawColumnGroup( height );
		col.position.set( -8, 0, -8 );
		temple.add( col );

	}



	function drawHighBeams() {

		let geometry, beam, a, b, c, d;
		const length = 56;
		const lengthDelta = 1.5;
		const offset = 8;
		const offsetDelta = 0.05;
//		const rows = 20;
//		const base = 40;

		geometry = new THREE.BoxGeometry( 1, 1, 1 );
		beam = new THREE.Mesh( geometry, material );
		beam.receiveShadow = true;
		beam.castShadow = true;

		for ( var i = 0; i < rowsTop; i++ ) {

			a = beam.clone();
			a.scale.set( timberWidth, timberHeight, length - 10 * Math.log( lengthDelta * i ) );
			a.position.set( offset, i * 2 * timberHeight + base, 0 );
			temple.add( a );

			b = beam.clone();
			b.scale.set( timberWidth, timberHeight, length - 10 * Math.log( lengthDelta * i ) );
			b.position.set( - offset, i * 2 * timberHeight + base, 0 );
			temple.add( b );

			c = beam.clone();
			c.scale.set( length - 10 * Math.log( lengthDelta * i ), timberHeight, timberWidth );
			c.position.set( 0, i * 2 * timberHeight + timberHeight + base, offset );
			temple.add( c );

			d = beam.clone();
			d.scale.set( length - 10 * Math.log( lengthDelta * i ) , timberHeight, timberWidth );
			d.position.set( 0, i * 2 * timberHeight + timberHeight + base, - offset );
			temple.add( d );

		}

	}



	function drawWalls() {

		let wall;

		wall = drawWall();
		wall.position.set( 15, 0, 15 );
		temple.add( wall );

		wall = wall.clone();
		wall.position.set( -15, 0, 15 );
		temple.add( wall );

		wall = wall.clone();
		wall.rotation.y = Math.PI;
		wall.position.set( 15, 0, -15 );
		temple.add( wall );

		wall = wall.clone();
		wall.position.set( -15, 0, -15 );
		temple.add( wall );

		wall = wall.clone();
		wall.rotation.y = 0.5 * Math.PI;
		wall.position.set( 15, 1, 15 );
		temple.add( wall );

		wall = wall.clone();
		wall.position.set( 15, 1, -15 );
		temple.add( wall );

		wall = wall.clone();
		wall.rotation.y = -0.5 * Math.PI;
		wall.position.set( -15, 1, 15 );
		temple.add( wall );

		wall = wall.clone();
		wall.position.set( -15, 1, -15 );
		temple.add( wall );

	}



	function drawWall( lenX = 10, lenZ = 1, deltaX = 1.5, deltaZ = 0, offsetX = 0, offsetZ = 1 ) {

		let geometry, beam, b;
		let beamGroup;
		const rowsWall = 12;

		geometry = new THREE.BoxGeometry( 1, 1, 0.5 );
		beam = new THREE.Mesh( geometry, material );
		beam.receiveShadow = true;
		beam.castShadow = true;

		beamGroup = new THREE.Object3D();

		for ( var i = 0; i < rowsWall; i++ ) {

			b = beam.clone();
			b.scale.set( lenX + i * deltaX, timberHeight, lenZ + i * deltaZ );
			b.position.set( i * offsetX, i * 2 * timberHeight, i * offsetZ );
			beamGroup.add( b );

		}

		return beamGroup;

	}



	function drawShortColumns() {

		let col;
		const height = base;
		let delta = wallLength / 5;
		let deltaZ = templeDepth / 4;
		var offsetX = wallLength - delta;
		col = drawColumnGroup( height );
		var beams = drawLowBeams();

		col.add( beams );
		col.position.set( offsetX, 0, 8 );
		temple.add( col );

		col = col.clone();
		col.position.set( offsetX, 0, -8 );
		temple.add( col );


		col = col.clone();
		col.position.set( -offsetX, 0, 8 );
		temple.add( col );

		col = col.clone();
		col.position.set( -offsetX, 0, -8 );
		temple.add( col );


		col = col.clone();
		col.position.set( 8, 0, templeDepth - deltaZ );
		temple.add( col );

		col = col.clone();
		col.position.set( -8, 0, templeDepth - deltaZ );
		temple.add( col );

		col = col.clone();
		col.position.set( 8, 0, templeDepth );
		temple.add( col );

		col = col.clone();
		col.position.set( -8, 0, templeDepth );
		temple.add( col );


		col = col.clone(); // drawColumnGroup( height );
		col.position.set( 8, 0, -templeDepth + deltaZ );
		temple.add( col );

		col = col.clone(); // drawColumnGroup( height );
		col.position.set( -8, 0, -templeDepth + deltaZ );
		temple.add( col );

		col = col.clone(); // drawColumnGroup( height );
		col.position.set( 8, 0, - templeDepth );
		temple.add( col );

		col = col.clone();
		col.position.set( -8, 0, - templeDepth);
		temple.add( col );

	}



	function drawLowBeams() {

		let geometry, beam, b, beamGroup;

//		geometry = new THREE.BoxGeometry( 1, 1, 1 );
//		beam = new THREE.Mesh( geometry, material );

		const offsetLow = 3;
		const lengthLow = 2 * offsetLow;

		const offsetHigh = 5;
		const lengthHigh = 2 * offsetHigh;

		let height = 5;
		beamGroup = new THREE.Object3D();

		drawBeamRow( 1, 0, 0, 5, height++ * timberHeight, timberWidth, beamGroup );
		drawBeamRow( 1, 0, 0, timberWidth, height++ * timberHeight, 6, beamGroup );
		drawBeamRow( 1, 0, 0, 7, height++ * timberHeight, timberWidth, beamGroup );


		drawBeamRow( 3, offsetLow, 0, timberWidth, height++ * timberHeight, lengthLow, beamGroup );
		drawBeamRow( 3, 0, offsetLow, lengthLow, height++ * timberHeight, timberWidth, beamGroup );

		drawBeamRow( 3, offsetLow, 0, timberWidth, height++ * timberHeight, lengthLow + 1, beamGroup );
		drawBeamRow( 3, 0, offsetLow, lengthLow + 1, height++ * timberHeight, timberWidth, beamGroup );

		drawBeamRow( 3, offsetLow, 0, timberWidth, height++ * timberHeight, lengthLow + 2, beamGroup );
		drawBeamRow( 3, 0, offsetLow, lengthLow + 2, height++ * timberHeight, timberWidth, beamGroup );

		drawBeamRow( 3, offsetLow, 0, timberWidth, height++ * timberHeight, lengthLow + 3, beamGroup );
		drawBeamRow( 3, 0, offsetLow, lengthLow + 3, height++ * timberHeight, timberWidth, beamGroup );


		drawBeamRow( 3, offsetHigh, 0, timberWidth, height++ * timberHeight, lengthHigh + 1, beamGroup );
		drawBeamRow( 3, 0, offsetHigh, lengthHigh + 1, height++ * timberHeight, timberWidth, beamGroup );

		drawBeamRow( 3, offsetHigh, 0, timberWidth, height++ * timberHeight, lengthHigh + 2, beamGroup );
		drawBeamRow( 3, 0, offsetHigh, lengthHigh + 2, height++ * timberHeight, timberWidth, beamGroup );

		drawBeamRow( 3, offsetHigh, 0, timberWidth, height++ * timberHeight, lengthHigh + 3, beamGroup );
		drawBeamRow( 3, 0, offsetHigh, lengthHigh + 3, height++ * timberHeight, timberWidth, beamGroup );

		drawBeamRow( 3, offsetHigh, 0, timberWidth, height++ * timberHeight, lengthHigh + 4, beamGroup );
		drawBeamRow( 3, 0, offsetHigh, lengthHigh + 4, height++ * timberHeight, timberWidth, beamGroup );

//		drawBeamRow( 5, offsetHigh, 0, timberWidth height++ * timberHeight, lengthHigh + 5, beamGroup );
//		drawBeamRow( 5, 0, offsetHigh, lengthHigh + 5, height++ * timberHeight, timberWidth beamGroup );


		return beamGroup;

	}



	function drawMiddle() {

		let beamGroup = new THREE.Object3D();
		let delta = wallLength / 5;
		for ( var i = 0; i < 5; i++ ) {

			var beamRow = new THREE.Object3D();
			drawBeamRow( 4, delta, 0, timberWidth, 0, wallLength  - delta + i * 3, beamRow );
			beamRow.position.set( 3 * delta, wallTop + i * 2 * timberHeight, 0 );
			beamGroup.add( beamRow );

		}

		for ( i = 0; i < 5; i++ ) {

			var beamRow = new THREE.Object3D();
			drawBeamRow( 4, 0, delta, wallLength - delta + i * 3, timberHeight, timberWidth, beamRow );
			beamRow.position.set( 2.5 * delta, wallTop + i * 2 * timberHeight, 8 );
			beamGroup.add( beamRow );

		}

		temple.add( beamGroup );

		beamGroup = beamGroup.clone();
		beamGroup.position.set( - wallLength, 0, 0 );
		temple.add( beamGroup );

	}


// groups

	function drawColumnGroup( height = 80 ) {

		let geometry, column, columnGroup, a;

		geometry = new THREE.BoxGeometry( 1, 1, 1 );
		column = new THREE.Mesh( geometry, material );

		column.receiveShadow = true;
		column.castShadow = true;

		columnGroup = new THREE.Object3D();

		a = column.clone();
		a.scale.set( 1, height, 1 );
		a.position.set( 1, 0.5 * height, 1 );
		columnGroup.add( a );

		a = column.clone();
		a.scale.set( 1, height, 1 );
		a.position.set( 1, 0.5 * height, -timberWidth );
		columnGroup.add( a );

		a = column.clone();
		a.scale.set( 1, height, 1 );
		a.position.set( -1, 0.5 * height, -timberWidth );
		columnGroup.add( a );

		a = column.clone();
		a.scale.set( 1, height, 1 );
		a.position.set( -1, 0.5 * height, 1 );
		columnGroup.add( a );

		return columnGroup;

	}



	function drawBeamRow( beamCount = 3, deltaX = 0, deltaZ = 0, x = 1, y = 1, z = 1, obj ) {

		let geometry, beam, b, beamGroup;
		let offsetX = Math.floor( 0.5 * beamCount ) * deltaX;
		let offsetZ = Math.floor( 0.5 * beamCount ) * deltaZ;
		geometry = new THREE.BoxGeometry( 1, 1, 1 );
		beam = new THREE.Mesh( geometry, material );
		beam.receiveShadow = true;
		beam.castShadow = true;

		for ( var i = 0; i < beamCount; i++ ) {

			b = beam.clone();
			b.scale.set( x, 1, z );
			b.position.set( - offsetX + i * deltaX, y, - offsetZ + i * deltaZ );
			obj.add( b );

		}

	}

