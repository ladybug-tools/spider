<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://www.ladybug.tools/spider/#cookbook/solar-studies/raycasting/README.md "View file as a web page." ) </span>


# [Solar Studies / Ray Casting Read Me]( #cookbook/solar-studies/raycasting/README.md )


<!--
<iframe src=http://www.ladybug.tools/spider/cookbook/templates/cookbook-template-threejs-hamburger.html width=100% height=600px ></iframe>
_txt_
<span style="display: none" >Iframes are not viewable in GitHub source code view</span>
-->


## Prototype: [Raycasting 6]( http://www.ladybug.tools/spider/cookbook/solar-studies/raycasting/raycasting-6.html )

<img src=cookbook/solar-studies/raycasting/raycasting-6.png width=500 >

* Proof of concept achieved
	* Given an azimuth & altitude, a number of random objects, and a ground, the script casts rays from a number of points on the grid and calculates whether a point receives sunlight or shadow.
	* All calculations and results are measurable, reproducible and auditable

* New features
	* Button to toggle wireframe
	* Button to toggle vertex normals
	* Azimuth and alitude sliders work as intended
	* Shadows are drawn automatically at load time

***
## Prototype: [Raycasting 5]( http://www.ladybug.tools/spider/cookbook/solar-studies/raycasting/raycasting-5.html )

<img src=cookbook/solar-studies/raycasting/raycasting-5.png width=500 >

* A work-in-progress / Returning to process used in Raycasting 1
* Switching over to a single mesh composed of a number of segments per side
* Every vertex may be programme to display its own color
* No ray-casting is carried out in this demo

***

## Prototype: [Raycasting 4]( http://www.ladybug.tools/spider/cookbook/solar-studies/raycasting/raycasting-4.html )

<img src=cookbook/solar-studies/raycasting/raycasting-4.png width=500 >

* Adds soft shadows using vertex colors
* Ground is composed of individual meshes
* Warning: extremely slow because it does 50 x 50 & 6 ray castings
* Should be able to drop the casts down to 50 x 50
* Z-axis is the new up



***

## Prototype: [Raycasting 3]( http://www.ladybug.tools/spider/cookbook/solar-studies/raycasting/raycasting-3.html )

<img src=cookbook/solar-studies/raycasting/raycasting-3.png width=500 >

* Adds a Sun with user-selected azimuth and altitude
* Updates scene in 30 to milliseconds
* Highly pixelated edges

***

## Prototype: [Raycasting 2]( http://www.ladybug.tools/spider/cookbook/solar-studies/raycasting/raycasting-2.html )

<img src=cookbook/solar-studies/raycasting/raycasting-2.png width=500 >

* First commit
* Draw 5 cubes, set rays to be vertical, cast 'shadow' on 100 x 100 grid of meshes, if shadow update mesh color
* Function to soften the shade edges a bit


## Prototype: [Raycasting 1]( http://www.ladybug.tools/spider/cookbook/solar-studies/raycasting/raycasting-1.html )

<img src=cookbook/solar-studies/raycasting/raycasting-1.png width=500 >

* First commit



## Concept


## Links of Interest


## Change Log

### 2018-04-14 ~ Theo

* Raycasting 4

### 2018-04-02 ~ Theo

* First commit

***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>

