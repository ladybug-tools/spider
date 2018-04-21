// Copyright 2018 Ladybug Tools authors. MIT License

	var GBP = {};

	GBP.gbxml = null;
	GBP.gbxmlResponseXML;
	GBP.gbjson;

	GBP.surfaceJson = null;
	GBP.surfaceMeshes;
	GBP.surfaceEdges;

	GBP.colorsDefault = {

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

	GBP.colors = Object.assign({}, GBP.colorsDefault );

	GBP.surfaceTypes  = Object.keys( GBP.colors );



	GBP.ZZZinitTemplate = function () {

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



	GBP.zzzrequestFile = function( url ) {

		const xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', url, true );
		xhr.onerror = function( xhr ) { console.log( 'error', xhr  ); };
		xhr.onload = GBP.callbackGbXML;
		xhr.send( null );

	}



	GBP.callbackGbXML = function( xhr ) {

		GBP.gbxmlResponseXML =  xhr.target.responseXML;
		GBP.gbxml = xhr.target.responseXML.documentElement;

		GBP.parseFileXML( GBP.gbxml );

	};



	GBP.openGbxmlFile = function( files ) {

		//console.log( 'file', files.files[ 0 ] );

		GBP.fileAttributes = files.files[ 0 ];

		const reader = new FileReader();
		reader.onprogress = onRequestFileProgress;
		reader.onload = function( event ) {

			const parser = new DOMParser();

			GBP.gbxmlResponseXML = parser.parseFromString( reader.result, "text/xml" );
			//console.log( 'gbxmlResponseXML2', gbxmlResponseXML2 );

			GBP.gbxml = GBP.gbxmlResponseXML.children[ 0 ];
			//console.log( 'GBP.gbxml', GBP.gbxml );

			GBP.gbjson = GBP.parseFileXML( GBP.gbxml );
			//GBP.surfaceJson = GBP.gbjson.Campus.Surface;

			if ( files.files[ 0 ] ) { GBP.gbjson.fileName = files.files[ 0 ].name; }

		}

		reader.readAsText( files.files[ 0 ] );

		function onRequestFileProgress( event ) {

			divLog.innerHTML =
				GBP.fileAttributes.name + ' bytes loaded: ' + event.loaded.toLocaleString() +
		//				( event.lengthComputable ? ' of ' + event.total.toLocaleString() : '' ) +
			'';

		}

	};


	// loads any text file - from file reader or location hash or wherever

	GBP.parseFileXML = function( xmlNode ) {

		GBP.gbjson = GBP.XML2jsobj( xmlNode );
		GBP.surfaceJson = GBP.gbjson.Campus.Surface;
		//console.log( 'GBP.gbjson', GBP.gbjson );

		GBP.parseGbJson( GBP.gbjson );

		THR.onWindowLoad();

		console.log( 'r12 parseFileXML', Date.now() - timeStart );

		return GBP.gbjson;



	}


	// https://www.sitepoint.com/how-to-convert-xml-to-a-javascript-object/
	// http://blogs.sitepointstatic.com/examples/tech/xml2json/index.html

	GBP.XML2jsobj = function( node ) {

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

					Add( childNode.nodeName, GBP.XML2jsobj( childNode ) );

				}

			}

		}

		return data;

	}



	GBP.parseGbJson = function( gbjson ) {

		//console.log( 'surfaces', gbjson.Campus.Surface );

		const surfaces = GBP.surfaceJson; // gbjson.Campus.Surface;
		const polyloops = [];
		const openings = [];

		for ( let surface of surfaces ) {

			if ( surface.Opening ) {

				if ( surface.Opening.PlanarGeometry ) {

					const polyloop = surface.Opening.PlanarGeometry.PolyLoop;
					const points = GBP.getPoints( polyloop );
					openings.push( [ points ] );

				} else { // undefined === array of openings

					const arr = [];

					for ( let opening of surface.Opening ) {

						const polyloop = opening.PlanarGeometry.PolyLoop;
						const points = GBP.getPoints( polyloop );
						arr.push( points );

					}

					openings.push( arr );

				}

			} else {

				openings.push( [] );

			}

			const polyloop = surface.PlanarGeometry.PolyLoop;

			const points = GBP.getPoints( polyloop );

			polyloops.push( points );

		}

		THR.scene.remove( GBP.surfaceMeshes, GBP.surfaceEdges, GBP.surfaceOpenings );

		if ( GBP.surfaceMeshes ) {

			GBP.surfaceMeshes.traverse( function ( child ) {

				if ( child.geometry ) {

					child.geometry.dispose();
					child.material.dispose();

				}

				if ( child.texture ) { child.texture.dispose(); }

			} );

		}

		if ( GBP.surfaceEdges ) {

			GBP.surfaceEdges.traverse( function ( child ) {

				if ( child.geometry ) {

					child.geometry.dispose();
					child.material.dispose();

				}

			} );

		}

		if ( GBP.surfaceOpenings ) {

			GBP.surfaceOpenings.traverse( function ( child ) {

				if ( child.geometry ) {

					child.geometry.dispose();
					child.material.dispose();

				}

			} );

		}


		GBP.surfaceMeshes = new THREE.Object3D();
		GBP.surfaceMeshes.name = 'GBP.surfaceMeshes';

		GBP.surfaceEdges = new THREE.Object3D();
		GBP.surfaceEdges.name = 'GBP.surfaceEdges';

		GBP.surfaceOpenings = new THREE.Object3D();
		GBP.surfaceOpenings.name = 'GBP.surfaceOpenings';

		for ( let i = 0; i < polyloops.length; i++ ) {

			const material = new THREE.MeshPhongMaterial( { color: GBP.colors[ surfaces[ i ].surfaceType ], side: 2, opacity: 0.85, transparent: true } );

			const shape = GBP.drawShapeSinglePassObjects( polyloops[ i ], material, openings[ i ] );
			shape.userData.data = surfaces[ i ];
			shape.castShadow = shape.receiveShadow = true;
			GBP.surfaceMeshes.add( shape );

			const edgesGeometry = new THREE.EdgesGeometry( shape.geometry );
			const surfaceEdge = new THREE.LineSegments( edgesGeometry, new THREE.LineBasicMaterial( { color: 0x888888 } ) );
			surfaceEdge.rotation.copy( shape.rotation );
			surfaceEdge.position.copy( shape.position );
			GBP.surfaceEdges.add( surfaceEdge );

		}

		THR.scene.add( GBP.surfaceMeshes, GBP.surfaceEdges );

		GBP.zoomObjectBoundingSphere( GBP.surfaceMeshes );

		// Do the following in HUD in R13
		GBP.spacesJson = GBP.gbjson.Campus.Building.Space;

		let spacesOptions = '<option>none</option>';

		if ( GBP.spacesJson ) {

			for ( let space of GBP.spacesJson ) {

				spacesOptions += '<option>' + space.id + '</option>';

			}

		}

		GBP.spacesOptions = spacesOptions;
		//console.log( 'GBP.spaceOptions', GBP.spaceOptions);


		let surfacesOptions = '';

		for ( let surface of GBP.surfaceJson ) {

			surfacesOptions += '<option>' + surface.id + '</option>';

		}

		GBP.surfacesOptions = surfacesOptions;

		const cadIdOptions = [];

		for ( let surface of GBP.surfaceJson ) {

			cadIdOptions.push( '<option>' + surface.CADObjectId + '</option>' );

		}


		GBP.surfacesCadObj = cadIdOptions.sort().join();

		//console.log( 'GBP.surfacesCadObj', GBP.surfacesCadObj);

		GBP.surfacesXml = GBP.gbxml.getElementsByTagName("Surface");

		//divLog.innerHTML += '<br>time in milliseconds to load: ' + ( Date.now() - COR.timeStart );

		console.log( 'r12 parseGbJson', Date.now() - timeStart );

	}



	GBP.getPoints = function( polyloop ) {
		const points = [];

		for ( let CartesianPoint of polyloop.CartesianPoint ) {

			const point = new THREE.Vector3().fromArray( CartesianPoint.Coordinate );

			points.push( point );

		}

		/*
		const points = polyloop.CartesianPoint.map( CartesianPoint => new THREE.Vector3().fromArray( CartesianPoint.Coordinate ) )

		*/
		return points;

	}



	GBP.drawShapeSinglePassObjects = function( vertices, material, holes ) {

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

	}


	// GBP.setAllVisible();GBV.zoomObjectBoundingSphere(GBP.surfaceMeshes);
	GBP.zoomObjectBoundingSphere = function( obj ) {

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
			const sphere = bbox.getBoundingSphere();
			//GBP.boundingBox = bbox;
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



	GBP.setAllVisible = function() {
		/*
		const renderer = THR.renderer;
		const scene = THR.scene;
		let camera = THR.camera;
		let controls = THR.controls;
		const lightPoint = THR.lightPoint;
		*/

		GBP.surfaceMeshes.visible = true;

		document.body.style.backgroundImage = '';
		divLog.innerHTML = '';

		for ( let child of GBP.surfaceMeshes.children ) {

			if ( !child.userData.data ) { continue; }

			child.material = new THREE.MeshPhongMaterial( {
				color: GBP.colors[ child.userData.data.surfaceType ], side: 2, opacity: 0.85, transparent: true }
			);
			child.material.wireframe = false;
			child.visible = true;

		};

		GBP.surfaceEdges.visible = true;

		for ( let child of GBP.surfaceEdges.children ) {

			//child.material.opacity = 0.85;
			child.material.wireframe = false;

		};

		//HUD.removeTelltales();

		/*
				THR.camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 10000 );
				THR.camera.up.set( 0, 0, 1 );

				THR.controls = new THREE.OrbitControls( THR.camera, THR.renderer.domElement );
				// THR.controls.autoRotate = true;

				THR.camera.add( THR.lightPoint );
				THR.scene.add( THR.camera );
		*/

	}
