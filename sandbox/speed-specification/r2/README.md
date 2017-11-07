

# [SPEED Spec R2 Read Me]( ./readme.html#README.md )

### Full screen: [Speed Spec R2]( http://www.ladybug.tools/spider/sandbox/speed-specification/r2/index.html )


## Concept

As with so many issues relating to climate change, the problem in the building industry is that too little is done to late. The tools to model energy efficiency in construction projects is expensive, time-consuming and complex.

The intent of this project is to give designers fast, easy, cheap tools to enable potential energy consumption at the earliest stages of consumption.

This particular set of tools to set up to generate a variety of 3D building shapes and sizes and export these models  to industry standard data files that can be easily imported to current energy-usage modelling applications.


## About this script

### Script title is link to reload page

Clicking the title of the Speed Spec script reloads the page.

As with any _beta_ script, it's good practice to reload the script frequently. The more you reload, the less you crash. The less you crash, the more you can explore. The more you explore, the more you can find things you like.


### Octocat (GitHub) logo is link to source code

Clicking the Octocat icon should take to to the relevant source code or read me file on GitHub


### Five buttons on left Menu

Clicking any of the five buttons causes a different page of data input to display. Each button is associated with and HTML ```<div>``` tag. The 'Geometry' button controls elements in the ```<div>``` with the id of 'divGeometry', the 'Envelope' button is connected to elements in the ```<div>``` with  id of 'divEnvelope'.

Each of the five buttons also has a related JavaScript file. The 'Space Layout' button is connected to 'space-layout.js' and so on.

There is also a sixth JavaScript file that loads and initiates the [Three.js]( https://threejs.org ) library. This library is used to display the the 3D data inside of the two ```<canvas>``` tags on the right side of the screen.

Clicking any of the five buttons toggles on the display of its ```<div>``` and turns off the display of the other. This interaction along with the various inits is handled in the primary HML file.


### Script data

All significant session data is stored in JavaScript objects inside the Three.js session embedded in the canvas tags.

Two variables: 'campus' and 'theBuilding' hold most of the relevant data.


### Geometry.js

The only script of any complexity is geometry is geometry.js. It has two primary tasks

1. Generate a building plan or profile given area, length, width, thickness, number of storeys, storey height and orientation along with other minor decorative features in such a manner that it is possible to edit one of the parameters such that all the other parameters update and yet one of the parameters - area in this instance - remains constant.

2. Gather all the data generate in part 1 and display that data all with real-time user interaction with a 3D visualization including pan, zoom, rotate, opacity and more at 60 frames per second.

The data viz pat currently supports two functions createShape() and createQlineMesh(). The former is a dozen lines of codes and generates simple extruded profiles. The latter is hundreds of lines and generates the decorated shapes.

By commenting and uncommenting code the programmer may select which routine is used

#### Issue: 2D shape generation

The primary real-time number crunching for shape generation arises from the intention to keep the total area of the shape in square or cubic units constant while updating the length, width, number of storeys and 'thickness' of a building or updating the area and having the other parameters update as one would anticipate - ie not too long or short. This generates 5! or 120 interactions to be considered for each of four selected shapes. There are other parameters involved - such as the angle of orientation of a shape - but none of these interact with the area as the previously mentioned variables do.

The current effort is still at an early stage. The code displays [race conditions]( https://en.wikipedia.org/wiki/Race_condition ) and other errant behavior. Nonetheless the problem is interesting, does not appear to be intractable and development should be continued

In the current code base there is much duplication of code for the generation of a scaled path for each shape. This is semi-intentional because:

> It’s much easier to recover from no abstraction than the wrong abstraction


#### Issue: 3D mesh visualization

The next generation of these scripts should probably be based on the idea that the numeric data inputs are directly translated into gbXML at run time and all data visualization is carried out by a high-speed fully-featured gbXML viewer.


#### Issue: qLine futures

The underlying code for gnerating the 3D display can be used all matter of shapes, Future generations of these scripts should build upon the possibilities.


### Export-gbgbxml.js

This script, while not as intellectually demanding as geometry.js, requires extreme fastidiousness and attention detail.

The task of this script is to take the data from the various inputs and generate a valid [gbXML]( http://www.gbxml.org/ ) file.

The intent is to be able to take the numeric data inputs and translate the directly into gbXML. Currently, however, the gbXML export code does rely on the generated 3D visualization for some aspects of its data input


#### Issue: Naming gbXML-related variables sensibly

Currently the primary variable names are 'campus', 'buildings', and 'theBuilding'. In the brief course of development, various properties have jumped from one object to another. The next generation of scripts should clean up the object and property structure. The structure should more closely follow the patterns established by gbXML. For example, with gbXML the different levels of a building are called 'storeys' rather than the more common word 'floor'. Thus 'storey- should be preferred over 'floor' when creating property names.


#### Issue: gbXML tag and value separation.

Currently the code is based on a grab bag of XML tag strings and object property values in the process of being generated. Given that generating XML is quite trivial, the next generation should create and update values using JSON and then translate to this to XML once all the relevant values have been created.

A side benefit to this process is that the JSON file might be readable by the gbXML viewer - which would facilitate real-time viewing via a full-featured viewer.



### Coding style

A good coding practice is to follow the coding style of the primary library used. Since this script builds on Three.js, the coding style used here follows the specification described in [Mr.doob's Coding Style]( https://github.com/mrdoob/three.js/wiki/Mr.doob's-Code-Style%E2%84%A2 ).



## Change Log


### 2017-11-07 ~ Theo

* Add to read me

* speed-spec-r2.html
	* Add text to divZones: 'Please first select a shape;
* adjacent-buildings.js
	* Clean up code, add license
* geometry.js
	* Clean up code, add license
	* Openings now black and opaque
* init-threejs.js
	* Clean up code, add some missing declarations
	* Add license
	* Update light parameters
* envelope.js
* space-layout.js
	* Clean up code, add license
* export-gbxml.js
	* Clean up code, add license
	* Fix up shape names and generated export file name