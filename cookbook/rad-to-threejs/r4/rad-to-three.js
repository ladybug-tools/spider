

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

	rad.json = { 'surfaces': [], 'materials': [], 'other': [] };

	divRadiance.innerText = '';

	for ( let file of fileObj ) {

		const reader = new FileReader();

		reader.onload = function( event ) {

			const jsonPart = rad.radToJson( reader.result );
			//console.log( 'jsonPart', jsonPart);

			rad.json.surfaces.push( ...jsonPart.surfaces );
			rad.json.materials.push( ...jsonPart.materials );
			rad.json.other.push( ...jsonPart.other );

			rad.setThreeJsWindowUpdate();

			// do this on last file only
			txtJson.value += JSON.stringify( rad.json, undefined, 1 ); // reloads every iteration but does not seem to slow things down much ;-)

			divLog.innerHTML +=
			`
				name: ${ file.name }<br>
				size: ${ file.size.toLocaleString() } bytes<br>
			`;

			divRadiance.innerText += reader.result + '\n';

			setDataLogContents( rad.json, reader.result );

			//console.log( 'rad.json', rad.json );

		}

		reader.readAsText( file );

	}

};



rad.setThreeJsWindowUpdate = function() {

	scene.remove( rad.meshes, rad.edges );
	rad.meshes = new THREE.Group();
	rad.edges = new THREE.Group();

	for ( let item of rad.json.surfaces ) {

		if ( item.type === 'polygon' ) { rad.drawPolygon ( item ); }
		if ( item.type === 'cone' ) { rad.drawCone ( item ); }

	}

	scene.add( rad.meshes, rad.edges);

	rad.zoomObjectBoundingSphere( rad.meshes );

};



//////////

rad.radToJson = function( radText ) {

	//console.log( 'radText', radText );

	const parseRadRe = /^\s*([^0-9].*(\s*[\d.-]+.*)*)/gm; // how does this work? ;-)

	// separate input radiance objects
	const rawObjects = radText.match( parseRadRe ).filter( word => word.trim().length > 0 && !word.trim().startsWith( '#' ) );
	const rawObjectsRe = rawObjects.map( item => item.replace(/\r\n|\n/g, " " ) );
	//console.log( 'rawObjectsRe', rawObjectsRe );



	let jsonData = rawObjectsRe.map( line => radObjectToJson(line));
	//console.log( {jsonData} );

	let jsonArray = { 'surfaces': [], 'materials': [], 'other': [] };

	for ( var i = 0; i < jsonData.length; i++) {

		let results = jsonData[ i];
		jsonArray[ results[0] ].push(results[1]);

	}

	//console.log( 'jsonArray', jsonArray );
	return jsonArray;

};



//////////

rad.drawCone = function( item ) {

	console.log( 'item', item );

	const s = item.center_pt_start;
	const start = new THREE.Vector3().set( s.x, s.y, s.z );
	console.log( 'start', start );

	const e = item.center_pt_end;
	end =  new THREE.Vector3().set( e.x, e.y, e.z );

	height = start.distanceTo( end );
	//console.log( 'height', height );

	const geometry = new THREE.CylinderGeometry( item.radius_start, item.radius_end, height );
	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -0.5 * Math.PI ) );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0,0.5 * height) );

	//colorText = rad.items[ index ].split( ' ' )[0];
	//console.log( 'colorText', colorText );

	color = rad.colors[ 0 ];

	color = color ? color : 'darkgray';
	//console.log( 'cylinder color', color );

	const material = new THREE.MeshBasicMaterial( { color: color, opacity: 0.85, side: 2, transparent: true } );

	const mesh = new THREE.Mesh( geometry, material );
	mesh.position.copy( start );
	mesh.lookAt( end );

	rad.meshes.add( mesh );

};


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
