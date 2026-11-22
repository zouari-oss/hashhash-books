# logging.mk - Reusable Logging Framework for GNU Make
# CREATED: 2026-10-03 13:01
# UPDATED: 2026-10-03 13:01
# DEPPEND: colors.mk

# Timestamp function (Format: YYYY-MM-DD HH:MM:SS)
TIMESTAMP = $(shell date "+%Y-%m-%d %H:%M:%S")

LOG_INFO    = echo -e "$(TEXT_DIM)[$(TIMESTAMP)]$(TEXT_RESET) $(TEXT_BOLD)$(CYAN)[INFO]$(TEXT_RESET)"
LOG_SUCCESS = printf  "$(TEXT_DIM)[$(TIMESTAMP)]$(TEXT_RESET) $(TEXT_BOLD)$(BR_GREEN)[SUCCESS]$(TEXT_RESET) %b\n"
LOG_WARN    = printf  "$(TEXT_DIM)[$(TIMESTAMP)]$(TEXT_RESET) $(TEXT_BOLD)$(YELLOW)[WARN]$(TEXT_RESET) %b\n"
LOG_ERROR   = printf  "$(TEXT_DIM)[$(TIMESTAMP)]$(TEXT_RESET) $(TEXT_BOLD)$(RED)[ERROR]$(TEXT_RESET) %b\n"
