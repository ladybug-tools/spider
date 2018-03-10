
	var uriGbxmlDefault =
	location.protocol === 'file:' ? // for testing
	//		'https://rawgit.com/ladybug-tools/spider/master/gbxml-viewer/gbxml-sample-files/open-studio-seb.xml'
	//		'https://rawgit.com/GreenBuildingXML/Sample-gbXML-Files/master/ARCH_ASHRAE%20Headquarters%20r16_detached.xml'
	'../../../gbxml-sample-files/bristol-clifton-down-road.xml'
	:
	'../../../gbxml-sample-files/bristol-clifton-down-road.xml';

	var THR = {};
	/*
	var GBX = {};

	GBX.gbxml = null;
	GBX.gbxmlResponseXML;
	GBX.gbjson;

	GBX.surfaceJson = null;
	GBX.surfaceMeshes;
	GBX.surfaceEdges;

	GBX.colors = {

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
		EmbeddedColumn: 0x80806E

	}
	GBX.surfaceTypes  = Object.keys( GBX.colors );

	let txt = '';

	for ( let type of GBX.surfaceTypes ) {

		txt += '<option>' + type + '</option>';

	}

	GBX.surfaceTypeOptions = txt;
	*/

	THR.initThreeGbxml = () => {

		let renderer, camera, controls, scene;
		let lightAmbient, lightDirectional, lightPoint;
		let cameraHelper, axesHelper, gridHelper, groundHelper;
		renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true }  );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		renderer.shadowMap.renderReverseSided = false;
		renderer.shadowMap.renderSingleSided = false;
		document.body.appendChild( renderer.domElement );

		camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 10000 );
		camera.up.set( 0, 0, 1 );

		controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.autoRotate = true;

		scene = new THREE.Scene();

		lightAmbient = new THREE.AmbientLight( 0x444444 );
		scene.add( lightAmbient );

		lightDirectional = new THREE.DirectionalLight( 0xffffff, 1 );
		lightDirectional.shadow.mapSize.width = 2048;  // default 512
		lightDirectional.shadow.mapSize.height = 2048;
		lightDirectional.castShadow = true;
		scene.add( lightDirectional );

		lightPoint = new THREE.PointLight( 0xffffff, 0.5 );
		lightPoint.position = new THREE.Vector3( 0, 0, 1 );
		camera.add( lightPoint );
		scene.add( camera );

		axesHelper = new THREE.AxesHelper( 1 );
		scene.add( axesHelper );

		window.addEventListener( 'resize', THR.onWindowResize, false );
		window.addEventListener( 'orientationchange',THR.onWindowResize, false );
		window.addEventListener( 'keyup', function() { controls.autoRotate = false; }, false );

		renderer.domElement.addEventListener( 'click', function() { controls.autoRotate = false; }, false );
		renderer.domElement.addEventListener( 'click', function() { divContainer.style.display = 'none'; }, false );

		// in iframe: loads default / standalone: opens permalinks
		//console.log( 'location.hash', location );

		if ( location.hash && location.hash.endsWith( '.xml') ) {

			const url = location.hash.slice( 1 );

			COR.requestFileAndProgress( url, GBX.callbackGbXML );

		} else {

			COR.requestFileAndProgress( uriGbxmlDefault, GBX.callbackGbXML );

		}


		THR.renderer= renderer;
		THR.scene = scene;
		THR.camera = camera;
		THR.controls = controls;
		THR.lightAmbient = lightAmbient;
		THR.lightDirectional = lightDirectional;
		THR.lightPoint = lightPoint;
		THR.cameraHelper = cameraHelper;
		THR.axesHelper = axesHelper;
		THR.gridHelper = gridHelper;
		THR.groundHelper = groundHelper;

	}


	// available if parent wants it.
	// called by parseFileXML()

	THR.onWindowLoad = function() {

		if ( parent && parent.onloadThreejs ) { parent.onloadThreejs(); }

	};



	THR.onWindowResize = function() {

		THR.camera.aspect = window.innerWidth / window.innerHeight;
		THR.camera.updateProjectionMatrix();

		THR.renderer.setSize( window.innerWidth, window.innerHeight );

		//console.log( 'onWindowResize  window.innerWidth', window.innerWidth );

	};



	THR.animate = function() {

		requestAnimationFrame( THR.animate );
		THR.renderer.render( THR.scene, THR.camera );
		THR.controls.update();

	}


//////////

	/*
	GBX.callbackGbXML = function( xhr ) {

		GBX.gbxmlResponseXML =  xhr.target.responseXML;
		GBX.gbxml = xhr.target.responseXML.documentElement;

		GBX.parseFileXML( GBX.gbxml );

	};



	GBX.openGbxmlFile = function( files ) {

		const reader = new FileReader();
		reader.onprogress = onRequestFileProgress;
		reader.onload = function( event ) {

			const parser = new DOMParser();

			GBX.gbxmlResponseXML = parser.parseFromString( reader.result, "text/xml" );
			//console.log( 'gbxmlResponseXML2', gbxmlResponseXML2 );

			GBX.gbxml = GBX.gbxmlResponseXML.children[ 0 ];
			//console.log( 'GBX.gbxml', GBX.gbxml );

			GBX.gbjson = GBX.parseFileXML( GBX.gbxml );
		//			GBX.surfaceJson = GBX.gbjson.Campus.Surface;

			if ( files.files[ 0 ] ) { GBX.gbjson.name = files.files[ 0 ].name; }

		}

		reader.readAsText( files.files[ 0 ] );

		function onRequestFileProgress( event ) {

			divLog.innerHTML =
				'bytes loaded: ' + event.loaded.toLocaleString() +
				( event.lengthComputable ? ' of ' + event.total.toLocaleString() : '' ) +
			'';

		}

	};


	// loads any text file - from file reader or location hash or wherever

	GBX.parseFileXML = function( xmlNode ) {

		GBX.gbjson = GBX.XML2jsobj( xmlNode );
		GBX.surfaceJson = GBX.gbjson.Campus.Surface;
		//console.log( 'GBX.gbjson', GBX.gbjson );

		GBX.parseGbJson( GBX.gbjson );

		THR.onWindowLoad();

		return GBX.gbjson;

	}


	// https://www.sitepoint.com/how-to-convert-xml-to-a-javascript-object/
	// http://blogs.sitepointstatic.com/examples/tech/xml2json/index.html

	GBX.XML2jsobj = function( node ) {

		let data = {};

		function Add( name, value ) {

			if ( data[ name ] ) {

				if ( data[ name ].constructor !== Array ) {

					data[ name ] = [ data[ name ] ];

				}

				data[ name ][ data[ name ].length ] = value;

			} else {

				data[ name ] = value;

			}

		}

		let child, childNode;

		for ( child = 0; childNode = node.attributes[ child ]; child++ ) {

			Add( childNode.name, childNode.value );

		}

		for ( child = 0; childNode = node.childNodes[ child ]; child++ ) {

			if ( childNode.nodeType === 1 ) {

				if ( childNode.childNodes.length === 1 && childNode.firstChild.nodeType === 3 ) { // text value

					Add( childNode.nodeName, childNode.firstChild.nodeValue );

				} else { // sub-object

					Add( childNode.nodeName, GBX.XML2jsobj( childNode ) );

				}

			}

		}

		return data;

	}



	GBX.parseGbJson = function( gbjson ) {

		//console.log( 'surfaces', gbjson.Campus.Surface );

		const surfaces = GBX.surfaceJson; // gbjson.Campus.Surface;
		const polyloops = [];
		const openings = [];

		for ( let surface of surfaces ) {

			if ( surface.Opening ) {

				if ( surface.Opening.PlanarGeometry ) {

					const polyloop = surface.Opening.PlanarGeometry.PolyLoop;
					const points = GBX.getPoints( polyloop );
					openings.push( [ points ] );

				} else {

					let arr = [];

					for ( let opening of surface.Opening ) {

						polyloop = opening.PlanarGeometry.PolyLoop;
						points = GBX.getPoints( polyloop );
						arr.push( points );

					}

					openings.push( arr );

				}

			} else {

				openings.push( [] );

			}

			polyloop = surface.PlanarGeometry.PolyLoop;

			points = GBX.getPoints( polyloop );

			polyloops.push( points );

		}

		THR.scene.remove( GBX.surfaceMeshes, GBX.surfaceEdges );

		if ( GBX.surfaceMeshes ) {

			GBX.surfaceMeshes.traverse( function ( child ) {

				if ( child.geometry ) {

					child.geometry.dispose();
					child.material.dispose();

				}

				if ( child.texture ) { child.texture.dispose(); }

			} );

		}

		if ( GBX.surfaceEdges ) {

			GBX.surfaceEdges.traverse( function ( child ) {

				if ( child.geometry ) {

					child.geometry.dispose();
					child.material.dispose();

				}

			} );

		}

		GBX.surfaceMeshes = new THREE.Object3D();
		GBX.surfaceMeshes.name = 'GBX.surfaceMeshes';

		GBX.surfaceEdges = new THREE.Object3D();
		GBX.surfaceEdges.name = 'GBX.surfaceEdges';

		for ( let i = 0; i < polyloops.length; i++ ) {

			const material = new THREE.MeshPhongMaterial( { color: GBX.colors[ surfaces[ i ].surfaceType ], side: 2, opacity: 0.85, transparent: true } );

			const shape = GBX.drawShapeSinglePassObjects( polyloops[ i ], material, openings[ i ] );
			shape.userData.data = surfaces[ i ];
			shape.castShadow = shape.receiveShadow = true;
			GBX.surfaceMeshes.add( shape );

			const edgesGeometry = new THREE.EdgesGeometry( shape.geometry );
			const surfaceEdge = new THREE.LineSegments( edgesGeometry, new THREE.LineBasicMaterial( { color: 0x888888 } ) );
			surfaceEdge.rotation.copy( shape.rotation );
			surfaceEdge.position.copy( shape.position );
			GBX.surfaceEdges.add( surfaceEdge );

		}

		THR.scene.add( GBX.surfaceMeshes, GBX.surfaceEdges );

		GBX.zoomObjectBoundingSphere( GBX.surfaceMeshes );

		GBX.spacesJson = GBX.gbjson.Campus.Building.Space;

		let txt = '<option>none</option>';

		//if ( GBX.spaces.length ) {
		for ( let space of GBX.spacesJson ) {

			txt += '<option>' + space.id + '</option>';

		}
		//}

		//console.log( 'GBX.spaceOptions', GBX.spaceOptions);

		GBX.spacesOptions = txt;

		txt = '';
		for ( let surface of GBX.surfaceJson ) {

			txt += '<option>' + surface.id + '</option>';

		}

		GBX.surfacesOptions = txt;

		var arr= [];
		for ( let surface of GBX.surfaceJson ) {

			arr.push( '<option>' + surface.CADObjectId + '</option>' );

		}

		GBX.surfacesCadObj = arr.sort().join();

//		console.log( 'GBX.surfacesCadObj', GBX.surfacesCadObj);

		GBX.surfacesXml = GBX.gbxml.getElementsByTagName("Surface");

	}



	GBX.getPoints = function( polyloop ) {

		const points = [];

		for ( let CartesianPoint of polyloop.CartesianPoint ) {

			const point = new THREE.Vector3().fromArray( CartesianPoint.Coordinate );

			points.push( point );

		}

		return points;

	}



	GBX.drawShapeSinglePassObjects = function( vertices, material, holes ) {

		// let there be simpler ways to do this

		const v0 = vertices[ 0 ];
		const v1 = vertices[ 1 ]
		const v2 = vertices[ 2 ];

		let plane = new THREE.Plane().setFromCoplanarPoints ( v0, v1, v2 );

		if ( plane.constant === 0 ) { // check for errors in gbXML vertices

			if ( v0.x === v1.x && v1.x === v2.x ) {
				plane = new THREE.Plane().setFromCoplanarPoints ( v1, v2, vertices[ 3 ] );
			}

			if ( v0.y === v1.y && v1.y === v2.y ) {
				plane = new THREE.Plane().setFromCoplanarPoints ( v1, v2, vertices[ 3 ] );
			}

			if ( v0.x=== v1.x && v0.y === v1.y ) {
				plane = new THREE.Plane().setFromCoplanarPoints ( v1, v2, vertices[ 3 ] );
			}

			if ( v1.x=== v2.x && v1.y === v2.y ) {
				plane = new THREE.Plane().setFromCoplanarPoints ( v0, v1, vertices[ 3 ] );
			}

		}

		const obj = new THREE.Object3D();
		obj.lookAt( plane.normal );

		const obj2 = new THREE.Object3D();
		obj2.quaternion.copy( obj.clone().quaternion.conjugate() );
		obj2.updateMatrixWorld( true );


		for ( let vertex of vertices ) {

			obj2.localToWorld( vertex );

		}


		const shape = new THREE.Shape( vertices );

		shape.autoClose = true;

		for ( let verticesHoles of holes ) {

			for ( let vertex of verticesHoles ) {

				obj2.localToWorld( vertex );

			}

			const hole = new THREE.Path();

			hole.setFromPoints( verticesHoles );

			shape.holes.push( hole );

		}

		const geometryShape = new THREE.ShapeGeometry( shape );

		let shapeMesh = new THREE.Mesh( geometryShape, material );
		shapeMesh.quaternion.copy( obj.quaternion );
		shapeMesh.position.copy( plane.normal.multiplyScalar( - plane.constant ) );

		return shapeMesh;

	}



	GBX.zoomObjectBoundingSphere = function( obj ) {

		const renderer = THR.renderer;
		const scene = THR.scene;
		const camera = THR.camera;
		const controls = THR.controls;
		const lightDirectional = THR.lightDirectional;
		const lightPoint = THR.lightPoint;
		const axesHelper = THR.axesHelper;

		if ( obj.geometry ) {
			// might not be necessary

			obj.geometry.computeBoundingSphere();
			const center = obj.geometry.boundingSphere.center;
			const radius = obj.geometry.boundingSphere.radius;

		} else {

			const bbox = new THREE.Box3().setFromObject( obj );
			const sphere = bbox.getBoundingSphere();
			center = sphere.center;
			radius = sphere.radius;

		}

		obj.userData.center = center;
		obj.userData.radius = radius;

		controls.target.copy( center );
		controls.maxDistance = 5 * radius;

		camera.position.copy( center.clone().add( new THREE.Vector3( 1.0 * radius, - 1.0 * radius, 1.0 * radius ) ) );

		axesHelper.scale.set( radius, radius, radius );
		axesHelper.position.copy( center );

		camera.far = 10 * radius; //2 * camera.position.length();
		camera.updateProjectionMatrix();

		lightDirectional.position.copy( center.clone().add( new THREE.Vector3( 1.5 * radius, 1.5 * radius, 1.5 * radius ) ) );
		lightDirectional.shadow.camera.scale.set( 0.2 * radius, 0.2 * radius, 0.01 * radius );
		lightDirectional.target = axesHelper;

		//		scene.remove( cameraHelper );
		//		cameraHelper = new THREE.CameraHelper( lightDirectional.shadow.camera );
		//		scene.add( cameraHelper );

	}



	GBX.setAllVisible = function() {

		const renderer = THR.renderer;
		const scene = THR.scene;
		let camera = THR.camera;
		let controls = THR.controls;
		const lightPoint = THR.lightPoint;

		GBX.surfaceMeshes.visible = true;

		document.body.style.backgroundImage = '';
		divLog.innerHTML = '';

		for ( let child of GBX.surfaceMeshes.children ) {

			if ( !child.userData.data ) { continue; }

			child.material = new THREE.MeshPhongMaterial( {
				color: GBX.colors[ child.userData.data.surfaceType ], side: 2, opacity: 0.85, transparent: true }
			);
			child.material.wireframe = false;
			child.visible = true;

		};

		GBX.surfaceEdges.visible = true;

		for ( let child of GBX.surfaceEdges.children ) {

			//child.material.opacity = 0.85;
			child.material.wireframe = false;

		};

		camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 10000 );
		camera.up.set( 0, 0, 1 );

		controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.autoRotate = true;

		camera.add( lightPoint );
		scene.add( camera );

	}

	*/
