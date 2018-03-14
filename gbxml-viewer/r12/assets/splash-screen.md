
## Ladybug Tools / Spider

# gbXML Viewer R12

gbXML Viewer is a collection of free, open source modular JavaScript/WebGL/Three.js experiments for viewing, examining and validating [gbXML]( http://gbxml.org ) files in 3D in your browser.


### Must watch video:
[![gbXML Viewer User Guide]( ../../../images/gbxml-viewer-user-guide-300px.png )]( https://www.youtube.com/watch?v=YqEkc3rvxYs )

<!--
<details open>

<summary>Welcome  ~ R.</summary>

</details>
-->

<details open>

<summary>Welcome 2018-03-13 ~ R12.1</summary>

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
