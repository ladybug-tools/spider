
## General Considerations

## Testing gbXML files

How can you tell if a gbXML file is readable and valid?

### Will the gbXML file open in your browser?

Open or drag and drop any XML file with your browser.

Your browser will either open the file or provide a helpful error message as to the location and cause of an error in the XML syntax.

### Will the gbXML file open in gbXML Viewer?

* <http://www.ladybug.tools/spider/read-gbxml/gbxml-viewer/r5/index.html>
	* Free and open source
	* Works in your browser
	* Open files on your disk drive


### Will the gbXML file open in Open Studio?

* <https://www.openstudio.net/>
	* Free and open source
	* Download, install and update
	* Click 'import 

### Other methods

See <https://github.com/GreenBuildingXML>

## Creating or writing gbXML files

### Text inside brackets are called 'elements'

Equivalent to 'tags' in HTML


### General guidelines for creating gbXML files

* <https://www.w3schools.com/xml/schema_intro.asp?
> A well-formed XML document is a document that conforms to the XML syntax rules, like:

> * it must begin with the XML declaration
> * it must have one unique root element
> * start-tags must have matching end-tags
> * elements are case sensitive
> * all elements must be closed
> * all elements must be properly nested
> * all attribute values must be quoted

### Upper and lower case elements are OK

Case for elements names does not seem to matter as long as the case is the identical for opening and closing tags.


### Quotation marks

The values of attributes inside tag statements should be surrounded by quotation marks. Either single or double quotes may be used

The browser will always display attribute values inside double quotes.

Values between two tags may be surrounded by quotes, but quotes are not required.

### IDs

Theo suggests:

Treat as you treat URLs with JavaScript

In other words:

* all-lower-case-with-hyphens-between-words-or-numbers.


## Elements

### gbXML Element 

````<gbXML>```` is the root element.

Units attributes not required by Open Studio, but will generate warnings and Open Studio will set defaults to SI units.

_Need to test with "UTF-16"_


### Location Element

This element and any of its contents may be omitted and Open Studio will still accept the file without warnings and display its geometry


### Building Element

Attributes:

* Name 
* Description 
* StreetAddress 
* Area 
* **Space** << may be the only required element
* AverageNumberOfFloors 
* InfiltrationFlow 
* ShellGeometry 
* SpaceBoundary 
* Lighting 
* IntEquipId 
* MeterId 
* PeakDomesticHotWaterFlow 
* BuildingStorey
	* Documentation: Captures Building Storey Structure
	* Nice to have but seemingly not required by Open Studio in order to import without error 
	* BuildingStorey Level: Building storey Local Placement Z coordinate.


### Space Element

See [Space Element Page]( #space.md )


### Zone Element

See [Zone Element Page]( #zone.md )
