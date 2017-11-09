
# Rectangular Geometry


## [Rectangular Geometry Schema Definition]( http://gbxml.org/schema_doc/6.01/GreenBuildingXML_Ver6.01.html#Link186 )

Geometry data in a form typically used in simulation engines. For surfaces, specify the location of the bottom-left corner with the CartesianPoint element when facing it from the outside. Also for surfaces, Tilt and Azimuth must be specified. If CADModelAzimuth is defined, the Azimuth value is relative to the CADModelAzimuth value rather then North. For openings, the third Coordinate should be zero or left missing. For openings, these Coordinates represent the distance of the bottom-left of the opening to the bottom-left corner of the parent surface.

Azimuth and Tilt should not be specified for opening. There is an optional PolyLoop element, which may be used for describing the polygon shape of the surface.

## Usage Notes

Rectangular geometry provides a bounding orthogonal quadrilateral representation of a gbXML Surface. Very often the surface is itself a rectangle, but rectangular geometry provides an often-needed simplification in the instance of a highly complicated polygon.


The following notes are created from readings of the gbXML Schema and using the following Open Studio example file - seb.osm - to observe values used in actual practice.

https://github.com/NREL/OpenStudio/blob/develop/openstudiocore/resources/Examples/compact_osw/files/seb.osm

_It would a good thing to have access to more files that comply with the latest revisions of Open Studio._

## Rectangular Geometry Attributes

* id
* unit

## Rectangular Geometry Children


* Azimuth
* CartesianPoint
* Tilt
* Height
* Width
* PolyLoop


### Azimuth


#### [Azimuth Schema Definition]( http://gbxml.org/schema_doc/6.01/GreenBuildingXML_Ver6.01.html#Link23 )

Polygon azimuth. The direction of the outward normal for the polygon (surface or opening) defined in RectangularGeometry element. Azimuth is measured in degrees clockwise from North, where North = 0 degrees. Examples: East = 90 deg, South = 180 deg, West = 270 deg. If CADModelAzimuth is defined, the Azimuth value is relative to the CADModelAzimuth value rather then North.

#### Alternative definitions

Take the CartesianPoint as being the origin, look straight down at the origin.

If you see a straight line, then you are looking at a vertical exteriorWall or InteriorWall and you may measure the angle the line makes with the north pointing vector. A wall facing north has an angle of zero, facing east an angle of 90 degrees, facing sout an angle of 180 degrees and facing west an angle of 270 degrees. And so on.

For most any ceiling, roof or floor there you will see the bounding rectangle for that geometry.  The rectangle is orthogonal with the XYZ axis and lies flat on the XY plane, therefore the azimuth will be zero for floors or 180 degrees ceilings for these elements in most normal situations. There may instances where the underlying geometry is also a simple rectangle placed at an angle and therefore rectangularGeometry may take the opportunity to record the angle of azimuth for that particular geometry that is npn-zero.


### Tilt

#### [Tilt Schema Definition]( http://gbxml.org/schema_doc/6.01/GreenBuildingXML_Ver6.01.html#Link1AD )

The number of degrees from up that the outside of the surface is tilted in relation to the bottom-left corner.


#### Alternative definitions

Tilt is the angle between an 'up' vector( x = 0, y  = 0, z = 1 ) and the 'normal' vector of the surface measured in degrees.

A typical vertical interior or external wall has a tilt of 90 degrees because their normals lie on the XY plane. Ditto an opening in an exterior wall. Ditto a horizontal overhang recorded as a Shade surface.

A typical horizontal roof or ceiling has a tilt of zero degrees because the normals face straight up.

A slab on grade has a tilt of 180 degrees because the normal of its 'external' face point straight down.


### Polyloop

#### [Polyloop Schema Definition]( http://gbxml.org/schema_doc/6.01/GreenBuildingXML_Ver6.01.html#Link179 )

This is a list of coordinates that make up a polygon in three-dimensional space. All coordinates must lie on the same plane. The right-hand rule applies for defining the outward normal of a surface: For every surface, points must be defined in order, such that the direction of (the average cross-product between (any point, the centroid of the surface, and the next point)) points in the direction of the outward normal, which is a vector pointing away from the first AdjacentSpaceID listed.


## Text Samples

Source OSM file on GitHub/NREL

* <https://github.com/NREL/OpenStudio/blob/develop/openstudiocore/resources/Examples/compact_osw/files/seb.osm>

gbXML file on GitHub/Ladybug-tools/spider

* <https://github.com/ladybug-tools/spider/blob/master/read-gbxml/data-files/open-studio-resources/open-studio-seb.xml>


### ExteriorWall

seb.xml lines 86-98

    <Surface id="Openarea_1_Wall_4" surfaceType="ExteriorWall" constructionIdRef="EXTERIOR-WALL">
      <AdjacentSpaceId spaceIdRef="Open_area_1"/>
      <RectangularGeometry>
        <Azimuth>255.016</Azimuth>
        <CartesianPoint>
          <Coordinate>-3.993822</Coordinate>
          <Coordinate>9.589166</Coordinate>
          <Coordinate>0.000000</Coordinate>
        </CartesianPoint>
        <Tilt>90</Tilt>
        <Width>2.142682</Width>
        <Height>3.352800</Height>
      </RectangularGeometry>


### InteriorWall

lines 124 - 137


    <Surface id="Entryway__Wall_2" surfaceType="InteriorWall" constructionIdRef="INTERIOR-WALL">
      <AdjacentSpaceId spaceIdRef="Entry_way_1"/>
      <AdjacentSpaceId spaceIdRef="Open_area_1"/>
      <RectangularGeometry>
        <Azimuth>255.016</Azimuth>
        <CartesianPoint>
          <Coordinate>1.051197</Coordinate>
          <Coordinate>5.800501</Coordinate>
          <Coordinate>0.000000</Coordinate>
        </CartesianPoint>
        <Tilt>90</Tilt>
        <Width>3.204565</Width>
        <Height>3.352800</Height>
      </RectangularGeometry>

### Opening

Note inclusion of tilt and azimuth.

seb.xml lines 239-250

      <Opening id="Sub_Surface_4" openingType="FixedWindow" windowTypeIdRef="id_3'0&quot;_x_3'0&quot;_Double_pane__Alum_Construction">
        <RectangularGeometry>
          <Azimuth>117.429</Azimuth>
          <CartesianPoint>
            <Coordinate>2.725735</Coordinate>
            <Coordinate>-0.389776</Coordinate>
            <Coordinate>0.762000</Coordinate>
          </CartesianPoint>
          <Tilt>90</Tilt>
          <Width>2.349114</Width>
          <Height>1.162901</Height>
        </RectangularGeometry>


### Ceiling

lines 626 -639

    <Surface id="Level_0_Entry_way__Ceiling_Plenum_DroppedCeiling" surfaceType="Ceiling" constructionIdRef="Default_interior_ceiling">
      <AdjacentSpaceId spaceIdRef="Level_0_Ceiling_Plenum"/>
      <AdjacentSpaceId spaceIdRef="Entry_way_1"/>
      <RectangularGeometry>
        <Azimuth>90</Azimuth>
        <CartesianPoint>
          <Coordinate>2.016195</Coordinate>
          <Coordinate>7.399743</Coordinate>
          <Coordinate>3.352800</Coordinate>
        </CartesianPoint>
        <Tilt>0</Tilt>
        <Width>2.769679</Width>
        <Height>4.495563</Height>
      </RectangularGeometry>


### SlabOnGrade

lines 816 - 828


    <Surface id="Entry_way__Floor" surfaceType="SlabOnGrade" constructionIdRef="SLAB-ON-GRADE-FLOOR">
      <AdjacentSpaceId spaceIdRef="Entry_way_1"/>
      <RectangularGeometry>
        <Azimuth>90</Azimuth>
        <CartesianPoint>
          <Coordinate>3.819538</Coordinate>
          <Coordinate>1.717808</Coordinate>
          <Coordinate>0.000000</Coordinate>
        </CartesianPoint>
        <Tilt>180</Tilt>
        <Width>2.769679</Width>
        <Height>4.495563</Height>
      </RectangularGeometry>


### Roof

lines 903 -915

    <Surface id="Level_0_Entry_way__Ceiling_Plenum_RoofCeiling" surfaceType="Roof" constructionIdRef="EXTERIOR-ROOF">
      <AdjacentSpaceId spaceIdRef="Level_0_Ceiling_Plenum"/>
      <RectangularGeometry>
        <Azimuth>90</Azimuth>
        <CartesianPoint>
          <Coordinate>2.016195</Coordinate>
          <Coordinate>7.399743</Coordinate>
          <Coordinate>3.962400</Coordinate>
        </CartesianPoint>
        <Tilt>0</Tilt>
        <Width>2.769679</Width>
        <Height>4.495563</Height>
      </RectangularGeometry>


### Shade

lines 2229 - 2241

    <Surface id="Shading_Surface_5" surfaceType="Shade">
      <AdjacentSpaceId spaceIdRef="Entry_way_1"/>
      <RectangularGeometry>
        <Azimuth>27.4286</Azimuth>
        <CartesianPoint>
          <Coordinate>1.211333</Coordinate>
          <Coordinate>2.334046</Coordinate>
          <Coordinate>-0.643738</Coordinate>
        </CartesianPoint>
        <Tilt>90</Tilt>
        <Width>2.458509</Width>
        <Height>1.253338</Height>
      </RectangularGeometry>