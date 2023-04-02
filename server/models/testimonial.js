const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  profile: String,
  name: String,
  company: String,
  description: String,
  author: { type: mongoose.Types.ObjectId, ref: "user", },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
const TESTIMONIAL = mongoose.model("testimonial", testimonialSchema);
module.exports = TESTIMONIAL;
