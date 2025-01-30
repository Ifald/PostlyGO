const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");

// Настройки для загрузки файлов
const upload = multer({ dest: "public/uploads/avatars/" });

// Получение профиля пользователя
router.get("/profile", authMiddleware, userController.getUserProfile);

// Загрузка аватара
router.post(
  "/upload-avatar",
  authMiddleware,
  upload.single("avatar"),
  userController.uploadAvatar
);

module.exports = router;
