	// Copyright 2018 Ladybug Tools authors. MIT License
	/* globals THREE, COR, THR, GBX */
	/* jshint esversion: 6 */

	let GAL = {};


	GAL.initGallery = function( button ) {

		//console.log( 'but', button );

		if ( button.id === 'butGalleryGbxml' ) {

			GAL.user = 'GreenBuildingXML';
			GAL.repo = '/Sample-gbXML-Files';
			GAL.pathRepo = '';
			GAL.title = 'gbXML Sample Files on GitHub';
			GAL.button = butGalleryGbxml;

		} else if ( button.id === 'butGallerySampleFiles' ) {

			GAL.user = 'ladybug-tools';
			GAL.repo = '/spider';
			GAL.pathRepo = 'gbxml-sample-files/';
			GAL.title = 'Ladybug Tools/Spider gbXML Viewer sample files on GitHub';
			GAL.button = butGallerySampleFiles;

		} else if ( button.id === 'butGallerySamples2' ) {

			GAL.user = 'ladybug-tools';
			GAL.repo = '/spider';
			GAL.pathRepo = 'gbxml-sample-files/samples-2/';
			GAL.title = 'Ladybug Tools/Spider gbXML Viewer sample files #2 on GitHub';
			GAL.button = butGallerySamples2;

		} else if ( button.id === 'butGalleryBuildWell' ) {

			GAL.user = 'ladybug-tools';
			GAL.repo = '/spider';
			GAL.pathRepo = 'cookbook/07-create-exportable-buildings/test-gbxml-files/';
			GAL.title = 'Build Well on GitHub';
			GAL.button = butGalleryBuildWell;

		}

		GAL.urlGitHubApiContents = 'https://api.github.com/repos/' + GAL.user + GAL.repo + '/contents/' + GAL.pathRepo;
		GAL.urlGitHubPage = 'https://rawgit.com/' + GAL.user + GAL.repo + '/master/' + GAL.pathRepo;
		GAL.urlGitHubSource = 'https://github.com/' + GAL.user + GAL.repo + '/blob/master/' + GAL.pathRepo;

		if ( GAL.button.style.fontStyle !== 'italic' ) {

			divMenuItems.innerHTML =

				`<details id = detGallery class=app-menu open>

					<summary>${GAL.title}</summary>

					<div id=divGallery ></div>

					'<hr>

				</details>

			`;

			//console.log( 'gal', GAL );
			COR.requestFileAndProgress( GAL.urlGitHubApiContents, GAL.callbackGitHubMenu );

			GAL.button.style.cssText = 'background-color: pink !important; font-style: italic; font-weight: bold';

		} else {

			detGallery.remove();

			GAL.button.style.backgroundColor = '';
			GAL.button.style.fontStyle = '';
			GAL.button.style.fontWeight = '';

		}

	};



	GAL.callbackGitHubMenu = function( xhr ) {

		const iconInfo = `<img src=${COR.iconGitHubMark} height=14 >`;
		//const threeDefaultFile = '../gv-gbx/gv-gbx.html';
		const response = xhr.target.response;
		const files = JSON.parse( response );

		let txt = '';

		for ( let i = 0; i < files.length; i++ ) {

			const file = files[ i ];

			if ( file.name === 'README.md' || !file.name.endsWith( '.xml' ) ) { continue; }

			const fileName = encodeURI( file.name );

			txt +=

			`<div style=margin:4px 0; >

				<a href=${ GAL.urlGitHubSource + fileName } title="Edit me" >${iconInfo}</a>

				<a href=#${ GAL.urlGitHubPage + fileName } title="${ file.size.toLocaleString() } bytes"  >${ file.name }</a>

				<a href=${ COR.threeDefaultFile }#${ GAL.urlGitHubPage }${ fileName } title="Link to just this file" >&#x2750;</a>

			</div>`;

		}

		divGallery.innerHTML = txt;

	};


