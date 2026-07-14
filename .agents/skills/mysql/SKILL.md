---
name: mysql
description: Conocimientos de MySQL/InnoDB para el proyecto NALEE's Bakery. Úsala siempre que hagas cambios en el esquema, escribas queries nuevas o diseñes la base de datos.
---

Workflow para cualquier cambio en la base de datos:

## 1. Diseño del esquema

- **Convenciones**: nombres en snake_case, en plural (users, todos). PK: id. FK: tabla_id (ej. user_id).
- **CREATE DATABASE** con `CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`.
- **CREATE TABLE** con `ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`.
- **PK**: `id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT`.
- **FK**: `CONSTRAINT fk_... FOREIGN KEY (...ref...) ON DELETE CASCADE ON UPDATE CASCADE`.
- **Created at**: `created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP`.
- **Strings**: VARCHAR con longitud explícita, NOT NULL por defecto.
- **Booleans**: TINYINT(1) NOT NULL DEFAULT 0/1.
- **UNIQUE**: índice único para emails e identificadores lógicos.

## 2. Indexación

- Las FK llevan índice (InnoDB lo hace automáticamente, pero decláralo explícitamente si el patrón de acceso lo justifica).
- Evita índices redundantes (prefijo compartido).
- Prefiere índices compuestos para queries con múltiples filtros.

## 3. Transacciones y locks

- Operaciones relacionadas (INSERT + UPDATE o INSERT múltiple) dentro de una transacción explícita.
- Usa `START TRANSACTION` + `COMMIT` / `ROLLBACK`.

## 4. Operaciones

- Los triggers y las operaciones DDL (ALTER, DROP) se hacen en transacciones separadas.
- No borres ni modifiques datos en producción sin una copia de seguridad.

## 5. Consultas

- Evita `SELECT *`. Especifica las columnas.
- Usa `EXPLAIN` para verificar el uso de índices en queries nuevas.
- Parámetros siempre con placeholders (?) o prepared statements.

## Referencias
- Consulta los archivos de `.agents/skills/mysql/references/` para temas concretos.
