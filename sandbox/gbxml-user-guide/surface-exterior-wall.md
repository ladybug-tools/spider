
### ExteriorWall *

Documentation: The portion of the building envelope, including opaque area and fenestration, that is adjacent to one conditioned or unconditioned space and that is vertical or tilted at an angle of 60° from horizontal or greater.

* Needs single adjacency


For exterior walls with windows, the working file has this:

    <Surface id="Zone6_Srf_4" surfaceType="ExteriorWall">
      <AdjacentSpaceId spaceIdRef="Zone6_space"/>
      <RectangularGeometry>
        <Azimuth>180</Azimuth>
        <CartesianPoint>
          <Coordinate>0.000000</Coordinate>
          <Coordinate>0.000000</Coordinate>
          <Coordinate>5.000000</Coordinate>
        </CartesianPoint>
        <Tilt>90</Tilt>
        <Width>10.000000</Width>
        <Height>5.000000</Height>
      </RectangularGeometry>
      <PlanarGeometry>
        <PolyLoop>
          <CartesianPoint>
            <Coordinate>0.000000</Coordinate>
            <Coordinate>0.000000</Coordinate>
            <Coordinate>10.000000</Coordinate>
          </CartesianPoint>
          <CartesianPoint>
            <Coordinate>0.000000</Coordinate>
            <Coordinate>0.000000</Coordinate>
            <Coordinate>5.000000</Coordinate>
          </CartesianPoint>
          <CartesianPoint>
            <Coordinate>10.000000</Coordinate>
            <Coordinate>0.000000</Coordinate>
            <Coordinate>5.000000</Coordinate>
          </CartesianPoint>
          <CartesianPoint>
            <Coordinate>10.000000</Coordinate>
            <Coordinate>0.000000</Coordinate>
            <Coordinate>10.000000</Coordinate>
          </CartesianPoint>
        </PolyLoop>
      </PlanarGeometry>
      <Opening openingType="FixedWindow" id="Zone6_Srf_4_glz_0">
        <RectangularGeometry>
          <Azimuth>180</Azimuth>
          <CartesianPoint>
            <Coordinate>1.464466</Coordinate>
            <Coordinate>0.000000</Coordinate>
            <Coordinate>5.732233</Coordinate>
          </CartesianPoint>
          <Tilt>90</Tilt>
          <Width>7.071068</Width>
          <Height>3.535534</Height>
        </RectangularGeometry>
        <PlanarGeometry>
          <PolyLoop>
            <CartesianPoint>
              <Coordinate>1.464466</Coordinate>
              <Coordinate>0.000000</Coordinate>
              <Coordinate>9.267767</Coordinate>
            </CartesianPoint>
            <CartesianPoint>
              <Coordinate>1.464466</Coordinate>
              <Coordinate>0.000000</Coordinate>
              <Coordinate>5.732233</Coordinate>
            </CartesianPoint>
            <CartesianPoint>
              <Coordinate>8.535534</Coordinate>
              <Coordinate>0.000000</Coordinate>
              <Coordinate>5.732233</Coordinate>
            </CartesianPoint>
            <CartesianPoint>
              <Coordinate>8.535534</Coordinate>
              <Coordinate>0.000000</Coordinate>
              <Coordinate>9.267767</Coordinate>
            </CartesianPoint>
          </PolyLoop>
        </PlanarGeometry>
      </Opening>
    </Surface>

The current Build Well export has this:

		<Surface surfaceType="ExteriorWall" id="bw-surface-10" >
			<Name>ExteriorWall</Name>
			<CADOjectId>none</CADOjectId>
			<AdjacentSpaceId spaceIdRef="bw-space-6" />
			<PlanarGeometry>
				<PolyLoop>
						<CartesianPoint>
							<Coordinate>28.28427</Coordinate>
							<Coordinate>-35.35534</Coordinate>
							<Coordinate>12</Coordinate>
						</CartesianPoint>
						<CartesianPoint>
							<Coordinate>-28.28427</Coordinate>
							<Coordinate>-35.35534</Coordinate>
							<Coordinate>12</Coordinate>
						</CartesianPoint>
						<CartesianPoint>
							<Coordinate>-28.28427</Coordinate>
							<Coordinate>-35.35534</Coordinate>
							<Coordinate>24</Coordinate>
						</CartesianPoint>
						<CartesianPoint>
							<Coordinate>28.28427</Coordinate>
							<Coordinate>-35.35534</Coordinate>
							<Coordinate>24</Coordinate>
						</CartesianPoint>
				</PolyLoop>
			</PlanarGeometry>
			<Opening openingType="OperableWindow" id="bw-opening-10" >
				<PlanarGeometry>
					<PolyLoop>
						<CartesianPoint>
							<Coordinate>-11.31371</Coordinate>
							<Coordinate>-35.35534</Coordinate>
							<Coordinate>20.40000</Coordinate>
						</CartesianPoint>
						<CartesianPoint>
							<Coordinate>11.31371</Coordinate>
							<Coordinate>-35.35534</Coordinate>
							<Coordinate>20.40000</Coordinate>
						</CartesianPoint>
						<CartesianPoint>
							<Coordinate>11.31371</Coordinate>
							<Coordinate>-35.35534</Coordinate>
							<Coordinate>15.60000</Coordinate>
						</CartesianPoint>
						<CartesianPoint>
							<Coordinate>-11.31371</Coordinate>
							<Coordinate>-35.35534</Coordinate>
							<Coordinate>15.60000</Coordinate>
						</CartesianPoint>
					</PolyLoop>
				</PlanarGeometry>
			</Opening>
		</Surface>

Again,the only difference I see here is that we need the Rectangular Geometry addition.



****

```
	<Surface id="Zone6_Srf_4" surfaceType="ExteriorWall">
	  <AdjacentSpaceId spaceIdRef="Zone6_space"/>
	  <RectangularGeometry>
		<Azimuth>180</Azimuth>
		<CartesianPoint>
			<Coordinate>0.000000</Coordinate>
			<Coordinate>0.000000</Coordinate>
			<Coordinate>5.000000</Coordinate>
		</CartesianPoint>
		<Tilt>90</Tilt>
		<Width>10.000000</Width>
		<Height>5.000000</Height>
		</RectangularGeometry>
		<PlanarGeometry>
		<PolyLoop>
			<CartesianPoint>
				<Coordinate>0.000000</Coordinate>
				<Coordinate>0.000000</Coordinate>
				<Coordinate>10.000000</Coordinate>
			</CartesianPoint>
			<CartesianPoint>
				<Coordinate>0.000000</Coordinate>
				<Coordinate>0.000000</Coordinate>
				<Coordinate>5.000000</Coordinate>
			</CartesianPoint>
			<CartesianPoint>
			<Coordinate>10.000000</Coordinate>
			<Coordinate>0.000000</Coordinate>
			<Coordinate>5.000000</Coordinate>
			</CartesianPoint>
			<CartesianPoint>
			<Coordinate>10.000000</Coordinate>
			<Coordinate>0.000000</Coordinate>
			<Coordinate>10.000000</Coordinate>
			</CartesianPoint>
		</PolyLoop>
		</PlanarGeometry>
		<Opening openingType="FixedWindow" id="Zone6_Srf_4_glz_0">
		<RectangularGeometry>
			<Azimuth>180</Azimuth>
			<CartesianPoint>
			<Coordinate>1.464466</Coordinate>
			<Coordinate>0.000000</Coordinate>
			<Coordinate>5.732233</Coordinate>
			</CartesianPoint>
			<Tilt>90</Tilt>
			<Width>7.071068</Width>
			<Height>3.535534</Height>
		</RectangularGeometry>
		<PlanarGeometry>
			<PolyLoop>
			<CartesianPoint>
				<Coordinate>1.464466</Coordinate>
				<Coordinate>0.000000</Coordinate>
				<Coordinate>9.267767</Coordinate>
			</CartesianPoint>
			<CartesianPoint>
				<Coordinate>1.464466</Coordinate>
				<Coordinate>0.000000</Coordinate>
				<Coordinate>5.732233</Coordinate>
			</CartesianPoint>
			<CartesianPoint>
				<Coordinate>8.535534</Coordinate>
				<Coordinate>0.000000</Coordinate>
				<Coordinate>5.732233</Coordinate>
			</CartesianPoint>
			<CartesianPoint>
				<Coordinate>8.535534</Coordinate>
				<Coordinate>0.000000</Coordinate>
				<Coordinate>9.267767</Coordinate>
			</CartesianPoint>
			</PolyLoop>
		</PlanarGeometry>
		</Opening>
	</Surface>
```