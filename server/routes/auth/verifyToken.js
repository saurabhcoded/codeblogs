const jwt = require("jsonwebtoken");
const USER = require("../../models/user");

async function authVerify(req, res, next) {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).send({ message: "Access Denied", status: "error" });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await USER.findOne({ _id: verified._id })
    req.user = user;
    next();
  } catch (error) {
    res.status(404).send({ message: "Invalid token", status: "error" });
  }
}
module.exports.authVerify = authVerify;