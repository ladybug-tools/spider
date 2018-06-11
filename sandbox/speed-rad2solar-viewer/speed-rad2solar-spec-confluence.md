This is the primary specification for how the sunlight hour and solar radiation will work in SPEED. First, the user selects the desired Solar Studies Control arguments, then clicks either "Run Sunlight Hour Analysis" or "Run Solar Radiation Analysis". Those arguments are passed to the speedbuildinglibrary on Node.js via iframe. The exportrad function is called and a RAD file is generated using a modified version of the exportgbxml function. The user arguments, and some supplementary data, are then passed to a JSON file. The JSON and RAD files are pushed to the main child process RAD2SOLAR. RAD2SOLAR runs the required analysis, and generates a series of bitmaps. It then passes the bitmaps and RAD file back to speedbuildinglibrary where it is visualized within a three.js scene (via iframe) using Theo's code. The user can then interact with the analysis scene.

## exportgbxml Update

First, we need to some updates to the exportgbxml function. These are the critical path items that need to be updated to correctly export the RAD file.

Go to this directory "C:\Users\Benjamin Welle\Box Sync\Research\SPEED\EarlyDesignDaylightingMethod\SolarAnalysis\TestCases\L_2_Floors" and look at "l-shape-50000 area-2flr-0deg - Original.xml". The first problem is that all the SurfaceType=Roof are incorrectly labeled SurfaceType=Ceiling. Those surfaces that should be SurfaceType=Roof also have two AdjacentSpaceID when there should only be one (the second one in the list). This latter issue doesn't need to be fixed for exportrad.

Next, all SurfaceType=Ceiling (some of which should be SurfaceType=Roof) are labeled as id=surface-1. All opaque surfaces should be sequentially numbered.

Third, currently all the shading objects (adjacentbuilding, fin, overhang...excluding ground) have a Description with integers and hyphens after it. There should be no integers or hyphens.

The correct gbXML file is shown in the same directory as "l-shape-50000 area-2flr-0deg.xml".

## exportrad Requirements

Currently, when the user is in the preferred unit system of IP, the gbXML file is in IP. For now we only focusing on the preferred unit system being IP. Thus, prior to exporting a RAD file using a modified version of the exportgbxml code, all values must be converted to SI.

exportrad may ignore SurfaceType=Ceiling, SurfaceType=BaseSlab, and SurfaceType=InteriorWall. It may also ignore the shading object SurfaceType=Shade, Description=adjbuilding for any ground level surface, i.e. those with z=0 for all coordinates.

All surfaces are written out to individual polygons. We are not using anti-matter. Coordinate ordering should be the same as in the GBXML file, following the right-hand rule to identify normals of the surfaces.

Walls with windows are the only complex polygon shapes, and will use traditional Radiance geometry convention, i.e. to cut holes for the windows. This will required looping through the coordinates for each SurfaceType=ExteriorWall for any and all child SurfaceType=FixedWindows. Zack, you can assist Phillip in implementing this code since it already exists.

Wall polygons will still only be written out for a given ExteriorWall on a single level, i.e. if there are three levels facing south, there will be three wall polygons.

Since we have openings where the window polygons will be placed, there is no need to offset window surfaces for analysis purposes. 
Each RAD file will start with a fixed list of material definitions. 

void glass glass_0.5
0
0
3 0.3333 0.4967 0.7900
void plastic grey_0.25
0
0
3 0.4800 0.5333 0.3033
void plastic grey_0.7
0
0
5 0.5800 0.6633 0.7467 0.000 0.000
void plastic grey_0.6
0
0
5 0.8500 0.7600 0.6033 0.000 0.000

All surfaces in the RAD file will follow this naming convention:

For Fins and Overhangs and Adjacent Buildings:

grey_0.7 polygon SurfaceType.id.Description
0
0
12
-10.159898 -15.240000 0.381000
-10.159898 -16.154400 0.381000
-10.159898 -16.154400 2.667000
-10.159898 -15.240000 2.667000

For Exterior Walls:

grey_0.6 polygon ExteriorWall.surface-20
0
0
30
-15.240000 15.240000 0.000000
-15.240000 -15.240000 0.000000
-15.240000 -10.159898 0.381000
-15.240000 -10.159898 2.667000
-15.240000 10.158984 2.667000
-15.240000 10.158984 0.381000
-15.240000 -10.159898 0.381000
-15.240000 -15.240000 0.000000
-15.240000 -15.240000 3.048000
-15.240000 15.240000 3.048000

For Ground:

grey_0.25 polygon Shade.shade-9.ground
0
0
12
76.200000 76.200000 0.000000
-76.200000 76.200000 0.000000
76.200000 -76.200000 0.000000
-76.200000 -76.200000 0.000000

For Windows:

glass_0.5 polygon FixedWindow.opening-2
0
0
12
-15.240000 -10.159898 0.381000
-15.240000 -10.159898 2.667000
-15.240000 10.158984 2.667000
-15.240000 10.158984 0.381000

For Roofs:

grey_0.6 polygon Roof.surface-3
0
0
12
-15.240000 -15.240000 3.048000 
-12.192000 -12.192000 3.048000 
-12.192000 12.192000 3.048000 
-15.240000 15.240000 3.048000

The correct RAD file for TestCase Box_1_Floor can be found here: C:\Users\Benjamin Welle\Box Sync\Research\SPEED\EarlyDesignDaylightingMethod\SolarAnalysis\RAD2SOLAR\TestCases\Box_1_Floor\manual_rad_model_ben.

When generated, the naming convention for each RAD file will simply be to call it "speedsolar.rad".

## RAD2SOLAR Requirements

All input files, executables, and scripts will be in a self-contained, location independent folder (like PIDO2RAD). Keep in mind this will be run on Linux machine, without windows. 

The initial file structure of this folder should look like this: C:\Users\Benjamin Welle\Box Sync\Research\SPEED\EarlyDesignDaylightingMethod\SolarAnalysis\RAD2SOLAR\FileStructure. There is a folder "bin" where all Radiance executables and a compiled version of RAD2SOLAR is located.

There will be "weather" directory where all the WEA files are stored. Let's do this for now. We will have to see how big the folder is once all possible WEA files are stored there. It might be too big to duplicate every time the child process RAD2SOLAR is executed, and we may need to keep the weather directory outside the main child process.

Any other folders may be generated in the main folder as needed, such as those for "skies", "results", etc.

The speedsolar.rad file will be placed in the main directory.

A speedsolar.json file will also be placed in the main directory. Example files are shown here: C:\Users\Benjamin Welle\Box Sync\Research\SPEED\EarlyDesignDaylightingMethod\SolarAnalysis\RAD2SOLAR\UserArguments. This file contains the following information required to complete the analysis:

AnalysisType: This is either "SunlightHours" or "SolarRadiation".
Location: This will be the string for the appropriate WEA file. Example "Denver.wea". This will tell you which WEA file to select from the weather directory.
Units: This is either "SI" or "IP". Though the RAD file will always be in SI, this value tells Zack when generating the bitmap for the legend, if the numerical values for each color in the legend should be IP or SI (only applies to SolarRadiation) and if the legend title should be "Wh/m2" or "Wh/ft2".
Month: This is the integer for the month to be run. This value is "null" if Winter=TRUE, Spring=TRUE, Summer=TRUE, Fall=TRUE, or Annual=TRUE.
Day: This is the integer for the day to be run. This value is "null" if Winter=TRUE, Spring=TRUE, Summer=TRUE, Fall=TRUE, or Annual=TRUE. It may also be null when Month has a value assigned. This means that the analysis is not for a single day, but rather for the entire month.
Winter: This value is either TRUE or FALSE.
Spring: This value is either TRUE or FALSE.
Summer: This value is either TRUE or FALSE.
Fall: This value is either TRUE or FALSE.
Annual: This value is either TRUE or FALSE.

A single bitmap file is to be generated for the ground, each adjacentbuilding surface except the ground, each fin and overhang (only one in the normal direction, we will ignore the interior side for now to reduce the number of bitmaps), and each facade. In other words, if a building has 3 floors, one south-facing facade, and 10 windows on each floor, only one bitmap will be generated. For the roof, a single bitmap will be generate for a square building, two bitmaps for an L-Shape or T-Shape building (Zack to determine how to divide the L into two rectangles), three bitmaps for a U-Shape and H-Shape building, and 4 bitmaps for a Courtyard-Shape building.

The center point of the bitmap and the normal vector are determined from the aggregate surfaces making up the bitmap on the facade or roof.

The naming convention of each bitmap is xcoordinate_ycoordinate_zcoordinate_xunitvector_yunitvector_zunitvector.bmp. An example is shown here: C:\Users\Benjamin Welle\Box Sync\Research\SPEED\EarlyDesignDaylightingMethod\SolarAnalysis\RAD2SOLAR\BitmapFormat.

All of these values will remain in SI.

Finally a bitmap is generated for the legend. Values and titles are based on "Units" input in speedsolar.json. The bitmap should have a transparent background to be properly viewed in three.js.

All the required bitmaps should be stored in an "images" folder in main folder.

Once the analysis is complete, all the bitmaps in the images folder and the RAD file in the main folder will be passed back to the speedbuildinglibrary in a single directory called "speedsolar4viz".
