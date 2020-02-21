// copyright 2020 Theo Armour. MIT license.
// See pushme-pullyou/templates-01/modules/template
// 2020-01-15
/* divContent */
// jshint esversion: 6
// jshint loopfunc: true


const GFF = {};


GFF.items = [
	{
		"user": "GreenBuildingXML",
		"repo": "/Sample-gbXML-Files",
		"pathRepo": "",
		"type": ".xml",
		"title": "gbXML.org sample files",
		"subTitle":
			`Files from the
		<a href="https://github.com/GreenBuildingXML/Sample_gbXML_Files" target="_blank">gbXML.org Sample Files</a>
		repository on GitHub.
		Includes a variety of gbXML files from various vendors and organizations.`
	},
	{
		"user": "ladybug-tools",
		"repo": "/spider",
		"pathRepo": "gbxml-sample-files/",
		"type": ".xml",
		"title": "Spider gbXML files",
		"subTitle":
			`Ladybug Tools / Spider
		<a href = "https://www.ladybug.tools/spider/#gbxml-sample-files/" target = "_blank" >sample files</a >
		on GitHub from a variety of sources`
	},
	{
		"user": "ladybug-tools",
		"repo": "/spider",
		"pathRepo": "gbxml-sample-files/samples-2/",
		"type": ".xml",
		"title": "Spider gbXML files #2",
		"subTitle":
			`Ladybug Tools / Spider gbXML Viewer
			<a href = "https://www.ladybug.tools/spider/#gbxml-sample-files-2/" target = "_blank" >sample files #2</a >
			on GitHub from a variety of sources`
	},
	{
		"user": "ladybug-tools",
		"repo": "/spider",
		"pathRepo": "cookbook/07-create-exportable-buildings/test-gbxml-files/",
		"type": ".xml",
		"title": "Build Well gbXML",
		"subTitle":
			`Parametrically created gbXML files from the Spider
		<a href="https://www.ladybug.tools/spider/#build-well/README.md" target="_blank">Build Well</a>
		 contributions to the
		<a href="https://speedwiki.io/" target="_blank">PerKins and Will SPEED</a>
	 	project`
	},
	{
		"user": "ladybug-tools",
		"repo": "/spider",
		"pathRepo": "gbxml-sample-files/zip/",
		"type": ".zip",
		"title": "Spider gbXML ZIP files",
		"subTitle":
			`Ladybug Tools / Spider gbXML
		<a href="https://www.ladybug.tools/spider/#gbxml-sample-files/README.md" target="_blank">sample gbXML data in ZIP files</a>
	 	on GitHub from a variety of sources`
	},
	{
		"user": "ladybug-tools",
		"repo": "/honeybee-schema",
		"pathRepo": "samples/",
		"type": ".json",
		"title": "Honeybee Schema JSON",
		"subTitle":
			`Ladybug Tools / Honeybee Schema
		<a href="https://www.ladybug.tools/honeybee-schema/#README.md" target="_blank">sample data JSON files</a>
	 	on GitHub`
	},
	{
		"user": "ladybug-tools",
		"repo": "/spider",
		"pathRepo": "sandbox/honeybee-schema-builder/honeybee-json-schema-sample-files-by-javascipt/",
		"type": ".json",
		"title": "Honeybee Builder JSON",
		"subTitle":
			`Ladybug Tools / Honeybee Builder
		<a href="https://www.ladybug.tools/spider/#README.md" target="_blank">sample data JSON files</a>
	 	on GitHub`
	},
	{
		"user": "ladybug-tools",
		"repo": "/dragonfly-schema",
		"pathRepo": "samples/",
		"type": ".json",
		"title": "Dragonfly Schema JSON",
		"subTitle":
			`Ladybug Tools / Dragonfly Schem
		<a href="https://www.ladybug.tools/dragonfly-schema/#README.md" target="_blank">sample data JSON files</a>
	 	on GitHub`
	}
];


GFF.iconInfo = `<img src="assets/github-mark-32.png" height=18 style=opacity:0.5;>`;

GFF.init = function () {

	GFFdivGithubFolderFiles.innerHTML = GFF.getMenu();

};


GFF.getMenu = function () {

	const htm = `
<details ontoggle=GFF.getMenuItems() >

	<summary>

		Sample files

		<span class="couponcode">?? <span class="coupontooltip">aaa bbb ccc 123 456</span></span>

	</summary>

	<p>SampleL files you can load, view and experiment with</p>

	<div id=GFFdivMenuItems ></div>

	<div id=GFFdivFileInfo></div>

	<div id="GATdivGithubAccessToken"></div>

</details>`;

	return htm;

};

GFF.getMenuItems = function () {

	const htm = GFF.items.map( ( item, index ) =>
		`
		<details ontoggle="GFFdivFolderFiles${ index}.innerHTML=GFF.getGithubFolderFiles(${index});" >

			<summary id=TMPsumSurfaces >${ index + 1} - ${item.title}</summary>

			<div id=GFFdivFolderFiles${ index} ></div>

		</details>
	`
	).join( "" );

	GFFdivMenuItems.innerHTML = htm;

};


GFF.getGithubFolderFiles = function ( index ) {

	const item = GFF.items[ index ];

	item.urlGitHubApiContents = 'https://api.github.com/repos/' + item.user + item.repo + '/contents/' + item.pathRepo;

	GFF.index = index;

	const htm =
		`
		<p><i>${ item.subTitle}</i></p>

		<div id=GALdivGallery${ index} ></div>

		<p>Click any ${ GFF.iconInfo} icon to view file source code on GitHub.</p>

		<p>Click any file title to view the file in this script.</p>

		<p>Click any ❐ icon to go full screen & get link to individual file.</p>

		<p>Tool tips provide file size.

		<hr>

	`;

	GFF.requestFile( item.urlGitHubApiContents, GFF.callbackGitHubMenu, index );

	return htm;

};



GFF.requestFile = function ( url, callback, index ) {

	GFF.index = index;

	const xhr = new XMLHttpRequest();
	xhr.crossOrigin = 'anonymous';
	xhr.open( 'GET', url, true );
	xhr.onerror = function ( xhr ) { console.log( 'error:', xhr ); };
	xhr.onprogress = onRequestFileProgress;
	xhr.onload = callback;
	xhr.send( null );


	function onRequestFileProgress ( xhr ) {

		let name = xhr.target.responseURL.split( '/' ).pop();

		const item = GFF.items[ GFF.index ];

		name = name ? item.user + '/' + name : `${item.user}  ${item.repo} `;

		GFFdivFileInfo.innerHTML =`
<p>
	Files from: ${ name}<br>
	Bytes loaded: ${ xhr.loaded.toLocaleString()}<br>
</p>`;

	}

};



GFF.callbackGitHubMenu = function ( xhr ) {

	const response = xhr.target.response;
	const files = JSON.parse( response );

	let htm = '';

	const item = GFF.items[ GFF.index ];
	//console.log( 'item', item );

	item.urlGitHubPage = 'https://cdn.jsdelivr.net/gh/' + item.user + item.repo + '@master/' + item.pathRepo;

	item.urlGitHubSource = 'https://github.com/' + item.user + item.repo + '/blob/master/' + item.pathRepo;

	item.threeDefaultFile = "#";

	for ( let file of files ) {

		if ( file.name.toLowerCase().endsWith( item.type ) === false ) { continue; }

		const fileName = encodeURI( file.name );

		htm +=

			`<div style=margin:4px 0; >

			<a href=${ item.urlGitHubSource + fileName} title="Edit me" >${GFF.iconInfo}</a>

			<a href=#${ item.urlGitHubPage + fileName} title="${file.size.toLocaleString()} bytes" >${file.name}</a>

			<a href=${ item.threeDefaultFile}${item.urlGitHubPage}${fileName} title="Link to just this file" target="_blank" >&#x2750;</a>

		</div>`;

	}

	const divGallery = GFFdivGithubFolderFiles.querySelectorAll( "#GALdivGallery" + GFF.index )[ 0 ];
	//console.log( 'divGallery', divGallery );

	divGallery.innerHTML = htm;

};



GFF.init();