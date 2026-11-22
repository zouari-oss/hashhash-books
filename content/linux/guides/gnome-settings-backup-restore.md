# Export and Import GNOME Settings (dconf & Dotfiles)

<!--toc:start-->

- [Export and Import GNOME Settings (dconf & Dotfiles)](#export-and-import-gnome-settings-dconf-dotfiles)
  - [Exporting GNOME Settings](#exporting-gnome-settings)
    - [Export All Settings](#export-all-settings)
    - [Export Specific GNOME Subtrees (Recommended)](#export-specific-gnome-subtrees-recommended)
  - [Importing (Restoring) GNOME Settings](#importing-restoring-gnome-settings)
    - [Restore Full Backup](#restore-full-backup)
    - [Restore Specific Subtrees](#restore-specific-subtrees)
  - [Resetting Settings (Optional)](#resetting-settings-optional)
  - [Backing Up Installed GNOME Extensions](#backing-up-installed-gnome-extensions)
  - [Quick Reference Table](#quick-reference-table)

<!--toc:end-->

GNOME stores its configuration in a centralized binary database managed by **dconf**. Because binary files are difficult to track in version control (like Git), you can dump your settings into human-readable INI text files to back them up or manage them in your dotfiles.

## Exporting GNOME Settings

Use `dconf dump` to export settings from a specific path into an INI file.

### Export All Settings

To export your entire `dconf` database (desktop settings, GNOME extensions, and GTK app preferences):

```bash
dconf dump / > ~/dotfiles/gnome/dconf-settings.ini
```

### Export Specific GNOME Subtrees (Recommended)

Dumping `/` includes temporary state data (like recent files or window positions). For cleaner dotfiles, export only the specific paths you care about:

- **Desktop & Interface (themes, fonts, dark mode, wallpaper):**

  ```bash
  dconf dump /org/gnome/desktop/ > ~/dotfiles/gnome/desktop.ini
  ```

- **Keyboard Shortcuts & Window Manager:**

  ```bash
  dconf dump /org/gnome/settings-daemon/plugins/media-keys/ > ~/dotfiles/gnome/keybindings.ini
  dconf dump /org/gnome/desktop/wm/keybindings/ > ~/dotfiles/gnome/wm-keybindings.ini
  ```

- **GNOME Shell & Extensions:**

  ```bash
  dconf dump /org/gnome/shell/ > ~/dotfiles/gnome/shell.ini
  ```

- **GNOME Terminal / Ptyxis / Text Editor:**

  ```bash
  dconf dump /org/gnome/terminal/ > ~/dotfiles/gnome/terminal.ini
  ```

## Importing (Restoring) GNOME Settings

Use `dconf load` to restore settings from your INI file back into the `dconf` database on a new machine or after a fresh OS install.

> **Important:** The path passed to `dconf load` **must match** the path used when running `dconf dump`.

### Restore Full Backup

```bash
dconf load / < ~/dotfiles/gnome/dconf-settings.ini
```

### Restore Specific Subtrees

```bash
dconf load /org/gnome/desktop/ < ~/dotfiles/gnome/desktop.ini
dconf load /org/gnome/shell/ < ~/dotfiles/gnome/shell.ini
dconf load /org/gnome/settings-daemon/plugins/media-keys/ < ~/dotfiles/gnome/keybindings.ini
dconf load /org/gnome/desktop/wm/keybindings/ < ~/dotfiles/gnome/wm-keybindings.ini
```

## Resetting Settings (Optional)

If you want to wipe a section clean before loading a fresh configuration, use `dconf reset -f` (the `-f` flag forces a recursive reset):

```bash
dconf reset -f /org/gnome/desktop/
dconf load /org/gnome/desktop/ < ~/dotfiles/gnome/desktop.ini
```

## Backing Up Installed GNOME Extensions

While `dconf` saves extension _configurations_, it does not install the extension files themselves. Save your list of installed extensions alongside your `.ini` files:

- **Export extension list:**

  ```bash
  gnome-extensions list > ~/dotfiles/gnome/extensions.txt
  ```

- **Enable extensions on a new machine (after installing them):**

  ```bash
  xargs -n 1 gnome-extensions enable < ~/dotfiles/gnome/extensions.txt
  ```

## Quick Reference Table

| Action                      | Command                                                |
| :-------------------------- | :----------------------------------------------------- |
| **Export all settings**     | `dconf dump / > settings.ini`                          |
| **Export desktop settings** | `dconf dump /org/gnome/desktop/ > desktop.ini`         |
| **Import all settings**     | `dconf load / < settings.ini`                          |
| **Import desktop settings** | `dconf load /org/gnome/desktop/ < desktop.ini`         |
| **Reset a specific path**   | `dconf reset -f /org/gnome/desktop/`                   |
| **Read a single key**       | `dconf read /org/gnome/desktop/interface/color-scheme` |
