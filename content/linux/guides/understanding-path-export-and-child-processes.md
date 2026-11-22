# 🛣️ Understanding `PATH`, `export`, and Child Processes in Linux/Unix Shells

## 📌 What is `PATH`?

`PATH` is an environment variable that tells the shell **where to look for executable files** when you type a command.

Example:

```bash
echo $PATH
```

Typical output:

```
/usr/local/bin:/usr/bin:/bin:/home/youruser/bin
```

Each colon (`:`) separates a folder where the shell looks for programs.

## 🧠 Setting `PATH`: Two Ways

### ✅ 1. `export PATH=...`

This adds a directory to your `PATH` **and makes it available to child processes**.

```bash
export PATH="$PATH:$HOME/tools"
```

- Updates the current shell
- Also applies to any child processes (e.g., scripts, subprocesses)

### ⚠️ 2. `PATH=...`

This updates the `PATH` **only for the current shell session**, and **does NOT affect child processes**.

```bash
PATH="$PATH:$HOME/tools"
```

- Works in the current shell
- Child processes do **not** inherit this change

## 👶 What Are Child Processes?

A **child process** is any command or program that is launched from the current shell or script.

### Examples

| Command                  | Description         | Is It a Child Process? |
| ------------------------ | ------------------- | ---------------------- |
| `ls`                     | Basic shell command | ✅ Yes                 |
| `python3 script.py`      | Running a script    | ✅ Yes                 |
| `bash another_script.sh` | Subshell or script  | ✅ Yes                 |

Child processes **inherit environment variables** only if they are **exported**.

## 💥 Problem Example

### Situation

You have a custom script in `~/tools/myscript.sh` that you want to run from anywhere.

### Step 1: Add to PATH (without export)

```bash
PATH="$PATH:$HOME/tools"
```

Now running:

```bash
myscript.sh
```

✅ **Works in the current shell**

### Step 2: Run from a Python script

Create `runner.py`:

```python
import subprocess
subprocess.run(["myscript.sh"])
```

Run it:

```bash
python3 runner.py
```

❌ **Fails with error:**

```
FileNotFoundError: [Errno 2] No such file or directory: 'myscript.sh'
```

**Why?** Because the updated `PATH` was not exported — child processes don’t see it.

### ✅ Step 3: Proper Fix with `export`

```bash
export PATH="$PATH:$HOME/tools"
```

Now try:

```bash
python3 runner.py
```

✅ **Success!** The child process inherits the correct `PATH`.

## 🧾 Summary Table

| Command           | Affects Current Shell | Affects Child Processes | Use Case                    |
| ----------------- | --------------------- | ----------------------- | --------------------------- |
| `PATH=...`        | ✅ Yes                | ❌ No                   | Temporary, local changes    |
| `export PATH=...` | ✅ Yes                | ✅ Yes                  | Permanent or shared changes |

## 🗂 Best Practice: Add to `.bashrc` or `.zshrc`

If you want this change every time you open a terminal:

```bash
# ~/.bashrc or ~/.zshrc
export PATH="$PATH:$HOME/tools"
```

Then run:

```bash
source ~/.bashrc
# or
source ~/.zshrc
```

## ✅ TL;DR

- Use `export` when you want child processes (like scripts or subprocesses) to see your environment changes.
- Without `export`, changes to `PATH` are **local to the current shell only**.
