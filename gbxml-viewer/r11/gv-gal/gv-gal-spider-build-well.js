

	var user = 'ladybug-tools'
	var repo = '/spider';
	var pathRepo = 'cookbook/07-create-exportable-buildings/test-gbxml-files/';

	var urlGitHubApiContents = 'https://api.github.com/repos/' + user + repo + '/contents/' + pathRepo;

	var urlGitHubPage = 'https://rawgit.com/' + user + repo + '/master/' + pathRepo;
	var urlGitHubSource = 'https://github.com/' + user + repo + '/blob/master/' + pathRepo;

	var iconInfo = '<img src="https://status.github.com/images/invertocat.png" height=14 >';
	var threeDefaultFile = '../gbxml-viewer10-01-core/gbxml-viewer10-core.html';


	init();

	function init() {

		if ( butGalleryBuildWell.style.backgroundColor !== 'var( --but-bg-color )' ) {

			divMenuItems.innerHTML =

				'<details id = detGalleryBuildWell open>' +

					'<summary>Build Well on GitHub</summary>' +

					'<div id=divGalleryBuildWell ></div>' +

					'<hr>' +

				'</details>' +

				divMenuItems.innerHTML +

			'';

			COR.requestFileAndProgress( urlGitHubApiContents, callbackGitHubMenu );

			butGalleryBuildWell.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			detGalleryBuildWell.remove();

			butGalleryBuildWell.style.backgroundColor = '';

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

		divGalleryBuildWell.innerHTML = txt;

	}

