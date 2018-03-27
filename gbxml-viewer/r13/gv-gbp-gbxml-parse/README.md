<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page](http://www.ladybug.tools/spider/index.html#gbxml-viewer/r13/gv-gbx/README.md "View file as a web page." ) </span>

# r13 gbXML Viewer gbXML Utilities Read Me


<iframe class=iframeReadMe src=https://rawgit.com/ladybug-tools/spider/master/gbxml-viewer/r13/gv-gbp-gbxml-parse/gv-gbp.html width=100% height=400px >Iframes are not displayed on github.com</iframe>


## Full screen test script: [gbXML Viewer gbXML Utilities]( http://www.ladybug.tools/spider/gbxml-viewer/r13/gv-gbp-gbxml-parse/gv-gbp.html )

## Concept

* The script the parses gbXML files and translates the data into "gbJSON" and Three.js 3 meshes
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
* 2018-03-26 ~ GBP.parseGbJson: split into garbage collect and create new meshes methods
* 2018-03-26 ~ Perhaps split into two files: parse xml to JavaScript objevt and pars JavaScript object to Three.js


## Issues



## Links of Interest

* <https://developer.mozilla.org/en-US/docs/Web/Guide/Parsing_and_serializing_XML>
* <https://www.sitepoint.com/how-to-convert-xml-to-a-javascript-object/>
* <http://blogs.sitepointstatic.com/examples/tech/xml2json/index.html>



## Change Log


### 2018-03-26 ~ Theo

R13
* First commit
* Code cleanup
* Much streamlined compared to R12
* Text added to ths read me


### 2018-03-06 ~ Theo

* First commit
* 2018-03-04 ~ Split into separate modules << here we are

***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>



