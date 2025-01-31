const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Користувач, який поставив лайк
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }, // Пост, який було лайкнуто
  },
  { timestamps: true }
);

module.exports = mongoose.model("Like", likeSchema);
