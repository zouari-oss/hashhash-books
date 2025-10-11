# Notes

- The main difference between C and C++ is that C++ support classes and objects, while C does not.
- **Note:** It is recommended to use descriptive names in order to create understandable and maintainable code (like: age, sum, totalVolume).
- When you do not want others (or yourself) to change existing variable values, use the `const` keyword (this will declare the variable as "constant", which means **unchangeable and read-only**):
  `const int myNum = 15;  // myNum will always be 15`  
  `myNum = 10;  // error: assignment of read-only variable 'myNum'`
- A **constant** is an expression with a fixed value. It cannot be changed while the program is running. Use the `const` keyword to define a constant variable.
- When you declare a constant variable, it must be assigned with a value.
- A #HashMap is a data structure in which the elements are stored in key-value pairs such that every key is mapped to a value using a hash function. In C++, hash maps are implemented using the unordered_map container class. (more info from [her](https://www.geeksforgeeks.org/how-to-use-hashmap-in-cpp))
- The #NULL value represents the intentional absence of any object value. It is one of JavaScript's [primitive values](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) and is treated as [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) for boolean operations.
- There is 2 types of memory allocation:
  - Static memory allocation.
  - Dynamic memory allocation:

    ```cpp
    int *p = new int(10);  // Allocate 1 block of memory + value = 10
    delete p;  // Deallocate p
    int *P = new int[10];  // Allocate 10 block of memory
    P[0] = 10; P[1] = 20;  // Value1 and value2
    delete[] P;  // Deallocate P
    ```

## C++ && Testing

- **If you want to make a combustible tests you can use this trick:**

  ```cpp
  int main(int argc, char const *argv[]) {
  #ifndef __TEST__
   freopen("../doc/input", "r", stdin);
   freopen("../out/output", "w", stdout);
  #endif  // __TEST__
   return 0;
  }
  ```

- In C++, when you access an element in a `std::unordered_map` (or `std::map`) using the `[]` operator, if the key does not already exist, it will be inserted with a default value. For integers, the default value is `0`.
- Other way to test your program is by including **[C++ Assert](https://www.programiz.com/cpp-programming/assertions)** (`#include <cassert>`) or using [gtest](http://google.github.io/googletest) tool

## Functions

- `lower_bound()` [lower_bound in C++](https://www.geeksforgeeks.org/lower_bound-in-cpp)
- `sscanf()` [Convert String to int in C++](https://www.geeksforgeeks.org/convert-string-to-int-in-cpp)
- `c_str()` [Convert String to Char Array in C++](https://www.geeksforgeeks.org/convert-string-char-array-cpp)

---

- `#include <iostream>` is a **header file library** that lets us work with input and output objects, such as `cout` (used in line 5). Header files add functionality to C++ programs.
- `using namespace std` means that we can use names for objects and variables from the standard library.
- `cout` (pronounced "see-out") is an **object** used together with the *insertion operator* (`<<`) to output/print text.
- `cin` (pronounced "see-in") is a predefined variable that reads data from the keyboard with the extraction operator (`>>`).

---

## C++ Data Types

- In C++, there are different **types** of variables (defined with different keywords), for example:
  - `int` - stores integers (whole numbers), without decimals, such as 123 or -123
  - `double` - stores floating point numbers, with decimals, such as 19.99 or -19.99
  - `char` - stores single characters, such as 'a' or 'B'. Char values are surrounded by single quotes
  - `string` - stores text, such as "Hello World". String values are surrounded by double quotes
  - `bool` - stores values with two states: true or false
    ![[Pasted image 20240603102307.png]]
    **Classification of Data Types in C++**
    ![[Pasted image 20240713192937.png]]
- **Type Modifiers in C++:**
  ![[Pasted image 20240715230943.png]]
- ==`float` vs. `double`==: The **precision** of a floating point value indicates how many digits the value can have after the decimal point. The precision of `float` is only six or seven decimal digits, while `double` variables have a precision of about 15 digits. Therefore it is safer to use `double` for most calculations.
- A floating point number can also be a scientific number with an "e" to indicate the power of 10.
- A boolean data type is declared with the `bool` keyword and can only take the values `true` or `false`. When the value is returned, `true` = `1` and `false` = `0`.
  ![[Pasted image 20240603113426.png]]

## C++ Operators

- C++ divides the operators into the following groups:
  - [Arithmetic operators](https://www.w3schools.com/cpp/cpp_operators.asp#arithmetic)
  - [Assignment operators](https://www.w3schools.com/cpp/cpp_operators_assignment.asp)
  - [Comparison operators](https://www.w3schools.com/cpp/cpp_operators_comparison.asp)
  - [Logical operators](https://www.w3schools.com/cpp/cpp_operators_logical.asp)
  - Bitwise operators "`|`".
    ? Visit this site for more details: [her](https://www.tutorialspoint.com/cplusplus/cpp_operators.htm)
- `<<=` operator is a compound bitwise left shift assignment operator

  ```cpp
  #include <iostream>
  int main() {
      int x = 5;      // 00000101 in binary
      x <<= 3;        // shift left by 3 positions
      std::cout << x; // should print 40 (00101000 in binary)
      return 0;
  }
  ```

- `>>=` operator is a compound bitwise right shift assignment operator

  ```cpp
  #include <iostream>
  int main() {
      int x = 40;     // 00101000 in binary
      x >>= 3;        // shift right by 3 positions
      std::cout << x; // should print 5 (00000101 in binary)
      return 0;
  }
  ```

- `~` operator is a bitwise NOT operator

  ```cpp
  #include <iostream>
  int main() {
      int x = 3;       // 00000011 in binary
      int y = ~x;      // 11111100 in binary (inverted bits of 3)
      std::cout << y;  // output depends on the integer size, typically -4 for a 32-bit int
      return 0;
  }
  ```

---

## C++ String

- The `+` operator can be used between strings to add them together to make a new string. This is called **concatenation**.
- A string in C++ is actually an object, which contain functions that can perform certain operations on strings. For example, you can also concatenate strings with the `append()` function.
  ? Visit this site for more string functions: [her](https://www.w3schools.com/cpp/cpp_ref_string.asp)
- ! ==C++ uses the `+` operator for both **addition** and **concatenation**==. Numbers are added. Strings are concatenated.
- To get the length of a string, use the `length()` function.
  - **Tip:** You might see some C++ programs that use the `size()` function to get the length of a string. This is just an alias of `length()`. It is completely up to you if you want to use `length()` or `size()`.

- The `<string>` library also has an `at()` function that can be used to access characters in a string (same as referring to string index number inside square brackets `[]`).
- ![[Screenshot from 2024-06-03 21-43-11.png]]
- `cin` considers a space (whitespace, tabs, etc) as a terminating character, which means that it can only store a single word (even if you type many words).
- C-style strings are created with the `char` type instead of `string`. The name comes from the [C language](https://www.w3schools.com/c/index.php), which, unlike many other programming languages, does not have a `string` type for easily creating string variables. Instead, you must use the `char` type and create an [array](https://www.w3schools.com/cpp/cpp_arrays.asp) of characters to make a "string" in C. As C++ was developed as an extension of C, it continued to support this way of creating strings in C++.

  - ##### Example

    `string greeting1 = "Hello";  // Regular String`
    `char greeting2[] = "Hello";  // C-Style String (an array of characters)`

  - **Note:** It is more convenient to work with the standard `string` type, rather than C-style strings. However, one reason some users continue to use C-style strings is that they have access to functions from the C standard library.
  - A list of all C-style string functions, can be found in our [CString Functions Reference](https://www.w3schools.com/cpp/cpp_ref_cstring.asp).

## C++ Math

- For a complete reference of Math functions, go to our [C++ Math Reference](https://www.w3schools.com/cpp/cpp_ref_math.asp).
- C++ has many functions that allows you to perform mathematical tasks on numbers such as `min(int, int)`, `max(int, int)`functions. Other functions, such as `sqrt` (square root), `round` (rounds a number) and `log` (natural logarithm), can be found in the `<cmath>` header file.

## C++ Booleans

- For this, C++ has a `bool` data type, which can take the values `true` (1) or `false` (0).
- A boolean variable is declared with the `bool` keyword and can only take the values `true` or `false`.
- A **Boolean expression** returns a boolean value that is either `1` (true) or `0` (false). This is useful to build logic, and find answers. You can use a [comparison operator](https://www.w3schools.com/cpp/cpp_operators_comparison.asp), such as the **greater than** (`>`) operator, to find out if an expression (or variable) is true or false.

## C++ Conditions statements

- C++ has the following conditional statements:
  - Use `if` to specify a block of code to be executed, if a specified condition is true
  - Use `else` to specify a block of code to be executed, if the same condition is false
  - Use `else if` to specify a new condition to test, if the first condition is false
  - Use `switch` to specify many alternative blocks of code to be executed.
- There is also a short-hand if else, which is known as the **ternary operator** because it consists of three operands. It can be used to replace multiple lines of code with a single line. It is often used to replace simple if else statements:
  `_variable_ = (_condition_) ? _expressionTrue_ : _expressionFalse_;`
- [When to Use Ternary Over If-Else](https://codedamn.com/news/c/ternary-operators-in-c#:~:text=When%20to%20Use,introduce%20unnecessary%20complexity.)
- A **break** can save a lot of execution time because it "ignores" the execution of all the rest of the code in the switch block.

## C++ Loops

- Loops can execute a block of code as long as a specified condition is reached.
- Loops are handy because they save time, reduce errors, and they make code more readable.
- The `while` loop loops through a block of code as long as a specified condition is `true`:
  `while (_condition_) {`  
    `_// code block to be executed_`  
  `}`
- The `do/while` loop is a variant of the `while` loop. This loop will execute the code block once, before checking if the condition is true, then it will repeat the loop as long as the condition is **true**:
  `do {`  
   `_// code block to be executed_
`} while (*condition*);`
- **Note:** Do not forget to increase the variable used in the **while** condition, otherwise the loop will never end.
- When you know exactly how many times you want to loop through a block of code, use the `for` loop instead of a `while` loop:
  - Syntax

    `for (_statement 1_; _statement 2_; _statement 3_) {`  
      `_// code block to be executed_`  
     `}`
    - **Statement 1** is executed (one time) before the execution of the code block.
    - **Statement 2** defines the condition for executing the code block.
    - **Statement 3** is executed (every time) after the code block has been executed.

- It is also possible to place a loop inside another loop. This is called a **nested loop**:
  - Example

    `// Outer loop`
    `for (int i = 1; i <= 2; ++i) {`
      `cout << "Outer: " << i << "\n"; // Executes 2 times`
      `// Inner loop`
      `for (int j = 1; j <= 3; ++j) {`
        `cout << " Inner: " << j << "\n"; // Executes 6 times (2 * 3)`
      `}`
    `}`

- There is also a "**for-each** loop" (introduced in C++ version 11 (2011), which is used exclusively to loop through elements in an [array](https://www.w3schools.com/cpp/cpp_arrays.asp) (or other data sets):
  - Syntax

    ```cpp
    for (_type variableName_ : _arrayName_) {
      // code block to be executed
    }
    ```

  - Example

    ```cpp
    int myNumbers[5] = {10, 20, 30, 40, 50};
    for (int i : myNumbers)
      cout << i << "\n";
    ```

- The `break` statement can also be used to jump out of a **loop**.
- The `continue` statement breaks one iteration (in the loop), if a specified condition occurs, and continues with the next iteration in the loop.

## C++ Arrays

- Arrays are used to store multiple values in a single variable, instead of declaring separate variables for each value.
- In C++, you don't have to specify the size of the array. The compiler is smart enough to determine the size of the array based on the number of inserted values.
- However, precising the element number of an array is considered as "good practice", because it will reduce the chance of errors in your program (like `string cars[3]`).
- To get the size of an array, you can use the `sizeof()` operator.
- A **multi-dimensional** array is an array of arrays.

## C++ Structures

- Structures (also called structs) are a way to group several related variables into one place. Each variable in the structure is known as a **member** of the structure. Unlike an [array](https://www.w3schools.com/cpp/cpp_arrays.asp), a structure can contain many different data types (int, string, bool, etc.). To create a structure, use the `struct` keyword and declare each of its members inside curly braces.
- By giving a name to the structure, you can treat it as a data type. This means that you can create variables with this structure anywhere in the program at any time. To create a named structure, put the name of the structure right after the `struct` keyword.

## C++ Enums

- An **enum** is a special type that represents a group of constants (unchangeable values). To create an enum, use the `enum` keyword, followed by the name of the enum, and separate the enum items with a comma.
- Note that the last item does not need a comma.
- It is not required to use uppercase, but often considered as good practice.
- Enum is short for "enumerations", which means "specifically listed".
- By default, the first item has the value `0`, the second has the value `1`, etc.
- As you know, the first item of an enum has the value 0. The second has the value 1, and so on. To make more sense of the values, you can easily change them ([example](https://www.w3schools.com/cpp/cpp_enum.asp#:~:text=enum%20Level%20%7B%0A%C2%A0%20LOW%20%3D%2025%2C%0A%C2%A0%20MEDIUM%20%3D%2050%2C%0A%C2%A0%20HIGH%20%3D%2075%0A%7D%3B)).
- Note that if you assign a value to one specific item, the next items will update their numbers accordingly ([example](https://www.w3schools.com/cpp/cpp_enum.asp#:~:text=enum%20Level%20%7B%0A%C2%A0%20LOW%20%3D%205%2C%0A%C2%A0%20MEDIUM%2C%C2%A0//%20Now%206%0A%C2%A0%20HIGH%C2%A0//%20Now%207%0A%7D%3B)).

- Why And When To Use Enums?

  Enums are used to give names to constants, which makes the code easier to read and maintain.
  Use enums when you have values that you know aren't going to change, like month days, days, colors, deck of cards, etc.

## C++ Memory Address

- When a variable is created in C++, a memory address is assigned to the variable. And when we assign a value to the variable, it is stored in this memory address. To access it, use the `&` operator, and the result will represent where the variable is stored.
- **Note:** The memory address is in hexadecimal form (0x..).

- And why is it useful to know the memory address?
  - **References** and **Pointers** are important in C++, because they give you the ability to manipulate the data in the computer's memory - **which can reduce the code and improve the performance**.
  - These two features are one of the things that make C++ stand out from other programming languages, like [Python](https://www.w3schools.com/python/default.asp) and [Java](https://www.w3schools.com/java/default.asp).

## C++ Pointers

- A **pointer** however, is a variable that **stores the memory address as its value**.
- A pointer variable points to a data type (like `int` or `string`) of the same type, and is created with the `*` operator. The address of the variable you're working with is assigned to the pointer.
- **Tip:** There are three ways to declare pointer variables, but the first way is preferred:
  `string* mystring;`
  `string *mystring; // Preferred`
  `string * mystring;`
- You can also use the pointer to get the value of the variable, by using the `*` operator.
- `&`: **reference** operator.
- `*`: the **dereference** operator
- You can also change the pointer's value. But note that this will also change the value of the original variable ([example](https://www.w3schools.com/cpp/cpp_pointers_modify.asp#:~:text=the%20original%20variable%3A-,Example,-string%20food%20%3D)).
- [How to Initialize a Dynamic Array in C++?](https://www.geeksforgeeks.org/initialize-a-dynamic-array-in-cpp/#:~:text=Array%20in%20C-,How%20to%20Initialize%20a%20Dynamic%20Array%20in%20C%2B%2B%3F,-Last%20Updated%20%3A)
- Memory is allocated using the `new` keyword: `int* p = new int[size];`
- After the allocated memory is no longer needed, we can free it up using **`delete`**: `delete[] p;`

## C++ Functions

- A function is a block of code which only runs when it is called. You can pass data, known as parameters, into a function.
- Functions are used to perform certain actions, and they are important for reusing code: Define the code once, and use it many times.
- C++ provides some pre-defined functions, such as `main()`, which is used to execute code. But you can also create your own functions to perform certain actions.
- Declared functions are not executed immediately. They are "saved for later use", and will be executed later, when they are called.
- A C++ function consist of two parts:
  - **Declaration:** the return type, the name of the function, and parameters (if any).
  - **Definition:** the body of the function (code to be executed).
- **Note:** If a user-defined function, such as `myFunction()` is declared after the `main()` function, **an error will occur**.
- However, it is possible to separate the declaration and the definition of the function - for code optimization. You will often see C++ programs that have function declaration above `main()`, and function definition below `main()`. This will make the code better organized and easier to read.

- Parameters and Arguments
  - Information can be passed to functions as a parameter. Parameters act as variables inside the function.
  - Parameters are specified after the function name, inside the parentheses. You can add as many parameters as you want, just separate them with a comma.
  - When a **parameter** is passed to the function, it is called an **argument**.

- Default Parameter Value
  - You can also use a default parameter value, by using the equals sign (`=`) ([example](<https://www.w3schools.com/cpp/cpp_function_default.asp#:~:text=default%20value%20(%22Norway%22)%3A-,Example,-void%20myFunction()>).
  - **Default arguments** allow to specify a default value for the last parameters of the function by assigning them values right in the definition.
  - A parameter with a default value, is often known as an "**optional parameter**".
  - The default value will be used for the parameter, when no value is provided.

- Multiple Parameters
  - Note that when you are working with multiple parameters, the function call must have the same number of arguments as there are parameters, and the arguments must be passed in the same order.

- Return Values
  - The `void` keyword, indicates that the function should not return a value. If you want the function to return a value, you can use a data type (such as `int`, `string`, etc.) instead of `void`, and use the `return` keyword inside the function
  - The `return` keyword stops the function from executing. If there are any statements after `return`, they won't run.

- Pass By Reference
  - we used normal variables when we passed parameters to a function. You can also pass a [reference](https://www.w3schools.com/cpp/cpp_references.asp) to the function. This can be useful when you need to change the value of the arguments.
  - *Reference* refer to an object or a value in memory.

- Pass Arrays as Function Parameters
  - **Note** that when you call the function, you only need to use the name of the array when passing it as an argument `myFunction(myNumbers)`. However, the full declaration of the array is needed in the function parameter (`int myNumbers[5]`).

- Function Overloading
  - With **function overloading**, multiple functions can have the same name with different parameters.
  - Instead of defining two functions that should do the same thing, it is better to overload one.
  - **Note:** Multiple functions can have the same name as long as the number and/or type of parameters are different.
  - You **cannot** overload function declarations that differ only by return type.

- Recursion
  - Recursion is the technique of making a function call itself. This technique provides a way to break complicated problems down into simple problems which are easier to solve.
  - The developer should be very careful with recursion as it can be quite easy to slip into writing a function which never terminates, or one that uses excess amounts of memory or processor power. However, when written correctly recursion can be a very efficient and mathematically-elegant approach to programming.

- Friend Functions
  - Note that when passing an object to the function, we need to pass it **by reference**, using the & operator.

- Virtual Functions
  - Pure virtual functions are used
    - if a function doesn't have any use in the base class
    - but the function must be implemented by all its derived classes

    ```cpp
    class Shape {
        public:

          // creating a pure virtual function
          virtual void calculateArea() = 0;
    };
    ```

    - **Note:** The `= 0` syntax doesn't mean we are assigning 0 to the function. It's just the way we define pure virtual functions.

  -

## C++ Initializing Variables | 3 Ways Including Brace Initialization

```cpp
int var1=3;  //Narrowing Conversion
cout<<"Value of var1="<<var1<<endl;

int var2(3);
cout<<"Value of var2="<<var2<<endl;

int var3{3};
cout<<"Value of var3="<<var3<<endl;
```

## Namespace in C++

- we can create our namespace like:

  ```cpp
  namespace ns { // ns is the name of our namespace
      // A Class in a namespace
      class sample {
      public:
          void display() {
              cout << "My own namespace\n";
          }
      };
  }
  ```

## Graph of various Time complexity functions

![Graph](res/Pasted%20image%2020240605021042.png)

## C++ Classes

### C++ OOP

- Object-oriented programming has several advantages over procedural programming:
  - OOP is faster and easier to execute
  - OOP provides a clear structure for the programs
  - OOP helps to keep the C++ code DRY "Don't Repeat Yourself", and makes the code easier to maintain, modify and debug
  - OOP makes it possible to create full reusable applications with less code and shorter development time
- **Tip:** The "Don't Repeat Yourself" (DRY) principle is about reducing the repetition of code. You should extract out the codes that are common for the application, and place them at a single place and reuse them instead of repeating it.
- Classes and objects are the two main aspects of object-oriented programming.
- A class is a template for objects, and an object is an instance of a class.
- An object has identity
- An object might contain other objects but they're still different objects.
- Objects also have **characteristics** that are used to describe them. For example, a car can be red or blue, a mug can be full or empty, and so on. These characteristics are also called **attributes**. An attribute describes the current **state** of an object.
- So, ==the following three dimensions describe any object in object oriented programming: **identity, attributes, behavior.**==
- Objects are created using **classes**, which are actually the focal point of OOP.
- In programming, an object is **self-contained**, with its own **identity**. It is separate from other objects. Each object has its own **attributes**, which describe its current state. Each exhibits its own **behavior**, which demonstrates what they can do.

### C++ Classes and Objects

- The `class` keyword is used to create a class.
- The `public` keyword is an **access specifier**, which specifies that members (attributes and methods) of the class are accessible from outside the class.
- The class **describes** what the object will be, but is separate from the object itself. In other words, a class can be described as an object's **blueprint**, description, or definition.
- Each class has a **name**, and describes **attributes** and **behavior**. In programming, the term **type** is used to refer to a class name: We're creating an object of a particular **type**.

### Constant Objects

- All const variables must be initialized when they're created. In the case of classes, this initialization is done via constructors. If a class is not initialized using a parameterized constructor, a public default constructor must be provided - if no public default constructor is provided, a compiler error will occur.
- Once a const class object has been initialized via the constructor, you cannot modify the object's member variables. This includes both directly making changes to public member variables and calling member functions that set the value of member variables.
- **Note:** When you've used **const** to declare an object, you can't change its data members during the object's lifetime.
- ==Only non-const objects can call non-const functions.==
- To specify a function as a **const** member, the **const** keyword must follow the function prototype, outside of its parameters' closing parenthesis. For **const** member functions that are defined outside of the class definition, the **const** keyword must be used on both the function prototype and definition. For example:

  ```C++
  class MyClass {
  public:
  void myPrint() const;
  };
  ```

- Attempting to call a regular function from a constant object results in an error.

### Member Initializer

- Recall that **constants** are variables that cannot be changed, and that all const variables must be initialized at time of creation.
- C++ provides a handy syntax for initializing members of the class called the **member initializer list** (also called a **constructor initializer**).

  ```C++
  class MyClass {
    public:
     MyClass(int a, int b)
     : regVar(a), constVar(b)
     {
     }
    private:
     int regVar;
     const int constVar;
   };
  ```

- Note that in the syntax, the initialization list follows the constructor parameters. The list begins with a **colon** (:), and then lists each variable to be initialized, along with the value for that variable, with a comma to separate them. Use the syntax **variable(value)** to assign values.
- ==The member initialization list may be used for regular variables, and must be used for constant variables. Even in cases in which member variables are not constant, it makes good sense to use the member initializer syntax.==

### C++ Class Methods

- Methods are **functions** that belongs to the class.
- **Method** is another term for a class' behavior. A method is basically a **function** that belongs to a class.
- Methods are similar to functions - they are blocks of code that are called, and they can also perform actions and return values.
- There are two ways to define functions that belongs to a class
  - Inside class definition
  - Outside class definition
- To define a function outside the class definition, you have to declare it inside the class and then define it outside of the class. This is done by specifiying the name of the class, followed the scope resolution `::` operator, followed by the name of the function
- Each object is called an **instance** of a class. The process of creating objects is called **instantiation**.

#### C++ Constructors

- A constructor in C++ is a **special method** that is automatically called when an object of a class is created.
- You can also define an ==**access specifier**== for members of the class (`public`).
- You can also designate a class' members as **private** or **protected**.
- Constructors can also ==take parameters== (just like regular functions), which can be useful for setting initial values for attributes.
- Just like functions, constructors can also be defined outside the class. First, declare the constructor inside the class, and then define it outside of the class by specifying the name of the class, followed by the scope resolution `::` operator, followed by the name of the constructor (which is the same as the class).

#### C++ Destructors

- **Destructors** are special functions, as well. They're called when an object is **destroyed** or **deleted**.
- **Note:** Objects are destroyed when they go out of scope, or whenever the **delete** expression is applied to a pointer directed at an object of a class.
- The name of a **destructor** will be exactly the same as the class, only prefixed with a **tilde (~)**. A destructor can't return a value or take any parameters.
- **Notes:** Destructors can be very useful for releasing resources before coming out of the program. This can include closing files, releasing memory, and so on.
- Since destructors can't take parameters, they also ==can't be overloaded==. Each class will have just **one** destructor.

#### C++ Access Specifiers

- In C++, there are three access specifiers:
  - `public` - members are accessible from outside the class
  - `private` - members cannot be accessed (or viewed) from outside the class
  - `protected` - members cannot be accessed from outside the class, however, they can be accessed in inherited classes. (learn more about [Inheritance](https://www.w3schools.com/cpp/cpp_inheritance.asp)).
- **Note:** It is possible to access private members of a class using a public method inside the same class. See the next chapter ([Encapsulation](https://www.w3schools.com/cpp/cpp_encapsulation.asp)) on how to do this.
- **Tip:** It is considered good practice to declare your class attributes as private (as often as you can). This will reduce the possibility of yourself (or others) to mess up the code. This is also the main ingredient of the [Encapsulation](https://www.w3schools.com/cpp/cpp_encapsulation.asp) concept, which you will learn more about in the next chapter.
- **Note:** ==By default, all members of a class are `private` if you don't specify an access specifier==
  ![[Pasted image 20240715230855.png]]

#### C++ Friend Functions

- Declaring a **non-member** function as a **friend** of a class allows it to access the class' private members. This is accomplished by including a declaration of this external function within the class, and preceding it with the keyword **friend**.

  ```cpp
  class MyClass {
   public:
    MyClass() {
     regVar = 0;
    }
   private:
    int regVar;

    friend void someFunc(MyClass &obj);
  };
  ```

## ==C++ Encapsulation==

- The meaning of **Encapsulation**, is to make sure that "sensitive" data is hidden from users. To achieve this, you must declare class variables/attributes as `private` (cannot be accessed from outside the class). If you want others to read or modify the value of a private member, you can provide public **get** and **set** methods.
- **Why Encapsulation?**
  - It is considered good practice to declare your class attributes as private (as often as you can). Encapsulation ensures better control of your data, because you (or others) can change one part of the code without affecting other parts
  - Increased security of data

## ==C++ Abstraction==

- Data **abstraction** is the concept of providing only essential information to the outside world. It's a process of representing essential features **without including implementation details.**
- The concept of **abstraction** is that we focus on essential qualities, rather than the specific characteristics of one particular example.
- **Abstraction** means, that we can have an idea or a concept that is completely separate from any specific instance. It is one of the fundamental building blocks of object oriented programming. For example, when you use **cout**, you're actually using the **cout** object of the class **ostream**. This streams data to result in standard output

  ```C++
  cout << "Hello!" << endl;
  ```

- In this example, there is no need to understand how **cout** will display the text on the user's screen. The only thing you need to know to be able to use it is the public interface.

## ==C++ Inheritance==

- In C++, it is possible to inherit attributes and methods from one class to another. We group the "inheritance concept" into two categories:
  - **derived class** (child) - the class that inherits from another class
  - **base class** (parent) - the class being inherited from
- To inherit from a class, use the `:` symbol.

  ```C++
  // Base class
  class Vehicle {
    public:
   string brand = "Ford";
   void honk() {
     cout << "Tuut, tuut! \n" ;
   }
  };

  // Derived class
  **class Car: public Vehicle** {
    public:
   string model = "Mustang";
  };
  ```

- Why And When To Use "Inheritance"?
  It is useful for code reusability: reuse attributes and methods of an existing class when you create a new class.

- Multilevel Inheritance
  - A class can also be derived from one class, which is already derived from another class.

  ```C++
   // Base class (parent)
   class MyClass {
     public:
    void myFunction() {
      cout << "Some content in parent class." ;
    }
   };

   // Derived class (child)
   class MyChild: public MyClass {
   };

   // Derived class (grandchild)
   class MyGrandChild: public MyChild {
   };
  ```

- Multiple Inheritance
  - A class can also be derived from more than one base class, using a **comma-separated list `,`:**

    ```C++
    // Base class
    class MyClass {
      public:
     void myFunction() {
       cout << "Some content in parent class." ;
     }
    };

    // Another base class
    class MyOtherClass {
      public:
     void myOtherFunction() {
       cout << "Some content in another class." ;
     }
    };

    // Derived class
    **class MyChildClass: public MyClass, public MyOtherClass** {
    };
    ```

- Protected Access Specifier
  - `protected`, is similar to `private`, but it can also be accessed in the **inherited** class:

    ```C++
    // Base class
    class Employee {
      **protected: // Protected access specifier**
     int salary;
    };

    // Derived class
    class Programmer: public Employee {
      public:
     int bonus;
     void setSalary(int s) {
       salary = s;
     }
     int getSalary() {
       return salary;
     }
    };
    ```

- Types of Inheritance:
  1. Single inheritance
  2. Multilevel inheritance
  3. Multiple Inheritance
  4. Hierarchical inheritance
  5. Hybrid inheritance
     ![[Pasted image 20240729210128.png]]
- **Note:** In C++ we called Base/Parent Class - Child/Derived Class
- **Note:** In java we called Super Class - Sub Class
- Visibility Modes in C++
  ![[Pasted image 20240814231426.png]]

## ==C++ Polymorphism==

- Polymorphism means "**many forms**", and it occurs when we have many classes that are related to each other by inheritance.
- Why And When To Use "Inheritance" and "Polymorphism"?
  It is useful for code reusability: reuse attributes and methods of an existing class when you create a new class.
  ==> [**Inheritance**](https://www.w3schools.com/cpp/cpp_inheritance.asp) lets us inherit attributes and methods from another class. ==**Polymorphism** uses those methods to perform different tasks.== This allows us to perform a single action in different ways.

## C++ Files

- The `fstream` library allows us to work with files.
- Three new data types are defined in **fstream**:
  - **ofstream**: Output file stream that creates and writes information to files.
  - **ifstream**: Input file stream that reads information from files.
  - **fstream:** General file stream, with both ofstream and ifstream capabilities that allow it to create, read, and write information to files.
- These classes are derived directly or indirectly from the classes istream and ostream. We have already used objects whose types were these classes: cin is an object of class istream and cout is an object of class ostream.

  ```cpp
  #include <iostream>
  #include <fstream>
  using namespace std;

  int main() {
    // You can open a file like that
    ofstream MyFile;
    MyFile.open("test.txt");    // Open text.txt file
    MyFile << "Some text! \n";  // Write some text in the file
    MyFile.close();             // Close text.txt file

    // Or like that
    ofstream MyFile("test.txt");  // Create and open text.txt file
    MyFile.close();               // Close text.txt file
  }
  ```

- The **is_open()** member function checks whether the file is open and ready to be accessed.
- An optional second parameter of the **open** function defines the **mode** in which the file is opened. This list shows the supported modes:
  ![[Pasted image 20240827235947.png]]
  All these flags can be combined using the bitwise operator OR (|) :

  ```cpp
  ofstream outfile;
  outfile.open("file.dat", ios::out | ios::trunc );
  ```

- The **getline** function reads characters from an input stream and places them into a string.

## C++ Exceptions

- Problems that occur during program execution are called **exceptions**.
- C++ exception handling is built upon three keywords: **try, catch, and throw**.
  - **throw** is used to throw an exception when a problem shows up.
  - A **try** block identifies a block of code that will activate specific exceptions. It's followed by one or more **catch** blocks.
  - The **catch** keyword represents a block of code that executes when a particular exception is thrown.
- In the **throw** statement, the operand determines a type for the exception. This can be any expression. The type of the expression's result will determine the type of the exception thrown.
- Multiple **catch** statements may be listed to handle various exceptions in case multiple exceptions are thrown by the try block.
- Exception handling is particularly useful when dealing with user input.
- It's possible to specify that your catch block handles any type of exception thrown in a try block. To accomplish this, add an **ellipsis (...)** between the parentheses of catch:

  ```cpp
  try {
    // code
  } catch(...) {
    // code to handle exceptions
  }
  ```

- C++ provides a list of standard exceptions defined in **`exception`** which we can use in our programs. These are arranged in a parent-child class hierarchy shown below:
  ![[Pasted image 20240827231840.png]]

## C++ Function Templates

- You can use templates to define functions as well as classes.
- With function templates, the basic idea is to avoid the necessity of specifying an exact type for each variable. Instead, C++ provides us with the capability of defining functions using placeholder types, called **template type parameters**.
- To define a function template, use the keyword **template**, followed by the template type definition.

  ```cpp
  template <class T>
  ```

  - T is a **template parameter**, also referred to as type-parameter. ==T is generic data type== (**T** is short for Type, and is a widely used name for type parameters).

- When creating a template type parameter, the keyword ==**typename**== may be used as an alternative to the keyword **class**: `template <typename T>`. ==> The keywords are identical.
- Enhanced safety is another advantage in using template functions, since it's not necessary to manually copy functions and change types.
- Remember that when you declare a template parameter, you absolutely **must** use it in your function definition. Otherwise, the compiler will complain!
- Just as with function templates, you can define more than one generic data type by using a comma-separated list.
- A specific syntax is required in case you define your member functions outside of your class - for example in a separate source file. You need to specify **the generic type** in angle brackets after the class name.
- In case of regular class templates, the way the class handles different data types is the same; the same code runs for all data types. **==Template specialization==** allows for the definition of a different implementation of a template when a specific type is passed as a template argument :

  ```cpp
  template <class T>
  class MyClass {
   public:
    MyClass (T x) {
     cout <<x<<" -  not a char"<<endl;
    }
  };

  template < > // Template specialization
  class MyClass<char> {
   public:
    MyClass (char x) {
     cout <<x<<" is a char!"<<endl;
    }
  };
  ```

- ==>Templates allow us to declare generic types of data

## C++ Date

## The This Keyword

- Every object in C++ has access to its own address through an important pointer called the **this** pointer.
- Friend functions do not have a **this** pointer, because friends are not members of a class.

```cpp
/* The **printInfo()** method offers three alternatives for printing the member variable of the class. */
class MyClass {
  public:
   MyClass(int a) : var(a)
   { }
   void printInfo() {
    cout << var<<endl;
    cout << this->var<<endl;
    cout << (*this).var<<endl;
   }
  private:
   int var;
};
```

- **this** is a **pointer** to the object, so the arrow selection operator is used to select the member variable.
- Note that only member functions have a **this** pointer.
- The **this** keyword has an important role in **operator overloading**

## Operator Overloading

- Most of the C++ built-in operators can be redefined or **overloaded**.
  ![[Pasted image 20240825151844.png]]
  - Operators that can't be overloaded include :: | .\* | . | ?:
- Overloaded operators are functions, defined by the keyword **operator** followed by the symbol for the operator being defined.
- An overloaded operator is similar to other functions in that it has a **return type** and a **parameter list**.
- With overloaded operators, you can use any custom logic needed. However, it's not possible to alter the operators' precedence, grouping, or number of operands.

# C++ Opnecv

![Opencv](res/classcv_1_1face_1_1FaceRecognizer.png)

## const Vs constexpr

| Feature            | `const`                                       | `constexpr`                                                                        |
| ------------------ | --------------------------------------------- | ---------------------------------------------------------------------------------- |
| **Evaluation**     | Runtime (can be compile-time)                 | Compile-time (for variables and functions when arguments are constant expressions) |
| **Immutability**   | Enforces runtime immutability                 | Enforces compile-time immutability                                                 |
| **Initialization** | Can be initialized at runtime or compile time | Must be initialized with a constant expression                                     |
| **Implicit const** | No                                            | Yes, all `constexpr` variables are implicitly `const`                              |
| **Optimization**   | Limited                                       | Designed for compile-time optimizations                                            |
