const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  role: String,
  phone: String,
  email: String,
  password: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
const USER = mongoose.model("user", userSchema);
module.exports = USER;
