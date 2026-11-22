# Bash Notes

- `#!/usr/bin/bash`: This is a _shebang_ line that specifies the path to the Bash interpreter. It indicates that the script should be executed using Bash.
- `echo -n "Enter Number: "`: This line prints the prompt “Enter Number: ” without a newline character (`-n` option). It waits for the user to enter a number.
- `fi`: This marks the end of the if statement.
- `-gt`: Stands for “greater than” in the context of numerical comparison.
- `-lt`: Stands for “less than” in the context of numerical comparison.
- `-ge`: Stands for “greater than or equal to” in the context of numerical comparison.
- `-eq`: Stands for "equal to” in the context of numerical comparison.
- The basic syntax of an `if-elif-else` statement in Bash:

```sh
#!/bin/bash

if [ condition1 ]; then
# Code to be executed if condition1 is true
elif [ condition2 ]; then
# Code to be executed if condition2 is true
elif [ condition3 ]; then
# Code to be executed if condition3 is true
else
# Code to be executed if none of the conditions are true
fi
```

> You can use `-a` for logical AND and `-o` for logical OR.

## Introduction to Shell

- A _Linux terminal_, also called a _shell_ or _command line_, provides a text-based input/output (I/O) interface between users and the kernel for a computer system. The term console is also typical but does not refer to a window but a screen in text mode. In the terminal window, commands can be executed to control the system.
- The most commonly used shell in Linux is the Bourne-Again Shell (BASH), and is part of the GNU project. Everything we do through the GUI we can do with the shell. The shell gives us many more possibilities to interact with programs and processes to get information faster. Besides, many processes can be easily automated with smaller or larger scripts that make manual work much easier.
- Besides Bash, there also exist other shells like [Tcsh/Csh](https://en.wikipedia.org/wiki/Tcsh), [Ksh](https://en.wikipedia.org/wiki/KornShell), [Zsh](https://en.wikipedia.org/wiki/Z_shell), [Fish](<https://en.wikipedia.org/wiki/Fish_(Unix_shell)>) shell and others.

## Terminal Emulators

Terminal emulation is software that emulates the function of a terminal. It allows the use of text-based programs within a graphical user interface (GUI). There are also so-called command-line interfaces (CLI) that run as additional terminals in one terminal. In short, a terminal serves as an interface to the shell interpreter.

## Prompt Description

- The bash prompt is simple to understand. By default, it shows information like your username (who you are), your computer's name (hostname), and the folder/directory you're currently working in. It's a line of text that appears on the screen to let you know the system is ready for you. The prompt appears on a new line, and the cursor (the blinking line or box) is placed right after it, waiting for you to type a command.
- It can be customized to provide useful information to the user. The format can look something like this:

```bash
<username>@<hostname><current working directory>$
```

> - The home directory for a user is marked with a tilde <~> and is the default folder when we log in.
> - The dollar sign, in this case, stands for a user. As soon as we log in as root, the character changes to a hash <#>
> - we may not see the username, hostname, and current working directory. This may be due to the `PS1` variable in the environment not being set correctly.

- The `PS1` variable in Linux systems controls how your command prompt looks in the terminal.
- The prompt can be customized using special characters and variables in the shell’s configuration file:

| Special Character | Description                                |
| ----------------- | ------------------------------------------ |
| `\d`              | Date (Mon Feb 6)                           |
| `\D{%Y-%m-%d}`    | Date (YYYY-MM-DD)                          |
| `\H`              | Full hostname                              |
| `\j`              | Number of jobs managed by the shell        |
| `\n`              | Newline                                    |
| `\r`              | Carriage return                            |
| `\s`              | Name of the shell                          |
| `\t`              | Current time 24-hour (HH:MM:SS)            |
| `\T`              | Current time 12-hour (HH:MM:SS)            |
| `\@`              | Current time                               |
| `\u`              | Current username                           |
| `\w`              | Full path of the current working directory |

## Tips

### `$*` vs `$@`

- `$*` expands to **a single argument** with all the elements delimited by spaces (actually the first character of `$IFS`).
- `$@` expands to **multiple arguments**.
- For example

```bash
# !/bin/bash
# /tmp/test 1  2 "3  4"

echo "With *:"
for arg in "$*"; do echo "<$arg>"; done

echo "With @:"
for arg in "$@"; do echo "<$arg>"; done

# Output
# With *:
# <1 2 3  4>
# With @:
# <1>
# <2>
# <3  4>
```
