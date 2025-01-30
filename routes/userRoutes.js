const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// Приватный маршрут: получить данные пользователя
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to your profile", user: req.user });
});

// Загрузка аватара
router.post(
  "/upload-avatar",
  authMiddleware,
  upload.single("avatar"),
  (req, res) => {
    try {
      const filePath = `/uploads/avatars/${req.file.filename}`;
      res
        .status(200)
        .json({ message: "Avatar uploaded successfully", filePath });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
);

module.exports = router;
