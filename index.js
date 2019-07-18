const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const app = express();
const path = require('path');

const { trafficCounter } = require('./services/traffic');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ['cookie secret shhhh']
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const TEST_PRODUCTION = true;

if (process.env.NODE_ENV === 'production' || TEST_PRODUCTION) {
  app.use(express.static('client/build'));
  app.use(express.static('admin/build'));
  app.use(express.static('404'));

  require('./services/Authentication')(app);
  require('./Routes/userRoutes')(app);

  app.get('/', (req, res) => {
    trafficCounter(req);
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
  app.get('/admin', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'admin', 'build', 'index.html'));
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/404/index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
