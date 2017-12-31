

	var user = 'GreenBuildingXML'
	var repo = '/Sample-gbXML-Files';
	var pathRepo = '';

	var urlGitHubApiContents = 'https://api.github.com/repos/' + user + repo + '/contents/' + pathRepo;

	var urlGitHubPage = 'https://rawgit.com/' + user + repo + '/master/';
	var urlGitHubSource = 'https://github.com/' + user + repo + '/blob/master/' + pathRepo;



	initGalleryGbxml();


	function initGalleryGbxml() {

		if ( !window.divMenuItems ) {

			divMenuItems = document.body.appendChild( document.createElement( 'div' ) );
			divMenuItems.style.cssText = 
				'background-color: white; border: 1px solid crimson; max-height: 95%; max-width: 350px; ' +
				'opacity: 0.85; overflow: auto; padding: 10px; position: fixed; right: 20px; top: 20px; z-index:100000; ' +
			'';

		}

		ifrThree.contentWindow.requestFile( urlGitHubApiContents, callbackGitHubMenu );

	}



	function callbackGitHubMenu( xhr ) {

		const response = xhr.target.response;
		const files = JSON.parse( response );

		let txt = '<h3>gbXML Sample Files on GitHub</h3>';

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

		divMenuItems.innerHTML = txt;

	}

