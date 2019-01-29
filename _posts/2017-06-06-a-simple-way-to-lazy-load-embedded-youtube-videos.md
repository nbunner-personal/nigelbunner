---
layout: post
title: A simple way to lazy load embedded Youtube videos
date: 2017-06-06 20:55
updated: 2019-01-28 22:00
tags: [coding,css,jquery,music,youtube]
---
Like most musicians I use embedded YouTube videos on my website. They look great, but can really slow the page down. This is especially true if you have more than one of them and is due to the [browser](/glossary/glossary_Web-Browser.html) having to download extra content from another [server](/glossary/glossary_Server.html). Not only can this affect the experience for the user but it could also have an affect on your page ranking on Google. 

Fortunately, you can get around this by replacing the video iframe with a static image of the video. The video itself is then loaded in when the user clicks on the image. You can make it look even more userfriendly by adding a play icon over the top of the static image.

This is called Lazy Loading and you can see an example of this on my [Sugardrum website](//sugardrum.com/). I use this on both the home and on the videos pages, the latter of which uses some additional code to have just the one placement for multiple embedded videos. This is then refreshed depending on which video thumbnail you click on. I'll show how that is done in another blog post, for now here's how you do the lazy loading featured on the home page.

## The HTML
Here is the HTML for our player:

```html
<section class="videos-section">
  <div class="col-cont">
    <div class="youtube-container home-youtube-container embed-responsive embed-responsive-16by9 embed-responsive-item" id="videoPlayer">
      <div class="homeVideoThumbnail home-videoplayer" id="vid-4pM6WphmRhQ"><img src="//img.youtube.com/vi/4pM6WphmRhQ/0.jpg" /></div>
      <i class="fa fa-youtube-play homeVideoPlayButton"></i>  
    </div>
    <p class="col-xs-12">Postcard (Official Video) by Sugardrum</p>
  </div>
</section>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
  <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>  
```

First there is a div with some classes on it which set up the styling. Inside this is another div with two classes; one called *home-videplayer* which does some additional styling and another called *homeVideoThumbnail* which is used by the jQuery. This matches with the naming conventions I recommended in my blog post about [CSS styling tips](/blog/2015/12/09/some-css-style-naming-and-layout-tips/), where I suggest using camelCase names just for classes used by jQuery.

Then there is an image. The url for this is a link to the image Youtube uses for it's own thumbnails for your video. There are 4 featured images available for each video. To get the image for your video just add your Youtube ID to the url and the number of the thumbnail from 0  - 3 at the end, i.e.

```html
https://img.youtube.com/vi/<insert-youtube-video-id-here>/0.jpg
```

So in my example I've added the ID of the video, which is *4pM6WphmRhQ* and selected the first thumbnail which is named *0*. 
 
You may have noticed that this div also has an id with the video id as part of it. This is used by the jQuery to add the correct YouTube ID into the URL for the iframe.

Finally, there is an *i tag*. This is a Fontawesome video player play icon that is positioned over the top of the image to make it look more like a video. I've included the link and script tags to load in Fontawesome and jQuery but you should check the [Fontawesome website](https://fontawesome.io/get-started/) for the latest version, which at the time of writing this (January 2019) is version 5.6.3.


## The CSS
Here is the CSS used to style this:

```css
.col-cont {margin: 0 auto; max-width: 640px;}
.home-youtube-container {cursor: pointer;  position: relative;}  
.home-youtube-container img {max-height: 360px; max-width: 640px; width: 100%;}
.home-youtube-container i {color: #fff; font-size: 72px; left: 50%; margin: -33px 0 0 -31px; position: absolute; text-shadow: 0 0 8px rgba(0, 0, 0, .5); top: 50%;}
.embed-responsive {height: 0;}
.embed-responsive-16by9 {padding-bottom: 56.25%;}
.embed-responsive iframe {border: 0; bottom: 0; height: 100%; position: absolute; left: 0; top: 0; width: 100%;}
```

and a media query for slightly larger screens:

```css
@media only screen and (min-width: 481px) {
	.home-youtube-container img {max-height: 360px; max-width: 640px;}
}
```

This adds a cursor to the container and gives it a relative position so we can position the play icon in the middle. It also sets the width of the image inside the container, which is the video thumbnail, to 100% but with a maximum setting for both height and width. The height is set to auto by default so there's no need to set this in our CSS. The code inside the media query increases the maximum settings for height and width for the slightly larger screen. This is the largest our video will be but you could set this to be larger if you wanted to and if your video was a high enough resolution.

The other classes are part of the Bootstrap responsive embed code which I won't go to here as they aren't required for the lazy loading of the video but they help keep the image and video looking right at different screen sizes. 

## The jQuery
Then we have the jQuery.

```javascript
$(document).ready(function($) {
  $('.homeVideoThumbnail').click(function(){
    var id = $(this).attr('id').replace('vid-', '');
    var title = $(this).children("span").html();
    var descrip = $(this).children("em").html();                       
    var vid = '<iframe src="//www.youtube.com/embed/' + id + '?autoplay=1" width="560" height="315" frameborder="0" allowfullscreen></iframe>';            
    if (typeof title != 'undefined') {
        var vid = vid + '<p>' + title + ' &mdash; <em>' + descrip + '</p>';
    }
    $('#videoPlayer').html(vid);    
  });
  $('.homeVideoPlayButton').click(function(){
      $('.homeVideoThumbnail').click();
  });  
});
```

A click event is added to the div with the class name .homeVideoThumbnail. Then we set some variables.
- *id* is the YouTube video ID and is obtained from the ID of the container div we clicked on with the the vid- part removed. This was added as CSS class names cannot start with a number and Youtube Video IDs usually start with one.
- *title* is the name of the video and is taken from the span that follows this div
- The description for the video is also taken from a child element, this time em.
- Then we have the html that is inserted into our HTML page. This consists of the standard iframe code that Youtube supplies for embedding videos with our video ID.
- Below this we display the title and description of the video if we have one.
- The following code then replaces the contents of the container with the id videoPlayer with our iframe html.

```javascript
$('#videoPlayer').html(vid);
```

## Making the play icon work
There's one last step. At the moment clicking on the play icon won't actually do anything as our click event is linked to its parent div with the class homeVideoThumbnail. As the play icon is positioned absolutely above this it obscures the div and so clicking on it does nothing. To fix this we need to add one more piece of jQuery code.

```javascript
$('.homeVideoPlayButton').click(function(){
    $('.homeVideoThumbnail').click();
});
```
   
This creates a click event on the parent div when a click is made on the play button.

And that's it. Some fairly simple jQuery code to lazy load your Embedded Youtube videos.

## Demo
See the [Sugardrum homepage](//sugardrum.com/) for an example of this in action.

**Updated** January 2019 with new Fontawesome link tag for their CDN.

		
