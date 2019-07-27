exports.requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'Not Authorized!' });
  }
  next();
};
exports.requireAdminAuth = (req, res, next) => {
  if (!req.user.admin) {
    return res.status(401).send({ error: 'Not Authorized!' });
  }
  next();
};
