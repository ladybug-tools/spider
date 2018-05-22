<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page](http://www.ladybug.tools/spider/index.html#gbxml-viewer/r13/gv-iss-issues/README.md "View file as a web page." ) </span>
<input type=button onclick="window.location.href='https://github.com/ladybug-tools/spider/blob/master/gbxml-viewer/r13/gv-iss-issues/README.md'";
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' >

# r13 Issues Module Read Me

<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/gbxml-viewer/r13/gv-iss-issues/gv-iss.html width=100% height=400px >Iframes are not displayed on github.com</iframe>


## Full screen test script: [gbXML Viewer Issues]( http://www.ladybug.tools/spider/gbxml-viewer/r13/gv-iss-issues/gv-iss.html )


## Concept / Features

Being able to view gbXML data in interactive 3D is certainly a step in a good direction. An even better idea is to be able to view the issues that are preventing the export from a CAD file to be loaded by an energy analysis application.

Recent releases of the Viewer are identifying typical errors.

### Features

* Identify and locate issues within gbXML files
	* Surfaces that have duplicate adjacent spaces
	* Surfaces that have identical coordinates
	* Surfaces that have no cad object ids
		* Select ID by smart search
		* Reports number found
		* Displays attribute data
		* Zoom into selected element
	* Surfaces that are tiny
		* Select ID by smart search
		* Reports number found
		* Displays attribute data
		* Displays surface height, width and area
		* Zoom into selected element
	* Surfaces that contain other surfaces or overlap
		* Currently turned off because uses much time and has found none so far
		* Work-in-progress
	* Surfaces that have vertices very close together
		* Select ID by smart search
		* Reports number found
		* Displays attribute data
		* Zoom into selected element
		* Identifies vertex IDs that are close and displays the distance apart
	* Identify
		* Openings with more that four vertices
		* Surfaces that have an incorrect number of adjacent spaces
		* Surfaces that are mis-identified as to being interior or exterior surfaces

## Wish list

* Add locate surfaces with openings that overlap
* 2018-03-04 ~ Currently only identifies surfaces with identical coordinates
	* Upgrade so identifies any surface within another surface

## Issues



## Links of Interest



## Change Log


### 2018-05-22 ~ Theo

R13.5
* Undefined CAD Object IDs
	* Delete second 'zoom' button
	* Add 'toggle all undefined button'
	* Popup
		* Add un-check and check all buttons
		* Add input for user-defined CAD object type
	* Updating changes and updating surfaces sort of working
	* Many minor fixes.
* R13 Duplicate Adjacent Space
	* First pass at building popup window

Many undocumented updates in the past few days

### 2018-05-18 ~ Theo

R13.22
* Add first pass at general checkup

### 2018-05-17 ~ Theo

R13.21
* Metadata Issues panel: add ability to supply missing attributes
* Duplicate coordinates panel: add ability to delete all duplicates
* Undefined CAD Object IDs panel: add ability to add definitions

### 2018-05-12 ~ Theo

R13.17
* Add button with link to source code in readme
* Add link to read me to menu panel

Done long ago
* 2017-12-07 ~ Michal: Set smallness size for tiny spaces and tiny surfaces
* 2018-03-08 ~ Combine with duplicate adjacent / R12

### 2018-05-11 ~ Theo

R13.17
* Add webinar text


### 2018-04-20 ~ Theo

* Add metadata check
* Add surface type, opening type and adjacent space checks
* Fixes to invalid elements ongoing


### 2018-04-01 ~ Theo

R13
* First commit
* Reduce dependencies


### 2018-03-18 ~ Theo

R12.2
* Code starting to work
	* Add duplicate adjacent spaces
	* Add duplicate surfaces

### 2018-03-08 ~ Theo

* First commit


***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>



