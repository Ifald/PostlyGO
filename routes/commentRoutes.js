const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middlewares/authMiddleware");

// Создание комментария
router.post(
  "/:postId/comments",
  authMiddleware,
  commentController.createComment
);

// Получение комментариев к посту
router.get("/:postId/comments", commentController.getCommentsByPost);

// Удаление комментария
router.delete(
  "/comments/:commentId",
  authMiddleware,
  commentController.deleteComment
);

router.post("/:postId/comments", authMiddleware, addComment);

module.exports = router;
