# vercel.mk - Reusable Vercel CLI Framework for GNU Make
# CREATED: 2026-11-22 21:55
# UPDATED: 2026-11-22 22:40
# DEPPEND: logging.mk

# --- Configuration ---
VERCEL              ?= vercel## Vercel CLI binary (npm i -g vercel)
VERCEL_ROOT         ?=## Project Root Directory, relative to the repo (empty: leave unchanged)
VERCEL_NODE         ?=## Project Node.js version, e.g. 24.x (empty: leave unchanged)
VERCEL_OUTSIDE_ROOT ?= true## Let builds read files outside VERCEL_ROOT (only used when VERCEL_ROOT is set)
VERCEL_ENVFILE      ?= .env## KEY=VALUE file pushed to Vercel (missing file: skipped)
VERCEL_ENV          ?= production preview development## Environments receiving the variables
VERCEL_ARCHIVE      ?= tgz## Upload format for deployments (tgz: one archive instead of one request per file)
VERCEL_PROJECT_FILE ?= .vercel/project.json## Written by vercel-link
# CLI network tuning: prefer IPv4 and fail over fast (avoids ETIMEDOUT on dual-stack networks).
VERCEL_NODE_OPTIONS ?= --dns-result-order=ipv4first --network-family-autoselection-attempt-timeout=5000
export NODE_OPTIONS += $(VERCEL_NODE_OPTIONS)

# --- Targets ---

##@ Vercel

.PHONY: vercel-setup
vercel-setup: vercel-login vercel-link vercel-config vercel-git ## One-time setup: login, link, configure and enable auto deploy on git push
	@$(LOG_SUCCESS) "Auto deploy enabled: push to main to publish"

.PHONY: vercel-check
vercel-check:
	@command -v $(VERCEL) >/dev/null 2>&1 || { $(LOG_ERROR) "Vercel CLI not found: npm i -g vercel"; exit 1; }

.PHONY: vercel-login
vercel-login: vercel-check ## Log in to Vercel
	@$(VERCEL) login

.PHONY: vercel-link
vercel-link: vercel-check ## Link this repo to a Vercel project (creates .vercel/)
	@$(VERCEL) link

.PHONY: vercel-git
vercel-git: vercel-check ## Connect the Git remote: every push to main auto-deploys, other branches get previews
	@$(VERCEL) git connect

.PHONY: vercel-config
vercel-config: vercel-check ## Apply VERCEL_ROOT / VERCEL_NODE to the project (via the Vercel API, skipped when both are empty)
	@if [ -z "$(VERCEL_ROOT)$(VERCEL_NODE)" ]; then exit 0; fi; \
	[ -f $(VERCEL_PROJECT_FILE) ] || { $(LOG_ERROR) "Project not linked (run: make vercel-link)"; exit 1; }; \
	$(LOG_INFO) "Configuring Vercel project (root: '$(VERCEL_ROOT)', node: '$(VERCEL_NODE)')..."; \
	id=$$(sed -n 's/.*"projectId": *"\([^"]*\)".*/\1/p' $(VERCEL_PROJECT_FILE)); \
	team=$$(sed -n 's/.*"orgId": *"\([^"]*\)".*/\1/p' $(VERCEL_PROJECT_FILE)); \
	args=""; \
	[ -z "$(VERCEL_ROOT)" ] || args="$$args -f rootDirectory=$(VERCEL_ROOT) -F sourceFilesOutsideRootDirectory=$(VERCEL_OUTSIDE_ROOT)"; \
	[ -z "$(VERCEL_NODE)" ] || args="$$args -f nodeVersion=$(VERCEL_NODE)"; \
	$(VERCEL) api "/v9/projects/$$id?teamId=$$team" -X PATCH $$args --silent

.PHONY: vercel-env-push
vercel-env-push: vercel-check ## Push the variables of VERCEL_ENVFILE to every Vercel environment (skipped when the file is missing)
	@[ -f $(VERCEL_ENVFILE) ] || { $(LOG_WARN) "$(VERCEL_ENVFILE) not found: no variables pushed"; exit 0; }; \
	while IFS='=' read -r key value <&3; do \
		for env in $(VERCEL_ENV); do \
			$(LOG_INFO) "$$key -> $$env"; \
			printf '%s' "$$value" | $(VERCEL) env add "$$key" "$$env" --force --yes --no-sensitive --non-interactive >/dev/null; \
		done; \
	done 3< <(grep -E '^[A-Za-z_][A-Za-z0-9_]*=' $(VERCEL_ENVFILE)); \
	$(LOG_SUCCESS) "Environment variables deployed to Vercel"

.PHONY: vercel-env-list
vercel-env-list: vercel-check ## List the variables stored on Vercel
	@$(VERCEL) env ls

##@ Deploy

.PHONY: deploy-preview
deploy-preview: vercel-check vercel-config vercel-env-push ## Build locally and deploy a preview (prints the preview url)
	@$(LOG_INFO) "Deploying preview..."
	@$(VERCEL) pull --yes --environment=preview
	@$(VERCEL) build
	@$(VERCEL) deploy --prebuilt --archive=$(VERCEL_ARCHIVE)

.PHONY: deploy
deploy: vercel-check vercel-config vercel-env-push ## Build locally and deploy to production (only the build output is uploaded)
	@$(LOG_INFO) "Deploying to production..."
	@$(VERCEL) pull --yes --environment=production
	@$(VERCEL) build --prod
	@$(VERCEL) deploy --prebuilt --prod --archive=$(VERCEL_ARCHIVE)
	@$(LOG_SUCCESS) "Deployed"

.PHONY: deploy-list
deploy-list: vercel-check ## List recent deployments
	@$(VERCEL) ls

.PHONY: deploy-logs
deploy-logs: vercel-check ## Show logs of the latest production deployment
	@$(VERCEL) logs --prod 2>/dev/null || $(VERCEL) inspect --logs $$($(VERCEL) ls --prod 2>/dev/null | grep -o 'https://[^ ]*' | head -1)
