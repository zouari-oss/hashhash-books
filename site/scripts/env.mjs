// Shared by the generator and .vitepress/config.mts: site.config.json + .env overrides.
//   cp .env.example .env   (all variables are optional)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const siteRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

try {
  process.loadEnvFile(path.join(siteRoot, ".env")); // never overrides variables already set (CI wins)
} catch {
  /* no .env file: defaults apply */
}

const bool = (v, d) =>
  v === undefined || v === "" ? d : !/^(0|false|no|off)$/i.test(v);
const e = process.env;

export function loadConfig() {
  const cfg = JSON.parse(
    fs.readFileSync(path.join(siteRoot, "site.config.json"), "utf8"),
  );
  return {
    ...cfg,
    title: e.SITE_TITLE ?? cfg.title,
    description: e.SITE_DESCRIPTION ?? cfg.description,
    repo: e.SITE_REPO ?? cfg.repo,
    branch: e.SITE_BRANCH ?? cfg.branch,
    base: e.SITE_BASE ?? cfg.base,
    contentDir: e.CONTENT_DIR ?? cfg.contentDir,
    // false -> PDFs are only listed/linked (no preview page each): smaller & faster build
    pdfPreview: bool(e.PDF_PREVIEW, cfg.pdfPreview ?? true),
    // host serving the raw files to the PDF viewer (must send CORS headers)
    streamHost:
      e.PDF_STREAM_HOST ??
      cfg.streamHost ??
      "https://raw.githubusercontent.com",
    searchEnabled: bool(e.SITE_SEARCH, true),
  };
}
