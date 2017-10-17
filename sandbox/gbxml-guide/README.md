<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://github.com/ladybug-tools/spider/#single-model-multiple-menu/README.md "View file as a web page." ) </span>


# [Single Model Multiple Menus Read Me]( #README.md )


<iframe src=https://ladybug-tools.github.io/spider/sandbox/single-model-multiple-menu/index.html width=100% height=600px ></iframe>
_txt_
<span style="display: none" >Iframes are not viewable in GitHub source code view</span>

## Full Screen: [Single Model Multiple Menus]( https://ladybug-tools.github.io/spider/sandbox/single-model-multiple-menu/index.html )


## Concept

### Needs

* Switch between _[Flatland]( https://en.wikipedia.org/wiki/Flatland )_ stuff and 3D models seamlessly
* Maintain 3D context/scope while switching menus
* Enable multiple menus to interactively enable adding, editing and deleting data in the 3D model
* Everything entry-level JavaScript
	* lots of small files / nothing big to slog through
* Apart from primary libraries - Three.js for 3D and Showdown for Markdown - no external dependencies
* All menus also available as standalone, testable HTML files
* Feel assured that no data is lost when looking at text content web pages


### Code

This demo makes extensive use of the [HTML ```<iframe>``` element]( https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe )

> The HTML ```<iframe>``` element represents a nested browsing context, effectively embedding another HTML page into the current page. In HTML 4.01, a document may contain a head and a body or a head and a frameset, but not both a body and a frameset. However, an ```<iframe>``` can be used within a normal document body. Each browsing context has its own session history and active document. The browsing context that contains the embedded content is called the parent browsing context.

At the highest level there may be a parent document that contains at least two iframes. One iframe us used to create a 3D model. The second iframe is used to display a variety of menus. Each menu is a HTML file that may contain content, style information and JavaScript.

The objective is to make the code as easy to read as possible. The strategy is to enable many small menus to interact with a single 3D object container.


### Iframe with 3D model: Three.js file

This is a small HTML file that uses the Three.js library to create a basic 3D context with renderer, scene, camera, camera controller, lights and some very basic assets such as grids and axes. We will call this the Three.js file or context.

The parent listens to the various menus and transmits menu requests and instructions to the Three.js context. Everything in Three.js is available to the parnt via the iframe.contentWindow or iframe.contentDocument methods. Thus when the parent calls iframe.contentWwindow.THREE the functionality available is fairly much what would happen if the parent loaded THREE itself.

Currently the Three.js file is about 250 lines and 7KB in size.

### Parent: Handles the 3D/2D switching

Much as we love 3D, reading text is faster and easier in 2D. So it makes sense to be able to display both in the same tab = but not at the same time. In other words some time you want to see 3D and sometimes you want to see 2D - and you don't to lose your place.

The parent can display the Three.js file and it can display HTML or Markdown files. Switching is handled in real time and the 3D context or scope is maintained throughout the session.

In many ways the parent could also itself create the Three.js context. The necessitates the coexistence of code designed for a 2D user experience and  code for 3D linear algebra/in-world manipulation. This inevitably becomes messy and liable to have conflicts.

Currently the parent is about 300 lines and about 11KB in size

### Iframe with menus

These little files do all the heavy lifting - but not by deep coding but by strength in numbers. The special thing about these files is that they may also open an iframe with Three.js. Each menu is a standalone HTML file with its own content, style and JavaScript. So it can be run and tested in isolation. When running by itself, a menu files acts as a parent and creates an iframe with the same Three.js file used by the parent file handler. When the menu is a child of the parent file handler the menu talks to the parent's iframe.


The Three.js iframe holds of the data accumulated during a session. There you can navigates around the menus as you please.


## Links of Interest


## Notes

* Is it a nice thing if styles and behaviors that control content are really close to the content they affect?
* If a style element is used just once, why not keep it with the element it is styling?


## Change Log

### 2017-10-12 ~ Theo

* First commit