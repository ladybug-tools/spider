
### InteriorFloor *

Documentation: The lower portion of the building envelope, including opaque area and fenestration, that has conditioned or semiheated space above and is horizontal or tilted at an angle of less than 60 degrees from horizontal but excluding slab-on-grade floors.

* Needs single adjacency

See notes on roof - which also apply to floor

For interior floors/ceilings, the working file has this...

    <Surface id="Zone3_Srf_1" surfaceType="Ceiling">
      <AdjacentSpaceId spaceIdRef="Zone3_space"/>
      <AdjacentSpaceId spaceIdRef="Zone8_space"/>
      <RectangularGeometry>
        <Azimuth>90</Azimuth>
        <CartesianPoint>
          <Coordinate>10.000000</Coordinate>
          <Coordinate>10.000000</Coordinate>
          <Coordinate>5.000000</Coordinate>
        </CartesianPoint>
        <Tilt>0</Tilt>
        <Width>8.366600</Width>
        <Height>2.509980</Height>
      </RectangularGeometry>
      <PlanarGeometry>
        <PolyLoop>
          <CartesianPoint>
            <Coordinate>0.000000</Coordinate>
            <Coordinate>10.000000</Coordinate>
            <Coordinate>5.000000</Coordinate>
          </CartesianPoint>
          <CartesianPoint>
            <Coordinate>3.000000</Coordinate>
            <Coordinate>7.000000</Coordinate>
            <Coordinate>5.000000</Coordinate>
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
        </PolyLoop>
      </PlanarGeometry>
    </Surface>

The current Build Well export looks like this...

		<Surface surfaceType="InteriorFloor" id="bw-surface-18" >
			<Name>InteriorFloor</Name>
			<CADOjectId>none</CADOjectId>
			<AdjacentSpaceId spaceIdRef="bw-space-10" />
			<PlanarGeometry>
				<PolyLoop>
						<CartesianPoint>
							<Coordinate>28.28427</Coordinate>
							<Coordinate>-35.35534</Coordinate>
							<Coordinate>12</Coordinate>
						</CartesianPoint>
						<CartesianPoint>
							<Coordinate>28.28427</Coordinate>
							<Coordinate>35.35534</Coordinate>
							<Coordinate>12</Coordinate>
						</CartesianPoint>
						<CartesianPoint>
							<Coordinate>-28.28427</Coordinate>
							<Coordinate>35.35534</Coordinate>
							<Coordinate>12</Coordinate>
						</CartesianPoint>
						<CartesianPoint>
							<Coordinate>-28.28427</Coordinate>
							<Coordinate>-35.35534</Coordinate>
							<Coordinate>12</Coordinate>
						</CartesianPoint>
					</PolyLoop>
			</PlanarGeometry>
		</Surface>