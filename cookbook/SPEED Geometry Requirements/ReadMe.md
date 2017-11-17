The current GUI input screens and inputs we need are complete and can be seen here: https://antonszilasi.github.io/spiderAnton/speed/speed-page.html

Adjacent Buildings Page: We have this one nailed. No more need to discuss.

Geometry Page: 

Inputs: These are in IP. If you want to simply and say all inputs are metric, that's fine. It really doesn't matter. What does matter is that when the gbXML export is generated, it is ALWAYS in metric.

	~~1. Building Area: Default is 10000 ft2. The user can change this number to whatever they want. The field is an integer to be typed in (I would eliminate the up and down arrows).~~	
	~~2. # of Floors: Default is 1. Enumerations available are 1-20. The field is a dropdown menu (or up an down arrows as currently is), as are all "enumeratons" from here forward.~~
	~~3. Floor Area: Auto-calculated at Building Area/# of Floors. This field is a real number. Round to the nearest integer visually.~~
	~~4. Floor Height: Default to 10 ft. Enumerations are 8,9,10,11,12,13,14,15,16,17,18,19,20. The user is expected to not necessarily put the ACTUAL Floor Height, simply the CONDITIONED Floor Height. ~~
	~~ 5. Footprint Shape: Default is Box-Shape. Enumerations are Box-Shape, L-Shape, T-Shape, and H-Shape. ~~	
	~~6. Massing Generator: Default is Generator 1. Enumerations are Generator 1, Generator 2, and Generator 3. For now, what we are implementing is Generator 1. 2 and 3 are place holders for later. In other words, this input doesn't so anything now.~~
	7. # of Footprint Shapes: Default is 1. Enumerations are 1,2,3. This field is more ME, not us. 
	~~8. Perimeter Depth: Default is 10 ft. Enumerations are 10,11,12,13,14,15,16,17,18,19,20. Buildings rarely have less than 10 ft, and rarely over 20 ft.~~	
	~~9. Orientation: Default is 0. This means that the positive y-axis is true north facing, and has an orientation of 0 degrees. Enumerations are 0,10,20,30,40,50,60,70,80,90 100......350. We don't use negative orientations. 0-350, that's it.~~
	~~10. Length: These values are defaulted based on Building Area, # of Floors, and Footprint Shape. It is a slider that the user can manipulate. Logic already implemented. Round numbers to the tenth decimal place visually.~~
	~~11. Width:These values are defaulted based on Building Area, # of Floors, and Footprint Shape. It is a slider that the user can manipulate. Logic already implemented. Round numbers to the tenth decimal place visually.~~
	~~12: Thickenss: This value is auto-calculated. Rounds numbers to the tenth place visually.~~

To-Do List for Geometry Page: 

	~~1. Anton, add the Floor Area input.~~
	~~2. Anton, enable Floor Height input.~~
	~~3. Anton (or Theo): Geometry shape must always be centered on the global 0,0,0 origin at the midpoint of the X/Y extents. Theo already 	had this working in Q-line. It's not working in your verions. This center point is always the point of rotation for Orientation.~~
	~~4. Anton, eliminate the angle banners, but correct the starting orientation, it's currently incorrect. 0 degress is assigned to the West side, it should be the north side. East is 90. South is 180. West is 270.~~
	5. Anton, replace black window fills with semi-transparent holes. Theo just posted an example of how to do this.
	6. Anton, make the material colors more distinct and pretty. Make all edges black. Add edges for diagonal walls, they current cannot be seen. Theo, orthogonal walls are indeed tied to X and Y walls only.
	~~7. Anton, place an opacity slider here. Theo has already shown how to do this.~~
	8. Theo, the grid extents still don't auto update when placing adjacent buildings. Please advise how to do this.
	9. Anton, make the orthographic view unchangable to 3D.
	10. Anton or Theo, make Roof and wall objects appear.
	11. Anton, fix window placement.
	12. Anton, fix ground level issues.

Envelope Page:

Inputs: Normal mode is to have one set of inputs for the building. Existing toggle allows for inputs to be specified by orientation. Orientaiton convention is as follows: 315-45 is north, 46-135 is east, 136-225 is south, 226-314 is west. This angles are the Azimuths. Azimuths are calculated by taking starting Azimuth, and adding "Orientation" to it. Simplest way.

	~~1. Building WWR: Default is 40%. Enumerations are 10%, 15%, 20%....95%. Will will avoid 0% and 100% to avoid headaches.~~
	~~2. % of Windows: Default is 2. Enumerations are 1,2,3...10.~~
	~~3. Window Ratio: Default is 0.5. This input is a slider that goes from 0.1-0.9. This will avoid problems with EnergyPlus having overlapping vertices.~~
	4. Overhang Depth: Default is 0 (no overhangs). Enumerations are 0,1,2,3,4,5,6. One overhang per window.
	5. Fin Depth: Default is 0 (no overhangs). Enumerations are 0,1,2,3,4,5,6. 2 fins per window.
	6. Window Construction Type: Keep as is. No impact on geometry or visualization.

To-Do List for Envelope:

	1. Anton, enable overhang depth for geometry. Theo has example.
	2. Anton, enable fin depth for geometry. You should be able to figure this out once overhang depth is done.

Space Layout: Looking pretty good now. As footprint shape changes, number of zones available to assign space type to changes. Eliminate 3D image. Only want a 2D image the user cannot rotate to 3D. In an ideal world, the 2D orthographic view is the actual view, but that requires the 2D text to label zones. If there is not time for that now, just use stock images I provided. It's preferable to see the actual zone sizes, since that will determine which space they assign, but an acceptable shortcut for now.

To-Do List for Space Layout

	1. Anton (or Theo), either add 2D text to orthographic view, or simply insert stock image.
	2. Anton, make the "Floor to Floor" fields always have the second integer equal to the # of Floors.
	3. Anton, for the Area Usage, add a sum of 100% at the end.

Wish List if there is time:

1. Add 3D letters for N, S, E, and W to the appropriate facade from beginning Azimuth, and as it is rotated.
2. Make the X,Y,Z axis big and bold.

This is what we need for the demo. God's speed.(Pun intended)




