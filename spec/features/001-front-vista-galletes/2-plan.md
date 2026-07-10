# Pla — 001 Vista de galletes

## Fitxers
- `index.html`: estructura completa de la landing page.
- `style.css`: estils globals seguint la skill estil-nalees.

## Estructura HTML
- Header fix amb logo, nav, selector d'idioma i botó de login.
- Hero amb fons gradient, títol, subtítol i CTA.
- Galletas: grid de 6 targetes amb imatge (background), nom, descripció i selector quantitat.
- Galeria: grid d'imatges 4 columnes (1 destacada span 2).
- Nosotros: 2 columnes (text + imatge).
- Testimonis: 3 targetes amb avatar, text, nom i rol.
- Ubicació: 2 columnes (info + mapa placeholder).
- Contacte: formulari centrat.
- Footer: 4 columnes (logo, enllaços, xarxes, newsletter).

## Selectors DOM estables
```
#galletas · .galleta[data-sabor][data-precio]
#pedido-resumen · #pedido-lista · #pedido-subtotal · #pedido-descuento · #pedido-total · #pedido-enviar
.galleta__btn--mas · .galleta__btn--menos · .galleta__cantidad
#auth-link · #logout-item · #logout-link
#lang-toggle · #lang-dropdown · .lang-option[data-lang]
.contacto__form · .footer__newsletter
```

## Imatges
- `images/Galletas/avena.jpg`, `chocolate-chips.jpg`, `red-velvet.jpg`, etc.
- `images/Avatares/Ana-Martinez.avif`, etc.
- `images/Nosotros/Nalee.jpg`
