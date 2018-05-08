## Warmup Suggestions

Michal:

Hi everybody

I'm Michal Dengusiak, I'm an <job title> living in Berlin and working with Buro Happold.  _Perhaps a bit more if you wish..._

I'm here to show you Aragog. A free open source gbXML file viewer that display files in 3D in your browser.

With me is Theo Armour. Hi Theo!


Theo:

Hi Michal. Yes, I'm here too.

And, yes, I have had the great pleasure of coding this app.

I am the developer and maintainer.

I am a former licensed architect, former Program Manager for AutoCAD at Autodesk and live in San Francisco.

I have been coding with the Three.js JavaScript library since 2010. My pleasure in life is coding for 3D.

I want to thank Stephen Roth for creating this event and Chris Mackay for being an excellent Ladybug Tools founder and maintainer.

During the presentation I will try answer any questions in the text chat area.

Michal: back to you.


_What to show during this warm-up?_


## Intro ~ 3 minutes

Onscreen: load default file
Dialog: Ladybug Tools / Spider / gbXML Viewer is a free open source gbXML file viewer

Onscreen: use mouse to rotate and zoom
Dialog: With this viewer you view gbXML files in your browser in interactive 3D

Onscreen: Open files by clicking link from Gallery menu
Dialog: You can load files by linking to files using a URL

Onscreen: Open files by using the file dialog box
Dialog: You can load files from your computer using the file dialog box

Onscreen: click the hamburger menus
Onscreen: gbXML view is being built and designed so that you can view models of devices with small screens such as on a tablet or even on a mobile phone

Onscreen: Update menu colors
Dialog: select the colors you prefer or edit the style sheet to create your own theme

## Settings ~ 3 minutes

Onscreen: open the Settings panel. Scroll the menu up and down

Dialog:
Viewing gbXML data in 3D gives you a lot more options for displaying gbXML elements using informative methods.

Update the materials and colors for surfaces
- Choosing random colors helps you identify how a wall might be composed of multiple gbXML surfaces
- Choosing a solid shade helps you see shadows better
- Exposure type surfaces help you see what surfaces face outdoors
- Computer graphics tools such as opacity and wireframe help with finding issues and seeing what's inside.

Show and hide extra elements and attributes
* Shadows, ground plane, etc

 Edit the positions of surfaces or even slice surfaces into sections
* Explode
* Section view

## Reports ~ 3 minutes

Onscreen: open the Reports panel. Scroll the menu up and down.

Dialog:
Identify patterns in the data,
Visualize patterns in the data by displaying tables of results in 3D

Surfaces, spaces, zones and openings are view-able as table data and sets of 3D surfaces

Each type of element is cataloged according to all of its attributes

Specialty reports include
* Surface by type
* Opening by type
* CAD object ID by tyoe

## Numbers ~ 2 minutes
Given hundreds even thousands of elements, it is helpful if calculations can be carried out to summarize aspects of the data

Calculate areas of items of interest
* Areas by Storey
* Areas by Surface Type
* Areas by Opening Type
* Areas by Exterior Surface

Another type of calculation by compass orientation


## Issues ~ 3 minutes

Onscreen: open and load sample model with many embedded errors. Toggle the various menus

Dialog
Being able to view gbXML data in interactive 3D is certainly a step in a good direction.
An even better idea is to be able to view the issues that are preventing the export from a CAD file to be loaded by an energy analysis application.

Recent releases of the Viewer are identifying typical errors.
Let's run through a few examples...


## Analemma / Sun Range / First Person Camera ~ 3 minutes

Onscreen:
Run through each of these features

Dialog:
Because the Viewer is based on a full-featured 3D library it's easy to add new features.
We are trying to add features you may not have in your CAD program or features where a quick and dirty result early in the design stage may help you save time and effort in the long run.

Here we are showing a Sun path with the traditional 'Analemmas'
A sun range - casting castings from multiple positions
A first person camera that helps you fly through the model



## Editing ~ 3/4 minutes

We will have a single model pre-prepared with a number of errors that Michal will fix using the Heads-up disDlay

Onscreen:
Make the edits
Save the edited drawing under a new name and then load the new drawing

Dialog:

Pushing even further and the Viewer is beginning to be able to correct the errors and save the fixes to a new file


First carry out the edits

Onscreen:
Save the edited drawing under a new name and then load the new drawing

Dialog:
Now let's see if our edits have worked.
We save the drawing to hard disk
Now we load the model.
And, bingo, here is the file with all the fixes ready to go your energy analysis apps

## Closing ~ 1 minute
_Practice the closing a lot. Help improve the text. Probably there's nothing more important._
Onscreen:

Load large-ish pretty, very 3D model - perhaps 'Aspen'
Create a Sun path. Slide the hour indicator to show the Sun and shadows updating

Dialog:

In closing, I'd like to point out that the viewer can load large files

It's all written open source entry-level Three.js JavaScript

Anybody can ask for features or even better you can add new features yourself

Here the links to the Viewer and to the source code

Thank you to Stephen Roth for organizing this webinar.

For all of you watching this webinar, we hope to see you online.

Feel free to contact us via GitHub or the Ladybug Tools Forum

We would like your feed back in developing new ways of sharing, viewing and editing building data in free, open source tools

