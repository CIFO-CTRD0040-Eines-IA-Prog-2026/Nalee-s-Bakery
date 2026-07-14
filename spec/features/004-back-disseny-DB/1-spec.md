# 004 — Diseño de base de datos

## Descripción

Diseño y creación del esquema de base de datos para NALEE's Bakery: almacenar usuarios, productos (galletas) y pedidos con sus líneas.

## Tablas

### `users`

| Columna | Tipo | Restricciones |
|---|---|---|
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT |
| name | VARCHAR(100) | NOT NULL |
| email | VARCHAR(255) | NOT NULL, UNIQUE |
| password_hash | VARCHAR(255) | NOT NULL |
| lang | VARCHAR(2) | NOT NULL, DEFAULT 'es' |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP |

### `cookies`

| Columna | Tipo | Restricciones |
|---|---|---|
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT |
| slug | VARCHAR(50) | NOT NULL, UNIQUE |
| name_es | VARCHAR(100) | NOT NULL |
| name_en | VARCHAR(100) | NOT NULL |
| desc_es | VARCHAR(255) | NOT NULL |
| desc_en | VARCHAR(255) | NOT NULL |
| price | DECIMAL(5,2) | NOT NULL |
| image | VARCHAR(255) | NOT NULL |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP |

### `orders`

| Columna | Tipo | Restricciones |
|---|---|---|
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT |
| user_id | BIGINT UNSIGNED | NOT NULL, FK → users(id) |
| subtotal | DECIMAL(7,2) | NOT NULL |
| discount | DECIMAL(7,2) | NOT NULL, DEFAULT 0.00 |
| total | DECIMAL(7,2) | NOT NULL |
| status | ENUM('pending','confirmed','shipped','cancelled') | NOT NULL, DEFAULT 'pending' |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP |

### `order_lines`

| Columna | Tipo | Restricciones |
|---|---|---|
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT |
| order_id | BIGINT UNSIGNED | NOT NULL, FK → orders(id) ON DELETE CASCADE |
| cookie_id | BIGINT UNSIGNED | NOT NULL, FK → cookies(id) |
| quantity | INT UNSIGNED | NOT NULL |
| unit_price | DECIMAL(5,2) | NOT NULL |
| subtotal | DECIMAL(7,2) | NOT NULL |

## Relaciones

- `orders.user_id` → `users.id` (1 usuario N pedidos)
- `order_lines.order_id` → `orders.id` (1 pedido N líneas, CASCADE)
- `order_lines.cookie_id` → `cookies.id` (1 galleta aparece en N líneas)

## Catálogo de galletas (datos iniciales)

| slug | name_es | name_en | desc_es | desc_en | price | image |
|---|---|---|---|---|---|---|
| avena | Avena | Oatmeal | Galleta de avena con pasas y un toque de canela | Oatmeal cookie with raisins and a hint of cinnamon | 2.50 | avena.jpg |
| chocolate-chips | Chocolate Chips | Chocolate Chips | Galleta clásica con pepitas de chocolate | Classic cookie with chocolate chunks | 2.50 | chocolate-chips.jpg |
| red-velvet | Red Velvet | Red Velvet | Galleta suave de cacao con cobertura de queso | Soft cocoa cookie with cream cheese topping | 3.00 | red-velvet.jpg |
| mantequilla | Mantequilla | Butter | Galleta de mantequilla tradicional, crujiente y suave | Traditional butter cookie, crispy and soft | 2.00 | mantequilla.jpg |
| jengibre | Jengibre | Ginger | Galleta especiada de jengibre con un toque de canela | Spiced ginger cookie with a touch of cinnamon | 2.50 | jengibre.jpg |
| peanut-butter | Peanut Butter | Peanut Butter | Galleta cremosa de cacahuete | Creamy peanut butter cookie | 3.00 | peanut-butter.jpg |

## Criterios de aceptación

- [ ] El esquema de base de datos se crea automáticamente al arrancar el servidor (`db/connection.js`).
- [ ] Las 4 tablas se crean con SQLite (INTEGER PRIMARY KEY AUTOINCREMENT, TEXT, REAL).
- [ ] Las FK están definidas con CASCADE en order_lines.
- [ ] El seed de 6 galletas se inserta automáticamente si la tabla está vacía.
- [ ] Se ha añadido la sección "Backend" al archivo de tech-stack de la constitución (Node.js + Express + SQLite).
