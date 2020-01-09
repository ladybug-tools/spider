
const GFL = {};

GFL.url = "https://api.github.com/repos/ladybug-tools-in2/honeybee-model-schema/git/trees/master?recursive=1";
GFL.prefix = "https://rawcdn.githack.com/ladybug-tools-in2/honeybee-model-schema/master/";
GFL.source = "https://github.com/ladybug-tools-in2/honeybee_model_schema/blob/master/honeybee_model_schema/samples/";

GFL.init = function() {

	divGetFiles.innerHTML = GFL.getMenu();

};


GFL.getMenu = function() {

	const htm = `
	<details ontoggle=GFL.getFileNames(); open>

		<summary>Honeybee Model-Schema Samples</summary>

		<p>A list of files from <a href="https://github.com/ladybug-tools-in2/honeybee-model-schema/tree/master/honeybee_model_schema/samples" target="_blank">ladybug-tools-in2
		</a> on GitHub. Tooltips indicate file size in bytes. Click file title to view its contents.</p>

		<select id=GFLselFiles onchange=GFL.getFileJson(this.value) size=10 ></select>

		<div id=GFLdivOnLoad ></div>

		<div id=GFLdivFileLoaded ></div>

	</details>


	<details>

		<summary>Raw JSON file <span class=help onmouseover=GFLpRawJsonHelp.hidden=false >?</span></summary>

		<p id=GFLpRawJsonHelp onmouseout=GFLpRawJsonHelp.hidden=true hidden >
			The plain text JSON source code as read directly from the GitHub repository. The text is editable.</p>

		<textarea id=GFLtxtRawJson style=height:400px;width:100%;></textarea>

	</details>

	<br>



`;

	return htm;

};


GFL.getFileNames = function () {

	fetch( GFL.url )
		.then( response => response.json() )
		.then( json => {

			GFL.filesData = json.tree.filter( item => item.path.includes( "samples" ) ).filter( item => item.path.endsWith( ".json" ) ).map( item => item );
			//GFL.filesData = json.tree.filter( item => item.path.includes( "textures" ) ).filter( item => item.path.endsWith( ".jpg" ) ).map( item => item.path );

			GFLselFiles.innerHTML = GFL.getOptions();

			GFLselFiles.selectedIndex = 28;

		} );

};



GFL.getOptions = function () {

	const options = GFL.filesData.map( ( item, index ) =>
		`<option value=${ index } title="${ item.size.toLocaleString() } bytes" >${ index + 1 } ${ item.path.split( "/" ).pop() }</option>` );
	//const options = GFL.urls.map( ( item, index ) => `<option value=${ index }>${ item.split( "/" ).pop() }</option>` );

	GFLdivOnLoad.innerHTML = `<p>Files found on GitHub: ${ options.length }</p>`;

	GFL.getFileJson( 28 ); // load a default file

	return options;

};


GFL.xhr = new XMLHttpRequest();

GFL.getFileJson = function ( index ) {

	//GFLdivTreeView.innerHTML = "";

	const url = GFL.prefix + GFL.filesData[ index ].path;
	//const url = GFL.urls[ index ];
	//console.log( 'url', url );

	const xhr = GFL.xhr;
	xhr.open( 'GET', url, true );
	xhr.onerror = ( xhr ) => console.log( 'error:', xhr  );
	//xhr.onprogress = ( xhr ) => console.log( 'bytes loaded:', xhr.loaded );
	xhr.onload = ( xhr ) => {

		GFL.json = JSON.parse( xhr.target.response );
		console.log( 'GLF.json', GFL.json );

		const title = GFL.filesData[ index ].path.split( "/" ).pop()
		GFLdivFileLoaded.innerHTML =
			`<p>Link to file loaded. Click to edit.<br> <a href="${ GFL.source + title }" target="_blank" >${ GFL.filesData[ index ].path }</a></p>`;

		GFLtxtRawJson.value = xhr.target.response;


		//window.addEventListener( 'xhr.onload', console.log( '', 23 ), false )

		JTVdivJsonView.innerHTML = JTV.parseJson( title, GFL.json, 0 );

		details = JTVdivJsonView.querySelectorAll( "details" );

		details[ 0 ].open = true;

	};

	xhr.send( null );

}



GFL.processJson = function () {

	rooms = GFL.json.rooms;

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


GFL.init();