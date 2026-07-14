require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const pool = require('./db/connection');

const authRoutes = require('./routes/auth');
const cookiesRoutes = require('./routes/cookies');
const ordersRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');
const { requiereAdmin } = require('./middleware/sesion');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: false
  }
}));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/admin/data', async (req, res) => {
  try {
    const [users] = await pool.query(`
      SELECT u.id, u.name, u.email, u.created_at,
             COUNT(o.id) AS total_pedidos,
             COALESCE(SUM(o.total), 0) AS gasto_total
      FROM users u
      LEFT JOIN orders o ON o.user_id = u.id
      GROUP BY u.id
      ORDER BY u.id
    `);
    const [orders] = await pool.query(`
      SELECT o.id, o.user_id, u.name AS cliente, o.subtotal, o.discount, o.total, o.status, o.created_at
      FROM orders o
      JOIN users u ON u.id = o.user_id
      ORDER BY o.created_at DESC
    `);
    res.json({ clientes: users, pedidos: orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ estado: 'ok', db: 'ok' });
  } catch (err) {
    res.status(500).json({ estado: 'error', db: 'ko' });
  }
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'registro.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/admin', requiereAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'admin.html'));
});

app.use(authRoutes);
app.use(cookiesRoutes);
app.use(ordersRoutes);
app.use(adminRoutes);

app.listen(PORT, () => {
  console.log(`NALEE's Bakery API running on port ${PORT}`);
});
