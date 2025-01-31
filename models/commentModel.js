const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Автор коментаря
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }, // Пост, до якого залишено коментар
    text: { type: String, required: true }, // Текст коментаря
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
