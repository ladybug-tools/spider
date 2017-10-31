
### InteriorFloor

* <http://gbxml.org/schema_doc/6.01/GreenBuildingXML_Ver6.01.html#Link1A8>
* <http://gbxml.org/schema_doc/6.01/GreenBuildingXML_Ver6.01.html#Link35C>
Documentation: The lower portion of the building envelope, including opaque area and fenestration, that has conditioned or semi-heated space above and is horizontal or tilted at an angle of less than 60 degrees from horizontal but excluding slab-on-grade floors.

* Needs double adjacency: one acting as floor other as ceiling

See notes on roof - which also apply to floor

For interior floors/ceilings, a working file may look like this:

    <Surface id="Zone3_Srf_1" surfaceType="Ceiling" >
      <AdjacentSpaceId spaceIdRef="Zone3_space" />
      <AdjacentSpaceId spaceIdRef="Zone8_space" />
      <RectangularGeometry>
        <Azimuth>90</Azimuth>
        <CartesianPoint>
          <Coordinate>10.00</Coordinate>
          <Coordinate>10.00</Coordinate>
          <Coordinate>5.00</Coordinate>
        </CartesianPoint>
        <Tilt>0</Tilt>
        <Width>8.366600</Width>
        <Height>2.509980</Height>
      </RectangularGeometry>
      <PlanarGeometry>
        <PolyLoop>
          <CartesianPoint>
            <Coordinate>0.00</Coordinate>
            <Coordinate>10.00</Coordinate>
            <Coordinate>5.00</Coordinate>
          </CartesianPoint>
          <CartesianPoint>
            <Coordinate>3.00</Coordinate>
            <Coordinate>7.00</Coordinate>
            <Coordinate>5.00</Coordinate>
          </CartesianPoint>
          <CartesianPoint>
            <Coordinate>7.00</Coordinate>
            <Coordinate>7.00</Coordinate>
            <Coordinate>5.00</Coordinate>
          </CartesianPoint>
          <CartesianPoint>
            <Coordinate>10.00</Coordinate>
            <Coordinate>10.00</Coordinate>
            <Coordinate>5.00</Coordinate>
          </CartesianPoint>
        </PolyLoop>
      </PlanarGeometry>
    </Surface>
