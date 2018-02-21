
	let COR = {};

	COR.iconInfo = '<img src="https://status.github.com/images/invertocat.png" height=14 >';
	COR.threeDefaultFile = '../gbxml-viewer10-01-core/gbxml-viewer10-core.html';

	COR.gbxmlSampleFiles =

	`
		<div><a href="#../../gbxml-sample-files/annapolis-md-single-family-residential-2016.xml" >gbxml standard single family residential 2016</a></div>
		<div><a href="#../../gbxml-sample-files/aspen-co-resort-retail.xml" >aspen-co-resort-retail.xml</a></div>
		<div><a href="#../../gbxml-sample-files/boston-ma-urban-house-mep.xml" >boston-ma-urban-house-mep.xml</a></div>
		<div><a href="#../../gbxml-sample-files/bristol-clifton-down-road.xml" >bristol-clifton-down-road.xml</a></div>
		<div><a href="#../../gbxml-sample-files/columbia-sc-two-story-education-trane.xml" >columbia-sc-two-story-education-trane</a></div>
		<div><a href="#../../gbxml-sample-files/coventry-university-of-warwick.xml" >coventry-university-of-warwick.xml</a></div>
		<div><a href="#../../gbxml-sample-files/golden-co-open-studio-seb.xml" >golden-co-open-studio-seb.xml</a></div>
		<div><a href="#../../gbxml-sample-files/london-office.xml" >london-office.xml</a></div>
		<div><a href="#../../gbxml-sample-files/omha-nb-zneth.xml" >omha-nb-zneth.xml</a></div>

	`;



	COR.initCore = () => {

		if ( window.dragArea ) {
			dragArea.addEventListener( "dragover", function( event ){ event.preventDefault(); }, true );
			dragArea.addEventListener( 'drop', COR.drop, false );
		}

		if ( window.dragAreaToIframe ) {
			dragAreaToIframe.addEventListener( "dragover", function( event ){ event.preventDefault(); }, true );
			dragAreaToIframe.addEventListener( 'drop', COR.dropIframe, false );
		}

		if ( window.divMenuHeader ) {
			divMenuHeader.addEventListener( 'mousedown', COR.onMouseDownDraggable, false );
			window.addEventListener( 'mouseup', COR.onMouseUpDraggable, false );
		}

	}



	COR.requestFileAndProgress = ( url, callback ) => {

		const xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', url, true );
		xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
		xhr.onprogress = onRequestFileProgress;
		xhr.onload = callback;
		xhr.send( null );

		function onRequestFileProgress( xhr ) {

			divLog.innerHTML = 'bytes loaded: ' + xhr.loaded.toLocaleString() + ' of ' + xhr.total.toLocaleString() ;

		}

	}



	COR.drop = event => {

		const iframeUrl = event.dataTransfer.getData( 'URL' );

		if ( iframeUrl ) {

			location.hash = iframeUrl;

		} else {

			GBX.openGbxmlFile( event.dataTransfer );

		}

		event.preventDefault();

	}



	COR.dropIframe = event => {

		event.preventDefault();

		var iframeUrl = event.dataTransfer.getData( 'URL' );

		if ( iframeUrl ) {

			ifrThree.contentWindow.location.hash = iframeUrl;

		} else {

			ifrThree.contentWindow.GBX.openGbxmlFile( event.dataTransfer );

		}

	}



/////////////

	COR.onMouseDownDraggable = event  => {

		COR.draggableTop = event.clientY - event.target.parentNode.offsetTop;
		COR.draggableLeft = event.clientX - event.target.parentNode.offsetLeft;

		window.addEventListener('mousemove', COR.onMouseMoveDraggable, true );
		event.preventDefault();

	}



	COR.onMouseMoveDraggable = event => {

		event.target.parentNode.style.top = ( event.clientY - COR.draggableTop ) + 'px';
		event.target.parentNode.style.left = ( event.clientX - COR.draggableLeft ) + 'px';
		event.preventDefault();

	}



	COR.onMouseUpDraggable = () => {

	window.removeEventListener( 'mousemove', COR.onMouseMoveDraggable, true );
	event.preventDefault();

	}



	COR.onTouchStartDraggable = event => {

		COR.draggableLeft = event.target.parentNode.offsetLeft;
		COR.draggableStartX = event.changedTouches[ 0 ].clientX;
		COR.draggableTop = event.target.parentNode.offsetTop;
		COR.draggableStartY = event.changedTouches[ 0 ].clientY;
		//console.log( 'draggableTop', draggableTop, draggableStartY );
		event.preventDefault();

	}



	COR.onTouchMoveDraggable = event  => {

		const distX = event.changedTouches[ 0 ].clientX - COR.draggableStartX;
		let left = COR.draggableLeft + distX > document.body.clientWidth - 100 ?
			document.body.clientWidth - 100 : COR.draggableLeft + distX;
		left = COR.draggableLeft + distX < 0 ? 0 : left;
		//console.log( 'left2', left  );
		event.target.parentNode.style.left = left + 'px';

		const distY = event.changedTouches[ 0 ].clientY - COR.draggableStartY;
		// top is a reserved word
		let ttop = COR.draggableTop + distY > window.innerHeight - 100 ?
			window.innerHeight - 100 : COR.draggableTop + distY;
		ttop = COR.draggableTop + distY < 0 ? 0 : ttop;
		//console.log( 'ttop', ttop  );
		event.target.parentNode.style.top = ttop + 'px';

		event.preventDefault();

	}


