const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");

// Создание поста (только для авторизованных пользователей)
router.post("/", authMiddleware, postController.createPost);

// Получение всех постов
router.get("/", postController.getAllPosts);

// Удаление поста (только для автора поста)
router.delete("/:id", authMiddleware, postController.deletePost);

module.exports = router;
