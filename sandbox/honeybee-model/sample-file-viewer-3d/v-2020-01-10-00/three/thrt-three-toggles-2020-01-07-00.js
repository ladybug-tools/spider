
const THRT = {};

THR.radius = THR.radius || 50;
THR.center = THR.center || new THREE.Vector3();


THRT.init = function () {

	divSettings.innerHTML = THRT.getMenu();

	window.addEventListener( "onloadglf", THRT.onLoad, false );

};

THRT.onLoad = function () {

	THRT.toggleAxesHelper();
	THRT.toggleGroundHelper();
	THRT.toggleFog();
	//THRT.toggleEdges( PHJ.group );

}

THRT.getMenu = function () {

	const htm =
		`
	<details open>

		<summary title="thrt-three-toggles-2020-01-06-00.js" >Toggles</summary>

		<p>set visual aids visibility on or off</p>
		<p>
			<button onclick=THRT.toggleAxesHelper() >axes helper</button>
		</p>
		<p>
			<button onclick=THRT.toggleGroundHelper() >ground</button>
		</p>
		<p>
			<button onclick=THRT.toggleBoundingBoxHelper(PHJ.group) >bounding box helper</button>
		</p>
		<p>
			<button onclick=THRT.toggleEdges(PHJ.group) >edges</button>
		</p>
		<p>
			<button onclick=THRT.toggleFog() >fog</button>
		</p>
<!--
		<p>
			<button onclick=THRT.toggleSurfaceNormals(PHJ.group) >face normals</button>
		</p>
-->
	</details>
	`;

	return htm;

};


// anything in the scene is a THR...


THRT.toggleAxesHelper = function () {

	axesHelper = THR.axesHelper;

	if ( !axesHelper ) {

		axesHelper = new THREE.AxesHelper();
		THR.scene.add( axesHelper );

	} else {

		axesHelper.visible = !axesHelper.visible;

	}

	axesHelper.scale.set( THR.radius, THR.radius, THR.radius );
	axesHelper.name = "axesHelper";
	axesHelper.position.copy( THR.center );
	THR.axesHelper = axesHelper;

};



THRT.toggleGroundHelper = function ( position = THR.scene.position.clone(), elevation = -0.01 ) {

	// move to THRT but z min should be zero

	if ( !THR.groundHelper ) {

		//THR.scene = new THREE.Scene();
		//THR.scene.background = new THREE.Color( 0xffe0ff );
		//THR.scene.fog.near = 20;
		//THR.scene.fog.far = 100;

		//const reElevation = /<Elevation>(.*?)<\/Elevation>/i;
		//GBX.elevation = GBX.text.match( reElevation )[ 1 ];
		//console.log( 'elevation', GBX.elevation );

		//elevation = GBX.boundingBox.box.min.z - 0.001 * THRT.radius;
		//elevation = 0;

		const geometry = new THREE.PlaneGeometry( 20 * THR.radius, 20 * THR.radius );
		const material = new THREE.MeshPhongMaterial( { color: 0x888888, opacity: 0.5, side: 2 } );
		THR.groundHelper = new THREE.Mesh( geometry, material );
		THR.groundHelper.receiveShadow = true;

		THR.groundHelper.position.set( position.x, position.y, parseFloat( elevation ) );
		THR.groundHelper.name = "groundHelper";

		THR.scene.add( THR.groundHelper );

		return;

	}

	THR.groundHelper.visible = !THR.groundHelper.visible;

};


THRT.toggleSurfaceNormals = function ( obj = THR.scene ) {

	let material = new THREE.MeshNormalMaterial();


		obj.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {


				child.geometry.computeFaceNormals();

				console.log( 'cg', child.geometry );

					//const helperNormalsFace = new THREE.FaceNormalsHelper( child, 2, 0xff00ff, 3 );
					//THR.scene.add( helperNormalsFace );
					//THRT.helperNormalsFaces.visible = false;
					//console.log( 'helperNormalsFace', helperNormalsFace );


			}

		} );

};



THRT.toggleSurfaceNormalsVisible = function ( obj = THR.scene ) {

	let material = new THREE.MeshNormalMaterial();

	const types = [ 'BoxBufferGeometry', 'BufferGeometry', 'ConeBufferGeometry', 'CylinderBufferGeometry',
		'ShapeBufferGeometry', 'SphereBufferGeometry' ];

	if ( THR.scene.children.includes( THRT.helperNormalsFaces ) ) {

		THR.scene.remove( THRT.helperNormalsFaces );

	} else {

		THRT.helperNormalsFaces = new THREE.Group();

		THR.scene.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh && child.visible ) {

				if ( child.geometry.type === 'Geometry' ) {

					child.geometry.computeFaceNormals();

					const helperNormalsFace = new THREE.FaceNormalsHelper( child, 2, 0xff00ff, 3 );
					THRT.helperNormalsFaces.add( helperNormalsFace );
					//THRT.helperNormalsFaces.visible = false;
					//console.log( 'helperNormalsFace', helperNormalsFace );

				} else if ( types.includes( child.geometry.type ) === true ) {

					const geometry = new THREE.Geometry();
					const geo = geometry.fromBufferGeometry( child.geometry );
					const mesh = new THREE.Mesh( geo, material );
					mesh.rotation.copy( child.rotation );
					mesh.position.copy( child.position );

					const helperNormalsFace = new THREE.FaceNormalsHelper( mesh, 0.05 * THRT.radius, 0xff00ff, 3 );
					helperNormalsFace.userData.index = child.userData.index;

					THRT.helperNormalsFaces.add( helperNormalsFace );
					//THRT.helperNormalsFaces.visible = false;

				} else {

					//console.log( 'child.geometry.type', child.geometry.type );

				}

			}

		} );

		THRT.helperNormalsFaces.name = 'helperNormalsFaces';

		THR.scene.add( THRT.helperNormalsFaces );

	}

};



THRT.toggleBoundingBoxHelper = function ( objThree = THR.scene ) {

	if ( !THRT.boundingBoxHelper ) {

		const bbox = new THREE.Box3().setFromObject( objThree );

		THRT.boundingBoxHelper = new THREE.Box3Helper( bbox, 0xff0000 );
		THRT.boundingBoxHelper.geometry.computeBoundingBox();
		THRT.boundingBoxHelper.name = "boundingBoxHelper";
		THR.scene.add( THRT.boundingBoxHelper );

	} else {

		THRT.boundingBoxHelper.visible = !THRT.boundingBoxHelper.visible;

	}

};


THRT.toggleEdges = function ( obj = THR.scene ) {

	if ( !THR.edgesExist ) {

		const meshEdges = [];
		const lineMaterial = new THREE.LineBasicMaterial( { color: 0x222222 } );

		for ( let mesh of obj.children ) {

			if ( !mesh.geometry ) { continue; }

			const edgesGeometry = new THREE.EdgesGeometry( mesh.geometry );
			const surfaceEdge = new THREE.LineSegments( edgesGeometry, lineMaterial );
			//surfaceEdge.rotation.copy( mesh.rotation );
			//surfaceEdge.position.copy( mesh.position );
			mesh.add( surfaceEdge );

		}
		//console.log( 'meshEdges', meshEdges );

		THR.edgesExist = true;

		return;

	}


	obj.traverse( child => {

		if ( child instanceof THREE.Line ) {

			child.visible = !child.visible;

		}

	} );


};


THRT.toggleFog = function () {

	THR.scene.fog.near = THR.scene.fog.near === 20 ? 999 : 20;
	THR.scene.fog.far = THR.scene.fog.far === 90 ? 9999 : 90;

};

THRT.init()