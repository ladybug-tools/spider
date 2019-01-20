
<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://pushme-pullyou.github.io/tootoo13/#pages/about-tootoo.md "View file as a web page." ) </span>

<div><input type=button class = 'btn btn-secondary btn-sm' onclick=window.location.href='https://github.com/pushme-pullyou/tootoo13/pages/about-tootoo.md';
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>

<br>


# [About TooToo]( #pages/about-tootoo.md )

**TL;DR**

_TooToo is a collection of very simple, plain-vanilla JavaScript scripts and test files to help you manage content on both GitHub branches and GitHub pages._

Scripts that list, open and display files in a menu are known as a [Content Management System (CMS)]( https://en.wikipedia.org/wiki/Content_management_system ).

The objectives of a CMS include:

* Browse and view repositories, folders and files on GitHub with remarkable ease
* Traverse, select and display as many folders and files as possible in the shortest amount of time
* Single click or single action to get to the next item you want to see
* Know where you are
	* Menus with current selection highlighted

One day in the distant future, TooToo may become a real CMS.



<details>

<summary class=readMe >Concept Attempts</summary>

# Concept Attempt #1

_The issues and problems we are trying to solve_

GitHub has [millions of projects]( https://github.com/about ).

With so many projects, finding GitHub projects that are of interest to you may not be easy.

Finding projects with code you might actually want to fork use can be even less easy.

And then, when you identify a GitHub user of interest, it's not that easy to explore the user's work.

When you find somebody you like, it's not easy to:

* Monitor what they have done recently
* Search their many repositories
* Discard material that looks interesting - but has not been updated in years

Then there's the other side of the coin:

* How can you make your own work more visible to the world?
* How can visitors to your GitHub projects become informed in a speedy, fun manner about all the things you are doing.

Certainly the [Explore GitHub]( https://github.com/explore ) page is a good place to start.

And there are a number of really interesting curation efforts. See 'Links of Interest' below.

And none of that stops you or us from investigating even more ways of exploring GitHub.

And, guess what, GitHub supplies a quite amazing tool for finding stuff on GitHub.

The [GitHub Developer API]( https://developer.github.com/ ) provides fast, free and easy access to millions of GitHub projects.

So, if you are looking to build tools to:

* help you snoop around GitHub
* find the things that are of particular interest to you
* and monitor their progress

then you have come to a good place...

## Concept Attempt #2

* We live in a world where the [full-stack developer]( https://www.sitepoint.com/full-stack-developer/ ) reigns supreme
* We champion [DevOps]( https://en.wikipedia.org/wiki/DevOps ) as if good DevOps is the primary goal

But:

* What if you are an entry-level coder?
* What if you are more interested in STEM topics more than [DevO.ps]( http://devo.ps ) and programming?

Then you have come to the right place.

</details>


<details>

<summary class=readMe >Mission and Vision</summary>

### Mission

2017-08-21
* Access locally/remotely, online/offline
* Solve problems faster by melding coding and using input/processing/output tools into unified flow of efforts
* Help you develop skills you can use over and over again most everywhere
* Built to fork, edit and share - all FOSS in GitHub
* Build using fastest, shortest and easiest code possible
* Ready to use, cut and paste vary short cookbook-style scripts
* Code that's easy to read - so you concentrate on solving the problem more than guessing the intent of the programmer

Older
* Explore GitHub using the GitHub API
* Explore the GitHub API using entry-level, plain-vanilla JavaScript
* Help you build tools that make the GitHub web pages and the data come to you
	* Reduce that endless click to go there and click to come back, click go there and click come back - repeated endlessly
	* 'You don't have to go there. It comes to you.' - Henrik Bennetsen
* Provide you with as many ways as possible for viewing content and statistics - really quickly and easily readable
* Display ways of getting to content such as the README files and gists wherever possible
	* Show what is being created in a timely fashion
* Create a variety of versions - from very simple to totally custom-tailored for a particular user
* Replicate the above in various languages and dialects
* Build code so simple to read that you can easily translate/fix/alter it to make it work the way you want it to work

### Vision

To help you
* Concentrate on your project at hand - but its substance no its code
* Discover new algorithms and new concepts
* Link associated projects that you had no idea they were associated
* Transfer all of these abilities into your own set of tools


</details>

<details>

<summary class=readMe >Coding Style Generally</summary>


### Entry Level Code / Cookbook Style

* Code is almost all entry level JavaScript
* Download and run
* JavaScript is used for everything including
	* Adding HTML
	* Applying CSS
* The dependencies are:
	* ShowDown Markdown interpreter
	* GitHub API

### Compatibility

* Anticipated user: somebody who writes code
	* Sitting in front of a modern computer with recent multi-core CPU and Intel HD4000 GPU or better
	* Display 1600 x 900 pixels or better
* Every effort made to use latest most simple methods
* Tested on latest Chrome, FireFox, Edge and Safari << Not yet
* Tested on Windows and MacOS << Not yet
* Operation on Android and iOS is a bonus not a requirement
* Backwards compatibility eschewed
	* Adds complexities to scripts
	* Strikes fear in the hearts of new users
	* Looks to the future not the past
	* Simple features in the pipeline are built on the lessons learned from the complexities of the past


### No Server Needed

* 100% client side
* Loads scripts from GitHub pages or localhost
* Uses Rawgit or equivalent as a content delivery network (CDN)
* Accesses GitHub Developer API via [RESTful]( https://en.wikipedia.org/wiki/Representational_state_transfer ) URL calls
	* No terminal window/ [curl]( https://curl.haxx.se/ ) needed here

### Namespace, Variable Names and File Namespace

	* Menu and column headers have tooltips that indicate namespace and script name.
	* Example: the Select menu has `SEL` as a namespace and `sel-select-r1.js` as a file
	* Every script is in its own folder with its own HTML testing file


### Written for GitHub Users and Coders

You are here to explore code, therefore:

* Font is default monotype font - fixed character spacing
* UI is minimal
	* Offers many - too many? - options
* Uses most up-to-date JavaScript features
* Displays the identical data using varying methods

But some idiosyncrasies:

* Follows [Mr.doob coding style]( https://github.com/mrdoob/three.js/wiki/Mr.doob's-Code-Style%E2%84%A2 )
	* Open airy, almost a poetic style of displaying code
* Does not follow normal split up of HTML, CSS and JavaScript
	* Content, appearance and behavior
* Does follow the idea that its all mutable stuff in the DOM
	* Even content
	* It all starts as alphanumeric characters and ends up as pixels
	* Remix, re-appropriate, re-hash as needed
	* Uses JavaScript to do this mash-up
	* It's <s>[turtles](https://en.wikipedia.org/wiki/Turtles_all_the_way_down )</s> JavaScript all the way down

There are hundreds of computer programming languages.
And so, there can be many styles of coding in each language. And each can have its own beauty.



# Script Naming Conventions

The names of the scripts here are derived the the names of characters in Hugh Lofting's [Dr Dolittle]( https://en.wikipedia.org/wiki/Doctor_Dolittle ) series of children's books.

See: [List of Doctor Dolittle characters]( https://en.wikipedia.org/wiki/List_of_Doctor_Dolittle_characters )


</details>


<details>

<summary class=readMe >Coding Style Cookbooks</summary>


## Mission

<!-- * Fabricate free, fast, fun fantasies -->
* Write cookbook scripts that are ready to use, cut and paste
* Build engineering tools built to solve specific problems
* Develop skills you can use everywhere
* You can download a script easily and when you click it, it should just work.
	* Everything you need to know about a script is in one place and written in the same way.
* Ready to use, cut and paste scripts
* Built to solve specific problems in a single programming language - JavaScript
* Small easy-to-understand scripts that you can use to hack your own apps
* All written in JavaScript
	* Even the HTML and CSS is created and edited using JavaScript.
	* Experimental techniques designed to get you coding faster but documented
* Built to fork edit and share - all FOSS in GitHub
* For STEM peeps - not 'full-stack programmers'
* Explore new ways of visualizing in 3D - use the graphics processing units (GPUs ) to their maximum


For much more detail about the coding style you can have a look at the [Jaanga Practice Notes]( http://jaanga.github.io/documents/jaanga-practice-notes/#code-mission-vision-r1.md )
Some of the notes there could come here as and when there is agreement on the good styles for this effort.

<!--
### Vision

* If the mundane engineering tasks become easy, inexpensive and swift to carry out,
then possibilities arise for the more complex, sophisticated and even extravagant ideas to turn into realities
* RIP Zaha Hadid. Let us continue to design with your disruptive yet always elegant spirit
-->

<!--
Everything is in between two `<script>` tags and written JavaScript

What does mean?

There are no black boxes - with things in other places - that you never look at.

Instead of a huge file of opaque CSS rules that are mostly never invoked, there's half a dozen rules just for the script in play

-->


### Cookbook Format

Otherwise known as 'Cut and Paste' coding

The code herein is:

* Made up of individual HTML files
	* Each file contains all the styling and JavaScript it requires
* Minimal external dependencies
	* Only Three.js and ShowDown
	* Can copy and paste code into a file on your computer, hit `enter` and it runs
* Designed for students and non-programmers
	* Any script can be 'digested' in less than an hour


##@ Client-side not Server-side

* Scripts must access a GPU
	* 'Cause no GPU then no 3D'
	* Can be edited and run on any device
* Means can be hosted on static servers
	* Such as GitHub, DropBox or GDrive
	* So penniless kids around the world can play and experiment


## Everything in Git plus more

* Everything gitted in GitHub
* But code in older releases is not just viewable BUT also runnable
	* You can see the evolution of the design process
	* Think of an artist and a sketchbook

## 3D is not 2D

* 3D is its own special world
	* You get, say, 18 milliseconds about 60 times a second
	* You need to multiply, say, a 1000x1000 matrix by 0x456789
	* jQuery, React, Go whatever are of no use at all here - and mostly just get in the way
* Communicate to the 2D world using iframes
	* Just aboutt every script here has been tested in an iframe
	* 3D Scripts in iframes are happy having ongoing dialogs with their 2D parents


## Links of interest

### Cookbook Meaning

* http://english.stackexchange.com/questions/70799/meaning-of-cookbook-in-title-of-instructional-book
* https://en.wikipedia.org/wiki/Cookbook#Usage_outside_the_world_of_food
* https://en.wikibooks.org/wiki/Coding_Cookbook
* https://www.quora.com/Computer-Programming-How-should-I-study-the-OReilly-cookbook-books-I-dont-feel-I-internalize-much-just-by-reading-them-as-Im-a-very-hands-on-learner

Examples of coding styles similar to the one use here:

* [Three.js Examples]( http://threejs.org/examples/ )
* [Stemkoski]( http://stemkoski.github.io/Three.js/ )
* [Dirksen ]( http://www.smartjava.org/content/all-109-examples-my-book-threejs-threejs-version-r63 )
* [Parisi]( https://github.com/tparisi/WebGLBook )

See also

* [Mr.doob's Code Style™]( https://github.com/mrdoob/three.js/wiki/Mr.doob's-Code-Style%E2%84%A2 )


## To Do

* 2018-07-19 ~ Theo ~ Decide which repo has canonical version
* 2018-07-19 ~ Build bookmark folder with links to how to summarize technology efforts
	* links from 'my column C'
* 2018-07-19 ~ Theo ~ Create/Fork our owm summary checklist
* 2018-07-19 ~ Theo create cms based on checklist
* 2018-07-19 ~ Theo ~ fill in the lines

</details>


<details>

<summary class=readMe >Links of Interest / Background Context</summary>


### Posts

* https://github.com/jaanga/gubgub/issues/2
* https://www.reddit.com/r/github/comments/5a8vzt/jaanga_gubgub_r1_explore_and_monitor_many_github/?ref=share&ref_source=link
* https://twitter.com/ta/status/792871595001847808


### Web sites that help you explore GitHub

* https://resume.github.io/ ~ added 2016-10-19
* https://github.com/trending
* https://github.com/trending/javascript
* https://www.reddit.com/r/github/
* https://www.reddit.com/r/coolgithubprojects
* https://github.com/leereilly/games
* http://www.gitlogs.com/
* http://ghv.artzub.com/
* http://github-awards.com/
* https://github-ranking.com/
* https://gist.github.com/paulmillr/2657075/
* http://githut.info/

### Things You Can Do with the [GitHub Search API]( https://developer.github.com/v3/search/ )

* https://gist.github.com/jasonrudolph/6065289
* Please add more!

### Credits

* [GitHub Developer API]( https://developer.github.com/v3/ )
* [Showdown]( https://github.com/showdownjs/showdown )
    * Showdown is a JavaScript Markdown to HTML converter, based on the original works by John Gruber.
    * Showdown can be used client side (in the browser) or server side (with NodeJs).


### README Considerations

* http://tom.preston-werner.com/2010/08/23/readme-driven-development.html
* https://github.com/noffle/art-of-readme
    * This README is much influenced by noffle's README


### Coding

* [Mozilla Developer Network (MDN) JavaScript]( https://developer.mozilla.org/en-US/docs/Web/JavaScript )
* [W3schools.com]( http://www.w3schools.com/js/ )
	* Much maligned by full-stack developers,
	* but it the first thing that show up on Google


### Coding Style

* [Mr.doob coding style]( https://github.com/mrdoob/three.js/wiki/Mr.doob's-Code-Style%E2%84%A2 )
* [Does Mr.doob approve your code style? ]( http://zz85.github.io/mrdoobapproves/ )
    * [MrDoob Approves – A Javascript CodeStyle Editor+Validator+Formatter Project]( http://www.lab4games.net/zz85/blog/2015/01/25/mrdoob-approves-a-javascript-codestyle-editor-validator-formatter-project/ )


</details>

_BTW, the use of the [ HTML Details Element (```<details>```)]( https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details ) in this document is experimenal. Comments on its usage will be appreciated._


***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > ❦ </a></center>


<style>

/* yup, this works! */

summary.readMe { font-size: 1.5rem; }

</style>