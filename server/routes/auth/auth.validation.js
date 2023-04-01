const Joi = require("joi");
const bcrypt = require("bcryptjs");

function registerValidation(data) {
  //validation
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    role: Joi.string().valid('reader', 'author', 'admin').required(),
    email: Joi.string().min(6).required().email(),
    phone: Joi.number().min(10).required(),
    password: Joi.string().min(10).required(),
    confirm_password: Joi.string().min(10).required(),
    address: Joi.string().required(),
  });

  return schema.validate(data);
}

function loginValidation(data) {
  //validation
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(10).required(),
  });

  return schema.validate(data);
}

//Hash passwords
async function hashingPassword(password) {
  const salt = await bcrypt.genSalt(15);
  return await bcrypt.hash(password, salt);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.hashingPassword = hashingPassword;
