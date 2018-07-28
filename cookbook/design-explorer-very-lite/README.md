<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page](http://www.ladybug.tools/spider/index.html#cookbook/templates/design-explorer-very-lite/README.md "View file as a web page." ) </span>
<div><input type=button onclick="window.location.href='https://github.com/ladybug-tools/spider/blob/master/cookbook/templates/design-explorer-very-lite/README.md'";
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>

<br>

# [Design Explorer Very Lite Read Me]( #/cookbook/design-explorer-very-lite/README.md )




## Concept

Given these two links
* http://tt-acm.github.io/DesignExplorer/
* https://github.com/ladybug-tools/design_explorer_lite

Is it possible to replicate much of the functionality of these two sets of scripts in a way that
* Is built on easy-peasy code with few dependencies?
* Does 80% or so of what these apps do>
* Exposes interesting new ways of visualizing the data?


The following sections - newest on top - are a show and tell of the adventure in responding to the above challenge.



## Script 2: View Design Explorer Data JSON files

<iframe src=http://www.ladybug.tools/spider/cookbook/design-explorer-very-lite/r1/view-design-explorer-data-json-files.html width=100% height=400px >Iframes are not viewable in GitHub source code view<</iframe>


### Full Screen: [View Design Explorer Data PNG files]( http://www.ladybug.tools/spider/#cookbook/design-explorer-very-lite/r1/view-design-explorer-data-json-files.html )

A first pass at reading the JSON files
* Uses the GitHub API to ob2ain a list of file names
* Using that list downloads and creates buttons with links to the files
* Buttons allow you to select the file and view its contents as stingigfied JSON

Comments
* Of Wow! They are storing 3D data using Three.js JSON. Interesting choice. I wonder why they picked this file format instead of a more lightweight format such as OBJ or STL or an industry standard such as DXF, RAD or gbXML
* Hm. I thought there would ve various data parameters contained in each JSON file. but no, the data is quite minimal just geometry, material and a bit of layer data


## Script 1: View Design Explorer Data PNG files

<iframe src=http://www.ladybug.tools/spider/cookbook/design-explorer-very-lite/r1/view-design-explorer-data-png-files.html width=100% height=400px >Iframes are not viewable in GitHub source code view<</iframe>


### Full Screen: [View Design Explorer Data PNG files]( http://www.ladybug.tools/spider/#cookbook/design-explorer-very-lite/r1/view-design-explorer-data-png-files.html )

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

* http://tt-acm.github.io/DesignExplorer/
* http://tt-acm.github.io/DesignExplorer/
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

