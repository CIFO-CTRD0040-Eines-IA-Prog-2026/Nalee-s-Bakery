const { Router } = require('express');
const pool = require('../db/connection');

const router = Router();

router.get('/api/cookies', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, slug, name_es, name_en, desc_es, desc_en, price, image FROM cookies ORDER BY id'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error obteniendo galletas:', err);
    res.status(500).json({ error: 'Error al obtener el catálogo' });
  }
});

module.exports = router;
