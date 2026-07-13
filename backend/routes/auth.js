const { Router } = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../db/connection');

const router = Router();

router.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'El nombre es obligatorio' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'El email es obligatorio' });
    }
    if (!password || password.length < 4) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 4 caracteres' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email no válido' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name.trim(), email.trim().toLowerCase(), passwordHash]
    );

    req.session.userId = result.insertId;

    res.status(201).json({ id: result.insertId, name: name.trim(), email: email.trim().toLowerCase() });
  } catch (err) {
    if (err.message && err.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({ error: 'Este email ya está registrado' });
    }
    console.error('Error en registro:', err);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

router.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }

    const [rows] = await pool.query(
      'SELECT id, name, email, password_hash FROM users WHERE email = ?',
      [email.trim().toLowerCase()]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    const user = rows[0];
    const passwordOk = await bcrypt.compare(password, user.password_hash);

    if (!passwordOk) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    req.session.userId = user.id;

    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

router.post('/api/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al cerrar sesión' });
    }
    res.clearCookie('connect.sid');
    res.json({ estado: 'ok' });
  });
});

router.get('/api/auth/me', async (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'No autenticado' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT id, name, email FROM users WHERE id = ?',
      [req.session.userId]
    );

    if (rows.length === 0) {
      req.session.destroy();
      return res.status(401).json({ error: 'No autenticado' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Error en /me:', err);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});

module.exports = router;
