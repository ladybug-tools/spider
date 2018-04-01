/*global

THR, THREE, GBX, GBV, window, document,butSettings, detSettings,divMenuItems,rngOpacity,rngViewExplodeVertical

*/

// Copyright 2018 Ladybug Tools authors. MIT License

	var EXP = {};

	//self starting using ();

	EXP.initTemplate = function () {

		if ( window.butMenuLoad ) { // we are in a test file / Three.js is in an iframe

			const divPopUp = document.body.appendChild( document.createElement( 'div' ) );

			divPopUp.innerHTML =

			`
				<div id = "divPopUpHeader" class="w3-theme-d2 w3-hover-theme" >

					pop-up window / click here to move / click outside to close

					<button class="w3-theme-d1 w3-hover-theme w3-hover-border-theme"  ontouchstart=divPopUp.style.display="none"; onclick=divPopUp.style.display="none"; style=float:right;z-index:200; >&#x2716;</button>

				</div>

				<div id = "divPopUpContents" >ccc</div>

			`;


			divPopUp.style.cssText = ' max-width: 500px; position: absolute; right: 30px; top: 20px;'

			EXP.butModuleExplorer = butMenuLoad;

			EXP.title = 'gv-tmp - gbXML Viewer Module Explorer';;
			document.title = EXP.title;
			aDocumentTitle.innerHTML = EXP.title;
			EXP.butModuleExplorer.innerHTML = EXP.title;

		} else {

			EXP.butModuleExplorer = butModuleExplorer;

		}

		//if ( EXP.butModuleExplorer.style.backgroundColor !== 'var( --but-bg-color )' ) {
		if ( EXP.butModuleExplorer.style.fontStyle !== 'italic' ) {

			divMenuItems.innerHTML =

				`<details id = detModuleExplorer  class=app-menu open >

					<summary>Module Explorer Read Me </summary>

					<p><a href="#../assets/about-gbxml-viewer.md" >About gbXML Viewer</a></p>

					<p>The Left Menu Modules</p>

					<p><a href="#../gv-app-application/README.md" >APP ~ Application Module</a><br>
					The base script that loads all various modules as and when you need them</p>

					<p><a href="#../gv-gal-gallery/README.md" >GAL ~ Gallery Module</a><br>
					Provides menu access to three directories of sample files you may use for learning or testing</p>


					<p>The Features Modules</p>

					<p><a href="#../gv-set-settings/README.md" >SET ~ Settings Module</a><br>
					Update a variety of model display and viewing parameters</p>

					<p><a href="#../gv-rep-reports/README.md" >REP ~ Reports Module</a><br>
					Identify, locate and display all the elements and all their attributes in a model/p>


					<p>The Things to Try Modules</p>

					<p><a href="#../gv-exp-module-explorer/README.md" >EXP ~ Module Explorer Module</a><br>
					Easy access to all the documentation in the Read me files</p>

					<p><a href="#../gv-tmp-template/README.md" >TMP ~ Template Module</a><br>
					Templates to help you start creating new modules</p>

					<p>The Back-End Essentials</p>

					<p><a href="#../gv-cor-core/README.md" >
						COR ~ Core Module</a><br>
						Manages events and the Left & Right Menus<br>
						Loads and displays Markdown files in the Pop-Up window
					</p>

					<p><a href="#../gv-thr-threejs/README.md" >THR ~ Three.js Module</a><br>
					Instantiates the Three.js engine</p>

					<p><a href="#../gv-gbp-gbxml-parse/README.md" >GBP ~ gbXML Parse Module</a><br>
					Translates gbXML text to JSON then to 3D meshes</p>

					<p><a href="#../assets/README.md" >Assets Directory</a><br>
					Provides access to style sheets, images, documents and utilities</p>

					<!--
					<p><a href="#../gv-gbx/README.md" >GBV ~ gbXML Viewer Module</a><br>
					toggle/zoom the display of elements</p>


					<p><a href="#../gv-iss/README.md" >ISS ~ Issues Module</a><br>
					Identify the issues with a model</p>

					<p><a href="#../gv-hud/README.md" >HUD ~ Heads-up Display Module</a><br>
					Interactive surface parameters display</p>

					<p><a href="#../gv-sav/README.md" >SAV ~ Save Changes Module</a><br>
					Save the modifications for reuse in later updates</p>

					<p><a href="#../gv-ana/README.md" >ANA ~ Sun Path / Analemma Module</a><br>
					Display the Sun light for any date and time</p>

					<p><a href="#../gv-cam/README.md" >CAM ~ First Person Camera Module</a><br>
					Fly around and through your models</p>

					-->

					<hr>

				</details>

			` + divMenuItems.innerHTML;


			EXP.butModuleExplorer.style.backgroundColor = 'var( --but-bg-color )';
			EXP.butModuleExplorer.style.cssText = 'background-color: pink !important; font-style: italic; font-weight: bold';

		} else {

			detModuleExplorer.remove();

			EXP.butModuleExplorer.style.backgroundColor = '';
			EXP.butModuleExplorer.style.fontStyle = '';
			EXP.butModuleExplorer.style.fontWeight = '';
		}

		function initMenuTemplate() {

			let txt = 'lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?';

			divTemplate.innerHTML = '<p>' + txt + '</p><hr>';

		}

		location.hash = '#../assets/about-gbxml-viewer.md';

		THR.controls.autoRotate = false;
		THR.controls.keys = false;

	}();




