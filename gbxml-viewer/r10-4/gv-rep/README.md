<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/r10/gbxml-viewer10-04-reports/README.md "View file as a web page." ) </span>

# gbXML Viewer10 Reports Read Me


<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/gbxml-viewer/r10/gbxml-viewer10-04-reports/test-gbxml-viewer10-reports.html width=100% height=400px >Iframes are not displayed on github.com</iframe>


## Full screen test: [Test gbXML Viewer10 Reports]( http://www.ladybug.tools/spider/gbxml-viewer/r10/gbxml-viewer10-04-reports/test-gbxml-viewer9-reports.html )


## Concept

From Wikipedia: [XML]( https://en.wikipedia.org/wiki/XML )

> In computing, Extensible Markup Language (XML) is a markup language that defines a set of rules for encoding documents in a format that is both human-readable and machine-readable.

The issue is that gbXML files may be huge and analyzing the data can be tricky.

### Mission

* Create text reports of data embedded in gbXML files
* Toggle the display of 3D surfaces based on user input
* Create detailed interactive reports of issues discovered.


### Features

#### Campus Location

* If latitude and longitude are provided, link to call for a Google map is displayed

#### Spaces

* Lists all spaces
* Button to view only Surfaces linked to given shape


## Wish list / To Do

* See main [read me]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/README.md )
* 2018-02-26 ~ Next and previous buttons to navigate through storeys, surfaces, spaces etc
* 2018-02-26 ~ Surfaces, Spaces: checkbox for auto-zooming
* 2018-02-26 ~ Better telltale size for small surfaces
## Issues



## Change Log

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



