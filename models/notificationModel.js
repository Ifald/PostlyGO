const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Отримувач сповіщення
    type: { type: String, enum: ["like", "comment"], required: true }, // Тип сповіщення
    message: { type: String, required: true }, // Текст сповіщення
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: false,
    }, // Пост (для лайків/коментарів)
    isRead: { type: Boolean, default: false }, // Статус: прочитане чи ні
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
