# Postgresql Notes

- Log in as the default postgres user:

```bash
sudo -u postgres psql
```

- Create a database and user:

```bash
-- create database
CREATE DATABASE mydatabase;

-- create user with password
CREATE USER "user" WITH ENCRYPTED PASSWORD 'password';

-- give privileges
GRANT ALL PRIVILEGES ON DATABASE mydatabase TO "user";
```
