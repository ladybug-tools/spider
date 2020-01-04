// copyright 2019 Theo Armour. MIT license.
// 2019-12-17 v0.00
// jshint esversion: 6
// jshint loopfunc: true

const MMC = {};


MMC.getMenu = function() {

	window.addEventListener( "onresetall", MMC.resetHome );

	const htm =
`
<details open>

	<summary>Manifold mesh check</summary>
	<p>Find and identify 'holes' in Three.js objects. Test if an object is 'watertight'.</p>
	<p>
		<button onclick=MMC.addHole(2) >add hole with first vertex in mesh</button>
	</p>
	<p>
		<button onclick=MMC.addHole() >add hole with random vertex</button>
	</p>

	<div id=MMCdivMessageHoles ></div>

	<p>
		<button onclick=MMC.checkEdges(mesh) >check edges </button>
	</p>

	<div id=MMCdivStatsEdges ></div>

	<div id=MMCdivMessageEdges > </div>

</details>

`;

	return htm;

};

MMC.resetHome = function() {

	MMCdivMessageHoles.innerHTML = MMCdivMessageEdges.innerHTML = MMCdivStatsEdges.innerHTML="";

	console.log( 'reset manifold' );

}


MMC.addHole = function( index ) { // z- coordinate in first vertex

	const geometry = mesh.geometry

	if ( mesh.geometry.type.includes( "BufferGeometry" ) === false ) {

		alert( "Holes need to be made before the check. Load a fresh object and try again");
		return;

	}

	const pos = geometry.attributes.position.array;

	index = index === 3 ? index : Math.floor( pos.length * Math.random() );

	pos[ index ] = 88; // recognizable but arbitrary distance

	geometry.attributes.position.needsUpdate = true;

	MMCdivMessageHoles.innerHTML +=`<div>hole: vertex ${ Math.floor( index / 3 )  }</div>`;

	// scene.children[ 1 ].geometry.vertices

};




MMC.checkEdges = function() {

	timeStart = performance.now();

	mesh.updateWorldMatrix();

	mesh.geometry = mesh.geometry.type.includes( "BufferGeometry" ) ?
		new THREE.Geometry().fromBufferGeometry(mesh.geometry) : mesh.geometry;

	MMC.vertexCount = new Array( mesh.geometry.vertices.length ).fill( 0 );

	mesh.geometry.faces.forEach( (face, idx)=> {

		const a = face.a;

		MMC.vertexCount[ a ] += 1;

		const b = face.b;
		MMC.vertexCount[ b ] += 1;

		const c = face.c
		MMC.vertexCount[ c ] += 1;

	} );

	//console.log( 'MMC.vertexCount', MMC.vertexCount );

	MMC.vertexCount.forEach( ( count, idx ) => {

		if( count === 9999 ) {

			vertex = mesh.geometry.vertices[ idx ];
			const geometry = new THREE.BoxGeometry( 2, 2, 2 );
			const material = new THREE.MeshNormalMaterial( { opacity: 0.85, side:2, transparent: true });
			telltale = new THREE.Mesh( geometry, material );
			telltale.position.copy( vertex );
			//telltale.position.set( 0, 0, 58 );
			mesh.add( telltale );

		}

	});

	MMC.edges = [];

	mesh.geometry.faces.forEach( (face, idx)=> {

		const lines = MMC.getEdges( face, idx );

		MMC.edges.push( ...lines );

	} );

	MMCdivStatsEdges.innerHTML = `<div>time edges: ${ ( performance.now() - timeStart ).toLocaleString() }</div>`;

	//console.log( 'edges', MMC.edges );

	edgePairs = [];

	timeStart = performance.now();

	for ( let i = 0; i < MMC.edges.length; i++ ) {

		const edge1 = MMC.edges[ i ];

		const edge1start = edge1.start;

		const edge1end = edge1.end;

		for ( let j = 0; j < MMC.edges.length; j++ ) {

			const edge2 = MMC.edges[ j ];

			if ( edge1start.equals( edge2.end ) && edge1end.equals( edge2.start ) ) {

				edgePairs.push( i );

			}

		}
	}
	MMCdivStatsEdges.innerHTML += `<div>time pairs: ${ ( performance.now() - timeStart ).toLocaleString() }</div>`;

	//console.log( 'edgePairs', edgePairs );

	edgeIndexNoPairs = [];
	edgeIndexPairsCount = [];

	for ( let i = 0; i < MMC.edges.length; i++ ) {

		if ( !edgePairs.includes( i ) ) {
			//console.log( 'edgeNoPairs', i, MMC.edges[  i ], MMC.edges[  i ].faceIndex );

			edgeIndexNoPairs.push( i );
			edgeIndexPairsCount.push( 1 );

		}

	}
	//console.log( 'edgeIndexNoPairs', edgeIndexNoPairs );


	edgeIndexNoPairs.forEach( hole => {

		const face = mesh.geometry.faces[ MMC.edges[ hole ].faceIndex ];

		const vs = mesh.geometry.vertices;
		MMC.addLine( [ vs[ face.a ], vs[ face.b ], vs[ face.c ], vs[ face.a ] ] );

	} );


	MMC.identifyVertices( edgeIndexNoPairs );


	if ( edgeIndexNoPairs.length === 0 ) {

		MMCdivMessageEdges.innerHTML = `<p>Looks like this mesh is 'watertight'</p>`;

	} else {

		MMCdivMessageEdges.innerHTML = `<p>Faces with issues have a red border. ${ edgeIndexNoPairs.length } faces with issues</p>`;

	}

}



MMC.getEdges = function( face, idx = 0 ) {

	let a = new THREE.Vector3();
	let b = new THREE.Vector3();
	let c = new THREE.Vector3();

	// mesh.localToWorld( a.copy( mesh.geometry.vertices[face.a] ));
	// mesh.localToWorld( b.copy( mesh.geometry.vertices[face.b] ));
	// mesh.localToWorld( c.copy( mesh.geometry.vertices[face.c] ));

	a.copy( mesh.geometry.vertices[face.a] )
	b.copy( mesh.geometry.vertices[face.b] )
	c.copy( mesh.geometry.vertices[face.c] );

	const lineAB = new THREE.Line3(a, b);
	const lineBC = new THREE.Line3(b, c);
	const lineCA = new THREE.Line3(c, a);

	lineAB.faceIndex = lineBC.faceIndex = lineCA.faceIndex = idx;

	return [ lineAB, lineBC, lineCA ];

}


MMC.identifyVertices = function( edgeIndexNoPairs ) {

	verticesNoP = [];
	verticesIndex= [];
	index = 0;

	edgeIndexNoPairs.forEach( index => {

		line = MMC.edges[ index ]
		start = line.start;
		end = line.end;
		verticesNoP.push( start, end );
		verticesIndex.push( index++, index++ );

	});
	//console.log( 'verticesNoP', verticesNoP );
	//console.log( 'verticesIndex', verticesIndex );

//what to do when all duplicates? Look for triads?

	duplicates = [];
	duplicatesIndex = [];

	verticesMesh = mesh.geometry.vertices;

	for ( let i = 0; i < verticesNoP.length; i++ ) {

		vertexNoP = verticesNoP[ i ];

		let hits = 0

		for ( let j = 0; j < verticesMesh.length; j++ ) {

			vertex = verticesMesh[ j ];

			if ( vertex.equals( vertexNoP ) ) { hits++; }
		}

		//console.log( 'hits', hits );

		if ( hits === 1 ) {

			const geometry = new THREE.BoxGeometry( 2, 2, 2 );
			const material = new THREE.MeshNormalMaterial( { opacity: 0.85, side:2, transparent: true });
			const telltale = new THREE.Mesh( geometry, material );
			telltale.position.copy( vertexNoP );
			//telltale.position.set( 0, 0, 58 );
			mesh.add( telltale );

		}

	}


	// vertices.forEach( ( vertex, index ) => {

	// 	if ( duplicates.indexOf( vertex ) === -1 ) {
	// 		duplicates.push( vertex );
	// 		duplicatesIndex.push( verticesIndex[ index ] ); }

	// } )
	// console.log( 'duplicates', duplicates );
	// console.log( 'duplicatesIndex', duplicatesIndex );

	// verticesErrantIndex = verticesIndex.filter( index => duplicatesIndex.indexOf( index ) === -1 );
	// console.log( 'verticesErrantIndex', verticesErrantIndex );

	// verticesErrant = verticesErrantIndex.map( index => vertices[ index ] );


	//try tell tales on all

	// verticesErrant.forEach( vertex => {


	// 	const geometry = new THREE.BoxGeometry( 2, 2, 2 );
	// 	const material = new THREE.MeshNormalMaterial( { opacity: 0.85, side:2, transparent: true });
	// 	telltale = new THREE.Mesh( geometry, material );
	// 	telltale.position.copy( vertex );
	// 	//telltale.position.set( 0, 0, 58 );
	// 	mesh.add( telltale );

	// 	console.log( '', telltale );


	// } )

}


MMC.addLine = function( vertices ) {

	const geometry = new THREE.Geometry();
	geometry.vertices = vertices || [ v( -10, 0, 0 ),  v( 0, 10, -10 ), v( 10, 0, 0 ) ];
	const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
	const line = new THREE.Line( geometry, material );

	mesh.add( line );
	return line;

}


