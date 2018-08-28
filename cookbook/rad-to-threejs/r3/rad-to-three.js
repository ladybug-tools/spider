

let rad = {};

rad.arrRadJSon = null;
rad.meshes = null;
rad.edges = null;
rad.opacity = 0.85;

rad.colors = {

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



rad.inpOpenFiles = function( fileObj ) {

	//console.log( 'fileObj', fileObj );

	rad.arrRadJSon = [];
	divRadiance.innerText = '';

	for ( let file of fileObj ) {

		const reader = new FileReader();

		reader.onload = function( event ) {

			const jsonPart = rad.parseRadText( reader.result );

			rad.arrRadJSon.push( ...jsonPart );

			divJSON.innerText = JSON.stringify( rad.arrRadJSon, undefined, 1 ); // reloads every iteration but does seem to slow things down much ;-)

			divLog.innerHTML +=
			`
				name: ${ file.name }<br>
				size: ${ file.size.toLocaleString() } bytes<br>
			`;

			divRadiance.innerText += reader.result + '\n';

			rad.setThreeJsWindowUpdate();

		}

		reader.readAsText( file );

	}

};



rad.setThreeJsWindowUpdate = function() {

	scene.remove( rad.meshes, rad.edges );
	rad.meshes = new THREE.Group();
	rad.edges = new THREE.Group();

	for ( let item of rad.arrRadJSon ) {

		if ( item.type === 'polygon' ) { rad.drawPolygon ( item ); }

	}

	scene.add( rad.meshes, rad.edges );

	rad.zoomObjectBoundingSphere( rad.meshes );

};



//////////

rad.parseRadText = function( radText ) {

	//console.log( 'radText', radText );
	/* Input multi-line radiance file and return them as an array of JSON objects. */
	const parseRadRe = /^\s*([^0-9].*(\s*[\d.-]+.*)*)/gm; // how does this work? ;-)

	// separate input radiance objects
	const rawObjects = radText.match( parseRadRe ).filter( word => word.trim().length > 0 && !word.trim().startsWith( '#' ) );
	//console.log( 'rawObjects', rawObjects );
	const rawObjects2 = rawObjects.map( item => item.replace(/\r\n|\n/g, " " ) );
	//console.log( 'rawObjects2', rawObjects2 );

	const jsonArray = rawObjects2.map( line => rad.radObjectToJson( line ) );
	//console.log( 'jsonArray', jsonArray );

	return jsonArray;

};



rad.radObjectToJson = function( radText){

	/* convert a single radiance object to a JSON object */
	const repNewLineRe = /\s\s+/g;
	const data = radText.replace( repNewLineRe, " " ).trim().split( " " );
	const type = data[ 1 ];

	if ( !type ) { return; }

	if ( type != 'polygon' ) {

		// this is a generic method that returns the data as values for each line
		return rad.parseBase( data );

	} else {

		// for now we only support polygons
		return rad.parsePolygon( data );

	}

};



rad.parsePolygon = function( data ) {

	console.log( 'data', data );

	const ptList = data.slice( 6 ); // .map( vertex => parseFloat( vertex ) );
	//console.log( 'ptList', ptList );

	// separate x, y, z coordinates
	// put every 3 items in a separate array
	const vertices = [];

	while ( ptList.length > 0 ) { vertices.push( ptList.splice( 0, 3 ) ); }  // not easy to do better than this ;-)
	//vertices = ptList.map( item => ptList.splice( 0, 3 ) ); // not!

	const polygon = {

		'modifier': data[ 0 ],
		'type': data[ 1 ],
		'name': data[ 2 ],
		'vertices': vertices

	};

	return polygon;

};



rad.parseBase = function( data ) {

	/* convert a radiance primitive line to a JSON object */
	// find number of items in each line
	const baseData = data.slice( 3 );

	const count1 = parseInt( baseData[0] );
	const count2 = parseInt( baseData[ count1 + 1 ] );
	const count3 = parseInt( baseData[ count1 + count2 + 2 ] );

	const l1 = ( count1 == 0 ) ? [] : baseData.slice( 1, count1 + 1 );
	const l2 = ( count2 == 0 ) ? [] : baseData.slice( count1 + 2, count1 + count2 + 2 );
	const l3 = ( count3 == 0 ) ? [] : baseData.slice( count1 + count2 + 3, count1 + count2 + count3 + 3 );

	const values = { 0: l1, 1: l2, 2: l3 }

	const radObject = {

		'modifier': data[ 0 ],
		'type': data[ 1 ],
		'name': data[ 2 ],
		'values': values

	};

	return radObject;

};



//////////

rad.drawPolygon = function( polygon ) {

	//console.log( 'polygon', polygon );

	const points = polygon.vertices.map( item => new THREE.Vector3().fromArray( item ) );
	//console.log( 'points', points );

	const colorText = polygon.modifier;
	//console.log( 'colorText', colorText );

	let color = rad.colors[ colorText ] || 'darkgray';
	//color = color ? color : 'darkgray';

	material = new THREE.MeshBasicMaterial( { color: color, opacity: rad.opacity, side: 2, transparent: true } );

	//const material = new THREE.MeshNormalMaterial( {  opacity: rad.opacity, side: 2, transparent: true } );


	if ( points.length === 0 ) {

		return;

	} else if ( points.length < 4 ) {

		const geometry = new THREE.Geometry();
		geometry.vertices = points;
		geometry.faces = [ new THREE.Face3( 2, 1, 0 ) ];

		//geometry.computeFaceNormals();
		//geometry.computeVertexNormals();

		mesh = new THREE.Mesh( geometry, material );

	} else {

		mesh = rad.drawShape( points, material );

	}

	rad.meshes.add( mesh );

	if ( rad.edges && rad.edges.visible === true ) {

		const edgesGeometry = new THREE.EdgesGeometry( mesh.geometry );
		const surfaceEdge = new THREE.LineSegments( edgesGeometry, new THREE.LineBasicMaterial( { color: 0x333333 } ) );
		surfaceEdge.rotation.copy( mesh.rotation );
		surfaceEdge.position.copy( mesh.position );

		rad.edges.add( surfaceEdge );

	}

};



rad.drawShape = function( vertices, material ) {
	//console.log( 'vertices', vertices );

	const plane = rad.getPlane( vertices );
	const obj = new THREE.Object3D();
	obj.lookAt( plane.normal );  // copy the rotation of the triangle
	obj.quaternion.conjugate();
	obj.updateMatrixWorld();

	vertices.map( vertex => obj.localToWorld( vertex ) );

	const shape = new THREE.Shape( vertices );

	const geometryShape = new THREE.ShapeBufferGeometry( shape );

	const shapeMesh = new THREE.Mesh( geometryShape, material );

	shapeMesh.lookAt( plane.normal );
	shapeMesh.position.copy( plane.normal.multiplyScalar( - plane.constant ) );

	return shapeMesh;

};



rad.getPlane = function( points, start = 0 ) {

	const triangle = new THREE.Triangle();
	triangle.set( points[ start ], points[ start + 1 ], points[ start + 2 ] );

	const pl = new THREE.Plane();
	const plane = triangle.getPlane( pl );

	if ( triangle.getArea() === 0 ) {

		start++;
		rad.getPlane( points, start );
		//console.log( 'tri points', points );

	}

	return plane;

};



rad.zoomObjectBoundingSphere = function( obj ) {

	const bbox = new THREE.Box3().setFromObject( obj );

	const sphere = bbox.getBoundingSphere( new THREE.Sphere() );
	const center = sphere.center;
	const radius = sphere.radius;

	controls.target.copy( center );
	controls.maxDistance = 5 * radius;

	camera.position.copy( center.clone().add( new THREE.Vector3( 1.5 * radius, - 1.5 * radius, 1.5 * radius ) ) );
	camera.far = 10 * radius; //2 * camera.position.length();
	camera.updateProjectionMatrix();

	//lightDirectional.position.copy( center.clone().add( new THREE.Vector3( -1.5 * radius, -1.5 * radius, 1.5 * radius ) ) );
	//lightDirectional.shadow.camera.scale.set( 0.2 * radius, 0.2 * radius, 0.01 * radius );
	//lightDirectional.target = axesHelper;

	axesHelper.scale.set( radius, radius, radius );
	axesHelper.position.copy( center );

	obj.userData.center = center;
	obj.userData.radius = radius;

	//		scene.remove( cameraHelper );
	//		cameraHelper = new THREE.CameraHelper( lightDirectional.shadow.camera );
	//		scene.add( cameraHelper );

};
