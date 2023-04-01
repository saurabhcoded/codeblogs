const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  img: String,
  icon: String,
  content: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
const SERVICE = mongoose.model("service", serviceSchema);
module.exports = SERVICE;
