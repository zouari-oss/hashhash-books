# Shallow Copy and Deep Copy in C++

## Links
- [Shallow Copy and Deep Copy in C++](https://www.geeksforgeeks.org/shallow-copy-and-deep-copy-in-c/)
---
## Notes
To create a copy of the `root` node and then modify this copy without affecting the original `root`, you need to create a new node and manually copy the values and pointers from the original node to the new node. This process is known as "deep copying."

Here’s an example in C++ demonstrating how to create a copy of a binary tree node:

```cpp
#include <iostream>

struct binaryTree {
    int value;
    binaryTree *left;
    binaryTree *right;
};

// Function to create a deep copy of a node
binaryTree* copyNode(const binaryTree* node) {
    if (node == nullptr) return nullptr;

    // Create a new node
    binaryTree* newNode = new binaryTree();
    newNode->value = node->value;
    newNode->left = copyNode(node->left);
    newNode->right = copyNode(node->right);

    return newNode;
}

int main() {
    // Create original node
    binaryTree *root = new binaryTree();
    root->value = 1;
    root->left = new binaryTree();
    root->left->value = 2;
    root->right = new binaryTree();
    root->right->value = 3;

    // Create a copy of the root node
    binaryTree *copyRoot = copyNode(root);

    // Modify the copy
    copyRoot->value = 10;
    copyRoot->left->value = 20;
    copyRoot->right->value = 30;

    // Print values to verify
    std::cout << "Original root value: " << root->value << std::endl;
    std::cout << "Original left child value: " << root->left->value << std::endl;
    std::cout << "Original right child value: " << root->right->value << std::endl;

    std::cout << "Copied root value: " << copyRoot->value << std::endl;
    std::cout << "Copied left child value: " << copyRoot->left->value << std::endl;
    std::cout << "Copied right child value: " << copyRoot->right->value << std::endl;

    return 0;
}
```

In this example:
1. The `copyNode` function performs a deep copy of the binary tree node.
2. The `main` function creates an original binary tree node `root` with left and right children.
3. A deep copy of the `root` node is created and stored in `copyRoot`.
4. Modifications are made to the `copyRoot` node.
5. Printing the values of the original and copied nodes shows that changes to the copied node do not affect the original node.

This way, you ensure that `root` remains unchanged while making modifications to `copyRoot`.