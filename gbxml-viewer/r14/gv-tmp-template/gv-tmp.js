// Copyright 2018 Ladybug Tools authors. MIT License


/*global THREE, THR, GBX,COR */
/* jshint esversion: 6 */

	var TMP = { release: '14.1'};

	// add a description property - for inserting into menus?

	TMP.initTemplate = function() {  //called from bottom of file

		TMP.setMenuItems( CORdivMenuItems );

		COR.setPanelButtonInit( CORbutSettings );

	}



	TMP.setMenuItems = function( target ) {


		target.innerHTML =
			`<details id=detTemplate open >

				<summary>Template &nbsp; <a href=#../gv-tmp-template/README.md title="TMP${ TMP.release }" >?</a> </summary>

				<p><button class="btn btn-secondary btn-sm" >button button </button></p>
				<p><output>output</output><br><input type=range ></p>


			<p><a href="#../../plugins/iframe-carousel-r1.html" >iframe-carousel-r1.html</a></p>

			<p><a href="#../../plugins/view-github-issues.html" >view-github-issues.html</a></p>

			<p><a href="#../../tootoo-more/plugins/view-stl.html" >view-stl.html</a></p>

			<p><a href="#../../utilities/invertocat.png" >invertocat.png</a></p>

			<p><a href="https://bootswatch.com" target=_blank >bootswatch.com 🗗</a></p>

				<p>lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?</p>

			</details>`;

	}



	TMP.initTemplate();
