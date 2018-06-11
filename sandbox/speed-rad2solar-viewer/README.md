<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page](http://www.ladybug.tools/spider/index.html#sandbox/speed-rad2solar-viewer/README.md "View file as a web page." ) </span>

<div><input type=button onclick="window.location.href='https://github.com/ladybug-tools/spider/tree/master/sandbox/speed-rad2solar-viewer/README.md'"
value="You are now in a GitHub web page view - Click this button to view this read me file as source code" ><div>

# [SPEED Rad2Solar Viewer Read Me]( #sandbox/speed-rad2solar-viewer/README.md )


## Concept

# HTML Layout

1. As you do now, there should be one button to import a single .rad file. This is for viewing .rad files for test cases as they are generated.

2. Also, there should be a button to import "Import RAD2Solar Project", and the import button should load a directory. The directory that is selected will have a .rad file and all the corresponding bitmaps.

3. Down below, where you have "Sample files", please eliminate all the existing rad files from various sources and just provide shortcuts to the .rad file in each "test-cases/test-case-x/ folders.

4. Please also make a drop down for "Sample projects". This will provide shortcuts to the folders within "test-cases/".

5. Please provide two toggle buttons: (1) "Hide .rad" and (2) "Hide .bmps". This will be useful when viewing a project.

6. Please remove auto generation and assignment of bitmaps.

--Data Type and Formatting Specification--

1. Theo passed bitmaps, rad file. This is how Theo will read in and view bitmaps in three.js…he will read in string for xyz center point of bitmap and the normal, and place in three.js. He will also read in .rad file with surface object outlines only in black, no fills. The bitmaps will be the fills.

2. Legend always faces user and hovers along side of three.js scene

3. When viewing rad file, preferable to not view lines of polygon for walls that connect windows and walls (i.e. just view essentially the 4 node polyloop surfaces of walls and windows.

Rest of rad file viewed without surface fills, just line geometry in black.

<!--
## [SPEED Rad2Solar Viewer]( http://www.ladybug.tools/spider/sandbox/speed-rad2solar-viewer/index.html )

<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/sandbox/speed-rad2solar-viewer/index.html width=100% height=400px >Iframes are not displayed on github.com</iframe>

_Latest project here_

-->

## Wish list


## Issues



## Links of Interest



## Change Log

### 2018-06-10 ~ Theo

* First commit


***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>



