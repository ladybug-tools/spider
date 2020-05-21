<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://www.ladybug.tools/spider/#gbxml-viewer/r11/README.md "View file as a web page." ) </span>

# gbXML Viewer Release 11 Read Me

<!--

<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/gbxml-viewer/r11/gv-cor/gv-cor.html width=100% height=400px onload=this.contentWindow.controls.enableZoom=false; >Iframes are not displayed on github.com</iframe>

_[gbXML Viewer Core]( http://www.ladybug.tools/spider/gbxml-viewer/r11/gv-cor/gv-cor.html ) ~ click the 'view model' button in left menu to view full screen_

## Full screen stable release [gbXML Viewer Core]( http://www.ladybug.tools/spider/gbxml-viewer/r11/gv-cor/gv-cor.html )

* Core utilities to read and display a gbXML file
The [read me]( http://www.ladybug.tools/spider/#gbxml-viewer/README.md ) file with full details is in the main gbXML Viewer folder just above here.

## Full screen stable release: [gbXML Viewer Application]( http://www.ladybug.tools/spider/gbxml-viewer/ )
* All the gbXML Viewer modules all together and available in a single application


-->


## Full screen stable release (fingers-crossed) R11.12.6.1: <http://www.ladybug.tools/spider/gbxml-viewer/r11/gv-app/gv-app.html>

### Full screen stable release R11.12.4.1: <br><http://www.ladybug.tools/spider/gbxml-viewer/r11-12-4/gv-app/gv-app.html>

#### Full screen development very pre-release R12: <br><http://www.ladybug.tools/spider/gbxml-viewer/dev>

## YouTube Video: [gbXML Viewer User Guide]( https://youtu.be/2QHrbuKIkdY )


***

## Modules

The Ladybug Tools/Spider GbXML Viewer is a collection of small JavaScript files that work together to enable the viewing of [gbXML]( http://www.gbxml.org/ ) files.

The goals for the files include:

* Files are no more than a few hundred lines
* Code is simple, plain-vanilla JavaScript
* Every JavaScript file has an accompanying standalone HTML file for testing purposes
* Every JavaScript file has its own name space so you can quickly identify the location of variables and functions

The various modules are described below. They are listed in alphabetical order of their three letter folder/ name-space id.

***

## gv-adj gbXML Viewer Duplicate Adjacent Spaces

* Identifies gbXML viewer duplicate adjacents - Detect surface with identical space ids
* Folder: gv-adj
* Name space: ADJ{}
* title: gbXML Viewer Duplicate Adjacent Spaces

### [gbXML Viewer Duplicate Adjacent Spaces Read Me]( #gbxml-viewer/r11/gv-adj/README.md )

### Full screen test script: [gbXML Viewer Duplicate Adjacent Spaces / Analemma]( gbxml-viewer/r11/gv-adj/gv-adj.html )



## gv-ana gbXML Viewer Sun Path / Analemmas

* Creates a Sun path / Analemma for given latitude/longitude
* folder: gv-ana
* Name space: ANA{}
* title: gbXML Viewer Sun Path / Analemma

### [gbXML Viewer Sun Path / Analemma Read Me]( #gbxml-viewer/r11/gv-ana/README.md )

### Full screen test script: [gbXML Viewer Sun Path / Analemma]( gbxml-viewer/r11/gv-ana/gv-ana.html )



## gv-app gbXML Viewer Application

_This script calls and combines all the module into a single app_

* All the gbXML Viewer modules all together and available in a single application
* folder: gv-app
* name space: APP{}
* title: gbXML Viewer Application

### [gbXML Viewer Application Read Me]( #gbxml-viewer/r11/gv-app/README.md )

### Full screen test script: [gbXML Viewer Application]( gbxml-viewer/r11/gv-app/gv-app.html )



## gv-cam gbXML Viewer First Person camera

* Fly through models following an avatar
* folder: gv-cam
* name space: CAM{}
* title: gbXML Viewer First Person Camera

### [gbXML Viewer First Person Camera Read Me]( #gbxml-viewer/r11/gv-cam/README.md )

### Full screen test script: [gbXML Viewer First Person Camera]( gbxml-viewer/r11/gv-cam/gv-cam.html )



## gv-cor gbXML Viewer Core

* Core file browse, read and display utilities
* Folder: gv-cor
* Name space: COR{}
* Title: gbXML Viewer Core

### [gbXML Viewer Core Read Me]( #gbxml-viewer/r11/gv-cor/README.md )

### Full screen test script: [gbXML Viewer Core]( gbxml-viewer/r11/gv-cor/gv-cor.html )

### Features

* Core file browse, read and display utilities
* handle location.hash change events
* Handle XMLHttpRequests
	* Handle onRequestFileProgress events
* Handle callbacks with file data events
	* Markdown
* Handle fileReader events
* Handle drag and drop events
* Handle drag and drop events
* Handle menu header dragging with mouse or touch events
* Incorporate and embody main style sheet parameters

## gv-crd gbXML Viewer Duplicate Coordinates

* Locates and identifies identical surfaces
* Folder: gv-crd
* Name space: CRD{}
* Title: gbXML Viewer Duplicate Coordinates

### [gbXML Viewer Duplicate Coordinates Read Me]( #gbxml-viewer/r11/gv-crd/README.md )

### Full screen test script: [gbXML Viewer Duplicate Coordinates]( gbxml-viewer/r11/gv-crd/gv-crd.html )



## gv-gal gbXML Viewer Gallery

* Use the GitHub API to obtain directory listings of gbXML files
* Folder: gv-gal
* Name space: GAL{}
* Title: gbXML Viewer Gallery

### [gbXML Viewer Gallery Read Me]( #gbxml-viewer/r11/gv-gal/README.md )

### Full screen test script: [gbXML Viewer Gallery]( gbxml-viewer/r11/gv-gal/gv-gal.html )



## gv-gbv gbXML Viewer View Utilities

* Utilities to toggle, zoom and view gbXML elements
* Folder: gv-gbv
* Name space: GBV{}
* Title: gbXML Viewer View Utilities

### [gbXML Viewer View Utilities Read Me]( #gbxml-viewer/r11/gv-gbv/README.md )

### Full screen test script: [gbXML Viewer View Utilities]( gbxml-viewer/r11/gv-gbv/gv-gbv.html )



## gv-gbx gbXML Viewer View gbXML Utilities

* Utilities to open and parse gbXML files and to translate the data to gbJSON and Three,js
* Folder: gv-gbx
* Name space: GBX{}
* Title: gbXML Viewer gbXML Utilities

### [gbXML Viewer gbXML Utilities Read Me]( #gbxml-viewer/r11/gv-gbx/README.md )

### Full screen test script: [gbXML Viewer gbXML Utilities]( gbxml-viewer/r11/gv-gxv/gv-gbx.html )



## gv-hud gbXML Viewer Heads-Up Display (HUD)

* View and modify detailed parameters of any selected surface
* Folder: gv-hud
* Name space: HUD
* Title gbXML Viewer Heads-Up Display (HUD)

### [gbXML Viewer Heads-Up Display (HUD) Read Me]( #gbxml-viewer/r11/gv-hud/README.md )

### Full screen test script: [gbXML Viewer Heads-Up Display]( gbxml-viewer/r11/gv-hud/gv-hud.html )



## gv-rep gbXML Viewer Reports

*  View and locate a variety of data in the model
* Folder: gv-grep
* Name space: REP{}
* Title: gbXML Viewer Reports

### [gbXML Viewer Reports Read Me]( #gbxml-viewer/r11/gv-rep/README.md )

### Full screen test script: [gbXML Viewer Reports]( gbxml-viewer/r11/gv-rep/gv-rep.html )



## gv-set gbXML Viewer Settings

* Adjust a wide variety of viewing parameters
* Folder: gv-gal
* Name space: SET{}
* Title:  gbXML Viewer Settings

### [gbXML Viewer Settings Read Me]( #gbxml-viewer/r11/gv-set/README.md )

### Full screen test script: [gbXML Settings Settings]( gbxml-viewer/r11/gb-set/gv-set.html )



## gv-thr gbXML Viewer Three.js

* Built over the Three.js WebGL JavaScript library
* Folder: gv-thr
* Name space: THR{}
* Name space: GBX{}
* Title: gbXML Viewer Three.js

### [gbXML Viewer Three.js Read Me]( #gbxml-viewer/r11/gv-thr/README.md )

### Full screen test script: [gbXML Viewer Three.js]( gbxml-viewer/r11/gc-thr/gv-thr.html )

Note: the GBX name space vaiables and methods ar to be separated out into their own folder and files



## gv-tmp gbXML Viewer Templates

* Boilerplate for creating new modules
* Folder: gv-tmp
* Name space: TMP{}
* Title: gbXML Viewer Templates

### [gbXML Viewer Templates Read Me]( #gbxml-viewer/r11/gv-tmp/README.md )

### Full screen test script: [gbXML Viewer Templates]( gbxml-viewer/r11/gc-tmp/gv-tmp.html )



***

_In previous releases but not yet updated for R11_

### gbXML Viewer Screen Capture

* Create animated GIFs
* 2018-01-01 ~ Need much better control over the camera


### gbXML Viewer  Sun Range


### gbXML Viewer Editor ~ _Deprecated_


### gbXML Viewer Export gbXML files ~ Not yet started

* 2017-12-15 ~ Theo: export selected spaces or zones to gbxml?
* 2017-12-10 ~ Michal: Export gbJSON
* 2017-12-02 ~ Michal: Add ability to edit and save gbXML files

Will most likely build upon

* [create exportable buildings]( https://github.com/ladybug-tools/spider/tree/master/cookbook/07-create-exportable-buildings )

### Bl.ocks Edition

View as [Bl.ocks]( https://bl.ocks.org/ )

> Bl.ocks (pronounced “Blocks”) is a simple viewer for sharing code examples hosted on GitHub Gist.

* <http://bl.ocks.org/theo-armour/163685de4d1fdacd70b2ffd446e8c874>

View as [Gist]( https://help.github.com/articles/about-gists/ )

Gists are a great way to share your work. You can share single files, parts of files, or full applications. You can access gists at https://gist.github.com.

* <https://gist.github.com/theo-armour/163685de4d1fdacd70b2ffd446e8c874/edit>

## Change Log

### 2019-11-07 ~ Theo

* Update default drawing link to a working file


***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>

