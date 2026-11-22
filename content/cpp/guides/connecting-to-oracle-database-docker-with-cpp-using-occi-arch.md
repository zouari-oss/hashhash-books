# Connecting to Oracle Database (Docker) with C++ Using OCCI (Arch)

This guide explains how to connect to an Oracle Database running in a Docker container from a C++ application using the Oracle C++ Call Interface (OCCI).

## Table of Contents

- [Connecting to Oracle Database (Docker) with C++ Using OCCI (Arch)](#connecting-to-oracle-database-docker-with-c-using-occi-arch)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Setting Up the Oracle Database in Docker](#setting-up-the-oracle-database-in-docker)
  - [Creating a Dedicated Database User](#creating-a-dedicated-database-user)
  - [Installing Oracle Instant Client and OCCI](#installing-oracle-instant-client-and-occi)
  - [Developing a Sample C++ Application](#developing-a-sample-c-application)
  - [Compilation and Execution](#compilation-and-execution)
  - [Troubleshooting](#troubleshooting)
  - [Deleting Everything (Cleanup)](#deleting-everything-cleanup)
  - [References](#references)

## Prerequisites

- **Docker:** Installed and running.
- **Oracle Database Image:** Use the Oracle Database Enterprise Edition image from the [Oracle Container Registry](https://container-registry.oracle.com/).
- **C++ Compiler:** `g++` (or your preferred C++ compiler).
- **Oracle Instant Client & OCCI Libraries:** Installed on your system.  
  You can download:
  - [Oracle Instant Client Basic (Linux x64 23.7.0.25.01)](https://download.oracle.com/otn_software/linux/instantclient/2370000/instantclient-basic-linux.x64-23.7.0.25.01.zip)
  - [Oracle Instant Client SDK (Linux x64 23.7.0.25.01)](https://download.oracle.com/otn_software/linux/instantclient/2370000/instantclient-sdk-linux.x64-23.7.0.25.01.zip)
- **Qt Creator (Optional):** For development using an IDE.

> **Note:** This guide assumes you are using an Arch Linux system. Adjust paths and commands as needed for your environment.

## Setting Up the Oracle Database in Docker

Ensure Docker is installed on your system. On Arch Linux:

```bash
sudo pacman -S docker
```

Enable and start the Docker service:

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

Login to Oracle Container Registry:

```bash
docker login container-registry.oracle.com
```

- **Username**: Your Oracle account email (e.g., `zouariomar20@gmail.com`)
- **Password**: Your Oracle account password

Pull and run the Oracle Database container. For example, you may run:

```bash
docker run -d --name oracle-db -p 1521:1521 container-registry.oracle.com/database/enterprise:latest
```

Verify that the container is running:

```bash
docker ps
```

You should see output similar to:

```bash
CONTAINER ID   IMAGE                                                      COMMAND                  CREATED      STATUS                   PORTS                                       NAMES
7544d4f92302   container-registry.oracle.com/database/enterprise:latest   "/bin/sh -c 'exec $O…"   4 days ago   Up 6 minutes (healthy)   0.0.0.0:1521->1521/tcp, :::1521->1521/tcp   oracle-db
```

## Creating a Dedicated Database User

Connecting as SYS (with SYSDBA privileges) is not recommended for application use. Instead, create a dedicated user:

1. **Log into SQL\*Plus inside the container:**

   ```bash
   docker exec -it oracle-db sqlplus sys/sys@//localhost:1521/orclpdb1 as sysdba
   ```

2. **Create a new user and grant privileges:**

   ```sql
   CREATE USER myapp IDENTIFIED BY myapppass;
   GRANT CONNECT, RESOURCE TO myapp;
   ```

3. **Exit SQL\*Plus:**

   ```sql
   EXIT;
   ```

Your dedicated user (`myapp`) with password (`myapppass`) is now ready for use.

## Installing Oracle Instant Client and OCCI

Ensure that the Oracle Instant Client (which includes OCCI) is installed on your host machine. Common installation paths include:

- **Include path:** `/usr/local/include/oracle`
- **Library path:** `/usr/local/lib/oracle`

Also, make sure that the runtime linker can find these libraries. You might need to set the `LD_LIBRARY_PATH` environment variable:

```bash
export LD_LIBRARY_PATH=/usr/local/lib/oracle:$LD_LIBRARY_PATH
```

## Developing a Sample C++ Application

Create a sample C++ file (e.g., `main.cpp`) that uses OCCI to connect to the Oracle database. Below is an example:

```cpp
#include <iostream>
#include <oracle/occi.h> // Or #include <occi.h>

using namespace oracle::occi;

int main() {
    // Connection parameters for the dedicated user.
    const std::string user = "myapp";
    const std::string pass = "myapppass";
    const std::string db   = "localhost:1521/orclpdb1"; // Use the container's host and mapped port.

    Environment *env = nullptr;
    Connection *conn = nullptr;

    try {
        // Create an Oracle environment.
        env = Environment::createEnvironment(Environment::DEFAULT);

        // Create a connection using the three-parameter overload.
        conn = env->createConnection(user, pass, db);
        std::cout << "Connected to Oracle Database!" << std::endl;

        // Execute a simple query.
        Statement *stmt = conn->createStatement("SELECT sysdate FROM dual");
        ResultSet *rs = stmt->executeQuery();
        if (rs->next()) {
            std::cout << "Current Date: " << rs->getString(1) << std::endl;
        }
        stmt->closeResultSet(rs);
        conn->terminateStatement(stmt);

        // Clean up the connection and environment.
        env->terminateConnection(conn);
        Environment::terminateEnvironment(env);
    } catch (SQLException &e) {
        std::cerr << "Error: " << e.getMessage() << std::endl;
        if (env)
            Environment::terminateEnvironment(env);
        return EXIT_FAILURE;
    }

    return EXIT_SUCCESS;
}
```

## Compilation and Execution

Compile your C++ application using `g++` and link it against the Oracle Instant Client libraries. For example:

```bash
g++ -o app main.cpp -I/usr/local/include/oracle -L/usr/local/lib/oracle -lclntsh -locci
```

Then run your application:

```bash
./app
```

If everything is configured correctly, you should see an output similar to:

```bash
Connected to Oracle Database!
Current Date: 07-FEB-2025
```

## Troubleshooting

- **ORA-12514 Error:**  
  If you encounter an error like `ORA-12514: TNS:listener does not currently know of service requested in connect descriptor`, verify the service name by checking the listener status inside the container:

  ```bash
  docker exec -it oracle-db bash -c "lsnrctl status"
  ```

  Ensure your connection string matches one of the registered services (e.g., `orclpdb1`).

- **LD_LIBRARY_PATH Issues:**  
  If your application fails to find the Oracle libraries at runtime, set the `LD_LIBRARY_PATH` environment variable as shown above.

- **User Privileges:**  
  Using the SYS user for application connections is not recommended. Use a dedicated user (as shown) to avoid privilege-related issues.

- **ORA-01950: no privileges on tablespace 'USERS':**  
  This error indicates that the database user (`myapp`) doesn't have the required quota on the `USERS` tablespace to create objects (e.g., tables).  
  To fix this, connect as SYSDBA and grant the necessary quota:

  1. Open SQL\*Plus inside the container:

     ```bash
     docker exec -it oracle-db sqlplus sys/sys@//localhost:1521/orclpdb1 as sysdba
     ```

  2. Run:

     ```sql
     ALTER USER myapp QUOTA UNLIMITED ON USERS;
     GRANT CREATE SESSION TO myapp;
     GRANT CONNECT TO myapp;
     GRANT DBA TO myapp;
     ```

  3. Exit SQL\*Plus and re-run your application.

- **ORA-12514 Error:**  
  If you see an error like `ORA-12514: TNS:listener does not currently know of service requested in connect descriptor`, verify the service name by checking the listener status in the container:

  ```bash
  docker exec -it oracle-db bash -c "lsnrctl status"
  ```

- **Fixing Credential Storage Issues**

  - **Option 1: Initialize `pass`**

    - Install `pass`:

    ```bash
    sudo pacman -S pass
    ```

    - Generate a GPG key:

    ```bash
    gpg --full-generate-key
    ```

    - Select "RSA and RSA."
    - Use at least 2048 bits for the key size.
    - Provide your name and email.
    - Note the GPG key ID (e.g., `ABCDEF1234567890`).

    - Initialize `pass` with the GPG key:

    ```bash
    pass init ABCDEF1234567890
    ```

    - Retry logging into the Oracle container registry:

    ```bash
    docker login container-registry.oracle.com
    ```

  - **Option 2: Disable `credsStore`**

    - Open Docker's configuration file:

    ```bash
    nano ~/.docker/config.json
    ```

    - Remove the `credsStore` line or set it to null. The file should look like this:

    ```json
    {
      "auths": {
        "container-registry.oracle.com": {}
      }
    }
    ```

    - Save the file and retry logging in:

    ```bash
    docker login container-registry.oracle.com
    ```

  - **Option 3: Use `--password-stdin`**
    - Skip credential storage entirely by running:

```bash
echo "yourpassword" | docker login container-registry.oracle.com -u "zouariomar20@gmail.com" --password-stdin
```

## Deleting Everything (Cleanup)

If you want to remove everything related to this setup, follow these steps:

- Drop the User (Inside SQL\*Plus)

```sql
DROP USER myapp CASCADE;
```

- Stop & Remove the Oracle Container

```bash
docker stop oracle-db
docker rm oracle-db
```

- Remove Oracle Image

```bash
docker rmi container-registry.oracle.com/database/free:latest
```

- Remove Oracle Instant Client (If Installed)

```bash
rm -rf /usr/local/lib/oracle /usr/local/include/oracle
```

## References

- [Oracle OCCI Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/21/lnoci/index.html)
- [Oracle Database Error Messages](https://docs.oracle.com/en/database/oracle/oracle-database/21/errmg/index.html)
- [Oracle Instant Client Downloads](https://www.oracle.com/database/technologies/instant-client.html)
- [Oracle Container Registry](https://container-registry.oracle.com/)
- [Oracle Instant Client Basic (Linux x64 23.7.0.25.01)](https://download.oracle.com/otn_software/linux/instantclient/2370000/instantclient-basic-linux.x64-23.7.0.25.01.zip)
- [Oracle Instant Client SDK (Linux x64 23.7.0.25.01)](https://download.oracle.com/otn_software/linux/instantclient/2370000/instantclient-sdk-linux.x64-23.7.0.25.01.zip)
