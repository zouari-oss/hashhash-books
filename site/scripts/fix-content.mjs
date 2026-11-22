#!/usr/bin/env node
/**
 * fix-content.mjs - rewrites Obsidian-only syntax in content/**.md to standard Markdown.
 *   node scripts/fix-content.mjs           dry run (lists the files that would change)
 *   node scripts/fix-content.mjs --write   apply   (make fix)
 */
import fs from "node:fs";
import path from "node:path";
import { loadConfig, siteRoot } from "./env.mjs";
import { convertObsidian, makeAssetResolver } from "./obsidian.mjs";

const cfg = loadConfig();
const root = path.resolve(siteRoot, cfg.contentDir);
const write = process.argv.includes("--write");
const ASSET = new Set(cfg.assetExtensions);

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else files.push(path.relative(root, p).split(path.sep).join("/"));
  }
})(root);

const resolveAsset = makeAssetResolver(
  files.filter((f) => ASSET.has(f.split(".").pop().toLowerCase())),
);
let changed = 0;
const unresolved = [];
for (const rel of files.filter((f) => f.endsWith(".md"))) {
  const abs = path.join(root, rel);
  const src = fs.readFileSync(abs, "utf8");
  const r = convertObsidian(src, { fromRel: rel, resolveAsset });
  unresolved.push(...r.unresolved);
  if (!r.changed) continue;
  changed++;
  console.log(`${write ? "fixed" : "would fix"}  ${rel}`);
  if (write) fs.writeFileSync(abs, r.text);
}
console.log(
  `${changed} file(s) ${write ? "rewritten" : "to rewrite (run with --write)"}`,
);
if (unresolved.length)
  console.log(
    `\n${unresolved.length} unresolved embed(s):\n` +
      unresolved.map((u) => "  " + u).join("\n"),
  );
