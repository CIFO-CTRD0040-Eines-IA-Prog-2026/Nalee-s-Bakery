---
name: documentar-conceptes
description: Documenta els conceptes de programació que van sortint, de qualsevol llenguatge o tecnologia. Usa-la sempre que aparegui un concepte nou (etiqueta, propietat, funció, comanda, terme tècnic…) mentre es treballa.
---
Mantén un glossari a `docs/programming-concepts.md` que es va omplint a mesura que avança el projecte. Si el fitxer o la carpeta `docs/` no existeixen, crea'ls.

Quan al codi o a la conversa aparegui un concepte nou de **qualsevol llenguatge o tecnologia** (HTML, CSS, JavaScript, SQL, Node, Express, comandes de terminal, Git, conceptes generals de programació…), afegeix-lo al fitxer si encara no hi és.

Format de cada entrada:

```
## <nom del concepte>
**Definició:** una frase curta i clara.
**Explicació:** per a què serveix i quan s'usa, en 1–3 frases.
**Exemple:**
​```
<!-- codi mínim, en el llenguatge que correspongui -->
​```
```

Regles:
- En català, to sobri i entenedor (nivell principiant).
- No dupliquis: si el concepte ja existeix, no el tornis a afegir.
- Agrupa per tecnologia amb un encapçalament de secció (`# HTML`, `# CSS`, `# JavaScript`, `# SQL`, `# Express`…) i ordena les entrades dins de cada grup.
- L'exemple ha de ser mínim i real, relacionat amb el projecte quan es pugui.
