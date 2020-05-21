// copyright 2019 Theo Armour. MIT license.
// See pushme-pullyou/templates-01/threejs-hamburger/v-0-01/src/dss-display-scene-settings-01.js
// 2019-12-18 v0.00.00
/* global THREE, zoomObjectBoundingSphere, divMessage, eventResetAll, scene, mesh, meshPlane, controls */
// jshint esversion: 6
// jshint loopfunc: true

const OFR = {};

OFR.getMenu = function () {

	const htm =
		`
<details ontoggle=OFR.getScript(); >

	<summary>File open OBJ file</summary>

	<p>Open a file using the file dialog box</p>

	<p><input type=file id=inpFile onchange=OFR.openFile(this); accept = '.mtl, .obj' multiple ></p>

	<div id=OFRdivMessage ></div>

</details>
	`;

	return htm;

};



OFR.getScript = function () {

	if (!OFR.objLoader) {

		OFR.objLoader = document.body.appendChild(document.createElement('script'));
		OFR.objLoader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r110/examples/js/loaders/OBJLoader.js";

	}

};


OFR.openFile = function (files) {

	const reader = new FileReader();
	const loader = new THREE.OBJLoader();

	reader.onload = function (event) {

		//txtArea.innerHTML = reader.result;

		window.dispatchEvent(eventResetAll);

		OFRdivMessage.innerHTML =
			'<p>name: ' + files.files[0].name + '<br>' +
			'size: ' + files.files[0].size.toLocaleString() + ' bytes<br>' +
			'type: ' + files.files[0].type + '<br>' +
			'modified: ' + files.files[0].lastModifiedDate.toLocaleDateString() +
			'</p>';

		obj = loader.parse(reader.result);

		OFR.drawMesh(obj);

	}

	reader.readAsText(files.files[0]);

};


OFR.drawMesh = function (object) {


	scene.remove(mesh);

	const geometryMerged = OFR.getMeshesMergeGeometry(object);

	const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide, transparent: true });

	mesh = new THREE.Mesh(geometryMerged, material);

	mesh.name = name;

	scene.add(mesh);

	controls.reset();

	zoomObjectBoundingSphere();

	//scene.remove(mesh );

	// mesh = new THREE.Group();

	// const meshes = object.children.map(obj => getObjMesh(obj))

	// mesh.add(...meshes);

	// const bBox = new THREE.Box3().setFromObject(mesh);
	// const radius = bBox.getBoundingSphere(new THREE.Vector3()).radius;
	// const scale = 100 / radius;
	// mesh.scale.set(scale, scale, scale);
	// mesh.position.y = -50;

	// scene.add(mesh);

	// controls.reset();

};



OFR.getMeshesMergeGeometry = function (object) {

	const geometry = new THREE.Geometry();

	object.children.forEach(child => {

		child.geometry = child.geometry.type === "BufferGeometry" ?
			new THREE.Geometry().fromBufferGeometry(child.geometry) : child.geometry;

		if (!child.geometry) { console.log('child', child); }

		const p = child.position.clone();

		const clone = child.geometry.clone();
		clone.applyMatrix(new THREE.Matrix4().makeTranslation(-p.x, -p.y, -p.z));
		clone.applyMatrix(new THREE.Matrix4().makeRotationX(0.5 * Math.PI));

		geometry.merge(clone);

	});

	geometry.center();

	geometry.computeBoundingBox();

	const size = geometry.boundingBox.getSize( new THREE.Vector3() );

	const scale = 100 / size.z;

	geometry.applyMatrix( new THREE.Matrix4().makeScale(scale, scale, scale ) );

	return geometry;

};