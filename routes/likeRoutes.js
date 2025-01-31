const express = require("express");
const { likePost } = require("../controllers/likeController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/:postId/like", authMiddleware, likePost);

module.exports = router;
