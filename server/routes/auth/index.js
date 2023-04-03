const upload = require("../../utils/upload");
const { loginHandler, registerHandler } = require("./auth.controller");

const authRouter = require("express").Router();

authRouter.post("/login", loginHandler);
authRouter.post("/register", upload.single("profile"), registerHandler);

module.exports = authRouter;
