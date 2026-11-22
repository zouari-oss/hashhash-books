# Usage

## Table of Contents

<!--toc:start-->

- [Usage](#usage)
  - [Browsing the Collection](#browsing-the-collection)
  - [Categories](#categories)
  - [Adding Content](#adding-content)
  - [Makefile Commands](#makefile-commands)
  - [Downloading a File](#downloading-a-file)

<!--toc:end-->

## Browsing the Collection

Every file under [`content/`](../../content) is published automatically to
**<https://hashhash-books.vercel.app/>**, with a sidebar and full-text search.
See [ARCHITECTURE.md](ARCHITECTURE.md) for how each file type is rendered.

## Categories

- **Programming Languages:** Python, C, C++, Java, Go, Dart, PHP, JavaScript and more.
- **Web Development:** HTML, CSS, JavaScript, backend frameworks.
- **Data & AI:** Machine learning, neural networks, business intelligence, SQL.
- **Algorithms & Data Structures:** Problem-solving and efficient techniques.
- **DevOps & Systems:** Docker, Linux, cloud, networking, shell, Git.
- **Security:** Cybersecurity and cryptography.
- **Miscellaneous:** Software engineering, testing, finance, and general tech topics.

## Adding Content

Drop your files anywhere under `content/<topic>/`, commit and push to `main`.
Vercel rebuilds and redeploys the site; nothing else needs editing.

To start a new topic:

```bash
make new-topic-rust
```

This scaffolds `content/rust/` with `notes.md`, `links.md`, `guides/` and `books/`. Topic display
names are configured in [`site/site.config.json`](../../site/site.config.json).

Before opening a pull request, validate your changes:

```bash
make lint
make check
```

If your notes were written in Obsidian, convert its syntax (`![[img]]`, `==mark==`, callouts) to
standard Markdown with `make fix`.

## Makefile Commands

| Command                | Description                                         |
| ---------------------- | --------------------------------------------------- |
| `make dev`             | Run the website locally with hot reload             |
| `make build`           | Generate sources, check every page, build the site  |
| `make preview`         | Serve the production build locally                  |
| `make lint`            | Verify content naming and layout conventions        |
| `make check`           | Lint, then verify every page compiles               |
| `make fix`             | Convert Obsidian-only syntax to standard Markdown   |
| `make stats`           | Show content statistics per topic                   |
| `make new-topic-<name>`| Scaffold a new topic                                |
| `make clean`           | Remove generated sources and build output           |

Run `make help` for the full list.

## Downloading a File

```bash
curl -O "https://raw.githubusercontent.com/zouari-oss/hashhash-books/main/content/<path_to_file>"
```
