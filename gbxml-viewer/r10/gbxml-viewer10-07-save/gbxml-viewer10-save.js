// Copyright 2018 Ladybug Tools authors. MIT License


	init();

	function init() {

		if ( butMenuSave.style.backgroundColor !== 'var( --but-bg-color )' ) {

			let txt =
			'<p>' +
				'<button id=butSave onclick=saveFile() > Save file </button>' +
			'</p>' +

			'';

			divMenuItems.innerHTML =

				'<details id = detSave open >' +
					'<summary>Save  File</summary>' +

					'<p>' + txt + '<p>' +

					'<p></p>' +

					'<p>2018-02-02 ~ This first release of Save only saves a copy of the original file. ' +
						'Edits and saving edits will be added in the near future. ' +
					'</p>' +

				'</details>' +

				'<hr>' +

				divMenuItems.innerHTML +

			'';

			butMenuSave.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			detSave.remove();

			butMenuSave.style.backgroundColor = '';

		}

	}



	function saveFile() {

		const xmlText = new XMLSerializer().serializeToString( gbxml );
//console.log( 'xmlText', xmlText );

		var blob = new Blob( [ xmlText ] );
		var a = document.body.appendChild( document.createElement( 'a' ) );
		a.href = window.URL.createObjectURL( blob );
		a.download = gbjson.Campus.Building.id + '.xml';
		a.click();
//		delete a;
		a = null;

	}