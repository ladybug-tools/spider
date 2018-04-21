// Copyright 2018 Ladybug Tools authors. MIT License

	var GBP = {};

	GBP.gbxml = null;
	GBP.gbxmlResponseXML;
	GBP.gbjson;

	GBP.surfaceJson = null;
	GBP.surfaceMeshes;
	GBP.surfaceEdges;
	GBP.surfaceOpenings;

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


	GBP.requestFile = function( url, callback ) {

		const xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', url, true );
		xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
		xhr.onprogress = onRequestFileProgress;
		xhr.onload = callback;
		xhr.send( null );

		function onRequestFileProgress( xhr ) {

			//console.log( 'xhr', xhr );

			GBP.fileAttributes = { name: xhr.target.responseURL.split( '/').pop() };
			divLog.innerHTML = GBP.fileAttributes.name + '<br>bytes loaded: ' + xhr.loaded.toLocaleString() + ' of ' + xhr.total.toLocaleString() ;

		}

	}



	GBP.openFile = function( files ) {

		var fileData, reader, data;

		reader = new FileReader();

		reader.onload = function( event ) {

			console.log( 'event', event );

			if ( files.files[0].name.toLowerCase().endsWith( '.xml' ) ) {

				GBP.openGbxmlFile( files );

			} else {

				console.log( 'oops files', files );

			}

			divLog.innerHTML =
				'name: ' + files.files[0].name + '<br>' +
				'size: ' + files.files[0].size.toLocaleString() + ' bytes<br>' +
				'type: ' + files.files[0].type + '<br>' +
				'modified: ' + files.files[0].lastModifiedDate.toLocaleDateString() +
			'';

			console.log( '', files );

		}

		reader.readAsText( files.files[0] );

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
				//( event.lengthComputable ? ' of ' + event.total.toLocaleString() : '' ) +
			'';

		}

	};


	// loads any text file - from file reader or location hash or wherever

	GBP.parseFileXML = function( xmlNode ) {

		GBP.gbjson = GBP.XML2jsobj( xmlNode );
		GBP.surfaceJson = GBP.gbjson.Campus.Surface;
		//console.log( 'GBP.gbjson', GBP.gbjson );

		GBP.parseGbJson( GBP.gbjson );

		GBP.zoomObjectBoundingSphere( GBP.surfaceMeshes );

		THR.onWindowLoad();

		return GBP.gbjson;

	};


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

	};



	GBP.parseGbJson = function() {

		//console.log( 'surfaces', gbjson.Campus.Surface );

		const surfaces = GBP.surfaceJson; // gbjson.Campus.Surface;
		const polyloops = [];
		const openings = [];

		// fork into separate clean-up function
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

		for ( let i = 0; i < polyloops.length; i++ ) {

			const material = new THREE.MeshPhongMaterial( {
				color: GBP.colors[ surfaces[ i ].surfaceType ], side: 2, opacity: 0.85, transparent: true } );

			const shape = GBP.drawShapeSinglePassObjects( polyloops[ i ], material, openings[ i ] );

			shape.userData.data = surfaces[ i ];
			shape.castShadow = shape.receiveShadow = true;
			GBP.surfaceMeshes.add( shape );

			const edgesGeometry = new THREE.EdgesGeometry( shape.geometry );
			const surfaceEdge = new THREE.LineSegments( edgesGeometry, new THREE.LineBasicMaterial( { color: 0x888888 } ) );
			surfaceEdge.rotation.copy( shape.rotation );
			surfaceEdge.position.copy( shape.position );
			GBP.surfaceEdges.add( surfaceEdge ); // or add to surfaces??

		}


		GBP.getOpenings();

		THR.scene.add( GBP.surfaceMeshes, GBP.surfaceEdges );

	};


	GBP.getOpenings = function() {

		GBP.surfacesExteriorWall = GBP.surfaceJson.filter( element => element.surfaceType === 'ExteriorWall' );
		//console.log( 'GBP.surfacesExteriorWall', GBP.surfacesExteriorWall );
		//		GBP.surfacesExteriorWallArea = GBP.getSurfacesArea( GBP.surfacesExteriorWall );

		GBP.SurfacesWithOpenings = GBP.surfacesExteriorWall.filter( surface => surface.Opening );
		//console.log( 'GBP.SurfacesWithOpenings', GBP.SurfacesWithOpenings );

		GBP.openings = [];

		for ( surface of GBP.SurfacesWithOpenings ) {

			if ( surface.Opening.length ) {

				GBP.openings.push ( ...surface.Opening );

			} else {

				GBP.openings.push ( surface.Opening );

			}

			//if ( surface.Opening.length ) { console.log( 'surface.Opening.length', surface.Opening.length ); }

		}
		//console.log( 'GBP.openings', GBP.openings );

		//GBP.openingsArea = 0;

		var material = new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.1, side: 2, transparent: true } );
		GBP.openingMeshes = new THREE.Object3D();

		for ( opening of GBP.openings ) {
			//console.log( 'opening', opening.PlanarGeometry.PolyLoop );

			const points = opening.PlanarGeometry.PolyLoop.CartesianPoint.map( CartesianPoint => new THREE.Vector3().fromArray( CartesianPoint.Coordinate ) )
			//console.log( 'points', points );

			const triangle = GBP.getPlane( points );
			//console.log( 'triangle', triangle.normal() );
			if ( !triangle ) { console.log( 'surface error', opening ); continue; };

			const obj = new THREE.Object3D();
			obj.lookAt( triangle.normal );  // copy the rotation of the triangle
			const obj2 = new THREE.Object3D();
			obj2.lookAt( triangle.normal );
			obj2.quaternion.conjugate();
			obj2.updateMatrixWorld();

			points.map( point => obj2.localToWorld( point ) );
			//console.log( 'points', points );

			area = THREE.ShapeUtils.area( points );
			//GBP.openingsArea += area
			//console.log( 'area', THREE.ShapeUtils.area( points ) );

			shape = new THREE.Shape( points );
			//console.log( '', shape );
			shape.autoClose = true;

			const geometryShape = new THREE.ShapeGeometry( shape );

			let shapeMesh = new THREE.Mesh( geometryShape, material );
			shapeMesh.lookAt( triangle.normal ); // quaternion.copy( obj.quaternion );
			shapeMesh.position.copy( triangle.normal.multiplyScalar( - triangle.constant ) );
			shapeMesh.userData.data = opening;
			shapeMesh.userData.area = area

			GBP.openingMeshes.add( shapeMesh );

		}

		GBP.openingMeshes.name = 'openingMeshes';

		THR.scene.add( GBP.openingMeshes );
		//console.log( 'GBP.openingMeshes', GBP.openingMeshes );



	}


	GBP.getPoints = function( polyloop ) {

		return points = polyloop.CartesianPoint.map( CartesianPoint => new THREE.Vector3().fromArray( CartesianPoint.Coordinate ) )

	};



	GBP.drawShapeSinglePassObjects = function( vertices, material, holes ) {

		const plane = GBP.getPlane( vertices );

		const obj = new THREE.Object3D();
		obj.lookAt( plane.normal );  // copy the rotation of the triangle
		obj.quaternion.conjugate();
		obj.updateMatrixWorld();

		vertices.map( vertex => obj.localToWorld( vertex ) );

		const shape = new THREE.Shape( vertices );
		//shape.autoClose = true;

		for ( let verticesHoles of holes ) {

			const hole = new THREE.Path();

			verticesHoles.map( vertex => obj.localToWorld( vertex ) );

			hole.setFromPoints( verticesHoles );

			shape.holes.push( hole );

		}

		const geometryShape = new THREE.ShapeGeometry( shape );

		// material to here
		const shapeMesh = new THREE.Mesh( geometryShape, material );

		shapeMesh.lookAt( plane.normal );
		shapeMesh.position.copy( plane.normal.multiplyScalar( - plane.constant ) );

		return shapeMesh;

	};



	GBP.getPlane = function( points, start = 0 ) {

		const triangle = new THREE.Triangle();
		triangle.set( points[ start ], points[ start + 1 ], points[ start + 2 ] );
		const pl = new THREE.Plane();
		GBP.plane = triangle.plane( pl );

		//if ( triangle.area() != 0 ) {

			/*
			if ( start > 1 ) {
				console.log( 'start', start );
				console.log( 'triangle', triangle );
				console.log( 'area', triangle.area() );
				console.log( 'normal', triangle.normal() );
				pl.normal.y = 0;
				console.log( 'plane', pl );
			}
			*/
			//return plane;

		//} else

		if ( triangle.area() === 0 ) {

			start++;
			GBP.getPlane( points, start );

		}

		return GBP.plane;

	};



	GBP.zoomObjectBoundingSphere = function( obj ) {

		const bbox = new THREE.Box3().setFromObject( obj );
		GBP.boundingBox = bbox;

		const sphere = bbox.getBoundingSphere();
		const center = sphere.center;
		const radius = sphere.radius;

		THR.controls.target.copy( center );
		THR.controls.maxDistance = 5 * radius;

		THR.camera.position.copy( center.clone().add( new THREE.Vector3( 1.0 * radius, - 1.0 * radius, 1.0 * radius ) ) );
		THR.camera.far = 10 * radius; //2 * camera.position.length();
		THR.camera.updateProjectionMatrix();

		THR.lightDirectional.position.copy( center.clone().add( new THREE.Vector3( -1.5 * radius, -1.5 * radius, 1.5 * radius ) ) );
		THR.lightDirectional.shadow.camera.scale.set( 0.2 * radius, 0.2 * radius, 0.01 * radius );
		THR.lightDirectional.target = THR.axesHelper;

		THR.axesHelper.scale.set( radius, radius, radius );
		THR.axesHelper.position.copy( center );

		obj.userData.center = center;
		obj.userData.radius = radius;

		//		scene.remove( cameraHelper );
		//		cameraHelper = new THREE.CameraHelper( lightDirectional.shadow.camera );
		//		scene.add( cameraHelper );

	};



	GBP.setAllVisible = function() {

		GBP.surfaceEdges.visible = true;
		GBP.surfaceMeshes.visible = true;
		GBP.openingMeshes.visible = true;

		for ( let child of GBP.surfaceMeshes.children ) {

			if ( !child.material ) { continue; }

			child.material = new THREE.MeshPhongMaterial( {
				color: GBP.colors[ child.userData.data.surfaceType ], side: 2, opacity: 0.85, transparent: true }
			);
			child.material.wireframe = false;
			child.visible = true;

		};

		GBP.openingMeshes.visible = true;

		for ( let child of GBP.openingMeshes.children ) {

			if ( !child.material ) { continue; }

			child.material = new THREE.MeshPhongMaterial( {
				color: 0x000000, side: 2, opacity: 0.1, transparent: true }
			);
			child.material.wireframe = false;
			child.visible = true;

		};

		//for ( let child of GBP.surfaceEdges.children ) {

			//child.material.opacity = 0.85;
			//child.material.wireframe = false;

		//};

		document.body.style.backgroundImage = '';
		divLog.innerHTML = '';

	};
