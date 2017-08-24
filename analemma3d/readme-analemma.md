Analemma Read Me
====

_This is the read me for Analemma 3D R1. Needs much updating._

## Concept

### Mission

* To display one [analemma]( https://en.wikipedia.org/wiki/Analemma ) for every hour of the day in 3D at any location on Earth as displayed on a 2D map
* To display the position of the Sun - using [azimuth and altitude]( https://en.wikipedia.org/wiki/Azimuth ) - for any date and time at any location on Earth
* To display the shade and shadows cast by 3D objects onto themselves and the ground

### Vision

* To experience, understand and make more useful the characteristics and power of sunlight
* To help designers plan for sunlight - or lack of it
* To help you see time in new ways


### Features

* 3D plot of analemmas of Sun azimuth and altitude once an hour for all the days of the year.
	* Varying colors indicate the months
	* Lines connect each hour on the 21st of the month
	* Midnight placard highlighted in blue. Noon highlighted in yellow
	* Placards indicate the hour of each analemma
	* Displays current position of sun
	* Displays a transparent yellow band indicating the total annual sun path
	* Displays shadow and shade
* Maps
	* Displays nine types of map
	* Update map zoom and opacity
* Reference Objects
	* Displays a reference object - to indicate shade and shadow coverage
		* [Trylon and Perisphere]( https://en.wikipedia.org/wiki/Trylon_and_Perisphere )
		* Stonehenge
		* Gnomen
	* 3D arrow shows direction of north
	* Toggle visibility o
* Menu panel - display and set a variety of information including:
	* Latitude and longitude
	* Local and UTC time
	* WIP: Sun azimuth and altitude
	* Time zone name, id and offset in hours
	* Display of elements
	* Type of map and map parameters
* WIP: Permalink support
	* Supports latitude, longitude and place name
	* Links you can try:
	* [Paris]( https://ladybug-tools.github.io/ladybug-web/analemma-3d/index.html#48.8566#2.3522#Paris )
	* [Honolulu]( https://ladybug-tools.github.io/ladybug-web/analemma-3d/index.html#21.3#-157.8167#Honolulu )
	* [Isfahan]( https://ladybug-tools.github.io/ladybug-web/analemma-3d/index.html#32.6333#51.6500#Isfahan )
	* [London]( https://ladybug-tools.github.io/ladybug-web/analemma-3d/index.html#51.5072#-0.1275#London )
	* [New York]( https://ladybug-tools.github.io/ladybug-web/analemma-3d/index.html#40.712#-74.0059#New_York )
	* [Rio de Janeiro]( https://ladybug-tools.github.io/ladybug-web/analemma-3d/index.html#22.9068#-43.1729#Rio_de_Janeiro ) << issues
	* [San Francisco]( https://ladybug-tools.github.io/ladybug-web/analemma-3d/index.html#37.796#-122.398#San_Francisco )
	* [Sydney]( https://ladybug-tools.github.io/ladybug-web/analemma-3d/index.html#-33.8650#151.2094#Sydney )


## Things you can do using the script

* Use one/two/three fingers to rotate/zoom/pan the display
* Click the three bars( 'hamburger menu icon' ) to slide the menu in and out
* Click in the location box and update the current center
* Drag the date and time sliders to change the position of the sun
* Click the triangles in the menu to open and close menu items
* Toggle the display of any of items in the 'Display & Map' panel
* Use the slider to update the radius of the analemma or the scale of the reference objects
* Selected a different source for the maps
	* 2016-06-02 - only Google Maps working right now. ;-(
* Edit the map zoom level and opacity


_If you are in '[Home Page View]( https://ladybug-tools.github.io/ladybug-web/analemma-3d/#readme.md )', you can do all this in the window just above._

## Things you can do by editing the code
<!--
<iframe src='https://ladybug-tools.github.io/ladybug-web/ace-view-r1.html#
	https://ladybug-tools.github.io/ladybug-web/analemma-3d/analemma-3d-r16.html' width=100% height=600 ></iframe>

<input type=button onclick=window.location.href='https://github.com/ladybug-tools/ladybug-web/blob/gh-pages/analemma-3d/analemma-3d-r16.html';
value='Ladybug Web Analemma 3D: the entire source code listing' >
-->

* Open this file: https://github.com/ladybug-tools/ladybug-web/blob/gh-pages/analemma-3d/analemma-3d-r16.html
* Click the 'Raw' icon and save the raw file to your computer
* Once you've downloaded the file, you can click it to run it.
* Open the file with a text editor
* Scroll to line 39 and comment out - add '//' - the default location of Sydney
* Uncomment - remove the '//' - on Paris or Chile.
* Save and reload
* Press Control-U/Command-Option-U to view the source code
* Press Control-Shift-J/Command-Option-J to see if the JavaScript console reports any errors



## Issues

* Sun band not updating properly
* Firefox: if script is top window and sharing 'not now' is selected, then script fails to complete loading - but does load if not in top window - see script running at top of read me




## Things To Do / Road Map / Wish List

* Update sun position every minute
* Ring bell every quater hour
* Fix permalink support
* Fix display of altitude and azimuth numbers
* Add correct tilt to gnomen
* Add multiple types of gnomen
* Add choices of overlays of typical dial diagrams from history
* Add shadow 'trail' - line of, say, last 100 points that tip of shadow has passed through
	* Otherwise known as 'snail slime'
* Add wide lines
* If not top window, don't just go to Sydney but go to a location where the Sun is shining
* Add more Solar calculations - from Solar calculator
* Background: color, gradient or skybox
* Add 3D cartography
* Add the ability to change the north point based on an angle?
	* Select type of north point
* Add an option to re-scale the sun path
* Do something when Google API reports no time zone
* Animations / lighten end darken sky
	* Every hour of every day
	* Every day at same hour
* Start moving some of the code into libraries
* How best to display daily sun path?
	* As in lower left of [Sun Path 3]( http://andrewmarsh.com/apps/releases/sunpath3d.html )
* Predict the amount of solar energy that arrives at any given location
* Menu
	* Add a button for top view?
* Permalink support
	* Add date and time


## Development Stages

The script appears to be ready for testing and commenting by a small number of knowledgeable computer users.

The next major update is likely to focus in creating more dependencies. See Dependencies.

A subsequent upgrade is likely to focus on adding new features such 3D cartography



## Goals

* Do everything the following scripts do:
	* Animations from [Sun Position Calculator]( http://www.pveducation.org/pvcdrom/properties-of-sunlight/sun-position-calculator )
	* Data from [SunCalc.org]( http://www.suncalc.org/ )
	* UI aspects from [Sun Path 3]( http://andrewmarsh.com/apps/releases/sunpath3d.html )

Are there other analemma app or scripts that do things that this script could do as well?

Add link to Wikipedia entry?



## Dependencies

This script depends on [Ladybug Web Solar Calculator]( https://ladybug-tools.github.io/ladybug-web/solar-calculator-ladybug-web/ ).
When that scripts add features - such as calculating solar noon - then those features will be added to Ladybug Web Analemma 3D.

See this script for credits and links of interest regarding solar calculations

The drawAnalemma and associated functions are likely to be extracted and converted into standalone, more easily reusable .JS files

The geolocation functions are likely to be extracted and converted into standalone, more easily reusable .JS files



## Links of Interest

* https://en.wikipedia.org/wiki/Analemma
* [Motions of the Sun Simulator]( http://astro.unl.edu/naap/motion3/animations/sunmotions.html )
* [Imgur: How the sun looks when you take a pictures at the same place and time every week for a year]( http://imgur.com/61YTxQ2 )
	* See also more links in the comments
* [StackEchange: How does the appearance of the analemma vary with latitude?]( http://astronomy.stackexchange.com/questions/12590/how-does-the-appearance-of-the-analemma-vary-with-latitude )
* [Science Blog: Why Our Analemma Looks like a Figure 8]( http://scienceblogs.com/startswithabang/2009/08/26/why-our-analemma-looks-like-a/ )
* [Stanford Solar Center: Viewing and Understanding the Analemma]( http://solar-center.stanford.edu/art/analemma.html )
* [analemma.com]( http://www.analemma.com/pages/framespage.html ) << mostly broken
* [Figure-Eight in the Sky]( http://www.astronomycorner.net/games/analemma.html ) - inclueds C Sun position code
* [The Analemma Dilemma]( http://www.math.nus.edu.sg/aslaksen/projects/Hannalemma.pdf )
* [Analemmas on the gnomon and on the dial plate]( http://www.illustratingshadows.com/analemma.pdf )
* [analemma.space]( http://analemma.space/ ]

### Sun-related

*  http://naturalnavigator.com/find-your-way-using/sun

Please add links!


## Change Log

### 2017-03-12

* Fix ladybug tools rename issues
* Fix color keyword issues

### 2016-07-13 ~ R18

* Adds update the time every minute
* Add play appropriate Westminster chime on the quarter hour
	* No hourly bongs yet
	* No way to turn off sound yet
	* Will only update if tab is visible

### 2016-07-09 ~ R17

* Move location to above lat & lon
* Edit error messages
* Add degree symbols where appropriate
* Indicate azimuth and altitude of sun in current position
	* Error in numbers as displayed: to be fixed
* All map types now display properly
	* Open Street Maps - and other maps - not showing because of HTTPS issues
* Add display of current map source and copyright notice to lower right corner
* Fix toggle display on gnomen
* WIP: Permalink support started << 2016-06-26 ~ Mostapha wants!
* Add pop up message to encourage clicking the info icon

### 2016-07-06 ~ R16.3

* Add Stonhenge
* Add gnomen
* Add toggle display of 3D objects
* Set initial position of sun to 149,597,870,700 meters away from earth ( 1 astronomical unit)
* Update title panel
* Make hamburger more visible

### 2016-06-26 ~ R16

* Update read me
* Add intensity of Sun light slider
* Add auto-rotate
* Update menu wording
* Add auto-rotate with check box toggle
* Sun is now bright yellow
* Default location displays properly
* Add turn off casting and receiving of shadows whenever the sun is below the ground plane/horizon.
* When not in top window does not give error message - just stays quiet

### 2016-06-25 ~ R15

* Analemma line colors by vertex to indicate month << Thank you Art Scott
* Placard colors indicate noon and midnight
* Correct display of source code


### 2016-06-07

* Tweaks

### 2016-06-02

* Add much to this read me
* Add Iframe/image of the script
* Add source code view of the script


### 2016-05-23

* Add more visibility toggles
* Streamline UI


### 2016-05-21 / R13.2

* Update readme
* Add more display toggles
* Add to global vars


### 2016-05-20 / R13

* UI simplified
* Work on sun band placement
* Update readme


### 2016-05-17 / R12

* Using Ladybug Web Solar Calculator
	* Replaces Agafonkin calculator as used in previous releases
	* Work in progress
	* Works OK in NW lats/lons only
* Sun band positioning is improving
* Minor code clean-up


### 2016-05-01 / R11

* Add geolocation
* Add geoencoding
* Add reverse geoencoding
* Remove gazetteer


### Latest update: 2016-03-22 / R10

* Add arcs for 21 of each month
* Add a north arrow

### Latest update: 2016-03-21 / R9

* Analemmas are no longer upside down
* Calculates analemma for every day of month - not just first 28 as in previous release
* Add transparent yellow band to indicate full Sun path


### Latest update: 2016-03-20 / R8

* Code clean-up and updates to many variable names
	* Always room from improvement
	* Now mostly based on init, set and get paradigm
* Analemma and sun position logic mostly - but not all - OK
* Improve action of date sliders
* Fixed updates time zone data always updating - even if no lat/lon changes
* Light shadow box included just for debug - zoom out to see it all


### Latest update: 2016-03-19 / R7

* Code clean-up and updates to many variable names
	* Making variable names more meaningful and consistent
* Add Sun mesh and direction light
	* Positions update with each slider movement
* Add shadows and shade
* Add Trylon and and Perisphere reference/demo objects
* Add more time-updating capabilities
* Random location at load time

### Latest update: 2016-03-18 / R4/R5/R6


* Mostapha's magic fixes
* Many new UI features
* Gazetteer

***

<center title="Ladybug Web" >
# <a href=javascript:window.scrollTo(0,0); style=text-decoration:none; ><img src="https://rawgit.com/ladybug-tools/ladybug-web/gh-pages/images/ladybug-logo.png" width=48 ></a>
</center>