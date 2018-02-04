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


	init();

	function init() {

		if ( butEditor.style.backgroundColor !== 'pink' ) {

			let txt = 'lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?';

			icw = ifrThree.contentWindow;
			THREE = icw.THREE;
			renderer = icw.renderer;
			scene = icw.scene;
			camera = icw.camera;

			gbxml = icw.gbxml;
			gbjson = icw.gbjson;

		// clean up
			surfaceGroup = icw.scene.getObjectByName( 'surfaceMeshes' );
			surfaceMeshesChildren = surfaceGroup.children;
			surfaceEdges = icw.scene.getObjectByName( 'surfaceEdges' );
			surfaceMeshes = icw.surfaceMeshes;


console.log( 'scene', icw );
console.log( 'gbjson', gbjson );
console.log( 'surfaceMeshes', surfaceMeshes );

			divMenuItems.innerHTML =

				'<details id = detEditor open>' +
					'<summary>Template</summary>' +

					'<p>' + txt + '<p>' +
					'<p>surfaces: ' + icw.surfaceMeshes.children.length + '</p>' +

				'</details>' +

				divMenuItems.innerHTML +

			'';

// following causes error when inside an iframe in a read me
			if ( parent.setIfrThree ) { setIfrThree(); }

			butEditor.style.backgroundColor = 'pink';

		} else {

//			element = document.getElementById( 'detTemplate' );

			detEditor.remove();

			butEditor.style.backgroundColor = '';

		}

	}

