# Installation

## Table of Contents

<!--toc:start-->

- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Configure the Environment](#configure-the-environment)
  - [Build](#build)
  - [Run Locally](#run-locally)
  - [Verify Installation](#verify-installation)

<!--toc:end-->

## Prerequisites

- Git
- GNU Make
- Node.js and npm (to build or run the website)

Only needed to read the content: Git, or a browser with the
[website](https://hashhash-books.vercel.app/).

## Clone the Repository

```bash
git clone https://github.com/zouari-oss/hashhash-books.git
cd hashhash-books
```

The repository holds ~1.5 GB of PDFs and archives. To fetch a single file instead:

```bash
curl -O "https://raw.githubusercontent.com/zouari-oss/hashhash-books/main/content/<path_to_file>"
```

## Configure the Environment

`make install` copies `site/.env.example` to `site/.env` when missing. Every variable is optional
and overrides [`site/site.config.json`](../../site/site.config.json):

| Variable      | Purpose                                                          |
| ------------- | ---------------------------------------------------------------- |
| `SITE_BASE`   | Public URL prefix (`/` on Vercel, `/<repo>/` for GitHub project pages)  |
| `SITE_REPO`   | GitHub repository files are linked from                          |
| `SITE_BRANCH` | Branch files are linked from                                     |

## Build

Install the dependencies and build the website to `site/dist`:

```bash
make
```

Or step by step:

```bash
make install
make build
```

## Run Locally

```bash
make dev
```

The site is served at <http://localhost:5173/> with hot reload. Use `make preview`
to serve the production build.

## Verify Installation

```bash
make check
```

This lints the content layout and verifies every page compiles. For additional commands, run
`make help`.
