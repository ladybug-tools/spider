<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/r8/gbxml-viewer8-01-core/README.md "View file as a web page." ) </span>


# gbXML Viewer8 Core Read Me

<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/gbxml-viewer/r8/gbxml-viewer8-01-core/gbxml-viewer8-core.html width=100% height=600px;  >Iframes are not displayed on github.com</iframe>

## Full screen [gbXML Viewer8 Core]( http://www.ladybug.tools/spider/gbxml-viewer/r8/gbxml-viewer8-01-core/gbxml-viewer8-core.html )

## Concept

The core or template file to be used to read gbXML files and display them in 3D

* Built upon the [Three.js]( https://threejs.org ) 3D JavaScript library
* Under 500 lines of code
* Plan-vanilla JavaScript
	* 90% easy-peasy JavaScript and 10% gnarly, linear algebra JavaScript
* Accepts URLs of files to view via [location.hash]( https://www.w3schools.com/jsref/prop_loc_hash.asp ) - useful in creating [permalinks]( https://en.wikipedia.org/wiki/Permalink )
* Accepts and displays xml text data via its parseFileXML function
	* May be data sent by an iframe parent
	* May be date acquired by the HTML5 file reader tag

## Sample files to load

* [Open Studio SampleX ML]( http://www.ladybug.tools/spider/gbxml-viewer/r8/gbxml-viewer8-01-core/gbxml-viewer8-core.html#https://rawgit.com/ladybug-tools/spider/master/read-gbxml/data-files/open-studio-seb.xml )
* [Sample Building]( http://www.ladybug.tools/spider/gbxml-viewer/r8/gbxml-viewer8-01-core/gbxml-viewer8-core.html#SampleBuildWell%20gbXML%20working4%20OpenStudio.xml )
* [gbXMLStandard Single Family Residential 2016.xml]( http://www.ladybug.tools/spider/gbxml-viewer/r8/gbxml-viewer8-01-core/gbxml-viewer8-core.html#gbXMLStandard%20Single%20Family%20Residential%202016.xml )


## Change Log


### 2017-12-01 ~ Theo

* Code clean-up
* Update readme

### 2017-11-29 ~ Theo

* Add sample links to read me
* Minor simplification to basic


### 2017-11-16 ~ Theo

* sam-live2.xml set as default file to view
* comment out even generators


### 2017-11-14 ~ Theo

* Renamed to 'gbXML Viewer7 Basic'
* Added ability display files from JavaScript file reader
* Added parent.onloadGbjson()
