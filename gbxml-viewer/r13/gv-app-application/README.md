<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://www.ladybug.tools/spider/index.html#gbxml-viewer/r13/gv-app-application/README.md "View file as a web page." ) </span>

# r13 gv-App / gbXML Viewer / Application Module Read Me


<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/gbxml-viewer/dev width=100% height=400px>Iframes are not displayed on github.com</iframe>

## Full screen: [gbXML Viewer Application Module]( http://www.ladybug.tools/spider/gbxml-viewer/r13/gv-app-application/gv-app.html )



## Concept

* Script that brings all the gbXML Viewer modules together and available in a single application
	* Script that runs first when loading
* Links to the style sheet
* Makes the calls to all JavaScript libraries required at load time
	* Showdown
	* COR
	* THR
	* GBP
	* HUD
* Contains the HTML the creates the menus
* About one hundred lines of JavaScript to reset the menus
* Allows access to locate, open and display:
	* gbXML files
	* Markdown files
	* Most any file type
* Open files via open file dialog or drag and drop
* Open files via URL using a link or simply by copying and pasting into the address bar



### Style Sheet Notes

* Selectors in order of tags, classes and ID then alphabetical
* Properties in alphabetical order

### Menus

* Resizable, draggable and closable
* All UI elements work on computers, tablets and phones
* Menu colors are updated every release
* User interface is themable


## Wish list / To Do

See main read me file

* 2018-04-02 ~ Theo ~ 'Edit this file' buttons?
* 2018-04-02 ~ Theo ~ Display and edit gbXML Files??
* 2018-04-02 ~ Theo ~ Combine right meu and PopUp menu into a single window with two styles??


## Issues



## Change Log

### 2018-04-03 ~ Theo

R13.2

* Left Menu: now displays only a single feature

### 2018-04-02 ~ Theo

R13
* Coming on nicely

#### Mostly dealt with

* Style names needs cleaning up
	* Needs better 'left menu', 'middle menu', right-menu' conventions
	* Big change / much testing / Do this in R13
	* Set rems as unit
	* https://webdesign.tutsplus.com/tutorials/comprehensive-guide-when-to-use-em-vs-rem--cms-23984



### 2018-03-24 ~ Theo

R12.9
CSS
* Widths to rems
* Most all colors by css vars
APP
* Rejigged menu / item positions


### 2018-03-23

R12.8
* Fix reports menu not deleting itself
* Make sample file more visible

### 2018-03-23

R12.6
* Style: update pop-up width and position
	* Trying to make more of the 3D model viewable on startup
* APP: SAV/Changes are only applied if no location hash and default file

### 2018-03-14 ~ Theo

R12.1
* Big menu clean-up
* Add links and tooltips from lates R11
* Add back HTML instead of using vars
* Move right nav to COR
* Add default file capability with text input box
* Add file open help page and info icon on app menu


### 2018-03-05 ~ Theo

R11.4

APP / Style.css
* Add .highlight class with new var --highlight-color
* Set highlight background-color to Spring Green as per Michalina new palette
* Add css vars to HUD mnu

### 2018-03-04 Theo

* Update menu colors. Thanks to Michalina for the palette
* Delete edit menu
* Add 'manage save changes files' menu button
* Add links and text edits throughout


### 2018-02-21 ~ Theo

R10.11

### 2018-02-19 ~ Theo

R10.3

App
* 2018-02-18 ~ Drag and drop broken << many fixes

Fixed mostly
* 2018-02-18 ~ Menu items not updating when loading new files
* 2018-02-18 ~ Drag and drop broken

### 2018-02-18 ~ Theo

R10.2
* divContainer
	* resizes more nicely
	* styles enhanced
* divMenu
	* resizes and moves - a bit flakey though

### 2018-02-16 ~ Theo

* R10

### 2018-02-11 ~ Theo

* App & HUD: More efforts on touch-enabled interaction and Apple support

### 2018-02-09 ~ Theo

* Add sucky iOS iframe auto-resize workaround

### 2018-01-27 ~ Theo

* Add onloadThreejs to clean up reports

### 2018-01-02 ~ Theo

* Copy read me to R9 and update

### 2017-12-05 ~ Theo

App2

* Everything in left menu.
* Heads-up in fixed position
* 2017-12-02 ~ Add requestFile() instead of using the one in Core - might simplify the complicated path thing
* 2017-12-02 ~ Add: don't display right-menu when in child mode

### ??
* Works with Core R2




***


# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>



