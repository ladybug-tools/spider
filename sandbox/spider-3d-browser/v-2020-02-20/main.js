// copyright 2020 Theo Armour. MIT license.
// See pushme-pullyou/templates-01/
// 2020-02-17
/* globals aSource, imgIcon, sTitle, sVersion, divContent, divDescription, expandButton, navMenu, THR */
// jshint esversion: 6
// jshint loopfunc: true


aSource.href = "https://github.com/pushme-pullyou/templates-01/tree/master/threejs-hamburger";
imgIcon.src = "assets/github-mark-32.png";

sTitle.innerHTML = document.title; // ? document.title : location.href.split( '/' ).pop().slice( 0, - 5 ).replace( /-/g, ' ' );
const version = document.head.querySelector( "[ name=version ]" );
sVersion.innerHTML = version ? version.content : "";
divDescription.innerHTML = document.head.querySelector( "[ name=description ]" ).content;

THR.init();
THR.animate();



init();


function init() {

	if ( window.innerWidth < 640 || window.innerHeight < 640 ) {

		toggleNavMenu();

	}

	//window.addEventListener( "onloadFile", onLoad, false );

	//location.hash = FOH.urlDefaultFile;

}

function toggleNavMenu () {

	expandButton.classList.toggle( 'collapsed' );
	navMenu.classList.toggle( 'collapsed' );
	divContent.classList.toggle( 'collapsed' );

}


function onLoad() {


};
