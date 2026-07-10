---
name: loop-verificacio-front
description: Bucle de verificació d'una feature amb el navegador (MCP de Playwright) contra els criteris d'acceptació de la seva spec. Usa-la sempre que una tasca digui "verificació" o en acabar totes les tasques d'una feature.
---
El loop:

1. Llegeix els criteris d'acceptació del 1-spec.md de la feature activa.
2. Obre la pàgina amb el MCP de Playwright (el fitxer de public/ o la URL del servidor quan n'hi hagi).
3. Comprova els criteris un a un interactuant de veritat: escriu als camps, clica botons, mira el DOM i els estils resultants.
4. Si un criteri falla: arregla el codi i torna a comprovar aquell criteri (i els que el canvi pugui afectar).
5. Acaba quan tots els criteris passen. Si el mateix criteri falla després de 3 intents, atura't i explica què bloqueja: no segueixis iterant a cegues.

En acabar, reporta la checklist criteri per criteri amb 1i un comentari si cal. Si tot passa, marca la tasca de verificació com a feta.

Regles:
- Els criteris viuen a la spec: no te n'inventis, no en saltis, no els reinterpretis. Si un no es pot comprovar, digues-ho.
- Quan un criteri parli de responsive o de mòbil, comprova-ho amb el viewport a 375px (i a 1280px per a pantalla gran).
- No donis cap feature per tancada (ni marquis la tasca de verificació com a feta) amb un pendent.
