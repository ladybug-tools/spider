<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page](http://www.ladybug.tools/spider/gbxml-viewer/index.html#README.md "View file as a web page." ) </span>

# gbXML Viewer Release 10 Read Me


<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/gbxml-viewer/r10/gbxml-viewer10-01-core/gbxml-viewer10-core.html width=100% height=400px onload=this.contentWindow.controls.enableZoom=false; >Iframes are not displayed on github.com</iframe>
_[gbXML Viewer10 Core]( gbxml-viewer10-01-core/gbxml-viewer10-core.html ) ~ click the 'view model' button in left menu to view full screen_

## Full screen: [gbXML Viewer Release 10 App]( http://www.ladybug.tools/spider/gbxml-viewer/ )


## Full screen: [gbXML Viewer Release 10 Core]( http://www.ladybug.tools/spider/gbxml-viewer/r10/gbxml-viewer10-01-core/gbxml-viewer8-core.html )

The Ladybug Tools/Spider [gbXML]( http://www.gbxml.org/ ) Viewer is a folder of scripts that enable you to see text data files for buildings as a full 3D renderings.

The read me file with full details is in the main gbXML Viewer folder just above here.

***




## 1. gbXML Viewer10 Core

This folder contains the basic script that does all the hard work of opening gbXML data files, reading the data and displaying the data in 3D using the [Three.js]( https://threejs.org ) JavaScript library.

### [gbXML Viewer10 Core Read Me]( #../gbxml-viewer10-01-core/README.md )

### Full screen:  [gbXML Viewer10 Core]( #../gbxml-viewer10-01-core/gbxml-viewer10-core.html )

You may use this script as a template for building our own apps

### Full screen:  [Test gbXML Viewer10 Core]( ../gbxml-viewer10-01-core/test-gbxml-viewer10-core.html )

You may uses this script to verify that the code works in an iframe and that menus work as intended

***

_The following contains a number of links that update the menu and load external JavaScript on the fly at runtime._

_At the moment, all scripts are also in the menu. They only work when the full gbXML Viewer app is running_

_In the future, however, the hope is to be able to add special links using easy-to-edit Markdown files that cause special or additional features to load and run._


## 2. gbXML Viewer10 Gallery

There are a few locations on the web that allow access to sample gbXML files that you may use for experimentation.

Click on any of the links below to load menus that will list each of the available files.

<a href = "JavaScript:( function(){
		const script = document.head.appendChild( document.createElement( 'script' ) );
		script.src = '../gbxml-viewer10-02-gallery/gbxml-viewer10-gallery-gbxml.js';
} )()" >
gbXML Sample Files on GitHub</a>

<a href= "JavaScript:( function(){
		const script = document.head.appendChild( document.createElement( 'script' ) );
		script.src = '../gbxml-viewer10-02-gallery/gbxml-viewer10-gallery-spider-build-well.js';
} )()" >
Ladybug Tools/Spider Build Well on GitHub</a>

<a href=
"JavaScript:(
	function(){
		const script = document.head.appendChild( document.createElement( 'script' ) );
		script.src = '../gbxml-viewer10-02-gallery/gbxml-viewer10-gallery-spider-viewer-samples.js';
} )()" >
Ladybug Tools/Spider gbXML Viewer sample files on GitHub</a>



## 3. Heads-Up Display

### Full screen: [Test gbXML Viewer10 Heads-Up Display]( ../gbxml-viewer10-03-heads-up-displa/test-gbxml-viewer10-heads-up-displa.html )

<a href= "JavaScript:( function(){
		const script = document.head.appendChild( document.createElement( 'script' ) );
		script.src = '../gbxml-viewer10-03-heads-up-display/gbxml-viewer10-heads-up-display.js';
} )()" >
Ladybug Tools/Spider gbXML Viewer Heads-Up Display</a>


## 4. Settings

### Full screen: [Test gbXML Viewer10 Settings]( ../gbxml-viewer10-04-settings/test-gbxml-viewer10-settings.html )

<a href = "JavaScript:( function(){
	const script = document.head.appendChild( document.createElement( 'script' ) );
	script.src = '../gbxml-viewer10-04-settings/gbxml-viewer10-settings.js';
} )()" >
gbXML Viewer Settings</a>


## 5. Reports

### Full screen: [Test gbXML Viewer10 Reports]( ../gbxml-viewer10-05-reports/test-gbxml-viewer10-reports.html )

<a href = "JavaScript:( function(){
	const script = document.head.appendChild( document.createElement( 'script' ) );
	script.src = '../gbxml-viewer10-05-reports/gbxml-viewer10-reports.js';
} )()" >
gbXML Viewer Reports</a>



### 6. First Person camera


### 7. Sun Path / Analemmas

* 2018-01-01 ~ Theo: Multiple suns


### 8. Screen Capture

* 2018-01-01 ~ Much better control over the camera


### 10. Sun Range


### 10. Save



### 11. Editor

### [gbXML Viewer10 Core Editor Dev]( http://www.ladybug.tools/spider/gbxml-viewer/r10/gbxml-viewer10-11-editor/gbxml-viewer10-core-editor-dev.html )


## Templates

### Full screen: [Test gbXML Viewer10 Templates]( ../gbxml-viewer10-templates/test-gbxml-viewer10-template.html )

<!--
<a href= "JavaScript:( function(){
		const script = document.head.appendChild( document.createElement( 'script' ) );
		script.src = '../gbxml-viewer10-templates/gbxml-viewer10-template.js';
} )()" >
gbXML Viewer Template</a>

-->




### Export gbXML files

Not yet started

* 2017-12-15 ~ Theo: export selected spaces or zones to gbxml?
* 2017-12-10 ~ Michal: Export gbJSON
* 2017-12-02 ~ Michal: Add ability to edit and save gbXML files

Will most likely build upon

* [create exportable buildings]( https://github.com/ladybug-tools/spider/tree/master/cookbook/07-create-exportable-buildings )



***

## Change Log



## 2018-01-02 ~ Theo

* Fixing and updating all the R9 module read me files

### 2018-01-01 ~ Theo

* R9.0
* Redesigned user experience
	* All modules may loaded and used simultaneously
	* Switch between text and 3D without losing your place
* Has all the modules of R8
* Add screen capture modules

Done
* 2017-12-10 ~ Michal: can we switch off shadows?
* 2017-12-06 ~ Add slider to move ground up or down

### 2017-12-17 ~ Theo

* Settings
	* Toggle ground and toggle Grid
		* Resets with each new model
		* Auto-positioned at bounding box minimum
		* Buttons added to increase or decrease of height level
	* Toggle surface normals
		* Resets with each new model
	* Add toggle shade and shadows
	* Add explode view horizontal and vertical
		* First pass / still many issues / but will eventually be lots of fun


### 2017-12-16 ~ Theo

* Add 'Robust' Core version


### 2017-12-15 ~ Theo

* Sun Path / Analemma 3D
	* Mostly functioning as intended
	* Minor issues still to be fixed


### 2017-12-13 ~ Theo

* Read Me files
	* Add many links and update text throughout
* Sample files
	* Files renamed in a consistent manner
	* Read me added
* View Updates
	* View update issues a blog posts
* Reports
	* Duplicate CAD IDs sorted and display next to each other
	* Every set of duplicates CAD IDs has its own toggle view button
	* Same toggle view button added to other reports


### 2017-12-12 ~ Theo

* Reports
	* Updated to button tag
	* Storeys: display number and IDs of spaces
	* Surfaces
		* Better handling of on/off toggles
		* Add 'all visible' button
	* Duplicate Coordinates
		* Add visibility toggle for all duplicates
		* Add Space button to toggle view of space
	* Duplicate Adjacencies
		* Add visibility toggle for all duplicates
		* Add length and width of element
	* Tiny Surfaces
		* Add length and width of element
	* Invalid Adjacencies << new item
		* Checks for multiple adjacencies in objects that should only have a single adjacency
* Settings
	* Add toggle buttons for surfaces/edges/all
	* Update colors
	* Colors of duplicates etc unchanged when toggling other color settings
* Many other minor fixes and code clean-up

### 2017-12-10 ~ Theo

R8.10
* Add 'first person' camera
* Add beginning of drawing an analemma
* Exposure type material colors updated
* Update draw normals only if element is visible
	* Use Reports > Surfaces to toggle element visibility then use this command
* Update to 'toggle camera ortho'


Done
* 2017-12-07 ~ Michal: Toggle for Ortho camera
* 2017-12-10 ~ Michal: Update color choices
* 2017-12-10 ~ Michal: can we show normals for selected items only?


### 2017-12-08 ~ Theo

R8.9
* Core
	* Add 'reset view' calls createReport()
* HUD
	* Add toggle button
	* Toggle off when new file loaded

R8.8
* Core
	* Add 'reset view' button resets background, camera, material colors
* Reports
	* Add toggle visibility for each surface type
	* Add display zone count and names per storey

Note
'reset view' button not currently working in reports, so has been disabled for the moment

Done
* 2017-12-07 ~ Michal: toggle for HUD
* 2017-12-08 ~ Michal: reset view: includes background gradient , materials colors or camera ortho
* 2017-12-08 ~ Michal: Storey ability to hide roofs or floor to better see layout
* 2017-12-08 ~ Michal: can we show number of zones per storey?


### 2017-12-07 ~ Theo

R8.7
* Templates: code clean-up
	* Add drag and drop capability
	* Better selection of sample files
* Settings:
	* Add set color by exposure type
	* Add drag and drop capability
	* Better selection of sample files
* Reports
	* Add drag and drop capability
	* Better selection of sample files
	* Add view storey
	* Add is a space has an 'InteriorFloor' or 'SlabOnGrade' or 'RaisedFloor' or 'UndergroundSlab' then zoom into that space
* App2
	* Add drag and drop capability

Done

* 2017-12-01 ~ Load files via drag and drop
* 2017-12-02 ~ Add test file??
* 2017-12-01 ~ Add choice to display in right-side menu

### 2017-12-06 ~ Theo

App2 R8.5
12:44
* Fixed: reset view not resetting surfaces visible
* Settings: add toggle grid
* Settings: add toggle ground
* App2: add footer

* 2017-12-01 ~ Add a 'ground' that can receive shadow

8.6
21:32
* Fix some of the reset view issues
* Highlight all duplicate adjacencies in red
* Add better spacing between duplicate adjacencies log
* Tiny surface telltale now has opacity - so you can see very tine things inside the telltale
* location hash and splash screen working together better
* Add button to turn off heads-up - not yet a nice toggle

### 2017-12-05 ~ Theo

R8.5 ~ new user interface
* Everything in left menu


### 2017-12-04 ~ Theo

Little fixes and new features everywhere

* Add buttons to heads-up display
* Add choices to Settings
* Add surface edges and rest buttons to core
* 2017-12-02 ~ Michal: Zoom and center duplicate surfaces, duplicate coordinates, tiny surfaces
* 2017-12-01 ~ Add better display = none on new file loaded
* 2017-12-01 ~ Add hamburger/slider menu
* 2017-12-01 ~ Michal: Locate camera/controls target inside a given space / zoom into the space


### 2017-12-03 ~ Theo

* 2017-12-02 ~ Michal: Report and display surfaces with duplicate CAD IDs
* 2017-12-02 ~ Michal: Highlight and display tiny areas << Added Report > Tiny Surfaces

### 2017-12-02 ~ Theo

* 2017-12-01 ~ Michal: load local files via location.hash < see read me for Core module

### 2017-11-30

* First Commit

See also [R7 Read Me]( #read-gbxml/README.md ) for earlier changes

***

Below are links to prior releases. Most releases have code that is running. They are linked here to help you understand how this code has grown and morphed. And to prove to you that code is not magic, but it is the product oof human imagination.


### [gbXML Viewer R7]( http://www.ladybug.tools/spider/read-gbxml/gbxml-viewer/r7/index.html )


R6 is mostly broken and may be ignored. Perhaps the only script to consider is [gbXML Gallery]( http://www.ladybug.tools/spider/read-gbxml/gbxml-viewer/#r6/gbxml-viewer-small/gbxml-gallery.html ) where a gbXML Viewer is embedded inside a normal HTML file using an iframe.

The last full-featured demo is in R5:

### [gbXML Viewer R5]( http://www.ladybug.tools/spider/read-gbxml/gbxml-viewer/r5/index.html )


Prior to R5, release were given code names that related to peeps involved with the project. This confused peeps - especially th peeps whose names were being flaunted.


### [gbXML Viewer 2017-09-29-mostapha ]( file:///D:/Dropbox/Public/git-repos/ladybug-tools.github.io/spider/read-gbxml/gbxml-viewer/2017-09-29-mostapha/gbxml-viewer.html )


### [gbXML Viewer 2017-09-23-michal]( http://www.ladybug.tools/spider/read-gbxml/gbxml-viewer/2017-09-23-michal/index.html )


### [gbXML Viewer 2017-09-13-carmel]( http://www.ladybug.tools/spider/read-gbxml/gbxml-viewer/2017-09-13-carmel/plugins/display-gbjson.html )


### [gbXML Viewer 017-09-12-harriman]( http://www.ladybug.tools/spider/read-gbxml/gbxml-viewer/2017-09-12-harriman/select-xml/display-gbjson.html )

***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>

