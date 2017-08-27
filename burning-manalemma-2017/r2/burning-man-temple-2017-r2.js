

	let timberWidth = 0.5;
	let timberHeight = 1;

	let material = new THREE.MeshPhongMaterial( { color: 0xff4444 } );
	let bm = new THREE.Object3D();

	function drawManalemma() {

		drawTop();
		drawTallColumns();
		drawHighBeams();

		drawShortColumns();
//		drawLowBeams();

		drawWalls();

		drawMiddle();

		return bm;
}



	function drawTop() {

		let geometry, beam, b;

		const length = 60;
		const lengthDelta = 1.5;
		const offset = 8;
		const offsetDelta = 0.05;
		const rows = 20;
		const base = 40;

		geometry = new THREE.BoxGeometry( 1, 1, 1 );
		beam = new THREE.Mesh( geometry, material );
		beam.receiveShadow = true;
		beam.castShadow = true;

		for ( let i = 0; i < rows; i++ ) {

			b = beam.clone();
			b.scale.set( timberWidth, timberHeight, length - 10 * Math.log( lengthDelta * i ) );
			b.position.set( offset - 5 * Math.log( offsetDelta * i ), i * 2 * timberHeight + base, 0 );
			bm.add( b );

			b = beam.clone();
			b.scale.set( timberWidth, timberHeight, length - 10 * Math.log( lengthDelta * i ) );
			b.position.set( - offset + 5 * Math.log( offsetDelta * i ), i * 2 * timberHeight + base, 0 );
			bm.add( b );

			b = beam.clone();
			b.scale.set( length - 10 * Math.log( lengthDelta * i ), timberHeight, timberWidth );
			b.position.set( 0, i * 2 * timberHeight + timberHeight + base, offset - 5 * Math.log( offsetDelta * i ) );
			bm.add( b );

			b = beam.clone();
			b.scale.set( length - 10 * Math.log( lengthDelta * i ) , timberHeight, timberWidth );
			b.position.set( 0, i * 2 * timberHeight + timberHeight + base, - offset + 5 * Math.log( offsetDelta * i ) );
			bm.add( b );

		}

	}



	function drawTallColumns() {

		let col;
		const height = 80;

		col = drawColumnGroup( height );
		col.position.set( 8, 0, 8 );
		bm.add( col );

		col = drawColumnGroup( height );
		col.position.set( 8, 0, -8 );
		bm.add( col );

		col = drawColumnGroup( height );
		col.position.set( -8, 0, 8 );
		bm.add( col );

		col = drawColumnGroup( height);
		col.position.set( -8, 0, -8 );
		bm.add( col );

	}



	function drawHighBeams() {

		let geometry, beam;
		const length = 56;
		const lengthDelta = 1.5;
		const offset = 8;
		const offsetDelta = 0.05;
		const rows = 20;
		const base = 40;

		geometry = new THREE.BoxGeometry( 1, 1, 1 );
		beam = new THREE.Mesh( geometry, material );
		beam.receiveShadow = true;
		beam.castShadow = true;

		for ( var i = 0; i < rows; i++ ) {

			a = beam.clone();
			a.scale.set( timberWidth, timberHeight, length - 10 * Math.log( lengthDelta * i ) );
			a.position.set( offset, i * 2 * timberHeight + base, 0 );
			bm.add( a );

			b = beam.clone();
			b.scale.set( timberWidth, timberHeight, length - 10 * Math.log( lengthDelta * i ) );
			b.position.set( - offset, i * 2 * timberHeight + base, 0 );
			bm.add( b );

			c = beam.clone();
			c.scale.set( length - 10 * Math.log( lengthDelta * i ), timberHeight, timberWidth );
			c.position.set( 0, i * 2 * timberHeight + timberHeight + base, offset );
			bm.add( c );

			d = beam.clone();
			d.scale.set( length - 10 * Math.log( lengthDelta * i ) , timberHeight, timberWidth );
			d.position.set( 0, i * 2 * timberHeight + timberHeight + base, - offset );
			bm.add( d );

		}

	}



	function drawWalls() {

		let wall;

		wall = drawWall();
		wall.position.set( 15, 0, 15 );
		bm.add( wall );

		wall = wall.clone();
		wall.position.set( -15, 0, 15 );
		bm.add( wall );

		wall = wall.clone();
		wall.rotation.y = Math.PI;
		wall.position.set( 15, 0, -15 );
		bm.add( wall );

		wall = wall.clone();
		wall.position.set( -15, 0, -15 );
		bm.add( wall );

		wall = wall.clone();
		wall.rotation.y = 0.5 * Math.PI;
		wall.position.set( 15, 1, 15 );
		bm.add( wall );

		wall = wall.clone();
		wall.position.set( 15, 1, -15 );
		bm.add( wall );

		wall = wall.clone();
		wall.rotation.y = -0.5 * Math.PI;
		wall.position.set( -15, 1, 15 );
		bm.add( wall );

		wall = wall.clone();
		wall.position.set( -15, 1, -15 );
		bm.add( wall );

	}


	function drawWall( lenX = 10, lenZ = 1, deltaX = 1.5, deltaZ = 0, offsetX = 0, offsetZ = 1 ) {

		let geometry, beam, b;
		const rows = 12;

		geometry = new THREE.BoxGeometry( 1, 1, 0.5 );
		beam = new THREE.Mesh( geometry, material );
		beam.receiveShadow = true;
		beam.castShadow = true;

		beamGroup = new THREE.Object3D();

		for ( var i = 0; i < rows; i++ ) {

			b = beam.clone()
			b.scale.set( lenX + i * deltaX, timberHeight, lenZ + i * deltaZ );
			b.position.set( i * offsetX, i * 2 * timberHeight, i * offsetZ );
			beamGroup.add( b );

		}

		return beamGroup;

	}


	function drawShortColumns() {

		let col;
		const height = 40;
		offsetX = 50
		col = drawColumnGroup( height );
		beams = drawLowBeams();

		col.add( beams );
		col.position.set( offsetX, 0, 8 );
		bm.add( col );

		col = col.clone();
		col.position.set( offsetX, 0, -8 );
		bm.add( col );


		col = col.clone();
		col.position.set( -offsetX, 0, 8 );
		bm.add( col );

		col = col.clone();
		col.position.set( -offsetX, 0, -8 );
		bm.add( col );


		col = col.clone();;
		col.position.set( 8, 0, 40 );
		bm.add( col );

		col = col.clone();
		col.position.set( -8, 0, 40 );
		bm.add( col );

		col = col.clone();
		col.position.set( 8, 0, 56 );
		bm.add( col );

		col = col.clone();
		col.position.set( -8, 0, 56 );
		bm.add( col );


		col = col.clone(); // drawColumnGroup( height );
		col.position.set( 8, 0, -40 );
		bm.add( col );

		col = col.clone(); // drawColumnGroup( height );
		col.position.set( -8, 0, -40 );
		bm.add( col );

		col = col.clone(); // drawColumnGroup( height );
		col.position.set( 8, 0, -56 );
		bm.add( col );

		col = col.clone();
		col.position.set( -8, 0, -56 );
		bm.add( col );

	}



	function drawLowBeams() {

		let geometry, beam, b, beamGroup;

//		geometry = new THREE.BoxGeometry( 1, 1, 1 );
//		beam = new THREE.Mesh( geometry, material );

		offsetLow = 3;
		lengthLow = 2 * offsetLow;

		offsetHigh = 5;
		lengthHigh = 2 * offsetHigh;

		height = 5;
		beamGroup = new THREE.Object3D();

		drawBeamRow( 1, 0, 0, 5, height++, timberWidth, beamGroup );
		drawBeamRow( 1, 0, 0, timberWidth, height++, 6, beamGroup );
		drawBeamRow( 1, 0, 0, 7, height++, timberWidth, beamGroup );


		drawBeamRow( 3, offsetLow, 0, timberWidth, height++, lengthLow, beamGroup );
		drawBeamRow( 3, 0, offsetLow, lengthLow, height++, timberWidth, beamGroup );

		drawBeamRow( 3, offsetLow, 0, timberWidth, height++, lengthLow + 1, beamGroup );
		drawBeamRow( 3, 0, offsetLow, lengthLow + 1, height++, timberWidth, beamGroup );

		drawBeamRow( 3, offsetLow, 0, timberWidth, height++, lengthLow + 2, beamGroup );
		drawBeamRow( 3, 0, offsetLow, lengthLow + 2, height++, timberWidth, beamGroup );

		drawBeamRow( 3, offsetLow, 0, timberWidth, height++, lengthLow + 3, beamGroup );
		drawBeamRow( 3, 0, offsetLow, lengthLow + 3, height++, timberWidth, beamGroup );


		drawBeamRow( 3, offsetHigh, 0, timberWidth, height++, lengthHigh + 1, beamGroup );
		drawBeamRow( 3, 0, offsetHigh, lengthHigh + 1, height++, timberWidth, beamGroup );

		drawBeamRow( 3, offsetHigh, 0, timberWidth, height++, lengthHigh + 2, beamGroup );
		drawBeamRow( 3, 0, offsetHigh, lengthHigh + 2, height++, timberWidth, beamGroup );

		drawBeamRow( 3, offsetHigh, 0, timberWidth, height++, lengthHigh + 3, beamGroup );
		drawBeamRow( 3, 0, offsetHigh, lengthHigh + 3, height++, timberWidth, beamGroup );

		drawBeamRow( 3, offsetHigh, 0, timberWidth, height++, lengthHigh + 4, beamGroup );
		drawBeamRow( 3, 0, offsetHigh, lengthHigh + 4, height++, timberWidth, beamGroup );

//		drawBeamRow( 5, offsetHigh, 0, timberWidth height++, lengthHigh + 5, beamGroup );
//		drawBeamRow( 5, 0, offsetHigh, lengthHigh + 5, height++, timberWidth beamGroup );


		return beamGroup;

	}



	function drawMiddle() {

		let beamGroup = new THREE.Object3D();

		for ( var i = 0; i < 5; i++ ) {

			beamRow = new THREE.Object3D();
			drawBeamRow( 4, 16, 0, timberWidth, 0, 48 + i * 3, beamRow );
			beamRow.position.set( 50, 25 + i * 2, 0 );

			beamGroup.add( beamRow );

		}

		for ( var i = 0; i < 5; i++ ) {

			beamRow = new THREE.Object3D();
			drawBeamRow( 4, 0, 16, 64 + i * 3, 1, timberWidth, beamRow );
			beamRow.position.set( 40, 25 + i * 2, 8 );
			beamGroup.add( beamRow );

		}

		bm.add( beamGroup );

		beamGroup = beamGroup.clone();
		beamGroup.position.set( -68, 0, 0 );
		bm.add( beamGroup );

	}


// groups

	function drawColumnGroup( height = 80 ) {

		let geometry, column, columnGroup;

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



	function drawHelpers() {

// 2017-04-02

		let geometry;
		let edgesGeometry, edgesMaterial, edges;

		geometry = new THREE.BoxGeometry( 200, 5, 200 );

		ground = new THREE.Mesh( geometry, material );
		ground.position.set( 0, -10, 0 );

		edgesGeometry = new THREE.EdgesGeometry( geometry ); // or WireframeGeometry
		edgesMaterial = new THREE.LineBasicMaterial( { color: 0x000000 } );
		edges = new THREE.LineSegments( edgesGeometry, edgesMaterial );
		ground.add( edges );

		bm.add( ground );

		axisHelper = new THREE.AxisHelper( 100 );
		bm.add( axisHelper );

		gridHelper = new THREE.GridHelper( 200, 50 );
		gridHelper.position.set( 0, -7.5, 0 );
		bm.add( gridHelper );

	}
