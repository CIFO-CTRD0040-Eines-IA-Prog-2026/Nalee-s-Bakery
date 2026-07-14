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
- SQLite con better-sqlite3 (BD local en `backend/data/`).
- Esquema y seed automáticos al arrancar el servidor.
- API REST en `/api/*`.
- Autenticación con sesiones (cookie httpOnly + express-session).

## Documentación
- Sintaxis actualizada con el MCP Context7.

## Convenciones
- Contenido y código en catalán o castellano.
- Mobile-first.
- IDs del DOM en kebab-case y estables: son el contrato entre HTML, JS y verificación.
