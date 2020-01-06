
const GLF = {};

GLF.url = "https://api.github.com/repos/ladybug-tools-in2/honeybee-model-schema/git/trees/master?recursive=1";
GLF.prefix = "https://rawcdn.githack.com/ladybug-tools-in2/honeybee-model-schema/master/";


GLF.init = function() {

	GLFdivGetFiles.innerHTML = GLF.getMenu();

};



GLF.urls = [


];

GLF.getMenu = function() {

	const htm = `
<details ontoggle=GLF.getFileNames(); open>

	<summary>honeybee model-schema samples</summary>

	<p>A list of files from <a href="https://github.com/ladybug-tools-in2/honeybee-model-schema/tree/master/honeybee_model_schema/samples" target="_blank">ladybug-tools-in2
	</a> on GitHub.</p>

	<select id=GLFselFiles onchange=GLF.getFileJson(this.value) size=10 style=width:100%; ></select>

	<p>

	<button onclick=GLF.getTree() >get tree</button>
<!--

		<button id=but onclick=GLF.getFileJson(GLFselFiles.selectedIndex); >get file json</button>

		<button id=butGetFile onclick=GLF.getFileJson(24) >get file 24 as json</button>
-->
	</p>


	<div id=GLFdivOnLoad ></div>


	<div id=GLFdivStrings ></div>

	<p>Properties: TBD</p>

	<div id=GLFdivRooms ></div>

	<div id=GLFdivObjects ></div>

	<br>

	raw json<br>
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

			GLF.getFileJson( 23);

			GLFselFiles.selectedIndex = 23;


		} );

};



GLF.getOptions = function () {

	const options = GLF.filesData.map( ( item, index ) =>
		`<option value=${ index } title="${ item.size.toLocaleString() } bytes" >${ index + 1 } ${ item.path.split( "/" ).pop() }</option>` );
	//const options = GLF.urls.map( ( item, index ) => `<option value=${ index }>${ item.split( "/" ).pop() }</option>` );

	GLFdivOnLoad.innerHTML = `<p>files found: ${ options.length }</p>`;


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
	//console.log( 'url', url );

	xhr = new XMLHttpRequest();
	xhr.open( 'GET', url, true );
	xhr.onerror = ( xhr ) => console.log( 'error:', xhr  );
	//xhr.onprogress = ( xhr ) => console.log( 'bytes loaded:', xhr.loaded );
	xhr.onload = ( xhr ) => {

		GLF.json = JSON.parse( xhr.target.response );
		console.log( 'json', GLF.json );

		jj = GLF.json;

		if ( GLF.json.rooms ) { PHJ.processJson(); }

		GLFdivFiles.innerHTML =
			`<textarea style=height:200px;width:100%;>${ xhr.target.response }</textarea>`;

		GLF.getTree();

	};

	xhr.send( null );

}


GLF.getTree = function() {

	GLFdivStrings.innerHTML = "";
	GLFdivRooms.innerHTML = ""

	for ( item in GLF.json ) {

		//console.log( 'item', GLF.json[ item ] );

		const type = typeof GLF.json[ item ];

		//console.log( 'type', typeof GLF.json[ item ] );

		if ( type === "string" ) {

			GLFdivStrings.innerHTML += `${ item }: ${ GLF.json[ item ] }<br>`;

		} else if ( type === 'object' ) {

			if ( item === "rooms" ) { GLF.parseRooms ( rooms ); }

			if ( Array.isArray( GLF.json[ item ] ) ) {

				arr = GLF.json[ item ];

				//GLFdivArrays.innerHTML +=

				console.log( 'array', GLF.json[ item ] );

			} else {

				console.log( 'object', item, GLF.json[ item ] );

			}

		}


	}
}


GLF.parseRooms = function ( rooms ) {

	const htm = rooms.map( ( room, index ) => {

		console.log( 'ff', room.faces );

		facesHtm = GLF.parseFaces( room.faces );

		txt = `
		<details>
			<summary >Room ${ index + 1 }</summary>

			type: ${ room.type }<br>
			name: ${ room.name }<br>
			display_name: ${ room.display_name }<br>
			properties: <br>
			type: ${ room.properties.program_type }<br>
			program type: ${ room.properties.type }<br>
			energy type: ${ room.properties.energy.type }<br>
			construction set: ${ room.properties.energy.construction_set }<br>

			${ facesHtm }

		</details>
		`;

		console.log( 'room', room );
		return txt;

	} ).join( "");

	GLFdivRooms.innerHTML = htm;

};



GLF.parseFaces = function ( faces ) {

	htm = faces.map( ( face, index ) => {

		txt = `
<details>
<summary>Face ${ index + 1 }</summary>

type: ${ face.type }<br>
name: ${ face.name }<br>
display_name: ${ face.display_name }<br>
face type: ${ face.face_type }<br>
etc...
</details>
`;

		return txt;
	} ).join( "" );

	return htm;


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