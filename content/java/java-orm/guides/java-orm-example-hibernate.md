# Java ORM Example Using Hibernate

This example demonstrates how to use **Hibernate ORM** in Java to interact with a relational database without writing raw SQL.

## 🧱 Project Structure

```
src/
├── model/
│   └── User.java
├── util/
│   └── HibernateUtil.java
└── Main.java
hibernate.cfg.xml
```

## 1. 🧑 Define the Entity (`User.java`)

```java
package model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    // Constructors
    public User() {}

    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }

    // Getters and setters
    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
```

## 2. ⚙️ Hibernate Configuration (`hibernate.cfg.xml`)

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE hibernate-configuration PUBLIC
        "-//Hibernate/Hibernate Configuration DTD 5.0//EN"
        "http://hibernate.org/dtd/hibernate-configuration-5.0.dtd">

<hibernate-configuration>
    <session-factory>
        <!-- Database connection settings -->
        <property name="hibernate.connection.driver_class">org.h2.Driver</property>
        <property name="hibernate.connection.url">jdbc:h2:mem:testdb</property>
        <property name="hibernate.connection.username">sa</property>
        <property name="hibernate.connection.password"></property>

        <!-- Hibernate settings -->
        <property name="hibernate.dialect">org.hibernate.dialect.H2Dialect</property>
        <property name="hibernate.hbm2ddl.auto">update</property>
        <property name="show_sql">true</property>

        <!-- Register entity class -->
        <mapping class="model.User"/>
    </session-factory>
</hibernate-configuration>
```

> 💡 This uses an **in-memory H2 database** for simplicity. Swap with MySQL/PostgreSQL settings for real-world apps.

## 3. 🛠️ Hibernate Utility Class (`HibernateUtil.java`)

```java
package util;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {
    private static final SessionFactory sessionFactory;

    static {
        try {
            sessionFactory = new Configuration().configure().buildSessionFactory();
        } catch (Throwable ex) {
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}
```

## 4. 🚀 Main Application (`Main.java`)

```java
import model.User;
import util.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class Main {
    public static void main(String[] args) {
        // Create a new user
        User user = new User("Alice", "alice@example.com");

        // Open Hibernate session
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = null;

        try {
            tx = session.beginTransaction();
            session.save(user); // Save user to DB
            tx.commit();
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            e.printStackTrace();
        } finally {
            session.close();
        }

        // Fetch user back
        session = HibernateUtil.getSessionFactory().openSession();
        User fetchedUser = session.get(User.class, user.getId());
        System.out.println("Fetched User: " + fetchedUser.getName() + " - " + fetchedUser.getEmail());
        session.close();
    }
}
```

## 🧪 Output

```
Hibernate: insert into users (email, name) values (?, ?)
Hibernate: select user0_.id as id1_0_0_, user0_.email as email2_0_0_, user0_.name as name3_0_0_ from users user0_ where user0_.id=?
Fetched User: Alice - alice@example.com
```

## 📦 Dependencies (Maven)

Add this to your `pom.xml`:

```xml
<dependencies>
    <dependency>
        <groupId>org.hibernate.orm</groupId>
        <artifactId>hibernate-core</artifactId>
        <version>6.3.1.Final</version>
    </dependency>
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <version>2.2.220</version>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>jakarta.persistence</groupId>
        <artifactId>jakarta.persistence-api</artifactId>
        <version>3.1.0</version>
    </dependency>
</dependencies>
```

## ✅ Summary

- **Hibernate** allows Java objects to be stored and retrieved from a relational database.
- It reduces boilerplate SQL and improves code readability.
- However, it still allows native queries if needed.

> ⚠️ Hibernate has a learning curve—be mindful of lazy loading, session handling, and transaction boundaries.
