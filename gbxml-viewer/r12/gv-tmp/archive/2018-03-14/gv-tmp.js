/*global

THR, THREE, GBX, GBV, window, document,butSettings, detSettings,divMenuItems,rngOpacity,rngViewExplodeVertical

*/

// Copyright 2018 Ladybug Tools authors. MIT License

	var TMP = {};

	//self starting using ();

	TMP.initTemplate = function () {

		if ( window.butMenuLoad ) {

			TMP.butMenuTemplate = butMenuLoad;

			TMP.title = 'gv-tmp - gbXML Viewer Template';;
			document.title = TMP.title;
			aDocumentTitle.innerHTML = TMP.title;
			TMP.butMenuTemplate.innerHTML = TMP.title;

		} else {

			TMP.butMenuTemplate = butMenuTemplate;

		}

		if ( TMP.butMenuTemplate.style.backgroundColor !== 'var( --but-bg-color )' ) {

			divMenuItems.innerHTML =

				`<details id = detTemplate  class=app-menu open>

					<summary>Template</summary>

					<div id = "divTemplate" style=width:300px; ></div>

				</details>

			` + divMenuItems.innerHTML;

			initMenuTemplate();

			TMP.butMenuTemplate.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			detTemplate.remove();

			TMP.butMenuTemplate.style.backgroundColor = '';

		}

		function initMenuTemplate() {

			let txt = 'lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?';

			divTemplate.innerHTML =
				`
				<textarea id=txtTemplate placeholder="a place for sticky notes" style="height:100px;width:100%;" onchange=localStorage.setItem("gvTemplate",this.value);></textarea>
			<hr>`;

			gvTemplate = localStorage.getItem( 'gvTemplate' );
			txtTemplate.value = gvTemplate;

		}

	}();




