---
layout: page-index
currentPage: home
title: Music, design and stories by Nigel Bunner
---

{% for post in site.posts offset: 0 limit: 5 %}

<article class="post">	
	<header class="article-header"><h2><a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></h2></header>
	<div class="post-meta-top">
		<div class="date">
			<span>
				<strong>{{ post.date | date: "%b %-d, %Y" }} | </strong>
				 {% if site.reading_time %}
			        <span class="entry-reading-time">
			          <svg width="15" height="15" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1024 544v448q0 14-9 23t-23 9h-320q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h224v-352q0-14 9-23t23-9h64q14 0 23 9t9 23zm416 352q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/></svg>
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
	<p>{{ post.content | strip_html | truncatewords:75 }}&hellip; <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">Read more</a></p>	
</article>  
{% endfor %}

<footer class="footer footer--post">  
  <p><a href="/blog/page/2/">View more posts...</a></p>
</footer>
