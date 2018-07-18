# rad2solar feedback

There are now two revisions

### https://www.ladybug.tools/spider/sandbox/speed-rad2solar-viewer/r5/speed-rad2solar-viewer.html

* This version rotates all surfaces 180 dregrees arounf the X axis

### https://www.ladybug.tools/spider/sandbox/speed-rad2solar-viewer/r5/speed-rad2solar-viewer2.html

* This version performs no rotations around the X axis

The current situation is that if you rotate the surfaces the south facades are OK, if you do not rotate the surfaces then the ground planes are OK.


### Test Case 1

#### R5.3
* Ground plane needs rotating 180&deg; along X axis
* South facade OK

#### R5.3a

* Ground plane is OK
* South facade is upside down

there is also the shade building in the NE corner. This the only test case with a shade building, so it is difficult to get a feeling of what the underlying issues are. Do not that the vectors seem to be point every which way

### Test Case 2

#### R5.3

* Ground plane needs rotating 180&deg; along X axis
* Ditto roof plane
* South facade OK


#### R5.3a
* Ground plane is OK
* Roof plane is OK
* South facade is upside down


### Test Case 3

First three files after the ground plane:
* 0.00_11.50_1.52_-0.71_0.71_0.00_0.71_0.71_0.00_3.05_18.22.png
* 0.00_11.50_4.57_-0.71_0.71_0.00_0.71_0.71_0.00_3.05_18.22.png
* 0.00_11.50_7.62_-0.71_0.71_0.00_0.71_0.71_0.00_3.05_18.22.png

Note that the two direction vectors are nearly identical: 0.71_0.71_0.00
This is causing the 45&deg; angles
Ditto for all the facades of all the remaining files

### Test Case 4

First three files after the ground & roof plane:
* 6.98_5.85_1.52_0.77_0.64_-0.00_0.64_-0.77_0.00_3.05_18.22.png
* -6.98_-5.85_1.52_-0.77_-0.64_0.00_-0.64_0.77_0.00_3.05_18.22.png
* 6.98_5.85_4.57_0.77_0.64_-0.00_0.64_-0.77_0.00_3.05_18.22.png

Note that the two direction vectors are nearly identical: 0.77_0.64_-0.00_0.64_-0.77_0.00
This is causing the 45&deg; angles
Ditto for all the facades of all the remaining files

### Test Case 5

#### R5.3
* Ground plane needs rotating 180&deg; along X axis
* South facades are OK


#### R5.3a
* Ground plane is OK
* Roof plane is OK
* South facade is upside down


### Test Case 6

#### R5.3
* Ground and roof plane need rotating 180&deg; along X axis
* South facades are OK

#### R5.3a
* Ground plane is OK
* Roof plane is OK
* South facade is upside down - needs rotating 180&deg; along X axis

### Test Case 7

#### R5.3
* Ground plane needs rotating 180&deg; along X axis
* Facades OK?

#### R5.3a
* Ground plane is OK?
* All facades are OK?


#### Test Case 8

#### R5.3
* Ground plane needs rotating 180&deg; along X axis also - and Y axis?
* Facades OK?

#### R5.3a
* Ground plane is OK?
* All facades are OK?
