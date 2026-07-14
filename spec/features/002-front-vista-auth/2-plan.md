# Plan — 002 Vistas auth

## Archivos
- `login.html`, `registro.html`, `auth.js`.

## Layout
- Heredan el header y footer de `index.html`.
- Body min-h-screen con flex para centrar tarjeta.
- Tarjeta max-w-sm (420px), bg blanca, border-radius 1.5rem, sombra.

## Formularios
- `novalidate` desactivado: la validación JS gestiona los mensajes.
- En submit: preventDefault, validar, pintar errores, navegar si todo correcto.

## Lógica (auth.js)
- Registro: validar campos, comprobar email único en localStorage, guardar usuario, redirigir a login.
- Login: buscar usuario por email, comparar password, guardar sesión, redirigir.
- Session UI: al cargar index.html, comprobar sesión, mostrar/ocultar elementos.

## IDs estables
```
#form-login · #form-registre
#email · #password · #login-error
#registro-nombre · #registro-email · #registro-password · #registro-confirmar · #registro-error
#auth-link · #logout-item · #logout-link
```
