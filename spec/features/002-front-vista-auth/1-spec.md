# 002 — Login y registro (con validación)

## Descripción
Permite al usuario registrarse, iniciar sesión y cerrar sesión para acceder a la gestión de pedidos.

## Páginas
- `login.html`: tarjeta centrada con título "Iniciar sesión", icono de galleta, email, contraseña, botón "Entrar" y enlace a registro.
- `registro.html`: tarjeta centrada con icono de cocinero, nombre, email, contraseña, confirmar contraseña, botón "Crear cuenta" y enlace a login.
- Header con navegación reducida (Galletas, Galería, Sobre Nosotros, Contacto).

## Validación al enviar
- Campos vacíos → "Todos los campos son obligatorios"
- Email mal formato → controlado por `type="email"` HTML5
- Contraseña < 4 caracteres → "La contraseña debe tener al menos 4 caracteres"
- Contraseñas no coinciden → "Las contraseñas no coinciden"
- Email ya registrado → "Ya existe una cuenta con ese email"
- Credenciales incorrectas → "Email o contraseña incorrectos"

## Comportamiento esperado
1. El usuario accede a `login.html` desde el header
2. Introduce credenciales y envía
3. Si son correctas → redirigir a `index.html` con sesión iniciada
4. Si son incorrectas → mostrar error
5. Puede registrarse desde `registro.html`
6. Al iniciar sesión, el header cambia: "Iniciar sesión" → email del usuario + "Cerrar sesión"
7. El estado de sesión se guarda en `localStorage`

## Criterios de aceptación
[ ] Las dos páginas comparten estilo (tokens) y se enlazan entre ellas.
[ ] Enviar todo vacío muestra mensaje de error y no navega.
[ ] Contraseñas diferentes en el registro → mensaje de error.
[ ] Login válido lleva a `index.html`; registro válido, a `login.html`.
[ ] Tarjeta centrada y legible a 375px y a 1280px.
