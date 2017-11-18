** ~~ Means complete

Adjacent Buildings Page: We have this one nailed. No more need to discuss.

#H1 Geometry Page: 

Inputs: These are in IP. If you want to simply and say all inputs are metric, that's fine. It really doesn't matter. What does matter is that when the gbXML export is generated, it is ALWAYS in metric.

Theo, Anton has done all the below, and can add to your update tomororw the changes to defaults and enumerations later. Main thing is to add his script for length, width, and thickness.

	~~ Building Area: Default is 10000 ft2. The user can change this number to whatever they want. The field is an integer to be typed in (I would eliminate the up and down arrows).~~	
	~~ # of Floors: Default is 1. Enumerations available are 1-20. The field is a dropdown menu (or up an down arrows as currently is), as are all "enumeratons" from here forward.~~
	~~ Floor Area: Auto-calculated at Building Area/# of Floors. This field is a real number. Round to the nearest integer visually.~~
	~~4 Floor Height: Default to 10 ft. Enumerations are 8,9,10,11,12,13,14,15,16,17,18,19,20. The user is expected to not necessarily put the ACTUAL Floor Height, simply the CONDITIONED Floor Height. ~~
	~~ 5. Footprint Shape: Default is Box-Shape. Enumerations are Box-Shape, L-Shape, T-Shape, and H-Shape. ~~	
	~~6. Massing Generator: Default is Generator 1. Enumerations are Generator 1, Generator 2, and Generator 3. For now, what we are implementing is Generator 1. 2 and 3 are place holders for later. In other words, this input doesn't so anything now.~~
	~~7. # of Footprint Shapes: Default is 1. Enumerations are 1,2,3. This field is more ME, not us.~ 
	~~8. Perimeter Depth: Default is 10 ft. Enumerations are 10,11,12,13,14,15,16,17,18,19,20. Buildings rarely have less than 10 ft, and rarely over 20 ft.~~	
	~~9. Orientation: Default is 0. This means that the positive y-axis is true north facing, and has an orientation of 0 degrees. Enumerations are 0,10,20,30,40,50,60,70,80,90 100......350. We don't use negative orientations. 0-350, that's it.~~
	~~10. Length: These values are defaulted based on Building Area, # of Floors, and Footprint Shape. It is a slider that the user can manipulate. Logic already implemented. Round numbers to the tenth decimal place visually.~~
	~~11. Width:These values are defaulted based on Building Area, # of Floors, and Footprint Shape. It is a slider that the user can manipulate. Logic already implemented. Round numbers to the tenth decimal place visually.~~
	~~12: Thickenss: This value is auto-calculated. Rounds numbers to the tenth place visually.~~

To-Do List for Geometry Page: 

	1. Theo, integration of Anton's JS for length, width, and thickness this has been thouroughly tested validated, we suggest that you work off that code which has been integrated with qline here: [https://github.com/antonszilasi/spiderAnton/blob/master/speed/geometry.js#L6-L612]: by forking my branch here: [https://github.com/antonszilasi/spiderAnton/tree/master/speed]:
	
	This file also contains the code with the cool window logic (see below)
	
	
	2. Theo, make the material colors more distinct. Make Roofs red, floors/ceilings green, walls blue, overhangs/fins yellow, keep adjacent buildings the way they are.
	3. Theo, make all edges black, including for diagonal walls.
	4. Theo, make the orthographic view unchangable to 3D, i.e fixed in 2D view.

Envelope Page:

Inputs: Normal mode is to have one set of inputs for the building. Existing toggle allows for inputs to be specified by orientation. Orientaiton convention is as follows: 315-45 is north, 46-135 is east, 136-225 is south, 226-314 is west. This angles are the Azimuths. Azimuths are calculated by taking starting Azimuth, and adding "Orientation" to it. Simplest way. Code Anton uses on his version includes this:

	~~1. Building WWR: Default is 40%. Enumerations are 10%, 15%, 20%....95%. Will will avoid 0% and 100% to avoid headaches.~~
	~~2. % of Windows: Default is 2. Enumerations are 1,2,3...10.~~
	~~3. Window Ratio: Default is 0.5. This input is a slider that goes from 0.1-0.9. This will avoid problems with EnergyPlus having overlapping vertices.~~
	4. ~Overhang Depth: Default is 0 (no overhangs). Enumerations are 0,1,2,3,4,5,6. One overhang per window.~
	5. ~Fin Depth: Default is 0 (no overhangs). Enumerations are 0,1,2,3,4,5,6. 2 fins per window.~
	6. ~Window Construction Type: Keep as is. No impact on geometry or visualization.~

Theo, your code didn't have Window Ratio variable. It's very cool. Here is the link to the html code to modify the view in your verions: https://github.com/antonszilasi/spiderAnton/blob/master/speed/geometry.js#L890-L914

This code relys on some modifications which I made in the main page (speed-page.html) and the envelope.js file which can be seen here: https://github.com/antonszilasi/spiderAnton/blob/master/speed/envelope.js#L3-L311

Take any approach you feel is best, but there may be some value to start working off the master branch here: https://github.com/antonszilasi/spiderAnton/tree/master/speed (as I suggested before)


To-Do List for Envelope:

	1. Update to new Html fields and window array logic per above.
	2. Theo, place holes where the window surfaces are. (So integrate Qline with the Multiple Openings Overhangs and Fins example here:
	http://www.ladybug.tools/spider/cookbook/multiple-openings/wall-with-multiple-openings-overhangs-fins-r1.html)
	
	3. Theo, enable overhang depth for geometry. 
	4. Theo, enable fin depth for geometry. 

Space Layout: Looking pretty good now. As footprint shape changes, number of zones available to assign space type to changes. Eliminate 3D image. Only want a 2D image the user cannot rotate to 3D. In an ideal world, the 2D orthographic view is the actual view, but that requires the 2D text to label zones. If there is not time for that now, just use stock images I provided. It's preferable to see the actual zone sizes, since that will determine which space they assign, but an acceptable shortcut for now.

To-Do List for Space Layout

	1. Theo, either add 2D text to orthographic view for Zone # (preferred), or simply insert stock image.

One additional important item:

	1. Add 3D letters for N, S, E, and W to the appropriate facade from beginning Azimuth, and as it is rotated.

This is what we need for the demo. God's speed.(Pun intended)




