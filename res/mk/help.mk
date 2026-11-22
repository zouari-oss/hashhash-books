# help.mk - Reusable Help Framework for GNU Make
# CREATED: 2026-10-03 13:01
# UPDATED: 2026-10-03 13:01
# DEPPEND: settings.mk

##@ Help

.PHONY: help
help: ## Show this help, grouped by category
	@awk 'BEGIN { FS = ":.*##" } \
	/^[a-zA-Z0-9_%-]+:.*##/ { printf "  \033[36m%-22s\033[0m %s\n", $$1, $$2 } \
	/^##@/ { printf "\n\033[1;34m%s\033[0m\n", substr($$0, 5) }' $(MAKEFILE_LIST)
	@echo ""
