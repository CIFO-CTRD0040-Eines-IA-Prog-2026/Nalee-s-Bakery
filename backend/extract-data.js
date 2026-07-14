require('dotenv').config();
const pool = require('./db/connection');

(async () => {
  const [users] = await pool.query(`
    SELECT u.id, u.name, u.email, u.created_at,
           COUNT(o.id) AS total_pedidos,
           COALESCE(SUM(o.total), 0) AS gasto_total
    FROM users u
    LEFT JOIN orders o ON o.user_id = u.id
    GROUP BY u.id
    ORDER BY u.id
  `);

  console.log('=== CLIENTES ===');
  console.log('ID | Nombre | Email | Pedidos | Gasto Total | Registro');
  console.log('-'.repeat(90));
  users.forEach(u => {
    console.log(u.id + ' | ' + u.name + ' | ' + u.email + ' | ' + u.total_pedidos + ' | ' + Number(u.gasto_total).toFixed(2) + '\u20ac | ' + u.created_at);
  });

  const [orders] = await pool.query(`
    SELECT o.id, o.user_id, u.name AS cliente, o.subtotal, o.discount, o.total, o.status, o.created_at,
           (SELECT COUNT(*) FROM order_lines ol WHERE ol.order_id = o.id) AS lineas
    FROM orders o
    JOIN users u ON u.id = o.user_id
    ORDER BY o.created_at DESC
  `);

  console.log('\n=== PEDIDOS ===');
  console.log('ID | Cliente | Subtotal | Dto | Total | Estado | Lineas | Fecha');
  console.log('-'.repeat(100));
  orders.forEach(o => {
    console.log(o.id + ' | ' + o.cliente + ' | ' + Number(o.subtotal).toFixed(2) + ' | ' + Number(o.discount).toFixed(2) + ' | ' + Number(o.total).toFixed(2) + ' | ' + o.status + ' | ' + o.lineas + ' | ' + o.created_at);
  });

  process.exit(0);
})();
