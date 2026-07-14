# Plan — 001 Vista de galletas

## Archivos
- `index.html`: estructura completa de la landing page.
- `style.css`: estilos globales siguiendo la skill estil-nalees.

## Estructura HTML
- Header fijo con logo, nav, selector de idioma y botón de login.
- Hero con fondo gradient, título, subtítulo y CTA.
- Galletas: grid de 6 tarjetas con imagen (background), nombre, descripción y selector cantidad.
- Galería: grid de imágenes 4 columnas (1 destacada span 2).
- Nosotros: 2 columnas (texto + imagen).
- Testimonios: 3 tarjetas con avatar, texto, nombre y rol.
- Ubicación: 2 columnas (info + mapa placeholder).
- Contacto: formulario centrado.
- Footer: 4 columnas (logo, enlaces, redes, newsletter).

## Selectores DOM estables
```
#galletas · .galleta[data-sabor][data-precio]
#pedido-resumen · #pedido-lista · #pedido-subtotal · #pedido-descuento · #pedido-total · #pedido-enviar
.galleta__btn--mas · .galleta__btn--menos · .galleta__cantidad
#auth-link · #logout-item · #logout-link
#lang-toggle · #lang-dropdown · .lang-option[data-lang]
.contacto__form · .footer__newsletter
```

## Imágenes
- `images/Galletas/avena.jpg`, `chocolate-chips.jpg`, `red-velvet.jpg`, etc.
- `images/Avatares/Ana-Martinez.avif`, etc.
- `images/Nosotros/Nalee.jpg`
