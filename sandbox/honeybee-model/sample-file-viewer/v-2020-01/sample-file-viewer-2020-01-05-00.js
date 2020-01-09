
const GLF = {};

GLF.url = "https://api.github.com/repos/ladybug-tools-in2/honeybee-model-schema/git/trees/master?recursive=1";
GLF.prefix = "https://rawcdn.githack.com/ladybug-tools-in2/honeybee-model-schema/master/";


GLF.init = function() {

	divGetFiles.innerHTML = GLF.getMenu();



};


GLF.urls = [


];

GLF.getMenu = function() {

	const htm = `
<details ontoggle=GLF.getFileNames(); open>

	<summary>honeybee model-schema samples</summary>

	<p>A list of files from <a href="https://github.com/ladybug-tools-in2/honeybee-model-schema/tree/master/honeybee_model_schema/samples" target="_blank">ladybug-tools-in2
	</a> on GitHub.</p>

	<select id=GLFselFiles onchange=GLF.getFile(this.value) size=10 ></select>

	<p>
<!--
		<button id=but onclick=GLF.getFile(GLFselFiles.selectedIndex); >get file</button>
-->

		<button onclick=GLF.listFiles() >list all files</button>

		<button id=but onclick=GLF.getFileJson(GLFselFiles.selectedIndex); >get file json</button>

		<button id=butGetFile onclick=GLF.getFileJson(24) >get file 24 as json</button>

	</p>


	<div id=GLFdivOnLoad ></div>

	<div id=GLFdivFiles ></div>



</details>
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

		} );

};



GLF.getOptions = function () {

	const options = GLF.filesData.map( ( item, index ) =>
		`<option value=${ index } title="${ item.size.toLocaleString() } bytes" >${ index + 1 } ${ item.path.split( "/" ).pop() }</option>` );
	//const options = GLF.urls.map( ( item, index ) => `<option value=${ index }>${ item.split( "/" ).pop() }</option>` );

	GLFdivOnLoad.innerHTML = `<p>files found: ${ options.length }</p>`;

	//GLF.getFileJson( 24 );


	return options;

};



GLF.getFile = function ( index ) {

	const url = GLF.prefix + GLF.filesData[ index ].path;
	//const url = GLF.urls[ index ];
	console.log( '', url );

	GLFdivFiles.innerHTML =
		`
<div style=height:40ch;resize:both;overflow:hidden;}>
	<iframe src=${ url } ><iframe>
</p>
`;

}


GLF.getFileJson = function ( index ) {

	const url = GLF.prefix + GLF.filesData[ index ].path;
	//const url = GLF.urls[ index ];
	console.log( 'url', url );

	xhr = new XMLHttpRequest();
	xhr.open( 'GET', url, true );
	xhr.onerror = ( xhr ) => console.log( 'error:', xhr  );
	xhr.onprogress = ( xhr ) => console.log( 'bytes loaded:', xhr.loaded );
	xhr.onload = ( xhr ) => {

		GLF.json = JSON.parse( xhr.target.response );
		console.log( 'json', GLF.json );

		if ( GLF.json.rooms ) { GLF.processJson(); }

		GLFdivFiles.innerHTML = `
	<textarea style=height:400px;width:100%;>${ xhr.target.response }</textarea>

`;

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

				console.log( 'point', point );
			}

		}
	}
};




GLF.listFiles = function () {

	//const url = GLF.prefix + GLF.filesData[ index ];
	//console.log( '', url );

	files = GLF.filesData.map( url => `"${GLF.prefix }${ url.path }"`).join( ",<br>");
	GLFdivFiles.innerHTML = files;
		`

`;

}



GLF.init();