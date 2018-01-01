/* Copyright 2018 Ladybug Tools authors. MIT License */

	function initEnvelopeInputFields() {

		if (WWRByFacade == true)
		{
			document.getElementById("divEnvelope").innerHTML =
			'<h2> Envelope by Building </h2>\n'+
			'<p><button onclick=changeWWR(WWRByFacade);>Toogle to WWRByBuilding</button></p>\n'+
			'<table>\n'+
				'<tr>\n'+
					'<td>building wwr %</td><td>number of Windows</td><td>Overhang Depth</td><td>Fin Depth</td>\n'+
				'</tr>\n'+
				'<tr>\n'+
					'<td><input type=number id=inpWwr step=5 onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=noWindows onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=inpOverhangDepth onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=inpFinDepth onchange=updateOpenings(); ></td>\n'+
				'</tr>\n'+
			'</table>\n'+
			'<div>\n'+
				'Window Ratio <output id=windowRatioOut class=floatright ></output>\n'+
				'<input type=range step=0.1 min=0.1 max=0.9 id=inpwindowRatio  style=max-width:300px oninput=updateOpenings(); >\n'+
			'</div>\n'+
			'<table>\n'+
				'<tr>\n'+
					'<td>window Construction Type</td>\n'+
				'</tr>\n'+
				'<tr>\n'+
					'<td><select id=selWindowType onchange=updateConstructions();></select></td>\n'+
				'</tr>\n'+
			'</table>';

			inpWwr.min = 1;
			inpWwr.max = 100;
			inpWwr.value = 40;

			// Assign starting wwr and num of windows
			theBuilding.wwr = parseFloat(inpWwr.value)/100;

			inpwindowRatio.min = 0;
			inpwindowRatio.max = 1;
			inpwindowRatio.value = 0.5;

			theBuilding.windowRatio = parseFloat(inpwindowRatio.value);

			// Note to to self this is a one off here so that the value appears next to the slider when the user first loads the page, that is all
			// as calling updateOpenings() after calling update shape interfers with the code  - re-order the code?
			windowRatioOut.value = theBuilding.windowRatio;

			inpOverhangDepth.min = 0;
			inpOverhangDepth.max = 10;
			inpOverhangDepth.value = 3;
			inpOverhangDepth.step = 0.5;

			theBuilding.overHangDepth = 3;

			inpFinDepth.min = 0;
			inpFinDepth.max = 10;
			inpFinDepth.value = 3;
			inpFinDepth.step = 0.5;

			theBuilding.finDepth = 3;

			noWindows.min = 1;
			noWindows.max = 10;
			noWindows.value = 4;

			theBuilding.noWindows = 4;

			selWindowType.innerHTML =
				'<option>ASHRAE 90.1 climate Zone 8</option>' +
				'<option>ASHRAE 189.1 climate zone 7</option>' +
				'<option>ASHRAE 189.1 climate zone 6</option>' +
			'';
		}
		else
		{
			document.getElementById("divEnvelope").innerHTML =
			'<h2> Envelope by Facade </h2>\n'+
			'<p><button onclick=changeWWR(); >Toogle to WWRByFacade</button></p>\n'+
			'<table>\n'+
				'<tr>\n'+
					'<td>building wwr South %</td><td>number of Windows</td><td>Overhang South Depth</td><td>Fin South Depth</td>\n'+
				'</tr>\n'+
				'<tr>\n'+
					'<td><input type=number id=inpWwrS step=5 onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=noWindowsS onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=inpOverhangDepthS onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=inpFinDepthS onchange=updateOpenings(); ></td>\n'+
				'<tr>\n'+
					'<td>building wwr North %</td><td>number of Windows</td><td>Overhang North Depth</td><td>Fin North Depth</td>\n'+
				'</tr>\n'+
					'<td><input type=number id=inpWwrN step=5 onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=noWindowsN onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=inpOverhangDepthN onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=inpFinDepthN onchange=updateOpenings(); ></td>\n'+
				'</tr>\n'+
				'<tr>\n'+
					'<td>building wwr East %</td><td>number of Windows</td><td>Overhang East Depth</td><td>Fin North Depth</td>\n'+
				'</tr>\n'+
					'<td><input type=number id=inpWwrE step=5 onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=noWindowsE onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=inpOverhangDepthE onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=inpFinDepthE onchange=updateOpenings(); ></td>\n'+
				'</tr>\n'+
				'<tr>\n'+
					'<td>building wwr West %</td><td>number of Windows</td><td>Overhang West Depth</td><td>Fin North Depth</td>\n'+
				'</tr>\n'+
					'<td><input type=number id=inpWwrW step=5 onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=noWindowsW onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=inpOverhangDepthW onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=inpFinDepthW onchange=updateOpenings(); ></td>\n'+
				'</tr>\n'+
			'</table>\n'+
			'<div>\n'+
				'Window Ratio North <output id=windowRatioOutN style=max-width:300px class=floatright ></output>\n'+
				'<input type=range step=0.1 min=0.1 max=0.9 id=windowRatioN oninput=updateOpenings(); >\n'+
			'</div>\n'+
			'<div>\n'+
				'Window Ratio East <output id=windowRatioOutE style=max-width:300px class=floatright ></output>\n'+
				'<input type=range step=0.1 min=0.1 max=0.9 id=windowRatioE oninput=updateOpenings(); >\n'+
			'</div>\n'+
			'<div>\n'+
				'Window Ratio West <output id=windowRatioOutW style=max-width:300px class=floatright ></output>\n'+
				'<input type=range step=0.1 min=0.1 max=0.9 id=windowRatioW oninput=updateOpenings(); >\n'+
			'</div>\n'+
			'<div>\n'+
				'Window Ratio South <output id=windowRatioOutS style=max-width:300px class=floatright ></output>\n'+
				'<input type=range step=0.1 min=0.1 max=0.9 id=windowRatioS min=0.1 max=0.9 oninput=updateOpenings(); >\n'+
			'</div>\n'+
			'<table>\n'+
				'<tr>\n'+
					'<td>windows South Construction Type</td>\n'+
				'</tr>\n'+
				'<tr>\n'+
					'<td><select id=selWindowTypeS onchange=updateConstructions();></select></td>\n'+
				'</tr>\n'+
				'<tr>\n'+
					'<td>windows North Construction Type</td>\n'+
				'</tr>\n'+
				'<tr>\n'+
					'<td><select id=selWindowTypeN onchange=updateConstructions();></select></td>\n'+
				'</tr>\n'+
				'<tr>\n'+
					'<td>windows East Construction Type</td>\n'+
				'</tr>\n'+
				'<tr>\n'+
					'<td><select id=selWindowTypeE onchange=updateConstructions();></select></td>\n'+
				'</tr>\n'+
				'<tr>\n'+
					'<td>windows West Construction Type</td>\n'+
				'</tr>\n'+
				'<tr>\n'+
					'<td><select id=selWindowTypeW onchange=updateConstructions();></select></td>\n'+
				'</tr>\n'+
			'</table>';

			windowRatioN.min = 0;
			windowRatioN.max = 1;
			windowRatioN.value = 0.4;

			windowRatioE.min = 0;
			windowRatioE.max = 1;
			windowRatioE.value = 0.4;

			windowRatioW.min = 0;
			windowRatioW.max = 1;
			windowRatioW.value = 0.4;

			windowRatioS.min = 0;
			windowRatioS.max = 1;
			windowRatioS.value = 0.4;

			inpWwrS.min = 1;
			inpWwrS.max = 100;
			inpWwrS.value = 40;

			inpWwrN.min = 1;
			inpWwrN.max = 100;
			inpWwrN.value = 40;

			inpWwrE.min = 1;
			inpWwrE.max = 100;
			inpWwrE.value = 40;

			inpWwrW.min = 1;
			inpWwrW.max = 100;
			inpWwrW.value = 40;

			noWindowsW.min = 1;
			noWindowsW.max = 10;
			noWindowsW.value = 2;

			noWindowsE.min = 1;
			noWindowsE.max = 10;
			noWindowsE.value = 2;

			noWindowsN.min = 1;
			noWindowsN.max = 10;
			noWindowsN.value = 2;

			noWindowsS.min = 1;
			noWindowsS.max = 10;
			noWindowsS.value = 2;

			selWindowTypeS.innerHTML =
				'<option>ASHRAE 90.1 climate Zone 8</option>' +
				'<option>ASHRAE 189.1 climate zone 7</option>' +
				'<option>ASHRAE 189.1 climate zone 6</option>' +
			'';

			selWindowTypeN.innerHTML =
				'<option>ASHRAE 90.1 climate Zone 8</option>' +
				'<option>ASHRAE 189.1 climate zone 7</option>' +
				'<option>ASHRAE 189.1 climate zone 6</option>' +
			'';

			selWindowTypeE.innerHTML =
				'<option>ASHRAE 90.1 climate Zone 8</option>' +
				'<option>ASHRAE 189.1 climate zone 7</option>' +
				'<option>ASHRAE 189.1 climate zone 6</option>' +
			'';

			selWindowTypeW.innerHTML =
				'<option>ASHRAE 90.1 climate Zone 8</option>' +
				'<option>ASHRAE 189.1 climate zone 7</option>' +
				'<option>ASHRAE 189.1 climate zone 6</option>' +
			'';
		}
	}

		function changeWWR()
		{	// Each time the button is toogled change WWRByFacade
			if (WWRByFacade == false)
			{
				WWRByFacade = true;
			}
			else
			{
				WWRByFacade = false;
			}

			initEnvelopeInputFields();

			updateOpenings();

		}

		function updateOpenings() {

			try {
				// If no error facade at building level

				theBuilding.wwr = parseFloat(inpWwr.value)/100;

				theBuilding.noWindows = parseInt(noWindows.value);

				theBuilding.windowRatio = parseFloat(inpwindowRatio.value);

				theBuilding.overHangDepth = parseFloat(inpOverhangDepth.value);

				theBuilding.finDepth = parseFloat(inpFinDepth.value);

				// Update the value next to the slider
				windowRatioOut.value = theBuilding.windowRatio;

				theBuilding.wwrS = null;

				theBuilding.wwrN = null;

				theBuilding.wwrE = null;

				theBuilding.wwrS = null;

			} catch (e) {

				theBuilding.wwrS = parseFloat(inpWwrS.value)/100;

				theBuilding.wwrN = parseFloat(inpWwrN.value)/100;

				theBuilding.wwrE = parseFloat(inpWwrE.value)/100;

				theBuilding.wwrW = parseFloat(inpWwrW.value)/100;

				// Update the value next to the slider
				theBuilding.windowRatioN = parseFloat(windowRatioN.value);

				theBuilding.windowRatioE = parseFloat(windowRatioE.value);

				theBuilding.windowRatioW = parseFloat(windowRatioW.value);

				theBuilding.windowRatioS = parseFloat(windowRatioS.value);

				theBuilding.noWindowsS = parseInt(noWindowsS.value);

				theBuilding.noWindowsN = parseInt(noWindowsN.value);

				theBuilding.noWindowsE = parseInt(noWindowsE.value);

				theBuilding.noWindowsW = parseInt(noWindowsW.value);

				theBuilding.overhangDepthS = parseFloat(inpOverhangDepthS.value);

				theBuilding.overhangDepthN = parseFloat(inpOverhangDepthN.value);

				theBuilding.overhangDepthE = parseFloat(inpOverhangDepthE.value);

				theBuilding.overhangDepthW = parseFloat(inpOverhangDepthW.value);

				theBuilding.finDepthS = parseFloat(inpFinDepthS.value);

				theBuilding.finDepthN = parseFloat(inpFinDepthN.value);

				theBuilding.finDepthE = parseFloat(inpFinDepthE.value);

				theBuilding.finDepthW = parseFloat(inpFinDepthW.value);


				theBuilding.wwr = null;

				theBuilding.noWindows = null;

				// Set outputs

				windowRatioOutN.value = theBuilding.windowRatioN;

				windowRatioOutE.value = theBuilding.windowRatioE;

				windowRatioOutW.value = theBuilding.windowRatioW;

				windowRatioOutS.value = theBuilding.windowRatioS;

			} finally {
				changeOpenings();

			}
		}

		function updateConstructions()
		{

		}
