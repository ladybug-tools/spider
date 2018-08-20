<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://www.ladybug.tools/spider/index.html#cookbook/rad-to-threejs/README.md "View file as a web page." ) </span>
<div><input type=button class="btn btn-secondary btn-sm" onclick="window.location.href='https://github.com/ladybug-tools/spider/blob/master/cookbook/rad-to-threejs/README.md'";
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>

<br>

# [Radiance RAD to Three.js Read Me]( #cookbook/rad-to-json/README.md )

## Concept

Translate Radiance RAD file types into Three.js views - all building on [Mostapha's efforts]( https://github.com/mostaphaRoudsari/rad-to-threejs )

See also:
* Radiance [RAD to JSON Read Me]( #cookbook/rad-to-json/README.md )

Fingers crossed this will be the start of a new, simpler [Rad Viewer]( https://www.ladybug.tools/spider/#rad-viewer/README.md )

### Where do we go from here?

Questions that need answering

* Should this code move into its own repo and become a proper issue-driven development project?
* RAD files may contain spheres, cones and other types of geometry. The current version of this viewer only supports polygons. Should support for these geometries be added or are these types infrequently used and their inclusion be a distraction in an AEC environment?
* RAD files support a variety of materials but gbXML and Honeybee are only likely to used a small number of colors. Should the viewer be able to parse all Radiance material types or is it sufficient to have a simple lookup table for 50 or so commonly used materials?
* The current viewer is setup for files up 1 to 2 MB in size. It can be updated to handle files of much larger size but this would come at cost of greater complexity and more safeguards. Would this effort be worthwhile in the near term of not?


***



<iframe src=https://www.ladybug.tools/spider/cookbook/rad-to-threejs/r3/rad-to-three.html width=100% height=500px >Iframes are not viewable in GitHub source code view<</iframe>

## 2018-08-19: Full Screen: [Radiance RAD to Three.js R3]( https://www.ladybug.tools/spider/cookbook/rad-to-threejs/r3/rad-to-three.html )

* Display of sample files: improve file listing
* Simplify mesh creation when vertices form triangles


***

<iframe src=https://www.ladybug.tools/spider/cookbook/rad-to-threejs/r2/rad-to-three.html width=100% height=500px >Iframes are not viewable in GitHub source code view<</iframe>

## Full Screen: [Radiance RAD to Three.js R2]( https://www.ladybug.tools/spider/cookbook/rad-to-threejs/r2/rad-to-three.html )

* Display of sample files: sort names and add folder names
	* Has issues with files in root folder appearing in sub-folders
* Fix a number of name space issues
* Add zoom extents on load
* Add 'File data' details to menu
* Add 'Settings' details to menu along with associated functions for rotate, zoom. opacity, edges and wire frame
* Add first pass at displaying polygon colors

### To do > done

* 2018-08-11 ~ Theo ~ Cleanup name spacing and code

***

<iframe src=https://www.ladybug.tools/spider/cookbook/rad-to-threejs/r1/rad-to-three.html width=100% height=500px >Iframes are not viewable in GitHub source code view<</iframe>

## Full Screen: [Radiance RAD to Three.js R1]( https://www.ladybug.tools/spider/cookbook/rad-to-threejs/r1/rad-to-three.html )

* A first pass at playing with Mostapha's code with Three.js
* Mostly working with the sample Radiance files
	* Not yet set up for files, say, over a megabyte is size
* No materials or colors yet / Uses Three,js 'Normal' material

### Note

Needed to add an extra replace CRLF with " " on line 100 of rad-to-three.js so as to work with all files.

	const parseRadRe = /^\s*([^0-9].*(\s*[\d.-]+.*)*)/gm; // how does this work?
	const rawObjects = radText.match( parseRadRe ).filter( word => word.trim().length > 0 && !word.trim().startsWith( '#' ) );
	const rawObjects2 = rawObjects.map( item => item.replace(/\r\n|\n/g, " " ) );



## To do / wish list

* 2018-08-19 ~ Theo ~ files in the gward samples folders have a variety of spaces and tabs between data elements. We should be able to handle all the permutations successfully
* 2018-08-19 ~ Theo ~ Load multiple files via location.hash
* 2018-08-12 ~ Theo ~ Add drag and drop multiple files
* 2018-08-11 ~ Theo ~ Handle materials
* 2018-08-11 ~ Theo ~ Handle larger files in a timely, non-crashing fashion




## Links of interest

* https://github.com/mostaphaRoudsari/rad-to-json

This repo contains the source code Mostapha wrote to translate Radiance RAD file types into JSON

Working link:
* https://rawgit.com/mostaphaRoudsari/rad-to-json/master/index.html

Working link:
* https://mostapha.io/rad-to-json/index.html



## Change log


### 2018-08-11 ~ Theo

R1
* First commit

***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>

