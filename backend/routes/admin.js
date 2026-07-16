const { Router } = require('express');
const pool = require('../db/connection');
const { requiereSesion, requiereAdmin } = require('../middleware/sesion');
const { enviarConfirmacionPedido } = require('../services/email');

const router = Router();

router.use(requiereSesion, requiereAdmin);

router.get('/admin/data', async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, name, email, role, lang, created_at FROM users ORDER BY id');
    const [cookies] = await pool.query('SELECT id, slug, name_es, name_en, desc_es, desc_en, price, image FROM cookies ORDER BY id');
    const [orders] = await pool.query('SELECT id, user_id, subtotal, discount, total, status, created_at FROM orders ORDER BY created_at DESC');
    const [orderLines] = await pool.query('SELECT id, order_id, cookie_id, quantity, unit_price, subtotal FROM order_lines ORDER BY id');
    res.json({ users, cookies, orders, order_lines: orderLines });
  } catch (err) {
    console.error('Error obteniendo datos admin:', err);
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});

router.get('/admin/orders', async (req, res) => {
  try {
    const [orders] = await pool.query(
      `SELECT o.id, o.subtotal, o.discount, o.total, o.status, o.created_at,
              u.name AS user_name, u.email AS user_email
       FROM orders o
       JOIN users u ON o.user_id = u.id
       ORDER BY o.created_at DESC`
    );

    if (orders.length === 0) {
      return res.json([]);
    }

    const orderIds = orders.map(o => o.id);
    const placeholders = orderIds.map(() => '?').join(',');
    const [lines] = await pool.query(
      `SELECT ol.id, ol.order_id, ol.cookie_id, ol.quantity, ol.unit_price, ol.subtotal,
              c.name_es AS cookie_name
       FROM order_lines ol
       JOIN cookies c ON ol.cookie_id = c.id
       WHERE ol.order_id IN (${placeholders})
       ORDER BY ol.id`,
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
    console.error('Error obteniendo pedidos admin:', err);
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
});

router.patch('/admin/orders/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'confirmed', 'delivered', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: 'Estado no válido' });
  }

  try {
    const [orders] = await pool.query('SELECT id, user_id, status, subtotal, discount, total, created_at FROM orders WHERE id = ?', [id]);

    if (orders.length === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    const order = orders[0];
    await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);

    if (status === 'confirmed') {
      const [users] = await pool.query('SELECT name, email FROM users WHERE id = ?', [order.user_id]);
      const [lines] = await pool.query(
        `SELECT ol.quantity, ol.unit_price, ol.subtotal, c.name_es AS cookie_name
         FROM order_lines ol
         JOIN cookies c ON c.id = ol.cookie_id
         WHERE ol.order_id = ?`,
        [id]
      );

      enviarConfirmacionPedido(users[0], order, lines, 'es');
    }

    res.json({ message: 'Estado actualizado correctamente' });
  } catch (err) {
    console.error('Error actualizando estado:', err);
    res.status(500).json({ error: 'Error al actualizar el estado' });
  }
});

router.get('/admin/cookies', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, slug, name_es, name_en, desc_es, desc_en, price, image FROM cookies ORDER BY id'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error obteniendo galletas admin:', err);
    res.status(500).json({ error: 'Error al obtener el catálogo' });
  }
});

router.post('/admin/cookies', async (req, res) => {
  const { slug, name_es, name_en, desc_es, desc_en, price, image } = req.body;

  if (!slug || !name_es || !name_en || !desc_es || !desc_en || typeof price !== 'number' || price < 0) {
    return res.status(400).json({ error: 'Faltan campos obligatorios o precio no válido' });
  }

  try {
    const [existing] = await pool.query('SELECT id FROM cookies WHERE slug = ?', [slug]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Ya existe una galleta con ese slug' });
    }

    await pool.query(
      'INSERT INTO cookies (slug, name_es, name_en, desc_es, desc_en, price, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [slug, name_es, name_en, desc_es, desc_en, price, image || 'default.jpg']
    );

    res.status(201).json({ message: 'Galleta creada correctamente' });
  } catch (err) {
    console.error('Error creando galleta:', err);
    res.status(500).json({ error: 'Error al crear la galleta' });
  }
});

router.put('/admin/cookies/:id', async (req, res) => {
  const { id } = req.params;
  const { name_es, name_en, desc_es, desc_en, price } = req.body;

  try {
    const [cookies] = await pool.query('SELECT id FROM cookies WHERE id = ?', [id]);

    if (cookies.length === 0) {
      return res.status(404).json({ error: 'Galleta no encontrada' });
    }

    if (typeof price === 'number' && price >= 0) {
      await pool.query('UPDATE cookies SET price = ? WHERE id = ?', [price, id]);
    }

    if (name_es && name_en && desc_es && desc_en) {
      await pool.query(
        'UPDATE cookies SET name_es = ?, name_en = ?, desc_es = ?, desc_en = ? WHERE id = ?',
        [name_es, name_en, desc_es, desc_en, id]
      );
    }

    res.json({ message: 'Galleta actualizada correctamente' });
  } catch (err) {
    console.error('Error actualizando galleta:', err);
    res.status(500).json({ error: 'Error al actualizar la galleta' });
  }
});

router.put('/admin/cookies/price-all', async (req, res) => {
  const { percentage } = req.body;

  if (typeof percentage !== 'number') {
    return res.status(400).json({ error: 'Porcentaje no válido' });
  }

  try {
    const factor = 1 + (percentage / 100);
    await pool.query(
      'UPDATE cookies SET price = ROUND(price * ?, 2)',
      [factor]
    );

    res.json({ message: `Precios actualizados en ${percentage}%` });
  } catch (err) {
    console.error('Error actualizando precios:', err);
    res.status(500).json({ error: 'Error al actualizar los precios' });
  }
});

router.delete('/admin/cookies/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [cookies] = await pool.query('SELECT id FROM cookies WHERE id = ?', [id]);

    if (cookies.length === 0) {
      return res.status(404).json({ error: 'Galleta no encontrada' });
    }

    const [orders] = await pool.query(
      'SELECT id FROM order_lines WHERE cookie_id = ? LIMIT 1',
      [id]
    );

    if (orders.length > 0) {
      return res.status(400).json({ error: 'No se puede eliminar: la galleta tiene pedidos asociados' });
    }

    await pool.query('DELETE FROM cookies WHERE id = ?', [id]);

    res.json({ message: 'Galleta eliminada correctamente' });
  } catch (err) {
    console.error('Error eliminando galleta:', err);
    res.status(500).json({ error: 'Error al eliminar la galleta' });
  }
});

module.exports = router;
