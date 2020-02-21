// copyright 2019 Theo Armour. MIT license.
// See pushme-pullyou/templates-01/
/* global STMdivSettingsThemeMenu, inpLightness1, inpLightness2, inpLightness3, inpLightness4, inpLightness5 */
// 2020-01-17
// jshint esversion: 6
// jshint loopfunc: true

let STM = {};



STM.init = function () {

	STMdivSettingsThemeMenu.innerHTML = STM.getMenu();

};



STM.getMenu = function () {

	const htm = `

	<details class=details__secondary >

		<summary class=summary__secondary >

			Menu theme colors

			<span class="couponcode" >??<span class="coupontooltip" >
				This script provides a fast, simple and easy interface and code to customize the appearance of a web page
			</span></span>

		</summary>

		<br>

		<p>
			<button onclick=STM.appendScript() >Load theme colors script</button>
			<button onclick=divContent.innerHTML=SHM.getHtml();  >test data</button>
		</p>

		<p>Click the button then drag the sliders that will appear below</p>

		<div id=STMdivThemeMenuColors ></div>

		<br>

	</details>
	`;

	return htm;
};


STM.appendScript = function () {

	STM.getCard()

	const styleSheets = Array.from( document.styleSheets );

	const some = styleSheets.some( sheet => sheet.title === "stm-settings-theme-menu" );

	if ( !some ) {

		const css = document.head.appendChild( document.createElement('link') );
		css.rel = "stylesheet";
		css.href = "settings/theme/v-2020-01-17/stm-settings-theme-menu-01.css";
		css.title = "stm-settings-theme-menu";
		//console.log( 'css', css );

	}

	STM.initialize();

};



STM.getCard = function () {

	const htm = `
<p>
	<button id="btnRed" class=button >red</button>
	<button id="btnBlue" class=button >blue</button>
	<button id="btnGreen" class=button >green</button>
</p>

<p>
	hue <output id=outHue class=menu__output ></output>
	<input type="range" id="inpHue" class=menu__input oninput=STM.onInput(); />
</p>
<p>
	saturation <output id=outSaturation class=menu__output ></output>
	<input type="range" id="inpSaturation" class=menu__input oninput=STM.onInput(); />
</p>
<p>
	lightness1 <output id=outLightness1 class=menu__output ></output>
	<input type="range" id="inpLightness1" class=menu__input oninput=STM.onInput(); />
</p>
<p>
	lightness2 <output id=outLightness2 class=menu__output ></output>
	<input type="range" id="inpLightness2" class=menu__input oninput=STM.onInput(); />
</p>
<p>
	lightness3 <output id=outLightness3 class=menu__output ></output>
	<input type="range" id="inpLightness3" class=menu__input oninput=STM.onInput(); />
</p>
<p>
	lightness4 <output id=outLightness4 class=menu__output ></output>
	<input type="range" id="inpLightness4" class=menu__input oninput=STM.onInput(); />
</p>
<p>
	lightness5 <output id=outLightness5 class=menu__output ></output>
	<input type="range" id="inpLightness5" class=menu__input oninput=STM.onInput(); />
</p>
	`;

	STMdivThemeMenuColors.innerHTML = htm;

};



STM.initialize = function () {

	const txt = localStorage.getItem( "theme" ) || "[]";
	console.log( 'txt', txt );

	const theme = JSON.parse(txt).forEach(item => {
		const key = Object.keys(item)[0];
		const input = (document.querySelectorAll("#" + key)[0].value = item[key]);
	});

	STM.onInput();

	btnRed.onclick = () => {
		inpHue.value = 100;
		STM.resetValues();
		STM.onInput();
	};

	btnBlue.onclick = () => {
		inpHue.value = 66;
		STM.resetValues();
		STM.onInput();
	};

	btnGreen.onclick = () => {
		inpHue.value = 33;
		STM.resetValues();
		STM.onInput();
	};
};


STM.resetValues = function() {
	inpSaturation.value = 50;
	inpLightness1.value = 20;
	inpLightness2.value = 30;
	inpLightness3.value = 50;
	inpLightness4.value = 80;
	inpLightness5.value = 98;
};



STM.onInput = function() {
	document.documentElement.style.setProperty("--main-hue", 3.6 * parseFloat(inpHue.value));
	document.documentElement.style.setProperty("--saturation", inpSaturation.value + "%");
	document.documentElement.style.setProperty("--lightness1", inpLightness1.value + "%");
	document.documentElement.style.setProperty("--lightness2", inpLightness2.value + "%");
	document.documentElement.style.setProperty("--lightness3", inpLightness3.value + "%");
	document.documentElement.style.setProperty("--lightness4", inpLightness4.value + "%");
	document.documentElement.style.setProperty("--lightness5", inpLightness5.value + "%");

	outHue.innerHTML = (3.6 * inpHue.value).toFixed();
	outSaturation.innerHTML = inpSaturation.value + "%";
	outLightness1.innerHTML = inpLightness1.value + "%";
	outLightness2.innerHTML = inpLightness2.value + "%";
	outLightness3.innerHTML = inpLightness3.value + "%";
	outLightness4.innerHTML = inpLightness4.value + "%";
	outLightness5.innerHTML = inpLightness5.value + "%";

	STM.setStorageHsl();
};



STM.setStorageHsl = function() {

	inputs = Array.from( document.querySelectorAll( "details p input" ) );
	
	const theme = inputs.filter( item => item.id.startsWith( "inp" ) ).map(item => {
		return JSON.parse(`{ "${item.id}": ${item.value} }`);
	});

	localStorage.setItem("theme", JSON.stringify(theme));

};



STM.init();