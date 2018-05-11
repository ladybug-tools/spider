<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/r13/gv-set-settings/README.md "View file as a web page." ) </span><input type=button onclick=window.location.href='https://github.com/ladybug-tools/spider/blob/master/gbxml-viewer/r13/gv-set-settings/README.md';
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>

# r13 Settings Module Read Me


<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/gbxml-viewer/r13/gv-set-settings/gv-set.html width=100% height=400px >Iframes are not displayed on github.com</iframe>


## Full screen Settings test: [gbXML Viewer Settings]( http://www.ladybug.tools/spider/gbxml-viewer/r13/gv-set-settings/gv-set.html )


## Concept

* Update a number of parameters to control the display and rendering of the gbXML file as a 3D model.
* Viewing gbXML data in 3D gives you a lot more options for displaying gbXML elements using informative methods.
* Update the materials and colors for surfaces
	- Choosing random colors helps you identify how a wall might be composed of multiple gbXML surfaces
	- Choosing a solid shade helps you see shadows better
	- Exposure type surfaces help you see what surfaces face outdoors

## Features

* Adjust a wide variety of viewing parameters
* Control the appearance of the surfaces
	* Set default, random, Phong default, normal or exposure-type material to all surfaces
	* Update opacity slider
* Control the appearance of the scene
	* Toggle shadows, edges, surface normals
	* Toggle wireframe
	* Toggle gradient background
* Control the content of the scene
	* Toggle display of axes, grid and ground
	* Grid and ground located a bottom of exterior walls by default / location is adjustable
* Control the behavior of the scene
	* Toggle scene rotation
	* Toggle perspective and orthographic views
	* Set exploded 3D views
		* As a whole
		* By the storey
	* Set section views along Xm Y and Z axes


## Wish list

* 2018-05-11 ~ Theo ~ Add separate opening opacity slider?
* 2018-05-11 ~ Theo ~ Add display skybox with patches set appropriate EPW data
* 2018-05-11 ~ Theo ~ add slider for amount of exploding by storey
* 2018-05-11 ~ Theo ~ Add cut sections along multiple axes at same time
* 2018-05-11 ~ Theo ~ Add adjust rotation angle of section cuts around Z-axes
	* Enabling cutting sections of models that are not aligned perfectly north/south
* 2018-04-02 ~ Theo ~ Select color themes and other parameters such as adding of ground planes from a list of color theme files


## Issues




## To Do for test file


## Change Log

See also main gbXML Viewer read me file


### 2018-05-11 ~ Theo

R13.17
* Swap in GBI.setPanelShowHide
* Add link to read me
* 2018-05-05 ~ Theo ~ Sections work at any angle << Added Y and Z
* 2018-05-05 ~ Theo: Explode by storeys moves model inappropriately << working better

### 2018-03-27 ~ Theo

R13
* First commit

### 2018-03-27 ~ Theo

R12.11
* update readme

### 2018-03-04 ~

* Tighten up the menu
* Add section view
> _Work-in-progress. To get a feeling: With default model in view, click 'toggle section view' button then set 'rotate section...' to -27._

Done
* 2018-02-24 ~ Ortho Camera does not toggle
* 2018-02-24 ~ Exploded view plus minus buttons

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



