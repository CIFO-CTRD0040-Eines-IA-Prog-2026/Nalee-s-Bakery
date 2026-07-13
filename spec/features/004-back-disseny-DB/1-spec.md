# 004 — Disseny de base de dades

## Descripció

Disseny i creació de l'esquema de base de dades per a NALEE's Bakery: emmagatzemar usuaris, productes (galletes) i comandes amb les seves línies.

## Taules

### `users`

| Columna | Tipus | Restriccions |
|---|---|---|
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT |
| name | VARCHAR(100) | NOT NULL |
| email | VARCHAR(255) | NOT NULL, UNIQUE |
| password_hash | VARCHAR(255) | NOT NULL |
| lang | VARCHAR(2) | NOT NULL, DEFAULT 'es' |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP |

### `cookies`

| Columna | Tipus | Restriccions |
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

| Columna | Tipus | Restriccions |
|---|---|---|
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT |
| user_id | BIGINT UNSIGNED | NOT NULL, FK → users(id) |
| subtotal | DECIMAL(7,2) | NOT NULL |
| discount | DECIMAL(7,2) | NOT NULL, DEFAULT 0.00 |
| total | DECIMAL(7,2) | NOT NULL |
| status | ENUM('pending','confirmed','shipped','cancelled') | NOT NULL, DEFAULT 'pending' |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP |

### `order_lines`

| Columna | Tipus | Restriccions |
|---|---|---|
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT |
| order_id | BIGINT UNSIGNED | NOT NULL, FK → orders(id) ON DELETE CASCADE |
| cookie_id | BIGINT UNSIGNED | NOT NULL, FK → cookies(id) |
| quantity | INT UNSIGNED | NOT NULL |
| unit_price | DECIMAL(5,2) | NOT NULL |
| subtotal | DECIMAL(7,2) | NOT NULL |

## Relacions

- `orders.user_id` → `users.id` (1 usuari N comandes)
- `order_lines.order_id` → `orders.id` (1 comanda N línies, CASCADE)
- `order_lines.cookie_id` → `cookies.id` (1 galleta apareix a N línies)

## Catàleg de galletes (dades inicials)

| slug | name_es | name_en | desc_es | desc_en | price | image |
|---|---|---|---|---|---|---|
| avena | Avena | Oatmeal | Galleta de avena con pasas y un toque de canela | Oatmeal cookie with raisins and a hint of cinnamon | 2.50 | avena.jpg |
| chocolate-chips | Chocolate Chips | Chocolate Chips | Galleta clásica con pepitas de chocolate | Classic cookie with chocolate chunks | 2.50 | chocolate-chips.jpg |
| red-velvet | Red Velvet | Red Velvet | Galleta suave de cacao con cobertura de queso | Soft cocoa cookie with cream cheese topping | 3.00 | red-velvet.jpg |
| mantequilla | Mantequilla | Butter | Galleta de mantequilla tradicional, crujiente y suave | Traditional butter cookie, crispy and soft | 2.00 | mantequilla.jpg |
| jengibre | Jengibre | Ginger | Galleta especiada de jengibre con un toque de canela | Spiced ginger cookie with a touch of cinnamon | 2.50 | jengibre.jpg |
| peanut-butter | Peanut Butter | Peanut Butter | Galleta cremosa de cacahuete | Creamy peanut butter cookie | 3.00 | peanut-butter.jpg |

## Criteris d'acceptació

- [ ] L'esquema de base de dades es crea automàticament en arrencar el servidor (`db/connection.js`).
- [ ] Les 4 taules es creen amb SQLite (INTEGER PRIMARY KEY AUTOINCREMENT, TEXT, REAL).
- [ ] Les FK estan definides amb CASCADE a order_lines.
- [ ] El seed de 6 galletes s'insereix automàticament si la taula està buida.
- [ ] S'ha afegit la secció "Backend" al fitxer de tech-stack de la constitució (Node.js + Express + SQLite).
