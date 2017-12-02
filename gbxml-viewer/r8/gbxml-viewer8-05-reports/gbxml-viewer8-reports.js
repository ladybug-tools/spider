// Copyright 2017 Ladybug Tools authors. MIT License

	var divAppMenu = divAppMenu || undefined;

	var icw = icw || undefined;
//	var gbjson;
	var meshSurfaces;


	init();

	function init() {

		if ( !divAppMenu ) {

			divAppMenu= document.body.appendChild( document.createElement( 'div' ) );
			divAppMenu.style.cssText = 'background-color: white; border: 1px solid red; max-height: 90%; ' +
				'max-width: 350px; opacity: 0.85; overflow: auto;' +
				' padding: 10px; position: fixed; right: 30px; top: 20px; z-index:100000; ';

		}
/*
		icw = ifrThree.contentWindow;

console.log( 'scene', icw );

console.log( 'campusSurfaces', icw.campusSurfaces );

console.log( 'gbjson', icw.gbjson );
*/

		let txt = 'lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?';

		divAppMenu.innerHTML = 

			'<div id = divReport ></div>';


		createReport(); 

	}


	function createReport() {

		icw = ifrThree.contentWindow;
		gbjson = icw.gbjson;
//console.log( '', gbjson );

		THREE = icw.THREE;
		meshSurfaces = icw.scene.children[ 4 ];

		gbxml = traversGbjson( gbjson );
//console.log( 'gbxml', gbxml );

		divReport.innerHTML = addDetails( 'gbXML', gbxml.attributes );

		campus = traversGbjson( gbjson.Campus );
		divReport.innerHTML += addDetails( 'Campus', campus.attributes );

		locate = traversGbjson( gbjson.Campus.Location );
		txt = getLocation();
		divReport.innerHTML += addDetails( 'Campus Location' + txt, locate.attributes );


		building = traversGbjson( gbjson.Campus.Building );
		divReport.innerHTML += addDetails( 'Building', building.attributes );

		spaces = getSpaces();

		divReport.innerHTML += addDetails( spaces.summary, spaces.flowContent );


		zones = traversGbjson( gbjson.Zone );
		divReport.innerHTML += addDetails( 'Zones', zones.attributes );


		documents = traversGbjson( gbjson.DocumentHistory );
		divReport.innerHTML += addDetails( 'Documents', documents.attributes );


		surfaces = traversGbjson( gbjson.Campus.Surface );
		detail = getSurfaces();
		divReport.innerHTML += addDetails( detail.summary, detail.flowContent, 'open' );

//		divReport.innerHTML += txt;

		examineGbjson( gbjson );

	}


	function getSpaces() {

		spaces = gbjson.Campus.Building.Space;
console.log( '', spaces  );

		const b = '<br>';
		let txt = '';


		count = 1;

		if ( spaces.length) {

			for ( let space of spaces ) {
//console.log( 'space', space );

				txt += '<div style=margin-bottom:10px; > ' +
					( count ++ ) +
					'. id: ' + space.id + b +
					' name: <button onclick=toggleSpace("' + space.id + '"); >' + space.Name + '</button>' + b +
					' area: ' + Number( space.Area ).toFixed( 1 ) + b +
				'</div>'

			}

		}

		return { summary: 'Spaces > ' + count, flowContent: txt };

	}



	function toggleSpace( id ) {

//console.log( '', id );

		meshSurfaces.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {


				if ( Array.isArray( child.userData.data.AdjacentSpaceId ) === true && 
					( id === child.userData.data.AdjacentSpaceId[ 0 ].spaceIdRef || id === child.userData.data.AdjacentSpaceId[ 1 ].spaceIdRef ) 
				) {

				child.material.wireframe = false;
				child.material.opacity = 0.85;
//console.log( 'space', space );

				} else {

					child.material.wireframe = true;
					child.material.opacity = 0.2;

				}

			}

		} );

	}



	function getLocation() {

		const locate = gbjson.Campus.Location;
		let text;

		if ( locate && locate.Latitude && locate.Longitude ) {

			const link = 'https://www.google.com/maps/@' + locate.Latitude + ',' + locate.Longitude + ',17z';
			text = ' > <a href="'+ link + '" style=background-color:lightblue; target=_blank > &#x1f5fa; </a>';

		} else {

			text = '';

		}

		return text;

	}


	function traversGbjson( obj ) {

		const b = '<br>';
		const elements = [];
		let txt = '';

		for ( let i in obj ) {

			if ( obj[ i ] !== null && typeof( obj[ i ] ) === 'object' ) {

				if ( elements.indexOf( i ) < 0 ) { elements.push( i ); }

			} else {

				txt += '<div id=ib >' + i + '</div>: ' + obj[ i ] + b;

			}

		};

		return { elements: elements, attributes: txt };

	}



	function addDetails( summary, text, open = '' ) {

		text = text ? text : 'no attributes';
		const txt =

		'<details ' + open + ' >' +
			'<summary>' + summary + '</summary>' +
			text +
		'</details>';

		return txt;

	}



	function getSurfaces() {

		surfaces = gbjson.Campus.Surface;

		let txt = '';

//console.log( 'surfaces', surfaces );

		txt += '';

		types = [];
		typesCount = [];

		for ( let surface of surfaces ) {

			index = types.indexOf( surface.surfaceType );

			if ( index < 0 ) { 

				types.push( surface.surfaceType );
				typesCount[ types.length - 1 ] = 1;

			} else {

				typesCount[ index ] ++;

			}

		}

		for ( let i = 0; i < types.length; i++ ) {

			txt += '<button class=toggle onclick=toggleSurfaceType(this); >' + types[ i ] + '</button>: ' + typesCount[ i ] + ' - ' + Math.round( 100 * typesCount[ i ] / surfaces.length ) + '%<br>';

		}

		txt += '<button class=toggle onclick=toggleAllVisible(); >all visible</button>: ' 

		const summary = 'Surfaces: ' + surfaces.length;

		return { summary: summary, flowContent: txt };

	}



	function toggleSurfaceType( that ) {

//console.log( '', that.innerText );

		meshSurfaces.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh && child.userData.data.surfaceType !== that.innerText ) {

				child.material.wireframe = true;
				child.material.opacity = 0.1;

			} else if ( child.material ) {

				child.material.wireframe = false;
				child.material.opacity = 0.85;

			}

		} );

	}



	function toggleAllVisible() {

		meshSurfaces.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.material.wireframe = false;
				child.material.opacity = 0.85;

			}
		} );

	}



	function examineGbjson( gbjson ) {

		surfaces = [];

		const b = '<br>';
		let txt = 
			'File: ' + gbjson.name + b +
			'Number of surfaces: ' + gbjson.Campus.Surface.length +
		'';

		let t$ = '';

		let surfacesCount = 0;

		for ( let surface of gbjson.Campus.Surface ) {

			points = JSON.stringify( surface.PlanarGeometry.PolyLoop.CartesianPoint );

			if ( !surfaces.includes( points ) ) { 

				surfaces.push( points ); 

			} else {

console.log( 'duplicate surface', surface );

				t$ += 
					'<p>' + surfacesCount + 
						'. id: ' + surface.id + b +
						'surfaceType: ' + surface.surfaceType + b +
						'Name: ' + surface.Name + b +
						'CADObjectId: ' + surface.CADObjectId + b +
					'</p>';

				surfacesCount ++;
			}

		}

		divReport.innerHTML += addDetails( 'Duplicate Surfaces: ' + surfacesCount, t$ );
//		txt += '<h3>' + surfacesCount + ' Duplicate Surfaces</h3>' + t$;


		t$ = '<button class=toggle onclick=toggleAllVisible(); >all visible</button> ' 


		adjacenciesCount = 0;

		for ( let surface of gbjson.Campus.Surface ) {

			adjacencies = surface.AdjacentSpaceId;

			if ( Array.isArray( adjacencies ) && JSON.stringify( adjacencies[ 0 ] ) === JSON.stringify( adjacencies[ 1 ] ) ) { 

//console.log( 'surface', surface );
//console.log( 'duplicate adjacencies', adjacencies );

				t$ += 
					'<p>' +
						( adjacenciesCount + 1 ) + '. id: ' + surface.id + b +
						'surfaceType: ' + surface.surfaceType + b +
						'Name: <button onclick=toggleDuplicateAdjacency(this); style=width:200px >' + surface.Name + '</button>' + b +
						'CADObjectId: ' + surface.CADObjectId + b +
						'Adjacencies : ' + adjacencies[ 0 ].spaceIdRef + b +
					'</p>';

				adjacenciesCount ++;

			}

		}


//		txt += '<h3>' + adjacenciesCount + ' Duplicate Adjacencies</h3>' + t$;

		divReport.innerHTML += addDetails( 'Duplicate Adjacencies: ' + adjacenciesCount, t$, 'open' );


		coordinatesCount = 0;
		verticesModelDuplicates = 0
		verticesModel = [];
		t$ = ''


		for ( let surface of gbjson.Campus.Surface ) {

			points = surface.PlanarGeometry.PolyLoop.CartesianPoint;

			verticesSurface = [];

			for ( point of points ) {

				vertex = JSON.stringify( point );

				if ( !verticesSurface.includes( vertex ) ) { 

					verticesSurface.push( vertex ); 

				} else {

console.log( 'dup', vertex );

				t$ += 
					'<p>' +
						'id: ' + surface.id + b +
						'surfaceType: ' + surface.surfaceType + b +
						'Name: ' + surface.Name + b +
						'CADObjectId: ' + surface.CADObjectId + b +
//						'Adjacencies : ' + adjacencies[ 0 ].spaceIdRef + b +
					'</p>';

				}


				if ( !verticesModel.includes( vertex ) ) { 

					verticesModel.push( vertex ); 

				} else {

//console.log( 'dup in model', vertex );

					verticesModelDuplicates ++;

				}

				coordinatesCount ++;

			}

//console.log( '', vertices );

		}

		t$ = '' +
			'Coordinates checked: ' + coordinatesCount + b +
			'Unique coordinates in model: ' + verticesModel.length + b +
			'Duplicate coordinates in model: ' + verticesModelDuplicates + b +
		'';


		divReport.innerHTML += addDetails( 'Duplicate Coordinates', t$ );

//		divMenuItems.innerHTML = txt;


	}


	function toggleDuplicateAdjacency( that ) {

//console.log( '', that.innerText );

		let thatChild;

		meshSurfaces.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh && child.userData.data.Name !== that.innerText ) {

				child.material.wireframe = true;
				child.material.opacity = 0.1;


			} else if ( child.material ) {

				child.material.wireframe = false;
				child.material.opacity = 1;
				 thatChild = child;

			}

		} );

//console.log( 'thatChild', thatChild );

		space = thatChild.userData.data.AdjacentSpaceId[ 0 ].spaceIdRef;

		meshSurfaces.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh && Array.isArray( child.userData.data.AdjacentSpaceId ) === true && 
				( space === child.userData.data.AdjacentSpaceId[ 0 ].spaceIdRef || space === child.userData.data.AdjacentSpaceId[ 1 ].spaceIdRef ) 
				&& child !== thatChild
			) {

				child.material.wireframe = false;
				child.material.opacity = 0.2;
console.log( 'space', space );


			} else {



			}

		} );

	}





