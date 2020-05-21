// copyright 2020 Theo Armour. MIT license.
// See pushme-pullyou/templates-01/modules/template
// 2020-02-20
/* divContent */
// jshint esversion: 6
// jshint loopfunc: true


const THRG = {};

THRG.url = "https://api.github.com/repos/mrdoob/three.js/git/trees/master?recursive=1";
THRG.prefix = "https://rawcdn.githack.com/mrdoob/three.js/master/";



THRG.init = function () {

	TSGdivThreeSceneGround.innerHTML = THRG.getMenu();

	window.addEventListener( "onloadthree", THRG.onLoad, false );

};



THRG.onLoad = function ( event ) {

	//console.log( 'event tsg', event, THR.scene );

	THRG.toggleAxesHelper();

	THRG.toggleGroundHelper();

};



THRG.getMenu = function () {

	const htm = `
<details ontoggle=THRG.getFilesPnGThree();>

	<summary>
		Scene axes and ground

		<span class="couponcode">??? <span class="coupontooltip">
		Update the appearance of the ground mesh in the scene.
		</span></span>

	</summary>

	<p  title="XYZ = RGB" >
		<label>
			<input type=checkbox onchange=THRG.toggleAxesHelper(THR.radius,this.checked) checked> axes helper
		</label>
	</p>

	<p title="">

		<label>
			<input type=checkbox onchange=THRG.toggleGroundHelper(); checked> ground
		</label>
	</p>

	<p>
		<label>
			<input type="color" value="#ff00ff" id="TSGinpColorGround"
				oninput="THR.groundHelper.material.color=( new THREE.Color(this.value));" >
			Select ground color
		</label>
	</p>

	<p>
		<select id=TSGselPng onchange=THRG.loadPng(this.value) size=20 style=width:100%;></select>
	</p>

	<p>
		Opacity <output id=outGroundOpacity >0.95</output>
		<input type=range value=95 oninput=outGroundOpacity.value=THR.groundHelper.material.opacity=+this.value/100; >
	</p>

</details>`;

	return htm;

};



THRG.toggleAxesHelper = function ( scale = THR.radius, visible = true ) {

	//console.log( '', visible );

	axesHelper = THR.axesHelper;

	if ( !axesHelper ) {

		axesHelper = new THREE.AxesHelper( 100 );
		THR.scene.add( axesHelper );

	} else {

		axesHelper.visible = visible;

	}

	axesHelper.scale.set( scale, scale, scale );
	axesHelper.name = "axesHelper";
	axesHelper.position.copy( THR.center );
	THR.axesHelper = axesHelper;

};



THRG.toggleGroundHelper = function ( position = THR.scene.position.clone(), elevation = -50.1 ) {

	if ( !THR.groundHelper ) {

		//elevation = GBX.boundingBox.box.min.z - 0.001 * THRT.radius;
		//elevation = 0;

		const geometry = new THREE.PlaneGeometry( 20 * THR.radius, 20 * THR.radius );
		let material;

		if ( THR.scene.children.some( child => child.type === "DirectionalLight" ) ) {

			material = new THREE.MeshPhongMaterial( { color: 0x888888, opacity: 0.95, side: 2, transparent: true } );

		} else {

			material = new THREE.MeshNormalMaterial( { opacity: 0.95, side: 2, transparent: true } );

		}

		THR.groundHelper = new THREE.Mesh( geometry, material );
		THR.groundHelper.receiveShadow = true;
		THR.groundHelper.position.set( position.x, position.y, parseFloat( elevation ) );
		THR.groundHelper.name = "groundHelper";

		THR.scene.add( THR.groundHelper );

		return;

	}

	THR.groundHelper.visible = !THR.groundHelper.visible;

};



THRG.getFilesPnGThree = function () {

	fetch( THRG.url )
		.then( response => response.json() )
		.then( json => {

			THRG.pngData = json.tree.filter( item => item.path.includes( "textures" ) &&
				( item.path.endsWith( ".png" ) || item.path.endsWith( ".jpg" ) ) ).map( item => item.path );

			TSGselPng.innerHTML = THRG.getOptions();

		} );

};



THRG.getOptions = function () {

	const options = THRG.pngData.map( ( item, index ) => {

		return `<option value=${ index }>${ item.split( "/" ).pop() }</option>`;

	} );

	return options;

};



THRG.loadPng = function ( index ) {

	item = THRG.pngData[ index ];

	url = THRG.prefix + item;

	loader = new THREE.TextureLoader();


	loader.load( url, callback );

	function callback ( texture ) {

		THR.groundHelper.material = new THREE.MeshPhongMaterial( { map: texture, side: 2, transparent: true } );
		texture.needsUpdate = true;
		THR.groundHelper.material.needsUpdate = true;

	}

};


THRG.init();