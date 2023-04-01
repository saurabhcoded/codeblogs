const { loginHandler, registerHandler } = require("./auth.controller");

const authRouter = require("express").Router();

authRouter.post("/login", loginHandler);
authRouter.post("/register", registerHandler);

module.exports = authRouter;
