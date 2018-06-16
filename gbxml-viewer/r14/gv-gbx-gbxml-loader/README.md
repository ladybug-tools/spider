<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page](http://www.ladybug.tools/spider/index.html#gbxml-viewer/r14/gv-gbx-gbxml-loader/README.md "View file as a web page." ) </span>

<div><input type=button onclick="window.location.href='https://github.com/ladybug-tools/spider/blob/master/gbxml-viewer/r14/gv-gbx-gbxml-loader/README.md'";
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>

# [R14 'Aragog' GBX gbXML Loader Read Me]( #gbxml-viewer/r14/gv-gbx-gbxml-loader/README.md )


<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/gbxml-viewer/r14/gv-gbx-gbxml-loader/gv-gbx.html width=100% height=400px >Iframes are not displayed on github.com</iframe>


## Full screen test script: [GBX gbXML Loader]( http://www.ladybug.tools/spider/gbxml-viewer/r14/gv-gbx-gbxml-loader/gv-gbx.html )


## Concept

* The script that parses gbXML files and translates the data into "gbJSON" and Three.js 3 meshes
* Under five hundred lines of code
* Proving to be quite robust
* GBP.parseFileXML: Loads any text file - from file reader or location hash or wherever
* Uses browser XMLHttpRequest responseXML method to open and parse XML data
* Uses Sitepoint/Craig Buckler's code to translate XML to JavaScript object
* Cleans up existing 3D data in the Three.js scene
* Identifies all the coordinates in a surface and creates an array of Three.js vectors as vertices
	* One-liner that takes time to read/understand
* Creates a Three.js Shape for every surface
	* Shape enables a mesh to have holes
	* But must be created in 2D / Usage is quite tricky
		* Requires conjugating quaternions
		* Requires creating Three.js Triangle and Plane
	* Add openings as holes to shapes
	* Adds Edges
* Zoom to the extents of the model
* Make all Thee.js meshes visible



## Wish list / To Do

* 2018-03-26 ~ Add openings and gbXML data to the GBP object



## Issues



## Links of Interest

* <https://developer.mozilla.org/en-US/docs/Web/Guide/Parsing_and_serializing_XML>
* <https://www.sitepoint.com/how-to-convert-xml-to-a-javascript-object/>
* <http://blogs.sitepointstatic.com/examples/tech/xml2json/index.html>



## Change Log

### 2018-06-03 ~ Theo

R14
* First commit
* Bring in code from gbXML Viewer Basic ~ works just fine

***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>



