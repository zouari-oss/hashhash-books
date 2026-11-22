# Git Notes

- [Git Notes](#git-notes)
  - [How to refresh gitignore?](#how-to-refresh-gitignore)
  - [Things to note to do when making changes to `.gitignore` file](#things-to-note-to-do-when-making-changes-to-gitignore-file)

## How to refresh gitignore?

- After creating a `.gitignore` file in your repository and setting patterns to match files which you do not want Git to track, Git starts tracking repository files and respecting the patterns set in the `.gitignore` file after you run the git add command (For example `git add .`).
- The problem is that if we later make some changes to the `.gitignore` file and then just run the git add command again, the changes made in the `.gitignore` file will not take effect.
- For example if you later set in the `.gitignore` file that you want Git to start tracking a file which you previously set to be ignored, the file will still be untracked if you just run the `git add .` command.
- This is because, the git cache **needs to be cleared**. I usually just do this with the `git rm -r --cached .` then after I run the `git add .` command to apply the `.gitignore` changes.

### Things to note to do when making changes to `.gitignore` file

- Here are just some points to note when making changes to the .gitgnore file to ensure Git is always tracking the right files.
  1. Make changes in `.gitignore` file.
  2. Run `git rm -r --cached .` command.
  3. Run `git add .` command
  4. `git commit -m "Commit message"` or just git commit or continue working.
- What is really important here is step 2. And remember to just run git add . command before doing any commit.

## Git Security

- To enable credential storage, Run one of these:

Cache temporarily (recommended for dev machines)

```bash
git config --global credential.helper cache
```

OR store permanently (less secure, but simple)

```bash
git config --global credential.helper store
```
