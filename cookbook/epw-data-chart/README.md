<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://www.ladybug.tools/spider//#cookbook/chart-epw-data/README.md "View file as a web page." ) </span>


[Chart EPW Data Read Me]( #README.md )
====

<iframe class=iframeReadMe src=http://www.ladybug.tools/spider/cookbook/chart-epw-data/index.html width=100% height=600px onload=this.contentWindow.controls.enableZoom=false; ></iframe>

## Full Screen: [Chart EPW Data ]( http://www.ladybug.tools/spider/cookbook/chart-epw-data/index.html )



## Concept

### Issue / The problem to be solved

See the EPW Overview Read me for details regarding EPW data

The current exercise is about scatter plots. The EPW data is just a handy source of data points


About the data

* Hourly weather data for several thousand cities around the wold
* 365 x 24 = 8,760 hourly data tables per city
* The number of variables for each city varies from about half a dozen to 26

There are many existing ways of viewing that data on paper and as 2D on-screen graphics.
The challenge is to explore and discover innovative and engaging methods for viewing that data in interactive 3D.

Note: atmospheric pressure is broken. Other variables may also cause issues. Click the title to reload the script.


### Mission

* Select country, city within a few clicks
* Data from all 8K hours always visible
* As many variables as possible simultaneously visible and discernible
* Updates occur in near-time

### Vision



## Features

Intentions

You can select how each variable is to be represented by choosing any of the following as the visible attribute of that variable
* XYZ axis
* Color
* Shape
* Direction

As you move your cursor over any symbol its full details appear in the pop-up display


## Links of Interest


* https://energyplus.net/weather
* http://climate.onebuilding.org/
* https://github.com/chiensiTB/EPWRawWeather

## To Dp

* Improve the automatic scaling for each variable - particularly atmosphere pressure


## Change Log

### 2018-01-04 ~ Theo

* moved to cookbook

### 2017-09-16 ~ Theo

* Enhance menu
* Add read me
* Add select variable for XYZ axis


### 2017-09-15 ~ Theo

* First commit


