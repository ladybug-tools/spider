

	var user = 'GreenBuildingXML'
	var repo = '/Sample-gbXML-Files';
	var pathRepo = '';

	var urlGitHubApiContents = 'https://api.github.com/repos/' + user + repo + '/contents/' + pathRepo;
	var urlGitHubPage = 'https://rawgit.com/' + user + repo + '/master/';
	var urlGitHubSource = 'https://github.com/' + user + repo + '/blob/master/' + pathRepo;

	initGalleryGbxml();


	function initGalleryGbxml() {

		ifrThree.contentWindow.requestFile( urlGitHubApiContents, callbackGitHubMenu );

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

		divMenuItems.innerHTML = 

			'<details open>' +
				'<summary>gbXML Sample Files on GitHub</summary>' +
				txt +
			'</details>';

	}

