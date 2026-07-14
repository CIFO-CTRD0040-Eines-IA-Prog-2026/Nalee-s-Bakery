# Tareas — 009 Panel de administración

[x] T1 — `backend/middleware/sesion.js`: crear función `requiereAdmin` que verifique `role === 'admin'`.
[x] T2 — `backend/db/connection.js`: añadir seed de usuario admin (`admin@nalees.com`, `admin1234`, role `admin`).
[x] T3 — `backend/server.js`: ruta `GET /admin` protegida con `requiereAdmin` que sirva `admin.html`.
[x] T4 — `backend/server.js`: ruta `GET /admin/data` protegida con `requiereAdmin` que retorne JSON con las 4 tablas.
[x] T5 — `public/admin.html`: crear página con enlace a `/admin/data` y botón de retorno a la tienda.
[x] T6 — Verificar: acceso sin sesión → 401/redirect; acceso con usuario normal → 403; acceso con admin → 200.
