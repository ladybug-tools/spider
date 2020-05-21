// copyright 2020 Theo Armour. MIT license.
// See pushme-pullyou/templates-01/modules/
// 2020-01-17
/* divContent */
// jshint esversion: 6
// jshint loopfunc: true


const STMD = {};



STMD.init = function () {

	STMDdivSettingsThemeMenuDropin.innerHTML = STMD.getMenu();

};



STMD.getMenu = function () {

	const htm = `
<details>

	<summary>
		Menu switcher.js

		<span class="couponcode">?? <span class="coupontooltip">

		<p>
			Demo: <a href="https://dohliam.github.io/dropin-minimal-css/" target="_blank">Drop-in Minimal CSS</a><br>
			Source code: <a href="https://github.com/dohliam/dropin-minimal-css" target="_blank">Drop-in switcher for previewing minimal CSS frameworks</a>
		</p>
		<p>
			This is a quick drop-in CSS switcher to allow for previewing some of the many minimal CSS-only frameworks that are available. See the demo or drop the switcher into your own page to see how different frameworks would look together with your content.
		</p>
		<p>
			This project only includes minimal frameworks, in other words, boilerplate / classless frameworks that require no adjustment of the corresponding HTML and can be simply dropped into the project to provide a starting point for further design. No additional javascript, compiling, pre-processors, or fiddling with classes should be required for these to look good and be responsive.
		</p>


		</span></span>

	</summary>


	<p>
		<button onclick=STMD.appendScript() >Load drop-in script</button>
		<button onclick=divContent.innerHTML=SHM.getHtml();  >test data</button>
	</p>

	<p>Click the button above and then select a theme that will appear in a dropdown box below</p>

	<p>This is a broken, early stage work-in-progress that because of
	<a href="https://dohliam.github.io/dropin-minimal-css/" target="_blank">switcher.js</a>
	does amazing things to a webpage.</p>

	<div id=STMDdivSelect ></div>

</details>`;

	return htm;

};


STMD.appendScript = function () {

	const scripts = Array.from( document.scripts );

	const some = scripts.some( script => script.src === "https://dohliam.github.io/dropin-minimal-css/switcher.js" );

	if ( !some ) {

		const script = document.body.appendChild( document.createElement('script') );
		script.onload = () => {

			STMDdivSelect.innerHTML = switcher.innerHTML;

			navMenu.style.cssText = `
			--mnu-width: calc(22rem - 0ch);
			background-color: #eee;
			border-radius: 0.5ch;
			max-height: calc(100vh - 2ch);
			left: 0;
			margin: 1ch;
			opacity: 0.95;
			overflow: auto;
			padding: 0 1rem;
			position: fixed;
			resize:both;
			transition: left 0.5s;
			top: 0;
			width: var(--mnu-width);
			z-index: 1;`

			divMain.style.cssText = `
			--mnu-width: calc(22rem - 0ch);
			border: 0px solid red;
			left: var(--mnu-width);
			margin: 0;
			padding: 0 1rem;
			position: absolute;
			width: calc(100% - var(--mnu-width));
			`;

			tips = Array.from( document.getElementsByClassName( "coupontooltip" ) );

			console.log( 'tips', tips );
			tips.forEach( tip => {
			tip.style.cssText = `
			border: 0.8ch double #888;
			background: white;
			display: none;
			font: 100% monospace;
			font-size: 1rem;
			font-weight: normal;
			margin-left: -28ch;
			padding: 10px;
			position: absolute;
			z-index: 1000;
			`;

			} )


		}
		script.src = "https://dohliam.github.io/dropin-minimal-css/switcher.js";

		//console.log( 'script', script);

	}

};


STMD.init();