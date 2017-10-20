<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://ladybug-tools.github.io/spider/#build-well/README.md "View file as a web page." ) </span>


[Build Well Read Me]( #README.md )
====
_A well for building well._

<iframe class=iframeReadMe src=http://ladybug-tools.github.io/spider/build-well/index.html width=100% height=600px ></iframe>

## Full Screen latest release: [Build Well]( http://ladybug-tools.github.io/spider/build-well/index.html )


## Concept

Create 3D building data in a variety of shapes parametrically and export in gbXML format

## Features

This project contains a number of demo examples in the form of a programmer's 'cookbook'. The hope is that this code enables you to:

* Create simple 3D building models by adjusting a variety of numerical parameters
* Create a site context by adding, editing, saving or deleting simple forms to represent adjacent structures
* Update building models by selecting parameters from menus
* Create text reports for the geometry
* Adjust a variety of display settings
* Benefit from every menu item is its its own standalone, easy-peasy HTML file test case 


## Previous Releases

_We often think of software of software just appearing as if by magic. The reality is that software takes ongoing human effort. Click the links below and watch the progression._

* 2017-10-16 [Build Well R10]( http://ladybug-tools.github.io/spider/build-well/r10/build-well.html )
* 2017-10-14 [Build Well R9]( http://ladybug-tools.github.io/spider/build-well/r9/build-well.html )
* 2017-10-10 [Build Well R8]( http://ladybug-tools.github.io/spider/build-well/r8/build-well.html )
* 2017-09-29 [Build Well R7]( http://ladybug-tools.github.io/spider/build-well/r7/build-well.html )
* 2017-09-26 [Build Well R6]( http://ladybug-tools.github.io/spider/build-well/r6/build-well.html )
* 2017-09-24 [Build Well R5]( http://ladybug-tools.github.io/spider/build-well/r5/build-well.html )
* 2017-09-21 [Build Well R4]( http://ladybug-tools.github.io/spider/build-well/r4/build-well.html )
* 2017-09-21 [Build Well R3]( http://ladybug-tools.github.io/spider/build-well/r3/build-well.html )
* 2017-09-20 [Build Well R2]( http://ladybug-tools.github.io/spider/build-well/r2/build-well.html )
* 2017-09-17 [Build Well R1]( http://ladybug-tools.github.io/spider/build-well/r1/build-well.html )


## Current Issues

* 2017-10-14 ~ HUD not displaying when cursor over The Building 
* 2017-10-14 ~ After selecting different menus, some number settings no longer appear in the left menu. When this happens, any further edits cause the model to disappear
 


## Naming Considerations

* To help you _build well_
* A _well_ of data to help you _build_
* Primary instigator _@bwelle_

## Coding Methodology

See [Single Model Multiple Menus]( https://ladybug-tools.github.io/spider/#sandbox/single-model-multiple-menu/README.md ) for demos and discussion on how this cookbook is being develpoed.

## To Do Generally

* 2017-10-14 ~ How about a logo?
* 2017-10-14 ~ Add permalinks / RESTful interaction
* 2017-10-14 ~ Decide what to do when distance between external walls is less than twice the minimum perimeter depth
* 2017-10-14 ~ Organize nice sets of color schemes for the various surface types
* 2017-10-14 ~ Seamless transitions between shapes: all shapes have three lengths and widths
* 2017-10-03 ~ L Shape 1: how to recalculate length (X1) after you update the area?
	* Spreadsheet with all the calculations would be helpful

### index.html / Build Well parent file

* 2017-10-14 ~ Improve small screen operation


### build-well-threejs.html

* 2017-10-02 ~ Add ortho camera?

### mnu-adjacent-buildings.html

* 2017-10-14 ~ Highlight The Building when selected
* 2017-09-22 ~ Allow any and all buildings to have shape parameters?
* 2017-10-02 ~ Add multi-line select for shape selection?

### mnu-box-shape.html

* 2017-10-14 ~ add individuated floors and ceilings
* 2017-10-14 ~ Revisit space id naming

### mnu-ell-shape-one.html

* 2017-10-14 ~ add individuated floors and ceilings
* 2017-10-14 ~ Revisit space id naming

### mnu-settings-site.html

* 2017-09-22 ~ geocoder input
* 2017-09-22 ~ Add shade/shadow toggle
* 2017-09-22 ~ Add solar calculator
* 2017-09-21 ~ Color, shade and shadow

### mnu-settings-building.html

* 2017-09-22 ~ Add XYZ placards once we start having sufficient other inworld text needs
	* Inworld text is a whole thing in itself. Add in only when very necessary
* 2017-10-14 ~ Toggle visibility of interior walls
* 2017-10-14 ~ Opacity Slider
* 2017-10-14 ~ Overhangs color different than color of walls etc
* 2017-10-14 ~ Show Perimeter Depth arrows

### mnu-hud.html

* 2017-09-30 ~ Add selecting, moving and editing buildings via pointing device

### mnu-settings-spaces.html

* 2017-10-14 ~ Round the number
* 2017-10-14 ~ Update building data when you select a space type
* 2017-10-14 ~ Highlight the space in 3D when you select a space in the menu 

### mnu-gbxml-export.html

* 2017-10-11 ~ Export diagonal walls - yes
* 2017-10-14 ~ Export individuated, manifold spaces
* 2017-10-05 ~ Export fin data
* 2017-10-05 ~ Enable changing building orientation

### mnu-real-time-report.html

* 2017-10-14 ~ Grab the data in real-time from the 3d model currently in play

### mnu-settings-zone.html

* in the pipeline

### mnu-settings-building.html

* for opacities, materials: in the pipeline


## Change Log



### 2017-10-19 ~ Theo

11:14
* Continue individuated floor and ceiling
12:00
* mnu-hud.html
	* Mostly working as intended
* R12 started
* mnu-box-shape.html
	* In progress  2017-10-14 ~ add individuated floors and ceilings
* mnu-ell-shape-one.html
	* In progress 2017-10-14 ~ add individuated floors and ceilings

### 2017-10-18 ~ Theo

11:00
* build-well-threejs.html
14:12
* * mnu-gbxml-export.html
	* Overhangs appear to be exporting OK
	* New method of going from local coordinates to world coordinates is great

    vertex.applyMatrix4( overhang.matrixWorld );

* build-well-threejs.html
	* started add individuated floor & ceiling surfaces

Done more or less

* 2017-10-05 ~ Export overhang data

### 2017-10-17 ~ Theo


10:42
* many read me updates
	* fix 'building' replaced by object booboo
13:58
* mnu-shape-ell-one.html
	* Working somewhat
	* Final version awaiting a full spec
* mnu-gbxml-export.html
	* Better text display
	* Variables now connected to mnu-settings-site.html
* mnu-gbxml-export.html
	* Many fixes, works with new geometry format
	* One zone for every space
	* 2017-10-17 ~ Don't export ground face of adjacent buildings
	* Started process to export overhangs. 
	* @@Note gbXML files not loading into viewer because of as yet incomplete data
* build-well-threejs.html
	* Start process of exporting shade surfaces


### 2017-10-16 ~ Theo

Another big update. Last time it was the menus, this time it was the geometry handling.

The whole package now has quite a few loose ends. The next few pint releases should begin to clean things up a bit

Coming up next is

* Bring the L Shape up to the level of the Box Shape
* Work on Zones and Spaces menus
* Work on Anton's WWR menu
* Separate ft/in and metric menus. Also multiple languages maybe
* gbXML export needs rotation and overhangs 


17:13
* R11
* New geometry handling process
* 'The Building' is always in shape 
* Kicks off as a Box Shape from get go
	* Created as a JavaScript object that exists throughout session
	* Geometry can come and go, but defaults and most variables persist
	* Should make it easy to switch between shapes
* Site Settings
	* Now includes Location and Units details
	* Units not yet wired up to other menu

Mostly dealt with
* 2017-10-14 ~ Open with Box Shape already in place
* 2017-09-22 ~ Add lat & Lon

### 2017-10-15 ~ Theo

11:38
* R10.1 to GitHub ~ Fix gbXML export issue


### 2017-10-14 ~ Theo

11:58
* Add mnu-template as file and to menu
* Add groundHelper and toggle
* Added credits page - with first set of credits
	* Credits in menu moved to credits page
* Add the start of a 'real time report' page: menu + markdown + html
* Add start of a Settings Spaces menu - with spaces types etc
* Folder moved from sandbox folder to main Spider folder

Mostly dealt with
* 2017-10-10 ~ Menu interaction that does not revert scene and buildings to defaults. Selecting various, Adjacent buildings menu and Shapes menus, etc should maintain current set of building data
* 2017-09-29 ~ Some variables are hardwired to 'The building' string. Should be to whatever you want it to be ( & UUID ).
* 2017-09-28 ~ After going to 'read me' page, next page does not display properly - Click on title to reload the script

* 2017-09-29 ~ Add complete and current set of parameters to 'The building' object - to enable round trip with adj build menu
* 2017-10-02 ~ fix toggle edges
* 2017-10-02 ~ Ground & Helpers don't toggle after change in grid size
* 2017-10-02 ~ Add options to grid size / prevent spurious values

* Add links to credits page
* Enable viewing html & markdown without killing Three.js data


### 2017-10-13 ~ Theo

11:56
* Build Well R10
* now based on single-model-multiple-menu
* mostly all working


### 2017-10-11 ~ Theo

22:01
* Build Well R9.1
* Exports gbXML files with exterior wall surfaces with openings that render properly in Open Studio


### 2017-10-10 ~ Theo

15:56
* Build Well R9
* Box Shape now equal of L Shape
* Orientation fixed
* Code clean-up


### 2017-10-05 ~ Theo
17:19
* mnu-gbxml-export.html
	* Beginning to export quite a bit of gbXML data
	[x] 2017-10-01 ~ Export all building geometries
[x] 2017-09-30 ~ Floor area not being updated correctly

### 2017-10-03 ~ Theo

11:42
* mnu-gbxml-export.html
	* starting to have data from Surfaces with openings
* L Shape - meshes starting to have names

### 2017-10-03 ~ Theo

* bits and pieces here and there

### 2017-10-01 ~ Theo

19:20

* R8
* mnu-gbxml-export.html
	* Working gbXML export - simple models only
* mnu-box-shape.html
* mnu-shape-ell-one.html
	* Add updateMenuExtras function
	* Simplified and added more defensive code
* mnu-settings-building.html
	* Not yet wired up
* mnu-settings-site.html

### 2017-09-30 ~ Theo

13:23

* mnu-adjacent-buildings.html
	* Add oninput="validity.valid||(value='');" to length, width & height to prevent negative values
[x] 2017-09-30 ~ Funny behaviors if you play with the grid a lot << not so funny once you understand the logic that there is always a minimum based om the axis you are NOT moving along
No long relevant
* 2017-09-21 ~ Export data to CSV file
* 2017-09-21 ~ Export to Open Studio JSON schema
* mnu-box-shape.html
	* Add check validity for area, length, number of floors, height, depth, wwr, over hang > no negative numbers or text entries, only numbers within permitted range. see tooltips for acceptable values
	* Add checking for null values

### 2017-09-29 ~ Theo

14:19
* R7.1
* Numerous minor updates following bwelle suggestions
* Adds gbXML Export preliminaries

### 2017-09-28 ~ Theo

19:09

The menu system is more robust, enables the display of Markdown format files and enables switching menu items without losing data.

It will also facilitate the development and display of the JSON and gbXML export capabilities

* R7
* Menu and file handling rebuilt
	[x] 2017-09-23 ~ Better handling of data when switching tabs after a shape has been created
[x] 2017-09-21 ~ See if perimeter depth diagonals actually add any pertinent information
	* Rule of thumb: Show what you will export and no more.
	* Currently the external wall and perimeter depth walls provide sufficient data for downstream apps. No?
[x] 2017-09-21 ~ Finish add data reporting parameters, eg openings, adjacent buildings
* 2017-09-22 ~ Consider more suitable name for this menu item
* 2017-09-22 ~ Add ground that can receive shadow
* Add quite a bit of text to read me


### 2017-09-27 ~ Theo

11:22
* R6.1
* build-well.html
	* Add link to read me on menu / looked into how best to add license
	* Add three.js stats indicator
* mnu-adjacent-buildings.html: grid resize should work with negative offsets / tests ok in FF win
	* add building: the new building becomes selected automatically
* build-well-threejs.html
	* delete large center axis indicator
17:01
* mnu-shape-ell-one.html
	* geometry looking good / updates well / lacks area update calculations


Need
online gbXML validator

### 2017-09-26 ~ Theo

11:12
* R6 started
* rename three.js base file
* Site context menu now settings menu and moved to bottom / update its css
* build-well-threejs.html: add view buttons / update css / set max zoom distance
* mnu-adjacent-buildings.html: add self adjusting grid / rotation is clockwise / old-timey axis indicator: started
13:18
* mnu-shape-box.html: update calcs: area and length lead / 
	* Overhangs depicted to scale, max distance set to 10
	* Add diagonal perimeter depth walls


### 2017-09-25 ~ Theo

14:27
* R5.3
* Working on building data output - see Box Shape
* Add About with copyright and license



### 2017-09-24 ~ Theo

12:22
* R5.2
12:36
* L Shape calculations displaying numbers as expected
13:45
* L Shape walls all display as expected
* Started adding if statements to draw permimeter depth walls when logical
[x] 2017-09-22 ~ Validate all numeric entries before updating geometries < started
[x] 2017-09-21 ~ All parameters need double checking to fix broken ones < well underway

14:28
* L Shapes have overhangs - depicted in an exaggerated fashion
[x] 2017-09-21 ~ Figure out overhangs
19:18
* We can export the Build Well models as JSON files, but - it appears - the Three.js ObjectLoader cannot - yet - import them back in as 3D models. We may have to do something about this! But it may be possible to import shapes as buffer geometry. More exploration to be done.
[x] 2017-09-21 ~ Open file often fails < better to export as gbXML...


### 2017-09-23 ~ Theo

12:31
* R5.1
* Add lots of prettifying mnu-site-context.html

15:18 ~ 
* start mnu-shape-ell-one.html r2
* 16:34 ~ ell is swell. Biting the bullet. Setting Z axis as up. 
* 17:30 ~ mnu-adjacent-buildings.html is now OK with Z up
* 19:38 ~ L shape is mostly back. Both Box and L OK with Z being up
[x] 2017-09-22 ~ Toggle rotation
[x] 2017-09-22 ~ Add background color and toggle


### 2017-09-22 ~ Theo

* 10:47 ~ Start R5
* build-well.html
	* Iframe is more full screen
	* Cut out geometry and L Shape for time being: let's get Box Shape right first
* mnu-site-context.html
	* Orientation is now input type number instead of type range
	* Added updateGridSize
	[x] 2017-09-20 ~ User can update size of grid
* 13:48 ~ mnu-box-shape.html
	* All aspects of the relevant geometry may be set from this menu
	* All menu parameters interact
		[x] 2017-09-21 ~ Floor area to update according to shape parameters
	* Wall Window Ratio now operates as desired, updates model in real-time
	* Save building data to csv files using Ben's format

Questions 14:23

* Would you define or explain overhang as used in this context? Link to authoritative illustrated reference would be cool.
* Should 'The building' offset and orientation be set in it's shape menus or in the Adjacent buildings menu?
* Should 'The building' have an offset? Or should it always have its lower left corder at 0,0?
* Should orientation of 'The building' occur at its center point or its lower left corner?
* Currently building Area and Floor Area are read only and are updated whenever length, width or number of f,oors are updated. Is this satisfactory?
 

### 2017-09-21 ~ Theo


* 11:30 ~ start r3. working on ui/css
* 12:33 ~ UI cleaned up. No more details/summary. all html files controlled from container file
	* start fixing bugs in adjacent-buildings.html
* 13:26 ~ most everything good in AB and G. Added floors, roof and internal walls to box shape. Now star L Shape

* 15:15 ~  R4 started. Box shape in its own file. Will try to replicate with L Shape
* 18:57 ~ BS * LS both operating quite well

abbreviations relate to names of HTML files; ab = adjacent-buildings.html


### 2017-09-20 ~ Theo

* 14:56 ~  Start R2
* Reobject in 'everything is a recipe' style. Using mnu-template & test-threejs basic
* 16:15 ~ 'Site Context' looking good
* 17:47 ~ adjacent buildings.html looking good
* 22:23 ~ Geometry.html is working
* 22:56 ~ Currently three separate standalone scripts
	* Makes testing and coding and understanding what's going on a bit easier
	* Currently the data is not shared between the scripts. The liaison should happen in the next release
* Also coming soon will the internal walls, adjusting window sizes and the different shapes

### 2017-09-18 

### buildings Menu

* Three buildings created by default
	* Add and delete buildings: future release
* Save file
	* Saves buildings as a single 3D object
	* All data stored in the 3D models
	* File format is standard Three.js JSON
	* Seems to be working just fine
	* Many more options will become available
* Open file
	* Works barely OK
	* building data fields are updated but edits do yet update geometry
	* L Shape models not being loaded. Try using JSON loader instead of Object loader

### Site Context Menu

* When played with after a fresh reload, mostly works just fine
* Needs error-checking and more user entry safeguards
* As mentioned above, editing is broken when opening a file


### Geometry Menu

* Mostly unfinished, only a few items work
	* Changing floor height updates some of the other fields
	* Footprint shape draws a partially parameterized L Shape - very badly
* A work in progress


### 2017-09-17 ~ Theo

* First commit
