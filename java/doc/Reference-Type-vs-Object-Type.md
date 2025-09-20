# 📘 Java Guide: Reference Type vs Object Type

Understanding the difference between **reference type** and **object type** is fundamental in Java programming, especially when dealing with **inheritance** and **interfaces**.

## 🔑 Key Concepts

### ✅ Object Type (Actual Type)

- The **object type** refers to the **actual class** of the object created using `new`.
- It determines **which implementation of methods** gets executed at runtime.
- Also called the **runtime type**.

```java
ArrayList<String> list = new ArrayList<>();
```

> `ArrayList` is both the reference and object type here.

### ✅ Reference Type (Declared Type)

- The **reference type** is the **type of the variable** that points to the object.
- It determines **what methods and fields are accessible** at **compile time**.
- Can be an **interface**, an **abstract class**, or a **parent class**.

```java
List<String> list = new ArrayList<>();
```

> `List` is the reference type, and `ArrayList` is the object type.

## 🔍 Why the Distinction Matters

| Aspect            | Reference Type                  | Object Type                              |
| ----------------- | ------------------------------- | ---------------------------------------- |
| **Known at**      | Compile time                    | Runtime                                  |
| **Used for**      | Access control (methods/fields) | Actual behavior (method implementations) |
| **Polymorphism?** | Enables it                      | Implements it                            |

## 🧪 Example: Set and HashSet

```java
Set<String> set = new HashSet<>();
```

- **Reference Type:** `Set`
- **Object Type:** `HashSet`

### Effects

- ✅ You can call all methods declared in `Set` (like `add()`, `remove()`, etc.)
- ❌ You **cannot** call `HashSet`-specific methods like `clone()` unless you cast it:

```java
HashSet<String> realSet = (HashSet<String>) set;
realSet.clone();
```

## ⚙️ Best Practice: Program to an Interface

Use **interfaces** or **abstract classes** as reference types whenever possible:

```java
// Good
List<String> list = new ArrayList<>();

// Better
Set<String> set = new HashSet<>();
```

### 🔁 Why?

- Makes your code more flexible and easier to maintain.
- Allows swapping implementations with minimal code change.

## 📌 Summary

| Term               | Definition                                                                   |
| ------------------ | ---------------------------------------------------------------------------- |
| **Reference Type** | Type of the variable (interface or superclass)                               |
| **Object Type**    | Actual class of the object created with `new`                                |
| **Rule of Thumb**  | Reference type defines what you _can do_, object type defines _how it works_ |

## 📚 Further Reading

- [Java Polymorphism - Oracle Docs](https://docs.oracle.com/javase/tutorial/java/IandI/polymorphism.html)
- \[Effective Java by Joshua Bloch – Item 52: Prefer interfaces to reflection]
