// Copyright 2018 Ladybug Tools authors. MIT License

	init();

	function init() {

		if ( butTemplate.style.backgroundColor !== 'var( --but-bg-color )' ) {

			let txt = 'lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?';

			divMenuItems.innerHTML =

				'<details id = detTemplate open>' +

					'<summary>Template</summary>' +

					'<p style=width:300px; >' + txt + '<p>' +

				'</details>' +

				divMenuItems.innerHTML +

			'';

			butTemplate.style.backgroundColor = 'var( --but-bg-color )';

		} else {

			detTemplate.remove();

			butTemplate.style.backgroundColor = '';

		}

	}

