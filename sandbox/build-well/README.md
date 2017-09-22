<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://ladybug-tools.github.io/spider/#sandbox/build-well/README.md "View file as a web page." ) </span>


[Build Well Read Me]( #README.md )
====
_A well for building well._

<iframe class=iframeReadMe src=http://ladybug-tools.github.io/spider/sandbox/build-well/index.html width=100% height=600px onload=this.contentWindow.controls.enableZoom=false; ></iframe>

## Full Screen: [Build Well]( http://ladybug-tools.github.io/spider/sandbox/build-well/index.html )

## Features

* Create simple 3D building models by adjusting a variety of numerical parameters


## To Do

* 2017-09-21 ~ Color, shade and shadow
* 2017-09-21 ~ Export data to CSV file
* 2017-09-21 ~ Export to Open Studio JSON schema
* 2017-09-21 ~ Floor area to update according to shape parameters
* 2017-09-20 ~ User can update size of grid


## Issues

* 2017-09-21 ~ Open file often fails
* 2017-09-21 ~ Finish add data reporting parameters, eg openings, adjacent buildings
* 2017-09-21 ~ Match building shapes to Ben's spec
* 2017-09-21 ~ See if perimeter depth diagonals actually add any pertinent information
* 2017-09-21 ~ Figure out overhangs

## Change Log


### 2017-09-21 ~ Theo


* 11:30 ~ start r3. working on ui/css
* 12:33 ~ UI cleaned up. No more details/summary. all html files controlled from container file
	* start fixing bugs in adjacent-buildings.html
* 13:26 ~ most everything good in AB and G. Added floors, roof and internal walls to box shape. Now star L Shape

* 15:15 ~  R4 started. Box shape in its own file. Will try to replicate with L Shape
* 18:57 ~ BS * LS both operating quite well

abbreviations relate to names of HTML files; ab = adjacent-buildings.html


### 2017-09-20 ~ Theo

* 14:56 ~  Start R2
* Rebuilding in 'everything is a recipe' style. Using mnu-template & test-threejs basic
* 16:15 ~ 'Site Context' looking good
* 17:47 ~ adjacent buildings.html looking good
* 22:23 ~ Geometry.html is working
* 22:56 ~ Currently three separate standalone scripts
	* Makes testing and coding and understanding what's going on a bit easier
	* Currently the data is not shared between the scripts. The liaison should happen in the next release
* Also coming soon will the internal walls, adjusting window sizes and the different shapes

### 2017-09-18 

### Buildings Menu

* Three buildings created by default
	* Add and delete buildings: future release
* Save file
	* Saves buildings as a single 3D object
	* All data stored in the 3D models
	* File format is standard Three.js JSON
	* Seems to be working just fine
	* Many more options will become available
* Open file
	* Works barely OK
	* Building data fields are updated but edits do yet update geometry
	* L Shape models not being loaded. Try using JSON loader instead of Object loader

### Site Context Menu

* When played with after a fresh reload, mostly works just fine
* Needs error-checking and more user entry safeguards
* As mentioned above, editing is broken when opening a file


### Geometry Menu

* Mostly unfinished, only a few items work
	* Changing floor height updates some of the other fields
	* Footprint shape draws a partially parameterized L Shape - very badly
* A work in progress


### 2017-09-17 ~ Theo

* First commit
