# Tech Stack — NALEE's Bakery

## Frontend
- HTML5, CSS3, JavaScript vanilla.
- Tipografía: Google Fonts (Playfair Display + Source Sans 3).
- CSS puro con variables (sin Tailwind).
- Estilos siguiendo la skill **estil-nalees**.
- Mobile-first. Responsive: 768px (tablet), 480px (móvil).

## Ejecución
- Abrir `index.html` en el navegador (Live Server).

## Backend
- Node.js (>=18) con Express.
- SQLite con sql.js (WASM, BD local en `backend/data/`).
- Esquema y seed automáticos al arrancar el servidor.
- API REST en `/api/*` (ver abajo).
- Autenticación con sesiones (cookie httpOnly + express-session).

## API REST (capa intermedia)
La API entre el frontend y SQLite es **necesaria** porque:

1. **sql.js corre en Node, no en el navegador** — el frontend son estáticos (HTML/CSS/JS vanilla) sin build step que permita importar módulos npm.
2. **Seguridad** — `bcrypt` para hash de contraseñas requiere Node; las cookies httpOnly de `express-session` necesitan un servidor; el `SESSION_SECRET` va en `.env`, nunca en el cliente.
3. **Lógica de negocio** — los precios se leen de la BD (no se confía del cliente, spec 007), los descuentos se calculan en servidor, las transacciones SQL aseguran consistencia.
4. **Aislamiento** — cada usuario ve solo sus pedidos (`WHERE user_id = ?`), validado siempre del lado servidor.

Sin la API el frontend no podría cifrar contraseñas, mantener sesiones seguras, ni garantizar que los datos críticos (precios, descuentos, propiedad de pedidos) vengan de la BD y no del cliente.

## Documentación
- Sintaxis actualizada con el MCP Context7.

## Convenciones
- Contenido y código en castellano.
- Mobile-first.
- IDs del DOM en kebab-case y estables: son el contrato entre HTML, JS y verificación.
