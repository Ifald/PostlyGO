const User = require("../models/userModel");

// Пошук користувачів
exports.searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    const users = await User.find({
      username: { $regex: query, $options: "i" },
    }).select("username email");

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Помилка сервера", error: err });
  }
};
