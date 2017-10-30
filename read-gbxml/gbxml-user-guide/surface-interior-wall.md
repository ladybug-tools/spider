### InteriorWall *

Documentation: The portion of the building envelope, including opaque area and fenestration, that is adjacent to two conditioned or unconditioned spaces and that is vertical or tilted at an angle of 60° from horizontal or greater.

* Needs double adjacency

For interior walls, the working file has:

    <Surface id="Zone8_Srf_3" surfaceType="InteriorWall">
      <AdjacentSpaceId spaceIdRef="Zone8_space"/>
      <AdjacentSpaceId spaceIdRef="Zone9_space"/>
      <RectangularGeometry>
        <Azimuth>135</Azimuth>
        <CartesianPoint>
          <Coordinate>7.000000</Coordinate>
          <Coordinate>7.000000</Coordinate>
          <Coordinate>5.000000</Coordinate>
        </CartesianPoint>
        <Tilt>90</Tilt>
        <Width>4.242641</Width>
        <Height>5.000000</Height>
      </RectangularGeometry>
      <PlanarGeometry>
        <PolyLoop>
          <CartesianPoint>
            <Coordinate>7.000000</Coordinate>
            <Coordinate>7.000000</Coordinate>
            <Coordinate>10.000000</Coordinate>
          </CartesianPoint>
          <CartesianPoint>
            <Coordinate>7.000000</Coordinate>
            <Coordinate>7.000000</Coordinate>
            <Coordinate>5.000000</Coordinate>
          </CartesianPoint>
          <CartesianPoint>
            <Coordinate>10.000000</Coordinate>
            <Coordinate>10.000000</Coordinate>
            <Coordinate>5.000000</Coordinate>
          </CartesianPoint>
          <CartesianPoint>
            <Coordinate>10.000000</Coordinate>
            <Coordinate>10.000000</Coordinate>
            <Coordinate>10.000000</Coordinate>
          </CartesianPoint>
        </PolyLoop>
      </PlanarGeometry>
    </Surface>

The current Build Well export has this:

		<Surface surfaceType="InteriorWall" id="bw-surface-11" >
			<Name>InteriorWall</Name>
			<CADOjectId>none</CADOjectId>
			<AdjacentSpaceId spaceIdRef="bw-space-6" />
			<AdjacentSpaceId spaceIdRef="bw-space-10" />
			<PlanarGeometry>
				<PolyLoop>
						<CartesianPoint>
							<Coordinate>-13.28427</Coordinate>
							<Coordinate>-20.35534</Coordinate>
							<Coordinate>12</Coordinate>
						</CartesianPoint>
						<CartesianPoint>
							<Coordinate>-13.28427</Coordinate>
							<Coordinate>-20.35534</Coordinate>
							<Coordinate>24</Coordinate>
						</CartesianPoint>
						<CartesianPoint>
							<Coordinate>13.28427</Coordinate>
							<Coordinate>-20.35534</Coordinate>
							<Coordinate>24</Coordinate>
						</CartesianPoint>
						<CartesianPoint>
							<Coordinate>13.28427</Coordinate>
							<Coordinate>-20.35534</Coordinate>
							<Coordinate>12</Coordinate>
						</CartesianPoint>
					</PolyLoop>
			</PlanarGeometry>
		</Surface>

Again, only difference is Rectangular Geometry.
