import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as sass from "sass";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

// Counts the words in a chunk of HTML (used for reading time).
function wordCount(html = "") {
  const text = String(html).replace(/<[^>]*>/g, " ").trim();
  return text ? text.split(/\s+/).length : 0;
}

export default function (eleventyConfig) {
  // --- Plugins ---------------------------------------------------------------
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: { name: "posts", limit: 20 },
    metadata: {
      language: "en",
      title: "Nigel Bunner",
      subtitle: "A collection of creative ideas and thoughts by Nigel Bunner",
      base: "https://www.nigelbunner.co.uk/",
      author: { name: "Nigel Bunner" },
    },
  });

  // --- Static files ----------------------------------------------------------
  // Favicons, manifest, CNAME etc. are served from the site root.
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });
  eleventyConfig.ignores.add("src/static/**");
  eleventyConfig.addPassthroughCopy("src/img");

  // --- Sass ------------------------------------------------------------------
  // Partials in src/_sass are only pulled in via @use, so keep them out of the
  // template pipeline but still rebuild when one changes.
  eleventyConfig.ignores.add("src/_sass/**");
  eleventyConfig.addWatchTarget("src/_sass/");
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile(inputContent, inputPath) {
      const result = sass.compileString(inputContent, {
        loadPaths: ["src/_sass"],
        style: "compressed",
      });
      // Tell Eleventy which partials this file uses so editing one rebuilds the CSS.
      // Sass reports file:// URLs; Eleventy matches on project-relative paths.
      this.addDependencies(
        inputPath,
        result.loadedUrls
          .filter((url) => url.protocol === "file:")
          .map((url) => path.relative(process.cwd(), fileURLToPath(url)))
      );
      return () => result.css;
    },
  });

  // --- Collections -----------------------------------------------------------
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/*")
  );
  eleventyConfig.addCollection("glossary", (api) =>
    api
      .getFilteredByGlob("src/glossary/terms/*")
      .sort((a, b) => a.data.title.localeCompare(b.data.title))
  );

  // Every HTML page, for sitemap.xml (skips the CSS file, feed, etc.).
  eleventyConfig.addCollection("sitemap", (api) =>
    api
      .getAll()
      .filter(
        (item) =>
          item.outputPath?.endsWith(".html") && !item.data.sitemapExclude
      )
  );

  // --- Filters (stand-ins for Jekyll built-ins) --------------------------------
  // Escapes text for an HTML attribute, leaving existing entities such as
  // &#8230; or &amp; alone (Liquid's escape_once misses numeric ones).
  eleventyConfig.addFilter("attr", (value = "") =>
    String(value)
      .replace(/&(?!#\d+;|#x[0-9a-f]+;|[a-z][a-z0-9]*;)/gi, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
  );
  eleventyConfig.addFilter("date_to_xmlschema", (date) =>
    new Date(date).toISOString()
  );
  eleventyConfig.addFilter("readingTime", (html = "") => {
    const minutes = Math.max(1, Math.floor(wordCount(html) / 180));
    return minutes === 1 ? "1 min read" : `${minutes} mins read`;
  });

  // Short hash for the service worker cache name. It covers the list of
  // precached URLs plus the files behind the cache-first assets (Sass sources
  // and the precached images), so the cache only changes when they do.
  eleventyConfig.addFilter("swVersion", (urls = "") => {
    const hash = createHash("sha256").update(String(urls));
    const sassFiles = ["src/css/nb-styles.scss"].concat(
      readdirSync("src/_sass").sort().map((f) => path.join("src/_sass", f))
    );
    const imageFiles = String(urls)
      .split(",")
      .filter((url) => url.startsWith("/img/"))
      .map((url) => path.join("src", url));
    for (const file of sassFiles.concat(imageFiles)) {
      hash.update(file).update(readFileSync(file));
    }
    return hash.digest("hex").slice(0, 12);
  });

  // --- Shortcodes -------------------------------------------------------------
  // Click-to-load YouTube placeholder (wired up by the script in default.html).
  eleventyConfig.addShortcode(
    "youtube",
    (id) => `<div class="youtube-container home-youtube-container embed-responsive embed-responsive-item videoPlayer" id="vid-${id}">
  <div class="homeVideoThumbnail video-player">
    <img src="https://img.youtube.com/vi/${id}/0.jpg" alt="Play YouTube video" loading="lazy">
    <svg xmlns="http://www.w3.org/2000/svg" class="video-player__btn homeVideoPlayButton" width="96" height="96" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FF3D00" d="M43.2 33.9c-.4 2.1-2.1 3.7-4.2 4-3.3.5-8.8 1.1-15 1.1-6.1 0-11.6-.6-15-1.1-2.1-.3-3.8-1.9-4.2-4C4.4 31.6 4 28.2 4 24s.4-7.6.8-9.9c.4-2.1 2.1-3.7 4.2-4 3.3-.5 8.8-1.1 15-1.1s11.6.6 15 1.1c2.1.3 3.8 1.9 4.2 4 .4 2.3.9 5.7.9 9.9-.1 4.2-.5 7.6-.9 9.9z"/><path fill="#FFF" d="M20 31V17l12 7z"/></svg>
  </div>
</div>`
  );

  // --- Template engine settings ------------------------------------------------
  // Dates in front matter have no timezone; treat them as UTC so output is stable.
  eleventyConfig.setLiquidOptions({ timezoneOffset: 0 });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
  };
}
