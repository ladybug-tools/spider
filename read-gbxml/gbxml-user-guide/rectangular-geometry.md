
# Rectangular Geometry


## Rectangular Geometry definition in Schema GreenBuildingXML_Ver6.01.xsd


* <http://gbxml.org/schema_doc/6.01/GreenBuildingXML_Ver6.01.html#Link186>


## Notes

The following notes re created from the gbXML Shema, using the following Open Studio example file - seb.osm - to observe values used in actual practice.

https://github.com/NREL/OpenStudio/blob/develop/openstudiocore/resources/Examples/compact_osw/files/seb.osm


### Azimuth


### [Azimuth Schema Definition](http://gbxml.org/schema_doc/6.01/GreenBuildingXML_Ver6.01.html#Link23 )

Polygon azimuth. The direction of the outward normal for the polygon (surface or opening) defined in RectangularGeometry element. Azimuth is measured in degrees clockwise from North, where North = 0 degrees. Examples: East = 90 deg, South = 180 deg, West = 270 deg. If CADModelAzimuth is defined, the Azimuth value is relative to the CADModelAzimuth value rather then North.


### Tilt


### [TiltSchema Definition]( http://gbxml.org/schema_doc/6.01/GreenBuildingXML_Ver6.01.html#Link1AD )

The number of degrees from up that the outside of the surface is tilted in relation to the bottom-left corner.


### Alternative definitions

The angle between an 'up' vector( x = 0, y  = 0, z = 1 ) and the 'normal' vector of the surface measured in degrees.

A typical vertical interior or external wall has a tilt of 90 degrees. Ditto an opening in an exterior wall. Ditto an overhang recorded as a Shade surface. 

A typical horizontal roof or ceiling has a tilt of zero degrees.

A slab on grade has a tilt of 180 degrees


### Polyloop

### [Polyloop Schema Definition]( http://gbxml.org/schema_doc/6.01/GreenBuildingXML_Ver6.01.html#Link179 )

This is a list of coordinates that make up a polygon in three-dimensional space. All coordinates must lie on the same plane. The right-hand rule applies for defining the outward normal of a surface: For every surface, points must be defined in order, such that the direction of (the average cross-product between (any point, the centroid of the surface, and the next point)) points in the direction of the outward normal, which is a vector pointing away from the first AdjacentSpaceID listed.