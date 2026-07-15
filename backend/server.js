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
