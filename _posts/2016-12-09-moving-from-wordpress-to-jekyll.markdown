---
layout: post
title: Moving From Wordpress To Jekyll
date: 2016-12-09 23:17
permalink: /blog/2016/12/09/moving-from-wordpress-to-jekyll/
---

Wow, it's been exactly a year since I last updated this website. Much has happened since then, including changing how this site is created. It used to be powered by Wordpress but now I'm using a static website generator called Jekyll.

## Advantages of moving from Wordpress to Jekyll
- No more plugin and security updates to worry about.
- No more security plugins to maintain.
- No more faffing around keeping a local copy of the [database](/glossary/glossary_database.html) as a backup and to use for development, as there is no database.
- Whilst on the subject of databases no more having to search and replace hard coded links in the database export to be used locally, i.e. Wordpress saves links as `http://www.nigelbunner.co.uk/link.html` instead of `/link.html` which makes it a pain when you need to change the first part to be used in a local dev environment such as `www.nigelbunner-dev.co.uk`
- Jekyll generates static HTML files from the templates I setup so the site loads much, much faster.
- I can now host it on Amazon S3 or Github Pages which are both faster and much cheaper.
- Everything is stored in a Github repository which means I now have version control. This makes it easier to roll back any edits if I need to and keep a track of updates.
- Did I mention it loads way faster? :)

## Disadvantages
And the disadvantages? Well there is no [CMS](/glossary/glossary_CMS.html) as such - all the post and pages are created using a text editor in the form of Markdown or HTML templates, which are then used by Jekyll to generate the static HTML pages. I can, however create and edit the content via the Github Pages admin and I'm going to investgate using a simple online CMS called [Prose](http://prose.io/) written especially for Jekyll.

## Third times a charm
This is the 3rd site I've converted to Jekyll and I can feel myself becoming more confident now I've done so a couple of times already. The 1st site was my music website at <http://www.sugardrum.com> which I did earlier in the year. The 2nd was a little website I created way back in 2008 - <http://www.amnestyfreedomfestival.org>. This was for a festival I helped to organise and took part in. It's so old that pretty much nobody ever looks at it any more, so was the perfect site to experiment on without causing too much disruption. It also was only 4 pages in size and was put together using [PHP](/glossary/glossary_PHP.html) templates, so was also pretty simple to move to Jekyll. 

## Replacing Bones with Twitter Bootstrap
When this site was on Wordpress I used a  fantastic starter theme called [Bones](http://themble.com/bones/) as a starter to build the rest of the design on. This was great as it improved upon the basic Wordpress install by removing some of the bloat, adding its own grid system for [CSS](/glossary/glossary_CSS.html) layout, setingup some nice typography defaults to work with and creating a set of useful break points to make your design Adaptive. I used the same theme as a starter for my Sugardrum website and just left the CSS and [JavaScript](/glossary/glossary_JavaScript.html) as is when I copied it over to use Jekyll. For this site however, I decided to spend the time removing the existing CSS and startfrom scratch. There was a fair amount of code in the Bones style sheets I knew I'd never need, such as styling for Wordpress comments. This all ended up taking less time than I thought as I used [Bootstrap](http://getbootstrap.com/) instead, changed the layout to use the Bootstrap grid, nav and pagination and then created a new style sheet with the few bits of code required for the rest of the old design. The end result was much cleaner and smaller CSS code. 

## Some useful links
If you're thinking of using Jekyll for a website yourself, here are links to some of the sites I used to help me:

- <https://jekyllrb.com>
- <https://danielgroves.net/notebook/2013/05/goodbye-wordpress-hello-jekyll>
- <http://nicolashery.com/fast-mobile-friendly-website-with-jekyll/>
- <http://deanattali.com/2015/03/12/beautiful-jekyll-how-to-build-a-site-in-minutes/>
- <http://blog.8thcolor.com/en/2014/05/migrate-from-wordpress/>
- <https://paulstamatiou.com/how-to-wordpress-to-jekyll/>
- <https://mademistakes.com/articles/using-jekyll-2016/>
