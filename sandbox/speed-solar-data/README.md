
# SPEED Solar Data Read Me

## [SPEED Shadow/Radiant Specification]( #sandbox/speed-solar-data/speed-shadow-radiant-spec.md )


## Full screen: [SPEED Shadow Input 2]( https://rawgit.com/ladybug-tools/spider/master/sandbox/speed-solar-data/speed-shadow-input-3.html )

* Loads a pre-configured, very simple gbXML file
* Click button to create patches at roughly one x unit x one y unit separation
* X and Y deltas may be slightly different
* Use slider to rotate patches to check size and position
* Ditto wirframe button




## Full screen: [SPEED Shadow Input 1]( https://rawgit.com/ladybug-tools/spider/master/sandbox/speed-solar-data/speed-shadow-input-1.html )

* Reads gbXML files via a URL or the file dialog box
* Searches for 'exposedToSun' attribute
* Displays file in 3D
* Generates normals for every Three.js face in the scene
	* Combines triangles into quads
	* Does yet handle odd shaped surfaces
* Displays calculated data on screen
* Exports the data to a local file




## Full screen: [SPEED Result Viewer 1]( sandbox/speed-solar-data/speed-result-viewer-1.html )

* This script reads a Radiance 'shadow' file and displays each vertex and associated color as a Three.js point


### Subdivisions Thoughts

* Use 1m * 1m grid and trim at the edges. Use a 'marching squares approach
* Recombine all roof surfaces into a single shape. Ditto walls



