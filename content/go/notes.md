# GO-Lang notes

<!--toc:start-->

- [GO-Lang notes](#go-lang-notes)
  - [Neovim](#neovim)

<!--toc:end-->

- Go is considered "**post-OOP**" because it discards traditional class
  hierarchies and inheritance in favor of simple composition and implicit interfaces

## Neovim

For best neovim/go experience, install via `Mason`:

| Tool / Plugin   | Install                                                    | Description                                                                  |
| --------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `gopls`         | `:MasonInstall gopls`                                      | Official Go LSP server (autocomplete, diagnostics, rename, etc.)             |
| `delve`         | `:MasonInstall delve`                                      | Go debugger for `nvim-dap` / `dap-go`                                        |
| `golangci-lint` | `:MasonInstall golangci-lint`                              | Fast all-in-one linter runner                                                |
| `goimports`     | `:MasonInstall goimports`                                  | Formats code and auto-manages imports                                        |
| `gomodifytags`  | `:MasonInstall gomodifytags`                               | Add/remove struct tags (`json`, `yaml`, etc.)                                |
| `impl`          | `:MasonInstall impl`                                       | Generate interface implementations                                           |
| `gotests`       | `:MasonInstall gotests`                                    | Generate Go test skeletons                                                   |
| `go.nvim`       | Plugin install [go.nvim](https://github.com/ray-x/go.nvim) | Go development plugin for Neovim (tags, tests, DAP, commands, helpers, etc.) |
