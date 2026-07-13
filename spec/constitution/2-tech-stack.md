# Tech Stack — NALEE's Bakery

## Frontend
- HTML5, CSS3, JavaScript vanilla.
- Tipografia: Google Fonts (Playfair Display + Source Sans 3).
- CSS pur amb variables (sense Tailwind).
- Estils seguint la skill **estil-nalees**.
- Mobile-first. Responsive: 768px (tablet), 480px (mòbil).

## Execució
- Obrir `index.html` al navegador (Live Server).

## Backend
- Node.js (>=18) amb Express.
- SQLite amb better-sqlite3 (BD local a `backend/data/`).
- Esquema i seed automàtics en arrencar el servidor.
- API REST a `/api/*`.
- Autenticació amb sessions (cookie httpOnly + express-session).

## Documentació
- Sintaxi actualitzada amb el MCP Context7.

## Convencions
- Contingut i codi en català o castellà.
- Mobile-first.
- IDs del DOM en kebab-case i estables: són el contracte entre HTML, JS i verificació.
