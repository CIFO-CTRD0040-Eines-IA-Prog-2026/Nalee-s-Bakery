USE nalees_bakery;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE order_lines;
TRUNCATE TABLE orders;
TRUNCATE TABLE cookies;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO cookies (slug, name_es, name_en, desc_es, desc_en, price, image) VALUES
  ('avena',            'Avena',          'Oatmeal',       'Galleta de avena con pasas y un toque de canela',            'Oatmeal cookie with raisins and a hint of cinnamon',            2.50, 'avena.jpg'),
  ('chocolate-chips',  'Chocolate Chips', 'Chocolate Chips', 'Galleta clásica con pepitas de chocolate',                 'Classic cookie with chocolate chunks',                         2.50, 'chocolate-chips.jpg'),
  ('red-velvet',       'Red Velvet',     'Red Velvet',    'Galleta suave de cacao con cobertura de queso',             'Soft cocoa cookie with cream cheese topping',                   3.00, 'red-velvet.jpg'),
  ('mantequilla',      'Mantequilla',    'Butter',        'Galleta de mantequilla tradicional, crujiente y suave',     'Traditional butter cookie, crispy and soft',                    2.00, 'mantequilla.jpg'),
  ('jengibre',         'Jengibre',       'Ginger',        'Galleta especiada de jengibre con un toque de canela',      'Spiced ginger cookie with a touch of cinnamon',                 2.50, 'jengibre.jpg'),
  ('peanut-butter',    'Peanut Butter',  'Peanut Butter', 'Galleta cremosa de cacahuete',    'Creamy peanut butter cookie',             3.00, 'peanut-butter.jpg');
