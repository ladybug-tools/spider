// Copyright 2018 Ladybug Tools authors. MIT License


/*global THREE, THR, GBX,COR */
/* jshint esversion: 6 */

	var SET = {};

	// move into own related functions?
	SET.localClipX1= new THREE.Plane( new THREE.Vector3( -1, 0, 0 ), 0 );
	SET.localClipX2= new THREE.Plane( new THREE.Vector3( 1, 0, 0 ), 0 );

	SET.localClipY1= new THREE.Plane( new THREE.Vector3( 0, -1, 0 ), 0 );
	SET.localClipY2= new THREE.Plane( new THREE.Vector3( 0, 1, 0 ), 0 );

	SET.localClipZ1= new THREE.Plane( new THREE.Vector3( -0, 0, -1 ), 0 );
	SET.localClipZ2= new THREE.Plane( new THREE.Vector3( 0, 0, 1 ), 0 );

	SET.explodeStart = false;



	SET.initSettings = function() {  //called from bottom of file

		SET.setMenuItems( CORdivMenuItems );

		COR.setPanelButtonInit( CORbutSettings );

	}



	SET.setMenuItems = function( target ) {


		target.innerHTML =
		`
			<details id=detSettings class=app-menu open >

				<summary>Settings &nbsp; <a href=#../gv-set-settings/README.md>?</a> </summary>

				<!--
				<div>
					<b>visibility toggles</b><br>
					<button onclick=GBX.surfaceMeshes.visible=!GBX.surfaceMeshes.visible; >surfaces</button>
					 <button onclick=GBX.surfaceEdges.visible=!GBX.surfaceEdges.visible; >edges</button>
					 <button onclick=GBX.setAllVisible(); >all</button>
				</div>

				<br>

				<div id=SETdivShowHide ></div>

				<hr>

				-->
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
					<!--
					<button onclick=SET.toggleSceneAutoRotate() title= "Stop the spinning!" > Toggle scene rotation </button>
					-->

					<button id=butSetOrtho onclick=SET.toggleCameraOrthoPerspective(); title="" > Toggle camera ortho </button>
				</div>

				<p>
					<button onclick=SET.toggleShadowMap(); >Toggle shadows</button>

					<button onclick=SET.toggleBackgroundGradient(); > Toggle background gradient </button>

				</p>


				<p>
					<button onclick=SET.toggleSurfaceNormals(); title="Every Three.js triangle has a normal. See them here." > Toggle surface normals </button>

					<button onclick=SET.toggleAxesHelper(); >Toggle axes</button>

				</p>

				<p>
					<button onclick=SET.toggleGridHelper(); >Toggle grid</button>
					<button onclick=SET.updateMeshLevel("gridHelper",+0.2); >+</button>
					<button onclick=SET.updateMeshLevel("gridHelper",-0.2); >-</button>
				</p>

				<p>
					<button onclick=SET.toggleGroundHelper(); >Toggle ground</button>
					<button onclick=SET.updateMeshLevel("groundHelper",+0.2); >+</button>
					<button onclick=SET.updateMeshLevel("groundHelper",-0.2); >-</button>
				</p>

				<hr>

				<p>
					<div title="building surface separation" >

						<b>explode view</b><br>
						<p><button onclick=SET.explodeByStoreys(); >explode by storeys</button></p>

						<button onclick=SET.explodeMinus();> minus </button>
						<button onclick=SET.explodeReset(); >reset</button>
						<button onclick=SET.explodePlus();> plus </button>
					</div>

				</p>

				<hr>

				<div>

					<b>section view</b><br>

					<div><small><i>Work-in-progress. Click toggles twice to reset. Multiple sections coming next.</i></small></div>
					<br>
					<div>
						<button id=butSectionViewX onclick=SET.toggleSectionViewX() >toggle section view X-axis</button>
					</div>

					clipping plane front: <output id=outClipX1 >0</output><br>
					<input type=range id=inpClipX1 max=50 min=-50 step=1 value=0
					oninput=outClipX1.value=inpClipX1.value;SET.updateCLipX(); title="-50 to 50: OK" >

					<div>
						clipping plane back: <output id=outClipX2 >-10</output><br>
						<input type=range id=inpClipX2 max=50 min=-50 step=1 value=-10
						oninput=outClipX2.value=inpClipX2.value;SET.updateCLipX(); title="-50 to 50: OK" >
					</div>

					<br>

					<div>
					<button id=butSectionViewY onclick=SET.toggleSectionViewY() >toggle section view Y-axis</button>
					</div>

					clipping plane front: <output id=outClipY1 >0</output><br>
					<input type=range id=inpClipY1 max=50 min=-50 step=1 value=0
					oninput=outClipY1.value=inpClipY1.value;SET.updateCLipY(); title="-50 to 50: OK" >

					<div>
						clipping plane back: <output id=outClipY2 >-10</output><br>
						<input type=range id=inpClipY2 max=50 min=-50 step=1 value=-10
						oninput=outClipY2.value=inpClipY2.value;SET.updateCLipY(); title="-50 to 50: OK" >
					</div>

					<br>

					<div>
					<button id=butSectionViewZ onclick=SET.toggleSectionViewZ() >toggle section view Z-axis</button>
					</div>

					clipping plane front: <output id=outClipZ1 >0</output><br>
					<input type=range id=inpClipZ1 max=50 min=-50 step=1 value=0
					oninput=outClipZ1.value=inpClipZ1.value;SET.updateCLipZ(); title="-50 to 50: OK" >

					<div>
						clipping plane back: <output id=outClipZ2 >-10</output><br>
						<input type=range id=inpClipZ2 max=50 min=-50 step=1 value=-10
						oninput=outClipZ2.value=inpClipZ2.value;SET.updateCLipZ(); title="-50 to 50: OK" >
					</div>


					<!--
					<div> // To be made to work
						rotate section on Z-axis: <output id=outRotate >0</output><br>
						<input type=range id=inpRotate max=180 min=-180 step=1 value=1
						oninput=outRotate.value=inpRotate.valueAsNumber;SET.updateClipAngle(); title="-180 to 180: OK" >
						</div>
					</div>
					-->

				<hr>

			</details>`;

	}





	SET.setRandomMaterial = function() {

		GBX.surfaceMeshes.traverse( function ( child ) {

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

		GBX.surfaceMeshes.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.material = new THREE.MeshPhongMaterial( {
					side: 2,
					transparent: true
				} );

			}

		} );

	};



	SET.setNormalMaterial = function() {

		GBX.surfaceMeshes.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.material = new THREE.MeshNormalMaterial( {
					side: 2,
					transparent: true
				} );

			}

		} );

	};



	SET.setDefaultMaterial = function() {

		GBX.surfaceMeshes.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.material =
					new THREE.MeshPhongMaterial( { color: GBX.colors[ child.userData.data.surfaceType ], side: 2, opacity: 0.85, transparent: true } );

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

		GBX.surfaceMeshes.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh &&
				( SET.surfaceAdjacencyDuplicates === undefined || SET.surfaceAdjacencyDuplicates.includes( child.userData.data.Name ) === false ) &&
				( SET.surfaceAdjacencyInvalids === undefined || SET.surfaceAdjacencyInvalids.includes( child.userData.data.Name ) === false ) &&
				( SET.surfaceCoordinateDuplicates === undefined || SET.surfaceCoordinateDuplicates.includes( child.userData.data.Name ) === false )

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

			GBX.surfaceMeshes.traverse( function ( child ) {

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

			const meshes = GBX.surfaceMeshes.children.filter( attribute => attribute.userData.data.surfaceType === 'ExteriorWall' );
			const obj = new THREE.Object3D();
			obj.children = meshes;
			const bbox = new THREE.Box3().setFromObject( obj );

			meshGridHelper = new THREE.GridHelper( 3 * GBX.surfaceMeshes.userData.radius, 20, 'green', 'lightgreen' );
			meshGridHelper.rotation.x = Math.PI / 2;
			meshGridHelper.position.set( THR.axesHelper.position.x, THR.axesHelper.position.y, bbox.min.z );
			meshGridHelper.name = 'gridHelper';

			//GBX.surfaceMeshes.add( meshGridHelper );
			THR.scene.add( meshGridHelper );

			meshGridHelper.visible = false;

		}

		meshGridHelper.visible = !meshGridHelper.visible;

	};



	SET.toggleGroundHelper = function() {

		let meshGroundHelper = THR.scene.getObjectByName( 'groundHelper' );

		if ( !meshGroundHelper ) {

			const meshes = GBX.surfaceMeshes.children.filter( attribute => attribute.userData.data.surfaceType === 'ExteriorWall' );
			const obj = new THREE.Object3D();
			obj.children = meshes;
			const bbox = new THREE.Box3().setFromObject( obj );

			const geometry = new THREE.BoxBufferGeometry( 3 * GBX.surfaceMeshes.userData.radius, 3 * GBX.surfaceMeshes.userData.radius, 1  );
			const material = new THREE.MeshPhongMaterial( { color: 'green', opacity: 0.85, transparent: true } );
			meshGroundHelper = new THREE.Mesh( geometry, material );
			meshGroundHelper.name = 'groundHelper';
			meshGroundHelper.receiveShadow = true;
			meshGroundHelper.position.set( THR.axesHelper.position.x, THR.axesHelper.position.y, bbox.min.z - 0.5 );

			//GBX.surfaceMeshes.add( meshGroundHelper );
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
			SET.controlsOrtho = new THREE.TrackballControls( SET.cameraOrtho, THR.renderer.domElement );
		}

		if ( butSetOrtho.style.backgroundColor !== 'var( --but-bg-color )' ) {

			THR.camera = SET.cameraOrtho;
			THR.camera.updateProjectionMatrix();
			THR.controls = SET.controlsOrtho;

			GBX.setAllVisible();
			THR.zoomObjectBoundingSphere( GBX.surfaceMeshes );

			butSetOrtho.style.backgroundColor = 'var( --but-bg-color )';

		} else {


			THR.camera = SET.cameraPerspective;
			THR.camera.updateProjectionMatrix();
			THR.controls = SET.controlsPerspective;
			//THR.scene.remove( SET.cameraOrtho );

			GBX.setAllVisible();
			THR.zoomObjectBoundingSphere( GBX.surfaceMeshes );

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



	//////////

	SET.explodeInit = function() {

		THR.scene.updateMatrixWorld();

		GBX.surfaceMeshes.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.updateMatrixWorld();

				child.userData.positionStart1 = child.position.clone();

			}

		} );

		SET.explodeStart = true;

	};



	SET.explodeReset = function() {

		if ( SET.explodeStart === false ) { SET.explodeInit(); }

		GBX.surfaceMeshes.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh && child.userData.positionStart1 ) {

				child.position.copy( child.userData.positionStart1 );

			}

		} );

		GBX.surfaceEdges.visible = true;
		GBX.surfaceOpenings.visible = true;
		THR.zoomObjectBoundingSphere( GBX.surfaceEdges );

	};






	SET.explodePlus = function() {

		if ( SET.explodeStart === false ) { SET.explodeInit(); }

		const size = 1;

		GBX.surfaceEdges.visible = false;
		GBX.surfaceOpenings.visible = false;

		const bbox = new THREE.Box3().setFromObject( GBX.surfaceMeshes );
		const sphere = bbox.getBoundingSphere( new THREE.Sphere() );
		const center = sphere.center;
		//const radius = sphere.radius;

		THR.scene.updateMatrixWorld();

		GBX.surfaceMeshes.traverse( function ( child ) {

			if ( child.geometry && child.geometry.boundingSphere ) {

				child.updateMatrixWorld();

				const position = child.geometry.boundingSphere.center.clone();
				position.applyMatrix4( child.matrixWorld );

				const vec = position.sub( center ).normalize().multiplyScalar( size );

				child.position.add( vec );

			}

		} );

	};



	SET.explodeMinus = function() {

		if ( SET.explodeStart === false ) { SET.explodeInit(); }

		const size = 1;

		GBX.surfaceEdges.visible = false;
		GBX.surfaceOpenings.visible = false;

		const bbox = new THREE.Box3().setFromObject( GBX.surfaceMeshes );
		const sphere = bbox.getBoundingSphere( new THREE.Sphere() );
		const center = sphere.center;
		//const radius = sphere.radius;

		THR.scene.updateMatrixWorld();

		GBX.surfaceMeshes.traverse( function ( child ) {

			if ( child.geometry && child.geometry.boundingSphere ) {

				child.updateMatrixWorld();

				const position = child.geometry.boundingSphere.center.clone();
				position.applyMatrix4( child.matrixWorld );

				const vec = position.sub( center ).normalize().multiplyScalar( size );

				child.position.sub( vec );

			}

		} );

	};



	SET.explodeByStoreys = function() {

		if ( SET.explodeStart === false ) { SET.explodeInit(); }

		//const s = 1;

		GBX.surfaceEdges.visible = false;
		GBX.surfaceOpenings.visible = false;

		const bbox = new THREE.Box3().setFromObject( GBX.surfaceMeshes );
		const sphere = bbox.getBoundingSphere( new THREE.Sphere() );
		const radius = sphere.radius;

		THR.scene.updateMatrixWorld();

		GBX.surfaceMeshes.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.updateMatrixWorld();

				if ( !child.userData.positionStart2 ) {

					const positionStart2 = child.geometry.boundingSphere.center.clone();
					positionStart2.applyMatrix4( child.matrixWorld );
					child.userData.positionStart2 = positionStart2;

				}

				child.userData.vectorStart = child.userData.positionStart2.clone();
				const vec = child.userData.vectorStart.clone();

				child.position.z += 3 * vec.z - radius;

			}

		} );

		THR.zoomObjectBoundingSphere( GBX.surfaceMeshes );

	};



	SET.updateMeshLevel = function( meshName, delta ) {

		//const mesh = GBX.surfaceMeshes.getObjectByName( meshName );
		const mesh = THR.scene.getObjectByName( meshName );

		if ( mesh ) {

			mesh.position.z += delta;

		}

	};


//////////

	// to be fixed
	SET.updateClipAngle = function() {

		const angle = inpRotate.valueAsNumber * Math.PI / 180;

		SET.localClip1.normal = new THREE.Vector3( Math.cos( angle ), Math.sin( angle ), THR.axesHelper.position.x );
		//		SET.localClip2.normal = new THREE.Vector3( Math.cos( angle + Math.PI ), Math.sin( angle + Math.PI ), THR.axesHelper.position.x );
		SET.localClip2.normal = new THREE.Vector3( Math.cos( angle ), Math.sin( angle ), THR.axesHelper.position.x );

	};



	SET.updateCLipX = function() {

		const origin = THR.axesHelper.position.x;

		SET.localClipX1.constant = origin + parseInt( inpClipX1.value, 10 );

		SET.localClipX2.constant = - origin + - parseInt( inpClipX2.value, 10 );
		//console.log( '', SET.localClip2.constant );

	};



	SET.toggleSectionViewX = function() {

		if ( butSectionViewX.style.fontStyle !== 'italic' ) {

			THR.scene.traverse( function ( child ) {

				if ( child instanceof THREE.Mesh ) {

					child.material.clippingPlanes = [ SET.localClipX1, SET.localClipX2 ];
					child.material.clipShadows = true;
					child.material.needsUpdate = true;

				}

			} );

			THR.renderer.localClippingEnabled = true;

			butSectionViewX.style.cssText = 'background-color: ' + COR.colorButtonToggle + ' !important; font-style: italic; font-weight: bold';
			butSectionViewY.style.cssText = '';
			butSectionViewZ.style.cssText = '';

			SET.updateCLipX();

		} else {

			THR.renderer.localClippingEnabled = false;

			butSectionViewX.style.cssText = '';
			butSectionViewY.style.cssText = '';
			butSectionViewZ.style.cssText = '';

		}

	};



	SET.updateCLipY = function() {

		const origin = THR.axesHelper.position.y;

		SET.localClipY1.constant = origin + parseInt( inpClipY1.value, 10 );

		SET.localClipY2.constant = - origin + - parseInt( inpClipY2.value, 10 );
		//console.log( '', SET.localClip2.constant );

	};



	SET.toggleSectionViewY = function() {

		if ( butSectionViewY.style.fontStyle !== 'italic' ) {

			THR.scene.traverse( function ( child ) {

				if ( child instanceof THREE.Mesh ) {

					child.material.clippingPlanes = [ SET.localClipY1, SET.localClipY2 ];
					child.material.clipShadows = true;
					child.material.needsUpdate = true;

				}

			} );

			THR.renderer.localClippingEnabled = true;

			butSectionViewY.style.cssText = 'background-color: ' + COR.colorButtonToggle + ' !important; font-style: italic; font-weight: bold';
			butSectionViewX.style.cssText = '';
			butSectionViewZ.style.cssText = '';

			SET.updateCLipY();

		} else {

			THR.renderer.localClippingEnabled = false;

			butSectionViewX.style.cssText = '';
			butSectionViewY.style.cssText = '';
			butSectionViewZ.style.cssText = '';

		}

	};



	SET.updateCLipZ = function() {

		const origin = THR.axesHelper.position.z;

		SET.localClipZ1.constant = origin + parseInt( inpClipZ1.value, 10 );

		SET.localClipZ2.constant = - origin + - parseInt( inpClipZ2.value, 10 );
		//console.log( '', SET.localClip2.constant );

	};



	SET.toggleSectionViewZ = function() {

		console.log( 'butSectionViewZ.style.backgroundColor', butSectionViewZ.style.backgroundColor );

		if ( butSectionViewZ.style.fontStyle !== 'italic' ) {

			THR.scene.traverse( function ( child ) {

				if ( child instanceof THREE.Mesh ) {

					child.material.clippingPlanes = [ SET.localClipZ1, SET.localClipZ2 ];
					child.material.clipShadows = true;
					child.material.needsUpdate = true;

				}

			} );

			THR.renderer.localClippingEnabled = true;

			butSectionViewZ.style.cssText = 'background-color: ' + COR.colorButtonToggle + ' !important; font-style: italic; font-weight: bold';
			butSectionViewX.style.cssText = '';
			butSectionViewY.style.cssText = '';

			SET.updateCLipZ();

		} else {

			THR.renderer.localClippingEnabled = false;

			butSectionViewX.style.cssText = '';
			butSectionViewY.style.cssText = '';
			butSectionViewZ.style.cssText = '';

			//butSectionViewZ.style.backgroundColor = '';
			//butSectionViewZ.style.fontStyle = '';
			//butSectionViewZ.style.fontWeight = '';
		}

	};


	SET.initSettings();