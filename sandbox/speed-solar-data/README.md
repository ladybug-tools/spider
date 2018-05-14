<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://rawgit.com/ladybug-tools/spider/master/#sandbox/speed-solar-data/README.md "View file as a web page." ) </span>
<input type=button onclick="window.location.href='https://github.com/ladybug-tools/spider/blob/master/sandbox/speed-solar-data/README.md'"
value="You are now in a GitHub web page view - Click this button to view this read me file as source code" >

# SPEED Solar Data Read Me

## [SPEED Shadow/Radiant Specification]( https://rawgit.com/ladybug-tools/spider/master/#sandbox/speed-solar-data/speed-shadow-radiant-spec.md )


## Full screen: [SPEED Shadow Input 4]( https://rawgit.com/ladybug-tools/spider/master/sandbox/speed-solar-data/speed-shadow-input-4.html )

<iframe class=iframeReadMe src="https://rawgit.com/ladybug-tools/spider/master/sandbox/speed-solar-data/speed-shadow-input-4.html" width=100% height=400px >iframes are not displayed on github.com</iframe>

* Loads gbxml files using file dialog box
* Display surfaces of type ExteriorWall, Roof and Shade only
* Button to toggle display of patches at approximately 1 unit intervals
* Button to display patches data on screen
* Button to save patches data to file.

### Notes

* Patches for Shade surfaces turned off because they take too long to create. Future release will be much faster at drawing patches.
* Future release will include openings



## Full screen: [SPEED Shadow Input 3]( https://rawgit.com/ladybug-tools/spider/master/sandbox/speed-solar-data/speed-shadow-input-3.html )

* As #2
* Adds create export data and display data on-screen
* Adds save data to file


## Full screen: [SPEED Shadow Input 2]( https://rawgit.com/ladybug-tools/spider/master/sandbox/speed-solar-data/speed-shadow-input-2.html )

* Loads a pre-configured, very simple gbXML file
* Click button to create patches at roughly one x unit x one y unit separation
* X and Y deltas may be slightly different
* Use slider to rotate patches to check size and position
* Ditto wireframe button



## Full screen: [SPEED Shadow Input 1]( https://rawgit.com/ladybug-tools/spider/master/sandbox/speed-solar-data/speed-shadow-input-1.html )

<iframe class=iframeReadMe src="https://rawgit.com/ladybug-tools/spider/master/sandbox/speed-solar-data/speed-shadow-input-1.html" width=100% height=400px >iframes are not displayed on github.com</iframe>

* Reads gbXML files via a URL or the file dialog box
* Searches for 'exposedToSun' attribute
* Displays file in 3D
* Generates normals for every Three.js face in the scene
	* Combines triangles into quads
	* Does yet handle odd shaped surfaces
* Displays calculated data on screen
* Exports the data to a local file




## Full screen: [SPEED Result Viewer 1]( https://rawgit.com/ladybug-tools/spider/master/sandbox/speed-solar-data/speed-result-viewer-1.html )

<iframe class=iframeReadMe src="https://rawgit.com/ladybug-tools/spider/master/sandbox/speed-solar-data/speed-result-viewer-1.html" width=100% height=400px >iframes are not displayed on github.com</iframe>

* This script reads a Radiance 'shadow' file and displays each vertex and associated color as a Three.js point


### Subdivisions Thoughts

* Use 1m * 1m grid and trim at the edges. Use a 'marching squares approach
* Recombine all roof surfaces into a single shape. Ditto walls



