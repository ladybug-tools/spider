Geometry Page: 
Inputs: These are in IP. If you want to simply and say all inputs are metric, that's fine. It really doesn't matter. What does matter is that when the gbXML export is generated, it is ALWAYS in metric.
To-Do List for Geometry Page: 

	1. Add roof slab.
	2. Change orientation symbols.
	3. Connect fins.
	4. Activate Window Ratio.
	5. x,y,z axis.
	6. Edges on permanently.
	7. Tighten up colors.
	8. Make ortho view unchangable. 
	9. Add dimensions in 2D text for Length, Width, and Thickeness.

Envelope Page:

Inputs: Normal mode is to have one set of inputs for the building. Existing toggle allows for inputs to be specified by orientation. Orientaiton convention is as follows: 315-45 is north, 46-135 is east, 136-225 is south, 226-314 is west. This angles are the Azimuths. Azimuths are calculated by taking starting Azimuth, and adding "Orientation" to it. Simplest way. Code Anton uses on his version includes this:

	~~1. Building WWR: Default is 40%. Enumerations are 10%, 15%, 20%....95%. Will will avoid 0% and 100% to avoid headaches.~~
	~~2. % of Windows: Default is 2. Enumerations are 1,2,3...10.~~
	~~3. Window Ratio: Default is 0.5. This input is a slider that goes from 0.1-0.9. This will avoid problems with EnergyPlus having overlapping vertices.~~
	4. ~Overhang Depth: Default is 0 (no overhangs). Enumerations are 0,1,2,3,4,5,6. One overhang per window.~
	5. ~Fin Depth: Default is 0 (no overhangs). Enumerations are 0,1,2,3,4,5,6. 2 fins per window.~
	6. ~Window Construction Type: Keep as is. No impact on geometry or visualization.

Space Layout: Looking pretty good now. As footprint shape changes, number of zones available to assign space type to changes. Eliminate 3D image. Only want a 2D image the user cannot rotate to 3D. In an ideal world, the 2D orthographic view is the actual view, but that requires the 2D text to label zones. 

To-Do List for Space Layout

	1. Add 2D text to orthographic view for Zone # and area.
	
http://www.ladybug.tools/spider/sandbox/speed-specification/r2/speed-spec-r2.html
