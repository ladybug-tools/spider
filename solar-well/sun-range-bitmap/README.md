<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page](http://www.ladybug.tools/spider/index.html#solar-well/sun-range-bitmap/README.md "View file as a web page." ) </span>

<div><input type=button onclick="window.location.href='https://github.com/ladybug-tools/spider/tree/master/solar-well/sun-range-bitmap/README.md'"
value="You are now in a GitHub web page view - Click this button to view this read me file as source code" ><div>

# [Sun Range Bitmap Read Me]( #solar-well/sun-range-bitmap/README.md )


## Concept

A set of Sun range scripts based entirely on client-side JavaScript

## Yearly

### [Sun Range Bitmap Yearly R1]( https://www.ladybug.tools/spider/solar-well/sun-range-bitmap/sun-range-bitmap-yearly-r1.html )

<iframe class=iframeReadMe src=https://www.ladybug.tools/spider/solar-well/sun-range-bitmap/sun-range-bitmap-yearly-r1.html width=100% height=400px >Iframes are not displayed on github.com</iframe>

* Draws a Sun for every 1 to 60 minutes per 12 hour day for each of the twelve months
* Select to draw for quarters or full year
* Only draws a Sun that is above the horizon


## Daily

## [Sun Range Bitmap Daily R2 Rad]( https://www.ladybug.tools/spider/solar-well/sun-range-bitmap/daily-r2-rad/sun-range-bitmap-daily.html )

* First pass at rendering for Radiance files

## [Sun Range Bitmap Daily R2]( https://www.ladybug.tools/spider/solar-well/sun-range-bitmap/daily-r2/sun-range-bitmap-daily.html )

* Various fixes


## [Sun Range Bitmap Daily R1]( https://www.ladybug.tools/spider/solar-well/sun-range-bitmap/sun-range-bitmap-daily-r1.html )

* Draw Sun for every 1 to 60 minutes per 12 hour day for any day of the year

## [sun range bitmap R1]( https://www.ladybug.tools/spider/solar-well/sun-range-bitmap/sun-range-bitmap-r1.html )

* Single sun position only
* Contains a number of issues fixed in later release

## Features

### Givens
* A bunch of random boxes in 3D space and a ground plane
* Any latitude and longitude
* Any month and day of the year
* Number of pixels per side of generated bitmap - from 16 to 512
* Number of time slices per hour for twelve hours - from once an hour to once a minute
* [Anisotropy]( https://en.wikipedia.org/wiki/Anisotropy ) ( softness of shadow ) - from none to 16

### Generates
* Data for shadows cast by the boxes on to the surface
* Creates a bitmap to display the calculated data
* Applies bitmap as a material texture to a Three.js mesh
* Generates spheres to represent position of Sun
* Completion time ranges from sub-second to several minutes depending on parameters

### Dependencies

* [mourner / Suncalc]( https://github.com/mourner/suncalc ) ~ A tiny JavaScript library for calculating sun/moon positions and phases.

> SunCalc is a tiny BSD-licensed JavaScript library for calculating sun position, sunlight phases (times for sunrise, sunset, dusk, etc.), moon position and lunar phase for the given location and time, created by Vladimir Agafonkin (@mourner) as a part of the SunCalc.net project.
> Most calculations are based on the formulas given in the excellent Astronomy Answers articles about position of the sun and the planets. You can read about different twilight phases calculated by SunCalc in the Twilight article on Wikipedia.

#### Coding Highlights

* All shadow values calculated by the script at hand
* Makes no use of Three.js lights and shadows
* Makes extensive ise of Three.js [Ray]( https://threejs.org/docs/#api/math/Ray ) and [Raycaster]( https://threejs.org/docs/#api/core/Raycaster )

#### Ground Plane Shadows

* Given a ground plane of given length and width, divides the rectangle into a grid of points
* For each point creates a ray directed at the given sun position
* Determines if there is an intersection between the point and the given Sun position
* Every point records an intersection being true or false
* Repeats process for any number of given sun positions
* Records the number of intersections at each point
* Uses the count to colorize a pixel or [texel]( https://en.wikipedia.org/wiki/Texel_(graphics) ) for every point in the grid


#### Building Model Shadows and Shade

* Coming soon



## Wish list / To Do

* 2018-06-09 ~ Theo ~ Add link to source code
* 2018-06-09 ~ Theo ~ Add sliding menu
* 2018-06-09 ~ Theo ~ Add draw analemma
* 2018-06-09 ~ Theo ~ Add select location via geocoder
* 2018-06-08 ~ Theo ~ Obtain further data from EPW files
* 2018-06-08 ~ Theo ~ Add actual building data from gbXML or Radiance file
* 2018-06-08 ~ Theo ~ Make even faster


## Issues



## Links of Interest



## Change Log


### 2018-06-09 ~ heo

* Add Sun Range Bitmap Yearly R1

Done
* 2018-06-08 ~ Theo ~ Add add seasonal and annual output capability
* 2018-06-08 ~ Theo ~ Add false colors capability < started


### 2018-06-08 ~ Theo

* First commit


***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>



