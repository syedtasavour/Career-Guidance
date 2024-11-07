function ensureAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  req.flash('message', 'Please log in to view this resource.');
  res.redirect('/auth/login');
}

function ensureAdmin(req, res, next) {
  if (req.session.role === 'admin') {
    return next();
  }
  req.flash('message', 'Access denied.');
  res.redirect('/');
}

module.exports = { ensureAuthenticated, ensureAdmin }; 