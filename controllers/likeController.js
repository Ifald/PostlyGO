const Like = require("../models/likeModel");
const Post = require("../models/postModel");

exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Пост не знайдено" });

    const existingLike = await Like.findOne({ user: userId, post: postId });

    if (existingLike) {
      await Like.findByIdAndDelete(existingLike._id);
      return res.status(200).json({ message: "Лайк видалено" });
    } else {
      const newLike = new Like({ user: userId, post: postId });
      await newLike.save();
      return res.status(201).json({ message: "Пост вподобано" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Помилка сервера", error });
  }
};
