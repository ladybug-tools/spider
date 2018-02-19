

	var user = 'ladybug-tools'
	var repo = '/spider';
	var pathRepo = 'gbxml-viewer/gbxml-sample-files/';

	var urlGitHubApiContents = 'https://api.github.com/repos/' + user + repo + '/contents/' + pathRepo;

	var urlGitHubPage = 'https://rawgit.com/' + user + repo + '/master/' + pathRepo;
	var urlGitHubSource = 'https://github.com/' + user + repo + '/blob/master/' + pathRepo;

	var iconInfo = '<img src="https://status.github.com/images/invertocat.png" height=14 >';
	var threeDefaultFile = '../gbxml-viewer10-01-core/gbxml-viewer10-core.html';

	init();

	function init() {

		if ( butGallerySampleFiles.style.backgroundColor !== 'var( --but-bg-color )' ) {

			let txt = 'lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?';

			divMenuItems.innerHTML =

				'<details id = detSampleFiles open>' +
					'<summary>Ladybug Tools/Spider gbXML Viewer sample files on GitHub</summary>' +

					'<p id=pSampleFiles ></p>' +

					'<hr>' +

				'</details>' +

				divMenuItems.innerHTML +

			'';

			requestFile( urlGitHubApiContents, callbackGitHubMenu );

			butGallerySampleFiles.style.backgroundColor = 'var( --but-bg-color )';


		} else {

			detSampleFiles.remove();

			butGallerySampleFiles.style.backgroundColor = '';

		}

	}



	function callbackGitHubMenu( xhr ) {

		const response = xhr.target.response;
		const files = JSON.parse( response );

		let txt = '';

		for ( let i = 0; i < files.length; i++ ) {

			file = files[ i ];

			if ( file.name === 'README.md' || !file.name.endsWith( '.xml' ) ) { continue; }

			const fileName = encodeURI( file.name );

			txt +=

			'<div style=margin-bottom:8px; >' +

				'<a href=' + urlGitHubSource + fileName + ' title="Edit me" >' + iconInfo + '</a>' +

				' <a href=#' + urlGitHubPage + fileName + ' title="' + file.size.toLocaleString() + ' bytes"  >' + file.name + '</a> ' +

				' <a href=' + threeDefaultFile + '#' + urlGitHubPage + fileName + ' title="Link to just this file" >&#x2750;</a> ' +

			'</div>';

		}

		pSampleFiles.innerHTML = txt;

	}

