<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/r13/gv-rep-reports/README.md "View file as a web page." ) </span>

# r13 gbXML Viewer Reports Read Me


<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/gbxml-viewer/r13/gv-rep-reports/gv-rep.html width=100% height=400px >Iframes are not displayed on github.com</iframe>


## Full screen test script: [gbXML Viewer Reports]( http://www.ladybug.tools/spider/gbxml-viewer/r13/gv-rep-reports/gv-rep.html )


## Concept

From Wikipedia: [XML]( https://en.wikipedia.org/wiki/XML )

> In computing, Extensible Markup Language (XML) is a markup language that defines a set of rules for encoding documents in a format that is both human-readable and machine-readable.

The issue is that gbXML files may be huge and analyzing the data can be tricky.

The purpose of this module is to provide you with any and all useful data embedded in a gbXML file - even very big files with just two or three clicks.

### Mission

* Create text reports of data embedded in gbXML files
* Toggle and zoom the display of 3D surfaces based on user input
* Create detailed interactive reports of issues discovered.


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

* 2018-04-01 ~ Theo ~ Add 'Openings by Type' report
* 2018-03-31 ~ When searching a selection list by typing, only display the list of relevant possibilities
* 2018-03-31 ~ Any of the attributes could be buttons. Are there attributes where buttons would be really useful.
* 2018-03-31 ~ We now do two specialty reports: 'Surfaces by Type + Exposed to Sun' and 'Cad Object Groups'. Should there be others?


## Issues



## Change Log


###2018-03-31 ~ Theo

R13.0
* Complete re-write
* Much more abstracted, complete, simplified and automated
* Adds 'Exposed to Sun' button

### 2018-03-23 ~ Theo

R12.8
* Adds better Zones display

### 2018-03-18 ~ Theo

R12.2
* Reports2 now in operation / needs testing

### 2018-03-03 ~ Theo

R11
* CAD Object ID Groups sorted

### 2018-02-26 ~ Theo

R10.8

### 2018-02-24 ~ Theo

R10.4

### 2018-02-16 ~ Theo

R10

### 2018-01-27 ~ Theo

* Fix no data for single space issue
* Fix incorrect space numbering

### 2018-01-02 ~ Theo

* R9 updates

### 2017-12-02 ~ Theo

* Generally: move to show edges not wireframe
	* make things visible and invisible over changing opacity
* Now shows all surfaces connected to a space
* Now have surfaceMeshes and surfaceEdges
* Add Tiny Spaces and Tiny Surfaces to menu. Latter not yet wired up



### 2017-12-01 ~ Theo

* Bring into R8

### 2017-11-28 ~ Theo

Many fun improvements

* Add details tag to the various sections
* Add buttons to toggle the display of different surface types
* Add buttons to toggle display of duplicate adjacencies

The code is very, very messy.

### 2017-11-26 ~ Theo

Looking at recursive traversal techniques. Probably not worth it. Better to handles each JSON object on its own terms,




***


# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>



