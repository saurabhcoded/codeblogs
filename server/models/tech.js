const mongoose = require("mongoose");

const techSchema = new mongoose.Schema({
  name: String,
  icon: String,
  author: { type: mongoose.Types.ObjectId, ref: "user", },
  order: Number,
});
const TECH = mongoose.model("tech", techSchema);
module.exports = TECH;
