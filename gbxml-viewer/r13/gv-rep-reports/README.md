<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/r13/gv-rep-reports/README.md "View file as a web page." ) </span><input type=button onclick=window.location.href='https://github.com/ladybug-tools/spider/blob/master/gbxml-viewer/r13/gv-set-settings/README.md';
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>

# r13 Reports Module Read Me


<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/gbxml-viewer/r13/gv-rep-reports/gv-rep.html width=100% height=400px >Iframes are not displayed on github.com</iframe>


## Full screen test script: [gbXML Viewer Reports]( http://www.ladybug.tools/spider/gbxml-viewer/r13/gv-rep-reports/gv-rep.html )


## Concept

From Wikipedia: [XML]( https://en.wikipedia.org/wiki/XML )

> In computing, Extensible Markup Language (XML) is a markup language that defines a set of rules for encoding documents in a format that is both human-readable and machine-readable.

The issue is that gbXML files may be huge and analyzing the data can be tricky.

The purpose of this module is to provide you with any and all useful data embedded in a gbXML file - even very big files with just two or three clicks.

Currently there are zero editing capabilities in this panel. All current editing capability is in right-hand menu.

The intent is that you are not having to switch back and forth between left and right menus to do the editing. You can control the display in the let and edit on the right without having too much clicking.

### Mission

* View all project textual metadata embedded in gbXML files
* Create text reports of all data of interest embedded in gbXML files
* Toggle the visibility of individual and groups of elements
* Zoom the view to display selected elements or groups of elements
* Identify patterns in the data,
* Visualize patterns in the data by displaying tables of results in 3D
* Surfaces, spaces, zones and openings are view-able as table data and sets of 3D surfaces
* Each type of element is cataloged according to all of its attributes

### Features

* Identify and locate all surfaces individually
	* Reports number of surfaces found
	* Select surface by typing ID with smart search or by scrolling through list with cursor keys
		* Selected surface is highlighted in the 3D model as fast as you can scroll
	* For each surface you can toggle visibility and zoom in to selected surface
	* All available attribute data for each surface is displayable
* Identify and locate all spaces
	* Reports number of spaces found
	* Select space by typing ID with smart search or by scrolling through list with cursor keys
		* Selected space is highlighted in the 3D model as fast as you can scroll
		* For each space you can toggle visibility or zoom in to selected space
		* All available attribute data for each space is displayable
* Identify and locate all storey data
	* Reports number of storeys found
	* Select storey by typing ID with smart search or by scrolling through list with cursor keys
	* Selected storey is highlighted in the 3D model as fast as you can scroll
	* All available attribute data for each storey is displayable
* Identify and locate all zone data
	* Basic attribute information for zones is available
* Identity and locate all openings
	* Reports number of openings found
	* Select openings by typing ID with smart search or by scrolling through list with cursor keys
	* Selected openings is highlighted in the 3D model as fast as you can scroll
	* All available attribute data for each openings is displayable
* Identify groups of surfaces by type
	* Reports number of types found
	* Highlight selected group
	* Turn visibility on and off for each type
	* Basic stats displayed
	* Handy make all visible button
* Highlight groups of CAD Objects
	* Reports number of groups found
* Identify and locate all CAD Object IDs
	* Reports number of storeys found
* All available attributes of the following elements are displayable
	* Root gbXML element
	* Campus
	* Campus Location
		* If latitude and longitude are provided then a link to call for a Google map is displayed
	* Campus Building
	* Documentation (if available)


## Wish list / To Do

* 2018-05-11 ~ Better openings by type handling once we have click to select the opening enabled
* 2018-05-07 ~ Theo ~ Add 'Edit the Surface' panel - as in right menu???
* 2018-03-31 ~ We now do three specialty reports: 'Surfaces by Type + Exposed to Sun', 'Openings by Type' and 'Cad Object Groups'. Should there be others?
* 2018-02-26 ~ Better telltale size for small surfaces

## Issues



## Change Log

2018-05-11 ~ Theo

R13.17
* Add button with link to source code in readme
* Add link to read me to app menu
* Add webinar text to read me
* Surfaces by Type
	* 'eye' buttons toggle visually
	* Surface type buttons display the color of the type they toggle

Done
* 2018-04-16 ~ Theo ~ continue init menu cleanup


Done in prior releases
* 2018-02-26 ~ Next and previous buttons to navigate through storeys, surfaces, spaces etc
* 2018-02-26 ~ Surfaces, Spaces: checkbox for auto-zooming
* 2018-03-29 ~ MD ~ Report ~ Add Display Exposed by Sun (so we can see which surfaces are hit by sun)
* 2018-03-29 ~ MD ~ Report ~ Storeys, Spaces, Zones to be displayed and sorted by Name, not ID
* 2018-03-08 ~ Search for spaces
* 2018-03-04 ~ More CSS vars

### 2018-04-21 ~ Theo

* R13 Report beginning to look good

### 2018-04-20 ~ Theo

* Add all elements automatically visible on change


### 2018-04-16 ~ Theo

R13.5
* Good clean-up after yesterday's many updates

### 2018-04-12 ~ Theo

R13.4
REP / Reports Module
* Better handling of zones
* More code streamlining

### 2018-04-11 ~ Theo

R13.3
REP / Reports Module
* Element attributes starting to have buttons to update the display
	* Buttons for: ID, Surface type, Adjacent spaces, CAD object ID, Space and Zone
* Spaces report has zoom button

### 2018-04-03 ~ Theo

R13.2
REP / Reports Module
	* All functions either set or get
	* All functions follow clearer naming structure

Done: 2018-04-02 ~ Update all get functions so they return objects

### 2018-04-02 ~ Theo

* Rename from rep2 to rep throughout
* Editing function names to match more closely to their use
* Add Openings by Type panel
	* Done: 2018-04-01 ~ Theo ~ Add 'Openings by Type' report

### 2018-04-01 ~ Theo

R13.0
* Add vertices count for openings

### 2018-03-31 ~ Theo

R13.0
* Complete re-write
* Much more abstracted, complete, simplified and automated
* Adds 'Exposed to Sun' button



***


# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>



