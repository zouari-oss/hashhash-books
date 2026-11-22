# 📝 GitHub Flavored Markdown (GFM) Guide

> GitHub Flavored Markdown (GFM) is a strict superset of [CommonMark](https://commonmark.org/) with additional features that GitHub supports, like tables, task lists, strikethrough, syntax highlighting, and more.

## 📚 Table of Contents

- [Headings](#headings)
- [Text Formatting](#text-formatting)
- [Lists](#lists)
- [Links](#links)
- [Images](#images)
- [Blockquotes](#blockquotes)
- [Code](#code)
- [Tables](#tables)
- [Task Lists](#task-lists)
- [Strikethrough](#strikethrough)
- [Mentions & References](#mentions--references)
- [Emoji](#emoji)
- [HTML in Markdown](#html-in-markdown)
- [Escaping Characters](#escaping-characters)
- [Alert Blocks / Callouts](#alert-blocks-%2F-callouts)
- [References](#references)

## Headings

```md
# H1

## H2

### H3

#### H4

##### H5

###### H6
```

## Text Formatting

```md
_Italic_ or _Italic_  
**Bold** or **Bold**  
**_Bold Italic_**  
~~Strikethrough~~
```

## Lists

### Unordered

```md
- Item
- Item
  - Subitem

* Item
```

### Ordered

```md
1. First
2. Second
   1. Subitem
```

## Links

```md
[GitHub](https://github.com)

<https://github.com> <!-- Autolink -->
```

## Images

```md
![Alt text](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)
```

## Blockquotes

```md
> This is a quote.
>
> > Nested quote
```

## Code

### Inline Code

```md
Use `git status` to check the repo.
```

### Code Blocks

<pre>
<code>
```bash
# Bash
echo "Hello, world!"
```

```python
# Python
def greet():
    print("Hello, world!")
```

```js
// JavaScript
console.log("Hello, world!");
```
</code>
</pre>

## Tables

```md
| Name  | Age | City      |
| ----- | --- | --------- |
| Alice | 25  | New York  |
| Bob   | 30  | San Diego |
```

## Task Lists

```md
- [x] Task 1
- [ ] Task 2
  - [x] Subtask
```

## Strikethrough

```md
~~This text is crossed out~~
```

## Mentions & References

```md
@username — mention a user  
#123 — reference an issue or pull request
```

## Emoji

```md
:smile: :rocket: :+1:
```

👉 Full list: [GitHub Emoji Cheat Sheet](https://github.com/ikatyang/emoji-cheat-sheet)

## HTML in Markdown

You can embed raw HTML when needed:

```html
<p style="color: red;">This is red text.</p>
```

> ⚠️ Some HTML tags (like `<script>`) are blocked on GitHub for security reasons.

## Escaping Characters

Use backslashes to escape special characters:

```md
\*Not Italic\*
\# Not a heading
```

## Alert Blocks / Callouts

While **GitHub.com does not render these** as special blocks, they are commonly used in:

- GitHub Docs
- VS Code extensions
- MkDocs / Docusaurus

### Syntax

```md
[!NOTE]
This is a note block.

[!TIP]
Helpful tip here.

[!WARNING]
Important warning message.

[!CAUTION]
Be careful with this step.

[!IMPORTANT]
Critical info to know before continuing.
```

### Preview (for compatible renderers)

> \[!NOTE]
> This is a note block.

> \[!TIP]
> Helpful tip here.

> \[!WARNING]
> Important warning message.

> \[!CAUTION]
> Be careful with this step.

> \[!IMPORTANT]
> Critical info to know before continuing.

## References

- [GitHub Markdown Guide](https://guides.github.com/features/mastering-markdown/)
- [GitHub Flavored Markdown Spec](https://github.github.com/gfm/)
- [CommonMark Spec](https://spec.commonmark.org/)
- [Emoji Cheat Sheet](https://github.com/ikatyang/emoji-cheat-sheet)
