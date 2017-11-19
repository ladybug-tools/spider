Ahhhh, and so take another stand against the gbXML challenge! I believe we close. There are quite a few open source codes out there to help with this, but it's truly easier just do it ourselves, and we are not going from the ground up anymore, we are almost to the mountain top. Here's what I've done....

First, I created a ppt within this cookbook that goes through a series of unit cases for each element we need to support. It shows the appropriate coordinate ordering, normal, and gbXML syntax for SPEED (though 99% of applies in general). This should  give you all the general informaiton you need to know to write out a valid gbXML file for OpenStudio.

Second, I created a simple test case in Rhino, with all the senarios we will run into (200 ft2, 2 floors, perimeter core zoning, overhangs, fins, 1 adjacent building, interior walls, windows, roofs, baseslabs, ceilings). It's a perfect box with windows on the south and west side, overhangs on the south and west windows, and a single fine on the south and west sides. I then generated an OSM file using Honeybee, imported into Open Studio, made sure it ran correclty, then exported a gbXMl file out. This is the "reverse engineering" of the test case. 

Third, I started deleting some content that the OS studio app created like loads, constructions, etc., converted naming conventions to those we use, deleted Rectangular Geometry except for Azimuth, and I imported it back into OS desktop to confirm it stilI worked smoothly and the simulation run (and it did). This file is the target for our collaborative gbXML export for SPEED. This file is attached to the cookbook. At the beginning of the attached ppt, you can a view of the model in Rhino, using Theo's gbXML viewer, and in Open Studio. The coordinates of the test case area shown in the last few slides of the ppt, and match exactly those that appear in the valid/target gbXML file.

Fourth, I tried to recreate the same model in Theo's SPEED SPEC R 2.4. The window coordinates are a bit off, and there are no fins, and there are overhangs on the north and east sides with the original test case didn't. Doesn't matter. I then exported a gbXML file using the currrent gbXML export. I tried importing it into Open Studio, and reviewed the entire file manually in Sublime. The following are my findings...

1. Building/Storeys/Levels/Space/Zones

In the current export, the Building always hard codes "5000" as the Building area, though it actually is 200. Volume is also incorrect at 50,000.<Building id="1" buildingType="Office" ><Area>5000</Area><Volume>50000</Volume>

2. Surface Type: Exterior Walls

The first thing that needs to change here is getting the correct Azimuth. 0 is north, 90 is east, 180 is south, and 270 is west to START. As the user changes the input Orientation, the new Azimuth is this (starting azimuth+Orientation).

The second thing is that while all coordinates are counterclockwise from the correct vantage point, the points in the polyloop always start with the lower left corner. It should start with upper left corner. This is EnergyPlus, I agree it's stupid, but it is what it is.

3. Surface Type: Openings

Same coordinate ordering issue as above.

4. Surface Type: SlabOnGrade

No issues here. 

Azimuths for SlabOnGrade are are always 90.

5. Surface Type: Roof

You have one roof for Space 10 having 2 adjacent spaces when it should only have one...

<Surface surfaceType="Roof" id="surface-41" >
			<Name>storey-2-space-10</Name>
			<RectangularGeometry>
				<Azimuth>90</Azimuth>
			</RectangularGeometry>
			<CADOjectId>none</CADOjectId>
			<AdjacentSpaceId spaceIdRef="space-10" />
			<AdjacentSpaceId spaceIdRef="space-5" />

Azimuths for roofs are are always 90.

5. Surface Type: Interior Walls
