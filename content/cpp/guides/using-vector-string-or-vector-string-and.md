# Using "vector<string>*" or "vector<string>&"

Using `vector<string>*` (a pointer to a vector of strings) instead of `vector<string>&` (a reference to a vector of strings) is a design choice that depends on the specific requirements and conventions of your code. Both have their use cases, and each has its advantages and disadvantages. Here's a comparison:

### Reference (`vector<string>&`)

#### Advantages:
1. **Simplicity**: References are typically easier to use because they do not require explicit dereferencing. You can use the reference as if it were the actual object.
2. **Safety**: References cannot be `nullptr`, so you avoid the need to check for null pointers.
3. **No Need for Dereferencing**: You can use the reference directly without having to use the dereference operator (`*`).

#### Disadvantages:
1. **Binding**: References must be initialized when they are declared and cannot be changed to refer to a different object later.
2. **Cannot Be Null**: Sometimes, it might be useful to have a null state to indicate the absence of an object, which references cannot provide.

### Pointer (`vector<string>*`)

#### Advantages:
1. **Flexibility**: Pointers can be reassigned to point to different objects or `nullptr` at any time.
2. **Explicit Nullability**: Pointers can be `nullptr`, which allows you to explicitly represent the absence of an object.
3. **Dynamic Allocation**: Pointers are necessary if you need to manage dynamic memory allocation and deallocation.

#### Disadvantages:
1. **Complexity**: Pointers require explicit dereferencing using the `*` operator, which can make the code more complex and error-prone.
2. **Null Pointer Check**: You must check for null pointers before dereferencing them to avoid runtime errors.
3. **Memory Management**: If you use raw pointers, you are responsible for managing the memory (e.g., using `new` and `delete`), which can lead to memory leaks or dangling pointers if not handled properly. Smart pointers (`std::unique_ptr`, `std::shared_ptr`) can help mitigate this but add their own complexity.

### Example Comparison:

Using a reference:
```cpp
#include <iostream>
#include <vector>
#include <string>

void addGreeting(std::vector<std::string>& vec) {
    vec.push_back("Hello, World!");
}

int main() {
    std::vector<std::string> myVector;
    myVector.push_back("Initial string");

    addGreeting(myVector);

    for (const std::string& str : myVector) {
        std::cout << str << std::endl;
    }

    return 0;
}
```

Using a pointer:
```cpp
#include <iostream>
#include <vector>
#include <string>

void addGreeting(std::vector<std::string>* vec) {
    if (vec) {
        vec->push_back("Hello, World!");
    }
}

int main() {
    std::vector<std::string> myVector;
    myVector.push_back("Initial string");

    addGreeting(&myVector);

    for (const std::string& str : myVector) {
        std::cout << str << std::endl;
    }

    return 0;
}
```

In the pointer example, note the additional check for `nullptr` in the `addGreeting` function.

### When to Use Which:
- Use **references** when you want to pass an object to a function without copying it and do not need the flexibility of reassignment or nullability.
- Use **pointers** when you need to manage dynamic memory, need the ability to reassign or represent the absence of an object with `nullptr`.

Choosing between references and pointers depends on the context and requirements of your specific situation.

**Note**: <mark>The deletion logic inside the nested loops is problematic. Erasing elements from a vector while iterating over it can lead to undefined behavior and skipping elements.</mark>