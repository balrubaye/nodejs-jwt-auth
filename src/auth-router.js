const Router = require("express").Router;
const createAuthController = require("./auth-controller");
const createAuthService = require("./auth-service");
const db = require("./db");

const authService = createAuthService(db);
const authController = createAuthController(authService);

const authRouter = new Router();

authRouter.get("/checkToken", authController.checkToken);
authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);

// create test user
authService.register("bsbs", "1234");

module.exports = authRouter;
