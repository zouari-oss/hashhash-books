# FastApi Notes

## ASGI Servers

FastAPI uses a standard for building Python web frameworks and servers called **[ASGI (Asynchronous Server Gateway Interface)](https://asgi.readthedocs.io/en/latest)**. FastAPI is an ASGI web framework.

The main thing you need to run a FastAPI application (or any other ASGI application) in a remote server machine is an ASGI server program like **[Uvicorn](https://uvicorn.dev)**, this is the one that comes by default in the `fastapi` command.

There are several alternatives, including:

- **Uvicorn**: a high performance ASGI server.
- **Hypercorn**: an ASGI server compatible with HTTP/2 and Trio among other features.
- **Daphne**: the ASGI server built for Django Channels.
- **Granian**: A Rust HTTP server for Python applications.
- **NGINX Unit**: NGINX Unit is a lightweight and versatile web application runtime.

## Recommended FastAPI Project Structure

```bash
my_fastapi_project/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── dependencies.py
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── users.py
│   │   └── items.py
│   ├── internal/
│   │   ├── __init__.py
│   │   └── admin.py
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   └── security.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── item.py
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── item.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── user_service.py
│   │   └── item_service.py
│   └── db/
│       ├── __init__.py
│       ├── database.py
│       └── migrations/
├── tests/
│   ├── __init__.py
│   ├── test_main.py
│   ├── test_users.py
│   ├── test_items.py
├── .env
├── .gitignore
├── requirements.txt
├── README.md
└── run.sh
```
