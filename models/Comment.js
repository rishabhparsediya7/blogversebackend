const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  email: { type: String, required: true },
  comment: { type: String, required: true },
  blogId: { type: String, required: true },
  replies: { type: Array, required: false },
  blogTitle: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("comment", commentSchema);
