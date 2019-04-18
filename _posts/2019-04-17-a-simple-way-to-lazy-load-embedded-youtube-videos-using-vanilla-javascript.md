---
title: A simple way to lazy load embedded YouTube videos using vanilla Javascript
layout: post
date: 2019-04-17 21:00
tags: [coding,css,javascript,music,youtube]
useVideo: true
description: Using vanilla Javascript to lazy load embedded YouTube videos
---
A couple of years ago I wrote an [article](/blog/a-simple-way-to-lazy-load-embedded-youtube-videos/) about how to use lazy loading on YouTube videos. It's the code I use for the videos on my Sugardrum music site and I went to reference from it myself when I needed a similar solution for the videos on this site. 

Only thing is that the example is done using jQuery, but I don't use jQuery on this site. I use hardly any JavaScript at all except for the code used to toggle the main menu on mobile devices and setting up the service worker for the progressive web app version of the site. So I needed another solution. I ended up coding it up myself using vanilla JavaScript and thought I'd share it here in case anyone else found it useful.

To recap, lazy loading of videos is a technique where you replace a video on your site with a static image. This is faster for the browser to load due to its smaller file size than the video hence making the overall initial page load faster. This is especially useful when you multiple videos on a page. Clicking on the image then swaps it for the video.  

## The HTML
Here is the HTML for our player:

```html
<div class="youtube-container home-youtube-container embed-responsive embed-responsive-16by9 embed-responsive-item videoPlayer" id="vid-ijo0I2xD9gM">
  <div class="homeVideoThumbnail video-player">
    <img src="//img.youtube.com/vi/ijo0I2xD9gM/0.jpg" alt="YouTube video" />
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" class="video-player__btn homeVideoPlayButton"
    width="96" height="96" viewBox="0 0 48 48" 
    style=" fill:#000000;"><g><path style=" fill:#FF3D00;" d="M 43.199219 33.898438 C 42.800781 36 41.101563 37.601563 39 37.898438 C 35.699219 38.398438 30.199219 39 24 39 C 17.898438 39 12.398438 38.398438 9 37.898438 C 6.898438 37.601563 5.199219 36 4.800781 33.898438 C 4.398438 31.601563 4 28.199219 4 24 C 4 19.800781 4.398438 16.398438 4.800781 14.101563 C 5.199219 12 6.898438 10.398438 9 10.101563 C 12.300781 9.601563 17.800781 9 24 9 C 30.199219 9 35.601563 9.601563 39 10.101563 C 41.101563 10.398438 42.800781 12 43.199219 14.101563 C 43.601563 16.398438 44.101563 19.800781 44.101563 24 C 44 28.199219 43.601563 31.601563 43.199219 33.898438 Z "></path><path style=" fill:#FFFFFF;" d="M 20 31 L 20 17 L 32 24 Z "></path></g></svg>
  </div>  
</div>
```

The first div is container with some classes that set the styling. This also has an id containing the id of the video which is used by the Javascript . Then there is another div and inside this is an image. For every video on their site, Youtube generates a set of 4 thumbnails - 1 large and 3 small. These are named with the numbers 0 to 3 with 0 being the largest and the other smaller thumbnails featuring different scenes from the video. 

Every video also has an id which yo can obtain from the url in your browser when you are watching it. i.e.

```html
https://www.youtube.com/watch?v=ijo0I2xD9gM
```

In this case the id is:

```html
ijo0I2xD9gM
```

We pass this id via the id of the container in the html, with the prefix vid- added to it.

Then we have a SVG icon. In my previous article I used a Fontawesome. This is still perfectly ok  if you prefer but if you don’t already use Fontawesome, or have no need to use any of its other icons on your site then the SVG is, in my opinion the best option. This particular icon is the same as the play button on Youtube videos and is positioned on top of and in the centre of the photo using the CSS code.

## The CSS
Here is the CSS used to style the youtube image before the video is loaded:

```css
.embed-responsive {
  display: block;
  height: 0;
  padding: 0;  
}
.embed-responsive .embed-responsive-item,
.embed-responsive iframe,
.embed-responsive embed,
.embed-responsive object,
.embed-responsive video {
  border: 0;
  bottom: 0;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  
}
.embed-responsive-16by9 {
  margin-bottom: 30px;
  padding-bottom: 56.25%;  
}
.video-player {
  max-width: 640px;
  position: relative;
}
.video-player__btn {
  color: #fff; 
  font-size: 72px; 
  left: 50%; 
  margin: -33px 0 0 -44px; 
  position: absolute; 
  text-shadow: 0 1px 1px #4ab4d7; 
  top: 50%;}
```

There isn’t much going on here except for the some styling to make sure the iFrame remains responsive, a max-width setting on the container so the image doesn’t become larger than its default size and positioning the play button over the top and in the centre of the video image.

You could also position the play button using flex box but this would involve changing the video image so it’s a background on the container div the play button is in. I may change this in the future when I have time.

## The Javascript
Here’s the Javascript. Remember, this is just Vanilla Javascript which means there’s no need to load in jQuery, or any other dependancies.

```javascript
const v = document.getElementsByClassName('videoPlayer');
    function updateVideo() {                
        const id = this.id.replace('vid-','');
        this.innerHTML = 
            '<iframe src="//www.youtube.com/embed/' 
            + id 
            + '?autoplay=1" width="560" height="315" frameborder="0" allowfullscreen></iframe>';
        }           
        for (i = 0; i < v.length; i++) {
            v[i].addEventListener("click", updateVideo);
        }
```

First we define a constant, v that get’s all the elements containing the classname videoPlayer. This allows us to have multiple videos on the same page. Note that I use camelCase for the class name keeping line with my recommendtions on a previous blog post about using this for CSS classnames associated with Javascript - [Some CSS style naming and layout tips.](/blog/2015/12/09/some-css-style-naming-and-layout-tips/)

Then there’s a function that is run when the user clicks on the video image. This does the following: 

We get the id of each of these elements and create a new const called id with the vid- part removed. The reason I added the vid- in the first place was that ids and classnames in CSS cannot begin with a number and there’s no guarantee the id of our video won’t begin with one.

Then we replace the content of this element with the code for the video player. This is the standard iframe code usually used for embedding YouTube videos. To this we add the id of the video to the src of the iframe. I’ve set the width and height to common values but feel free to change these if you wish them to be different. Remember the CSS code makes sure the initial image of the video fits on  devices with smaller screens such as mobile phones . It also makes sure it never becomes larger than 640px across. Feel free to change this if you wish the initial image to be larger,  but be sure to test this to make sure the image is large enough for the chosen maximum size.

Finally we add a click event to all of the elements we found at the start of the code with the classname videoPlayer which runs the function and all the code explained above when the user clicks on the relevant element.

## Bonus tips: how I use this with Jekyll
I use a Static Site Generator (SSG)  called Jekyll to generate the code on this site. Here’s how I set up the lazy loading for Jekyll.

I created an include file called youtube-static-image.html for the html. In here I replaced the video id in both places where it is used with a variable that is passed in, i.e.

{% raw %}
```html
<div class="youtube-container home-youtube-container embed-responsive embed-responsive-16by9 embed-responsive-item videoPlayer" id="vid-{{ include.youtubeId }}">
```
{% endraw %}

In my blog post I then include this file using the following code:

{% raw %}
```liquid
{% include youtube-static-image.html youtubeId="zSIDRHUWlVo" %}
```
{% endraw %}

Where the value for *youtubeId* is the id of the chosen youtube video. 

I also pass in a variable in the YAML front matter of the post indicating that it has videos .

```yaml
useVideo: true
```

 As I use hardly any Javascript on this site I simply load it inline towards the bottom of the html.  In my default layout file I added an if statement to only load the youtube lazy loading Javascript code if the *useVideo* variable is present. 

{% raw %}
```liquid
{% if page.useVideo == true %}
< javascript code goes here >
{% endif %}
```
{% endraw %}

## Demo
You can see an example of this code below and on my recent blog post about running technique - [A simple guide to good running form](/blog/a-simple-guide-to-good-running-form/). 

If you like the music in the video below feel free to download the album and share it using the links on my [Sugardrum website](https://sugardrum.com/listen/).

{% include youtube-static-image.html youtubeId="ijo0I2xD9gM" %}
*Bubbleclouds by Sugardrum. From the album Postcards, available to stream from <a href="https://itunes.apple.com/gb/album/postcards/id1081336392" target="_blank">Apple Music</a>, <a href="//open.spotify.com/album/3SowuTWPQwJf2ndygPUfUv" target="_blank">Spotify</a> and download/buy from [Bandcamp](https://sugardrum.bandcamp.com/album/postcards)*
