
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

	<select id=GLFselFiles onchange=GLF.getFile(this.value) size=20 ></select>

	<p>
		<button id=but onclickGLF.getFile(); >get file</button>
		<button onclick=GLF.listFiles() >list files</button>
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

			GLF.filesData = json.tree.filter( item => item.path.includes( "samples" ) ).filter( item => item.path.endsWith( ".json" ) ).map( item => item.path );
			//GLF.filesData = json.tree.filter( item => item.path.includes( "textures" ) ).filter( item => item.path.endsWith( ".jpg" ) ).map( item => item.path );

			GLFselFiles.innerHTML = GLF.getOptions();

		} );

};



GLF.getOptions = function () {

	const options = GLF.filesData.map( ( item, index ) => `<option value=${ index }>${ item.split( "/" ).pop() }</option>` );
	//const options = GLF.urls.map( ( item, index ) => `<option value=${ index }>${ item.split( "/" ).pop() }</option>` );

	GLFdivOnLoad.innerHTML = `<p>files found: ${ options.length }</p>`;

	return options;

};

GLF.getFile = function ( index ) {

	const url = GLF.prefix + GLF.filesData[ index ];
	//const url = GLF.urls[ index ];
	console.log( '', url );

	GLFdivFiles.innerHTML =
		`
<div style=resize:both;overflow:hidden;}>
	<iframe src=${ url } ><iframe>
</p>
`;

}

GLF.listImages = function ( index ) {

	const url = GLF.prefix + GLF.filesData[ index ];
	console.log( '', url );

	files = GLF.filesData.map( url => `"${GLF.prefix }${ url }"`).join( ",<br>");
	GLFdivImages.innerHTML = files;
		`

`;

}

GLF.init();