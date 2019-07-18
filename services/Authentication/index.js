const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
const requireAuth = require('../../middleware/requireAuth');
const tempUser = { id: 1, name: 'yuval' };

module.exports = app => {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    //TO DO find by id
    done(null, tempUser);
  });

  passport.use(
    new LocalStrategy(function(username, password, done) {
      if (username === 'yuval' && password == 123) {
        return done(null, tempUser);
      } else {
        return done(null, false, { message: 'Incorrect credentials.' });
      }
      /*User.findOne({ username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });*/
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

  app.post('/api/logout', requireAuth, (req, res) => {
    req.logout();
    res.send('logged out');
  });
};
