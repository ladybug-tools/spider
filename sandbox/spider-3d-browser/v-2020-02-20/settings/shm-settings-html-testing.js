
const SHM = {}


SHM.getHtml = function () {


	const htm = `

<h1>test test test </h1>

<p>
	The purpose of this page is to help you test and explore
	theme switching and editing scripts.
</p>






<p>
Concept
<ul>
	<li>Provide an easy way to customize the appearance of a web page</li>
	<li>Provide a fast, simple and easy program for doing the above</li>
</ul>
</p>

<p>
Features
<ul>
	<li>Updates the settings in realtime </li>
	<li>Saves values between sessions using local storage</li>
	<li>Begins to handle operating system light and dark modes</li>
	<li>Adjusts for running on laptop or mobile devices</li>
</ul>
</p>

<hr>

<h1>Title H1 ABC DEF HIG JKL MNO </h1>

<h2>Title H2</h2>

<h3>Title H3</h3>

<h4>Title H4 ABC DEF HIG JKL MNO </h4>

<h5>Title H5 ABC DEF HIG JKL MNO </h5>

<hr>

<aside>aside aside </aside>

<p>
<a href="" >This is a link</a> in front of some text.
<b>bold bold bold</b> and <i>italics italics italics</i> and <s>strikethrough</s>
</p>

<p>
<button id=but onclick=alert("howdy") >button 1</button>

<button onclick=dialog1.open=!dialog1.open; >dialog 1</button>
</p>

<p>
<select size=5 >
	<option>abc 123 def 456 def 456</option>
	<option>abc 123 def 456</option>
	<option>abc 123 def 456</option>
	<option>abc 123 def 456</option>
	<option>abc 123 def 456</option>
	<option>abc 123 def 456</option>
	<option>abc 123 def 456</option>
	<option>abc 123 def 456</option>
</select>
</p>

<p>
<input value="aaa 123 bbb">
</p>

<p>
<input type=range>
</p>

<blockquote>
blockquote blockquote<br>
abc 123
</blockquote>

<code>
code code code
123 abc
</code>

<pre>
code code code
123 abc
</pre>

<p>
<mark>mark mark mark bark mark</mark>
</p>

<p>
<ul>
	<li>aaa</li>
	<li>bbb</li>
	<li>ccc</li>
</ul></u>


</p>

<details class=details__primary open>

<summary class=summary__primary >sumMenuHeader</summary>

<p><a href="">breadcrumb</a> &raquo; </p>

<h2><a href="">Title H2</a></h2>

<div id=divMenuHeader>
	<p><i>111 222 333 444 555</i></p>

	aaa bbb ccc ddd eee fff not in a tag

	<p>in a p tag</p>
</div>

<details class=details__secondary>
	<summary class=summary__secondary >details secondary</summary>

	<p>lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?</p>
</details>

</details>

<p>

<figure style="background-color:#ddd;display:inline-block;border: 1px solid #888;" >
	<a href=https://google.com >
		<img src="https:///picsum.photos/200/200/" >
		<figcaption>Fig1. - A view of image 1</figcaption>
	<a>
</figure>

<figure style="display:inline-block;border: 1px solid #888;" >
	<a href=https://google.com >
		<img src="https://picsum.photos/200/200/" >
		<figcaption>Fig2. A view of the caption</figcaption>
	</a>
</figure>

</p>

<div><iframe src=https://example.com  > &nbsp; </iframe></div>


`;

	return htm;

}