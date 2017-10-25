<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://www.ladybug.tools/spider/#sandbox/build-well-qline/README.md "View file as a web page." ) </span>


# [Read Me]( #README.md )


<iframe src=http://ladybug-tools.github.io/spider/sandbox/build-well-qline/ width=100% height=600px onload=this.contentWindow.controls.enableZoom=false; ></iframe>
_Build Well qLine_
<span style="display: none" >Iframes are not viewable in GitHub source code view</span>

## Full Screen: [Build Well qLine]( http://ladybug-tools.github.io/spider/sandbox/build-well-qline/index.html )

_The code will likely become Build Well R13_


## Concept

This side project is an alternative to: http://rawgit.com/ladybug-tools/spider/master/build-well/r11/build-well.html

The code here is based on the idea of extruding a shape and making that shape follow a given path.

The code handles any shapes squares,, rectangles, stars, irregular polygons and so on. Whatever comes out of a pasta machine etc could be replicated here.

The path of extrusion - currently 2D only - may be made up of straights and curves. Pretty much whatever you can create as a line in SVG can be used as the path of the Qline.

Another thought is that there is no intention to create anything that looks 'realistic'. The idea here is to generate schematics quickly and easily. In order to speed the process a number of shapes can be displayed simultaneously. 

One you are happy with a selection, adjacent buildings could be added and the ensemble exported as a gbXML file. When projects need to be shown to clients, then the files may b open and displayed using gbXML viewer.

And, as always, it's nice to have to see things in a fun, colorful game-like fashion.

## Naming considerations

AutoCAD has a marvelous 2D drawing command titled 'polyline' - often called 'pline'

If one were to invent a new drawing command - designed to be what comes after the pline, then maybe it could be called a 'qline'. As in what comes after the letter P?

 ;-)


## Issues / To Do

* Floor/Space/Zone IDs currently higgledy piggledy
* gbXML openings, floors an overhangs
* Fix section parameters so origin is at lower left
* Add IDs to HUD readout
* Fix site settings issues 
* Start adding more shapes

## Change Log


### 2017-10-24 ~ Theo

15:03
* gbXML exporting openings, roof
22:27
* gbXML exporting most all geometry
	* And it's appearing in gbXML Reader and Opon Stdio
* IDs are progressing
* Adjacency elements are just place holders for now

### 2017-10-23 ~ Theo

Most of the day on gbXML
* Exporting floor, angle, overhangs and more
* Just got stuck on exporting openings
* A fresh morning brain should be able to fix this

### 2017-10-22 ~ Theo

Having all the shapes visible simultaneously is making debugging a lot easier. Ditto leaving a visible gap between the floors. Production versions will have these features turned off as the default.

Looks like gbXML export will be fairly straightforward to complete. After that it will be back to the shape parameters

20:37
* Many updates
* Coding much simpler than before means things faster and easier to fix and to dd new features
* gbXML export mostly working

### 2017-10-21 ~ Theo

* First commit
