---
name: fetch-api
description: Buenas prácticas para consumir APIs HTTP con fetch en JavaScript vanilla. Úsala siempre que escribas o modifiques código que haga llamadas de red.
---

Reglas para cualquier llamada de red:

- Siempre `async/await` con `try/catch`. Nunca cadenas `.then()`.
- Comprueba `response.ok` antes de hacer `.json()`; si no, lanza un error con el status (`fetch` no falla solo con un 404 o un 500).
- La UI siempre muestra uno de los 3 estados: **cargando**, **error** o **datos**. Nunca una pantalla muda si falla la red.
- Input del usuario en la URL siempre con `encodeURIComponent`.
- Nunca API keys ni secrets en el código del navegador.
- Una función = una responsabilidad: separa la función que obtiene los datos de la API de la que pinta el DOM.
- Mensajes de error en español y entendibles para el usuario, no el texto técnico de la excepción.
