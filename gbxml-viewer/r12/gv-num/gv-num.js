/*global

THR, THREE, GBX, GBV, window, document,butSettings, detSettings,divMenuItems,rngOpacity,rngViewExplodeVertical

*/

// Copyright 2018 Ladybug Tools authors. MIT License

	var NUM = {};

	NUM.initNumbers = function () {

		if ( window.butMenuLoad ) {

			NUM.butMenuNumbers = butMenuLoad;

			NUM.title = 'gv-NUM - gbXML Viewer Numbers';;
			document.title = NUM.title;
			aDocumentTitle.innerHTML = NUM.title;
			NUM.butMenuNumbers.innerHTML = NUM.title;

		} else {

			NUM.butMenuNumbers = butMenuNumbers;

		}


		if ( NUM.butMenuNumbers.style.backgroundColor !== 'var( --but-bg-color )' ) {

			divMenuItems.innerHTML =

				`<details id = detNumbers  class=app-menu open>

					<summary>Numbers</summary>

					<div id = "divNumbers" ></div>

					<hr>

				</details>

			` + divMenuItems.innerHTML;

			initMenuNumbers();

			NUM.butMenuNumbers.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			detNumbers.remove();

			NUM.butMenuNumbers.style.backgroundColor = '';

		}

		function initMenuNumbers() {

			let txt = 'lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?';

			divNumbers.innerHTML =
			`
				<textarea id=txtNumbers placeholder="a place for sticky notes" style="height:100px;width:100%;" onchange=localStorage.setItem("gvNumbers",this.value);></textarea>

				<details open >
					<summary id = "NUMsumNumbers" >Numbers</summary>
					<div>` + txt + `</div>
				</details>

			`;

			gvNumbers = localStorage.getItem( 'gvNumbers' );
			txtNumbers.value = gvNumbers;
		}

	}();




