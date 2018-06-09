<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page](http://www.ladybug.tools/spider/index.html#solar-well/sun-range-bitmap/README.md "View file as a web page." ) </span>

<div><input type=button onclick="window.location.href='https://github.com/ladybug-tools/spider/tree/master/solar-well/sun-range-bitmap/README.md'"
value="You are now in a GitHub web page view - Click this button to view this read me file as source code" ><div>

# [sun range bitmap Read Me]( #solar-well/sun-range-bitmap/README.md )


## Concept

* Givens:
	* a bunch of random boxes in 3D space and a ground plane
	* Any latitude and longitude
	* Any month and day of the year
	* Number of pixels per side of generated bitmap - from 16 to 512
	* Number of time slices per hour for twelve hours - from once an hour to once a minute
	* Anisotropy ( softness of shadow ) - from none to 16

* Generates:
	* Data for shadows cast by the boxes on to the surface
	* Creates a bitmap to display the calculated data
	* Applies bitmap as a material texture to a Three.js mesh
	* Generates spheres to represent position of Sun
	* Completion time ranges from sub-second to several minutes depending on parameters


## [sun range bitmap daily R1]( http://www.ladybug.tools/spider/solar-well/sun-range-bitmap/sun-range-bitmap-daily-r1.html )

<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/solar-well/sun-range-bitmap/sun-range-bitmap-daily-r1.html width=100% height=400px >Iframes are not displayed on github.com</iframe>


## [sun range bitmap R1]( http://www.ladybug.tools/spider/solar-well/sun-range-bitmap/sun-range-bitmap-r1.html )

* Single sun position only
* Contains a number of issues fixed in later release

## Wish list / To Do

* 2018-06-08 ~ Theo ~ Obtain further data from EPW files
* 2018-06-08 ~ Theo ~ Add false colors capability
* 2018-06-08 ~ Theo ~ Add actual building data from gbXML or Radiance file
* 2018-06-08 ~ Theo ~ Add add seasonal and annual output capability
* 2018-06-08 ~ Theo ~ Make even faster


## Issues



## Links of Interest



## Change Log

### 2018-06-08 ~ Theo

* First commit


***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>



