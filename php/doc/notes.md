# PHP Notes

## What is PHP?

- PHP is an acronym for "PHP: Hypertext Preprocessor"
- PHP is a widely-used, open source scripting language
- PHP scripts are executed on the server
- PHP is free to download and use

## What is a PHP File?

- PHP files can contain text, HTML, CSS, JavaScript, and PHP code
- PHP code is executed on the server, and the result is returned to the browser as plain HTML
- PHP files have extension "`.php`"

## What Can PHP Do?

- PHP can generate dynamic page content
- PHP can create, open, read, write, delete, and close files on the server
- PHP can collect form data
- PHP can send and receive cookies
- PHP can add, delete, modify data in your database
- PHP can be used to control user-access
- PHP can encrypt data

## Why PHP?

- PHP runs on various platforms (Windows, Linux, Unix, Mac OS X, etc.)
- PHP is compatible with almost all servers used today (Apache, IIS, etc.)
- PHP supports a wide range of databases
- PHP is free. Download it from the official PHP resource: [www.php.net](http://www.php.net/)
- PHP is easy to learn and runs efficiently on the server side

# What Do I Need?

To start using PHP, you can:

- Find a web host with PHP and MySQL support
- Install a web server on your own PC, and then install PHP and MySQL

```php
 echo phpversion();
```

## PHP Syntax

### Basic PHP Syntax

- A PHP script starts with `<?php` and ends with `?>`.
- The default file extension for PHP files is "`.php`".
- A PHP file normally contains HTML tags, and some PHP scripting code.

### PHP Case Sensitivity

- In PHP, keywords (e.g. `if`, `else`, `while`, `echo`, etc.), classes, functions, and user-defined functions are ==not case-sensitive==.
- **Note:** However; all variable names are case-sensitive!

### PHP Comments

- Syntax for comments in PHP code:

```php
 // This is a single-line comment
 # This is also a single-line comment
 /* This is a
 multi-line comment */
```

- The multi-line comment syntax can also be used to prevent execution of parts inside a code-line:

```php
 $x = 5 /* + 15 */ + 5;
 echo $x;
```

## PHP Variables

- In PHP, a variable starts with the `$` sign, followed by the name of the variable.
- **Note:** When you assign a text value to a variable, put quotes around the value.
- **Note:** Unlike other programming languages, PHP has no command for declaring a variable. It is created the moment you first assign a value to it.
- Rules for PHP variables:
  - A variable starts with the `$` sign, followed by the name of the variable
  - A variable name must start with a letter or the underscore character
  - A variable name cannot start with a number
  - A variable name can only contain alpha-numeric characters and underscores (A-z, 0-9, and \_ )
  - Variable names are case-sensitive (`$age` and `$AGE` are two different variables)

## PHP is a Loosely Typed Language

- PHP automatically associates a data type to the variable, depending on its value. Since the data types are not set in a strict sense, you can do things like adding a string to an integer without causing an error.
- In PHP 7, type declarations were added. This gives an option to specify the data type expected when declaring a function, and by enabling the strict requirement, it will throw a "Fatal Error" on a type mismatch.

