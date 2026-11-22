# versioning.mk - Reusable Versioning Framework for GNU Make
# CREATED: 2026-10-03 13:01
# UPDATED: 2026-10-03 13:01
# DEPPEND: logging.mk

# --- Configuration ---
VERSION_FILE    = VERSION## File storing current version
PROJECT_VERSION = $(shell cat $(VERSION_FILE))## Current project version (read from VERSION file)

# --- Commands ---
CHANGELOG_CMD = git cliff## Changelog command

# --- Utilities ---
define validate_version
	if [ -z "$$NEW_VERSION" ]; then \
		echo "Cancelled"; \
		exit 1; \
	fi; \
	if ! printf '%s' "$$NEW_VERSION" | grep -Eq '^[0-9]+\.[0-9]+\.[0-9]+(-[0-9]+)?$$'; then \
		echo "Error: invalid version '$$NEW_VERSION'"; \
		echo "Expected format: MAJOR.MINOR.PATCH[-BUILD]"; \
		exit 1; \
	fi; \
	HIGHEST_VERSION=$$(printf '%s\n' "$(PROJECT_VERSION)" "$$NEW_VERSION" | sort -V | tail -n1); \
	if [ "$$HIGHEST_VERSION" != "$$NEW_VERSION" ] || [ "$$NEW_VERSION" = "$(PROJECT_VERSION)" ]; then \
		echo "Error: new version ($$NEW_VERSION) must be greater than current version ($(PROJECT_VERSION))"; \
		exit 1; \
	fi
endef

define create_tag
	echo "Creating git tag v$$NEW_VERSION..."; \
	git add $(VERSION_FILE); \
	git commit -m "chore(release): v$$NEW_VERSION" || true; \
	git tag -a "v$$NEW_VERSION"; \
	echo "Tag v$$NEW_VERSION created"
endef

##@ Versioning

.PHONY: version
version: ## Update project version
	@$(LOG_INFO) "Current version: $(PROJECT_VERSION)"
	@read -r -p "Enter new version (e.g. 1.2.3): " NEW_VERSION; \
	$(call validate_version); \
	echo "$$NEW_VERSION" > "$(VERSION_FILE)"; \
  $(LOG_INFO) "Version updated to $$NEW_VERSION"
	@read -r -p "Create git tag? (y/n): " CONFIRM; \
	if [[ "$$CONFIRM" =~ ^[Yy]$$ ]]; then \
    $(call create_tag); \
	else \
		echo "Tag skipped"; \
	fi

.PHONY: changelog
changelog: ## Generate project changelog
	@$(LOG_INFO) "Generating changelog..."
	@$(CHANGELOG_CMD)
	@echo "Done."
