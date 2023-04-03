// async function loginController(req, res) {
//   res.status(200).json({ message: "Login SuccessFull" });
// }

// module.exports = loginController;

const router = require("express").Router();
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation, hashingPassword } = require("./auth.validation");
const clog = require("../../utils/chalk");
const { imgUrl } = require("../../utils/upload");

//register route
const registerHandler = async (req, res) => {
  //   Validate data before saving
  const validated = await registerValidation(req.body);
  const profile = imgUrl(req.file);
  clog.info(req.body);
  if (profile) {
    if (!validated.error) {
      try {
        //Check if user already registered
        const emailCheck = await User.findOne({ email: validated.value.email });
        const phoneCheck = await User.findOne({ phone: validated.value.phone });
        if (emailCheck || phoneCheck) {
          res.json({ status: "warning", message: "User Already Registered" });
        } else {
          //hash the password
          const hashedPassword = await hashingPassword(req.body.password);
          const user = new User({
            profile: profile,
            name: validated.value.name,
            email: validated.value.email,
            role: validated.value.role,
            phone: validated.value.phone,
            address: validated.value.address,
            password: hashedPassword,
          });
          await user.save(user);
          //Jsonweb token authorization
          const Json_Token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
          res.json({
            status: "success",
            jwt: Json_Token,
            user: { id: user._id, name: user.name, profile: user.profile, email: user.email, role: user.role },
            message: "new user saved succcessfuly",
            status: "success",
          });
        }
      } catch (error) {
        clog.error(error);
        res.json({
          status: "error",
          message: "Internal Server Error"
        });
      }
    } else {
      res.json({
        status: "error",
        message: validated.error.message,
      });
    }
  } else {
    res.json({ status: "error", message: "Profile Image is required" });
  }
};
//Login route
const loginHandler = async (req, res) => {
  const validated = loginValidation(req.body);
  if (!validated.error) {
    try {
      //Check if email already exist
      const user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.json({
          message: "email or password is incorrect",
          status: "error",
        });
      //Check if password is valid
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (validPass) {
        //Jsonweb token authorization
        const Json_Token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        return res.json({
          status: "success",
          jwt: Json_Token,
          user: { id: user._id, name: user.name, profile: user.profile, email: user.email, role: user.role },
          message: "Logged in SuccessFully",
        });
      } else {
        res.json({ message: "Password or email is invalid", status: "error" });
      }
    } catch (err) {
      res.json({ message: "Server Error", status: "error" });
    }
  } else {
    res.json({
      status: "error",
      message: validated.error.message.replace('"', ''),
    });
  }
};

module.exports = {
  loginHandler,
  registerHandler,
};
