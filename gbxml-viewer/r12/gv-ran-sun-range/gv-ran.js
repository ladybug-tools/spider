
	var defaultLatitude = 37.796;
	var defaultLongitude = -122.398;

//	const defaultLatitude = 40.786944;
//	const defaultLongitude = -119.204444;

	var defaultOffsetUTC = 0;

	var parameters = {};
//	parameters.zoom = 16;
//	parameters.latitude = defaultLatitude;
//	parameters.longitude = defaultLongitude;
//	parameters.groundSize = 10;
	parameters.analemmaRadius = 80; // 0.8 * parameters.groundSize;

	parameters.offsetUTC = defaultOffsetUTC;

//	parameters.date = 21;
//	parameters.month =12;
//	parameters.hour = 12 - parameters.offsetUTC / 60;
//	parameters.minutes = 0;

	var icw;
	var THREE;
	var renderer;
	var scene;
	var camera;
	var controls;

	var gbjson;

	var surfaceGroup;
	var surfaceMeshes;
//	var surfaceMeshesChildren;
//	var surfaceEdges;

	var lightDirectional;
	var lightPointCamera;
	var lightPoint;
	var cameraHelper;
//	var structures;
//	var ground;

//	var sun;
	var analemma;
//	var analemmaRadius = 80;

	var suns;
//	var sunHelpers = [];

	var lights;
	var sunRangeLightIntensity = 0.5;
	var lightAmbientIntensity = 30;

	var count = 0;
	var menuItems = `
		<details id = detSunRange open >
			<summary>Sun Range</summary>

			Month <output id=outMonth for="inpMonth" ></output>
			<input type="range" id="inpMonth" min=0 max=11  >

			Date <output id=outDate  for="inpDate" ></output>
			<input type="range" id="inpDate" min=0 max=31 >

			<p>
			<button onclick="initSunRange();" >Draw Sun Range</button>
			</p>


			<p>

			Sun Range Light Intensity <output id=outSunIntensity for="inpSunIntensity" >0.6</output>
			<input type="range" id="inpSunIntensity" min="0" max="1" step="0.05" >

			Ambient Light Intensity <output id=outAmbientIntensity for="inpAmbientIntensity" >100</output>
			<input type="range" id="inpAmbientIntensity" min="0" max="255" step="5" >

			</p>

			<div id=logLocation ></div>

			<hr>

			<p>
			</i>Setting the light intensities properly is still not easy enough. Updating month & date: has isues with lights</i>
			</p>


		</details>

`;

	var RAN = {};

	init();

	function init() {

		if ( window.butMenuLoad ) {

			RAN.butMenuSunRange = butMenuLoad;

			RAN.title = 'gv-RAN - gbXML Viewer Sun Range';;
			document.title = RAN.title;
			aDocumentTitle.innerHTML = RAN.title;
			RAN.butMenuSunRange.innerHTML = RAN.title;

		} else {

			RAN.butMenuSunRange = butMenuTemplate;

		}


		const scriptSolCalc = document.head.appendChild( document.createElement( 'script' ) );
		scriptSolCalc.src = 'https://rawgit.com/ladybug-tools/ladybug-web/gh-pages/solar-calculator-ladybug-web/solar-calculator-ladybug-web-r1.js';

		if ( RAN.butMenuSunRange.style.backgroundColor !== 'var( --but-back-color )' ) {


			divMenuItems.innerHTML = menuItems + divMenuItems.innerHTML;


			renderer = THR.renderer;
			scene = THR.scene;
			camera = THR.camera;
			controls = THR.controls;

			lightDirectional = THR.lightDirectional;
			lightAmbient = THR.lightAmbient;
			cameraHelper = THR.cameraHelper;

			surfaceMeshes = GBX.surfaceMeshes;

			gbjson = GBX.gbjson;
			parameters.latitude = gbjson.Campus.Location.Latitude
			parameters.longitude = gbjson.Campus.Location.Longitude;

			inpMonth.onchange = setMonth;
			inpMonth.value = 11;
			outMonth.value = 12;

			inpDate.onchange = setDate;
			inpDate.value = 21;
			outDate.value = 21;

			const now = Math.floor( Date.now() / 1000 );
			const url = 'https://maps.googleapis.com/maps/api/timezone/json?location=' +
			parameters.latitude + ',' + parameters.longitude + '&timestamp=' + now;

			requestFile( url, callbackUtcOffset );

// following causes error when inside an iframe in a read me
			if ( parent.setIfrThree ) { setIfrThree(); }

			RAN.butMenuSunRange.style.backgroundColor = 'var( --but-back-color )';

		} else {

			detSunRange.remove();

			RAN.butMenuSunRange.style.backgroundColor = '';

		}

		divContainer.style.display = 'none';
		THR.controls.autoRotate = false;
		THR.controls.keys = false;

	}



	function initSunRange() {

/*
		parameters.date = 21;
		parameters.month = 11;
		parameters.hours = 12 - parameters.offsetUTC / 60;
		parameters.minutes = 0;

//console.log( '', parameters );
*/

//		inpMonth.value = parameters.month;
//		outMonth.value = parameters.month + 1;

//		outDate.value = inpDate.value = parameters.date;

		outSunIntensity.value = inpSunIntensity.value = sunRangeLightIntensity;
		outAmbientIntensity.value = inpAmbientIntensity.value = lightAmbientIntensity;

		drawAnalemma();

		drawSunRange();

		inpMonth.onchange = setMonth;
		inpDate.onchange = setDate;
		inpSunIntensity.onchange = setSunIntensity;
		inpAmbientIntensity.onchange = setSunIntensity;

	}


	function drawAnalemma() {

		let year, month, date, hours, hour, i;
		let geometry, vertices, material, line;
		let analemmaDateUTC, analemmaSunPosition, analemmaColor, placard;
		let colors;

		colors = [ 'bisque', 'deeppink', 'sienna', 'darkorange', 'indigo', 'lime',
		'purple', 'honeydew', 'coral', 'gold', 'gray', 'maroon' ];

		let daysOfMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

		analemma = new THREE.Object3D();
		analemma.name = 'analemma';

		year = ( new Date() ).getUTCFullYear();

		for ( hours = 0; hours < 24; hours++ ) {

			geometry = new THREE.Geometry();
			vertices = geometry.vertices;
			hour = hours - parameters.offsetUTC / 60;
			i = 0;

			for ( month = 0; month < 12; month++ ) {

				for ( date = 1; date < daysOfMonth[ month ]; date++ ) {

					analemmaDateUTC = new Date( Date.UTC( year, month, date, hour, 0, 0 ) );

					analemma.sunPosition = getSunPositionXYZ( parameters.analemmaRadius, analemmaDateUTC, parameters.latitude, parameters.longitude );

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

			placard = drawPlacard( '' + hours, 0.05, analemmaColor, vertices[ 0 ].x, vertices[ 0 ].y, vertices[ 0 ].z );
			analemma.add( placard );

		}



		material = new THREE.LineBasicMaterial( { color: 0xbbbbbb } );

		for ( month = 5; month < 12; month++ ) {

			geometry = new THREE.Geometry();
			vertices = geometry.vertices;

			for ( hours = 0; hours < 24; hours++ ) {

				analemmaDateUTC = new Date( Date.UTC( year, month, 21, hours, 0, 0 ) );
				analemmaSunPosition = getSunPositionXYZ( parameters.analemmaRadius, analemmaDateUTC, parameters.latitude, parameters.longitude );

				vertices.push( analemmaSunPosition.xyz );

			}

			vertices.push( vertices[ 0 ] );

			line = new THREE.Line( geometry, material );
			analemma.add( line );

		}

		analemma.position.copy( THR.axesHelper.position.clone() );

		THR.scene.remove( analemma );
		THR.scene.add( analemma );

	}



	function drawSunRange() {

		//var sun, sunHelper, dateThere, d;
		let geometry, material, mesh;

		scene.remove( lightDirectional, lightAmbient, lightPoint );
		scene.remove( lights );

		scene.remove( lights );
		camera.remove( lightPoint, lightPointCamera );

		lights = new THREE.Object3D();

//console.log( '', scene.children );


		if ( suns ) {

			for ( var i = 0; i < suns.length; i++ ) {

				lights.remove( suns[ i ] );

			}

		}


		par = {};

		par.sunRangeCount = 7;
		par.sunRangeHelpers = 0;
		par.sunRangeIntensity = sunRangeLightIntensity;
		par.lightAmbientColor = 100;
		par.sunRangeMinutes = 60;
		par.sunRangePlacards = 0;
		par.sunRangeRadius = 100;
		par.sunRangeStart = 8;
		par.offsetThere =  parameters.offsetUTC / 60;;
		par.sunRangeCount = 11;


		lightAmbient = new THREE.AmbientLight();
		c = par.lightAmbientColor;
		//lightAmbient.color = new THREE.Color( 'rgb( ' + c + ',' + c + ',' + c + ' )' );
		//lightAmbient.color = new THREE.Color( 'white' );
		//lights.add( lightAmbient );

		suns = []; //new THREE.Object3D();

		for ( var i = 0; i < par.sunRangeCount; i++ ) {

			sun = new THREE.DirectionalLight( 0xffffff, par.sunRangeIntensity );

			d = 100;
			sun.shadow.camera.left = -d;
			sun.shadow.camera.right = d;
			sun.shadow.camera.top = d;
			sun.shadow.camera.bottom = -d;

			sun.shadow.camera.near = 0;
			sun.shadow.camera.far = 3 * d;

			sun.shadow.mapSize.width = 2048;  // default 512
			sun.shadow.mapSize.height = 2048;

			sun.castShadow = true;

			sun.target = THR.axesHelper;

//			scene.add( new THREE.CameraHelper( sun.shadow.camera ) );

			geometry = new THREE.SphereBufferGeometry( 5, 20, 10 );
			material = new THREE.MeshBasicMaterial( { color: 0xffee00 } );
			mesh = new THREE.Mesh( geometry, material );
			sun.add( mesh );

			lights.add( sun );
			suns.push( sun );

			//			if ( par.sunRangeHelpers === 1 ) {

				//sunHelper = new THREE.CameraHelper( sun.shadow.camera );
				//suns.push( sunHelper );

			//			}



			par.year = 2018
			par.month = inpMonth.value;
			par.date = inpDate.value;
			par.minutes = 0;

			dateThere = new Date( Date.UTC( par.year, par.month, par.date, par.sunRangeStart - par.offsetThere, par.minutes + i * par.sunRangeMinutes ) );

			sun.userData.position = getSunPositionXYZ( parameters.analemmaRadius, dateThere, parameters.latitude, parameters.longitude );

			//console.log( 'sun.userData.position', sun.userData.position);

			sun.position.copy( THR.axesHelper.position.clone().add( sun.userData.position.xyz )  );

			if ( par.sunRangePlacards === 1 ) {

				txt = ( '0' + ( par.sunRangeStart + Math.floor( i * par.sunRangeMinutes / 60 ) ) ).slice( - 2 ) +
				':' + ( '0' + ( i * par.sunRangeMinutes % 60 ) ).slice( -2 );
				placard = drawPlacard( txt, 0.05, 120, 0, 10, 0 );
				sun.add( placard );

			}

		}


//		lights.add( suns );

		scene.add( lights );

		let meshGroundHelper = THR.scene.getObjectByName( 'groundHelper' );

		if ( meshGroundHelper ) {
			meshGroundHelper.receiveShadow = true;
			meshGroundHelper.material.color.set( 0xffffff );
			meshGroundHelper.material.needsUpdate = true;
		}
		THR.renderer.shadowMap.enabled = true;

		//THR.scene.traverse( function ( child ) {

				//if ( child.material ) {

		for ( surface of GBX.surfaceMeshes.children ) {

//				child.castShadow = true
//				child.receiveShadow = true
				surface.material.color.set( 0xffffff );

				surface.material.needsUpdate = true;

			}

		//} );

	}





	function setMonth() {

		//		if ( !parent.ifrMain ) { alert( 'please enter a location' ); return; }

		//		parameters.month = parseInt( inpMonth.value, 10 );

		outMonth.value = parseInt( inpMonth.value, 10 ) + 1;

		drawSunRange();

		// console.log( '', parent.ifrMain.contentWindow.parameters.month );

	}



	function setDate() {

		//		if ( !parent.ifrMain ) { alert( 'please enter a location' ); return }

		outDate.value = parseInt( inpDate.value, 10 );

		drawSunRange();

		// console.log( '', parent.ifrMain.contentWindow.parameters.date );

	}



	function setSunIntensity() {

		outSunIntensity.value = par.sunRangeIntensity = parseFloat( inpSunIntensity.value );

		outAmbientIntensity.value = par.lightAmbientIntensity = parseFloat( inpAmbientIntensity.value );

		lightAmbient.color = new THREE.Color( "rgb( " + par.lightAmbientIntensity + ',' + par.lightAmbientIntensity + ',' + par.lightAmbientIntensity + " )" );

		for ( var i = 0; i < suns.length; i++ ) {

			suns[ i ].intensity = par.sunRangeIntensity;

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



	function requestFile( url, callback ) {

		const xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', url, true );
		xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
		xhr.onprogress = function( xhr ) { console.log( 'bytes loaded:', xhr.loaded  ); }; /// or something
		xhr.onload = callback;
		xhr.send( null );

	}



	function callbackUtcOffset( xhr ) {

		const response = xhr.target.response;
//console.log( 'response', response );

		const json = JSON.parse( response );
//console.log( 'json', json );

		parameters.offsetUTC = json.rawOffset / 60;

		logLocation.innerHTML =

			'<p>Latitude: ' + parameters.latitude + '</p>' +

			'<p>Longitude: ' + parameters.longitude + '</p>' +

			'<p>UTC offset: ' + parameters.offsetUTC + '</p>' +

		'';

	}



	function getSunPositionXYZ( radius, timeThere, latitude, longitude ) {

		var sunPosition, x, y, z;

		sunPosition = getSunPosition( timeThere, latitude, longitude ); // from solar-calculator ... .js

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

	function tile2lon( x, zoom ) {

		return ( x / Math.pow( 2, zoom ) * 360 - 180 );

	}

	function tile2lat( y, zoom ) {

		var pi = Math.PI
		var n = pi - 2 * pi * y / Math.pow( 2, zoom );
		return 180 / pi * Math.atan( 0.5 * ( Math.exp( n ) - Math.exp( -n ) ));

	}

