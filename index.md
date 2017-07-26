---
layout: page-index
currentPage: home
title: Music, design and stories by Nigel Bunner
---
<div class="home-intro">
<div>Hello, I'm a <a href="/music.html">musician</a>, <a href="/web-portfolio.html">web developer/designer</a> and <a href="/stories.html">author</a> who also takes the occasional <a href="/photos.html">photograph</a>.</div>
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
			          <span class="reading-time" title="Estimated read time">
					  {% assign words = post.content | number_of_words %}
					  {% if words < 360 %}
					    1 min read
					  {% else %}
					    {{ words | divided_by:180 }} mins read
					  {% endif %}
				 </span>
			        </span><!-- /.entry-reading-time -->
			        {% endif %} 
			</span>
		</div>
	</div>
	<p>{{ post.content | strip_html | truncatewords:75 }}</p>	
</article>  
{% endfor %}




