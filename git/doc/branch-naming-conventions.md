# 🌿 Git Branch Naming Conventions

Consistent branch naming keeps your project organized, improves collaboration, and makes it easier to track changes in GitHub.

## 🧭 General Rules

1. **Use lowercase with hyphens** instead of spaces or underscores.  
   ✅ `feature/add-login-page`  
   ❌ `Feature_Add_Login_Page`

2. **Be descriptive and concise.**  
   The name should clearly describe what the branch is for.

3. **Avoid personal names** unless it’s for personal experimentation.  
   ✅ `fix/navbar-alignment`  
   ❌ `johns-edits`

4. **Prefix by type of work.**  
   Use a short, clear prefix to identify the purpose of the branch.

## 🧩 Common Prefixes

| Prefix      | Purpose                                       | Example                     |
| :---------- | :-------------------------------------------- | :-------------------------- |
| `feature/`  | New features or enhancements                  | `feature/add-login-page`    |
| `fix/`      | Bug fixes                                     | `fix/missing-footer-links`  |
| `hotfix/`   | Urgent production fixes                       | `hotfix/payment-crash`      |
| `docs/`     | Documentation updates                         | `docs/update-readme`        |
| `refactor/` | Code restructuring without functional changes | `refactor/api-client`       |
| `chore/`    | Maintenance or dependency updates             | `chore/update-dependencies` |
| `test/`     | Testing-related updates                       | `test/add-unit-tests`       |

## 🔢 Including Issue or Ticket Numbers

If you’re using GitHub Issues, Jira, or another tracker, include the issue or ticket number in the branch name:

```bash
feature/123-add-login-page
fix/456-footer-links
```

This helps automatically link commits and pull requests to related issues.

## 🧱 Structural Examples

You can use `/` to create a logical hierarchy for branches:

- `feature/ui/login-form`
- `fix/backend/api-timeout`
- `docs/guides/setup-instructions`

## 💡 Additional Tips

- Keep branch names **short (under ~50 characters)** when possible.
- Once a branch is pushed, **avoid renaming it** to prevent confusion.
- Follow a consistent structure across your team.
- Always delete merged branches to keep the repo clean.

## ✅ Example Branch Names

| Type     | Example                       | Description                          |
| :------- | :---------------------------- | :----------------------------------- |
| Feature  | `feature/user-authentication` | Add a new login/signup feature       |
| Bug Fix  | `fix/missing-footer-links`    | Fix broken footer links              |
| Hotfix   | `hotfix/payment-crash`        | Emergency patch for production issue |
| Docs     | `docs/update-readme`          | Update README or wiki                |
| Refactor | `refactor/api-client`         | Reorganize API client code           |

---

> **Following these conventions makes collaboration easier and your Git history cleaner.**
