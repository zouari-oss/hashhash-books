# Why Does an Argument to a Copy Constructor Must be Passed as a Reference ?

In C++, a copy constructor must take its parameter by reference rather than by value for several important reasons:

1. **Avoid Infinite Recursion**:
   - If a copy constructor were to take its parameter by value, it would need to make a copy of the object being passed in.
   - This copying would again call the copy constructor, leading to infinite recursion and ultimately causing a stack overflow.

2. **Efficiency**:
   - Passing by reference avoids creating a temporary copy of the object.
   - Passing by value would involve an additional call to the copy constructor to create this temporary copy, which is inefficient and unnecessary.

3. **Consistency**:
   - Copy constructors are designed to copy an object exactly, and passing by reference-to-const ensures the original object is not modified during this process.
   - Passing by value would break this expectation, as it involves creating an unnecessary and potentially different temporary object.

A typical copy constructor looks like this:

```cpp
class MyClass {
public:
    MyClass(const MyClass& other);  // Copy constructor
    // ...
};
```

By using a reference (`const MyClass& other`), you avoid the pitfalls mentioned above, ensuring efficient and correct behavior.