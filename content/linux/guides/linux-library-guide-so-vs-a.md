# Linux Library Types: `.so` vs `.a` and `ldconfig` Guide

This guide explains the differences between **shared** (`.so`) and **static** (`.a`) libraries in Linux, how they are used, and the role of `ldconfig`.

## 📦 Library Types Overview

| Feature               | `.so` (Shared Library)   | `.a` (Static Library)        |
| --------------------- | ------------------------ | ---------------------------- |
| Full Name             | Shared Object            | Archive                      |
| Linking               | Runtime                  | Compile-time                 |
| Used By               | Dynamic Linker (`ld.so`) | Compiler (`gcc`, `clang`)    |
| Needs `ldconfig`      | ✅ Yes                   | ❌ No                        |
| Dependency at Runtime | ✅ Yes                   | ❌ No (compiled into binary) |
| Binary Size           | Smaller                  | Larger                       |
| Modifications         | No recompilation needed  | Requires recompilation       |

## 🔧 Using Shared Libraries (`.so`)

### Compiling with `.so`

```bash
gcc -o myprogram main.c -L/path/to/libs -lmylib
```

- `-L` adds a library path.
- `-l` links `libmylib.so`.

### Making `.so` available system-wide

1. Move `.so` to a known directory (e.g., `/usr/local/lib`).
2. Add the path to `/etc/ld.so.conf.d/mylibs.conf`:

   ```
   /usr/local/lib
   ```

3. Run `ldconfig`:

   ```bash
   sudo ldconfig
   ```

### Checking registered libraries

```bash
ldconfig -p
```

## 📚 Using Static Libraries (`.a`)

### Compiling with `.a`

```bash
gcc -o myprogram main.c /path/to/libmylib.a
```

Or using `-L` and `-l`:

```bash
gcc -o myprogram main.c -L/path/to/libs -lmylib
```

> Note: `lib` prefix and `.a` suffix are implied in `-lmylib`.

### No `ldconfig` required

- `.a` files are used **only at compile time**.
- They do **not require system registration**.
- The system doesn't manage them with `ldconfig`.

## 🧰 Tools Overview

| Tool       | Purpose                                      | Applies to   |
| ---------- | -------------------------------------------- | ------------ |
| `ldconfig` | Updates runtime linker cache (`ld.so.cache`) | `.so`        |
| `gcc`      | Compiles and links programs                  | `.so` + `.a` |
| `ar`       | Inspects or creates static library archives  | `.a`         |
| `ldd`      | Lists dynamic dependencies of a binary       | `.so`        |

## 🧠 Summary

- Use `.so` for modular, dynamic linking. Requires `ldconfig` to register.
- Use `.a` for self-contained binaries. No `ldconfig` needed.
- Use `-L` and `-l` for both, or direct `.a` file paths.

## 📝 Examples

### Example 1: Dynamic Linking

```bash
# Using libmystuff.so from /opt/mylibs
export LD_LIBRARY_PATH=/opt/mylibs
gcc -o app main.c -L/opt/mylibs -lmystuff
./app
```

### Example 2: Static Linking

```bash
# Using libmystuff.a
gcc -o app main.c /opt/mylibs/libmystuff.a
```

## 📎 Reference

- [`ldconfig` man page](https://man7.org/linux/man-pages/man8/ldconfig.8.html)
- [`ar` man page](https://man7.org/linux/man-pages/man1/ar.1.html)
- [`gcc` man page](https://man7.org/linux/man-pages/man1/gcc.1.html)
