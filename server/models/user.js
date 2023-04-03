const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  profile: String,
  name: String,
  phone: String,
  email: String,
  password: String,
  address: String,
  github: String,
  gitlab: String,
  linkedin: String,
  twitter: String,
  instagram: String,
  facebook: String,
  leetcode: String,
  hackerank: String,
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
