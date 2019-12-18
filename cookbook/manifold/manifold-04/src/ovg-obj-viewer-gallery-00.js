

// copyright 2019 Theo Armour. MIT license.
// 2019-12-18 v0.00.00
/* global THREE, zoomObjectBoundingSphere, divMessage, eventResetAll, scene, mesh, controls*/
// jshint esversion: 6
// jshint loopfunc: true

const OVG = {};


OVG.objData = [

	"Mr.doob",
	"https://rawcdn.githack.com/mrdoob/three.js/master/examples/models/obj/cerberus/Cerberus.obj",
	"https://rawcdn.githack.com/mrdoob/three.js/master/examples/models/obj/emerald.obj",
	"https://rawcdn.githack.com/mrdoob/three.js/master/examples/models/obj/female02/female02.obj",
	"https://rawcdn.githack.com/mrdoob/three.js/master/examples/models/obj/female02/female02_vertex_colors.obj",
	"https://rawcdn.githack.com/mrdoob/three.js/master/examples/models/obj/male02/male02.obj",
	"https://rawcdn.githack.com/mrdoob/three.js/master/examples/models/obj/tree.obj",
	"https://rawcdn.githack.com/mrdoob/three.js/master/examples/models/obj/verify/verify.obj",
	"https://rawcdn.githack.com/mrdoob/three.js/master/examples/models/obj/vive-controller/vr_controller_vive_1_5.obj",
	"https://rawcdn.githack.com/mrdoob/three.js/master/examples/models/obj/walt/WaltHead.obj",
	"https://rawcdn.githack.com/mrdoob/three.js/master/examples/models/obj/female02/female02.obj",

	"josdirksen",
	"https://rawcdn.githack.com/josdirksen/learning-threejs/master/assets/models/GuyFawkesMask_Cycles.obj",
	"https://rawcdn.githack.com/josdirksen/learning-threejs/master/assets/models/butterfly.obj",
	"https://rawcdn.githack.com/josdirksen/learning-threejs/master/assets/models/city.obj",
	"https://rawcdn.githack.com/josdirksen/learning-threejs/master/assets/models/jessica/jessica.obj",
	"https://rawcdn.githack.com/josdirksen/learning-threejs/master/assets/models/pinecone.obj",

	"assimp",
	"https://rawcdn.githack.com/assimp/assimp/master/test/models-nonbsd/OBJ/rifle.obj",
	"https://rawcdn.githack.com/assimp/assimp/master/test/models-nonbsd/OBJ/segment.obj",
	"https://rawcdn.githack.com/assimp/assimp/master/test/models/OBJ/WusonOBJ.obj",
	"https://rawcdn.githack.com/assimp/assimp/master/test/models/OBJ/box.obj",
	"https://rawcdn.githack.com/assimp/assimp/master/test/models/OBJ/box_UTF16BE.obj",
	"https://rawcdn.githack.com/assimp/assimp/master/test/models/OBJ/empty_mat.obj",
	"https://rawcdn.githack.com/assimp/assimp/master/test/models/OBJ/regr01.obj",
	"https://rawcdn.githack.com/assimp/assimp/master/test/models/OBJ/space_in_material_name.obj",
	"https://rawcdn.githack.com/assimp/assimp/master/test/models/OBJ/spider.obj",
	"https://rawcdn.githack.com/assimp/assimp/master/test/models/OBJ/testline.obj",
	"https://rawcdn.githack.com/assimp/assimp/master/test/models/invalid/malformed2.obj",

	"jaanga/3d-models",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/aircraft/a-330/a-330.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/aircraft/saab-37-viggen/saab-37-viggen.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/aircraft/tu-160-blackjack/tu-160-blackjack.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/architecture/barcelona-pavilion/barcelona-pavilion.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/architecture/factory-complex/factory-complex.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/architecture/robie-house/robie-house.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/architecture/schroder-house/schroder-house.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/architecture/sydney-opera-house/sydney-opera-house.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/architecture/villa-savoye/villa-savoye.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/sculpture/maschera.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/sculpture/12335_The_Thinker_v3_l2.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/sculpture/LibertStatue.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/sculpture/elefante.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/sculpture/nefertiti/nefertiti.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/sculpture/pipa.ply.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/sculpture/david.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/sculpture/duck.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/sculpture/hand.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/sculpture/skull.obj"
];



OVG.getMenu = function () {

	const options = OVG.getOptions();

	const htm =
		`
<details ontoggle=OVG.getScript();>

	<summary>OBJ viewer gallery</summary>

	<div id=divMessage >
		Select an OBJ file to load from curated list of OBJ files from around the Internet.
		Some files are very large and take a long time to load.
		You may need to zoom way in or way out to see the model.
	</div>

	<select id=selObj onchange=OVG.loadObj(this.value) size=30>${ options}</select>
<!--
	<p>
		<button onclick=getFilesObj(); >get files obj</button>
	</p>

	<p>
		Help for adding new files. See source code.
	</p>
-->
	<div id=divFilesObj ></div>

	<hr>
	
</details>
	`;

	return htm;

};



OVG.getOptions = function () {

	const options = OVG.objData.map((item, index) => {

		if (item.startsWith("http")) {

			return `<option value=${index}>${item.split("/").pop()}</option>`;

		} else {

			return `<optgroup label="${item}" ></optgroup>`;

		}

	});

	return options;

};


OVG.getScript = function () {

	if (!OVG.objLoader) {

		OVG.objLoader = document.body.appendChild(document.createElement('script'));
		//OVG.objLoader = setEditContents;
		OVG.objLoader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r110/examples/js/loaders/OBJLoader.js";

	}

};


OVG.loadObj = function (index) {

	const url = OVG.objData[index];
	const loader = new THREE.OBJLoader();
	const name = url.split("/").pop().replace(/.obj/i, "").replace( /_/g, "-" ).toLowerCase();

	loader.load(

		url,

		function (object) {

			window.dispatchEvent(eventResetAll);

			scene.remove(mesh);

			const geometryMerged = OVG.getMeshesMergeGeometry(object);

			const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide, transparent: true });

			mesh = new THREE.Mesh(geometryMerged, material);

			mesh.name = name;

			scene.add(mesh);

			controls.reset();

			zoomObjectBoundingSphere();

		},


		function (xhr) {

			divMessage.innerHTML = `<p>${xhr.loaded.toLocaleString()} loaded</p>`;
			//console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

		},

		function (error) {

			divMessage.innerHTML = `<p>An error happened: ${error}</p>`;

		}
	);

};


OVG.getMeshesMergeGeometry = function (object) {

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

	geometry.applyMatrix(new THREE.Matrix4().makeScale(scale, scale, scale));

	const geometryBuffer = new THREE.BufferGeometry().fromGeometry(geometry);

	return geometryBuffer;

};





function getFilesObj() {


	//url = "https://api.github.com/repos/mrdoob/three.js/git/trees/master?recursive=1";
	//prefix = "https://rawcdn.githack.com/mrdoob/three.js/master/";

	// url = "https://api.github.com/repos/assimp/assimp/git/trees/master?recursive=1";
	// prefix = "https://rawcdn.githack.com/assimp/assimp/master/";


	// url = "https://api.github.com/repos/jaanga/3d-models/git/trees/gh-pages?recursive=1";
	// prefix = "https://rawcdn.githack.com/jaanga/3d-models/gh-pages/";

	const url = "https://api.github.com/repos/josdirksen/learning-threejs/git/trees/master?recursive=1";
	const prefix = "https://rawcdn.githack.com/josdirksen/learning-threejs/master/";

	fetch( url )
	.then( response => response.json() )
	.then( json => {

		const files = json.tree.filter(item => item.path.endsWith(".obj")).map(item => item.path);

		const txt = files.map(item => `"${prefix}${item}"`).join(",\n");
		divFilesObj.innerHTML = `<textarea style=height:50ch;width:100%; >${ txt }</textarea>`;

		console.log( 'files', files  );

	} );

}
