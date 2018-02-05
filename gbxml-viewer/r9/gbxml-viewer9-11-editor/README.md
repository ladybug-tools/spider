<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page](http://www.ladybug.tools/spider/index.html#gbxml-viewer/r9/gbxml-viewer9-11-editor/README.md "View file as a web page." ) </span>

# gbXML Viewer9 Editor Read Me


<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/gbxml-viewer/r9/gbxml-viewer9-11-editor/gbxml-viewer9-core-editor-dev.html width=100% height=400px >Iframes are not displayed on github.com</iframe>
_preliminary version - must be viewed full screen to work_

## Full screen: [gbXML Viewer9 Editor]( http://www.ladybug.tools/spider/gbxml-viewer/r9/gbxml-viewer9-11-editor/gbxml-viewer9-core-editor-dev.html )


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

The difference is due to the intention of being able to save an edited version of the data to a new file that apart from the edits contains an identical copy of the original data.

Other scripts the Spider repo do create building data and save to the gbXML file format, but do not contain shell or rectangular geometry let alone all the other gbXML elements the original file mae have contained.

As of this writing, the way forward is not clear. the JSON format used here - which we call gbJSON - has enabled fast, simple relatively easy coding which has produced scripts with many features at a rapid pace.

There are a number of questions:

* Should we ditch gbJSON and learn how to do everything with gbXML - and ignore that more beginner programmers are familiar with JSON than with XML?
* Should we beef up the gbJSOn so that it can read all gbXML data past, present and future and write out new files in canonical gbXML format?
* Can we get the gbXML and the gbJSON to play nice together?

The next few releases should begin to provide some guidance in responding to these questions.



### Mission

* View the IDs of all the surfaces in a list
	* Select the surface you want to edit
* View the names of all the surface types
	* Current surface type of selected surface is highlighted
	* Select a different surface type for the selected surface
* View the IDs of the adjacent spaces
	* Select different spaces for the selected surface


## Wish list

* Highlight the selected surface 'in world' and make other surfaces nearly transparent
* Display the name and CAD ID etc of the selected surface in the menu
* Display the name and CAD ID etc of the selected space(s) in the menu
* Allow you to use all the error-locating tools in the [gbXML Viewer Reports]( http://www.ladybug.tools/spider/gbxml-viewer/r9/gbxml-viewer9-05-reports/test-gbxml-viewer9-reports.html ) script
* **Save the edits to a new file**
	* Perhaps in gbJSON format as well as gbXML

More thoughts

* Add similar editing facilities for storeys, spaces, zones and so on
* Use a similar menu structure to export just portions of a project
* Allow import and export of multiple projects or spaces

## Issues



## Links of Interest



## Change Log

### 2018-02-04 ~ Theo

* Enable full menu with select elements
* Update Read me

### 2018-02-03 ~ Theo

* First commit

***


# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>



