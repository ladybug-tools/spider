
## Ladybug Tools / Spider

# gbXML Viewer R12

[gbXML Viewer]( https://github.com/ladybug-tools/spider "Source code on GitHub" ) is a collection of [free, open source]( https://opensource.guide/ "Read all about it at OpenSource Guides" ) modular [JavaScript]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/About_JavaScript "Callout to Brendan" )/[WebGL]( https://www.khronos.org/webgl/ "Tip of the hat to Ken Russell" )/[Three.js]( https://threejs.org/ "Hi Mr.doob" ) experiments hosted on [GitHub]( https://github.com/about "Beep for where the geek peeps keep" ) for viewing, validating and editing [gbXML]( http://gbxml.org "Where's your schema today?" ) files in 3D in your browser.

Questions: [Ladybug Tools forum]( http://discourse.ladybug.tools/c/spider "Hi Mostapha" ) &nbsp; Bugs: [GitHub issues]( https://github.com/ladybug-tools/spider/issues "Say hello to Michal & Theo!" )

### Must watch and thumbs-up YouTube video:

[![gbXML Viewer User Guide]( ../../../images/gbxml-viewer-user-guide-300px.png )]( https://youtu.be/2QHrbuKIkdY "With music and voiceover by the multi-talented Michalina" )

<!--
<details open>

<summary>Welcome  ~ R.</summary>

</details>
-->

<details open>

<summary>Welcome 2018-03-19 ~ R12.3</summary>


R12.3 ~ Most modules working
* Reports 2 menu: simpler code / faster / workflow more streamlined
* Issues: split off from reports / Adjacent spaces items now sorted
* Save changes: now supports loading color schemes
* Right menu has slider

Goals for R12

* Simplify the core modules quite a bit
	* Make things so that Python coders say it's almost as easy as Python
* Split Reports into two modules
	* Reports - Identify spaces, surfaces, storeys etc
		Make selecting things as easy as Heads-up display
	* Issues - Identify duplicate surfaces or surfaces with two identical adjacent spaces etc / find the problem areas
* Maybe start an analysis effort that includes things like Window Wall Ratios

APP and all the test files now seem to co-exist fairly well
* This will be ongoing effort
* Every module in its own folder
* Index and test HTML will be identical in all folders
* Only .js  and read me files in each module need updating

</details><details open>

<summary>Welcome 2018-03-10 ~ R12.0 </summary>


R12 First Commit
* Big effort to simplify the core scripts and streamline the loading process
* The index.html for each module folder automatically load the read me file whatever folder its in
	* You can move or copy this index.html file to any folder and it just works
* Standard gv-tmp.hml file to test JavaScript modules. Almost drag and drop into any folder
* All modules use same style sheet
	* Closes: 2018-03-04 ~ Use main style sheet

</details>

***

<h2 onclick=divMenu.scrollTop=0; style=cursor:pointer;text-align:center; title='go to top and, btw, my web is better than your web' > &#x1f578; </h2>
