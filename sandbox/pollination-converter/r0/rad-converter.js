/* global THREE * /
/* jshint esversion: 6 */

// Copyright 2018 Ladybug Tools authors. MIT License


RAD.converterObjectToJson = function( rad_text ) {
	// probably should arrive as an array??
	//console.log( 'rad_text', rad_text );

	dd = rad_text.replace ( /\t/g, " " );

	const rep_new_line_re = /\s\s+/g;
	const data = dd.replace( rep_new_line_re, " " ).trim().split( " " );
	//console.log( 'data', data  );

	const type = data[ 1 ];
	//console.log( 'type', type );

	if ( !type ) return;

	switch (type) {

		case 'polygon':
			return parse_polygon(data);

		case 'sphere':
			return parse_sphere(data);

		case 'cone':
			return parse_cone(data);

		case 'cylinder':
			return parse_cylinder(data);

		case 'plastic':
			return parse_plastic(data);

		case 'glass':
			return parse_glass(data);

		case 'metal':
			return parse_metal(data);

		case 'trans':
			return parse_trans(data);

		case 'glow':
			return parse_glow(data);

		case 'mirror':
			return parse_mirror(data);

		case 'void':

		default:
			//console.log( 'data', data );
			// this is a generic method that returns the data as values for each line
			return parse_base( data );

	}

}



function parse_polygon( data ) {
	//console.log( 'data', data  );

	// separate x, y, z coordinates
	const pt_list = data.slice( 6 );

	// put every 3 items in a separate array
	let vertices = [];

	while ( pt_list.length > 0 ) {

		vertices.push( pt_list.splice( 0, 3 ).map( vertex => parseFloat( vertex ) ) );

	}

	const polygon = {
		'modifier': data[0],
		'type': data[1],
		'name': data[2],
		'vertices': vertices
	};

	return ['surfaces', polygon ];

}



function parse_sphere(data) {

	const sphere = {
		'modifier': data[0],
		'type': data[1],
		'name': data[2],
		'center_pt': {'x': parseFloat( data[6] ), 'y': parseFloat( data[7] ), 'z': parseFloat( data[8] ) },
		'radius': parseFloat( data[9] )
	};

	return ['surfaces', sphere];

}



function parse_cone(data) {

	const cone = {
		'modifier': data[0],
		'type': data[1],
		'name': data[2],
		'center_pt_start': {'x': parseFloat( data[6] ), 'y': parseFloat( data[7] ), 'z': parseFloat( data[8] ) },
		'center_pt_end': {'x': parseFloat( data[9] ), 'y': parseFloat( data[10] ), 'z': parseFloat( data[11] ) },
		'radius_start': parseFloat( data[12] ),
		'radius_end': parseFloat( data[13] )
	};

	return ['surfaces', cone];

}



function parse_cylinder(data) {

	const cylinder = {
		'modifier': data[0],
		'type': data[1],
		'name': data[2],
		'center_pt_start': {'x': parseFloat( data[6] ), 'y': parseFloat( data[7] ), 'z': parseFloat( data[8] )},
		'center_pt_end': {'x': parseFloat( data[9] ), 'y': parseFloat( data[10] ), 'z': parseFloat( data[11] )},
		'radius': parseFloat( data[12] )
	};

	return ['surfaces', cylinder];
}



function parse_plastic(data) {

	const plastic = {
		'modifier': data[0],
		'type': data[1],
		'name': data[2],
		'r_reflectance': data[6],
		'g_reflectance': data[7],
		'b_reflectance': data[8],
		"specularity": data[9],
		"roughness": data[10]
	};

	return ['materials', plastic];
}



function parse_glass(data) {

	const glass = {
		'modifier': data[0],
		'type': data[1],
		'name': data[2],
		"r_transmittance": data[6],
		"g_transmittance": data[7],
		"b_transmittance": data[8],
		"refraction": data[9]
	};

	return ['materials', glass];
}



function parse_metal(data) {
/* convert a metal line to a JSON object */

	const metal = {
		'modifier': data[0],
		'type': data[1],
		'name': data[2],
		'r_reflectance': data[6],
		'g_reflectance': data[7],
		'b_reflectance': data[8],
		"specularity": data[9],
		"roughness": data[10]
	};

	return ['materials', metal];
}



function parse_trans(data) {

	const trans = {
		'modifier': data[0],
		'type': data[1],
		'name': data[2],
		'r_reflectance': data[6],
		'g_reflectance': data[7],
		'b_reflectance': data[8],
		"specularity": data[9],
		"roughness": data[10],
		"transmitted_diff": data[11],
		"transmitted_spec": data[12]
	};

	return ['materials', trans];

}



function parse_glow(data) {

	const glow = {
		'modifier': data[0],
		'type': data[1],
		'name': data[2],
		'red': data[6],
		'green': data[7],
		'blue': data[8],
		'radius': data[9]
	};

	return ['materials', glow];
}



function parse_mirror(data) {

	const mirror = {
		'modifier': data[0],
		'type': data[1],
		'name': data[2],
		'r_reflectance': data[6],
		'g_reflectance': data[7],
		'b_reflectance': data[8]
	};

	return ['materials', mirror];

}



function parse_base( data ) {

	// convert a radiance primitive line to a JSON object
	// find number of items in each line

	const base_data = data.slice(3);
	const count_1 = parseInt(base_data[0]);
	const count_2 = parseInt(base_data[count_1 + 1]);
	const count_3 = parseInt(base_data[count_1 + count_2 + 2]);

	const l1 = (count_1 == 0) ? [] : base_data.slice(1, count_1 + 1);
	const l2 = (count_2 == 0) ? [] : base_data.slice(count_1 + 2, count_1 + count_2 + 2);
	const l3 = (count_3 == 0) ? [] : base_data.slice(count_1 + count_2 + 3,
		count_1 + count_2 + count_3 + 3);

	const values = {0: l1, 1: l2, 2: l3}

	const rad_object = {
		'modifier': data[0],
		'type': data[1],
		'name': data[2],
		'values': values
	};

	return [ 'other', rad_object ];

}
