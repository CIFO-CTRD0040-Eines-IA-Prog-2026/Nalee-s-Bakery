# Tareas — 006 API de autenticación

[x] T1 — `backend/package.json`: añadir `bcrypt` y `express-session`; `npm install` sin errores.
[x] T2 — `backend/.env` y `.env.example`: añadir `SESSION_SECRET` (valor local en .env; documentado, sin valor, en .env.example).
[x] T3 — `server.js`: montar `express.json()` y `express-session` (cookie httpOnly, sameSite lax) antes de las rutas.
[x] T4 — `backend/middleware/sesion.js`: `requiereSesion` (API → 401 JSON) y `requiereSesionPagina` (página → 302 a `/login`). Ambos exportados.
[x] T5 — `backend/routes/auth.js`: `POST /api/auth/register` — validar campos, hash bcrypt, INSERT parametrizado; 201 + sesión; `ER_DUP_ENTRY`→409.
[x] T6 — `backend/routes/auth.js`: `POST /api/auth/login` — `bcrypt.compare`; 200 + sesión o 401 con mensaje neutro.
[x] T7 — `backend/routes/auth.js`: `POST /api/auth/logout` (destruye sesión → 200) y `GET /api/auth/me` (200 con usuario o 401).
[x] T8 — Montar el router en server.js; comprobar que ninguna respuesta retorna `password_hash`.
[x] T9 — Verificar: registro→201 y fila con hash bcrypt; duplicado→409; login ok/ko; /api/auth/me 401→200→401 con logout.
[x] T10 — Si todo pasa, roadmap: 006 a «hecho».
