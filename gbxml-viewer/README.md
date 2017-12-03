<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/README.md "View file as a web page." ) </span>


# gbXML Viewer8 Read Me

<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/gbxml-viewer/r8/gbxml-viewer8-app/gbxml-viewer8-app.html width=100% height=400px >Iframes are not displayed on github.com</iframe>
_gbXML Viewer R8_


## Full screen: [gbXML Viewer8]( http://www.ladybug.tools/spider/gbxml-viewer/r8/gbxml-viewer8-app/gbxml-viewer8-app.html )


## Concept

### Issue / The problem to be solved

About [Green Building XML (gbXML)]( https://en.wikipedia.org/wiki/Green_Building_XML )

> gbXML allows disparate 3D [building information models (BIM)]( https://en.wikipedia.org/wiki/Building_information_modeling ) and architectural/engineering analysis software to share information with each other

The current set of [BIM authoring and CAD software tools]( http://www.gbxml.org/Software_Tools_that_Support_GreenBuildingXML_gbXML ) for gbXML include various proprietary, closed source applications.

gbXML being open source, it would also be nice to be able to view gbXML files in 3D in your browser with no fees and with open source code

The Ladybug Tools Spider gbXML Reader scripts are first steps toward making gbXML viewers readily available

### Mission

gbXML Viewer is a variety of modular experiments for viewing, examining and validating gbXML files in 3D in your browser.

Below are links to some of the latest files. R8 is that latest release and is still a work-in-progress. Not all the scripts from previous releases have been added to R7 yet.

Note that. currently, the functionality is spread across multiple files. This is for testing and early-stage development purposes only. Sometime in the near future there will be a script that assembles multiple scripts into a single user experience.

 
### Vision

* Helping students, clients and non-AEC peeps gain access BIM data easily, quickly and freely

### Features

* View gbXML files in 3D or as text in your browser
	* Create gbJSON files for easier processing
* Full zoom, pan and rotate
* Run on computer, tablet and phone
* Adjust a wide variety of viewing parameters
* View the full gamut of data typically available in a gbXML file
* Open files via URL or open file dialog
* All free and open source and hosted on GitHub


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
* https://knowledge.autodesk.com/support/revit-products/learn-explore/caas/CloudHelp/cloudhelp/2015/ENU/Revit-DocumentPresent/files/GUID-586B9574-64DA-47BC-B8EC-DEF2D565928F-htm.html
* http://inside-the-system.typepad.com/my_weblog/2012/08/how-to-export-gbxml-for-only-some-spaces.html



## Modules

### Core

#### [Read Me]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/r8/gbxml-viewer8-01-core/README.md )

#### Full Screen: [gbXML Viewer8 Core]( http://www.ladybug.tools/spider/gbxml-viewer/r8/gbxml-viewer8-01-core/gbxml-viewer8-core.html )

* View gbXML files in 3D in your browser. 
* Open files using File Reader or by URL in location.hash.Base 
* Base Script used by gbXML Viewer modules.


### Gallery

#### [Read Me]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/r8/gbxml-viewer8-02-gallery/README.md )

#### Full Screen test: [gbXML Viewer8 Gallery]( http://www.ladybug.tools/spider/gbxml-viewer/r8/gbxml-viewer8-02-gallery/test-gallery-viewer.html )



### Settings


### Reports


#### [Read Me]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/r8/gbxml-viewer8-05-reports/README.md )

#### Full screen test: [gbXML Viewer8 Reports]( http://www.ladybug.tools/spider/gbxml-viewer/r8/gbxml-viewer8-05-reports/test-gbxml-viewer8-reports.html )


* Create text reports of data embedded in gbXML files
* Toggle the display of 3D surfaces based on user input
* Create detailed interactive reports of issues discoverd.


## To Do


### Core

* 2017-12-01 ~ Load files via drag and drop
* 2017-12-01 ~ Michal: load local files via location.hash
* Lights and shadows
* Section views

### First Person camera

* 2017-12-01 ~ Michal: Locate camera/controls target inside a given space / zoom into the space

### Heads-up Display

* 2017-12-01 ~ Add better display = none on new file loaded
* 2017-12-01 ~ Add choice of display in right-side menu
* 2017-12-01 ~ What data should be included in heads-up display?
* 2017-12-02 ~ Michal: Add filters to ignore shade surfaces. Or perhaps only display for certain surface types


### Reports

* 2017-12-02 ~ Michal: Do a better job of displaying/reporting duplicates
* 2017-12-02 ~ Michal: Report and display surfaces with duplicate CAD IDs
* 2017-12-02 ~ Michal: Highlight and display tine areas
* 2017-12-02 ~ Michal: Highlight and display surfaces that are inside larger surfaces


### Settings

* 2017-12-01 ~ Add a 'ground' that can receive shadow

### Template

* 2017-12-01 ~ Add hamburger/slider men


Not yet started

### Export gbXML files

2017-12-02 ~ Michal: Add abilty to edit and save gbXML files

Will most likely build upon

* [create exportable buildings]( https://github.com/ladybug-tools/spider/tree/master/cookbook/07-create-exportable-buildings )


## Change Log

### 2017-11-30

* First Commit

See also [R7 Read Me]( #read-gbxml/README.md ) for earlier changes

***

***

Below are links to prior releases. Most releases have code that is running. They are linked here to help you understand how this code has grown and morphed. And to prove to you that code is not magic, but it is the product oof human imagination.


### [gbXML Viewer R7]( http://www.ladybug.tools/spider/read-gbxml/gbxml-viewer/r7/index.html )


R6 is mostly broken and may be ignored. Perhaps the only script to consider is [gbXML Gallery]( http://www.ladybug.tools/spider/read-gbxml/gbxml-viewer/#r6/gbxml-viewer-small/gbxml-gallery.html ) where a gbXML Viewer is embedded inside a normal HTML file using an iframe.

The last full-featured demo is in R5:

### [gbXML Viewer R5]( http://www.ladybug.tools/spider/read-gbxml/gbxml-viewer/r5/index.html )


Prior to R5, release were given code names that related to peeps involved with the project. This confused peeps - especially th peeps whose names were being flaunted.


### [gbXML Viewer 2017-09-29-mostapha ]( file:///D:/Dropbox/Public/git-repos/ladybug-tools.github.io/spider/read-gbxml/gbxml-viewer/2017-09-29-mostapha/gbxml-viewer.html )


### [gbXML Viewer 2017-09-23-michal]( http://www.ladybug.tools/spider/read-gbxml/gbxml-viewer/2017-09-23-michal/index.html )


### [gbXML Viewer 2017-09-13-carmel]( http://www.ladybug.tools/spider/read-gbxml/gbxml-viewer/2017-09-13-carmel/plugins/display-gbjson.html )


### [gbXML Viewer 017-09-12-harriman]( http://www.ladybug.tools/spider/read-gbxml/gbxml-viewer/2017-09-12-harriman/select-xml/display-gbjson.html )

***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>

