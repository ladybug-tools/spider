<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://www.ladybug.tools/spider/index.html#cookbook/rad-to-threejs/README.md "View file as a web page." ) </span>
<div><input type=button class="btn btn-secondary btn-sm" onclick="window.location.href='https://github.com/ladybug-tools/spider/blob/master/cookbook/rad-to-threejs/README.md'";
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>

<br>

# [Radiance RAD to Three.js Read Me]( #cookbook/rad-to-json/README.md )

## Concept

Translate Radiance RAD file types into Three.js views - all building on [Mostapha's efforts]( https://github.com/mostaphaRoudsari/rad-to-threejs )

See also: Radiance [RAD to JSON Read Me]( #cookbook/rad-to-json/README.md )


***

<iframe src=https://www.ladybug.tools/spider/cookbook/rad-to-threejs/r1/rad-to-threejs.html width=100% height=500px >Iframes are not viewable in GitHub source code view<</iframe>

## Full Screen: [RAD to Three.js R1]( https://www.ladybug.tools/spider/cookbook/rad-to-threejs/r1/rad-to-three.html )

* A first pass at playing with Mostapha's code wiyh Three.js
* Mostly working with the sample Radiance files
	* Not yet set up for files, say, over a megabyte is size
* No materials or colors yet / Uses Three,js 'Normal' material

### Note

Needed to add an extra replace CRLF with " " on line 100 of rad-to-three.js so as to work with all files.

```const rawObjects2 = rawObjects.map( item => item.replace(/\r\n|\n/g, " " ) );```


## To do / wish list


## Links of interest

* https://github.com/mostaphaRoudsari/rad-to-json

This repo contains the source code Mostapha wrote to translate Radiance RAD file types into JSON

Working link:
* https://rawgit.com/mostaphaRoudsari/rad-to-json/master/index.html

Working link:
* https://mostapha.io/rad-to-json/index.html



## Change log


### 2018-08-11 ~ Theo

R1
* First commit

***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>

