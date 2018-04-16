
## Ladybug Tools / Spider

# gbXML Viewer R13

[gbXML Viewer]( https://github.com/ladybug-tools/spider "Source code on GitHub" ) is a collection of [free, open source]( https://opensource.guide/ "Read all about it at OpenSource Guides" ) modular [JavaScript]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/About_JavaScript "Callout to Brendan" )/[WebGL]( https://www.khronos.org/webgl/ "Tip of the hat to Ken Russell" )/[Three.js]( https://threejs.org/ "Hi Mr.doob" ) experiments hosted on [GitHub]( https://github.com/about "Beep for where the geek peeps keep" ) for viewing, validating and editing [gbXML]( http://gbxml.org "Where's your schema today?" ) files in 3D in your browser.

<span style=color:magenta>Click or touch the model to get going</span>

Questions: [Ladybug Tools forum]( http://discourse.ladybug.tools/c/spider "Hi Mostapha" ) &nbsp; Bugs: [GitHub issues]( https://github.com/ladybug-tools/spider/issues "Say hello to Michal & Theo!" )

### Must watch and thumbs-up YouTube video:

[![gbXML Viewer User Guide]( ../../../images/gbxml-viewer-user-guide-300px.png )]( https://youtu.be/2QHrbuKIkdY "With music and voiceover by the multi-talented Michalina" )

<!--
<details open>

<summary>Welcome  ~ R.</summary>

</details>
-->


<details open>

<summary>Welcome 2018-04-15 ~ R13.4</summary>

A very extensive rewrite of REP/GBI/NUM/ISS/HUD in progress


</details>
<details open>

<summary>Welcome 2018-04-11 ~ R13.3</summary>


HUD /Head-up Display Module
* If gbXML file has only a single space:
	* Past: displays blank HUD
	* Now: displays relevant HUD data plus following message 'Model has only a single space, therefore there is no adjacent space data to be shown here.'

REP / Reports Module
* Element attributes starting to have buttons to update the display
	* Buttons for: ID, Surface type, Adjacent spaces, CAD object ID, Space and Zone
* Spaces report has zoom button

CSS / Style Sheet
* Better handling of sliding menus and pop ups on small devices
* Left menu needs more work

</details>


<details open >

<summary>Welcome 2018-04-03 ~ R13.2.</summary>

REP / Reports Module
* Very reorganized / all functions based on set and get
	* Should be more maintainable and extendable
* Variable and function names with clearer / more self-evident structure

APP / Application Module

* Only a single Feature panel is visible at any given time
	* Multiple visible panels added complexity without much benefit

</details>

<details>

<summary>Welcome 2018-04-02 ~ R13.1 </summary>

R13.2

HUD /Head-up Display Module
* If gbXML file has only a single space:
	* Past: displays blank HUD
	* Now: displays relevant HUD data plus following message 'Model has only a single space, therefore there is no adjacent space data to be shown here.'

REP / Reports Module
* Element attributes starting to have buttons to update the display
	* Buttons for: ID, Surface type, Adjacent spaces, CAD object ID, Space and Zone
* Spaces report has zoom button

CSS / Style Sheet
* Better handling of sliding menus and pop ups on small devices
* Left
R13.1
* Starting to have revision numbers
* REP / Reports Module
	Add 'Openings by Type' panel

ISS / Issues & Num / Numbers Modules
* Various fixes

HUD / Heads-Up Display Module
* Added and appears to be functioning OK
* Add the style theming to the window
* Streamline self-loading capability

Issue: Process of toggling the visibility of meshes, edges and openings needs streamlining.
* Often things that should be made visible when clicking around are not
* You need to click the 'all' button too often

R13
* 2018-03-26:First Commit
* 2018-03-29: Multiple color themes and menu-toggles looking good
* 2018-03-31 ~ REP / Reports Module
	* New user experience
	* Display reports for all available attributes for surfaces, spaces, storeys, zones and openings
	* Add opening visibility toggle
	* Add 'Exposed to Sun' button
</details>

### R13 Objectives

* Seriously simplify GBP module << done
* Reorganized HTML element IDs and CSS style names so all items correspond to one another nicely
* Establish the Modules Explorer as the single source for access to features list, change log, support, links to GitHub source and read me, and more
* Continue adding items to Reports, Issues and Numbers
* Establish three sets of CSS styles for:
	* "Archie" the architect: all Pastels/ Looks Like Apple made it
	* "Cody" the coder: White text on black
	* "Inge" the ingénieure: All the colors imaginable


***

<h2 onclick=divMenu.scrollTop=0; style=cursor:pointer;text-align:center; title='go to top and, btw, my web is better than your web' > &#x1f578; </h2>
