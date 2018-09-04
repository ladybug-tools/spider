
/* Copyright 2018 Ladybug Tools authors. MIT License */


const LEG = {};

LEG.setLegend = function( target = divLegend ) {

	const txt = SEL.colors.map( ( color, index ) =>

		`<p>
			<button class="legend" onclick="LEG.setColorVisible('${ color }');"
			style="background-color: rgb${ color }; width: 15rem;" >button ${ index + 1 }</button>
		</p>`

	);

	target.innerHTML =
	`
		<h3 id=legendTitle ></h3>
		<p>Click on a color to highlight its members</p>
		<p>${ txt.join( '' ) }</p>
	`;

};



LEG.setColorVisible = function( triplet ) {

	const color = 'rgb' + triplet;

	for ( let child of object3D.children ) {

		if ( child.material.color.getStyle() === color ) {

			child.material.opacity = SEL.opacityVisible;
			child.children[ 0 ].material.opacity = SEL.opacityVisible;

		} else {

			child.material.opacity = 0; //opacityVisibleFalse;
			child.children[ 0 ].material.opacity = SEL.opacityVisibleFalse;

		}

	}

};
