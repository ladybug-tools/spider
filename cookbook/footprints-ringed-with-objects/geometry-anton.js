/* Copyright 2017 Ladybug Tools authors. MIT License */

// split into multiple files
// needs clean up

	var v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };
	var v2 = function( x, y ){ return new THREE.Vector2( x, y ); };
	var pi = Math.PI;
	const d2r = pi / 180, r2d = 180 /pi;

	var buildingArea,numFloors;

	var length,width;

	var widthMin,widthMax;

	var lengthMin,lengthMax;

	var thickness;

	var calculatedFloorArea;

	let qLine = {}

	const buildingShapes =
{
	"Lshape":0,
	"Hshape":1,
	"Tshape":2,
	"Boxshape":3
};

const userChange =
{
	"buildingArea":0,
	"numFloors":1,
	"lengthChange":2,
	"widthChange":3,
	"buildingShape":4,
	"perimeterDepth":5,
	"openings":6,
	"irrevelent":7
};

	/// Helper functions

	function stringOfBuildingShapeToBuildingShapeEnum(selectedShapeType){

		if (selectedShapeType === "L-Shape")
		{
			return buildingShapes.Lshape
		}
		else if (selectedShapeType === "H-Shape")
		{
			return buildingShapes.Hshape
		}
		else if (selectedShapeType === "T-Shape")
		{
			return buildingShapes.Tshape
		}
		else if (selectedShapeType === "Box-Shape")
		{
			return buildingShapes.Boxshape
		}
		else {
			throw new Error('Cannot convert string '+selectedShapeType+ ' to building shape enum!!')
		}
	}


	// End of Helper functions

	function changeBuildingShape(buildingShape = stringOfBuildingShapeToBuildingShapeEnum(selShape.value))
	{

		// Strangely in slider the values are stored as strings we need to make sure that they are parsed as numbers before used

		implementUserChange(userChange.buildingShape,buildingShape)

	}

	function changeNumFloors(buildingShape = stringOfBuildingShapeToBuildingShapeEnum(selShape.value))
	{
		implementUserChange(userChange.numFloors,buildingShape)
	}

	function changeBuildingArea(buildingShape = stringOfBuildingShapeToBuildingShapeEnum(selShape.value))
	{


		implementUserChange(userChange.buildingArea,buildingShape)
	}

	function changeLengthSlider(buildingShape = stringOfBuildingShapeToBuildingShapeEnum(selShape.value))
	{
		implementUserChange(userChange.lengthChange,buildingShape)
	}

	function changeWidthSlider(buildingShape = stringOfBuildingShapeToBuildingShapeEnum(selShape.value))
	{

		implementUserChange(userChange.widthChange,buildingShape)
	}

	function changeOpenings(buildingShape = stringOfBuildingShapeToBuildingShapeEnum(selShape.value))
	{
		implementUserChange(userChange.openings,buildingShape)
	}

	function implementUserChange(typeUserChange,buildingShape)
	{

		// Promise chaining taken from - https://javascript.info/promise-chaining
		new Promise(function(resolve,reject)
		{
		// First do all calculations
		doCalculations(resolve,reject,typeUserChange,buildingShape)
			})
		.then(function(values)
			{

				/// Update text on sliders
				// updateTextInput(values.length,"lengthSlider")
				// updateTextInput(values.width,'widthSlider')
				//Update stored values and slider values

				inpWidth.max = values.widthMax
				widthMax = values.widthMax

				inpWidth.min = values.widthMin
				widthMin = values.widthMin

				inpWidth.value = values.width
				width = values.width

				inpLength.max =  values.lengthMax
				lengthMax = values.lengthMax

				inpLength.min = values.lengthMin
				lengthMin  = values.lengthMin

				inpLength.value = values.length
				length = values.length

				return values
			})
			.then(function(values)
				{
					// Update the shape + display all the values
					updateShape(values)
				}
			)
		}


	function doCalculations(resolve,reject,typeUserChange,buildingShape)
	{ //// General method for doing calculations

		let factorChange

		let lengthLocal,widthLocal
		let localWidthMin,localWidthMax
		let localLengthMin,localLengthMax
		let newfloorArea
		let newNumOfFloors

		function calculateThicknessArea(buildingShape,floorArea,lengthLocal,widthLocal)
		{
			switch (buildingShape)
			{
				case buildingShapes.Lshape:

					a = (lengthLocal+widthLocal)/2

					b = Math.sqrt(Math.pow(a,2)-floorArea)

					thickness = a-b

					calculatedFloorArea = (widthLocal*thickness)+((lengthLocal-thickness)*thickness)

					break;

				case buildingShapes.Hshape:

					a = (lengthLocal+2*widthLocal)/4

					b = Math.sqrt(Math.pow(a,2)-floorArea/2)

					thickness = a-b

					/// the thickness of the middle part of the H-shape is equal to thickness
					calculatedFloorArea = (2*widthLocal*thickness)+(thickness*(lengthLocal-2*thickness))

					break;
				case buildingShapes.Tshape:

					a = (lengthLocal+widthLocal)/2

					b = Math.sqrt(Math.pow(a,2)-floorArea)

					thickness = a-b

					calculatedFloorArea = (thickness*lengthLocal)+(thickness*(widthLocal-thickness))

					break;

				case buildingShapes.Boxshape:

					lengthMax = Math.sqrt(floorArea*10);

					lengthMin = Math.sqrt(floorArea/10);

					/// Length min and max????

					widthMax = floorArea/lengthLocal

					widthMin = floorArea/parseFloat(lengthLocal);

					calculatedFloorArea = widthLocal*lengthLocal

					thickness = "NA"

					break;
				default:
					return reject('Building type enum does not exist!');
			}
		}

		function calculateMinMax(buildingShape,floorArea,lengthLocal,widthLocal)
		{
				switch (buildingShape)
				{
					case buildingShapes.Lshape:

						// create factor change on the length
						/// Length is x
						lengthMax = 2*Math.sqrt(floorArea*1.8);

						lengthMin = 2/3*Math.sqrt(floorArea*1.8);

						/// Width is y
						widthMax =  10*(floorArea/parseFloat(lengthLocal))-0.9*parseFloat(lengthLocal);

						widthMin = floorArea/parseFloat(lengthLocal);

						return [lengthMax,lengthMin,widthMax,widthMin]

						break;

					case buildingShapes.Hshape:

						lengthMax = 2*Math.sqrt(floorArea*(9/7));

						lengthMin = 2/3*Math.sqrt(floorArea*(9/7));

						widthMax =  5*(floorArea/parseFloat(lengthLocal))-0.4*parseFloat(lengthLocal);

						widthMin = floorArea/parseFloat(lengthLocal);

						return [lengthMax,lengthMin,widthMax,widthMin]

						break;
					case buildingShapes.Tshape:

						lengthMax = 2*Math.sqrt(floorArea*1.8);

						lengthMin = 2/3*Math.sqrt(floorArea*1.8);

						widthMax =  10*(floorArea/parseFloat(lengthLocal))-0.9*parseFloat(lengthLocal);

						widthMin = floorArea/parseFloat(lengthLocal);

						return [lengthMax,lengthMin,widthMax,widthMin]

						break;
					case buildingShapes.Boxshape:

						lengthMax = Math.sqrt(floorArea*10);

						lengthMin = Math.sqrt(floorArea/10);

						/// Length min and max????

						widthMax = Math.sqrt(floorArea*10);

						widthMin = Math.sqrt(floorArea/10);

						thickness = "NA"

						return [lengthMax,lengthMin,widthMax,widthMin]

						break;
					default:
						return reject('Building type enum does not exist!');
				}
			}

		switch (typeUserChange)
		{
			case userChange.openings:
				/// Changes like permieter depth, all envelope changes, orientation changes
				floorArea = buildingArea/numFloors

				lengthLocal = length

				widthLocal = width

				localLengthMax = lengthMax
				localLengthMin = lengthMin
				localWidthMax = widthMax
				localWidthMin = widthMin
				break;

			case userChange.buildingArea:

				// Calculate new floor area
				newbuildingArea = parseFloat(inpArea.value)

				factorChange = newbuildingArea/buildingArea

				lengthLocal = Math.sqrt(factorChange)*length

				widthLocal = Math.sqrt(factorChange)*width

				newFloorArea = newbuildingArea/numFloors

				minmax = calculateMinMax(buildingShape,newFloorArea,lengthLocal,widthLocal)

				calculateThicknessArea(buildingShape,newFloorArea,lengthLocal,widthLocal,thickness)

				localLengthMax = minmax[0]
				localLengthMin = minmax[1]
				localWidthMax = minmax[2]
				localWidthMin = minmax[3]

				// Update building area for future
				buildingArea = newbuildingArea

				break;
			case userChange.numFloors:

				newNumOfFloors = parseFloat(inpFloors.value)

				factorChange = numFloors/newNumOfFloors

				lengthLocal = Math.sqrt(factorChange)*length

				widthLocal = Math.sqrt(factorChange)*width

				newFloorArea = buildingArea/newNumOfFloors

				minmax = calculateMinMax(buildingShape,newFloorArea,lengthLocal,widthLocal)

				calculateThicknessArea(buildingShape,newFloorArea,lengthLocal,widthLocal,thickness)

				localLengthMax = minmax[0]
				localLengthMin = minmax[1]
				localWidthMax = minmax[2]
				localWidthMin = minmax[3]

				// Update building area for future
				numFloors = newNumOfFloors

				break;
			case userChange.lengthChange:

				lengthLocal = parseFloat(inpLength.value)

				factor = (width-widthMin)/(widthMax-widthMin)

				floorArea = buildingArea/numFloors
				//[lengthMax,lengthMin,widthMax,widthMin]
				minmax = calculateMinMax(buildingShape,floorArea,lengthLocal,widthLocal)

				localLengthMax = minmax[0]
				localLengthMin = minmax[1]
				localWidthMax = minmax[2]
				localWidthMin = minmax[3]

				if (buildingShape == buildingShapes.Boxshape)
				{
					widthLocal = floorArea/lengthLocal

					calculateThicknessArea(buildingShape,floorArea,lengthLocal,widthLocal,thickness)
				}
				else {
					widthLocal = factor*(localWidthMax-localWidthMin)+localWidthMin
				}

				// Must re-calculate thickness for length change

				calculateThicknessArea(buildingShape,floorArea,lengthLocal,widthLocal,thickness)

				break;

			case userChange.widthChange:

				floorArea = buildingArea/numFloors

				lengthLocal = length

				if (buildingShape == buildingShapes.Boxshape)
				{
					widthLocal = width
				}
				else {
					widthLocal = parseFloat(inpWidth.value)
				}

				localLengthMax = lengthMax
				localLengthMin = lengthMin
				localWidthMax = widthMax
				localWidthMin = widthMin

				calculateThicknessArea(buildingShape,floorArea,length,widthLocal)

				break;

			case userChange.buildingShape:

					floorArea = buildingArea/numFloors

					// Calculate Length and Width for each shape
					switch (buildingShape)
					{
						case buildingShapes.Lshape:

							lengthLocal = Math.sqrt(floorArea*1.8)

							widthLocal = Math.sqrt(floorArea*1.8)

							break;

						case buildingShapes.Hshape:

							lengthLocal = Math.sqrt(floorArea*(9/7))

							widthLocal = Math.sqrt(floorArea*(9/7))

							break;
						case buildingShapes.Tshape:

							lengthLocal = Math.sqrt(floorArea*1.8)

							widthLocal = Math.sqrt(floorArea*1.8)

							break;
						case buildingShapes.Boxshape:

							lengthLocal = Math.sqrt(floorArea)

							widthLocal = floorArea/lengthLocal

							break;
				default:
					return reject('Building type enum does not exist!');
					}

					minmax = calculateMinMax(buildingShape,floorArea,lengthLocal,widthLocal)

					calculateThicknessArea(buildingShape,floorArea,lengthLocal,widthLocal)

					localLengthMax = minmax[0]
					localLengthMin = minmax[1]
					localWidthMax = minmax[2]
					localWidthMin = minmax[3]

			case userChange.irrevelent:
				factorChange = 1
				break;

			default:
				return reject('Type of user change doesnt exist');
		}

		return resolve({length:lengthLocal,width:widthLocal,lengthMax:localLengthMax,lengthMin:localLengthMin,widthMax:localWidthMax,widthMin:localWidthMin})
	}


	function initGeometryInputFields(){

		// Initialize the building as an object
		theBuilding.area = 10000;
		theBuilding.length = 50;
		theBuilding.lengthInit = 0;;
		theBuilding.width = 100;
		theBuilding.thickness = 20;
		theBuilding.storeys = 1;
		theBuilding.storeyHeight = 10;
		theBuilding.orientation = 0;

		inpArea.value = theBuilding.area;

		inpFloors.min = 1;
		inpFloors.max = 20;
		inpFloors.value = theBuilding.storeys;

		inpHeight.min = 8;
		inpHeight.max = 20;
		inpHeight.value = theBuilding.storeyHeight;

		inpShapeCount.min = 1;
		inpShapeCount.max = 10;
		inpShapeCount.value = 3;

		selShape.innerHTML =
		'<option>Box-Shape</option>' +
		'<option>L-Shape</option>' +
		'<option>T-Shape</option>' +
		'<option>H-Shape</option>' +
		'';

		// Default is box shape
		selShape.selectedIndex = 0;

		selMassing.innerHTML =
			'<option>Generator 1</option>' +
			'<option>Generator 2</option>' +
			'<option>Generator 3</option>' +
		'';

		selMassing.selectedIndex = 0;

		inpPerimeterDepth.min = 10;
		inpPerimeterDepth.max = 20;
		inpPerimeterDepth.value = 5;

		inpOrientation.min = 0;
		inpOrientation.max = 350;
		inpOrientation.step = 10;
		inpOrientation.value = theBuilding.orientation;

		// Assign global variabless
		buildingArea = parseFloat(inpArea.value)
		numFloors = parseInt(inpFloors.value)

		implementUserChange(userChange.buildingShape,stringOfBuildingShapeToBuildingShapeEnum(selShape.value))

	}

	function updateShape(values) {

		// Update the sliders seen in the html document
		outLength.value = values.length
		outWidth.value = values.width
		outFloorArea.value = buildingArea/numFloors
		opacityOut.value = parseFloat(inpOpacity.value/100)

		// Display for debugging
		// divValidation.innerHTML =
		// 	'<h3>Results from geometry logic</h3>' +
		// 	'<font size="-5">'
		// 	'building Area: ' + inpArea.value + '<br>' +
		// 	'number of Floors: ' + inpFloors.value + '<br>' +
		// 	'floor Area: ' + parseFloat(inpArea.value)/parseFloat(inpFloors.value) + '<br>' +
		// 	'<b>calculated floor Area: ' + calculatedFloorArea + '</b><br>' +
		// 	'<br>' +
		// 	'<b>Length<br></b>' +
		// 	'length: ' + values.length + '<br>' +
		// 	'lengthMin: ' + values.lengthMin + '<br>' +
		// 	'lengthMax: ' + values.lengthMax + '<br>' +
		// 	//			'lengthRange(): ' + lengthRange + '<br>' +
		// 	'<br>' +
		// 	'<b>Width</b><br>' +
		// 	'width: ' + values.width + '<br>' +
		// 	'widthMin: ' + values.widthMin + '<br>' +
		// 	'widthMax: ' + values.widthMax + '<br>' +
		// 	'<b>thickness:'+thickness+'</b><br>' +
		// 	//			'widthRange(): ' + widthRange + '<br>' +
		// 	'<br>' + '</font>' +
		// '';
		// Display thickness
		divValidation.innerHTML =
		'<b>thickness:'+thickness+'</b><br>' +
		'';

		theBuilding.shape = selShape[ selShape.selectedIndex ].innerText;

		const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), side: 2 } );

		const pathFunctions = [ getPathBox, getPathL, getPathT , getPathH ];

		// Get the variable for the building
		qLine.height = parseInt(inpHeight.value)

		qLine.perimeterDepth = parseInt( inpPerimeterDepth.value, 10 );

		const rotation = - d2r * parseInt( inpOrientation.value, 10 );

		// set the number of floors to the building
		qLine.storeys = numFloors

		windowToWallRatio = theBuilding.wwr;
		numOfWindows = theBuilding.noWindows;

		windowRatio = theBuilding.windowRatio;

		// To use Theo's existing code - use these definitions
		qLine.items = numOfWindows
		qLine.wwr = theBuilding.wwr

		scene.remove(qLine.group);

		// An Array of vertices which is all the "Points for the shape"
		const pathFunction = pathFunctions[ selShape.selectedIndex ];
		// Assign the path function to the building object

		const vertices = pathFunction(values);

		qLine.group = new THREE.Group();
		qLine.group.userData.openings = [];
		// Add the polyGon to the scene
		geometry = new THREE.Geometry();
		geometry.vertices = vertices;
		materialLine = new THREE.LineBasicMaterial( { color: 'red',linewidth: 10 } );
		qLine.polygon = new THREE.Line( geometry, materialLine );

		verticesOffset = offsetPoints( qLine.group, vertices, -qLine.perimeterDepth, 0 );

		// In Theo's code - verticesOffset = offsetPoints( qLine.group, vertices, -qLine.perimeterDepth, 0 );
		// Building path should be vertices
		// verticesOffset = offsetPoints( theBuilding.group, vertices, -theBuilding.perimeterDepth, 0 );
		// Is this nesscary anymore?
		//
		// Create a mesh to hold all meshes, theBuilding.Mesh is what is actually added to the scene!!!

		for ( var i = 0; i < qLine.storeys; i++ ) {

			const storey = new THREE.Group();
			storey.userData.openings = [];
			storey.name = 'storey' + i;

			const shape = new THREE.Shape( verticesOffset );
			const geometryShape = new THREE.ShapeBufferGeometry( shape );
			const meshShape = new THREE.Mesh( geometryShape, material );

			meshShape.position.z = 0;

			storey.add( meshShape );

			shapesOffset = drawVerticalShapes( verticesOffset, storey );

			drawHorizontalShapes( vertices, verticesOffset, storey );
			drawVerticalBisectors( vertices, verticesOffset, storey );
			drawExteriorWalls( vertices, storey );
			storey.position.z = i * qLine.height;
			qLine.group.add( storey );
			//
		}

		qLine.group.rotation.z = rotation * Math.PI / 180;
		//drawText();
		scene.add( qLine.group );

		/// This is for SpaceLayout Tab
		onShapeChangeUpdateLayout();

	}

	function getPathBox(values) {

		const pathBox = [new THREE.Vector3(values.length, 0,0 ), new THREE.Vector3( 0, 0,0 ), new THREE.Vector3( 0, values.width,0 ), new THREE.Vector3( values.length, values.width,0 ), new THREE.Vector3( values.length, 0,0 )];

		return pathBox;

	}

	function getPathL(values) {

			const pathL = [new THREE.Vector3(values.length, 0,0 ), new THREE.Vector3( 0, 0,0 ), new THREE.Vector3( 0, values.width,0 ), new THREE.Vector3( thickness, values.width,0 ), new THREE.Vector3( thickness, thickness,0 ) , new THREE.Vector3( values.length, thickness,0 )
				, new THREE.Vector3( values.length, 0,0 )];

			return pathL;
	}

	function getPathT(values) {

		const pathT = [
			new THREE.Vector3( values.length, 0,0 ),
			new THREE.Vector3( 0, 0,0 ),
			new THREE.Vector3( 0, thickness,0 ),
			new THREE.Vector3( 0.5 * ( values.length - thickness ), thickness,0 ),
			new THREE.Vector3( 0.5 * ( values.length - thickness ), values.width,0 ),
			new THREE.Vector3( values.length - 0.5 * ( values.length - thickness ), values.width,0 ),
			new THREE.Vector3( values.length - 0.5 * ( values.length - thickness ), thickness,0 ),
			new THREE.Vector3( values.length, thickness,0 ),
			new THREE.Vector3( values.length, 0,0 )
		];

		return pathT;

	}

	function getPathH(values) {

		const pathH = [
			new THREE.Vector3( values.length - thickness, 0.5 * ( values.width - thickness ),0 ),
			new THREE.Vector3( thickness, 0.5 * ( values.width - thickness ),0 ),
			new THREE.Vector3( thickness, 0,0 ),
			new THREE.Vector3( 0, 0,0 ),
			new THREE.Vector3( 0, values.width,0 ),
			new THREE.Vector3( thickness, values.width,0 ),
			new THREE.Vector3( thickness, values.width - 0.5 * ( values.width - thickness ),0 ),
			new THREE.Vector3( values.length - thickness, values.width - 0.5 * ( values.width - thickness ),0 ),
			new THREE.Vector3( values.length - thickness, values.width,0 ),
			new THREE.Vector3( values.length, values.width,0 ),
			new THREE.Vector3( values.length, 0,0 ),
			new THREE.Vector3( values.length - thickness, 0,0 ),
			new THREE.Vector3( values.length - thickness, 0.5 * ( values.width - thickness ),0 )
		];

		return pathH;
	}

	function drawVerticalShapes( vertices, obj ) {

		const v2 = function( x, y ){ return new THREE.Vector2( x, y ); };
		const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), side: 2 } );

		for ( let i = 0; i < vertices.length - 1; i++ ) {

			const vertex = vertices[ i ];
			const vertexNext = i < vertices.length - 1 ? vertices[ i + 1 ] : vertices[ 0 ];
			const angleVector = vertexNext.clone().sub( vertex ).normalize();
			const angleRadians = Math.atan2( angleVector.y, angleVector.x );

			const length = vertex.distanceTo( vertexNext );

			const verticesShape = [ v2( 0, 0 ), v2( length, 0 ), v2( length, qLine.height ), v2( 0, qLine.height ) ];

			const shape = new THREE.Shape( verticesShape );
			const geometryShape = new THREE.ShapeBufferGeometry( shape );
			geometryShape.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI / 2 ) );

			const meshShape = new THREE.Mesh( geometryShape, material );
			meshShape.position.copy( vertex );
			meshShape.rotation.z = angleRadians;

			obj.add( meshShape );

		}

	}



	function drawExteriorWalls( vertices, obj ) {

		const v2 = function( x, y ){ return new THREE.Vector2( x, y ); };
		const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), side: 2 } );

		for ( let i = 0; i < vertices.length - 1; i++ ) {

			const vertex = vertices[ i ];
			const vertexNext = i < vertices.length - 1 ? vertices[ i + 1 ] : vertices[ 0 ];
			const angleVector = vertexNext.clone().sub( vertex ).normalize();
			const angleRadians = Math.atan2( angleVector.y, angleVector.x );
			var surfaceAngle = angleRadians*(180/ Math.PI );

			let windowToWallRatio;
			let numOfWindows;
			let windowRatio;

			// Convert from negative number to 0 to 360
				if (surfaceAngle < 0)
				{
					surfaceAngle = Math.abs(surfaceAngle)+180
				}

				if (theBuilding.wwr != null)
				{
					// Building level WWR
					windowToWallRatio = theBuilding.wwr;
					numOfWindows = theBuilding.noWindows;

					windowRatio = theBuilding.windowRatio;
				}
				else
				{

					// Facade level WWR
					if ((surfaceAngle <= 45 && surfaceAngle >= 0) || (surfaceAngle <= 359 && surfaceAngle >= 315))
					{
						// North
						windowToWallRatio = theBuilding.wwrN
						numOfWindows = theBuilding.noWindowsN
						windowRatio = theBuilding.noWindowsN

					}
					else if (surfaceAngle <= 135 && surfaceAngle > 45)
					{
						// East
						windowToWallRatio = theBuilding.wwrE
						numOfWindows = theBuilding.noWindowsE
						windowRatio = theBuilding.windowRatioE

					}
					else if (surfaceAngle <= 225 && surfaceAngle > 135)
					{
						// West
						windowToWallRatio = theBuilding.wwrW
						numOfWindows = theBuilding.noWindowsW
						windowRatio = theBuilding.windowRatioW

					}
					else if (surfaceAngle < 315 && surfaceAngle > 226)
					{
						// South
						windowToWallRatio = theBuilding.wwrS
						numOfWindows = theBuilding.noWindowsS
						windowRatio = theBuilding.windowRatioS

					}
					else {
						throw new Error('Invalid angle')
					}
				}

			const length = vertex.distanceTo( vertexNext );

			const wall = drawOpenings( length, obj,windowToWallRatio,numOfWindows,windowRatio );

			wall.name = 'wall' + i;
			wall.position.copy( vertex );
			wall.rotation.z = angleRadians;
			wall.userData.length = length;
			wall.userData.angle = angleRadians;

			obj.add( wall );

		}

		drawOverhangs( length, obj );
		drawFins( length, obj );

	}



	function drawText() {

	qLine.group.children[ 0 ].traverse( function ( child ) {

		if ( child instanceof THREE.Group ) {

			//console.log( '', child.userData.angle);

			const geometry = new THREE.BoxGeometry( 5, 5, 5 );
			geometry.translate( child.userData.length / 2, 8, 0 );

			angle = - child.userData.angle + qLine.orientation * Math.PI / 180;

			if ( angle > - Math.PI / 4 && angle < Math.PI / 4 ) {

				material = new THREE.MeshBasicMaterial( { map: north } );

			} else if ( angle > Math.PI / 4 && angle < 3 * Math.PI / 4 ) {

				material = new THREE.MeshBasicMaterial( { map: east } );

			} else if ( angle > - 3 * Math.PI / 4 && angle < Math.PI / 4 ) {

				material = new THREE.MeshBasicMaterial( { map: west } );

			} else {

				material = new THREE.MeshBasicMaterial( { map: south } );

			}


			const mesh = new THREE.Mesh( geometry, material );
			child.add( mesh );

		}

	} );

}


	function drawOpenings( length, obj,windowToWallRatio,numOfWindows,windowRatio ) {

			const lengthDelta = length / numOfWindows;
			const height = qLine.height;
			const wwr = windowToWallRatio;

			const len05 = lengthDelta * 0.5;
			const hgt05 = qLine.height * 0.5;

			const v = function ( x, y, z ){ return new THREE.Vector3( x, y, z ); };

			const wall = new THREE.Group();

			const geometryBoundary = new THREE.Geometry();
			geometryBoundary.vertices = [
				v( len05, hgt05, 0 ),
				v( -len05, hgt05, 0 ),
				v( -len05, -hgt05, 0 ),
				v( len05, -hgt05, 0 ),
				v( len05, hgt05, 0 )
			];


	for ( let i = 0; i < numOfWindows; i++ ) {
	/*
			const geometryLine = geometryBoundary.clone()
			geometryLine.translate( i * lengthDelta - length * 0.5 + len05, 0, 5 );
			const materialLine = new THREE.LineBasicMaterial( { color: 0x000000 } );
			const line = new THREE.Line( geometryLine, materialLine );
			scene.add( line );
	*/
		const shape = new THREE.Shape( geometryBoundary.vertices.slice( 0, -1 ) );

		const verticesOpening = geometryBoundary.clone().scale( wwr, wwr, wwr ).vertices.slice( 0, -1 );

		const hole = new THREE.Path();
		hole.setFromPoints( verticesOpening );
		shape.holes.push( hole );

		geometryShape = new THREE.ShapeBufferGeometry( shape );
		geometryShape.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI / 2 ) );

		const materialShape = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), side: 2 } );
		const meshWall = new THREE.Mesh( geometryShape, materialShape );

		meshWall.position.set ( i * lengthDelta + len05, 0, hgt05 );
		meshWall.userData.lengthDelta = lengthDelta;

		wall.add( meshWall );

		//scene.add(meshWall)

		obj.userData.openings.push( meshWall );

	}

	return wall;

}

	function intersectionTwoLines( line1, line2 ) {

		// Use Three.js Ray?
		// 2016-02-10
		// Thanks to http://jsfiddle.net/justin_c_rounds/Gd2S2/ && http://jsfiddle.net/user/justin_c_rounds/fiddles/

			const line1start = line1.start;
			const line1end = line1.end;
			const line2start = line2.start;
			const line2end = line2.end;

			const denominator =
				( line2end.y - line2start.y ) * ( line1end.x - line1start.x )
				- ( line2end.x - line2start.x ) * ( line1end.y - line1start.y );

			if ( denominator == 0 ) { return; }

			const a =
				( ( line2end.x - line2start.x ) * ( line1start.y - line2start.y )
				- ( line2end.y - line2start.y ) * ( line1start.x - line2start.x ) ) / denominator;

			const x = line1start.x + ( a * ( line1end.x - line1start.x ) );
			const y = line1start.y + ( a * ( line1end.y - line1start.y ) );

			return new THREE.Vector3( x, y, 0 );

		}

		function offsetPoints( obj, points, offsetX, offsetY  = 0 ) {

			// 2017-11-17

				const v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };

				let lines = [];

				for ( let i = 0; i < points.length - 1; i++ ) {

					let pt1 = points[ i ];
					let pt2 = points[ i + 1 ];

					const angleVector = pt2.clone().sub( pt1 );
					const angle = Math.atan2( angleVector.y, angleVector.x );

			// redo with THREE.Spherical?
			// https://stackoverflow.com/questions/11039841/how-to-draw-parallel-line-using-three-js
			// https://stackoverflow.com/questions/43229743/offset-mesh-in-three-js

					const offsetPt1 = v( pt1.x - offsetX * Math.cos( angle - Math.PI / 2 ), pt1.y + offsetX * Math.sin( angle + Math.PI / 2 ), 0 );
					const offsetPt2 = v( pt2.x - offsetX * Math.cos( angle - Math.PI / 2 ), pt2.y + offsetX * Math.sin( angle + Math.PI / 2 ), 0 );

					const line = new THREE.Line3( offsetPt1, offsetPt2 );
					lines.push( line );

				}

			// if first and last point close, deal with it

				if ( points[ 0 ].distanceTo( points[ points.length - 1 ] ) < 0.01 ) {

					pt1 = intersectionTwoLines( lines[ 0 ], lines [ lines.length - 1 ] );
					pt2 = pt1;

				} else {

					pt1 = lines[ 0 ].start;
					pt2 = lines[ lines.length - 1 ].end;

				}

				const pointsOffset = [ v( pt1.x, pt1.y, offsetY ) ];

				for ( let i = 0; i < lines.length - 1; i++ ) {

					const pt = intersectionTwoLines( lines[ i ], lines [ i + 1 ] );

					pointsOffset.push( v( pt.x, pt.y, offsetY ) );

				}

				pointsOffset.push( pt2 );

				return pointsOffset;

			}


	function drawVerticalBisectors( vertices1, vertices2, obj ) {

			const v2 = function( x, y ){ return new THREE.Vector2( x, y ); };
			const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), side: 2 } );

			for ( let i = 0; i < vertices1.length - 1; i++ ) {

				const vertex1 = vertices1[ i ];
				const vertex2 = vertices2[ i ];
				const angleVector = vertex2.clone().sub( vertex1 );
				const angleRadians = Math.atan2( angleVector.y, angleVector.x );

				const length = vertex1.distanceTo( vertex2 );

				const verticesShape = [ v2( 0, 0 ), v2( length, 0 ), v2( length, qLine.height ), v2( 0, qLine.height ) ];

				const shape = new THREE.Shape( verticesShape );
				const geometryShape = new THREE.ShapeBufferGeometry( shape );
				geometryShape.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI / 2 ) );

				const meshShape = new THREE.Mesh( geometryShape, material );
				meshShape.position.copy( vertex1 );
				meshShape.rotation.z = angleRadians;

				obj.add( meshShape );

			}

		}

		function drawHorizontalShapes( vertices1, vertices2, obj ) {

			const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), side: 2 } );

			for ( var i = 0; i < vertices1.length - 1 ; i++ ) {

				const verticesShape = [

					vertices1[ i ],
					vertices2[ i ],
					vertices2[ i + 1 ],
					vertices1[ i + 1 ]

				];

				const shape = new THREE.Shape( verticesShape );
				const geometryShape = new THREE.ShapeBufferGeometry( shape );

				const meshShape = new THREE.Mesh( geometryShape, material );

				obj.add( meshShape );

			}

		}


	function drawFins( length, obj ) {

			if ( qLine.fin < 0.5 ) { return; }

			const wwr = qLine.wwr;
			const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), side: 2 } );

			for ( let opening of obj.userData.openings ) {

				const lengthDelta = opening.userData.lengthDelta;
				const geometry = new THREE.PlaneGeometry( qLine.height * wwr, qLine.fin );
				geometry.rotateY( Math.PI / 2 );

				const mesh = new THREE.Mesh( geometry, material );
				mesh.position.set( lengthDelta * 0.5 * wwr, qLine.fin * 0.5, 0 );
				opening.add( mesh );

				const mesh2 = mesh.clone();
				mesh2.position.set( - lengthDelta * 0.5 * wwr, qLine.fin * 0.5, 0 );
				opening.add( mesh2 );

			}

		}


	function drawOverhangs( length, obj ) {

		if ( qLine.overhang < 0.5 ) { return; }

		const wwr = qLine.wwr;
		const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), side: 2 } );

		for ( let opening of obj.userData.openings ) {

			const lengthDelta = opening.userData.lengthDelta;
			const geometry = new THREE.PlaneGeometry( lengthDelta * wwr, qLine.overhang );
			const mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( 0, qLine.overhang * 0.5, qLine.height * wwr / 2 );
			opening.add( mesh );

		}

	}
