

	initReadFile();


	function initReadFile() {

		divMenuItems.innerHTML = 
			'<p id=dragArea class=dragDropArea >' +
				'Drag and drop a gbXML file in this area or <br>' +
				'<input type = "file" id = "inpFile" onchange="ifrThree.contentWindow.openFile(this);" >' +
			'<p>' +
		'';

	}