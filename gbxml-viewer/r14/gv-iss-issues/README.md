<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page](http://www.ladybug.tools/spider/index.html#gbxml-viewer/r14/gv-iss-issues/README.md "View file as a web page." ) </span>

<div><input type=button onclick="window.location.href='https://github.com/ladybug-tools/spider/blob/master/gbxml-viewer/r14/gv-iss-issues/README.md'";
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>

# [R14 'Aragog' gbXML Viewer ~ ISS Issues Read Me]( #gbxml-viewer/r14/gv-iss-issues/README.md )

<!--
<iframe class=iframeReadMe src=https://www.ladybug.tools/spider/gbxml-viewer/r14/gv-iss-issues/gv-tmp.html width=100% height=400px >Iframes are not displayed on github.com</iframe>

## Full screen test script: [ISS Issues]( https://www.ladybug.tools/spider/gbxml-viewer/r14/gv-iss-issues/gv-tmp.html )
-->

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

* 2018-07-27 ~ Theo ~ Inclusion check: add progress indicator
* 2018-05-25 ~ Theo ~ Undefined CAD Object IDs > Add 'check only Air' button
* 2018-05-25 ~ Theo ~ Undefined CAD Object IDs > Add line that edits all selected with one input box
* 2018-05-23 ~ Theo ~ Popup windows > Add buttons to make checked items visible and to zoom in to seleted items
* 2018-05-23 ~ Theo ~ add colored options to left menu to indicate membership in a set of surfaces
* Add locate surfaces with openings that overlap
* 2018-03-08 ~ Michal: sort the adjacent spaces / by size

Inclusions
* 2018-07-25 ~ Theo ~ Update the inclusions algorithm so it uses world coordinates



## Issues



## Links of Interest



## Change Log


### 2018-07-27 ~ Theo

* Inclusion check *beginning* to work as desired
	* Underway: 2018-03-04 ~ Currently only identifies surfaces with identical coordinates
		* Upgrade so identifies any surface within another surface

### 2018-07-25 ~ Theo

* Fix general check issue

### 2018-06-20 ~ Theo

ISS14.0
* Metadata issues now report 0 missing after fix is done
* Add release numbering to ISS
* Add release number to title for question mark in ISS details summary
* Add missing CAD Ids to general check
* Fix Opening Type Invalid issues
* Fixes to Undefined CAD opbect IDs / but workflow needs more work
* Passes jsHint

### 2018-06-19 ~ Theo

* Adds  number of fixes

### 2018-06-14 ~ Theo

R14.2
* First commit

***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>



