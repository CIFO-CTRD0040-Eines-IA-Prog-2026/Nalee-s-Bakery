---
name: estil-nalees
description: Paleta y tono visual de NALEE's Bakery, con los tokens de diseño (colores, tipografía, espaciado). Úsala en cualquier cambio de estilo o de diseño.
---

## Paleta de colores

| Token | Hex | Uso |
|---|---|---|
| marron-oscuro | #5c3d35 | títulos, texto principal, footer bg |
| marron-medio | #9a7a6a | detalles, bordes |
| marron-claro | #d0b8a8 | fondo de tarjetas, bordes secundarios |
| crema | #faf6f0 | fondo de página, tarjetas |
| rosa-claro | #f7d4d0 | fondo del header, hover suave |
| rosa | #e8a598 | botones, enlaces, acento principal |
| rosa-oscuro | #d48a7a | hover de botones y enlaces |
| blanco | #faf6f0 | alternativa al blanco puro |
| texto | #4a3030 | color base del texto |
| texto-claro | #8a7060 | texto secundario |

## Tipografía

| Elemento | Fuente | Peso |
|---|---|---|
| Títulos (h1-h3) | `'Playfair Display', Georgia, serif` | 700 |
| Subtítulos y cuerpo | `'Source Sans 3', Arial, sans-serif` | 300, 400, 600 |
| Botones | `'Source Sans 3'` | 600 |

Importar en el `<head>`:
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

## Reglas de diseño
- Header fijo con bg rosa-claro, logo con Playfair Display, nav con enlaces a texto-claro.
- Hero con gradiente (crema a marron-claro), título grande con Playfair Display, CTA con bg rosa.
- Tarjetas de galletas con bg crema, sombra suave, hover translateY(-6px).
- Botón principal: bg rosa, hover rosa-oscuro, border-radius 50px.
- Footer bg marron-oscuro con texto crema.
- Login/registro: tarjeta blanca centrada, inputs con borde #e0d5c8, focus border rosa.
- Responsive: breakpoints a 768px (tablet) y 480px (móvil).
- Animación fadeInUp en secciones al hacer scroll.
