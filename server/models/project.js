const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  img: [
    {
      type: String,
    },
  ],
  tech: [
    {
      type: mongoose.Types.ObjectId,
      ref: "tech",
    },
  ],
  content: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
const PROJECT = mongoose.model("project", projectSchema);
module.exports = PROJECT;
