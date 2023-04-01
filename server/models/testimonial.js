const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  profile: String,
  name: String,
  company: String,
  description: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
const TESTIMONIAL = mongoose.model("testimonial", testimonialSchema);
module.exports = TESTIMONIAL;
