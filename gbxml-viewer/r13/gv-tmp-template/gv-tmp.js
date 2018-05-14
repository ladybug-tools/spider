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

			TMP.setPanelTemplate();

			TMP.butMenuTemplate.style.cssText = 'background-color: pink !important; font-style: italic; font-weight: bold';

		} else {

			divMenuItems.innerHTML = '';

			TMP.butMenuTemplate.style.fontStyle = '';
			TMP.butMenuTemplate.style.backgroundColor = '';
			TMP.butMenuTemplate.style.fontWeight = '';

		}

		divLog.innerHTML = '';
		THR.controls.autoRotate = false;
		THR.controls.keys = false;

	};


	TMP.setPanelTemplate = function() {

		divMenuItems.innerHTML =

		`<details id = "detTemplate" class = "app-menu" open >

			<summary>Template Panel Summary</summary>

			<div id = "TMPdivShowHide" ></div>

			<div id = "TMPdivEditSurface" ></div>

			<div id = "TMPdivTemplate" ></div>

			<hr>

		</details>`;

		TMPdivShowHide.innerHTML = GBI.getPanelShowHide();

		TMPdivEditSurface.innerHTML = GBI.getPanelEditSurface();

		let txt = 'lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?';

		TMPdivTemplate.innerHTML =

		`<details open >
			<summary>Template Panel Items</summary>

			<p>
				<input type=range id=inpClip2 max=50 min=-50 step=1 value=-10
					oninput=outClip2.value=inpClip2.value;SET.updateCLipX(); title="-50 to 50: OK" >
			</p>

			<textarea id=txtTemplate placeholder="a place for sticky notes" style="height:100px;width:100%;" onchange=localStorage.setItem("gvTemplate",this.value);></textarea>

			<div id=TMPdivElement ></div>
			<div id=TMPdivInputSelect ></div>

		</details>`;

		gvTemplate = localStorage.getItem( 'gvTemplate' );

		txtTemplate.value = gvTemplate;

		TMPdivElement.innerHTML = GBI.getElementPanel();

		const options =
		`<option>aaa bbb ccc</option>
		<option>bbb ccc ddd</option>
		<option>cccc ddd eee</option>
		`;

		//TMPdivInputSelect.innerHTML = GBI.getDivInputSelect(  'aaa', 'items', 'ccc', options );

	}


	TMP.initTemplate();

