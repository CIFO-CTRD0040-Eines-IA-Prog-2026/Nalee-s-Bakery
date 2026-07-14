# 009 — Panel de administración

## Descripción
Página protegida destinada al administrador de NALEE's Bakery. Permite acceder a un endpoint que expone todos los datos de la base de datos en formato JSON para su consulta o exportación.

## Contenido
- `admin.html`: página estática con enlace a `/admin/data` y botón de retorno a la tienda.
- Ruta `GET /admin`: sirve `admin.html`, protegida por middleware `requiereAdmin`.
- Ruta `GET /admin/data`: retorna un JSON con todos los datos de la BD (users, cookies, orders, order_lines).
- Middleware `requiereAdmin`: verifica que la sesión pertenezca a un usuario con `role === 'admin'`.

## Contrato
`GET /admin` (requiere sesión de admin)
  → 200: página HTML del panel.

`GET /admin/data` (requiere sesión de admin)
  → 200: `{ users: [...], cookies: [...], orders: [...], order_lines: [...] }`.
  → 401: `{ error: "No autenticado" }` si no hay sesión.
  → 403: `{ error: "Acceso denegado" }` si el usuario no es admin.

## Criterios de aceptación
[ ] `GET /admin` sin sesión redirige al login.
[ ] `GET /admin` con sesión de usuario normal retorna 403.
[ ] `GET /admin` con sesión de admin muestra `admin.html`.
[ ] `GET /admin/data` con sesión de admin retorna JSON con las 4 tablas.
[ ] `GET /admin/data` sin sesión retorna 401.
[ ] `GET /admin/data` con sesión de usuario normal retorna 403.
[ ] El usuario admin se crea automáticamente en el seed (`admin@nalees.com`).
