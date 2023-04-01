const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  password: String,
  address: String,
  role: {
    type: String,
    enum: ['reader', 'author', 'admin']
  },
  status: {
    type: String,
    enum: ['active', 'unverified', 'suspend'],
    default: "unverified"
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
const USER = mongoose.model("user", userSchema);
module.exports = USER;
