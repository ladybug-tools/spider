

	var user = 'ladybug-tools'
	var repo = '/spider';
	var pathRepo = 'gbxml-sample-files/';

	var urlGitHubApiContents = 'https://api.github.com/repos/' + user + repo + '/contents/' + pathRepo;

	var urlGitHubPage = 'https://rawgit.com/' + user + repo + '/master/' + pathRepo;
	var urlGitHubSource = 'https://github.com/' + user + repo + '/blob/master/' + pathRepo;

	var iconInfo = '<img src="https://pushme-pullyou.github.io/github-mark-64.png" height=14 >';
	var threeDefaultFile = '../gbxml-viewer10-01-core/gbxml-viewer10-core.html';

	init();

	function init() {

		if ( butGallerySampleFiles.style.fontStyle !== 'italic' ) {

			divMenuItems.innerHTML =

				'<details id = detSampleFiles  class=app-menu open >' +
					'<summary>Ladybug Tools/Spider gbXML Viewer sample files on GitHub</summary>' +

					'<p id=pSampleFiles ></p>' +

					'<hr>' +

				'</details>' +

				divMenuItems.innerHTML +

			'';

			COR.requestFileAndProgress( urlGitHubApiContents, callbackGitHubMenu );

			butGallerySampleFiles.style.cssText = 'background-color: pink !important; font-style: italic; font-weight: bold';

		} else {

			detSampleFiles.remove();

			butGallerySampleFiles.style.backgroundColor = '';
			butGallerySampleFiles.style.fontStyle = '';
			butGallerySampleFiles.style.fontWeight = '';


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

				' <a href=' + COR.threeDefaultFile + '#' + urlGitHubPage + fileName + ' title="Link to just this file" >&#x2750;</a> ' +

			'</div>';

		}

		pSampleFiles.innerHTML = txt;

	}

