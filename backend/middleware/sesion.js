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

module.exports = { requiereSesion, requiereSesionPagina };
