# Plan — 008 API de pedidos

## Archivos (en `backend/`)
- `routes/orders.js` — router con `GET/POST /api/orders`, todo protegido con `requiereSesion` (006). Usa el pool de `db.js` (005).
- `server.js` — montar el router de pedidos.

## Decisiones
- **Protección**: todas las rutas pasan por el middleware `requiereSesion` (006). El usuario sale de `req.session.userId`, nunca del body ni de la URL.
- **Aislamiento por usuario**: cada query lleva `WHERE user_id = ?`. GET filtra por `user_id` de la sesión.
- **Transacción**: POST /api/orders ejecuta BEGIN, INSERT en orders, INSERT en order_lines, COMMIT. Si algo falla, ROLLBACK. Todo con `pool.getConnection()` y `connection.beginTransaction()`.
- **Precios desde la BD**: se hace un SELECT de `cookies` para obtener `price` de cada `cookie_id` incluido. Si algún id no existe → 404 + rollback.
- **Cálculos**: se hacen en el servidor JavaScript, no en SQL, para mantener lógica clara.
- **Consultas parametrizadas** (skill mysql): siempre `pool.execute(sql, [params])` con `?`, nunca concatenar.
- **Fuera de alcance**: actualizar estado (pending→confirmed/shipped/cancelled), paginación, filtros. Solo creación y listado.

## Precondiciones
- 005 (servidor + pool), 006 (sesión + `requiereSesion`), 007 (tabla cookies poblada). Tabla `orders` y `order_lines` con FK (004).

## Referencias
- **Skill mysql**: transacciones, consultas parametrizadas, `insertId`.
- **Skill fetch-api**: forma y códigos de estado que el front (009) espera consumir.
- **Context7 (MCP)**: sintaxis de transacciones con `mysql2/promise`.
