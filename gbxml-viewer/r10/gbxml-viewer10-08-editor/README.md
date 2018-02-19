<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/r10/gbxml-viewer10-08-editor/README.md "View file as a web page." ) </span>

# gbXML Viewer10 Editor Read Me


<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/gbxml-viewer/r10/gbxml-viewer10-08-editor/gbxml-viewer10-core-editor-dev.html width=100% height=400px >Iframes are not displayed on github.com</iframe>
_preliminary version - must be viewed full screen to work_

## Full screen: [gbXML Viewer10 Editor Dev]( http://www.ladybug.tools/spider/gbxml-viewer/r10/gbxml-viewer10-08-editor/gbxml-viewer10-core-editor-dev.html )


## Concept

GbXML file creation is still a young art and the various apps used to create gbXML data - and their users - may create files that contain errors. It may not always be convenient to go back to the app that created the file to fix the errors.

Viewing and locating errors in a gbXML file using a CAD grogram is not always an easy task.

Typical errors we have seen include

* Surfaces assigned to an incorrect surface type
* Surfaces with duplicate interior wall adjacencies
* Duplicate identical surfaces


An app that enables easy viewing of gbXML files, helps with locating and highlighting errors, enables fixing the errors and saving the data to a new file could be a useful addition the designer's toolkit.

### Notes

This script is based on manipulating XML data. The other scripts in the gbXML Viewer series manipulate JSON data extracted from the XML data.

The difference is due to the new and added intention of being able to save an edited version of the XML data to a new file that apart from the edits contains an identical copy of the original XML data.

Other scripts the Spider repo do create building data and save to the gbXML file format, but do not contain shell or rectangular geometry let alone all the other gbXML elements the original file may have contained.

As of this writing, the way forward is not clear. The JSON format used here - which we call gbJSON - has enabled fast, simple relatively easy coding which has produced scripts with many features at a rapid pace.

There are a number of questions:

* Should we ditch gbJSON and learn how to do everything with gbXML - and ignore that more beginner programmers are familiar with JSON than with XML?
* Should we beef up the gbJSOn so that it can read all gbXML data past, present and future and write out new files in canonical gbXML format?
* Can we get the gbXML and the gbJSON to play nice together?

The next few releases should begin to provide some guidance in responding to these questions.

#### Update 2018-02-05

It looks like getting the gbXML and gbJSON data to communicate is fairly easy to do. The confusion will be in the future when you will have to switch your brain from one style to the other too frequently.


### Mission

* View the IDs of all the surfaces in a list
	* Select the surface you want to edit from list
	* Input by typing the id of the surface you want to edit
	* Selected surface is highlighted 'in world' and make other surfaces nearly transparent
	* Display the name of the selected surface as a tooltip in the menu
* View the names of all the surface types
	* Current surface type of selected surface is highlighted
	* Select a different surface type for the selected surface
	* Input by typing the type you want
* View the IDs of the adjacent spaces
	* Select different spaces for the selected surface
	* Input by typing the id of the apace you want to select
* Update the surface to the desired parameters
* Save the edits to a new file
* View the previously edited surface after the redraw


## Wish list

* 2018-02-07 ~ Display file name and particular
* 2018-02-07 ~ HUD
	* toggle current story
	* surface name: button to rehighlight
	* 2nd adjacency add details
	* movable div
* 2018-02-07 ~ Identify cause of faulty triangulatiom
* 2018-02-07 ~ Identify cause of faulty heights
* 2018-02-07 ~ Help identify correct adjacency when there is a duplicate adjacency
* 2018-02-07 ~ Process document attributes
* 2018-02-07 ~ display describe each error on heads-up
* 2018-02-07 ~ toggle visibility
* 2018-02-06 ~ needs heads-up
* 2018-02-06 ~ need to update zone / other things?
* 2018-02-06 ~ Add a delete duplicate surface button
* 2018-02-06 ~ cursor keys errors
* 2018-02-06 ~ Add name as tooltip for spaces lists
* Display CAD ID etc of the selected space(s) in the menu?
* Allow you to use all the error-locating tools in the [gbXML Viewer Reports]( http://www.ladybug.tools/spider/gbxml-viewer/r9/gbxml-viewer9-05-reports/test-gbxml-viewer9-reports.html ) script
	* Perhaps in gbJSON format as well as gbXML

More thoughts

* Add similar editing facilities for storeys, spaces, zones and so on
* Use a similar menu structure to export just portions of a project
* Allow import and export of multiple projects or spaces

## Issues

### bristol-clifton-down-road.xml

aim10134 = aim8861
aim9649 = aim10191

### london-office.xml

hole in roof OK?



## Links of Interest



## Change Log

### 2018-02-18 ~ Theo

R10.2
* Editor
	* Added to GV App
	* Standalone test file also works
	* Not fully tested/completed

### 2018-02-07 ~ Theo

* R1.4


### 2018-02-06 ~ Theo

* R1.3
* Add input fields
* Add 'show' buttons
* Add 'update view' button
* Various updates to user experience


### 2018-02-05 ~ Theo

* R1.2
* Tooltip for each select Surface item shows surface name
* Selecting a surface zooms and highlights the surface
* Selecting a surface type updates the surfaces type
* 'view previous update' zooms and highlights the surface previously updated
	* Currently a reset view of the entire building is required - which hides the surface previously edited
	* This could change in the future
* 'save edits' save the updated data to a new gbXML file

### 2018-02-04 ~ Theo

* Enable full menu with select elements
* Update Read me

### 2018-02-03 ~ Theo

* First commit

***


# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>



