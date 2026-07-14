# 001 — Vista de galletas (catálogo de productos)

## Descripción
Pantalla principal donde el usuario puede ver el catálogo de galletas artesanas, seleccionar cantidades y gestionar su pedido antes de enviarlo.

## Contenido
- Cabecera: logo "NALEE's Bakery", nav con enlaces a secciones, selector de idioma, enlace de inicio de sesión.
- Hero: título "Galletas artesanas con amor", subtítulo, CTA "Descubre nuestras galletas".
- Sección `#galletas`:
  - Título "Nuestras Galletas"
  - Cuadrícula de 6 tarjetas de galletas, cada una con:
    - Imagen de la galleta (background-image)
    - Nombre (Playfair Display)
    - Descripción corta
    - Selector de cantidad (botones - / + , input numérico)
- Sección `#pedido-resumen`: oculta por defecto, se muestra al seleccionar cantidades.
- Galería, Sobre Nosotros, Testimonios, Ubicación, Contacto, Footer.

## Catálogo de galletas

| Clase CSS | Nombre | Descripción | Precio |
|---|---|---|---|
| `galleta__img--avena` | Avena | Galleta de avena con pasas y un toque de canela | 2.50 € |
| `galleta__img--chocolate-chips` | Chocolate Chips | Galleta clásica con pepitas de chocolate | 2.50 € |
| `galleta__img--red-velvet` | Red Velvet | Galleta suave de cacao con cobertura de queso | 3.00 € |
| `galleta__img--mantequilla` | Mantequilla | Galleta de mantequilla tradicional, crujiente y suave | 2.00 € |
| `galleta__img--jengibre` | Jengibre | Galleta especiada de jengibre con un toque de canela | 2.50 € |
| `galleta__img--peanut-butter` | Peanut Butter | Galleta cremosa de cacahuete | 3.00 € |

## Comportamiento esperado
1. El usuario ve el catálogo completo
2. Puede seleccionar cantidad para cada galleta
3. Se muestra un resumen del pedido con precio total en tiempo real
4. Puede enviar el pedido (autenticación requerida)
5. Si no ha iniciado sesión, se redirige a `login.html`

## Criterios de aceptación
[ ] Se ven el hero, el catálogo de 6 galletas y el resumen oculto.
[ ] Cada tarjeta tiene imagen, nombre, descripción y selector de cantidad.
[ ] Solo colores de los tokens de la skill estil-nalees.
[ ] Bien a 375px y a 1280px, sin scroll horizontal.
[ ] aria-label en los botones y focus visible.
