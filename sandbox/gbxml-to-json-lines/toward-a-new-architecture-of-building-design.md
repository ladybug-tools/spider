# Toward a new architecture of building design

_The title of this essay is a play on [Towards a New Architecture]( https://en.wikipedia.org/wiki/Toward_an_Architecture ) - a collection of essays published in 1923 by [Le Corbusier]( https://en.wikipedia.org/wiki/Le_Corbusier )._

> The book has had a lasting effect on the architectural profession, serving as the manifesto for a generation of architects, a subject of hatred for others, and unquestionably a critical piece of architectural theory.

_A well-known quote from the book: "A house is a machine for living in."_

***

The traditional way of designing buildings is for the designer to draw diagrams on paper or similar media such as vellum. At a later stage a contractor will interpret the drawings and build something from them

This method allows for minor changes by erasing parts of the diagram. Any significant changes, however, require starting a new diagram.

A simple design requires a few iterations of the diagram. Complex projects might require hundreds of iterations. Many of the iterations will require the start of a fresh drawing(s) of the the design.

As process-intensive as this process is, each iteration is only a static representation of the design intent. Indications including difference with the previous iteration, the identity of the peeps calling for the diffs, the rationales for the changes and many more aspects of intent are not included because the process has no way of recording these in an effective manner.

The introduction of Computer Aided Design (CAD) to the the design process both aided and injured the design process. Using symbol libraries, designs may be made more quickly and frequently with fewer errors. On the other hand, the image on the architects screen represents a design paradigm as static as any diagram on paper. No matter the format - DWG, STL, gbXMl or whatever - the data is a static representation of a single instance in time.

The reality of the building process is quite different. It starts with a line and may end up several year later with millions of elements. It embeds the hopes and dreams of multitudes of players. The diffs and change orders are permeated with frustration and pride, laughter and dollar signs. The actual design process of a complex building is a complex as the making of a blockbuster motion picture or writing a computer operating system.

Of course the architecture of building design in the future will move toward quite different paradigms. Building will be light shows of LED, energy fluxes of wind and photo voltaics, landing spots for drones and remotely operated vehicles, pleasure domes for young students and heaven simulators for old peeps.

And when we think of buildings in those way, a static diagram just doesn't work anymore. A house is a program for living. A factory is a code base that churns out new factories. A town scape is an operating system for a thousand friends. And it will take only a hundred years for suitable building design tools that match these needs to appear.

Wrong.

It's already happened, but we did not know to do it. It's called Git. There's a gazillion years of experience. Most every aspect have been dealt with repeatedly. And it's free. The tools to design your iPhone, FaceBook, Amazon Web Services or whatever can also be used to produce ski chalets, drugstores, townhouses, pigpens and skyscrapers.

The building of the future is designed with a modern revision control system (such as Git), with code stored in the cloud provider ( such as GitGub) and maintained by a host of gig economy peeps.


***

## Notes on the synthesis of this form

_See [Notes on the Synthesis of Form]( https://en.wikipedia.org/wiki/Notes_on_the_Synthesis_of_Form )._

The project is a [Git]( https://en.wikipedia.org/wiki/Git ) repository

> Git is a version-control system for tracking changes in computer files and coordinating work on those files among multiple people. It is primarily[citation needed] used for source-code management in software development, but it can be used to keep track of changes in any set of files. As a distributed revision-control system, it is aimed at speed, data integrity, and support for distributed, non-linear workflows.

The data is in a JSON line file

* [JSON Lines]( http://jsonlines.org/ )
* [JSON Lines format: Why jsonl is better than a regular JSON for web scraping]( https://hackernoon.com/json-lines-format-76353b4e588dhttps://hackernoon.com/json-lines-format-76353b4e588d )
* https://en.wikipedia.org/wiki/JSON_streaming#Line-delimited_JSON

The JSON may represent:

* Assembly
* Component
* Part
* Whatever

Each line in the JSON may represent:

* Adding
* Editing
* Deleting
* Meta aspect such as cost, design intent or architectural flimflam

Every part has a UUID.

There could be a line for every brick, nail and bucket of cement in the project.

Designs are created via pull requests.

Parametric design variations are forks until a pull request is initiated and accepted

Storage in petabyte configurations and real-time ray-tracing are examples of technology advances occurring and available today. Therefore file size and speed of loading and processing may be ignored as they are no longer viable constraints.

The data may be anything that the JSON format accepts. The scripts that read the data act on what they 'know' and ignore what they don't

A project file might be read by an architectural script for is construction information, while a project management script might parse the same file looking for meeting notes

Data files may link to external data files with correctedness verified via UUIDs.

There are many historical issues where the data in external references given in data files no longer exist. A possible solution may be to embed the data in specialty AEC block chain environments.


***

## A data sample

{ UUID: xxxxx, add: description, title: "building 1", type: "housing", latitude: 37, longitude: -122 ... author, time, date }
{ UUID: xxxxx, add: units, length: meters ... author, time, date }
{UUId: 23abc; Add: line, vertices: [[1,1,1], [ 2,2,2 ] ], author: bilbo, message: 'lower left corner", time: 10:10, date: 2020--01-28 }
{UUId: 23abc; Edit: line, vertices: [ [ 1, 1, 1 ], [ 2, 2, 5 ], [3, 3, 30 ] ], author: bilbo, }
{UUId: 23abc; Delete: line, author: Peter, }
{ add: meeting }
{ add: surface }
{ add: zone }
{ add: opening }
{ add: component, type: "window" }
{ add: action, "open/close", }