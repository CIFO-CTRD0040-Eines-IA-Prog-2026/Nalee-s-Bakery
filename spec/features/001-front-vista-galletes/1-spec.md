# 001 — Vista de galletes (catàleg de productes)

## Descripció
Pantalla principal on l'usuari pot veure el catàleg de galletes artesanes, seleccionar quantitats i gestionar la seva comanda abans d'enviar-la.

## Contingut
- Capçalera: logo "NALEE's Bakery", nav amb enllaços a seccions, selector d'idioma, enllaç d'inici de sessió.
- Hero: títol "Galletas artesanas con amor", subtítol, CTA "Descubre nuestras galletas".
- Secció `#galletas`:
  - Títol "Nuestras Galletas"
  - Graella de 6 targetes de galletes, cadascuna amb:
    - Imatge de la galleta (background-image)
    - Nom (Playfair Display)
    - Descripció curta
    - Selector de quantitat (botons - / + , input numèric)
- Secció `#pedido-resumen`: oculta per defecte, es mostra en seleccionar quantitats.
- Galeria, Sobre Nosotros, Testimonis, Ubicació, Contacte, Footer.

## Catàleg de galletes

| Classe CSS | Nom | Descripció | Preu |
|---|---|---|---|
| `galleta__img--avena` | Avena | Galleta de avena con pasas y un toque de canela | 2.50 € |
| `galleta__img--chocolate-chips` | Chocolate Chips | Galleta clásica con pepitas de chocolate | 2.50 € |
| `galleta__img--red-velvet` | Red Velvet | Galleta suave de cacao con cobertura de queso | 3.00 € |
| `galleta__img--mantequilla` | Mantequilla | Galleta de mantequilla tradicional, crujiente y suave | 2.00 € |
| `galleta__img--jengibre` | Jengibre | Galleta especiada de jengibre con un toque de canela | 2.50 € |
| `galleta__img--peanut-butter` | Peanut Butter | Galleta cremosa de cacahuete con pepitas de chocolate | 3.00 € |

## Comportament esperat
1. L'usuari veu el catàleg complet
2. Pot seleccionar quantitat per a cada galleta
3. Es mostra un resum de la comanda amb preu total en temps real
4. Pot enviar la comanda (autenticació requerida)
5. Si no ha iniciat sessió, es redirigeix a `login.html`

## Criteris d'acceptació
[ ] Es veuen l'hero, el catàleg de 6 galletes i el resum ocult.
[ ] Cada targeta té imatge, nom, descripció i selector de quantitat.
[ ] Només colors dels tokens de la skill estil-nalees.
[ ] Bé a 375px i a 1280px, sense scroll horitzontal.
[ ] aria-label als botons i focus visible.
