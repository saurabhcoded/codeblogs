const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  img: String,
  description: String,
  content: String,
  author: { type: mongoose.Types.ObjectId, ref: "user", },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
const BLOG = mongoose.model("blog", blogSchema);
module.exports = BLOG;
