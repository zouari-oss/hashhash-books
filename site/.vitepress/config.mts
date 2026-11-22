import { defineConfig } from "vitepress";
import fs from "node:fs";
import path from "node:path";
import { markdown } from "./markdown.mjs";

import { loadConfig, siteRoot as here } from "../scripts/env.mjs";

const cfg = loadConfig();
const read = (f: string, fallback: unknown) => {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(here, ".generated", f), "utf8"),
    );
  } catch {
    return fallback;
  }
};
const sidebar = read("sidebar.json", {});

export default defineConfig({
  title: cfg.title,
  description: cfg.description,
  base: cfg.base,
  srcDir: ".generated",
  outDir: "dist",
  cacheDir: ".vitepress-cache",
  cleanUrls: true,
  ignoreDeadLinks: true, // dead links are reported by scripts/build-content.mjs
  head: [["link", { rel: "icon", href: `${cfg.base}logo.png` }]],
  markdown,
  vite: {
    build: {
      // The only chunks above 500 kB are lazy-loaded on demand (local search index,
      // mermaid + its elk layout engine, pdf.js) - they never block the first page load.
      chunkSizeWarningLimit: 2000,
    },
  },
  themeConfig: {
    logo: "/logo.png",
    nav: [
      { text: "Home", link: "/" },
      { text: "GitHub", link: `https://github.com/${cfg.repo}` },
    ],
    sidebar,
    search: cfg.searchEnabled
      ? { provider: "local", options: { detailedView: true } }
      : undefined,
    outline: { level: [2, 3] },
    editLink: {
      // serialized into the client bundle -> constants must be inlined (no closures)
      pattern: new Function(
        "page",
        `return ${JSON.stringify(`https://github.com/${cfg.repo}/edit/${cfg.branch}/`)} + encodeURI(page.frontmatter.source ?? '')`,
      ) as any,
      text: "Edit this page on GitHub",
    },
    socialLinks: [{ icon: "github", link: `https://github.com/${cfg.repo}` }],
    footer: {
      message: "Released under the GPL-3.0 License.",
      copyright: "© ZouariOmar",
    },
  },
});
