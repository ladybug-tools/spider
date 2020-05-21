// copyright 2020 Theo Armour. MIT license.
/* global GFO, JTVdivJsonTreeView, JTVdivJsonTree */
// jshint esversion: 6
// jshint loopfunc: true



const JTV = {};


JTV.target = JTVdivJsonTreeView;
JTV.root = "model";
JTV.json = undefined;



JTV.schemas = [
	"Plane", "Face3D", "Ground", "Outdoors", "Adiabatic", "Surface", "ShadeEnergyPropertiesAbridged", "ShadePropertiesAbridged", "Shade", "ApertureEnergyPropertiesAbridged", "AperturePropertiesAbridged", "Aperture", "DoorEnergyPropertiesAbridged", "DoorPropertiesAbridged", "Door", "FaceEnergyPropertiesAbridged", "FacePropertiesAbridged", "Face", "PeopleAbridged", "LightingAbridged", "ElectricEquipmentAbridged", "GasEquipmentAbridged", "InfiltrationAbridged", "VentilationAbridged", "SetpointAbridged", "RoomEnergyPropertiesAbridged", "RoomPropertiesAbridged", "Room", "WallSetAbridged", "FloorSetAbridged", "RoofCeilingSetAbridged", "ApertureSetAbridged", "DoorSetAbridged", "ConstructionSetAbridged", "OpaqueConstructionAbridged", "WindowConstructionAbridged", "ShadeConstruction", "EnergyMaterial", "EnergyMaterialNoMass", "EnergyWindowMaterialGas", "EnergyWindowMaterialGasCustom", "EnergyWindowMaterialGasMixture", "EnergyWindowMaterialSimpleGlazSys", "EnergyWindowMaterialBlind", "EnergyWindowMaterialGlazing", "EnergyWindowMaterialShade", "IdealAirSystemAbridged", "ProgramTypeAbridged", "ScheduleDay", "ScheduleRuleAbridged", "ScheduleRulesetAbridged", "ScheduleFixedIntervalAbridged", "ScheduleTypeLimit", "ModelEnergyProperties", "ModelProperties", "Model"
];


JTV.init = function () {

	window.addEventListener( "onloadJson", JTV.onLoad, false );

	JTV.target.innerHTML = JTV.getMenu();

};



JTV.onLoad = function ( event ) {

	//console.log( 'JTV event', event );

	//JTV.json = JTV.json || GFO.json;

	JTV.json = JSON.parse( FO.data );

	console.log( 'type', JTV.json.type );

	if ( JTV.json.type === "Model" || JTV.json.rooms ) {

		JTVdivJsonTree.innerHTML = JTV.parseJson( JTV.root, JTV.json, 0 );

		const details = JTVdivJsonTree.querySelectorAll( "details" );

		details[ 0 ].open = true;

		PJH.processJson();

		return;

	}


	if ( JTV.json.type === "Building" ) {

		console.log( 'json', JTV.json );

		JTVdivJsonTree.innerHTML = JTV.parseJson( "Building", JTV.json, 0 );

		const details = JTVdivJsonTree.querySelectorAll( "details" );

		details[ 0 ].open = true;

		PJD.processJson();

	}

};



JTV.getMenu = function () {

	const htm = `

	<details open >

		<summary>
			JSON tree view

			<span class="couponcode" >??<span class="coupontooltip" >

				<p>JSON rendered to a tree view using the Honeybee JSON Tree Viewer script</p>

				<p>Items with yellow backgrounds are links to the <a href="https://ladybug-tools.github.io/honeybee-schema/model.html" target="_blank">Honeybee Model Schema</a></p>
		</summary>

		<div id="JTVdivJsonTree"></div>

	</details>

`;

	return htm;

};



JTV.parseJson = function ( key = "", item = {}, index = 0 ) { //console.log( '', key, item, index );
	const type = typeof item;

	if ( [ "string", "number", "boolean", "null", "bigint" ].includes( type ) || !item ) {

		return JTV.getString( key, item, index );

	} else if ( type === 'object' ) {

		return Array.isArray( item ) ? JTV.getArray( key, item, index ) : JTV.getObject( key, item, index );

	}

};




JTV.getString = function ( key, item, index ) { //console.log( 'string', key, item, index  );

	// https://stackoverflow.com/questions/8299742/is-there-a-way-to-convert-html-into-normal-text-without-actually-write-it-to-a-s
	//if ( typeof item === "string" ) { item = item.replace( /<[^>]*>/g, '' ); }
	//if ( typeof item === "number" ) { item = item.toLocaleString() };

	const htm = JTV.schemas.includes( item ) ?

		`<div>${ key }: <a href="https://ladybug-tools.github.io/honeybee-schema/model.html#tag/${ item.toLowerCase() }_model" style=background-color:yellow;color:green;cursor:help; target="_blank">${ item }</a></div>`
		:
		`<div>${ key }: <span style=color:green >${ item }<span></div>`;


	return htm;

};



JTV.getArray = function ( key, array, index ) { //console.log( 'Array', key, array );

	const htm = array.map( ( item, index ) => JTV.parseJson( key, item, index ) ).join( "" );

	return `<details style="margin: 1ch 0 1ch 1ch;" >
		<summary>${ key } [ ${ array.length } ]</summary>${ htm }
	</details>`;

};



JTV.getObject = function ( key, item, index ) {

	//if ( !item ) { console.log( 'error:', key, item, index ); return; }

	const keys = Object.keys( item );
	const htm = keys.map( key => JTV.parseJson( key, item[ key ] ) ).join( "" );

	return `<details style="margin: 1ch 0 1ch 1ch;" >
		<summary>${ key } ${ index }: { ${ keys.length } }</summary>${ htm }
	</details>`;

};



JTV.init();