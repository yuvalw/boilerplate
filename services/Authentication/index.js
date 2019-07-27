const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
const {
  requireAuth,
  requireAdminAuth
} = require('../../middleware/authorization');

const mongoose = require('mongoose');
require('../../db/models/User');
const User = mongoose.model('users');

module.exports = app => {
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id)
      .then(user => {
        return done(null, user);
      })
      .catch(err => done(err));
  });

  passport.use(
    new LocalStrategy(function(username, password, done) {
      User.findOne({ username, password })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          return done(null, user);
        })
        .catch(err => done(err));
    })
  );

  app.post(
    '/api/login',
    passport.authenticate('local', {
      successRedirect: 'currentUser',
      failureRedirect: 'failLogIn',
      failureFlash: true
    })
  );

  app.post(
    '/api/admin/login',
    passport.authenticate('local', {
      successRedirect: 'currentUser',
      failureRedirect: 'failLogIn',
      failureFlash: true
    })
  );

  app.post('/api/logout', requireAuth, (req, res) => {
    req.logout();
    res.send('logged out');
  });
  app.get('/api/currentUser', requireAuth, ({ user: { meta } }, res) => {
    res.send({ success: true, user: meta });
  });
  app.get(
    '/api/admin/currentUser',
    requireAdminAuth,
    ({ user: { meta } }, res) => {
      res.send({ success: true, user: meta });
    }
  );

  app.get('/api/failLogIn', (req, res) => {
    res.send({ success: false });
  });
  app.get('/api/admin/failLogIn', (req, res) => {
    res.send({ success: false });
  });
};
