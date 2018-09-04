
/* Copyright 2018 Ladybug Tools authors. MIT License */

FLT = {};


////////// Text Filters

FLT.setTextFilters = function( target ) {

	target.innerHTML = '';

	const line = csv.lines[ 0 ];
	//console.log( 'line', line );

	let filters = csv.fields.filter( ( key, i ) => key.startsWith( 'in:' ) && isNaN( line[ i ] ) === true );
	//console.log( 'filters', filters );

	let indices = filters.map( item => csv.fields.indexOf( item ) );
	//console.log( 'indices', indices );

	if ( indices.length === 0 ) { return; }

	for ( let index of indices ) {

		const arr = csv.lines.map( fields => fields[ index ] );
		const uniques = [...new Set( arr )];
		//console.log( 'uniques', uniques );

		txt = `<p>text filter <b>${ csv.fields[ index ] }</b><br>`;

		for ( let filter of uniques ){

			// awkward break here to keep buttons close
			txt +=
			`
				<button class="btn btn-secondary btn-sm active"
					onclick=toggleTextFilter(this,${index},"${filter}"); title = "Hide or show this type"
				>&theta;</button><button class="btn btn-secondary btn-sm active"
				onclick=setTextFilter(this,${index}); title="Show only this type" >${ filter }</button>
				|
			`;

		}

		target.innerHTML += txt + `</p>`;

	}

	target.innerHTML +=
	`
		<p>

		<button class="btn btn-secondary btn-sm" onclick=setFilterAll(true); >Set all visible</button>

		<button class="btn btn-secondary btn-sm" onclick=setFilterAll(false); >Set all invisible</button>

		</p>

	<hr>`;

}



function setTextFilter( that, index ){

	that.classList.toggle( "active" );

	const filter = that.innerText.toLowerCase();

	object3D.traverse( function ( child ) {

		if ( child.material instanceof THREE.MeshPhongMaterial ) {

			if ( child.userData.data[ index ].toLowerCase() === filter ) {

				child.material.opacity = opacityVisible;

				child.children[ 0 ].material.opacity = opacityVisible; // edges

			} else {

				child.material.opacity = opacityVisibleFalse;

				child.children[ 0 ].material.opacity = opacityVisibleFalse; // edges

			}
		}

	} );

}



function toggleTextFilter( that, index, filter ) {

	that.classList.toggle( "active" );

	const visible = that.classList.contains( 'active' );

	const opacity = visible ? opacityVisible : opacityVisibleFalse;

	object3D.traverse( function ( child ) {

		if ( child.material instanceof THREE.MeshPhongMaterial
			&& child.userData.data[ index ] === filter ) {

			child.material.opacity = opacity;
			child.children[ 0 ].material.opacity = opacity; // edges

		}

	} );

}



////////// Numeric Filters

function setNumericFilters( target = divFiltersNumeric ) {

	const line = csv.lines[ 0 ];
	const filters = csv.fields.filter( ( key, i ) => key.startsWith( 'in:' ) && isNaN( line[ i ] ) === false );
	FLT.filters = [];

	target.innerHTML =
	`
	<small>
		'Set all visible' first then use filters.
		Repeat. Better interaction soon.
		Current slider values shows as tooltips.
	</small>
	`;


	for ( let filter of filters ){

		index = csv.fields.indexOf( filter );

		const arr = csv.lines.map( items => items[ index ] ).map( item => parseFloat( item ) );
		let max = Math.max( ...arr );
		let min = Math.min( ...arr );
		let step = ( max - min ) / 10;

		//console.log( 'mm', min, max );

		let scalar = max - min > 10 ? 1 : 10;
		scalar = max - min > 1 ? scalar : 100;

		min = scalar * min;
		max = scalar * max;
		step = scalar * step;

		const filterMin = 'filterMin' + index;
		const filterMax = 'filterMax' + index;

		target.innerHTML +=
		`
			<p><b>numeric filter ${ filter }</b><br>

			<div>${ min / scalar } <span style=width:10rem >
				<input type=range id=${ filterMin } min=${ min } max=${ max } step=${ step } value=${ min }
					oninput=FLT.setNumericFilterDisplay(this,${scalar}); title=${ min / scalar } ></span> ${ max / scalar }
			</div>

			<div>${ min / scalar  } <span style=width:10rem >
				<input type=range id=${ filterMax } min=${ min } max=${ max } step=${ step } value=${ max }
					oninput=FLT.setNumericFilterDisplay(this,${scalar}); title=${ max / scalar } ></span> ${ max / scalar }
			</p>
		`;

		FLT.filters.push( { filter, index, filterMin, filterMax, scalar })
	}

	console.log( 'FLT.filters', FLT.filters );
	target.innerHTML +=
	`
		<p>

		<button class="btn btn-secondary btn-sm" onclick=setFilterAll(true); >Set all visible</button>

		<button class="btn btn-secondary btn-sm" onclick=setFilterAll(false); >Set all invisible</button>

		</p>

		<hr>
	`;

}



FLT.setNumericFilterDisplay = function( that, scalar ) {

	//console.log( 'that', that );

	const index = that.id.slice( 9 ); // filterMin or Max
	//console.log( 'index', index );

	const value = parseFloat( that.value ) / scalar;
	//console.log( 'value', value );

	// catch max smaller than min

	const min = parseFloat( document.querySelector( '#filterMin' + index ).value ) / scalar;
	const max = parseFloat( document.querySelector( '#filterMax' + index ).value ) / scalar;

	that.title = value;

	//console.log( 'mm', min, max );

	for ( let child of object3D.children ) {

		cnt = 0;

		for ( filter of FLT.filters ) {

			data = parseFloat( child.userData.data[ filter.index ] );

			cnt += data >= parseFloat( document.querySelector( "#" + filter.filterMin ).value ) / filter.scalar
				&& data <= parseFloat( document.querySelector( "#" + filter.filterMax ).value ) / filter.scalar ? 1 : 0;

		}

		if ( cnt === FLT.filters.length ) {
//console.log( 'filter', filter );
			child.material.opacity = opacityVisible;

			child.children[ 0 ].material.opacity = opacityVisible;

		} else {

			//console.log( 'data', data, 'min', min, 'max', max );
			child.material.opacity = opacityVisibleFalse;
			child.children[ 0 ].material.opacity = opacityVisibleFalse;

		}


	}

}



//////////

function setFilterAll( boolean ) {

	const opacity = boolean ? opacityVisible : opacityVisibleFalse;

	for ( let child of object3D.children ) {

		child.material.opacity = opacity;
		child.children[ 0 ].material.opacity = opacity;

	}

	const buttons = divFiltersText.getElementsByClassName( "btn" );

	if ( boolean ) {

		for ( button of buttons ){ button.classList.add( 'active' ) };

	} else {

		for ( button of buttons ){ button.classList.remove( 'active' ) };

	}

	setNumericFilters();

}
