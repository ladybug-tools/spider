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

		if ( butMenuSave.style.backgroundColor !== 'pink' ) {

			let txt =
			'<p>' +
				'<button id=butSave onclick=saveFile() > Save file </button>' +
			'</p>' +

			'';

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

				'<details id = detSave open >' +
					'<summary>Save  File</summary>' +

					'<p>' + txt + '<p>' +

					'<p>surfaces: ' + icw.surfaceMeshes.children.length + '</p>' +

					'<p>2018-02-02 ~ This first release of Save only saves a copy of the original file. ' +
						'Edits and saving edits will be added in the near future. ' +
					'</p>' +

				'</details>' +

				divMenuItems.innerHTML +

			'';

// following causes error when inside an iframe in a read me
			if ( parent.setIfrThree ) { setIfrThree(); }

			butMenuSave.style.backgroundColor = 'pink';

		} else {

//			element = document.getElementById( 'detTemplate' );

			detSave.remove();

			butMenuSave.style.backgroundColor = '';

		}

	}


	function saveFile() {

		const xmlText = new XMLSerializer().serializeToString( gbxml );
//console.log( 'xmlText', xmlText );

		var blob = new Blob( [ xmlText ] );
		var a = document.body.appendChild( document.createElement( 'a' ) );
		a.href = window.URL.createObjectURL( blob );
		a.download = gbjson.Campus.Building.id + '.xml';
		a.click();
//		delete a;
		a = null;

	}