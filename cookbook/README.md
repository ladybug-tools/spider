<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://rawgit.com/ladybug-tools/spider/master/#cookbook/README.md "View file as a web page." ) </span>



# Cookbook Read Me

## Coding Style

These scripts here are cook book style example code


### Strategies

The scripts are intended to help with rapid iteration. For example, choosing a pretty color or selecting a pleasing length may require the viewing of numerous fails involving editing the code, saving it, refreshing the browser, and judging the results. 

Until there is an AI debugger for ugliness, the path toward a beautiful user experience is paved with the the coder's fails.

Here use use a variety of strategies in order to get up to speed at faster fails per hour

The tricks include:

* Make the code a readable as possible 
	* Avoid using symbols such as ~~ or => that requires extra mental processing
	* Make the code as much as possible like reading a line of English prose
* Use a variety of color to indicate that adjacent and connected elements are actually separate elements
* If a feature creates an element then display that element immediately and in a distinguishable manner. 
	* You should not have to click to see if something is actually there
* Enable viewing everything upon loading
	* use transparency and 'exploding' element positions
* Allow as much possible user interaction as possible
	* Cookbook examples are places where you find out what crashes your app
	* Will your script survive a user entering negative numbers?
	* Can things get too big or small or invisible and come back and still be usable?
	* Preventing users from entering invalid data is a very separate issue
		* And we need to provide some cookbook examples of helping you input useful data 
* Do not apply fixes for particular operating systems
	* Example: issues with iframes on Apple mobile devices
	* Example: wide lines on Widows OS with certain browsers



### Files

All the examples here are standalone files.

They follow the Three.js examples: https://threejs.org/examples/

* All HTML, CSS and JavaScript - apart from library files - are in a single HTML files




 
