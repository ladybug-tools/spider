# [Markdown Cheat Sheet]( #utilities/markdown-cheat-sheet.md )

Interesting things you can do with Markdown.


## Links of Interest

* <https://github.com/showdownjs/showdown>
* <https://guides.github.com/features/mastering-markdown/>
* <https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet>
* <https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md>
* <https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf>
### Text

	_italics_ *italics*

_italics_ *italics*

	**bold**

**bold**

	***bold and italics***

***bold and italics***

### Strike through

```
~~Strike through~~
```
~~Strike through~~

### Horizontal rules

```
	***
	---
	___
```

***

---

___


### Links

``` Markdown
[Example.com]( https://example.com "title" )
```

[Example.com]( https://example.com "title" )

text [^1] not

[^1]: footnote


### Tables
```
| h1    |    h2   |      h3 |
|:------|:-------:|--------:|
| 100   | [a][1]  | ![b][2] |
| *foo* | **bar** | ~~baz~~ |
```

| h1    |    h2   |      h3 |
|:------|:-------:|--------:|
| 100   | [a][1]  | ![b][2] |
| *foo* | **bar** | ~~baz~~ |


### Lists

```
* item
* item
* item
	* item
	* item
		* item
* item
```

* item
* item
* item
	* item
	* item
		* item
* item



### Code

``` Markdown
	```
	line of code with 3 backquote characters
	line of code
	line of code
	```
```

``` Markdown

	line of code
	line of code
	line of code

```

``` Markdown
text with `back quote` characters
```
text `text` text


### Quotes

``` markdown
> quote
> quote
> quote
```

> quote
> quote
> quote


### Images

* Uses [picsum.photos]( https://picsum.photos ) to gather random images

```
	![External Link Icon]( https://picsum.photos/800/600/?random =100x100 )

	![ text ]( https://picsum.photos/800/600/?random  =400x300 )

	![ text ]( https://picsum.photos/800/600/?random  =200x150 )
```

![External Link Icon]( https://picsum.photos/800/600/?random =100x100 )

![ text ]( https://picsum.photos/800/600/?random =400x300 )

![ text ]( https://picsum.photos/800/600/?random =200x150 )


### Figures

```
<figure style=display:inline-block; >
<a href=https://google.com >
<img src="https://picsum.photos/200/200/" >
<figcaption>Fig1. - A view of image 1</figcaption>
<a>
</figure>
```

<figure style=display:inline-block; >
	<a href=https://google.com >
		<img src="https:///picsum.photos/200/200/" >
		<figcaption>Fig1. - A view of image 1</figcaption>
	<a>
</figure>

<figure style=display:inline-block; >
	<a href=https://google.com >
		<img src="https://picsum.photos/200/200/" >
		<figcaption>Fig2. - A view of the caption</figcaption>
	</a>
</figure>

