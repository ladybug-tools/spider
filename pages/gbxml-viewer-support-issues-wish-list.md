
# gbXML Support, Issues, Wish List and Help Wanted

## Support

### Help

For general information, 'How do you...?' help and general questions, please post a new topic on the Ladybug Tools forum:

### [Ladybug Tools Forum / Spider Category]( http://discourse.ladybug.tools/c/spider)


### Bug Reports

For bug reports, problems with the code and wish list requests, please open an issue on GitHUb and tell us how to reproduce the problem:

### [Ladybug-Tools / Spider Issues]( https://github.com/ladybug-tools/spider/issues )

***

## Current Issues with gbXML Viewer

2018-04-11 ~ 3D Model / In-world display

When openings are being displayed with partial opacity, then surfaces behind an opening may appear to disappear> Solution: toggle the visibility of openings. This is a limitation of Three.JS and WebGL defaults and is likely to take some time to fix.




2018-04-11 ~ HUD

R12: If an elemeent has no existing CAD Object ID, then you cannot eit or add a AD Object ID. To be fixed in R13.

2018-04-02 ~ HUD

When there are duplicate surface and/or duplicate adjacent spaces, toggling the visibility of one of the items may cause both items not to be visible. Cause still being investigated.

Too often you may need to click 'all visible' to get an element to appear. The whole visible/invisible toggles thing needs cleaning up


2018-03-23 ~ HUD / spaces not updating properly

The 'reset view' button in the in-world ( center of screen) menu may not always perform a complete reset of all viewing parameters. You may need to reload the web page in order to start. An easy way to to this is to click the gbXML Viewer title in the main menu.


***

## To Do / Wish List Items

* 2018-04-19 ~ Theo ~ Add a 'separate' button that adds a distance between any duplicate items - enable both to be clickable and viewable
* 2018-04-19 ~ Theo ~ Display issue text in HUD for any surface that has an issue. has had its color changed
* 2018-04-19 ~ MD ~ HUD ~ Add Flip surface to reverse a normals.
* 2018-04-19 ~ MD ~ Settings ~ Toggle Normals, Exposure View ... introduce two colors on both side of surface. It will be grey on opposite side to normal and green as we have now on side facing normals to allow easy identification.
* 2018-04-17 ~ MD ~ Issue ~ Allow multiple selection or all delete of duplicate surfaces.
* 2018-04-17 ~ MD ~ Report ~ Add Report to display to show internal surfaces that have only one adjacency.  They must have two.
* 2018-04-17 ~ MD ~ Report ~ Add Report to display overlapping surfaces with not the same shape or partially overlap.
* 2018-04-02 ~ MD/Theo HUD / Heads-Up Display ~ Select from CAD Object types not from entire list
* 2018-04-02 ~ MD/Theo ~ Add volume calculations
* 2018-04-02 ~ MD/Theo ~ Delete selected coordinates in surfaces and openings and save edits
* 2018-03-29 ~ MD ~ Right Menu ~ CADObjectID drop down - display only Unique Names
* 2018-03-29 ~ MD ~ Report ~ Add Display Exposed by Sun (so we can see which surfaces are hit by sun)
* 2018-03-29 ~ MD ~ Settings ~ Add Material settings color by Space
* 2018-03-29 ~ MD ~ Report ~ Display Openings (Windows, Doors, Rooflights)
* 2018-03-29 ~ MD ~ Report ~ Display Openings (Windows, Doors, Rooflights) in Groups per CADObject ID same way we have CADObjectGroups
* 2018-03-29 ~ MD ~ Report ~ Allow Opening modification for Opening Type per CADObjectGroups: FixedWindow, OperableWindow, FixedSkylight,OperableSkylight, SlidingDoor, NonSlidingDoor, Air
* 2018-03-29 ~ MD ~ Report ~ Storeys, Spaces, Zones to be displayed and sorted by Name, not ID
* 2018-03-28 ~ MD ~ Report ~ CAD Object Groups. We want to be able modify: surface type or delete globally for all elements per displayed CAD Object Group. (ies requirement for air walls and floors)
* 2018-03-28 ~ MD ~ Report ~ Check number of verticies in Surfaces and Openings. Flag greater than 4 (e+ requirement for windows)
* Feel free to add new ideas
* Sections are based on the current set of modules
* Items are listed in alphabetical order of their three letter folder/ name-space id
* More links and details available in the [Release Read Me]( http://www.ladybug.tools/spider/#gbxml-viewer/r11/README.md )
* Completed items are documented on the release notes - which are displayd in the 'splash screen' that appears in the pop-up window when you first open the Viewer

### Dev ~ Items not specific to any module

For R12

* New color scheme palette
* Link to [gbXML User Guide]( http://www.ladybug.tools/spider/read-gbxml/gbxml-user-guide/gbxml-user-guide.html )

Style Sheet

* 2018-03-04 ~ More CSS vars

view-updates.html

* Shows posts in issues that have been closed



### ADJ ~ Duplicate Adjacents

* 2018-03-08 ~ Michal: sort the adjacent spaces / by size
* 2018-03-08 ~ Combine with duplicate coordinates and put into Issues button area

### ANA ~ Sun Path / Analemma

* 2018-01-01 ~ Theo: Multiple suns
* 2018-02-21 ~ Add automatic addition of ground


### APP ~ Application Menu

* 2018-03-04 ~ Random model on start-up?


### CAM ~ First Person camera

* 2018-03-04 ~ Avatar talks / Identifies current space and direction
* 2017-11-13 ~ Choose whether you fly through walls or bump into them
* 2017-11-13 ~ Better adjustment of movement speed depending on scale
* 2017-11-13 ~ Speed up and slow down controls
* 2017-11-13 ~ Create your own fly through paths and can be replayed


### COR Core

* 2018-02-18 ~ Menus remember their position from session to session


### CRD ~ Duplicate Coordinates

* 2018-03-08 ~ Combine with duplicate adjacent / R12
* 2018-03-04 ~ Currently only identifies surfaces with identical coordinates
	* Upgrade so identifies any surface within another surface


### GAL ~ Gallery

* Links to more sample files
	* Where to find more?
* Credits to sources of files


### GBV ~ gbXML View Utilities



### GBX ~ gbXML Utilities

* 2018-03-08 ~ Simpler loading flow


### HUD ~ Heads-up Display

* 2018-03-06 ~ Add what you see upon open depends on current window inner height
	* 2018-03-05 ~ Goal: surface + two adjacent: all visible at once
* 2018-03-06 ~ Add 'match parameters of previously selected surface' buttons
* 2018-03-04 ~ Identify adjacent spaces
* 2018-01-02 ~ Multiple types of heads-up modules with different agendas
	* Show space names at cursor locations
* 2018-01-02 ~ Add in-world placard at cursor location
* 2018-03-04 ~ Use main style sheet? << there seem to be some curious issues with doing so


### REP ~ Reports

* 2018-03-08 ~ Search for spaces
* 2018-03-04 ~ Export spaces and storeys as gbJSOM. .RAD files etc
* 2017-12-08 ~ Michal: Is there any chance to almost replicate in storey view - floor plans with space name and number << Theo: probably good to wait until we can save data
* 2018-02-26 ~ Next and previous buttons to navigate through storeys, surfaces, spaces etc
* 2018-02-26 ~ Surfaces, Spaces: checkbox for auto-zooming
* @@@ 2018-02-26 ~ Better telltale size for small surfaces


### SAV ~ Save Changes

* 2018-03-09 ~ Add save level of a ground plane
* 2018-03-05 ~ Add pretty print to output file
* 2018-03-05 ~ Add ability to add/merge changes
* @@@ 2018-03-04 ~ Add user surface defined colors
* 2018-03-04 ~ Add user defined inserts
* 2018-03-04 ~ Add user-defined settings such as view point
* 2018-03-04 ~ Add default UI parameters


### SET ~ Settings

* Add ( random? ) colors by space
* 2017-12-07 ~ Michal: Set smallness size for tiny spaces and tiny surfaces
* Better lights and shadows


### THR ~ Three.js

* 2018-03-08 ~ Simpler loading flow


### TMP ~ Templates




***

### Other Wish List Bits and Pieces


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


## Help Wanted / Things you could do

* Help make an NPM for gbXML Viewer
* Help translate into more languages
* Help design and build test scripts
