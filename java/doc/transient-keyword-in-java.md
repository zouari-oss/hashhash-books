# Java `transient` Keyword

In Java, the `transient` keyword is used to indicate that a **field should not be serialized**. Serialization is the process of converting an object into a byte stream, typically for saving to a file, sending over a network, or caching.

## 1. Purpose of `transient`

Use `transient` for fields that:

1. **Should not be serialized**
   - Sensitive data like passwords, API keys, etc.

2. **Cannot be serialized**
   - Objects like `Thread`, `Socket`, `FileInputStream`.

3. **Are temporary or derived**
   - Cache values, computed values, or other fields that can be recalculated.

## 2. Syntax

```java
class User implements Serializable {
    String name;
    transient String password; // This field will not be serialized

    User(String name, String password) {
        this.name = name;
        this.password = password;
    }
}
```

## 3. Example: Serialization

```java
import java.io.*;

public class TestTransient {
    public static void main(String[] args) throws Exception {
        User user = new User("Alice", "secret");

        // Serialize the object
        ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("user.dat"));
        out.writeObject(user);
        out.close();

        // Deserialize the object
        ObjectInputStream in = new ObjectInputStream(new FileInputStream("user.dat"));
        User loadedUser = (User) in.readObject();
        in.close();

        System.out.println(loadedUser.name);      // Alice
        System.out.println(loadedUser.password);  // null
    }
}
```

**Output:**

```
Alice
null
```

**Explanation:**
The `password` field is `transient`, so it is **not serialized**. After deserialization, it defaults to `null`.

## 4. Key Points

| Feature                             | Description                                              |
| ----------------------------------- | -------------------------------------------------------- |
| Purpose                             | Exclude a field from serialization                       |
| Default value after deserialization | `0` for numeric, `false` for boolean, `null` for objects |
| Static fields                       | Not serialized (transient not needed)                    |
| Applicable to                       | Instance fields only                                     |

## 5. Real-life Example in Java Collections

`ArrayList` has this field:

```java
transient Object[] elementData;
```

- The internal array is **transient** because `ArrayList` only serializes the actual elements (based on `size()`) rather than the full capacity of the array.
- Custom serialization logic ensures the list contents are stored efficiently.

## 6. Notes

- `transient` affects **serialization only**, not memory allocation.
- Fields marked `transient` **still exist in memory**; they just are **skipped when writing to a stream**.
- Can be combined with `volatile` if needed for thread-safety and serialization.

**References:**

- [transient-keyword-java](https://www.geeksforgeeks.org/java/transient-keyword-java)
- [Serialization in Java](https://www.baeldung.com/java-serialization)
