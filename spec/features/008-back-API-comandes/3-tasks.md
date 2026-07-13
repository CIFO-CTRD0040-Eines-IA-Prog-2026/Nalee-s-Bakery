# Tareas — 008 API de pedidos

[ ] T1 — `backend/routes/orders.js`: crear router y protegerlo todo con `requiereSesion` (006).
[ ] T2 — `GET /api/orders`: SELECT con JOIN a order_lines, filtrado por `user_id` de la sesión, ordenado por created_at DESC.
[ ] T3 — `POST /api/orders`: validar `items` (array con cookie_id y quantity > 0); si no, 400.
[ ] T4 — `POST /api/orders`: transacción — verificar que todos los cookie_id existen en `cookies`; si alguno no, 404 + rollback.
[ ] T5 — `POST /api/orders`: transacción — INSERT en orders, luego INSERT en order_lines con precio actual de cookies; calcular subtotal, descuento (10% si quantity total > 10) y total; commit.
[ ] T6 — Montar el router de pedidos en server.js.
[ ] T7 — Verificar con dos usuarios: sin sesión→401; A crea pedido y lo ve; A no ve los de B; descuento se aplica solo con >10 unidades; cookie_id inexistente→404 sin crear nada.
[ ] T8 — Si todo pasa, roadmap 008 a «hecho».
