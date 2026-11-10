# LFS101 Notes

<!--toc:start-->

- [LFS101 Notes](#lfs101-notes)
  - [Linux GUI](#linux-gui)

<!--toc:end-->

## Linux GUI

- Linux provides two interfaces: the **GUI** for visual navigation and the **CLI** for efficiency and precise control. This course starts with the GUI.
- The **desktop environment** is an interchangeable component built around a session manager and window manager. This course uses **GNOME**, though other common options include KDE Plasma, Cinnamon, XFCE, and MATE.
- The **Display Manager** (GDM3 on GNOME) handles login and launches the desktop at boot. **Wayland** is now the default display server on most current distributions, replacing X11. **XWayland** maintains compatibility for older applications.
- Linux is a **multi-user system**: sessions can run simultaneously and independently. Sessions can be switched, locked (`Super+L`), suspended, or ended from the system menu. Locking the screen does not interrupt running processes.
- Desktop **appearance** is configured through **Settings → Appearance**. **GNOME Tweaks** and **GNOME Extensions** provide access to additional options not available in standard Settings.
- Applications are launched most efficiently through the **Activities Overview** (Super key). Default applications are set through **Settings → Default Applications**.
- The **Files** app (Nautilus) is GNOME's file manager. Every user has a home directory at `/home/username`. Key shortcuts: `Ctrl+H` (hidden files), `Ctrl+F` (search), Ctrl+L (navigate to path). Deleted files go to the **Trash** and can be recovered until emptied.
