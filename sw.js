---
layout: null
---

var urlsToCache = [
    '/',
    '/css/nb-styles.css',
    '/img/nigel-walking--sm-mobile.jpg',
    '/img/nigel-walking--lg-mobile.jpg',
    '/img/nigel-walking--tablet.jpg',
    '/img/nigel-walking--desktop.jpg',
];


// Cache posts
{% for post in site.posts limit:5 %}
  urlsToCache.push("{{ post.url }}")
{% endfor %}

// Cache pages
{% for page in site.html_pages %}
  urlsToCache.push("{{ page.url }}")
{% endfor %}

var CACHE_NAME = 'nigelbunner-cache-v2';

self.addEventListener("install", function(e){
  self.skipWaiting();

  e.waitUntil(
    caches.open(staticCacheName).then(function(cache){
      return cache.addAll(filesToCache);
    })
  )
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(
        cacheNames.filter(function(cacheName){
          return cacheName.startsWith("gdad-s-river-static-")
            && cacheName != staticCacheName;
        }).map(function(cacheName){
          return caches.delete(cacheName);
        })
      )
    })
  )
});

self.addEventListener("fetch", function(e){
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  )
});