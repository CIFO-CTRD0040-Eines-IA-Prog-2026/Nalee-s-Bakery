const { Router } = require('express');
const pool = require('../db/connection');
const { requiereSesion } = require('../middleware/sesion');

const router = Router();

router.use('/api/orders', requiereSesion);

router.get('/api/orders', async (req, res) => {
  try {
    const [orders] = await pool.query(
      `SELECT id, subtotal, discount, total, status, created_at
       FROM orders
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [req.session.userId]
    );

    if (orders.length === 0) {
      return res.json([]);
    }

    const orderIds = orders.map(o => o.id);
    const placeholders = orderIds.map(() => '?').join(',');
    const [lines] = await pool.query(
      `SELECT id, order_id, cookie_id, quantity, unit_price, subtotal
       FROM order_lines
       WHERE order_id IN (${placeholders})
       ORDER BY id`,
      orderIds
    );

    const linesByOrder = {};
    for (const line of lines) {
      if (!linesByOrder[line.order_id]) linesByOrder[line.order_id] = [];
      linesByOrder[line.order_id].push(line);
    }

    const result = orders.map(o => ({
      ...o,
      lines: linesByOrder[o.id] || []
    }));

    res.json(result);
  } catch (err) {
    console.error('Error obteniendo pedidos:', err);
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
});

router.post('/api/orders', async (req, res) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'El pedido debe incluir al menos un artículo' });
  }

  const conn = await pool.getConnection();
  try {
    const cookieIds = items.map(item => item.cookie_id);
    const placeholders = cookieIds.map(() => '?').join(',');
    const [cookies] = conn.query(
      `SELECT id, price FROM cookies WHERE id IN (${placeholders})`,
      cookieIds
    );

    if (cookies.length !== new Set(cookieIds).size) {
      conn.rollback();
      return res.status(404).json({ error: 'Galleta no encontrada' });
    }

    const priceMap = {};
    for (const c of cookies) {
      priceMap[c.id] = c.price;
    }

    let subtotalTotal = 0;
    let totalQuantity = 0;
    const orderLines = [];

    for (const item of items) {
      if (!item.quantity || item.quantity < 1) {
        conn.rollback();
        return res.status(400).json({ error: 'Cantidad no válida' });
      }

      const unitPrice = priceMap[item.cookie_id];
      const lineSubtotal = +(unitPrice * item.quantity).toFixed(2);
      subtotalTotal += lineSubtotal;
      totalQuantity += item.quantity;

      orderLines.push({
        cookie_id: item.cookie_id,
        quantity: item.quantity,
        unit_price: unitPrice,
        subtotal: lineSubtotal
      });
    }

    const discount = totalQuantity > 10 ? +(subtotalTotal * 0.1).toFixed(2) : 0;
    const total = +(subtotalTotal - discount).toFixed(2);

    const [orderResult] = conn.query(
      `INSERT INTO orders (user_id, subtotal, discount, total, status)
       VALUES (?, ?, ?, ?, 'pending')`,
      [req.session.userId, subtotalTotal, discount, total]
    );

    const orderId = orderResult.insertId;

    for (const line of orderLines) {
      conn.query(
        `INSERT INTO order_lines (order_id, cookie_id, quantity, unit_price, subtotal)
         VALUES (?, ?, ?, ?, ?)`,
        [orderId, line.cookie_id, line.quantity, line.unit_price, line.subtotal]
      );
    }

    conn.commit();

    const [created] = await pool.query(
      `SELECT id, subtotal, discount, total, status, created_at
       FROM orders WHERE id = ?`,
      [orderId]
    );

    const [createdLines] = await pool.query(
      `SELECT id, order_id, cookie_id, quantity, unit_price, subtotal
       FROM order_lines WHERE order_id = ?`,
      [orderId]
    );

    res.status(201).json({ ...created[0], lines: createdLines });
  } catch (err) {
    conn.rollback();
    console.error('Error creando pedido:', err);
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
});

module.exports = router;
