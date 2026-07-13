CREATE DATABASE IF NOT EXISTS nalees_bakery
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE nalees_bakery;

CREATE TABLE users (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name          VARCHAR(100)    NOT NULL,
  email         VARCHAR(255)    NOT NULL,
  password_hash VARCHAR(255)    NOT NULL,
  lang          VARCHAR(2)      NOT NULL DEFAULT 'es',
  created_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE cookies (
  id       BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug     VARCHAR(50)     NOT NULL,
  name_es  VARCHAR(100)    NOT NULL,
  name_en  VARCHAR(100)    NOT NULL,
  desc_es  VARCHAR(255)    NOT NULL,
  desc_en  VARCHAR(255)    NOT NULL,
  price    DECIMAL(5,2)    NOT NULL,
  image    VARCHAR(255)    NOT NULL,
  created_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_cookies_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE orders (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id    BIGINT UNSIGNED NOT NULL,
  subtotal   DECIMAL(7,2)    NOT NULL,
  discount   DECIMAL(7,2)    NOT NULL DEFAULT 0.00,
  total      DECIMAL(7,2)    NOT NULL,
  status     ENUM('pending','confirmed','shipped','cancelled') NOT NULL DEFAULT 'pending',
  created_at DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_orders_user_id (user_id),
  CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE order_lines (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_id   BIGINT UNSIGNED NOT NULL,
  cookie_id  BIGINT UNSIGNED NOT NULL,
  quantity   INT UNSIGNED    NOT NULL,
  unit_price DECIMAL(5,2)    NOT NULL,
  subtotal   DECIMAL(7,2)    NOT NULL,
  PRIMARY KEY (id),
  KEY idx_order_lines_order_id (order_id),
  KEY idx_order_lines_cookie_id (cookie_id),
  CONSTRAINT fk_order_lines_order FOREIGN KEY (order_id) REFERENCES orders (id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_order_lines_cookie FOREIGN KEY (cookie_id) REFERENCES cookies (id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
