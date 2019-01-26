# Schema for an Architecture of Design (AOD)

The schema for a project is designed as just another project the schema describes.

The description of a design should be media agnostic. You should get the same results and outcome or nearly so whether you using paper or whether you are using CAD to visualize the instructions provided.

See The schema for a project  is designed as just another project the schema describes.

The description of a design should be media agnostic. You should get the same results or nearly so whether using paper or whether you are using cad.

See [Sol Lewitt]( https://en.wikipedia.org/wiki/Sol_LeWitt ). It's just an instruction on how to build things.

> LeWitt's refined vocabulary of visual art consisted of lines, basic colors and simplified shapes. He applied them according to formulae of his own invention, which hinted at mathematical equations and architectural specifications, but were neither predictable nor necessarily logical. For LeWitt, the directions for producing a work of art became the work itself; a work was no longer required to have an actual material presence in order to be considered art. https://www.theartstory.org/artist-lewitt-sol.htm

The process should be [Turing complete]( https://en.wikipedia.org/wiki/Turing_completeness ). In other words, you should be able to design anything starting from just a few words.

> In colloquial usage, the terms "Turing complete" or "Turing equivalent" are used to mean that any real-world general-purpose computer or computer language can approximately simulate the computational aspects of any other real-world general-purpose computer or computer language.


The process should be [blockchain]( https://en.wikipedia.org/wiki/Blockchain ) compatible. In other words, it can't be photoshopped.. It's just an instruction on how to build things.

> By design, a blockchain is resistant to modification of the data. It is "an open, distributed ledger that can record transactions between two parties efficiently and in a verifiable and permanent way".


## The core requirements

Who: for nowL GitHub user or organization name
What: add, edit, delete // number, string, object, array // project, elements, attributes, children
when: JavaScript time stamp
where: id ( where is this item in the log file? What line in t he JSON Line file? )
How: request / commit
Why: commit message

Unlike traditional file formats, there is no header. Any header-like data can and must be addable ans editable at any time / on the fly.


See also
* http://gbxml.org/schema_doc/6.01/GreenBuildingXML_Ver6.01.html

Not to forget
* No comments in JSON - but could be in JSON lines
* Until further notice, empty lines are OK
* In JSON all things are strings that must be quote - but here we break the rule

## Example in JSON Lines format

// Objects need better defining / things are fuzzy
// Will be cleared up once we have a schema reader /writer going

{ id: "1", time: "123456", project: "schemaAOD", action: "add", object: {

	string: "first commit"

}, actor: "theo-armour", status: "commit", message: "The schema for a project is designed just as another project the schema may design" }\n



{ id: "2", time: "123456", project: "schemaAOD", action: "add": object: {

	project: "schemaJsonL",
	action: "add",
	object: "first commit", actor: theo-armour,  message: "every scheme needs a project" }

} actor: theo-armour, status: "commit", message: "The basic elements for the project" }\n


{ id: 3, time: 123456, project: "schemaJsonL", action: add, type: "attributes", object: {

	latitude: { title:"latitude", required: "true", type: "number" },
	longitude: ( title: "longitude, required: "true", type: "number" },
	name: { title "title", required: "true", type: "string" },
	units: { title "title", required: "true", type: "string" },
	type: { title "title", required: "true", type: "string" }

} actor: theo-armour, status: "commit",  message: "The basic attributes" }\n


{ id: 3, time: 123456, project: "schemaJsonL", action: add, type: "Elements", object: {

	surface: { title:"surface", required: "true", type: "object" }
	space: ( title: "space, required: "true", type: "object" }
	storey: { title "storey", required: "true", type: "object" }

} actor: theo-armour, status: "commit",  message: "The basic elements for the project" }\n


{ id: 4, time: 123456, project: "schemaJsonL", action: add, type: "Children", object: {

	element: "surface": {
		adjacentSpaceId: { title: "adjacentSpaceId", id: "string" },
		coordinates: { title: "coordinates", type: "array" }
	}

} actor: theo-armour, status: "commit",  message: "The basic surface children" }\n
