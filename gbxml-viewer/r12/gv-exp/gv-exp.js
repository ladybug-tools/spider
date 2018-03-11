/*global

THR, THREE, GBX, GBV, window, document,butSettings, detSettings,divMenuItems,rngOpacity,rngViewExplodeVertical

*/

// Copyright 2018 Ladybug Tools authors. MIT License

	var TMP = {};

	TMP.title = 'gv-tmp - gbXML Viewer Template';

	//self starting using ();

	TMP.initTemplate = function () {

		//document.title = TMP.title;
		//aDocumentTitle.innerHTML = TMP.title;
		//butExplore.innerHTML = TMP.title;

		if ( butExplorer.style.backgroundColor !== 'var( --but-bg-color )' ) {

			divMenuItems.innerHTML =

				`<details id = detTemplate  class=app-menu open>

					<summary>Module Read Me Explorer</summary>

					<div id = "divTemplate" style=width:300px; ></div>

					<p>the main menu</p>

					<div><a href="#../gv-app/README.md" >APP ~ Application Module</a><br>
					The base file that call alls the modules</div>

					<p>the essentials</p>

					<div><a href="#../gv-cor/README.md" >COR ~ Core Module</a><br>
					manages markdown and text files</div>

					<div><a href="#../gv-thr/README.md" >THR ~ Three.js Module</a><br>
					the Three.js engine</div>

					<div><a href="#../gv-gbx/README.md" >GBX ~ gbXML parser Module</a><br>
					translate gbXML to JSON then to 3D meshes</div>

					<div><a href="#../gv-gbx/README.md" >GBV ~ gbXML Viewer Module</a><br>
					toggle/zoom the display of elements</div>

					<p>editing tools</p>

					<div><a href="#../gv-set/README.md" >SET ~ Settings Module</a><br>
					update model and viewing parameters</div>

					<div><a href="#../gv-rep/README.md" >REP ~ Reports Module</a><br>
					Locate and display the elements/div>

					<div><a href="#../gv-iss/README.md" >ISS ~ Issues Module</a><br>
					Identify the issues with a model</div>

					<div><a href="#../gv-hud/README.md" >HUD ~ Heads-up Display Module</a><br>
					Interactive surface parameters display</div>

					<div><a href="#../gv-sav/README.md" >SAV ~ Save Changes Module</a><br>
					Save the modifications for reuse in later updates</div>

					<p>more</p>

					<div><a href="#../gv-gal/README.md" >GAL ~ Gallery Module</a><br>
					Sample files you can use</div>

					<div><a href="#../gv-ana/README.md" >ANA ~ Sun Path / Analemma Module</a><br>
					Display the Sun light for any date and time</div>

					<div><a href="#../gv-cam/README.md" >CAM ~ First Person Camera Module</a><br>
					Fly around and through your models</div>


				</details>

			` + divMenuItems.innerHTML;


			butExplorer.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			detTemplate.remove();

			butExplorer.style.backgroundColor = '';

		}

		function initMenuTemplate() {

			let txt = 'lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?';

			divTemplate.innerHTML = '<p>' + txt + '</p><hr>';

		}

	}();




