<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page](http://www.ladybug.tools/spider/index.html#solar-well/sun-range-gbxml-dev/README.md "View file as a web page." ) </span>

# [Sun Range gbXML Read Me]( #solar-well/sun-range-gbxml-dev/README.md )


## Concept

Can we do shadow range calculations of a 3D gbXML file and view the results in your browser?

This could become an ongoing quest.



***

_All prototypes here: Rotate|Zoom|Pan => 1|2|3 fingers/buttons_

Kindly remember that these exercises are about numeric data visualization. Any similarities to what you might observe out in the real world are merely coincidental. In other words, we can depict shade and shadow with any of the colors under the Sun.

Zoom out to view the position of the Sun.

## full screen: [Sun Range gbXML 3]( http://www.ladybug.tools/spider/solar-well/sun-range-gbxml-dev/sun-range-gbxml-3.html )

<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/solar-well/sun-range-gbxml-dev/sun-range-gbxml-3.html width=100% height=400px >Iframes are not displayed on github.com</iframe>

* Locates the center point of every 3D face in the gbXML file that has been drawn and runs a raycaster in the vector direction of the Sun.
	* If one or more intersections are found the surface is deemed to be in shade
* Draws vectors at the centers of 3D Faces
* Draws vectors indicating the direction of the Sun

The code for generating this visualization is surprisingly short and simple. It should fairly easy for people familiar with Three.js to add new features. It also runs reasonably fast and yet there are likely to be a number of opportunities to optimize the code. Thus it looks like handling larger models and producing results with finer resolution should all be quite doable.

***

## full screen: [Sun Range gbXML 2]( http://www.ladybug.tools/spider/solar-well/sun-range-gbxml-dev/sun-range-gbxml-2.html )

<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/solar-well/sun-range-gbxml-dev/sun-range-gbxml-2.html width=100% height=400px >Iframes are not displayed on github.com</iframe>

* GbXML files may be loaded via a URL or by using the standard file dialog box
* The ground plane is now set at lowest point of all 'exposedToSun; surfaces
* Rays are cast from every vertex in the vector direction of the Sun. If one or more intersects are found the vertex is deemed to be in the shade.
* As the gbXML file is being loaded any surface that is not 'exposedToSun' is discarded. This shortens and simplifies calculations
* No calculations are carried out on the gbXML model

***

## full screen: [Sun Range gbXML 1]( http://www.ladybug.tools/spider/solar-well/sun-range-gbxml-dev/sun-range-gbxml-1.html )

<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/solar-well/sun-range-gbxml-dev/sun-range-gbxml-1.html width=100% height=400px >Iframes are not displayed on github.com</iframe>
_Interesting weirdness: the ground plane is not displaying in an iframe but is displaying when full screen_

* A predefined gbXML file is loaded
* A ground plane with 100 x 100 vertices is added to a gbXML file
* Rays are cast from every vertex in the vector direction of the Sun. If one or more intersects are found the vertex is deemed to be in the shade.
* No calculations are carried out on the gbXML model

## Wish list

* See also Sun Range Dev wish list

* 2018-05-03 ~ Theo ~ draw 12 x 14 Suns
* 2018-05-03 ~ Theo ~ Link Suns to solar calculator
* 2018-05-03 ~ Theo ~ Add ability to further sub-divide the meshes
* 2018-05-03 ~ Theo ~ Add mouseover and heads-up display to obtain a results readout of the face currently under the cursor
* Export to file ??

## Issues



## Links of Interest



## Change Log


### 2018-05-03 ~ Theo

R3
* 2018-04-20 ~ Theo ~ only create shadows for exposed surfaces. build a new gbXML parser just for shading. exposed surfaces only. White Phong or basic material << done

### 2018-04-17 ~ Theo

* First commit


***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>



