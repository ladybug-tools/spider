
openFiles = function(){}


openFiles.init = function( target ) {

	target.innerHTML =
	`
		<p><input type=file id=inpFile onchange=openFiles.load(this); accept = '.rad, .res, .pts' multiple ></p>
		<textarea id=textArea style=height:500px;overflow:auto;width:100%; ></textarea>
		<div id=divLog ></div>

	`;

}

openFiles.load = function( files ) {

	const reader = new FileReader();
	reader.onload = openFiles.callback;
	reader.readAsText( files.files[0] );

}


openFiles.callback = function( file ) {

	textArea.innerHTML = file.target.result;

	divLog.innerHTML =
	`<p>
		<div>total: ${ file.total.toLocaleString() }</div>
		<div>timeStamp: ${ file.timeStamp.toLocaleString() } milliseconds </div>
	</p>`;

	console.log( {file} );

}