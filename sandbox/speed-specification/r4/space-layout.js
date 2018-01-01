/* Copyright 2018 Ladybug Tools authors. MIT License */


// You are probably better at doing this sort of stuff than I am. ;-)
	const zonesPerShapes = [ 5, 7, 13, 9 ];

	function initSpaceLayoutInputFields() {

		document.getElementById("divSpaceLayout").innerHTML =
		'<h2>\n'+
			'Space Layout\n'+
		'</h2>\n'+
		'<div id = "divLeftColumn" valign=top >\n'+
			'<h3>Set Space Type</h3>\n'+

		'</div>\n'+
		'<div id = "divRightColumn" style=max-width:300px; >\n'+
			'<h3>Apply to floors</h3>\n'+

			'<p><input id=inpFloorStart type=number onchange=updateTypes() > to <input id=inpFloorEnd type=number onchange=updateTypes(); ></select></p>\n'+

			'<img id=imgShape width=100% />\n'+

			'<h3>Area Usage</h3>\n'+

			'<table id=tabUsage >\n'+

			'</table>\n'+
		'</div>';

		inpFloorStart.min = 1;
		inpFloorStart.max = theBuilding.storeys;
		inpFloorStart.value = 1;

		inpFloorEnd.min = 1;
		inpFloorEnd.max = theBuilding.storeys;
		inpFloorEnd.value = theBuilding.storeys;

	}

	function onToogleSpaceLayout()
	{

		// Calculate the zone area and return them
		// Put text tags on each zone
		// Don't rotate the building or the N,S,E,W but rotate the axis

		divEnvelope.style.display = 'none';

		divAdjacentBuildings.style.display = 'none';

		divGeometry.style.display = 'none';

		divSpaceLayout.style.display = 'block';

		threejsOrtho.style.display = 'block';

		threejsPerspective.style.display = 'none';

		initSpaceLayoutInputFields();

		switchToSpaceLayout();
		switchView("space");

		spaceLayout.group = new THREE.Group();

		spaceLayout.group.name = "spaceLayoutBuilding";

		// Copy the qLine group to the SpaceLayout Group
		// But remove the exterior roof of the SpaceLayout Group

		function createSpaceLayoutInScene()
		{
				scene.children.forEach( function( node ) {

					if ((node instanceof THREE.Group) && (node.name == "theBuilding" ))
					{

						node.children.forEach(function(child){

							if (child.name=="storey-0")
							{
								child.visible = true;

								child.children.forEach(function(surface){

									if (!surface.name.includes("ceiling"))
									{
										// You must clone the surface otherwise it literally moves objects between the groups!
										copiedSurface = surface.clone();
										// console.log(copiedSurface);
										var floor  	= scene.getObjectByName("floor-1-storey-0");
										var pts 	= floor.geometry.attributes.position.array;
										var shape 	= [];

										for(var i = 0; i < pts.length / 3; i ++)
										{
											shape.push({x : pts[i * 3], y : pts[i * 3 + 1]});
										}

										var area = THREE.ShapeUtils.area(shape) * (-1);

										console.log(area);



										// TODO ### Number 7 ####
										// Trying to get the area of the surface here:

										// area = ShapeUtils.area(copiedSurface.geometry.parameters.shapes)
										//
										// console.log(area)

										spaceLayout.group.add(copiedSurface);
									}

								});
								// Set the postion to be the same as the Geometry and Envelope Geometry
								spaceLayout.group.position.x = child.position.x;
								spaceLayout.group.position.y = child.position.y;
								spaceLayout.group.position.z = child.position.z;

								drawspacelayoutText();

							}
						});
					}

				function drawspacelayoutText()
				{
					var size 	= theBuilding.perimeterDepth - 1;
					var min_s 	= 999999;

					spaceLayout.group.children.forEach(function(surface)
					{
						if (surface.name.includes("floor"))
						{
							surface.geometry.computeBoundingBox();

							var max_bound 	= surface.geometry.boundingBox.max;
							var min_bound 	= surface.geometry.boundingBox.min;

							if(max_bound.x - min_bound.x < max_bound.y - min_bound.y - 10)
							{
								min_s = Math.min(min_s, max_bound.y - min_bound.y);
							}
							else
							{
								min_s = Math.max(min_s, max_bound.x - min_bound.x);
							}
						}
					});

					size = size * Math.min(1, (min_s - theBuilding.perimeterDepth * 2) / 35);

					spaceLayout.group.children.forEach(function(surface)
					{
						if (surface.name.includes("floor"))
						{
							surface.geometry.computeBoundingBox();

							// Computers count fron zero - Architects don't
							let zoneNumber = surface.userData.zone;

							var centroid = new THREE.Vector3();
							centroid.addVectors( surface.geometry.boundingBox.min, surface.geometry.boundingBox.max );
							centroid.multiplyScalar(0.5);

							/// TODO #### Number 8 ### below is a bit of a hack to have the text positioned correctly within each surface
							/// please work out a better way to position the text and also lock the camera ortho camera to the extents of the geometry when the user toogles
							/// onToogleSpaceLayout also as per TODO  when the user changes the orientation inpOrientation the axis must rotate here but not in geometry or envelope!

							var max_bound 	= surface.geometry.boundingBox.max;
							var min_bound 	= surface.geometry.boundingBox.min;
							var angle 		= 0;
							var mgn_x 		= size / 2;
							var mgn_y		= size / 2;
							var prefix 		= "Zone ";
							var floor_2nd 	= scene.getObjectByName("floor-2-storey-0");

							if(max_bound.x - min_bound.x < max_bound.y - min_bound.y - 10)
							{
								angle = Math.PI / 2;
								mgn_y = 0;
							}
							else
							{
								mgn_x = 0;
							}

							if (theBuilding.shape === buildingShapes.Lshape)
							{
								if(zoneNumber == 0)
									zoneNumber = 7;

								// With the L-shape the zone label for the interior zone must be moveed
								if (surface.userData.floorNum === 0)
								{
									// The interior floor is always number 0
									draw2Dtext(prefix + zoneNumber,size,centroid.x-(centroid.x*0.6),centroid.y-(centroid.y*0.6),qLine.height,spaceLayout.group);
								}
								else
								{
									draw2Dtext(prefix + zoneNumber,size,centroid.x + mgn_x,centroid.y - mgn_y,qLine.height,spaceLayout.group, angle);
								}

							}
							else if (theBuilding.shape === buildingShapes.Tshape)
							{
								if(zoneNumber == 0)
									zoneNumber = 9;

								if (surface.userData.floorNum === 0)
								{
									floor_2nd.geometry.computeBoundingBox();
									mgn_y = (floor_2nd.geometry.boundingBox.max.y - floor_2nd.geometry.boundingBox.min.y) / 2;

									draw2Dtext(prefix + zoneNumber,size,centroid.x + mgn_x, mgn_y,qLine.height,spaceLayout.group, angle);
								}
								else
								{
									// H-shape has lots of zones ensure extra scalling down of zones to make sure that tehy fit
									draw2Dtext(prefix + zoneNumber,size,centroid.x + mgn_x,centroid.y - mgn_y,qLine.height,spaceLayout.group, angle);
								}
							}
							else if (theBuilding.shape === buildingShapes.Hshape)
							{
								if(zoneNumber == 0)
									zoneNumber = 13;

								// H-shape has lots of zones ensure extra scalling down of zones to make sure that tehy fit
								draw2Dtext(prefix + zoneNumber,size,centroid.x + mgn_x,centroid.y - mgn_y,qLine.height,spaceLayout.group, angle);
							}
							else
							{
								if(zoneNumber == 0)
									zoneNumber = 5;

								draw2Dtext(prefix + zoneNumber,size,centroid.x + mgn_x,centroid.y - mgn_y,qLine.height,spaceLayout.group, angle);
							}
						}
					});
				}

			});

		};

		createSpaceLayoutInScene();

		scene.add(spaceLayout.group);

		function switchToSpaceLayout()
		{
			adjacentBuildingsGeometry.group.visible = false;
			qLine.group.visible = false;
		}
	}

	function onShapeChangeUpdateLayout(){

		// inpFloorStart.max = theBuilding.storeys;
		// inpFloorEnd.max = theBuilding.storeys;
		//
		//
		// const options = addSpaceTypeOptions();
		// const zonesInShape = zonesPerShapes[ selShape.selectedIndex ];
		// let txt = '';
		//
		// for ( let i = 0; i < zonesInShape; i++ ) {
		//
		// 	txt += '<p>Zone: ' + ( i + 1 ) + ' <select id=inpZone' + i + ' onchange=updateZones(); >' + options + '</select></p>';
		//
		// }
		//
		// divZones.innerHTML = txt;
		//
		// theBuilding.floorZones = [];
		//
		// for ( let i = 0; i < theBuilding.storeys; i++ ) {
		//
		// 	const zones = [];
		//
		// 	for ( let j = 0; j < zonesInShape[ selShape.selectedIndex ]; j++ ) {
		//
		// 		zone = document.getElementById( 'inpZone' + j );
		// 		zones.push( zone.value );
		//
		// 	}
		//
		// 	theBuilding.floorZones.push( zones );
		//
		// }
		//
		// //console.log( 'theBuilding', theBuilding );
		// updateZones();

	}

	function updateTypes() {

		const zonesInShape = zonesPerShapes[ selShape.selectedIndex ];

		for ( var i = 0; i < zonesInShape; i++ ) {

//			zone = document.getElementById( 'inpZone' + i );
//			zone.selectedIndex = 0;

		}

	}

	function addSpaceTypeOptions() {

		const optionTypes = [
			'Office-Open Office',
			'Office-Private Office',
			'Office-Storage',
			'Office-Conference',
			'Hospital-Lab',
			'Hospital-Private Office',
			'Hospital-Open Office',
			'Hospital-Storage',
			'Hospital-Conference',
			'Retail-Retail',
			'Retail-Storage'
		];

		let options = '';

		for ( let option of optionTypes ) {

			options += '<option>' + option + '</option>';

		}

		return options;

	}

	function updateZones() {

		const zonesInShape = zonesPerShapes[ selShape.selectedIndex ];
		const zones = zonesInShape * theBuilding.storeys;

		for ( let i = inpFloorStart.value - 1; i <= inpFloorEnd.value - 1; i++ ) {

			const floor = theBuilding.floorZones[ i ];

			for ( let j = 0; j < zonesInShape; j++ ) {

				const zone = document.getElementById( 'inpZone' + j );
				floor[ j ] = zone.value;

			}

		}

//console.log( 'theBuilding.floorZones', theBuilding.floorZones );

		const types = [];
		const counts = [];

		for ( let i = 0; i < theBuilding.storeys; i++ ) {

			const floor = theBuilding.floorZones[ i ];

			for ( let j = 0; j < zonesInShape; j++ ) {

				const zone = floor[ j ];

				if ( !types.includes( zone ) ) {

					types.push( zone );
					counts.push( 0 );

				};

				counts[ types.indexOf( zone ) ] ++;

			}

		}

		//console.log( 'types', types );
		//console.log( 'counts', counts );

		let txt = '';

		for ( var i = 0; i < types.length; i++ ) {

			txt += '<tr><td>' + types[ i ] + '</td><td>' + ( 100 * counts[ i ] / zones ).toFixed() + '%</td></tr>';

		}

		tabUsage.innerHTML = txt;

	}
