# GraalVM Native Image Build Fails on Arch Linux with cgroup v2 NullPointerException

## Overview

When building a native image using GraalVM’s native-image tool on Arch Linux (or other distros using cgroup v2), you might encounter a fatal error like this:

```
Fatal error: java.lang.NullPointerException: Cannot invoke "jdk.internal.platform.CgroupInfo.getMountPoint()" because "anyController" is null
```

This happens during the native image compilation phase and causes the build to fail.

## What is cgroup?

**cgroup (Control Groups)** is a Linux kernel feature used to limit, account for, and isolate the resource usage (CPU, memory, disk I/O, etc.) of a collection of processes.

- There are two versions: **cgroup v1** and **cgroup v2**.
- Most modern Linux distributions, including Arch Linux, now use **cgroup v2** by default.

## Why does this error occur?

- GraalVM’s native-image tries to detect resource limits by querying cgroup information.
- It expects certain cgroup controllers and mount points to be present.
- On systems using cgroup v2 (like Arch Linux), those controllers or mount points may be missing or structured differently.
- This leads to a `NullPointerException` inside the GraalVM native-image tool when it tries to access a non-existent cgroup controller.

## Is this a problem with your Linux distro?

No. This is **not a distro bug**. Your system is using a modern, standard configuration with cgroup v2. The problem lies in:

- GraalVM not fully handling cgroup v2 scenarios where certain controllers are missing (especially on non-containerized environments).
- GraalVM expects container-related cgroup info even when you are running on a bare metal system.

## Workaround: Disable Container Support in native-image

You can tell GraalVM to **skip container metrics detection** during native image build by adding this option:

```
-H:-UseContainerSupport
```

### How to apply this in your Maven build?

If you use `gluonfx-maven-plugin`, add the following configuration in your `pom.xml` under the plugin's `<configuration>` section:

```xml
<configuration>
    <nativeImageArgs>
        <arg>-H:-UseContainerSupport</arg>
    </nativeImageArgs>
</configuration>
```

Or run the native-image command manually with:

```bash
native-image -H:-UseContainerSupport ...
```

## Summary

| Item                    | Description                                                             |
| ----------------------- | ----------------------------------------------------------------------- |
| **Root Cause**          | GraalVM native-image crashes on cgroup v2 missing controllers           |
| **Distro Impacted**     | Any Linux distro using cgroup v2 (e.g., Arch Linux)                     |
| **Solution**            | Disable container support in native-image via `-H:-UseContainerSupport` |
| **Is it a distro bug?** | No                                                                      |

## References

- [GraalVM GitHub issue on cgroup v2 NullPointerException](https://github.com/oracle/graal/issues/)
- [Gluon Docs - Native Image Configuration](https://docs.gluonhq.com/)
- [Linux cgroup documentation](https://man7.org/linux/man-pages/man7/cgroups.7.html)

---

If the problem persists after applying the workaround, consider updating to the latest GraalVM version or checking GraalVM’s GitHub for ongoing fixes related to cgroup v2 support.

> For me, I use Linux Arch 6.15.9-arch1-1 - cgroup V2,
> I disabled the container support flag
> I tried with `22.1.0.1.r17-gln` (Gluon), `22.1.0.1.r11-gln` (Gluon), `24.0.2-graal` (GraalVM Oracle), `24.0.2-graalce` (GraalVM CE)
> And it didn't work :)
