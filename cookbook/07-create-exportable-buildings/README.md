<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://www.ladybug.tools/spider/#cookbook/07-create-exportable-buildings/README.md "View file as a web page." ) </span>


# [create exportable buildings Read Me]( #README.md )


<iframe src=http://www.ladybug.tools/spider/cookbook/07-create-exportable-buildings/create-exportable-buildings.html width=100% height=600px ></iframe>
_txt_
<span style="display: none" >Iframes are not viewable in GitHub source code view</span>

## Full Screen: [create exportable buildings]( http://www.ladybug.tools/spider/cookbook/07-create-exportable-buildings/create-exportable-buildings.html )

## Full Screen: [sample gbXML file viewer]( http://www.ladybug.tools/spider/cookbook/07-create-exportable-buildings/test-gbxml-files/gbxml-viewer.html )


## Concept

Export generated 3D building data to a gbXML file

* Select a building footprint and pre-determined parameters
* Generate and view a JSON file with building data
* Generate, view and export a gbXML fie with the building data
* Designed to help build test cases

## To Do

* 2017-11-23 ~ Generate buildings via and API and/or location.hash parameters



## Links of Interest


## Change Log


### 2017-11-26 ~ Theo

* Calculating and adding openings as meshes
	* Still have issues exporting the data to gbXML
* Added preliminary Space and Zone elements to export function
* Code clean-up


### 2017-11-25 ~ Theo

* Exporting exterior walls, overhangs and fins with point/vertices sequence so that things appear in 3D view and in gbXML viewer
	* Creating geometry using BufferGeometry.setFromPoints << learned a new trick here
* Add gbXML sample file viewer

### 2017-11-24 ~ Theo

16:07
R1.2
* Numerous export gbXML fixes
	* Can now export files that are readable by gbXML Viewer


### 2017-11-23 ~ Theo

10:30

11:31
* Add resize 3D view window
16:52
* PolyLoop/Coordinates are a WIP


### 2017-11-22 ~ Theo

* Exports all the surfaces
* Prettier gbXML
* Lacks adjacencies
* Lacks coordinates

### 2017-11-22 ~ Theo

* First commit
* Exports ceilings and interior wals
* Creates JSON
* Creates gbXML
* Prettifies gbXML

***


# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>