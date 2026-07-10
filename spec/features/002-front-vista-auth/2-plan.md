# Pla — 002 Vistes auth

## Fitxers
- `login.html`, `registro.html`, `auth.js`.

## Layout
- Hereten el header i footer de `index.html`.
- Body min-h-screen amb flex per centrar targeta.
- Targeta max-w-sm (420px), bg blanca, border-radius 1.5rem, ombra.

## Formularis
- `novalidate` desactivat: la validació JS gestiona els missatges.
- En submit: preventDefault, validar, pintar errors, navegar si tot correcte.

## Lògica (auth.js)
- Registre: validar camps, comprovar email únic a localStorage, guardar usuari, redirigir a login.
- Login: buscar usuari per email, comparar password, guardar sessió, redirigir.
- Session UI: en carregar index.html, comprovar sessió, mostrar/ocultar elements.

## IDs estables
```
#form-login · #form-registre
#email · #password · #login-error
#registro-nombre · #registro-email · #registro-password · #registro-confirmar · #registro-error
#auth-link · #logout-item · #logout-link
```
