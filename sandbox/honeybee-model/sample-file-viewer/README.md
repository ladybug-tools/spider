<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://www.ladybug.tools/spider/#sandbox/honeybee-model/sample-file-viewer/README.md "View file as a web page." ) </span>

<div><input type=button class = "btn btn-secondary btn-sm" onclick=window.location.href="https://github.com/ladybug-tools/spider/tree/master/sandbox/honeybee-model/sample-file-viewer"
value="You are now in a GitHub web page view - Click this button to view this read me file as source code" ></div>

<br>

# Honeybee Model Sample File Viewer Read Me


### Preferred or 'canonical' link: https://www.ladybug.tools/spider/sandbox/honeybee-model/sample-file-viewer/

## Concept

View Honeybee Model-Schema sample JSON files using a text-only tree view file browser and viewer

For more details see the [read me]( https://www.ladybug.tools/spider/#sandbox/honeybee-model/README.md ) in the folder above

## Sample File Viewer

* [sample-file-viewer-2020-01-08-00.html]( https://www.ladybug.tools/spider/sandbox/honeybee-model/sample-file-viewer/v-2020-01-08-00/sample-file-viewer.html )
	* R: Uses Theo's JSON tree view
	* C: Many updates to read me and ? help embedded in script
	* F: Canonical link added
* [sample-file-viewer-2020-01-06-00.html]( https://www.ladybug.tools/spider/sandbox/honeybee-model/sample-file-viewer/v-2020-01-06-00/sample-file-viewer.html )
	* Uses jsonview.js
	* F: Add JSON Tree View
	* C: Help text added
* [sample-file-viewer-2020-01-05-00.html]( https://www.ladybug.tools/spider/sandbox/honeybee-model/sample-file-viewer/v-2020-01/sample-file-viewer-2020-01-05-00.html )
* [sample-file-viewer-2020-01-04-01.html]( https://www.ladybug.tools/spider/sandbox/honeybee-model/sample-file-viewer/v-2020-01/sample-file-viewer-2020-01-04-01.html )
* [sample-file-viewer-2020-01-04-00.html]( https://www.ladybug.tools/spider/sandbox/honeybee-model/sample-file-viewer/v-2020-01/sample-file-viewer-2020-01-04-00.html )


## To Do / Wish List

* 2020-01-09 ~ Add display statistics
* 2020-01-09 ~ Add visible error reports
* 2020-01-09 ~ Look into 'orphaned shades'


## Issues



## Change Log

The following are developer notes in addition to the changes listed above

### 2020-01-09 ~ Theo

Over the past few days I have been looking - once again - at a various JSON file parsers that transform the data into clickable HTML tree views. I have been interested in such efforts for a number of years. There are good number of resources available on GitHub as well as numerous answers on Stackoverflow. I have played with a number of these solutions but when I try to customize them for use alongside things such as 3D applications, I give up because the code is so complicated. Often the style sheet and code run into sizes of tens of K's. Learning how to customize such an app might take days

A couple of days ago I thought I might have found an answer: jsonview.js. I was able to build a tree View for the Honeybee data in a few hours. The code and CSS only amounts to about 8K. The code is fairly easy and readable. But then I spent several hours trying to customize the code with hardly any significant progress. Basically what I was trying to do was to strip it down and simplify it. But after several hours the code was still really difficult to read and I hadn't added any features.

The problems are always the same. There has to be recursion involved and there's quite a bit of branching. Dealing with recursion is not one of my strong suits. Keeping track of what's going on becomes a nightmare in my brain. At this point I usually give up and move on to another project.

But I guess working with this piece of code must have given me some insight. The light bulb went on. I accepted the challenge: Time for me to try it once more to build a tree viewer for JSON. And. Bingo! This time it worked.

3K. 100% HTML5. Zero CSS required. Probably more ARIA friendly than most. Feels quite fast. And all in plain-vanilla easy-peasy JavaScript. Yay!

Already there are new features: close all and open all buttons. Automatic indentation with simple CSS margins. My gut feeling is that linking the JSON data to the 3D model is going to be straightforward and open for lots of fun tweaking. Fingers crossed. 

In the meantime, click on the link above to see the text only version.




### 2020-01-06 ~ Theo

* First commit of read me

***
# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > <center title="hello!" ><img src='https://ladybug.tools/artwork/icons_bugs/ico/spider.ico' height=24 > </a></a></center>
