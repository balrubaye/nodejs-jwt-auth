const Express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./src/user-router');

let server = new Express();
server.use(bodyParser.json());
server.use((req, res, next) => {
  console.log('--------- reqqq----', req.url, req.body);
  next();
});
server.use('/user', authRouter);

server.listen(3000, () => {
  console.log('Express server started on port : ', 3000);
});
