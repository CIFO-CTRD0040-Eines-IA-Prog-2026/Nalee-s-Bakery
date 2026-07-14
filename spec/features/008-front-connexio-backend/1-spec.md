# 008 — Conexión del FRONTEND al backend real

## Descripción
Paso final del ciclo: el frontend (`public/`) deja de trabajar contra localStorage y el mock en memoria, y se comunica con el backend real (006 auth + 007 catálogo + 008 pedidos). Login y registro llaman a la API y navegan según la respuesta; los pedidos se crean contra `/api/orders`; y el estado de sesión se gestiona vía cookie httpOnly.

## Contenido
- `public/js/auth.js`: las funciones de login, registro y logout pasan a hacer `fetch` real (skill fetch-api) con `credentials: 'same-origin'`. El estado de sesión se obtiene de `GET /api/auth/me` al cargar la página, no de `localStorage`.
- `public/js/pedido.js`: al enviar un pedido, llama a `POST /api/orders` con los items del resumen. 
- `public/index.html`, `login.html`, `registro.html`: todas las URLs apuntan a rutas limpias (`/`, `/login`, `/registro`), sin `.html`.
- `backend/server.js`: aplicar `requiereSesionPagina` (006) a la ruta `/` para redirigir al login si no hay sesión (o bien manejarlo desde el front; según decisión de diseño).

## Contrato (rutas de 006/007/008; los IDs del DOM no se tocan)
- **Login**: `POST /api/auth/login` → OK → `/` con sesión; 401 → "Email o contraseña incorrectos".
- **Registro**: `POST /api/auth/register` → OK → `/` con sesión; 409 → "Este email ya está registrado".
- **Logout**: `POST /api/auth/logout` → `/login`.
- **Pedido**: `POST /api/orders` → OK → confirmación y reinicio de cantidades.
- **Sesión**: al cargar cualquier página, `GET /api/auth/me` para determinar auth-link / logout-item.
- **Idioma**: los textos `data-i18n` siguen gestionándose por `i18n.js` (003); la API ya retorna ambos idiomas.

## Criterios de aceptación
[ ] Al abrir la página, el catálogo se carga desde la BD vía HTML estático.
[ ] Registro con datos nuevos crea el usuario en SQLite y redirige a `/` con sesión.
[ ] Login correcto lleva a `/`; login incorrecto muestra "Email o contraseña incorrectos".
[ ] "Cerrar sesión" hace logout y redirige a `/login`.
[ ] Al hacer un pedido válido, se crea en SQLite con las líneas y cálculos correctos.
[ ] Dos usuarios ven cada uno solo sus pedidos (aislamiento de la 008).
[ ] No queda ningún rastro del mock anterior: ni `localStorage` para sesión, ni datos quemados en HTML.
[ ] Toda la navegación usa URLs limpias (sin `.html`).
