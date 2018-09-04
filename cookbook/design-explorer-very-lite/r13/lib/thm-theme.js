/* Copyright 2018 Ladybug Tools authors. MIT License */
// Objective: demonstrate that you can adapt the user experience of this app to comply with your specific needs - whatever they ma be
// needs work / identify colors by magic / roll your own theme

let THM = {};

THM.themeName = localStorage.getItem( 'themeName' ) || 'https://bootswatch.com/_vendor/bootstrap/dist/css/bootstrap.css';

THM.updateCss = function( link ) {

	THM.themeName = css.href = link;
	localStorage.setItem( 'themeName', link );
	THM.setTheme();

}



THM.setTheme = function( target ) {
	// set the colors for the buttons

	const themesBootswatch = [
		{ 'Default': 'background-color: white; color: #007bff' },
		{ "Cerulean": 'background-color: white; color: #2FA4E7;' },
		{ 'Cosmo': 'background-color: white; color: #2780E3;' },
		{ 'Cyborg': 'background-color: #060606; color: #2A9FD6; font-style: italic;' },
		{ 'Darkly': 'background-color: #222; color: #00bc8c; font-style: italic;' },
		{ 'Flatly': 'background-color: white; color: #18BC9C;' },
		{ 'Journal': 'background-color: white; color: #EB6864;' },
		{ 'Litera': 'background-color: white; color: #4582EC;' },
		{ 'Lumen': 'background-color: white; color: #158CBA;' },
		{ 'Lux': 'background-color: white; color: #1a1a1a;' },
		{ 'Materia': 'background-color: white; color: #2196F3;' },
		{ 'Minty': 'background-color: white; color: #78C2AD;' },
		{ 'Pulse': 'background-color: white; color: #593196;' },
		{ 'Sandstone': 'background-color: white; color: #93C54B;' },
		{ 'Simplex': 'background-color: white; color: #D9230F;' },
		{ 'Sketchy': 'background-color: white; color: #333;' },
		{ 'Slate': 'background-color: #272B30; color: #fff; font-style: italic;' },
		{ 'Solar': 'background-color: #002B36; color: #839496; font-style: italic;' },
		{ 'Spacelab': 'background-color: white; color: #3399F3;' },
		{ 'Superhero': 'background-color: #2B3E50; color: #DF691A; font-style: italic;' },
		{ 'United': 'background-color: white; color: #E95420;' },
		{ 'Yeti': 'background-color: white; color: #008cba;' },
	];


	const themesOthers = [

		{ link: "https://demos.creative-tim.com/material-kit/assets/css/material-kit.min.css", name: "Material Kit" },
		{ link: "https://www.gettemplate.com/demo/initio/assets/css/styles.css", name: 'Initio' },
		{ link: "https://blackrockdigital.github.io/startbootstrap-creative/css/creative.min.css", name: 'Creative' },
		{ link: "https://tympanus.net/Freebies/Cardio/css/cardio.css", name: 'Cardio' },
		{ link: "https://www.gettemplate.com/demo/magister/assets/css/magister.css", name: 'Magister' },
	];


	const txt1 = themesBootswatch.map( theme => {
		const name = Object.keys( theme )[ 0 ];
		link = name === 'Default' ?
			'https://bootswatch.com/_vendor/bootstrap/dist/css/bootstrap.css' :
			`https://stackpath.bootstrapcdn.com/bootswatch/4.1.1/${ name.toLowerCase() }/bootstrap.min.css`;
		bingo =  link === THM.themeName ? '*' : ''
		return `<button class=theme onclick=THM.updateCss("${ link }"); style="${ theme[name] }" >${ bingo }${ name }${ bingo }</button> `;

	});


	divBootswatch.innerHTML = '<p>Themes from <a href="https://bootswatch.com/" target=_blank>Bootswatch</a><br>' + txt1.join( '' );

	let txt = '<p>Themes from other sources</p>';

	for ( let theme of themesOthers ) {

		//name = object3D.keys( theme )[ 0 ];
		//console.log( 'name', name );
		//console.log( 'link', theme.link );
		txt += `<button class="theme btn btn-secondary" onclick=THM.updateCss("${ theme.link }"); style="${ theme.name }" >${ theme.name }</button> `;

		divCssOthers.innerHTML = txt + '<p><small>these buttons are work-in-progress WIP</small></p>';

	}

};

