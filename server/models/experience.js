const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  role: String,
  date: String,
  company: String,
  bgcolor: String,
  color: String,
  location: String,
  author: { type: mongoose.Types.ObjectId, ref: "user", },
  description: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
const EXPERIENCE = mongoose.model("experience", experienceSchema);
module.exports = EXPERIENCE;
