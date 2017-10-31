

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

The following is taken from the GreenBuilding gbXML-Schema on 2017-10-14:

<https://github.com/GreenBuildingXML/gbXML-Schema/blob/master/GreenBuildingXML_Ver6.01.xsd#L2071-L2149>

The documentation lines are taken from the gbXML-Schema.

Surface types marked with an asterisk are currently recognized by gbXML Reader. Eventually all types will be handled. Please do recommend any type that should be looked after sooner rather than later.


#### Openings

Openings should be Id'd sequentially as there may be different numbers of windows per wall or elevation.


#### Text for copying to other text or apps

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
