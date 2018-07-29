<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page](https://www.ladybug.tools/spider/index.html#cookbook/templates/design-explorer-very-lite/README.md "View file as a web page." ) </span>
<div><input type=button onclick="window.location.href='https://github.com/ladybug-tools/spider/blob/master/cookbook/templates/design-explorer-very-lite/README.md'";
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>

<br>

# [Design Explorer Very Lite Read Me]( #/cookbook/design-explorer-very-lite/README.md )




## Concept

Given these two links
* https://tt-acm.github.io/DesignExplorer/
* https://github.com/ladybug-tools/design_explorer_lite

Is it possible to replicate much of the functionality of these two sets of scripts in a way that
* Is built on easy-peasy code with few dependencies?
* Does 80% or so of what these apps do>
* Exposes interesting new ways of visualizing the data?


The following sections - newest on top - are a show and tell of the adventure in responding to the above challenge.


## Script 5: design-explorer-very-lite-r1

<iframe src=https://www.ladybug.tools/spider/cookbook/design-explorer-very-lite/r1/design-explorer-very-lite-r1.html width=100% height=400px >Iframes are not viewable in GitHub source code view<</iframe>


### Full Screen: [design-explorer-very-lite-r1]( https://www.ladybug.tools/spider/#cookbook/design-explorer-very-lite/r1/design-explorer-very-lite-r1.html )

First pass at gathering all the data and providing a display of the data
* Loads a CSV file which then loads all the JSON files and displays these in 3D
* RedBox is the default. All three data sets available with th click of a button
* Spacing and position is roughly calibrated on-the-fly for each data set

Comment 2018-07-28 21:44
* Well, it too a few hours more than I wanted, but at least there's something fun to look at
* There's nothing serious here yet, but at the least a proof of concept is in operation: we can loadd all th JSON files in a single visualization and manipulate the scene at a reasonable pace


## Script 5: View Design Explorer Data Three.js files R2

<iframe src=https://www.ladybug.tools/spider/cookbook/design-explorer-very-lite/r1/view-design-explorer-data-threejs2.html width=100% height=400px >Iframes are not viewable in GitHub source code view<</iframe>


### Full Screen: [View Design Explorer Data Three.js files R2]( https://www.ladybug.tools/spider/#cookbook/design-explorer-very-lite/r1/view-design-explorer-data-threejs2.html )

A second pass at loading the JSON files into Three.js
* Some of the aspect of loading the Three.js JSON have been cleared up


## Script 4: View Design Explorer Data Three.js files

<iframe src=https://www.ladybug.tools/spider/cookbook/design-explorer-very-lite/r1/view-design-explorer-data-threejs.html width=100% height=400px >Iframes are not viewable in GitHub source code view<</iframe>


### Full Screen: [View Design Explorer Data Three.js files]( https://www.ladybug.tools/spider/#cookbook/design-explorer-very-lite/r1/view-design-explorer-data-three.js.html )

A first pass at loading the JSON files into Three.js
* Loads RedBox by default
* Buttons enable loading sample files from each of the three folders

Comments 2018-07-28 17:33

* Files load just fine using Three,js ObjectLoader
* Oh wow!. These files include scene data. It's like we are back at the AEC Hackathon in 2014. It was a mistake then (__mea culpa__). It's like a joke now.
* My bad. The files are OK. Scene data is not in the files. It's Object Loader or something creating the scene data.
* looks like I have some learning to do.
* 17:52 ~  Lesson learned. things seem to be working OK kind of




## Script 3: View Design Explorer Data CSV files

<iframe src=https://www.ladybug.tools/spider/cookbook/design-explorer-very-lite/r1/view-design-explorer-data-csv-files.html width=100% height=400px >Iframes are not viewable in GitHub source code view<</iframe>


### Full Screen: [View Design Explorer Data CSV files]( https://www.ladybug.tools/spider/#cookbook/design-explorer-very-lite/r1/view-design-explorer-data-csv-files.html )


A first pass at reading the CSV files
* Buttons allow you to load the data from each of the three files. RedBox is loaded as the default
* Uses a JavaScript fetch to obtain the file as text
* Parse the text data into an array of lines, each of which is an array of data points
* Use the data to fetch and display all the PNG files
* Click the PNG to enlarge and get an alert of the parameters for that file

Comments 2018-07-28 16:21
* Well, that was easy
* Issue needs two clicks to shrink the PNG file



## Script 2: View Design Explorer Data JSON files

<iframe src=https://www.ladybug.tools/spider/cookbook/design-explorer-very-lite/r1/view-design-explorer-data-json-files.html width=100% height=400px >Iframes are not viewable in GitHub source code view<</iframe>


### Full Screen: [View Design Explorer Data JSON files]( https://www.ladybug.tools/spider/#cookbook/design-explorer-very-lite/r1/view-design-explorer-data-json-files.html )

A first pass at reading the JSON files
* Uses the GitHub API to ob2ain a list of file names
* Using that list downloads and creates buttons with links to the files
* Buttons allow you to select the file and view its contents as stringified JSON

Comments 2018-07-28 14:37
* Of Wow! They are storing 3D data using Three.js JSON. Interesting choice. I wonder why they picked this file format instead of a more lightweight format such as OBJ or STL or an industry standard such as DXF, RAD or gbXML
* Hm. I thought there would ve various data parameters contained in each JSON file. but no, the data is quite minimal just geometry, material and a bit of layer data to indicate construction material.
* Ah! the 'parameter' data ~~are~~ is in individual CSV files in the parent file. And it includes the file names of both the PNG and JSON files. So now lets hit on that file. ;-)


## Script 1: View Design Explorer Data PNG files

<iframe src=https://www.ladybug.tools/spider/cookbook/design-explorer-very-lite/r1/view-design-explorer-data-png-files.html width=100% height=400px >Iframes are not viewable in GitHub source code view<</iframe>


### Full Screen: [View Design Explorer Data PNG files]( https://www.ladybug.tools/spider/#cookbook/design-explorer-very-lite/r1/view-design-explorer-data-png-files.html )

A first pass at reading the PNG files.
* Uses the GitHub API to obtain a list of file names
* Using that list downloads and displays the files
* Buttons allow you to select the folder
* Click images repeatedly to enlarge and shrink
* Tooltips display file name

Comments 2018-07-28 13:07
* I though the file names might contain useful data, but each folder uses a different naming convention so no significant data can be extracted or inferred from the names without prior knowledge of its schema
* So let's look at the JSON files

## To do / wish list


## Links of interest


### Design Explorer

* https://tt-acm.github.io/DesignExplorer/
* https://tt-acm.github.io/DesignExplorer/
* https://github.com/tt-acm/DesignExplorer/wiki
* https://github.com/tt-acm/DesignExplorer

## Change log


### 2018-07-28 ~ Theo

R1
* First commit
* Add template files
* Add 'View Design Explorer Data PNG files'

***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>

