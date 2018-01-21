<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://ladybug.tools/spider/#read-gbxml/README.md "View file as a web page." ) </span>


[Ladybug Tools > Spider > gbXML Viewer Read Me]( #README.md )
====

## <i style=background-color:yellow;color:magenta >This folder will be deprecated. Updates are at [gbXML Viewer]( file:///D:/Dropbox/Public/git-repos/ladybug-tools.github.io/spider/index.html#gbxml-viewer/README.md )</i>

<hr>

<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/read-gbxml/gbxml-viewer/index.html width=100% height=600px ></iframe>

## Full Screen: [gbXML Viewer]( http://ladybug-tools.github.io/spider/read-gbxml/gbxml-viewer/index.html )

See also
* [gbXML/gbJSON File Viewer]( http://ladybug-tools.github.io/spider/read-gbxml/file-viewer/ )
* [gbXML Schema File Viewer]( http://ladybug-tools.github.io/spider/read-gbxml/gbxml-schema-file-viewer/ )

## Concept

### Issue / The problem to be solved

About gbXML

> gbXML allows disparate 3D [building information models (BIM)]( https://en.wikipedia.org/wiki/Building_information_modeling ) and architectural/engineering analysis software to share information with each other

The current set of [BIM authoring and CAD software tools]( http://www.gbxml.org/Software_Tools_that_Support_GreenBuildingXML_gbXML ) for gbXML include proprietary, closed source applications.

gbXML being open source, it would be nice to be able to view gbXML files in 3D in your browser with no fees and with open source code

The Ladybug Tools Spider gbXML Reader scripts are first steps toward making gbXML viewers readily available


### Mission

* View gbXML files in 3D or as text in your browser
	* Create gbJSON files for easier processing
* Full zoom, pan and rotate
* Run on computer, tablet and phone
* Adjust a wide variety of viewing parameters
* View the full gamut of data typically available in a gbXML file
* Open files via URL or open file dialog
* All free and open source and hosted on GitHub


### Vision

* Helping students, clients and non-AEC peeps gain access BIM data easily, quickly and freely

## To Do / Wishlist

Coming soon

* @mdengusiak: show issues by highlighting
	* This can be taken to mean two things (and both should be done):
	* Show problems with the gbXML by highlighting the elements
	* Show construction project management issues or change orders in 3D
* Lights and shadows
* Section views

## Issues

* Although basically unitless, the Build Well menus set minimum and maximum defaults based in feet

### read gbxml polyloop

* 2017-09-11 ~ Occasional mis-rotation of polyloops

### read gbxml rectangular geometry

* 2017-09-08 ~ floor slabs position incorrectly


## Links of Interest

See also:

* http://www.gbxml.org/
> gbXML is an industry supported schema for sharing building information between disparate building design software tools.

* https://github.com/GreenBuildingXML
> Repositories for all things gbXML including validator source code, test cases, and more...

* https://en.wikipedia.org/wiki/Green_Building_XML
> The Green Building XML schema (gbXML) is an open schema developed to facilitate transfer of building data stored in Building Information Models (BIM) to engineering analysis tools. gbXML is being integrated into a range of software CAD and engineering tools and supported by leading 3D BIM vendors. gbXML is streamlined to transfer building properties to and from engineering analysis tools to reduce the interoperability issues and eliminate plan take-off time.


* https://twitter.com/gbXML
> The gbXML open schema helps facilitate the transfer of building properties stored in 3D building information models (BIM) to engineering analysis tools.

* https://github.com/chiensiTB/gbXMLValidator/wiki/What-is-gbXML
> What is gbXML?


* https://greenspacelive.com/site/building-generator/
> Use the building generator for rapid production of building geometry models.


* https://carmelsoftware.tumblr.com/post/151019045304/a-progress-report-on-gbxml-validation-efforts
* http://www.grasshopper3d.com/group/ladybug/forum/topics/new-honeybee-component-import-gbxml
* https://www.linkedin.com/pulse/5-modeling-techniques-gbxml-energy-integration-jean-carriere
* https://knowledge.autodesk.com/support/revit-products/learn-explore/caas/CloudHelp/cloudhelp/2015/ENU/Revit-DocumentPresent/files/GUID-586B9574-64DA-47BC-B8EC-DEF2D565928F-htm.html
* http://inside-the-system.typepad.com/my_weblog/2012/08/how-to-export-gbxml-for-only-some-spaces.html



## gbXML Texts


types = [ 'InteriorWall', 'ExteriorWall', 'Roof', 'InteriorFloor', 'ExposedFloor', 'Shade', 'UndergroundWall', 'UndergroundSlab', 'Ceiling', 'Air', 'UndergroundCeiling', 'RaisedFloor', 'SlabOnGrade', 'FreestandingColumn', 'EmbeddedColumn' ];


* InteriorWall
* ExteriorWall
* Roof
* InteriorFloor
* ExposedFloor
* Shade
* UndergroundWall
* UndergroundSlab
* Ceiling
* Air
* UndergroundCeiling
* RaisedFloor
* SlabOnGrade
* FreestandingColumn
* EmbeddedColumn



### Surface Types

The following is taken from the GreenBuilding gbXML-Schema on 2017-10-14:

https://github.com/GreenBuildingXML/gbXML-Schema/blob/master/GreenBuildingXML_Ver6.01.xsd#L2071-L2149

The documentation lines are taken from the gbXML-Schema.

Surface types marked with an asterisk are currently recognized by gbXML Reader. Eventually all types will be handled. Please do recommend any type that should be looked after sooner rather than later.


### InteriorWall *

Documentation: The portion of the building envelope, including opaque area and fenestration, that is adjacent to two conditioned or unconditioned spaces and that is vertical or tilted at an angle of 60° from horizontal or greater.

* Needs double adjacency

### ExteriorWall *

Documentation: The portion of the building envelope, including opaque area and fenestration, that is adjacent to one conditioned or unconditioned space and that is vertical or tilted at an angle of 60° from horizontal or greater.

* Needs single adjacency

### Roof *

Documentation: The upper portion of the building envelope, including opaque areas and fenestration, that is adjacent to one conditioned or unconditioned space and that is horizontal or tilted at an angle of less than 60° from horizontal.

* Needs single adjacency

* Q: Is it OK if a single surface is used for the entire roof or must the roof be divided into multiple surfaces with individual surfaces for each space below the roof?
* A: All vertexes demarking a change of plane should be contiguous,

Open Studio accepts gbXML files with roofs that cover multiple spaces, but thi may cause issues with down stream analysis.

### InteriorFloor *

Documentation: The lower portion of the building envelope, including opaque area and fenestration, that has conditioned or semiheated space above and is horizontal or tilted at an angle of less than 60 degrees from horizontal but excluding slab-on-grade floors.

* Needs single adjacency

See notes on roof - which also apply to floor

### ExposedFloor

Documentation: The floor area exposed to non-conditioned space or outside.

### Shade *

Documentation: Documentation: Surface not adjacent to any spaces with tilt between 0° and 180°.

* Needs no adjacency
* RectangularGeometry is not essential
* CADObjectId is nice to have
* Shade surfaces indicating adjacent buildings have so need to be manifold. Thus floors may be omitted. {Theoretically, roofs and back faces could be omitted as well. )

Is the following a well-formed Shade entry? Should anything be added?

```
    <Surface surfaceType="Shade" constructionIdRef="construction-31" exposedToSun="true" id="aim0186">
      <Name>aim0186_N_Shade_sp-None</Name>
      <RectangularGeometry>
        <Azimuth>0</Azimuth>
        <Tilt>90</Tilt>
        <Height>1.23596</Height>
        <Width>22.72451</Width>
        <CartesianPoint>
          <Coordinate>-104.77550000</Coordinate>
          <Coordinate>93.755210006562</Coordinate>
          <Coordinate>23.76405000</Coordinate>
        </CartesianPoint>
        <PolyLoop>
          <CartesianPoint>
            <Coordinate>22.72450000</Coordinate>
            <Coordinate>0.00000000</Coordinate>
          </CartesianPoint>
          <CartesianPoint>
            <Coordinate>22.72450000</Coordinate>
            <Coordinate>1.23595000</Coordinate>
          </CartesianPoint>
          <CartesianPoint>
            <Coordinate>0.00000000</Coordinate>
            <Coordinate>1.23595000</Coordinate>
          </CartesianPoint>
          <CartesianPoint>
            <Coordinate>0.00000000</Coordinate>
            <Coordinate>0.00000000</Coordinate>
          </CartesianPoint>
        </PolyLoop>
      </RectangularGeometry>
      <PlanarGeometry>
        <PolyLoop>
          <CartesianPoint>
            <Coordinate>-127.50000000</Coordinate>
            <Coordinate>93.75521000</Coordinate>
            <Coordinate>23.76405000</Coordinate>
          </CartesianPoint>
          <CartesianPoint>
            <Coordinate>-127.50000000</Coordinate>
            <Coordinate>93.75521000</Coordinate>
            <Coordinate>25.00000000</Coordinate>
          </CartesianPoint>
          <CartesianPoint>
            <Coordinate>-104.77550000</Coordinate>
            <Coordinate>93.75521000</Coordinate>
            <Coordinate>25.00000000</Coordinate>
          </CartesianPoint>
          <CartesianPoint>
            <Coordinate>-104.77550000</Coordinate>
            <Coordinate>93.75521000</Coordinate>
            <Coordinate>23.76405000</Coordinate>
          </CartesianPoint>
        </PolyLoop>
      </PlanarGeometry>
      <CADObjectId>5</CADObjectId>
    </Surface>
```

### UndergroundWall

Documentation: The portion of the building envelope, including opaque area and fenestration, that is adjacent to one conditioned or unconditioned space and earth (soil) and that is vertical or tilted at an angle of 60° from horizontal or greater.

### UndergroundSlab

Documentation: Surface adjacent to one conditioned or unconditioned space and earth (soil) below grade with a tilt between 150° and 180°.

### Ceiling

Documentation: The upper portion of the building envelope that is adjacent to two conditioned or unconditioned spaces and that is horizontal or tilted at an angle of less than 60° from horizontal.

### Air

Documentation: Air membrane between two conditioned or unconditioned spaces with a tilt between 0° and 180°.

### UndergroundCeiling

Documentation: The portion of the building envelope, including opaque area and fenestration, that is adjacent to one conditioned or unconditioned space and earth (soil) and that is horizontal or tilted at an angle of less than 60° from horizontal.

### RaisedFloor

Documentation: The lower portion of the building envelope, including opaque area and fenestration, that is adjacent to one conditioned or unconditioned space and the outside and is horizontal or tilted at an angle between 150° and 180°.

### SlabOnGrade *

Documentation: The lower portion of the building envelope, including opaque area and fenestration, that is adjacent to one conditioned or unconditioned space and earth (soil) at grade with a tilt between 150° and 180°.

* Schema: two adjacencies - both linking to same space
* Open Studio: single adjacency

### FreestandingColumn

Documentation: Freestanding column in space specified by its top surface having the same ifcGUID.

### EmbeddedColumn

Documentation: Embedded column in wall specified by a surface which is coplanar with (one of) the embedding wall(s).






## Change Log


### 2017-10-14 ~ Theo

* Add more text to surface type notes


### 2017-10-09 ~ Theo

*gbXML R5 ~ back to a regular numbering system
* Improve object higlighting
* Improve lighting and shading
* Improve camera & controls distance control
* Add opacity to buildings
* Add select materials
* And quite a few other fixes

### 2017-10-05 ~ Theo

* gbXML Viewer 'Mostapha'.4
* Very messy, broken release with one nice new feature
* Adds: heads-up display(HUD) that shows details/data of the surace currently under the corsor
* Displays more (not all) meta data in side menu

### 2017-10-01 ~ Theo

* gbXML Viewer 'Mostapha'.2
* Opens and displays local files using your file dialog box

* gbXML Viewer 'Mostapha'.3
* This is the first pass at adding colors(random), lights, shade and shadow.

### 2017-09-30 ~ Theo

We have holes!

We display multiple files.

* gbXML Viewer 'Mostapha'.1
* Displays surfaces with openings reasonably well.
* Speed is OK

### 2017-09-29 ~ Theo

Preliminary release. Only handles a single model.

Next release should have usual features plus: actual holes in the surfaces and not just black blobs. After that will come colors and shading

* gbXML Viewer 'Mostapha'
* Another big jump: now depicting Surfaces and Openings
* Code quite a bit smaller and tighter


### 2017-09-28 ~ Theo

* gbXML Viewer 'Michal'.2
* Huge update! ;-)
* Handles all sorts of polyloop types - with good speed
* And I learned all about conjugating quaternions in the process ;-)



### 2017-09-25 ~ Theo

* Issue with files not being loaded: fixed?
* Adding more stats
* Add link to file
* Add link to Google Maps of there is a latitude provided
* Update camera.far by algo
* Working on css. Updates to three.js basic.html - add lights etc

### 2017-09-24 ~ Theo

* gbXML viewer Michal: mostly working
	* Simpler, more organized algorithms - probably faster
	* Drawing a higher percentage of elements as Three.js
		* Some elements still flying off into space
		* Lines are drawn when shape has not been generated


### 2017-09-23 ~ Theo

* gbXML viewer michal started
* Complete rebuild: smaller, faster smarter
* Z is up


### 2017-09-13 ~ Theo

* gbXML viewer carmel
* App titling automation
* Default menu box has random background gradient
* Select xml cleaned up
* Display gbjson cleaned up
* Add draw edges
* Getting better: text file viewer

### 2017-09-12 ~ Theo

* gbXML Viewer harriman
* Add menuing system
	* Separate UI from Three.js
* Add heads-up data readout
	* Interactive text data display
* Continued the fail on reading the data and displaying as text


### 2017-09-10 ~ Theo

* R2
* Handles non-orthogonal polyloops fairly well
* Reports various stats
* Reports the number of polyloops drawn as lines only
	* Mostly because number of vertices does equal 4

Code can use a lot of clean up.

### 2017-09-09 ~ Theo

* Add read me
* Update folder structure
* Add menu items
* Add file reader
* Update read me

### 2017-09-07 Theo

* First commit



