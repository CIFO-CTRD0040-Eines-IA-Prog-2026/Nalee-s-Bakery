# Plan — 007 API de galletas

## Archivos (en `backend/`)
- `routes/cookies.js` — router con `GET /api/cookies` (pública). Usa el pool de `db.js` (005).
- `server.js` — montar el router de cookies (como el de auth de la 006).

## Decisiones
- **Ruta pública**: la galería de galletas es el landing page, no requiere sesión. Sin middleware `requiereSesion`.
- **SELECT simple**: `SELECT id, slug, name_es, name_en, desc_es, desc_en, price, image FROM cookies ORDER BY id`.
- **Consultas parametrizadas** (skill mysql): siempre `pool.execute(sql, [params])` con `?`, aunque aquí no haya parámetros.
- **Internacionalización**: la API retorna ambos idiomas; el front decide cuál mostrar según `data-i18n` (como define 003).
- **Cache**: opcionalmente considerar cabecera `Cache-Control: public, max-age=300` para reducir carga.
- **Fuera de alcance**: CRUD de galletas (admin), pedidos (008), auth.

## Precondiciones
- 005 (servidor + pool) hecho. BD `nalees_bakery` con la tabla `cookies` poblada (seed de 004).

## Referencias
- **Skill SQLite**: consultas SELECT y mapeo de filas.
- **Skill fetch-api**: patrón de respuesta para el frontend.
- **Context7 (MCP)**: sintaxis de rutas GET en Express.
