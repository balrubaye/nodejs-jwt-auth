
const createAuthController = (authService) => {
  const authController = {};

  authController.register = (req, res, next) => {
    console.log('req.bode', req.body)
    authService
      .register(req.body.username, req.body.password)
      .then((doc) => {
        console.log('sdsdsd', doc)
        res.status(200).send({ ok: true, user: doc });
      })
      .catch((err) => res.status(400).send({ok: false, error: err.message}));
  };

  authController.login = (req, res, next) => {
    authService.login(req.body.username, req.body.password).then(token => {
      res.status(200);
      res.send({ ok: true, token });
    }).catch(err => {
      res.status(401);
      res.send({ ok: false, error: err.message });
    })
  };

  authController.checkToken = (req, res, next) => {
    authService.checkToken(req.query.token, (err, data) => {
      if (err) {
        res.status(401).send({ error: err });
      }
      res.status(200).send({ user: data });
    });
  };

  return authController;
};
module.exports = createAuthController;
