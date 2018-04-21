<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page](http://www.ladybug.tools/spider/index.html#gbxml-viewer/r13/gv-iss-issues/README.md "View file as a web page." ) </span>

# r13 gbXML Viewer Issues Read Me


<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/gbxml-viewer/r13/gv-iss-issues/gv-iss.html width=100% height=400px >Iframes are not displayed on github.com</iframe>


## Full screen test script: [gbXML Viewer Issues]( http://www.ladybug.tools/spider/gbxml-viewer/r13/gv-iss-issues/gv-iss.html )


## Concept / Features

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
	* Surfaces that have vertices very close togther
		* Select ID by smart search
		* Reports number found
		* Displays attribute data
		* Zoom into selected element
		* Identifies vertex IDs that are close and displays the distance apart

## Wish list

* Identify
	* Openings with more that four vertices
	* Surfaces that have an incorrect number of adjacent spaces
	* Surfaces that are mis-identified as to being interior or exterior surfaces
	* Surfaces with openings that overlap

## Issues



## Links of Interest



## Change Log


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



