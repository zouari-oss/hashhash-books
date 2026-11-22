# =========================================================
# hashhash-books makefile
# CREATED: 2026-11-22 15:00
# UPDATED: 2026-11-22 15:00
# =========================================================
include res/mk/colors.mk     \
        res/mk/settings.mk   \
        res/mk/logging.mk    \
        res/mk/versioning.mk \
        res/mk/vercel.mk     \
        res/mk/help.mk

# --- Configuration ---
PROJECT_NAME := hashhash-books## Project name
CONTENT_DIR  := content## Guides, books and notes (one folder per topic)
SITE_DIR     := site## Website generator (VitePress)
BROWSER_NAME := firefox## Browser name
SITE_URL     := http://localhost:5173/## Local dev server url
VERCEL_ROOT    := site## Vercel Root Directory (the generator reads ../content)
VERCEL_NODE    := 24.x## Vercel Node.js version
VERCEL_ENVFILE := site/.env## Variables pushed to Vercel

# --- Commands ---
SITE_CMD := cd $(SITE_DIR) && npm run --silent## Website base cmd

# --- Targets ---

##@ General

.PHONY: all
all: install build ## Install dependencies and build the website

.PHONY: install
install: ## Install website dependencies
	@$(LOG_INFO) "Installing website dependencies..."
	@cd $(SITE_DIR) && npm ci
	@[ -f $(SITE_DIR)/.env ] || cp $(SITE_DIR)/.env.example $(SITE_DIR)/.env

.PHONY: build
build: ## Generate sources, check every page, build the website to site/dist
	@$(LOG_INFO) "Building the website..."
	@$(SITE_CMD) build
	@$(LOG_SUCCESS) "Website built in $(SITE_DIR)/dist"

.PHONY: dev
dev: ## Run the website locally with hot reload
	@$(LOG_INFO) "Starting dev server on $(SITE_URL)..."
	@$(SITE_CMD) dev

.PHONY: preview
preview: build ## Serve the production build locally
	@$(SITE_CMD) preview

.PHONY: open
open: ## Open the local website in the browser
	@$(BROWSER_NAME) $(SITE_URL) >/dev/null 2>&1 &

.PHONY: clean
clean: ## Remove generated site sources and build output
	@$(LOG_INFO) "Cleaning $(PROJECT_NAME)..."
	@rm -rf $(SITE_DIR)/.generated $(SITE_DIR)/dist $(SITE_DIR)/.vitepress/.temp $(SITE_DIR)/.vitepress-cache

##@ Content

.PHONY: check
check: lint ## Generate the site sources and verify every page compiles (also lists dead links)
	@$(LOG_INFO) "Checking content..."
	@$(SITE_CMD) prepare-content
	@$(SITE_CMD) check

.PHONY: lint
lint: ## Verify the content naming/layout conventions
	@$(LOG_INFO) "Linting content conventions..."
	@$(SITE_CMD) lint

.PHONY: fix
fix: ## Convert Obsidian-only syntax (![[img]], ==mark==, callouts) in content/ to standard Markdown
	@$(LOG_INFO) "Converting Obsidian syntax..."
	@$(SITE_CMD) fix

.PHONY: stats
stats: ## Show content statistics per topic
	@$(LOG_INFO) "Content statistics (files per topic):"
	@for d in $(CONTENT_DIR)/*/; do \
		printf "  $(CYAN)%-24s$(TEXT_RESET) %4s md  %4s pdf  %4s other\n" "$$(basename $$d)" \
			"$$(find $$d -type f -name '*.md' | wc -l)" \
			"$$(find $$d -type f -iname '*.pdf' | wc -l)" \
			"$$(find $$d -type f ! -name '*.md' ! -iname '*.pdf' | wc -l)"; \
	done

.PHONY: new-topic-%
new-topic-%: ## Scaffold content/<topic>/ with notes.md, links.md and guides/ books/ (make new-topic-rust)
	@mkdir -p $(CONTENT_DIR)/$*/guides $(CONTENT_DIR)/$*/books
	@[ -f $(CONTENT_DIR)/$*/notes.md ] || printf '# $* Notes\n\n' > $(CONTENT_DIR)/$*/notes.md
	@[ -f $(CONTENT_DIR)/$*/links.md ] || printf '# $* Links\n\n' > $(CONTENT_DIR)/$*/links.md
	@$(LOG_SUCCESS) "Created $(CONTENT_DIR)/$*"
