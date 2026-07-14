---
name: documentar-conceptes
description: Documenta los conceptos de programación que van surgiendo, de cualquier lenguaje o tecnología. Úsala siempre que aparezca un concepto nuevo (etiqueta, propiedad, función, comando, término técnico…) mientras se trabaja.
---

Mantén un glosario en `docs/programming-concepts.md` que se va llenando a medida que avanza el proyecto. Si el archivo o la carpeta `docs/` no existen, créalos.

Cuando en el código o en la conversación aparezca un concepto nuevo de **cualquier lenguaje o tecnología** (HTML, CSS, JavaScript, SQL, Node, Express, comandos de terminal, Git, conceptos generales de programación…), agrégalo al archivo si aún no está.

Formato de cada entrada:

```
## <nombre del concepto>
**Definición:** una frase corta y clara.
**Explicación:** para qué sirve y cuándo se usa, en 1–3 frases.
**Ejemplo:**
​```
<!-- código mínimo, en el lenguaje que corresponda -->
​```
```

Reglas:
- En español, tono sobrio y comprensible (nivel principiante).
- No dupliques: si el concepto ya existe, no lo vuelvas a añadir.
- Agrupa por tecnología con un encabezado de sección (`# HTML`, `# CSS`, `# JavaScript`, `# SQL`, `# Express`…) y ordena las entradas dentro de cada grupo.
- El ejemplo debe ser mínimo y real, relacionado con el proyecto cuando se pueda.
