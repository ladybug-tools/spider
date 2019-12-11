// copyright 2019 Theo Armour. MIT license.
// 2019-12-06
// jshint esversion: 6
// jshint loopfunc: true



const GTO = {}

GTO.geometries = [

	["Box", 20, 20, 50 ],
	["Cone", 30, 60, 30],
	["Cylinder", 15, 30, 60, 20 ],
	["Dodecahedron", 50, 0],
	["Icosahedron", 50, 0],
	["Octahedron", 50, 0],
	["Sphere", 50, 50, 20 ],
	["Tetrahedron", 50],
	["Torus", 40, 10, 12, 32 ],
	["TorusKnot", 50, 18, 64, 24 ]
];


GTO.getMenu = function () {

	const gto = GTO.geometries.map( ( geometry, index ) =>
		`<option>${ geometry[ 0 ] }</option>`
	).join( "" );

	const htm =
		`
<details open >

	<summary>Generate Three.js objects</summary>

	<p>Create new geometries by algorithm</p>

	<p>
		<select onchange=GTO.drawGeometry(this.selectedIndex) size=10 >${ gto }</select>
	</p>

</details>
	`;

	return htm;

}


GTO.drawGeometry = function ( index ) {

	window.dispatchEvent(eventResetAll);

	scene.remove( mesh );

	const items = GTO.geometries[index];
	const name = items[ 0 ];
	const geometry = new THREE[ name + "BufferGeometry" ]( ...items.slice( 1 ) );
	const material = new THREE.MeshNormalMaterial( { opacity: 0.85, side:2, transparent: true });

	mesh = new THREE.Mesh(geometry, material);
	mesh.name = name.toLowerCase();

	const pos = mesh.geometry.attributes.position.array;
	//pos[ Math.floor( pos.length * Math.random() ) ] = -50;
	//pos[ 2 ] = -50;
	scene.add(mesh);

	zoomObjectBoundingSphere( mesh )

}
