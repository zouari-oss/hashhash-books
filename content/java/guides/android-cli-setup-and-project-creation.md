# 📱 Android CLI Setup and Project Creation Guide (Arch Linux + Cookiecutter)

This guide covers how to set up Android development tools via the command line on **Arch Linux**, and how to generate a new **Gradle-based Android project** using **Cookiecutter templates**.

## ❗️Note: About the Old `android` CLI Tool

The following command:

```bash
android create project --target 1 --name MyApp --path ./MyApp --activity MainActivity --package com.example.myapp
```

...was used with the **old Android SDK Tools** to create **Ant-based projects**.

### ⚠️ Deprecated

- The `android` CLI tool was **deprecated and removed** after SDK Tools **25.3.0** (2017).
- It is **not compatible** with current Gradle-based Android development.
- All modern Android apps are expected to use **Gradle** and the Android Gradle Plugin.

🔄 Instead, you should use **Gradle**, **Android Studio**, or a **Cookiecutter template** to create new projects.

## 📦 Step 1: Install Java (JDK)

```bash
sudo pacman -S jdk-openjdk
```

Verify:

```bash
java -version
```

## ⚙️ Step 2: Install Gradle

```bash
sudo pacman -S gradle
```

Verify:

```bash
gradle -v
```

> Note: Most Android projects use a bundled `./gradlew` script, so global Gradle installation is optional.

## 📱 Step 3: Install Android SDK Tools

### Option 1: Using AUR

If you have an AUR helper like `yay`:

```bash
yay -S android-sdk android-sdk-platform-tools android-sdk-build-tools
yay -S android-platform android-support  # Optional
```

### Option 2: Manual Setup

1. Download the [command line tools](https://developer.android.com/studio#command-tools)
2. Extract to: `~/Android/cmdline-tools/latest`

## 🧠 Step 4: Set Environment Variables

Add the following to your shell config (`~/.bashrc`, `~/.zshrc`, etc.):

```bash
export ANDROID_HOME=$HOME/Android
export PATH=$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH
```

Reload:

```bash
source ~/.zshrc  # or ~/.bashrc
```

## 📥 Step 5: Install SDK Packages

```bash
sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
```

> Replace versions with your target API levels.

## 🍪 Step 6: Generate a Gradle Project with Cookiecutter

### 🔧 Install Cookiecutter

```bash
pip install cookiecutter
```

## 📁 Recommended Android Cookiecutter Templates

| Template                                             | Description                          | Usage                                                              |
| ---------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------ |
| **nthreads/cookiecutter-android-template**           | Basic Android Gradle project         | `cookiecutter gh:nthreads/cookiecutter-android-template`           |
| **romellfudi/AndroidLibProject**                     | App + library template (Java/Kotlin) | `cookiecutter gh:romellfudi/AndroidLibProject --checkout kotlin`   |
| **morristech/android-template-1**                    | Clean Architecture + modern libs     | `cookiecutter gh:raizlabs/android-template`                        |
| **wittgroup-inc/android-cookie-cutter-template**     | MVVM with popular libraries          | `cookiecutter gh:wittgroup-inc/android-cookie-cutter-template`     |
| **kodecocodes/kodeco-android-cookiecutter-template** | Tutorial-focused setup               | `cookiecutter gh:kodecocodes/kodeco-android-cookiecutter-template` |

## ▶️ Example: Create a Project

```bash
cookiecutter gh:nthreads/cookiecutter-android-template
```

Fill in:

- Project name
- Package (e.g., `com.example.myapp`)
- Activity name, etc.

## 🧪 Build & Run Your App (via CLI)

```bash
cd YourGeneratedProject/
./gradlew build           # Build the project
./gradlew assembleDebug   # Create debug APK
./gradlew installDebug    # Install on connected device
```

## ✅ Summary

| Tool           | Purpose                                |
| -------------- | -------------------------------------- |
| `sdkmanager`   | Manage Android SDK components          |
| `adb`          | Interact with devices/emulators        |
| `gradlew`      | Build, install, and test Android apps  |
| `cookiecutter` | Generate new Android project templates |

## 🔗 Resources

- [Android Command Line Tools](https://developer.android.com/studio#command-tools)
- [Gradle Build Tool](https://developer.android.com/build)
- [Cookiecutter Docs](https://cookiecutter.readthedocs.io/)
