const createUserController = (userService) => {
  const userController = {};

  userController.register = (req, res, next) => {
    console.log('req.bode', req.body);
    userService
      .register(req.body.username, req.body.password)
      .then((doc) => {
        res.status(200).send({ ok: true, user: doc });
      })
      .catch((err) => {
        res.status(400).send({ ok: false, error: err.message });
      });
  };

  userController.login = (req, res, next) => {
    userService
      .login(req.body.username, req.body.password)
      .then((token) => {
        res.status(200);
        res.send({ ok: true, token });
      })
      .catch((err) => {
        res.status(401);
        res.send({ ok: false, error: err.message });
      });
  };

  userController.checkToken = (req, res, next) => {
    userService.checkToken(req.query.token, (err, data) => {
      if (err) {
        res.status(401).send({ ok: false, error: err });
      } else {
        res.status(200).send({ ok: true, user: data });
      }
    });
  };

  return userController;
};
module.exports = createUserController;
