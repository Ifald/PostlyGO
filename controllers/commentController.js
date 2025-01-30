const Post = require("../models/postModel");

// Додати коментар до поста
exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = {
      content,
      user: req.user.id, // ID авторизованого користувача
    };

    post.comments.push(comment);
    await post.save();

    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Отримати всі коментарі поста
exports.getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId).populate(
      "comments.user",
      "username"
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post.comments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Видалити коментар
exports.deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const commentIndex = post.comments.findIndex(
      (comment) =>
        comment._id.toString() === commentId &&
        comment.user.toString() === req.user.id
    );

    if (commentIndex === -1) {
      return res
        .status(404)
        .json({ message: "Comment not found or not authorized" });
    }

    post.comments.splice(commentIndex, 1);
    await post.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
