// Copyright 2018 Ladybug Tools authors. MIT License


//	var divAppMenu;
	var icw;
	var THREE;
	var scene;
	var gbjson;
	var surfaceMeshes;

	var uiAnalemma =
`
	<p>
		<button onclick="initSunPath();" >Draw Sun & Analemma</button>
	</p>

	Month <output id=outMonth for="inpMonth" ></output><br>
	<input type="range" id="inpMonth" min=0 max=11  ><br>

	Date <output id=outDate  for="inpDate" ></output><br>
	<input type="range" id="inpDate" min=0 max=31 ><br>

	Hour <output id=outHour for="inpHour" ></output><br>
	<input type="range" id="inpHour" min=0 max=24 ><br>

	<p>
	<button onclick="goToNextHour();" >Go To Next Hour</button>
	</p>

	<p>
	Click to start & stop: <br>
	<button onclick="togglePlayTheYear();" >Play the Solar Year</button>
	</p>
`;

	var defaultLatitude = 37.796;
	var defaultLongitude = -122.398;

//	const defaultLatitude = 40.786944;
//	const defaultLongitude = -119.204444;
	var defaultOffsetUTC = -420;


	var parameters = {};
	parameters.zoom = 16;
	parameters.latitude = defaultLatitude;
	parameters.longitude = defaultLongitude;
	parameters.groundSize = 10;
	analemmaRadius = 0.8 * parameters.groundSize;

	parameters.offsetUTC = -420;

	parameters.date = 21;
	parameters.month = 2;
	parameters.hour = 12 - parameters.offsetUTC / 60;
	parameters.minutes = 0;


	var icw;
	var THREE;
	var scene;
	var controls;
	var lightDirectional;
	var cameraHelper;

	var object3D;
	var structures;
	var ground;

	var sun;
	var analemma;
//	var analemmaRadius;

	var daysOfMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

	var playTheYear = false;

	var count = 0;



	init();

	function init() {

		if ( !divAppMenu ) {

			divAppMenu= document.body.appendChild( document.createElement( 'div' ) );
			divAppMenu.style.cssText =
				'background-color: white; border: 1px solid crimson; max-height: 95%; max-width: 350px; ' +
				'opacity: 0.85; overflow: auto; padding: 10px; position: fixed; right: 20px; top: 20px; z-index:100000; ' +
			'';

		}

		let txt = 'lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?';

		divAppMenu.innerHTML =
			uiAnalemma +
//			'<p>surfaces: ' + icw.surfaceMeshes.children.length + '</p>'
		'';



		icw = ifrThree.contentWindow;
		THREE = icw.THREE;
		scene = icw.scene;
		gbjson = icw.gbjson;

		surfaceMeshes = icw.surfaceMeshes;

		controls = icw.controls;
		lightDirectional = icw.lightDirectional;
		cameraHelper = icw.cameraHelper;

		object3D = new THREE.Object3D();

//		lights = pcc.lights;
/*
console.log( 'scene', icw );
console.log( 'gbjson', gbjson );
console.log( 'surfaceMeshes', surfaceMeshes );
*/


		inpMonth.onclick = initSunPath;
		inpDate.onclick = initSunPath;
		inpHour.onclick = initSunPath;

/*
		url = 'https://rawgit.com/ladybug-tools/spider/master/read-gbxml/data-files/open-studio-seb.xml'

		if ( parent && parent.divContents ) {

			divContents.style.maxWidth = '100%';
			document.body.style.overflow = 'hidden';
			divContents.innerHTML = '<iframe id=ifrThree src=' + threeDefaultFile + '#' + url + ' style=height:100%;border:none; ></iframe>';

		}
*/

	}



	function initSunPath() {

//console.log( '', parameters );

		inpMonth.value = parameters.month;
		outMonth.value = parameters.month + 1;

		outDate.value = inpDate.value = parameters.date;

		inpHour.value = parameters.hours + parameters.offsetUTC / 60;
		outHour.value =  parameters.hour + parameters.offsetUTC / 60;

		if ( !analemma ) {

			drawAnalemma();

//			initSunAndLight();

		}

		inpMonth.onclick = setMonth;
		inpDate.onclick = setDate;
		inpHour.onclick = setHour;

//		playTheYear = true;

//		if ( playTheYear ) { play(); }

	}



	function drawAnalemma() {

		let year, month, date, hours, hour, i;
		let geometry, vertices, material, line;
		let analemmaDateUTC, analemmaSunPosition, analemmaColor, placard;
		let colors;

		colors = [ 'bisque', 'deeppink', 'sienna', 'darkorange', 'indigo', 'lime',
		'purple', 'honeydew', 'coral', 'gold', 'gray', 'maroon' ];

		analemma = new THREE.Object3D();

		year = ( new Date() ).getUTCFullYear();

		analemmaRadius = surfaceMeshes.userData.radius;

		for ( hours = 0; hours < 24; hours++ ) {

			geometry = new THREE.Geometry();
			vertices = geometry.vertices;
			hour = hours - parameters.offsetUTC / 60;
			i = 0;

			for ( month = 0; month < 12; month++ ) {

				for ( date = 1; date < daysOfMonth[ month ]; date++ ) {

					analemmaDateUTC = new Date( Date.UTC( year, month, date, hour, 0, 0 ) );

					analemma.sunPosition = getSunPositionXYZ( analemmaRadius, analemmaDateUTC, parameters.latitude, parameters.longitude );

					vertices.push( analemma.sunPosition.xyz );

					geometry.colors[ i++ ] = new THREE.Color(  colors[ month ] );

				}

			}

			analemmaColor = hours === 0 ? 200 : 120;
			analemmaColor = hours === 12 ? 60 : analemmaColor;

			material = new THREE.LineBasicMaterial( {

				linewidth: 2,
//				color: 0xffffff,
				vertexColors: THREE.VertexColors

			} );

			line = new THREE.Line( geometry, material );
			analemma.add( line );

			placard = drawPlacard( '' + hours, 0.02, analemmaColor, vertices[ 0 ].x, vertices[ 0 ].y, vertices[ 0 ].z );
			analemma.add( placard );

		}


		material = new THREE.LineBasicMaterial( { color: 0xbbbbbb } );

		for ( month = 5; month < 12; month++ ) {

			geometry = new THREE.Geometry();
			vertices = geometry.vertices;

			for ( hours = 0; hours < 24; hours++ ) {

				analemmaDateUTC = new Date( Date.UTC( year, month, 21, hours, 0, 0 ) );
				analemmaSunPosition = getSunPositionXYZ( analemmaRadius, analemmaDateUTC, parameters.latitude, parameters.longitude );

				vertices.push( analemmaSunPosition.xyz );

			}

			vertices.push( vertices[ 0 ] );

			line = new THREE.Line( geometry, material );
			analemma.add( line );

		}

//		object3D.remove( analemma );
//		object3D.add( analemma );
		analemma.position.copy( icw.axesHelper.position );

		scene.add( analemma );

//console.log( 'analemma', analemma );

	}



	function initSunAndLight() {

		var geometry, material, d;

		geometry = new THREE.SphereBufferGeometry( 3, 20, 10 );
		material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
		sun = new THREE.Mesh( geometry, material );

		sun.name = 'sun';
//console.log( 'pcc', pcc, lightDirectional );
		lightDirectional.add( sun );

//		scene.add( lights );

		setSunPosition();

	}



	function setSunPosition() {

		let d, year, dateThere;

		d = new Date();
		year = d.getUTCFullYear();

		dateThere = new Date( Date.UTC( year, parameters.month, parameters.date, parameters.hour, parameters.minutes, 0 ) );
		sun.userData.position = getSunPositionXYZ( analemmaRadius, dateThere, parameters.latitude, parameters.longitude );

		lightDirectional.position.copy( controls.target.clone().add( sun.userData.position.xyz ) );

//console.log( 'lightDirectional.position', lightDirectional.position );
//console.log( 'sun.position', sun.position );

	}



	function goToNextHour() {

		if ( !pcc ) { initSunPath(); }

		thisHour = parseInt( inpHour.value, 10 );
		thisDate = parseInt( inpDate.value, 10 );
		thisMonth = parseInt( inpMonth.value, 10 );

		thisHour++;

		if ( thisHour > 24 ) {

			thisHour = 0;
			thisDate++;

			if ( thisDate > daysOfMonth[ thisMonth ] ) {

				thisDate = 1;
				thisMonth++;

				if ( thisMonth > 11 ) {

					thisMonth = 0;

				}

			}

		}

		parameters.hour = parseInt( thisHour - parameters.offsetUTC / 60, 10 );
		outHour.value = inpHour.value = parameters.hour + parameters.offsetUTC / 60;

		outDate.value = inpDate.value = parameters.date = thisDate;

		inpMonth.value = parameters.month = thisMonth;
		outMonth.value = parameters.month + 1;

//console.log( '', parameters );

		setSunPosition();

	}



	function setMonth() {

		if ( !pcc ) { initSunPath(); }

		parameters.month = parseInt( inpMonth.value, 10 );

		outMonth.value = parameters.month + 1;

		setSunPosition();

// console.log( '', parent.mainIframe.contentWindow.parameters.month );

	}



	function setDate() {

		if ( !pcc ) { initSunPath(); }

		outDate.value = parameters.date = parseInt( inpDate.value, 10 );

		setSunPosition();

// console.log( '', parent.mainIframe.contentWindow.parameters.date );

	}



	function setHour() {


		if ( !pcc ) { initSunPath(); }

		parameters.hour = parseInt( inpHour.value - parameters.offsetUTC / 60, 10 );
		outHour.value =  parameters.hour + parameters.offsetUTC / 60;

		setSunPosition();

// console.log( '', parent.mainIframe.contentWindow.parameters.hours );

	}



	function togglePlayTheYear() {

		playTheYear = !playTheYear;
		play();

	}



	function play() {

		requestAnimationFrame( play );

		if ( count++ % 10 === 0 && playTheYear ) {

			goToNextHour();

		}

	}




	function drawPlacard( text, scale, color, x, y, z ) {

// 2016-02-27 ~ https://github.com/jaanga/jaanga.github.io/tree/master/cookbook-threejs/functions/placards

		let placard = new THREE.Object3D();
		var texture = canvasMultilineText( text, { backgroundColor: color }   );
		let spriteMaterial = new THREE.SpriteMaterial( { map: texture, opacity: 0.9, transparent: true } );
		let sprite = new THREE.Sprite( spriteMaterial );
		sprite.position.set( x * 1.1, y * 1.1, z * 1.1 ) ;
		sprite.scale.set( scale * texture.image.width, scale * texture.image.height );
/*
		let geometry = new THREE.Geometry();
		geometry.vertices = [ v( 0, 0, 0 ),  v( x, y, z ) ];
		let material = new THREE.LineBasicMaterial( { color: 0xaaaaaa } );
		let line = new THREE.Line( geometry, material );
*/
		placard.add( sprite /*,  line */ );

		return placard;

		function canvasMultilineText( textArray, parameters ) {

			parameters = parameters || {} ;

			let canvas = document.createElement( 'canvas' );
			let context = canvas.getContext( '2d' );
			let width = parameters.width ? parameters.width : 0;
			let font = parameters.font ? parameters.font : '48px monospace';
			let color = parameters.backgroundColor ? parameters.backgroundColor : 120 ;

			if ( typeof textArray === 'string' ) textArray = [ textArray ];

			context.font = font;

			for ( let i = 0; i < textArray.length; i++) {

				width = context.measureText( textArray[ i ] ).width > width ? context.measureText( textArray[ i ] ).width : width;

			}

			canvas.width = width + 20;
			canvas.height =  parameters.height ? parameters.height : textArray.length * 60;

			context.fillStyle = 'hsl( ' + color + ', 80%, 50% )' ;
			context.fillRect( 0, 0, canvas.width, canvas.height);

			context.lineWidth = 1 ;
			context.strokeStyle = '#000';
			context.strokeRect( 0, 0, canvas.width, canvas.height );

			context.fillStyle = '#000' ;
			context.font = font;

			for ( i = 0; i < textArray.length; i++) {

				context.fillText( textArray[ i ], 10, 48  + i * 60 );

			}

			let texture = new THREE.Texture( canvas );
			texture.minFilter = texture.magFilter = THREE.NearestFilter;
			texture.needsUpdate = true;

			return texture;

		}

	}



	function getSunPositionXYZ( radius, timeThere, latitude, longitude ) {

		var sunPosition, x, y, z;

		sunPosition = getSunPosition( timeThere, latitude - 90, longitude ); // from solar-calculator ... .js

		x = radius * Math.cos( sunPosition.altitude * d2r ) * Math.sin( sunPosition.azimuth * d2r );
		y = radius * Math.cos( sunPosition.altitude * d2r ) * Math.cos( sunPosition.azimuth * d2r );
		z = radius * Math.sin( sunPosition.altitude * d2r );

		return { xyz: new THREE.Vector3( x, y, z ), azimuth: sunPosition.azimuth, altitude: ( sunPosition.altitude > 0 ? 90 - sunPosition.altitude: sunPosition.altitude ) };

	}



	function lon2tile( longitude, zoom ) {

		return Math.floor( ( longitude + 180 ) / 360 * Math.pow( 2, zoom ) );

	}

	function lat2tile( latitude, zoom ) {

		return Math.floor( ( 1 - Math.log( Math.tan( latitude * pi / 180 ) + 1 / Math.cos( latitude * pi / 180) ) / pi ) / 2 * Math.pow( 2, zoom ) );

	}