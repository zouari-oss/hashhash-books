# Notes

- **JavaScript (JS)** is one of the most popular coding languages in the world and allows pages to become interactive. HTML is used to create the website structure and content, while JavaScript is used to control the functionality of web pages - without JavaScript, a page would not have interactive elements and would always be static. JS can dynamically update the page in real-time, giving functionality to change the style of a button when a particular event on the page occurs (such as when a user clicks a button) or to display moving animations.
- ECMA-262 is the official name of the standard. ECMAScript is the official name of the language.
- It is most common to use single line comments. Block comments are often used for formal documentation.
- The simplest form of interactivity consists of an **event** caused by the user doing an **action**
- JavaScript uses the **Unicode** character set.
- JavaScript accepts both double and single quotes
- In HTML, JavaScript programs are executed by the web browser.
- All JavaScript identifiers are **case sensitive**.
- One of many JavaScript HTML methods is `getElementById()`.
- JavaScript Can Change HTML Content and Attribute Values

  ```js
  document.getElementById("demo").innerHTML = "Hello JavaScript";
  ```

- JavaScript Can Change HTML Styles (CSS)

  ```js
  // Change the element font size
  document.getElementById("demo").style.fontSize = "35px";
  // Hide the element
  document.getElementById("demo").style.display = "none";
  ```

- Old JavaScript examples may use a type attribute: `<script type="text/javascript">`. The type attribute is not required. JavaScript is the default scripting language in HTML.
- A JavaScript `function` is a block of JavaScript code, that can be executed when "called" for.
- You can place any number of scripts in an HTML document. Scripts can be placed in the `<body>`, or in the `<head>` section of an HTML page, or in both.
- Placing scripts at the bottom of the `<body>` element ==improves the display speed,== because script interpretation slows down the display.
- External scripts are practical when the same code is used in many different web pages. JavaScript files have the file extension **.js**:

  ```js
  <script src="myScript.js"></script>
  ```

- You can place an external script reference in `<head>` or `<body>` as you like.
- Placing scripts in external files has some advantages:
  - It separates HTML and code
  - It makes HTML and JavaScript easier to read and maintain
  - Cached JavaScript files can speed up page loads
- A good practice is to put spaces around operators ( = + - \* / )
- JavaScript keywords are reserved words. Reserved words cannot be used as names for variables.
- All the JS code for a web page can be grouped together in the HTML doc inside one **`<script>`** container tag. This method is called **internal JS**.
- The JS code within `<script>` tags is read and executed by the web browser when the page is loaded.
- Instructions are read and executed one by one, from top to bottom. The execution of the code will be interrupted if an error is found.
  ⭐ **internal JS** code is added inside the **`<script>`** container tag
  ⭐ the **console** helps you find and fix **bugs** in your code

---

## JavaScript Display Possibilities

- JavaScript can "display" data in different ways:
  - Writing into an HTML element, using `innerHTML`.
  - Writing into the HTML output using `document.write()`.
  - Writing into an alert box, using `window.alert()`.
  - Writing into the browser console, using `console.log()`.
- Changing the innerHTML property of an HTML element is a common way to display data in HTML.
- Using document.write() after an HTML document is loaded, will **delete all existing HTML**. This method should only be used for testing.
- In JavaScript, the window object is the global scope object. This means that variables, properties, and methods by default belong to the window object. This also means that specifying the `window` keyword is optional:

  ```js
  window.alert(5 + 6); // Just tape alert(5 + 6);
  ```

- For debugging purposes, you can call the `console.log()` method in the browser to display data.

---

## JavaScript Print

- JavaScript does not have any print object or print methods. You cannot access output devices from JavaScript.
- The only exception is that you can call the `window.print()` method in the browser to print the content of the current window.

---

## Semicolons

- Semicolons separate JavaScript statements.
- On the web, you might see examples without semicolons. Ending statements with semicolon is not required, but highly recommended.

---

## JavaScript Values

- The JavaScript syntax defines two types of values:
  - Fixed values
  - Variable values
- Fixed values are called **Literals**.
- Variable values are called **Variables**.
- The two most important syntax rules for fixed values (Literals) are:
  1. **Numbers** are written with or without decimals
  2. **Strings** are text, written within double or single quotes

---

## JavaScript Variables

- JavaScript uses the keywords `var`, `let` and `const` to **declare** variables.

---

## JavaScript Variables

- JavaScript Variables can be declared in 4 ways:
  - Automatically
  - Using `var`
  - Using `let`
  - Using `const`
- **Note:**
  - It is considered good programming practice to always declare variables before use.
  - The `var` keyword was used in all JavaScript code from 1995 to 2015.
  - The `let` and `const` keywords were added to JavaScript in 2015.
  - The `var` keyword should only be used in code written for older browsers.
- **When to Use var, let, or const?**
  1. Always declare variables
  2. Always use `const` if the value should not be changed
  3. Always use `const` if the type should not be changed (Arrays and Objects)
  4. Only use `let` if you can't use `const`
  5. Only use `var` if you MUST support old browsers.
- JavaScript identifiers are case-sensitive.
- After the declaration, the variable has no value (technically it is `undefined`).
- If you re-declare a JavaScript variable declared with `var`, it will not lose its value.

```js
var carName = "Volvo";
var carName;
```

- **Note:** You cannot re-declare a variable declared with `let` or `const`.
- If you put a number in quotes, the rest of the numbers will be treated as strings, and concatenated.

```js
let x = 2 + 3 + "5";
```

- Using the dollar sign is not very common in JavaScript, but professional programmers often use it as an alias for the main function in a JavaScript library.
- Using the underscore is not very common in JavaScript, but a convention among professional programmers is to use it as an alias for "private (hidden)" variables.

### JavaScript Let

- ***

## JavaScript Identifiers / Names

- A JavaScript name must begin with:
  - A letter (A-Z or a-z)
  - A dollar sign ($)
  - Or an underscore (\_)
- Subsequent characters may be letters, digits, underscores, or dollar signs.
- Numbers are not allowed as the first character in names. This way JavaScript can easily distinguish identifiers from numbers.

---

## JavaScript and Camel Case

- Hyphens are not allowed in JavaScript. They are reserved for subtractions.
- **Underscore**, **Upper Camel Case (Pascal Case)**, **Lower Camel Case** are allowed

---

## HTML Event Handlers

- **onclick** makes an action happen when the user clicks on an element.

---

## HTML DOM

### Element textContent

- The `textContent` property sets or returns the text content of the specified node, **and all its descendants**.
- Note: When you **set** the textContent property, all child nodes are removed and replaced by only one new text node.
