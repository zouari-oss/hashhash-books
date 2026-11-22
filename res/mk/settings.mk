# settings.mk - Reusable Settings Framework for GNU Make
# CREATED: 2026-10-03 13:01
# UPDATED: 2026-10-03 13:01

# --- Settings ---
SHELL         = /bin/bash
.SHELLFLAGS   = -eu -o pipefail -c
.DEFAULT_GOAL = help
OS            = $(shell uname -s)

# Global Make Flags
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules
.SUFFIXES:
