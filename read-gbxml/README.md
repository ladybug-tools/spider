<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://ladybug.tools/spider/#read-gbxml/README.md "View file as a web page." ) </span>


[Ladybug Tools > Spider > gbXML Viewer Read Me]( #README.md )
====

<iframe class=iframeReadMe src=http://ladybug-tools.github.io/spider/read-gbxml/gbxml-viewer/harriman/index.html#select-xml/display-gbjson.html width=100% height=600px onload=this.contentWindow.controls.enableZoom=false; ></iframe>

## Full Screen: [gbXML Viewer harriman]( http://ladybug-tools.github.io/spider/read-gbxml/gbxml-viewer/harriman/index.html )



## Concept

### Issue / The problem to be solved

About gbXML

> gbXML allows disparate 3D [building information models (BIM)]( https://en.wikipedia.org/wiki/Building_information_modeling ) and architectural/engineering analysis software to share information with each other

The current set of [BIM authoring and CAD software tools]( http://www.gbxml.org/Software_Tools_that_Support_GreenBuildingXML_gbXML ) for gbXML include proprietary, closed source applications.

gbXML being open source, it would be nice to be able to view gbXML files in 3D in your browser with no fees and with open source code

The Ladybug Tools Spider gbXML Reader scripts are first steps toward making gbXML viewers readily available


### Mission

* View gbXML files in 3D in your browser
* Full zoom, pan and rotate
* Run on computer, tablet and phone
* Adjust a wide variety of viewing parameters
* View the full gamut of data typically available in a gbXML file
* Open files via URL or open file dialog
* All free and open source hosted on GitHub


### Vision

* Helping students, clients and non-AEC peeps gain access BIM data easily, quickly and freely

## To Do

Coming soon

* Openings
* Lights and shadows

* Section views

## Issues


### read gbxml polyloop

* 2017-09-11 ~ Occasional mis-rotation of polyloops

### read gbxml rectangular geometry

* 2017-09-08 ~ floor slabs position incorrectly


## Links of Interest

See also:

* http://www.gbxml.org/
> gbXML is an industry supported schema for sharing building information between disparate building design software tools.

* https://github.com/GreenBuildingXML
> Repositories for all things gbXML including validator source code, test cases, and more...

* https://en.wikipedia.org/wiki/Green_Building_XML
> The Green Building XML schema (gbXML) is an open schema developed to facilitate transfer of building data stored in Building Information Models (BIM) to engineering analysis tools. gbXML is being integrated into a range of software CAD and engineering tools and supported by leading 3D BIM vendors. gbXML is streamlined to transfer building properties to and from engineering analysis tools to reduce the interoperability issues and eliminate plan take-off time.


* https://twitter.com/gbXML
> The gbXML open schema helps facilitate the transfer of building properties stored in 3D building information models (BIM) to engineering analysis tools.

* https://github.com/chiensiTB/gbXMLValidator/wiki/What-is-gbXML
> What is gbXML?


* https://greenspacelive.com/site/building-generator/
> Use the building generator for rapid production of building geometry models.


* https://carmelsoftware.tumblr.com/post/151019045304/a-progress-report-on-gbxml-validation-efforts

* http://www.grasshopper3d.com/group/ladybug/forum/topics/new-honeybee-component-import-gbxml

* https://www.linkedin.com/pulse/5-modeling-techniques-gbxml-energy-integration-jean-carriere


## Change Log


### 2017-09-12 ~ Theo

* gbXML Viewer harriman
* Add menuing system
	* Separate UI from Three.js
* Add heads-up data readout
	* Interactive text data display
* Continued the fail on reading the data and displaying as text


### 2017-09-10 ~ Theo

* R2
* Handles non-orthogonal polyloops fairly well
* Reports various stats
* Reports the number of polyloops drawn as lines only
	* Mostly because number of vertices does equal 4

Code can use a lot of clean up. 

### 2017-09-09 ~ Theo

* Add read me
* Update folder structure
* Add menu items
* Add file reader
* Update read me

### 2017-09-07 Theo

* First commit



