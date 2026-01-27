# Understanding GraalVM: Essential for Building Native Android Apps with GluonFX

## What is GraalVM?

GraalVM is a high-performance runtime environment developed by Oracle that supports multiple programming languages, including Java. One of its key features is the ability to compile Java applications **ahead-of-time (AOT)** into native executables using its **native-image** tool.

## Why GraalVM Matters for GluonFX Android Builds

When building JavaFX applications for Android using GluonFX, GraalVM is essential because:

- It **compiles your JavaFX app into a native Android binary (`.apk`)**.
- This native compilation means the app:
  - Starts faster
  - Uses less memory
  - Runs efficiently on Android devices without a full JVM
- It integrates with Android SDK and NDK tools during the build process.

## How GraalVM Works in Your Build Process

1. You write your JavaFX application as usual.
2. Using the GluonFX Maven plugin, your app is processed.
3. GraalVM’s native-image tool compiles the Java bytecode **ahead-of-time** into a native executable.
4. The native executable is packaged into an Android `.apk` file.
5. You get a ready-to-install Android app.

## Installing GraalVM Using SDKMAN

SDKMAN! is a handy tool for managing multiple versions of SDKs on Unix-based systems (Linux, macOS). It can simplify GraalVM installation.

### Steps to Install GraalVM with SDKMAN

1. **Install SDKMAN!** (if not installed):

   ```bash
   curl -s "https://get.sdkman.io" | bash
   source "$HOME/.sdkman/bin/sdkman-init.sh"
   ```

2. **List available GraalVM versions:**

   ```bash
   sdk list java | grep graal
   ```

3. **Install a GraalVM version compatible with GluonFX:**

   For example:

   ```bash
   sdk install java 22.3.0.r17-grl
   ```

4. **Set GraalVM as your active JDK:**

   ```bash
   sdk use java 22.3.0.r17-grl
   ```

5. **Verify installation:**

   ```bash
   java -version
   ```

   You should see GraalVM information.

## Summary

| Feature           | Explanation                                  |
| ----------------- | -------------------------------------------- |
| GraalVM           | A runtime with ahead-of-time compilation     |
| Native-image      | Tool in GraalVM that creates native binaries |
| GluonFX + GraalVM | Used together to build native Android apps   |
| Output            | Native `.apk` file for Android devices       |

## Additional Resources

- [GraalVM Official Website](https://www.graalvm.org/)
- [GraalVM Native Image Documentation](https://www.graalvm.org/reference-manual/native-image/)
- [GluonFX Plugin Documentation](https://docs.gluonhq.com/)
- [SDKMAN! Official Website](https://sdkman.io/)

---

_This guide is for developers building JavaFX apps for Android using GluonFX and GraalVM._
