const express = require("express");
const router = express.Router();
const {
  addComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");
const authMiddleware = require("../middlewares/authMiddleware");

// Маршрут для створення коментаря
router.post("/:postId/comments", authMiddleware, addComment);

// Маршрут для отримання коментарів поста
router.get("/:postId/comments", authMiddleware, getComments);

// Маршрут для видалення коментаря
router.delete("/:postId/comments/:commentId", authMiddleware, deleteComment);

module.exports = router;
