module.exports = app => {
  app.get('/api/currentUser', (req, res) => {
    console.log('currentUser');
    const user = req.user ? req.user : false;
    res.send(user);
  });
  app.get('/api/failLogIn', (req, res) => {
    console.log('faisl');

    res.send(undefined);
  });
};
