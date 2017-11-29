-Add design and performance constraints for the 198 run design space. Make the ranges of the sliders such that they are the max adn min of the parameteter range in the project (ME to do this).

-Moving constriants will grey out designs, make very light gray.

-Add Output Preference slider tied to selected output variables, each with a Minimize or Maximize toggle radio toggle.

-Add the equivalent of the Design and Performance dashboard.

-Select and size proper axis titles, including units, ticks, and size of ticks and value labels.

-Method to ensure axis titles are readable when rotation occurs.

-Make a HUD that shows the desired list of input and static parameters, with the SVG of the geometry. Size appropriately.

-Allow for preference shading using Output Preference.

-Make design points actual building geometry using geom.js code. 

-Make sure designs can scale appropriate so not all bunched up.

-The scatter plot needs a title.

-Show axis on scatter plot.

-Use Pareto Front JS to make all the Pareto Optimimal Designs some unique color, like white.

-Make 3D grid only one quadrant like in spec.

From previous issue:

Ok, ready with some details on this 3D Scatter Plot. This will the funnest viz to do, the most compelling to the research advisory board, Phil our CEO, and almost every architect. This is the money visualization. 3D Scatter Well. I'm proposing to something no one has ever done in the AEC industry as far as I know.
I’ve updated the google sheet Anton sent. Input values in red are the dynamic inputs (ones that change) to be displayed in pop-up window when hover over design, and in the left hand panel to select for the graph, and as design constraints with duel slider. The blue ones are the outputs that may be shown in the pop-up window, left hand panel to select for the graph, and as performance constraints. The uncolored input values need not be displayed, and are only included so as to make available to you all the inputs needed to regenerate the geometry rather a single point in the scatter plot. At the end of each row in the google sheet is the name of the according SVG image.

On the interface, you will want to list all the inputs vertically in a list with a checkbox next to it, then a dropdown menu called Axis where you can select x,y, or z next to each checkbox. Put all these inputs under the heading "Design Parameters". See slide 3 here…

Then you will want to create a heading "Building Performance". List the outputs, again with a checkbox next to each one and a drop down menu for axis. The user must select one input and two outputs via the checkbox, then assign which of the three axis they want to view the three parameters. See slide 3 above as well.

Now for the actual Scatter Plot. In addition to each point displayed on the chart based on the user checked input and outputs (3 total) and axis, there needs to be a slider under the heading Design Constraints for each input variable. Then under the heading Performance constraints, there needs to a slider for each output. This is where the user can specify lower and upper limits for each input and output to eliminate points from the scatter plot and reduce the size of the point cloud. Rather than making the points disappear that fall outside the constraints, it would be preferable to grey them out to a very light semi-transparent grey. See slide 4 above.

Each slider has the range for the given parameter that exists in the CSV file. Numerical sliders may be true sliders (meaning if range of values is 3,4,5, you can put 3-5 as range, and 0-30 for orientation, even though there are only two valid values, 0 and 30), while discrete inputs such as Window Construction will have several points to jump to. Maybe we want to make numerical value sliders actually be enumerations of valid values. Not sure how best to show construction names in the slider. Output slider constraints may simply be a true slider with all values possible between the ranges (since there are many possible outputs, as opposed to only a limited set of valid inputs0. Each slider has two little control points so they can specify a minimum and maximum. All the above applies to outputs.

Finally, you need to put a slider under the heading "Output Preference". The slider goes from 0-100, and defaults to 50. The two outputs selected appear at either end of the slider, with a toggle switch to minimize or maximize that parameters. Then as you move the slider off of 50 (which is equal preference), closer to one of the objective parameters, the colors of the design points change accordingly (in the 2D axis with both outputs, colors don't change across the input. Somewhere the ranges for colors and output preference values is in the code for most preference shading modules. I'm sure three.js has somthing.

So that takes care of coloring convention for the points, and determine which points are greyed out due to being outside a design or performance constraint. See slide 4 above.

Next, we will want the user to hover a given point in the scatter plot, and have design summary window pop that lists the other input and output values, and has an svg image of the actual geometry below it. The SVG reference for each point is at the end of the CSV.

Inputs (Ignoring units):

Footprint Shape
Width 1 Y1
Num of Floors
Floor Height
Orientation
WWR_S
Overhang Depth S
Window Construction
LPD
Outputs (ignoring units)

Annual Cooling Load
Annual Heating Load
Total Solar Load
EUI
Inputs Ranges:

Footprint Shape – (L,T,H)
Width 1 Y1 – (80,100)
Num of Floors – (1,2)
Floor Height – (3,4.5)
Orientation – (0,30)
WWR_S – (0.4,0.8)
Overhang Depth S (0.6,0.9)
Window Construction (ASHRAE 189.1-2009 EXTWINDOW CLIMATEZONE 3, CBECS 1980-2004 EXTWINDOW CLIMATEZONE 4A, ASHRAE 90.1-2010 EXTWINDOW NONMETAL CLIMATEZONE 7-8)
LPD (7,12)
Outputs Ranges
5.	Annual Cooling Load - (93195-273677)
6.	Annual Heating Load – (317908-725639)
7.	Total Solar Load - (218978-1262900)
8.	EUI – (116-264)

One final thing. We'd like to show the Pareto Front in 3D, meaning the points where you cannot improve in one objective without worsening in the other. These points should be designated with bold X's. To calculate these points, I found the following JS libraries here and here:

I'd be totally stoked to get to this point. I still have that image in my head of when you zoom in have the points actually show the building geometry of that design (that's why i included the footprint dimensions in the inputs CSV), so if we have time for that, I know that would blow architects away. They've never seen that.
 @bwelle
     Member
bwelle commented on Oct 13 •  edited 
In general, we want to take what you do, as you wish to do it, then do whatever code modifications and additions beyond that ourselves. How we take your approach/methodology/code and fit it into ME's environment they are building is up to us. We will find out tomorrow for the first time what we can expect for that process to be.

Here's what I currently perceive what your value-added scope is and where it stops....

Taking the inputs and outputs from the google docs sheet and plotting the runs on the interactive 3D plot using some symbol. (Done).

Enabling the symbols to be the actual building geometry given the inputs you already use for the Build Well visualizations.

Helping us appropriate scale the geometries of each data point with the axes units/ranges.

Enabling a HUD when the user hovers over a design that displays some inputs and an SVG of the geometry. You've already done this, and we can agree on an "average" number of inputs/outputs to display on the HUD for sizing purposes. I believe we always want the HUD to show the SVG even though the actual symbol is the same geometry when the user is zoomed out, they will want to see an image of the geometry for certain points before they are able to make out the geometry of that symbol in the plot. Additionally, the SVG will allow the user to clearly see orientation, which we need not represent with the actual symbol geometry. Eventually we will add analysis results SVGs, not just geometry. Assistance with how to ensure that the HUDs are able to be seen within the view window (and not cutoff like they sometimes are now if you're clicking on some points at the bottom section of the window) would be greatly appreciated. Like you said, that's an art along with scaling of geometric symbols, and you are the artist in the group.:)

Ignore enabling the ability for the user to select with inputs and outputs they view and on what axis. That's not critical path. Building off your suggestion, let's always put Annual Cooling Load on the Z-axis, EUI on the X-axis, and # of Floors on the Y-axis (as we always need one axis to be an input, and two an output). I like keeping the outputs on the X and Z axes since we can expect the color preference shading to go in one specific direction.

Let's ignore all the sliders for design and performance constraints that grey out certain symbols. We can do that ourselves. If you want, it would be nice to have one example of this in the open source code for others to use, as it's pretty cool. If you agree with this scope, I propose you make one design constraint only...# of Floors, so we can see how you look up ranges for that input in google docs to put as starting and end points for the slider. This also applies how to look up ranges for an input and auto-scale the plot axes with the appropriate starting and ending grid levels (for example, for # of Floors it will be 1-3 with our current runs, but what if we had # of Floors ranging from 2-7?) With that example, we can do everything else.

I think the preference shading slider is important. We will fix the inputs to it as Annual Cooling Load and EUI, the two fixed outputs for the plot. Somewhere the user clicks whether they want to maximize or minimize that output objective, then they can use the slider to define which one is more important to them, which will then change the color transition on the X and Z plane only.

The last thing we need to provide is the pareto front designs on the chart, the special data points/runs that can get better with one output objective (Annual Cooling Load) without getting worse on the second output objective (EUI). I provide a JS library that takes all the input points, the values of the outputs, and what is considered "better" for each output parameter, i.e. the numerical value is lower or higher. It spits back the points/runs that meet this criteria, then we would want to make those points visually different then the rest of the data points. In a conventional plot, this is done by making the designs an "X" rather than a "point". But in our case, we will have the actual building geometry, so I would recommend just making the color of those point black, which is not an available color on the preference shading.

An example of how to do this on Github would be highly valuable to others wanting to use a 3D scatter plot, and it would provide an example of using an external JS library to process/evaluate the designs within the three.js code, which could be applicable to any type of process they want to invoke.

These are the things we would love to have your support on. It seems to me scoped so that user experience is taken out of the equation, you're not doing any more than one example for each piece, and with this to work with, we can get get to our end goal in a reasonable amount of time.
