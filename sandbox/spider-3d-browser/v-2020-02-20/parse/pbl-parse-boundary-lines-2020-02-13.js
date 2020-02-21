
const PBL = {};

PBL.lines = new THREE.Group();

PBL.init = function () {

	PBLdivParseBoundaryLines .innerHTML += PBL.getMenu();

	window.addEventListener( "onloadJson", PBL.processJson, false );

};


PBL.getMenu = function () {

	const htm = `
<details>

	<summary class=sumMenuSecondary >
		Boundary lines details

		<span class="couponcode">??<span class="coupontooltip">
			<p>Boundary lines are the black lines drawn around the faces
			<p>Boundary lines are created from the data derived from a search on the text data file for "boundary" and "floor_boundary"
		</span></span>

	</summary>

	<div id=PBLdivBoundaryStats ></div>

	<div id=PBLdivBoundaryFloorStats ></div>

</details>`;

	return htm;

};


PBL.processJson = function () {

	THR.scene.remove( PBL.lines );

	PBL.lines = new THREE.Group();

	THR.scene.add( PBL.lines );


	PBL.parseBoundary();

	PBL.parseBoundaryFloor()
};



PBL.parseBoundary = function () {

	const v = arr => new THREE.Vector3().fromArray( arr );

	//let matches = GFO.response.match( /"boundary"([^]*?)\}/gm );

	let matches = FOH.text.match( /"boundary"([^]*?)\}/gm );

	//matches = matches.map( item => item.replace( /\r\n|\r|\n/g, "" ) );
	//matches = matches.map( item => item.replace( / /g, "" ) );

	if ( matches ) {

		matches = matches.map( item => JSON.parse( item.slice( 11, -1 ) ) );
		//console.log( 'matches', matches );

		const verticesArr = matches.map( arr => arr.map( points => v( points ) ) );
		verticesArr.forEach( arr => arr.push( arr[ 0 ] ) );
		//console.log( 'verticesClosed', verticesClosed );

		for ( let vertices of verticesArr ) {

			const geometry = new THREE.Geometry();
			geometry.vertices = vertices;
			const material = new THREE.LineBasicMaterial( { color: 0x000000 } );
			const line = new THREE.Line( geometry, material );

			PBL.lines.add( line );

		}

		PBLdivBoundaryStats.innerHTML = `
<p>
Boundary lines: ${ matches.length }
</p>`;

	} else {

		PBLdivBoundaryStats.innerHTML = `
<p>
Boundary lines: 0
</p>`;

	}

};




PBL.parseBoundaryFloor = function () {


	//let matches = GFO.response.match( /"floor_boundary"([^]*?)\}/gm );

	let matches = FOH.text.match( /"boundary"([^]*?)\}/gm );

	if ( matches ) {

		matches = matches.map( item => item.replace( /\r\n|\r|\n/g, "" ) );
		matches = matches.map( item => item.replace( / /g, "" ) );
		//console.log( 'matches', matches );

		let points = matches.map( item => item.slice( 17, 2 + item.indexOf( "]]" ) ) );
		//console.log( 'matches boundary floor ', matches );

		const heights = matches.map( item => item.match( /"floor_height":(.*?),/ )[ 1 ] );
		//console.log( 'heights', heights );

		points = points.map( item => JSON.parse( item ) );
		//console.log( 'points', points );

		const verticesArr = points.map( ( points, i ) => points.map( point => new THREE.Vector3( point[ 0 ], point[ 1 ], heights[ i ] ) ) );

		verticesArr.forEach( arr => arr.push( arr[ 0 ] ) );
		//console.log( 'verticesClosed', verticesClosed );

		for ( let vertices of verticesArr ) {

			const geometry = new THREE.Geometry();
			geometry.vertices = vertices;
			const material = new THREE.LineBasicMaterial( { color: 0x000000 } );
			const line = new THREE.Line( geometry, material );

			PBL.lines.add( line );

		}

		PBLdivBoundaryFloorStats.innerHTML = `
<p>
Boundary floor lines: ${ matches.length }
</p>`;

	} else {

		PBLdivBoundaryFloorStats.innerHTML = `
<p>
Boundary floor lines: 0
</p>`;

	}

};

PBL.init();