# Java Notes

- **What is Java?** Java is a high-level, object-oriented programming language developed by Sun Microsystems in 1995. It is platform-independent, which means we can write code once and run it anywhere using the Java Virtual Machine (JVM). Java is mostly used for building desktop applications, web applications, Android apps, and enterprise systems.
- **Wrapping** refers to the concept of using wrapper classes to encapsulate primitive data types within objects. These wrapper classes, such as `Integer`, `Double`, `Character`, and `Boolean`, provide a way to treat primitive values as objects, which is necessary for certain operations and data structures. ==Wrapper classes are in base language (java.lang)==

- **Understanding `getClass().getResource()` vs `ClassName.class.getResource()` in Java**

  | Feature               | `getClass().getResource(...)`                  | `YourClassName.class.getResource(...)`       |
  | --------------------- | ---------------------------------------------- | -------------------------------------------- |
  | **Context**           | Non-static context only                        | Can be used in static or non-static contexts |
  | **Access Type**       | Instance method (`getClass()`)                 | Static class reference                       |
  | **Usage in `main()`** | ❌ Not allowed directly                        | ✅ Allowed                                   |
  | **Code Example**      | `getClass().getResource("/file.txt")`          | `MyClass.class.getResource("/file.txt")`     |
  | **Common Error**      | "Cannot make a static reference to non-static" | None in static context                       |
  | **When to Use**       | Inside instance methods                        | Inside static methods like `main()`          |

- A **resource bundle** is a Java `.properties` file that contains locale-specific data. It is a way of internationalising a Java application by making the code locale-independent.
- **Jagged Array** in java is a multidimensional array where each row can have a _different number of columns_

```java
void main() {
  // Declaring 2-D array with 2 rows
  int arr[][] = new int[2][];

  // Making the above array Jagged
  arr[0] = new int[3];
  arr[1] = new int[2];
}
```

## Java data types

![Data Types in Java]('../res/Data Types in java.png')

- **String** is not primitive data type like `int`, `char`... (because only class can have methods. Primitive can not)

## Java Type Casting

- Type casting is when you assign a value of one primitive data type to another type.
- In Java, there are two types of casting:
  - _Widening Casting (automatically)_ - converting a smaller type to a larger type size
    byte -> short -> char -> int -> long -> float -> double
  - _Narrowing Casting (manually)_ - converting a larger type to a smaller size type
    double -> float -> long -> int -> char -> short -> byte

## Java Interfaces

- Properties use `UPPER_SNAKE_CASE` by convention
- Value must be set immediately and cannot be changed
- Properties are `public static final` behind the scenes
- Interfaces are typically used to house methods
- The methods are `abstract` by default without code implementation
- Interfaces can have concrete methods that have code implementation
- All abstract methods must be implemented in the subclass

## Java POJO

- **A POJO (Plain Old Java Object)** is a simple Java object that represents data. It does not extend any specific class or implement any specific interface. POJOs are used to model data without depending on any specific framework, promoting clean, maintainable, and reusable code.
- Key Characteristics of a POJO:
  - Simplicity:
    POJOs are basic Java classes without any special framework requirements.
    Data Representation:
    They primarily serve as containers for data, typically with private fields and public getter/setter methods.
  - No Framework Dependency:
    POJOs do not rely on any specific Java frameworks or libraries, making them portable and flexible.
  - Encapsulation:
    They follow the principle of encapsulation, with private fields accessed through public methods.
  - Optional Default Constructor:
    While not strictly required, POJOs often have a default constructor for easier instantiation.
  - Optional Serializable:
    POJOs can implement the Serializable interface to enable object serialization.
- Usage:
  - POJOs are often used to transfer data between different layers of an application.
  - They can be used to represent entities in an application, such as user profiles or product information.
  - POJOs are frequently used in frameworks like Java Persistence API (JPA) for mapping database records to Java objects, or in serialization/deserialization processes for converting objects to and from formats like JSON or XML.

## Autoboxing In java

- **Autoboxing in Java** is the automatic conversion of primitive data types to their corresponding wrapper class objects. Introduced in Java 5, this feature simplifies code by allowing developers to use primitive types and their wrapper class objects interchangeably.
- Exemple:

```java
Integer myInteger = 10; // Autoboxing int to Integer
int myInt = myInteger;  // Unboxing Integer to int
```

## Java Constructor

| Feature                | `public`            | `protected`                         | `private`                         |
| ---------------------- | ------------------- | ----------------------------------- | --------------------------------- |
| **Access**             | Anywhere            | Same package & subclasses           | Only within the same class        |
| **Object Creation**    | Freely using `new`  | Controlled via inheritance/subclass | Restricted or controlled          |
| **Common Usage**       | Most normal classes | Framework base classes, inheritance | Singleton, factory, utility class |
| **Prevent Instancing** | ❌ No               | ⚠️ Partially (limited access)       | ✅ Yes                            |

## Java Logging

| Feature        | Log4j2          | java.util.logging (JUL) |
| -------------- | --------------- | ----------------------- |
| Configuration  | ✔ Flexible     | ❌ Basic                |
| Performance    | ✔ High         | ❌ Slower               |
| Async Logging  | ✔ Supported    | ❌ No                   |
| Extensibility  | ✔ Rich         | ❌ Limited              |
| Integration    | ✔ Excellent    | ❌ Limited              |
| Learning Curve | Moderate        | Easy                    |
| Security       | Safe if updated | Simpler (less risk)     |

## Anonymous Class from an Interface

- An anonymous class is a **class without a name**. It is created and used at the same time.
- You often use anonymous classes to _override methods_ of an existing class or interface, without writing a separate class file.
- You can use an anonymous class to implement an interface on the fly:

```java
// Interface
interface Greeting {
  void sayHello();
}

public class Main {
  public static void main(String[] args) {
    // Anonymous class that implements Greeting
    Greeting greet = new Greeting() {
      public void sayHello() {
        System.out.println("Hello, World!");
      }
    };

    greet.sayHello();
  }
}
// output: Hello, World!
```

## Java String

The String class in Java implements three important interfaces:

- `CharSequence`: Allows access to characters in the string using `charAt()`, `length()`, etc.
- `Comparable<String>`: Enables comparing two strings lexicographically using `compareTo()`
- `Serializable`: Allows string objects to be converted into a byte stream

### `StringBuffer` Class in Java

The key features of StringBuffer class are listed below:

- Unlike String, we can modify the content of the StringBuffer without creating a new object.
- All methods of StringBuffer are synchronized, making it safe to use in multithreaded environments.
- Ideal for scenarios with frequent modifications like append, insert, delete, or replace operations.
