const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true }, // username є обов'язковим
  avatar: { type: String, default: null },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Список користувачів, на яких підписаний
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Список підписників
});

module.exports = mongoose.model("User", userSchema);
