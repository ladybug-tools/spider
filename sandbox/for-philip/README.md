<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page](http://www.ladybug.tools/spider/index.html#sandbox/for-philip/README.md "View file as a web page." ) </span>

# For Philip Read Me


Ray casting files superceded: Go to: <https://github.com/ladybug-tools/spider/tree/master/solar-well>


## Files

### Google Maps

Note: The Maps Static API Usage Limits have changed.
* Update 2018-06-24: enforcement of the new terms currently appears quite variable. Sometimes you can get in without an API key and sometimes you cannot.

## [fetch-google-maps-tiles]( https://www.ladybug.tools/spider/sandbox/for-philip/fetch-google-maps-tiles.html )

* Fetches Google Map tiles using HTML 5 Fetch instead of xmlhttprequest
* Uses promises. Feels faster and more light weight
* Code could be further simplified but that increases the caching issues
* Still has issues with canvas element being drawn prior to all image tiles being loaded
* Maybe should add a settimeout or a loop until image.complete === true for all images
* Anyway: any help or thoughts appreciated
* Update: just added pushing img.src to an array to track count. This may be helping
* Try the promise described here:
	* https://medium.com/dailyjs/image-loading-with-image-decode-b03652e7d2d2


## [google maps api image](https://www.ladybug.tools/spider/sandbox/for-philip/google-maps-image.html )
* Get a single simple static image
* Still seems to be working without an API key
* update 2018-06-23L appears broken- unless image was already in cache

## [google maps api fetch static]( https://www.ladybug.tools/spider/sandbox/for-philip/google-maps-api-fetch-static.html )

* Fetch a static Google map via Google APIs
* May have fewer caching issues for you
* Load images  up to 640x640. 2048x208 if you pay
* See <https://developers.google.com/maps/documentation/maps-static/intro>
* Extra benefits:
	* Using lat/lon as center you can position map exactly where needed
	* You can draw on map
* The only reason we do not use this service more often is that we want > 640x640 at no cost
* Update 2018-06-22 ~ Dang! Google Maps API now requires an access key
	* Latest version allows for input of Maps API  key
	* Key is remembered between sessions using local storage



### Entry level ray-casting with Three.js

## [ground and boxes 1]( https://www.ladybug.tools/spider/sandbox/for-philip/ground-and-boxes-1.html )

<iframe class=iframeReadMe src=https://www.ladybug.tools/spider/sandbox/for-philip/ground-and-boxes-1.html width=100% height=400px >Iframes are not displayed on github.com</iframe>

* Ground plane with two boxes using the Three.js JavaScript library
* 'toggle rotation' button


## [ground and boxes 2]( https://www.ladybug.tools/spider/sandbox/for-philip/ground-and-boxes-2.html )

<iframe class=iframeReadMe src=https://www.ladybug.tools/spider/sandbox/for-philip/ground-and-boxes-2.html width=100% height=400px >Iframes are not displayed on github.com</iframe>

* Add 'toggle wireframe' button
* Adds 'update vertex colors and opacity' button


## [ground and boxes 3]( https://www.ladybug.tools/spider/sandbox/for-philip/ground-and-boxes-3.html )

<iframe class=iframeReadMe src=https://www.ladybug.tools/spider/sandbox/for-philip/ground-and-boxes-3.html width=100% height=400px >Iframes are not displayed on github.com</iframe>

* Adds basic ray casting to determine whether a vertex in the ground plane is in shadow or not


## [ground and boxes 4]( https://www.ladybug.tools/spider/sandbox/for-philip/ground-and-boxes-4.html )

<iframe class=iframeReadMe src=https://www.ladybug.tools/spider/sandbox/for-philip/ground-and-boxes-4.html width=100% height=400px >Iframes are not displayed on github.com</iframe>

* Adds draw 14 Suns - each with a different color


## [ground and boxes 5]( https://www.ladybug.tools/spider/sandbox/for-philip/ground-and-boxes-5.html )

<iframe class=iframeReadMe src=https://www.ladybug.tools/spider/sandbox/for-philip/ground-and-boxes-5.html width=100% height=400px >Iframes are not displayed on github.com</iframe>

* Adds draw 14 sets of area in shadow for each Sun.

## [ground and boxes 6]( https://www.ladybug.tools/spider/sandbox/for-philip/ground-and-boxes-6.html )

<iframe class=iframeReadMe src=https://www.ladybug.tools/spider/sandbox/for-philip/ground-and-boxes-6.html width=100% height=400px >Iframes are not displayed on github.com</iframe>

* Adds increments vertex Z-axis when the vertex is in shadow for every Sun



## Wish list

* 12 * 14 Suns
* Add gbXML file
* Export to file ??

## Issues



## Links of Interest



## Change Log

### 2018-04-18 ~ Theo

* ground and boxes 4/5

### 2018-04-17 ~ Theo

* First commit
* ground and boxes 1/2/3

***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>



