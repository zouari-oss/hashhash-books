# 🌀 Git Flow (Structured Workflow)

**Git Flow** is a well-organized branching strategy, especially suited for larger teams or release-driven projects.

## 📚 Overview of Branches

| Branch      | Purpose                             |
| ----------- | ----------------------------------- |
| `main`      | Always stable and production-ready  |
| `develop`   | Integration branch for all features |
| `feature/*` | New features and enhancements       |
| `release/*` | Prepares for a new release          |
| `hotfix/*`  | Emergency fixes to production       |
| `docs/*`    | Documentation updates               |

## 🔁 Workflow Steps

### 1. Start from `develop`

```bash
git checkout develop
```

### 2. Create a feature branch

```bash
git checkout -b feature/user-authentication
# work on feature...
```

### 3. Merge the feature back into `develop` (via PR)

```bash
git checkout develop
git merge feature/user-authentication
```

### 4. Create a release branch when ready

```bash
git checkout -b release/1.0.0
# Final testing, versioning, documentation, etc.
```

### 5. Merge `release/*` into both `main` and `develop`

```bash
git checkout main
git merge release/1.0.0

git checkout develop
git merge release/1.0.0
```

### 6. Tag the release

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
```

### 7. In case of production issues, create a hotfix

```bash
git checkout -b hotfix/1.0.1 main
# Apply fix...
# Merge into both main and develop
```

## ✅ Git Flow Summary

| Branch      | Example              | Description                             |
| ----------- | -------------------- | --------------------------------------- |
| `main`      | `main`               | Production-ready code only              |
| `develop`   | `develop`            | All completed features go here          |
| `feature/*` | `feature/user-login` | New features, bugfixes, enhancements    |
| `release/*` | `release/2.0.0`      | Prepping for an upcoming release        |
| `hotfix/*`  | `hotfix/2.0.1`       | Quick patch to production, post-release |

## 🔧 When to Use Git Flow

| Project Type              | Git Flow Suitability    |
| ------------------------- | ----------------------- |
| Solo project              | ❌ Overkill             |
| Small agile team          | ✅ Optional             |
| Mid-large release teams   | ✅✅ Recommended        |
| Regulated enterprise code | ✅✅ Highly Recommended |

> 📝 **Note**: Use tools like [Git Flow CLI](https://github.com/nvie/gitflow) or Git GUI integrations (like Sourcetree) to automate this process.

## 📝 TL;DR

- Use develop if you're following Git Flow or want better clarity.
- Use dev only if you're sure your team/project prefers a simpler name.
