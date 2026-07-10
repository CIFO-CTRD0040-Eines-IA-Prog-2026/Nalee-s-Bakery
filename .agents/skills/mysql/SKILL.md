---
name: mysql
description: Coneixements de MySQL/InnoDB per al projecte NALEE's Bakery. Usa-la sempre que facis canvis a l'esquema, escriguis queries noves o dissenyis la base de dades.
---
Workflow per a qualsevol canvi a la base de dades:

## 1. Disseny de l'esquema

- **Convencions**: noms en snake_case, en plural (users, todos). PK: id. FK: taula_id (ex. user_id).
- **CREATE DATABASE** amb `CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`.
- **CREATE TABLE** amb `ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`.
- **PK**: `id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT`.
- **FK**: `CONSTRAINT fk_... FOREIGN KEY (...ref...) ON DELETE CASCADE ON UPDATE CASCADE`.
- **Created at**: `created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP`.
- **Strings**: VARCHAR amb longitud explícita, NOT NULL per defecte.
- **Booleans**: TINYINT(1) NOT NULL DEFAULT 0/1.
- **UNIQUE**: índex únic per a emails i identificadors lògics.

## 2. Indexació

- Les FK porten índex (InnoDB ho fa automàticament, però declara'l explícitament si el patró d'accés ho justifica).
- Evita índexs redundants (prefix compartit).
- Prefereix índexs compostos per queries amb múltiples filtres.

## 3. Transaccions i locks

- Operacions relacionades (INSERT + UPDATE o INSERT múltiple) dins d'una transacció explícita.
- Usa `START TRANSACTION` + `COMMIT` / `ROLLBACK`.

## 4. Operacions

- Els triggers i les operacions DDL (ALTER, DROP) es fan en transaccions separades.
- No esborris ni modifiquis dades en producció sense una còpia de seguretat.

## 5. Consultes

- Evita `SELECT *`. Especifica les columnes.
- Usa `EXPLAIN` per verificar l'ús d'índexs en queries noves.
- Paràmetres sempre amb placeholders (?) o prepared statements.

## Referències
- Consulta els fitxers de `.agents/skills/mysql/references/` per a temes concrets.
