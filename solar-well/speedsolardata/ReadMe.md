
'Solar Shadow Range Analysis and Raditation test gbXML file and results data file instructions'

There are 3 files I posted to Github.
https://github.com/ladybug-tools/spider/tree/master/solar-well/speedsolardata
First is a test gbXML we are using for the shadow range analysis and radiation analysis
it can be imported into the gbXML viewer
we took this gbXML, imported into Rhino and Grasshopper, and figured out all the settings we needed to run the shadow range analysis and solar radiation in ladybug. We identififed the ideal mesh size, size of ground plan relative to building, and reasonable computational times using partial analysis for shadows to represent months
we then output the results into two files we custom formatted
The first is the results file .shadow and next .radiation. It shows the x,y,z coordinates of all the mesh points, their vectors, then then the seventh value is the # of sunlight hours for the given time range for the .shadow file and the insolation value (kWh/m2) for each mesh point in the .radiation file.
The grid sizes we will keep the same between the two analyses
each took about 10-30 seconds to run based on the time period
(and I will put this all on Github too)
the mesh points are all currently offset from the actual plane of the gbXML geometry by 0.01m, since it's required in ladybug due to some weird thing in Rhino that ensures you're not calculating a point on the inside of a surface (i.e. wrong normal). We don't have to worry about that, but currently the components requires the offset, we won't in our code. We could subtract out 0.01m from every mesh point (in normal direction), but not necessary at this point I don't think.
We'd like  you to work your magic and take this results file and overlay on gbXML geometry in the viewer. In reality, for raditation, you only need the mesh points (and grid size, which is  1m2) and you could show the entire scene with result data since it doesn't show windows etc. and we mesh everything including adjacent building
but for shadow you'll want the geometry overlay
based on min and max values we will have to choose a color gradient for the lenged and grid mesh coloring
I'll send in the am images of what the visualizations look like in GH so you can see generally what we are targeting for effect and legend design. But of course we are not constrained to that gradient or color scheme. The shadow range analysis will always show the sun path analemma in the visualizaiton. The user will have the choice toggle on or off the analemma for the solar radiation
there is some post-processing to analysis results to do before visualizing. I
I
I'll detail this on github. Look forward to see what you can do with it. 
