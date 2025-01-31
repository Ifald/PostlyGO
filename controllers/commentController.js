const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    if (!text) {
      return res
        .status(400)
        .json({ message: "Коментар не може бути порожнім" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Пост не знайдено" });
    }

    const newComment = new Comment({
      user: userId,
      post: postId,
      text,
    });
    await newComment.save();

    res.status(201).json({
      message: "Коментар додано",
      comment: newComment,
    });
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера", error });
  }
};
