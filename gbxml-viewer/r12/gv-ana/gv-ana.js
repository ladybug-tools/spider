// Copyright 2018 Ladybug Tools authors. MIT License

	var ANA = {};

	// needs name space update
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
	parameters.analemmaRadius = 0.8 * parameters.groundSize;

	parameters.offsetUTC = 0;

	parameters.date = 21;
	parameters.month =12;
	parameters.hour = 12 - parameters.offsetUTC / 60;
	parameters.minutes = 0;

	var object3D;
	var structures;
	var ground;

	var sun;
	var analemma;

	var daysOfMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

	var rafPlayTheYear;

	var playTheYear = false;

	var count = 0;

	var butColor;

	initAnalemma();


	function initAnalemma() {

		if ( window.butMenuLoad ) {

			ANA.butAnalemma = butMenuLoad;

			ANA.title = 'gv-ANA - gbXML Viewer Sun Path / Analemma';
			document.title = ANA.title;
			aDocumentTitle.innerHTML = ANA.title;
			ANA.butAnalemma.innerHTML = ANA.title;

		} else {

			ANA.butAnalemma = butAnalemma;

		}

		console.log( 'ANA.butAnalemma.style.backgroundColor', ANA.butAnalemma.style.backgroundColor );

		//if ( ANA.butAnalemma.style.backgroundColor === '' ) {
		if ( ANA.butAnalemma.style.fontStyle !== 'italic' ) {

			parameters.latitude = GBX.gbjson.Campus.Location.Latitude;
			parameters.longitude = GBX.gbjson.Campus.Location.Longitude;
			if ( !parameters.latitude ) {alert( 'Need latitude and longitude in gbXML file'); return; }

			const scriptSolCalc = document.head.appendChild( document.createElement( 'script' ) );
			scriptSolCalc.src = 'https://rawgit.com/ladybug-tools/ladybug-web/gh-pages/solar-calculator-ladybug-web/solar-calculator-ladybug-web-r1.js';


			divMenuItems.innerHTML = `

				<details id = detAnalemma open>
					<summary>Sun Path / Analemma</summary>

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
						<button id=butPlayTheYear onclick="togglePlayTheYear();" >Play the Solar Year</button>
						</p>

						<div id=logLocation ></div>

				</details>

			` + divMenuItems.innerHTML;

			// const now = Math.floor( Date.now() / 1000 );

			// url = 'https://maps.googleapis.com/maps/api/timezone/json?location=' +
			// 	parameters.latitude + ',' + parameters.longitude + '&timestamp=' + now;

			//requestFile( url, callbackUtcOffset );

			setUtcOffset()

			object3D = new THREE.Object3D();

			/*
			console.log( 'scene', icw );
			console.log( 'gbjson', gbjson );
			console.log( 'GBX.surfaceMeshes', GBX.surfaceMeshes );
			*/

			// allow clicking anywhere to set off init
						inpMonth.oninput = initSunPath;
						inpDate.oninput = initSunPath;
						inpHour.oninput = initSunPath;

			// following causes error when inside an iframe in a read me
			if ( parent.setIfrThree ) { setIfrThree(); }

			//ANA.butAnalemma.style.backgroundColor = 'var( --but-bg-color )';
			//butColor = getComputedStyle(ANA.butAnalemma).getPropertyValue("--but-bg-color");
			ANA.butAnalemma.style.cssText = 'background-color: pink !important; font-style: italic; font-weight: bold';

		} else {

			detAnalemma.remove();
			THR.scene.remove( analemma );
			THR.lightDirectional.remove( sun );

			ANA.butAnalemma.style.backgroundColor = '';
			ANA.butAnalemma.style.fontStyle = '';
			ANA.butAnalemma.style.fontWeight = '';

		}

		console.log( 'butColor', butColor );
	}



	function initSunPath( playIt = true ) {

		//console.log( '', parameters );

		inpMonth.value = parameters.month;
		outMonth.value = parameters.month + 1;

		outDate.value = inpDate.value = parameters.date;

		inpHour.value = parameters.hour + parameters.offsetUTC / 60;
		outHour.value =  parameters.hour + parameters.offsetUTC / 60;

		resetShadowMap();

		drawAnalemma();

		initSunAndLight();

		// init happened so assign actual task
		inpMonth.oninput = setMonth;
		inpDate.oninput = setDate;
		inpHour.oninput = setHour;

		cancelAnimationFrame( rafPlayTheYear );

		butPlayTheYear.style.backgroundColor = 'var( --but-bg-color )';

		playTheYear = playIt;
		if ( playTheYear === true ) { play(); }

	}


	function resetShadowMap() {

		if ( THR.renderer.shadowMap.enabled === false ) {

			THR.renderer.shadowMap.enabled = true;

			THR.scene.traverse( function ( child ) {

				child.castShadow = true;
				child.receiveShadow = true;

			} );

		}

	}


	function drawAnalemma() {

		let year, month, date, hours, hour, i;
		let geometry, vertices, material, line;
		let analemmaDateUTC, analemmaSunPosition, analemmaColor, placard;
		let colors;

		colors = [ 'bisque', 'deeppink', 'sienna', 'darkorange', 'indigo', 'lime',
		'purple', 'honeydew', 'coral', 'gold', 'gray', 'maroon' ];

		THR.scene.remove( analemma );

		analemma = new THREE.Object3D();

		year = ( new Date() ).getUTCFullYear();

		parameters.analemmaRadius = GBX.surfaceMeshes.userData.radius;

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

			placard = drawPlacard( '' + hours, 0.001 * parameters.analemmaRadius, analemmaColor, vertices[ 0 ].x, vertices[ 0 ].y, vertices[ 0 ].z );
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

		//		object3D.remove( analemma );
		//		object3D.add( analemma );
		analemma.position.copy( THR.axesHelper.position );
		//		analemma.rotation.z += Math.PI;

		THR.scene.add( analemma );

		//console.log( 'analemma', analemma );

	}



	function initSunAndLight() {

		var geometry, material, d;

		THR.lightDirectional.remove( sun );
		geometry = new THREE.SphereBufferGeometry( parameters.analemmaRadius / 10, 20, 10 );
		material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
		sun = new THREE.Mesh( geometry, material );

		sun.name = 'sun';
		//console.log( 'icw', icw, lightDirectional );
		THR.lightDirectional.add( sun );

		//		scene.add( lights );

		setSunPosition();

	}



	function setSunPosition() {

		let d, year, dateThere;

		d = new Date();
		year = d.getUTCFullYear();

		dateThere = new Date( Date.UTC( year, parameters.month, parameters.date, parameters.hour, parameters.minutes, 0 ) );
		sun.userData.position = getSunPositionXYZ( parameters.analemmaRadius, dateThere, parameters.latitude, parameters.longitude );

		THR.lightDirectional.position.copy( THR.controls.target.clone().add( sun.userData.position.xyz ) );

		//console.log( 'lightDirectional.position', lightDirectional.position );
		//console.log( 'sun.position', sun.position );

	}



	function goToNextHour() {

		if ( butPlayTheYear.style.backgroundColor !== 'var( --but-bg-color )') { initSunPath( false ); }

		//		if ( !divMenuItems.innerHTML.includes( 'initSunPath' ) && playTheYear ) { togglePlayTheYear(); return; }

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

		if ( butPlayTheYear.style.backgroundColor !== 'var( --but-bg-color )') { initSunPath( false ); }

		parameters.month = parseInt( inpMonth.value, 10 );

		outMonth.value = parameters.month + 1;

		setSunPosition();

		// console.log( '', parent.mainIframe.contentWindow.parameters.month );

	}



	function setDate() {

		if ( butPlayTheYear.style.backgroundColor !== 'var( --but-bg-color )') { initSunPath( false ); }

		outDate.value = parameters.date = parseInt( inpDate.value, 10 );

		setSunPosition();

		// console.log( '', parent.mainIframe.contentWindow.parameters.date );

	}



	function setHour() {

		if ( butPlayTheYear.style.backgroundColor !== 'var( --but-bg-color )') { initSunPath(); }

		parameters.hour = parseInt( inpHour.value - parameters.offsetUTC / 60, 10 );
		outHour.value =  parameters.hour + parameters.offsetUTC / 60;

		setSunPosition();

		// console.log( '', parent.mainIframe.contentWindow.parameters.hours );

	}



	function togglePlayTheYear() {

		cancelAnimationFrame( rafPlayTheYear );
		playTheYear = !playTheYear;

		if ( divMenuItems.innerHTML.includes( 'initSunPath' ) ) {

			butPlayTheYear.style.backgroundColor = butPlayTheYear.style.backgroundColor === 'var( --but-bg-color, pink )';

		}

		play();

	}



	function play() {

		rafPlayTheYear = requestAnimationFrame( play );

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




	function setUtcOffset () {

		url= `http://api.geonames.org/timezoneJSON?lat=${ parameters.latitude }&lng=${ parameters.longitude }&username=raf`;
		//divUrl.innerHTML = url;

		fetch( url )
		.then( response => response.json() )
		.then( json => {

			console.log( 'js', json.rawOffset );
			divContents.innerHTML = JSON.stringify( json )

			parameters.offsetUTC = json.gmtOffset;

			logLocation.innerHTML =

				'<p>Latitude: ' + parameters.latitude + '</p>' +

				'<p>Longitude: ' + parameters.longitude + '</p>' +

				'<p>UTC offset: ' + parameters.offsetUTC + '</p>' +

			'';

		});


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

		let response, json, lines;

		response = xhr.target.response;

		//console.log( 'response', response );

		//divContents.innerHTML += '<p>response:' + b + response + '</p>';

		json = JSON.parse( response );

		console.log( 'json', json );

		/*
				jsonString = JSON.stringify( json, null, ' ' );

				divContents.innerHTML += '<p>JSON.stringify:' + b + response + '</p>';

				divContents.innerHTML += '<p>UTC offset: ' + ( json.rawOffset / 60 ) +  '</p>';
		*/

		parameters.offsetUTC = json.gmtOffset;

		logLocation.innerHTML =

			'<p>Latitude: ' + parameters.latitude + '</p>' +

			'<p>Longitude: ' + parameters.longitude + '</p>' +

			'<p>UTC offset: ' + parameters.offsetUTC + '</p>' +

		'';

	}
