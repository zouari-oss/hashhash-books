# 🧱 Java `static {}` Block vs Constructor

This guide explains the difference between Java's `static` initialization blocks and constructors — when they are used, how they behave, and common use cases.

## 🧠 What is a `static {}` Block?

In Java, a `static {}` block is called a **static initialization block**. It runs **once** when the class is loaded into memory, before any objects are created.

```java
public class Example {
    static {
        System.out.println("Static block executed.");
    }
}
```

### 🔍 Key Features

- Belongs to the **class**, not to objects.
- Runs **once**, when the **class is loaded** by the JVM.
- Typically used to initialize **static variables** or perform **setup**.

## 🧪 What is a Constructor?

A constructor is a **special method** that is called **each time** a new object is created.

```java
public class Example {
    public Example() {
        System.out.println("Constructor executed.");
    }
}
```

### 🔍 Key Features

- Belongs to the **object**.
- Runs **every time** an object is created using `new`.
- Can be **overloaded** (multiple constructors with different parameters).

## ⚖️ Side-by-Side Comparison

| Feature                        | `static {}` Block                     | Constructor           |
| ------------------------------ | ------------------------------------- | --------------------- |
| Belongs to                     | Class                                 | Object                |
| Runs when                      | Class is loaded                       | Object is created     |
| Runs how many times            | Once per class                        | Every time per object |
| Can access instance variables? | ❌ No                                 | ✅ Yes                |
| Can access static variables?   | ✅ Yes                                | ✅ Yes                |
| Can be overloaded?             | ❌ No                                 | ✅ Yes                |
| Common use                     | Static setup, logging, driver loading | Object initialization |

## 🔄 Execution Order Example

```java
public class Demo {
    static {
        System.out.println("Static block executed.");
    }

    public Demo() {
        System.out.println("Constructor executed.");
    }

    public static void main(String[] args) {
        System.out.println("Main method started.");
        Demo obj1 = new Demo();
        Demo obj2 = new Demo();
    }
}
```

### 🧾 Output

```
Static block executed.
Main method started.
Constructor executed.
Constructor executed.
```

## ✅ Use Cases for `static {}`

- Loading a **JDBC driver**:

```java
static {
    try {
        Class.forName("org.h2.Driver");
    } catch (ClassNotFoundException e) {
        e.printStackTrace();
    }
}
```

- Initializing complex **static fields**:

```java
static {
    CONFIG = loadConfigFile();
}
```

- Logging or debugging class loading behavior.

## 🛑 Things to Watch Out For

- Avoid putting **complex logic** in static blocks.
- Don't rely on static blocks to run in all environments (some special class loaders behave differently).
- Static blocks **do not handle instance logic** — use constructors or instance initializers for that.

## 📝 Summary

| Topic    | Static Block        | Constructor                 |
| -------- | ------------------- | --------------------------- |
| Executes | Once per class load | Once per object creation    |
| Purpose  | Class-level setup   | Object-level setup          |
| Access   | Only static members | Static and instance members |
| Syntax   | `static {}`         | `ClassName() {}`            |

> 🔧 Tip: You can use both static blocks and constructors in the same class — just remember that the static block runs **first**.

## 📚 Related Topics

- Instance Initializer Blocks (`{}` without `static`)
- Java Class Loading and JVM Behavior
- Static Variables and Static Methods
