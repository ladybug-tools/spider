
## Ladybug Tools / Spider

# Aragog gbXML Viewer R12

[Aragog gbXML Viewer]( https://github.com/ladybug-tools/spider "Source code on GitHub" ) is a collection of [free, open source]( https://opensource.guide/ "Read all about it at OpenSource Guides" ) modular [JavaScript]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/About_JavaScript "Callout to Brendan" ) / [WebGL]( https://www.khronos.org/webgl/ "Tip of the hat to Ken Russell" ) / [Three.js]( https://threejs.org/ "Hi Mr.doob" ) experiments hosted on [GitHub]( https://github.com/about "Beep for where the geek peeps keep" ) for viewing, validating and editing [gbXML]( http://gbxml.org "Where's your schema today?" ) files in 3D in your browser. <span style=color:magenta>Click or touch the 3D model to get going!</span>

Questions: [Ladybug Tools forum]( http://discourse.ladybug.tools/c/spider "Hi Mostapha" ) &nbsp; Bugs: [GitHub issues]( https://github.com/ladybug-tools/spider/issues "Say hello to Michal & Theo!" )

### Please watch and thumbs-up our YouTube video:

[![gbXML Viewer User Guide]( ../../../images/gbxml-viewer-user-guide-300px.png )]( https://youtu.be/2QHrbuKIkdY "With music and voiceover by the multi-talented Michalina" )

<!--
<details open>

<summary>Welcome  ~ R.</summary>

</details>
-->

<details open >

<summary>New stable release. Yay! New Features include:</summary>

* Faster, more bullet-resistent code
* Choice of user interface colors
* Many workflow simplifications
* Reports on more types of gbXML elements and attributes
* Add openings as displayable objects
* Added new issue finders
* Add new area and orientation calculations panel
* Operation on mobile devices improved
* Second pass at adding edit, save and reload changes capability

</details><details open>

<summary>Welcome 2018-05-03 ~ R12.30/31</summary>

* APP: Set 'gbxml-clifton-downs-broken.xml' as default drawing
* APP: Update to 'Aragog'
* HUD: fix cad object id not toggling visibility
* HUD: fix cad object id update
* REP: set all panels to be closed

</details><details>

<summary>Welcome 2018-04-20 ~ R12.26</summary>

* File and folder cleanup and old file archiving
* Clean up in-world menu text
* REP > Add R13 CAD Object ID check
* ISS > Add R13 Metadata Issues
* ISS > cleanup invalid surface, opening and adjacent spaces code


</details><details>


<summary>Welcome 2018-04-19 ~ R12.23/24</summary>

R12.23/24
* HUD > Add * Fix: input tag above select CAD Object ID

R12.20/21/22
* Add ISS > Surface TtType Invalid
* Add ISS > Opening Type Invalid
* Add and later fix ISS > Adjacent Space Invalid


R12.18
* ISS > Duplicate Suraces: Fixes spaces not displaying

R12.19
* REP2 > CAD Objects:Fixes issues when CAD Object ID is malformed in gbXML file


</details><details>

<summary>Welcome 2018-04-10 ~ R12.16</summary>

R12.16
HUD / Heads-Up Module
* If gbXML file has only a single space:
	* Formerly: displays blank HUD
	* Now: displays relevant HUD data plus following message 'Model has only a single space, therefore there is no adjacent space data to be shown here.'


R12.15
NUM / Numbers Module
	* Add note: 'All quantities shown in this panel are calculated on-the-fly from the coordinate data in the gbXML file'

R12.14
HUD / Right Menu
* Fix polyloop telltales not showing / causing JavaScript error

R12.13
APP/ All modules
* Fix issues with menu buttons not resetting style on new model load

R12.12
CSS / APP
* Add user selected color themes

APP
* Turn off automatic load of saved changes

R12.10
COR / Core Modules
* Simplify slider code
	* sticks to side
	* Should work better on a phone
* Update core.html so shows all three windows
	* Follows APP menu more closely
CSS
* Works with new slider code
* Various ID name changes




R12.9
CSS
* Widths to rems
* Most all colors by css vars

APP / Application Module
* Rejigged menu / item positions

NUM / Numbers Module
* 2018-03-23 ~ Standardize width of buttons
* Add Michalina's new orientation color palette
* Menu uses HTML details
* Menu add toggle visability buttons
* Add more Orientation features WWR etc

R12.8
* NUM / Numbers Module
	* 2018-03-22 ~ Add select by storey / show in 3D / display attributes
	* 2018-03-22 ~ Add Zones
	* 2018-03-22 ~ Button to show surfaces for total floor area
	* 2018-03-22 ~ Button to show surfaces for exterior area
	* 2018-03-22 ~ Add show orientation by color
	* 2018-03-22 ~ Add show openings / make clickable / App to report
* APP / Application Module
	* Fix reports menu not deleting itself
	*  Make sample file more visible
* HUD / Heads-up Display
	* Fix spaces not showing in HUD select space

Some issues with update in the HUD.

R12.7
* NUM/ Numbers Module
	* Add many new numbers

R12.6
* APP/ Style
	* Trying to learn how to control right menu / let it flow and grow nicely
	* Make 3D model more visible on loading
* APP/Menu
	* Only load changes JSON file when initial default model is loaded
* ISS/Issues module
	* Add 'Surfaces wth close vertex' item
* NUM/Numbers module
	* First commit
R12.5
* SAV/ Save changes
	* Add load ground plane
	* Add load background gradient
	* Add ability to parse files at load time

R12.4
* ISS/Issues module:
	* Add check for undefined CAD Object ID
	* Add check for tiny surfaces
	* Add check for surfaces that contain other surfaces or overlap
		* Currently turned off because uses much time and has found none so far
		* Work-in-progress

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

</details><details>

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
