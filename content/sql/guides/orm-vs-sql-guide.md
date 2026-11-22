# ORM and SQL: A Developer's Guide

## 📘 Overview

This guide provides an understanding of **Object-Relational Mapping (ORM)** and **SQL**, explaining what they are, how they differ, and when to use each in application development.

## 🧠 What is SQL?

**SQL (Structured Query Language)** is a domain-specific language used for managing and manipulating **relational databases**.

### Common SQL Operations

| Operation | SQL Statement  | Description            |
| --------- | -------------- | ---------------------- |
| Create    | `CREATE TABLE` | Defines a new table    |
| Read      | `SELECT`       | Retrieves data         |
| Update    | `UPDATE`       | Modifies existing data |
| Delete    | `DELETE`       | Removes data           |

### Example

```sql
SELECT name, email FROM users WHERE active = 1;
```

## 🔧 What is ORM?

**ORM (Object-Relational Mapping)** is a technique that allows developers to interact with a database using the programming language’s objects, instead of writing raw SQL.

ORM tools abstract away the SQL and provide a higher-level API for database operations.

### Common ORMs by Language

| Language   | Popular ORM            |
| ---------- | ---------------------- |
| Python     | SQLAlchemy, Django ORM |
| JavaScript | Sequelize, TypeORM     |
| Ruby       | ActiveRecord           |
| PHP        | Eloquent (Laravel)     |
| Java       | Hibernate              |

### Example (Using Python SQLAlchemy)

```python
# Define a User model
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)
    active = Column(Boolean)

# Query with ORM
session.query(User).filter_by(active=True).all()
```

## 🔍 ORM vs SQL

| Feature           | ORM                           | SQL                                 |
| ----------------- | ----------------------------- | ----------------------------------- |
| Abstraction Level | High (uses objects)           | Low (manual control)                |
| Learning Curve    | Easier for developers         | Requires understanding of DB schema |
| Performance       | May have overhead             | Typically faster, more optimized    |
| Flexibility       | Limited to ORM's capabilities | Full control of the query           |
| Portability       | Often supports multiple DBs   | Vendor-specific syntax              |

## 📌 When to Use What?

| Situation                              | Recommendation                   |
| -------------------------------------- | -------------------------------- |
| Simple CRUD apps                       | Use ORM for speed and simplicity |
| Complex queries or reporting           | Use raw SQL                      |
| Need tight control over performance    | SQL is preferred                 |
| Working with legacy databases          | ORM can simplify interaction     |
| Large teams or fast development cycles | ORM improves productivity        |

## ⚠️ ORM Anti-Patterns to Avoid

- **N+1 Query Problem**: Repeatedly querying inside loops.
- **Over-fetching**: Loading more data than necessary.
- **Under-using Transactions**: Not wrapping multiple operations in a transaction.

> 🔧 Tip: Most ORMs allow raw SQL execution when needed.

## 📚 Resources

- [SQLBolt – Learn SQL](https://sqlbolt.com)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Django ORM Docs](https://docs.djangoproject.com/en/stable/topics/db/models/)
- [TypeORM Docs](https://typeorm.io)

## ✅ Summary

- **SQL** gives full control, is faster, and is great for custom queries.
- **ORM** boosts productivity, readability, and reduces boilerplate.
- Knowing **both** gives you flexibility and power in database-driven applications.
