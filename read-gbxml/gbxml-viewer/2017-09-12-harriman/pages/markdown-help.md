<span style=display:none; >
[You are now in GitHub source code view - click this link to view Read Me file as a web page]
( https://pushme-pullyou.github.io/index.html#utilities/markdown-cheat-sheet.md "View file as a web page." ) </span>
<input type=button onclick=window.location.href='https://github.com/pushme-pullyou/pushme-pullyou.github.io/tree/master/cookbook-html/templates/'; value='You are now in GitHub web page view - Click this button to view Read Me file as source code' />


[Markdown Cheat Sheet]( #utilities/markdown-cheat-sheet.md )
===

Interesting things you can do with Markdown.





### Images

* uses [lorempixel]( http://lorempixel.com ) to gather random images
````
	![External Link Icon]( http://lorempixel.com/800/600 =100x100 )

	![ text ]( http://lorempixel.com/800/600 =400x300 )

	![ text ]( http://lorempixel.com/800/600 =200x150 )
```

![External Link Icon]( http://lorempixel.com/800/600 =100x100 )

![ text ]( http://lorempixel.com/800/600 =400x300 )

![ text ]( http://lorempixel.com/800/600 =200x150 )


### Figures

<figure>
<a href=http://google.com >
<img src="http://lorempixel.com/200/200/" >
<figcaption>Fig1. - A view of image 1</figcaption>
<a>
</figure>

<figure >
<a href=http://google.com ><img src="http://lorempixel.com/200/200/" >
<figcaption>Fig2. - A view of the caption</figcaption>
</a>
</figure>


### Horizontal rules

```
	***
	---
	___
```

***

---

___


### Links of Interest

https://github.com/showdownjs/showdown
https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet


### Strike through

```
~~Strike through~~
```
~~Strike through~~



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


### Text

	_italics_

_italics_

	**Bold**

**Bold**


### Code
```
	line of code with 3 backquote characters
	line of code
	line of code
```

	line of code
	line of code
	line of code

text with `back quote` characters

text text text


### Quotes
```
> quote
> quote
> quote
```

> quote
> quote
> quote


### Footers

<br>

***

<center title="dingbat" >
# <a href=javascript:window.scrollTo(0,0); style=text-decoration:none; >❦</a>
</center>

<center title="dingbat" >
# <span onclick=window.scrollTo(0,0); style=cursor:pointer; >❦</span>
</center>

<center title="dingbat" >
## <a href=javascript:content.scrollTop=0; >❦</a>
</center>

<center title="dingbat" >
# <a href=javascript:window.scrollTop=0; style=text-decoration:none; >❦</a>
</center>
