<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page](http://www.ladybug.tools/spider/index.html#gbxml-sample-files/save-changes-samples/README.md "View file as a web page." ) </span>

# gbXML Viewer Save Changes Samples Read Me

<!--
<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/gbxml-viewer/r11/gv-tmp/gv-tmp.html width=100% height=400px >Iframes are not displayed on github.com</iframe>


## Full screen test script: [gbXML Viewer Template]( http://www.ladybug.tools/spider/gbxml-viewer/r11/gv-tmp/gv-tmp.html )
-->


Use and share these links for the full gbXML Viewer:

* Stable release: <http://www.ladybug.tools/spider/gbxml-viewer/>
* Pre-release: <http://www.ladybug.tools/spider/gbxml-viewer/dev>

## Concept

### Save Changes

'Save Changes' is a module in gbXML viewer that allows you to save the edits you make to a gbXML to a file. Later you can use that file to carry out the identical edits on a later release of the gbXML file.

This folder contains a number of save changes sample files.

At this early stage, you will have to download the sample files to your computer in order to use them.

The Save Changes feature is itself at an early stage of development. It still makes a number of mistakes in updating a file.

We can, however, already use the Save Changes files to track and replicate the errors it creates.

Two files in the current list create errors that you can replicate and view:

* aim0013-change-type-shade-to-exteriorwall.json
* aim0016-changes-change-type-shade-to-exteriorwall.json

Future release of the gbXML Viewer will be updated so as to fix theses errors.


### Save Changes versus Save Edits

GbXML Viewer has to methods for saving edits.

* Save Changes creates a set of instructions as how to modify a file
	* Accessible via the 'manage save changes files' in the main menu
	* Useful when you know that there will be many ongoing updates to a gbXML file.

* Save Edits creates a new file with with edited data
	* Accessible via the 'main menu' > 'heads-up display' > 'save edits'
	* Useful when you need to use an edited/updated gbXML file in another program such as TAS or Open Studio

### 2018-03-06 ~ Current Priority

The current priority is to fix Save Changes over Save Edits. A good reason being that fixes to Save Changes is likely to fix issues with Save Edits but not _vice versa_. Also Save Changes can be used to build test cases for Save Edits errors but not _vice versa_.


## Wish list



## Issues



## Links of Interest

* [gbXML Viewer Save Changes Read Me]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/r11/gv-sav/README.md )

## Change Log

### 2018-03-06 ~ Theo

* First commit


***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>



