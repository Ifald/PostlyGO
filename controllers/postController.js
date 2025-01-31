const Post = require("../models/postModel");

// Створення нового поста
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new Post({
      title,
      content,
      user: req.user.id,
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера", error });
  }
};

// Отримання всіх постів
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера", error });
  }
};

// Отримання поста за ID
exports.getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate("user", "name");
    if (!post) return res.status(404).json({ message: "Пост не знайдено" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера", error });
  }
};

// Оновлення поста
exports.updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Пост не знайдено" });

    if (post.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Ви не можете оновлювати цей пост" });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера", error });
  }
};

// Видалення поста
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    console.log(`Пост ID: ${postId}`);

    const post = await Post.findById(postId);
    if (!post) {
      console.log("Пост не знайдено");
      return res.status(404).json({ message: "Пост не знайдено" });
    }

    console.log(`Автор поста: ${post.user}`);
    console.log(`Автор запиту: ${req.user.id}`);

    if (post.user.toString() !== req.user.id) {
      console.log("Авторизація не пройдена");
      return res
        .status(403)
        .json({ message: "Ви не можете видалити цей пост" });
    }

    // Використовуємо deleteOne для видалення
    await Post.deleteOne({ _id: postId });
    console.log("Пост видалено успішно");
    res.status(200).json({ message: "Пост видалено" });
  } catch (error) {
    console.error("Помилка сервера:", error);
    res.status(500).json({ message: "Помилка сервера", error });
  }
};
