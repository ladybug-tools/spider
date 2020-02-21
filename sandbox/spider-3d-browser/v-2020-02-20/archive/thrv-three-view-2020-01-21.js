// copyright 2020 Theo Armour. MIT license.
// See pushme-pullyou/templates-01/modules/template
// 2020-01-16
/* divContent */
// jshint esversion: 6
// jshint loopfunc: true


const THRV = {};



THRV.init = function () {

	THRVdivThreejsView.innerHTML = THRV.getMenu();

};



THRV.getMenu = function () {

	const htm = `
<details open>

	<summary>
		View

		<span class="couponcode">?? <span class="coupontooltip">control the camera</span></span>

	</summary>

	<p>
		<button onclick=THR.controls.reset(); title="Return to default view">reset view</button>

		<button onclick=THRV.zoomToFitObject(); title="zoom without shifting camera angle">zoom fit</button>

	</p>
	<p>
		<label>
			<input type=checkbox id=THRVchkDelta onclick="THRV.setCameraPositionDelta()" checked>
			rotation <output id=outDelta >0.005<output>
		</label>
	</p>

	<p>
		<input type="range" id=rngDelta  value=75 onclick="THRV.setCameraPositionDelta()" title="rotation speed" >
	</p>
	<p>
		<button onclick=THRV.setCameraPosition(0,0,200)>top</button>
		<button onclick=THRV.setCameraPosition(0,0,-200)>bottom</button>
		<button onclick=THRV.setCameraPosition(0,-300,0)>front</button>
		<button onclick=THRV.setCameraPosition(0,300,0)>back</button>
		<button onclick=THRV.setCameraPosition(-300,-0,0)>left</button>
		<button onclick=THRV.setCameraPosition(300,-0,0)>right</button>
	</p>

	<div id=THRVdivMessage ></div>

</details>`;

	return htm;

};



THRV.zoomToFitObject = function () {
	//console.log( '', THR.group );

	camera = THR.camera;
	controls = THR.controls;
	object = THR.group;
	fitOffset = 1.2;

	THR.group.updateMatrixWorld();

	const box = new THREE.Box3(); //.setFromObject( object );

	for ( const object of THR.group.children ) box.expandByObject( object );

	//console.log( 'box', box );

	const size = box.getSize( new THREE.Vector3() );
	center = box.getCenter( new THREE.Vector3() );

	//console.log( 'size center', size, center );

	const maxSize = Math.max( size.x, size.y, size.z );
	const fitHeightDistance = maxSize / ( 2 * Math.atan( Math.PI * camera.fov / 360 ) );
	const fitWidthDistance = fitHeightDistance / camera.aspect;
	const distance = fitOffset * Math.max( fitHeightDistance, fitWidthDistance );

	const direction = controls.target.clone()
		.sub( camera.position )
		.normalize()
		.multiplyScalar( distance );
	//console.log( 'dir', direction );

	controls.maxDistance = distance * 100;
	controls.target.copy( center );

	//camera.near = distance / 100;
	camera.far = distance * 100;
	camera.updateProjectionMatrix();

	//THR.scene.fog.near = distance * 2;
	//THR.scene.fog.far = distance * 2.5;

	camera.position.copy( center.clone() ).sub(direction);

	controls.update();

	let event = new Event( "onresetthree", {"bubbles": true, "cancelable": false, detail: true } );

	//window.addEventListener( "onrresetthree", doThings, false );

	window.dispatchEvent( event );

}



THRV.setCameraPositionDelta = function () {

	if ( THRVchkDelta.checked ) {

		THR.cameraDelta = Number( rngDelta.value )/ 5000 - 0.01;

		outDelta.value = THR.cameraDelta.toLocaleString();

	} else {

		THR.cameraDelta = 0;

	}

};


THRV.setCameraPosition = function( x = -100, y = -100, z = 100 ) {

	THR.camera.position.set( x, y, z );

	THR.camera.up.set( 0, 0, 1 );

	THRVchkDelta.checked = false;
	THR.cameraDelta = 0;

	//THRV.zoomObjectBoundingSphere(mesh);

}


THRV.init();