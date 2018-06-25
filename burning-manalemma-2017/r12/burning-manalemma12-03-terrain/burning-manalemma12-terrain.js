

	let sydney = 'latitude:-33.8675,longitude:151.207,zoom:16,offsetUTC:-600';
	let sfHyatt = 'latitude:37.796,longitude:-122.398,zoom:16,offsetUTC:-420';
	let alcatraz = 'latitude:37.8270,longitude:-122.423,zoom:16,offsetUTC:-420';
	let coit = 'latitude:37.8024,longitude:-122.4058,zoom:16,offsetUTC:-420';
	let santaBarbara = 'latitude:34.4208305,longitude:-119.69819,zoom:16,offsetUTC:-420';
	let blackRock = 'latitude:40.786944,longitude:-119.204444,zoom:11,offsetUTC:-420';

//	const defaultLatitude = 37.796;
//	const defaultLongitude = -122.398;
//	const defaultOffsetUTC = -420;

	const defaultZoom = 16;
	const defaultLatitude = 40.786944;
	const defaultLongitude = -119.204444;
	const defaultHeightScale = 3;
	const defaultOffsetUTC = -420;

	let parameters = {};
/*
	parameters.zoom = defaultZoom;
	parameters.latitude = defaultLatitude;
	parameters.longitude = defaultLongitude;
	parameters.heightScale = defaultHeightScale;
	parameters.OffsetUTC = defaultOffsetUTC;
*/

	let ground, structures;
	let terrain = {};
	let count;
	let rasterContext

	const mbptoken='pk.eyJ1IjoidGhlb2EiLCJhIjoiY2o1YXFra3V2MGIzbzJxb2lneDUzaWhtZyJ9.7bYFAQabMXiYmcqW8NLfwg';
	const b = '<br>';

	function initTerrain() {

		divMenuItems.innerHTML =
`
			<details id = detTerrain open >

				<summary>Calculations</summary>

				<div id=calculations></div>

			</details>

			<details open >

				<summary>Heightmap</summary>
				<div id=heightmap ></div>

			</details>
`;


		initVariables();

	}


	function initVariables() {

		parameters.side = 2;
		parameters.groundSize = 100;  // size in units of Three.jd=s plane geometry
		parameters.mPixel = [ 156412, 78206, 39103, 19551, 9776, 4888, 2444, 1222, 610.984, 305.492, 152.746, 76.373, 38.187, 19.093, 9.547, 4.773, 2.387, 1.193, 0.596, 0.298 ]
		parameters.pixelsPerTile = 256;
		parameters.tilesPerSide = 4;

		//console.log( 'structures', structures );
		//	scene.remove( ground, structures );

		addEventListener( 'hashchange', onHashChange, false );

		onHashChange();

	}


	function onHashChange() {

		//console.log( 'mnu-content hash', location.hash );

		//		getParametersFromHash();

		//	}


		//	function getParametersFromHash() {

		let hash, str, params;

		if ( !location.hash ) {

		//console.log( 'mnu-contents: no hash' );

			location.hash = sfHyatt; //
			//location.hash = blackRock;

			return;

		}

		hash = location.hash.slice( 1 );

		str = '{"' + hash.replace( /:/g, '":"' ).replace( /,/g, '", "' ) + '"}';
		//console.log( 'getParametersFromHash', str );

		params = JSON.parse( str );

		parameters.latitude = params.latitude ? parseFloat( params.latitude ) : defaultLatitude;
		parameters.longitude = params.longitude ? parseFloat( params.longitude ) : defaultLongitude;
		parameters.zoom = params.zoom ? parseInt( params.zoom, 10 ) : defaultZoom;
		parameters.offsetUTC = params.offsetUTC ? parseInt( params.offsetUTC, 10 ) : defaultOffsetUTC;
		parameters.heightScale = params.heightScale ? params.heightScale : defaultHeightScale;

		//console.log( 'getParametersFromHash', parameters );

		//console.log( 'structures', structures );
		//scene.remove( ground, structures );

		getCalcs();

	};



	function updateTerrain() {

		//scope.console.log( 'mnu-content-terrain updateTerrain' );

		getCalcs();
		//		lights = scope.lights;

	}



	function getCalcs( ) {

		//console.log( 'parameters', parameters );

		let tileX, tileY;
		let latMin, latMax, lonMin, lonMax;
		let latDelta, lonDelta;
		let latitude, longitude, zoom;

		latitude = parameters.latitude;
		longitude = parameters.longitude;
		zoom = parameters.zoom;

		parameters.x = tileX = lon2tile( longitude, zoom );
		parameters.y = tileY = lat2tile( latitude, zoom );

		latMin =  tile2lat( tileY + 1, zoom );
		latMax =  tile2lat( tileY, zoom );

		lonMin = tile2lon( tileX, zoom );
		lonMax = tile2lon( tileX + 1, zoom );

		latDelta = ( latMax - latMin );
		lonDelta = ( lonMax - lonMin );

		// tile pixels - not screen pixels

		latDegreesPerPixel = latDelta / parameters.pixelsPerTile;
		lonDegreesPerPixel = lonDelta / parameters.pixelsPerTile;

		latPixelsPerDegree = parameters.pixelsPerTile / latDelta;
		lonPixelsPerDegree = parameters.pixelsPerTile / lonDelta;

		parameters.metersPerPixel = parameters.mPixel[ zoom ];
		parameters.metersPerTile = parameters.metersPerPixel * 256;

		parameters.latDelta = latDelta;
		parameters.lonDelta = lonDelta;

		parameters.scaleX = parameters.groundSize / lonDelta;
		parameters.scaleZ = parameters.groundSize / latDelta;

		// center the desired lat/lon within a 4x4 grid of image tiles.
		latDeltaTarget = latitude - latMin;
		lonDeltaTarget = longitude - lonMin;

		latDiff = latDeltaTarget / latDelta;
		lonDiff = lonDeltaTarget / lonDelta;

		//need more wiggle room here / not wired to 4x4
		if ( latDiff < 0.25 ) { parameters.titleOffsetY = 3; }
		else if ( latDiff < 0.5 ) { parameters.titleOffsetY = 2; }
		else if ( latDiff < 0.75 ) { parameters.titleOffsetY = 1; }
		else { parameters.titleOffsetY = 0; }

		if ( lonDiff < 0.25 ) { parameters.titleOffsetX = 0; }
		else if ( lonDiff < 0.5 ) { parameters.titleOffsetX = 1; }
		else if ( lonDiff < 0.75 ) { parameters.titleOffsetX = 2; }
		else { parameters.titleOffsetX = 3; }

		//console.log( 'parameters.titleOffsetX', parameters.titleOffsetX, lonDiff.toFixed( 2 ) );
		// console.log( 'parameters.titleOffsetY', parameters.titleOffsetY, latDiff.toFixed( 2 ) );

		/*
				d = new Date();
				parameters.month = d.getUTCMonth();
				parameters.date = d.getUTCDate();
				parameters.hours =  d.getUTCHours();
				parameters.minutes = d.getUTCMinutes();
		*/

		calculations.innerHTML =

			'<p>Latitude: ' + latitude.toFixed( 4 ) + '</p>' +
			'<p>Longitude: ' + longitude.toFixed( 4 ) + '</p>' +
			'<p>UTC Offset: ' + parameters.offsetUTC + '</p>' +
			'<p>zoom: ' + zoom + ' - tile X: ' + tileX + ' - tile Y: ' + tileY + '</p>' +
			'<p>lat Min: ' + latMin.toFixed( 4 ) + ' - latMax: ' + latMax.toFixed( 4 ) + '</p>' +
			'<p>lon Min: ' + lonMin.toFixed( 4 ) + ' - lonMax: ' + lonMax.toFixed( 4 ) + '</p>' +
			'<p> latDelta: ' + latDelta.toFixed( 6 ) + ' lonDelta: ' + lonDelta.toFixed( 6 ) + '</p>' +
			'<p>scaleX: ' + parameters.scaleX + '</p>' +
			'<p>scaleZ: ' + parameters.scaleZ + '</p>' +
			'<p> latDegreesPerPixel: ' + latDegreesPerPixel.toFixed( 6 ) + ' lonDegreesPerPixel: ' + lonDegreesPerPixel.toFixed( 6 ) + '</p>' +
			'<p> latPixelsPerDegree: ' + latPixelsPerDegree.toFixed( 1 ) + ' lonPixelsPerDegree: ' + lonPixelsPerDegree.toFixed( 1 ) + '</p>' +
			'<p>metersPerPixel: ' + parameters.metersPerPixel.toFixed( 4 ) + '</p>' +
			'<p>metersPerTile: ' + parameters.metersPerTile.toFixed( 4 ) + '</p>' +

		'';

		drawTerrain();

	}



	function drawTerrain() {

//		let zoom, x, y, geometryGround, materialGround;
//		let imageLoader, str;

		const zoom = parameters.zoom;
		const x = parameters.x = lon2tile( parameters.longitude, zoom );
		const y = parameters.y = lat2tile( parameters.latitude, zoom );

		const urlGED = 'https://api.mapbox.com/v4/mapbox.terrain-rgb/' + zoom + '/' + x + '/' + y + '.pngraw?access_token=' + mbptoken;
		//console.log( '', urlGED ); // click to see terrain / global elevation data / GED

		const imageLoader = new THREE.ImageLoader();
		imageLoader.crossOrigin = 'anonymous';
		imageLoader.load( urlGED , getHeightMapData );

		const str = 'https://tile.openstreetmap.org/' + zoom + '/' + x + '/' + y + '.png';
		//console.log( '', str );

	}



	function getHeightMapData( map ) {

		//	height = -10000 + ((R * 256 * 256 + G * 256 + B) * 0.1) - from mapbox

		//scope.console.log( 'hm', map );

//		let heightmapCanvas, heightmapContext;
//		let r, g, b;  // Note: b is a const elsewhere
//		parameters.metersPerPixel = parameters.mPixel[ parameters.zoom ];

		const scaleTerrain = parameters.heightScale * 100 / ( 256 * parameters.metersPerPixel );

		const heightmapCanvas = document.createElement( 'canvas' );

		heightmapCanvas.style.cssText = ' ';
		const size = parameters.pixelsPerTile;
		heightmapCanvas.width = size;
		heightmapCanvas.height = size;
		const heightmapContext = heightmapCanvas.getContext( '2d' );

		heightmapContext.drawImage( map, 0, 0, size, size, 0, 0, size, size );

		const data = heightmapContext.getImageData( 0, 0, size, size ).data;

		const geometry = new THREE.PlaneBufferGeometry( parameters.groundSize, parameters.groundSize, size - 1, size - 1 );
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -0.5 * Math.PI ) );
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0.5 * parameters.groundSize, 0, 0.5 * parameters.groundSize ) );
		const vertices = geometry.attributes.position.array;

		for ( let i = 1, j = 0; i < vertices.length; i += 3 ) {

			const r = data[ j++ ];
			const g = data[ j++ ];
			const b = data[ j++ ];
			j++;

			vertices[ i ] = scaleTerrain * ( 0.1 * ( r * 65536 + g * 256 + b ) - 10000 );

		}

		geometry.computeFaceNormals();
		geometry.computeVertexNormals();
		//geometry.center();

		const material = new THREE.MeshNormalMaterial( { opacity: 0.75 } );

		scene.remove( ground, structures );
		ground = new THREE.Mesh( geometry, material );
		ground.name = 'ground';
		ground.castShadow = true;
		ground.receiveShadow = true;

		scene.add( ground );

		drawMapOverlay();

//		heightmap.innerHTML = '<div id=hm ></div>';
		heightmap.appendChild( heightmapCanvas );

	}




	function drawMapOverlay() {
		//console.log( 'drawMapOverlay', 23 );

		const opacity = 1;
		const zoom =  parameters.zoom + 2;
		const tilesPerSide = parameters.tilesPerSide;
		const rasterCanvas = document.createElement( 'canvas' );
		rasterCanvas.width = rasterCanvas.height = parameters.pixelsPerTile * tilesPerSide;
//		document.body.appendChild( rasterCanvas );
//		rasterCanvas.style.cssText = 'border: 1px solid gray; left: 0; margin: 10px auto; position: absolute; right: 0; z-index:10;';

		const rasterContext = rasterCanvas.getContext( '2d' );

		if ( !parameters.mapType ) {

			parameters.mapType = [ 'Google Maps','	function drawMapOverlay() {
				//console.log( 'drawMapOverlay', 23 );

				const opacity = 1;
				const zoom =  parameters.zoom + 2;
				const tilesPerSide = parameters.tilesPerSide;
				const rasterCanvas = document.createElement( 'canvas' );
				rasterCanvas.width = rasterCanvas.height = parameters.pixelsPerTile * tilesPerSide;
		//		document.body.appendChild( rasterCanvas );
		//		rasterCanvas.style.cssText = 'border: 1px solid gray; left: 0; margin: 10px auto; position: absolute; right: 0; z-index:10;';

				const rasterContext = rasterCanvas.getContext( '2d' );

				if ( !parameters.mapType ) {

					parameters.mapType = [ 'Google Maps','https://mt1.google.com/vt/x=' ];
					parameters.selectedIndex = 0;

				}

		//		const tileOffset = Math.floor( 0.5 * tilesPerSide );
				const tileX = lon2tile( parameters.longitude, zoom ) - parameters.titleOffsetX;
				const tileY = lat2tile( parameters.latitude, zoom ) - parameters.titleOffsetY;

				let count = 0;
				const baseURL = parameters.mapType[ 1 ];

				for ( let x = 0; x < tilesPerSide; x++ ) {

					for ( let y = 0; y < tilesPerSide; y++ ) {

						if ( parameters.selectedIndex < 4 ) {

							loadImage( baseURL + ( x + tileX ) + '&y=' + ( y + tileY ) + '&z=' + zoom, x, y );
							//console.log( 'google', baseURL + ( x + tileX ) + '&y=' + ( y + tileY ) + '&z=' + zoom, x, y );

						} else if ( parameters.selectedIndex === 7 ) {

							loadImage( baseURL + zoom + '/' + ( y + tileY ) + '/' + ( x + tileX ) + '.jpg', x , y );
							//console.log( 'esri', baseURL + zoom + '/' + ( y + tileY ) + '/' + ( x + tileX ) + '.jpg' );

						} else {

							loadImage( baseURL + zoom + '/' + ( x + tileX ) + '/' + ( y + tileY ) + '.png', x , y );
							//console.log( '', parameters.selectedIndex, baseURL + zoom + '/' + ( x + tileX ) + '/' + ( y + tileY ) + '.png' );

						}

					}

				}


				function loadImage( url, x, y ) {
					//console.log( 'load image', x, y );
					//scope.info.innerHTML += 'url ' + url + ' x' + x + ' y' + y + b;

					const img = document.createElement( 'img' );
					img.crossOrigin = 'anonymous';
					img.src = url;

					const texture = new THREE.Texture( rasterCanvas );
					texture.minFilter = texture.magFilter = THREE.NearestFilter;
					texture.needsUpdate = true;
					const pixelsPerTile = parameters.pixelsPerTile;
					const tilesPerSideSquared = tilesPerSide * tilesPerSide;

					img.onload = function(){

						//info.innerHTML += + count + ' ';
						rasterContext.drawImage( img, 0, 0, pixelsPerTile, pixelsPerTile, x * pixelsPerTile, y * pixelsPerTile, pixelsPerTile, pixelsPerTile );

						count++;

						if ( count >= tilesPerSideSquared ) {

							//info.innerHTML += 'ground.material.map' + texture.uuid;

							if ( lightDirectional ) {
								//console.log( 'lights true', lightDirectional );

								ground.material = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture, side: 2, opacity: opacity , transparent: true } );


							} else {
								//console.log( 'lights false', lights );

								ground.material = new THREE.MeshBasicMaterial( { color: 0xffffff, map: texture, side: 2, opacity: opacity , transparent: true } );

							}

							//ground.material = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture, side: 2, opacity: opacity , transparent: true } );
							//ground.geometry.computeFaceNormals();
							//ground.geometry.computeVertexNormals();
		//					ground.material.needsUpdate = true;

							setCamera();

						}

					}

				}


			}
		' ];
			parameters.selectedIndex = 0;

		}

//		const tileOffset = Math.floor( 0.5 * tilesPerSide );
		const tileX = lon2tile( parameters.longitude, zoom ) - parameters.titleOffsetX;
		const tileY = lat2tile( parameters.latitude, zoom ) - parameters.titleOffsetY;

		let count = 0;
		const baseURL = parameters.mapType[ 1 ];

		for ( let x = 0; x < tilesPerSide; x++ ) {

			for ( let y = 0; y < tilesPerSide; y++ ) {

				if ( parameters.selectedIndex < 4 ) {

					loadImage( baseURL + ( x + tileX ) + '&y=' + ( y + tileY ) + '&z=' + zoom, x, y );
					//console.log( 'google', baseURL + ( x + tileX ) + '&y=' + ( y + tileY ) + '&z=' + zoom, x, y );

				} else if ( parameters.selectedIndex === 7 ) {

					loadImage( baseURL + zoom + '/' + ( y + tileY ) + '/' + ( x + tileX ) + '.jpg', x , y );
					//console.log( 'esri', baseURL + zoom + '/' + ( y + tileY ) + '/' + ( x + tileX ) + '.jpg' );

				} else {

					loadImage( baseURL + zoom + '/' + ( x + tileX ) + '/' + ( y + tileY ) + '.png', x , y );
					//console.log( '', parameters.selectedIndex, baseURL + zoom + '/' + ( x + tileX ) + '/' + ( y + tileY ) + '.png' );

				}

			}

		}


		function loadImage( url, x, y ) {
			//console.log( 'load image', x, y );
			//scope.info.innerHTML += 'url ' + url + ' x' + x + ' y' + y + b;

			const img = document.createElement( 'img' );
			img.crossOrigin = 'anonymous';
			img.src = url;

			const texture = new THREE.Texture( rasterCanvas );
			texture.minFilter = texture.magFilter = THREE.NearestFilter;
			texture.needsUpdate = true;
			const pixelsPerTile = parameters.pixelsPerTile;
			const tilesPerSideSquared = tilesPerSide * tilesPerSide;

			img.onload = function(){

				//info.innerHTML += + count + ' ';
				rasterContext.drawImage( img, 0, 0, pixelsPerTile, pixelsPerTile, x * pixelsPerTile, y * pixelsPerTile, pixelsPerTile, pixelsPerTile );

				count++;

				if ( count >= tilesPerSideSquared ) {

					//info.innerHTML += 'ground.material.map' + texture.uuid;

					if ( lightDirectional ) {
						//console.log( 'lights true', lightDirectional );

						ground.material = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture, side: 2, opacity: opacity , transparent: true } );


					} else {
						//console.log( 'lights false', lights );

						ground.material = new THREE.MeshBasicMaterial( { color: 0xffffff, map: texture, side: 2, opacity: opacity , transparent: true } );

					}

					//ground.material = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture, side: 2, opacity: opacity , transparent: true } );
					//ground.geometry.computeFaceNormals();
					//ground.geometry.computeVertexNormals();
//					ground.material.needsUpdate = true;

					setCamera();

				}

			}

		}


	}



	function setCamera() {

//		if ( !ground.geometry ) { return; }

		const size = parameters.groundSize;
//		ground.geometry.computeBoundingSphere();
		const center = ground.geometry.boundingSphere.center;
		controls.target.copy( center );

		axesHelper.position.copy( center );

		//console.log( 'center', center, camera.position );

		camera.position.copy( controls.target.clone().add( new THREE.Vector3( 0, size, size ) ) );

		lightDirectional.position.copy( controls.target.clone().add( new THREE.Vector3( -size, size, size ) ) );

		lightDirectional.target = axesHelper;

	}



	function lon2tile( longitude, zoom ) {

		return Math.floor( ( longitude + 180 ) / 360 * Math.pow( 2, zoom ) );

	}


	function lat2tile( latitude, zoom ) {

		const pi = Math.PI;
		return Math.floor( ( 1 - Math.log( Math.tan( latitude * pi / 180 ) + 1 / Math.cos( latitude * pi / 180) ) / pi ) / 2 * Math.pow( 2, zoom ) );

	}


	function tile2lon( x, zoom ) {

		return ( x / Math.pow( 2, zoom ) * 360 - 180 );

	}


	function tile2lat( y, zoom ) {

		const pi = Math.PI;
		const n = pi - 2 * pi * y / Math.pow( 2, zoom );
		return 180 / pi * Math.atan( 0.5 * ( Math.exp( n ) - Math.exp( -n ) ));

	}
