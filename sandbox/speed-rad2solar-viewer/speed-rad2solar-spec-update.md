

### HTML Layout

1. As you do now, there should be one button to import a single .rad file. This is for viewing .rad files for test cases as they are generated.

2. Also, there should be a button to import "Import RAD2Solar Project", and the import button should load a directory. The directory that is selected will have a .rad file and all the corresponding bitmaps.

3. Down below, where you have "Sample files", please eliminate all the existing rad files from various sources and just provide shortcuts to the .rad file in each "test-cases/test-case-x/ folders.

4. Please also make a drop down for "Sample projects". This will provide shortcuts to the folders within "test-cases/".

5. Please provide two toggle buttons: (1) "Hide .rad" and (2) "Hide .bmps". This will be useful when viewing a project.

6. Please remove auto generation and assignment of bitmaps.

### Data Type and Formatting Specification

1. Your code will be passed a directory from RAD2SOLAR (or more appropriately, the format of the viewer to pull data for a project will be to reference a directory like we are starting to set up under test-cases/test-case-1, etc). Within that directory is a single .rad file and a series of bitmaps.

2. The naming convention of each bitmap is xcoordinate_ycoordinate_zcoordinate_xunitvector_yunitvector_zunitvector.bmp. The x,y,z coordinate is the center point of the bitmap, and the unit vector provides the normal. This is how you will place the bitmaps in the three.js scene.

3. The code will also read in .rad file with surface object outlines only in black, no fills. The bitmaps will be the fills.

4. A single bitmap file is to be generated for the ground, each adjacent building surface except the ground, each fin and overhang (only one in the normal direction, we will ignore the interior side for now to reduce the number of bitmaps), and each facade. In other words, if a building has 3 floors, one south-facing facade, and 10 windows on each floor, only one bitmap will be generated. For the roof, a single bitmap will be generate for a square building, two bitmaps for an L-Shape or T-Shape building (Zack to determine how to divide the L into two rectangles), three bitmaps for a U-Shape and H-Shape building, and 4 bitmaps for a Courtyard-Shape building.

5. There will also be a bitmap for the Legend, named legend.bmp, which should be placed to the side of the scene and rotate to always faces the user as the scene is rotated. This will function similar to how we show the legend in the 3D scatter plot (look familiar;)). The bitmap for the legend will have a transparent background.


![text](https://www.ladybug.tools/spider/sandbox/speed-rad2solar-viewer/images/LegendThreeJS.PNG)

