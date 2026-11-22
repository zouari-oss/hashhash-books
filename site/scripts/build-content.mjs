#!/usr/bin/env node
/**
 * build-content.mjs
 *
 * Scans /content (every topic folder) and generates the VitePress source tree
 * in site/.generated, so that ANY file you add under /content shows up on the
 * website automatically - no manual navigation to maintain.
 *
 *   *.md                 -> rendered page (links rewritten, Vue-unsafe text escaped)
 *   images               -> copied next to the pages that use them
 *   *.pdf                -> one preview page each (PDF.js viewer streaming the file from GitHub)
 *   zip/pptx/...         -> NOT copied (GitHub Pages is limited to 1 GB);
 *                           listed in the sidebar + folder pages, linked to GitHub
 *   every folder         -> gets an index page (its README.md/index.md if present)
 *   sidebar.json         -> generated navigation tree
 */
import fs from "node:fs";
import path from "node:path";
import { loadConfig, siteRoot } from "./env.mjs";
import { convertObsidian, isEmptyDoc, makeAssetResolver } from "./obsidian.mjs";

const cfg = loadConfig();
const contentRoot = path.resolve(siteRoot, cfg.contentDir);
const outRoot = path.join(siteRoot, ".generated");
const ASSET_EXT = new Set(cfg.assetExtensions);
const IGNORE = new Set(cfg.ignore);
const repoPath = (rel) =>
  encodeURI(`content/${rel}`).replace(/[?#]/g, encodeURIComponent);
const blobUrl = (rel) =>
  `https://github.com/${cfg.repo}/blob/${cfg.branch}/${repoPath(rel)}`;
const rawUrl = (rel) =>
  `https://github.com/${cfg.repo}/raw/${cfg.branch}/${repoPath(rel)}`;
const streamUrl = (rel) =>
  `${cfg.streamHost}/${cfg.repo}/${cfg.branch}/${repoPath(rel)}`;
const fileUrl = (rel) =>
  rel.toLowerCase().endsWith(".pdf") ? blobUrl(rel) : rawUrl(rel);

const warnings = [];
const emptyPages = [];
const warn = (m) => warnings.push(m);

// ---------------------------------------------------------------- helpers
const slug = (s) =>
  s
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/c\+\+/g, "cpp")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "untitled";

const natural = (a, b) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

const WORDS = cfg.words ?? {};
const SMALL = new Set(cfg.smallWords ?? []);
/** kebab-case-name.ext -> "Kebab Case Name" (acronyms and small words from site.config.json) */
const prettify = (name) => {
  const base = name
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .trim();
  if (base !== base.toLowerCase()) return base; // already human-written
  return base
    .split(" ")
    .map(
      (w, i) =>
        WORDS[w] ??
        (i > 0 && SMALL.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)),
    )
    .join(" ");
};

const ext = (f) => path.extname(f).slice(1).toLowerCase();
const human = (n) =>
  n > 1048576
    ? `${(n / 1048576).toFixed(1)} MB`
    : `${Math.max(1, Math.round(n / 1024))} KB`;

// ---- icons: Phosphor SVGs rendered as CSS masks (colour follows the text; no emoji, no JS)
const ICON_DIR = path.join(
  siteRoot,
  "node_modules/@phosphor-icons/core/assets/regular",
);
const UI_ICONS = [
  "caret-left",
  "caret-right",
  "minus",
  "plus",
  "arrows-out-line-horizontal",
  "download-simple",
  "arrow-square-out",
  "magnifying-glass",
  "file-pdf",
  "warning-circle",
  "spinner-gap",
  "folder",
];
const usedIcons = new Set(UI_ICONS);
/** <i> markup for a Phosphor icon (unknown names fall back to "file") */
const ic = (name) => {
  if (!fs.existsSync(path.join(ICON_DIR, `${name}.svg`))) name = "file";
  usedIcons.add(name);
  return `<i class="i i-${name}" aria-hidden="true"></i>`;
};
const fileIcon = (f) => ic(cfg.fileIcons?.[ext(f)] ?? "file");
const iconName = (n) =>
  n.rel && !n.rel.includes("/")
    ? (cfg.topicIcons?.[n.rel] ?? "folder")
    : (cfg.categoryIcons?.[n.name] ?? "folder");
const dirIcon = (n) => ic(iconName(n));
/** drop leading emoji from titles taken from the markdown (the UI uses real icons) */
const cleanTitle = (t) =>
  t.replace(/^[\p{Extended_Pictographic}\uFE0F\u200D\s]+/u, "").trim() || t;

// ---------------------------------------------------------------- scan
/** node = { name, rel, slug, dirs:[], pages:[], assets:[], binaries:[] } */
function scan(abs, rel, outRel) {
  const node = {
    name: path.basename(abs),
    rel,
    out: outRel,
    dirs: [],
    pages: [],
    pdfs: [],
    assets: [],
    binaries: [],
  };
  const entries = fs
    .readdirSync(abs, { withFileTypes: true })
    .filter((e) => !IGNORE.has(e.name));
  entries.sort((a, b) => natural(a.name, b.name));
  const used = new Set();
  const claim = (base, e = "") => {
    let s = base,
      i = 2;
    while (used.has(s + e)) s = `${base}-${i++}`;
    used.add(s + e);
    return s + e;
  };
  // index.md must win the "index" slug, README.md second
  const hasIndex = entries.some(
    (e) => e.isFile() && e.name.toLowerCase() === "index.md",
  );
  for (const e of entries) {
    const childRel = rel ? `${rel}/${e.name}` : e.name;
    const childAbs = path.join(abs, e.name);
    if (e.isDirectory()) {
      const child = scan(
        childAbs,
        childRel,
        `${outRel}${claim(slug(e.name))}/`,
      );
      if (
        child.dirs.length ||
        child.pages.length ||
        child.pdfs.length ||
        child.assets.length ||
        child.binaries.length
      )
        node.dirs.push(child);
      continue;
    }
    if (!e.isFile()) continue;
    const x = ext(e.name);
    const stat = fs.statSync(childAbs);
    if (x === "md" && isEmptyDoc(fs.readFileSync(childAbs, "utf8"))) {
      emptyPages.push(childRel); // placeholder file: nothing to show
      continue;
    }
    if (x === "md") {
      const lower = e.name.toLowerCase();
      const isIndex =
        lower === "index.md" || (!hasIndex && lower === "readme.md");
      const name = isIndex
        ? claim("index", ".md")
        : claim(slug(e.name.replace(/\.md$/i, "")), ".md");
      node.pages.push({
        rel: childRel,
        abs: childAbs,
        out: `${outRel}${name}`,
        isIndex,
      });
    } else if (x === "pdf" && cfg.pdfPreview) {
      node.pdfs.push({
        rel: childRel,
        name: e.name,
        size: stat.size,
        out: `${outRel}${claim(slug(e.name.replace(/\.pdf$/i, "")) + "-pdf", ".md")}`,
      });
    } else if (ASSET_EXT.has(x)) {
      node.assets.push({
        rel: childRel,
        abs: childAbs,
        out: `${outRel}${claim(slug(e.name.replace(/\.[^.]+$/, "")), "." + x)}`,
      });
    } else if (x !== "" || !e.name.startsWith(".")) {
      node.binaries.push({ rel: childRel, name: e.name, size: stat.size });
    }
  }
  return node;
}

const root = scan(contentRoot, "", "");

// A folder is "visible" (sidebar, listings, counts) when it holds something readable.
// Asset-only folders (images) stay in the tree so their files are still copied.
const visible = (n) =>
  n.pages.length > 0 ||
  n.pdfs.length > 0 ||
  n.binaries.length > 0 ||
  n.dirs.some(visible);
const CAT_ORDER = Object.keys(cfg.categories ?? {});
const catRank = (d) => {
  const i = CAT_ORDER.indexOf(d.name);
  return i < 0 ? -1 : i; // sub-topics (-1) first, then categories in configured order
};
(function order(n) {
  n.dirs.sort((a, b) => catRank(a) - catRank(b) || natural(a.name, b.name));
  n.dirs.forEach(order);
})(root);
const shown = (n) => n.dirs.filter(visible);

// lookup tables: source rel path -> thing
const byRel = new Map();
const dirByRel = new Map();
(function index(n) {
  dirByRel.set(n.rel, n);
  n.pages.forEach((p) => byRel.set(p.rel, { kind: "page", ...p }));
  n.pdfs.forEach((p) => byRel.set(p.rel, { kind: "pdf", ...p }));
  n.assets.forEach((a) => byRel.set(a.rel, { kind: "asset", ...a }));
  n.binaries.forEach((b) => byRel.set(b.rel, { kind: "binary", ...b }));
  n.dirs.forEach(index);
})(root);

const resolveAsset = makeAssetResolver(
  [...byRel].filter(([, v]) => v.kind === "asset").map(([k]) => k),
);

// ---------------------------------------------------------------- markdown processing
const HTML_TAGS = new Set(
  `a abbr address article aside audio b bdi bdo blockquote body br button canvas caption center cite code col colgroup data dd del details dfn dialog div dl dt em embed fieldset figcaption figure font footer form h1 h2 h3 h4 h5 h6 head header hr html i iframe img input ins kbd label legend li link main mark menu meta nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strike strong style sub summary sup svg path table tbody td template textarea tfoot th thead time title tr track u ul var video wbr`.split(
    /\s+/,
  ),
);

/** Escape text Vue would choke on: unknown <tags> (e.g. vector<string>) and {{ }}. */
function sanitizeText(text) {
  return text
    .replace(/\{\{/g, "&#123;&#123;")
    .replace(/<(?=\/?[A-Za-z])/g, (m, offset) => {
      const rest = text.slice(offset + 1);
      if (/^[a-z][a-z0-9+.-]*:[^\s>]*>/i.test(rest)) return m; // <https://autolink>
      if (/^[^\s<>@]+@[^\s<>]+>/.test(rest)) return m; // <mail@autolink>
      const name = rest.match(/^\/?([A-Za-z][A-Za-z0-9-]*)/)[1].toLowerCase();
      return HTML_TAGS.has(name) ? m : "&lt;";
    });
}

/** Resolve one link target found in `fromRel`'s markdown, return the rewritten target. */
function rewriteTarget(raw, fromPage, kind) {
  let t = raw.trim();
  if (t.startsWith("<") && t.endsWith(">")) t = t.slice(1, -1);
  if (!t || /^([a-z][a-z0-9+.-]*:|#|\/\/)/i.test(t)) return raw;
  const m = t.match(/^([^#?]*)([?#].*)?$/);
  let p = m[1];
  const tail = m[2] ?? "";
  try {
    p = decodeURI(p);
  } catch {}
  const fromDir = path.posix.dirname(fromPage.rel);
  const resolved = path.posix.normalize(
    p.startsWith("/")
      ? p.slice(1)
      : path.posix.join(fromDir === "." ? "" : fromDir, p),
  );
  const key = resolved.replace(/\/$/, "");
  const hit = byRel.get(key);
  if (hit?.kind === "page" || hit?.kind === "pdf")
    return (
      "/" + hit.out.replace(/\.md$/, "") + (tail.startsWith("#") ? tail : "")
    );
  if (hit?.kind === "asset") {
    const rel = path.posix.relative(path.posix.dirname(fromPage.out), hit.out);
    return rel.startsWith(".") ? rel : "./" + rel;
  }
  if (hit?.kind === "binary") return fileUrl(hit.rel);
  const dir = dirByRel.get(key === "." ? "" : key);
  if (dir) return "/" + dir.out;
  if (kind === "img") {
    warn(`missing image  ${fromPage.rel}  ->  ${raw}`);
    return `https://github.com/${cfg.repo}/raw/${cfg.branch}/${repoPath(resolved)}`;
  }
  warn(`dead link  ${fromPage.rel}  ->  ${raw}`);
  return raw;
}

function processMarkdown(src, page) {
  src = src
    .replace(/^\uFEFF/, "")
    .replace(/<!--toc:start-->[\s\S]*?<!--toc:end-->\n?/g, "");
  const lines = src.split(/\r?\n/);
  let fence = null;
  const out = lines.map((line) => {
    const f = line.match(/^\s*(`{3,}|~{3,})/);
    if (fence) {
      if (f && f[1][0] === fence[0] && f[1].length >= fence.length)
        fence = null;
      return line;
    }
    if (f) {
      fence = f[1];
      // normalise the info string to one clean language name (```{.python .x} -> python, ```id="x" / ```* -> none)
      return line.replace(
        /^(\s*(?:`{3,}|~{3,}))\s*(\S*)(.*)$/,
        (_, marks, lang) => {
          const attr = lang.match(/^\{\.?([A-Za-z0-9_+#-]+)/);
          if (attr) lang = attr[1];
          else if (/[="*{]/.test(lang)) lang = "";
          return (
            marks + lang.replace(/[^A-Za-z0-9_+#.-]/g, "").replace(/^[.-]+/, "")
          );
        },
      );
    }
    // split off inline code so we never touch it
    return line
      .split(/(`+[^`]*`+)/)
      .map((seg, i) => {
        if (i % 2) return seg;
        seg = seg.replace(
          /\]\(\s*(<[^>]*>|[^\s)]*)(\s+(?:"[^"]*"|'[^']*'))?\s*\)/g,
          (all, tgt, title = "") => {
            const isImg = /\.(png|jpe?g|gif|svg|webp|avif)(?:[?#].*)?$/i.test(
              tgt,
            );
            const nt = rewriteTarget(tgt, page, isImg ? "img" : "link");
            return `](${/\s/.test(nt) ? "<" + nt + ">" : nt}${title})`;
          },
        );
        seg = seg.replace(
          /\b(src|href)=(["'])(.*?)\2/g,
          (all, a, q, v) =>
            `${a}=${q}${rewriteTarget(v, page, a === "src" ? "img" : "link")}${q}`,
        );
        seg = seg.replace(
          /^(\s*\[[^\]]+\]:\s*)(\S+)/,
          (all, pre, v) => pre + rewriteTarget(v, page, "link"),
        );
        return sanitizeText(seg);
      })
      .join("");
  });
  return out.join("\n");
}

/** Page title = the file's first heading, but only when that heading is an H1
 *  (a stray "# Links" section further down must not become the title). */
function firstHeading(src) {
  let fence = false;
  for (const line of src.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) fence = !fence;
    if (fence) continue;
    const m = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!m) continue;
    if (m[1].length !== 1) return null;
    return m[2]
      .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/[`*_]/g, "")
      .replace(/<[^>]+>/g, "")
      .trim();
  }
  return null;
}

// ---------------------------------------------------------------- emit
// Incremental: unchanged files are left untouched (no mtime churn -> faster dev/HMR and builds)
fs.mkdirSync(outRoot, { recursive: true });
const written = new Set();
const write = (rel, data) => {
  const f = path.join(outRoot, rel);
  written.add(f);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  if (fs.existsSync(f) && fs.readFileSync(f, "utf8") === data) return;
  fs.writeFileSync(f, data);
};

const countFiles = (n) =>
  n.pages.length +
  n.pdfs.length +
  n.binaries.length +
  n.dirs.reduce((s, d) => s + countFiles(d), 0);
const dirTitle = (n) =>
  n.rel === ""
    ? cfg.title
    : (cfg.topics[n.rel] ?? cfg.categories?.[n.name] ?? prettify(n.name));
const yamlStr = (s) => JSON.stringify(s);

function emit(n) {
  // pages
  for (const p of n.pages) {
    const src = convertObsidian(fs.readFileSync(p.abs, "utf8"), {
      fromRel: p.rel,
      resolveAsset,
    }).text; // Obsidian syntax -> standard Markdown
    p.title =
      firstHeading(src) ??
      (p.isIndex ? dirTitle(n) : prettify(path.basename(p.rel)));
    let body = processMarkdown(src, p);
    if (!/^---\r?\n/.test(body) && !firstHeading(src))
      body = `# ${sanitizeText(p.title)}\n\n${body}`;
    if (p.isIndex) body += "\n" + folderListing(n, { withPages: false });
    // frontmatter `source` powers the "Edit this page" link
    const source = `source: ${yamlStr(`content/${p.rel}`)}`;
    body = /^---\r?\n/.test(body)
      ? body.replace(/^---\r?\n/, `---\n${source}\n`)
      : `---\n${source}\n---\n\n${body}`;
    write(p.out, body);
  }
  // one preview page per PDF
  for (const f of n.pdfs) {
    const title = sanitizeText(prettify(f.name));
    write(
      f.out,
      `---\naside: false\noutline: false\neditLink: false\n---\n\n# ${title}\n\n` +
        `<PdfViewer src="${streamUrl(f.rel)}" download="${rawUrl(f.rel)}" />\n\n` +
        `<small>${human(f.size)} · [Open on GitHub](${blobUrl(f.rel)})</small>\n`,
    );
  }
  // generated index for folders without README/index
  if (!n.pages.some((p) => p.isIndex) && n.rel !== "") {
    write(
      `${n.out}index.md`,
      `---\neditLink: false\n---\n\n# ${dirTitle(n)}\n\n${folderListing(n, { withPages: true })}`,
    );
  }
  // assets
  for (const a of n.assets) {
    const dest = path.join(outRoot, a.out);
    written.add(dest);
    const st = fs.statSync(a.abs);
    if (
      fs.existsSync(dest) &&
      fs.statSync(dest).size === st.size &&
      fs.statSync(dest).mtimeMs >= st.mtimeMs
    )
      continue;
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(a.abs, dest);
  }
  n.dirs.forEach(emit);
}

function folderListing(n, { withPages }) {
  const parts = [];
  if (shown(n).length)
    parts.push(
      "## Folders\n",
      ...shown(n).map(
        (d) =>
          `- ${dirIcon(d)} [${dirTitle(d)}](/${d.out}) <small>(${countFiles(d)} ${countFiles(d) === 1 ? "file" : "files"})</small>`,
      ),
      "",
    );
  const pages = n.pages.filter((p) => !p.isIndex);
  if (withPages && pages.length) {
    parts.push("## Pages\n");
    for (const p of pages) {
      const t =
        firstHeading(fs.readFileSync(p.abs, "utf8")) ??
        prettify(path.basename(p.rel));
      parts.push(
        `- ${ic("article")} [${sanitizeText(cleanTitle(t))}](/${p.out.replace(/\.md$/, "")})`,
      );
    }
    parts.push("");
  }
  if (n.pdfs.length || n.binaries.length) {
    parts.push("## Files\n", "| File | Size | |", "| --- | --- | --- |");
    const esc = (t) => t.replace(/[|\\]/g, "\\$&").replace(/</g, "&lt;");
    for (const f of n.pdfs)
      parts.push(
        `| ${ic("file-pdf")} [${esc(prettify(f.name))}](/${f.out.replace(/\.md$/, "")}) | ${human(f.size)} | [${ic("download-simple")} PDF](${rawUrl(f.rel).replace(/ /g, "%20")}) |`,
      );
    for (const b of n.binaries)
      parts.push(
        `| ${fileIcon(b.name)} [${esc(b.name)}](${fileUrl(b.rel).replace(/ /g, "%20")}) | ${human(b.size)} | ${ext(b.name).toUpperCase()} |`,
      );
    parts.push("");
  }
  return parts.join("\n");
}

emit(root);

// ---------------------------------------------------------------- sidebar
function sidebarItems(n) {
  const items = [];
  for (const p of n.pages.filter((p) => !p.isIndex))
    items.push({
      text: cleanTitle(p.title),
      link: "/" + p.out.replace(/\.md$/, ""),
    });
  for (const d of shown(n)) items.push(sidebarGroup(d));
  for (const f of n.pdfs)
    items.push({
      text: `${ic("file-pdf")} ${prettify(f.name)}`,
      link: "/" + f.out.replace(/\.md$/, ""),
    });
  for (const b of n.binaries)
    items.push({
      text: `${fileIcon(b.name)} ${b.name}`,
      link: fileUrl(b.rel).replace(/ /g, "%20"),
    });
  return items;
}
function sidebarGroup(n) {
  return {
    text: `${dirIcon(n)} ${dirTitle(n)}`,
    link: "/" + n.out,
    collapsed: true,
    items: sidebarItems(n),
  };
}

const sidebar = {};
for (const d of shown(root)) {
  const g = sidebarGroup(d);
  g.collapsed = false;
  sidebar["/" + d.out] = [g];
}
write("sidebar.json", JSON.stringify(sidebar));

// ---------------------------------------------------------------- home page
const totalPages =
  root.pages.length +
  (function c(n) {
    return n.dirs.reduce((t, d) => t + d.pages.length + c(d), 0);
  })(root);
const totalPdfs =
  root.pdfs.length +
  (function c(n) {
    return n.dirs.reduce((t, d) => t + d.pdfs.length + c(d), 0);
  })(root);
const totalFiles = countFiles(root);
const topics = shown(root).map((d) => {
  const count = (name) =>
    d.dirs.find((x) => x.name === name)
      ? countFiles(d.dirs.find((x) => x.name === name))
      : 0;
  return {
    title: dirTitle(d),
    link: "/" + d.out,
    icon: ic(iconName(d)),
    total: countFiles(d),
    guides: count("guides") + d.pages.filter((p) => !p.isIndex).length,
    books: count("books") + count("cheatsheets"),
  };
});
write("topics.json", JSON.stringify(topics));
const home = [
  "---",
  "layout: home",
  "hero:",
  `  name: ${yamlStr(cfg.title)}`,
  `  text: ${yamlStr("Guides, notes and books for developers")}`,
  `  tagline: ${yamlStr(cfg.description)}`,
  "  image:",
  "    src: /logo.png",
  "    alt: HashHashBooks logo",
  "  actions:",
  "    - theme: brand",
  "      text: Browse topics",
  '      link: "#topics"',
  "    - theme: alt",
  "      text: View on GitHub",
  `      link: https://github.com/${cfg.repo}`,
  "---",
  "",
  `<TopicGrid :stats='${JSON.stringify({ guides: totalPages, pdfs: totalPdfs, topics: topics.length, files: totalFiles - totalPages - totalPdfs })}' />`,
  "",
].join("\n");
write("index.md", home);

// icons.css: one custom property per icon actually used (tiny, tree-shaken by design)
write(
  "icons.css",
  [...usedIcons]
    .sort()
    .map(
      (n) =>
        `.i-${n}{--i:url("data:image/svg+xml,${encodeURIComponent(
          fs
            .readFileSync(path.join(ICON_DIR, `${n}.svg`), "utf8")
            .trim()
            .replace(/\s+/g, " "),
        )}")}`,
    )
    .join("\n") + "\n",
);

// static public files (logo, ...)
const pub = path.join(siteRoot, "public");
if (fs.existsSync(pub))
  for (const e of fs.readdirSync(pub)) {
    const dest = path.join(outRoot, "public", e);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.cpSync(path.join(pub, e), dest, { recursive: true });
    written.add(dest);
  }
const logo = path.resolve(siteRoot, "../res/img/logo.png");
if (fs.existsSync(logo)) {
  fs.mkdirSync(path.join(outRoot, "public"), { recursive: true });
  fs.copyFileSync(logo, path.join(outRoot, "public", "logo.png"));
  written.add(path.join(outRoot, "public", "logo.png"));
}

// drop generated files whose source disappeared
(function sweep(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) {
      sweep(f);
      if (!fs.readdirSync(f).length) fs.rmdirSync(f);
    } else if (!written.has(f)) fs.rmSync(f);
  }
})(outRoot);

if (emptyPages.length)
  console.log(
    `skipped ${emptyPages.length} empty page(s): ${emptyPages.join(", ")}`,
  );
console.log(
  `generated ${totalPages} pages, ${totalPdfs} PDF previews, ${shown(root).length} topics, ${totalFiles - totalPages - totalPdfs} linked files`,
);
if (warnings.length) {
  console.warn(
    `\n${warnings.length} broken reference(s):\n` +
      warnings.map((w) => "  " + w).join("\n"),
  );
}
