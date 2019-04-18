
	var userGallery = 'ladybug-tools'
	var repoGallery = '/spider';
	var pathRepoGallery = 'gbxml-viewer/gbxml-sample-files/';

	var iconInfoGallery = '<img src="https://pushme-pullyou.github.io/github-mark-64.png" height=14 >';

	var threeDefaultFileGallery = '../gbxml-viewer8-01-core/gbxml-viewer8-core-r3.html';

	var urlGitHubApiContentsGallery = 'https://api.github.com/repos/' + userGallery + repoGallery + '/contents/' + pathRepoGallery;

	var urlGitHubPageGallery = 'https://rawgit.com/' + userGallery + repoGallery + '/master/' + pathRepoGallery;
	var urlGitHubSourceGallery = 'https://github.com/' + userGallery + repoGallery + '/blob/master/' + pathRepoGallery;


	init();

	function init() {

		if ( !divAppMenu ) {

			divAppMenu= document.body.appendChild( document.createElement( 'div' ) );
			divAppMenu.style.cssText =
				'background-color: white; border: 1px solid red; max-height: 95%; max-width: 350px; opacity: 0.85; ' +
				' overflow: auto; padding: 10px; position: fixed; right: 30px; top: 20px; z-index: 100000; ';

		}

		requestFile( urlGitHubApiContentsGallery, callbackGitHubMenu );

	}



	function requestFile ( url, callback ) {

		const xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', url, true );
		xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
//		xhr.onprogress = function( xhr ) { console.log(  'bytes loaded: ' + xhr.loaded.toLocaleString() ) }; /// or something
		xhr.onload = callback;
		xhr.send( null );

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

				'<a href=' + urlGitHubSourceGallery + fileName + ' title="Edit me" >' + iconInfoGallery + '</a>' +

				' <a href=#' + urlGitHubPageGallery + fileName + ' title="' + file.size.toLocaleString() + ' bytes"  >' + file.name + '</a> ' +

				' <a href=' + threeDefaultFileGallery + '#' + urlGitHubPageGallery + fileName + ' title="Link to just this file" >&#x2750;</a> ' +

			'</div>';

		}

		divAppMenu.innerHTML = txt;

	}

