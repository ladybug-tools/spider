
## Ladybug Tools / Spider

# gbXML Viewer R11

[gbXML Viewer]( https://github.com/ladybug-tools/spider ) is a collection of free, open source modular [JavaScript]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/About_JavaScript )/[WebGL]( https://www.khronos.org/webgl/ )/[Three.js]( https://threejs.org/) experiments for viewing, validating and editing [gbXML]( http://gbxml.org ) files in 3D in your browser.

Questions: [Ladybug Tools forum]( http://discourse.ladybug.tools/c/spider ) &nbsp; Bugs: [GitHub issues]( https://github.com/ladybug-tools/spider/issues )

### Must watch YouTube video:

[![gbXML Viewer User Guide]( ../../../images/gbxml-viewer-user-guide-300px.png )]( https://youtu.be/2QHrbuKIkdY )



<!--
<details open>

<summary>Welcome  ~ R.</summary>

</details>
-->

<details open>

<summary>Welcome 2018-03-09 ~ R11.12.4</summary>


This release is the stable version release. Further development will continue on a fresh cade base. You may use this release for work without worrying too much that the programmers might do something awful with the code over night. ;-)

R11.12.4

* Reorganize footer links
* Drop default files feature for now
* Update the various text files
* Fix some Unicode as image issues

R11.12.3

* Add 'Support, Issues, Wish List & Wanted' page with link in main menu footer
	* Closes: 2018-03-08 ~ Start an Issues menu item

R11.12.1

* Add eye.png to REP/Reports

R11.12.0

APP ~ Main application module

* Style sheet: Add box-shadows and other visual effects
* Footer pages: Split Release Read Me into two files / New Previous Releases page link added to menu

COR ~ Core module

* Much code clean-up and making functions more reusable

ETC
* Quite a bit of work on the read me files


</details><details open>

<summary>Welcome 2018-03-08 ~ R11.11</summary>

R11.11.1 ~ Bug fixes

APP ~ main menu

* Done: 2018-03-06 ~ App onload reloads previously referenced model
	* Paste file name into main menu input box
	* Use relative file path: ../../filename.xml
	* Use local URL: file:///D:/Dropbox/gbxml-sample-files/filename.xml
	* Use www URL: https://rawgit.com/ladybug-tools/spider/master/gbxml-sample-files/london-office.xml
	* Click main menu title to reload

SET ~ Settings

* Sections: beginning to work as desired
* Dealt with: 2018-03-08 ~ fix Sectioning issues

</details><details open>

<summary>Welcome 2018-03-07 ~ R10.7 / 8 / 9 / 10</summary>

11.10
* Fixes issues with 'save edits'
* Fixes resetting the lights issue /
 * Done: 2018-03-06 ~ Three.js R90

11.9 SAV: fixes unable to select new space if space = none

11.8 SAV: fixes 2 to 1 update

SAV ~ Save Changes and Save Edits

* Add and create correct adjacent attribute data when saving a changed surface type
* Able to save both Save Changes and Save Edits for all seven use cases
* Only lightly tested

Still with errors: Making edits with HUD and then directly using Save Edits.

Better to use the following steps:

1. Make some edits with HUD
2. Use Save Changes to save the edits to a file
3. Open fresh version of the model.
4. Open and apply the save changes file you just created.
5. Then use Save Edits to save the final updated version of the model

This workflow will be improved in future releases

</details><details open>

<summary>Welcome 2018-03-06  ~ R10.5 / R10.6</summary>

HUD

* Reduce vertical size of HUD to make all three areas visible on a laptop
	* 2018-03-05 ~ Drop description << done
	* 2018-03-05 ~ Reduce selects to 5 << done
* * 2018-03-05 ~ Check prettiness of display of a greater variety of files << mostly OK
* Continue adjusting HUD horizontal CSS

GBX ~ nothing vieawble in UI here
* First commit
* 2018-03-04 ~ Split into separate modules << here we are

SAV ~ Save Changes
* GBV.surfaceChanges refreshed each time a new model is loaded
* Error messages created if surface not found / app continues even surface not found
* Save changes statistics/log and source code displayed in a divContainer at each load
* After you open a save changes file you may continue adding to it and save the old and new edits to a new file

APP ~ main application menu

* Add more tooltips

Core

* Add file name and time to load

Done

* 2018-03-04 ~ Test new smaller files to see if they load faster

</details><details open>

<summary>Welcome 2018-03-04 ~ R11.3 / R11.4 </summary>

R11.4
APP / Style.css
* Add .highlight class with new var --highlight-color
* Set highlight background-color to Spring Green as per Michalina new palette
* Add css vars to HUD mnu

R11.3 to stable release

Settings Module

* Tighten up the menu
* Add section view ~ _Work-in-progress.

Application Menu Module

* Update menu colors. Thanks to Michalina for the palette
* Delete edit menu
* Add 'manage save changes files' menu button
* Add links and text edits throughout

Save Changes Module

* First commit
* Add save changes to file button and code
* Add open file button and code
* Only very lightly test

HUD Module

* Update menu colors
* Add code to help with saving edit changes

Read Me Files

* Manu updates

</details><details open>

<summary>Welcome 2018-03-03 ~ R11.1 / R11.2</summary>

Settings

* Add explode view by storeys

HUD

* All surface type changes handled
* Add details tags/triangles to all three areas
* Comment out zone info
* Add more tooltips
* Add select CAD Object ID
* Add update and save CAD Object ID - working roughly
* R11.2: fix to save file issue

Reports

* CAD Object ID Groups sorted

Duplicate Adjacents

* Fix toggle all issues button not highlighting

</details><details open>

<summary>Welcome 2018-03-02 ~ R10.11 / R11</summary>

Congratulations to Michal for a successful TAS User presentation.

R10.11 is the new stable release

* Updates to all index read me files
* Fixes and more element details to Duplicate Adjacents meu

Heads-up display (hud)
* Continued effort to update adjacent spaces correctly when editing surface type
* See [hud read me]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/r10-11/gv-hud/README.md ) change log
* Have not yet tested saving edits

R11 is the new pre-release

Many updates to all the Read Me files




</details><details>

<summary>Welcome 2018-02 ~ February ~ R9.6 to 10.10</summary>

R1O:10.1
* HUD select now sho 8 items instead of 10
R10.:1O:10.2 / R10.:1O:10.4 / R10.:1O:10.5
* Various menu size fixes
R10.:1O:10.3
* Save file working again



R10.10
SET
* Passed through JSLint ~ many slight fixes
* Toggle Ortho camera now working
* Update name space variables

APP
* Update name space variables

HUD
* Update name space variables
* Fix no-scroll select surface
* Rejig update buttons
* Improve menu width handling
* When change type, adjacent spaces update more correctly

### Welcome 2018-02-27 ~ R10.9

Reports
* Fix silly devLog bug that was breaking everything
* Fix visibility toggles
* Add new menu item: CAD Object ID Groups < wishlist item

HUD
* Add modified by button
* Add select surface list
	* Issue with using cursor keys
* Add input surface ID
* Started update surface adjacent spaces
* Started fix surface type adjacent space update
	* Handling changes to number of adjacent spaces still incomplete - ie from shade to interior wall

Settings
* Explode view with minus, reset and plus buttons
* Starting to be interesting / need separate horizontal and vertical scaling

10.9.2
* Fix surface normals not showing
* Fix Duplicate CADObjectId not showing

### Welcome 2018-02-26 ~ R10.8</summary>

App
* Menus reset when new model loaded

HUD
* Fix delete not deleting
* Add ZXCV access keys to toggle visibility
	* ALT + key to toggle element/surfaces/edges/all
* Add input and select alternative spaces

### Welcome 2018-02-25 ~ R10.7</summary>

R10.7
* All modules updated. Name space fixes etc

Heads-up Display
* Many fixes
* Streamline/simplify the UI

Edit Duplicate Adjacents
* Simplified
* Works more closely with HUD

Done
* 2018-02-18 ~ Drag and drop broken
* 2018-02-11 ~ Theo: update links to new folder
* 2018-02-11 ~ Theo: Fix explode view so it works


### >Welcome 2018-02-25 ~ R10.6</summary>
* Add GBV module
	* No user iterface interaction / all behind the scenes
	* Standardizes and simplifies many viewing functions
* Add 'edit duplicate adjacents' module
	* Finds all instances of surfaces with two identical adjacent spaces
	* Tools to help with understanding circumstances
	* At a very early stage. Cannot edit or save yet

### Welcome 2018-02-23 ~ R10.5</summary>

* Add 'edit duplicate surfaces' module
	* Finds all instances of two surfaces with identical coordinates
	* Tools to help with understanding circumstances
	* Delete duplicates and save changes



### Welcome 2018-02-21 ~ R10.4</summary>

* Many fixes 'under the hood' / User interface has few changes
* [Name spaces]( https://en.wikipedia.org/wiki/Namespace ) implemented for much of the code
	* Prevents functions and variables in one module trashing a similarly named items in another module
* 'Edit file' workflow improved

### Welcome 2018-02-19 ~ R10.3</summary>

* Many fixes
* Menus move more smoothly
* Editing, deleting and saving all working - but testing has just started
* HUD updates with Editor and reports


### Welcome 2018-02-18 ~ R10.2</summary>


Add Edit module. All menus movable and resizable. Many fixes throughout. In the Settings menu, the 'Explode view' feature is still not perfect but has been much improved.

Three.js core:
	* If location.hash calls for non-gbXML file then load default file
	* Feeble start to name spacing
	* Update test script titles
	* Update readme links

Gallery
	* Fix HR issues
	* Test works OK
	* Fix readme links

Editor
	* Added to GV App
	* Standalone test file also works
	* Not fully tested/completed

App
	* divContainer
		* resizes more nicely
		* styles enhanced
	* divMenu
		* resizes and moves - a bit flakey though


### Welcome 2018-02-17</summary>

Add three more modules: heads-up display, first person camera and save.

* Add HUD, first person and Save to R10
* Update and enhance template style sheet and files



### Welcome 2018-02-16</summary>


R10 first commit. A significant revision. The code is smaller, simpler and faster. About half the R9 code is in 10. The remaining modules should be available soon.

The interface give more emphasis to the model - and less to the menus. And, of course, new and more colors.

### 2018-02-16 ~ Theo

R10
* First commit

### >Welcome 2018-02-13</summary>


Settings menu: Explode view beginning to operate as desired. Still much to do to improve the user experience. Reload web page required to fully reset view.

### 2018-02-13 ~ Theo

* Settings:
	* Explode view beginning to operate as desired.
	* Still much to do to improve the user experience
	* Reload web page required to fully reset view.


### 2018-02-11 ~ Theo

* App & HUD: More efforts on touch-enabled interaction and Apple support

Done at one time or another
* 2017-12-07 ~ Theo: Add better size adjustment to text box
* 2017-12-02 ~ Michal: Add filters to ignore shade surfaces. Or perhaps only display for certain surface types
* 2017-12-07 ~ Theo: Refresh reports each time a new model is loaded
* 2017-12-02 ~ Michal: Do a better job of displaying/reporting duplicates
* 2017-12-02 ~ Michal: Highlight and display surfaces that are inside larger surfaces


### 2018-02-10 ~ Theo

* HUD:
	* Adjust position of placards
	* Add polyloop telltales


### 2018-02-09 ~ Theo

* R9.9
* App: Add sucky iOS iframe auto-resize workaround
* HUD:
	* Enable draggable and resizable div
		* Not yet working on mobile devices
	* Fix CASObjectId issue
	* Add volume output
	* Add more console.log outputs
	* Add telltales with vertex numbering


### 2018-02-08 ~ Theo
Core now corrects for duplicate vertices and other errors in gbXML files. HUD adds many more buttons

* R9.8a
* HUD: Add many new buttons to display
	* ID
	* Type
	* CAD Object ID
	* Spaces
	* Storeys
	* Visibility
* Core: Add checks for duplicate extra vertices in gbXML file vertices data


### 2018-02-07 ~ Theo

* R9.7
* HUD
	* Add toggle surface type button
	* Add display CAD Object button
	* Add toggle visibility button
	* Add all visible button
	* Duplicate coordinates now highlighted in yellow


### Welcome 2018-02-03</summary>


Starting to add saving and editing. Help text added to Reports menu. Storey and Space readout in Core work better.

### 2018-02-02 ~ Theo

* R9.6a
* Core: add  gbxml var
* Cure: clear divLog with reset view
* Reports: fix issues with storey and space readout in core
* Help text added to Reports menu.
* Save File: first commit
* App: add save file button


</details><details>

<summary>Welcome 2018-01 ~ January ~ R9 to R9.5</summary>


### 2018-01-27 ~ Theo

* R9.5
* Core: drop createReport
* Reports Fix no data for single space issue
* Reports: Fix incorrect space numbering
* App: Add onloadThreejs to clean up reports

### 2018-01-17 ~ Theo

* App R9.3
* Add Octocat link to App menu
* Change default read me from release read me to main read me
* Read me iframe link from App to Core
* Add link to release red me on menu
* Add Sun Range links to read me


## 2018-01-02 ~ Theo

* Fixing and updating all the R9 module read me files

### 2018-01-01 ~ Theo

Happy new year!

Please welcome gbXML Viewer R9 with its redesigned user experience.

The big new feature is the screen capture utility. Now you can create animated GIFs from your files.

2018-01-02 ~ minor fixes throughout

* R9.0
* Redesigned user experience
	* All modules may loaded and used simultaneously
	* Switch between text and 3D without losing your place
* Has all the modules of R8
* Add screen capture modules

Done
* 2017-12-10 ~ Michal: can we switch off shadows?
* 2017-12-06 ~ Add slider to move ground up or down

</details><details>

<summary>Welcome 2017</summary>
### 2017-12-17 ~ Theo

* Settings
	* Toggle ground and toggle Grid
		* Resets with each new model
		* Auto-positioned at bounding box minimum
		* Buttons added to increase or decrease of height level
	* Toggle surface normals
		* Resets with each new model
	* Add toggle shade and shadows
	* Add explode view horizontal and vertical
		* First pass / still many issues / but will eventually be lots of fun


### 2017-12-16 ~ Theo

* Add 'Robust' Core version


### 2017-12-15 ~ Theo

* Sun Path / Analemma 3D
	* Mostly functioning as intended
	* Minor issues still to be fixed


### 2017-12-13 ~ Theo

* Read Me files
	* Add many links and update text throughout
* Sample files
	* Files renamed in a consistent manner
	* Read me added
* View Updates
	* View update issues a blog posts
* Reports
	* Duplicate CAD IDs sorted and display next to each other
	* Every set of duplicates CAD IDs has its own toggle view button
	* Same toggle view button added to other reports


### 2017-12-12 ~ Theo

* Reports
	* Updated to button tag
	* Storeys: display number and IDs of spaces
	* Surfaces
		* Better handling of on/off toggles
		* Add 'all visible' button
	* Duplicate Coordinates
		* Add visibility toggle for all duplicates
		* Add Space button to toggle view of space
	* Duplicate Adjacencies
		* Add visibility toggle for all duplicates
		* Add length and width of element
	* Tiny Surfaces
		* Add length and width of element
	* Invalid Adjacencies << new item
		* Checks for multiple adjacencies in objects that should only have a single adjacency
* Settings
	* Add toggle buttons for surfaces/edges/all
	* Update colors
	* Colors of duplicates etc unchanged when toggling other color settings
* Many other minor fixes and code clean-up

### 2017-12-10 ~ Theo

R8.10
* Add 'first person' camera
* Add beginning of drawing an analemma
* Exposure type material colors updated
* Update draw normals only if element is visible
	* Use Reports > Surfaces to toggle element visibility then use this command
* Update to 'toggle camera ortho'


Done
* 2017-12-07 ~ Michal: Toggle for Ortho camera
* 2017-12-10 ~ Michal: Update color choices
* 2017-12-10 ~ Michal: can we show normals for selected items only?


### 2017-12-08 ~ Theo

R8.9
* Core
	* Add 'reset view' calls createReport()
* HUD
	* Add toggle button
	* Toggle off when new file loaded

R8.8
* Core
	* Add 'reset view' button resets background, camera, material colors
* Reports
	* Add toggle visibility for each surface type
	* Add display zone count and names per storey

Note
'reset view' button not currently working in reports, so has been disabled for the moment

Done
* 2017-12-07 ~ Michal: toggle for HUD
* 2017-12-08 ~ Michal: reset view: includes background gradient , materials colors or camera ortho
* 2017-12-08 ~ Michal: Storey ability to hide roofs or floor to better see layout
* 2017-12-08 ~ Michal: can we show number of zones per storey?


### 2017-12-07 ~ Theo

R8.7
* Templates: code clean-up
	* Add drag and drop capability
	* Better selection of sample files
* Settings:
	* Add set color by exposure type
	* Add drag and drop capability
	* Better selection of sample files
* Reports
	* Add drag and drop capability
	* Better selection of sample files
	* Add view storey
	* Add is a space has an 'InteriorFloor' or 'SlabOnGrade' or 'RaisedFloor' or 'UndergroundSlab' then zoom into that space
* App2
	* Add drag and drop capability

Done

* 2017-12-01 ~ Load files via drag and drop
* 2017-12-02 ~ Add test file??
* 2017-12-01 ~ Add choice to display in right-side menu

### 2017-12-06 ~ Theo

App2 R8.5
12:44
* Fixed: reset view not resetting surfaces visible
* Settings: add toggle grid
* Settings: add toggle ground
* App2: add footer

* 2017-12-01 ~ Add a 'ground' that can receive shadow

8.6
21:32
* Fix some of the reset view issues
* Highlight all duplicate adjacencies in red
* Add better spacing between duplicate adjacencies log
* Tiny surface telltale now has opacity - so you can see very tine things inside the telltale
* location hash and splash screen working together better
* Add button to turn off heads-up - not yet a nice toggle

### 2017-12-05 ~ Theo

R8.5 ~ new user interface
* Everything in left menu


### 2017-12-04 ~ Theo

Little fixes and new features everywhere

* Add buttons to heads-up display
* Add choices to Settings
* Add surface edges and rest buttons to core
* 2017-12-02 ~ Michal: Zoom and center duplicate surfaces, duplicate coordinates, tiny surfaces
* 2017-12-01 ~ Add better display = none on new file loaded
* 2017-12-01 ~ Add hamburger/slider menu
* 2017-12-01 ~ Michal: Locate camera/controls target inside a given space / zoom into the space


### 2017-12-03 ~ Theo

* 2017-12-02 ~ Michal: Report and display surfaces with duplicate CAD IDs
* 2017-12-02 ~ Michal: Highlight and display tiny areas << Added Report > Tiny Surfaces

### 2017-12-02 ~ Theo

* 2017-12-01 ~ Michal: load local files via location.hash < see read me for Core module

### 2017-11-30

* First Commit


</details>

***

<h2 onclick=divMenu.scrollTop=0; style=cursor:pointer;text-align:center; title='go to top and, btw, my web is better than your web' > &#x1f578; </h2>
