/* Copyright 2018 Ladybug Tools authors. MIT License */
/* globals THREE, CSV, FLT, SEL, THR, divFiltersText, divFiltersNumeric, divMenu, hamburger  */
// jshint esversion: 6

let FLT = {};

FLT.setVisibilityButtons =
`
	<p>

	<button class="btn btn-secondary btn-sm" onclick=FLT.setFilterAll(true); >Set all visible</button>

	<button class="btn btn-secondary btn-sm" onclick=FLT.setFilterAll(false); >Set all invisible</button>

	</p>

	<hr>
`;


////////// Text Filters

FLT.setTextFilters = function( target = divFiltersText ) {

	const line = CSV.lines[ 0 ];
	//console.log( 'line', line );

	const filters = CSV.fields.filter( ( key, i ) => key.startsWith( 'in:' ) && isNaN( line[ i ] ) === true );
	//console.log( 'filters', filters );

	const indices = filters.map( item => CSV.fields.indexOf( item ) );
	//console.log( 'indices', indices );

	if ( indices.length === 0 ) { return; }

	let panel = '';

	for ( let index of indices ) {

		const arr = CSV.lines.map( fields => fields[ index ] );
		const uniques = [...new Set( arr )];
		//console.log( 'uniques', uniques );

		let buttons = `<p>text filter <b>${ CSV.fields[ index ] }</b><br>`;

		for ( let filter of uniques ){

			// awkward break here to keep buttons close
			buttons +=
			`
				<button class="btn btn-secondary btn-sm active"
					onclick=FLT.toggleTextFilter(this,${index},"${filter}"); title = "Hide or show this type"
				>&theta;</button><button class="btn btn-secondary btn-sm active"
				onclick=FLT.setTextFilter(this,${index},"${filter}"); title="Show only this type" >${ filter }</button>
				|
			`;

		}

		panel +=  `${ buttons }</p>`;

	}

	target.innerHTML =
	`
		${ panel }
		${ FLT.setVisibilityButtons }

	<hr>`;

};



FLT.setTextFilter = function( that, index, filter ){

	that.classList.toggle( "active" );

	CSV.selected = [];

	for ( let child of CSV.meshes.children ) {

		if ( child.userData.data[ index ] === filter ) {

			child.material.opacity = SEL.opacityVisible;
			child.children[ 0 ].material.opacity = SEL.opacityVisible; // edges
			CSV.selected.push( child );

		} else {

			child.material.opacity = 0; // SEL.opacityVisibleFalse;
			child.children[ 0 ].material.opacity = SEL.opacityVisibleFalse; // edges

		}

	}

};



FLT.toggleTextFilter = function( that, index, filter ) {

	that.classList.toggle( "active" );

	const visible = that.classList.contains( 'active' );

	CSV.selected = [];

	for ( let child of CSV.meshes.children ) {

		if ( child.userData.data[ index ] === filter ) {

			child.material.opacity = visible ? SEL.opacityVisible : 0;
			child.children[ 0 ].material.opacity = visible ?  SEL.opacityVisible : SEL.opacityVisibleFalse; // edges

		}

		if ( child.material.opacity === SEL.opacityVisible ) { CSV.selected.push( child ); }

	}

};



////////// Numeric Filters

FLT.setNumericFilters = function( target = divFiltersNumeric ) {

	const line = CSV.lines[ 0 ];
	const filters = CSV.fields.filter( ( key, i ) => key.startsWith( 'in:' ) && isNaN( line[ i ] ) === false );
	FLT.filters = [];

	target.innerHTML =
	`
	<small>
		'Set all visible' first then use filters.
		Repeat. Better interaction soon.
		Current slider values shows as tooltips.
	</small>
	`;

	let html = "";

	for ( let filter of filters ){

		const index = CSV.fields.indexOf( filter );

		const arr = CSV.lines.map( items => items[ index ] ).map( item => parseFloat( item ) );
		let max = Math.max( ...arr );
		let min = Math.min( ...arr );
		let step = ( max - min ) / 10; // can we do better than this?

		//console.log( 'mm', min, max );

		let scalar = max - min > 10 ? 1 : 10;
		scalar = max - min > 1 ? scalar : 100;

		min = scalar * min;
		max = scalar * max;
		step = scalar * step;

		const filterMin = 'filterMin' + index;
		const filterMax = 'filterMax' + index;

		html +=
		`
			<p><b>numeric filter ${ filter }</b><br>

			<div>${ min / scalar } <span style=width:10rem >
				<input type=range id=${ filterMin } min=${ min } max=${ max } step=${ step } value=${ min }
					oninput=FLT.setNumericFilterDisplay(this,${ scalar }); title=${ min / scalar } ></span> ${ max / scalar }
			</div>

			<div>${ min / scalar  } <span style=width:10rem >
				<input type=range id=${ filterMax } min=${ min } max=${ max } step=${ step } value=${ max }
					oninput=FLT.setNumericFilterDisplay(this,${ scalar }); title=${ max / scalar } ></span> ${ max / scalar }
			</p>
		`;

		FLT.filters.push( { filter, index, filterMin, filterMax, scalar } );
	}

	target.innerHTML = html + FLT.setVisibilityButtons;

};



FLT.setNumericFilterDisplay = function( that, scalar ) {

	//console.log( 'that', that );

	//const index = that.id.slice( 9 ); // filterMin or Max
	//console.log( 'index', index );

	const value = parseFloat( that.value ) / scalar;
	//console.log( 'value', value );

	// catch max smaller than min

	//const min = parseFloat( document.querySelector( '#filterMin' + index ).value ) / scalar;
	//const max = parseFloat( document.querySelector( '#filterMax' + index ).value ) / scalar;
	//console.log( 'mm', min, max );

	that.title = value;

	CSV.selected = [];

	for ( let child of CSV.meshes.children ) {

		let cnt = 0;

		for ( let filter of FLT.filters ) {

			const data = parseFloat( child.userData.data[ filter.index ] );

			cnt += data >= parseFloat( document.querySelector( "#" + filter.filterMin ).value ) / filter.scalar && data <= parseFloat( document.querySelector( "#" + filter.filterMax ).value ) / filter.scalar ? 1 : 0;

		}

		if ( cnt === FLT.filters.length ) {

			child.material.opacity = SEL.opacityVisible;
			child.children[ 0 ].material.opacity = SEL.opacityVisible;

			CSV.selected.push( child );

		} else {

			//console.log( 'data', data, 'min', min, 'max', max );
			child.material.opacity = 0; //SEL.opacityVisibleFalse;
			child.children[ 0 ].material.opacity = SEL.opacityVisibleFalse;

		}

	}

};



//////////

FLT.setFilterAll = function( boolean ) {

	const opacity = boolean ? SEL.opacityVisible : SEL.opacityVisibleFalse;

	for ( let child of CSV.meshes.children ) {

		child.material.opacity = boolean ? SEL.opacityVisible : 0;
		child.children[ 0 ].material.opacity = opacity;

	}

	const buttons = divFiltersText.getElementsByClassName( "btn" ); // hits wrong buttons

	if ( boolean ) {

		for ( let button of buttons ){ button.classList.add( 'active' ); }

	} else {

		for ( let button of buttons ){ button.classList.remove( 'active' ); }

	}

	FLT.setNumericFilters();

};
