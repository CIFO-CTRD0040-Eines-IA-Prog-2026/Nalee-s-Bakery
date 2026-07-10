# 003 — Interaccions

## Descripció
Defineix les interaccions d'usuari al frontend: navegació, selector d'idioma, gestió de quantitats, resum de comanda, enviaments de formularis i estat d'autenticació.

## Comportament

### 1. Navegació per seccions
- Enllaços del nav fan scroll suau a la secció destí.
- Enllaç "Iniciar sesión" va a `login.html`.
- "Cerrar sesión" tanca sessió i recarrega.

### 2. Selector d'idioma
- Click a `#lang-toggle` mostra/amaga `#lang-dropdown`.
- Click fora tanca el dropdown.
- Seleccionar idioma tradueix tots els elements `data-i18n`, `data-i18n-html`, `data-i18n-placeholder`.
- L'idioma es persisteix a `localStorage`.
- Text del toggle: "ES" / "EN".

### 3. Selecció de quantitat de galletes
- `+`: incrementa quantitat (màxim 99).
- `-`: decrementa quantitat (mínim 0).
- Input manual: valida rang 0-99 i corregeix.
- Cada canvi actualitza el resum de la comanda.

### 4. Resum de la comanda
- Es mostra només si alguna galleta té quantitat > 0.
- Mostra llista d'ítems (nom, quantitat, subtotal).
- Subtotal = suma de (quantitat × preu).
- Descompte: 10% si total d'unitats > 10.
- Total = subtotal - descompte.
- Preus amb 2 decimals i símbol €.

### 5. Enviament de la comanda
- Sense sessió → redirigir a `login.html`.
- Amb sessió → mostrar confirmació i reiniciar cantitats.

### 6. Formulari de contacte
- Validació HTML5 (required, type="email").
- En submit: mostra confirmació i reinicia.

### 7. Newsletter
- Valida email i mostra agraïment.

### 8. Estat d'autenticació
- Al carregar, comprova `localStorage.getItem('session')`.
- Si hi ha sessió: amaga auth-link, mostra logout-item.
- Si no: mostra auth-link, amaga logout.

## Criteris d'acceptació
[ ] Enllaços del nav fan scroll suau.
[ ] Dropdown d'idioma s'obre/tanca i tradueix la pàgina.
[ ] Botons +/- incrementen/decrementen quantitat correctament.
[ ] Resum es mostra/amaga segons quantitats.
[ ] Subtotal, descompte i total es calculen correctament.
[ ] Enviar comanda sense sessió redirigeix a login.
[ ] Formulari de contacte mostra confirmació.
[ ] Estat d'autenticació es reflecteix al header.
