const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const Post = require("../models/Post");

// Создать пост
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? `/uploads/posts/${req.file.filename}` : null;

    const newPost = new Post({
      user: req.user.id,
      title,
      description,
      image,
    });

    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Получить все посты
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "username email");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Удалить пост
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Проверка прав
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await post.remove();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
