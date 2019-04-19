
// Fetch a all the files in a github repo
// Build a categorized menu with links:
// to source on GitHub, or to embed in target or to display full screen

const urlGitHubAPITree = 'https://api.github.com/repos/ladybug-tools/spider/git/trees/master?recursive=1';
const urlDefaultFile = 'https://rawgit.com/ladybug-tools/spider/master/radiance-sample-files/sample-file.rad';
const urlGitHubSource = 'https://github.com/ladybug-tools/spider/blob/master/';
const urlGitHubPage = 'https://rawgit.com/ladybug-tools/spider/master/';

const iconGitHubMark = '<img src = "https://pushme-pullyou.github.io/github-mark-64.png" height=14 style=vertical-align:middle>';



function fetchGitHubApiTree( url, target ) {

	// https://github.com/jaanga/jaanga.github.io/tree/master/cookbook-html/examples/fetch/fetch-github-api-tree

	const request = new Request( url );

	fetch( request )
		.then( response => response.json() )
		.then( json => callbackGitHubApiTree( json, target ) );

}



function callbackGitHubApiTree ( results, target ) {

	//console.log( 'results', results.tree );

	files = [];
	const folders = [];

	let txt = '';

	for ( let file of results.tree ) {

		if (  !file.path.includes( 'radiance-sample-files' ) || !file.path.endsWith( '.rad' ) || file.path.includes( 'zip-files') || file.path.includes( 'rad-tutorial-files' ) ) { continue; }

		files.push( file );

	}
	//console.log( 'files', files );


	for ( let file of files ) {

		const arrFile = file.path.split( '/' )
		const fileName = arrFile.pop();
		const folder = arrFile.pop();
		//console.log( 'folder', folder );

		if ( folder === 'radiance-sample-files' ) { continue; }

		if ( folders.indexOf( folder ) === -1 ) {

			folders.push( folder );
			txt += `<h4 style=margin:0; >${ folder }</h4>`;

		}

		txt +=

		`<div style=margin:10px; >

			<a href=${ urlGitHubSource + file.path } title="Edit me on GitHub" >${ iconGitHubMark }</a>

			<a href=#${ urlGitHubPage + file.path } onclick=setDivLog(this); title="${ file.size.toLocaleString() } bytes" >${ fileName}</a>

			<a href=${ urlGitHubPage +  file.path  } title="Link to just this file" >&#x2750;</a>

		</div>`;

	}

	target.innerHTML = `<p>files: ${ files.length } </p> ${ txt } <hr>`;

	// needs fixing??
	setDivLog = function( that ) {

		divLog.innerHTML = `loaded: ${that.innerText} <br> ${that.title}`;

	}

}
