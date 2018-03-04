<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/r11/gv-set/README.md "View file as a web page." ) </span>

# gbXML Viewer Settings Read Me


<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/gbxml-viewer/r11/gv-set/gv-set.html width=100% height=400px >Iframes are not displayed on github.com</iframe>


## Full screen test script: [gbXML Viewer10 Settings]( http://www.ladybug.tools/spider/gbxml-viewer/r11/gv-set/gv-set.html )


## Concept

* Update a number of viewing parameters that control the display of the gbXML Viewer.

## Features

* Set colors to random, Phong default, normal or default material
* Toggle background gradient
* Toggle wireframe mode
* Draw surface normals ~ only that ones that are currently visible
* Toggle axes, grid, ground
	* Adjust height levels of grid and ground
* Toggle scene rotation
* Toggle camera Ortho
* Opacity slider for entire model

## Wish list

* Too many items to list
* 2018-02-17 ~ Split into settings and views
	* Separate View menu
		* Explodes
		* Sections
		* Ortho view
		* Multiple renderers?

## Issues

* 2018-02-24 ~ Ortho Camera does not toggle
* 2018-02-24 ~ Exploded view plus minus buttons

## To Do for test file


## Change Log

See also main gbXML Viewer read me file


### 2018-03-04 ~

* Tighten up the menu
* Add section view
> _Work-in-progress. To get a feeling: With default model in view, click 'toggle section view' button then set 'rotate section...' to -27._


### 2018-03-03 ~ Theo

R11
* Add explode by storeys

### 2018-02-27 ~ Theo

R10.9
Settings
* Explode view with minus, reset and plus buttons

### 2018-02-25 ~ Theo

R10.7
* making more vars name space friendly

### 2018-02-24 ~ Theo

R10.4


### 2018-02-16 ~ Theo

R10


### 2018-02-13 ~ Theo

* Settings:
	* Explode view beginning to operate as desired.
	* Still much to do to improve the user experience
	* Reload web page required to fully reset view.

### 2018-01-02 ~ Theo

* R9 updates

### 2017-12-17 ~ Theo

* Toggle ground and toggle Grid
	* Resets with each new model
	* Autot-positioned at bounding box minimum
	* Buttons added to increase or decrease of height level
* Toggle surface normals
	* Resets with each new model
* Add toggle shade and shadows
* Add explode view horizontal and vertical
	* First pass / still many issues / but will eventually be lots of fun


### 2017-12-10 ~ Theo

* Add draw normals only if element is visible
	* Use Reports > Surfaces to toggle element visibility then use this command


### 2017-12-04 ~ Theo

* Add more materials
* Reorder items, drop edges as covered elsewhere
* Gradient inside iframe only
* Update Test
* Test loads script on load

### 2017-12-02 ~ Theo

* update readme
* Test file updates
	* link to github
	* file reader button
	* Sample load URL by location.hash link
	* load resport menu on start up
* Settings.js
	* Moving to surfaceMeshes and toggling Edges over wirframe


### 2017-12-01 ~ Theo

* Bring over to R8

### 2017-11-16 ~ Theo

* First commit



***


# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>



