const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author_name: { type: String, required: true },
  image: {
    data: Buffer,
    contentType: String,
  },
  author_id: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Blogs", blogSchema);
