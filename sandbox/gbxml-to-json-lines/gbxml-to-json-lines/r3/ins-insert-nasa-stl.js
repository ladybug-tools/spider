// Copyright 2019 pushMe-pullYou authors. MIT License
/* global  * /
/* jshint esversion: 6 */



const INS = { "release": "R13.0", "date": "2019-02-02 ~ " };

INS.description =
	`
		Insert NASA STL (INS) provides HTML and JavaScript 'boilerplate' to create a typical TooToo menu.

	`;

INS.currentStatus =
	`
		<h3> Insert NASA STL (INS) ${ INS.release} ~ ${ INS.date }</h3>

		<p>
			${ INS.description }
		</p>
		<p>
		Concept
			<ul>
				<li>Provides default current status text template</li>
				<li>Provides default description text template</li>
				<li>Includes JavaScript code to generate an HTML menu</li>
				<!-- <li></li> -->
			</ul>
		</p>
		<p>
			<a href="" target="_blank" >
				Insert NASA STL Read Me
			</a>
		</p>
		<p>
			Change log
			<ul>
				<li>2019-02-02 ~ First Commit</li>

				<!-- <li></li> -->
			</ul>
		</p>

	`;



INS.getMenuInsertNasaStl = function() {

	const htm =
	`
		<details >

			<summary>Insert NASA STL
				<a id=insHelp class=helpItem href="JavaScript:MNU.setPopupShowHide(insHelp,INS.currentStatus);" >&nbsp; ? &nbsp;</a>
			</summary>

			<div>

				<p><button onclick=INS.insertCassini() >Insert Cassini</button></p>

			</div>

			<div id=log ></div>

		</details>
	`;

	return htm;

};

INS.uriDefaultFile="https://rawgit.com/nasa/NASA-3D-Resources/master/3D%20Models/Cassini%20(A)/cassini.stl";


INS.insertCassini = function() {

	script = document.body.appendChild( document.createElement( 'script' ) );
	script.onload = INS.callbackScript;
	script.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r100/examples/js/loaders/STLLoader.js";

};



INS.callbackScript = function() {

	console.log( '', 23 );
	loadSTLFileByURL( INS.uriDefaultFile );

};



function loadSTLFileByURL( fileName ) {

	//fileName = "https://cdn.jsdelivr.net/gh/nasa/NASA-3D-Resources@master/3D%20Printing/Voyager%20(2017)/Stand.stl"
	console.log( 'fileName', fileName );

	let loader = new THREE.STLLoader();
	loader.crossOrigin = 'anonymous';
	loader.load( fileName, function ( geometry ) {

		addMesh( geometry );

		log.innerHTML = 'File name: ' + fileName.split('/').pop() + '<br>' + '';


		//INS.addStlToJsonl()

	} );

};



INS.addStlToJsonl = function() {


	const txt =

		`{ "id": "${ EJL.index++ }", "time": "${ new Date().toJSON() }", "project": "${ EJL.name }",` +
		`"sourceType": "STL", "action": "add", ` +
		`"element": "instance", ` +
		`"attributes": { $"id": "${ id }",${ name }` +
		`"url": [ ${ coordinates } ], ` +
		`"position": [ ${ coordinates } ], ` +
		`"rotation": [ ${ coordinates } ], ` +
		`"scale": [ ${ coordinates } ], ` +
		`"actor": "${ actor }", ` +
		`"message": "surface" }\n`;

	}

	console.log( 'txt', txt );

	//EJL.jsonl += txt

};



function addMesh( geometry ) {

	//console.log( 'geometry', geometry );

	geometry.center();
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();

	let material = new THREE.MeshNormalMaterial();

	//THR.scene.remove( mesh );
	const mesh = new THREE.Mesh( geometry, material );
	mesh.castShadow = true;
	mesh.position.copy( THRU.axesHelper.position );
	THR.scene.add( mesh );

}




