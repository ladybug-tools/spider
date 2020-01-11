const JTE = {}


JTE.init = function () {


	JTVpButtons.innerHTML += JTE.getMenu();

	window.addEventListener( "onloadglf", JTE.onLoad, false );

}


JTE.getMenu = function() {

	const htm =
	`
		<button onclick=JTE.addFaceIds() >add face buttons</button>
	`;

	return htm
};


JTE.onLoad = function () {

	JTE.addFaceIds();

	const details = JTVdivJsonTree.querySelectorAll( "details" );

	details[ 0 ].open = true;

}

JTE.addFaceIds = function () {

	id = 0;

	const rooms = GFL.json.rooms;

	for ( let room of rooms ) {

		const faces = room.faces;

		for ( let face of faces ) {

			face.id = id;

			face.button = `<button onclick=console.log(this.value);JTE.addHighLight(this.value); value=${ id++ } >faces</button>`;

		}
	}

	JTVdivJsonTree.innerHTML = JTV.parseJson( JTV.root, GFL.json, 0 );

	//htm = `<button onclick=console.log(this.value); value=23 >faces</button>`;

	//JTVdivJsonTree.innerHTML = JTVdivJsonTree.innerHTML.replace( /xxxx/g, htm );
};


JTE.addHighLight = function ( id ) {

	//console.log( 'id', id );

	// shape = PHJ.group.children.filter( child => {
	// 	console.log( 'child.userData.id ', child.userData.id,id  );
	// 	return child.userData.id === id
	// } )

	let shape;
	for ( child of PHJ.group.children ) {

		//console.log( 'child', child.userData.id, id );

		if ( child.userData.id === +id ) {
			shape = child;
			break;
		}
	}

	//console.log( 'shape', shape, shape, id );

	shape.material.color = new THREE.Color( "black" );
	shape.material.needsUpdate = true;

}


JTE.init();
