// Copyright 2018 Ladybug Tools authors. MIT License

	var SET = {};

	SET.localClip1= new THREE.Plane( new THREE.Vector3( -1, 0, 0 ), 0 );
	SET.localClip2= new THREE.Plane( new THREE.Vector3( 1, 0, 0 ), 0 );

//	initSettings();

	SET.initSettings = function() {

		if ( window.butMenuLoad ) {

			SET.butSettings = butMenuLoad;

			SET.title = 'gv-set - gbXML Viewer Settings';
			document.title = SET.title;
			aDocumentTitle.innerHTML = SET.title;
			SET.butSettings.innerHTML = SET.title;

		} else {

			SET.butSettings = butSettings;

		}

		if ( SET.butSettings.style.backgroundColor !== 'var( --but-bg-color )' ) {

			SET.explodeStart = false;

			divMenuItems.innerHTML =
			`
				<details id=detSettings class=app-menu open >

					<summary>Settings</summary>

					<div>
						<b>visibility toggles</b><br>
						<button onclick=GBP.surfaceMeshes.visible=!GBP.surfaceMeshes.visible; >surfaces</button>
						 <button onclick=GBP.surfaceEdges.visible=!GBP.surfaceEdges.visible; >edges</button>
						 <button onclick=GBP.setAllVisible(); >all</button>
					</div>

					<hr>

					<div>
						<b>materials settings</b><br>
						<button id=butSetRandomMaterial onclick=SET.setRandomMaterial(); >Set random material</button>

						<button onclick=SET.setPhongDefaultMaterial(); >Set default phong material</button>

						<button onclick=SET.setNormalMaterial(); >Set normal material</button>

						<button onclick=SET.setDefaultMaterial(); >Set default material</button>

						<button onclick=SET.setExposureMaterial(); >Set exposure type material</button>

						<button onclick=SET.toggleWireframe(); title="View all the triangles created by Three.js to display the geometry." > Toggle wireframe </button>
					</div>

					<div title="building opacity: 0 to 100%" >Opacity
						<output id=outOpacity class=floatRight >85%</output><br>
						<input type="range" id="rngOpacity" min=0 max=100 step=1 value=85 oninput=SET.updateOpacity(); >
					</div>

					<hr>

					<div>

						<b>scene settings</b><br>
						<button onclick=SET.toggleSceneAutoRotate() title= "Stop the spinning!" > Toggle scene rotation </button>

					<button id=butSetOrtho onclick=SET.toggleCameraOrthoPerspective(); title="" > Toggle camera ortho </button>
					</div>

					<p><button onclick=SET.toggleShadowMap(); >Toggle shadows</button>

					<button onclick=SET.toggleBackgroundGradient(); > Toggle background gradient </button>

					</p>


					<p><button onclick=SET.toggleSurfaceNormals(); title="Every Three.js triangle has a normal. See them here." > Toggle surface normals </button>

					<button onclick=SET.toggleAxesHelper(); >Toggle axes</button>

					</p>

					<div>
						<button onclick=SET.toggleGridHelper(); >Toggle grid</button>
						<button onclick=SET.updateMeshLevel("gridHelper",+0.2); >+</button>
						<button onclick=SET.updateMeshLevel("gridHelper",-0.2); >-</button>
					</div>

					<div>
						<button onclick=SET.toggleGroundHelper(); >Toggle ground</button>
						<button onclick=SET.updateMeshLevel("groundHelper",+0.2); >+</button>
						<button onclick=SET.updateMeshLevel("groundHelper",-0.2); >-</button>
					</div>

					<hr>

					<p>
						<div title="building surface separation" >
							<b>explode view</b><br>
							<div><button onclick=SET.explodeByStoreys(); >explode by storeys</button></div>

							<button onclick=SET.explodeMinus();> minus </button>
							<button onclick=SET.explodeReset(); >reset</button>
							<button onclick=SET.explodePlus();> plus </button>
						</div>

					</p>

					<div>

						<b>section view</b><br>

						<p><i>Work-in-progress</i></p>

						<div>
							<button id=butSectionView onclick=SET.toggleSectionView() >toggle section view</button>
						</div>

						clipping plane front: <output id=outClip1 >0</output><br>
						<input type=range id=inpClip1 max=50 min=-50 step=1 value=0
						oninput=outClip1.value=inpClip1.value;SET.updateCLipX(); title="-50 to 50: OK" >
					</div>


					<div>
						clipping plane back: <output id=outClip2 >-10</output><br>
						<input type=range id=inpClip2 max=50 min=-50 step=1 value=-10
						oninput=outClip2.value=inpClip2.value;SET.updateCLipX(); title="-50 to 50: OK" >
					</div>

					<!--
					<div>
					rotate section on Z-axis: <output id=outRotate >0</output><br>
					<input type=range id=inpRotate max=180 min=-180 step=1 value=1
					oninput=outRotate.value=inpRotate.valueAsNumber;SET.updateClipAngle(); title="-180 to 180: OK" >
					</div>
					-->
				</details>`

			+ divMenuItems.innerHTML;

			SET.butSettings.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			detSettings.remove();

			SET.butSettings.style.backgroundColor = '';

		}

		divContainer.style.display = 'none';
		THR.controls.autoRotate = false;
		THR.controls.keys = false;


	}();



	SET.setRandomMaterial = function() {

		GBP.surfaceMeshes.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.material = new THREE.MeshPhongMaterial( {
					color: 0xffffff * Math.random(),
					polygonOffset: false,
					polygonOffsetFactor: 10, // positive value pushes polygon further away
					polygonOffsetUnits: 1,
					side: 2,
					transparent: true
				} );

			}

		} );

	};



	SET.setPhongDefaultMaterial = function() {

		GBP.surfaceMeshes.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.material = new THREE.MeshPhongMaterial( {
					side: 2,
					transparent: true
				} );

			}

		} );

	};



	SET.setNormalMaterial = function() {

		GBP.surfaceMeshes.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.material = new THREE.MeshNormalMaterial( {
					side: 2,
					transparent: true
				} );

			}

		} );

	};



	SET.setDefaultMaterial = function() {

		GBP.surfaceMeshes.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.material =
					new THREE.MeshPhongMaterial( { color: GBP.colors[ child.userData.data.surfaceType ], side: 2, opacity: 0.85, transparent: true } );

			}

		} );

	};



	SET.setExposureMaterial = function() {

		var colorsExposure = {

			InteriorWall: 0xff8080,
			ExteriorWall: 0x80ff80,
			Roof: 0x80ff80,
			InteriorFloor: 0xff8080,
			ExposedFloor: 0x80ff80,
			Shade: 0xffb480 ,
			UndergroundWall: 0xd06800,
			UndergroundSlab: 0xd06800,
			Ceiling: 0xff8080,
			Air: 0xffff80,
			UndergroundCeiling: 0xff8080,
			RaisedFloor: 0xff8080,
			SlabOnGrade: 0xd06800,
			FreestandingColumn: 0xff8080,
			EmbeddedColumn: 0xff8080

		};

		GBP.surfaceMeshes.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh
					&& ( SET.surfaceAdjacencyDuplicates === undefined || SET.surfaceAdjacencyDuplicates.includes( child.userData.data.Name ) === false )
					&& ( SET.surfaceAdjacencyInvalids === undefined || SET.surfaceAdjacencyInvalids.includes( child.userData.data.Name ) === false )
					&& ( SET.surfaceCoordinateDuplicates === undefined || SET.surfaceCoordinateDuplicates.includes( child.userData.data.Name ) === false )

			) {

				child.material =
					new THREE.MeshPhongMaterial( { color: colorsExposure[ child.userData.data.surfaceType ], side: 2, opacity: 0.85, transparent: true } );

			}

		} );

	};


/////////////////


	SET.toggleShadowMap = function() {

		THR.renderer.shadowMap.enabled = !THR.renderer.shadowMap.enabled;

		THR.scene.traverse( function ( child ) {

				if ( child.material ) { // needed for some models / not sure why

					child.castShadow = !child.castShadow;
					child.receiveShadow = !child.receiveShadow;
					child.material.needsUpdate = true;

				}

		} );

	};



	SET.toggleBackgroundGradient = function() {

		// 2016-07-18

		var col = function() { return ( 0.5 + 0.5 * Math.random() ).toString( 16 ).slice( 2, 8 ); };
		var pt = function() { return ( Math.random() * window.innerWidth ).toFixed( 0 ); };
		var image = document.body.style.backgroundImage;

		document.body.style.backgroundImage = image ? '' : 'radial-gradient( circle farthest-corner at ' +
			pt() + 'px ' + pt() + 'px, #' + col() + ' 0%, #' + col() + ' 50%, #' + col() + ' 100% ) ';

	};



	SET.toggleWireframe = function() {

		THR.scene.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.material.wireframe = !child.material.wireframe;

			}

		} );

	};



	SET.toggleSurfaceNormals = function() {

		let helperNormalsFaces = THR.scene.getObjectByName( 'helperNormalsFaces' );

		if ( helperNormalsFaces ) {

			THR.scene.remove( helperNormalsFaces );

		}

		if ( !helperNormalsFaces ) {

			helperNormalsFaces = new THREE.Group();

			GBP.surfaceMeshes.traverse( function ( child ) {

				if ( child instanceof THREE.Mesh && child.visible ) {

					const helperNormalsFace = new THREE.FaceNormalsHelper( child, 2, 0xff00ff, 3 );
					helperNormalsFaces.add( helperNormalsFace );

					helperNormalsFaces.visible = false;

				}

			} );

			helperNormalsFaces.name = 'helperNormalsFaces';
			THR.scene.add( helperNormalsFaces );
			helperNormalsFaces.visible = false;

		}

		helperNormalsFaces.visible = !helperNormalsFaces.visible;

	};



	SET.toggleAxesHelper = function() {

		THR.axesHelper.visible = !THR.axesHelper.visible;

	};



	SET.toggleGridHelper = function() {

		let meshGridHelper = THR.scene.getObjectByName( 'gridHelper' );

		if ( !meshGridHelper) {

			const bbox = new THREE.Box3().setFromObject( GBP.surfaceMeshes );

			meshGridHelper = new THREE.GridHelper( 3 * GBP.surfaceMeshes.userData.radius, 20, 'green', 'lightgreen' );
			meshGridHelper.rotation.x = Math.PI / 2;
			meshGridHelper.position.set( THR.axesHelper.position.x, THR.axesHelper.position.y, bbox.min.z );
			meshGridHelper.name = 'gridHelper';

			//GBP.surfaceMeshes.add( meshGridHelper );
			THR.scene.add( meshGridHelper );

			meshGridHelper.visible = false;

		}

		meshGridHelper.visible = !meshGridHelper.visible;

	};



	SET.toggleGroundHelper = function() {

		let meshGroundHelper = THR.scene.getObjectByName( 'groundHelper' );

		if ( !meshGroundHelper ) {

			const bbox = new THREE.Box3().setFromObject( GBP.surfaceMeshes );

			const geometry = new THREE.BoxBufferGeometry( 3 * GBP.surfaceMeshes.userData.radius, 3 * GBP.surfaceMeshes.userData.radius, 1  );
			const material = new THREE.MeshPhongMaterial( { color: 'green', opacity: 0.85, transparent: true } );
			meshGroundHelper = new THREE.Mesh( geometry, material );
			meshGroundHelper.name = 'groundHelper';
			meshGroundHelper.receiveShadow = true;
			meshGroundHelper.position.set( THR.axesHelper.position.x, THR.axesHelper.position.y, bbox.min.z - 0.5 );

			//GBP.surfaceMeshes.add( meshGroundHelper );
			THR.scene.add( meshGroundHelper );

			meshGroundHelper.visible = false;

		}

		meshGroundHelper.visible = !meshGroundHelper.visible;

	};



	SET.toggleSceneAutoRotate = function() {

		THR.controls.autoRotate = !THR.controls.autoRotate;

	};



	SET.toggleCameraOrthoPerspective = function() {


		if ( SET.cameraOrtho === undefined ) {

			SET.cameraPerspective = THR.camera;
			SET.controlsPerspective = THR.controls;

			const width = 300; //surfaceMeshes.userData.radius > 10 ? 3 * surfaceMeshes.userData.radius : 200;
			const height = 300; // surfaceMeshes.userData.radius > 10 ? 3 * surfaceMeshes.userData.radius : 200; //; //  * surfaceMeshes.userData.radius;
			SET.cameraOrtho = new THREE.OrthographicCamera( width / -3, width / 3, height / 3, height / - 3, 1, 1000 );
			SET.cameraOrtho.up.set( 0, 0, 1 );
			THR.scene.add( SET.cameraOrtho );
			SET.controlsOrtho = new THREE.OrbitControls( SET.cameraOrtho, THR.renderer.domElement );
		}

		if ( butSetOrtho.style.backgroundColor !== 'var( --but-bg-color )' ) {

			THR.camera = SET.cameraOrtho;
			THR.camera.updateProjectionMatrix();
			THR.controls = SET.controlsOrtho;

			GBP.setAllVisible();
			GBP.zoomObjectBoundingSphere( GBP.surfaceMeshes );

			butSetOrtho.style.backgroundColor = 'var( --but-bg-color )';

		} else {


			THR.camera = SET.cameraPerspective;
			THR.camera.updateProjectionMatrix();
			THR.controls = SET.controlsPerspective;
			//THR.scene.remove( SET.cameraOrtho );

			GBP.setAllVisible();
			GBP.zoomObjectBoundingSphere( GBP.surfaceMeshes );

			butSetOrtho.style.backgroundColor = '';

		}

	};



	SET.updateOpacity = function() {

		const opacity = parseInt( rngOpacity.value, 10 );
		outOpacity.value = opacity + '%';

		THR.scene.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.material.opacity = opacity / 100;

			}

		} );


	};



	SET.explodeReset = function() {

		if ( SET.explodeStart === false ) { SET.explodeInit(); }

		THR.scene.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.position.copy( child.userData.positionStart1 );

			}

		} );

		GBP.surfaceEdges.visible = true;

	};



	SET.explodeInit = function() {

		THR.scene.updateMatrixWorld();

		THR.scene.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.updateMatrixWorld();

				child.userData.positionStart1 = child.position.clone();

			}

		} );

		SET.explodeStart = true;

	};



	SET.explodePlus = function() {

		if ( SET.explodeStart === false ) { SET.explodeInit(); }

		const s = 1;

		GBP.surfaceEdges.visible = false;

		const bbox = new THREE.Box3().setFromObject( GBP.surfaceMeshes );
		const sphere = bbox.getBoundingSphere();
		const center = sphere.center;
		const radius = sphere.radius;

		THR.scene.updateMatrixWorld();

		THR.scene.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.updateMatrixWorld();

				if ( !child.userData.positionStart ) {

					if ( child.geometry.boundingSphere ) {

						const pp = child.geometry.boundingSphere.center.clone();
						pp.applyMatrix4( child.matrixWorld );
						child.userData.positionStart = pp;

					} else {

						child.userData.positionStart = child.position.clone();

					}

					child.userData.vectorStart = child.userData.positionStart.clone().sub( center ).normalize();

				}

				//const p = child.userData.positionStart.clone();
				const vec = child.userData.vectorStart.clone();

				//child.position.add( new THREE.Vector3( 1.2 * ( vec.x ), 1.2* ( vec.y ), 0 ) );
				child.position.add( vec.multiplyScalar( s ) );


			}

		} );

	};



	SET.explodeMinus = function() {

		const s = 1;

		if ( SET.explodeStart === false ) { SET.explodeInit(); }

		GBP.surfaceEdges.visible = false;

		const bbox = new THREE.Box3().setFromObject( GBP.surfaceMeshes );
		const sphere = bbox.getBoundingSphere();
		const center = sphere.center;
		const radius = sphere.radius;

		THR.scene.updateMatrixWorld();

		THR.scene.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.updateMatrixWorld();

				if ( !child.userData.positionStart ) {

					if ( child.geometry.boundingSphere ) {

						const pp = child.geometry.boundingSphere.center.clone();
						pp.applyMatrix4( child.matrixWorld );
						child.userData.positionStart = pp;

					} else {

						child.userData.positionStart = child.position.clone();

					}

					child.userData.vectorStart = child.userData.positionStart.clone().sub( center ).normalize();

				}

				const p = child.userData.positionStart.clone();
				const vec = child.userData.vectorStart.clone();

				child.position.sub( vec.multiplyScalar( s ) );

			}

		} );

	};



	SET.explodeByStoreys = function() {

		if ( SET.explodeStart === false ) { SET.explodeInit(); }

		const s = 1;

		GBP.surfaceEdges.visible = false;

		const bbox = new THREE.Box3().setFromObject( GBP.surfaceMeshes );
		const sphere = bbox.getBoundingSphere();
		center = sphere.center;
		radius = sphere.radius;

		THR.scene.updateMatrixWorld();

		THR.scene.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.updateMatrixWorld();

				if ( !child.userData.positionStart ) {

					if ( child.geometry.boundingSphere ) {

						const pp = child.geometry.boundingSphere.center.clone();
						pp.applyMatrix4( child.matrixWorld );
						child.userData.positionStart = pp;

					} else {

						child.userData.positionStart = child.position.clone();

					}

					//child.userData.vectorStart = child.userData.positionStart.clone().sub( center ).normalize();
					child.userData.vectorStart = child.userData.positionStart.clone(); //.sub( center ).normalize();

				}

				const vec = child.userData.vectorStart.clone();

				//child.position.add( new THREE.Vector3( 1.2 * ( vec.x ), 1.2* ( vec.y ), 0 ) );
				//child.position.add( vec.multiplyScalar( s ) );
				vec2 = new THREE.Vector3( 0, 0, 3 * vec.z - radius );
				child.position.add( vec2 );

			}

		} );

	};



	SET.updateMeshLevel = function( meshName, delta ) {

		//const mesh = GBP.surfaceMeshes.getObjectByName( meshName );
		const mesh = THR.scene.getObjectByName( meshName );

		if ( mesh ) {

			mesh.position.z += delta;

		}

	};


//////////

	SET.updateClipAngle = function() {

		const angle = inpRotate.valueAsNumber * Math.PI / 180;

		SET.localClip1.normal = new THREE.Vector3( Math.cos( angle ), Math.sin( angle ), THR.axesHelper.position.x );
//		SET.localClip2.normal = new THREE.Vector3( Math.cos( angle + Math.PI ), Math.sin( angle + Math.PI ), THR.axesHelper.position.x );
		SET.localClip2.normal = new THREE.Vector3( Math.cos( angle ), Math.sin( angle ), THR.axesHelper.position.x );

	};


	SET.updateCLipX = function() {

		const origin = THR.axesHelper.position.x;

		SET.localClip1.constant = origin + parseInt( inpClip1.value, 10 );

		SET.localClip2.constant = - origin + - parseInt( inpClip2.value, 10 );
		//console.log( '', SET.localClip2.constant );

	}



	SET.toggleSectionView = function() {

		if ( butSectionView.style.backgroundColor !== 'aqua' ) {

			THR.scene.traverse( function ( child ) {

				if ( child instanceof THREE.Mesh ) {

					child.material.clippingPlanes = [ SET.localClip1, SET.localClip2 ],
					child.material.clipShadows = true,
					child.material.needsUpdate = true;

				}

			} );

			THR.renderer.localClippingEnabled = true;
			butSectionView.style.backgroundColor = 'aqua';

			//SET.localClip1.constant = THR.axesHelper.position.x;

			SET.updateCLipX();

		} else {

			THR.renderer.localClippingEnabled = false;

			butSectionView.style.backgroundColor = '';

		}

	}
