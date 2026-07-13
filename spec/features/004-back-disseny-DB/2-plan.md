# Pla — 004 Disseny de base de dades

## Estructura de fitxers

```
database/
├── schema.sql          # CREATE DATABASE + CREATE TABLE
├── seed.sql            # INSERT catàleg de galletes
└── README.md           # Instruccions d'ús (opcional)
```

## Backend runtime

- Node.js amb Express + better-sqlite3.
- Fitxers a `backend/`.
- `backend/server.js`: punt d'entrada.
- `backend/db/connection.js`: connexió SQLite que crea esquema i seed automàticament.

## Passos

1. Actualitzar `spec/constitution/2-tech-stack.md` amb la pila backend.
2. Crear `backend/db/connection.js` amb SQLite (CREATE TABLE IF NOT EXISTS + seed).
3. Crear `backend/` amb package.json i server.js.
4. Verificació: arrencar servidor i comprovar que la BD es crea a `backend/data/`.

## Selectors / contractes per al frontend

El frontend farà fetch a:

| Mètode | Endpoint | Descripció |
|---|---|---|
| POST | /api/auth/login | Inici de sessió |
| POST | /api/auth/register | Registre d'usuari |
| GET | /api/cookies | Llistat de galletes |
| POST | /api/orders | Crear comanda |
| GET | /api/orders | Historial de comandes (autenticat) |
