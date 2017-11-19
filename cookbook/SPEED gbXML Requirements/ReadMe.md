Ahhhh, and so take another stand against the gbXML challenge! I believe we close. There are quite a few open source codes out there to help with this, but it's truly easier just do it ourselves, and we are not going from the ground up anymore, we are almost to the mountain top. Here's what I've done....

First, I created a ppt within this cookbook that goes through a series of unit cases for each element we need to support. It shows the appropriate coordinate ordering, normal, and gbXML syntax for SPEED (though 99% of applies in general). This should  give you all the general informaiton you need to know to write out a valid gbXML file for OpenStudio.

Second, I created a simple test case in Rhino, with all the senarios we will run into (200 ft2, 2 floors, perimeter core zoning, overhangs, fins, 1 adjacent building, interior walls, windows, roofs, baseslabs, ceilings). It's a perfect box with windows on the south and west side, overhangs on the south and west windows, and a single fine on the south and west sides. I then generated an OSM file using Honeybee, imported into Open Studio, made sure it ran correclty, then exported a gbXMl file out. This is the "reverse engineering" of the test case. 

Third, I started deleting some content that the OS studio app created like loads, constructions, etc., converted naming conventions to those we use, deleted Rectangular Geometry except for Azimuth, and I imported it back into OS desktop to confirm it stilI worked smoothly and the simulation run (and it did). This file is the target for our collaborative gbXML export for SPEED. This file is attached to the cookbook. At the beginning of the attached ppt, you can a view of the model in Rhino, using Theo's gbXML viewer, and in Open Studio. The coordinates of the test case area shown in the last few slides of the ppt, and match exactly those that appear in the valid/target gbXML file.

Fourth, I tried to recreate the same model in Theo's SPEED SPEC R 2.4. The window coordinates are a bit off, and there are no fins, and there are overhangs on the north and east sides with the original test case didn't. Doesn't matter. I then exported a gbXML file using the currrent gbXML export. I tried importing it into Open Studio, and reviewed the entire file manually in Sublime. The following are my findings...

1. Building/Storeys/Levels/Space/Zones

In the current export, the Building always hard codes "5000" as the Building area, though it actually is 200. Volume is also incorrect at 50,000.<Building id="1" buildingType="Office" ><Area>5000</Area><Volume>50000</Volume>

Other than that everything is correct!!!

2. Surface Type: Exterior Walls

The first thing that needs to change here is getting the correct Azimuth. 0 is north, 90 is east, 180 is south, and 270 is west to START. As the user changes the input Orientation, the new Azimuth is this (starting azimuth+Orientation).

The second thing is that while all coordinates are counterclockwise from the correct vantage point, the points in the polyloop always start with the lower left corner. It should start with upper left corner. This is EnergyPlus, I agree it's stupid, but it is what it is.

3 Surface Type: Openings



<Surface surfaceType="Roof" id="surface-41" >
			<Name>storey-2-space-10</Name>
			<RectangularGeometry>
				<Azimuth>90</Azimuth>
			</RectangularGeometry>
			<CADOjectId>none</CADOjectId>
			<AdjacentSpaceId spaceIdRef="space-10" />
			<AdjacentSpaceId spaceIdRef="space-5" />
			<PlanarGeometry>
				<PolyLoop>
					<CartesianPoint>
						<Coordinate>2</Coordinate>
						<Coordinate>-2</Coordinate>
						<Coordinate>10</Coordinate>
					</CartesianPoint>
					<CartesianPoint>
						<Coordinate>-2</Coordinate>
						<Coordinate>-2</Coordinate>
						<Coordinate>10</Coordinate>
					</CartesianPoint>
					<CartesianPoint>
						<Coordinate>-2</Coordinate>
						<Coordinate>2</Coordinate>
						<Coordinate>10</Coordinate>
					</CartesianPoint>
					<CartesianPoint>
						<Coordinate>2</Coordinate>
						<Coordinate>2</Coordinate>
						<Coordinate>10</Coordinate>
					</CartesianPoint>
				</PolyLoop>
			</PlanarGeometry>
		</Surface>






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
There are quite a few differences here. First, it appears that OS wants floors/ceilings (which are the same surface) to not have the surfaceType=InteriorFloor. It will ALWAYS be surfaceType= Ceiling. Then, it will reference 2 AdjacentSpaceID spaceIDRefs, for the zones above and below it. In this case, the lower zone was listed first, and the upper zone listed second. Not sure if the reverse would cause problems but let's just keep this convention. The current Build Well export doesn't have multiple AdjacentSpaceIDs since all the roof, floor, and baseslab surfaces need to be split first (I mentioned this in prior post). In addition to splitting the surfaces, once again the Rectangular Geometry definition needs to be added.

That's it, other than adding Rectangular geometry to Roof.

As far as naming conventions for surfaces, Build Well needs the zones IDs to be named Zone-1, Zone-2, etc. with the corresponding space IDs to be Space-1, Space-2, etc. The current naming convention for storys is fine. You'll probably want to drop the "bw-" at the beginning of each surface/space to keep it general for others.

Hopefully this was helpful!

Cheers,
Benjamain





Length, height, center point, azimuth and tilt?
Three x,y,z points?
Vertical walls only?
Orthogonal/ tied to X-axis or Y-axis walls only?
