

	var divAppMenu = divAppMenu || undefined;

	var gal = gal || {};

	gal.user = 'ladybug-tools'
	gal.repo = '/spider';
	gal.pathRepo = 'read-gbxml/data-files/';

	gal.iconInfo = '<img src="https://status.github.com/images/invertocat.png" height=14 >';

	gal.threeDefaultFile = '../gbxml-viewer8-01-core/gbxml-viewer8-core-r3.html';

	gal.urlGitHubApiContents = 'https://api.github.com/repos/' + gal.user + gal.repo + '/contents/' + gal.pathRepo;

	gal.urlGitHubPage = 'https://rawgit.com/' + gal.user + gal.repo + '/master/' + gal.pathRepo;
	gal.urlGitHubSource = 'https://github.com/' + gal.user + gal.repo + '/blob/master/' + gal.pathRepo;


	gal.callbackGitHubMenu = function( xhr ) {

		const response = xhr.target.response;
		const files = JSON.parse( response );

		let txt = '';

		for ( let i = 0; i < files.length; i++ ) {

			file = files[ i ];

			if ( file.name === 'README.md' || !file.name.endsWith( '.xml' ) ) { continue; }

			const fileName = encodeURI( file.name );

			txt += 

			'<div style=margin-bottom:8px; >' +

				'<a href=' + gal.urlGitHubSource + fileName + ' title="Edit me" >' + gal.iconInfo + '</a>' +

				' <a href=#' + gal.urlGitHubPage + fileName + ' title="' + file.size.toLocaleString() + ' bytes"  >' + file.name + '</a> ' +

				' <a href=' + gal.threeDefaultFile + '#' + gal.urlGitHubPage + fileName + ' title="Link to just this file" >&#x2750;</a> ' +

			'</div>';

		}

		divAppMenu.innerHTML = txt;

	}



	gal.requestFile = function( url, callback ) {

		const xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', url, true );
		xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
//		xhr.onprogress = function( xhr ) { console.log(  'bytes loaded: ' + xhr.loaded.toLocaleString() ) }; /// or something
		xhr.onload = callback;
		xhr.send( null );

	}


	init();

	function init() {

		if ( !divAppMenu ) {

			divAppMenu= document.body.appendChild( document.createElement( 'div' ) );
			divAppMenu.style.cssText = 
				'background-color: white; border: 1px solid red; max-height: 95%; max-width: 350px; opacity: 0.85; ' +
				' overflow: auto; padding: 10px; position: fixed; right: 30px; top: 20px; z-index: 100000; ';

		}

		gal.requestFile( gal.urlGitHubApiContents, gal.callbackGitHubMenu );

	}


