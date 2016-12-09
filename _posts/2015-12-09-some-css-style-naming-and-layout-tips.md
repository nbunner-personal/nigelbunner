---
id: 395
title: Some CSS style naming and layout tips
date: 2015-12-09 18:11:58 +00:00
author: Nigel
layout: post
guid: http://www.nigelbunner.co.uk/?p=395
permalink: /blog/2015/12/09/some-css-style-naming-and-layout-tips/
---
After doing CSS development work for a number of years there&#8217;s a few little tips that I&#8217;ve picked up that I thought it might be helpful to pass on.

## List the styles alphabetically

I saw this tip listed on another website a few years ago and have been doing this myself ever since. It makes it so much easier to quickly scan across and see which styles you have used. Here&#8217;s an example of what I mean:

`.container {color: #fff; background: red; padding: 5px; margin: 1.5em 0;}`

becomes

`.container {background: red; color: #fff; margin: 1.5em 0; padding: 5px;}`

## Use a different naming convention for class names used by JavaScript and keep them exclusive

I learnt this after working on larger websites and changing a class name in the HTML only to find this broke the JavaScript. It&#8217;s sometimes tricky to know if changing a class name would do this. 

Using a different naming convention for classnames that are going to be used by the Javascript helps avoids this confusion. Here&#8217;s what I mean:

.btn-top or .btn_top for CSS only

.btnTop for JavaScript only

Doing this means you always know if a class name in the HTML is used by the CSS or the JavaScript. The same holds true for ID&#8217;s too although I try not to use them at all if possible.

Which brings me on to my final tip&#8230;

## Use a &#8211; instead of a _ in between words in class names and IDs

This becomes really useful when you use the keyboard to navigate around your code; the cursor always stops at a &#8211; which makes it so much easier if you want to change one of the words in the middle of a class and or ID. Using a _ instead would means the cursor keys take you to the end of the class name as it just treats _ the same as a letter.