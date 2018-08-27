

function create_xyz(xyz){

	return  {'x': xyz[0], 'y': xyz[1], 'z': xyz[2]};

}

function parse_polygon(data) {
	/* convert a polygon line to a JSON object */
	// separate x, y, z coordinates
	const pt_list = data.slice(6);

	// put every 3 item in a separate array
	let vertices = [];
	while (pt_list.length > 0)
		vertices.push(pt_list.splice(0, 3));

	let xyz = vertices.map(item => create_xyz(item));

	const polygon = {
		'modifier': data[0],
		'type': data[1],
		'name': data[2],
		'vertices': xyz
	};
	return ['surfaces', polygon];
}

function parse_sphere(data) {
/* convert a sphere line to a JSON object */
const sphere = {
	'modifier': data[0],
	'type': data[1],
	'name': data[2],
	'center_pt': {'x': data[6], 'y': data[7], 'z': data[8]},
	'radius': data[9]
};
return ['surfaces', sphere];
}

function parse_cone(data) {
/* convert a cone line to a JSON object */
const cone = {
	'modifier': data[0],
	'type': data[1],
	'name': data[2],
	'center_pt_start': {'x': data[6], 'y': data[7], 'z': data[8]},
	'center_pt_end': {'x': data[9], 'y': data[10], 'z': data[11]},
	'radius_start': data[12],
	'radius_end': data[13]
};
return ['surfaces', cone];
}

function parse_cylinder(data) {
/* convert a cylinder line to a JSON object */
const cylinder = {
	'modifier': data[0],
	'type': data[1],
	'name': data[2],
	'center_pt_start': {'x': data[6], 'y': data[7], 'z': data[8]},
	'center_pt_end': {'x': data[9], 'y': data[10], 'z': data[11]},
	'radius': data[12]
};
return ['surfaces', cylinder];
}

function parse_plastic(data) {
/* convert a plastic line to a JSON object */
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
/* convert a glass line to a JSON object */
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
/* convert a trans line to a JSON object */
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
/* convert a glow line to a JSON object */
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
/* convert a mirror line to a JSON object */
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


function parse_base(data) {
	/* convert a radiance primitive line to a JSON object */
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

	return ['other', rad_object];
}