const User = require("../models/userModel");

// Получение профиля пользователя
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password"); // Исключаем пароль из ответа

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Загрузка аватара пользователя
exports.uploadAvatar = async (req, res) => {
  try {
    const userId = req.user.id;
    const avatarPath = req.file.path; // Предполагается, что вы используете multer для загрузки файлов

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.avatar = avatarPath;
    await user.save();

    res
      .status(200)
      .json({ message: "Avatar uploaded successfully", avatar: avatarPath });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload avatar", error });
  }
};
