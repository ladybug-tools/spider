// Copyright 2018 Ladybug Tools authors. MIT License

var icw;
var THREE;
var renderer;
var scene;
var camera;
var controls;

var gbxml;
var gbjson;

var surfaceGroup;
var surfaceMeshes;
var surfaceMeshesChildren;
var surfaceEdges;


var center;
var radius;
var cameraDelta;

var step = 0;
var framerate = 30;
var timeLimit = 8;


var capturer;


init();

function init() {

	if ( butScreenCapture.style.backgroundColor !== 'pink' ) {


		icw = ifrThree.contentWindow;
		THREE = icw.THREE;
		renderer = icw.renderer;
		scene = icw.scene;
		camera = icw.camera;
		controls = icw.controls;

		gbxml = icw.gbxml;
		gbjson = icw.gbjson;

	// clean up
		surfaceGroup = icw.scene.getObjectByName( 'surfaceMeshes' );
		surfaceMeshesChildren = surfaceGroup.children;
		surfaceEdges = icw.scene.getObjectByName( 'surfaceEdges' );
		surfaceMeshes = icw.surfaceMeshes;

		let script = document.head.appendChild( document.createElement( 'script' ) );
		script.src='https://rawgit.com/spite/ccapture.js/dev/build/CCapture.all.min.js';
		script.onload = initCCaputure;

		script = document.head.appendChild( document.createElement( 'script' ) );
		script.src= 'https://rawgit.com/spite/ccapture.js/master/src/Whammy.js';

		script = document.head.appendChild( document.createElement( 'script' ) );
		script.src= 'https://rawgit.com/spite/ccapture.js/master/src/tar.js';

		script = document.head.appendChild( document.createElement( 'script' ) );
		script.src= 'https://rawgit.com/spite/ccapture.js/master/src/download.js';

		script = document.head.appendChild( document.createElement( 'script' ) );
		script.src= 'https://rawgit.com/spite/ccapture.js/master/src/gif.js';

		divMenuItems.innerHTML = `

			<details id = detScreenCapture open >

				<summary>Screen Capture</summary>

				<p><button onclick=setIframe(); >1. Set Iframe</button></p>

				<p><button onclick=updateScene(); >2. update scene</button></p>

				<p><button onclick=capturer.start(); >3. capture start</button></p>

				<p>
					Open the Developer Tools console to monitor progress of the animation creation.
					Once the animation is created, you will be prompted to ave the file.
				</p>

				<p>
					This module is still at a very early stage of development.
					The jiggling is an issue, but does not affect the GIF.
					There are many more controls and features still to be added.
				</p>
				</details>` +
/*
				<p><button onclick="capturer.stop();step=-1;" >capture stop</button></p>

				<p><button onclick=capturer.save(); >capture save</button></p>

				<div>
					Camera Radius <output id=outCameraRadius for="inpCameraRadius" ></output>
					<input type="range" id="inpCameraRadius" onchange=outCameraRadius.value=cameraRadius=parseFloat(this.value); min=1 max=100 value=50 >
				</div>

				<div>
					Camera Delta <output id=outCameraDelta for="inpCameraDelta" ></output>
					<input type="range" id="inpCameraDelta" onchange=outCameraDelta.value=cameraDelta=parseFloat(this.value); min=10 max=100 value=50 >
				</div>

				<div>
					Camera Height <output id=outCameraHeight for="inpCameraHeight" ></output>
					<input type="range" id="inpCameraHeight" onchange=cameraHeight=this.value; min=1 max=100 value=50 >
				</div>

				<p><button id=toggleVisible onclick = toggleHelpers(); >Toggle Helpers</button></p>

				<div id = "contents" ></div>
*/


		divMenuItems.innerHTML;

		center = surfaceMeshes.userData.center;
		radius = surfaceMeshes.userData.radius;


		butScreenCapture.style.backgroundColor = 'pink';

		if ( parent.setIfrThree ) { setIfrThree(); }


	} else {

		detScreenCapture.remove();

		butScreenCapture.style.backgroundColor = '';

	}

}


function initCCaputure() {

	capturer = new CCapture( {

		verbose: true,
		display: true,
		name: 'demo',
		framerate: framerate, //framerate
	//			motionBlurFrames: ( 960 / framerate ) * ( document.querySelector('input[name="motion-blur"]').checked ? 1 : 0 ),
		quality: 50,
		format: 'gif', //document.querySelector('input[name="encoder"]:checked').value,
		workersPath: './js/',
	//		timeLimit: 2,  // number of seconds to capture
	//		frameLimit: 240,
		autoSaveTime: 0,
		timeLimit: timeLimit,
	//			onProgress: function( p ) { progress.style.width = ( p * 100 ) + '%' }

	} );

}



function setIframe() {
	const width = 640;
	const height = 480;
	renderer.setSize( width, height );
	renderer.domElement.style.cssText = 'border: 1px solid crimson; left: 0; margin: 0 auto; ' +
		'width: 640px; height: 480px; position: absolute; right: 0; top: 100px;';
	camera.aspect = width / height;
	camera.updateProjectionMatrix();

}



function updateScene() {

	controls.autoRotate = false;

	renderer.setClearColor( 0xc0c0f8 );

	cameraDelta = 0.5 * camera.position.distanceTo( controls.target );

	step = 0;

	animate = animateCapture;

	animate();


}


function toggleHelpers() {

	if ( cameraHelper ) { cameraHelper.visible = axisHelper.visible = !axisHelper.visible; }

};


function endTheAction() {

	step = -1;

}



var animateCapture = function () {

	requestAnimationFrame( animateCapture );
	controls.update();
	renderer.render( scene, camera );

	if ( step >= 0 ) {
//console.log( 'step', step );

		step += 2 * Math.PI / (framerate * timeLimit );

		camera.position.x = center.x + radius + cameraDelta * Math.sin( step );
		camera.position.y = center.y + radius + cameraDelta * Math.cos( step );
		camera.position.z = center.z + 0.5 * radius;

		capturer.capture( renderer.domElement );

	}

}
