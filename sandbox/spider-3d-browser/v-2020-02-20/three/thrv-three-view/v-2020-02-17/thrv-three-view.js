// copyright 2020 Theo Armour. MIT license.
// See pushme-pullyou/templates-01/modules/template
// 2020-01-16
/* divContent */
// jshint esversion: 6
// jshint loopfunc: true


const THRV = {};



THRV.init = function () {

	THRVdivThreejsView.innerHTML = THRV.getMenu();

	window.addEventListener( "onloadthree", THRV.onLoad, false );



};



THRV.onLoad = function ( event ) {

	//console.log( 'event tsg', event, THR.scene );

	window.addEventListener( 'keyup', THRV.onStart, false );
	window.addEventListener( 'touchstart', THRV.onStart, false );
	THR.renderer.domElement.addEventListener( 'click', THRV.onStart, false );

	THR.controls.autoRotate = true;

};



THRV.onStart = function () {

	THR.controls.autoRotate = false;

	THRVchkRotate.checked = false;

	window.removeEventListener( 'keyup', THRV.onStart, false );
	window.removeEventListener( 'touchstart', THRV.onStart );
	THR.renderer.domElement.removeEventListener( 'click', THRV.onStart );

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
			<input type=checkbox id=THRVchkRotate onclick="THR.controls.autoRotate=this.checked" checked>
			rotation <output id=THRVoutRotateSpeed >2<output>
		</label>
	</p>

	<p>
	<input type="range" id=TRVrngRotate value="70" onclick="THRV.setCameraPositionDelta()" title="rotation speed" >
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



THRV.zoomToFitObject = function ( camera = THR.camera, controls = THR.controls, object = THR.group, fitOffset = 1.2 ) {

	const box = new THREE.Box3().setFromObject( object );

	//for ( const object of selection ) box.expandByObject( object );

	const size = box.getSize( new THREE.Vector3() );
	const center = box.getCenter( new THREE.Vector3() );

	const maxSize = Math.max( size.x, size.y, size.z );
	const fitHeightDistance = maxSize / ( 2 * Math.atan( Math.PI * camera.fov / 360 ) );
	const fitWidthDistance = fitHeightDistance / camera.aspect;
	const distance = fitOffset * Math.max( fitHeightDistance, fitWidthDistance );

	const direction = controls.target.clone()
		.sub( camera.position )
		.normalize()
		.multiplyScalar( distance );

	controls.maxDistance = distance * 10;
	controls.target.copy( center );

	camera.near = distance / 100;
	camera.far = distance * 100;
	THR.camera.updateProjectionMatrix();

	THR.scene.fog.near = distance * 2;
	THR.scene.fog.far = distance * 2.5;

	THR.distance = distance;

	camera.position.copy( controls.target ).sub( direction );

	controls.update();

	let event = new Event( "onresetthree", { "bubbles": true, "cancelable": false, detail: true } );

	//window.addEventListener( "onrresetthree", doThings, false );

	window.dispatchEvent( event );

};



THRV.setCameraPositionDelta = function () {

	if ( THRVchkRotate.checked ) {

		THR.controls.autoRotateSpeed = Number( TRVrngRotate.value ) / 10 - 5;

		THRVoutRotateSpeed.value = THR.controls.autoRotateSpeed.toLocaleString();

	} else {

		//THR.controls.rotateSpeed = 0;

	}

};



THRV.setCameraPosition = function ( x = -100, y = -100, z = 100 ) {

	THR.camera.position.set( x, y, z );

	THR.camera.up.set( 0, 0, 1 );

	//THRVchkDelta.checked = false;
	//THR.cameraDelta = 0;

	THRV.zoomToFitObject();

};


THRV.init();