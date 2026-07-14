# AGENTS.md — NALEE's Bakery

## Fuente de verdad
- **`spec/`** es la única fuente de verdad (SDD). Cada feature tiene `1-spec.md` (criterios de aceptación), `2-plan.md`, `3-tasks.md`.
- **`spec/constitution/`** contiene la misión, tech-stack y roadmap.
- Si documentación (README, spec) y código entran en conflicto, **el código ejecutable gana**.

## Proyecto completo
Todas las 9 features del roadmap (`spec/constitution/3-roadmap.md`) están marcadas como HECHO. No hay que crear nada nuevo a menos que se pida explícitamente.

## Comandos
- `cd backend; npm start` — servidor Express en `http://localhost:3000`
- `cd backend; npm run dev` — `node --watch` (requiere Node ≥18)
- La DB (`sql.js` WASM, **no** better-sqlite3) se crea y seed automáticamente en `backend/data/nalees_bakery.db` al primer arranque
- No hay tests, linter, formatter, typecheck ni CI

## Skills obligatorias
- **`.agents/skills/`** — carga la skill adecuada para cada tarea antes de empezar:
  - `estil-nalees` — tokens de diseño (colores, tipografía, espaciado)
  - `fetch-api` — consumo de APIs con fetch vanilla
  - `loop-verificacio-front` — verificación con Playwright MCP contra los criterios de aceptación
  - `mysql` — cambios en el esquema/queries
  - `documentar-conceptes` — documentar conceptos nuevos que aparezcan

## Convenciones de código
- Contenido y código en **catalán o castellano** (pentura)
- **Mobile-first**: 375px, 768px, 1280px
- **IDs del DOM en kebab-case** y estables (contrato entre HTML, JS y verificación)
- CSS puro con variables (sin Tailwind ni frameworks CSS)
- Frontend estático servido por Express desde `public/` — **sin build step**

## Estructura
- `public/` — frontend (HTML, CSS, JS vanilla)
- `backend/` — Express + sql.js (WASM SQLite, **no requiere compilación nativa**)
- `backend/server.js` — punto de entrada
- `backend/db/connection.js` — DB init, esquema y seed automático
- `backend/routes/auth.js` — `/api/auth/register|login|logout|me`
- `backend/routes/cookies.js` — `GET /api/cookies` (catálogo público)
- `backend/routes/orders.js` — `GET|POST /api/orders` (protegido), `PATCH /api/orders/:id/cancel`
- `backend/middleware/sesion.js` — `requiereSesion` / `requiereSesionPagina`
- `database/` — esquema/seed MySQL históricos (no activos; la DB real es SQLite)

## API
| Método | Ruta | Auth | Descripción |
|--------|------|------|------------|
| GET | `/api/cookies` | No | Catálogo público |
| POST | `/api/auth/register` | No | Registro |
| POST | `/api/auth/login` | No | Login |
| POST | `/api/auth/logout` | Sí | Logout |
| GET | `/api/auth/me` | Sí | Usuario actual |
| GET | `/api/orders` | Sí | Pedidos del usuario |
| POST | `/api/orders` | Sí | Crear pedido |
| PATCH | `/api/orders/:id/cancel` | Sí | Cancelar (solo pending) |
| GET | `/health` | No | Health check |

## Comportamiento de PROMPT.md
- IMPORTANTE LEE AGENTS.md y empieza el proyecto desde la feat 004-009 (ya están hechas).
