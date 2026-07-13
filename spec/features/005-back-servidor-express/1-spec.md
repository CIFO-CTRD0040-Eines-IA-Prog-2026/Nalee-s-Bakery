# 005 — Servidor Express y conexión a la BD

## Descripción
Segundo paso del BACKEND: levantar un servidor Express que sirva el FRONTEND con URLs limpias y tenga la conexión a `nalees_bakery` (004) preparada y verificable. Aún no hay rutas de API ni de autenticación.

## Contenido
- Servidor Express en un puerto configurable (por defecto 3000).
- Sirve el FRONTEND con URLs limpias (sin `.html`): `/`, `/login`, `/registro`. Los assets (CSS, JS, imágenes) como estáticos de `public/`.
- Conexión a SQLite con `better-sqlite3`. La BD se crea automáticamente como archivo local.
- `GET /health` que hace un SELECT a la BD y responde el estado de la conexión.

## Contrato
- Rutas de página con `res.sendFile`: `GET /` → `index.html`, `GET /login` → `login.html`, `GET /registro` → `registro.html`.
- Assets estáticos: `public/` para CSS, JS e imágenes.
- `GET /health` → 200 `{ estado: "ok", db: "ok" }` si la BD responde; 500 `{ estado: "error", db: "ko" }` si no.
- La ruta de la BD va en `.env` (DB_PATH); un `.env.example` documenta las variables.
- Nota: la protección de sesión se aplica más adelante (006/009).

## Criterios de aceptación
[ ] `npm install` instala express, better-sqlite3 y dotenv sin errores.
[ ] `npm start` levanta el servidor en el puerto de `.env` (o 3000) sin petar.
[ ] `/`, `/login` y `/registro` muestran su página; ninguna URL lleva `.html`.
[ ] `GET /health` responde 200 con `db: "ok"` (la BD se crea sola al arrancar).
[ ] Si se borra el archivo `.db`, se recrea solo al reiniciar el servidor.
[ ] La BD se guarda en `backend/data/nalees_bakery.db` (o la ruta de `.env`).
