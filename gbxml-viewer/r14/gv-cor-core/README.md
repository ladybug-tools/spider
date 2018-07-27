<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page](http://www.ladybug.tools/spider/index.html#gbxml-viewer/r14/gv-cor-core/README.md "View file as a web page." ) </span>

<div><input type=button class="btn btn-secondary btn-sm" onclick="window.location.href='https://github.com/ladybug-tools/spider/blob/master/gbxml-viewer/r14/gv-cor-core/README.md'";
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>

<br>

# [R14 'Aragog' COR Core Read Me]( #gbxml-viewer/r14/gv-cor-core/README.md )


<iframe class=iframeReadMe src=https://www.ladybug.tools/spider/gbxml-viewer/r14/gv-cor-core/gv-cor.html width=100% height=400px >Iframes are not displayed on github.com</iframe>


## Concept


This folder contains the basic script that loads style sheets, creates the menus, opens Markdown files and converts to HTML

Features include

* View gbXML files in 3D in your browser.
* Open files using HTML5 File Reader or by URL in location.hash
* Base script used by all the other gbXML Viewer modules
* Displaying the data in 3D using the [Three.js]( https://threejs.org ) JavaScript library is in the 'gv-thr' folder.
* Sets default URLs
* Adds event handlers
* Handles location hash change events
* Makes XMLHttpRequest calls
* Handles FileReader requests
* Responds to drag and drop events
* Handles moving the menus by monitoring mouse and touch events
* Responds to calls to slide the left and right menus

### Style Sheet considerations

For the previous few revisions there has been an ability to update the colors used the menus. While this ability is nice, it does not satisfy a larger need that the the project should be adaptable to the requirements of any popular JavaScript front-end library( React, Angular, Vue etc) and it should also be adaptable to any type of style sheet.

This revision add a small toward satisfying the latter need. This release add the ability to load, read and display full featured external style sheets. For the moment this is limited to the demo set of [Bootswatch]( https://bootswatch.com/ ) themes. Bootswatch supplies free and paid-for themes for the [Bootstrap]( https://getbootstrap.com/ ) library.

It is important to note that the gbXML Viewer is **not** turning into a Bootstrap-based app. The goal, as always, is for this library to be able to slip into the demands of any other popular JavaScript library.

What this revision does is merely read a Bootstrap-compatible .CSS file and display the expected results. The goal is to provide you with the confidence that you can use any combination of colors, sizes, fonts and other effects in the app you are building


## Wish list

* 2018-07-19 ~ Theo ~ Find more stashes of free styles
* 2018-07-19 ~ Theo ~ add ability to add and remove classes upon new events
* 2018-07-19 ~ Theo ~ Michal wants a yellow theme
* 2018-03-04 ~ Random model on start-up?
* 2018-02-18 ~ Menus remember their position from session to session
* 2018-02-21 ~ Add automatic addition of ground


## Issues



## Links of Interest

CSS / Bootstrap
* See https://pushme-pullyou.github.io/#tootoo-templates/README.md


## Change Log


### 2018-07-27 ~ Theo

R14.2
* Many style issue fixes
* Add feature button classes add and remove 'active' class;
* Code cleanup

### 2018-07-25 ~ Theo

* Turn off feature button style changes
	* Wil try to switch to adding and removing .active class
* Fixing minor issues all over regarding themes

### 2018-07-22 ~ Theo

R14.11
* Simplifying left menu action / make work on mobile
* Add 'dark' to style select menu options as appropriate

### 2018-07-19 ~ Theo

R14.10
* Add link to read me after select style
* Fixing style issues with buttons in features menu - WIP


### 2018-07-16 ~ Theo

* Move xml parsing to gbx.js
* Move update css to cor.js
* Add release number


### 2018-07-09 ~ Theo

* First pass at adding bootswatch themes


### 2018-06-19 ~ Theo

* Continue cleanup and moving function to gv-cor.js
* File dialog now also opens files that are *not* gbXML files and displays these in the right menu

### 2018-06-10 ~ Theo

R14.2
* Lots of tweaking and cleanup going on

### 2018-06-03 ~ Theo

R14
* First commit ~ mostly working

***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>



