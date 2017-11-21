

# Footprints ringed with objects

## [footprints ringed with objects]( http://www.ladybug.tools/spider/cookbook/footprints-ringed-with-objects/footprints-ringed-with-objects.html )


<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/cookbook/footprints-ringed-with-objects/footprints-ringed-with-objects.html width=100% height=400px >Iframes are not displayed on github.com</iframe>


## Concept

Using various polygonal footprints, create building envelope schematics that could be used to generate gbXML files

Please note that this is a coding example. It is not a demo for end users.

The example is set up to help you find errors and find things to fix. Various elements are separated and colored so as to be able to be easy to indentify in the code.

Programmers need to know that everything is there always. If you can't see it how do you know it's there? If you have to turn it on to view it - and you are reloading several time a minute then you waste tons of seconds seconds click to make stuff visible. After a while you say to yourself: show me always.

Not everything is drawn. For example, this demo creates a single slab per story and does not really identify if the slab is slabongrade/roof/ceiling whatever. The geometry is there for you to name, color, ID, duplicate, copy, or manipulate any way you wish. Creating the irregular shape is the critical thing. Duplicating the geometry 10 feet up  or down is trivial 

Note that the Width slider mirrors the Length slider actions and it also mirrors the Thickness slider actions. It is useful in debugging - but could be dropped in a production version



### Validation

The code for the parameters that generates the geometry must:

* be based on normal area equations used in plane geometry
* be algorithmically concise and readable
* produce results that have been verified and are auditable 
 


## Links of Interest



## Issues


 

## Change Log


### 2017-11-20 ~ Theo

R1.5

* Derive world azimuth data and add to walls
* Adjust azimuth indicators to suit
	* Ben: orientation worked for 90 and 180. Broke down at 350. It calls everything south



### 2017-11-19 ~ Theo

* 2017-11-18 ~ Changing opacity deletes black edges << now can toggle edges after every update
* rename selShape to seleFootprint because Shape already has meaning in Three.js

19:37
* parameters seem OK


### 2017-11-18 ~ Theo


23:53 ~ R1.2

* started adding parameters

17:27 ~ R1.1

* Fix orientation and azimuth signage issues
* 2017-11-18 ~ Orientation changes not being centered

First commit

***


# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>