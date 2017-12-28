/* Copyright 2017 Ladybug Tools authors. MIT License */

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
		theBuilding.perimeterDepth = 5;

		inpArea.value = theBuilding.area;

		inpFloors.min = 1;
		inpFloors.max = 20;
		inpFloors.value = theBuilding.storeys;

		inpHeight.min = 8;
		inpHeight.max = 20;
		inpHeight.value = theBuilding.storeyHeight;

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

		// Add the default building
		implementUserChange(userChange.buildingShape,stringOfBuildingShapeToBuildingShapeEnum(selShape.value))

		//console.log(qLine.group)

	}
