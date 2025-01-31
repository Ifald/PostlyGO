const express = require("express");
const { addComment } = require("../controllers/commentController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Маршрут для додавання коментаря
router.post("/:postId/comment", authMiddleware, addComment);

module.exports = router;
