const Post = require("../models/postModel");

// Создание нового поста
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    const newPost = new Post({
      title,
      content,
      user: userId,
    });

    await newPost.save();

    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Failed to create post", error });
  }
};

// Получение всех постов
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "username");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts", error });
  }
};

// Удаление поста
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this post" });
    }

    await post.remove();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post", error });
  }
};
