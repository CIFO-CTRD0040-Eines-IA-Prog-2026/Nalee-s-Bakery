# Plan — 006 API de autenticación

## Archivos (en `backend/`)
- `package.json` — añadir `bcrypt` y `express-session`.
- `server.js` — montar `express.json()` y `express-session` (secret de `.env`) y el router de auth.
- `routes/auth.js` — router con `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`. Usa el pool de `db.js` (005).
- `middleware/sesion.js` — dos guardias: `requiereSesion` (API → 401 JSON) y `requiereSesionPagina` (página → 302 a `/login`).
- `.env` / `.env.example` — añadir `SESSION_SECRET`.

## Decisiones
- **Sesión con cookie** (no JWT): la webapp la sirve el mismo Express, así que `express-session` con cookie httpOnly es lo más simple. En la sesión solo guardamos `req.session.userId`.
- **Hash**: `bcrypt` con ~10 salt rounds. Nunca se guarda ni retorna la contraseña en claro.
- **Mensaje de login neutro**: email inexistente y contraseña errónea retornan el mismo 401, para no revelar qué emails están registrados.
- **Duplicados**: se confía en la constraint `uk_users_email` de la BD (004). Si el INSERT da `ER_DUP_ENTRY`, se traduce a 409.
- **Validación**: campos obligatorios y formato de email básico en el servidor (el front ya valida, pero el backend no se fía).
- **Cookie**: `httpOnly: true`; `secure` ligado a producción (en local, HTTP, debe funcionar). `sameSite: 'lax'`.
- **Fuera de alcance**: rutas de galletas (007) y pedidos (008), recuperación de contraseña, verificación de email.

## Precondiciones
- Servidor Express + pool `db.js` de la 005 en marcha; BD `nalees_bakery` con la tabla `users` (004).

## Referencias
- **Context7 (MCP)**: sintaxis de `express-session` y `bcrypt`.
- **Skill mysql**: consultas parametrizadas (`pool.execute` con `?`), nunca concatenar el email.
- **Skill fetch-api**: forma de las respuestas y códigos de estado que el front consumirá.
