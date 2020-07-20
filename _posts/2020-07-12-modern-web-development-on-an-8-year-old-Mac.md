---
title: Modern web development on an 8 year old Mac
layout: post
date: 2020-07-12 20:00
tags: []
useVideo: false
description: Is it really possible to do modern web development on an 8 year old Mac? read on to find out the pros and cons of such a setup. 
--- 

There’s a question that often gets asked on computer and web development forums.  Is the current, cheapest Mac laptop going to be powerful enough for web development? Usually the computer in question is something like the 2019 MacBook Air. 

Common questions include:

- Will the base i5 processor will be fast enough or should they move up to the top spec i9? 
- Do they need more than 8gb of ram and a 1tb SSD? 
- Will the 13” Retina screen be big enough?

Whenever I see one of these questions I smile, and glance down at the computer I use to do my web development on. It’s a base 11” MacBook Air with 8gb Ram, an i5 processor and a 500gb SSD. Oh and it’s from 2012, that’s 8 years old at the time of writing. And yes, it is perfectly capable of doing the job. 

Just to clarify things a little, here’s a breakdown of the sort of tasks I use it for. 

Caveat: this article is Mac OS based as that’s what I use. The general principle of using an older computer for web development may apply equally well to Windows, Linux etc. 


## Web development 
Most of my web development work for my personal sites is done in NodeJS. For this my old laptop is perfectly fine. It’s not until you start building really large sites with tens of thousands of pages that you start to need something more powerful. 

I also used to build sites in both Wordpress and basic PHP, and the laptop was fine for this too. 

### Browsers
My web browser of choice for web development is usually either Firefox or Chrome. 

Why? I just prefer the development tools that come with them compared to those in Safari. I do use Safari, just mainly for non work related browsing and for double checking websites display properly. 

The only time my laptop starts to slow down is if I have multiple browsers open and am running memory intensive apps in them such as [Codesandbox](https://codesandbox.io/). This is one of those times when the 8gb of memory starts to become a problem. 

### IDE
I use either [Sublime Text](https://www.sublimetext.com) or [VS Code](https://code.visualstudio.com). I do notice VS Code runs a little slower than Sublime Text at times. There’s the occasional pause every now and then, but it’s not enough to disrupt my general workflow. 

## Graphics
I usually deal with simple graphics such as touching up photos, resizing images, creating SVGs or creating a multi layered mockup. For this I either use the original version of [Pixelmator](http://pixelmator.com), [Affinity Photo](https://affinity.serif.com/en-gb/photo/) or [Affinity Designer](https://affinity.serif.com/en-gb/designer/). As I do all of this at 72dpi the 8Gb of RAM is plenty. If I was doing higher resolution photo or video work then I can imagine I would need more RAM. 

I have also made a few music videos using Final Cut. This obviously wasn’t as fluid to work with as a faster machine and the render took a while to complete but it was perfectly usable and got the job done ok. 

## What this is not good at
So that’s a break down on what works well. Now, here’s a list of tasks that don’t work quite so well. 

### Very large sites involving a multi platform setup
There are a few use cases where I wouldn’t recommend using a laptop as old and as underpowered as this. One of those are when you are working on really large websites. For my day job, one of the sites I work on in development has a PHP based API backend running in Docker. This has a Redis Cache that uses several Gb of memory. On top of this I have the front end NuxtJS codebase running in development mode. This is a large site consisting of over 100,000 pages. 

I also work on another large React based site that also has a PHP backend running in a Docker container. 

Developing sites like these can eat away at your Macs memory so it could be slow going working with just 8Gb of ram.

For reference my work laptop is a 2019 15” i7 MacBook Pro with 32Gb of ram. 

## Screen size - use an external monitor
The 11” non retina screen doesn’t prove to be too much of a problem for me, but it may be for some. Sure, it isn’t as clear or as large as my work laptop. But I learned web development many years ago on an old 12” iBook which seemed ok at the time. I find I just adjust how I work to whatever screen size is in front of me. 

That said, I usually plug whatever laptop I’m working on into a 32” external monitor. This is non Retina, but large enough to allow me to view my IDE on one side of the screen and a web browser on the other. 

When I’m working on just the laptop screen I run each app using the full width of the smaller screen and switch between apps using command tab. 

## Future MacOS support
One thing to note is that Apple has followed a pattern in the last couple of years where they have dropped support for Macs over 7 years old. That means that I won’t be able to upgrade to [Mac OS Big Sur](https://www.apple.com/macos/big-sur-preview/) when it comes out later in the year. 

This affects hardware support too, so If something goes wrong with the hardware then I’ll need to take it to a 3rd party supplier to be fixed instead of Apple. 

That’s not too big an issue as it will still receive security updates for a number of years to come, just something to bear in mind. 

There’s a list on [9to5mac](https://9to5mac.com/2020/06/22/macos-big-sur-compatible-macs/) showing which Macs will run MacOS Big Sur

## Summary
Modern macs are so powerful these days that even the basic model can be fine for developing simple websites. When I say modern, this may also include those from a few years ago. There’s really no need to spend thousands of pounds on the latest Mac just to code up small Wordpress or Node based websites. Save some money and get something second hand instead. 

Just make sure you have at least 8Gb of ram and an SSD instead of a spinning hard drive. Retina screens are nice but you can get by without and use the money saved on a much larger external monitor instead. 




