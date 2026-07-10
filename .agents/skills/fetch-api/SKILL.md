---
name: fetch-api
description: Bones pràctiques per consumir APIs HTTP amb fetch en JavaScript vanilla. Usa-la sempre que escriguis o modifiquis codi que faci crides de xarxa.
---
Regles per a qualsevol crida de xarxa:

- Sempre `async/await` amb `try/catch`. Mai cadenes `.then()`.
- Comprova `response.ok` abans de fer `.json()`; si no, llança un error amb l'status (`fetch` no falla sol amb un 404 o un 500).
- La UI sempre mostra un dels 3 estats: **carregant**, **error** o **dades**. Mai una pantalla muda si falla la xarxa.
- Input de l'usuari a la URL sempre amb `encodeURIComponent`.
- Mai API keys ni secrets al codi del navegador.
- Una funció = una responsabilitat: separa la funció que obté les dades de l'API de la que pinta el DOM.
- Missatges d'error en català i entenedors per a l'usuari, no el text tècnic de l'excepció.
