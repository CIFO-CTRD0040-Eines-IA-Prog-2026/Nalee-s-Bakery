---
name: estil-nalees
description: Paleta i to visual de NALEE's Bakery, amb els tokens de disseny (colors, tipografia, espaiat). Usa-la en qualsevol canvi d'estil o de disseny.
---
## Paleta de colors

| Token | Hex | Ús |
|---|---|---|
| marron-oscuro | #5c3d35 | títols, text principal, footer bg |
| marron-medio | #9a7a6a | detalls, vores |
| marron-claro | #d0b8a8 | fons de targetes, vores secundàries |
| crema | #faf6f0 | fons de pàgina, targetes |
| rosa-claro | #f7d4d0 | fons del header, hover suau |
| rosa | #e8a598 | botons, enllaços, accent principal |
| rosa-oscuro | #d48a7a | hover de botons i enllaços |
| blanco | #faf6f0 | alternativa al blanc pur |
| texto | #4a3030 | color base del text |
| texto-claro | #8a7060 | text secundari |

## Tipografia

| Element | Font | Pes |
|---|---|---|
| Títols (h1-h3) | `'Playfair Display', Georgia, serif` | 700 |
| Subtítols i cos | `'Source Sans 3', Arial, sans-serif` | 300, 400, 600 |
| Botons | `'Source Sans 3'` | 600 |

Importar al `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet">
```

## Variables CSS

```css
:root {
  --color-marron-oscuro: #5c3d35;
  --color-marron-medio: #9a7a6a;
  --color-marron-claro: #d0b8a8;
  --color-crema: #faf6f0;
  --color-rosa-claro: #f7d4d0;
  --color-rosa: #e8a598;
  --color-rosa-oscuro: #d48a7a;
  --color-blanco: #faf6f0;
  --color-texto: #4a3030;
  --color-texto-claro: #8a7060;
  --ff-headings: 'Playfair Display', Georgia, serif;
  --ff-body: 'Source Sans 3', Arial, sans-serif;
  --fw-regular: 400;
  --fw-bold: 700;
  --fs-h1: 4rem;
  --fs-h2: 2.5rem;
  --fs-h3: 1.4rem;
  --fs-body: 1rem;
  --fs-small: 0.9rem;
  --max-width: 1100px;
  --shadow: 0 4px 20px rgba(92, 61, 53, 0.1);
}
```

## Regles de disseny
- Header fix amb bg rosa-claro, logo amb Playfair Display, nav amb enllaços a texto-claro.
- Hero amb gradient (crema a marron-claro), títol gran amb Playfair Display, CTA amb bg rosa.
- Targetes de galetes amb bg crema, ombra suau, hover translateY(-6px).
- Botó principal: bg rosa, hover rosa-oscuro, border-radius 50px.
- Footer bg marron-oscuro amb text crema.
- Login/registre: targeta blanca centrada, inputs amb borde #e0d5c8, focus border rosa.
- Responsive: breakpoints a 768px (tablet) i 480px (mòbil).
- Animació fadeInUp en seccions en fer scroll.
