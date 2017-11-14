Ahhhh, and so take another stand against the gbXML challenge! I believe we close. There are quite a few open source codes out there to help with this, but it's truly easier just do it ourselves, and we are not going from the ground up anymore, we are almost to the mountain top. I'm going to give a simple conceptual example, then a reverse engineering gbXML from OS, then take some current speed-specfication exports and point out what I need needs to be changed. I bet you with a day or two of close coordination, we can knock this out once and for all!

Gents,

I did what I should have done a while ago to nail down minimum critical path objects and formatting for gbXML to Open Studio API conversions. First, I used Grasshopper to create a simple box building, 2 floors, perimeter core zoning, one single window on each floor south and west, overhangs on the windows and a rectangular fin on each windows, as well as a simple box for an adjacent building. These elements comprise of everything we need to support for our tool. See images here and here.

I used the OS component in Grasshopper to create on OSM file directly. I imported it into OS desktop, and confirmed the simulation ran correctly. Then I EXPORTED a gbXML file to know exactly what OS would need if I imported it. I then took that file, and started deleting some content that the OS studio app created (like loads, constructions, etc.) Then I imported it back into OS desktop to confirm it stilI worked smoothly and the simulation run (and it did). Therefore, I now have created a gbXML file that works specifically for Open Studio here. This is what we should target to mimic for the Build Well export as we are certain now it's simulation error free. It imports perfectly into the gbXML viewer v5 and it also imports correctly into FZK viewer without error.

I took a look at this file next to what is currently exported by Build Well, and below summarizing the where changes are needed.

For Space definitions, we see this in the working file:

 <Space zoneIdRef="Zone1" id="Zone1_space" buildingStoreyIdRef="Building_Story_1">
    <Name>Zone1_space</Name>
    <Area>21.000000</Area>
    <Volume>105.000000</Volume>
  </Space>
In the Build Well export we have this:

          <Space zoneIdRef="bw-zone-1" id="bw-space-6" buildingStoreyIdRef="bw-story-2" 
           conditionType="HeatedAndCooled" >
			<Name>space 6</Name>
			<Description>length front</Description>
			<Area>623.5281374238571</Area>
			<Volume>7482.337649086285</Volume>
		</Space>
The structure is the same, but in the Build Well export above at some point the zone IDs start to diverge from the space IDs. The Zone ID and the Space ID should always be the same.

There is no need for space shell geometry for Open Studio, nor for the import into FZK Viewer.

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
