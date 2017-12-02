
console.log( '', 23 );

	var divAppMenu = divAppMenu || undefined;

//	var icw = icw || undefined;
//	var opacity = opacity ;
	var cameraOrtho = cameraOrtho || undefined;

	var surfaceEdges;


	init();


	function init() {

		if ( !divAppMenu ) {

			divAppMenu= document.body.appendChild( document.createElement( 'div' ) );
			divAppMenu.style.cssText = 'background-color: white; border: 1px solid red; max-width: 350px; opacity: 0.85; ' +
				' padding: 10px; position: fixed; right: 30px; top: 20px; z-index:100000; ';

		}

		icw = ifrThree.contentWindow;

		divAppMenu.innerHTML =

		'<div id = "divMenuItems" ></div>' +

			'<p><button onclick=setRandomMaterial(); >Set random material</button></p>' +

			'<p><button onclick=drawSurfaceNormals(); > Draw surface normals </button></p>' +

			'<p><button onclick=toggleWireframe(); > Toggle wireframe </button></p>' +

			'<p><button onclick=toggleEdges(); >Draw edges </button></p>' +

//			<p><button onclick=toggleGrid(); >Toggle grid</button></p>

			'<p><button onclick=toggleAxesHelper(); >Toggle axes</button></p>' +

			'<p><button onclick=toggleBackgroundGradient(); > Toggle background gradient </button></p>' +

			'<p><button onclick=toggleSceneAutoRotate() title= "Stop the spinning!" > Toggle scene rotation </button></p>' +

			'<p><button onclick=setCameraOrthoPerspective() title="" > Set Camera Ortho </button></p>' +

			'<p title="building opacity: 0 to 100%" >Opacity: ' +
				'<output id=outOpacity class=floatRight >85%</output>' +
				'<input type="range" id="rngOpacity" min=0 max=100 step=1 value=85 oninput=updateOpacity(); >' +
			'</p>';


	}



	function updateOpacity() {

		opacity = parseInt( rngOpacity.value, 10 );
		outOpacity.value = opacity + '%';

		icw.scene.traverse( function ( child ) {

			if ( child instanceof icw.THREE.Mesh ) {

				child.material.opacity = opacity / 100;

			}

		} );


	}



	function toggleWireframe() {

		icw.scene.traverse( function ( child ) {

			if ( child instanceof icw.THREE.Mesh ) {

				child.material.wireframe = !child.material.wireframe;

			}

		} );

	}


	function setRandomMaterial() {

		THREE = icw.THREE;

		if ( !surfaceEdges ) {

//			meshesEdges = new THREE.Object3D();
			icw.campusSurfaces.traverse( function ( child ) {

				if ( child instanceof THREE.Mesh ) {

					child.material = new THREE.MeshPhongMaterial( {
						color: 0xffffff * Math.random(),
						polygonOffset: false,
						polygonOffsetFactor: 10, // positive value pushes polygon further away
						polygonOffsetUnits: 1,
						side: 2
					} );

				}

			} );

//			scene.add( meshesEdges );

		}

	}



	function drawSurfaceNormals() {

		icw.campusSurfaces.traverse( function ( child ) {

			if ( child instanceof icw.THREE.Mesh ) {

				helperNormalsFaces = new icw.THREE.FaceNormalsHelper( child, 2, 0xff00ff, 3 );
				icw.scene.add( helperNormalsFaces );

			}

		} );

	}


	function toggleEdges() {

		THREE = icw.THREE;

		if ( !surfaceEdges ) {

//			meshesEdges = new THREE.Object3D();
			icw.campusSurfaces.traverse( function ( child ) {

				if ( child instanceof THREE.Mesh ) {

					const edgesGeometry = new THREE.EdgesGeometry( child.geometry );
					let surfaceEdges = new THREE.LineSegments( edgesGeometry, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
					surfaceEdges.visible = false;

					child.add( surfaceEdges );

				}

			} );

//			scene.add( meshesEdges );

		}


		icw.campusSurfaces.traverse( function ( child ) {

			if ( child instanceof THREE.LineSegments ) {

				child.visible = child.visible === true ? false : true;

			}

		} );

	}




	function toggleBackgroundGradient() {

// 2016-07-18

		var col = function() { return ( 0.5 + 0.5 * Math.random() ).toString( 16 ).slice( 2, 8 ); };
		var pt = function() { return ( Math.random() * window.innerWidth ).toFixed( 0 ); }
		var image = document.body.style.backgroundImage;

		document.body.style.backgroundImage = image ? '' : 'radial-gradient( circle farthest-corner at ' +
			pt() + 'px ' + pt() + 'px, #' + col() + ' 0%, #' + col() + ' 50%, #' + col() + ' 100% ) ';

	}


	function toggleAxesHelper() {

		icw.axesHelper.visible = !icw.axesHelper.visible;

	}


	function toggleSceneAutoRotate() {

		icw.controls.autoRotate = !icw.controls.autoRotate;

	}



	function setCameraOrthoPerspective() {

		if ( !cameraOrtho ) {

			const width = 300;
			const height = 300;
			cameraOrtho = new icw.THREE.OrthographicCamera( width / -3, width / 3, height / 3, height / - 3, 1, 1000 );
			cameraOrtho.up.set( 0, 0, 1 );
			icw.scene.add( cameraOrtho );
			controlsOrtho = new icw.THREE.OrbitControls( cameraOrtho, icw.renderer.domElement );

		}

		icw.camera = cameraOrtho;
		icw.camera.updateProjectionMatrix();
		icw.controls = controlsOrtho;

		icw.zoomObjectBoundingSphere( icw.campusSurfaces )

	}
