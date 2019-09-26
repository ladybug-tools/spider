// Copyright 2018 Ladybug Tools authors. MIT License

	var GBX = {};

	GBX.gbxml = null;
	GBX.gbxmlResponseXML;
	GBX.gbjson;

	GBX.surfaceJson = null;
	GBX.surfaceMeshes;
	GBX.surfaceEdges;

	GBX.colorsDefault = {

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

	GBX.colors = Object.assign({}, GBX.colorsDefault );

	GBX.surfaceTypes  = Object.keys( GBX.colors );

	txt = '';

	for ( let type of GBX.surfaceTypes ) {

		txt += '<option>' + type + '</option>';

	}

	GBX.surfaceTypeOptions = txt;



	GBX.initTemplate = function () {

		if ( butGbx.style.backgroundColor !== 'var( --but-bg-color )' ) {

			divMenuItems.innerHTML =

				`<details id = detTemplate  class=app-menu open>

					<summary>Template</summary>

					<div id = "divTemplate" ><div>

					<hr>

				</details>

			` + divMenuItems.innerHTML;

			initMenuTemplate();

			butGbx.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			detTemplate.remove();

			butGbx.style.backgroundColor = '';

		}

		function initMenuTemplate() {

			txt = 'lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?';

			divTemplate.innerHTML = '<p>' + txt + '<p>';

		}

	};



	GBX.callbackGbXML = function( xhr ) {

		GBX.gbxmlResponseXML =  xhr.target.responseXML;
		GBX.gbxml = xhr.target.responseXML.documentElement;

		GBX.parseFileXML( GBX.gbxml );

	};



	GBX.openGbxmlFile = function( files ) {

		//console.log( 'file', files.files[ 0 ] );

		//COR.timeStart = Date.now();

		GBX.fileAttributes = files.files[ 0 ];

		const reader = new FileReader();
		reader.onprogress = onRequestFileProgress;
		reader.onload = function( event ) {

			const parser = new DOMParser();

			GBX.gbxmlResponseXML = parser.parseFromString( reader.result, "text/xml" );
			//console.log( 'gbxmlResponseXML2', gbxmlResponseXML2 );

			GBX.gbxml = GBX.gbxmlResponseXML.children[ 0 ];
			//console.log( 'GBX.gbxml', GBX.gbxml );

			GBX.gbjson = GBX.parseFileXML( GBX.gbxml );
			//GBX.surfaceJson = GBX.gbjson.Campus.Surface;

			if ( files.files[ 0 ] ) { GBX.gbjson.name = files.files[ 0 ].name; }

		}

		reader.readAsText( files.files[ 0 ] );

		function onRequestFileProgress( event ) {

			divLog.innerHTML =
				GBX.fileAttributes.name + ' bytes loaded: ' + event.loaded.toLocaleString() +
		//				( event.lengthComputable ? ' of ' + event.total.toLocaleString() : '' ) +
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

	};


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

	};



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

			if ( points.length ) {

				polyloops.push( points );

			} else {

				console.log( 'faulty surface', surface );
				divLog.innerHTML += '<br>faulty surface: ' + surface.id + ' - see JavaScript console for details<br>';
			}

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

		// Do the following in HUD in R13
		GBX.spacesJson = GBX.gbjson.Campus.Building.Space;

		let spacesOptions = '<option>none</option>';

		if ( Array.isArray( GBX.spacesJson ) ) {
		//if ( GBX.spacesJson ) {

			for ( let space of GBX.spacesJson ) {

				spacesOptions += '<option>' + space.id + '</option>';

			}

		} else {

			spacesOptions += '<option>' + GBX.spacesJson.id + '</option>';

		}

		GBX.spacesOptions = spacesOptions;
		//console.log( 'GBX.spaceOptions', GBX.spaceOptions);


		let surfacesOptions = '';

		for ( let surface of GBX.surfaceJson ) {

			surfacesOptions += '<option>' + surface.id + '</option>';

		}

		GBX.surfacesOptions = surfacesOptions;

		const cadIdOptions = [];

		for ( let surface of GBX.surfaceJson ) {

			cadIdOptions.push( '<option>' + surface.CADObjectId + '</option>' );

		}


		GBX.surfacesCadObj = cadIdOptions.sort().join();

		//		console.log( 'GBX.surfacesCadObj', GBX.surfacesCadObj);

		GBX.surfacesXml = GBX.gbxml.getElementsByTagName("Surface");

		//divLog.innerHTML += '<br>time in milliseconds to load: ' + ( Date.now() - COR.timeStart );

	};



	GBX.getPoints = function( polyloop ) {

		const points = [];

		if ( Array.isArray( polyloop.CartesianPoint ) ) {

			for ( let CartesianPoint of polyloop.CartesianPoint ) {

				const point = new THREE.Vector3().fromArray( CartesianPoint.Coordinate );

				points.push( point );

			}

		} else {

			console.log( 'faulty polyloop', polyloop);

		}

		return points;

	};



	GBX.drawShapeSinglePassObjects = function( vertices, material, holes ) {

		// let there be simpler ways to do this

		const v0 = vertices[ 0 ];
		const v1 = vertices[ 1 ]
		const v2 = vertices[ 2 ];
		const vNth = vertices[ vertices.length - 1 ];

		let plane = new THREE.Plane().setFromCoplanarPoints ( v0, v1, v2 );

		if ( plane.constant === 0 ) { // check for errors in gbXML vertices

			if ( v0.x === v1.x && v1.x === v2.x ) {
				plane = new THREE.Plane().setFromCoplanarPoints ( v1, v2, vNth );
			}

			if ( v0.y === v1.y && v1.y === v2.y ) {
				plane = new THREE.Plane().setFromCoplanarPoints ( v1, v2, vNth );
			}

			if ( v0.x=== v1.x && v0.y === v1.y ) {
				plane = new THREE.Plane().setFromCoplanarPoints ( v1, v2, vNth );
			}

			if ( v1.x=== v2.x && v1.y === v2.y ) {
				plane = new THREE.Plane().setFromCoplanarPoints ( v0, v1, vNth );
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

	};


	// GBX.setAllVisible();GBV.zoomObjectBoundingSphere(GBX.surfaceMeshes);
	GBX.zoomObjectBoundingSphere = function( obj ) {

		/*
		const renderer = THR.renderer;
		const scene = THR.scene;
		const camera = THR.camera;
		const controls = THR.controls;
		const lightDirectional = THR.lightDirectional;
		const lightPoint = THR.lightPoint;
		const axesHelper = THR.axesHelper;
		*/

		if ( obj.geometry ) {
			// might not be necessary

			obj.geometry.computeBoundingSphere();
			const center = obj.geometry.boundingSphere.center;
			const radius = obj.geometry.boundingSphere.radius;

		} else {

			const bbox = new THREE.Box3().setFromObject( obj );
			const sphere = bbox.getBoundingSphere( new THREE.Sphere() );
			//GBX.boundingBox = bbox;
			center = sphere.center;
			radius = sphere.radius;

		}

		obj.userData.center = center;
		obj.userData.radius = radius;

		THR.controls.target.copy( center );
		THR.controls.maxDistance = 5 * radius;

		THR.camera.position.copy( center.clone().add( new THREE.Vector3( 1.0 * radius, - 1.0 * radius, 1.0 * radius ) ) );

		THR.axesHelper.scale.set( radius, radius, radius );
		THR.axesHelper.position.copy( center );

		THR.camera.far = 10 * radius; //2 * camera.position.length();
		THR.camera.updateProjectionMatrix();

		THR.lightDirectional.position.copy( center.clone().add( new THREE.Vector3( 1.5 * radius, 1.5 * radius, 1.5 * radius ) ) );
		THR.lightDirectional.shadow.camera.scale.set( 0.2 * radius, 0.2 * radius, 0.01 * radius );
		THR.lightDirectional.target = THR.axesHelper;

		//		scene.remove( cameraHelper );
		//		cameraHelper = new THREE.CameraHelper( lightDirectional.shadow.camera );
		//		scene.add( cameraHelper );

	}



	GBX.setAllVisible = function() {
		/*
		const renderer = THR.renderer;
		const scene = THR.scene;
		let camera = THR.camera;
		let controls = THR.controls;
		const lightPoint = THR.lightPoint;
		*/

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

		HUD.removeTelltales();

		/*
				THR.camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 10000 );
				THR.camera.up.set( 0, 0, 1 );

				THR.controls = new THREE.OrbitControls( THR.camera, THR.renderer.domElement );
				// THR.controls.autoRotate = true;

				THR.camera.add( THR.lightPoint );
				THR.scene.add( THR.camera );
		*/

	}
