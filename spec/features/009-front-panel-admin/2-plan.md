# Plan — 009 Panel de administración

## Archivos
- `public/admin.html` — página estática del panel con enlaces a `/admin/data` y `/`.
- `backend/server.js` — ruta `GET /admin` (protegida con `requiereAdmin`) y ruta `GET /admin/data`.
- `backend/middleware/sesion.js` — función `requiereAdmin` (verifica `role === 'admin'`).
- `backend/db/connection.js` — seed crea usuario admin (`admin@nalees.com`, password `admin1234`).

## Decisiones
- **Ruta `/admin`** usa el middleware `requiereAdmin` para proteger el acceso.
- **Ruta `/admin/data`** también usa `requiereAdmin` y retorna un JSON plano con las 4 tablas.
- **Seed automático**: el usuario admin se crea al iniciar la BD si no existe.
- **Fuera de alcance**: CRUD completo de admin (editar galletas, gestionar pedidos), solo se expone lectura de datos.

## Precondiciones
- Feature 004 (BD) y 006 (auth + sesiones) implementadas.
- Middleware `requiereSesion` y `requiereAdmin` disponibles en `backend/middleware/sesion.js`.
