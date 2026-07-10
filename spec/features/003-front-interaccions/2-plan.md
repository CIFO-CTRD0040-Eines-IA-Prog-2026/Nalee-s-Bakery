# Pla — 003 Interaccions

## Fitxers JS
- `i18n.js`: internacionalització (llegir, aplicar, toggle, dropdown).
- `auth.js`: registre, login, sessió, logout.
- `pedido.js`: gestió de quantitats, resum, enviament.
- `lang/translations.js`: diccionari ES/EN.

## Navegació
- `a[href^="#"]` → scrollIntoView smooth amb offset del header.
- IntersectionObserver (opcional) per ressaltar enllaç actiu.

## Selector d'idioma (i18n.js)
- `applyTranslations(lang)`: recorre `[data-i18n]`, `[data-i18n-html]`, `[data-i18n-placeholder]`.
- `changeLang(lang)`: aplica i actualitza resum.
- `initI18n()`: aplica idioma guardat, setup toggle + dropdown + click outside.

## Gestió de quantitats (pedido.js)
- Click delegat a `.galleta__btn--mas` / `.galleta__btn--menos`.
- `change` / `input` a `.galleta__cantidad`.
- `actualizarResumen()`: recorre inputs, calcula subtotals, mostra/amaga resum.

## Enviament
- Click a `#pedido-enviar`:
  - Comprovar sessió (`localStorage.getItem('session')`).
  - Si no → `window.location.href = 'login.html'`.
  - Si sí → alert de confirmació + reiniciar cantitats.

## Preus de referència

| Galleta | Preu |
|---|---|
| Avena | 2.50 € |
| Chocolate Chips | 2.50 € |
| Red Velvet | 3.00 € |
| Mantequilla | 2.00 € |
| Jengibre | 2.50 € |
| Peanut Butter | 3.00 € |
