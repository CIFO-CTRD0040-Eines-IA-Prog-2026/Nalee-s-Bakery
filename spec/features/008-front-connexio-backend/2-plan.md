# Plan — 008 Conexión del FRONTEND al backend real

## Archivos
- `public/js/auth.js` — reescribir: login, registro y logout con `fetch` real (credentials same-origin). Sesión vía `GET /api/auth/me` en lugar de localStorage.
- `public/js/pedido.js` — reescribir: cargar catálogo; enviar pedido a `POST /api/orders`.
- `public/js/i18n.js` — sin cambios funcionales (sigue aplicando traducciones).
- `public/*.html` — `href` y acciones hacia `/`, `/login`, `/registro` (sin `.html`).
- `backend/server.js` — si se decide proteger la ruta `/`, aplicar `requiereSesionPagina`.

## Decisiones
- **fetch real (skill fetch-api)**: `async/await` con `try/catch`, `response.ok` antes de `.json()`, `credentials: 'same-origin'` en cada llamada. Errores en español, nunca el texto de la excepción.
- **Eliminar mock**: fuera `localStorage.setItem/getItem('session')`, datos de galletas quemados, etc.
- **Auth**: después de validar (002), login y registro llaman a la API y navegan a `/` si va bien; si no, mensaje en la zona de error.
- **Catálogo dinámico**: `pedido.js` carga catalogo al iniciar y construye las tarjetas dinámicamente (o pinta sobre un template). El HTML debe tener las 6 galletas fijas.
- **Sesión**: al cargar la página, `GET /api/auth/me` para saber si hay sesión. Si hay, mostrar logout-item; si no, auth-link. Un 401 en cualquier llamada de pedido redirige a `/login`.

## Precondiciones
- 005, 006, 007 y 008 hechas. El servidor (005) sirviendo `public/`. La verificación es siempre contra el servidor vivo, no abriendo el `.html` suelto.

## Referencias
- **Skill fetch-api** — patrón de llamadas, estados y mensajes.
- **Skill loop-verificacio-front** — verificación con navegador (Playwright MCP).
- **Context7 (MCP)** — sintaxis de `fetch` con credentials.
