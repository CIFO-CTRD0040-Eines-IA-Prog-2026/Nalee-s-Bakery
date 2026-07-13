# 006 — API de autenticación (registro, login, sesión)

## Descripción
Tercer paso del BACKEND: sobre el servidor Express de la 005, añadir las rutas de autenticación contra la tabla `users` (004). Un usuario puede registrarse, iniciar sesión y cerrarla, y el servidor identifica cada petición vía una sesión con cookie.

## Contenido
- Registro: crea un usuario nuevo en `users` con la contraseña cifrada (hash con `bcrypt`, nunca en claro).
- Login: valida email + contraseña y abre sesión.
- Sesión: cookie httpOnly (paquete `express-session`), con el secreto en `.env`. El servidor recuerda al usuario entre peticiones.
- Logout: cierra la sesión.
- `GET /api/auth/me`: retorna el usuario de la sesión actual (o 401 si no la hay).
- Middleware `requiereSesion`: reutilizable para proteger rutas (007, 008).

## Contrato
`POST /api/auth/register` con `{ name, email, password }`
  → 201 `{ id, name, email }` y abre sesión.
  → 409 `{ error: "Este email ya está registrado" }` si el email existe.
  → 400 `{ error: "..." }` si falta algún campo o el formato es inválido.

`POST /api/auth/login` con `{ email, password }`
  → 200 `{ id, name, email }` y abre sesión.
  → 401 `{ error: "Email o contraseña incorrectos" }` (mismo mensaje para email inexistente y contraseña errónea).

`POST /api/auth/logout` → 200 `{ estado: "ok" }` y destruye la sesión.

`GET /api/auth/me` → 200 `{ id, name, email }` si hay sesión; 401 `{ error: "No autenticado" }` si no.

La contraseña (ni su hash) nunca sale en ninguna respuesta.

## Criterios de aceptación
[ ] `npm install` añade `bcrypt` y `express-session` sin errores.
[ ] `POST /api/auth/register` con datos nuevos crea la fila en `users`, retorna 201 y deja sesión abierta (`GET /api/auth/me` → 200).
[ ] En la BD, `users.password_hash` es un hash bcrypt, nunca la contraseña en claro.
[ ] Registrar dos veces el mismo email da 409 (no crea duplicado).
[ ] `POST /api/auth/login` con credenciales correctas da 200 y abre sesión; con email inexistente o contraseña errónea da 401 con el mismo mensaje.
[ ] `GET /api/auth/me` sin sesión da 401; después de login/register da 200 con `{ id, name, email }`.
[ ] `POST /api/auth/logout` cierra la sesión: la siguiente llamada a `GET /api/auth/me` da 401.
[ ] Ninguna respuesta incluye `password_hash` ni la contraseña. El `SESSION_SECRET` vive en `.env`, no en el código.
