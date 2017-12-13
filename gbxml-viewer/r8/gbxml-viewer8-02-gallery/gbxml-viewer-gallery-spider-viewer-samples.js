
	var user = 'ladybug-tools'
	var repo = '/spider';
	var pathRepo = 'gbxml-viewer/gbxml-sample-files/';

	var iconInfo = '<img src="https://status.github.com/images/invertocat.png" height=14 >';

	var threeDefaultFile = '../gbxml-viewer8-01-core/gbxml-viewer8-core-r3.html';

	var urlGitHubApiContents = 'https://api.github.com/repos/' + user + repo + '/contents/' + pathRepo;

	var urlGitHubPage = 'https://rawgit.com/' + user + repo + '/master/' + pathRepo;
	var urlGitHubSource = 'https://github.com/' + user + repo + '/blob/master/' + pathRepo;


	init();

	function init() {

		if ( !divAppMenu ) {

			divAppMenu= document.body.appendChild( document.createElement( 'div' ) );
			divAppMenu.style.cssText = 
				'background-color: white; border: 1px solid red; max-height: 95%; max-width: 350px; opacity: 0.85; ' +
				' overflow: auto; padding: 10px; position: fixed; right: 30px; top: 20px; z-index: 100000; ';

		}

		requestFile( urlGitHubApiContents, callbackGitHubMenu );

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

				'<a href=' + urlGitHubSource + fileName + ' title="Edit me" >' + iconInfo + '</a>' +

				' <a href=#' + urlGitHubPage + fileName + ' title="' + file.size.toLocaleString() + ' bytes"  >' + file.name + '</a> ' +

				' <a href=' + threeDefaultFile + '#' + urlGitHubPage + fileName + ' title="Link to just this file" >&#x2750;</a> ' +

			'</div>';

		}

		divAppMenu.innerHTML = txt;

	}

