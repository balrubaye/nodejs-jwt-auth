const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret = "topSHHH";
const saltRounds = 8;

const createAuthService = (db) => {
  const authService = {};

  authService.register = (username, password) => {
    return bcrypt.hash(password, saltRounds).then((hash) => {
      return db.insertPromise({ username, password: hash }).then((doc) => {
        return doc;
      });
    });
  };

  authService.login = (username, password) => {
    return db.findOnePromise({ username }).then((doc) => {
      console.log("authService.login doc : ", doc);
      if (doc && doc.username) {
        return bcrypt.compare(password, doc.password).then((match) => {
          console.log("authService.login match : ", match);
          if (match) {
            const token = jwt.sign(
              { username, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
              secret
            );
            return token;
          } else throw new Error("Username or password could not be found!");
        });
      } else throw new Error("Username or password could not be found!");
    });
  };

  authService.checkToken = (token, cb) => {
    const decoded = jwt.decode(token);
    console.log("decoded token: ", decoded);
    cb(null, decoded.username);
  };
  return authService;
};

module.exports = createAuthService;
