<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page](http://www.ladybug.tools/spider/index.html#gbxml-viewer-basic/README.md "View file as a web page." ) </span>

<div><input type=button onclick="window.location.href='https://github.com/ladybug-tools/spider/blob/master/gbxml-viewer-basic/README.md'";
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>

# [gbXML Viewer Basic Read Me]( #gbxml-viewer-basic/README.md )


<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/gbxml-viewer-basic/r3/gbxml-viewer-basic.html width=100% height=400px >Iframes are not displayed on github.com</iframe>


## Latest stable release: [gbXML Viewer Basic]( http://www.ladybug.tools/spider/gbxml-viewer-basic/index.html )


## Concept

The ['Aragog' gbXML Viewer]( http://www.ladybug.tools/spider/gbxml-viewer/r13/gv-app-application/gv-app.html ) is a nice bit of work - or it will be one day - but the code base is getting lengthy and convoluted. It's no longer a place for beginners to start. You can't just open it up and see what's going on in fifteen minutes or so.

Therefore we now have gbXML Viewer Basic

This is a very basic gbXML file viewer
* Use this code if you want a the basic idea of how to read a gbXML file and turn it into a Three.js scene
* Use this code if you want to learn how to take sets of coplanar points and convert these to Three.js 2D Shapes with holes - all positioned and rotated arbitrarily in 3D space.

The intention is that the core gbXML parser here and the core parser in the full-featured gbXML Viewer and the parser in the RAD Viewer all contain identical or nearly identical code.

The code should be simple, fast and easy to read. If you can read and understand the Three.js examples and the [Mr.doob coding style&trade; ]( https://github.com/mrdoob/three.js/wiki/Mr.doob's-Code-Style%E2%84%A2 ), then you should feel at home here. Be prepared to enjoy the white space!

A good function to look at is ```GBX.get3dShape()```. This function takes a set of 3D coplanar points along with points that bound any holes and converts these into a Three.js mesh bounded by those points. This mesh is created using a Three.js Shape - which is excellent stuff but very 2D. The conversion requires that you conjugate your quaternions and do all manner of other unreal linear algebra thinking. All this in just 300 or so lines of code.

The gbXML portions are also interesting. The routines end up with three sets of data for every element in the original file: XML, JSON and Three.js meshes.


## Wish list



## Issues

* 2018-06-02 ~ Theo ~ Need a spider name - preferably one without a trademark, perhaps a nice-sounding latin name: https://en.wikipedia.org/wiki/List_of_spider_common_names
* 2018-06-02 ~ Theo ~ currently surfaces, edges and opening are each their oen group of objects. Could nicer things happen if the edges and opening were children of their parent surface??


## Links of Interest

* https://www.ladybug.tools/spider/#gbxml-viewer/README.md



## Change Log


### 2018-06-04 ~ Theo

R4
* ten lines or so shorter
* And a few more internal links between Three.js data and gbJSON data


### 2018-06-02 ~ Theo

R3
* Much improved geometry dispose
* Memory information display
* Two more files to load on menu
* Add visibility toggles
* Add zoom all button
* More cleanup and updating variable names


### 2018-06-01 ~ Theo

R2
* Cleaned up and simplified version of R1

R1
* First commit
* Code almost a duplicate of gbXML Viewer R14 gbp.js

***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>



