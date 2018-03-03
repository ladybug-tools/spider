
## Ladybug Tools / Spider

# gbXML Viewer R11

gbXML Viewer is a collection of free, open source modular JavaScript experiments for viewing, examining and validating [gbXML]( http://gbxml.org ) files in 3D in your browser.


### Must watch video:
[![gbXML Viewer User Guide]( ../../../images/gbxml-viewer-user-guide-300px.png )]( https://www.youtube.com/watch?v=YqEkc3rvxYs )

<!--
<details open>

<summary>Welcome  ~ R.</summary>

</details>
-->



<details open>

<summary>Welcome 2018-03-02 ~ R10.11</summary>

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

<summary>Welcome 2018-02-28 ~ R10.10</summary>

R10.:1O:10.1
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

</details><details>

<summary>Welcome 2018-02-27 ~ R10.9</summary>

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

</details><details>

<summary>Welcome 2018-02-26 ~ R10.8</summary>

App
* Menus reset when new model loaded

HUD
* Fix delete not deleting
* Add ZXCV access keys to toggle visibility
	* ALT + key to toggle element/surfaces/edges/all
* Add input and select alternative spaces

</details><details>

<summary>Welcome 2018-02-25 ~ R10.7</summary>

Heads-up Display
* Many fixes
* Streamline/simplify the UI

Edit Duplicate Adjacents
* Simplified
* Works more closely with HUD

</details><details>

<summary>Welcome 2018-02-25 ~ R10.6</summary>
* Add GBV module
	* No user iterface interaction / all behind the scenes
	* Standardizes and simplifies many viewing functions
* Add 'edit duplicate adjacents' module
	* Finds all instances of surfaces with two identical adjacent spaces
	* Tools to help with understanding circumstances
	* At a very early stage. Cannot edit or save yet
</details><details>

<summary>Welcome 2018-02-23 ~ R10.5</summary>

* Add 'edit duplicate surfaces' module
	* Finds all instances of two surfaces with identical coordinates
	* Tools to help with understanding circumstances
	* Delete duplicates and save changes



</details><details>

<summary>Welcome 2018-02-21 ~ R10.4</summary>

* Many fixes 'under the hood' / User interface has few changes
* [Name spaces]( https://en.wikipedia.org/wiki/Namespace ) implemented for much of the code
	* Prevents functions and variables in one module trashing a similarly named items in another module
* 'Edit file' workflow improved

</details><details>

<summary>Welcome 2018-02-19 ~ R10.3</summary>

<p>
* Many fixes
* Menus move more smoothly
* Editing, deleting and saving all working - but testing has just started
* HUD updates with Editor and reports
</p>

</details><details>

<summary>Welcome 2018-02-18</summary>

<p>
Add Edit module. All menus movable and resizable. Many fixes throughout. In the Settings menu, the 'Explode view' feature is still not perfect but has been much improved.
</p>

</details><details>

<summary>Welcome 2018-02-17</summary>

<p>
Add three more modules: heads-up display, first person camera and save.
</p>

</details><details>

<summary>Welcome 2018-02-16</summary>

<p>
R10 first commit. A significant revision. The code is smaller, simpler and faster. About half the R9 code is in 10. The remaining modules should be available soon.

The interface give more emphasis to the model - and less to the menus. And, of course, new and more colors.
</p>

</details><details>

<summary>Welcome 2018-02-13</summary>

<p>
Settings menu: Explode view beginning to operate as desired. Still much to do to improve the user experience. Reload web page required to fully reset view.
</p>

</details><details>

<summary>Welcome 2018-02-08</summary>

<p>
Core now corrects for duplicate vertices and other errors in gbXML files. HUD adds many more buttons
</p>

</details><details>

<summary>Welcome 2018-02-03</summary>

<p>
Starting to add saving and editing. Help text added to Reports menu. Storey and Space readout in Core work better.
</p>

</details><details>

<summary>Welcome 2018-01-01</summary>

<p>
Happy new year!
</p>

<p>Please welcome gbXML Viewer R9 with its redesigned user experience.</p>

<p>The big new feature is the screen capture utility. Now you can create animated GIFs from your files.</p>

<p>2018-01-02 ~ minor fixes throughout</p>

</details><details>

<summary>Welcome 2017</summary>



## 2018-01-02 ~ Theo

* Fixing and updating all the R9 module read me files

### 2018-01-01 ~ Theo

* R9.0
* Redesigned user experience
	* All modules may loaded and used simultaneously
	* Switch between text and 3D without losing your place
* Has all the modules of R8
* Add screen capture modules

Done
* 2017-12-10 ~ Michal: can we switch off shadows?
* 2017-12-06 ~ Add slider to move ground up or down

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
