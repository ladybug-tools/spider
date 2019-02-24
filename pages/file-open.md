# Opening and loading files with gbXML Viewer

## The problem to be solved / the concept

You are testing and trying to fix a gbXML file full of issues. You need to load and view the same file over and over again.

The goal is to have Spider gbXML Viewer open files in whatever way is best and fastest for you. There are many different kinds of workflows. We want to help you be as efficient as possible. This file tries to explain rhe various ways the gbXML Viewer might be able to help you open gbXML files faster and and more automatically.


### Use your operating system file dialog box

* Click to 'Choose File' button in the main menu

### Use Drag and Drop

* Select a file off your desktop or your file navigator/explorer
* Drag and drop the file icon into the box surrounded by a dashed line in the left menu.


### Use a link

1. Copy and paste a hash mark('#') followed by an URL to the end of the link to gbXML Viewer in the address bar of your browser
	* Example: http://www.ladybug.tools/spider/gbxml-viewer/#https://rawgit.com/GreenBuildingXML/Sample-gbXML-Files/master/Urban_House_MEP.xml
2. Copy and paste a hash mark('#') followed b a relative link to the end of the link to gbXML Viewer in the address bar of your browser
	* Example: http://www.ladybug.tools/spider/gbxml-viewer/#../../../gbxml-sample-files/RevitTwoSpaces.xml
3. Copy and paste a hash mark('#') followed by a file URI to the end of the link to gbXML Viewer in the address bar of your browser
	* See Wikipedia [File URI Scheme]( https://en.wikipedia.org/wiki/File_URI_scheme )
	* See Stackoverflow [How can I create a link to a local file on a locally-run web page?]( https://stackoverflow.com/questions/18246053/how-can-i-create-a-link-to-a-local-file-on-a-locally-run-web-page/18246357 )


### Set a default file path

![]( pages/file-open-default-file-screenshot.png )

* Similar to using a link. All three methods should work
* Copy and paste a link - no the hash mark needed - into the default path text input box
* Every time you reload the page the default file will appear - even in between sessions
* To stop loading a default file just clear the default file text input box

### Special note on using local files

First have a look at this Three.js Wiki page: [How to run things locally]( https://github.com/mrdoob/three.js/wiki/How-to-run-things-locally ).

> If you load models or textures from external files, due to browsers' "[same origin policy]( https://en.wikipedia.org/wiki/Same-origin_policy )" security restrictions, loading from a file system will fail with a security exception.

The easiest method, as described in the above Wiki file, is to change local files security policy in your browser.

Here is a screen shot of the Properties dialog for a Chrome shortcut on Windows 10:

![]( pages/file-open-chrome-screenshot.png )


***

## FAQ

### Do you want your colleague or client to see the file?

* Save the file to GitHub, DropBox or somewhere on the web with a public URL
* Prepare a link using the 'Use a link' option and send the link to your client or cplleagu


### Are you loading the same file over and over again?

* In some workflows you may want to load, fix, test repeatedly. In these situation use the 'Set default file path';


### Do you need to inspect a lot of files quickly?

* Drag and and drop files into the Viewer


***


# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>


