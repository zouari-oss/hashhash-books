# Usage

<!--toc:start-->

- [Usage](#usage)
  - [Browsing the Collection](#browsing-the-collection)
  - [Categories](#categories)
  - [Adding Content](#adding-content)
  - [Deployment](#deployment)
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

## Deployment

The site is hosted on Vercel through the [Vercel CLI](https://vercel.com/docs/cli)
(`npm i -g vercel`). Run once:

```bash
make vercel-setup
```

`make vercel-config` (run by `vercel-setup` and before every deploy) sets the project's Root Directory
to `site`, enables "Include source files outside of the Root Directory" (the site reads `../content`)
and pins Node.js 24.x. The build configuration lives in [`site/vercel.json`](../../site/vercel.json).

After that, every push to `main` deploys to production and other branches get preview deployments.
To deploy manually from your machine, use `make deploy` (production) or `make deploy-preview`;
only the build output is uploaded (as one archive), not the ~1.5 GB of binaries. Both first push the
variables of `site/.env` to Vercel (`make vercel-env-push`; list them with `make vercel-env-list`).

## Makefile Commands

| Command                 | Description                                        |
| ----------------------- | -------------------------------------------------- |
| `make dev`              | Run the website locally with hot reload            |
| `make build`            | Generate sources, check every page, build the site |
| `make preview`          | Serve the production build locally                 |
| `make lint`             | Verify content naming and layout conventions       |
| `make check`            | Lint, then verify every page compiles              |
| `make fix`              | Convert Obsidian-only syntax to standard Markdown  |
| `make stats`            | Show content statistics per topic                  |
| `make new-topic-<name>` | Scaffold a new topic                               |
| `make clean`            | Remove generated sources and build output          |
| `make vercel-setup`     | One-time Vercel login, link and git auto deploy    |
| `make deploy`           | Build locally and deploy to production             |
| `make deploy-preview`   | Build locally and deploy a preview                 |

Run `make help` for the full list.

## Downloading a File

```bash
curl -O "https://raw.githubusercontent.com/zouari-oss/hashhash-books/main/content/<path_to_file>"
```
