<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://lasybug-tools.github.io/spider/#README.md "View file as a web page." ) </span>


[NURBS Chart Read Me]( #README.md )
====

<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/sandbox/nurbs-chart/index.html width=100% height=600px onload=this.contentWindow.controls.enableZoom=false; ></iframe>

## Full screen: [NURBS Chart Random Numbers]( http://www.ladybug.tools/spider/sandbox/nurbs-chart/index.html )

## Source code: [nurbs-chart-random-numbers.html]( https://github.com/ladybug-tools/spider/blob/master/sandbox/nurbs-chart/r1/nurbs-chart-random-numbers.html )


## Concept

### Issue / The problem to be solved

Generating smooth meshes from a limited number of controls points is tricky.

[Non-uniform rational B-spline (NURBS)]( https://en.wikipedia.org/wiki/Non-uniform_rational_B-spline ) is a mathematical model commonly used in computer graphics for generating and representing curves and surfaces. NURBS often offer good solutions for this type of charting.

Three.js has a [NURBS plugin]( https://github.com/mrdoob/three.js/tree/dev/examples/js/curves )

This is a preliminary example just to get going. It would be great to have some sample data to graph

### Mission

* Simple ways of generating complex curves
* Useful for charts
* Useful for 3D modeling

### Vision

* One day: create a routine that creates a smooth transition between two NURBS surfaces 


## Links of Interest



### Three.js Examples & Source

* https://threejs.org/examples/?q=nurb#webgl_geometry_nurbs
* https://threejs.org/examples/#canvas_geometry_nurbs
* Three.js code [NURBS plugin]( https://github.com/mrdoob/three.js/tree/dev/examples/js/curves )
* Code history https://github.com/mrdoob/three.js/issues/1799


### Reference

* Wikipedia [Non-uniform rational B-spline (NURBS)]( https://en.wikipedia.org/wiki/Non-uniform_rational_B-spline )
* Evgeny Demidov: https://www.ibiblio.org/e-notes/Splines/Intro.htm
* http://www.pilot3d.com/NurbSecrets.htm
* https://stackoverflow.com/questions/41171096/rendering-nurbs-surface-in-webgl
* http://nurbscalculator.in/
* https://nurbscalculator.wordpress.com/2016/05/12/nurbsdemo/



## To DO

* Use look-up table: https://threejs.org/examples/#webgl_geometry_colors_lookuptable
* Add vertex color according to rules
* Display location of control points
* User control over opacity and other material characteristics
* Multiple layer charts
* Display vertex and face normals
* Heads up display with details regarding current location

## Change Log

### 2017-09-16 ~ Theo

* Update Read Me
* Added menu
* Added control points plus toggle
* Added wireframe toggle
* Added rotation toggle
* Simplified the code a bit


### 2017-09-15 ~ Theo

* First commit


