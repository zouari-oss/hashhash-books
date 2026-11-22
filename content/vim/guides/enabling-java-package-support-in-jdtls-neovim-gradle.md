# 📘 Enabling Java Package Support in `jdtls` (Neovim + Gradle)

## 🧩 Problem

When using a Java package (e.g., **Lombok**, **Jackson**, **Guava**) in a Gradle-based project, `jdtls` (the Java Language Server used by Neovim) might not detect or resolve the library properly.

This leads to:

- IntelliSense or autocomplete not working
- Code navigation (Go to Definition, Hover) failing
- False diagnostics or missing imports

---

## ✅ General Solution

To ensure `jdtls` correctly recognizes any external Java package:

---

### ⚙️ 1. Add the Package to Gradle

In your `build.gradle` or `build.gradle.kts`, add the package to the dependencies block.

#### Example (`build.gradle`):

```groovy
dependencies {
    implementation 'com.google.guava:guava:32.1.2-jre' // Replace with your package
}
```

#### For annotation processors (like Lombok):

```groovy
dependencies {
    compileOnly 'org.projectlombok:lombok:1.18.32'
    annotationProcessor 'org.projectlombok:lombok:1.18.32'
}
```

Then run:

```bash
./gradlew build
```

---

### 🧪 2. Generate `.classpath` for `jdtls`

#### a) Add Eclipse plugin to your `build.gradle`:

```groovy
plugins {
    id 'eclipse' // See https://docs.gradle.org/current/userguide/eclipse_plugin.html
}
```

#### b) Run with configuration cache disabled:

```bash
./gradlew eclipse --no-configuration-cache
```

This generates the `.classpath` file needed by `jdtls` to resolve dependencies.

> ⚠️ Note: The `eclipse` plugin is **not compatible** with Gradle’s configuration cache. Use `--no-configuration-cache` or disable cache for this task permanently (see below).

---

### 🛠️ 3. \[Optional] Disable Configuration Cache for Eclipse Tasks

To avoid future errors, disable caching for the Eclipse task:

```groovy
tasks.named('eclipseClasspath').configure {
    outputs.cacheIf { false }
}
```

---

### 🚀 4. Restart `jdtls` in Neovim

After generating `.classpath`, restart Neovim or reattach the LSP:

```vim
:LspRestart
```

Now `jdtls` should recognize all project dependencies, including the newly added package.

---

## ✅ Summary

| Task                  | Command                                      |
| --------------------- | -------------------------------------------- |
| Add package to Gradle | Edit `build.gradle`                          |
| Generate `.classpath` | `./gradlew eclipse --no-configuration-cache` |
| Restart Neovim LSP    | `:LspRestart`                                |
