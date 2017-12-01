// Copyright 2017 Ladybug Tools authors. MIT License


	var divAppMenu = divAppMenu || undefined;

	var icw;

	init();

	function init() {

		if ( !divAppMenu ) {

			divAppMenu= document.body.appendChild( document.createElement( 'div' ) );
			divAppMenu.style.cssText = 'background-color: white; border: 1px solid red; max-width: 350px; opacity: 0.85; ' +
				' padding: 10px; position: fixed; right: 30px; top: 20px; z-index:100000; ';

		}

		icw = ifrThree.contentWindow;

console.log( 'scene', icw );

console.log( 'campusSurfaces', icw.campusSurfaces );

console.log( 'gbjson', icw.gbjson );

		let txt = 'lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?';

		divAppMenu.innerHTML = 
			txt +
			'<p>surfaces: ' + icw.campusSurfaces.children.length + '</p>';

	}