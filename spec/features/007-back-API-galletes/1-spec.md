# 007 — API de galletas (catálogo público)

## Descripción
Cuarto paso del BACKEND: sobre el servidor de la 005, añadir la ruta pública del catálogo de galletas. La tabla `cookies` (004) contiene las 6 galletas con nombre y descripción en español e inglés, precio e imagen.

## Contenido
Ruta pública `GET /api/cookies` (sin autenticación). Retorna el listado completo de galletas desde la BD, con los campos necesarios para que el frontend (003) pinte el catálogo con precios y cantidades.

## Contrato
`GET /api/cookies`
  → 200 `[{ id, slug, name_es, name_en, desc_es, desc_en, price, image }, ...]` — ordenadas por `id` o `created_at`.
  → No requiere sesión: es pública.

El frontend usará el campo `name_es` o `name_en` según el idioma seleccionado (el filtro se hace en el front, no en la API).

## Criterios de aceptación
[ ] `GET /api/cookies` sin sesión retorna 200 con las 6 galletas del catálogo.
[ ] Cada objeto tiene `id`, `slug`, `name_es`, `name_en`, `desc_es`, `desc_en`, `price`, `image`.
[ ] Los datos coinciden con el seed de la 004 (mismos slugs, precios, nombres).
[ ] La respuesta es un array JSON, nunca HTML.
[ ] Si la tabla está vacía, retorna `[]` (array vacío), nunca error.
