

# line with objects between vertices read me


### [line-with-objects-between-vertices-r2.html]( http://www.ladybug.tools/spider/cookbook/04-line-with-objects-between-vertices/line-with-objects-between-vertices-r2.html )


### [line-with-objects-between-vertices-r1.html]( http://www.ladybug.tools/spider/cookbook/04-line-with-objects-between-vertices/line-with-objects-between-vertices-r1.html )

See also notes in script menu.


Creating individual shapes between vertices rather than building a single mesh for the entire wall may make life easier when creating gbXML files

For example:

* Regarding Rectangular Geometry, it might simplify the process of ascertaining the azimuth, tilt, origin, length and height of individual surfaces
* Regarding PolyLoops, the world coordinates ( but not the local coordinates )of the shapes could used as the PolyLoop coordinate points
* It would be possible to gather this data a draw time, add the gbXML style data as userData attached to each shape and thus instantly available without further processing at any time later 


## Change Log

### 2017-11-16 ~ Theo

R2
* Add draw shapes
* Updates menu text
* Update read me

### 2017-11-15 ~ Theo

* First commit
