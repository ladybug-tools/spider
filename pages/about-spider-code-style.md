# About Spider Code

### Issue / The problem to be solved

The purpose of the Spider web presence is still a work-in-progress.

The main issue is that much of the currently available software for carrying out building visualization and analysis is expensive, hardwired and not easily accessible.

Solutions to these issues might include:

Provide free, simple, easy-to access tools to enable analysis of building outcomes earlier in the design process - or even as a stimulator of the design process

Offer easy-to-read code written so that designers and engineers may monitor, verify and enhance the efforts - and, yes, full stack developers are welcome too.

Enable just-in-time custom solutions. Every building is both unique and standards-adherent. The visualization and analysis tools should be the same.

<!-- The general idea is to adapt the practices developed in Christopher Alexander's _et al_ [A Pattern Language]( https://books.google.com/books?id=hwAHmktpk5IC&pg=PR10#v=onepage&q&f=false ) - as summarized on page 10.

> Each pattern describes a problem which occurs over and over again in our environment, and then describes the core of the solution to that problem, in such a way that you can use this solution a million times over, without ever doing it the same way twice.

>Patterns are descriptions of common problems and proposal for the solutions that can be used repeatedly every time the problem is encountered and producing an different outcome.

 -->


### Mission
<!--
* Statement of goals, objectives or strategies, applicable now as well as in the future
-->
Things we seem to be doing include:

* Displaying [gbXML]( http://gbxml.org ) files in 3D
	* See [gbXML Viewer]( http://www.ladybug.tools/spider/gbxml-viewer/ )
	* See [gbXML User Guide]( http://www.ladybug.tools/spider/cookbook/gbxml-user-guide/gbxml-user-guide.html )
* Create new [gbXML]( http://gbxml.org ) files and view these in 3D
	* See [Build Well]( https://rawgit.com/ladybug-tools/spider/master/build-well/ )
* Displaying [EPW files]( https://energyplus.net/weather/simulation ) in 3D
* Displaying solar calculations in 3D
	* See [Analemma 3D]( http://www.ladybug.tools/spider/analemma3d/index.html )
	* See [Ladybug Tools/Ladybug Web/]( http://www.ladybug.tools/ladybug-web/ )
* Displaying large complex data sets in 3D
	* See [NURBS Chart]( http://www.ladybug.tools/spider/cookbook/nurbs-chart/r2/nurbs-chart-random-numbers.html)
	* See [Scatter Well]( http://www.ladybug.tools/spider/cookbook/scatter-well/r1/index.html )
* Displaying fun hot stuff in 3D
	* See [Burning mAnalemma 2017]( https://rawgit.com/ladybug-tools/spider/master/burning-manalemma-2017/index.html#r10/burning-manalemma-2017.html#latitude:40.786944,longitude:-119.204444,zoom:11,offsetUTC:-420 )



### Vision
<!--
* Descriptive picture of a desired future state
-->

Life here on Earth is quite amazing and enjoyable. We'd like to help make Earth even cooler.


## Things you can do using Spider scripts

* Use one/two/three fingers to rotate/zoom/pan the display in 3D
	* Or left/scroll/right with your pointing device
* Click the three bars( 'hamburger menu icon' ) to slide the menu in and out
* Click the [Stats]( https://github.com/mrdoob/stats.js/ ) box in the footer to toggle FPS / MS / MB views
* Press Control-U/Command-Option-U to view the source code
* Press Control-Shift-J/Command-Option-J to see if the JavaScript console reports any errors


## Coding Style Generally


* All plain vanilla client-side JavaScript
* Built over the Three.js WebGL JavaScript library
	* 90% easy-peasy JavaScript and 10% gnarly, linear algebra JavaScript
* Uses Showdown to turn Markdown into HTML
* Runs in your browser on computer, tablet and phone
* Highly adjustable workspace
* Movable, sliding resizable menus
* Many scripts accept URLs of files to view via [location.hash]( https://www.w3schools.com/jsref/prop_loc_hash.asp ) - useful in creating [permalinks]( https://en.wikipedia.org/wiki/Permalink )


### Code Style References

* https://github.com/mrdoob/three.js/wiki/Mr.doob%27s-Code-Style%E2%84%A2
* https://validator.w3.org/#validate_by_input
* http://jshint.com/
* https://zz85.github.io/mrdoobapproves/
