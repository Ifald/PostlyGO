const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const Notification = require("../models/notificationModel");

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

    // Створення сповіщення
    if (post.user.toString() !== userId) {
      const notification = new Notification({
        user: post.user,
        type: "comment",
        message: `${req.user.name} прокоментував ваш пост`,
        post: postId,
      });
      console.log("Створюється сповіщення:", notification);
      await notification.save();
    }

    res.status(201).json({
      message: "Коментар додано",
      comment: newComment,
    });
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера", error });
  }
};
