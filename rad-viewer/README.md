<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://www.ladybug.tools/spider/#rad-viewer/README.md "View file as a web page." ) </span>
<input type=button onclick="window.location.href='https://github.com/ladybug-tools/spider/blob/master/rad-viewer/README.md'"
value="You are now in a GitHub web page view - Click this button to view this read me file as source code" >

# [Rad Viewer Read Me]( #solar-well/rad-viewer/README.md )


<iframe class=iframeReadMe src=https://www.ladybug.tools/spider/rad-viewer/r12/rad-viewer.html width=100% height=400px >Iframes are not displayed on github.com</iframe>

_Latest project here_

## Concept

View RAD files produced by [Radiance]( https://radiance-online.org/ ) scripts in interactive 3D in your browser.

This is an ongoing learning and development effort. Please feel free to request to any particular Radiance feature to be added to this viewer as a priority.

## Link you can use for latest stable version: <https://www.ladybug.tools/spider/rad-viewer/>

***

## full screen: [rad viewer 12]( https://www.ladybug.tools/spider/rad-viewer/r12/rad-viewer.html )

* Adds capability to read multiple files from a local folder
	* Files must be set up as or as if exported from Honeybee - see image below

<img src='https://www.ladybug.tools/spider/images/rad-viewer-folder.png' height=300 >

## full screen: [rad viewer 11]( https://rawgit.com/ladybug-tools/spider/master/rad-viewer/r11/rad-viewer.html )

* Files forked to top level folder
* Add ability to load RES Files
* Add two hard-wired demos: 'London Office' and 'Bristol Clifton Downs'

## full screen: [rad viewer 10]( https://rawgit.com/ladybug-tools/spider/master/rad-viewer/r10/rad-viewer.html )

* Rendering JavaScript extracted into separate file and namespaced ( made code safer and more reusable)
* Add ability to load and display PTS files with data displayed as Three.js Sprites
	* Reduce the opacity in order to view PTS data
	* Note: loading of RES files not yet supported


## full screen: [rad viewer 9]( https://rawgit.com/ladybug-tools/spider/master/rad-viewer/rad-viewer-9.html )

* Draws 'holes' correctly
	* Uses _ad hoc_ rules to reorder vertices
	* Appears to display the geometry of all the examples as expected (but may not complete on very large files )
	* Maintains reasonable speed

## full screen: [rad viewer 8]( https://rawgit.com/ladybug-tools/spider/master/rad-viewer/rad-viewer-8.html )

* Adds very basic color rendering - plastic only no specular no lights
* More demo files added from gjward1
* Improved data parsing


## full screen: [rad viewer 7]( https://rawgit.com/ladybug-tools/spider/master/rad-viewer/rad-viewer-7.html )

* Now loads files asynchronously with no issues
* More demo files added from [rndmStff]( https://github.com/rndmStff/radModels )
* Zoom all button added
* Various minor tweaks to help with loading added


## full screen: [rad viewer 6]( https://rawgit.com/ladybug-tools/spider/master/rad-viewer/rad-viewer-6.html )

* Open files using file dialog box
* Open files via URL as a location.hash string
* Links to nine sample files
* Now ignores geometry it does not know how to draw


## full screen: [rad viewer 5]( https://rawgit.com/ladybug-tools/spider/master/rad-viewer/rad-viewer-5.html )

* Beginning to read files with !xform

## full screen: [rad viewer 4]( https://rawgit.com/ladybug-tools/spider/master/rad-viewer/rad-viewer-4.html )

* Handles polygons with any number of vertices
* Adds opacity slider
* Adds edges and edges toggle
* Add link to sample file

## full screen: [rad viewer 3]( https://rawgit.com/ladybug-tools/spider/master/rad-viewer/rad-viewer-3.html )

* Add better handling of text attributes in RAD data files
* Better handling of face data

Full polygons with greater than four sides still to be done


## full screen: [rad viewer 2]( https://rawgit.com/ladybug-tools/spider/master/rad-viewer/rad-viewer-2.html )

* Add local file open, read and display
* Add toggle rotation
* Add toggle wireframe view

There seems to be small errors here and there with openings. I have not yet identified the data not being rendered properly.

## full screen: [rad viewer 1]( https://rawgit.com/ladybug-tools/spider/master/rad-viewer/rad-viewer-1.html )



## Wish list

* 2018-05-28 ~ Theo ~ Project points and shades onto a canvas tag to be used as a texture for the floor slabs in 3D
* 2018-05-22 ~ Theo ~ Add ways of selecting what to render and what to ignore on very large files

## Issues

* 2018-05-28 ~ Theo ~ shadow points not deleted when a new model is loaded


## Links of Interest

Rad Models
* https://github.com/rndmStff/radModels
* http://radsite.lbl.gov/radiance/pub/objects/

Radiance Software
* https://github.com/NREL/Radiance
* https://radiance-online.org/
* http://radsite.lbl.gov/radiance/framer.html
* https://rawgit.com/NREL/Radiance/master/doc/ray.html <<
* http://radsite.lbl.gov/radiance/refer/refman.pdf
* http://radsite.lbl.gov/radiance/book/
* https://nrel.github.io/Radiance/doc/ray.html

Radiance Materials
* https://github.com/NREL/Radiance/blob/master/doc/notes/materials

Ladybug Tools / Honeybee
* https://www.ladybug.tools/honeybee.html

Ladybug Tools / HydraShare
* https://hydrashare.github.io/hydra/index.html

Hydra is a platform for sharing Grasshopper and Dynamo files. The HydraShare landing page has links to dozens of pages. Each page page displays two or more images, a description and a link to download the source code. The images usually show a screen capture of the Grasshopper visual programing screen and a screen capture of the output. The descriptions are generally brief and provide just a hint as to the purpose and the scope of the project. The only way to attain a clear picture uf the script is to download,install and run it. Running the script require that Rhino and Grasshopper are already installed

Documentation
* https://legacy.gitbook.com/book/ladybug-tools/honeybee-primer/details
	* Reference manual for the Honeybee visual programming language
	* Provides a list of parameters for each available function


Sunshine

* https://en.wikipedia.org/wiki/Sunshine_duration
* https://en.wikipedia.org/wiki/List_of_cities_by_sunshine_duration

More
* https://github.com/tudelft3d/Solar3Dcity


Octree format
* http://radsite.lbl.gov/radiance/refer/filefmts.pdf

### [Radiance Online ]( https://www.radiance-online.org/ )

* Radiance is a suite of programs for the analysis and visualization of lighting in design.

### [Rad Viewer]( #solar-well/rad-viewer/README.md )


### [Radiance Sample Data Files]( https://www.ladybug.tools/spider/#radiance-sample-files/README.md )

* * A collection of Radiance sample data for for testing and experimenting

* <https://stackoverflow.com/questions/41706208/how-do-i-create-a-3d-polygon-from-a-series-of-3d-points-in-three-js>


## Change Log


### 2018-05-28 ~ Theo

R12

### 2018-05-24 ~ Theo

R11
Fixed
* Need to be fully namespaced
* Needs to be packaged in separate stand-alone JavaScript file
* Wireframe toggle not working

### 2018-05-18 ~ Theo

R8
* Adding to read me

### 2018-05-14 ~ Theo

R6

### 2018-04-1 ~ Theo

* First commit

***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>



