# Plan — 004 Diseño de base de datos

## Estructura de archivos

```
database/
├── schema.sql          # CREATE DATABASE + CREATE TABLE
├── seed.sql            # INSERT catálogo de galletas
└── README.md           # Instrucciones de uso (opcional)
```

## Backend runtime

- Node.js con Express + better-sqlite3.
- Archivos en `backend/`.
- `backend/server.js`: punto de entrada.
- `backend/db/connection.js`: conexión SQLite que crea esquema y seed automáticamente.

## Pasos

1. Actualizar `spec/constitution/2-tech-stack.md` con la pila backend.
2. Crear `backend/db/connection.js` con SQLite (CREATE TABLE IF NOT EXISTS + seed).
3. Crear `backend/` con package.json y server.js.
4. Verificación: arrancar servidor y comprobar que la BD se crea en `backend/data/`.

## Selectores / contratos para el frontend

El frontend hará fetch a:

| Método | Endpoint | Descripción |
|---|---|---|
| POST | /api/auth/login | Inicio de sesión |
| POST | /api/auth/register | Registro de usuario |
| GET | /api/cookies | Listado de galletas |
| POST | /api/orders | Crear pedido |
| GET | /api/orders | Historial de pedidos (autenticado) |
