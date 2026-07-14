# Tareas — 008 Conexión del FRONTEND al backend real

[x] T1 — `public/js/auth.js`: eliminar toda dependencia de localStorage para sesión; login/register/logout con fetch real + credentials same-origin; `GET /api/auth/me` al cargar para saber estado de sesión.
[x] T2 — `public/js/pedido.js`: cargar catálogo al iniciar (pintar tarjetas dinámicamente o sobre template). Hecho — `cargarCatalogo()` en pedido.js: fetch GET /api/cookies, mapea datos al DOM, actualiza precios e i18n dinámicamente. Eliminado slugToId hardcoded.
[x] T3 — `public/js/pedido.js`: al enviar pedido, `POST /api/orders` con los items; en éxito → confirmación y reinicio; 401 → redirigir a `/login`.
[x] T4 — `public/*.html`: actualizar todos los `href` y enlaces a URLs limpias (`/`, `/login`, `/registro`), sin `.html`.
[ ] T5 — `backend/server.js`: si procede, aplicar `requiereSesionPagina` a la ruta `/`. ⏳ Pendiente — opcional, sin decidir.
[ ] T6 — Verificar el flujo completo con la skill loop-verificacio-front (Playwright MCP) contra el servidor vivo: registro → login → ver catálogo → crear pedido → logout → login de otro usuario → ver solo sus pedidos. ⏳ Pendiente — requiere Playwright MCP conectado.
[ ] T7 — Si todo pasa, «hecho».
