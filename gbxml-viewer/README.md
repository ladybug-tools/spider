<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/README.md "View file as a web page." ) </span>


# gbXML Viewer Read Me

<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/gbxml-viewer/r9/gbxml-viewer9-01-core/gbxml-viewer9-core.html  width=100% height=400px >Iframes are not displayed on github.com</iframe>
_gbXML Viewer R9 Core ~ the basic HTML, CSS and JavaScript used by all add-on scripts_

## _This document will be split into two: a read me file and an introduction file for the Viewer_

## Full screen: [gbXML Viewer9]( http://www.ladybug.tools/spider/gbxml-viewer/ )

## Latest News: [View Updates]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/view-updates.html )

* News on what's happening with the gbXML Viewer.


***

## The Concept: Knowledge embedded in gbXML files is viewable, analyzable and editable with free, open-source web apps

### The issues / The problems to be solved


About [Green Building XML (gbXML)]( https://en.wikipedia.org/wiki/Green_Building_XML ):

> gbXML allows disparate 3D [building information models (BIM)]( https://en.wikipedia.org/wiki/Building_information_modeling ) and architectural/engineering analysis software to share information with each other

The current set of [BIM authoring and CAD software tools]( http://www.gbxml.org/Software_Tools_that_Support_GreenBuildingXML_gbXML ) for gbXML include various proprietary, closed-source applications.

GbXML being open source, it would also be nice to be able to view gbXML files in 3D in your browser with no fees and with open source code.

The Ladybug Tools/Spider gbXML Reader scripts are first steps toward making gbXML viewers readily available.

### Mission

gbXML Viewer is a variety of modular experiments for viewing, examining and validating gbXML files in 3D in your browser.

Below there are links to some of the latest files. R8 is that latest release and is still a work-in-progress.


### Vision

* Helping students, clients and non-AEC peeps gain access BIM data easily, quickly and freely


### Features

* View gbXML files in 3D or as text in your browser
	* Create gbJSON files for easier processing
* Full zoom, pan and rotate
* Run on computer, tablet and phone
* Adjust a wide variety of viewing parameters
* View the full gamut of data typically available in a gbXML file
* Open files via URL or open file dialog
* All free and open source and hosted on GitHub



## Things you can do using this script

* Use one/two/three fingers to rotate/zoom/pan the display in 3D
	* Or left/scroll/right with your pointing device
* Click the three bars( 'hamburger menu icon' ) to slide the menu in and out
* Click the [Stats]( https://github.com/mrdoob/stats.js/ ) box in the footer to toggle FPS / MS / MB views
* Press Control-U/Command-Option-U to view the source code
* Press Control-Shift-J/Command-Option-J to see if the JavaScript console reports any errors

### View Sample gbXML Files

The [gbXML Sample Files folder]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/gbxml-sample-files/README.md ) has links to a number of files you may view.



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



***

## Modules

GbXML Viewer is a collection of small JavaScript files that work together to enable the viewing of gbXML files.

The goals for the files include:

* Files are no more than a few hundred lines
* Code is simple, plain-vanilla JavaScript
* Every JavaScript files has an accompanying standalone HTML file for testing purposes

The various modules are described below.

### Core

#### [gbXML Viewer9 Core Read Me]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/r9/gbxml-viewer9-01-core/README.md )

#### Full Screen: [gbXML Viewer9 Core]( http://www.ladybug.tools/spider/gbxml-viewer/r9/gbxml-viewer9-01-core/gbxml-viewer9-core.html )

#### Full screen test: [Test gbXML Viewer9 Core]( http://www.ladybug.tools/spider/gbxml-viewer/r9/gbxml-viewer9-01-core/test-gbxml-viewer9-core.html )

* View gbXML files in 3D in your browser.
* Open files using File Reader or by URL in location.hash
* Base script used by all the other gbXML Viewer modules


### Gallery

#### [gbXML Viewer9 Gallery Read Me]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/r9/gbxml-viewer9-02-gallery/README.md )

#### Full screen test: [Test gbXML Viewer9 Gallery]( http://www.ladybug.tools/spider/gbxml-viewer/r9/gbxml-viewer9-02-gallery/test-gbxml-viewer9-gallery.html )

* Use the GitHub API to obtain directory listings of file names
* Display list of file names as links to source
* Clicking links displays
	* The source
	* View the file in this gallery window
	* View the file full screen in its own window
		* Link may be use to embed file in other app or HTML pages



### Settings

#### [gbXML Viewer9 Settings Read Me]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/r9/gbxml-viewer9-04-settings/README.md )

#### Full screen test: [Test gbXML Viewer9 Settings ]( http://www.ladybug.tools/spider/gbxml-viewer/r9/gbxml-viewer9-04-settings/test-gbxml-viewer9-settings.html )

* Set random, phong default, normal or default material
* Toggle background gradient
* Toggle wireframe
* Draw surface normals
* Toggle axes
* Toggle scene rotation
* Set Camera Ortho
	* Not yet a toggle/Reload page to return to a perspective view
* Opacity slider



### Reports

#### [gbXML Viewer9 Reports Read Me]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/r9/gbxml-viewer9-05-reports/README.md )

#### Full screen test: [Test gbXML Viewer9 Reports]( http://www.ladybug.tools/spider/gbxml-viewer/r9/gbxml-viewer9-05-reports/test-gbxml-viewer9-reports.html )

* Create text reports of data embedded in gbXML files
* Toggle the display of 3D surfaces based on user input
* Create detailed interactive reports of issues discovered.



### Camera - First Person

#### [gbXML Viewer9 Camera - First Person Read Me]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/r9/gbxml-viewer9-06-camera-first-person/README.md )

#### Full screen test: [Test gbXML Viewer9 camera first-person]( http://www.ladybug.tools/spider/gbxml-viewer/r9/gbxml-viewer9-06-camera-first-person/test-gbxml-viewer9-camera-first-person.html )

* Fly through and around your models. Use cursor keys or WASD keys. Click on the icons at bottom of your screen
* This is a new and experimental feature.


### Sun Path / Analemma

#### [gbXML Viewer9 Analemma Read Me]( http://www.ladybug.tools/spider/#gbxml-viewer/r9/gbxml-viewer9-07-analemma/README.md )

#### Full screen test: [Test gbxml Viewer9 Analemma]( http://www.ladybug.tools/spider/gbxml-viewer/r9/gbxml-viewer9-07-analemma/test-gbxml-viewer9-analemma.html )

See also [Analemma 3D]( http://www.ladybug.tools/spider/index.html#analemma3d/README.md )



### Sun Range

#### [gbXML Viewer9 Sun Range Read Me]( http://www.ladybug.tools/spider/#gbxml-viewer/r9/gbxml-viewer9-09-sun-range/README.md )

#### Full screen test: [Test gbxml Viewer9 Sun Range]( http://www.ladybug.tools/spider/gbxml-viewer/r9/gbxml-viewer9-09-sun-range/test-gbxml-viewer9-sun-range.html )

See also [Analemma 3D]( http://www.ladybug.tools/spider/index.html#analemma3d/README.md )



### Screen Capture


#### [gbXML Viewer9 Screen Capture Read Me]( http://www.ladybug.tools/spider/#gbxml-viewer/r9/gbxml-viewer9-08-screen-capture/README.md )

#### Full screen test: [Test gbxml Viewer9 Screen Capture]( http://www.ladybug.tools/spider/gbxml-viewer/r9/gbxml-viewer9-08-screen-capture/test-gbxml-viewer9-screen-capture.html )

* Create animated GIFs


### Bl.ocks Edition

View as [Bl.ocks]( https://bl.ocks.org/ )

> Bl.ocks (pronounced “Blocks”) is a simple viewer for sharing code examples hosted on GitHub Gist.

* <http://bl.ocks.org/theo-armour/163685de4d1fdacd70b2ffd446e8c874>

View as [Gist]( https://help.github.com/articles/about-gists/ )

Gists are a great way to share your work. You can share single files, parts of files, or full applications. You can access gists at https://gist.github.com.

* <https://gist.github.com/theo-armour/163685de4d1fdacd70b2ffd446e8c874/edit>



***

## To Do / Wish List Items

Feel free to add new ideas

### Core

* Better lights and shadows
* Section views


### Heads-up Display

* 2017-12-07 ~ Theo: Add better size adjustment to text box
* 2017-12-01 ~ What data should be included in heads-up display?
* 2017-12-02 ~ Michal: Add filters to ignore shade surfaces. Or perhaps only display for certain surface types


### Settings

* 2017-12-07 ~ Michal: Set smallness size for tiny spaces and tiny surfaces


### Reports

* 2017-12-08 ~ Michal: Is there any chance to almost replicate in storey view - floor plans with space name and number << Theo: probably good to wait until we can save data
* 2017-12-07 ~ Theo: Refresh reports each time a new model is loaded
* 2017-12-02 ~ Michal: Do a better job of displaying/reporting duplicates
* 2017-12-02 ~ Michal: Highlight and display surfaces that are inside larger surfaces


### First Person camera


### Sun Path / Analemmas

* 2018-01-01 ~ Theo: Multiple suns


### Screen Capture

* 2018-01-01 ~ Much better control over the camera


### Templates


### Export gbXML files

Not yet started

* 2017-12-15 ~ Theo: export selected spaces or zones to gbxml?
* 2017-12-10 ~ Michal: Export gbJSON
* 2017-12-02 ~ Michal: Add ability to edit and save gbXML files

Will most likely build upon

* [create exportable buildings]( https://github.com/ladybug-tools/spider/tree/master/cookbook/07-create-exportable-buildings )

***

## Change Log

2018-02-09 ~ Theo

* R9.9
* App: Add sucky iOS iframe auto-resize workaround
* HUD:
	* Enable draggable div
	* Fix CASObjectId issue

2018-02-08 ~ Theo

* R9.8a
* HUD: Add many new buttons to display
	* ID
	* Type
	* CAD Object ID
	* Spaces
	* Storeys
	* Visibility
* Core: Add checks for duplicate extra vertices in gbXML file vertices data


### 2018-02-07 ~ Theo

* R9.7
* HUD
	* Add toggle surface type button
	* Add display CAD Object button
	* Add toggle visibility button
	* Add all visible button
	* Duplicate coordinates now highlighted in yellow


### 2018-02-02 ~ Theo

* R9.6a
* Core: add  gbxml var
* Cure: clear divLog with reset view
* Reports: fix issues with storey and space readout in core
* Help text added to Reports menu.
* Save File: first commit
* App: add save file button

### 2018-01-27 ~ Theo

* R9.5
* Core: drop createReport
* Reports Fix no data for single space issue
* Reports: Fix incorrect space numbering
* App: Add onloadThreejs to clean up reports

### 2018-01-17 ~ Theo

* App R9.3
* Add Octocat link to App menu
* Change default read me from release read me to main read me
* Read me iframe link from App to Core
* Add link to release red me on menu
* Add Sun Range links to read me


### 2018-01-02 ~ Theo

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

