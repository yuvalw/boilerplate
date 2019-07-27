module.exports = {
  requireAdminAuth: (req, res, next) => {
    if (!req.user) {
      return res.send({ success: false, error: 'Not Authorized!' });
    }
    if (!req.user.admin) {
      return res.redirect('/forbidden');
    }
    next();
  },
  requireAuth: (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({ error: 'Not Authorized!' });
    }
    next();
  }
};
