const express = require("express");
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Створення нового поста
router.post("/", authMiddleware, createPost);

// Отримання всіх постів
router.get("/", authMiddleware, getPosts);

// Отримання конкретного поста за ID
router.get("/:postId", authMiddleware, getPostById);

// Оновлення поста за ID
router.put("/:postId", authMiddleware, updatePost);

// Видалення поста за ID
router.delete("/:postId", authMiddleware, deletePost);

module.exports = router;
