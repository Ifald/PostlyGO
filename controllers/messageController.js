const Message = require("../models/messageModel");
const User = require("../models/userModel");

// Надіслати повідомлення
exports.sendMessage = async (req, res) => {
  try {
    const { receiver, content } = req.body;

    const newMessage = await Message.create({
      sender: req.user.id,
      receiver,
      content,
    });

    res.status(201).json({
      message: "Повідомлення надіслано",
      newMessage,
    });
  } catch (err) {
    res.status(500).json({ message: "Помилка сервера", error: err });
  }
};

// Отримати повідомлення користувача
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user.id }, { receiver: req.user.id }],
    }).populate("sender receiver", "username email");

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Помилка сервера", error: err });
  }
};
