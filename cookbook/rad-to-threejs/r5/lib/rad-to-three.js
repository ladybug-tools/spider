

let rad = {};

rad.json = null;
rad.meshes = null;
rad.edges = null;
rad.materials = null;
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

			//rad.setMaterials();

			rad.setThreeJsWindowUpdate();

			// do this on last file only
			txtJson.value += JSON.stringify( rad.json, undefined, 1 ); // reloads every iteration but does not seem to slow things down much ;-)

			divLog.innerHTML +=
			`<p>
				name: ${ file.name }<br>
				size: ${ file.size.toLocaleString() } bytes<br>
			</p>
			`;

			divRadiance.innerText += reader.result + '\n';

			//setDataLogContents( rad.json, reader.result );

			//console.log( 'rad.json', rad.json );

		}

		reader.readAsText( file );

	}

};



//////////

rad.radToJson = function( radText ) {
	//console.log( 'radText', radText );

	const parseRadRe = /^\s*([^0-9].*(\s*[\d.-]+.*)*)/gm; // how does this work? ;-)

	// separate input radiance objects
	const rawObjects = radText.match( parseRadRe ).filter( word => word.trim().length > 0 && !word.trim().startsWith( '#' ) );
	//console.log( 'rawObjects', rawObjects );

	const rawObjectsRe = rawObjects.map( item => item.trim().replace(/\r\n|\n/g, " " ).replace(/\t/g, " " ).replace(/  /g, " " )  );
	//console.log( 'rawObjectsRe', rawObjectsRe );

	let jsonData = rawObjectsRe.map( line => converterObjectToJson(line));
	//console.log( {jsonData} );

	let jsonArrays = { 'surfaces': [], 'materials': [], 'other': [] };

	jsonData = jsonData.filter( result => result );

	jsonData.forEach( result => jsonArrays[ result[ 0 ] ].push( result[ 1 ] ) );

	//console.log( 'jsonArray', jsonArray );

	return jsonArrays;

};



rad.setThreeJsWindowUpdate = function() {

	scene.remove( rad.meshes, rad.edges );
	rad.meshes = new THREE.Group();
	rad.edges = new THREE.Group();

	for ( let geometry of rad.json.surfaces ) {

		switch ( geometry.type ) {

			case 'polygon':
				rad.drawPolygon( geometry );
				break;

			case 'cylinder':
				rad.drawCylinder ( geometry );
				break;

			case 'cone':
				rad.drawCone ( geometry );
				break;

			case 'sphere':
				rad.drawSphere ( geometry );
				break;

			default:
				console.log( 'oops', geometry );
		}

	}

	scene.add( rad.meshes, rad.edges);

	zoomObjectBoundingSphere( rad.meshes );

};



//////////

rad.drawPolygon = function( polygon ) {

	//console.log( 'polygon', polygon );

	const points = polygon.vertices.map( item => new THREE.Vector3().fromArray( item ) );
	//console.log( 'points', points );

	let color = rad.getColor( polygon );

	material = new THREE.MeshBasicMaterial( { color: color, opacity: rad.opacity, side: 2, transparent: true } );

	//const material = new THREE.MeshNormalMaterial( {  opacity: rad.opacity, side: 2, transparent: true } );


	if ( points.length < 2 ) {

		console.log( {polygon} );

		return;

	} else if ( points.length < 3 ) {

		console.log( 'draw line', {polygon} );

		return;

	} else if ( points.length < 4 ) {

		const geometry = new THREE.Geometry();
		geometry.vertices = points;
		geometry.faces = [ new THREE.Face3( 2, 1, 0 ) ];

		//geometry.computeFaceNormals();
		//geometry.computeVertexNormals();

		mesh = new THREE.Mesh( geometry, material );
		rad.meshes.add( mesh );
		rad.setEdges( mesh );
	} else {

		mesh = rad.drawShape( points, material );
		rad.meshes.add( mesh );
		rad.setEdges( mesh );
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


//////////


rad.drawCylinder = function( cylinder ) {

	const s = cylinder.center_pt_start;
	const start = new THREE.Vector3().set( s.x, s.y, s.z );
	//console.log( 'start', start );

	const e = cylinder.center_pt_end;
	end =  new THREE.Vector3().set( e.x, e.y, e.z );

	height = start.distanceTo( end );
	//console.log( 'height', height );

	const geometry = new THREE.CylinderGeometry( cylinder.radius, cylinder.radius, height );
	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -0.5 * Math.PI ) );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0,0.5 * height) );

	let color = rad.getColor( cylinder );

	const material = new THREE.MeshBasicMaterial( { color: color, opacity: 0.85, side: 2, transparent: true } );

	//const material = new THREE.MeshNormalMaterial();
	const mesh = new THREE.Mesh( geometry, material );
	mesh.position.copy( start );
	mesh.lookAt( end );

	rad.meshes.add( mesh );

	rad.setEdges( mesh );

};



rad.drawCone = function( cone ) {
	//console.log( 'cone', cone );

	const s = cone.center_pt_start;
	const start = new THREE.Vector3().set( s.x, s.y, s.z );
	//console.log( 'start', start );

	const e = cone.center_pt_end;
	end =  new THREE.Vector3().set( e.x, e.y, e.z );

	height = start.distanceTo( end );
	//console.log( 'height', height );

	const geometry = new THREE.CylinderGeometry( cone.radius_start, cone.radius_end, height );
	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -0.5 * Math.PI ) );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0,0.5 * height) );

	let color = rad.getColor( cone );

	const material = new THREE.MeshBasicMaterial( { color: color, opacity: 0.85, side: 2, transparent: true } );

	const mesh = new THREE.Mesh( geometry, material );
	mesh.position.copy( start );
	mesh.lookAt( end );

	rad.meshes.add( mesh );

	rad.setEdges( mesh );

};



rad.drawSphere = function( sphere ) {
	//console.log( 'sphere', sphere );

	const geometry = new THREE.SphereGeometry( sphere.radius );

	let color = rad.getColor( sphere );

	const material = new THREE.MeshBasicMaterial( { color: color, opacity: 0.85, side: 2, transparent: true } );
	//const material = new THREE.MeshNormalMaterial();

	const mesh = new THREE.Mesh( geometry, material );

	const p = new THREE.Vector3( sphere.center_pt.x, sphere.center_pt.y, sphere.center_pt.z )
	mesh.position.copy( p );

	rad.meshes.add( mesh );

	rad.setEdges( mesh );

};



rad.getColor = function( geometry ){

	let color;

	if ( rad.json.materials.length > 0 ) {

		const colorText = rad.json.materials.find( material => material.name === geometry.modifier );
		//console.log( 'colorText', geometry, colorText);

		if ( colorText ) {

			const keys = Object.keys( colorText );

			const red = colorText[ keys.find( item => item.startsWith( 'r_' ) ) ];
			const green = colorText[ keys.find( item => item.startsWith( 'g_' ) ) ];
			const blue = colorText[ keys.find( item => item.startsWith( 'b_' ) ) ];

			color = new THREE.Color().setRGB( red, green, blue );

		}

	} else {

		const colorText = geometry.modifier;
		//console.log( 'colorText', colorText );

		color = rad.colors[ colorText ] || 'darkgray';
		//console.log( 'x', color );

	}

	color = color ? color : 'darkgray';

	return color;

};



rad.setEdges = function( mesh ) {

	if ( rad.edges && rad.edges.visible === true ) {

		const edgesGeometry = new THREE.EdgesGeometry( mesh.geometry );
		const surfaceEdge = new THREE.LineSegments( edgesGeometry, new THREE.LineBasicMaterial( { color: 0x333333 } ) );
		surfaceEdge.rotation.copy( mesh.rotation );
		surfaceEdge.position.copy( mesh.position );

		rad.edges.add( surfaceEdge );

	}

};