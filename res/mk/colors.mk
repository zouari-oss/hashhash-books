# colors.mk - Reusable ANSI Color Codes Framework for GNU Make
# CREATED: 2026-10-03 13:01
# UPDATED: 2026-10-03 13:01

# Text Styles
TEXT_RESET := \033[0m
TEXT_BOLD  := \033[1m
TEXT_DIM   := \033[2m

# Standard Text Colors
BLACK   := \033[30m
RED     := \033[31m
GREEN   := \033[32m
YELLOW  := \033[33m
BLUE    := \033[34m
MAGENTA := \033[35m
CYAN    := \033[36m
WHITE   := \033[37m

# Bright Text Colors
BR_BLACK    := \033[90m
BR_RED      := \033[91m
BR_GREEN    := \033[92m
BR_YELLOW   := \033[93m
BR_BLUE     := \033[94m
BR_MAGENTA  := \033[95m
BR_CYAN     := \033[96m
BR_WHITE    := \033[97m

# Background Colors
BG_BLACK   := \033[40m
BG_RED     := \033[41m
BG_GREEN   := \033[42m
BG_YELLOW  := \033[43m
BG_BLUE    := \033[44m
BG_MAGENTA := \033[45m
BG_CYAN    := \033[46m
BG_WHITE   := \033[47m
