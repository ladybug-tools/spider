<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://www.ladybug.tools/spider/#cookbook/gbxml-read-rectangular-geometry/README.md "View file as a web page." ) </span>


# [gbXML Read Rectangular Geometry Read Me]( #README.md )


<iframe src=http://www.ladybug.tools/spider/cookbook/gbxml-read-rectangular-geometry/gbxml-read-rectangular-geometry.html width=100% height=600px ></iframe>
_gbXML Read Rectangular Geometry_
<span style="display: none" >Iframes are not viewable in GitHub source code view</span>

## Full Screen: [gbXML Read Rectangular Geometry]( http://www.ladybug.tools/spider/cookbook/gbxml-read-rectangular-geometry/gbxml-read-rectangular-geometry.html )


## Concept

Open a gbXML file, identify its rectangular geometry data and display this in interactive 3D in your browser

**RectangularGeometry**. Geometry data in a form typically used in simulation engines. For surfaces, specify the location of the bottom-left corner with the CartesianPoint element when facing it from the outside. Also for surfaces, Tilt and Azimuth must be specified. If CADModelAzimuth is defined, the Azimuth value is relative to the CADModelAzimuth value rather then North. For openings, the third Coordinate should be zero or left missing. For openings, these Coordinates represent the distance of the bottom-left of the opening to the bottom-left corner of the parent surface.	Azimuth and Tilt should not be specified for opening. There is an optional PolyLoop element, which may be used for describing the polygon shape of the surface.


## Links of Interest

* <http://www.gbxml.org/>
* <http://gbxml.org/schema_doc/6.01/GreenBuildingXML_Ver6.01.html#Link186>

## To Do

* 2018-01-29 ~ Interactive heads up display with output of parameters for each rectangle
* 2018-01-29 ~ Check if Polyloop data is included in rectangular geometry


## Change Log


### 2018-01-29 ~ The

R1.3
* Positioning improving but still has many issues


### 2018-01-21 ~ Theo

All the surfaces appear in a nice speedy manner.

But: Having many issues because gbXML interpret XYZ origin, origin offset, rotation and rotation origin in different ways.

Need to start with a very simple gbXML object - perhaps just a plane or cube - and work from there.



### 2018-01-19 ~ Theo

* First commit

***


# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>