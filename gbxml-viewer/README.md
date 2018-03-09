<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/README.md "View file as a web page." ) </span>


# gbXML Viewer Read Me

<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/gbxml-viewer/r11/gv-cor/gv-cor.html  width=100% height=400px >Iframes are not displayed on github.com</iframe>

_gbXML Viewer Core ~ the basic HTML, CSS and JavaScript used by all add-on scripts_

### Welcome [TAS]( http://www.edsl.net/main/ ) users!


## Full screen stable release R11: <http://www.ladybug.tools/spider/gbxml-viewer/>


<!--
## Full Screen pre-release R11: <http://www.ladybug.tools/spider/gbxml-viewer/dev>

-->

## Latest News: [View Updates]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/view-updates.html )

* News on what's happening with the gbXML Viewer.


## YouTube Video: [gbXML Viewer ~ User Guide]( https://www.youtube.com/watch?v=YqEkc3rvxYs )

* Michal's must watch video
* Tania Becker commented: 'Fascinating video. It's well explained and easy to understand even for a lay person. It sparkles!'


## Full Screen early version: [gbXML Viewer R3]( http://www.ladybug.tools/spider/read-gbxml/gbxml-viewer/2017-09-23-michal/index.html )

***

## The Concept: Knowledge embedded in gbXML files is viewable, analyzable and editable with free, open-source web apps

### The issues / The problems to be solved


About [Green Building XML (gbXML)]( https://en.wikipedia.org/wiki/Green_Building_XML ):

> gbXML allows disparate 3D [building information models (BIM)]( https://en.wikipedia.org/wiki/Building_information_modeling ) and architectural/engineering analysis software to share information with each other

The current set of [BIM authoring and CAD software tools]( http://www.gbxml.org/Software_Tools_that_Support_GreenBuildingXML_gbXML ) for gbXML include various proprietary, closed-source applications.

GbXML being open source, it would also be nice to be able to view gbXML files in 3D in your browser with no fees and with open source code.

The Ladybug Tools/Spider gbXML Reader scripts are first steps toward making gbXML viewers readily available.

### Mission

gbXML Viewer is a collection of modular experiments for viewing, examining and validating gbXML files in 3D in your browser.

Objectives

* Loads almost instantly
* Non-modal interface
* Fast effective workflow: get things done faster


### Vision

* Helping students, clients and non-AEC peeps gain access BIM data easily, quickly and freely


## Current Issues of Note



***

## gbXM Viewer Features

Open, view and investigate gbXML files in 3D in your browser with free, open source entry-level JavaScript.

### User experience

* Runs in your browser on computer, tablet and phone
* Highly adjustable workspace
* Movable, sliding resizable menus
* View the full gamut of data typically available in a gbXML file
* View gbXML files in 3D
* Full zoom, pan and rotate

### Settings and Viewing Menu

* Adjust a wide variety of viewing parameters
	* Set random, phong default, normal or default material
	* Opacity slider
	* Shadows, edges, surface normals
	* Axes, grid, ground and gradient background
	* Wireframe and scene rotation
* Exploded 3D views
* Perspective and orthographic views
* Buttons to toggle display of individual surfaces, zones, spaces, storey and surface types


### Reports / Data Menu
* View all project textual metadata embedded in gbXML files
* Link to Google map focussed on project lat/lon
* Buttons to highlight surfaces, spaces, stories and zones
	* Individually
	* By surface type
	* By individual CAD object IDs
	* By groups of CAD Objects
* Toggle visibility of all items
* Zoom to selected surface or space


### Reports / Issue tracking Menu

* Identifies automatically:
	* Duplicate surfaces
	* Surfaces with duplicate adjacent spaces
	* Multiple elements with identical CAD Object ID
	* Tiny surfaces and tiny spaces


### Heads-up Display (HUD) / Editing

* Toggle the display of 3D surfaces based on user input
* Highlight and toggle visibility of elements, surfaces, edges
	* Click menu items or use ALT + ZXCV keys
* Click on any surface in the model
	* View id, name, type CAD object id
	* View dimensions and area
	* Delete surface
* Select any surface from scrolling list to see it highlighted on screen and parameters displayed
* Reassign surface type and adjacent spaces for all surfaces
	* View adjacent space parameters
	* Toggle view of space and story
	* Select adjacent spaces from scrolling list


### Main Menu & Heads-up Display (HUD) / File handling

* Open files via open file dialog or drag and drop
* Open files via URL using a link or simply by copying and pasting into the address bar
* Save edited data to a new gbXML file with updated document history

### SAV ~ Save Changes

* Save your editing changes to a file for reuse with next incoming gbXML source file update
* Save time with gbXML files that are frequently updated


### THR ~ Code

* All plain vanilla client-side JavaScript
* Built over the Three.js WebGL JavaScript library
* Uses Showdown to turn Markdown into HTML
* Every menu has own JavaScript file, HTML test file and read me
* Every menu has its own name space and only loads when first called
* Creates gbJSON data for easier processing
* All free and open source and hosted on GitHub

### Bonus / Experimental Feature
* Optional first person camera enables model fly-through
	* Fly through and around your models.
	* Use cursor keys or WASD keys.
	* Click on the icons at bottom of your screen
	* Use mouse, menu or cursor keys to control full range of motion
	* 3D avatar guides you through space


* Sun path diagrams with analemmas
	Uses Ladybug Tools / Spider Solar Calculator to position Sun correctly for lat/lon at any month, day and hour
* Screen capture to video
	* Currently only on previous release

### Sample gbXML File galleries
* Uses GitHub API to obtain directory listings and load gbXML files in several selected repositories
	* gbXML.org sample files
	* Spider Build Well project files
	* Various files used for testing


## Things you can do using this script

* Use one/two/three fingers to rotate/zoom/pan the display in 3D
	* Or left/scroll/right with your pointing device
* Click the three bars( 'hamburger menu icon' ) to slide the menu in and out
* Click the [Stats]( https://github.com/mrdoob/stats.js/ ) box in the footer to toggle FPS / MS / MB views
* Press Control-U/Command-Option-U to view the source code
* Press Control-Shift-J/Command-Option-J to see if the JavaScript console reports any errors




## Links of Interest


See also:

* <http://www.gbxml.org/>
> gbXML is an industry supported schema for sharing building information between disparate building design software tools.

* <https://github.com/GreenBuildingXML>
> Repositories for all things gbXML including validator source code, test cases, and more...

* <https://en.wikipedia.org/wiki/Green_Building_XML>
> The Green Building XML schema (gbXML) is an open schema developed to facilitate transfer of building data stored in Building Information Models (BIM) to engineering analysis tools. gbXML is being integrated into a range of software CAD and engineering tools and supported by leading 3D BIM vendors. gbXML is streamlined to transfer building properties to and from engineering analysis tools to reduce the interoperability issues and eliminate plan take-off time.


* <https://twitter.com/gbXML>
> The gbXML open schema helps facilitate the transfer of building properties stored in 3D building information models (BIM) to engineering analysis tools.

* <https://github.com/chiensiTB/gbXMLValidator/wiki/What-is-gbXML>
> What is gbXML?


* <https://greenspacelive.com/site/building-generator/>
> Use the building generator for rapid production of building geometry models.


### More Links

* <https://carmelsoftware.tumblr.com/post/151019045304/a-progress-report-on-gbxml-validation-efforts>
* <http://www.grasshopper3d.com/group/ladybug/forum/topics/new-honeybee-component-import-gbxml>
* <https://www.linkedin.com/pulse/5-modeling-techniques-gbxml-energy-integration-jean-carriere>
* <https://knowledge.autodesk.com/support/revit-products/learn-explore/caas/CloudHelp/cloudhelp/2015/ENU/Revit-DocumentPresent/files/GUID-586B9574-64DA-47BC-B8EC-DEF2D565928F-htm.html>
* <http://inside-the-system.typepad.com/my_weblog/2012/08/how-to-export-gbxml-for-only-some-spaces.html>



## To Do / Wish List Items

* Feel free to add new ideas
* Sections are based on the current set of modules
* Items are listed in alphabetical order of their three letter folder/ name-space id
* More links and details available in the [Release Read Me]( http://www.ladybug.tools/spider/#gbxml-viewer/r11/README.md )

### Dev

* 2018-03-08 ~ Start an Issues men item
* 2018-03-04 ~ Start R12

### ADJ ~ Duplicate Adjacents

* 2018-03-08 ~ Michal: sort the adjacent spaces / by size
* 2018-03-08 ~ Combine with duplicate coordinates and put into Issues button area

### ANA ~ Sun Path / Analemma

* 2018-01-01 ~ Theo: Multiple suns
* 2018-02-21 ~ Add automatic addition of ground


### APP ~ Application Menu

* 2018-03-08 ~ Bring all file loading over to APP?
* 2018-03-04 ~ Random model on start-up?
* 2018-02-18 ~ Menus remember their position from session to session


#### Style Sheet

* 2018-03-04 ~ More CSS vars


### CAM ~ First Person camera

* 2018-03-04 ~ Avatar talks / Identifies current space and direction
* 2017-11-13 ~ Choose whether you fly through walls or bump into them
* 2017-11-13 ~ Better adjustment of movement speed depending on scale
* 2017-11-13 ~ Speed up and slow down controls
* 2017-11-13 ~ Create your own fly through paths and can be replayed


### COR Core



### CRD ~ Duplicate Coordinates

* 2018-03-08 ~ Combine with duplicate adjacent / R12
* 2018-03-04 ~ Currently only identifies surfaces with identical coordinates
	* Upgrade so identifies any surface within another surface


### GAL ~ Gallery

* Links to more sample files
	* Where to find more?
* Credits to sources of files


### GBV ~ gbXML View Utilities



### GBV ~ gbXML View Utilities

* 2018-03-08 ~ Simpler loading flow


### HUD ~ Heads-up Display

* 2018-03-06 ~ Add what you see upon open depends on current window inner height
	* 2018-03-05 ~ Goal: surface + two adjacent: all visible at once
* 2018-03-06 ~ Add 'match parameters of previously selected surface' buttons
* 2018-03-04 ~ Identify adjacent spaces
* 2018-01-02 ~ Multiple types of heads-up modules with different agendas
	* Show space names at cursor locations
* 2018-01-02 ~ Add in-world placard at cursor location
* @@@ 2018-03-04 ~ Use main style sheet?


### REP ~ Reports

* 2018-03-08 ~ Search for spaces
* 2018-03-04 ~ Export spaces and storeys as gbJSOM. .RAD files etc
* 2017-12-08 ~ Michal: Is there any chance to almost replicate in storey view - floor plans with space name and number << Theo: probably good to wait until we can save data
* 2018-02-26 ~ Next and previous buttons to navigate through storeys, surfaces, spaces etc
* 2018-02-26 ~ Surfaces, Spaces: checkbox for auto-zooming
* @@@ 2018-02-26 ~ Better telltale size for small surfaces


### SAV ~ Save Changes

* 2018-03-05 ~ Add pretty print to output file
* 2018-03-05 ~ Add ability to add/merge changes
* @@@ 2018-03-04 ~ Add user surface defined colors
* 2018-03-04 ~ Add user defined inserts
* 2018-03-04 ~ Add user-defined settings such as view point
* 2018-03-04 ~ Add default UI parameters


### SET ~ Settings

* @@@ 2018-03-08 ~ fix Sectioning issues
* Add ( random? ) colors by space
* 2017-12-07 ~ Michal: Set smallness size for tiny spaces and tiny surfaces
* Better lights and shadows


### THR ~ Three.js

* 2018-03-08 ~ Simpler loading flow


### TMP ~ Templates

* 2018-03-04 ~ Use main style sheet?


***

## Other Bits and Pieces


### Main Read Me (this file )

* 2018-03-04 ~ Finish merging Change Log into Version Read Me


### Sun Range

* Add to R12?


### Screen Capture

* Add to R12?
* 2018-01-01 ~ Much better control over the camera


### Export gbXML files

* 2018-02-25 ~ View gbXML source code
* 2017-12-15 ~ Theo: export selected spaces or zones to gbxml?
* 2017-12-10 ~ Michal: Export gbJSON
* 2017-12-02 ~ Michal: Add ability to edit and save gbXML files

Will most likely build upon

* [create exportable buildings]( https://github.com/ladybug-tools/spider/tree/master/cookbook/07-create-exportable-buildings )


## Things you could do

* Help make an NPM for gbXML Viewer
* Help translate
* Help design and build test scripts


***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>

