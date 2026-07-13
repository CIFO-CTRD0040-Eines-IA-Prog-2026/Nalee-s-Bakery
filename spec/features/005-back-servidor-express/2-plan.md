# Plan — 005 Servidor Express y conexión a la BD

## Archivos (en `backend/`)
- `package.json` — dependencias (express, mysql2, dotenv) y scripts (start, dev).
- `server.js` — app Express: rutas de página, estáticos, `/health` y `app.listen`.
- `db.js` — pool `mysql2/promise` con credenciales de `.env`.
- `.env` — valores locales (localhost / root / sin password / nalees_bakery / puerto 3000).
- `.env.example` — plantilla documentada.
- `.gitignore` — `node_modules/`.

## Decisiones
- **Conexión**: pool con `mysql.createPool` (skill mysql), no conexión única.
- **Config**: todo por `.env` con `dotenv`; ninguna credencial en el código.
- **URLs limpias**: rutas explícitas con `res.sendFile` para HTML; assets por `express.static('public')`. No servir HTML por estáticos para poder añadir protección de sesión después.
- **/health**: ping vía el pool (`SELECT 1`) dentro de try/catch → 200 ok / 500 ko sin petar.
- **Fuera de alcance**: API de auth, galletas y pedidos (features posteriores) y protección de sesión (006/009).

## Precondiciones
- `nalees_bakery` y las 4 tablas (004) existentes para que `/health` dé `db: "ok"`.

## Referencias
- **Context7 (MCP)**: sintaxis de Express y `mysql2`.
- **Skill mysql**: reglas del pool.
