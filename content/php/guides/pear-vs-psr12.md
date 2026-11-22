# 🧾 PEAR vs PSR-12 — PHP Coding Standards Comparison

This guide compares two popular PHP coding standards: **PEAR** and **PSR-12**. It helps developers decide which standard to use, depending on project goals, team preferences, and modern best practices.

## 📌 What Are These Standards?

### 🧱 PEAR (PHP Extension and Application Repository)

- One of the earliest PHP coding standards.
- Originated in the PHP 4 / PHP 5 era.
- Enforced by `phpcs` under the `PEAR` ruleset.
- Focused on strict formatting rules, docblocks, and spacing.

### 🧪 PSR-12 (PHP Standards Recommendation)

- Published by the PHP-FIG group.
- Extends [PSR-1](https://www.php-fig.org/psr/psr-1/) and [PSR-2](https://www.php-fig.org/psr/psr-2/).
- Created for modern PHP (7.1+), including namespaces, type hints, etc.
- Widely adopted by frameworks and libraries like Laravel, Symfony, Composer, and WordPress.

## 🔍 Key Differences

| Feature                           | PEAR                                       | PSR-12                                    |
| --------------------------------- | ------------------------------------------ | ----------------------------------------- |
| **Release Era**                   | Early 2000s                                | 2019                                      |
| **Target PHP Version**            | PHP 4 / 5                                  | PHP 7.1+                                  |
| **Class Brace Style**             | On the **next line**<br>`class MyClass\n{` | On the **same line**<br>`class MyClass {` |
| **File-Level Docblock Required?** | ✅ Yes                                     | ❌ No                                     |
| **Function Declaration**          | Requires detailed docblocks                | Allows type hints + optional docblocks    |
| **Line Length**                   | 75 chars recommended (soft), 85 max        | 120 chars (soft)                          |
| **Namespacing Support**           | ❌ None (pre-namespaces)                   | ✅ Fully supported                        |
| **Strictness**                    | 🟥 Very strict (outdated rules)            | ✅ Strict + modern                        |
| **Common in 2025?**               | ❌ Rare                                    | ✅ Industry standard                      |
| **Formatting Tool Support**       | `phpcs`                                    | `phpcs`, `php-cs-fixer`, `Prettier`, IDEs |
| **Ideal Use Case**                | Legacy PEAR projects                       | All modern PHP projects                   |

## ⚙️ How to Use in `phpcs`

### ✅ PSR-12 (Recommended)

In your Neovim (via `null-ls` or `conform.nvim`), pass:

```bash
--standard=PSR12
```

Or create a `phpcs.xml` in your project root:

```xml
<?xml version="1.0"?>
<ruleset name="MyProject">
  <rule ref="PSR12"/>
</ruleset>
```

### ❌ PEAR (Legacy)

PEAR will be used if no standard is specified (on some systems), or explicitly set with:

```bash
--standard=PEAR
```

## 🛠 Recommended for Neovim Users

If you're using Neovim with `mason.nvim`, `null-ls`, and `phpcs`:

### Null-ls config for PSR-12

```lua
null_ls.builtins.diagnostics.phpcs.with({
  extra_args = { "--standard=PSR12" },
})
```

### php-cs-fixer (optional)

```lua
null_ls.builtins.formatting.php_cs_fixer.with({
  extra_args = { "--rules=@PSR12" },
})
```

## 🧠 Final Recommendation

| Scenario                                  | Recommended Standard |
| ----------------------------------------- | -------------------- |
| Building new apps                         | ✅ PSR-12            |
| Working in Laravel, Symfony, WordPress    | ✅ PSR-12            |
| Maintaining legacy PEAR-based code        | 🟡 PEAR              |
| Want modern, readable, team-friendly code | ✅ PSR-12            |

## 📚 Resources

- [PHP_CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer)
- [PSR-12 Full Spec](https://www.php-fig.org/psr/psr-12/)
- [PSR-2 (Superseded)](https://www.php-fig.org/psr/psr-2/)
- [PEAR Coding Standards](https://pear.php.net/manual/en/standards.php)
