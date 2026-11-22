#!/usr/bin/env node
/**
 * lint-content.mjs - enforces the content conventions (see .github/CONTRIBUTING.md):
 *
 *   content/<topic>/                  one folder per topic, kebab-case
 *     README.md  notes.md  links.md  terms.md     topic-level documents
 *     guides/        *.md articles                 books/       *.pdf
 *     cheatsheets/   *.pdf / images                slides/      *.pptx
 *     assets/        images used by the guides     sources/     *.tex
 *     courses/       course material (free layout)
 *     <sub-topic>/   same layout, recursively
 */
import fs from "node:fs";
import path from "node:path";
import { loadConfig, siteRoot } from "./env.mjs";
import { convertObsidian, isEmptyDoc, makeAssetResolver } from "./obsidian.mjs";

const cfg = loadConfig();
const root = path.resolve(siteRoot, cfg.contentDir);
const CATEGORIES = new Set(Object.keys(cfg.categories));
const LEGACY = {
  doc: "guides",
  docs: "guides",
  pdf: "books",
  pdfs: "books",
  res: "assets",
  img: "assets",
  imgs: "assets",
  images: "assets",
  ppt: "slides",
  pptx: "slides",
  tex: "sources",
  cheatsheet: "cheatsheets",
};
const WHERE = {
  md: ["guides"], // topic-level links/notes/terms/README are allowed anywhere outside categories
  pdf: ["books", "cheatsheets"],
  pptx: ["slides"],
  ppt: ["slides"],
  tex: ["sources"],
};
const IMG = new Set(["png", "jpg", "jpeg", "gif", "svg", "webp", "avif"]);
const TOPIC_DOCS = new Set(["readme", "index", "notes", "links", "terms"]);
const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const MAX = 100 * 1024 * 1024;

const errors = [];
const warnings = [];
const allFiles = [];
const err = (p, m) => errors.push(`${path.relative(root, p)}: ${m}`);

function walk(dir, depth, ctx) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (cfg.ignore.includes(e.name)) continue;
    const p = path.join(dir, e.name);
    const lower = e.name.toLowerCase();
    if (e.isDirectory()) {
      if (ctx.free) {
        walk(p, depth + 1, ctx);
        continue;
      }
      if (!KEBAB.test(e.name))
        err(p, "folder name must be lowercase kebab-case");
      if (LEGACY[lower])
        err(p, `use "${LEGACY[lower]}/" instead of "${e.name}/"`);
      const isCat = CATEGORIES.has(e.name);
      if (isCat && depth === 0)
        err(p, "a category folder must live inside a topic folder");
      walk(p, depth + 1, {
        category: isCat ? e.name : ctx.category,
        free: e.name === "courses",
      });
      continue;
    }
    const x = path.extname(e.name).slice(1);
    const stem = x ? e.name.slice(0, -x.length - 1) : e.name;
    allFiles.push(path.relative(root, p).split(path.sep).join("/"));
    if (fs.statSync(p).size > MAX)
      err(p, "larger than 100 MB (GitHub rejects it)");
    if (ctx.free) continue;
    if (depth === 0) {
      err(p, "files must be inside a topic folder");
      continue;
    }
    if (x !== x.toLowerCase()) err(p, "extension must be lowercase");
    if (e.name !== "README.md" && !KEBAB.test(stem))
      err(p, 'file name must be lowercase kebab-case (e.g. "my-guide.pdf")');
    const lx = x.toLowerCase();
    if (IMG.has(lx)) {
      if (!["assets", "cheatsheets", "slides"].includes(ctx.category))
        err(p, 'images belong in "assets/"');
    } else if (WHERE[lx]) {
      const isTopicDoc =
        lx === "md" && !ctx.category && TOPIC_DOCS.has(stem.toLowerCase());
      if (!isTopicDoc && !WHERE[lx].includes(ctx.category))
        err(
          p,
          `.${lx} files belong in ${WHERE[lx].map((c) => c + "/").join(" or ")}`,
        );
    }
  }
}
walk(root, 0, { category: null, free: false });

// non-blocking hints (the site handles these, but they do not render on GitHub)
const resolve = makeAssetResolver(
  allFiles.filter((f) => IMG.has(f.split(".").pop().toLowerCase())),
);
for (const rel of allFiles.filter((f) => f.endsWith(".md"))) {
  const src = fs.readFileSync(path.join(root, rel), "utf8");
  if (isEmptyDoc(src))
    warnings.push(`${rel}: empty file (hidden on the website)`);
  else if (
    convertObsidian(src, { fromRel: rel, resolveAsset: resolve }).changed
  )
    warnings.push(
      `${rel}: Obsidian-only syntax - run "make fix" to convert it to standard Markdown`,
    );
}
if (warnings.length)
  console.warn(
    `${warnings.length} warning(s):\n` +
      warnings.map((w) => "  " + w).join("\n") +
      "\n",
  );

if (errors.length) {
  console.error(
    `${errors.length} convention violation(s):\n` +
      errors.map((e) => "  " + e).join("\n"),
  );
  process.exit(1);
}
console.log("content conventions OK");
