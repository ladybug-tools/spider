// copyright 2020 Theo Armour. MIT license.
// See pushme-pullyou/templates-01/modules/template
// 2020-02-10
/* divContent */
// jshint esversion: 6
// jshint loopfunc: true


const JTF = {};



JTF.init = function () {

	window.addEventListener( "onloadJson", JTF.onLoad, false );

	JTFdivJsonTreeFinder.innerHTML = JTF.getMenu();

};



JTF.getMenu = function () {

	const htm = `
<details open>

	<summary>

		JSON Tree finder

		<span class="couponcode">??<span class="coupontooltip">
			Search the JSON data for any term.
			<p>Searches are not case sensitive.
			<p>Click any button displayed to highlight the item in JSON Tree view.</span></span>

	</summary>

	<p><input id=JTFinpSearch oninput=JTF.findStuff(this.value); placeholder="Enter a search term" ></p>

	<!--
	<p><button onclick=JTF.findStuff(); >find stuff</button></p>
	-->

	<div id=JTFdivFinds ></div>

</details>`;

	return htm;

};


JTF.onLoad = function ( event) {

	//console.log( 'ev', event );

	JTFinpSearch.value = "";

	JTFdivFinds.innerHTML = "Buttons will appear here";

};


JTF.findStuff = function ( string ) {

	console.log( 'string', string );

	JTF.divs = Array.from( JTVdivJsonTree.querySelectorAll( "div" ) );

	const find = string.toLowerCase();

	JTF.finds = JTF.divs.filter( div => div.innerText.toLowerCase().includes( find ) );
	//console.log( 'finds', JTF.finds );

	const htm = JTF.finds.map( ( find, i ) => `<button onclick=JTF.showFind(${ i }) >${ find.innerText }</button>` ).join( "<p>" );

	JTFdivFinds.innerHTML = htm;

};



JTF.showFind = function ( index ) {

	JTH.toggleAll();

	JTF.divs.forEach( div => div.style.backgroundColor = "" )

	const find = JTF.finds[ index ];

	JTF.finds = JTF.divs.filter( div => div.innerText.toLowerCase().includes( find ) );

	find.style.backgroundColor = "lightgreen";

	JTF.openParentNode( find );

	find.scrollIntoView();

};



JTF.showFindString = function ( string ) {

	JTH.toggleAll();

	JTF.divs = Array.from( JTVdivJsonTree.querySelectorAll( "div" ) );

	JTF.divs.forEach( div => div.style.backgroundColor = "" );

	//console.log( 'string', string );

	const finds = JTF.divs.filter( div => div.innerText.slice( 6 ) === string );

	//console.log( 'finds', finds );
	//find.style.backgroundColor = "lightgreen";

	JTF.openParentNode( finds[ 0 ] );

	finds[ 0 ].scrollIntoView();

};


JTF.openParentNode = function ( child ) {

	if ( child.parentNode ) {

		child.parentNode.open = true;

		JTF.openParentNode( child.parentNode );

	}

};



JTF.init();