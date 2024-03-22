const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: false },
  fullname: { type: String, required: false },
  bio: { type: String, required: false },
  image: {
    data: Buffer,
    contentType: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  designation: { type: String },
  country: { type: String },
  state: { type: String },
  city: { type: String },
  zipcode: { type: String },
});

module.exports = mongoose.model("BlogUser", userSchema);
