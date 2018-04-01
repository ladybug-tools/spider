/*global

THR, THREE, GBX, GBV, window, document,butSettings, detSettings,divMenuItems,rngOpacity,rngViewExplodeVertical

*/

// Copyright 2018 Ladybug Tools authors. MIT License

	var TMP = {};

	TMP.initTemplate = function () {

		if ( window.butMenuLoad ) {

			TMP.butMenuTemplate = butMenuLoad;

			TMP.title = 'gv-tmp - gbXML Viewer Template';;
			document.title = TMP.title;
			aDocumentTitle.innerHTML = TMP.title;
			TMP.butMenuTemplate.innerHTML = TMP.title;

		} else {

			divPopUp.style.display = 'none';
			TMP.butMenuTemplate = butMenuTemplate;

		}

		if ( TMP.butMenuTemplate.style.fontStyle !== 'italic' ) {

			divMenuItems.innerHTML =

				`<details id = "detTemplate" class = "app-menu" open >

					<summary>Template Summary</summary>

					<div id = "divTemplate" ></div>

					<hr>

				</details>

			` + divMenuItems.innerHTML;

			initMenuTemplate();

			TMP.butMenuTemplate.style.cssText = 'background-color: pink !important; font-style: italic; font-weight: bold';

		} else {

			detTemplate.remove();

			TMP.butMenuTemplate.style.backgroundColor = '';
			TMP.butMenuTemplate.style.fontStyle = '';
			TMP.butMenuTemplate.style.fontWeight = '';

		}

		function initMenuTemplate() {

			let txt = 'lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?';

			divTemplate.innerHTML =
			`
				<p>
					<b>visibility toggles</b><br>
					<button class="w3-theme-d1 w3-hover-theme w3-hover-border-theme" onclick=GBP.surfaceMeshes.visible=!GBP.surfaceMeshes.visible; >surfaces</button>
						<button class="w3-theme-d1 w3-hover-theme w3-hover-border-theme" onclick=GBP.surfaceEdges.visible=!GBP.surfaceEdges.visible; >edges</button>
						<button class="w3-theme-d1 w3-hover-theme w3-hover-border-theme" onclick=GBP.setAllVisible(); >all</button>
				</p>

				<p>
					<input type=range id=inpClip2 max=50 min=-50 step=1 value=-10
						oninput=outClip2.value=inpClip2.value;SET.updateCLipX(); title="-50 to 50: OK" >
				</p>

				<textarea id=txtTemplate placeholder="a place for sticky notes" style="height:100px;width:100%;" onchange=localStorage.setItem("gvTemplate",this.value);></textarea>

				<p>` + txt + `</p>

			`;

			gvTemplate = localStorage.getItem( 'gvTemplate' );

			txtTemplate.value = gvTemplate;
		}


		divLog.innerHTML = '';
		THR.controls.autoRotate = false;
		THR.controls.keys = false;

	}();




