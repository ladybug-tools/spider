
## General Considerations

## Testing

### Will the gbXML file open in your browser?

Open or drag and drop any XML file with your browser.

Your browser will either open the file or provide a helpful error message as to the loation and cause of the error

### Will the gbXML file open in gbXML Viewer?

* <http://www.ladybug.tools/spider/read-gbxml/gbxml-viewer/r5/index.html>
	* Free and open source
	* Works in your browser


### Will the gbXML file open in Open Studio?

* <https://www.openstudio.net/>
	* Free and open source
	* Download, install and update


## Upper and Lower Case

Case for tag names does not seem to matter as long as the case is the identical for opening and closing tags.


## Quotation Marks

The values of attributes inside tag statements should be surrounded by quotation marks. Either single or double quotes may be used

The  browser will always display attribute values inside double quotes.

Values between two tags may be surrounded by quotes, but quotes are not required.

 
## gbXML Element 

Units attributes not required by Open Studio, but will generate warnings and Open Studio will set defaults to SI units.

_Need to test with "UTF-16"_


## Location Element

This element and any of its contents may be omitted and Open Studio will still accept the file without warnings and display its geometry


## Building Element

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
