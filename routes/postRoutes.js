const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  addComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");

// Создание поста (только для авторизованных пользователей)
router.post("/", authMiddleware, postController.createPost);

// Получение всех постов
router.get("/", postController.getAllPosts);

// Удаление поста (только для автора поста)
router.delete("/:id", authMiddleware, postController.deletePost);

// Добавить комментарий
router.post("/:postId/comments", authMiddleware, addComment);

// Получить комментарии поста
router.get("/:postId/comments", getComments);

// Удалить комментарий
router.delete("/comments/:commentId", authMiddleware, deleteComment);

module.exports = router;
