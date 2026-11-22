# Git Commit Message Convention

> This is adapted from [Angular's commit convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular).

## Examples

Appears under "Features" header, `blog` context:

```
feat(blog): add comments section
```

Appears under "Bug Fixes" header, `landing` context, with a link to issue #28:

```
fix(landing): handle events on click on rewards

close #28
```

Appears under "Performance Improvements" header, and under "Breaking Changes" with the breaking change explanation:

```
perf(landing): improve carousel by removing 'foo' option

BREAKING CHANGE: The 'foo' option has been removed.
```

The following commit and commit `667ecc1` do not appear in the changelog if they are under the same release. If not, the revert commit appears under the "Reverts" header.

```
revert: feat(blog): add comments section

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```

## Full Message Format

A commit message consists of a **header**, **body** and **footer**. The header has a **type**, **scope** and **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header**, with the **type** and the **subject**, is mandatory. The **scope** of the header is optional.

The **body** and **footer** are optional.

## Revert

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of the reverted commit. In the body, it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

## Type

If the prefix is:

- `feat`: a new feature for the user
- `fix`: a bug fix for the user
- `perf`: a code change that improves performance

Other prefixes are up to your discretion for non-changelog related tasks. Suggested prefixes are:

- `docs`: improvements or additions to documentation
- `ui`: changes to the UI components, design, or layout
- `style`: changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: changes to how the code is structured, but not changing its behavior
- `test`: adding missing tests or correcting existing tests
- `chore`: general tasks not related to the codebase (typo fixes, updating dependencies, build config, CI config, etc)

## Scope

The scope should be the context of the commit change. For example, if you are working on the blog, the scope would be `blog`. If you are working on the rewards system, the scope would be `rewards`. If the commit is not related to a specific context, you can omit the scope.

## Subject

The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

## Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

## Footer

The footer can contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.
