<style>
summary { font-weight: bold; }
</style>

# Sunshine: an annotated bibliography

<details open >
<summary style=font-size:1.5em; >Preface</summary>

I would like to learn more about how the Sun and climate affect the built environment. Given that I know so little, I am trying to start at the beginning. I am finding that finding where it all begins is not any easy place to find.

This annotated bibliography is my way of - fingers crossed - helping me let some sunlight into the process.

Theo Armour ~ 2018-06-21

</details>


<details open >

<summary style=font-size:1.5em; >Wikipedia References</summary>


### Solar Calculation Details

* https://en.wikipedia.org/wiki/Position_of_the_Sun
* https://en.wikipedia.org/wiki/Astronomical_Almanac
* http://www.esrl.noaa.gov/gmd/grad/solcalc/calcdetails.html

### Standard Day

* [Standard Day]( https://en.wikipedia.org/wiki/Standard_day )
	* The term standard day is used throughout meteorology, aviation, and other sciences and disciplines as a way of defining certain properties of the atmosphere in a manner which allows those who use our atmosphere to effectively calculate and communicate its properties at any given time.

### Julian Day

* https://en.wikipedia.org/wiki/Julian_day
* http://aa.usno.navy.mil/data/docs/JulianDate.php
* http://www.tondering.dk/claus/cal/julperiod.php
* http://javascript.about.com/library/bljulday.htm
* http://stackoverflow.com/questions/11759992/calculating-jdayjulian-day-in-javascript
	* See also http://javascript.about.com/library/bljulday.htm
	* looks interesting
	* Maybe nice use of JavaScript prototype
* http://www.physics.sfasu.edu/astro/javascript/julianday.html
	* Why so complicated?
* http://www.geoastro.de/elevaz/basics/meeus.htm
	* Has slightly modified version of NOAA Julian Day calculation


### Equation of Time

* https://en.wikipedia.org/wiki/Equation_of_time
* http://aa.usno.navy.mil/faq/docs/eqtime.php
* http://info.ifpan.edu.pl/firststep/aw-works/fsII/mul/mueller.html
	* lots of Euler stuff
* http://www.sundials.co.uk/equation.htm
* http://www.astronomynotes.com/nakedeye/s9.htm

### More

* https://en.wikipedia.org/wiki/Orbital_elements
* https://en.wikipedia.org/wiki/Mean_longitude
* https://en.wikipedia.org/wiki/Equation_of_the_center


### Sun Path
* [Sun path]( https://en.wikipedia.org/wiki/Sun_path )
* https://en.wikipedia.org/wiki/Sunshine_duration
* https://en.wikipedia.org/wiki/List_of_cities_by_sunshine_duration


### Solar Access

[Solar Access]( https://en.wikipedia.org/wiki/Solar_access )

> Solar access is the ability of one property to continue to receive sunlight across property lines without obstruction from another’s property (buildings, foliage or other impediment). Solar access is calculated using a sun path diagram. Sun is the source of our vision and energy. Its movements inform our perception of time and space. Access to sun is essential to energy conservation and to the quality of our lives.

> Solar access is differentiated from solar rights or solar easement, which is specifically meant for direct sunlight for solar energy systems, whereas solar access is a right to sunlight upon certain building façades regardless of the presence of active or passive solar energy systems


</details>


<details open >
<summary style=font-size:1.5em; >File Formats / Standards</summary>

<details open >
<summary style=font-size:1.25em; >gbXML</summary>

* http://www.gbxml.org/
> gbXML is an industry supported schema for sharing building information between disparate building design software tools.

* https://github.com/GreenBuildingXML
> Repositories for all things gbXML including validator source code, test cases, and more...

* https://en.wikipedia.org/wiki/Green_Building_XML
> The Green Building XML schema (gbXML) is an open schema developed to facilitate transfer of building data stored in Building Information Models (BIM) to engineering analysis tools. gbXML is being integrated into a range of software CAD and engineering tools and supported by leading 3D BIM vendors. gbXML is streamlined to transfer building properties to and from engineering analysis tools to reduce the interoperability issues and eliminate plan take-off time.


* https://twitter.com/gbXML
> The gbXML open schema helps facilitate the transfer of building properties stored in 3D building information models (BIM) to engineering analysis tools.

* https://github.com/chiensiTB/gbXMLValidator/wiki/What-is-gbXML
> What is gbXML?


* https://greenspacelive.com/site/building-generator/
> Use the building generator for rapid production of building geometry models.


* https://carmelsoftware.tumblr.com/post/151019045304/a-progress-report-on-gbxml-validation-efforts
* http://www.grasshopper3d.com/group/ladybug/forum/topics/new-honeybee-component-import-gbxml
* https://www.linkedin.com/pulse/5-modeling-techniques-gbxml-energy-integration-jean-carriere
* https://knowledge.autodesk.com/support/revit-products/learn-explore/caas/CloudHelp/cloudhelp/2015/ENU/Revit-DocumentPresent/files/GUID-586B9574-64DA-47BC-B8EC-DEF2D565928F-htm.html
* http://inside-the-system.typepad.com/my_weblog/2012/08/how-to-export-gbxml-for-only-some-spaces.html

</details>


<details open >

<summary style=font-size:1.25em; >EPW Files</summary>

There are a number of interesting things related to EPW files. Here are a few of them.


### Google

* [Search EPW Weather Images]( https://www.google.com/search?q=epw+weather&rlz=1C1GCEA_enUS752US752&source=lnms&tbm=isch&sa=X )


</details>


</details>


<details open >

<summary style=font-size:1.5em; >Applications</summary>

### [Radiance Online ]( https://www.radiance-online.org/ )

* Radiance is a suite of programs for the analysis and visualization of lighting in design.

#### The RADIANCE 5.1 Synthetic Imaging System

* <http://radsite.lbl.gov/radiance/refer/refman.pdf>
* <http://radsite.lbl.gov/radiance/refer/ray.html>
* https://www.radiance-online.org/learning/documentation/manual-pages/pdfs/manpages.pdf

#### Radiance Surface/Geometry types

* <http://radsite.lbl.gov/radiance/refer/ray.html#Surfaces>

#### Sample Radiance Files

* Mostapha: [sample-file-rad]( #solar-well/radiance-data-files/sample-file.rad )
* Michal: London, Bristol & Coventry files
* <http://radsite.lbl.gov/radiance/pub/objects/>
	* zipped gjward1 files available from this site
	* Also Paul Burke's beautiful trees ans MIT CSAIL files
* <https://github.com/sariths/radTutorialFiles>
	* Exercise files and supporting documents for a Radiance tutorial on matrix-based methods.
* <https://github.com/rndmStff/radModels>
	* Radiance models containing rad files and view files.

#### Octree format
* http://radsite.lbl.gov/radiance/refer/filefmts.pdf


#### Radiance Software
* https://github.com/NREL/Radiance
* https://radiance-online.org/
* http://radsite.lbl.gov/radiance/framer.html
* https://rawgit.com/NREL/Radiance/master/doc/ray.html <<
* http://radsite.lbl.gov/radiance/refer/refman.pdf
* http://radsite.lbl.gov/radiance/book/
* https://nrel.github.io/Radiance/doc/ray.html

### Radiance Surface/Geometry types

* <http://radsite.lbl.gov/radiance/refer/ray.html#Surfaces>

#### Radiance Materials
* https://github.com/NREL/Radiance/blob/master/doc/notes/materials



### Ladybug Tools / Honeybee
* https://www.ladybug.tools/honeybee.html

Documentation
* https://legacy.gitbook.com/book/ladybug-tools/honeybee-primer/details
	* Reference manual for the Honeybee visual programming language
	* Provides a list of parameters for each available function

###Ladybug Tools / HydraShare
* https://hydrashare.github.io/hydra/index.html

Hydra is a platform for sharing Grasshopper and Dynamo files. The HydraShare landing page has links to dozens of pages. Each page page displays two or more images, a description and a link to download the source code. The images usually show a screen capture of the Grasshopper visual programing screen and a screen capture of the output. The descriptions are generally brief and provide just a hint as to the purpose and the scope of the project. The only way to attain a clear picture uf the script is to download,install and run it. Running the script require that Rhino and Grasshopper are already installed



### [EnergyPlus]( https://energyplus.net/ )
EnergyPlus™ is a whole building energy simulation program that engineers, architects, and researchers use to model both energy consumption—for heating, cooling, ventilation, lighting and plug and process loads—and water use in buildings

EnergyPlus is funded by the U.S. Department of Energy’s (DOE) Building Technologies Office (BTO), and managed by the National Renewable Energy Laboratory (NREL).

EnergyPlus is developed in collaboration with NREL, various DOE National Laboratories, academic institutions, and private firms.

EnergyPlus created and maintain EnergyPlus Weather (EPW) files.

* [Weather Data]( https://energyplus.net/weather )
	* Weather data for more than 2100 locations are now available in EnergyPlus weather format — 1042 locations in the USA, 71 locations in Canada, and more than 1000 locations in 100 other countries throughout the world. The weather data are arranged by World Meteorological Organization region and Country.
* [Weather Data for Simulation]( https://energyplus.net/weather/simulation )
	* Users of energy simulation programs have a wide variety of weather data from which to choose – from locally recorded weather data to preselected 'typical' years –, often a bewildering range of options. Many locations are available on this site – but users may have special needs for different locations.
* [Weather Data Sources]( https://energyplus.net/weather/sources )
	* The weather data provided in EnergyPlus weather format on this website are derived from 20 sources:


### [onebuilding.org]( http://onebuilding.org/ )

* [climate.onebuilding.org]( http://climate.onebuilding.org/ )
	* Respository for free weather data for building performance simulation
	* [Weather Data Sources]( http://climate.onebuilding.org/sources/default.html )




### [Ladybug Tools]( http://ladybug.tools )

* [EPW Map]( http://www.ladybug.tools/epwmap/ )
	* The goal of the project is to provide a single interface for all the available free .epw weather files. Currently it shows weather files hosted by EnergyPlus Website and One Building.
* [epwmap]( https://github.com/ladybug-tools/epwmap )
	* epwmap is developed as part of Ladybug Tools. The goal of epwmap is to provide a single interface for all the free available .epw weather files.
* [[FAQ] Where to find .epw weather data?]( http://www.grasshopper3d.com/group/ladybug/forum/topics/faq-where-to-find-epw-weather-data )


### [DOE2.com]( http://www.doe2.com/ )

* [Weather Data & Weather Data Processing Utility Programs]( http://doe2.com/index_wth.html )


### [White Box Technologies]( http://weather.whiteboxtechnologies.com/home )

* Building energy simulations require weather data as an essential input. White Box Technologies provides useful tools to find "typical year" and historical year weather files created from weather reports of over 10,000 official weather stations around the world.


### [WeatherShift]( http://www.weather-shift.com/ )

* Buildings and infrastructure built today will experience significantly different weather patterns over the course of the 21st century due to the impact of climate change.
* The WeatherShift™ tool uses data from global climate change modeling to produce EPW weather files adjusted for changing climate conditions. (EPW files contain hourly values of key weather variables for a typical year and are intended to be used for simulating building energy requirements.) The projected data can be viewed for three future time periods based on the emission scenario selected to the left.


### [Energy Simulation Solutions Limited]( http://cms.ensims.com/ )

* [Compare two EPW files]( http://jess.ensims.com/epw_compare.html )


### [epwvis]( https://mdahlhausen.github.io/epwvis/ )

* An online viewer and analysis tool for EnergyPlus Weather (EPW) files
* Probably the best 2D viewer available today
* By Matthew Dahlhausen


### [andrewmarsh.com]( http://andrewmarsh.com/ )

* Now broken: [Weather Data]( http://andrewmarsh.com/software/weather-data-web/ )
	* This web app lets you load and display EnergyPlus weather data in a 3D graph with data averaging and animated sectioning. It maps the full range of weather data metrics against day of the year and hour of the day to create an undulating 3D surface plot. You can interactively adjust the displayed metric, the graph size and scale, section planes and data averaging parameters. Simply drag&drop a .EPW file anywhere in the browser windows and you are ready to go.
	* Dr Marsh is one of the gods of simulating complicated things in 3D



### Now broken: [eco-envolventes]( http://www.eco-envolventes.net/ )

[eco-envolventes]( http://www.eco-envolventes.net/ ) is a research project at the [Universidad de Piloto]( http://www.unipiloto.edu.co/ ), Bogota, Colombia

The group prepared a submission for Workshop at the Design Modelling Symposium 16 - 17 September 2017 Paris

The submission includes a number of very interesting 2D and 3D visualizations.

Of primary importance is their data set of EPW files converted to JSON.

Pages of great interest include:

* [Prototype Visualisation Tools]( http://www.eco-envolventes.net/tools.html )

	* [3d annual chart]( http://www.eco-envolventes.net/tools/170614a/3dChart1.html )
		* Data is from the EnergyPlus *.epw files collection which represents 68 Countries and 2240 cities. These have been converted to our climaJSON format for use online. Using this format the data can be visualised in 2d, 3d and on a psychrometric chart. The full set of converted *.epw files is available here.
	* [climaJSON]( http://www.eco-envolventes.net/climaschema/ )
		* Schema for a climaJSON object.
		* This format describes an object containing climate data for a single year in a single location. The object stores an unlimited set of fields for monthly and / or hourly values.
		* Author: R Hudson. Updated: 21/5/2017
	* 2D: http://www.eco-envolventes.net/tools/170614/
	* Psychrometric chart: http://www.eco-envolventes.net/tools/170614b/pChart.html
	* Folders with all converted files: http://www.eco-envolventes.net/data/json/allEPW/
	* More visualizations: http://www.eco-envolventes.net/tools/


More
* https://github.com/tudelft3d/Solar3Dcity




</details>


<details open >

<summary style=font-size:1.5em; >Analemmas / Sun Range</summary>

* https://en.wikipedia.org/wiki/Analemma
* [Motions of the Sun Simulator]( http://astro.unl.edu/naap/motion3/animations/sunmotions.html )
* [Imgur: How the sun looks when you take a pictures at the same place and time every week for a year]( http://imgur.com/61YTxQ2 )
	* See also more links in the comments
* [StackEchange: How does the appearance of the analemma vary with latitude?]( http://astronomy.stackexchange.com/questions/12590/how-does-the-appearance-of-the-analemma-vary-with-latitude )
* [Science Blog: Why Our Analemma Looks like a Figure 8]( http://scienceblogs.com/startswithabang/2009/08/26/why-our-analemma-looks-like-a/ )
* [Stanford Solar Center: Viewing and Understanding the Analemma]( http://solar-center.stanford.edu/art/analemma.html )
* [analemma.com]( http://www.analemma.com/pages/framespage.html ) << mostly broken
* [Figure-Eight in the Sky]( http://www.astronomycorner.net/games/analemma.html ) - inclueds C Sun position code
* [The Analemma Dilemma]( http://www.math.nus.edu.sg/aslaksen/projects/Hannalemma.pdf )
* [Analemmas on the gnomon and on the dial plate]( http://www.illustratingshadows.com/analemma.pdf )
* [analemma.space]( http://analemma.space/ )


</details>


<details open >
<summary style=font-size:1.5em; >Solar Calculators</summary>



* https://github.com/ladybug-analysis-tools/ladybug/blob/master/ladybug/sunpath.py
	* Ladybug's Python Sun path calculator
* https://books.google.com/books?id=cfCqBAAAQBAJ
* https://en.wikipedia.org/wiki/Jean_Meeus
* http://www.willbell.com/math/mc1.htm
* https://sourceforge.net/projects/astroalgorithms/
* http://www.geoastro.de/elevaz/basics/meeus.htm
* http://www.iau.org/
* http://www.iausofa.org/
* Simpler calculation: http://www.geoastro.de/elevaz/basics/meeus.htm
* Short definitions: http://www.ephemeris.com/space-time.html

### Solar Calculator Ladybug Web

* [Script]( https://ladybug-tools.github.io/ladybug-web/solar-calculator-ladybug-web/ )
* [Read Me]( https://ladybug-tools.github.io/ladybug-web/solar-calculator-ladybug-web/#readme.md )
	* This read me supplies a number of links to relevant research and calculations and other links of interest


### Solar Calculator NOAA

* [Script]( https://ladybug-tools.github.io/ladybug-web/solar-calculator-noaa/ )
* [Read Me](https://ladybug-tools.github.io/ladybug-web/solar-calculator-noaa/#readme.md )
* [Solcalc Home Page]( http://www.esrl.noaa.gov/gmd/grad/solcalc/index.html )


### Solar Calculator Bostock

* [Script]( https://ladybug-tools.github.io/ladybug-web/solar-calculator-bostock/#readme.md )
* [Read Me]( https://ladybug-tools.github.io/ladybug-web/solar-calculator-bostock/#readme.md )
* [Solar Calculator Page]( https://bl.ocks.org/mbostock/7784f4b2c7838b893e9b )
* https://github.com/mbostock/solar-calculator
	* Well documented
* https://bost.ocks.org/mike/
* https://bl.ocks.org/mbostock
* https://bl.ocks.org/mbostock/c5504ab3cd25f93af26a
* https://bl.ocks.org/mbostock/7784f4b2c7838b893e9b
* Mike Bostock's Block 7784f4b2c7838b893e9b [Solar Path]( http://bl.ocks.org/mbostock/7784f4b2c7838b893e9b#solar-calculator.js )
* Original version: [solar-caculator.js]( https://gist.githubusercontent.com/mbostock/7784f4b2c7838b893e9b/raw/01ec896bf379c960c4cdb27150986ae5dffd4905/solar-calculator.js )


### Solar Calculator Agafonkin ~ SunCalc.js

* [Script]( https://ladybug-tools.github.io/ladybug-web/solar-calculator-agafonkin/ )
* [Read Me]( https://ladybug-tools.github.io/ladybug-web/solar-calculator-agafonkin/#readme.md )
* [Agafonkin GitHub](https://github.com/mourner/suncalc )
* [SunCalc]( http://suncalc.net/ )
* https://stackoverflow.com/questions/18949074/calculating-sunrise-sunset-times-in-javascript



https://github.com/ladybug-analysis-tools/ladybug-web/issues/1

* [Python Code]( https://github.com/ladybug-analysis-tools/ladybug-core/blob/master/ladybug/sunpath.py#L97-L138 )


## Solar Calculator Links of Interest


[Sun Path in WebGL]( http://www.pycheung.com/weblog/?p=1394 )
* Shows how Analemma are created ~ [PY Cheung]( http://www.pycheung.com/weblog/ )
* No code or explanation

[Sunlight Hours Ladybug Dynamo]( http://hydrashare.github.io/hydra/viewer?owner=mostaphaRoudsari&fork=hydra_1&id=Sunlighthours_Ladybug_Dynamo&slide=0&scale=2.7215798676177987&offset=-765.8096117029108,-203.1389988323118 )
* Here it is in Python. Can we do it in JavaScript?
* [Source]( https://github.com/ladybug-analysis-tools/ladybug-core/blob/master/ladybug/sunpath.py#L97-L138 )


[SunCalc]( https://github.com/mourner/suncalc ) ~ Thank you [Vladimir Agafonkin]( http://agafonkin.com/en/ )!

[Astronomy Answers ~ Position of the Sun]( http://aa.quae.nl/en/reken/zonpositie.html )

[SunCalc.net]( http://suncalc.net/ ) ~ Vladimir Agafonkin!
* You must use the time of the local computer location.
	* In order to see sunrise in Europe from a computer in San Francisco, you must set time as, say, 23:50


[SunCalc.org]( http://www.suncalc.org/ ) ~ [Torsten Hoffman]( http://www.torsten-hoffmann.de/ )
[MoonCalc.org]( http://www.mooncalc.org ) ~ [Torsten Hoffman]( http://www.torsten-hoffmann.de/ )
* These apps also use the time at you current location
	* But also displays local time at the location being viewed

[NOAA Solar Calculator]( http://www.esrl.noaa.gov/gmd/grad/solcalc/index.html )
* [Main JavaScript routine]( http://www.esrl.noaa.gov/gmd/grad/solcalc/main.js )
* Main page fairly easy to update
* Calls them 'azimuth' and 'elevation'
* Does not give negative elevations


[Sun Earth Tools]( http://www.sunearthtools.com/dp/tools/pos_sun.php ) ~ no API ~ UK app - no authors listed

[Sun Path 3]( http://andrewmarsh.com/apps/releases/sunpath3d.html ) ~ no API ~ [Dr Andrew Marsh]( http://andrewmarsh.com/ )

[Solar Path]( http://bl.ocks.org/mbostock/7784f4b2c7838b893e9b#solar-calculator.js ) ~ Mike Bostock

[NOAA Solar Calculator]( http://www.esrl.noaa.gov/gmd/grad/solcalc/ ) ~ Find Sunrise, Sunset, Solar Noon and Solar Position for Any Place on Earth
* http://www.esrl.noaa.gov/gmd/grad/solcalc/emaps.js
* Previous version: http://www.esrl.noaa.gov/gmd/grad/solcalc/azel.html

[Motions of the Sun Simulator]( http://astro.unl.edu/naap/motion3/animations/sunmotions.html )
* Uses Flash


[Sun Position Calculator]( http://www.pveducation.org/pvcdrom/properties-of-sunlight/sun-position-calculator )


http://www.metafilter.com/130877/SunCalc-a-solar-azimuth-calculator

http://www.analemma.com/Pages/indexPage.html
* Old and has issues

</details>





<details open >
<summary style=font-size:1.5em; >Publications</summary>



Mackey, Christopher; Galanos, Theodore; Norford, Leslie; Sadeghipour Roudsari, Mostapha, "Wind, Sun, Surface Temperature, and Heat Island: The Critical Variables for High‐Resolution Outdoor Thermal Comfort”, in Proceedings of the 15th International conference of Building Performance Simulation Association, San Francisco, USA, Aug 7-9 2017. [Link].

As interest in comfortable outdoor spaces grows, the demand to simulate, map, and understand these microclimates has also grown. However, such mapping rarely occurs in practice, as it requires the modelling of several complex factors: wind, sun, surface temperature, and urban heat island. At present, it is clear that a workflow to map outdoor comfort cannot include all of these factors without requiring months to compute. Accordingly, this study attempts to simulate the most accurate map of outdoor thermal comfort currently possible for a 3-block urban setting in Singapore. Next, the contributing factors are systematically removed to deduce the minimum needed to create a sufficiently accurate map. Findings indicate that, on average, the comfort conditions reported on meteorological weather networks are ~2.4o C different from a given microclimate within the urban test site. The diversity of direct sun and sky heat exchange can account for a little over a third of this discrepancy. Wind patterns similarly account for a significant fraction of this difference but results suggest that a small number wind simulations are needed to appropriately account for such patterns. Surface temperatures and heat island effect each account for a smaller ~0.5o C difference. Strategies for generating faster microclimate maps are discussed and recommendations for meteorological reporting methods are proposed.

Sadeghipour Roudsari, Mostapha, "Seeing the Process: Ladybug + Honeybee, Dynamic Building Simulation Solutions for Integrated Iterative Design" in Energy Accounts: Architectural Representations of Energy, Climate, and the Future, pp. 112-116, Routledge, London; New York NY, 2016 ISBN 978-1-138-91406-3 OCLC 966641933

How does one tell the story of energy production, use, or conservation in a manner sufficiently convincing to influence policy, behavior, and design? Energy Accounts explores potential answers to this question through compelling images, data visualizations, narratives, and other examples of accounting for energy. Organized into a collection containing both examples of best practices and critiques, this impressive array of projects and contributors combines text and graphic material to explore different representations of energy data. Including work from Kieran Timberlake, SHoP, AMO, Lateral Office, WOHA, and many more, the book boasts a unique graphic design which supports and enhances its role as a valuable resource for professionals and students in architecture, engineering, and urban design.

***
Mackey, Christopher; Sadeghipour Roudsari, Mostapha; Samaras, Panagiotis, "ComfortCover: A Novel Method for the Design of Outdoor Shades,” in Proceedings of Symposium on Simulation for Architecture and Urban Design : (SimAUD 2015) : 2015 Spring Simulation Multi-Conference (SpringSim '15), Washington, DC, United States, Apr 12-15 2015. Red Hook, NY: Curran Associates. ISBN 1510801049 OCLC 908128650
Over the past few decades, several methods for designing shades to reduce energy loads of buildings have emerged. However, to date there are virtually no agreed upon methods available to assist in the design of outdoor shades to keep people comfortable. Here we present a novel method named ComfortCover to assist in the design of static shades in outdoor conditions using a 3-step methodology adapted from the current state-of-the-art process for the design of building shades. The first step is an assessment of radiation falling on a person and the calculation of a corresponding solar-adjusted radiant temperature for every hour of the year. Second, this temperature is fed into an hourly calculation of Universal Thermal Climate Index (UTCI). Lastly, this UTCI is fed into an algorithm that projects sun vectors for every hour of the year from the location of a person through a surface where shade design is being considered. Each of the vectors is associated with a UTCI and a temperature difference from a 'comfort temperature' that is summed up for every subdivision of the test shade to color it with shade helpfulness (blue), shade harmfulness (red) and no major effect of shade (white).

Sadeghipour Roudsari, Mostapha; Pak, Michelle. "Ladybug: A Parametric Environmental Plugin for Grasshopper to Help Designers Create an Environmentally-Conscious Design." In Proceedings of the 13th International conference of Building Performance Simulation Association, Chambery, France, Aug 25-28 2013.

Building Simulation 2013 13th International Conference of the International Building Performance Simulation Association Etienne Wurtz Editor 25 - 28 August 2013 Chambery, France ISBN: 978-2-7466-6294-0

Mackey, Chris, "Pan Climatic Humans : Shaping Thermal Habits in an Unconditioned Society", Thesis, MArch, Massachusetts Institute of Technology, Department of Architecture, 2015, PDF, Retrieved July 02, 2017, from https://dspace.mit.edu/handle/1721.1/99261

The relationship between people and the thermal environment has a profound impact on lifestyle and culture, influencing what we wear, what spaces we gather around, and how we go about our lives. Yet this relation is often oversimplified in the design of conditioned spaces, assuming occupants have unchanging thermal preferences and no desire to participate in the shaping of a building's microclimates. While we gain a basic satisfaction of thermal need from this simplified view, we lose much by complicating our buildings with HVAC equipment to the point that inhabitants do not understand them, by cellularizing space into bubbles of conditioned air that limit opportunities for continuous communal space, and by having occupants rely on central heating/cooling systems that often require harmful concentrated energy sources, such as fossil fuels. This thesis asks if and how we can design spaces of everyday life that not only satisfy a basic thermal need but also encourage occupant participation in the shaping of microclimates, promote thermally-based social cohesion, and do so using only on passive means. Since the traditional process of evaluating heating/cooling load with an energy model does not hold for unconditioned design, the thesis question requires a new method for exploring design decisions in relation to the thermal environment. Accordingly, research began by developing software to produce high spatial/temporal resolution thermal maps that evaluate design decisions by indicating the parts of a space made warmer or cooler in relation to a seasonal "comfort temperature." With this new means of understanding the thermal environment, several geometric design strategies are tested for two climates - Los Angeles and New York. The tests illustrate that the geometry of a space can have an enormous effect on its thermal habitability once the assumptions of air conditioning and oversimplified occupants are removed. The most powerful of the tested design strategies are used to develop two completely passive urban co-habitation/co-working projects that express and embellish these discovered geometric factors. The designs operate off of a generalizable logic in which the communal, daytime spaces are placed in the areas of a site where they can take advantage of the most powerful and stable thermal strategies while the fringes include less stable, intermittently- occupied, private spaces where occupants can tune the microclimate as they wish. Although this generalizable logic is constant, the two designs illustrate that widely different forms can emerge based on the climate and the tested strategies.

</details>
<details open >
<summary style=font-size:1.5em; >People</summary>



* Welle, Benjamin - organizer
	* Benjamin.Welle@perkinswill.com
	* https://github.com/bwelle
* Zack Rogers
	* rogers@daylightinginnovations.com
	* http://www.daylightinginnovations.com/
	* http://www.daylightinginnovations.com/spot-overview-flow-diagram
* John Mardaljevic
	* j.mardaljevic@lboro.ac.uk
	* http://www.lboro.ac.uk/departments/abce/staff/john-mardaljevic
	* http://climate-based-daylighting.com/doku.php?id=radiance2018
* Robert Guglielmetti ~ Mr Rumble strip
	* Robert.Guglielmetti@nrel.gov
	* Lighting Designer/Researcher/Software Developer at National Renewable Energy Laboratory
	* https://www.nrel.gov/research/robert-guglielmetti.html
	* http://www.rumblestrip.org/about/
	* rob.guglielmetti@gmail.com
	* https://github.com/rpg777

</details>

### Portals

* https://www.schorsch.com/en/kbase/resources/