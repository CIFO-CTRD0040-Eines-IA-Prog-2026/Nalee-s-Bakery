# 002 — Login i registre (amb validació)

## Descripció
Permet a l'usuari registrar-se, iniciar sessió i tancar sessió per accedir a la gestió de comandes.

## Pàgines
- `login.html`: targeta centrada amb títol "Iniciar sesión", icona de galeta, email, contrasenya, botó "Entrar" i enllaç a registre.
- `registro.html`: targeta centrada amb icona de cuiner, nom, email, contrasenya, confirmar contrasenya, botó "Crear cuenta" i enllaç a login.
- Header amb navegació reduïda (Galletas, Galería, Sobre Nosotros, Contacto).

## Validació en enviar
- Camps buits → "Todos los campos son obligatorios"
- Email mal format → controlat per `type="email"` HTML5
- Contrasenya < 4 caràcters → "La contraseña debe tener al menos 4 caracteres"
- Contrasenyes no coincideixen → "Las contraseñas no coinciden"
- Email ja registrat → "Ya existe una cuenta con ese email"
- Credencials incorrectes → "Email o contraseña incorrectos"

## Comportament esperat
1. L'usuari accedeix a `login.html` des del header
2. Introdueix credencials i envia
3. Si són correctes → redirigir a `index.html` amb sessió iniciada
4. Si són incorrectes → mostrar error
5. Pot registrar-se des de `registro.html`
6. En loguejar-se, el header canvia: "Iniciar sesión" → email de l'usuari + "Cerrar sesión"
7. L'estat de sessió es guarda a `localStorage`

## Criteris d'acceptació
[ ] Les dues pàgines comparteixen estil (tokens) i s'enllacen entre elles.
[ ] Enviar-ho tot buit mostra missatge d'error i no navega.
[ ] Contrasenyes diferents al registre → missatge d'error.
[ ] Login vàlid porta a `index.html`; registre vàlid, a `login.html`.
[ ] Targeta centrada i llegible a 375px i a 1280px.
