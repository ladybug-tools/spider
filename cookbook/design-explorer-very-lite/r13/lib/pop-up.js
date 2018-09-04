
/* Copyright 2018 Ladybug Tools authors. MIT License */

const POP = {}


POP.initPopUp = function( target = divPopUp ) {

	POP.mouse = new THREE.Vector2();

	POP.intersected = undefined;
	THR.renderer.domElement.addEventListener( 'mousemove', POP.onDocumentMouseMove, false );
	THR.renderer.domElement.addEventListener( 'mousedown', POP.onDocumentMouseDown, false );
	THR.renderer.domElement.addEventListener( 'touchstart', POP.onDocumentTouchStart, false );

	target.innerHTML =
	`
		<div id = "divPopUpLog" ></div>

		<div id = "divPopUpData" >

			<p>
				Item data appears here when the pointer is over a data point
			</p>

			<p>Axis RGB = XYZ directions</p>

			<p>Spacebar|click to stop spinning</p>

			<p>Use one|two|three fingers to rotate|zoom|pan display in 3D. Or left|scroll|right with your pointing device</p>

			<p>Press Control-Shift-J|Command-Option-J to see if the JavaScript console reports any errors</p>

		</div>

		<div id = "divPopUpImage" ></div>

	`;
}



POP.onDocumentMouseMove = function( event ) {

	event.preventDefault();

	if ( event.buttons > 0 ) { return; }

	POP.meshesArray = object3D.children;

	POP.mouse.x = ( event.clientX / THR.renderer.domElement.clientWidth ) * 2 - 1;
	POP.mouse.y = - ( event.clientY / THR.renderer.domElement.clientHeight ) * 2 + 1;

	const raycaster = new THREE.Raycaster();
	raycaster.setFromCamera( POP.mouse, THR.camera );

	const intersects = raycaster.intersectObjects( POP.meshesArray );

	if ( intersects.length > 0 ) {

		if ( POP.intersected != intersects[ 0 ].object ) {

			if ( POP.intersected ) {

				//POP.intersected.material.emissive.setHex( POP.emissive.currentHex );
				POP.intersected.material.color.setHex( POP.intersected.currentHex );
				POP.intersected.material.opacity = POP.intersected.currentOpacity;
				//POP.intersected.scale.copy( POP.intersected.currentScale );

			}

			POP.intersected = intersects[ 0 ].object;

			//POP.intersected.currentHex = POP.intersected.material.emissive.getHex();
			//POP.intersected.material.emissive.setHex( 0xff0000 );

			POP.intersected.currentHex = POP.intersected.material.color.getHex();
			POP.intersected.material.color.setHex( 0xff00ff );

			POP.intersected.currentOpacity = POP.intersected.material.opacity;
			POP.intersected.material.opacity = 1;

			//POP.intersected.currentScale = POP.intersected.scale.clone();
			//POP.intersected.scale.copy( POP.intersected.currentScale.clone().multiplyScalar( 1.2 ) );

		}

	} else {

		if ( POP.intersected ) {

			//POP.intersected.material.emissive.setHex( POP.intersected.currentHex );
			POP.intersected.material.color.setHex( POP.intersected.currentHex );
			POP.intersected.material.opacity = POP.intersected.currentOpacity;
			//POP.intersected.scale.copy( POP.intersected.currentScale );

		}

		POP.intersected = undefined;

		divPopUpData.innerHTML = `No item selected`;
		
		divPopUpImage.innerHTML = '';


	}

	POP.setPopUp( event );

}



POP.setPopUp = function( event ) {

	if ( POP.intersected === undefined ){

		if ( event.type === 'touchstart' ) {

			divPopUp.style.display = 'none';

		}

		document.body.style.cursor = 'auto';

		return;

	}

	divPopUpData.innerHTML = POP.getPopUpText();

	divPopUp.style.display = '';

	document.body.style.cursor = 'pointer';

}


POP.getPopUpText = function() {

	//console.log( 'POP.intersected.userData', POP.intersected.userData );

	const geometry = JSON.stringify( POP.intersected.userData, null, 2 ).slice( 2, -2 ).replace( /"/g, '' ).replace( /(\D),/g, '$1<br>' );

	const materialName = POP.intersected.userData.modifier;
	let materialText;

	if ( rad.json.materials.length > 0 ) {

		const materialJson = rad.json.materials.find( item => item.name === materialName );
		materialText = JSON.stringify( materialJson, null, 2 ).slice( 2, -2 ).replace( /"/g, '' ).replace( /(\D),/g, '$1<br>' );

	} else {

		materialText = 'color #' + POP.intersected.currentHex;

	}

	const txt =
	`
		<h3>Geometry</h3>
		${ geometry }
		<h3>Material</h3>
		${ materialText}
	`;

	return txt;

}


POP.onDocumentMouseDown = function( event ) {

	divPopUp.style.display = 'none';

}



POP.onDocumentTouchStart = function( event ) {

	//	event.preventDefault();

	event.clientX = event.touches[0].clientX;
	event.clientY = event.touches[0].clientY;

	onDocumentMouseMove( event );

}
