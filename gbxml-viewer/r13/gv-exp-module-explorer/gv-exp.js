/*global

THR, THREE, GBX, GBV, window, document,butSettings, detSettings,divMenuItems,rngOpacity,rngViewExplodeVertical

*/

// Copyright 2018 Ladybug Tools authors. MIT License

	var EXP = {};

	//self starting using ();

	EXP.initTemplate = function () {

		if ( window.butMenuLoad ) {

			EXP.butModuleExplorer = butMenuLoad;

			EXP.title = 'gv-tmp - gbXML Viewer Module Explorer';;
			document.title = EXP.title;
			aDocumentTitle.innerHTML = EXP.title;
			EXP.butModuleExplorer.innerHTML = EXP.title;

		} else {

			EXP.butModuleExplorer = butModuleExplorer;

		}

		if ( EXP.butModuleExplorer.style.backgroundColor !== 'var( --but-bg-color )' ) {

			divMenuItems.innerHTML =

				`<details id = detModuleExplorer  class=app-menu open >

					<summary>Module Explorer Read Me </summary>


					<p>The Left Menu Modules</p>

					<div><a href="#../gv-app-application/README.md" >APP ~ Application Module</a><br>
					The base script that loads all various modules as and when they may be needed</div>

					<div><a href="#../gv-gal-gallery/README.md" >GAL ~ Gallery Module</a><br>
					Provide menu access to sample files you can use for learning or testing</div>


					<p>The Features Modules</p>

					<div><a href="#../gv-set-settings/README.md" >SET ~ Settings Module</a><br>
					Update a variety of model display and viewing parameters</div>


					<p>The Things to Try Modules</p>

					<div><a href="#../gv-exp-module-explorer/README.md" >EXP ~ Modile Explorer Module</a><br>
					Easy access to all the documentation in the Read me files</div>


					<p>The Back-End Essentials</p>

					<div><a href="#../gv-cor-core/README.md" >
						COR ~ Core Module</a><br>
						Manage events and the Left & Right Menus<br>
						Load and display markdown files in the Pop-Up window
					</div>

					<div><a href="#../gv-thr-threejs/README.md" >THR ~ Three.js Module</a><br>
					Instantiate the Three.js engine</div>

					<div><a href="#../gv-gbp-gbxml-parse/README.md" >GBP ~ gbXML Parse Module</a><br>
					Translate gbXML text to JSON then to 3D meshes</div>

					<div><a href="#../gv-tmp-template/README.md" >TMP ~ Template Module</a><br>
					Templates used to help start creating new modules</div>

					<div><a href="#../assets/README.md" >Assets</a><br>
					Access to style sheets, images, documents and utilities</div>

<!--
					<div><a href="#../gv-gbx/README.md" >GBV ~ gbXML Viewer Module</a><br>
					toggle/zoom the display of elements</div>


					<div><a href="#../gv-rep/README.md" >REP ~ Reports Module</a><br>
					Locate and display the elements/div>

					<div><a href="#../gv-iss/README.md" >ISS ~ Issues Module</a><br>
					Identify the issues with a model</div>

					<div><a href="#../gv-hud/README.md" >HUD ~ Heads-up Display Module</a><br>
					Interactive surface parameters display</div>

					<div><a href="#../gv-sav/README.md" >SAV ~ Save Changes Module</a><br>
					Save the modifications for reuse in later updates</div>

					<div><a href="#../gv-ana/README.md" >ANA ~ Sun Path / Analemma Module</a><br>
					Display the Sun light for any date and time</div>

					<div><a href="#../gv-cam/README.md" >CAM ~ First Person Camera Module</a><br>
					Fly around and through your models</div>

					-->

					<hr>

				</details>

			` + divMenuItems.innerHTML;


			EXP.butModuleExplorer.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			detModuleExplorer.remove();

			EXP.butModuleExplorer.style.backgroundColor = '';

		}

		function initMenuTemplate() {

			let txt = 'lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?';

			divTemplate.innerHTML = '<p>' + txt + '</p><hr>';

		}

		location.hash = '#../assets/about-gbxml-viewer.md'

		THR.controls.autoRotate = false;
		THR.controls.keys = false;

	}();




