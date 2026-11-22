// Markdown options shared by the VitePress config and scripts/check-pages.mjs
export const markdown = {
  // languages Shiki does not ship
  languageAlias: { gitignore: "ini", conf: "ini" },
  // notes are plain Markdown: `{ w | w ∈ L }` must not be read as {attributes}
  attrs: { disable: true },
  config: (md) => {
    // lazy-load every image (notes embed many screenshots)
    md.renderer.rules.image = (tokens, i, o, _, self) => {
      tokens[i].attrSet("loading", "lazy");
      tokens[i].attrSet("decoding", "async");
      return self.renderToken(tokens, i, o);
    };
    // ```mermaid blocks -> client-side <Mermaid> component
    const fence = md.renderer.rules.fence;
    md.renderer.rules.fence = (tokens, i, ...rest) => {
      const tok = tokens[i];
      if (tok.info.trim().split(/\s+/)[0] === "mermaid")
        return `<Mermaid code="${encodeURIComponent(tok.content)}" />\n`;
      return fence(tokens, i, ...rest);
    };
    // inline `code` may contain {{ }} - keep Vue from interpolating it
    md.renderer.rules.code_inline = (tokens, i, _o, _e, self) => {
      tokens[i].attrSet("v-pre", "");
      return `<code${self.renderAttrs(tokens[i])}>${md.utils.escapeHtml(tokens[i].content)}</code>`;
    };
  },
};
