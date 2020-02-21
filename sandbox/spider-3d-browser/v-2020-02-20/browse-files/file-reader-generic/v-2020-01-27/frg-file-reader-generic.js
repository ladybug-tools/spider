// copyright 2020 Theo Armour. MIT license.
// See pushme-pullyou/templates-01/modules/file-reader
// 2020-01-27
/* divContent */
// jshint esversion: 6
// jshint loopfunc: true


const FRG = {};


FRG.init = function () {

	FRGdivFileReaderGeneric.innerHTML += FRG.getMenu();

};



FRG.getMenu = function () {

	const htm = `
<details open>

	<summary>
		Open a file on your computer

		<span class="couponcode">??<span class="coupontooltip">
			<a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" target="_blank">file reader on mdn</a>

			open a files on your computer

		</span></span>

	</summary>

	<!-- accept = '.rad, .res, .pts' multiple -->

	<p>
		<input type=file id=FRGinpFile onchange=FRG.openFile(this);  >
	</p>

	<p id=FRGpStats ></p>


	<hr>

</details>`;

	return htm;

};


FRG.openFile = function ( files ) {

	FRG.timeStart = performance.now();

	if ( files.files[ 0 ].name.toLowerCase().endsWith( ".zip" ) ) {

		FRG.files = files;

		FO.url = files.files[ 0 ].name;
		FO.data = files.files[ 0 ];

		//console.log( 'FO.data', FO.data );

		//txtArea.innerHTML = reader.result.slice( 0, 1000 );

		FRGpStats.innerHTML = "";

		event = new Event( "onloadFile", { "bubbles": true, "cancelable": false, detail: true } );

		window.addEventListener( "onloadFile", FRG.onLoad, false );

		window.dispatchEvent( event );

	} else {

		const reader = new FileReader();
		reader.onload = ( event ) => {

			FRG.files = files;
			FRG.result = reader.result;

			FO.url = files.files[ 0 ].name;
			//FO.data = files.files[ 0 ];
			FO.data =  reader.result;
			//FRG.onLoad();

			FRG.event = new Event( "onloadFile", {"bubbles": true, "cancelable": false, detail: true } );

			window.addEventListener( "onloadFile", FRG.onLoad, false );

			window.dispatchEvent( FRG.event );

		};

		reader.readAsText( files.files[ 0 ] );

	}


};



FRG.onLoad = function () {

	const files = FRG.files;

	FRGpStats.innerHTML = `
<p>
		name: ${ files.files[ 0 ].name }<br>
		size: ${ files.files[ 0 ].size.toLocaleString() } bytes<br>
		type: ${ files.files[ 0 ].type }<br>
		modified: ${files.files[ 0 ].lastModifiedDate.toLocaleDateString() }<br>
		time to load: ${ ( performance.now() - FRG.timeStart ).toLocaleString() } ms
</p>

<details ontoggle=FRG.displayFileContents(); >

<summary>Display file contents</summary>

<p>First thousand characters</p>

<textarea id=FRGtxtArea style=height:50rem;overflow:auto;width:100%; ></textarea>

</details>

`;

	//console.log( 'FRG files', files.files );
	//console.log( 'FRG event', event );

};



FRG.displayFileContents = function () {

	FRGtxtArea.value = FRG.result.slice( 0, 1000 );

};



FRG.init();