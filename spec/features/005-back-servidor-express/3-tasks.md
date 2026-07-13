# Tareas — 005 Servidor Express y conexión a la BD

[ ] T1 — `backend/package.json`: dependencias (express, SQLite, dotenv) y scripts (start, dev).
[ ] T2 — `backend/.gitignore` (node_modules/) y `backend/.env.example` con DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, PORT.
[ ] T2b — `backend/.env` local: DB_PATH=./data/nalees_bakery.db, PORT=3000, SESSION_SECRET=...
[ ] T3 — `backend/db/connection.js`: conexión SQLite con better-sqlite3, creación automática de esquema y seed.
[ ] T4 — `backend/server.js`: app Express con URLs limpias: `GET /`→index.html, `GET /login`→login.html, `GET /registro`→registro.html (res.sendFile). Assets por express.static('public').
[ ] T5 — `backend/server.js`: endpoint GET /health que hace ping a la BD (SELECT 1) y responde ok/ko sin petar.
[ ] T6 — `npm install` y `npm start`: el servidor arranca en el PORT de `backend/.env` sin errores.
[ ] T7 — Verificar: `/`, `/login` y `/registro` muestran su página (ninguna URL con .html); GET /health da db:"ok".
[ ] T8 — Si todo pasa, roadmap 005 a «hecho».
