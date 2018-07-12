<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page](http://www.ladybug.tools/spider/index.html#sandbox/speed-rad2solar-viewer/README.md "View file as a web page." ) </span>

<div><input type=button onclick="window.location.href='https://github.com/ladybug-tools/spider/tree/master/sandbox/speed-rad2solar-viewer/README.md'"
value="You are now in a GitHub web page view - Click this button to view this read me file as source code" ><div>

# [SPEED Rad2Solar Viewer Read Me]( #sandbox/speed-rad2solar-viewer/README.md )


## Concept

* Radiance HDR files converted to PNG files in real-time 3D in your browser using the Three.js JavaScript library

<!--
## [SPEED Rad2Solar Viewer]( http://www.ladybug.tools/spider/sandbox/speed-rad2solar-viewer/index.html )

<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/sandbox/speed-rad2solar-viewer/index.html width=100% height=400px >Iframes are not displayed on github.com</iframe>

-->

### Features in latest Release

* Obtains the list of PNG files included in a given test case folder on GitHub - uses GitHub API
* Lists the names of the files with links to each file in the menu
* Parses the file name string of the bitmap to obtain
	* Center point, normal, rotation as floating point Three.js vectors
	* width and height of each texture
* Loads each bitmap as a Three.js texture
* Creates a Three.js plane for each bitmap
	* Applies texture to the plane
	* Positions plane at center point
	* Rotates plane to align to the normal
	* Sizes plane according to the specified width and height
* Draws the direction vector as cast from the center of the mesh in black
* Draws the normal as cast from the center of the mesh in cyan
* Main menu allows you to select all eight test cases
* Sub-menu displays list of all files loaded
	* Octocat icon links to source file on GitHub
	* Item link displays just the selected surface



### [SPEED Rad2Solar Viewer R5]( https://www.ladybug.tools/spider/sandbox/speed-rad2solar-viewer/r5/speed-rad2solar-viewer.html )

* WIP but getting there

#### Issues

* If you load a number of files you may run over the GitHub API usage limits. If so wait an hour and you will be good to go again
	* Confirm this is the issue using JavaScript Console and noting 403 error
	* A future release may allow you to enter a GitHub API key
* Test Cases 3 and 4 include some bogus/broken facades. Not sure where error is
* Test Case 1: shade building has issues


### [SPEED Rad2Solar Viewer R4]( https://www.ladybug.tools/spider/sandbox/speed-rad2solar-viewer/r4/speed-rad2solar-viewer.html )

* Reads PNG files instead of HDR files

### [SPEED Rad2Solar Viewer R3]( https://www.ladybug.tools/spider/sandbox/speed-rad2solar-viewer/r3/speed-rad2solar-viewer.html )

* Obtains the list of RGBE/HDR files included in a given test case folder on GitHub
* Lists the names of the files with links to each file in the menu
* Parses the file name string of the bitmap to obtain center point and and normal as floating point Three.js vectors
* Obtains the width and height of each texture
* Loads each bitmap as a Three.js texture
* Creates a Three.js plane for each bitmap
	* Applies texture to the plane
	* Positions plane at center point
	* Rotates plane to align to the normal
	* Sizes plane according to the specified width and height
* Displays a tellTale at center of Mesh
* Displays a tellTale  at end of dirction vector
* Draws the direction vector as cast from the center of the mesh in black
* Draws the normal as cast from the center of the mesh in cyan

#### Issues

* Out of 14 test files only nine are loaded successfully
	* Whether errors are because of HDR source issues or because of Three.js RGBELoader issues is not ye known
	* Investigation by modifying Three.js RGBELoader source code is the next action item
* Rotations not fully worked

### [SPEED Rad2Solar Viewer R2]( https://www.ladybug.tools/spider/sandbox/speed-rad2solar-viewer/r2/speed-rad2solar-viewer.html )

#### Currently broken as BMP source files were deleted
* Obtains the list of bitmaps included in a given folder on GitHub
* Lists the names of the bitmaps with links of each file in the menu
* Parses the file name string of the bitmap to obtain center point and and normal as floating point Three.js vectors
* Loads each bitmap as a Three.js texture
* Creates a Three.js plane for each bitmap
	* Applies texture to the plane
	* Positions plane at center point
	* Rotates plane to align to the normal
	* Sizes plane according to width and height proportions of the bitmap

#### Issues

* Some planes are rotated incorrectly by 90 degrees
* Future bitmaps will have suitable sizing data

### [SPEED Rad2Solar Viewer R1]( https://www.ladybug.tools/spider/sandbox/speed-rad2solar-viewer/r1/speed-rad2solar-viewer.html )

####  Currently broken as BMP source files were deleted
* Forked from [Rad Viewer Bitmap R3.1 Speed]( https://www.ladybug.tools/spider/rad-viewer/rad-viewer-bitmap/r3-speed/rad-viewer-bitmap.html )


### [SPEED Rad2Solar Spec Update]( https://github.com/ladybug-tools/spider/blob/master/sandbox/speed-rad2solar-viewer/speed-rad2solar-spec-update.md )

### [SPEED Rad2Solar Spec Confluence]( https://www.ladybug.tools/spider/#sandbox/speed-rad2solar-viewer/speed-rad2solar-spec-update.md )


## Wish list



## Issues



## Links of Interest

### Sunshine
* https://en.wikipedia.org/wiki/Sunshine_duration
* https://en.wikipedia.org/wiki/List_of_cities_by_sunshine_duration
* https://github.com/tudelft3d/Solar3Dcity


### HDR to PNG

* https://en.wikipedia.org/wiki/IrfanView
* https://www.irfanview.com/


## Change Log


### 2018-07-12 ~ Theo

R2S 5.2

* Opacity set to 1
* Errant file deleted in test case 8


### 2018-07-04 ~ Theo

* Add SPEED Rad2Solar Viewer R3
* Update readme

### 2018-06-19 ~ Theo

* Add SPEED Rad2Solar Viewer R1
* Move read me and spec text around
* Add SPEED Rad2Solar Viewer R2

### 2018-06-10 ~ Theo

* First commit


***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>



