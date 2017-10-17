

### Shade *

Documentation: Documentation: Surface not adjacent to any spaces with tilt between 0° and 180°.

* Needs no adjacency
* RectangularGeometry is not essential
* CADObjectId is nice to have
* Shade surfaces indicating adjacent buildings have so need to be manifold. Thus floors may be omitted. {Theoretically, roofs and back faces could be omitted as well. )


For shading surfaces, the working file has this:

      <Surface id="shdSurface_7_0" surfaceType="Shade">
      <RectangularGeometry>
        <Azimuth>180</Azimuth>
        <CartesianPoint>
          <Coordinate>-1.010000</Coordinate>
          <Coordinate>7.216068</Coordinate>
          <Coordinate>1.381966</Coordinate>
        </CartesianPoint>
        <Tilt>90</Tilt>
        <Width>1.000000</Width>
        <Height>2.236068</Height>
      </RectangularGeometry>
      <PlanarGeometry>
        <PolyLoop>
          <CartesianPoint>
            <Coordinate>-1.010000</Coordinate>
            <Coordinate>7.216068</Coordinate>
            <Coordinate>3.618034</Coordinate>
          </CartesianPoint>
          <CartesianPoint>
            <Coordinate>-1.010000</Coordinate>
            <Coordinate>7.216068</Coordinate>
            <Coordinate>1.381966</Coordinate>
          </CartesianPoint>
          <CartesianPoint>
            <Coordinate>-0.010000</Coordinate>
            <Coordinate>7.216068</Coordinate>
            <Coordinate>1.381966</Coordinate>
          </CartesianPoint>
          <CartesianPoint>
            <Coordinate>-0.010000</Coordinate>
            <Coordinate>7.216068</Coordinate>
            <Coordinate>3.618034</Coordinate>
          </CartesianPoint>
        </PolyLoop>
      </PlanarGeometry>
    </Surface>

In the current Build Well export we have this:

		<Surface surfaceType="Shade" id="bw-shade-5" >
			<Name>building Chien Si</Name>
			<PlanarGeometry>
				<PolyLoop>
						<CartesianPoint>
							<Coordinate>-65</Coordinate>
							<Coordinate>10</Coordinate>
							<Coordinate>20</Coordinate>
						</CartesianPoint>
						<CartesianPoint>
							<Coordinate>-95</Coordinate>
							<Coordinate>10</Coordinate>
							<Coordinate>20</Coordinate>
						</CartesianPoint>
						<CartesianPoint>
							<Coordinate>-95</Coordinate>
							<Coordinate>-90</Coordinate>
							<Coordinate>20</Coordinate>
						</CartesianPoint>
						<CartesianPoint>
							<Coordinate>-65</Coordinate>
							<Coordinate>-90</Coordinate>
							<Coordinate>20</Coordinate>
						</CartesianPoint>
				</PolyLoop>
			</PlanarGeometry>
		</Surface>

So the only difference here is that we need to add the Rectangular Geometry portion of the surface definition. 

***


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
