# 003 — Interacciones

## Descripción
Define las interacciones de usuario en el frontend: navegación, selector de idioma, gestión de cantidades, resumen de pedido, envíos de formularios y estado de autenticación.

## Comportamiento

### 1. Navegación por secciones
- Enlaces del nav hacen scroll suave a la sección destino.
- Enlace "Iniciar sesión" va a `login.html`.
- "Cerrar sesión" cierra sesión y recarga.

### 2. Selector de idioma
- Click en `#lang-toggle` muestra/oculta `#lang-dropdown`.
- Click fuera cierra el dropdown.
- Seleccionar idioma traduce todos los elementos `data-i18n`, `data-i18n-html`, `data-i18n-placeholder`.
- El idioma se persiste en `localStorage`.
- Texto del toggle: "ES" / "EN".

### 3. Selección de cantidad de galletas
- `+`: incrementa cantidad (máximo 99).
- `-`: decrementa cantidad (mínimo 0).
- Input manual: valida rango 0-99 y corrige.
- Cada cambio actualiza el resumen del pedido.

### 4. Resumen del pedido
- Se muestra solo si alguna galleta tiene cantidad > 0.
- Muestra lista de ítems (nombre, cantidad, subtotal).
- Subtotal = suma de (cantidad × precio).
- Descuento: 10% si total de unidades > 10.
- Total = subtotal - descuento.
- Precios con 2 decimales y símbolo €.

### 5. Envío del pedido
- Sin sesión → redirigir a `login.html`.
- Con sesión → mostrar confirmación y reiniciar cantidades.

### 6. Formulario de contacto
- Validación HTML5 (required, type="email").
- Al submit: muestra confirmación y reinicia.

### 7. Newsletter
- Valida email y muestra agradecimiento.

### 8. Estado de autenticación
- Al cargar, comprueba `localStorage.getItem('session')`.
- Si hay sesión: oculta auth-link, muestra logout-item.
- Si no: muestra auth-link, oculta logout.

## Criterios de aceptación
[ ] Enlaces del nav hacen scroll suave.
[ ] Dropdown de idioma se abre/cierra y traduce la página.
[ ] Botones +/- incrementan/decrementan cantidad correctamente.
[ ] Resumen se muestra/oculta según cantidades.
[ ] Subtotal, descuento y total se calculan correctamente.
[ ] Enviar pedido sin sesión redirige a login.
[ ] Formulario de contacto muestra confirmación.
[ ] Estado de autenticación se refleja en el header.
