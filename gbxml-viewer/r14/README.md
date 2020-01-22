<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page](http://www.ladybug.tools/spider/index.html#gbxml-viewer/r14/README.md "View file as a web page." ) </span>

<div><input type=button onclick="window.location.href='https://github.com/ladybug-tools/spider/tree/master/gbxml-viewer/r14/README.md'"
value="You are now in a GitHub web page view - Click this button to view this read me file as source code" ><div>

# [R14 'Aragog' gbXML Viewer Read Me]( #gbxml-viewer/r14/README.md )

## [R14 'Aragog' gbXML Viewer]( https://www.ladybug.tools/spider/gbxml-viewer/r14/aragog-shortcut.html )

<iframe class=iframeReadMe src=https://www.ladybug.tools/spider/gbxml-viewer/r14/gv-cor-core/gv-cor.html width=100% height=400px >Iframes are not displayed on github.com</iframe>

## Concept

[Aragog gbXML Viewer]( https://github.com/ladybug-tools/spider "Source code on GitHub" ) is a collection of [free, open source]( https://opensource.guide/ "Read all about it at OpenSource Guides" ) modular [JavaScript]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/About_JavaScript "Callout to Brendan" ) / [WebGL]( https://www.khronos.org/webgl/ "Tip of the hat to Ken Russell" ) / [Three.js]( https://threejs.org/ "Hi Mr.doob" ) experiments hosted on [GitHub]( https://github.com/about "Beep for where the geek peeps keep" ) for viewing, validating and editing [gbXML]( http://gbxml.org "Where's your schema today?" ) files in 3D in your browser. gbXML is an industry supported file format for sharing building information between numerous building design software tools.

For more details, see the [gbXML Viewer Read Me]( http://www.ladybug.tools/spider/#gbxml-viewer/README.md )

### 2018-10-30: Many things happening

Spider gbXML Viewer is embedded in latest release of [OpenStudio]( https://www.openstudio.net/). See the [Ladybug Tools forum]( https://discourse.ladybug.tools/t/spider-gbxml-viewer-embedded-in-openstudio/4129 ) for details.

The code for the OpenStudio edition is maintained in a new repository: [Spider gbXML Tools]( https://www.ladybug.tools/spider-gbxml-tools/ ). This code is simpler, faster and better than the current releases.

So have a look at [Spider gbXML Viewer Basic]( https://www.ladybug.tools/spider-gbxml-tools/gbxml-viewer-basic ) and all the modules in the [Cookbook]( https://www.ladybug.tools/spider-gbxml-tools/#./cookbook/README.md ). These scripts will be the basis for future release of the Viewer.


## Release Wish list

This release is trying to move the effort from a single large monolithic app into a collection of targeted smaller apps.

Each app targets a specific use case. Each app uses its own mix of core scripts.

Benefits include
* Simpler testing . no longer need to test every module against every module
* All modules available all the time instead of being brought on board in a length time sequence

Complications
* Revision naming, numbering and access become complex operations

Needed

* Some way of gathering all the text edits from all the read me file updates so that you can see what's new today

## Issues



## Links of Interest



## Change Log

### 2020-01-22 ~ Theo

R14.23

* F:Add switching menu

### 2018-09-18 ~ Theo

R14.16

* Change back to orbit controls

### 2018-06-20 ~ Theo

* Updates to gbx, iss

All the features currently in R14 appear to be working as expected. Can now start thinking about adding more features
* More fixes in issues
	* Find surfaces inside surfaces
* Modularizing settings
* Editing vertices


### 2018-06-19 ~ Theo

* Updates to cor, iss, rep, set and tmp

### 2018-06-16 ~ Theo

R14.3
* Beginning of a split into multiple experiments
* All modules for this experiment are in and mostly functioning


### 2018-06-12 ~ Theo

R14.2 bis
To Do:
* Right too much duplicates left menu
* Remove select surface from right menu
* All selection updates in left menu
* Only attributes and edits should appear in right menu

### 2018-06-05 ~ Theo

R14.2
* Add sample file galleries / complete rewrite of source
* Updates to core and gbxml loader


### 2018-06-04 ~ Theo

R14.1
* Switch to Trackball camera control
* GBX: more cleanup
	* Add setAllVisible
### 2018-06-01 ~ Theo

R14
* First commit


***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>



