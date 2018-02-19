

## Surface


### Schema GreenBuildingXML_Ver6.01.xsd

* <http://gbxml.org/schema_doc/6.01/GreenBuildingXML_Ver6.01.html#Link1A8>



### The Phase 2 Validator - Surface Element Tests (stage 3)

From <https://github.com/GreenBuildingXML/ValidatorPhase1/wiki>

The Surface elements geometry descriptions are next checked after the Space geometry. For each Surface element:

* are all required fields in place?
* are all Surface id attributes unique? This is a requirement for gbXML
* does reported children Tilt and Azimuth InnerText match the Surface polygon's normal vector representation?
* this should also work if the user puts in a CADModelAzimuth value (this code has not been started)
* Surface polygon coordinates planarity tests
* Surface counter-clockwise winding order tests (this code is currently being debated and subject for review)
* Surface polygons are all non-intersecting polygons (this code is currently being debated and subject for review)
* if there are SpaceBoundary elements defined at the Space element level, then the polygons describing both the Surface and SpaceBoundary should be identical
* do Surface elements form a valid enclosure, i.e. – how watertight is the enclosure definition
* there could be more optional checks that have not been started, like to determine if the surfaceType and adjacentSpaceId children make rational sense.


### Surface Types

Each surface type has its own page. The descriptions of each surface type are taken from the GreenBuilding gbXML-Schema on 2017-10-14:

<https://github.com/GreenBuildingXML/gbXML-Schema/blob/master/GreenBuildingXML_Ver6.01.xsd#L2071-L2149>


#### Text for copying to other text or apps

> types = [ 'InteriorWall', 'ExteriorWall', 'Roof', 'InteriorFloor', 'ExposedFloor', 'Shade', 'UndergroundWall', 'UndergroundSlab', 'Ceiling', 'Air', 'UndergroundCeiling', 'RaisedFloor', 'SlabOnGrade', 'FreestandingColumn', 'EmbeddedColumn' ];


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

### Planar Geometry

Every surface may have planar geometry elements.

Description from rom Schema:

> List of points defining a loop. There are no repeated points in the list.

> All data are global, with the assumption that positive Z is up, and if CADModelAzimuth is undefined or zero, positive X is East and positive Y is North.

> If CADModelAzimuth is defined it is the angle of positive Y to North, positive X is the vectorial product of Y and Z.

> If geometry is to be precise, use Longitude, Latitude and Elevation in the Location element to define the origin. Otherwise the origin is an arbitrary point.

> Use PlanarGeometry to define a three dimensional polygon that lies on a plane, and has no self-intersection

### Opening

Planar geometry may include openings.

The id numbers for Openings should be sequential as there may be different numbers of windows per wall or elevation.

There seems to be no description of Opening.


### Rectangular Geometry

From Schema:

> Geometry data in a form typically used in simulation engines.

> For surfaces, specify the location of the bottom-left corner with the CartesianPoint element when facing it from the outside. Also for surfaces, Tilt and Azimuth must be specified.

> If CADModelAzimuth is defined, the Azimuth value is relative to the CADModelAzimuth value rather then North. For openings, the third Coordinate should be zero or left missing. For openings, these Coordinates represent the distance of the bottom-left of the opening to the bottom-left corner of the parent surface.

> Azimuth and Tilt should not be specified for opening. There is an optional PolyLoop element, which may be used for describing the polygon shape of the surface.



#### Polyloop

Both planar geometry and rectangular geometry may include polyloops

From Schema:

> This is a two-dimensional polygon, with the origin at the point specified with RectangularGeometry/CartesianPoint.


### AdjacentSpaceID

From [Schema]( http://gbxml.org/schema_doc/6.01/GreenBuildingXML_Ver6.01.html#Link7 )

> References the ID of a Space that is bounded by this surface.

> First AdjacentSpaceId entered will determine how the referenced construction layers are ordered with the first construction layer being in contact with the outside or 2nd space listed and the last layer in contact with the first space listed.

> The outward normal of the surface, as defined by the right hand rule of the coordinates in the planar geometry element, is always pointing away from the first AdjacentSpaceID listed.

> With interior horizontal surfaces, this attribute can distinguish between ceiling and floor surfaces to avoid double-counting of floor areas, etc. If not present, the surface type can be assumed based on the description of the surface type enums. When the surfaceTypeEnum is provided and the surface attributes (i.e. adjacency, tilt angle) do not match the enumeration's description, the enumeration should have precedence.

***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>
