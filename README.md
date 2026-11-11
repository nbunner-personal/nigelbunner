# nigelbunner.co.uk

Personal site built with [Eleventy](https://www.11ty.dev/) and deployed on Netlify.

## Commands

```sh
npm install
npm start       # dev server with live reload at http://localhost:8080
npm run build   # production build into _site/
```

## Layout

| Path | What it is |
| --- | --- |
| `src/posts/` | Blog posts. URL is `/blog/<slug>/` unless the post sets its own `permalink`. |
| `src/pages/` | Standalone pages (about, music, contact…). |
| `src/glossary/` | Glossary index (`index.md`) and terms (`terms/`). |
| `src/blog/` | Paginated blog listing and the per-tag pages. |
| `src/_layouts/`, `src/_includes/` | Liquid templates. |
| `src/_data/site.json` | Site-wide settings (title, URL, …). |
| `src/_data/blogTags.json` | Tags that get a `/blog/tag/<slug>/` page. Add new tags here. |
| `src/_sass/`, `src/css/` | Sass partials and the entry stylesheet (compiled by Eleventy). |
| `src/static/` | Copied as-is to the site root (favicons, manifest, CNAME…). |
| `src/img/` | Images. |

## Writing a post

Create `src/posts/YYYY-MM-DD-my-post.md`:

```markdown
---
title: My post
date: 2026-01-01 10:00:00
tags: [music, writing]
useVideo: true   # only if the post embeds a {% youtube "VIDEO_ID" %}
---
```

Remember to bump `staticCacheName` in `src/sw.liquid` when changing CSS.
