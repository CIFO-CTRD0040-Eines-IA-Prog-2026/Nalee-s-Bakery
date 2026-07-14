# 008 — API de pedidos (CRUD por usuario)

## Descripción
Quinto paso del BACKEND: sobre el servidor de la 005 y la autenticación de la 006, añadir las rutas de pedidos. Cada pedido pertenece a un usuario: la API solo retorna y opera sobre los pedidos del usuario de la sesión.

## Contenido
Rutas REST bajo `/api/orders`, todas protegidas por el middleware `requiereSesion` (006): sin sesión → 401.
Los pedidos se filtran SIEMPRE por `user_id` de la sesión (`req.session.userId`), nunca por un id del cliente.

Las operaciones crean la orden con sus líneas y calculan:
- Subtotal = suma de (cantidad × precio unitario)
- Descuento: 10% si el total de unidades > 10
- Total = subtotal - descuento

## Contrato
`GET /api/orders`
  → 200 `[{ id, subtotal, discount, total, status, created_at, lines: [{ id, cookie_id, quantity, unit_price, subtotal }] }, ...]` — solo las del usuario, ordenadas por `created_at` descendente.

`POST /api/orders` con `{ items: [{ cookie_id, quantity }, ...] }`
  → 201 `{ id, subtotal, discount, total, status: "pending", created_at, lines: [...] }`
  → 400 `{ error: "..." }` si `items` falta, está vacío, o contiene datos inválidos.
  → 404 `{ error: "Galleta no encontrada" }` si algún `cookie_id` no existe en la BD.

El servidor calcula:
- `unit_price` desde la tabla `cookies` (precio actual, no confía en el precio del cliente).
- `subtotal` de cada línea = quantity × unit_price.
- Subtotal total = suma de subtotales de líneas.
- Descuento: 10% si suma de quantities > 10, sino 0.
- Total = subtotal - descuento.
- `status` inicial: `"pending"`.

Toda la operación se ejecuta dentro de una transacción SQLite: si falla algo, no se crea la orden.

## Criterios de aceptación
[ ] Sin sesión, cualquier ruta `/api/orders` responde 401 (middleware de la 006).
[ ] Con sesión, `GET /api/orders` retorna solo los pedidos de ese usuario.
[ ] `POST /api/orders` con `{items}` válido crea la orden y sus líneas, calcula subtotal, descuento y total correctamente, y retorna 201.
[ ] `POST` con array vacío o sin items → 400 y no crea nada.
[ ] `POST` con `cookie_id` inexistente → 404 y no crea nada (transacción rollback).
[ ] Con dos usuarios (A y B): A no ve los pedidos de B.
[ ] El descuento del 10% se aplica solo cuando la suma de cantidades > 10.
[ ] Los precios unitarios vienen siempre de la BD, nunca del cliente.
