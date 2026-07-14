# Plan — 003 Interacciones

## Archivos JS
- `i18n.js`: internacionalización (leer, aplicar, toggle, dropdown).
- `auth.js`: registro, login, sesión, logout.
- `pedido.js`: gestión de cantidades, resumen, envío.
- `lang/translations.js`: diccionario ES/EN.

## Navegación
- `a[href^="#"]` → scrollIntoView smooth con offset del header.
- IntersectionObserver (opcional) para resaltar enlace activo.

## Selector de idioma (i18n.js)
- `applyTranslations(lang)`: recorre `[data-i18n]`, `[data-i18n-html]`, `[data-i18n-placeholder]`.
- `changeLang(lang)`: aplica y actualiza resumen.
- `initI18n()`: aplica idioma guardado, setup toggle + dropdown + click outside.

## Gestión de cantidades (pedido.js)
- Click delegado en `.galleta__btn--mas` / `.galleta__btn--menos`.
- `change` / `input` en `.galleta__cantidad`.
- `actualizarResumen()`: recorre inputs, calcula subtotales, muestra/oculta resumen.

## Envío
- Click en `#pedido-enviar`:
  - Comprobar sesión (`localStorage.getItem('session')`).
  - Si no → `window.location.href = 'login.html'`.
  - Si sí → alert de confirmación + reiniciar cantidades.

## Precios de referencia

| Galleta | Precio |
|---|---|
| Avena | 2.50 € |
| Chocolate Chips | 2.50 € |
| Red Velvet | 3.00 € |
| Mantequilla | 2.00 € |
| Jengibre | 2.50 € |
| Peanut Butter | 3.00 € |
