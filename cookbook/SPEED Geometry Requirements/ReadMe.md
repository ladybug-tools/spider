Geometry Page: 
Inputs: These are in IP. If you want to simply and say all inputs are metric, that's fine. It really doesn't matter. What does matter is that when the gbXML export is generated, it is ALWAYS in metric.
To-Do List for Geometry Page: 

	1. Change orientation symbols to letters, oriented correctly.
	2. Change axis symbols to letters, oriented correctly.
	3. Enable valid rotation of axis with symbols.
	4. Auto-extend grid size.
	5. Add a HUD with Length, Width, Thickness, and zone diagram when hover over ortho view on geometry and envelope page only.
	6. Set a singular orientation symbol on 3D and 2d views, offset 5m from the closest surface. From global origin reference, 		North/South should be located always at Width/2+5m from origin and East/West Length/2+5m from global origin.Vector placement of 	symbol in terms of rotation always equals orientation. Given the orientation, it is known when to change one orientaiton symbol 	to another. Orientaiton convention is as follows: 315-45 is north, 46-135 is east, 136-225 is south, 226-314 is west. 
	7. Add math equations to calculate zone area and produce Area Breakdown.
	8. Assign zone numbers in space layout ortho view in appropriate location. Lock view to fill screen, so only 2m beyond orientation 	   letter to border for which ever is longest, length or width. Show the shape as if the scene were reverted to orientaiton=0, and 	   display the x,y axis rotated to the (-orientation) value.
	9. Constrain Window Ratio to 0.1 and 0.9
	10. Land on Site Context with no main building.
	11. When zoom, do not resize grid so grid increments change in size, keep canvas constant and extend geometry. Is confusing, and 	lose view of axis quickly.
	12. Length, width, and thickness rounded to nearest tenth.
