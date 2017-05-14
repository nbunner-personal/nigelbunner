---
layout: post
title: Lazy loading embedded Youtube videos
date: 2017-05-10 04:36
---
Like most musicians I use embedded YouTube videos on my website. They look great, but can really slow page load times down. This is especially true if you have more than one of them. Not only can this affect the experience for the user but it could also have an effect on your page ranking on Google. 

Fortunately you can get around this by replacing the static video with a static image and only loading in the video when the user clicks on the image. You can make it look even more userfirendly by adding a play icon over the top of the static image.

This is called Lazy Loading and you can see an example of this on my Sugardrum website. I use this on both the homepage and on the videos page which uses some additional code to have just the one placement for multiple embedded videos which is then refreshed depending on which video thumbnail you click on. I'll show how that is done in another blog post, for now here's how you do the lazy loading featured on the homepage.

## The HTML

Here is the HTML for our player:

{% highlight ruby linenos %}
<div class="youtube-container home-youtube-container embed-responsive embed-responsive-16by9 embed-responsive-item" id="videoPlayer">
	<div class="homeVideoThumbnail home-videoplayer" id="vid-4pM6WphmRhQ">
		<img src="http://img.youtube.com/vi/4pM6WphmRhQ/0.jpg" />
	</div>
	<i class="fa fa-play-circle-o homeVideoPlayButton"></i>	
</div>
{% endhighlight %}

First there is a div with some classes on it which sets up the styling. Inside this in another div with two classes; one called *home-videplayer* which does some additional styling and another called *homeVideoThumbnail* which is used by the jQuery. This matches with the naming conventions I recommened in my blog post about CSS styling tips, where I suggest using camelCase names just for jQuery.

Then there is an image. This is a url on the youtube site which allows you to grab the featured image thumbnail of your video. There are 4 featured images available for each video. To get the image for your video just add your Youtube ID to the url and the number of the thumbnail from 0  - 3 at the end, i.e.

`https://img.youtube.com/vi/<insert-youtube-video-id-here>/0.jpg`

So in my example I've added the ID of the video, which is *4pM6WphmRhQ* and selected the first thumanil which is named *0*. 
 
You may have noticed that this div also has an id with the video id  as part of it. This is used by the jQuery to add the correct YouTube ID into the URL for the iframe.

Finally there is an <i> tag. This is a Fontawesome video player play icon  that is positioned over the top of the image to make it look more like a video. 


## The CSS
Here is the CSS use to style this - note the example is code in SCSS/LESS which allows you to nest styles, making it easier to read:

`.home-youtube-container {
	cursor: pointer; position: relative;
	img {max-height: 315px; width: 100%;}
	i {color: #fff; font-size: 72px; left: 50%; margin: -33px 0 0 -31px; position: absolute; text-shadow: 0 0 8px rgba(0, 0, 0, .5); top: 50%;}
}`

and a media query for slightly larger screens:

`@media only screen and (min-width: 481px) {
	.home-youtube-container {
		img {max-height: 360px; max-width: 640px;}
	}
`

This adds a cursor to the container and gives it a relative position so we can position the play icon in the middle. It also sets the width of the image inside the container, which is the video thumbnail, to 100% but with a max setting for both height and width. The height is set to auto by default so there's no need to set this in our CSS. The code inside the media query increases the maximum settings for height and width for the slightly larger screen. This is the largest our video will be but you could set this to be larger if you watned to and if your video was high enough resolution.

The other classes are part of the Botstrap responsive embed code which I won't go to here as they aren't required for the lazy loading of the video. 


## The jQuery
Then we have the jQuery.

`$(document).ready(function($) {
$('.homeVideoThumbnail').click(function(){
            var id = $(this).attr('id').replace('vid-', '');
            var title = $(this).children("span").html();
            var descrip = $(this).children("em").html();                        
            var vid = '<iframe src="http://www.youtube.com/embed/' + id + '?autoplay=1" width="560" height="315" frameborder="0" allowfullscreen></iframe>';            
            if (typeof title != 'undefined') {
                var vid = vid + '<p>' + title + ' &mdash; <em>' + descrip + '</p>';
            }
            $('#videoPlayer').html(vid);
            // $("html, body").animate({ scrollTop: 110 }, 600);        
    });
    }`
   
   
   A click event is added to the div with the class name .homeVideoThumbnail.
    Then we set some variables.
    - id is the YouTube video ID and is obtained from the ID of the container div we clicked on and then removing the vid-. This was added as CSS class names cannot start with a number and Yourube Video IDs usually do start with one.
    - title is the name of the video and is taken from the span that follows this div
    - The description for the video is also taken from a child element, this time em.
    - Then we have the html that is inserted into our HTML page. This consists of the standard iframe code that Youtube supplies for embedding video with our video ID.
    - Below this we display the title and description of the video if we have one.
    - The following code then replaces the contents of the container with the id videoPlayer with our iframe html.

`$('#videoPlayer').html(vid);`

## Making the play icon work
There's one last step. At the moment clicking on the play icon won't actually do anything as our click event is linked to its parent div with the class homeVideoThumbnail. As the play icon is position absolutely above this it obscures the div and so clicking on it does nothing. To fix this we need to add one more piece of jQuery code.

`  	$('.homeVideoPlayButton').click(function(){
        $('.homeVideoThumbnail').click();
    });`
    
This creates a click event on the parent div when a click is made ont he play button.

And that's it. Some fairly simple jQuery code to lazy load your Embedded Youtube videos.

		
