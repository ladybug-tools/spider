/* global THREE * /
/* jshint esversion: 6 */

// Copyright 2018 Ladybug Tools authors. MIT License


let RAD = {};

RAD.json = null;
RAD.meshes = null;
RAD.edges = null;
RAD.materials = null;
RAD.opacity = 0.85;

RAD.colors = {

	InteriorWall: 0x008000,
	ExteriorWall: 0xFFB400,
	Roof: 0x800000,
	InteriorFloor: 0x80FFFF,
	ExposedFloor: 0x40B4FF,
	Shade: 0xFFCE9D,
	UndergroundWall: 0xA55200,
	UndergroundSlab: 0x804000,
	Ceiling: 0xFF8080,
	Air: 0xFFFF00,
	UndergroundCeiling: 0x408080,
	RaisedFloor: 0x4B417D,
	SlabOnGrade: 0x804000,
	FreestandingColumn: 0x808080,
	EmbeddedColumn: 0x80806E,

	generic_glass: 'black',
	generic_wall: 'gray',
	generic_floor: 'brown',
	generic_roof: 'maroon',

	Exterior_Window: 'black',
	Exterior_Wall: 'gray',
	Exterior_Floor: 'brown',
	Exterior_Roof: 'maroon',

	Dark_Wood: 'brown',
	Ceiling: 'azure',
	Ext_wall: 'gray',
	Ext_glaz: 'black',
	Floor: 'brown',
	Int_wall: 'navajowhite',
	Int_glaz: 'darkgray',
	Light_Wood: 'burlywood'

};

//RAD.threeColor = new THREE.Color();
//RAD.referenceObject = new THREE.Object3D();


// called by FIL.callbackRequestFile &&

RAD.addDataFile = function( text ) {

	//RAD.url = url;
	RAD.jsonData = [];

	RAD.json = { 'surfaces': [], 'materials': [], 'other': [] };

/* 	RAD.materialType = THR.scene.getObjectByName( 'lightAmbient') ?
		THREE.MeshPhongMaterial
		:
		THREE.MeshBasicMaterial
	; */

	RAD.divPopUpData = document.getElementById( 'divPopUpData' );


	const json = RAD.radToJson( text );
	console.log( 'json', json );

	json.forEach( result => RAD.json[ result[ 0 ] ].push( result[ 1 ] ) ); // not easy to understand

	//RAD.setThreeJsWindowUpdate( RAD.json );

	return json;

}



//////////

RAD.radToJson = function( radText ) {

	items = [];

	const lines = radText.split( /\r\n|\n/ );

	count = -1;

	for ( let line of lines ) {

		line = line.trim();
		if ( line[0] === '#' || line === '' ) { continue; }

		if ( line.search( /[a-z]/ ) >= 0 ) { // there is a word
		//if ( line.test( /[a-z]/ ) ) { // there is a word

			if ( line.match( '!xform' ) && !line.match( '-rx' ) && !line.match( '-f' ) ) {

				let url = line.trim().replace( /  /g, ' ' ).split( /\s/ )[ 1 ];
				url = url.slice( 1 );
				//console.log( 'path + url', path + url );

				FIL.requestFile( url );

			}

			items[ ++count ] = line + ' ';

		} else {

			items[ count ] += line + ' ';

		}


	}

	//console.log( 'items', items );

	let jsonData = items.map( line => RAD.converterObjectToJson( line ) )
		.filter( result => result ); // drop empties // needed?
	//console.log( 'jsonData', jsonData );

	return jsonData;

};



RAD.setThreeJsWindowUpdate = function( json, target = undefined ) {

	THR.scene.remove( RAD.meshes, RAD.edges, THRU.helperNormalsFaces );

	THRU.helperNormalsFaces = undefined;
	RAD.meshes = new THREE.Group();
	RAD.edges = new THREE.Group();

	RAD.triangleVertices = [];
	RAD.triangleColors = [];
	RAD.triangleParent = [];

	RAD.count3 = 0;
	RAD.count4 = 0;
	RAD.count5plus = 0;
	RAD.count10 = 0;
	RAD.count11 = 0;
	RAD.countGeo = 0;

	if ( ! json.surfaces.length ) {

		if ( target ) { target.innerHTML += 'no surfaces'; }

		return;

	}

	for ( let geometry of json.surfaces ) {

		switch ( geometry.type ) {

			case 'polygon':
				RAD.drawPolygon( geometry );
				break;

			case 'cylinder':
				RAD.countGeo++;
				RAD.drawCylinder ( geometry );
				break;

			case 'cone':
				RAD.countGeo++;
				RAD.drawCone ( geometry );
				break;

			case 'sphere':
				RAD.countGeo++;
				RAD.drawSphere ( geometry );
				break;

			default:
				console.log( 'oops', geometry );
		}

	}


	const triangles = RAD.getTrianglesMesh( RAD.triangleVertices, RAD.triangleColors );

	RAD.meshes.add( triangles );
	THR.scene.add( RAD.meshes, RAD.edges );

	THRU.zoomObjectBoundingSphere( RAD.meshes );

	//target.innerHTML = POP.getPopUpHtml();

 	if ( RAD.divPopUpData ) {

		setTimeout(() => { RAD.divPopUpData.innerHTML = POP.getPopUpHtml(); }, 600 );

	}

};



//////////

RAD.drawPolygon = function( polygon ) {
	//console.log( 'polygon', polygon );

	let points = polygon.vertices.length;
	//console.log( 'points', points );

	if ( points < 2 ) {

		console.log( {polygon} );

	} else if ( points < 3 ) {

		console.log( 'draw line', {polygon} );

	} else if ( points < 4 ) {

		RAD.setTriangle( polygon );

	} else if ( points < 5 ) {

		RAD.setQuad( polygon );

	} else {

		RAD.setShapeMesh( polygon );

	}

};



RAD.setTriangle = function( polygon ) {

	RAD.count3++;

	polygon.vertices.forEach(
		vertex => vertex.forEach( coordinate => RAD.triangleVertices.push( coordinate ) )
	);


	const color = RAD.getColor( polygon ) || RAD.threeColor;

	RAD.triangleColors.push( color.r, color.g, color.b, color.r, color.g, color.b, color.r, color.g, color.b );

};




RAD.setQuad = function( polygon ){

	RAD.count4++;

	const vertices = polygon.vertices.slice( 0, 3 ).concat( [ polygon.vertices[ 3 ], polygon.vertices[ 2 ], polygon.vertices[ 0 ] ] );

	vertices.forEach(
		vertex => vertex.forEach( coordinate => RAD.triangleVertices.push( coordinate ) )
	);

	RAD.triangleParent.push( polygon );

	const color = RAD.getColor( polygon ) || RAD.threeColor;

	for ( var i = 0; i < 6; i++ ) {

		RAD.triangleColors.push( color.r, color.g, color.b );

	}

	const line = RAD.getLine( polygon.vertices );
	RAD.edges.add( line );

};



RAD.getTrianglesMesh = function( vertices, colors ) {
	//console.log( 'colors', colors );

	const geometryTriangles = new THREE.BufferGeometry();
	geometryTriangles.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
	geometryTriangles.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

	geometryTriangles.computeFaceNormals();
	geometryTriangles.computeVertexNormals();
	//geometry.normalizeNormals();

	const materialTriangles = new RAD.materialType( { color: 0xaaaaaa, side: 2, vertexColors: THREE.VertexColors } );
	const mesh = new THREE.Mesh( geometryTriangles, materialTriangles );
	mesh.name = RAD.name;

	//RAD.setEdges( mesh );

	return mesh;

};



RAD.setShapeMesh = function( polygon ) {

	RAD.count5plus++;

	let points = polygon.vertices.map( item => new THREE.Vector3().fromArray( item ) );
	//console.log( 'points', points );
/*
	if ( points.length === 11 ) { // Michal's models

		RAD.count11++;

		if ( points[ 4 ].z !== points[ 5 ].z ) {

			points = [ points[ 0 ], points[ 1 ], points[ 2 ], points[ 3 ], points[ 4 ],
				points[ 7 ], points[ 6 ], points[ 5 ], points[ 8 ], points[ 9 ], points[ 10 ] ];

			//console.log( 'points', points );

		}

	} else if ( points.length === 10 ) {

		RAD.count10++;

		if ( points[ 1 ].z !== points[ 2 ].z  ) {

			points = [ points[ 7 ], points[ 8 ], points[ 9 ], points[ 6 ], points[ 5 ],
				points[ 4 ], points[ 3 ], points[ 2 ], points[ 1 ], points[ 0 ] ];
			//console.log( 'points', points );

		}

	}
*/

	const color = RAD.getColor( polygon ) || RAD.threeColor;

	const material = new RAD.materialType( { color: color, opacity: RAD.opacity, side: 2, transparent: true } );

	const mesh = RAD.getShape( points, material );
	mesh.userData = polygon;

	RAD.meshes.add( mesh );
	RAD.setEdges( mesh );

}


//////////

RAD.getShape = function( vertices, material ) {
	//console.log( 'vertices', vertices );

	const plane = RAD.getPlane( vertices );

	RAD.referenceObject.lookAt( plane.normal );  // copy the rotation of the triangle
	RAD.referenceObject.quaternion.conjugate();
	RAD.referenceObject.updateMatrixWorld();

	/*
	const shape = new THREE.Shape( vertices );

	const geometryShape = new THREE.ShapeBufferGeometry( shape );

	const shapeMesh = new THREE.Mesh( geometryShape, material );
	*/

	//vertices2 = vertices.slice();

	const vertices2 = vertices.map( vertex => RAD.referenceObject.localToWorld( vertex ) );

	const triangles = THREE.ShapeUtils.triangulateShape( vertices2, [] );

	const verts = [];

	for ( let triangle of triangles ) {

		//console.log( 'tri', tri );

		for ( var j = 0; j < 3; j++ ) {

			const vertex = vertices[ triangle[ j ] ];

			//console.log( 'vv', vertex  );

			verts.push( vertex );

		}

	}

	//console.log( 'vertices', vertices );

	const geometry = new THREE.BufferGeometry();
	geometry.setFromPoints( verts );
	geometry.computeVertexNormals();

	shapeMesh = new THREE.Mesh( geometry, material );
	shapeMesh.lookAt( plane.normal );

	return shapeMesh;

};



RAD.getPlane = function( points, start = 0 ) {

	const triangle = new THREE.Triangle();
	triangle.set( points[ start ], points[ start + 1 ], points[ start + 2 ] );

	const pl = new THREE.Plane();
	const plane = triangle.getPlane( pl );

	if ( triangle.getArea() === 0 ) {

		start++;
		RAD.getPlane( points, start );
		//console.log( 'tri points', points );

	}

	return plane;

};


//////////

RAD.drawCylinder = function( cylinder ) {

	const s = cylinder.center_pt_start;
	const start = new THREE.Vector3().set( s.x, s.y, s.z );
	//console.log( 'start', start );

	const e = cylinder.center_pt_end;
	end =  new THREE.Vector3().set( e.x, e.y, e.z );

	const height = start.distanceTo( end );
	//console.log( 'height', height );

	const geometry = new THREE.CylinderBufferGeometry( cylinder.radius, cylinder.radius, height );
	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -0.5 * Math.PI ) );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0,0.5 * height) );

	const color = RAD.getColor( cylinder ) || RAD.threeColor;


	const material = new RAD.materialType( { color: color, opacity: 0.85, side: 2, transparent: true } );

	//const material = new THREE.MeshNormalMaterial();
	const mesh = new THREE.Mesh( geometry, material );
	mesh.position.copy( start );
	mesh.lookAt( end );
	mesh.userData = cylinder;

	RAD.meshes.add( mesh );

	RAD.setEdges( mesh );

};



RAD.drawCone = function( cone ) {
	//console.log( 'cone', cone );

	const s = cone.center_pt_start;
	const start = new THREE.Vector3().set( s.x, s.y, s.z );
	//console.log( 'start', start );

	const e = cone.center_pt_end;
	end =  new THREE.Vector3().set( e.x, e.y, e.z );

	const height = start.distanceTo( end );
	//console.log( 'height', height );

	const geometry = new THREE.CylinderBufferGeometry( cone.radius_start, cone.radius_end, height );
	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -0.5 * Math.PI ) );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0,0.5 * height) );

	const color = RAD.getColor( cone ) || RAD.threeColor;

	const material = new RAD.materialType( { color: color, opacity: 0.85, side: 2, transparent: true } );

	const mesh = new THREE.Mesh( geometry, material );
	mesh.position.copy( start );
	mesh.lookAt( end );
	mesh.userData = cone;

	RAD.meshes.add( mesh );

	RAD.setEdges( mesh );

};



RAD.drawSphere = function( sphere ) {
	//console.log( 'sphere', sphere );

	const geometry = new THREE.SphereBufferGeometry( sphere.radius );

	//const colorTry = RAD.getColor( sphere );
	const color = RAD.getColor( sphere ) || RAD.threeColor;

	const material = new RAD.materialType( { color: color, opacity: 0.85, side: 2, transparent: true } );
	//const material = new THREE.MeshNormalMaterial();

	const mesh = new THREE.Mesh( geometry, material );

	const p = new THREE.Vector3( sphere.center_pt.x, sphere.center_pt.y, sphere.center_pt.z )
	mesh.position.copy( p );
	mesh.userData = sphere;

	RAD.meshes.add( mesh );

	RAD.setEdges( mesh );

};


//////////

RAD.setEdges = function( mesh ) {

	if ( RAD.edges && RAD.edges.visible === true ) {

		const edgesGeometry = new THREE.EdgesGeometry( mesh.geometry );
		const surfaceEdge = new THREE.LineSegments( edgesGeometry, new THREE.LineBasicMaterial( { color: 0x333333 } ) );
		surfaceEdge.rotation.copy( mesh.rotation );
		surfaceEdge.position.copy( mesh.position );

		RAD.edges.add( surfaceEdge );

	}

};



RAD.getLine = function( vertices ) {

	const points = vertices.map( item => new THREE.Vector3().fromArray( item ) );
	let geometry, material, line;
	const v = function ( x, y, z ){ return new THREE.Vector3( x, y, z ); };

	geometry = new THREE.Geometry();

	//var geometry = new THREE.BufferGeometry();
	//geometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( 4 * 3 ), 3 ) );

	geometry.vertices = points;
	material = new THREE.LineBasicMaterial( { color: 0x000000 } );
	line = new THREE.Line( geometry, material );

	return line;

}


//////////

RAD.getColor = function( surface ){

	let color;
	let colorText

	colorText = surface.modifier || 'red';

	if ( RAD.json.materials.length > 0 ) {

		const material = RAD.json.materials.find( material => material.name === colorText );
		//console.log( 'material', geometry, material);

		if ( material ) {

			const keys = Object.keys( material );

			const red = parseFloat( material[ keys.find( item => item.startsWith( 'r_' ) ) ] );
			const green = parseFloat( material[ keys.find( item => item.startsWith( 'g_' ) ) ] );
			const blue = parseFloat( material[ keys.find( item => item.startsWith( 'b_' ) ) ] );

			color = RAD.threeColor.setRGB( red, green, blue );

		}

	} else {


		//console.log( 'colorText', colorText );

		color = RAD.colors[ colorText ] || 'darkgray';
		//console.log( 'x', color );

		color = RAD.threeColor.setStyle( color );

	}

	//color = color ? color : 'darkgray';
	//console.log( 'color', color );

	RAD.triangleParent.push( surface );

	return color;

};
