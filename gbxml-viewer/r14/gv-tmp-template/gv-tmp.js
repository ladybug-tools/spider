// Copyright 2018 Ladybug Tools authors. MIT License


/*global THREE, THR, GBX,COR */
/* jshint esversion: 6 */

	var TMP = { release: '14.1'};


	TMP.initTemplate = function() {  //called from bottom of file

		TMP.setMenuItems( CORdivMenuItems );

		COR.setPanelButtonInit( CORbutSettings );

	}



	TMP.setMenuItems = function( target ) {


		target.innerHTML =
			`<details id=detTemplate class=app-menu open >

				<summary>Template &nbsp; <a href=#../gv-tmp-template/README.md title="TMP${ TMP.release }" >?</a> </summary>

				<p>lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?</p>
			</details>`;

	}

	TMP.initTemplate();
