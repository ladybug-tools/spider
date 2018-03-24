<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/r12/gv-hud/README.md  "View file as a web page." ) </span>

# gbXML Viewer Heads Up Display (HUD) Read Me


<iframe class=iframeReadMe src=http://rawgit.com/ladybug-tools/spider/master/gbxml-viewer/r12/gv-hud/gv-hud.html width=100% height=400px >Iframes are not displayed on github.com</iframe>


## Full screen test: [gbXML Viewer Heads Up Display]( http://rawgit.com/ladybug-tools/spider/master/gbxml-viewer/r12/gv-hud/gv-hud.html )


## Concept

Wikipedia: [Head-up display]( https://en.wikipedia.org/wiki/Head-up_display )

> A head-up display or heads-up display, also known as a HUD, is any transparent display that presents data without requiring users to look away from their usual viewpoints. The origin of the name stems from a pilot being able to view information with the head positioned "up" and looking forward, instead of angled down looking at lower instruments. A HUD also has the advantage that the pilot's eyes do not need to refocus to view the outside after looking at the optically nearer instruments.

> Although they were initially developed for military aviation, HUDs are now used in commercial aircraft, automobiles, and other (mostly professional) applications.

This feature could also be termed a '[context menu]( https://en.wikipedia.org/wiki/Context_menu )'.


## Wish list

See main read me

## Issues

Very occasionally the Three.js Shape function draws surfaces with openings incorrectly. This occurs when a border of an opening lies on top of a border of the surface. In other words the topology changes from an 'O' to a 'U'. Given that the Shape function handles the great majority of cases as anticipated, chasing down the cause and remedies of this issue loos like it may be a ongoing struggle.

The next steps may include
* Drawing telltales for the gbXML polyloops to see if any visible idiosyncracies in the error causing surfaces can  be identified.
* Embedding a new shape drawing function that can be used to correct the errors

### Save File


### Surface type changes

The following cases need to be handled when changing the type of the surface

#### No adjacents

* From shade to shade: no change / OK
* From shade to single adjacent: display empty single adjacent space edit area / OK
* From shade to two adjacents: display two empty adjacent space areas / OK

#### Single adjacent

* From single to shade: remove adjacent / display none / OK
* From single to single: no change OK / OK
* From single to two adjacents: add adjacent space OK / display two empty adjacent space areas first with pre-existing adjacent OK /

#### Two adjacents

* From two to shade: remove both / display none OK /
* From two to single: remove 2nd OK / display 2nd OK /
* From two to two: no change OK / display two OK/


## Links of Interest


## Change Log

### 2018-03-23 ~ Theo

* Fix spaces not showing in HUD select space


### 2018-03-20 ~ Theo

* Add remove telltales

### 2018-03-06 ~ Theo

* Reduce vertical size of HUD to make all three areas visible on a laptop
	* 2018-03-05 ~ Drop description << done
	* 2018-03-05 ~ Reduce selects to 5 << done
* * 2018-03-05 ~ Check prettiness of display of a greater variety of files << mostly OK
* Continue adjusting HUD horizontal CSS


### 2018-03-05 ~ Theo

Manual testing R11.3
* Delete surfaces
	* Test: 2 or more models / 2 or more surface types / save and open:
		* R11.3 2018-03-05 11:16 ~ save OK
* Change surface type
	* Test: 2 or more models / 2 or more surface types / save and open:
		* R11.3 2018-03-05 11:22 ~ Bristol model: OK
		* R11.3 2018-03-05 11:22 ~ save with issues: Golden model - roof to interior wall- only one adjacent
* Change CAD Object ID
	* Test: 2 or more models / change 2 or CAD IDs / save and open:
		* R11.3 2018-03-05 11:29 ~ Bristol model: OK
		* R11.3 2018-03-05 11:36 ~ London model: OK
* Change Adjacent Surface ID
	* Test: 2 or more models / change 2 or adjacent space IDs for every type of change / save and open:
		* All shade: no adjacent space to change
		* Exterior wall: change to another space with exterior wall: Bristol model:
			* Bristol model: partial fail - New spaces added but old space not deleted - so exterior wall becomes a two adjacent type
		* Interior floor: change adjacent #1 to another interior space
			* Bristol model: fail




### 2018-03-04 ~ Theo

* Update menu colors
* Add code to help with saving edit changes

Done
* 2018-02-25 ~ Edit Adjacent Spade IDs
* 2017-12-01 ~ What data should be included in heads-up display?


### 2018-03-03 ~ Theo

* All surface type changes handled
* Add details tags/triangles to all three areas
* Comment out zone info
* Add more tooltips
* Add select CAD Object ID
* Add update and save CAD Object ID - working roughly

### 2018-03-02 ~ Theo

* Most surface type changes handles

### 2018-02-28 ~ Theo
10.9
HUD
* Many fixes to adjacent spaces updates
* Fixes to surface type updates
	* Handling changes to number of adjacent spaces still incomplete - ie shade to interior wall

### 2018-02-26 ~ Theo

R10.8
* HUD
* Fix delete not deleting
* Add ZXCV access keys to toggle visibility
	* ALT + key to toggle element.surfaces/edges/all
* Add input and select alternative spaces

### 2018-02-25 ~ Theo

R10.7
* HUD
	* Many fixes
	* Streamline/simplify the UI

### 2018-02-21 ~ Theo

R10.4
* Name space started

### 2018-02-17 ~ Theo

R10

### 2018-02-10 ~ Theo

* HUD:
	* Adjust position of placards
	* Add polyloop telltales

### 2018-02-09 ~ Theo

* HUD
	* Enable draggable and resizable div
	* Fix CASObjectId issue
	* Add volume output
	* Add more console.log outputs
	* Add telltales with vertex numbering

### 2018-02-08 ~ Theo

* HUD: Add many new buttons to display
	* ID
	* Type
	* CAD Object ID
	* Spaces
	* Storeys
	* Visibility

### 2018-01-02 ~ Theo

* Copy read me to R9 and update

### 2017-12-02 ~ Theo

* test works with core r2
* readme fixes


### 2017-11-15 ~ Theo

* First commit

***

<center title="hello!" >
# <a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a>
</center>


