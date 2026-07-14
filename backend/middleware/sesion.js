const pool = require('../db/connection');

function requiereSesion(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'No autenticado' });
  }
  next();
}

function requiereSesionPagina(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.redirect('/login');
  }
  next();
}

async function requiereAdmin(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'No autenticado' });
  }
  try {
    const [rows] = await pool.query('SELECT role FROM users WHERE id = ?', [req.session.userId]);
    if (!rows[0] || rows[0].role !== 'admin') {
      return res.status(403).json({ error: 'Acceso denegado' });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: 'Error de verificación' });
  }
}

module.exports = { requiereSesion, requiereSesionPagina, requiereAdmin };
