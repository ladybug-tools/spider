

	function initEnvelopeInputFields() {

		inpWwr.min = 1;
		inpWwr.max = 100;
		inpWwr.value = 40;

		inpOverhangDepth.min = 0;
		inpOverhangDepth.max = 10;
		inpOverhangDepth.value = 0;
		inpOverhangDepth.step = 0.5;

		inpFinDepth.min = 0;
		inpFinDepth.max = 10;
		inpFinDepth.value = 0;
		inpFinDepth.step = 0.5;

/*
		wwrs.min = 1;
		wwrs.max = 100;
		wwrs.value = 40;

		wwre.min = 1;
		wwre.max = 100;
		wwre.value = 40;

		wwrw.min = 1;
		wwrw.max = 100;
		wwrw.value = 40;

		wwrn.min = 1;
		wwrn.max = 100;
		wwrn.value = 40;

		windowPreportions.min = 0;
		windowPreportions.max = 1;
		windowPreportions.value = 0.4;

		numWindows.min = 1;
		numWindows.max = 10;
		numWindows.value = 3;

*/

		selWindowType.innerHTML =
			'<option>Window Type 1</option>' +
			'<option>Window Type 2</option>' +
			'<option>Window Type 3</option>' +
		'';

	}


	function updateOpenings() {

		theBuilding.wwr = parseInt( inpWwr.value, 10 );
		theBuilding.overhangDepth = parseFloat( inpOverhangDepth.value );
		theBuilding.finDepth = parseFloat( inpFinDepth.value );
		theBuilding.windowType = selWindowType.value;

//console.log( 'theBuilding', theBuilding );

	}