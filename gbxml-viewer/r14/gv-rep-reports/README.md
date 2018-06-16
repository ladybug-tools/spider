<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page](http://www.ladybug.tools/spider/index.html#gbxml-viewer/r14/gv-rep-reports/README.md "View file as a web page." ) </span>

<div><input type=button onclick="window.location.href='https://github.com/ladybug-tools/spider/blob/master/gbxml-viewer/r14/gv-rep-reports/README.md'";
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>

# [R14 'Aragog' gbXML Viewer ~ REP Reports Read Me]( #gbxml-viewer/r14/gv-rep-reports/README-template.md )

<!--
<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/gbxml-viewer/r14/gv-rep-reports/gv-tmp.html width=100% height=400px >Iframes are not displayed on github.com</iframe>
## Full screen test script: [REP Reports]( http://www.ladybug.tools/spider/gbxml-viewer/r14/gv-rep-reports/gv-tmp.html )
-->


## Concept

From Wikipedia: [XML]( https://en.wikipedia.org/wiki/XML )

> In computing, Extensible Markup Language (XML) is a markup language that defines a set of rules for encoding documents in a format that is both human-readable and machine-readable.

The issue is that gbXML files may be huge and analyzing the data can be tricky.

The purpose of this module is to provide you with any and all useful data embedded in a gbXML file - even very big files with just two or three clicks.

### Reporting not editing
Currently there are zero editing capabilities in this panel. All current editing capability is in right-hand menu.

The intent is that you are not having to switch back and forth between left and right menus to do the editing. You can control the display in the left and edit on the right without having too much clicking.

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

* 2018-03-08 ~ Search for spaces
* 2018-03-04 ~ Export spaces and storeys as gbJSON or .RAD files etc
* 2017-12-08 ~ Michal: Is there any chance to almost replicate in storey view - floor plans with space name and number << Theo: probably good to wait until we can save data
* @@@ 2018-02-26 ~ Better telltale size for small surfaces
* 2018-03-31 ~ We now do three specialty reports: 'Surfaces by Type + Exposed to Sun', 'Openings by Type' and 'Cad Object Groups'. Should there be others?



## Issues



## Links of Interest



## Change Log

### 2018-06-09 ~ Theo

R14.2
* Reports panel: mostly good enough for now

### 2018-06-08 ~ Theo

R14.2
* Reports panel code beginning to look quite clean


### 2018-06-06 ~ Theo

R14
* First commit

***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>



