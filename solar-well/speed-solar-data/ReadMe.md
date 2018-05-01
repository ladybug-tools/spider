Hi Theo,

Here is maybe a more concise summary of spec in terms of file data…

These are the steps:

 1. You import gbXML file. Have button to import file in interface.
 
 2. You generate mesh points and vectors for each surface in the gbXML file. Requirements for mesh:
      - As close to 1 m2 as possible if in SI, or 10 ft2 if in IP. This value has been optimized after testing between visualization quality and computational time.
	 b.	What unit system you are working in based on the units in the imported gbXML file.
	 c.	A grid mesh should be generated for each exterior surface in the model. Window surfaces are excluded always, as those meshes will be already represented by the meshes in the host exterior wall.
	 i.	For Shadow: Exclude almost all shading objects (overhangs, fins, adjacent buildings). But do mesh the shading surface for the ground. We will have it included in the gbXML file. For the ground mesh you may exclude mesh points that are located under the main building or shading building (or just include them and they will be assigned analysis value of 0).
	 ii.	For Radiation: Include all surfaces.
	 iii.	The mesh should be even distributed such that when you view the mesh surfaces they all combine to form the same shape as the parent surface. In order to allow for this to happen, that’s why the 1 m2 or 10 ft2 mesh size is not fixed. It can float to match the needs of each surface.
 
 3.	Once the mesh points and vectors are generated,  you export a .shadowinput and .radiationinput file. Have a button to export each file. Here is what is included and the formatting of these files:
 
  a.	Each mesh will have its own line item in the file. Each line item will have 9 values/strings. The general structure of each line item is (UnitSystem,SurfaceID,xCoordinateMeshCenterPoint, yCoordinateMeshCenterPoint, zCoordinateMeshCenterPoint, xVectorMeshCenterPoint, yVectorMeshCenterPoint, zVectorMeshCenterPoint,MeshLength). The mesh length is one side of the mesh (so a length not area). So if mesh is 0.9m x 0.9m, then this value will be 0.9, not 0.9^2=0.81 m2.

  b.	Example for a regular gbXML surface: SI,surface-9, -4.705043,-15.25,2.0955,0.0,-1.0,0.0,0.9
  c.	Example for a shade gbXML surface: SI,shade-19,-67.189346,-68.695648,0.0,0.0,0.0,1.0,0.95
  d.	Note: The SurfaceID is exactly as it shows up in the gbXML file.
  e.	Note: The .shadowinput file will have fewer meshes than the .radiationinput file since the shadow range analysis will not include overhangs, fins, or adjacent buildings. Fewer meshes=fewer lines in the file.

  At this point, we take the file, run the code for shadow range and solar radiation analysis, then we write out two output files that include the resulting analysis value, a .shadowoutput and .radiationoutput file.

 4.	Then you will import the .shadowoutput and .radiationoutput files. Have a button to import each.
  
 5.	The structure of the .shadowoutput and .radiationoutput files are exactly the same as the corresponding input files you generate, except there will be a tenth value appended onto it, the analysis value.
  
   a.	The general structure of each line item is (UnitSystem,SurfaceID,xCoordinateMeshCenterPoint, yCoordinateMeshCenterPoint, zCoordinateMeshCenterPoint, xVectorMeshCenterPoint, yVectorMeshCenterPoint, zVectorMeshCenterPoint,MeshLength,AnalysisValue). The AnalysisValue will be either Hours of Sunlight for .shadowoutput or Cumulative Solar Radiation (kWh/m2 for SI, kWh/ft2 for IP) for .radiationoutput.

   b.	Example for a regular gbXML surface for .shadowoutput in SI: SI,surface-9, -4.705043,-15.25,2.0955,0.0,-1.0,0.0,0.9,480

   c.	Example for a shade gbXML surface for .shadowoutput in SI:  SI,shade-19,-67.189346,-68.695648,0.0,0.0,0.0,1.0,0.95,865

   d.	Example for a regular gbXML surface for .radiationoutput in SI: SI,surface-9, -4.705043,-15.25,2.0955,0.0,-1.0,0.0,0.9,1280

   e.	Example for a shade gbXML surface for .radiationoutput in SI:  SI,shade-19,-67.189346,-68.695648,0.0,0.0,0.0,1.0,0.95,1500

 6.	Once both files are imported, the user will have the ability to view one or the other. Put a checkbox for “View Shadow Range Results” and “View Solar Radiation Results” below the import buttons.

  a.	When viewing the results, the points and vectors do not need to be shown. Only the meshes (MeshLength^2). The cumulative meshes should look like the original gbXML geometry since the mesh size was originally determined based on the gbXML surface size and evenly distributed.

  b.	For the view of the .shadowoutput file, you also will need to view the excluded shading surfaces such as overhangs, fins, and adjacent buildings. Use original polyloop geometry from gbXML file. Color the surfaces black with a transparency of 0.75.

  c.	The individual mesh colors will be based on the AnalysisValue and a legend of the colors and their associated AnalysisValue ranges generated. A visual example of what the legend should look like for solar radiation can be found in SolarRadiation_Summer_AllDays_Plan.jpg and for shadow range in ShadowRange_Annual_15_Plan.jpg. Ladybug uses 11 different colors for both the shadow range and solar radiation legends. We'd like to use the same number of color bins and the same colors as they are fairly conventional in other tools. When reading in the .shadowoutput and .radiationoutput files, the max value should be determined for analysis value, and the bins discretized accordingly ((max value-0)/12). Hour values for shadow range will always be whole integers, not rounding needed. Radiation values should be rounding to the nearest tenth decimal (not hundredth as shown in the images).

  d.	All the polyloops of the original gbXML geometry should be shown in black overlaid on top of the meshes (including windows) . So essentially we are viewing the gbXML file (minus surface fill colors) and the analysis meshes at the same time.

  Attached is an image of what each visualization should look like for our SPEEDTest.xml for both shadow and radiation (though our mesh sizes and counts will be different of course).
