---
layout: page-index
currentPage: home
title: Music, design and stories by Nigel Bunner
---
<div class="home-intro">
<p>Hello, I'm a <a href="/music.html">musician</a>, <a href="/web-portfolio.html">web developer/designer</a> and <a href="/stories.html">author</a> who also takes the odd <a href="/photos.html">photograph</a>.</p>
<small>I sometimes write the odd blog post too&hellip;</small>
</div>	



{% for post in site.posts offset: 0 limit: 5 %}
<article class="post">	
	<header class="article-header"><h2><a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></h2></header>
	<div class="post-meta-top">
		<div class="date">
			<span>
				<strong>{{ post.date | date: "%b %-d, %Y" }} | </strong>
				 {% if site.reading_time %}
			        <span class="entry-reading-time">
			          <i class="fa fa-clock-o"></i>
			          {% include read-time.html %}
			        </span><!-- /.entry-reading-time -->
			        {% endif %} 
			</span>
		</div>
	</div>
	<p>{{ post.content | strip_html | truncatewords:75 }}</p>	
</article>  
{% endfor %}




