
const GLF = {};

GLF.url = "https://api.github.com/repos/ladybug-tools-in2/honeybee-model-schema/git/trees/master?recursive=1";
GLF.prefix = "https://rawcdn.githack.com/ladybug-tools-in2/honeybee-model-schema/master/";
GLF.source = "https://github.com/ladybug-tools-in2/honeybee_model_schema/blob/master/honeybee_model_schema/samples/";

GLF.init = function() {

	divGetFiles.innerHTML = GLF.getMenu();

};


GLF.getMenu = function() {

	const htm = `
	<details ontoggle=GLF.getFileNames(); open>

		<summary>Honeybee Model-Schema Samples</summary>

		<p>A list of files from <a href="https://github.com/ladybug-tools-in2/honeybee-model-schema/tree/master/honeybee_model_schema/samples" target="_blank">ladybug-tools-in2
		</a> on GitHub. Click file title to view its contents.</p>

		<select id=GLFselFiles onchange=GLF.getFileJson(this.value) size=10 ></select>

		<div id=GLFdivOnLoad ></div>

		<div id=GLFdivFileLoaded ></div>

	</details>

	<details open>

		<summary>JSON Tree View <span class=help onmouseover=GLFpJsonTreeViewHelp.hidden=false >?</span></summary>

		<p id=GLFpJsonTreeViewHelp onmouseout=GLFpRawJsonHelp.hidden=true hidden >
		JSON rendered to a tree view using <a href="https://github.com/pgrabovets/json-view" target="_blank">json-view</a></p>

		<div id=GLFdivTreeView ></div>

	</details>

	<br>

	<details>

		<summary>Raw JSON file <span class=help onmouseover=GLFpRawJsonHelp.hidden=false >?</span></summary>

		<p id=GLFpRawJsonHelp onmouseout=GLFpRawJsonHelp.hidden=true hidden >
			The plain text JSON source code as read from the GitHub repository</p>

		<textarea id=GLFtxtRawJson style=height:400px;width:100%;></textarea>

	</details>

	<br>

	<hr>

	<center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > <img src="https://ladybug.tools/artwork/icons_bugs/ico/spider.ico" height=24 ></a></center>


`;

	return htm;

};


GLF.getFileNames = function () {

	fetch( GLF.url )
		.then( response => response.json() )
		.then( json => {

			GLF.filesData = json.tree.filter( item => item.path.includes( "samples" ) ).filter( item => item.path.endsWith( ".json" ) ).map( item => item );
			//GLF.filesData = json.tree.filter( item => item.path.includes( "textures" ) ).filter( item => item.path.endsWith( ".jpg" ) ).map( item => item.path );

			GLFselFiles.innerHTML = GLF.getOptions();

			GLFselFiles.selectedIndex = 28;

		} );

};



GLF.getOptions = function () {

	const options = GLF.filesData.map( ( item, index ) =>
		`<option value=${ index } title="${ item.size.toLocaleString() } bytes" >${ index + 1 } ${ item.path.split( "/" ).pop() }</option>` );
	//const options = GLF.urls.map( ( item, index ) => `<option value=${ index }>${ item.split( "/" ).pop() }</option>` );

	GLFdivOnLoad.innerHTML = `<p>Files found: ${ options.length }</p>`;

	GLF.getFileJson( 28 ); // load a default file

	return options;

};



GLF.getFileJson = function ( index ) {

	GLFdivTreeView.innerHTML = "";

	const url = GLF.prefix + GLF.filesData[ index ].path;
	//const url = GLF.urls[ index ];
	console.log( 'url', url );

	xhr = new XMLHttpRequest();
	xhr.open( 'GET', url, true );
	xhr.onerror = ( xhr ) => console.log( 'error:', xhr  );
	//xhr.onprogress = ( xhr ) => console.log( 'bytes loaded:', xhr.loaded );
	xhr.onload = ( xhr ) => {

		GLF.json = JSON.parse( xhr.target.response );
		console.log( 'json', GLF.json );

		GLFdivFileLoaded.innerHTML =
			`<p>File Loaded: <a href="${ GLF.source + GLF.filesData[ index ].path.split( "/" ).pop() }" target="_blank">${ GLF.filesData[ index ].path }</a></p>`;

		jsonView.format( GLF.json, '#GLFdivTreeView' );

		GLFtxtRawJson.value = xhr.target.response;

	};

	xhr.send( null );

}


GLF.processJson = function () {

	rooms = GLF.json.rooms;

	for ( room of rooms ) {

		faces = room.faces;

		for ( face of faces ) {

			boundary = face.geometry.boundary;

			for ( point of boundary ) {

				//console.log( 'point', point );
			}

		}
	}
};


GLF.init();