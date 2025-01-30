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
    console.log("User ID from token:", req.user.id);
    console.log("Post ID to delete:", req.params.id);

    const post = await Post.findById(req.params.id);

    if (!post) {
      console.log("Post not found");
      return res.status(404).json({ message: "Post not found" });
    }

    console.log("Post owner ID:", post.user.toString());

    if (post.user.toString() !== req.user.id) {
      console.log("Unauthorized: User does not own the post");
      return res
        .status(401)
        .json({ message: "Unauthorized: You can delete only your own posts" });
    }

    // Удаление поста
    await Post.deleteOne({ _id: req.params.id });
    console.log("Post deleted successfully");
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
