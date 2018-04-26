<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page](http://www.ladybug.tools/spider/index.html#gbxml-viewer/r13/gv-ran-sun-range/README.md "View file as a web page." ) </span>

# R13 gbXML Viewer9 Sun Range Read Me

<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/gbxml-viewer/r13/gv-ran-sun-range/gv-ran.html width=100% height=400px >Iframes are not displayed on github.com</iframe>


## Full screen: [gbXML Viewer Sun Range]( http://www.ladybug.tools/spider/gbxml-viewer/r13/gv-ran-sun-range/gv-ran.html )


## Concept

Create eleven suns casting shadows

### Mission

* Display a shadow range for any date at any latitude and longitude
* Open and display the 3D model of your choice
* Adjust all parameters so as to create a meaningful and useful displays

### Features
* Calls Google Maps API > [Time Zone API]( https://developers.google.com/maps/documentation/timezone/start )to determine time zone, date and time information for the selected latitude and longitude
* Calls on [Ladybug Web Solar Calculator]( https://ladybug--tools.github.io/ladybug-web/solar-calculator-ladybug-web/#readme.md ) to perform essential solar calculations
	* Supplies Sun azimuth and altitude given time, latitude and longitude
* Display Sun shadow range according to date, latitude and longitude
	* Midnight highlighted is blue. Noon highlighted in yellow
	* Placards indicate the hour of each sun
	* Displays current position of sun
	* Displays shadow and shade
	* 3D arrow shows direction of north
* Information panel displays a variety of information including
	* Latitude and longitude
	* Selected time
	* If not top window - ie in an iframe - information panel does not display
* Supports permalinks for the following parameters
	* Only the parameters that need changing need to appear on the location.hash
	* See below for complete list of parameters



## Things you can do using this script

* Use one/two/three fingers to rotate/zoom/pan the display in 3D
	* Or left/scroll/right with your pointing device
* Click the three bars( 'hamburger menu icon' ) to slide the menu in and out
* Click the [Stats]( https://github.com/mrdoob/stats.js/ ) box in the top corner to toggle FPS / MS / MB views
* Press Control-U/Command-Option-U to view the source code
* Press Control-Shift-J/Command-Option-J to see if the JavaScript console reports any errors


## Links of Interest

* [Wikipedia Sun Path]( https://en.wikipedia.org/wiki/Sun_path )
* [Wikipedia Position of the Sun]( https://en.wikipedia.org/wiki/Position_of_the_Sun )
* [Generate Simple Shadow Study in Rhino]( http://performance-and-form.com/projects/generate-simple-shadow-study-in-rhino/ )
* [SketchUp Shadow Study / Solar  Tutorial]( http://kjzhang.freehostia.com/sketchup_shadow_study_tutorial.html )
	* Requires use of PhotoShop to build a composite of multiple images
* [Ecotect: Shadows & Sunlight Hours]( http://sustainabilityworkshop.autodesk.com/buildings/ecotect-shadows-sunlight-hours )
* https://lumion3d.com/ ??


## Wish list

* 2018-01-13 ~ Add a ground that can be repositioned
* 2018-01-13 ~ Set analemma radius / and other parameters

## Issues

* 2018-01-13 ~ possible to enter invalid dates


## Change Log


### 2018-04-26 ~ Theo

R13.9
* First commit

### 2018-03-25 ~ Theo

R12.10


### 2018-01-17 ~ Theo

* Add get UTC offset from Google Maps API

Done
* 2018-01-13 ~ Not updating Sun Range when new model loaded

### 2018-01-16 ~ Theo

need to add

https://developers.google.com/maps/documentation/timezone/intro


### 2018-01-13 ~ Theo

* Sun range mostly working
* Add much text to read me

### 2018-01-12 ~ Theo

* Sun range partially working

### 2018-01-11 ~ Theo

* first commit

***


# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>



