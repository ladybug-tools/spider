<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/README.md "View file as a web page." ) </span>


# gbXML Viewer Read Me

<iframe class=iframeReadMe src=https://rawgit.com/ladybug-tools/spider/master/gbxml-viewer/r11/gv-thr/gv-thr.html  width=100% height=400px >Iframes are not displayed on github.com</iframe>

_gbXML Viewer Core ~ the basic HTML, CSS and JavaScript used by all add-on scripts_

### Welcome [TAS]( http://www.edsl.net/main/ ) users!


## Full screen stable release (fingers-crossed) R11.12.5: <http://www.ladybug.tools/spider/gbxml-viewer>

### Full screen stable release R11.12.4: <br><http://www.ladybug.tools/spider/gbxml-viewer/r11-12-4/gv-app/gv-app.html>

#### Full screen development very pre-release R12: <br><http://www.ladybug.tools/spider/gbxml-viewer/dev>

<!--
## Full Screen pre-release R11: <http://www.ladybug.tools/spider/gbxml-viewer/dev>
## Latest News: [View Updates]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/view-updates.html )

* News on what's happening with the gbXML Viewer.

## Full Screen early version: [gbXML Viewer R3]( http://www.ladybug.tools/spider/read-gbxml/gbxml-viewer/2017-09-23-michal/index.html )

-->



## Must watch and thumbs-up YouTube video:
## [Ladybug Tools / Spider / gbXML Viewer ~ User Guide]( https://youtu.be/2QHrbuKIkdY )

* Michal's must watch video ~ updated 2018-03-11
* Tania Becker commented: 'Fascinating video. It's well explained and easy to understand even for a lay person. It sparkles!'



***

### The concept / The desired pattern:

## Knowledge embedded in gbXML files is viewable, analyzable and editable in real-time interactive 3D with free, open-source web apps

### The current issues / The problems to be solved


[Green Building XML (gbXML)]( https://en.wikipedia.org/wiki/Green_Building_XML ) as described by its authors:

> gbXML allows disparate 3D [building information models (BIM)]( https://en.wikipedia.org/wiki/Building_information_modeling ) and architectural/engineering analysis software to share information with each other

The current set of [BIM authoring and CAD software tools]( http://www.gbxml.org/Software_Tools_that_Support_GreenBuildingXML_gbXML ) for gbXML include various proprietary, closed-source applications that you must download and install.

GbXML being open source, it would also be nice to be able to view gbXML files in 3D in your browser with no fees and with open source code.

The Ladybug Tools/Spider gbXML Viewer scripts are first steps toward making gbXML viewers readily available.

### Mission

gbXML Viewer is a collection of modular experiments for viewing, examining and validating gbXML files in 3D in your browser.

Objectives

* Loads almost instantly
* Non-modal interface
* Fast effective workflow: get things done faster
* Full interactive 3D

### Vision

* Helping students, clients and non-AEC peeps gain access BIM data easily, quickly and freely
* Facilitating the transfer of data between design programs and analysis programs


***

## gbXML Viewer Features

Open, view and investigate gbXML files in 3D in your browser with free, open source entry-level JavaScript.

### User experience

* Runs in your browser on computer, tablet and phone
* Highly adjustable workspace
* Movable, sliding resizable menus
* View the full gamut of data typically available in a gbXML file
* View gbXML files in 3D
* Full zoom, pan and rotate

### SET Module ~ Settings and Viewing Menu

* Adjust a wide variety of viewing parameters
* Control the appearance of the surfaces
	* Set default, random, Phong default, normal or exposure-type material to all surfaces
	* Update opacity slider
* Control the appearance of the scene
	* Toggle shadows, edges, surface normals
	* Toggle wireframe
	* Toggle gradient background
* Control the content of the scene
	* Toggle axes, grid and ground
* Control the behavior of the scene
	* Toggle scene rotation
	* Toggle perspective and orthographic views
	* Set exploded 3D views
	* Set section Views _work-in-progress_


### REP Module ~ Reports / Data Menu
* View all project textual metadata embedded in gbXML files
* Link to Google map focussed on project latitude and longitude
* Buttons to highlight surfaces, spaces, stories and zones
	* Individually
	* By surface type
	* By individual CAD object IDs
	* By groups of CAD Objects
* Toggle visibility of all items
* Zoom to selected surface or space


### REP Module ~ Reports / Issue tracking Menu

* Identify and inspect programmatically:
	* Duplicate surfaces
	* Surfaces with duplicate adjacent spaces
	* Multiple elements with identical CAD Object ID
	* Tiny surfaces and tiny spaces

Note these REP menu items will evolve into their own ISS issues module in a future release

### HUD Module ~ Heads-up Display / Editing

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



### CAM Module ~ First person camera Menu
* Optional first person camera enables model fly-through
	* Fly through and around your models.
	* Use cursor keys or WASD keys.
	* Click on the icons at bottom of your screen
	* Use mouse, menu or cursor keys to control full range of motion
	* 3D avatar guides you through space

### ANA Module ~ Sun Path / Analemmas Menu
* Sun path diagrams with analemmas
	Uses Ladybug Tools / Spider Solar Calculator to position Sun correctly for lat/lon at any month, day and hour
* Screen capture to video
	* Currently only on previous release

### GAL Module / Sample gbXML File galleries
* Uses GitHub API to obtain directory listings and load gbXML files in several selected repositories
	* gbXML.org sample files
	* Spider Build Well project files
	* Various files used for testing

Behind the Scenes

### APP/ THR / COD / GBX ~ the engines that make it all work

* All plain vanilla client-side JavaScript
* Built over the Three.js WebGL JavaScript library
* Uses Showdown to turn Markdown into HTML
* Every menu has own JavaScript file, HTML test file and read me
* Every menu has its own name space and only loads when first called
* Creates gbJSON data for easier processing
* All free and open source and hosted on GitHub




## Things you can do using this script

* Use one/two/three fingers to rotate/zoom/pan the display in 3D
	* Or left/scroll/right with your pointing device
* Click the three bars( 'hamburger menu icon' ) to slide the menu in and out
* Click the [Stats]( https://github.com/mrdoob/stats.js/ ) box in the footer to toggle FPS / MS / MB views
* Press Control-U/Command-Option-U to view the source code
* Press Control-Shift-J/Command-Option-J to see if the JavaScript console reports any errors



***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>

