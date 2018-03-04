/*global

THR, THREE, GBX, GBV, window, document,butSettings, detSettings,divMenuItems,rngOpacity,rngViewExplodeVertical

*/

// Copyright 2018 Ladybug Tools authors. MIT License

	var TMP = {};

	TMP.initTemplate = function () {

		if ( butSaveEdits.style.backgroundColor !== 'var( --but-bg-color )' ) {

			divMenuItems.innerHTML =

				`<details id = detTemplate  class=app-menu open>

					<summary>Save your edits to a file</summary>

					<div id = "divTemplate" style=width:300px; ><div>

					<hr>

				</details>

			` + divMenuItems.innerHTML;

			initMenuTemplate();

			butSaveEdits.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			detTemplate.remove();

			butSaveEdits.style.backgroundColor = '';

		}

		function initMenuTemplate() {

			let txt =
			`
				<p>Save your edits in the Heads-up Display to a file for reuse with next incoming gbXML source file update</p>

				<p><button> start a fresh session save edits session</button></p>

				<p><button> save your edits session to a file</button></p>

				<p><button>open an edits session file and apply the edits to the current model</button></p>

			`;

			divTemplate.innerHTML = '<p>' + txt + '<p>';

		}

	}();




