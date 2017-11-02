

# Build Well SPEED Read Me

<iframe src=http://www.ladybug.tools/spider/sandbox/speed-specification/speedjs/build-well-threejs-speed.html width=100% height=600px ></iframe>
_build well speed_
<span style="display: none" >Iframes are not viewable in GitHub source code view</span>


## [build-well-threejs-speed.html]( http://www.ladybug.tools/spider/sandbox/speed-specification/speedjs/build-well-threejs-speed.html )

* Add API to create a number of openings on each elecation

## [Build Well SPEED 'Plan B' R1.0]( http://www.ladybug.tools/spider/sandbox/speed-specification/speedjs/build-well-speed.html)



## Change Log

### 2017-11-02 ~ Theo


#### 16:15

Just in case other paths have too many issues and with an overabundance of caution: I forked the files from BW R12 and created BW SPEED R1.0
* Confuses me too. ;-)
* Fingers crossed the Build Well SPEED 'Plan A' works OK.


#### 15:27 ~  Fix

    Line 432 should read,
 
                let s = Speed();
 
    without the new keyword.


#### 14:53 PDT ~ Error

If you open the JavaScript developer console you will note this error with either of the above files:

    Uncaught TypeError: Speed is not a constructor

    at createExternalWall (build-well-threejs-speed.html:432)