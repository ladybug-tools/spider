	var TST = {};

	// get by algo
	TST.releaseSourceURL = 'https://github.com/ladybug-tools/spider/tree/master/gbxml-viewer/r13/';

	//COR.iconInfo = '<img src="https://status.github.com/images/invertocat.png" height=14 >';
	TST.iconGitHubMark = "../assets/gitHub-mark.png";


	TST.menuBreadcrumbs =

	`<div>
		<a href="http://www.ladybug.tools/" target="_top" >Ladybug Tools</a> &raquo;
		<a href="http://www.ladybug.tools/spider/" target="_top" > &#x1f578;</a> &raquo;
		<a href="../../../index.html#gbxml-viewer/README.md" target="_top" style=font-size:24px; title="gbXML Viewer Read Me" >&#x2302;</a> &raquo;
	</div>`;

	TST.menuTitle =

	`<h2>
		<a href="` + TST.releaseSourceURL + `" target=_top >
			<img src=` + TST.iconGitHubMark + ` height=18 style=opacity:0.3; ></a>
			<a id=aDocumentTitle href="" >` + document.title +`</a>
	</h2>`;

	TST.menuDescription =

	`<div title="Thanks to Mr.doob, Ken Russell and the many WebGL peeps" ><small>` +
		document.head.querySelector( '[name=description]' ).content +
	`</small></div>`;

	TST.menuFileOpening =

	`<p id=dragArea class=dragDropArea >
		Drag & drop a file in this box<br>
		or <input type=file id=inpFile onchange=GBP.openFile(this); accept=".xml" ><br>
		or enter a default file path <input id=inpFilePath onchange=THR.updateDefaultFilePath(); style=width:100%; >
		<br>
	<p>`;

	TST.menuFooter =
	`<details open >

		<summary>footer</summary>

		<div title='' ><a href=#../../../pages/gbxml-viewer-support-issues-wish-list.md > Support, Issues, Wish List & Wanted</a></div>
		<div title='' ><a href=#./splash-screen.md >Introduction/ splash screen</a></div>
		<div title='' ><a href=#../../README.md >Viewer Read Me</a></div>
		<div title='' ><a href=#../README.md >Release Read Me</a></div>
		<div title='Every release is visible and usable' ><a href=#../../previous-releases.md >Previous Releases</a></div>
		<div title='many thanks!' ><a href=#../../../pages/credits.md >Credits</a></div>
		<div><a href=#../../../pages/code-of-conduct.md >Code of Conduct</a></div>
		<div><a href=#../../../pages/contributing.md >Contributing</a></div>
		<div><a href=#../../../pages/license.md >Copyright & License</a></div>
		<div><a href=http://www.ladybug.tools/spider/gbxml-user-guide/gbxml-user-guide.html >gbXML Schema User Guide</a></div>
		<div><a href=#../../../pages/markdown-help.md >Markdown Help</a></div>
		<div><a href="JavaScript:( function(){ var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()" title="Mr.doob's Stats.js appear in top left corner" >Show frames/second statistics</a></div>
		<!--
		<div><a href="https://api.github.com/rate_limit" target="_blank">github rate limits</a></div>
		-->
		<hr>
		<h2 onclick=divMenu.scrollTop=0; style=cursor:pointer;text-align:center;
			title='go to top and, btw, my web is better than your web' > <img src=../assets/spider-web.png height=24 style=opacity:0.5; > </h2>

	</details>`;


	TST.gbxmlSampleFiles =
	`
		<div><a href="#../../../gbxml-sample-files/old-factory.xml" >old-factory.xml</a></div>
		<div><a href="#../../../gbxml-sample-files/annapolis-md-single-family-residential-2016.xml" >gbxml standard single family residential 2016</a></div>
		<div><a href="#../../../gbxml-sample-files/aspen-co-resort-retail.xml" >aspen-co-resort-retail.xml</a></div>
		<div><a href="#../../../gbxml-sample-files/boston-ma-urban-house-mep.xml" >boston-ma-urban-house-mep.xml</a></div>
		<div><a href="#../../../gbxml-sample-files/bristol-clifton-down-road-small.xml" >bristol-clifton-down-road-small.xml</a></div>
		<div><a href="#../../../gbxml-sample-files/columbia-sc-two-story-education-trane.xml" >columbia-sc-two-story-education-trane</a></div>
		<div><a href="#../../../gbxml-sample-files/coventry-university-of-warwick-small.xml" >coventry-university-of-warwick-small.xml</a></div>
		<div><a href="#../../../gbxml-sample-files/golden-co-open-studio-seb.xml" >golden-co-open-studio-seb.xml</a></div>
		<div><a href="#../../../gbxml-sample-files/london-office.xml" >london-office.xml</a></div>
		<div><a href="#../../../gbxml-sample-files/omha-nb-zneth.xml" >omha-nb-zneth.xml</a></div>

	`;

	//GBP.defaultURL = '../../../gbxml-sample-files/bristol-clifton-down-road-small.xml';
	//GBP.defaultURL = '../../gbxml-sample-files/columbia-sc-two-story-education-trane.xml';
	//GBP.defaultURL = '../../../gbxml-sample-files/coventry-university-of-warwick-small.xml';

