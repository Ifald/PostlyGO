const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");

// Налаштування для завантаження файлів
const upload = multer({ dest: "public/uploads/avatars/" });

// Отримання профілю користувача
router.get("/me", authMiddleware, userController.getUserProfile); // Змінив "/profile" на "/me"

// Завантаження аватара
router.post(
  "/upload-avatar",
  authMiddleware,
  upload.single("avatar"),
  userController.uploadAvatar
);

module.exports = router;
