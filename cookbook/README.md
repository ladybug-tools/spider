<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://rawgit.com/ladybug-tools/spider/master/#cookbook/README.md "View file as a web page." ) </span>



# Cookbook Read Me

## View all the examples: [Cookbook Gallery]( #cookbook/cookbook-gallery.html )

## Coding Style

These scripts here are [cookbook]( https://en.wikipedia.org/wiki/Cookbook#Usage_outside_the_world_of_food ) style example code


### Strategies

The scripts are intended to help with rapid iteration of simple code edits. For example, choosing a pretty color or selecting a pleasing length may require the viewing of dozens of 'fails' involving editing the code, changing a number, saving it, refreshing the browser, and judging the results.

Until there is an AI debugger for ugliness, the path toward a beautiful user experience is paved with the coder's fails.

Here we use a variety of strategies in order to get up to speed at faster fails per hour.

The tricks include:

* Make the code a readable as possible
	* Avoid using symbols such as ~~ or => that requires extra mental processing
	* Make the code as much as possible like reading a line of English prose
* Use a variety of color to indicate that adjacent and connected elements are actually separate elements
* If a feature creates an element then display that element immediately and in a distinguishable manner.
	* You should not have to click to see if something is actually there
* Enable viewing everything upon loading
	* use transparency and 'exploding' element positions
* Allow as much possible user interaction as possible
	* Cookbook examples are places where you find out what crashes your app
	* Will your script survive a user entering negative numbers?
	* Can things get too big or small or invisible and come back and still be usable?
	* Preventing users from entering invalid data is a very separate issue
		* And we need to provide some cookbook examples of helping you input useful data
* Do not apply fixes for particular operating systems
	* Try to make code easier and faster to read / avoid thinking about complications / grasp the essence
	* Example: issues with iframes on Apple mobile devices
	* Example: wide lines on Widows OS with certain browsers



### Files

All the examples here are standalone files.

They follow the Three.js examples: https://threejs.org/examples/

* All HTML, CSS and JavaScript - apart from library files - are in a single HTML files



## Examples


## [http://www.ladybug.tools/spider/cookbook/01-multiple-3d-views/multiple-3d-views.html]( multiple-3d-views )

* In a typical HTML file, create multiple Three.js views of a 3D model using perspective and orthographic cameras

***

The bulk of the current set of files involves a progression of examples

## [wall-with-multiple-openings-overhangs-fins]( http://www.ladybug.tools/spider/cookbook/02-multiple-openings/wall-with-multiple-openings-overhangs-fins-r1.html )

* Given a wall of given length and height somewhere in 3D space (large transparent rectangle), divide the wall into a given number of equally spaced areas (black lines). Then fill each area with a wall segment that has an opening. The size of the opening in relation to the wall segment is determined by a given window to wall ratio. Above each opening is an overhang of given depth. To both sides of each opening are fins of a given depth (thing at the front).



## http://www.ladybug.tools/spider/blob/cookbook/03-line-with-parallel-offset/line-with-parallel-offset.html

* To be used to generate walls



## [line-with-objects-between-vertices-r2.html]( http://www.ladybug.tools/spider/cookbook/04-line-with-objects-between-vertices/line-with-objects-between-vertices-r2.html )


## [line-with-objects-between-vertices-r1.html]( http://www.ladybug.tools/spider/cookbook/04-line-with-objects-between-vertices/line-with-objects-between-vertices-r1.html )

See also notes in script menu.

Creating individual shapes between vertices rather than building a single mesh for the entire wall may make life easier when creating gbXML files

For example:

* Regarding Rectangular Geometry, it might simplify the process of ascertaining the azimuth, tilt, origin, length and height of individual surfaces
* Regarding PolyLoops, the world coordinates ( but not the local coordinates )of the shapes could used as the PolyLoop coordinate points
* It would be possible to gather this data a draw time, add the gbXML style data as userData attached to each shape and thus instantly available without further processing at any time later


## [parallel lines with shapes]( http://www.ladybug.tools/spider/cookbook/05-parallel-lines-with-shapes/parallel-lines-with-shapes.html )


* tbd


## [footprints ringed with objects]( http://www.ladybug.tools/spider/cookbook/06-footprints-ringed-with-objects/footprints-ringed-with-objects.html )


Using various polygonal footprints, create building envelope schematics that could be used to generate gbXML files

Please note that this is a coding example. It is not a demo for end users.

The example is set up to help you find errors and find things to fix. Various elements are separated and colored so as to be able to be easy to indentify in the code.

Programmers need to know that everything is there always. If you can't see it how do you know it's there? If you have to turn it on to view it - and you are reloading several time a minute then you waste tons of seconds seconds click to make stuff visible. After a while you say to yourself: show me always.

Not everything is drawn. For example, this demo creates a single slab per story and does not really identify if the slab is slabongrade/roof/ceiling whatever. The geometry is there for you to name, color, ID, duplicate, copy, or manipulate any way you wish. Creating the irregular shape is the critical thing. Duplicating the geometry 10 feet up  or down is trivial

Note that the Width slider mirrors the Length slider actions and it also mirrors the Thickness slider actions. It is useful in debugging - but could be dropped in a production version



## Full Screen: [create exportable buildings]( http://www.ladybug.tools/spider/cookbook/07-create-exportable-buildings/create-exportable-buildings.html )

## Full Screen: [sample gbXML file viewer]( http://www.ladybug.tools/spider/cookbook/07-create-exportable-buildings/test-gbxml-files/gbxml-viewer.html )


Export generated 3D building data to a gbXML file

* Click buttons to select a building footprint and pre-determined parameters
* Generate and view a JSON file with building data
* Generate, view and export a gbXML fie with the building data
* Designed to help build test cases
