# 🧠 How to Install Cisco Packet Tracer on Arch Linux

> ⚠️ Cisco does **not** allow direct downloads of Packet Tracer via scripts due to licensing restrictions. You must manually download the `.deb` package from Cisco NetAcad.

## 📦 Prerequisites

Before you begin:

- ✅ You need a [Cisco NetAcad account](https://www.netacad.com/)
- ✅ Make sure your system is up to date:

```bash
sudo pacman -Syu
```

- ✅ Install build tools:

```bash
sudo pacman -S --needed base-devel git
```

## 🛠️ Method 1: Using AUR Helper (e.g., `yay`)

### 1. **Install yay (if not installed)**

```bash
sudo pacman -S yay
```

### 2. **Download the `.deb` file from Cisco**

1. Go to: [Cisco Packet Tracer Downloads](https://www.netacad.com/portal/resources/packet-tracer)
2. Sign in with your Cisco account
3. Download the correct `.deb` file, e.g.:
   - `Packet_Tracer822_amd64_signed.deb`

### 3. **Start the installation**

```bash
yay -S packettracer
```

You will see an error like:

```
==> ERROR: Packet_Tracer822_amd64_signed.deb was not found in the build directory and is not a URL.
```

### 4. **Move the `.deb` file to the build directory**

```bash
mv ~/Downloads/Packet_Tracer822_amd64_signed.deb ~/.cache/yay/packettracer/
```

### 5. **Re-run the installation**

```bash
yay -S packettracer
```

It should now proceed with the build and install.

## 🧱 Method 2: Manual AUR Installation

Use this method if you prefer building manually without an AUR helper.

### 1. **Download the `.deb` file**

1. Go to [Cisco Networking Academy](https://www.netacad.com/)
2. Log in or create an account
3. Navigate to the **Packet Tracer** download page
4. Download the latest `.deb` file, for example:
   - `CiscoPacketTracer_811_Ubuntu_64bit.deb`

### 2. **Clone the AUR repo manually**

```bash
git clone https://aur.archlinux.org/packettracer.git
cd packettracer
```

### 3. **Copy the `.deb` file into the build directory**

```bash
cp ~/Downloads/CiscoPacketTracer_811_Ubuntu_64bit.deb .
```

> 🔁 Make sure the filename in the PKGBUILD matches the downloaded file. You may need to edit the `PKGBUILD` if Cisco updated the version.

### 4. **Build and install**

```bash
makepkg -si
```

## ▶️ Running Packet Tracer

You can now launch Packet Tracer from your terminal:

```bash
packettracer
```

Or find it in your **application launcher**.

## 🔄 Updating Packet Tracer

When Cisco releases a new version:

- For `yay` users:

  ```bash
  yay -S packettracer
  ```

- For manual installs:

```bash
cd packettracer
git pull
makepkg -si
```

Download the new `.deb` file as needed and replace the old one.

## ❌ Uninstallation

To remove Packet Tracer:

```bash
sudo pacman -Rns packettracer
```

## 🧪 Troubleshooting

- **Missing `.deb` file**:
  - Make sure the `.deb` is in the right directory
  - Check that the filename matches what the `PKGBUILD` expects

- **Missing libraries**:

  ```bash
  ldd /usr/bin/packettracer
  ```

- **Common fix for missing libpng12**:

  ```bash
  yay -S libpng12
  ```

- **Crash on launch**:
  - Run from terminal to see error messages:

    ```bash
    packettracer
    ```
