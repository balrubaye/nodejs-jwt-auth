const Router = require('express').Router;
const createUserController = require('./user-controller');
const createUserService = require('./user-service');
const db = require('./db');

const userService = createUserService(db);
const userController = createUserController(userService);

const userRouter = new Router();

userRouter.get('/checkToken', userController.checkToken);
userRouter.post('/login', userController.login);
userRouter.post('/register', userController.register);

// create test user
userService.register('bsbs', '1234');

module.exports = userRouter;
