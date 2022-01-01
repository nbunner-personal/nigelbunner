---
title: Little Music List - a music recommendation site
layout: post
date: 2021-12-14 20:00
tags: []
useVideo: false
description: How I created a music recomendation site using Sanity and Eleventy.
--- 

I recently finished creating a new website. It's a music recommendation site called [Little Music List](https://www.littlemusiclist.com). The genesis of the site began from a list I've been creating on my phone. 

I listen to music all the time, mostly on BBC 6music. When I hear a song I like I use a [Drafts.app action](https://forums.getdrafts.com/t/using-dropbox-with-drafts/20) to add it to a markdown list inside Dropbox. 

The list has been growing over the years so I decided to make a website from it. At first I thought it would be good to take one song from either end of the list. But the songs I chose like this ended not sounding right when placed together. So I looked for songs on the list that would compliment each other, not in a songs that sound like each other way, but more like how songs follow each other as part of a playlist. That's when I came up with the idea of making a song recommendation  website with the tagline "if you like this song, you might like this one too"

The site is built using [Eleventy](https://www.11ty.dev/). It's all standard HTML  generated from Nunjucks templates. I’ve used big JavaScript frameworks such as GatsbyJS and NextJS before on other projects, but for this I wanted something less complicated that produced a fast loading site without the large Javascript files those other Static Site Generators produce. The only JavaScript on the site is a small piece of inline code in the footer that allows me to [lazy load the YouTube videos](https://www.nigelbunner.co.uk/blog/a-simple-way-to-lazy-load-embedded-youtube-videos-using-vanilla-javascript/) by displaying the default image for that video instead of the iframe. The image is replaced with the iframe when the user clicks on the image. 

For each video added to Youtube there are a set of preview images at different sizes you can access via a simple URL. You just add the Video ID into the URL and then choose the size of the image by using a number from 0 to 3 for the filename,  where 0 is the largest.

e.g. 

```
https://img.youtube.com/vi/xMDwqeFQuKg/0.jpg
```

Eleventy produces a pretty good Lighthouse score out of the box without any extra optimisations. 

![Lighthouse score](/img/posts/little-music-list-lighthouse.jpg)

The backend runs on [Sanity](https://www.sanity.io/). I've used this before in another project and found it so simple and yet powerful to work with that I knew I wanted to manage this website using it. It takes a bit of setting up at first but once the site grows larger I know I'm going to grateful for the better user experience it provides. I use the same YouTube preview image url to grab the preview image for the video. Within the Sanity Studio CMS I have also given myself the option of using an image directly uploaded to Sanity in case the default YouTube one is unsuitable. Whatever source image is used is transformed to both an optimised WebP and JPEG by the [Eleventy Image](https://www.11ty.dev/docs/plugins/image/) plug-in. 

I plan to add some more functionality to the site in the future such as links to related posts at the bottom of each post. I’ll also need to add pagination at some point before the homepage becomes too unwieldy. Pagination is incredibly simple to add with Eleventy and I’ve already started categorising the posts in Sanity in anticipation of adding related posts. 

I’m really happy with the result. It amazes me how a powerful setup like this can be made so easily and for pretty much no cost. 




