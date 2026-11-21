# Linux Container

<!--toc:start-->

- [Linux Container](#linux-container)
  - [LXC (Linux Containers)](#lxc-linux-containers)
  - [LXD](#lxd)
  - [LXC/LXD Vs. traditional VMs (QEMU, VirtualBox, KVM)](#lxclxd-vs-traditional-vms-qemu-virtualbox-kvm)
  - [Terms](#terms)
  - [Sources](#sources)

<!--toc:end-->

## LXC (Linux Containers)

- **What it is**: A low-level, operating-system-level virtualization interface
  for the Linux kernel.
- **How it works**: It uses kernel features like **cgroups** (for resource limits)
  and **namespaces** (for isolation) to run multiple isolated Linux environments
  using the host's single kernel.
- **Control**: Managed via low-level command-line tools (such as lxc-create,
  lxc-start) and libraries.

## LXD

- **What it is**: A higher-level, user-friendly container and virtual machine
  manager built on top of LXC.
- **Architecture**: It consists of a background daemon (lxd) that handles
  API requests and management, and a command-line client (lxc) used to
  talk to the daemon.
- **Key Features**: Unlike raw LXC, LXD adds network-based management,
  clustering across multiple servers, live migration, snapshots,
  image registries, and full virtual machine (KVM/QEMU) support
  alongside system containers

## LXC/LXD Vs. traditional VMs (QEMU, VirtualBox, KVM)

| Feature               | LXC / LXD (System Containers)                                      | QEMU / VirtualBox (Virtual Machines)                                      |
| :-------------------- | :----------------------------------------------------------------- | :------------------------------------------------------------------------ |
| **Kernel**            | Shares the host Linux kernel                                       | Boots its own dedicated guest kernel                                      |
| **Operating Systems** | Linux only                                                         | Linux, Windows, BSD, etc.                                                 |
| **Boot Time**         | 1 to 3 seconds                                                     | 30 to 90 seconds (or more)                                                |
| **RAM Overhead**      | Very low (~15 MB idle)                                             | Higher (~500 MB+ idle)                                                    |
| **Best Used For**     | Lightweight Linux services, databases, high-density server packing | Running non-Linux OSes, untrusted code, strict isolation, GPU passthrough |

## Terms

- **OverlayFS** is a [union mount](https://en.wikipedia.org/wiki/Union_mount) filesystem implementation for Linux. It combines multiple different underlying mount points into one, resulting in a single directory structure that contains underlying files and sub-directories from all sources. Common applications overlay a read/write partition over a read-only partition, such as with LiveCDs and IoT devices with limited flash memory write cycles.

## Sources

- [linuxcontainers.org](https://linuxcontainers.org) - The umbrella project behind Incus, LXC, LXCFS, Distrobuilder and more
- [unshare](https://man7.org/linux/man-pages/man1/unshare.1.html) - Linux command-line utility and system call used to run a program in newly created, isolated namespaces.
- [Linux containers the hard way | Simply explained](https://www.youtube.com/watch?v=_rwjwdKNPnQ)
- [Getting started with LXD Containerization (Full Guide!)](https://www.youtube.com/watch?v=aIwgPKkVj8s)
- [ZFS](https://linuxcontainers.org/incus/docs/main/reference/storage_zfs)
- [Automating Server Deployment at Scale with MAAS](https://lifeandshell.com/blog/automating-server-deployment-at-scale-with-maas)
