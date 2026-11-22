// Compiles every generated page with VitePress' markdown renderer + Vue's SFC compiler
// and lists the pages that would break the build (fast alternative to a full build).
import fs from "node:fs";
import path from "node:path";
import { createMarkdownRenderer } from "vitepress";
import { markdown } from "../.vitepress/markdown.mjs";
import { parse, compileTemplate } from "@vue/compiler-sfc";

const root = path.resolve(import.meta.dirname, "../.generated");
const md = await createMarkdownRenderer(root, markdown, "/", undefined);
const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    e.isDirectory() ? walk(p) : p.endsWith(".md") && files.push(p);
  }
})(root);
let bad = 0;
for (const f of files) {
  const html = md.render(
    fs.readFileSync(f, "utf8").replace(/^---[\s\S]*?\n---\n/, ""),
  );
  const { descriptor } = parse(`<template>${html}</template>`);
  const r = compileTemplate({
    source: descriptor.template.content,
    id: "x",
    filename: f,
  });
  if (r.errors.length) {
    bad++;
    const msg = r.errors[0].message ?? r.errors[0];
    const loc = r.errors[0].loc?.start;
    const ctx = loc
      ? html
          .split("\n")
          [loc.line - 1]?.slice(Math.max(0, loc.column - 60), loc.column + 40)
      : "";
    console.log(`${path.relative(root, f)}: ${msg}\n    …${ctx}…`);
  }
}
console.log(`${files.length} pages checked, ${bad} failing`);
process.exit(bad ? 1 : 0);
