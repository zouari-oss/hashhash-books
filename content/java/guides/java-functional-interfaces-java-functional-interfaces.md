# 📘 Java Functional Interfaces — Complete Guide

Java provides a rich set of **functional interfaces** in the `java.util.function` package, enabling modern functional-style programming using **lambdas** and **method references**.

This guide covers:

- Core functional interfaces (Predicate, Consumer, Function, Supplier)
- Advanced variants
- Real examples
- A complete **Functional Interfaces Table** (added as requested)

## What Is a Functional Interface?

A **functional interface** is an interface with **exactly one abstract method**.

Examples:

```java
Runnable
Callable<T>
Comparator<T>
```

Java 8+ includes many such interfaces to enable cleaner, more expressive code.

## 🎯 Core Functional Interfaces

### 1️⃣ **Predicate<T>**

Tests a value and returns a **boolean**.

```java
boolean test(T t);
```

#### Example

```java
Predicate<Product> expensive = p -> p.getPrice() > 100;
```

### 2️⃣ **Consumer<T>**

Consumes a value and returns **nothing**.

```java
void accept(T t);
```

#### Example

```java
displayProducts(products, System.out::println);
```

### 3️⃣ **Function<T, R>**

Transforms a value from type T to type R.

```java
R apply(T t);
```

#### Example

```java
String result = returnProductsNames(products, Product::getName);
```

### 4️⃣ **Supplier<T>**

Supplies a value without taking any arguments.

```java
T get();
```

#### Example

```java
Product p = createProduct(() -> new Product("Phone", 999));
```

## 🟦 Advanced Functional Interfaces

| Interface               | Purpose                                   |
| ----------------------- | ----------------------------------------- |
| **BiPredicate<T, U>**   | Test two arguments                        |
| **BiConsumer<T, U>**    | Consume two arguments                     |
| **BiFunction<T, U, R>** | Transform two arguments                   |
| **UnaryOperator<T>**    | Function where input/output types match   |
| **BinaryOperator<T>**   | BiFunction where input/output types match |

## 📑 **Functional Interfaces Table**

Below is your complete formatted table in Markdown:

### 📘 Functional Interfaces Table

| **Functional Interface** | **Description**                                                 | **Method**                            |
| ------------------------ | --------------------------------------------------------------- | ------------------------------------- |
| **Runnable**             | Represents a task executed by a thread.                         | `void run()`                          |
| **Comparable<T>**        | Compares two objects for ordering.                              | `int compareTo(T o)`                  |
| **ActionListener**       | Handles action events in event-driven programs.                 | `void actionPerformed(ActionEvent e)` |
| **Callable<V>**          | Represents a task that returns a result or throws an exception. | `V call() throws Exception`           |
| **Consumer<T>**          | Accepts one argument and returns no result.                     | `void accept(T t)`                    |
| **Predicate<T>**         | Accepts one argument and returns a boolean.                     | `boolean test(T t)`                   |
| **Function<T, R>**       | Accepts one argument and produces a result.                     | `R apply(T t)`                        |
| **Supplier<T>**          | Takes no arguments but returns a result.                        | `T get()`                             |
| **BiConsumer<T, U>**     | Accepts two arguments, returns no result.                       | `void accept(T t, U u)`               |
| **BiPredicate<T, U>**    | Accepts two arguments, returns boolean.                         | `boolean test(T t, U u)`              |
| **BiFunction<T, U, R>**  | Accepts two arguments and produces a result.                    | `R apply(T t, U u)`                   |
| **UnaryOperator<T>**     | Function where input/output types are the same.                 | `T apply(T t)`                        |
| **BinaryOperator<T>**    | BiFunction with matching input/output types.                    | `T apply(T t1, T t2)`                 |

## 🧩 Combining Functional Interfaces

Functional interfaces shine when combined.

#### Filter + Action

```java
products.stream()
        .filter(p -> p.getPrice() > 100)
        .forEach(System.out::println);
```

#### Transform + Collect

```java
List<String> names = products.stream()
                             .map(Product::getName)
                             .toList();
```

## 🚀 Streams and Functional Interfaces

| Stream Operation | Uses                             |
| ---------------- | -------------------------------- |
| `filter()`       | Predicate                        |
| `map()`          | Function                         |
| `forEach()`      | Consumer                         |
| `collect()`      | Supplier / BiConsumer / Function |
| `reduce()`       | BinaryOperator                   |

## 🏁 Summary

Functional interfaces allow you to:

- Pass **behavior as parameters**
- Write clean, reusable logic
- Use Java Streams effectively
- Reduce boilerplate code

They are at the heart of **modern Java programming**.
