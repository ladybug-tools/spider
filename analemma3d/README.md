<span style="display: none" > [You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://ibpsa2017.github.io/analemma3-3d/index.html 'View file as a web page.' ) </span>

# Analemma 3D Read Me


<iframe class=iframeReadMe src="https://rawgit.com/ladybug-tools/spider/master/analemma3d/index.html#r20/analemma3d.html" width="800" height="500" >
<img src="../images/ladybug-logo.png" >
</iframe>
_Analema3 3D showing downtown San Francisco with Hyatt Embarcadero at center_
<span style="display: none" >Not visible in GitHub source code view or small screens</span>

## Full Screen: [Analemma 3D]( https://rawgit.com/ladybug-tools/spider/master/analemma3d/index.html#r20/analemma3d.html )

Click the 'San Francisco' link for a quick demo of what this script can do. Click the title in the menu to return to this home page / read me file.


Analemma 3D has several menus:

The **Selected Destinations** menu takes you to pre-selected areas. The tooltip for each item show you the number of structures to be loaded. The greater the number of structures, the longer the file takes to load.

The **Moving / Travelling** menu allows to to enter an address or location anywhere in the world. You can use the on-screen cursor keys to go to the next tiles.

The **Map Overlays** allows you to select the type of map images you want displayed over the 3d terrain.

The **Analamma** menu allow displays the hourly analemmas for the given location and time. Analemmas are the traditional figure eight ( or infinity symbol on its side) representation of Sun positions. In 3D with geolocation and maps.

The **Sun Range** menu creates eleven suns casting shadows

The **Solar Access** menu gives you visual details of the exposure of buildings' elevations and public spaces to the sun during a desired period of the year.

Wait for the model starts rotating before proceeding further. Click in the window or press the space bar to stop the rotating.

The 3D views below enable you to rotate and pan using one three fingers or left button, scroll wheel and right button on a mouse.




## Concept

There are numerous outstanding mapping applications available these days. Many have sophisticated APIs. 
The range of features is phenomenal. The level of the quality and complexity of the code is extremely high 

One result of all this success is that entry level barriers are quite high. You have to accept what is available with the API or set of a sophisticated development environment in order to customize a complex system.

But what happens if you just want to tinker around. What if you wanted to display molecules in virtual reality? What happens if you want to put monsters on your maps and blow up buildings?

What happens if you you need a mapping tool for some kind of scientific research and that code is the important part and the mapping code should be real simple and keep out of the way.

Well, then, you have arrived at a good location.

We are here to provide you with mapping code you can tinker with and learn to hack in a day or so.


### Mission

* 3D terrain, 2D raster maps and 3D structures all visible and manipulable in in a single app
* Easy peasy, free open source entry level code
* Simple dependencies
	* Three.js for 3D
	* ShowDown for Markdown Conversion
	* Mapbox for the data tiles
* Basic code is under 900 lines / 23KB
* User interface and technical code well separated
* Carry out simple Sun-related coding exercises 



### Features

* 3D terrain for the entire Globe
* Support for 19 levels of zoom
* 3D buildings at zoom levels 15 and 16
* Many raster map overlays from Mapbox, Google, OSM etc
* Go to any location on Earth by entering a place name or address
* Display a variety of Solar parameters analemmas, solar range and solar access
* Access on tablets and mobile devices





### Vision

* Taking maps to new places

## Things you can do using the script

* Use one/two/three fingers to rotate/zoom/pan the display in 3D
	* Or left/scroll/right with your pointing device
* Click the three bars( 'hamburger menu icon' ) to slide the menu in and out
* Click the [Stats]( https://github.com/mrdoob/stats.js/ ) box in the top corner to toggle FPS / MS / MB views
* Press Control-U/Command-Option-U to view the source code
* Press Control-Shift-J/Command-Option-J to see if the JavaScript console reports any errors
* Click 'Show fps statistics' to see how many frames per second your computer is giving you




## Issues

* Not all tiles have 3D building data
* Many tiles have building footprint data only - no height data is provided



## To-Do

* 2017-07-31 ~ Add credits to Mapbox, Google, Mr.doob, GitHub and many others
* 2017-07-31 ~ Improve geoJSON reading capabilities
* 2017-07-25 ~ Select quality of raster tile display


### Source code

* <https://glitch.com/edit/#!/jaanga-terrain4>
* <http://jaanga.github.io/terrain4/terrain-tiles-structures/>
* <https://github.com/jaanga/jaanga.github.io/tree/master/terrain4/terrain-tiles-structures>


## Ladybug Web Solar Calculator 

* http://www.ladybug.tools/ladybug-web/solar-calculator-ladybug-web/#readme.md



## Change Log

### 2017-07-31 ~ Theo


* 2017-07-25 ~ Solar access


### 2017-07-28 ~ Theo

Dealt with

* 2017-07-24 ~ Most [geoJson features]( https://en.wikipedia.org/wiki/GeoJSON ) are not yet implemented
* 2017-07-25 ~ Sunlight by date, time and location
* 2017-07-25 ~ Support all zoom levels
* 2017-07-25 ~ Select source of raster tiles
* 2017-07-25 ~ Sun ranges

### 2017-07-27 ~ Theo

Dealt with

* 2017-07-26 ~ Not removing geometry and lights properly
* 2017-07-26 ~ some raster tiles incorrectly offset 
* 2017-07-24 ~ heights of buildings are frequently incorrectly calculated


### 2017-07-26 ~ Theo

* 2017-07-25 ~ Use request animation frame to control the intersection gathering to stop the app from not responding
	* Works nicely
