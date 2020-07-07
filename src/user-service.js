const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secret = 'topSHHH';
const saltRounds = 8;

const createUserService = (db) => {
  const userService = {};

  userService.register = (username, password) => {
    return bcrypt.hash(password, saltRounds).then((hash) => {
      return db.insertPromise({ username, password: hash }).then((doc) => {
        return doc;
      });
    });
  };

  userService.login = (username, password) => {
    return db.findOnePromise({ username }).then((doc) => {
      console.log('userService.login doc : ', doc);
      if (doc && doc.username) {
        return bcrypt.compare(password, doc.password).then((match) => {
          console.log('userService.login match : ', match);
          if (match) {
            const token = jwt.sign(
              {
                username,
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
              },
              secret
            );
            return token;
          } else throw new Error('Username or password could not be found!');
        });
      } else throw new Error('Username or password could not be found!');
    });
  };

  userService.checkToken = (token, cb) => {
    jwt.verify(token, secret, (err, decoded) => {
      console.log('err', err, 'decodddd', decoded);
      if (err) {
        cb(err);
      } else {
        cb(null, decoded.username);
      }
    });
  };
  return userService;
};

module.exports = createUserService;
