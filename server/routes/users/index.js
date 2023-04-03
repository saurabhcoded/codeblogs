const { authVerify } = require('../auth/verifyToken');
const { fetchAllUsers, deleteUser } = require('./users.controller');
const userRouter = require('express').Router();
userRouter.get("/", authVerify, fetchAllUsers);
userRouter.delete("/", authVerify, deleteUser);

module.exports = userRouter;