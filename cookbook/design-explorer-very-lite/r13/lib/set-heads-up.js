
/* Copyright 2018 Ladybug Tools authors. MIT License */

let xDown = null;
let yDown = null;
let intersected = null;


function initHeadsUp() {

	//window.objects = [];
	window.mouse3D = new THREE.Vector2(); // try 2D

	// move to init??
	window.intersected = undefined;
	renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
	renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
	renderer.domElement.addEventListener( 'touchstart', onDocumentTouchStart, false );

}



function onDocumentMouseMove( event ) {

	event.preventDefault();

	if ( event.buttons > 0 ) { return; }

	mouse3D = new THREE.Vector3( ( event.clientX - divThreeJs.offsetLeft ) / divThreeJs.clientWidth * 2 - 1,
		-( event.clientY - divThreeJs.offsetTop ) / divThreeJs.clientHeight * 2 + 1,
		0.5 );

	//mouse.x = ( event.clientX - offsetX ) / viewWidth * 2 - 1,
	//mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

	const raycaster = new THREE.Raycaster();
	raycaster.setFromCamera( mouse3D, camera );

	const intersects = raycaster.intersectObjects( object3D.children );

	if ( intersects.length > 0 ) {

		if ( intersected != intersects[ 0 ].object ) {

			if ( intersected ) {

				intersected.material.emissive.setHex( intersected.currentHex );
				intersected.material.opacity = intersected.currentOpacity;
				intersected.scale.copy( intersected.currentScale );

			}

			intersected = intersects[ 0 ].object;

			intersected.currentHex = intersected.material.emissive.getHex();
			intersected.material.emissive.setHex( 0xff0000 );

			intersected.currentOpacity = intersected.material.opacity;
			intersected.material.opacity = 1;

			intersected.currentScale = intersected.scale.clone();
			//console.log( 'intersected.currentScale', intersected.currentScale );
			intersected.scale.copy( intersected.currentScale.clone().multiplyScalar( 1.5 ) );

		}

	} else {

		if ( intersected ) {

			intersected.material.emissive.setHex( intersected.currentHex );
			intersected.material.opacity = intersected.currentOpacity;
			intersected.scale.copy( intersected.currentScale );

		}

		intersected = undefined;

		divData.innerHTML =
		`
			${ projectName }<br>
			Items: ${ csv.lines.length.toLocaleString() }<br>
			No item selected
		`;
		divImage.innerHTML = '';

	}

	setHeadsUp( event );

}



function setHeadsUp( event ) {

	if ( intersected === undefined ){

		if ( event.type === 'touchstart' ) {

			headsUp.style.display = 'none';

		}

		document.body.style.cursor = 'auto';
		return;

	}

	headsUp.style.display = '';

	const items = `<small>Fields:<br>` + csv.fields.map( ( item, index ) => `${ index } ${ item } <b>` + intersected.userData.data[ index ] ).slice( 0, csv.indexImg ).join( '</b><br>' );

	txt = `${ items }</small><br>`;

	divData.innerHTML = txt;

	divImage.innerHTML = csv.getPics ? '<img src="' + csv.urlImg + intersected.userData.data[csv.indexImg] + '" width=200 >' : 'no image yet';

	document.body.style.cursor = 'pointer';

}



function onDocumentMouseDown( event ) {

	headsUp.style.display = 'none';

}



function onDocumentTouchStart( event ) {

	//	event.preventDefault();

	event.clientX = event.touches[0].clientX;
	event.clientY = event.touches[0].clientY;

	onDocumentMouseMove( event );

}
