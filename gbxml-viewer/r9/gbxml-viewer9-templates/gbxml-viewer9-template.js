// Copyright 2017 Ladybug Tools authors. MIT License


	var icw;
	var THREE;
	var scene;
	var gbjson;
	var surfaceMeshes;

	init();

	function init() {

		if ( butTemplate.style.backgroundColor !== 'pink' ) {

			let txt = 'lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?';

			icw = ifrThree.contentWindow;
			THREE = icw.THREE;
			scene = icw.scene;
			gbjson = icw.gbjson;
			surfaceMeshes = icw.surfaceMeshes;

console.log( 'scene', icw );
console.log( 'gbjson', gbjson );
console.log( 'surfaceMeshes', surfaceMeshes );

			divMenuItems.innerHTML = 

				'<details id = detTemplate open>' +
					'<summary>Template</summary>' +

					'<p>' + txt + '<p>' +
					'<p>surfaces: ' + icw.surfaceMeshes.children.length + '</p>' +

				'</details>' +

				divMenuItems.innerHTML +

			'';

			setIfrThree();

			butTemplate.style.backgroundColor = 'pink';

		} else {

			element = document.getElementById( 'detTemplate' );

			element.remove();

			butTemplate.style.backgroundColor = '';

		}

	}

