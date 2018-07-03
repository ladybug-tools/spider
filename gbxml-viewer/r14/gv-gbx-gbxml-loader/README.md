<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page](http://www.ladybug.tools/spider/index.html#gbxml-viewer/r14/gv-gbx-gbxml-loader/README.md "View file as a web page." ) </span>

<div><input type=button onclick="window.location.href='https://github.com/ladybug-tools/spider/blob/master/gbxml-viewer/r14/gv-gbx-gbxml-loader/README.md'";
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>

# [R14 'Aragog' GBX gbXML Loader Read Me]( #gbxml-viewer/r14/gv-gbx-gbxml-loader/README.md )


<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/gbxml-viewer/r14/gv-gbx-gbxml-loader/gv-gbx.html width=100% height=400px >Iframes are not displayed on github.com</iframe>


## Full screen test script: [GBX gbXML Loader]( http://www.ladybug.tools/spider/gbxml-viewer/r14/gv-gbx-gbxml-loader/gv-gbx.html )


## Concept

* The script that parses gbXML files and translates the data into "gbJSON" and Three.js 3 meshes
* Under four hundred lines of code
* Proving to be quite robust
* GBP.parseFileXML: Loads any text file - from file reader or location hash or wherever
* Uses browser XMLHttpRequest responseXML method to open and parse XML data
	* Use of XMLHttpRequest enables loading files from local hard drive
* Uses Sitepoint/Craig Buckler's code to translate XML to JavaScript object
* Identifies all the coordinates in a surface and creates an array of Three.js vectors as vertices
	* Cose is a one-liner that takes time to read/understand
* Creates a Three.js Shape for every surface
	* Shape enables a mesh to have holes
	* But must be created in 2D / Usage is quite tricky
		* Requires conjugating quaternions
		* Requires creating Three.js Triangle and Plane
	* Add openings as holes to shapes
	* Adds Edges
* Includes function to toggle visibility of each type of surface
	* Also make all Three.js meshes visible



## Wish list / To Do

* 2018-06-20 ~ Theo ~ Add original gbXML data as text to the GBX JSON object??



## Issues



## Links of Interest

* <https://developer.mozilla.org/en-US/docs/Web/Guide/Parsing_and_serializing_XML>
* <https://www.sitepoint.com/how-to-convert-xml-to-a-javascript-object/>
* <http://blogs.sitepointstatic.com/examples/tech/xml2json/index.html>



## Change Log

### 2018-07-03 ~ Theo

GBX14.1
* Surface Type list card: display all types not just those in use
	* https://github.com/ladybug-tools/spider/issues/133
* Update readme

### 2018-06-20 ~ Theo

GBX14.0
* Add undefined surface type color and set to 0x888888
* Assign undefined color to surfaces with incorrect surface types
* Add release number
* Fixes to gv-gbx.html / but needs more work

### 2018-06-03 ~ Theo

R14
* First commit
* Bring in code from gbXML Viewer Basic ~ works just fine

***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>



