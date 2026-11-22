/**
 * obsidian.mjs - converts Obsidian-only Markdown to standard Markdown (GitHub + VitePress safe).
 * Used by the site generator (so new notes written in Obsidian just work) and by
 * `make fix` / scripts/fix-content.mjs (to rewrite the files on disk).
 *
 *   ![[Pasted image 1.png]]        ->  ![Pasted image 1](assets/pasted-image-1.png)
 *   ![[diagram.png|300]]           ->  <img src="assets/diagram.png" alt="diagram" width="300">
 *   ==highlighted==                ->  <mark>highlighted</mark>
 *   > [!INFO] / [!SUCCESS] / ...   ->  > [!NOTE] / [!TIP] / ...   (GitHub alert types)
 */
import path from "node:path";

const IMG = /\.(png|jpe?g|gif|svg|webp|avif)$/i;

/** same normalisation as the migration / generator slugs */
export const slugName = (s) =>
  s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/c\+\+/g, "cpp")
    .replace(/&/g, " and ")
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Build a resolver: (name, fromRel) -> path relative to fromRel's folder, or null. */
export function makeAssetResolver(assetRels) {
  const bySlug = new Map();
  for (const rel of assetRels) {
    const base = path.posix.basename(rel);
    const key =
      slugName(base.replace(/\.[^.]+$/, "")) +
      "." +
      base.split(".").pop().toLowerCase();
    if (!bySlug.has(key)) bySlug.set(key, []);
    bySlug.get(key).push(rel);
  }
  return (name, fromRel) => {
    const m = path.posix.basename(name).match(/^(.*)\.([^.]+)$/);
    if (!m) return null;
    const ext = m[2].toLowerCase();
    const slug = slugName(m[1]);
    let cands = bySlug.get(slug + "." + ext);
    if (!cands) {
      // typo'd embeds ("imgPasted image 1.png"): accept a known asset whose name is a suffix
      const key = [...bySlug.keys()].find(
        (k) =>
          k.endsWith("." + ext) &&
          k.length > 12 &&
          slug.endsWith(k.slice(0, -ext.length - 1)),
      );
      cands = key && bySlug.get(key);
    }
    if (!cands) return null;
    const dir = path.posix.dirname(fromRel);
    const shared = (c) => {
      const a = c.split("/"),
        b = dir.split("/");
      let i = 0;
      while (i < a.length - 1 && a[i] === b[i]) i++;
      return i;
    };
    const best = [...cands].sort((x, y) => shared(y) - shared(x))[0];
    const rel = path.posix.relative(dir === "." ? "" : dir, best);
    return rel.startsWith(".") ? rel : "./" + rel;
  };
}

const ALERT = {
  NOTE: "NOTE",
  INFO: "NOTE",
  ABSTRACT: "NOTE",
  SUMMARY: "NOTE",
  TODO: "NOTE",
  QUOTE: "NOTE",
  EXAMPLE: "NOTE",
  TIP: "TIP",
  HINT: "TIP",
  SUCCESS: "TIP",
  CHECK: "TIP",
  DONE: "TIP",
  IMPORTANT: "IMPORTANT",
  WARNING: "WARNING",
  ATTENTION: "WARNING",
  QUESTION: "WARNING",
  FAQ: "WARNING",
  HELP: "WARNING",
  CAUTION: "CAUTION",
  DANGER: "CAUTION",
  ERROR: "CAUTION",
  BUG: "CAUTION",
  FAILURE: "CAUTION",
  FAIL: "CAUTION",
  MISSING: "CAUTION",
};

/** @returns {{ text: string, changed: boolean, unresolved: string[] }} */
export function convertObsidian(src, { fromRel, resolveAsset }) {
  const unresolved = [];
  let fence = null;
  const lines = src.replace(/^﻿/, "").split(/\r?\n/);
  const out = lines.map((line) => {
    const f = line.match(/^\s*(`{3,}|~{3,})/);
    if (fence) {
      if (f && f[1][0] === fence[0] && f[1].length >= fence.length)
        fence = null;
      return line;
    }
    if (f) {
      fence = f[1];
      return line;
    }
    // callouts: > [!info]+ Title
    line = line.replace(
      /^(\s*>\s*)\[!([A-Za-z]+)\][+-]?/,
      (m, pre, type) => `${pre}[!${ALERT[type.toUpperCase()] ?? "NOTE"}]`,
    );
    return line
      .split(/(`+[^`]*`+)/)
      .map((seg, i) => {
        if (i % 2) return seg;
        seg = seg.replace(
          /!\[\[([^\]|#]+?)(?:#[^\]|]*)?(?:\|([^\]]*))?\]\]/g,
          (m, name, opt) => {
            name = name.trim();
            if (!IMG.test(name)) return m;
            const rel = resolveAsset(name, fromRel);
            if (!rel) {
              unresolved.push(`${fromRel}: ${m}`);
              return m;
            }
            const alt = name.replace(/\.[^.]+$/, "");
            return opt && /^\d+(x\d+)?$/.test(opt.trim())
              ? `<img src="${rel}" alt="${alt}" width="${opt.trim().split("x")[0]}">`
              : `![${alt}](${rel})`;
          },
        );
        return seg.replace(/==(?=\S)([^=\n]+?)(?<=\S)==/g, "<mark>$1</mark>");
      })
      .join("");
  });
  const text = out.join("\n");
  return { text, changed: text !== src, unresolved };
}

/** true for placeholder files: nothing but whitespace and headings */
export const isEmptyDoc = (src) =>
  src
    .replace(/^\uFEFF/, "")
    .replace(/^#{1,6}\s.*$/gm, "")
    .trim().length === 0;
