// Copyright 2018 Ladybug Tools authors. MIT License

	var HUD = {};



	 HUD.initHeadsUp = function() { // called from bottom of script

		if ( window.butMenuLoad ) { // we are in an iframe

			HUD.butMenuHUD = butMenuLoad;

			HUD.title = 'gv-HUD - gbXML Viewer HUD';;
			document.title = HUD.title;
			aDocumentTitle.innerHTML = HUD.title;
			HUD.butMenuHUD.innerHTML = HUD.title;

			divHeadsUp = icw.divHeadsUp;
			divHamburgerRight = icw.divHamburgerRight;
			HUDdivHeader = icw.HUDdivHeader;
			HUDdivItems = icw.HUDdixItems;
			HUDdivTellTales = icw.HUDdivTellTales;
			selType = icw.selType;
			HUDselSurface = icw.HUDselSurface;

			HUD.setMenuOptions();

		} else {

		}

	};



	HUD.setMenuOptions = function() {

		HUD.mouse = new THREE.Vector2();

		THR.renderer.domElement.addEventListener( 'click', HUD.onRendererMouseMoveHUD, false );

		THR.renderer.domElement.addEventListener( 'touchstart', HUD.onRendererTouchStartHUD, false );

		HUDdivShowHide.innerHTML = GBI.getPanelShowHide();

		HUDdivEditSurface.innerHTML = GBI.getPanelEditSurface();

		HUDdivTellTales.innerHTML = HUD.getPanelTellTale();

		COR.setButtonStyleClass( divHeadsUp );

		/////

		GBP.spacesJson = GBP.gbjson.Campus.Building.Space;

		let spacesOptions = '<option>none</option>';

		if ( Array.isArray( GBP.spacesJson ) ) {
		//if ( GBX.spacesJson ) {

			for ( let space of GBP.spacesJson ) {

				spacesOptions += '<option>' + space.id + '</option>';

			}

		} else {

			spacesOptions += '<option>' + GBP.spacesJson.id + '</option>';

		}

		GBP.spacesOptions = spacesOptions;
		//console.log( 'GBP.spaceOptions', GBP.spaceOptions);


		let surfacesOptions = '';

		for ( let surface of GBP.surfaceJson ) {

			surfacesOptions += '<option>' + surface.id + '</option>';

		}

		GBP.surfacesOptions = surfacesOptions;


		const cadIdOptions = [];

		for ( let surface of GBP.surfaceJson ) {

			cadIdOptions.push( '<option>' + surface.CADObjectId + '</option>' );

		}

		let surfaceTypeOptions = '';

		for ( let type of GBP.surfaceTypes ) {

			surfaceTypeOptions += '<option>' + type + '</option>';

		}

		GBP.surfaceTypeOptions = surfaceTypeOptions;


		GBP.surfacesCadObj = cadIdOptions.sort().join();
		//console.log( 'GBP.surfacesCadObj', GBP.surfacesCadObj);

		GBP.surfacesXml = GBP.gbxml.getElementsByTagName("Surface");

	}



	HUD.onRendererMouseMoveHUD = function( event ) {

		event.preventDefault();

		if ( event.buttons > 0 ) { return; }

		HUD.mouse.x = ( event.clientX / THR.renderer.domElement.clientWidth ) * 2 - 1;
		HUD.mouse.y = - ( event.clientY / THR.renderer.domElement.clientHeight ) * 2 + 1;

		const raycaster = new THREE.Raycaster();
		raycaster.setFromCamera( HUD.mouse, THR.camera );

		const intersects = raycaster.intersectObjects( GBP.surfaceMeshes.children );

		if ( intersects.length > 0 ) {

			if ( HUD.intersected != intersects[ 0 ].object ) {
				//console.log( 'HUD.intersected', HUD.intersected );

				if ( HUD.intersected && HUD.intersected.material.emissive ) { HUD.intersected.material.emissive.setHex( HUD.intersected.currentHex ); }
				if ( HUD.intersected ) { HUD.intersected.material.opacity = HUD.intersected.currentOpacity; }

				HUD.intersected = intersects[ 0 ].object;

				HUD.setHeadsUp( event );

				console.log( 'HUD.intersected', HUD.intersected );

				if ( HUD.intersected.material.emissive ) {

					HUD.intersected.currentHex = HUD.intersected.material.emissive.getHex();
					HUD.intersected.material.emissive.setHex( 0xff0000 );

				}

				HUD.intersected.currentOpacity = HUD.intersected.material.opacity;
				HUD.intersected.material.opacity = 1;

			}

		} else {

			if ( HUD.intersected && HUD.intersected.material.emissive ) { HUD.intersected.material.emissive.setHex( HUD.intersected.currentHex ); }
			if ( HUD.intersected ) { HUD.intersected.material.opacity = HUD.intersected.currentOpacity; }

			HUD.intersected = undefined;

		}

	}



	HUD.onRendererMouseDownHUD= function( event ) {

		divHeadsUp.style.display = 'none';

		THR.renderer.domElement.removeEventListener( 'click', HUD.onRendererMouseMoveHUD, false );

	}



	HUD.onRendererTouchStartHUD = function( event ) {

		event.preventDefault();

		event.clientX = event.touches[0].clientX;
		event.clientY = event.touches[0].clientY;

		HUD.onRendererMouseMoveHUD( event );

	}



	HUD.getPanelTellTale = function () {

		const tellTale =
		`<details>
			<summary>For debugging surface appearance</summary>
			<p>
				<button onclick=HUD.displayTelltalesVertex(); title="Three.js data" >vertex telltales</button>
				<button onclick=HUD.displayTelltalesPolyloop(); title="gbXML data" >polyloop telltales</button>
				<button onclick=HUD.removeTelltales() >remove telltales</button>
			<p>
		</details>`;

		return tellTale;

	}



	HUD.setHeadsUp = function( event ) {

		let space1;
		let space2;

		// needed??
		if ( HUD.intersected === undefined ) {

			if ( event && event.type === 'touchstart' ) {

				divHeadsUp.style.display = 'none';

			}

			document.body.style.cursor = 'auto';

			return;

		}

		//THR.controls.keys = false;
		divHeadsUp.style.display = 'block';
		divHamburgerRight.style.display = 'block';

		const data = HUD.intersected.userData.data;
		HUD.data = data;
		//console.log( 'data', data );



		const b = '<br>';
		const height = parseFloat( data.RectangularGeometry.Height );
		const width = parseFloat( data.RectangularGeometry.Width );
		const surfaceArea = height * width;

		const headerTxt = setHeaderAndSurfaceText();

		/*
		let adjacentsTxt = data.AdjacentSpaceId ? data.AdjacentSpaceId : '<hr>no adjacent spaces<hr>';

		//		if ( adjacentsTxt !== '<hr>no adjacency<hr>' ) {
		if ( data.AdjacentSpaceId ) {

			if ( Array.isArray( adjacentsTxt ) === true ) {

				//console.log( 'adjacentsTxt', adjacentsTxt );

				space1 = GBI.getSpaceId( adjacentsTxt[ 0 ].spaceIdRef );
				space2 = GBI.getSpaceId( adjacentsTxt[ 1 ].spaceIdRef );
				//console.log( 'space1', space1 );

				if ( space1 && space2 ) {
					// make into function
					adjacentsTxt =
						'<hr>' +
						'<details open >' +
							'<summary><b>adjacent space 1</b></summary>' +
							'<div class=flex-container2 >' +
								'<div class=flex-div1 >' +
									'<input oninput=HUD.updateSelect(this,selSpace1); size=6 placeholder="space 1 id" ><br>' +
									'<select id=selSpace1 onclick=GBI.showSpace(this.value); onchange=GBI.showSpace(this.value); size=5 >' + GBP.spacesOptions + '</select><br>' +
									'<button onclick=HUD.updateSpace(1); >update</button>' + b +
								'</div>' +
								'<div class=flex-div2 >' +
									'id <button id=butSpace1 onclick=GBI.showSpace(this.innerText);selSpace1.value=this.innerText; >' + space1.id + '</button> ' + b +
									( space1.Name ? 'name <i>' + space1.Name + '</i>' + b : '' ) +
									//( space1.Description ? 'description <i>' + encodeURI( space1.Description ) + '</i>' +b : '' ) +
									( space1.Area ? 'area <i>' + Number( space1.Area ).toFixed( 1 ) : '' ) +
									( space1.Volume ? '</i> volume </i>' + Number( space1.Volume ).toFixed( 1 ) + '</i>' + b : '' ) +
									( space1.conditionType ? 'condition type <i>' + space1.conditionType + '</i>' + b : '' ) +
									//( space1.zoneIdRef ? 'zone id ref <i>' + space1.zoneIdRef + '</i>' + b : '' ) +
									'storey <button onclick=GBI.showStorey(this.innerText); >' + space1.buildingStoreyIdRef + '</button>' + b +
									( space1.CADObjectId ? 'cad object id <i>' + space1.CADObjectId + '</i>' + b : '' ) +
								'</div>' +
							'</div>' +
						'</details>' +
						'<hr>' +
						'<details open >' +
							'<summary><b>adjacent space 2</b></summary>' +
							'<div class=flex-container2 >' +
								'<div class=flex-div1 >' +
									'<input oninput=HUD.updateSelect(this,selSpace2); size=6  placeholder="space 2 id" ><br>' +
									'<select id=selSpace2 onclick=GBI.showSpace(this.value); onchange=GBI.showSpace(this.value); size=5 >' + GBP.spacesOptions + '</select><br>' +
									'<button onclick=HUD.updateSpace(2); >update</button>' + b +
									'</div>' +
								'<div class=flex-div2 >' +
									'id <button id=butSpace2 onclick=GBI.showSpace(this.innerText);selSpace2.value=this.innerText; >' + space2.id + '</button> ' + b +
									( space2.Name ? 'name <i>' + space2.Name + '</i>' + b : '' ) +
									//( space2.Description ? 'description <i>' + encodeURI( space2.Description ) + '</i>' + b : '' ) +
									( space2.Area ? 'area <i>' + Number( space2.Area ).toFixed( 1 ) : '' ) + '</i>' +
									( space2.Volume ? ' volume <i>' + Number( space2.Volume ).toFixed( 1 ) + '</i>' + b : '' ) +
									( space2.conditionType ? 'condition type <i>' + space2.conditionType + '</i>' + b : '' ) +
									//( space2.zoneIdRef ? 'zone id ref <i>' + space2.zoneIdRef + '</i>' + b : '' ) +
									'storey <button onclick=GBI.showStorey(this.innerText); >' + space2.buildingStoreyIdRef + '</button>' + b +
									( space2.CADObjectId ? 'cad object id <i>' + space2.CADObjectId + '</i>' + b : '' ) +
								'</div>' +
							'</div>' +
							'<hr>' +
						'</details>' +
						'';

				} else {

					adjacentsTxt = 'adjacencies: ' + data.AdjacentSpaceId[ 0 ] + ' ' + data.AdjacentSpaceId[ 1 ];

				}

			} else {

				//console.log( 'data.AdjacentSpaceId.spaceIdRef', data.AdjacentSpaceId.spaceIdRef );
				//console.log( 'adjacentsTxt', adjacentsTxt );
				//console.log( 'hud AdjacentSpaceId', data.AdjacentSpaceId );

				space1 = GBI.getSpaceId( data.AdjacentSpaceId.spaceIdRef );
				//console.log( 'hud space1', space1 );

				if ( !space1 ) {

					adjacentsTxt = '<hr><p>Model has only a single space, therefore there is no adjacent space data to be shown here.</p>'

				} else {

					adjacentsTxt =
						'<hr>' +
						'<details open >' +
							'<summary><b>adjacent space 1</b></summary>' +
							'<div class=flex-container2 >' +
								'<div class=flex-div1 >' +
									'<input oninput=HUD.updateSelect(this,selSpace1); size=6 placeholder="space id" ><br>' +
									'<select id=selSpace1 onclick=GBI.showSpace(this.value); onchange=GBI.showSpace(this.value); size=8 >' + GBP.spacesOptions + '</select><br>' +
									'<button onclick=HUD.updateSpace(0); >update</button>' + b +
									'</div>' +
								'<div class=flex-div2 >' +
									//'<b>adjacent space 1</b> ' + b +
									'id <button id=butSpace0 onclick=GBI.showSpace(this.innerText);selSpace1.value=this.innerText; >' + space1.id + '</button> ' + b +
									( space1.Name ? 'name <i>' + space1.Name +  '</i>' + b : '' ) +
									//( space1.Description ? 'description <i>' + encodeURI( space1.Description ) +  '</i>' +b : '' ) +
									( space1.Area ? 'area <i>' + Number( space1.Area ).toFixed( 1 ) + '</i>' : '' ) +
									( space1.Volume ? ' volume <i>' + Number( space1.Volume ).toFixed( 1 ) + '</i>' + b : '' ) +
									'storey <button onclick=GBI.showStorey(this.innerText); >' + space1.buildingStoreyIdRef + '</button>' + b +
									( space1.conditionType ? 'condition type <i>' + space1.conditionType + '</i>' + b : '' )  +
									//( space1.zoneIdRef ? 'zone id <i>' + space1.zoneIdRef + '</i>' + b : '' ) +
									( space1.CADObjectId ? 'cad object id <i>' + space1.CADObjectId + '</i>' + b : '' ) +
								'</div>' +
							'</div>' +
							'<hr>';
						'</details>' +
					'';

				}

			}

		}

		const footerTxt =
		`
			<details>
				<summary>For debugging surface appearance</summary>
				<p>
					<button onclick=HUD.displayTelltalesVertex(); title="Three.js data" >vertex telltales</button>
					<button onclick=HUD.displayTelltalesPolyloop(); title="gbXML data" >polyloop telltales</button>
					<button onclick=HUD.removeTelltales() >remove telltales</button>
				<p>
			</details>
		`;



		//		divHUDItems.innerHTML = adjacentsTxt;
		divHUDfooter.innerHTML = footerTxt;


		selType.value = data.surfaceType;
		HUDselSurface.value = data.id;

		const value1 = space1 && space1.id ? space1.id : 'none';
		const value2 = space2 && space2.id ? space2.id : 'none';

		if ( window.selSpace1 ) { selSpace1.value = value1; }
		if ( window.selSpace2 ) { selSpace2.value = value2; }

		selCadId.value = data.CADObjectId;

		document.body.style.cursor = 'pointer';

		*/

		HUDdivItems.innerHTML = headerTxt;

		function setHeaderAndSurfaceText () {
/*
			const headerTxt =
				`<details open >

					<summary><b>Surface</b></summary>

					<div class=flex-container2 >
						<div class=flex-div1 >
							<input oninput=HUD.updateSelect(this,HUDselSurface); size=6 placeholder="surface id" ><br>
							<select id=HUDselSurface onclick=console.log('',this.value);HUD.updateSurface(this.value); onchange=HUD.updateSurface(this.value); size=8 >` +
									GBP.surfacesOptions + `</select><br>
							<button onclick=HUD.setHeadsUp(); >update</button>
						</div>

						<div class=flex-div2 >

							id <button onclick=GBI.showSurface(this.innerText) title="show only this surface" >` + data.id + `</button>
							<button onclick=GBI.zoomIntoSurface("` + data.id + `"); title="zoom into just this surface" >zoom</button>
							<br>`
							+ ( data.Name ? 'name <i>' + data.Name + '</i>' + b : '' ) +
							`type <button butType onclick=GBI.showSurfaceType(this.innerText); title="show all of this type" >` +
								data.surfaceType + `</button>` + b +
							` update <select id = "selType" onchange=HUD.updateType(this.value);
								title="change to another type of surface" >` + GBP.surfaceTypeOptions + `</select>
							<br>`
							+ ( data.CADObjectId ? 'cad object id <button onclick=GBI.showCadId("' +
								encodeURI( data.CADObjectId ) + `"); title="Show all surfaces in this CAD object" >` + data.CADObjectId + `</button><br>` : `` ) +
								`<select id=selCadId onchange=HUD.updateCadId(this);>` + GBP.surfacesCadObj +`</select><br>` +
								`area <i>` + Number( surfaceArea ).toFixed( 1 ) + `</i>` +
								` ln <i title="length" >` + height.toFixed( 3 ) + `</i> wd <i title="width" >` + width.toFixed( 3 ) + `</i>` +
						`</div>
					</div>
					<hr>
				</details>`;
*/

			const headerTxt =

			`<details open >

				<summary><b>Surface</b></summary>

				<div id=TMPdivInputSelect ></div>

				<hr>
				</details>`;

			return headerTxt;

		}

	};



	HUD.updateSurface = function( id ) {

		GBP.surfaceMeshes.children.forEach( function( element ) { element.visible = element.userData.data.id === id ? true : false; } );

		const surfaceMesh = GBP.surfaceMeshes.children.find( ( element ) => element.userData.data.id === id );
		console.log( 'surfaceMesh', surfaceMesh );
		HUD.intersected = surfaceMesh;

	};



	HUD.updateSpace = function( spaceRef ) {
		//console.log( 'spaceRef', spaceRef );

		const surfaceJson = HUD.data;
		const surfaceId = surfaceJson.id;
		let adjacentNew;

		HUD.surfacesXml = GBP.gbxmlResponseXML.getElementsByTagName("Surface");

		const surfaceXml = HUD.surfacesXml[ surfaceJson.id ];

		if ( spaceRef === 0  ) {

			const spaceId = selSpace1.value;
			surfaceJson.AdjacentSpaceId.spaceIdRef = spaceId;
			butSpace0.innerText = spaceId;

			console.log( 'spaceId', spaceId );

			adjacentNew = GBP.gbxmlResponseXML.createElement( "AdjacentSpaceId" );
			adjacentNew.setAttribute( "spaceIdRef", spaceId );
			surfaceXml.appendChild( adjacentNew );

			GBI.surfaceChanges.oneAdjacent.push( { id:surfaceId, spaceId: spaceId } )

		} else if ( spaceRef === 1 ) {

			const spaceId = selSpace1.value;
			console.log( 'spaceId', spaceId );

			surfaceJson.AdjacentSpaceId[ 0 ].spaceIdRef = spaceId;
			butSpace1.innerText = spaceId;

			adjacentNew = GBP.gbxmlResponseXML.createElement( "AdjacentSpaceId" );
			adjacentNew.setAttribute( "spaceIdRef", spaceId );
			surfaceXml.appendChild( adjacentNew );

			GBI.surfaceChanges.twoAdjacent.push( { id:surfaceId, spaceId: [ surfaceJson.AdjacentSpaceId[ 0 ].spaceIdRef, surfaceJson.AdjacentSpaceId[ 1 ].spaceIdRef ] } )

		} else if ( spaceRef === 2 ) {

			const spaceId = selSpace2.value;
			surfaceJson.AdjacentSpaceId[ 1 ].spaceIdRef = spaceId;
			butSpace2.innerText = spaceId;

			adjacentNew = GBP.gbxmlResponseXML.createElement( "AdjacentSpaceId" );
			adjacentNew.setAttribute( "spaceIdRef", spaceId );
			surfaceXml.appendChild( adjacentNew );

			GBI.surfaceChanges.twoAdjacent.push( { id:surfaceId, spaceId: [ surfaceJson.AdjacentSpaceId[ 0 ].spaceIdRef, surfaceJson.AdjacentSpaceId[ 1 ].spaceIdRef ] } )

		}

		//console.log( 'surfaceXml', surfaceXml);
		//console.log( 'adjacentNew', adjacentNew );

		console.log( 'surfaceJson', surfaceJson );

		HUD.setHeadsUp();

	};



	HUD.updateType = function() {

		// console.log( 'id', HUD.data );

		const surface = HUD.data;
		//console.log( 'surface', surface );

		const id = surface.id;
		const spaceIdPrev = surface.AdjacentSpaceId;
		//console.log( 'spaceIdPrev', spaceIdPrev );

		const typeNew = surface.surfaceType = selType.value;
		//console.log( 'typeNew', typeNew );
		GBI.surfaceChanges.types.push( { id: id, type: typeNew } );

		HUD.surfacesXml = GBP.gbxml.getElementsByTagName("Surface");

		surfaceXml = HUD.surfacesXml[ id ];
		//console.log( 'surfaceXml',  surfaceXml );

		surfaceXml.attributes.getNamedItem( 'surfaceType' ).nodeValue = typeNew;

		surfaceMesh = GBP.surfaceMeshes.children.find( ( element ) => element.userData.data.id === id );
		surfaceMesh.material.color.setHex( GBP.colors[ typeNew ] );
		surfaceMesh.material.needsUpdate = true;

		surfaceJson = surfaceMesh.userData.data;

		const types = ['InteriorWall', 'InteriorFloor', 'Ceiling', 'Air', 'UndergroundCeiling', 'RaisedFloor'];

		if ( typeNew === 'Shade' ) {

			// json
			delete surfaceJson.AdjacentSpaceId;

			// xml
			if ( Array.isArray( spaceIdPrev ) === true ) { // type prev is two adjacents


				const adjSpace1 = surfaceXml.getElementsByTagName("AdjacentSpaceId")[1];
				//console.log( 'adjSpace1',  adjSpace1 );

				const removedId1 = adjSpace1.getAttribute( 'spaceIdRef' );
				const removed1 = surfaceXml.removeChild( adjSpace1 );

				const adjSpace2 = surfaceXml.getElementsByTagName("AdjacentSpaceId")[0];
				//console.log( 'adjSpace2', adjSpace2 );

				const removedId2 = adjSpace2.getAttribute( 'spaceIdRef' );
				const removed2 = surfaceXml.removeChild( adjSpace2 );

		//				delete( surfaceJson.AdjacentSpaceId );

				console.log( 'old 2 / new 0 / removed id1: ', removedId1, ' id2: ', removedId2, surfaceXml );

			} else { // type prev is single adjacent

				const adjSpace1 = surfaceXml.getElementsByTagName("AdjacentSpaceId")[ 0 ];
				//console.log( 'spaceId',  spaceId);

				const removedId1 = adjSpace1.getAttribute( 'spaceIdRef' );
				const removed1 = surfaceXml.removeChild( adjSpace1 );

				console.log( 'old 1 / new 0 / id: ', removedId1, surfaceXml );

			}

		} else if ( types.includes( typeNew ) ) { // type new is two adjacents

			//console.log( 'typeNew', typeNew );

			if ( Array.isArray( spaceIdPrev ) === true ) { // type prev is two adjacents

				// leave things untouched
				//console.log( ' prev 2 / now 2 spaceIdPrev', spaceIdPrev );

			} else if ( spaceIdPrev ) { // type prev is single adjacent

				//surfaceJson.AdjacentSpaceId = spaceIdPrev; //{ spaceIdRef: spaceIdPrev };
				prevAdj = surfaceXml.getElementsByTagName("AdjacentSpaceId")[ 0 ];
				const prevId = prevAdj.getAttribute( 'spaceIdRef' );

				surfaceJson.AdjacentSpaceId= [];
				adjacentSpaceId = surfaceJson.AdjacentSpaceId;
				adjacentSpaceId[ 0 ] = { spaceIdRef: prevId };
				adjacentSpaceId[ 1 ] = { spaceIdRef: 'none' };

				console.log( 'old 1 / new 2 / prevId', prevId, surfaceXml );

			} else { // type prev is shade / no adjacent

				//surfaceJson.AdjacentSpaceId = { spaceIdRef: 'none' };

				surfaceJson.AdjacentSpaceId= [ { "spaceIdRef": "none" }, { "spaceIdRef": "none" }];

		//				adjacentSpaceId = surfaceJson.AdjacentSpaceId;
		//				adjacentSpaceId[ 0 ] = { spaceIdRef: 'none' };
		//				adjacentSpaceId[ 1 ] = { spaceIdRef: 'none' };

				console.log( 'old 0 / new 2 / adjacentSpaceId', surfaceJson.adjacentSpaceId );

			}

		} else { // type new is single adjacent

			if ( Array.isArray( spaceIdPrev ) === true ) { // type prev is two adjacents

				const adjacentXml2 = surfaceXml.getElementsByTagName( "AdjacentSpaceId" )[ 1 ];
				const removed2 = surfaceXml.removeChild( adjacentXml2 );

				const adjacentXml1 = surfaceXml.getElementsByTagName( "AdjacentSpaceId" )[ 0 ];
				const removed1 = surfaceXml.removeChild( adjacentXml1 );

				const newAdj = GBP.gbxmlResponseXML.createElement( "AdjacentSpaceId" );
				newAdj.setAttribute( "spaceIdRef", spaceIdPrev[ 0 ].spaceIdRef ) ;
				const newAdjTxt = surfaceXml.appendChild( newAdj );

				surfaceJson.AdjacentSpaceId = { spaceIdRef: spaceIdPrev[ 0 ].spaceIdRef };

				console.log( 'old 2 / new 1', newAdjTxt, surfaceXml );

			} else if ( spaceIdPrev ) { // type prev is single adjacent

				// leave things untouched
				const spaceId = surfaceXml.getElementsByTagName("AdjacentSpaceId")[0];

				console.log( 'old 1 / new 1 / no changes spaceId',  spaceId, surfaceXml );

			} else { // type prev is no adjacent

		//				const newAdj = GBP.gbxmlResponseXML.createElement( "AdjacentSpaceId" );
		//				newAdj.setAttribute( "spaceIdRef", "none" ) ;
		//				const newAdjTxt = surfaceXml.appendChild( newAdj );

				surfaceJson.AdjacentSpaceId = { spaceIdRef: 'none' };

				//				surfaceMesh.userData.data.AdjacentSpaceId = 'none';
				console.log( 'old 0 / new 1 / no spaceIdPrev', spaceIdPrev, surfaceXml );

			}

		}

		//console.log( 'surfaceXml',  surfaceXml );
		//console.log( 'type surfaceJson', surfaceJson );

		HUD.setHeadsUp();

	};



	HUD.updateSelect = function( input, select ) {

		const str = input.value.toLowerCase();

		for ( let option of select.options ) {

			if ( option.value.toLowerCase().includes( str ) ) {

				select.value = option.value;

				break;

			}

		}

	};



	HUD.updateCadId = function( that ){

		const surface = HUD.data;
		//console.log( 'surface', surface );

		const id = surface.id;

		HUD.surfacesXml = GBP.gbxml.getElementsByTagName( "Surface" );

		surfaceXml = HUD.surfacesXml[ id ];
		//console.log( 'surfaceXml',  surfaceXml );

		const cadObjId = surfaceXml.getElementsByTagName( "CADObjectId" )[ 0 ];

		if ( cadObjId ) {

		console.log( 'cadObjId', cadObjId.innerHTML );

			//surfaceXml.attributes.getNamedItem( 'CADObjectId' ).nodeValue = that.value;
			cadObjId.innerHTML = that.value;

			//console.log( 'that', that.value );

			surfaceXml.getElementsByTagName("CADObjectId")[ 0 ].innerHTML = that.value;

			surfaceMesh = GBP.surfaceMeshes.children.find( ( element ) => element.userData.data.id === id );

			surfaceMesh.userData.data.CADObjectId = that.value;

			GBI.surfaceChanges.cadObjs.push( { id: id, cadId: that.value } );

			HUD.setHeadsUp();

		} else {

			alert( 'There is no cad object id associated with this surface. \n\n A future release will allow you to add one.')

		}

	}



	///////// 	// to COR or THR?

	HUD.displayTelltalesVertex = function() {

		THR.scene.remove( HUD.telltalesVertex );

		if( !HUD.intersected ) { return; }

		HUD.telltalesVertex = new THREE.Object3D();


		const vertices = HUD.intersected.geometry.vertices;

		for ( let i = 0; i < vertices.length; i++ ) {

			const vertex = vertices[ i ];
			const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
			geometry.applyMatrix( new THREE.Matrix4().makeTranslation( vertex.x, vertex.y, vertex.z ) );
			const material = new THREE.MeshNormalMaterial();
			const mesh = new THREE.Mesh( geometry, material );
			mesh.position.copy( HUD.intersected.position );
			mesh.quaternion.copy( HUD.intersected.quaternion );

			placard = HUD.drawPlacard( i.toString(), 0.01, 120, vertex.x, vertex.y, vertex.z + 0.5 );
			placard.position.copy( HUD.intersected.position );
			placard.quaternion.copy( HUD.intersected.quaternion );

			// console.log( 'placard', placard );
			HUD.telltalesVertex.add( placard );
			HUD.telltalesVertex.add( mesh );

		}

		THR.scene.add( HUD.telltalesVertex );

	};



	HUD.displayTelltalesPolyloop = function() {

		THR.scene.remove( HUD.telltalesPolyloop );

		if( !HUD.intersected ) { return; }

		HUD.telltalesPolyloop = new THREE.Object3D();

		const vertices = HUD.intersected.userData.data.PlanarGeometry.PolyLoop.CartesianPoint;

		for ( let i = 0; i < vertices.length; i++ ) {

			const vertex = vertices[ i ].Coordinate;
			const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
			const material = new THREE.MeshNormalMaterial();
			const mesh = new THREE.Mesh( geometry, material );
			// console.log( 'vertex', vertex );

			mesh.position.set( parseFloat( vertex[ 0 ] ), parseFloat( vertex[ 1 ] ), parseFloat( vertex[ 2 ] ) );

			placard = HUD.drawPlacard( i.toString(), 0.01, 200, parseFloat( vertex[ 0 ] ) + 0.5, parseFloat( vertex[ 1 ] ) + 0.5, parseFloat( vertex[ 2 ] ) + 0.5 );
			// console.log( 'placard', placard );
			HUD.telltalesPolyloop.add( placard );
			HUD.telltalesPolyloop.add( mesh );

		}

		const openings = HUD.intersected.userData.data.Opening ? HUD.intersected.userData.data.Opening : [];

		for ( let i = 0; i < openings.length; i++ ) {

			const opening = openings[ i ]
			//console.log( 'opening', opening );

			const vertices = opening.PlanarGeometry.PolyLoop.CartesianPoint;
			//console.log( 'vertices', vertices );

			for ( let i = 0; i < vertices.length; i++ ) {

				const vertex = vertices[ i ].Coordinate;
				const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
				const material = new THREE.MeshNormalMaterial();
				const mesh = new THREE.Mesh( geometry, material );
				// console.log( 'vertex', vertex );

				mesh.position.set( parseFloat( vertex[ 0 ] ), parseFloat( vertex[ 1 ] ), parseFloat( vertex[ 2 ] ) );

				placard = HUD.drawPlacard( i.toString(), 0.01, 10, parseFloat( vertex[ 0 ] ) + 0.5, parseFloat( vertex[ 1 ] ) + 0.5, parseFloat( vertex[ 2 ] ) + 0.5 );
				// console.log( 'placard', placard );
				HUD.telltalesPolyloop.add( placard );
				HUD.telltalesPolyloop.add( mesh );

			}


		}

		THR.scene.add( HUD.telltalesPolyloop );

	};



	HUD.removeTelltales = function() {

		THR.scene.remove( HUD.telltalesPolyloop );
		THR.scene.remove( HUD.telltalesVertex );

	}


	HUD.drawPlacard = function( text, scale, color, x, y, z ) {

		// 2016-02-27 ~ https://github.com/jaanga/jaanga.github.io/tree/master/cookbook-threejs/examples/placards

		var placard = new THREE.Object3D();
		var v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };

		var texture = canvasMultilineText( text, { backgroundColor: color }   );
		var spriteMaterial = new THREE.SpriteMaterial( { map: texture, opacity: 0.9, transparent: true } );
		var sprite = new THREE.Sprite( spriteMaterial );
		sprite.position.set( x, y, z ) ;
		sprite.scale.set( scale * texture.image.width, scale * texture.image.height );

		var geometry = new THREE.Geometry();
		geometry.vertices = [ v( 0, 0, 0 ),  v( x, y, z ) ];
		var material = new THREE.LineBasicMaterial( { color: 0xaaaaaa } );
		var line = new THREE.Line( geometry, material );

		//placard.add( sprite, line );
		placard.add( sprite );
		return placard;


		function canvasMultilineText( textArray, parameters ) {

			var parameters = parameters || {} ;

			var canvas = document.createElement( 'canvas' );
			var context = canvas.getContext( '2d' );
			var width = parameters.width ? parameters.width : 0;
			var font = parameters.font ? parameters.font : '48px monospace';
			var color = parameters.backgroundColor ? parameters.backgroundColor : 120 ;

			if ( typeof textArray === 'string' ) textArray = [ textArray ];

			context.font = font;

			for ( var i = 0; i < textArray.length; i++) {

				width = context.measureText( textArray[ i ] ).width > width ? context.measureText( textArray[ i ] ).width : width;

			}

			canvas.width = width + 20;
			canvas.height =  parameters.height ? parameters.height : textArray.length * 60;

			context.fillStyle = 'hsl( ' + color + ', 80%, 50% )' ;
			context.fillRect( 0, 0, canvas.width, canvas.height);

			context.lineWidth = 1 ;
			context.strokeStyle = '#000';
			context.strokeRect( 0, 0, canvas.width, canvas.height );

			context.fillStyle = '#000' ;
			context.font = font;

			for ( i = 0; i < textArray.length; i++) {

				context.fillText( textArray[ i ], 10, 48  + i * 60 );

			}

			var texture = new THREE.Texture( canvas );
			texture.minFilter = texture.magFilter = THREE.NearestFilter;
			texture.needsUpdate = true;

			return texture;

		}

	};


	HUD.initHeadsUp();